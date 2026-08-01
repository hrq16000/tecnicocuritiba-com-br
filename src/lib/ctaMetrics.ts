// Agregador local (localStorage) de cliques de CTA por cidade/bairro.
// Sem backend: alimenta o painel /admin/metricas para acompanhar conversão
// por rota. Mantém no máximo MAX_EVENTS eventos (janela deslizante).

export type CtaKind = "whatsapp" | "phone";

export interface CtaMetricEvent {
  t: number;              // timestamp
  kind: CtaKind;
  location: string;       // click_location
  route: string;          // pathname
  cidade: string;
  bairro: string;
  servico: string;
  category: string;
  symptom: string;
  modalidade: string;
  /** Origem da campanha no momento do clique (utm_source ou "unknown"). */
  utmSource?: string;
  /** Google Ads click id quando presente na sessão. */
  gclid?: string;
}

/** Janelas de análise suportadas pelo painel. */
export type MetricsWindow = "24h" | "7d" | "30d" | "all";

const WINDOW_MS: Record<MetricsWindow, number> = {
  "24h": 24 * 60 * 60 * 1000,
  "7d": 7 * 24 * 60 * 60 * 1000,
  "30d": 30 * 24 * 60 * 60 * 1000,
  all: Number.POSITIVE_INFINITY,
};

export const filterByWindow = (
  events: CtaMetricEvent[],
  window: MetricsWindow,
  now = Date.now(),
): CtaMetricEvent[] => {
  const span = WINDOW_MS[window];
  if (!Number.isFinite(span)) return events;
  return events.filter((e) => now - e.t <= span);
};

const KEY = "cta_metrics_v1";
const MAX_EVENTS = 800;

const read = (): CtaMetricEvent[] => {
  if (typeof window === "undefined") return [];
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) || "[]");
    return Array.isArray(raw) ? (raw as CtaMetricEvent[]) : [];
  } catch {
    return [];
  }
};

const write = (list: CtaMetricEvent[]) => {
  try {
    localStorage.setItem(KEY, JSON.stringify(list.slice(-MAX_EVENTS)));
  } catch {
    /* quota — ignora */
  }
};

/**
 * Deriva cidade/bairro da rota quando o contexto não trouxe explicitamente.
 * Suporta /atendimento/:cidade(/:bairro) e /servicos/:servico/:bairro.
 */
export const inferGeoFromRoute = (route: string): { cidade: string; bairro: string } => {
  const parts = route.split("/").filter(Boolean);
  if (parts[0] === "atendimento") return { cidade: parts[1] || "unknown", bairro: parts[2] || "unknown" };
  if (parts[0] === "bairros") return { cidade: "curitiba", bairro: parts[1] || "unknown" };
  return { cidade: "unknown", bairro: "unknown" };
};

export const recordCtaMetric = (e: Omit<CtaMetricEvent, "t">) => {
  if (typeof window === "undefined") return;
  const list = read();
  list.push({ ...e, t: Date.now() });
  write(list);
};

export const getCtaMetrics = (): CtaMetricEvent[] => read();

export const clearCtaMetrics = () => {
  try {
    localStorage.removeItem(KEY);
  } catch {
    /* noop */
  }
};

export interface GeoAggregate {
  cidade: string;
  bairro: string;
  whatsapp: number;
  phone: number;
  total: number;
  lastAt: number;
  routes: string[];
}

export const aggregateByGeo = (events: CtaMetricEvent[] = read()): GeoAggregate[] => {
  const map = new Map<string, GeoAggregate>();
  for (const e of events) {
    const key = `${e.cidade}|${e.bairro}`;
    const cur =
      map.get(key) ||
      ({ cidade: e.cidade, bairro: e.bairro, whatsapp: 0, phone: 0, total: 0, lastAt: 0, routes: [] } as GeoAggregate);
    if (e.kind === "phone") cur.phone += 1;
    else cur.whatsapp += 1;
    cur.total += 1;
    cur.lastAt = Math.max(cur.lastAt, e.t);
    if (!cur.routes.includes(e.route)) cur.routes.push(e.route);
    map.set(key, cur);
  }
  return [...map.values()].sort((a, b) => b.total - a.total);
};

const csvCell = (v: unknown): string => {
  const s = String(v ?? "");
  // Neutraliza fórmulas (CSV injection) e escapa aspas/quebras.
  const safe = /^[=+\-@]/.test(s) ? `'${s}` : s;
  return `"${safe.replace(/"/g, '""')}"`;
};

/** CSV agregado por cidade/bairro para a janela escolhida. */
export const buildGeoCsv = (window: MetricsWindow = "30d", events: CtaMetricEvent[] = read()): string => {
  const scoped = filterByWindow(events, window);
  const rows = aggregateByGeo(scoped);
  const header = ["janela", "cidade", "bairro", "whatsapp", "ligacoes", "total", "ultimo_clique", "rotas"];
  const lines = [header.map(csvCell).join(",")];
  for (const r of rows) {
    lines.push(
      [
        window,
        r.cidade,
        r.bairro,
        r.whatsapp,
        r.phone,
        r.total,
        r.lastAt ? new Date(r.lastAt).toISOString() : "",
        r.routes.join(" | "),
      ]
        .map(csvCell)
        .join(","),
    );
  }
  return `\ufeff${lines.join("\n")}\n`;
};

/** CSV bruto (um evento por linha) — útil para cruzar com o GA4. */
export const buildEventsCsv = (window: MetricsWindow = "30d", events: CtaMetricEvent[] = read()): string => {
  const scoped = filterByWindow(events, window);
  const header = [
    "data", "tipo", "origem_botao", "rota", "cidade", "bairro",
    "servico", "categoria", "sintoma", "modalidade", "utm_source", "gclid",
  ];
  const lines = [header.map(csvCell).join(",")];
  for (const e of scoped) {
    lines.push(
      [
        new Date(e.t).toISOString(), e.kind, e.location, e.route, e.cidade, e.bairro,
        e.servico, e.category, e.symptom, e.modalidade, e.utmSource || "unknown", e.gclid || "unknown",
      ]
        .map(csvCell)
        .join(","),
    );
  }
  return `\ufeff${lines.join("\n")}\n`;
};

/** Dispara o download de um CSV no browser. */
export const downloadCsv = (filename: string, csv: string) => {
  if (typeof window === "undefined") return;
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
};
