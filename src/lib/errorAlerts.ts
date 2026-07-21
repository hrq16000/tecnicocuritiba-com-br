// Agregação local de eventos de erro para alertar o admin quando há
// picos que impactam conversão. Grava em localStorage (janela 24h).
// Instrumentado por `trackInternalLink` e `trackCTAClick` em analytics.ts.

const KEY = "error_alerts_v1";
const WINDOW_MS = 24 * 60 * 60 * 1000;

export type AlertEventKind =
  | "internal_link_broken"
  | "unknown_modalidade"
  | "unknown_problema"
  | "obrigado_modalidade_invalida";

export interface AlertEvent {
  ts: number;
  kind: AlertEventKind;
  from?: string;
  to?: string;
  label?: string;
  route?: string;
}

interface AlertStore {
  events: AlertEvent[];
}

const read = (): AlertStore => {
  if (typeof window === "undefined") return { events: [] };
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { events: [] };
    const parsed = JSON.parse(raw) as AlertStore;
    const cutoff = Date.now() - WINDOW_MS;
    return { events: (parsed.events || []).filter((e) => e.ts >= cutoff) };
  } catch {
    return { events: [] };
  }
};

const write = (store: AlertStore) => {
  if (typeof window === "undefined") return;
  try {
    // Cap defensivo: 500 eventos.
    const trimmed = store.events.slice(-500);
    localStorage.setItem(KEY, JSON.stringify({ events: trimmed }));
  } catch {
    /* noop */
  }
};

export function recordAlertEvent(ev: Omit<AlertEvent, "ts">) {
  const store = read();
  store.events.push({ ...ev, ts: Date.now() });
  write(store);
}

export interface AlertSummary {
  total: number;
  brokenLinks: number;
  unknownModalidade: number;
  unknownProblema: number;
  obrigadoInvalido: number;
  topBrokenLinks: Array<{ from: string; to: string; count: number }>;
  hasCritical: boolean; // true se qualquer contador estourar threshold
  events: AlertEvent[];
}

export const THRESHOLDS = {
  brokenLinks: 0,       // qualquer link quebrado é crítico
  unknownModalidade: 5,
  unknownProblema: 5,
  obrigadoInvalido: 1,
};

export function getAlertSummary(): AlertSummary {
  const { events } = read();
  const brokenLinks = events.filter((e) => e.kind === "internal_link_broken");
  const unknownMod = events.filter((e) => e.kind === "unknown_modalidade").length;
  const unknownPrb = events.filter((e) => e.kind === "unknown_problema").length;
  const obrigado = events.filter((e) => e.kind === "obrigado_modalidade_invalida").length;

  // Top links quebrados (from -> to)
  const buckets = new Map<string, { from: string; to: string; count: number }>();
  for (const e of brokenLinks) {
    const key = `${e.from || "?"}|${e.to || "?"}`;
    const b = buckets.get(key);
    if (b) b.count++;
    else buckets.set(key, { from: e.from || "?", to: e.to || "?", count: 1 });
  }
  const top = [...buckets.values()].sort((a, b) => b.count - a.count).slice(0, 10);

  const hasCritical =
    brokenLinks.length > THRESHOLDS.brokenLinks ||
    unknownMod > THRESHOLDS.unknownModalidade ||
    unknownPrb > THRESHOLDS.unknownProblema ||
    obrigado > THRESHOLDS.obrigadoInvalido;

  return {
    total: events.length,
    brokenLinks: brokenLinks.length,
    unknownModalidade: unknownMod,
    unknownProblema: unknownPrb,
    obrigadoInvalido: obrigado,
    topBrokenLinks: top,
    hasCritical,
    events,
  };
}

export function clearAlerts() {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(KEY);
  } catch {
    /* noop */
  }
}
