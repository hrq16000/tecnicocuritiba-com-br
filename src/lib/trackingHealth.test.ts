// @ts-nocheck — legacy file silenced during TanStack migration (see .lovable/migrate-to-tanstack/tsc-silenced.json)
import { describe, it, expect } from "vitest";
import {
  aggregateByDayRoute,
  fieldHealth,
  routeBaseline,
  detectDrops,
  MIN_SAMPLE_OPEN,
  type ClickEventRow,
} from "./trackingHealth";

const row = (over: Partial<ClickEventRow> = {}): ClickEventRow => ({
  event_type: "wa_funnel_open",
  path: "/servicos/conserto-tv",
  funnel_stage: "step_0",
  viewport_bucket: "mobile",
  attribution_channel: "organic",
  utm_source: null,
  created_at: "2026-08-08T10:00:00.000Z",
  ...over,
});

describe("trackingHealth", () => {
  it("agrupa por dia e rota e ignora eventos fora dos 4 do funil", () => {
    const buckets = aggregateByDayRoute([
      row(),
      row({ event_type: "wa_funnel_step" }),
      row({ event_type: "call_click" }),
      row({ path: "/servicos/conserto-placa" }),
    ]);
    expect(buckets).toHaveLength(2);
    const tv = buckets.find((b) => b.path === "/servicos/conserto-tv")!;
    expect(tv.counts.wa_funnel_open).toBe(1);
    expect(tv.counts.wa_funnel_step).toBe(1);
    expect(tv.total).toBe(2);
  });

  it("wa_click não é penalizado por não ter funnel_stage", () => {
    const buckets = aggregateByDayRoute([row({ event_type: "wa_click", funnel_stage: null })]);
    const stage = fieldHealth(buckets).find((f) => f.field === "funnel_stage")!;
    expect(stage.pct).toBe(100);
  });

  it("aponta campo obrigatório ausente", () => {
    const buckets = aggregateByDayRoute([row({ viewport_bucket: null })]);
    const vp = fieldHealth(buckets).find((f) => f.field === "viewport_bucket")!;
    expect(vp.pct).toBe(0);
    expect(vp.ok).toBe(false);
  });

  it("mantém AMOSTRA INSUFICIENTE abaixo do volume mínimo", () => {
    const buckets = aggregateByDayRoute([row(), row({ event_type: "wa_funnel_submit" })]);
    const [base] = routeBaseline(buckets);
    expect(base.status).toBe("AMOSTRA INSUFICIENTE");
    expect(base.conversao).toBeNull();
  });

  it("libera KPI ao atingir a amostra mínima", () => {
    const rows = [
      ...Array.from({ length: MIN_SAMPLE_OPEN }, () => row()),
      ...Array.from({ length: 6 }, () => row({ event_type: "wa_funnel_submit" })),
    ];
    const [base] = routeBaseline(aggregateByDayRoute(rows));
    expect(base.status).toBe("OK");
    expect(base.conversao).toBe(20);
  });

  it("detecta queda brusca por rota e evento", () => {
    const previous = aggregateByDayRoute(
      Array.from({ length: 20 }, () => row({ created_at: "2026-08-01T10:00:00.000Z" })),
    );
    const recent = aggregateByDayRoute(Array.from({ length: 3 }, () => row()));
    const alerts = detectDrops(recent, previous);
    expect(alerts[0]).toMatchObject({ event: "wa_funnel_open", dropPct: 85 });
  });

  it("não alerta quando o período anterior tem volume irrelevante", () => {
    const previous = aggregateByDayRoute([row({ created_at: "2026-08-01T10:00:00.000Z" })]);
    expect(detectDrops([], previous)).toHaveLength(0);
  });
});
