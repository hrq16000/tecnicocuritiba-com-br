// Helper para gerar mensagem de WhatsApp pré-preenchida com contexto
// (cidade, bairro, modalidade, problema, equipamento, serviço, triagem).
// Nunca inclui "unknown" no texto visível — campos ausentes são omitidos.

export interface WaMessageContext {
  bairro?: string;
  bairroLabel?: string; // ex: "Batel" (label humano; slug se não vier)
  cidade?: string;
  cidadeLabel?: string; // ex: "Curitiba"
  modalidade?: "remoto" | "visita" | "coleta" | "desconhecida" | "unknown";
  problema?: string;    // slug do problema
  problemaLabel?: string; // ex: "Notebook não liga"
  equipamento?: string;
  servico?: string;
  servicoLabel?: string;
  category?: string;     // categoria da triagem (ex: notebook, tv, wifi)
  symptomSlug?: string;  // sintoma da triagem (ex: nao-liga, tela-preta)
  urgencia?: string;     // ex: "72h", "agendado"
  /** Valor/condição comercial exibido no assunto (default: mínimo padrão). */
  condicao?: string;
  fallback?: string;    // mensagem base se nada de contexto existir
}

const modalidadeText: Record<string, string> = {
  remoto: "atendimento remoto",
  visita: "visita técnica",
  coleta: "coleta e entrega",
};

/** Condição comercial padrão — mesma regra do funil (mínimo R$ 99,99). */
export const DEFAULT_CONDICAO = "visita a partir de R$ 99,99, com orçamento aprovado antes do reparo";

const clean = (v?: string): string => {
  const s = (v ?? "").trim();
  if (!s || s === "unknown" || s === "desconhecida") return "";
  return s;
};

const humanize = (s: string): string =>
  s
    .replace(/-curitiba$/i, "")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

const label = (raw?: string, explicit?: string): string => {
  const e = clean(explicit);
  if (e) return e;
  const r = clean(raw);
  return r ? humanize(r) : "";
};

/**
 * Monta a linha "Assunto:" — identidade profissional do atendimento, com
 * categoria/sintoma da triagem e localização (bairro, cidade) quando houver.
 */
export function buildSubjectLine(ctx: WaMessageContext = {}): string {
  const cat = label(ctx.category);
  const sym = label(ctx.symptomSlug);
  const eqp = clean(ctx.equipamento);
  const prb = label(ctx.problema, ctx.problemaLabel);
  const svc = label(ctx.servico, ctx.servicoLabel);

  let foco = "";
  if (cat && sym) foco = `${cat} — ${sym.toLowerCase()}`;
  else if (eqp && prb) foco = `${eqp} — ${prb.toLowerCase()}`;
  else if (prb) foco = prb;
  else if (svc) foco = svc;
  else if (cat) foco = cat;
  else if (eqp) foco = eqp;

  const brrRaw = clean(ctx.bairroLabel) || (clean(ctx.bairro) ? humanize(ctx.bairro!.split("/").pop()!) : "");
  const cid = label(ctx.cidade, ctx.cidadeLabel);
  // Evita "Batel, Curitiba, Curitiba" quando bairroLabel já traz a cidade.
  const local = brrRaw && cid && !brrRaw.toLowerCase().includes(cid.toLowerCase())
    ? `${brrRaw}, ${cid}`
    : brrRaw || cid;

  return [foco, local].filter(Boolean).join(" | ");
}

export function buildContextualMessage(ctx: WaMessageContext = {}): string {
  const subject = buildSubjectLine(ctx);
  const lines: string[] = ["Olá! Vim do site tecnicocuritiba.com.br."];

  if (subject) lines.push(`Assunto: ${subject}`);

  const mod = clean(ctx.modalidade) ? modalidadeText[ctx.modalidade as string] : undefined;
  if (mod) lines.push(`Modalidade sugerida: ${mod}.`);

  const urg = clean(ctx.urgencia);
  if (urg) lines.push(`Urgência: ${urg}.`);

  // Só cita a condição comercial quando há assunto — evita ruído no CTA genérico.
  if (subject) lines.push(`Condição: ${clean(ctx.condicao) || DEFAULT_CONDICAO}.`);

  // Trace de triagem — permite ao atendente identificar de qual sintoma veio.
  const trace = [clean(ctx.category), clean(ctx.symptomSlug)].filter(Boolean).join("/");
  if (trace) lines.push(`[ref: ${trace}]`);

  lines.push("Podem me atender?");

  const msg = lines.join("\n").trim();
  if (!subject && !mod && !urg && ctx.fallback) return ctx.fallback;
  return msg;
}

const WHATSAPP_NUMBER = "5541997452053";

export function buildWhatsAppUrl(ctx: WaMessageContext = {}, number = WHATSAPP_NUMBER): string {
  const text = buildContextualMessage(ctx);
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}
