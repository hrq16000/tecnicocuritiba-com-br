import { useCallback, useEffect, useMemo, useState } from "react";
import { Navigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { AlertTriangle, CheckCircle2, Download, FileText, Loader2, RefreshCw, Send } from "lucide-react";
import {
  Area, AreaChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";
import { gerarRelatorioSeoPdf, type ResumoSeo } from "@/lib/reports/seoReportPdf";

type Snapshot = {
  id: string;
  origem: string;
  sitemap_total: number;
  total_erros: number;
  erros: { tipo: string; url: string; detalhe: string }[];
  sitemap_adicionadas: string[];
  sitemap_removidas: string[];
  gsc: {
    disponivel?: boolean;
    motivo?: string;
    cliques?: number;
    impressoes?: number;
    ctr?: number;
    posicao_media?: number;
    serie?: { data: string; cliques: number; impressoes: number; posicao: number }[];
    sitemaps?: { path: string; submetidas: number; indexadas: number; erros: number; enviado: string | null }[];
  };
  duracao_ms: number | null;
  criado_em: string;
};

type Alerta = {
  id: string;
  tipo: string;
  severidade: string;
  titulo: string;
  detalhe: string | null;
  enviado_slack: boolean;
  resolvido_em: string | null;
  criado_em: string;
};

type Relatorio = { id: string; mes: string; gerado_em: string; resumo: ResumoSeo };

const corSeveridade = (s: string) =>
  s === "critico" ? "destructive" : s === "alerta" ? "default" : "secondary";

const dataHora = (v: string) => new Date(v).toLocaleString("pt-BR");

export default function AdminSeo() {
  const { loading: authLoading, isAdmin } = useAdminAuth();
  const [snaps, setSnaps] = useState<Snapshot[]>([]);
  const [alertas, setAlertas] = useState<Alerta[]>([]);
  const [relatorios, setRelatorios] = useState<Relatorio[]>([]);
  const [loading, setLoading] = useState(true);
  const [acao, setAcao] = useState<string | null>(null);

  const carregar = useCallback(async () => {
    setLoading(true);
    const [s, a, r] = await Promise.all([
      supabase.from("seo_snapshots")
        .select("id,origem,sitemap_total,total_erros,erros,sitemap_adicionadas,sitemap_removidas,gsc,duracao_ms,criado_em")
        .order("criado_em", { ascending: false }).limit(60),
      supabase.from("seo_alertas")
        .select("id,tipo,severidade,titulo,detalhe,enviado_slack,resolvido_em,criado_em")
        .order("criado_em", { ascending: false }).limit(80),
      supabase.from("seo_relatorios").select("id,mes,gerado_em,resumo").order("mes", { ascending: false }).limit(24),
    ]);
    setLoading(false);
    if (s.error) {
      toast({ title: "Erro ao carregar dados de SEO", description: s.error.message, variant: "destructive" });
      return;
    }
    setSnaps((s.data ?? []) as unknown as Snapshot[]);
    setAlertas((a.data ?? []) as unknown as Alerta[]);
    setRelatorios((r.data ?? []) as unknown as Relatorio[]);
  }, []);

  useEffect(() => {
    if (isAdmin) void carregar();
  }, [isAdmin, carregar]);

  // atualização em tempo real conforme as funções gravam
  useEffect(() => {
    if (!isAdmin) return;
    const canal = supabase
      .channel("seo-dashboard")
      .on("postgres_changes", { event: "*", schema: "public", table: "seo_snapshots" }, () => void carregar())
      .on("postgres_changes", { event: "*", schema: "public", table: "seo_alertas" }, () => void carregar())
      .subscribe();
    return () => { void supabase.removeChannel(canal); };
  }, [isAdmin, carregar]);

  const atual = snaps[0];

  const serieErros = useMemo(
    () => [...snaps].reverse().map((s) => ({
      data: new Date(s.criado_em).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" }),
      erros: s.total_erros,
      urls: s.sitemap_total,
    })),
    [snaps],
  );

  const serieGsc = atual?.gsc?.serie ?? [];

  const indexadas = useMemo(
    () => (atual?.gsc?.sitemaps ?? []).reduce((s, x) => s + (x.indexadas ?? 0), 0),
    [atual],
  );
  const submetidas = useMemo(
    () => (atual?.gsc?.sitemaps ?? []).reduce((s, x) => s + (x.submetidas ?? 0), 0),
    [atual],
  );

  const invocar = useCallback(
    async (fn: string, body: Record<string, unknown>, rotulo: string) => {
      setAcao(fn);
      const { data, error } = await supabase.functions.invoke(fn, { body });
      setAcao(null);
      if (error) {
        toast({ title: `${rotulo} falhou`, description: error.message, variant: "destructive" });
        return null;
      }
      toast({ title: `${rotulo} concluído`, description: JSON.stringify(data).slice(0, 180) });
      await carregar();
      return data;
    },
    [carregar],
  );

  const baixarPdf = (rel: Relatorio) => {
    try {
      const arquivo = gerarRelatorioSeoPdf(rel.mes, rel.resumo);
      toast({ title: "PDF gerado", description: arquivo });
    } catch (e) {
      toast({ title: "Erro ao gerar PDF", description: (e as Error).message, variant: "destructive" });
    }
  };

  const marcarResolvido = async (id: string) => {
    const { error } = await supabase
      .from("seo_alertas")
      .update({ resolvido_em: new Date().toISOString() })
      .eq("id", id);
    if (error) {
      toast({ title: "Não foi possível resolver", description: error.message, variant: "destructive" });
      return;
    }
    await carregar();
  };

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }
  if (!isAdmin) return <Navigate to="/admin/login" replace />;

  const abertos = alertas.filter((a) => !a.resolvido_em);
  const criticos = abertos.filter((a) => a.severidade === "critico");

  return (
    <>
      <Helmet>
        <title>Painel SEO | Técnico Curitiba</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <Header />
      <main id="main-content" className="container mx-auto max-w-6xl px-4 py-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Painel de SEO</h1>
            <p className="text-sm text-muted-foreground">
              Indexação, cobertura, canônicos e alertas — atualizado em tempo real.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={() => void carregar()} disabled={loading}>
              <RefreshCw className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`} /> Atualizar
            </Button>
            <Button
              size="sm"
              onClick={() => void invocar("seo-monitor", { origem: "manual" }, "Verificação")}
              disabled={acao !== null}
            >
              {acao === "seo-monitor" ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <RefreshCw className="mr-2 h-4 w-4" />}
              Rodar verificação
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => void invocar("seo-deploy-hook", {}, "Reenvio de sitemaps")}
              disabled={acao !== null}
            >
              {acao === "seo-deploy-hook" ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
              Reenviar sitemaps
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => void invocar("seo-monthly-report", {}, "Relatório mensal")}
              disabled={acao !== null}
            >
              {acao === "seo-monthly-report" ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <FileText className="mr-2 h-4 w-4" />}
              Gerar relatório
            </Button>
          </div>
        </div>

        {/* KPIs */}
        <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
          <Card className="p-4">
            <p className="text-xs uppercase text-muted-foreground">URLs no sitemap</p>
            <p className="text-2xl font-bold">{atual?.sitemap_total ?? "—"}</p>
            <p className="text-xs text-muted-foreground">
              {atual ? `verificado ${dataHora(atual.criado_em)}` : "sem verificação ainda"}
            </p>
          </Card>
          <Card className="p-4">
            <p className="text-xs uppercase text-muted-foreground">Indexadas (GSC)</p>
            <p className="text-2xl font-bold">{indexadas || "—"}</p>
            <p className="text-xs text-muted-foreground">{submetidas ? `de ${submetidas} enviadas` : "sem dados do Search Console"}</p>
          </Card>
          <Card className="p-4">
            <p className="text-xs uppercase text-muted-foreground">Erros detectados</p>
            <p className={`text-2xl font-bold ${atual?.total_erros ? "text-destructive" : "text-foreground"}`}>
              {atual?.total_erros ?? "—"}
            </p>
            <p className="text-xs text-muted-foreground">404, 5xx, redirects e canônicos</p>
          </Card>
          <Card className="p-4">
            <p className="text-xs uppercase text-muted-foreground">Alertas abertos</p>
            <p className={`text-2xl font-bold ${criticos.length ? "text-destructive" : "text-foreground"}`}>
              {abertos.length}
            </p>
            <p className="text-xs text-muted-foreground">{criticos.length} crítico(s)</p>
          </Card>
        </div>

        {/* Performance GSC */}
        <Card className="mb-6 p-4">
          <h2 className="mb-3 text-lg font-semibold">Desempenho na busca (últimos 28 dias)</h2>
          {serieGsc.length ? (
            <>
              <div className="mb-3 grid grid-cols-2 gap-3 text-sm lg:grid-cols-4">
                <div><span className="text-muted-foreground">Cliques: </span><strong>{atual?.gsc?.cliques ?? 0}</strong></div>
                <div><span className="text-muted-foreground">Impressões: </span><strong>{atual?.gsc?.impressoes ?? 0}</strong></div>
                <div><span className="text-muted-foreground">CTR: </span><strong>{((atual?.gsc?.ctr ?? 0) * 100).toFixed(2)}%</strong></div>
                <div><span className="text-muted-foreground">Posição média: </span><strong>{(atual?.gsc?.posicao_media ?? 0).toFixed(1)}</strong></div>
              </div>
              <div className="h-64 w-full">
                <ResponsiveContainer>
                  <AreaChart data={serieGsc}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="data" fontSize={11} />
                    <YAxis fontSize={11} />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey="impressoes" name="Impressões" stroke="#114a8c" fill="#114a8c33" />
                    <Area type="monotone" dataKey="cliques" name="Cliques" stroke="#16a34a" fill="#16a34a44" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </>
          ) : (
            <p className="text-sm text-muted-foreground">
              Sem dados do Search Console nesta verificação{atual?.gsc?.motivo ? ` — ${atual.gsc.motivo}` : ""}.
            </p>
          )}
        </Card>

        {/* Saúde técnica */}
        <Card className="mb-6 p-4">
          <h2 className="mb-3 text-lg font-semibold">Saúde técnica do sitemap</h2>
          <div className="h-56 w-full">
            <ResponsiveContainer>
              <LineChart data={serieErros}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="data" fontSize={11} />
                <YAxis fontSize={11} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="erros" name="Erros" stroke="#dc2626" strokeWidth={2} />
                <Line type="monotone" dataKey="urls" name="URLs no sitemap" stroke="#114a8c" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Erros atuais */}
        {atual?.erros?.length ? (
          <Card className="mb-6 p-4">
            <h2 className="mb-3 text-lg font-semibold">Erros na última verificação</h2>
            <div className="max-h-72 overflow-auto text-sm">
              <table className="w-full">
                <thead className="sticky top-0 bg-background">
                  <tr className="text-left text-muted-foreground">
                    <th className="py-1 pr-3">Tipo</th><th className="py-1 pr-3">URL</th><th className="py-1">Detalhe</th>
                  </tr>
                </thead>
                <tbody>
                  {atual.erros.slice(0, 100).map((e, i) => (
                    <tr key={`${e.url}-${i}`} className="border-t border-border">
                      <td className="py-1 pr-3"><Badge variant="destructive">{e.tipo}</Badge></td>
                      <td className="py-1 pr-3 break-all">{e.url.replace("https://tecnicocuritiba.com.br", "")}</td>
                      <td className="py-1 break-all text-muted-foreground">{e.detalhe}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        ) : null}

        {/* Alertas */}
        <Card className="mb-6 p-4">
          <h2 className="mb-3 text-lg font-semibold">Alertas</h2>
          {alertas.length === 0 ? (
            <p className="text-sm text-muted-foreground">Nenhum alerta registrado.</p>
          ) : (
            <ul className="space-y-2">
              {alertas.slice(0, 25).map((a) => (
                <li key={a.id} className="flex items-start justify-between gap-3 rounded-md border border-border p-3">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant={corSeveridade(a.severidade)}>{a.severidade}</Badge>
                      <span className="text-sm font-medium">{a.titulo}</span>
                      {a.enviado_slack && <Badge variant="outline">Slack</Badge>}
                      {a.resolvido_em && <Badge variant="secondary">resolvido</Badge>}
                    </div>
                    <p className="mt-1 whitespace-pre-line break-words text-xs text-muted-foreground line-clamp-4">
                      {a.detalhe}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">{dataHora(a.criado_em)}</p>
                  </div>
                  {!a.resolvido_em && (
                    <Button variant="ghost" size="sm" onClick={() => void marcarResolvido(a.id)}>
                      <CheckCircle2 className="mr-1 h-4 w-4" /> Resolver
                    </Button>
                  )}
                </li>
              ))}
            </ul>
          )}
        </Card>

        {/* Relatórios mensais */}
        <Card className="p-4">
          <h2 className="mb-3 text-lg font-semibold">Relatórios mensais</h2>
          {relatorios.length === 0 ? (
            <p className="flex items-center gap-2 text-sm text-muted-foreground">
              <AlertTriangle className="h-4 w-4" /> Nenhum relatório gerado ainda — clique em “Gerar relatório”.
            </p>
          ) : (
            <ul className="divide-y divide-border">
              {relatorios.map((r) => (
                <li key={r.id} className="flex items-center justify-between gap-3 py-2">
                  <div>
                    <p className="text-sm font-medium">
                      {new Date(`${r.mes.slice(0, 7)}-02T00:00:00`).toLocaleDateString("pt-BR", { month: "long", year: "numeric" })}
                    </p>
                    <p className="text-xs text-muted-foreground">Gerado em {dataHora(r.gerado_em)}</p>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => baixarPdf(r)}>
                    <Download className="mr-2 h-4 w-4" /> Baixar PDF
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </main>
      <Footer />
    </>
  );
}
