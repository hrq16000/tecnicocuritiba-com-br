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
  /** Marca/modelo informado pelo cliente (ex: "AOC 24G2 24 polegadas"). */
  modelo?: string;
  /** Sintomas selecionados/descritos pelo cliente. */
  sintomas?: string[];
  /** Cliente confirmou que vai enviar foto/vídeo do defeito. */
  temImagem?: boolean;
  /** Detalhes livres adicionais. */
  detalhes?: string;

  /** Valor/condição comercial exibido no assunto (default: mínimo padrão). */
  condicao?: string;
  /** Origem da campanha (utm_source) — entra no rastro [ref: ...]. */
  utmSource?: string;
  /** Click ID do Google Ads — entra no rastro [ref: ...] para casar conversão. */
  gclid?: string;
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

  // Parâmetros dinâmicos do equipamento — evitam ida e volta no atendimento.
  const modelo = clean(ctx.modelo);
  if (modelo) lines.push(`Modelo: ${modelo}.`);

  const sintomas = (ctx.sintomas ?? []).map((s) => clean(s)).filter(Boolean);
  if (sintomas.length > 0) lines.push(`Sintomas: ${sintomas.join("; ")}.`);

  const detalhes = clean(ctx.detalhes);
  if (detalhes) lines.push(`Detalhes: ${detalhes}.`);

  if (typeof ctx.temImagem === "boolean") {
    lines.push(ctx.temImagem ? "Fotos/vídeo: vou enviar agora nesta conversa." : "Fotos/vídeo: ainda não tenho.");
  }


  // Só cita a condição comercial quando há assunto — evita ruído no CTA genérico.
  if (subject) lines.push(`Condição: ${clean(ctx.condicao) || DEFAULT_CONDICAO}.`);

  // Trace de triagem + origem — permite ao atendente identificar de qual
  // sintoma e de qual campanha veio o contato (gclid casa com o Google Ads).
  const trace = [clean(ctx.category), clean(ctx.symptomSlug)].filter(Boolean).join("/");
  const src = clean(ctx.utmSource);
  const gid = clean(ctx.gclid);
  const refParts = [
    trace,
    src ? `via ${src}` : "",
    gid ? `gclid ${gid.slice(0, 24)}` : "",
  ].filter(Boolean);
  if (refParts.length > 0) lines.push(`[ref: ${refParts.join(" · ")}]`);

  lines.push("Podem me atender?");

  const msg = lines.join("\n").trim();
  if (!subject && !mod && !urg && !clean(ctx.gclid) && ctx.fallback) return ctx.fallback;
  return msg;
}

import { NAP_PHONE_DIGITS } from "./nap";
import { getGeoState } from "./geoCity";

const WHATSAPP_NUMBER = NAP_PHONE_DIGITS;

export function buildWhatsAppUrl(ctx: WaMessageContext = {}, number = WHATSAPP_NUMBER): string {
  // Origem da sessão (utm_source/gclid) entra automaticamente quando o
  // chamador não informou — sem isso o clique perde a atribuição da campanha.
  const withOrigin: WaMessageContext = { ...ctx };
  if (typeof window !== "undefined" && (!withOrigin.utmSource || !withOrigin.gclid)) {
    try {
      const stored = JSON.parse(sessionStorage.getItem("utm_payload_v1") || "{}") as Record<string, string>;
      const sp = new URLSearchParams(window.location.search);
      withOrigin.utmSource = withOrigin.utmSource || sp.get("utm_source") || stored.utm_source || undefined;
      withOrigin.gclid = withOrigin.gclid || sp.get("gclid") || stored.gclid || undefined;
    } catch { /* noop */ }
  }
  // Enriquecimento por geolocalização: quando o chamador não informou cidade,
  // usa a cidade detectada/confirmada da sessão (nunca sobrescreve o explícito).
  if (typeof window !== "undefined" && !clean(withOrigin.cidade) && !clean(withOrigin.cidadeLabel)) {
    try {
      const geo = getGeoState();
      if (geo.city) {
        withOrigin.cidadeLabel = geo.city;
        if (!clean(withOrigin.bairro) && !clean(withOrigin.bairroLabel) && geo.neighborhood) {
          withOrigin.bairroLabel = geo.neighborhood;
        }
      }
    } catch { /* noop */ }
  }
  const text = buildContextualMessage(withOrigin);
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}
