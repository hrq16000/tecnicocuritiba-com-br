// Helper para gerar mensagem de WhatsApp pré-preenchida com contexto
// (bairro, modalidade, problema, equipamento, serviço). Não inclui "unknown"
// no texto visível — campos ausentes são omitidos silenciosamente.

export interface WaMessageContext {
  bairro?: string;
  bairroLabel?: string; // ex: "Batel" (label humano; slug se não vier)
  modalidade?: "remoto" | "visita" | "coleta" | "desconhecida" | "unknown";
  problema?: string;    // slug do problema
  problemaLabel?: string; // ex: "Notebook não liga"
  equipamento?: string;
  servico?: string;
  servicoLabel?: string;
  category?: string;     // categoria da triagem (ex: notebook, tv, wifi)
  symptomSlug?: string;  // sintoma da triagem (ex: nao-liga, tela-preta)
  fallback?: string;    // mensagem base se nada de contexto existir
}


const modalidadeText: Record<string, string> = {
  remoto: "atendimento remoto",
  visita: "visita técnica",
  coleta: "coleta e entrega",
};

const humanize = (s: string): string =>
  s
    .replace(/-curitiba$/i, "")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

export function buildContextualMessage(ctx: WaMessageContext = {}): string {
  const parts: string[] = ["Olá! Vim do site."];

  const eqp = ctx.equipamento ? ctx.equipamento.trim() : "";
  const prb = ctx.problemaLabel || (ctx.problema ? humanize(ctx.problema) : "");
  const brr = ctx.bairroLabel || (ctx.bairro ? humanize(ctx.bairro) : "");
  const svc = ctx.servicoLabel || (ctx.servico ? humanize(ctx.servico) : "");

  const bits: string[] = [];
  if (eqp && prb) bits.push(`${eqp}: ${prb.toLowerCase()}`);
  else if (prb) bits.push(prb);
  else if (svc) bits.push(`preciso de ${svc.toLowerCase()}`);
  else if (eqp) bits.push(`equipamento: ${eqp}`);

  if (brr) bits.push(`em ${brr}`);
  if (bits.length) parts.push(bits.join(" "));

  const mod =
    ctx.modalidade && ctx.modalidade !== "desconhecida" && ctx.modalidade !== "unknown"
      ? modalidadeText[ctx.modalidade]
      : undefined;
  if (mod) parts.push(`Modalidade sugerida: ${mod}.`);

  parts.push("Podem me atender?");

  const msg = parts.join(" ").replace(/\s+/g, " ").trim();
  if (msg && msg !== "Olá! Vim do site. Podem me atender?") return msg;
  return ctx.fallback || msg;
}

const WHATSAPP_NUMBER = "5541997452053";

export function buildWhatsAppUrl(ctx: WaMessageContext = {}, number = WHATSAPP_NUMBER): string {
  const text = buildContextualMessage(ctx);
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}
