import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { PageSEO } from "@/components/PageSEO";
import { Button } from "@/components/ui/button";
import { aggregateByGeo, clearCtaMetrics, getCtaMetrics, type CtaMetricEvent } from "@/lib/ctaMetrics";

const WINDOWS = [
  { label: "24h", ms: 24 * 60 * 60 * 1000 },
  { label: "7 dias", ms: 7 * 24 * 60 * 60 * 1000 },
  { label: "30 dias", ms: 30 * 24 * 60 * 60 * 1000 },
  { label: "Tudo", ms: Number.POSITIVE_INFINITY },
];

const fmt = (t: number) => (t ? new Date(t).toLocaleString("pt-BR") : "—");

/**
 * Painel simples de conversão por rota: agrega cliques de WhatsApp e ligação
 * por cidade/bairro a partir do storage local (`cta_metrics_v1`).
 */
const AdminMetricas = () => {
  const [events, setEvents] = useState<CtaMetricEvent[]>([]);
  const [windowMs, setWindowMs] = useState(WINDOWS[1].ms);

  useEffect(() => {
    setEvents(getCtaMetrics());
  }, []);

  const filtered = useMemo(() => {
    const min = Date.now() - windowMs;
    return events.filter((e) => e.t >= min);
  }, [events, windowMs]);

  const rows = useMemo(() => aggregateByGeo(filtered), [filtered]);
  const totals = useMemo(
    () => ({
      whatsapp: filtered.filter((e) => e.kind === "whatsapp").length,
      phone: filtered.filter((e) => e.kind === "phone").length,
      rotas: new Set(filtered.map((e) => e.route)).size,
    }),
    [filtered],
  );

  return (
    <div className="min-h-screen bg-background">
      <PageSEO
        title="Métricas de Conversão por Rota | Admin"
        description="Painel interno de cliques em WhatsApp e ligações por cidade e bairro."
        path="/admin/metricas"
        noindex
      />
      <main className="container mx-auto px-4 py-10 max-w-5xl">
        <h1 className="text-3xl font-heading font-bold text-foreground mb-2">Conversão por cidade e bairro</h1>
        <p className="text-muted-foreground mb-6 text-sm">
          Cliques de WhatsApp e ligação registrados neste dispositivo. Use junto do GA4 para validar a
          instrumentação por rota.
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {WINDOWS.map((w) => (
            <Button
              key={w.label}
              size="sm"
              variant={windowMs === w.ms ? "default" : "outline"}
              onClick={() => setWindowMs(w.ms)}
            >
              {w.label}
            </Button>
          ))}
          <Button
            size="sm"
            variant="ghost"
            onClick={() => {
              clearCtaMetrics();
              setEvents([]);
            }}
          >
            Limpar
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-8">
          {[
            { label: "WhatsApp", value: totals.whatsapp },
            { label: "Ligações", value: totals.phone },
            { label: "Rotas ativas", value: totals.rotas },
          ].map((c) => (
            <div key={c.label} className="rounded-xl border border-border bg-card p-4">
              <div className="text-xs text-muted-foreground">{c.label}</div>
              <div className="text-2xl font-bold text-foreground">{c.value}</div>
            </div>
          ))}
        </div>

        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm" data-testid="metrics-table">
            <thead className="bg-secondary text-left">
              <tr>
                <th className="p-3">Cidade</th>
                <th className="p-3">Bairro</th>
                <th className="p-3 text-right">WhatsApp</th>
                <th className="p-3 text-right">Ligações</th>
                <th className="p-3 text-right">Total</th>
                <th className="p-3">Último clique</th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-6 text-center text-muted-foreground">
                    Nenhum clique registrado nesta janela.
                  </td>
                </tr>
              )}
              {rows.map((r) => (
                <tr key={`${r.cidade}-${r.bairro}`} className="border-t border-border">
                  <td className="p-3 capitalize">{r.cidade.replace(/-/g, " ")}</td>
                  <td className="p-3 capitalize">{r.bairro.replace(/-/g, " ")}</td>
                  <td className="p-3 text-right">{r.whatsapp}</td>
                  <td className="p-3 text-right">{r.phone}</td>
                  <td className="p-3 text-right font-semibold">{r.total}</td>
                  <td className="p-3 text-muted-foreground">{fmt(r.lastAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-6 text-sm">
          <Link to="/admin/funnel" className="text-primary underline">
            Ver diagnósticos do funil
          </Link>
        </p>
      </main>
    </div>
  );
};

export default AdminMetricas;
