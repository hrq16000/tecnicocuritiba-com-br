// @ts-nocheck — legacy file silenced during TanStack migration (see .lovable/migrate-to-tanstack/tsc-silenced.json)
/**
 * Pipeline WhatsApp T+24h / T+72h — custo zero (wa.me manual via admin).
 *
 * Fluxo:
 *  1) Atendimento fechado no admin → operador abre /admin/reviews
 *  2) Em T+24h: clica "Pedir review (24h)" → abre wa.me com mensagem 1
 *  3) Em T+72h (se ainda não chegou review): clica "Lembrete (72h)" → mensagem 2
 *  4) Cliente clica no link mágico do Google e publica a avaliação
 *  5) Admin importa a review verificada em /admin/reviews
 *
 * Sem Twilio/GatewayAPI = sem custo recorrente e sem opt-in regulatório.
 */

const WHATSAPP_NUMBER = "5541997452053";

/**
 * Link mágico do Google que abre direto a tela "Escrever avaliação".
 * Substitua PLACE_ID pelo Place ID real do Google Business Profile.
 *
 * Como obter: https://developers.google.com/maps/documentation/places/web-service/place-id
 * Ou via GMB: Painel → Compartilhar → "Receba mais avaliações" copia link já no formato g.page/r/.../review
 */
export const GOOGLE_REVIEW_URL =
  "https://g.page/r/CQ_TECNICO_CURITIBA_PLACE_ID/review";

/** Domínio canônico usado nos links enviados por WhatsApp. */
export const SITE_URL = "https://tecnicocuritiba.com.br";

/**
 * Link rastreável da avaliação no próprio site (estrelas + autorização de
 * publicação). Cai em /avaliar com UTMs para o GA4 medir abertura e envio.
 */
export const buildSiteReviewUrl = (opts: {
  service?: string;
  neighborhood?: string;
  os?: string;
  medium?: "whatsapp_t24" | "whatsapp_t72" | "whatsapp_os" | "qr";
} = {}): string => {
  const u = new URL("/avaliar", SITE_URL);
  if (opts.service) u.searchParams.set("servico", opts.service);
  if (opts.neighborhood) u.searchParams.set("bairro", opts.neighborhood);
  if (opts.os) u.searchParams.set("os", opts.os);
  u.searchParams.set("utm_source", "whatsapp");
  u.searchParams.set("utm_medium", opts.medium ?? "whatsapp_t24");
  u.searchParams.set("utm_campaign", "pos_atendimento_review");
  return u.toString();
};

export interface ReviewRequestContext {
  clientName: string;
  service?: string; // ex.: "formatação de notebook"
  neighborhood?: string; // ex.: "Batel"
  technicianName?: string; // ex.: "Anderson"
}

const firstName = (name: string) => name.trim().split(/\s+/)[0] ?? name;

/**
 * Variações de gancho por serviço/sintoma — aumentam a taxa de resposta
 * porque a mensagem cita o resultado concreto entregue.
 */
const SERVICE_HOOKS: Array<{ match: RegExp; hook: string }> = [
  { match: /format|windows|lentid|lento/i, hook: "O computador está rodando redondo depois da formatação?" },
  { match: /montagem|pc gamer|gamer|upgrade/i, hook: "Como está o desempenho da máquina nos jogos e no dia a dia?" },
  { match: /not(e|ebook)|tela|dobradi|carcaça/i, hook: "O notebook voltou a funcionar direitinho?" },
  { match: /rede|wi-?fi|internet|roteador/i, hook: "O sinal de Wi-Fi ficou estável em todos os cômodos?" },
  { match: /v[ií]rus|malware|seguran/i, hook: "Está tudo limpo e seguro por aí desde a remoção?" },
  { match: /dado|backup|recupera/i, hook: "Conseguiu acessar todos os seus arquivos sem problema?" },
  { match: /impressora|perif/i, hook: "A impressora está imprimindo normalmente pela rede?" },
];

/** Escolhe a variação de gancho de acordo com o serviço/sintoma atendido. */
export const serviceHook = (service?: string): string => {
  if (!service) return "Ficou tudo certo com o atendimento?";
  return SERVICE_HOOKS.find((h) => h.match.test(service))?.hook ?? "Ficou tudo certo com o atendimento?";
};

