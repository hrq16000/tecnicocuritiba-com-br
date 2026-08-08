/**
 * Consentimento granular (LGPD + Google Consent Mode v2).
 *
 * Categorias:
 *  - `ads`      → cookies/scripts de publicidade de terceiros (AdSense)
 *  - `analytics`→ medição de audiência (GA4 e telemetria first-party do funil)
 *
 * Compatibilidade: mantém a chave legada `lgpd_consent_v1` sincronizada
 * ("granted" somente quando ads + analytics estão liberados), para não quebrar
 * `clickEvents.ts`, `adsense.ts` e a página /status-anuncios.
 */
export const CONSENT_KEY = "lgpd_consent_v2";
export const LEGACY_CONSENT_KEY = "lgpd_consent_v1";
export const CONSENT_CHANGED_EVENT = "lgpd:consent-changed";
export const CONSENT_OPEN_EVENT = "lgpd:consent-open";

export type ConsentState = { ads: boolean; analytics: boolean; decidedAt: string };

const safeParse = (raw: string | null): ConsentState | null => {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as Partial<ConsentState>;
    if (typeof parsed?.ads !== "boolean" || typeof parsed?.analytics !== "boolean") return null;
    return { ads: parsed.ads, analytics: parsed.analytics, decidedAt: parsed.decidedAt || "" };
  } catch {
    return null;
  }
};

/** Retorna a decisão salva, migrando a chave legada quando necessário. */
export const getConsent = (): ConsentState | null => {
  if (typeof window === "undefined") return null;
  try {
    const current = safeParse(localStorage.getItem(CONSENT_KEY));
    if (current) return current;
    const legacy = localStorage.getItem(LEGACY_CONSENT_KEY);
    if (legacy === "granted") return { ads: true, analytics: true, decidedAt: "" };
    if (legacy === "denied") return { ads: false, analytics: false, decidedAt: "" };
    return null;
  } catch {
    return null;
  }
};

export const hasAdsConsent = () => getConsent()?.ads === true;
export const hasAnalyticsConsent = () => getConsent()?.analytics === true;

/** Aplica a decisão no Consent Mode v2 (sinais separados de ads e analytics). */
export const applyConsentMode = (state: ConsentState) => {
  if (typeof window === "undefined" || !window.gtag) return;
  const ads = state.ads ? "granted" : "denied";
  const analytics = state.analytics ? "granted" : "denied";
  window.gtag("consent", "update", {
    ad_storage: ads,
    ad_user_data: ads,
    ad_personalization: ads,
    analytics_storage: analytics,
  });
};

/** Persiste, sincroniza a chave legada e notifica os ouvintes. */
export const setConsent = (partial: { ads: boolean; analytics: boolean }): ConsentState => {
  const state: ConsentState = { ...partial, decidedAt: new Date().toISOString() };
  try {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(state));
    localStorage.setItem(LEGACY_CONSENT_KEY, state.ads && state.analytics ? "granted" : "denied");
  } catch {
    /* storage indisponível: decisão vale apenas para a sessão atual */
  }
  applyConsentMode(state);
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(CONSENT_CHANGED_EVENT, { detail: state }));
  }
  return state;
};

/** Reabre o painel de preferências (usado no rodapé e na Política de Cookies). */
export const openConsentPreferences = () => {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(CONSENT_OPEN_EVENT));
};
