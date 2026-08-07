/**
 * Fonte única dos espaços patrocinados do portal.
 *
 * Regras de negócio (não alterar sem revisar `scripts/check-ad-slots.mjs`):
 * - Todo slot exibe o rótulo "Publicidade" (disclosure obrigatório).
 * - Nenhum slot pode ficar acima da dobra (bloquearia o LCP e o CTA principal).
 * - Links externos sempre `rel="sponsored nofollow noopener"` (não passam PageRank).
 * - Sem patrocinador ativo, exibimos um "house ad" interno (nunca área vazia,
 *   evitando CLS e mantendo o inventário visível para futuros anunciantes).
 */

export type SponsorPlacement = "home-inline" | "problema-inline" | "servico-inline";

export interface SponsorCreative {
  /** Identificador estável usado em analytics (`ad_impression` / `ad_click`). */
  id: string;
  placement: SponsorPlacement;
  advertiser: string;
  headline: string;
  description: string;
  ctaLabel: string;
  /** URL externa do patrocinador ou rota interna (house ad). */
  href: string;
  /** House ads são conteúdo próprio: link interno, sem `sponsored`. */
  house?: boolean;
}

/**
 * Inventário atual. Enquanto não houver anunciante pago, mantemos apenas
 * house ads apontando para páginas de alta conversão do próprio portal.
 */
export const SPONSOR_CREATIVES: SponsorCreative[] = [
  {
    id: "house-orcamento-whatsapp",
    placement: "home-inline",
    advertiser: "Técnico em Curitiba",
    headline: "Orçamento no mesmo dia pelo WhatsApp",
    description:
      "Diagnóstico a partir de R$ 99,99, com garantia na mão de obra e coleta em Curitiba e região.",
    ctaLabel: "Pedir orçamento",
    href: "/valores",
    house: true,
  },
  {
    id: "house-diagnostico-60s",
    placement: "problema-inline",
    advertiser: "Técnico em Curitiba",
    headline: "Diagnóstico rápido em 60 segundos",
    description:
      "Responda 4 perguntas e descubra se o seu caso resolve remoto, em domicílio ou com coleta.",
    ctaLabel: "Fazer diagnóstico",
    href: "/diagnostico-60s",
    house: true,
  },
  {
    id: "house-suporte-empresas",
    placement: "servico-inline",
    advertiser: "Técnico em Curitiba",
    headline: "Suporte de TI para empresas em Curitiba",
    description:
      "Atendimento avulso ou recorrente para escritórios, clínicas e comércios da RMC.",
    ctaLabel: "Ver suporte empresarial",
    href: "/suporte-empresas",
    house: true,
  },
];

export const getSponsorsFor = (placement: SponsorPlacement) =>
  SPONSOR_CREATIVES.filter((creative) => creative.placement === placement);
