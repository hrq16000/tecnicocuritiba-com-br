// Google Analytics & Ads tracking utilities — no UI imports here to keep the first load lean.

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
    __lastCtaLocation?: string;
    __lastCtaType?: 'whatsapp' | 'phone' | 'chatbot';
  }
}

const GA4_ID = 'G-B9VPHCZC10';
const ADS_ID = 'AW-17892118207';
const ADS_CONVERSION_LABEL = 'AW-17892118207/i5jSCMqi1JYcEL-d0NNC';

// Google Ads conversion with callback (mirrors gtag_report_conversion snippet)
export const gtagReportConversion = (url?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    const callback = () => {
      if (url) {
        window.location.href = url;
      }
    };
    window.gtag('event', 'conversion', {
      send_to: ADS_CONVERSION_LABEL,
      value: 1.0,
      currency: 'BRL',
      event_callback: callback,
    });
  } else if (url) {
    window.location.href = url;
  }
};

// Read UTM params from current URL (set by Ads autotag / SEO campaigns)
const getUtmContext = () => {
  if (typeof window === 'undefined') return {};
  const p = new URLSearchParams(window.location.search);
  return {
    utm_source: p.get('utm_source') || undefined,
    utm_medium: p.get('utm_medium') || undefined,
    utm_campaign: p.get('utm_campaign') || undefined,
    utm_term: p.get('utm_term') || undefined,
    utm_content: p.get('utm_content') || undefined,
    gclid: p.get('gclid') || undefined,
  };
};

// Device dimension: habilita relatório "conversões/CTR por dispositivo" no GA4
// (mobile/tablet/desktop), inferido por largura + ponteiro coarse.
const getDeviceContext = () => {
  if (typeof window === 'undefined') return { device: 'unknown' as const, viewport_width: 0 };
  const w = window.innerWidth || document.documentElement.clientWidth || 0;
  const coarse = typeof window.matchMedia === 'function' && window.matchMedia('(pointer: coarse)').matches;
  const device = w < 768 || coarse ? 'mobile' : w < 1024 ? 'tablet' : 'desktop';
  return { device, viewport_width: w };
};

