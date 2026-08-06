import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageSEO } from "@/components/PageSEO";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MessageCircle, CheckCircle2, Circle, Clock, Copy, Check, Star, History } from "lucide-react";
import QRCode from "qrcode";
import { buildSiteReviewUrl } from "@/lib/reviewRequest";
import { NAP_PHONE_DIGITS } from "@/lib/nap";
import { supabase } from "@/integrations/supabase/client";

const track = (event: string, params: Record<string, unknown> = {}) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", event, { event_category: "status_os", ...params });
  }
};

const ETAPAS = [
  { id: "aberta", label: "OS aberta", desc: "Pedido registrado com os dados informados na triagem." },
  { id: "recebido", label: "Equipamento recebido", desc: "Equipamento em mãos (coleta, balcão ou atendimento no local)." },
  { id: "diagnostico", label: "Diagnóstico", desc: "Testes e identificação do problema antes de qualquer orçamento." },
  { id: "orcamento", label: "Orçamento enviado", desc: "Escopo, valores e prazos enviados para aprovação por escrito." },
  { id: "execucao", label: "Em execução", desc: "Serviço aprovado e em andamento." },
  { id: "teste", label: "Testes finais", desc: "Checklist de validação antes da devolução." },
  { id: "pronto", label: "Pronto para entrega", desc: "Serviço concluído, aguardando retirada ou entrega." },
  { id: "entregue", label: "Entregue", desc: "Equipamento devolvido e garantia da mão de obra iniciada." },
];

interface OSRow {
  numero: string;
  etapa: string;
  descricao_curta: string | null;
  cidade: string | null;
  bairro: string | null;
  prazo_estimado: string | null;
  observacao_publica: string | null;
  historico: unknown;
  created_at: string;
  updated_at: string;
}

const FAQ = [
  {
    q: "Onde encontro o número da minha OS?",
    a: "O número aparece no PDF da Ordem de Serviço gerado na triagem e também é enviado na conversa do WhatsApp, no formato OS-AAAAMMDD-HHMM-000.",
  },
  {
    q: "O status é atualizado em tempo real?",
    a: "A consulta lê diretamente o registro atual da OS. A etapa muda assim que o técnico atualiza o atendimento, então o que aparece aqui é sempre o último estado registrado.",
  },
  {
    q: "Os prazos são garantidos?",
    a: "Não. O prazo exibido é uma estimativa que depende de diagnóstico, aprovação do orçamento e disponibilidade de peças. Qualquer alteração é comunicada pelo WhatsApp.",
  },
  {
    q: "A consulta mostra dados pessoais?",
    a: "Não. A página mostra apenas etapa, prazo estimado e observações públicas do atendimento. Nome, telefone e conteúdo do equipamento não são exibidos.",
  },
];

/** Formato aceito: OS-AAAAMMDD-HHMM-000 (aceita também sem o prefixo "OS-"). */
const OS_REGEX = /^(OS-)?\d{8}-\d{4}-\d{1,4}$/i;

const normalizeOS = (v: string) => {
  const t = v.trim().toUpperCase().replace(/\s+/g, "");
  return t && !t.startsWith("OS-") && /^\d{8}-/.test(t) ? `OS-${t}` : t;
};

interface HistoricoItem {
  etapa?: string;
  em?: string;
  at?: string;
  data?: string;
  prazo_estimado?: string;
  observacao?: string;
  nota?: string;
}

const parseHistorico = (raw: unknown): HistoricoItem[] => {
  if (!Array.isArray(raw)) return [];
  return (raw as HistoricoItem[])
    .filter((h) => h && typeof h === "object")
    .sort((a, b) => String(a.em ?? a.at ?? a.data ?? "").localeCompare(String(b.em ?? b.at ?? b.data ?? "")));
};

const fmtDate = (v?: string) => {
  if (!v) return "";
  const d = new Date(v);
  return Number.isNaN(d.getTime()) ? v : d.toLocaleString("pt-BR");
};

