import { useCallback, useEffect, useMemo, useState } from "react";
import { Navigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { Loader2, RefreshCw, Download } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend,
} from "recharts";

type Audit = {
  id: string;
  tipo: string;
  encontrado: boolean;
  erro: string | null;
  origem: string | null;
  utm: Record<string, string> | null;
  criado_em: string;
};

type OSRow = { numero: string; etapa: string; previsao_conclusao: string | null; updated_at: string };

const JANELAS = [
  { id: "24h", label: "24 horas", horas: 24 },
  { id: "7d", label: "7 dias", horas: 24 * 7 },
  { id: "30d", label: "30 dias", horas: 24 * 30 },
] as const;

const rotaDoTipo = (t: string) => (t === "telefone" ? "/status-os (celular)" : "/status-os (número da OS)");

export default function AdminOSAuditoria() {
  const { loading: authLoading, isAdmin } = useAdminAuth();
  const [janela, setJanela] = useState<(typeof JANELAS)[number]["id"]>("7d");
  const [rows, setRows] = useState<Audit[]>([]);
  const [ordens, setOrdens] = useState<OSRow[]>([]);
  const [loading, setLoading] = useState(true);

  const carregar = useCallback(async () => {
    setLoading(true);
    const horas = JANELAS.find((j) => j.id === janela)?.horas ?? 168;
    const desde = new Date(Date.now() - horas * 3600000).toISOString();
    const [audit, os] = await Promise.all([
      supabase
        .from("os_lookup_audit")
        .select("id,tipo,encontrado,erro,origem,utm,criado_em")
        .gte("criado_em", desde)
        .order("criado_em", { ascending: false })
        .limit(5000),
      supabase
        .from("ordens_servico")
        .select("numero,etapa,previsao_conclusao,updated_at")
        .neq("etapa", "entregue")
        .limit(500),
    ]);
    setLoading(false);
    if (audit.error) {
      toast({ title: "Erro ao carregar auditoria", description: audit.error.message, variant: "destructive" });
      return;
    }
    setRows((audit.data ?? []) as Audit[]);
    setOrdens((os.data ?? []) as OSRow[]);
  }, [janela]);

  useEffect(() => {
    if (isAdmin) void carregar();
  }, [isAdmin, carregar]);

  const kpis = useMemo(() => {
    const total = rows.length;
    const erros = rows.filter((r) => r.erro).length;
    const bloqueios = rows.filter((r) => r.erro === "rate_limited").length;
    const invalidos = rows.filter((r) => r.erro && r.erro !== "rate_limited").length;
    const naoEncontradas = rows.filter((r) => !r.erro && !r.encontrado).length;
    return {
      total,
      erros,
      bloqueios,
      invalidos,
      naoEncontradas,
      sucesso: total ? Math.round(((total - erros - naoEncontradas) / total) * 100) : 0,
      taxaErro: total ? Math.round((erros / total) * 100) : 0,
      porHora: total ? (total / (JANELAS.find((j) => j.id === janela)?.horas ?? 1)).toFixed(2) : "0",
    };
  }, [rows, janela]);

  const serieDiaria = useMemo(() => {
    const map = new Map<string, { dia: string; sucesso: number; vazio: number; erro: number }>();
    for (const r of rows) {
      const dia = new Date(r.criado_em).toLocaleDateString("pt-BR");
      const item = map.get(dia) ?? { dia, sucesso: 0, vazio: 0, erro: 0 };
      if (r.erro) item.erro += 1;
      else if (r.encontrado) item.sucesso += 1;
      else item.vazio += 1;
      map.set(dia, item);
    }
    return Array.from(map.values()).reverse();
  }, [rows]);

  const porRota = useMemo(() => {
    const map = new Map<string, { rota: string; consultas: number; erros: number }>();
    for (const r of rows) {
      const rota = rotaDoTipo(r.tipo);
      const item = map.get(rota) ?? { rota, consultas: 0, erros: 0 };
      item.consultas += 1;
      if (r.erro) item.erros += 1;
      map.set(rota, item);
    }
    return Array.from(map.values());
  }, [rows]);

  const anomalias = useMemo(() => {
    const porOrigem = new Map<string, { origem: string; erros: number; bloqueios: number; total: number }>();
    const porUtm = new Map<string, { campanha: string; erros: number; bloqueios: number }>();
    for (const r of rows) {
      const origem = r.origem || "(direto/desconhecida)";
      const o = porOrigem.get(origem) ?? { origem, erros: 0, bloqueios: 0, total: 0 };
      o.total += 1;
      if (r.erro === "rate_limited") o.bloqueios += 1;
      else if (r.erro) o.erros += 1;
      porOrigem.set(origem, o);
      if (r.erro && r.utm) {
        const campanha = [r.utm.utm_source, r.utm.utm_campaign].filter(Boolean).join(" / ") || "(sem campanha)";
        const u = porUtm.get(campanha) ?? { campanha, erros: 0, bloqueios: 0 };
        if (r.erro === "rate_limited") u.bloqueios += 1;
        else u.erros += 1;
        porUtm.set(campanha, u);
      }
    }
    const origens = Array.from(porOrigem.values())
      .filter((o) => o.erros + o.bloqueios > 0)
      .sort((a, b) => b.erros + b.bloqueios - (a.erros + a.bloqueios))
      .slice(0, 10);
    const utms = Array.from(porUtm.values())
      .sort((a, b) => b.erros + b.bloqueios - (a.erros + a.bloqueios))
      .slice(0, 10);
    return { origens, utms };
  }, [rows]);

  const sla = useMemo(() => {
    const agora = Date.now();
    const comPrazo = ordens.filter((o) => o.previsao_conclusao);
    const vencidas = comPrazo.filter((o) => new Date(o.previsao_conclusao!).getTime() < agora);
    const proximas = comPrazo.filter((o) => {
      const t = new Date(o.previsao_conclusao!).getTime();
      return t >= agora && t - agora < 24 * 3600000;
    });
    return { abertas: ordens.length, comPrazo: comPrazo.length, vencidas, proximas };
  }, [ordens]);

  const exportarCsv = () => {
    const linhas = [
      ["criado_em", "rota", "tipo", "encontrado", "erro", "origem", "utm_source", "utm_campaign"],
      ...rows.map((r) => [
        r.criado_em,
        rotaDoTipo(r.tipo),
        r.tipo,
        String(r.encontrado),
        r.erro ?? "",
        r.origem ?? "",
        r.utm?.utm_source ?? "",
        r.utm?.utm_campaign ?? "",
      ]),
    ];
    const csv = linhas.map((l) => l.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8;" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = `auditoria-consultas-os-${janela}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }
  if (!isAdmin) return <Navigate to="/admin/login" replace />;

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Auditoria de consultas de OS | Admin</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <Header />
      <main className="container mx-auto max-w-5xl px-4 py-8">
        <h1 className="text-2xl font-bold">Auditoria das consultas públicas de OS</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Volume de consultas em /status-os, taxa de erro, bloqueios por limite de tentativas e situação de prazo
          das ordens em aberto. Nenhum dado pessoal do cliente é registrado — apenas o tipo de consulta, o resultado
          e a origem da sessão (página e campanha UTM, quando existir).
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          {JANELAS.map((j) => (
            <Button
              key={j.id}
              size="sm"
              variant={janela === j.id ? "default" : "outline"}
              onClick={() => setJanela(j.id)}
            >
              {j.label}
            </Button>
          ))}
          <Button size="sm" variant="outline" onClick={() => void carregar()} disabled={loading}>
            <RefreshCw className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`} /> Atualizar
          </Button>
          <Button size="sm" variant="outline" onClick={exportarCsv} disabled={!rows.length}>
            <Download className="mr-2 h-4 w-4" /> Exportar CSV
          </Button>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Consultas", valor: String(kpis.total), nota: `${kpis.porHora} por hora` },
            { label: "Taxa de sucesso", valor: `${kpis.sucesso}%`, nota: `${kpis.naoEncontradas} sem resultado` },
            { label: "Taxa de erro", valor: `${kpis.taxaErro}%`, nota: `${kpis.invalidos} formato inválido` },
            { label: "Bloqueios por limite", valor: String(kpis.bloqueios), nota: "proteção anti-enumeração" },
          ].map((k) => (
            <Card key={k.label} className="p-4">
              <p className="text-xs uppercase text-muted-foreground">{k.label}</p>
              <p className="mt-1 text-2xl font-bold">{k.valor}</p>
              <p className="text-xs text-muted-foreground">{k.nota}</p>
            </Card>
          ))}
        </div>

        <Card className="mt-6 p-4">
          <h2 className="text-sm font-semibold">Consultas por dia</h2>
          <div className="mt-3 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={serieDiaria}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="dia" fontSize={11} />
                <YAxis allowDecimals={false} fontSize={11} />
                <Tooltip />
                <Legend />
                <Bar dataKey="sucesso" name="Com resultado" stackId="a" fill="hsl(var(--primary))" />
                <Bar dataKey="vazio" name="Sem resultado" stackId="a" fill="hsl(var(--muted-foreground))" />
                <Bar dataKey="erro" name="Erro/bloqueio" stackId="a" fill="hsl(var(--destructive))" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="mt-6 p-4">
          <h2 className="text-sm font-semibold">Uso por rota de consulta</h2>
          <table className="mt-3 w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase text-muted-foreground">
                <th className="py-2">Rota</th>
                <th className="py-2">Consultas</th>
                <th className="py-2">Erros</th>
                <th className="py-2">Taxa de erro</th>
              </tr>
            </thead>
            <tbody>
              {porRota.map((r) => (
                <tr key={r.rota} className="border-t">
                  <td className="py-2">{r.rota}</td>
                  <td className="py-2">{r.consultas}</td>
                  <td className="py-2">{r.erros}</td>
                  <td className="py-2">{r.consultas ? Math.round((r.erros / r.consultas) * 100) : 0}%</td>
                </tr>
              ))}
              {!porRota.length && (
                <tr>
                  <td colSpan={4} className="py-4 text-muted-foreground">
                    Nenhuma consulta registrada nesta janela.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </Card>

        <Card className="mt-6 p-4">
          <h2 className="text-sm font-semibold">Prazos das ordens em aberto</h2>
          <p className="mt-1 text-xs text-muted-foreground">
            {sla.abertas} ordens em aberto · {sla.comPrazo} com previsão informada · {sla.vencidas.length} vencidas ·{" "}
            {sla.proximas.length} vencendo em menos de 24h.
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            {[...sla.vencidas, ...sla.proximas].slice(0, 20).map((o) => {
              const venceu = new Date(o.previsao_conclusao!).getTime() < Date.now();
              return (
                <li key={o.numero} className="flex flex-wrap items-center justify-between gap-2 border-t pt-2">
                  <span className="font-medium">{o.numero}</span>
                  <span className="text-muted-foreground">{o.etapa}</span>
                  <span className={venceu ? "text-destructive" : "text-amber-600"}>
                    {venceu ? "Vencida em " : "Vence em "}
                    {new Date(o.previsao_conclusao!).toLocaleString("pt-BR")}
                  </span>
                </li>
              );
            })}
            {!sla.vencidas.length && !sla.proximas.length && (
              <li className="text-muted-foreground">Nenhum prazo vencido ou vencendo nas próximas 24 horas.</li>
            )}
          </ul>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
