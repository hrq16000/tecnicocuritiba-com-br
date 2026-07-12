/**
 * Diagnóstico runtime do funil WhatsApp.
 *
 * Grava um ring-buffer de eventos em `localStorage` para:
 * - reproduzir a causa exata quando "Agendar agora" reinicia o funil;
 * - inspecionar histórico do usuário atual dentro do painel admin.
 *
 * Também emite `console.debug` quando `window.__funnelDebug = true`,
 * e reencaminha para GA4 via o pipeline `funnelAnalytics.track`.
 */
const KEY = "wa_funnel_diag_v1";
const MAX = 60;

export type FunnelDiagEvent = {
  ts: number;               // epoch ms
  name: string;             // ex: "open", "step", "submit_start", "submit_error", "cta_click", "reset"
  step?: number;
  data?: Record<string, unknown>;
};

function safeRead(): FunnelDiagEvent[] {
  if (typeof localStorage === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function safeWrite(events: FunnelDiagEvent[]) {
  if (typeof localStorage === "undefined") return;
  try {
    localStorage.setItem(KEY, JSON.stringify(events.slice(-MAX)));
  } catch {
    /* quota excedida etc. */
  }
}

export function logFunnelDiag(name: string, data?: Record<string, unknown>, step?: number) {
  const ev: FunnelDiagEvent = { ts: Date.now(), name, step, data };
  const buf = safeRead();
  buf.push(ev);
  safeWrite(buf);
  if (typeof window !== "undefined" && (window as unknown as { __funnelDebug?: boolean }).__funnelDebug) {
    // eslint-disable-next-line no-console
    console.debug(`[funnel:diag] ${name}`, ev);
  }
}

export function readFunnelDiag(): FunnelDiagEvent[] {
  return safeRead();
}

export function clearFunnelDiag() {
  if (typeof localStorage === "undefined") return;
  try { localStorage.removeItem(KEY); } catch { /* noop */ }
}

// Expõe helpers no window para inspeção via DevTools.
if (typeof window !== "undefined") {
  (window as unknown as {
    __funnelDiag?: () => FunnelDiagEvent[];
    __funnelDiagClear?: () => void;
  }).__funnelDiag = readFunnelDiag;
  (window as unknown as { __funnelDiagClear?: () => void }).__funnelDiagClear = clearFunnelDiag;
}
