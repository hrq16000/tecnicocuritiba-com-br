import { useCallback, useEffect, useMemo, useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, RefreshCw, AlertTriangle, CheckCircle2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import {
  aggregateByDayRoute,
  fieldHealth,
  routeBaseline,
  detectDrops,
  FUNNEL_EVENTS,
  MIN_SAMPLE_OPEN,
  type ClickEventRow,
} from "@/lib/trackingHealth";

const WINDOW_DAYS = 7;
const ROW_LIMIT = 5000;

const isoDaysAgo = (days: number) =>
  new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();

export default function AdminTracking() {
  const { loading: authLoading, session, isAdmin } = useAdminAuth();
  const [rows, setRows] = useState<ClickEventRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    const { data, error: err } = await supabase
      .from("click_events")
      .select("event_type,path,funnel_stage,viewport_bucket,attribution_channel,utm_source,created_at")
      .gte("created_at", isoDaysAgo(WINDOW_DAYS * 2))
      .order("created_at", { ascending: false })
      .limit(ROW_LIMIT);
    if (err) setError(err.message);
    setRows((data as ClickEventRow[] | null) ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (isAdmin) void load();
  }, [isAdmin, load]);

  const cutoff = useMemo(() => isoDaysAgo(WINDOW_DAYS), []);
  const recentRows = useMemo(() => rows.filter((r) => r.created_at >= cutoff), [rows, cutoff]);
  const previousRows = useMemo(() => rows.filter((r) => r.created_at < cutoff), [rows, cutoff]);

  const buckets = useMemo(() => aggregateByDayRoute(recentRows), [recentRows]);
  const health = useMemo(() => fieldHealth(buckets), [buckets]);
  const baseline = useMemo(() => routeBaseline(buckets), [buckets]);
  const alerts = useMemo(
    () => detectDrops(buckets, aggregateByDayRoute(previousRows)),
    [buckets, previousRows],
  );

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }
  if (!session || !isAdmin) return <Navigate to="/admin/login" replace />;

  return (
    <>
      <Helmet>
        <title>Saúde do tracking | Admin</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>
      <Header />
      <main id="main-content" className="container mx-auto max-w-6xl px-4 py-24">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-extrabold">Saúde do tracking</h1>
            <p className="text-sm text-muted-foreground">
              Últimos {WINDOW_DAYS} dias · eventos do funil por dia e rota, integridade de campos e quedas bruscas.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link to="/admin/funnel">Leads do funil</Link>
            </Button>
            <Button size="sm" onClick={() => void load()} disabled={loading}>
              <RefreshCw className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              Atualizar
            </Button>
          </div>
        </div>

        {error ? (
          <Card className="mb-6 border-destructive/40 p-4 text-sm text-destructive">{error}</Card>
        ) : null}

        {/* Integridade dos campos obrigatórios */}
        <section className="mb-8 grid gap-3 sm:grid-cols-3">
          {health.map((f) => (
            <Card key={f.field} className="p-4">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">{f.field}</p>
              <p className={`text-2xl font-extrabold ${f.ok ? "text-emerald-500" : "text-destructive"}`}>
                {f.pct}%
              </p>
              <p className="text-xs text-muted-foreground">
                {f.filled} de {f.total} eventos preenchidos
              </p>
            </Card>
          ))}
        </section>

        {/* Alertas de queda */}
        <section className="mb-8">
          <h2 className="mb-3 text-lg font-bold">Alertas de queda</h2>
          {alerts.length === 0 ? (
            <Card className="flex items-center gap-2 p-4 text-sm text-muted-foreground">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              Nenhuma queda relevante frente aos {WINDOW_DAYS} dias anteriores.
            </Card>
          ) : (
            <div className="grid gap-2">
              {alerts.map((a) => (
                <Card
                  key={`${a.path}-${a.event}`}
                  className="flex flex-wrap items-center gap-2 border-destructive/40 p-3 text-sm"
                >
                  <AlertTriangle className="h-4 w-4 text-destructive" />
                  <span className="font-semibold">{a.event}</span>
                  <span className="text-muted-foreground">{a.path}</span>
                  <Badge variant="destructive">-{a.dropPct}%</Badge>
                  <span className="text-xs text-muted-foreground">
                    {a.previous} → {a.recent}
                  </span>
                </Card>
              ))}
            </div>
          )}
        </section>

        {/* Baseline por rota */}
        <section className="mb-8">
          <h2 className="mb-3 text-lg font-bold">Baseline por rota</h2>
          <p className="mb-3 text-xs text-muted-foreground">
            KPI de conversão só é calculado com pelo menos {MIN_SAMPLE_OPEN} aberturas de funil na rota.
          </p>
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 text-left text-xs uppercase text-muted-foreground">
                <tr>
                  <th className="p-2">Rota</th>
                  <th className="p-2">Open</th>
                  <th className="p-2">Step</th>
                  <th className="p-2">Submit</th>
                  <th className="p-2">wa_click</th>
                  <th className="p-2">Conversão</th>
                </tr>
              </thead>
              <tbody>
                {baseline.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-4 text-center text-muted-foreground">
                      Sem eventos registrados no período.
                    </td>
                  </tr>
                ) : (
                  baseline.map((r) => (
                    <tr key={r.path} className="border-t border-border">
                      <td className="p-2 font-medium">{r.path}</td>
                      <td className="p-2">{r.opens}</td>
                      <td className="p-2">{r.steps}</td>
                      <td className="p-2">{r.submits}</td>
                      <td className="p-2">{r.clicks}</td>
                      <td className="p-2">
                        {r.conversao === null ? (
                          <Badge variant="outline">AMOSTRA INSUFICIENTE</Badge>
                        ) : (
                          <span className="font-semibold">{r.conversao}%</span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Detalhe por dia e rota */}
        <section>
          <h2 className="mb-3 text-lg font-bold">Por dia e rota</h2>
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 text-left text-xs uppercase text-muted-foreground">
                <tr>
                  <th className="p-2">Dia</th>
                  <th className="p-2">Rota</th>
                  {FUNNEL_EVENTS.map((e) => (
                    <th key={e} className="p-2">{e.replace("wa_funnel_", "").replace("wa_", "")}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {buckets.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-4 text-center text-muted-foreground">
                      Sem eventos registrados no período.
                    </td>
                  </tr>
                ) : (
                  buckets.map((b) => (
                    <tr key={`${b.day}-${b.path}`} className="border-t border-border">
                      <td className="p-2 whitespace-nowrap">{b.day}</td>
                      <td className="p-2">{b.path}</td>
                      {FUNNEL_EVENTS.map((e) => (
                        <td key={e} className="p-2">{b.counts[e]}</td>
                      ))}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