/** Mensagem T+24h — pedido inicial, leve, personalizado e variado por serviço. */
export const buildT24Message = (ctx: ReviewRequestContext): string => {
  const nome = firstName(ctx.clientName);
  const bairro = ctx.neighborhood ? ` no ${ctx.neighborhood}` : "";
  const tech = ctx.technicianName ? `, do time do ${ctx.technicianName},` : "";
  return (
    `Olá, ${nome}! Aqui é da Técnico em Curitiba${tech} ${serviceHook(ctx.service)}${bairro ? ` (atendimento${bairro})` : ""}\n\n` +
    `Se ficou satisfeito com o atendimento, sua avaliação no Google ajuda muito ` +
    `outros moradores a encontrarem ajuda confiável. ` +
    `É 1 minutinho aqui ó: ${GOOGLE_REVIEW_URL} 🙏\n\n` +
    `Prefere avaliar direto no nosso site (com estrelas e autorização de publicação)? ` +
    `${buildSiteReviewUrl({ service: ctx.service, neighborhood: ctx.neighborhood, medium: "whatsapp_t24" })}\n\n` +
    `Qualquer ajuste ou dúvida, é só responder esta mensagem.`
  );
};

/** Mensagem T+72h — lembrete educado, valor + reciprocidade. */
export const buildT72Message = (ctx: ReviewRequestContext): string => {
  const nome = firstName(ctx.clientName);
  return (
    `Oi ${nome}! Passando rapidinho 😊 ` +
    `Sei que a rotina aperta, mas se sobrou 1 minuto e o serviço ficou bom, ` +
    `essa avaliação no Google faz uma diferença enorme para um negócio local ` +
    `como o nosso aqui em Curitiba: ${GOOGLE_REVIEW_URL}\n\n` +
    `Ou pelo site, em 30 segundos: ${buildSiteReviewUrl({ medium: "whatsapp_t72" })}\n\n` +
    `Se preferir, pode também responder aqui mesmo no WhatsApp com uma nota de 1 a 5 ` +
    `que eu publico com seu primeiro nome (sem expor telefone). Obrigado! 🚀`
  );
};

/** Monta a URL wa.me com a mensagem já encodada. */
export const buildWaMeUrl = (phoneE164: string, message: string): string => {
  const phone = phoneE164.replace(/\D/g, "");
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
};

/** Helpers para uso direto em botões do admin. */
export const t24WaLink = (phone: string, ctx: ReviewRequestContext) =>
  buildWaMeUrl(phone, buildT24Message(ctx));

export const t72WaLink = (phone: string, ctx: ReviewRequestContext) =>
  buildWaMeUrl(phone, buildT72Message(ctx));

/** Verifica se passaram >= N horas desde uma data ISO. */
export const hoursSince = (isoDate: string): number =>
  (Date.now() - new Date(isoDate).getTime()) / 36e5;

/** Classificação de janela: pronto-para-T24, pronto-para-T72 ou aguardar. */
export const reviewWindow = (
  serviceClosedAt: string,
): "wait" | "t24" | "t72" | "expired" => {
  const h = hoursSince(serviceClosedAt);
  if (h < 24) return "wait";
  if (h < 72) return "t24";
  if (h < 168) return "t72"; // até 7 dias
  return "expired";
};


/**
 * Mensagem enviada logo após a Ordem de Serviço (pré-OS em PDF): confirma o
 * atendimento e já entrega o link de avaliação com estrelas + autorização.
 */
export const buildPosOsMessage = (
  ctx: ReviewRequestContext & { osNumber?: string },
): string => {
  const nome = firstName(ctx.clientName);
  const os = ctx.osNumber ? ` (OS ${ctx.osNumber})` : "";
  return (
    `Olá, ${nome}! Seu atendimento${os} foi finalizado ✅\n` +
    `A Ordem de Serviço em PDF está anexada nesta conversa.\n\n` +
    `Se puder, avalie com estrelas e marque a autorização de publicação: ` +
    `${buildSiteReviewUrl({ service: ctx.service, neighborhood: ctx.neighborhood, os: ctx.osNumber, medium: "whatsapp_os" })}\n\n` +
    `Garantia e dúvidas: é só responder por aqui.`
  );
};

export const posOsWaLink = (
  phone: string,
  ctx: ReviewRequestContext & { osNumber?: string },
) => buildWaMeUrl(phone, buildPosOsMessage(ctx));

/**
 * Mensagem de agradecimento enviada quando a avaliação do cliente é aprovada
 * e publicada no site (fecha o ciclo e reforça a prova social).
 */
export const buildPublishedMessage = (
  ctx: ReviewRequestContext & { osNumber?: string },
): string => {
  const nome = firstName(ctx.clientName);
  const os = ctx.osNumber ? ` (OS ${ctx.osNumber})` : "";
  return (
    `Olá, ${nome}! Sua avaliação${os} foi publicada no nosso site ⭐\n` +
    `Muito obrigado por dedicar esse tempo — isso ajuda outros moradores de Curitiba ` +
    `a encontrarem atendimento confiável.\n\n` +
    `Ver no site: ${SITE_URL}/avaliacoes\n\n` +
    `Se quiser remover ou ajustar o depoimento, é só responder por aqui.`
  );
};

export const publishedWaLink = (
  phone: string,
  ctx: ReviewRequestContext & { osNumber?: string },
) => buildWaMeUrl(phone, buildPublishedMessage(ctx));

