/**
 * Notificação de novos leads da triagem para o admin via CallMeBot (WhatsApp).
 *
 * Server-only. Regras:
 * - Valida CALLMEBOT_API_KEY e CALLMEBOT_PHONE ANTES de qualquer chamada.
 * - Retry com backoff exponencial (700ms → 2,1s → 6,3s); 4xx (exceto 429) é
 *   falha permanente — sem retry.
 * - Timeout de 8s por tentativa (AbortController).
 * - Logs estruturados (JSON) com requestId, submissionId, tentativa, status
 *   HTTP e natureza da falha.
 * - Persiste o resultado em funnel_submissions.alert_* (via service role).
 * - NUNCA inclui telefone/e-mail do cliente — o funil não coleta PII de
 *   contato; a mensagem traz apenas dados estruturados da triagem.
 */

export const CALLMEBOT_ENDPOINT = "https://api.callmebot.com/whatsapp.php";
export const MAX_ATTEMPTS = 3;
const ATTEMPT_TIMEOUT_MS = 8_000;

/** Backoff exponencial por índice de tentativa (0-based): 700ms, 2100ms, 6300ms. */
export const backoffDelayMs = (attemptIndex: number): number =>
  700 * 3 ** attemptIndex;

export type AlertKind =
  | "ok"
  | "config_missing"
  | "config_invalid"
  | "http_client_error"
  | "http_server_error"
  | "timeout"
  | "network"
  | "lead_not_found";

export interface NotifyResult {
  ok: boolean;
  kind: AlertKind;
  httpStatus?: number | undefined;
  attempts: number;
}

interface LeadRow {
  id: string;
  created_at: string;
  equipamento: string | null;
  marca: string | null;
  sintoma: string | null;
  requires_coleta: boolean | null;
  cidade: string | null;
  bairro: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  alert_status: string;
}

export function validateCallMeBotConfig(
  apiKey?: string,
  phone?: string,
):
  | { ok: true }
  | { ok: false; kind: "config_missing" | "config_invalid"; detail: string } {
  if (!apiKey || !phone) {
    return {
      ok: false,
      kind: "config_missing",
      detail: !phone
        ? "CALLMEBOT_PHONE ausente no ambiente"
        : "CALLMEBOT_API_KEY ausente no ambiente",
    };
  }
  if (!/^\d{10,15}$/.test(phone)) {
    return {
      ok: false,
      kind: "config_invalid",
      detail: "CALLMEBOT_PHONE deve conter apenas dígitos (10-15), com DDI+DDD",
    };
  }
  if (!/^[A-Za-z0-9_-]{6,}$/.test(apiKey)) {
    return {
      ok: false,
      kind: "config_invalid",
      detail: "CALLMEBOT_API_KEY com formato inesperado",
    };
  }
  return { ok: true };
}

/** Texto do alerta para o admin — somente dados estruturados da triagem. */
export function buildAdminAlertText(lead: {
  equipamento?: string | null;
  sintoma?: string | null;
  marca?: string | null;
  cidade?: string | null;
  bairro?: string | null;
  requires_coleta?: boolean | null;
  utm_source?: string | null;
  utm_campaign?: string | null;
  created_at?: string | null;
}): string {
  const lines: string[] = ["🆕 Novo lead — triagem do site"];
  if (lead.equipamento) lines.push(`• Serviço: ${lead.equipamento}`);
  if (lead.sintoma) lines.push(`• Sintoma: ${lead.sintoma}`);
  if (lead.marca) lines.push(`• Marca/tipo: ${lead.marca}`);
  const local = [lead.bairro, lead.cidade].filter(Boolean).join(" — ");
  if (local) lines.push(`• Localidade: ${local}`);
  if (lead.requires_coleta) lines.push("• Modalidade: coleta e entrega");
  const origem = [lead.utm_source, lead.utm_campaign].filter(Boolean).join("/");
  if (origem) lines.push(`• Origem: ${origem}`);
  if (lead.created_at) {
    lines.push(`• Data: ${new Date(lead.created_at).toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })}`);
  }
  lines.push("Painel: /admin/leads");
  return lines.join("\n").slice(0, 900);
}

interface CallAttempt {
  kind: AlertKind;
  httpStatus?: number | undefined;
}

