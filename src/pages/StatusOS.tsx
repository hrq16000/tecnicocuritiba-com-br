import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageSEO } from "@/components/PageSEO";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search, MessageCircle, CheckCircle2, Circle, Clock, Copy, Check, Star, History,
  Share2, Smartphone, Hash, RefreshCw, AlertTriangle, FileDown,
} from "lucide-react";
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
  equipamento?: string | null;
  sintomas?: string | null;
  fotos?: unknown;
  cidade: string | null;
  bairro: string | null;
  prazo_estimado: string | null;
  previsao_conclusao?: string | null;
  observacao_publica: string | null;
  historico: unknown;
  telefone_mascarado?: string | null;
  created_at: string;
  updated_at: string;
}

const FAQ = [
  {
    q: "Posso consultar só com o número do celular?",
    a: "Sim. A aba \"Pelo celular\" localiza as ordens de serviço abertas com o número informado no atendimento. A página nunca exibe o telefone completo — apenas no formato (41) ****-9999 — e mostra somente dados públicos do atendimento.",
  },
  {
    q: "Onde encontro o número da minha OS?",
    a: "O número aparece no PDF da Ordem de Serviço gerado na triagem e também é enviado na conversa do WhatsApp, no formato OS-AAAAMMDD-HHMM-000.",
  },
  {
    q: "O status é atualizado em tempo real?",
    a: "A consulta lê o registro atual da OS e se atualiza sozinha a cada 45 segundos enquanto a página estiver aberta, sem precisar recarregar.",
  },
  {
    q: "O que significa a barra de progresso e a previsão?",
    a: "A barra mostra quantas das 8 etapas já foram concluídas. A previsão de conclusão, quando informada pelo técnico, é destacada em laranja quando faltam menos de 24 horas e em vermelho quando o prazo já passou.",
  },
  {
    q: "Os prazos são garantidos?",
    a: "Não. O prazo exibido é uma estimativa que depende de diagnóstico, aprovação do orçamento e disponibilidade de peças. Qualquer alteração é comunicada pelo WhatsApp.",
  },
  {
    q: "Posso compartilhar ou reabrir a consulta depois?",
    a: "Sim. Use os botões de copiar link, compartilhar no WhatsApp ou o QR code: todos abrem a página já com a OS preenchida, mantendo os mesmos parâmetros de origem.",
  },
  {
    q: "Perdi o link de avaliação. Como recebo de novo?",
    a: "Na própria consulta há o botão \"Reenviar link de avaliação\", que abre o WhatsApp com o mesmo link e os mesmos parâmetros de origem usados no envio original.",
  },
  {
    q: "A consulta mostra dados pessoais?",
    a: "Não. A página mostra etapa, prazo estimado, sintomas relatados, fotos enviadas pelo portal e observações públicas. Nome, endereço e telefone completo não são exibidos, e a busca tem limite de tentativas para evitar abuso.",
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

const parseFotos = (raw: unknown): string[] =>
  Array.isArray(raw) ? raw.filter((u): u is string => typeof u === "string" && /^https?:\/\//.test(u)).slice(0, 10) : [];

const fmtDate = (v?: string) => {
  if (!v) return "";
  const d = new Date(v);
  return Number.isNaN(d.getTime()) ? v : d.toLocaleString("pt-BR");
};

type RpcFn = (fn: string, args: Record<string, unknown>) => Promise<{ data: OSRow[] | null; error: { message?: string } | null }>;
const rpc = (fn: string, args: Record<string, unknown>) =>
  (supabase as unknown as { rpc: RpcFn }).rpc(fn, args);

const mensagemErro = (raw?: string) => {
  const m = (raw || "").toLowerCase();
  if (m.includes("rate_limited"))
    return "Muitas consultas seguidas para este número. Aguarde alguns minutos e tente de novo — ou fale direto no WhatsApp.";
  if (m.includes("telefone_invalido"))
    return "Celular inválido. Digite com DDD, por exemplo: (41) 99999-9999.";
  if (m.includes("numero_invalido"))
    return "Número de OS inválido. Use o formato do PDF: OS-AAAAMMDD-HHMM-000.";
  return "Não foi possível consultar agora. Tente novamente em instantes ou fale pelo WhatsApp.";
};

/** Barra de progresso + SLA da OS (etapas concluídas de 8). */
function ProgressoOS({ idx, previsao }: { idx: number; previsao?: string | null }) {
  const pct = Math.round(((Math.max(idx, 0) + 1) / ETAPAS.length) * 100);
  const prazo = previsao ? new Date(previsao) : null;
  const horas = prazo && !Number.isNaN(prazo.getTime()) ? (prazo.getTime() - Date.now()) / 3600000 : null;
  const tone = horas === null ? "" : horas < 0 ? "text-destructive" : horas < 24 ? "text-amber-600" : "text-muted-foreground";
  return (
    <div className="mt-4">
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>Progresso do atendimento</span>
        <span>{pct}% · etapa {Math.max(idx, 0) + 1} de {ETAPAS.length}</span>
      </div>
      <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-muted" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
        <div className="h-full rounded-full bg-primary transition-[width] duration-500" style={{ width: `${pct}%` }} />
      </div>
      {prazo && horas !== null && (
        <p className={`mt-2 flex items-center gap-2 text-sm font-medium ${tone}`}>
          {horas < 24 ? <AlertTriangle className="h-4 w-4" aria-hidden="true" /> : <Clock className="h-4 w-4" aria-hidden="true" />}
          {horas < 0
            ? `Previsão vencida em ${prazo.toLocaleString("pt-BR")} — chame no WhatsApp para reprogramar.`
            : `Previsão de conclusão: ${prazo.toLocaleString("pt-BR")}${horas < 24 ? " (menos de 24h)" : ""}`}
        </p>
      )}
    </div>
  );
}

const CONSENT_KEY = "status-os-consent-v1";

/** Máscara progressiva de celular brasileiro: (41) 99999-9999 */
function mascararCelular(valor: string): string {
  const d = valor.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d;
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

export default function StatusOS() {
  const [modo, setModo] = useState<"numero" | "celular">("numero");
  const [numero, setNumero] = useState("");
  const [celular, setCelular] = useState("");
  const [copiado, setCopiado] = useState(false);
  const [qr, setQr] = useState("");
  const [loading, setLoading] = useState(false);
  const [lento, setLento] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [lista, setLista] = useState<OSRow[]>([]);
  const [selecionada, setSelecionada] = useState(0);
  const [consentimento, setConsentimento] = useState(false);
  const [revelarSensiveis, setRevelarSensiveis] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(CONSENT_KEY)) setConsentimento(true);
    } catch { /* storage indisponível */ }
  }, []);

  const ultimaBusca = useRef<{ modo: "numero" | "celular"; valor: string } | null>(null);
  const [sincronizadoEm, setSincronizadoEm] = useState<number | null>(null);

  const [sincronizacao, setSincronizacao] = useState<"ativo" | "reconectando" | "pausado">("ativo");

  const os = lista[selecionada] ?? null;


  const consultar = useCallback(
    async (m: "numero" | "celular", valor: string, silencioso = false): Promise<boolean> => {
      if (!silencioso) {
        setLoading(true);
        setErro(null);
        setLista([]);
        setSelecionada(0);
      }
      const alerta = window.setTimeout(() => setLento(true), 3500);
      // Timeout duro: evita atualização automática pendurada em rede instável.
      const timeout = new Promise<{ data: null; error: { message: string } }>((resolve) =>
        window.setTimeout(() => resolve({ data: null, error: { message: "timeout" } }), silencioso ? 12000 : 20000),
      );
      const { data, error } = await Promise.race([
        rpc(
          m === "numero" ? "consultar_os" : "consultar_os_por_telefone",
          m === "numero" ? { _numero: valor } : { _telefone: valor },
        ),
        timeout,
      ]);
      window.clearTimeout(alerta);
      setLento(false);
      if (!silencioso) setLoading(false);
      if (error) {
        if (!silencioso) setErro(mensagemErro(error.message));
        track("status_os_erro", { modo: m, motivo: error.message, silencioso });
        console.warn("[status-os] consulta falhou", { modo: m, silencioso, motivo: error.message });
        return false;
      }
      const rows = data ?? [];
      if (rows.length === 0) {
        if (!silencioso) {
          setErro(
            m === "numero"
              ? "Nenhuma OS encontrada com esse número. Confira o código do PDF ou fale pelo WhatsApp."
              : "Nenhuma ordem de serviço encontrada para este celular. Use o número informado no atendimento ou fale pelo WhatsApp.",
          );
          track("status_os_nao_encontrada", { modo: m });
        }
        return true;
      }
      ultimaBusca.current = { modo: m, valor };
      setLista(rows);
      setSincronizadoEm(Date.now());
      if (!silencioso) track("status_os_encontrada", { modo: m, etapa: rows[0].etapa, total: rows.length });
      return true;
    },
    [],
  );


  const buscar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (modo === "numero") {
      const q = normalizeOS(numero);
      if (q !== numero) setNumero(q);
      if (!OS_REGEX.test(q)) {
        setErro("Número de OS inválido. Use o formato do PDF: OS-AAAAMMDD-HHMM-000 (exemplo: OS-20260806-1830-123).");
        setLista([]);
        track("status_os_formato_invalido");
        return;
      }
      track("status_os_consulta", { modo: "numero" });
      await consultar("numero", q);
      return;
    }
    const digits = celular.replace(/\D/g, "");
    if (digits.length < 10 || digits.length > 13) {
      setErro("Celular inválido. Digite com DDD, por exemplo: (41) 99999-9999.");
      setLista([]);
      track("status_os_formato_invalido", { modo: "celular" });
      return;
    }
    track("status_os_consulta", { modo: "celular" });
    await consultar("celular", digits);
  };

  const idxAtual = os ? Math.max(0, ETAPAS.findIndex((e) => e.id === os.etapa)) : -1;
  const historico = useMemo(() => (os ? parseHistorico(os.historico) : []), [os]);
  const fotos = useMemo(() => (os ? parseFotos(os.fotos) : []), [os]);

  /** Link público e compartilhável da consulta (abre já com a OS preenchida). */
  const shareUrl = os && typeof window !== "undefined"
    ? `${window.location.origin}/status-os?os=${encodeURIComponent(os.numero)}`
    : "";

  // QR carregado sob demanda (mantém o bundle inicial leve no mobile).
  useEffect(() => {
    if (!shareUrl) { setQr(""); return; }
    let ativo = true;
    import("qrcode")
      .then((m) => m.toDataURL(shareUrl, { width: 200, margin: 1 }))
      .then((d) => { if (ativo) setQr(d); })
      .catch(() => setQr(""));
    return () => { ativo = false; };
  }, [shareUrl]);

  // Atualização quase em tempo real: ciclo curto (20s) enquanto a aba está visível,
  // com backoff exponencial em falha/timeout e retomada imediata ao voltar o foco.
  useEffect(() => {
    if (!ultimaBusca.current || lista.length === 0) return;
    let cancelado = false;
    let timer = 0;
    let falhas = 0;

    const ciclo = async () => {
      if (cancelado || !ultimaBusca.current) return;
      if (document.visibilityState !== "visible") {
        setSincronizacao("pausado");
        agendar(20000);
        return;
      }
      const ok = await consultar(ultimaBusca.current.modo, ultimaBusca.current.valor, true);
      if (cancelado) return;
      if (ok) {
        falhas = 0;
        setSincronizacao("ativo");
        agendar(20000);
      } else {
        falhas += 1;
        setSincronizacao("reconectando");
        // 30s, 60s, 120s… teto de 5 min. Evita martelar o backend em queda.
        agendar(Math.min(30000 * 2 ** (falhas - 1), 300000));
      }
    };

    const agendar = (ms: number) => {
      if (cancelado) return;
      timer = window.setTimeout(() => void ciclo(), ms);
    };

    const aoVoltar = () => {
      if (document.visibilityState !== "visible" || cancelado) return;
      window.clearTimeout(timer);
      void ciclo();
    };

    agendar(20000);
    document.addEventListener("visibilitychange", aoVoltar);
    window.addEventListener("focus", aoVoltar);
    return () => {
      cancelado = true;
      window.clearTimeout(timer);
      document.removeEventListener("visibilitychange", aoVoltar);
      window.removeEventListener("focus", aoVoltar);
    };
  }, [lista.length, consultar]);


  // Deep link: /status-os?os=OS-... ou ?tel=41999999999 consulta automaticamente.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const p = new URLSearchParams(window.location.search);
    const o = p.get("os");
    const t = p.get("tel");
    if (o) {
      const q = normalizeOS(o);
      setNumero(q);
      if (OS_REGEX.test(q)) void consultar("numero", q);
    } else if (t) {
      setModo("celular");
      setCelular(t);
      const d = t.replace(/\D/g, "");
      if (d.length >= 10) void consultar("celular", d);
    }
  }, [consultar]);

  const [gerandoPdf, setGerandoPdf] = useState(false);

  /** Comprovante em PDF com timeline, prazos, histórico e fotos já exibidas na tela. */
  const baixarPdf = async () => {
    if (!os || gerandoPdf) return;
    setGerandoPdf(true);
    try {
      const { baixarStatusOsPdf } = await import("@/lib/statusOsPdf");
      await baixarStatusOsPdf({
        numero: os.numero,
        etapaAtual: ETAPAS[idxAtual]?.label ?? os.etapa,
        equipamento: os.equipamento,
        local: [os.bairro, os.cidade].filter(Boolean).join(", ") || null,
        prazoEstimado: os.prazo_estimado,
        previsaoConclusao: os.previsao_conclusao
          ? new Date(os.previsao_conclusao).toLocaleString("pt-BR")
          : null,
        abertura: new Date(os.created_at).toLocaleString("pt-BR"),
        atualizacao: new Date(os.updated_at).toLocaleString("pt-BR"),
        observacaoPublica: os.observacao_publica,
        sintomas: revelarSensiveis ? os.sintomas ?? null : null,
        fotos: revelarSensiveis ? fotos : [],
        etapas: ETAPAS.map((e, i) => ({
          label: e.label,
          desc: e.desc,
          estado: i < idxAtual ? "concluida" : i === idxAtual ? "atual" : "pendente",
        })),
        historico: historico.map((h) => ({
          quando: fmtDate(h.em ?? h.at ?? h.data),
          etapa: ETAPAS.find((e) => e.id === h.etapa)?.label ?? String(h.etapa),
          observacao: (h.observacao ?? h.nota) as string | undefined,
        })),
        linkAcompanhamento: shareUrl,
      });
      track("status_os_baixar_pdf", { etapa: os.etapa });
    } catch {
      setErro("Não foi possível gerar o PDF agora. Tente novamente ou fale pelo WhatsApp.");
    } finally {
      setGerandoPdf(false);
    }
  };

  const copiarLink = async () => {
    if (!shareUrl) return;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopiado(true);
      track("status_os_copiar_link", { etapa: os?.etapa });
      setTimeout(() => setCopiado(false), 2000);
    } catch {
      setErro("Não foi possível copiar automaticamente. Copie o endereço da barra do navegador.");
    }
  };

  /** Compartilhamento com mensagem pronta, preservando os UTMs de origem da consulta. */
  const compartilharHref = os
    ? `https://wa.me/?text=${encodeURIComponent(
        `Acompanhe a Ordem de Serviço ${os.numero} (${ETAPAS[idxAtual]?.label ?? os.etapa}): ${shareUrl}&utm_source=whatsapp&utm_medium=share&utm_campaign=status_os`,
      )}`
    : "";

  const reenviarAvaliacaoHref = os
    ? `https://wa.me/${NAP_PHONE_DIGITS}?text=${encodeURIComponent(
        `Olá! Quero receber novamente o link de avaliação da OS ${os.numero}.\n\n${buildSiteReviewUrl({ os: os.numero, medium: "whatsapp_os" })}`,
      )}`
    : "";

  const waHref = `https://wa.me/${NAP_PHONE_DIGITS}?text=${encodeURIComponent(
    `Olá! Quero acompanhar minha Ordem de Serviço${os ? ` ${os.numero}` : numero ? ` ${numero.trim()}` : ""}.`,
  )}&utm_source=site&utm_medium=status_os&utm_campaign=acompanhamento`;

  return (
    <div className="min-h-screen bg-background">
      <PageSEO
        title="Status da Ordem de Serviço | Consulta por OS ou celular"
        description="Consulte o andamento do seu atendimento pelo número da Ordem de Serviço ou pelo celular cadastrado: etapa atual, progresso, prazo estimado, sintomas e fotos enviadas."
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
          Consulte pelo número da OS ou apenas pelo celular informado no atendimento. Você vê a etapa
          atual, o progresso, o prazo estimado, os sintomas relatados e as fotos enviadas pelo portal.
        </p>

        <div className="mt-6 inline-flex rounded-lg border p-1" role="tablist" aria-label="Forma de consulta">
          {([
            { id: "celular" as const, label: "Pelo celular", Icon: Smartphone },
            { id: "numero" as const, label: "Pelo número da OS", Icon: Hash },
          ]).map(({ id, label, Icon }) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={modo === id}
              onClick={() => { setModo(id); setErro(null); }}
              className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                modo === id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
              {label}
            </button>
          ))}
        </div>

        {/* Transparência e consentimento LGPD antes da consulta */}
        <div className="mt-6 rounded-xl border bg-muted/30 p-4">
          <h2 className="text-sm font-semibold">Antes de consultar: o que será exibido</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
            <li>Etapa atual, progresso, prazo estimado e observações públicas da OS.</li>
            <li>
              Dados sensíveis da entrada (sintomas relatados e fotos enviadas pelo portal) só aparecem
              depois que você autorizar a exibição nesta tela.
            </li>
            <li>O celular nunca é exibido completo — apenas no formato mascarado (41) ****-9999.</li>
            <li>A consulta tem limite de tentativas por celular e por número de OS para evitar abuso.</li>
          </ul>
          <label className="mt-3 flex items-start gap-2 text-sm">
            <input
              type="checkbox"
              className="mt-1 h-4 w-4 accent-primary"
              checked={consentimento}
              onChange={(e) => {
                setConsentimento(e.target.checked);
                if (!e.target.checked) setRevelarSensiveis(false);
                try {
                  if (e.target.checked) localStorage.setItem(CONSENT_KEY, new Date().toISOString());
                  else localStorage.removeItem(CONSENT_KEY);
                } catch { /* storage indisponível */ }
                track("status_os_consentimento", { aceito: e.target.checked });
              }}
            />
            <span className="text-muted-foreground">
              Autorizo a consulta e a exibição dos dados da minha Ordem de Serviço neste dispositivo.
              Consulte a{" "}
              <Link className="underline" to="/politica-de-privacidade">
                Política de Privacidade
              </Link>{" "}
              ou solicite a{" "}
              <Link className="underline" to="/exclusao-de-dados">
                exclusão dos dados e anexos
              </Link>
              .
            </span>
          </label>
          <button
            type="button"
            className="mt-3 text-xs font-medium text-muted-foreground underline"
            onClick={() => {
              setConsentimento(false);
              setRevelarSensiveis(false);
              setLista([]);
              setNumero("");
              setCelular("");
              setErro(null);
              try {
                localStorage.removeItem(CONSENT_KEY);
              } catch { /* storage indisponível */ }
              track("status_os_descartar_sessao");
            }}
          >
            Descartar dados desta sessão neste dispositivo
          </button>
        </div>

        <form onSubmit={buscar} className="mt-4 flex flex-col gap-3 sm:flex-row">
          {modo === "numero" ? (
            <Input
              value={numero}
              onChange={(e) => setNumero(e.target.value)}
              placeholder="OS-20260806-1830-123"
              aria-label="Número da Ordem de Serviço"
              className="h-12 text-base"
              inputMode="text"
              autoComplete="off"
            />
          ) : (
            <Input
              value={celular}
              onChange={(e) => setCelular(mascararCelular(e.target.value))}
              placeholder="(41) 99999-9999"
              aria-label="Celular cadastrado no atendimento"
              className="h-12 text-base"
              inputMode="tel"
              autoComplete="tel"
              maxLength={16}
            />
          )}
          <Button type="submit" size="lg" className="h-12" disabled={loading || !consentimento}>
            <Search className="mr-2 h-4 w-4" />
            {loading ? "Consultando..." : "Consultar"}
          </Button>
        </form>
        {!consentimento && (
          <p className="mt-2 text-xs text-muted-foreground">
            Marque a autorização acima para liberar a consulta.
          </p>
        )}

        {loading && (
          <div className="mt-6 space-y-3" aria-hidden="true">
            <div className="h-6 w-1/2 animate-pulse rounded bg-muted" />
            <div className="h-24 animate-pulse rounded-xl bg-muted" />
            <div className="h-40 animate-pulse rounded-xl bg-muted" />
          </div>
        )}


        {lento && loading && (
          <p className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
            <RefreshCw className="h-4 w-4 animate-spin" aria-hidden="true" />
            A consulta está demorando mais que o normal.{" "}
            <a className="underline" href={waHref} target="_blank" rel="noopener noreferrer">
              Fale no WhatsApp
            </a>
            .
          </p>
        )}

        {erro && (
          <div className="mt-4 rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm">
            <p className="font-medium text-destructive">{erro}</p>
            <p className="mt-2 text-muted-foreground">
              Formato do número da OS: <code className="rounded bg-muted px-1">OS-AAAAMMDD-HHMM-000</code> — o
              mesmo código do PDF e da mensagem no WhatsApp. Pelo celular, use DDD + número.
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

        {lista.length > 1 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {lista.map((o, i) => (
              <button
                key={o.numero}
                type="button"
                onClick={() => { setSelecionada(i); track("status_os_trocar_os"); }}
                className={`rounded-full border px-3 py-1.5 text-xs font-medium ${
                  i === selecionada ? "border-primary bg-primary/10 text-primary" : "text-muted-foreground"
                }`}
              >
                {o.numero}
              </button>
            ))}
          </div>
        )}

        {os && (
          <section className="mt-6 rounded-xl border bg-card p-5 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-xl font-semibold">OS {os.numero}</h2>
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                {ETAPAS[idxAtual]?.label ?? os.etapa}
              </span>
            </div>
            {os.telefone_mascarado && (
              <p className="mt-1 text-xs text-muted-foreground">Celular do cadastro: {os.telefone_mascarado}</p>
            )}
            {os.descricao_curta && <p className="mt-2 text-sm text-muted-foreground">{os.descricao_curta}</p>}

            <ProgressoOS idx={idxAtual} previsao={os.previsao_conclusao} />

            <p
              className="mt-3 flex items-center gap-2 text-xs text-muted-foreground"
              data-testid="status-os-sync"
              data-estado={sincronizacao}
              aria-live="polite"
            >
              <span
                aria-hidden="true"
                className={`inline-block h-2 w-2 rounded-full ${
                  sincronizacao === "ativo"
                    ? "bg-emerald-500"
                    : sincronizacao === "reconectando"
                      ? "bg-amber-500"
                      : "bg-muted-foreground/50"
                }`}
              />
              {sincronizacao === "ativo"
                ? "Atualizando automaticamente a cada 20 segundos"
                : sincronizacao === "reconectando"
                  ? "Conexão instável — tentando novamente em instantes"
                  : "Atualização pausada enquanto a aba está em segundo plano"}
              {sincronizadoEm ? ` · sincronizado às ${new Date(sincronizadoEm).toLocaleTimeString("pt-BR")}` : ""}
            </p>


            <dl className="mt-4 grid gap-3 sm:grid-cols-2">
              <div>
                <dt className="text-xs uppercase text-muted-foreground">Abertura</dt>
                <dd className="text-sm">{new Date(os.created_at).toLocaleString("pt-BR")}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase text-muted-foreground">Última atualização</dt>
                <dd className="text-sm">{new Date(os.updated_at).toLocaleString("pt-BR")}</dd>
              </div>
              {os.equipamento && (
                <div>
                  <dt className="text-xs uppercase text-muted-foreground">Equipamento</dt>
                  <dd className="text-sm">{os.equipamento}</dd>
                </div>
              )}
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

            {(os.sintomas || fotos.length > 0) && !revelarSensiveis && (
              <div className="mt-4 rounded-lg border border-dashed bg-muted/20 p-4">
                <h3 className="text-sm font-semibold">Dados sensíveis da entrada</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Esta OS tem {os.sintomas ? "sintomas relatados" : ""}
                  {os.sintomas && fotos.length > 0 ? " e " : ""}
                  {fotos.length > 0 ? `${fotos.length} foto(s) enviada(s) pelo portal` : ""}. Esse conteúdo
                  fica oculto por padrão para proteger a sua privacidade em telas compartilhadas.
                </p>
                <button
                  type="button"
                  className="mt-3 rounded-md border px-3 py-2 text-sm font-medium"
                  onClick={() => {
                    setRevelarSensiveis(true);
                    track("status_os_revelar_sensiveis", { numero: os.numero });
                  }}
                >
                  Exibir sintomas e fotos
                </button>
              </div>
            )}

            {revelarSensiveis && os.sintomas && (
              <div className="mt-4 rounded-lg border bg-muted/30 p-4">
                <h3 className="text-sm font-semibold">Sintomas e dados informados na entrada</h3>
                <p className="mt-1 whitespace-pre-wrap text-sm text-muted-foreground">{os.sintomas}</p>
              </div>
            )}

            {revelarSensiveis && fotos.length > 0 && (
              <div className="mt-4">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-sm font-semibold">Fotos enviadas pelo portal</h3>
                  <button
                    type="button"
                    className="text-xs font-medium text-muted-foreground underline"
                    onClick={() => setRevelarSensiveis(false)}
                  >
                    Ocultar
                  </button>
                </div>
                <div className="mt-2 grid grid-cols-3 gap-2 sm:grid-cols-4">
                  {fotos.map((src, i) => (
                    <a key={src} href={src} target="_blank" rel="noopener noreferrer" className="block">
                      <img
                        src={src}
                        alt={`Foto ${i + 1} enviada na abertura da OS ${os.numero}`}
                        loading="lazy"
                        width={160}
                        height={160}
                        className="aspect-square w-full rounded-lg border object-cover"
                      />
                    </a>
                  ))}
                </div>
              </div>
            )}


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

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <Button type="button" variant="outline" className="h-12" onClick={copiarLink}>
                {copiado ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
                {copiado ? "Link copiado" : "Copiar link"}
              </Button>
              <Button asChild variant="outline" className="h-12">
                <a
                  href={compartilharHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => track("status_os_compartilhar", { etapa: os.etapa })}
                >
                  <Share2 className="mr-2 h-4 w-4" />
                  Compartilhar
                </a>
              </Button>
              <Button asChild variant="outline" className="h-12">
                <a
                  href={reenviarAvaliacaoHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => track("status_os_reenviar_avaliacao", { etapa: os.etapa })}
                >
                  <Star className="mr-2 h-4 w-4" />
                  Reenviar avaliação
                </a>
              </Button>
            </div>

            <Button
              type="button"
              variant="outline"
              className="mt-3 h-12 w-full"
              disabled={gerandoPdf}
              onClick={baixarPdf}
            >
              <FileDown className="mr-2 h-4 w-4" />
              {gerandoPdf ? "Gerando comprovante…" : "Baixar comprovante em PDF"}
            </Button>
            <p className="mt-1 text-xs text-muted-foreground">
              Inclui a timeline, prazos, histórico e as fotos enviadas (quando exibidas nesta tela).
            </p>

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
            Cada atendimento recebe um número de OS gerado na triagem e fica vinculado ao celular
            informado. As etapas abaixo são as mesmas usadas internamente: nenhum serviço avança sem
            orçamento aprovado por escrito.
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