export default function StatusOS() {
  const [numero, setNumero] = useState("");
  const [copiado, setCopiado] = useState(false);
  const [qr, setQr] = useState("");
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [os, setOs] = useState<OSRow | null>(null);

  const buscar = async (e: React.FormEvent) => {
    e.preventDefault();
    const q = normalizeOS(numero);
    if (q !== numero) setNumero(q);
    if (!OS_REGEX.test(q)) {
      setErro(
        "Número de OS inválido. Use o formato do PDF: OS-AAAAMMDD-HHMM-000 (exemplo: OS-20260806-1830-123).",
      );
      setOs(null);
      track("status_os_formato_invalido");
      return;
    }
    setLoading(true);
    setErro(null);
    setOs(null);
    track("status_os_consulta", { numero_len: q.length });
    const { data, error } = await (supabase as unknown as {
      rpc: (fn: string, args: Record<string, unknown>) => Promise<{ data: OSRow[] | null; error: unknown }>;
    }).rpc("consultar_os", { _numero: q });
    setLoading(false);
    if (error) {
      setErro("Não foi possível consultar agora. Tente novamente em instantes.");
      return;
    }
    const row = data?.[0];
    if (!row) {
      setErro("Nenhuma OS encontrada com esse número. Confira o código do PDF ou fale pelo WhatsApp.");
      track("status_os_nao_encontrada");
      return;
    }
    setOs(row);
    track("status_os_encontrada", { etapa: row.etapa });
  };

  const idxAtual = os ? Math.max(0, ETAPAS.findIndex((e) => e.id === os.etapa)) : -1;
  const historico = useMemo(() => (os ? parseHistorico(os.historico) : []), [os]);

  /** Link público e compartilhável da consulta (abre já com a OS preenchida). */
  const shareUrl = os && typeof window !== "undefined"
    ? `${window.location.origin}/status-os?os=${encodeURIComponent(os.numero)}`
    : "";

  useEffect(() => {
    if (!shareUrl) { setQr(""); return; }
    QRCode.toDataURL(shareUrl, { width: 200, margin: 1 }).then(setQr).catch(() => setQr(""));
  }, [shareUrl]);

  // Deep link: /status-os?os=OS-... consulta automaticamente.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const p = new URLSearchParams(window.location.search).get("os");
    if (p) setNumero(normalizeOS(p));
  }, []);

  const copiarLink = async () => {
    if (!shareUrl) return;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopiado(true);
      track("status_os_copiar_link");
      setTimeout(() => setCopiado(false), 2000);
    } catch {
      setErro("Não foi possível copiar automaticamente. Copie o endereço da barra do navegador.");
    }
  };

  /**
   * Reenvio do link de avaliação: mantém exatamente os mesmos UTMs de origem
   * (utm_source=whatsapp / utm_campaign=pos_atendimento_review), só muda o medium
   * para identificar que partiu da própria página de status.
   */
  const reenviarAvaliacaoHref = os
    ? `https://wa.me/${NAP_PHONE_DIGITS}?text=${encodeURIComponent(
        `Olá! Quero receber novamente o link de avaliação da OS ${os.numero}.\n\n${buildSiteReviewUrl({ os: os.numero, medium: "whatsapp_os" })}`,
      )}`
    : "";

  const waHref = `https://wa.me/${NAP_PHONE_DIGITS}?text=${encodeURIComponent(
    `Olá! Quero acompanhar minha Ordem de Serviço${numero ? ` ${numero.trim()}` : ""}.`,
  )}&utm_source=site&utm_medium=status_os&utm_campaign=acompanhamento`;

  return (
    <div className="min-h-screen bg-background">
      <PageSEO
        title="Status da Ordem de Serviço | Consulta por número da OS"
        description="Consulte o andamento do seu atendimento pelo número da Ordem de Serviço: etapa atual, prazo estimado e observações do técnico em Curitiba e região."
        path="/status-os"
        breadcrumbs={[
          { name: "Início", path: "/" },
          { name: "Status da Ordem de Serviço", path: "/status-os" },
        ]}

      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQ.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        }}
      />

      <Header />
      <main className="container mx-auto max-w-3xl px-4 py-8">
        <Breadcrumbs items={[{ label: "Status da Ordem de Serviço" }]} />

        <h1 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
          Status da Ordem de Serviço
        </h1>
        <p className="mt-3 text-muted-foreground">
          Digite o número da sua OS para ver a etapa atual do atendimento, o prazo estimado e as
          observações registradas pelo técnico. A consulta não exibe dados pessoais.
        </p>

        <form onSubmit={buscar} className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Input
            value={numero}
            onChange={(e) => setNumero(e.target.value)}
            placeholder="OS-20260806-1830-123"
            aria-label="Número da Ordem de Serviço"
            className="h-12 text-base"
            inputMode="text"
            autoComplete="off"
          />
          <Button type="submit" size="lg" className="h-12" disabled={loading}>
            <Search className="mr-2 h-4 w-4" />
            {loading ? "Consultando..." : "Consultar"}
          </Button>
        </form>

        {erro && (
          <div className="mt-4 rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm">
            <p className="font-medium text-destructive">{erro}</p>
            <p className="mt-2 text-muted-foreground">
              Formato correto: <code className="rounded bg-muted px-1">OS-AAAAMMDD-HHMM-000</code> — o
              mesmo código do PDF da Ordem de Serviço e da mensagem no WhatsApp.
            </p>
            <a
              className="mt-3 inline-flex items-center gap-2 font-medium text-primary underline"
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("status_os_ajuda_whatsapp")}
            >
              <MessageCircle className="h-4 w-4" /> Falar com o técnico no WhatsApp
            </a>
          </div>
        )}

        {os && (
          <section className="mt-8 rounded-xl border bg-card p-5 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-xl font-semibold">OS {os.numero}</h2>
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                {ETAPAS[idxAtual]?.label ?? os.etapa}
              </span>
            </div>
            {os.descricao_curta && <p className="mt-2 text-sm text-muted-foreground">{os.descricao_curta}</p>}
            <dl className="mt-4 grid gap-3 sm:grid-cols-2">
              <div>
                <dt className="text-xs uppercase text-muted-foreground">Abertura</dt>
                <dd className="text-sm">{new Date(os.created_at).toLocaleString("pt-BR")}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase text-muted-foreground">Última atualização</dt>
                <dd className="text-sm">{new Date(os.updated_at).toLocaleString("pt-BR")}</dd>
              </div>
              {os.prazo_estimado && (
                <div>
                  <dt className="text-xs uppercase text-muted-foreground">Prazo estimado</dt>
                  <dd className="text-sm">{os.prazo_estimado}</dd>
                </div>
              )}
              {(os.bairro || os.cidade) && (
                <div>
                  <dt className="text-xs uppercase text-muted-foreground">Local do atendimento</dt>
                  <dd className="text-sm">{[os.bairro, os.cidade].filter(Boolean).join(", ")}</dd>
                </div>
              )}
            </dl>

            {os.observacao_publica && (
              <p className="mt-4 rounded-lg bg-muted/50 p-3 text-sm">{os.observacao_publica}</p>
            )}

            <ol className="mt-6 space-y-3">
              {ETAPAS.map((etapa, i) => {
                const done = i < idxAtual;
                const atual = i === idxAtual;
                return (
                  <li key={etapa.id} className="flex gap-3">
                    <span className="mt-0.5 shrink-0">
                      {done ? (
                        <CheckCircle2 className="h-5 w-5 text-primary" />
                      ) : atual ? (
                        <Clock className="h-5 w-5 text-primary" />
                      ) : (
                        <Circle className="h-5 w-5 text-muted-foreground/40" />
                      )}
                    </span>
                    <div>
                      <p className={atual ? "font-semibold" : done ? "" : "text-muted-foreground"}>
                        {etapa.label}
                      </p>
                      <p className="text-sm text-muted-foreground">{etapa.desc}</p>
                    </div>
                  </li>
                );
              })}
            </ol>

            {historico.length > 0 && (
              <div className="mt-6 rounded-lg border bg-muted/30 p-4">
                <h3 className="flex items-center gap-2 text-sm font-semibold">
                  <History className="h-4 w-4" aria-hidden="true" />
                  Histórico do atendimento
                </h3>
                <ol className="mt-3 space-y-2 text-sm">
                  {historico.map((h, i) => {
                    const etapa = ETAPAS.find((e) => e.id === h.etapa);
                    return (
                      <li key={`${h.etapa}-${i}`} className="flex flex-wrap gap-x-2">
                        <time className="text-muted-foreground">{fmtDate(h.em ?? h.at ?? h.data)}</time>
                        <span className="font-medium">{etapa?.label ?? h.etapa}</span>
                        {h.prazo_estimado && (
                          <span className="text-muted-foreground">· prazo: {h.prazo_estimado}</span>
                        )}
                        {(h.observacao ?? h.nota) && (
                          <span className="w-full text-muted-foreground">{h.observacao ?? h.nota}</span>
                        )}
                      </li>
                    );
                  })}
                </ol>
              </div>
            )}

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-start">
              <Button type="button" variant="outline" className="h-12 sm:flex-1" onClick={copiarLink}>
                {copiado ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
                {copiado ? "Link copiado" : "Copiar link da OS"}
              </Button>
              <Button asChild variant="outline" className="h-12 sm:flex-1">
                <a
                  href={reenviarAvaliacaoHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => track("status_os_reenviar_avaliacao", { etapa: os.etapa })}
                >
                  <Star className="mr-2 h-4 w-4" />
                  Reenviar link de avaliação
                </a>
              </Button>
            </div>

            {qr && (
              <figure className="mt-4 flex flex-col items-center rounded-lg border bg-background p-4">
                <img src={qr} alt={`QR code para acompanhar a OS ${os.numero}`} width={200} height={200} loading="lazy" />
                <figcaption className="mt-2 text-center text-xs text-muted-foreground">
                  Aponte a câmera do celular para abrir esta consulta.
                </figcaption>
              </figure>
            )}

            <Button asChild size="lg" className="mt-6 w-full">
              <a href={waHref} target="_blank" rel="noopener noreferrer" onClick={() => track("status_os_whatsapp", { etapa: os.etapa })}>
                <MessageCircle className="mr-2 h-4 w-4" />
                Falar sobre esta OS no WhatsApp
              </a>
            </Button>
          </section>
        )}

        <section className="mt-10">
          <h2 className="text-2xl font-semibold">Como funciona o acompanhamento</h2>
          <p className="mt-2 text-muted-foreground">
            Cada atendimento recebe um número de OS gerado na triagem. As etapas abaixo são as mesmas
            usadas internamente: nenhum serviço avança sem orçamento aprovado por escrito.
          </p>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {ETAPAS.map((e) => (
              <li key={e.id}>
                <strong className="text-foreground">{e.label}:</strong> {e.desc}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold">Perguntas frequentes</h2>
          <div className="mt-4 space-y-4">
            {FAQ.map((f) => (
              <div key={f.q} className="rounded-lg border p-4">
                <h3 className="font-medium">{f.q}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        <p className="mt-8 text-sm text-muted-foreground">
          Ainda não abriu uma OS?{" "}
          <Link className="underline" to="/servicos/montagem-pc">
            Inicie a triagem
          </Link>{" "}
          ou consulte{" "}
          <Link className="underline" to="/precos-e-politicas">
            preços e políticas
          </Link>
          .
        </p>
      </main>
      <Footer />
    </div>
  );
}