async function postCallMeBot(
  text: string,
  apiKey: string,
  phone: string,
): Promise<CallAttempt> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), ATTEMPT_TIMEOUT_MS);
  try {
    const url = `${CALLMEBOT_ENDPOINT}?phone=${encodeURIComponent(phone)}&text=${encodeURIComponent(text)}&apikey=${encodeURIComponent(apiKey)}`;
    const res = await fetch(url, { signal: ctrl.signal });
    if (res.ok) return { kind: "ok", httpStatus: res.status };
    // 5xx e 429 são transitórios → retry; demais 4xx são permanentes.
    if (res.status >= 500 || res.status === 429) {
      return { kind: "http_server_error", httpStatus: res.status };
    }
    return { kind: "http_client_error", httpStatus: res.status };
  } catch (err) {
    const isAbort = err instanceof Error && err.name === "AbortError";
    return { kind: isAbort ? "timeout" : "network" };
  } finally {
    clearTimeout(timer);
  }
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/**
 * Envia (ou agenda erro) o alerta do lead para o admin. Idempotente: se o
 * alerta já foi enviado (`alert_status = 'sent'`), retorna ok sem reenviar.
 */
export async function sendAdminAlert(submissionId: string): Promise<NotifyResult> {
  const requestId = crypto.randomUUID();
  const log = (entry: Record<string, unknown>) => {
    // Log estruturado: requestId correlaciona tentativas do mesmo envio.
    console.log(
      JSON.stringify({
        evt: "notify_admin",
        requestId,
        submissionId,
        ts: new Date().toISOString(),
        ...entry,
      }),
    );
  };

  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const mark = async (patch: Record<string, unknown>) => {
    const { error } = await supabaseAdmin
      .from("funnel_submissions")
      .update(patch as never)
      .eq("id", submissionId);
    if (error) log({ kind: "db_update_failed", dbError: error.message });
  };

  // 1) Validação prévia de configuração — antes de qualquer fetch externo.
  const apiKey = process.env["CALLMEBOT_API_KEY"];
  const phone = process.env["CALLMEBOT_PHONE"];
  const cfg = validateCallMeBotConfig(apiKey, phone);
  if (!cfg.ok) {
    log({ attempt: 0, kind: cfg.kind, detail: cfg.detail });
    await mark({
      alert_status: "error",
      alert_last_error: cfg.kind,
      alert_attempts: 0,
    });
    return { ok: false, kind: cfg.kind, attempts: 0 };
  }

  // 2) Carrega o lead (service role — tabela sem SELECT público).
  const { data, error } = await supabaseAdmin
    .from("funnel_submissions")
    .select(
      "id, created_at, equipamento, marca, sintoma, requires_coleta, cidade, bairro, utm_source, utm_medium, utm_campaign, alert_status",
    )
    .eq("id", submissionId)
    .maybeSingle();
  const lead = (data as unknown as LeadRow | null) ?? null;
  if (error || !lead) {
    log({ kind: "lead_not_found", dbError: error?.message });
    return { ok: false, kind: "lead_not_found", attempts: 0 };
  }
  if (lead.alert_status === "sent") {
    return { ok: true, kind: "ok", attempts: 0 };
  }

  // 3) Retry com backoff exponencial.
  const text = buildAdminAlertText(lead);
  let last: CallAttempt = { kind: "network" };
  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
    last = await postCallMeBot(text, apiKey!, phone!);
    log({ attempt: attempt + 1, kind: last.kind, httpStatus: last.httpStatus });
    if (last.kind === "ok") {
      await mark({
        alert_status: "sent",
        alert_sent_at: new Date().toISOString(),
        alert_attempts: attempt + 1,
        alert_last_error: null,
      });
      return { ok: true, kind: "ok", httpStatus: last.httpStatus, attempts: attempt + 1 };
    }
    if (last.kind === "http_client_error") {
      // Falha permanente — não adianta tentar de novo.
      await mark({
        alert_status: "error",
        alert_last_error: `http_${last.httpStatus}`,
        alert_attempts: attempt + 1,
      });
      return { ok: false, kind: last.kind, httpStatus: last.httpStatus, attempts: attempt + 1 };
    }
    if (attempt < MAX_ATTEMPTS - 1) await sleep(backoffDelayMs(attempt));
  }

  // 4) Fallback seguro: erro persistido no painel admin para reenvio manual.
  await mark({
    alert_status: "error",
    alert_last_error: `retry_exhausted:${last.kind}${last.httpStatus ? `:${last.httpStatus}` : ""}`,
    alert_attempts: MAX_ATTEMPTS,
  });
  return { ok: false, kind: last.kind, httpStatus: last.httpStatus, attempts: MAX_ATTEMPTS };
}
