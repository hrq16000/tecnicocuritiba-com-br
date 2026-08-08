/**
 * Agregações puras de saúde da mensuração do funil (tabela `click_events`).
 *
 * Sem I/O e sem dependência de React — a página de admin apenas consome.
 * Regra de baseline: KPI só é reportado quando há amostra mínima; abaixo disso
 * o status é "AMOSTRA INSUFICIENTE" (nunca inventar taxa com volume irrelevante).
 */

export const FUNNEL_EVENTS = [
  "wa_funnel_open",
  "wa_funnel_step",
  "wa_funnel_submit",
  "wa_click",
] as const;

export type FunnelEvent = (typeof FUNNEL_EVENTS)[number];

/** Campos obrigatórios de contexto — ausência indica instrumentação quebrada. */
export const REQUIRED_FIELDS = ["origem", "viewport_bucket", "funnel_stage"] as const;
export type RequiredField = (typeof REQUIRED_FIELDS)[number];

/** Amostra mínima por rota para liberar KPI de conversão do baseline. */
export const MIN_SAMPLE_OPEN = 30;
/** Queda relativa (vs. período anterior) que dispara alerta. */
export const DROP_ALERT_RATIO = 0.5;

export interface ClickEventRow {
  event_type: string;
  path: string | null;
  funnel_stage: string | null;
  viewport_bucket: string | null;
  attribution_channel: string | null;
  utm_source: string | null;
  created_at: string;
}

const isFunnelEvent = (v: string): v is FunnelEvent =>
  (FUNNEL_EVENTS as readonly string[]).includes(v);

export const dayKey = (iso: string): string => iso.slice(0, 10);

const emptyCounts = (): Record<FunnelEvent, number> => ({
  wa_funnel_open: 0,
  wa_funnel_step: 0,
  wa_funnel_submit: 0,
  wa_click: 0,
});

export interface DayRouteBucket {
  day: string;
  path: string;
  counts: Record<FunnelEvent, number>;
  total: number;
  /** Quantos eventos têm cada campo obrigatório preenchido. */
  filled: Record<RequiredField, number>;
}

/**
 * `funnel_stage` só é exigido nos eventos do funil que possuem etapa.
 * `wa_click` é um clique fora do fluxo, então não conta como campo faltante.
 */
const requiresStage = (event: string) => event !== "wa_click";

export function aggregateByDayRoute(rows: ClickEventRow[]): DayRouteBucket[] {
  const map = new Map<string, DayRouteBucket>();
  for (const row of rows) {
    if (!isFunnelEvent(row.event_type)) continue;
    const path = row.path || "/";
    const day = dayKey(row.created_at);
    const key = `${day}::${path}`;
    let bucket = map.get(key);
    if (!bucket) {
      bucket = {
        day,
        path,
        counts: emptyCounts(),
        total: 0,
        filled: { origem: 0, viewport_bucket: 0, funnel_stage: 0 },
      };
      map.set(key, bucket);
    }
    bucket.counts[row.event_type] += 1;
    bucket.total += 1;
    if (row.utm_source || row.attribution_channel) bucket.filled.origem += 1;
    if (row.viewport_bucket) bucket.filled.viewport_bucket += 1;
    if (row.funnel_stage || !requiresStage(row.event_type)) bucket.filled.funnel_stage += 1;
  }
  return [...map.values()].sort(
    (a, b) => b.day.localeCompare(a.day) || a.path.localeCompare(b.path),
  );
}

export interface FieldHealth {
  field: RequiredField;
  filled: number;
  total: number;
  /** 0–100; 100 = todos os eventos com o campo preenchido. */
  pct: number;
  ok: boolean;
}

export function fieldHealth(buckets: DayRouteBucket[]): FieldHealth[] {
  const total = buckets.reduce((acc, b) => acc + b.total, 0);
  return REQUIRED_FIELDS.map((field) => {
    const filled = buckets.reduce((acc, b) => acc + b.filled[field], 0);
    const pct = total ? Math.round((filled / total) * 100) : 0;
    return { field, filled, total, pct, ok: total === 0 ? true : pct >= 95 };
  });
}

export interface RouteBaseline {
  path: string;
  opens: number;
  steps: number;
  submits: number;
  clicks: number;
  /** null quando a amostra é insuficiente — nunca estimar com volume baixo. */
  conversao: number | null;
  status: "OK" | "AMOSTRA INSUFICIENTE";
}

export function routeBaseline(buckets: DayRouteBucket[]): RouteBaseline[] {
  const map = new Map<string, RouteBaseline>();
  for (const b of buckets) {
    const cur = map.get(b.path) ?? {
      path: b.path,
      opens: 0,
      steps: 0,
      submits: 0,
      clicks: 0,
      conversao: null,
      status: "AMOSTRA INSUFICIENTE" as const,
    };
    cur.opens += b.counts.wa_funnel_open;
    cur.steps += b.counts.wa_funnel_step;
    cur.submits += b.counts.wa_funnel_submit;
    cur.clicks += b.counts.wa_click;
    map.set(b.path, cur);
  }
  return [...map.values()]
    .map((r) => {
      const enough = r.opens >= MIN_SAMPLE_OPEN;
      return {
        ...r,
        conversao: enough ? Math.round((r.submits / r.opens) * 1000) / 10 : null,
        status: enough ? ("OK" as const) : ("AMOSTRA INSUFICIENTE" as const),
      };
    })
    .sort((a, b) => b.opens - a.opens);
}

export interface DropAlert {
  path: string;
  event: FunnelEvent;
  recent: number;
  previous: number;
  dropPct: number;
}

/**
 * Compara a janela recente com a janela anterior de mesmo tamanho e sinaliza
 * quedas relevantes. Exige volume mínimo no período anterior para evitar
 * alarme falso com 1–2 eventos.
 */
export function detectDrops(
  recent: DayRouteBucket[],
  previous: DayRouteBucket[],
  minPrevious = 10,
): DropAlert[] {
  const sum = (list: DayRouteBucket[], path: string, event: FunnelEvent) =>
    list.filter((b) => b.path === path).reduce((acc, b) => acc + b.counts[event], 0);

  const paths = new Set([...previous.map((b) => b.path), ...recent.map((b) => b.path)]);
  const alerts: DropAlert[] = [];
  for (const path of paths) {
    for (const event of FUNNEL_EVENTS) {
      const prev = sum(previous, path, event);
      if (prev < minPrevious) continue;
      const rec = sum(recent, path, event);
      if (rec <= prev * DROP_ALERT_RATIO) {
        alerts.push({
          path,
          event,
          recent: rec,
          previous: prev,
          dropPct: Math.round((1 - rec / prev) * 100),
        });
      }
    }
  }
  return alerts.sort((a, b) => b.dropPct - a.dropPct);
}
