/**
 * Persistência dos eventos de funil/CTA na tabela pública `click_events`.
 *
 * Regras:
 * - Só grava os eventos da allowlist (mesma do CHECK constraint no banco).
 * - Respeita o consentimento LGPD (`lgpd_consent_v1`): sem "granted", não grava.
 * - Deduplica a mesma ação (evento + rota + cta + etapa) numa janela curta,
 *   evitando duplicatas por StrictMode, hidratação ou duplo clique.
 * - Falha silenciosa: medição nunca pode quebrar o fluxo de conversão.
 */
import { readUtms } from "./utmCapture";
import { getSessionId } from "./funnelSubmission";

export const CLICK_EVENT_ALLOWLIST = [
  "wa_funnel_open",
  "wa_funnel_step",
  "wa_funnel_submit",
  "wa_funnel_blocked",
  "wa_funnel_close",
  "wa_click",
  "call_click",
] as const;

export type ClickEventName = (typeof CLICK_EVENT_ALLOWLIST)[number];

const DEDUP_WINDOW_MS = 1500;
const recent = new Map<string, number>();

const str = (v: unknown, max: number): string | undefined => {
  if (v === null || v === undefined) return undefined;
  const s = String(v).trim();
  if (!s || s === "unknown" || s === "none") return undefined;
  return s.slice(0, max);
};

export function viewportBucket(): "mobile" | "tablet" | "desktop" | "unknown" {
  if (typeof window === "undefined") return "unknown";
  const w = window.innerWidth || document.documentElement.clientWidth || 0;
  if (!w) return "unknown";
  return w < 768 ? "mobile" : w < 1024 ? "tablet" : "desktop";
}

/** Canal de atribuição derivado dos UTMs da sessão + referrer. */
export function attributionChannel(): string {
  const utm = readUtms();
  if (utm.gclid || utm.utm_medium === "cpc" || utm.utm_medium === "ppc") return "paid_search";
  if (utm.utm_medium) return String(utm.utm_medium).slice(0, 40);
  if (utm.utm_source) return String(utm.utm_source).slice(0, 40);
  if (typeof document === "undefined") return "direct";
  const ref = document.referrer || "";
  if (!ref) return "direct";
  try {
    const host = new URL(ref).hostname.replace(/^www\./, "");
    if (typeof window !== "undefined" && host === window.location.hostname.replace(/^www\./, "")) return "internal";
    if (/google\.|bing\.|duckduckgo\.|yahoo\./.test(host)) return "organic_search";
    if (/facebook\.|instagram\.|linkedin\.|t\.co|x\.com/.test(host)) return "social";
    return "referral";
  } catch {
    return "referral";
  }
}

function consentGranted(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return localStorage.getItem("lgpd_consent_v1") === "granted";
  } catch {
    return false;
  }
}

function isDuplicate(key: string): boolean {
  const now = Date.now();
  for (const [k, t] of recent) if (now - t > DEDUP_WINDOW_MS) recent.delete(k);
  if (recent.has(key)) return true;
  recent.set(key, now);
  return false;
}

/**
 * Grava um evento de funil/CTA. Retorna `false` quando o evento foi ignorado
 * (fora da allowlist, sem consentimento, duplicado ou SSR).
 */
export function persistClickEvent(
  name: string,
  payload: Record<string, unknown> = {},
): boolean {
  if (typeof window === "undefined") return false;
  if (!(CLICK_EVENT_ALLOWLIST as readonly string[]).includes(name)) return false;
  if (!consentGranted()) return false;

  const path = window.location.pathname.slice(0, 300) || "/";
  const cta = str(payload.click_location ?? payload.cta_location, 80);
  const stage = str(payload.funnel_stage ?? payload.step, 40);
  if (isDuplicate([name, path, cta ?? "", stage ?? ""].join("|"))) return false;

  const utm = readUtms();
  const row = {
    event_type: name,
    path,
    cta_location: cta,
    funnel_stage: stage,
    viewport_bucket: viewportBucket(),
    attribution_channel: attributionChannel(),
    utm_source: str(utm.utm_source, 120),
    utm_medium: str(utm.utm_medium, 120),
    utm_campaign: str(utm.utm_campaign, 160),
    gclid: str(utm.gclid, 200),
    session_id: str(getSessionId(), 64),
    app_version: str(window.__APP_VERSION__ || "dev", 40),
    equipamento: str(payload.equipamento, 80),
    sintoma: str(payload.sintoma, 120),
  };

  void (async () => {
    try {
      const { supabase } = await import("@/integrations/supabase/client");
      await supabase.from("click_events").insert(row);
    } catch {
      /* medição nunca bloqueia conversão */
    }
  })();

  return true;
}