// Lead dedup: gera/persiste um ID por sessão por tipo de CTA para evitar
// múltiplos `generate_lead` na mesma sessão (clicar 2x no WhatsApp = 1 lead).
const LEAD_KEY = 'lead_dedup_v1';
type LeadMap = Partial<Record<'whatsapp' | 'phone' | 'chatbot', string>>;
const readLeadMap = (): LeadMap => {
  try { return JSON.parse(sessionStorage.getItem(LEAD_KEY) || '{}') as LeadMap; } catch { return {}; }
};
const writeLeadMap = (m: LeadMap) => {
  try { sessionStorage.setItem(LEAD_KEY, JSON.stringify(m)); } catch { /* noop */ }
};
const ensureLeadId = (ctaType: 'whatsapp' | 'phone' | 'chatbot'): { leadId: string; isNew: boolean } => {
  const map = readLeadMap();
  if (map[ctaType]) return { leadId: map[ctaType]!, isNew: false };
  const leadId = `lead_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
  map[ctaType] = leadId;
  writeLeadMap(map);
  return { leadId, isNew: true };
};

// Track CTA clicks for conversions
export interface CTAContext {
  modalidade?: 'remoto' | 'visita' | 'coleta' | 'desconhecida' | 'unknown';
  problema?: string;   // slug do problema (/problemas/*) quando aplicável
  equipamento?: string;
  servico?: string;    // slug do serviço (/servicos/*)
}
// Fallback "unknown" — nunca perde o clique por falta de contexto.
const withUnknown = (v: string | undefined | null): string => {
  if (v === undefined || v === null) return 'unknown';
  const s = String(v).trim();
  return s === '' ? 'unknown' : s;
};
const normalizeCtx = (context: CTAContext = {}) => ({
  modalidade: withUnknown(context.modalidade),
  problema: withUnknown(context.problema),
  equipamento: withUnknown(context.equipamento),
  servico: withUnknown(context.servico),
});
export const trackCTAClick = (
  ctaType: 'whatsapp' | 'phone' | 'chatbot',
  location: string,
  context: CTAContext = {},
) => {
  const safeLocation = withUnknown(location);
  if (typeof window !== 'undefined') {
    window.__lastCtaType = ctaType;
    window.__lastCtaLocation = safeLocation;
    (window as unknown as { __ctaTracked?: { type: string; location: string; t: number } }).__ctaTracked = {
      type: ctaType,
      location: safeLocation,
      t: Date.now(),
    };
  }
  if (typeof window !== 'undefined' && window.gtag) {
    const utm = getUtmContext();
    const deviceCtx = getDeviceContext();
    const { leadId, isNew } = ensureLeadId(ctaType);
    const appVersion = (window as unknown as { __APP_VERSION__?: string }).__APP_VERSION__ || 'dev';
    const ctx = normalizeCtx(context);
    const payload = {
      event_category: 'engagement',
      event_label: `${ctaType}_${safeLocation}`,
      cta_type: ctaType,
      cta_location: safeLocation,
      click_location: safeLocation,
      page_path: window.location.pathname,
      value: 1,
      lead_id: leadId,
      app_version: appVersion,
      // Contexto de triagem — nunca envia undefined; ausência vira "unknown".
      ...ctx,
      ...deviceCtx,
      ...utm,
    };

    // cta_click sempre dispara (mede CTR / engajamento por dispositivo)
    window.gtag('event', 'cta_click', payload);

    // Eventos GA4 nomeados — facilitam Key Events e relatórios por dispositivo.
    if (ctaType === 'whatsapp') {
      window.gtag('event', 'click_whatsapp', payload);
    } else if (ctaType === 'phone') {
      window.gtag('event', 'click_call', payload);
    }

    // Event name específico por botão — ex.: click_whatsapp_hero_primary,
    // click_whatsapp_sticky_mobile, click_whatsapp_float, click_whatsapp_header.
    // Permite criar Key Events por origem sem depender só do param cta_location.
    const safeLoc = String(location).toLowerCase().replace(/[^a-z0-9_]+/g, '_').slice(0, 40);
    if (safeLoc) {
      const specific = ctaType === 'phone' ? `click_call_${safeLoc}` : `click_${ctaType}_${safeLoc}`;
      window.gtag('event', specific, payload);
    }

    // generate_lead + conversão do Ads disparam APENAS no primeiro clique da
    // sessão (dedup via lead_id em sessionStorage). Cliques repetidos viram
    // engajamento (cta_click) e não contam como novo lead/conversão.
    if (isNew && (ctaType === 'whatsapp' || ctaType === 'phone')) {
      window.gtag('event', 'generate_lead', {
        ...payload,
        currency: 'BRL',
        method: ctaType,
        // transaction_id deduplica o evento no GA4 caso o usuário recarregue.
        transaction_id: leadId,
      });
      gtagReportConversion();
    }

    // Visual debug for WhatsApp clicks (dev or ?debug_utm=1)
    if (ctaType === 'whatsapp') {
      const debugFlag =
        (import.meta as any).env?.DEV ||
        (typeof window !== 'undefined' &&
          (new URLSearchParams(window.location.search).get('debug_utm') === '1' ||
            window.localStorage.getItem('debug_utm') === '1'));
      // Console always for diagnostics
      // eslint-disable-next-line no-console
      console.log('[GA4 cta_click → WhatsApp]', payload);
      if (debugFlag) console.info('[GA4 debug]', { ...utm, location });
    }
  }
};

// Track social-share button clicks on blog posts (WhatsApp, Facebook, X, ...)
export const trackShareClick = (
  network: 'whatsapp' | 'facebook' | 'x' | 'twitter' | 'linkedin' | 'copy',
  context: { slug?: string; title?: string; url?: string; location?: string } = {},
) => {
  if (typeof window === 'undefined' || !window.gtag) return;
  const utm = getUtmContext();
  const deviceCtx = getDeviceContext();
  const payload = {
    event_category: 'engagement',
    event_label: `share_${network}`,
    method: network,
    content_type: 'article',
    item_id: context.slug || window.location.pathname,
    share_title: context.title,
    share_url: context.url || window.location.href,
    share_location: context.location || 'blog_post',
    page_path: window.location.pathname,
    ...deviceCtx,
    ...utm,
  };
  // GA4 canonical `share` event + custom `share_click` mirror for Looker.
  window.gtag('event', 'share', payload);
  window.gtag('event', 'share_click', payload);
};

// Track page views
export const trackPageView = (pagePath: string, pageTitle: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA4_ID, {
      page_path: pagePath,
      page_title: pageTitle
    });
  }
};

// ---------- Scroll depth (25/50/75/100) ----------
// Dispara GA4 `scroll_depth` com `percent_scrolled` uma vez por sessão+página.
// Dedup via sessionStorage para não inflar métricas em reloads.
const SCROLL_KEY = 'scroll_depth_v1';
const readScrollMap = (): Record<string, number[]> => {
  try { return JSON.parse(sessionStorage.getItem(SCROLL_KEY) || '{}'); } catch { return {}; }
};
const writeScrollMap = (m: Record<string, number[]>) => {
  try { sessionStorage.setItem(SCROLL_KEY, JSON.stringify(m)); } catch { /* noop */ }
};

export const trackScrollDepth = (percent: 25 | 50 | 75 | 100, pagePath: string) => {
  if (typeof window === 'undefined' || !window.gtag) return;
  const map = readScrollMap();
  const sent = map[pagePath] || [];
  if (sent.includes(percent)) return;
  sent.push(percent);
  map[pagePath] = sent;
  writeScrollMap(map);
  window.gtag('event', 'scroll_depth', {
    event_category: 'engagement',
    event_label: `${percent}%`,
    percent_scrolled: percent,
    page_path: pagePath,
    value: percent,
  });
};

// Attach once. Idempotent — safe to call from multiple mount points.
export const attachScrollDepthTracking = () => {
  if (typeof window === 'undefined') return;
  const w = window as unknown as { __scrollDepthBound?: boolean };
  if (w.__scrollDepthBound) return;
  w.__scrollDepthBound = true;

  const thresholds: Array<25 | 50 | 75 | 100> = [25, 50, 75, 100];
  let ticking = false;

  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const doc = document.documentElement;
      const scrollTop = window.scrollY || doc.scrollTop || 0;
      const winH = window.innerHeight || doc.clientHeight;
      const docH = Math.max(doc.scrollHeight, doc.offsetHeight) - winH;
      if (docH <= 0) { ticking = false; return; }
      const pct = Math.min(100, Math.round((scrollTop / docH) * 100));
      const pagePath = window.location.pathname;
      for (const t of thresholds) {
        if (pct >= t) trackScrollDepth(t, pagePath);
      }
      ticking = false;
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
};

