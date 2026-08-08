/**
 * Mídia kit (PDF) — fonte única do caminho do arquivo + evento GA4.
 *
 * O rastreamento distingue a origem do clique (`cta_principal`, `documentos`,
 * `rodape`) para comparar desempenho entre o CTA da página /patrocinadores e o
 * link do rodapé. Respeita o Consent Mode v2: `window.gtag` só envia quando o
 * consentimento de analytics foi concedido.
 */
export const MEDIA_KIT_PDF = "/downloads/midia-kit-tecnico-curitiba.pdf";

export type MediaKitSource = "cta_principal" | "documentos" | "rodape";

export const trackMediaKitDownload = (source: MediaKitSource) => {
  if (typeof window === "undefined") return;
  try {
    window.gtag?.("event", "media_kit_download", {
      event_category: "monetizacao",
      event_label: `media_kit_${source}`,
      source,
      page_path: window.location.pathname,
    });
  } catch {
    /* noop */
  }
};
