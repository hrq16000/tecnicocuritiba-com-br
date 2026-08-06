import { useCallback, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { Loader2, RefreshCw, Save } from "lucide-react";

const ETAPAS = [
  "aberta",
  "recebido",
  "diagnostico",
  "orcamento",
  "execucao",
  "teste",
  "pronto",
  "entregue",
] as const;

type OS = {
  id: string;
  numero: string;
  etapa: string;
  descricao_curta: string | null;
  cidade: string | null;
  bairro: string | null;
  prazo_estimado: string | null;
  observacao_publica: string | null;
  created_at: string;
  updated_at: string;
};

export default function AdminOS() {
  const { loading: authLoading, isAdmin } = useAdminAuth();
  const [rows, setRows] = useState<OS[]>([]);
  const [loading, setLoading] = useState(true);
  const [busca, setBusca] = useState("");
  const [salvando, setSalvando] = useState<string | null>(null);

  const carregar = useCallback(async () => {
    setLoading(true);
    let q = supabase.from("ordens_servico").select("*").order("created_at", { ascending: false }).limit(100);
    if (busca.trim()) q = q.ilike("numero", `%${busca.trim()}%`);
    const { data, error } = await q;
    setLoading(false);
    if (error) {
      toast({ title: "Erro ao carregar ordens", description: error.message, variant: "destructive" });
      return;
    }
    setRows((data ?? []) as OS[]);
  }, [busca]);

  useEffect(() => {
    if (isAdmin) void carregar();
  }, [isAdmin, carregar]);

  const salvar = async (os: OS) => {
    setSalvando(os.id);
    const { error } = await supabase
      .from("ordens_servico")
      .update({
        etapa: os.etapa,
        prazo_estimado: os.prazo_estimado,
        observacao_publica: os.observacao_publica,
      })
      .eq("id", os.id);
    setSalvando(null);
    if (error) {
      toast({ title: "Não foi possível salvar", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: `OS ${os.numero} atualizada` });
    void carregar();
  };

  const patch = (id: string, p: Partial<OS>) =>
    setRows((r) => r.map((x) => (x.id === id ? { ...x, ...p } : x)));

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
        <title>Ordens de Serviço | Admin</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <Header />
      <main className="container mx-auto max-w-5xl px-4 py-8">
        <h1 className="text-2xl font-bold">Ordens de Serviço</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          As alterações aqui aparecem imediatamente na consulta pública em /status-os.
        </p>

        <div className="mt-5 flex gap-2">
          <Input
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar por número da OS"
            onKeyDown={(e) => e.key === "Enter" && carregar()}
          />
          <Button variant="outline" onClick={() => carregar()} disabled={loading}>
            <RefreshCw className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            Atualizar
          </Button>
        </div>

        {!loading && rows.length === 0 && (
          <p className="mt-8 text-sm text-muted-foreground">Nenhuma ordem de serviço encontrada.</p>
        )}

        <div className="mt-6 space-y-4">
          {rows.map((os) => (
            <div key={os.id} className="rounded-lg border p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <strong>{os.numero}</strong>
                <span className="text-xs text-muted-foreground">
                  atualizada em {new Date(os.updated_at).toLocaleString("pt-BR")}
                </span>
              </div>
              {os.descricao_curta && (
                <p className="mt-1 text-sm text-muted-foreground">{os.descricao_curta}</p>
              )}
              {(os.bairro || os.cidade) && (
                <p className="text-sm text-muted-foreground">
                  {[os.bairro, os.cidade].filter(Boolean).join(", ")}
                </p>
              )}

              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <Select value={os.etapa} onValueChange={(v) => patch(os.id, { etapa: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {ETAPAS.map((e) => (
                      <SelectItem key={e} value={e}>{e}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  value={os.prazo_estimado ?? ""}
                  onChange={(e) => patch(os.id, { prazo_estimado: e.target.value })}
                  placeholder="Prazo estimado"
                  maxLength={120}
                />
              </div>
              <Textarea
                className="mt-3"
                value={os.observacao_publica ?? ""}
                onChange={(e) => patch(os.id, { observacao_publica: e.target.value })}
                placeholder="Observação pública (visível ao cliente)"
                maxLength={400}
                rows={2}
              />
              <Button className="mt-3" size="sm" onClick={() => salvar(os)} disabled={salvando === os.id}>
                {salvando === os.id ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                Salvar
              </Button>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
