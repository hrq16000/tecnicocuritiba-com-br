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
}

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
