import { trackCTAClick } from "./analytics";

/**
 * Rastreio GA4 dos CTAs empresariais (WhatsApp / ligação).
 * Segmenta por faixa de viewport (360/390/430) e registra a origem do usuário
 * (referrer + utm já capturados pelo analytics), sem alterar rotas ou schema.
 */

export type B2BCtaType = "whatsapp" | "phone";

/** Faixa de viewport usada nos gates visuais 3S/3T. */
export const viewportBucket = (width?: number): string => {
  const w = width ?? (typeof window !== "undefined" ? window.innerWidth : 0);
  if (!w) return "desconhecido";
  if (w <= 375) return "360";
  if (w <= 410) return "390";
  if (w <= 480) return "430";
  if (w < 1024) return "tablet";
  return "desktop";
};

const originOf = (): string => {
  if (typeof document === "undefined") return "desconhecido";
  const ref = document.referrer;
  if (!ref) return "direto";
  try {
    const url = new URL(ref);
    if (url.host === window.location.host) return `interno:${url.pathname}`;
    return `externo:${url.host}`;
  } catch {
    return "desconhecido";
  }
};

export const trackBusinessCTA = (
  ctaType: B2BCtaType,
  ctaLocation: string,
  extra: Record<string, unknown> = {},
) => {
  const bucket = viewportBucket();
  trackCTAClick(ctaType, ctaLocation, {
    origem: originOf(),
    ...extra,
  } as Record<string, unknown>);

  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "b2b_cta_click", {
      event_category: "engagement_b2b",
      event_label: `${ctaType}_${ctaLocation}`,
      cta_type: ctaType,
      cta_location: ctaLocation,
      viewport_bucket: bucket,
      viewport_width: window.innerWidth,
      origem: originOf(),
      page_path: window.location.pathname,
      ...extra,
    });
  }

  if (typeof window !== "undefined") {
    (window as unknown as { __lastB2BCta?: Record<string, unknown> }).__lastB2BCta = {
      ctaType,
      ctaLocation,
      viewport_bucket: bucket,
    };
  }
};

export default trackBusinessCTA;
