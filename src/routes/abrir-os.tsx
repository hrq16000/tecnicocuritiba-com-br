import { useEffect, useMemo, useRef, useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CheckCircle2,
  ClipboardList,
  Copy,
  Home,
  Loader2,
  MapPin,
  Search,
  Send,
  ShieldCheck,
  Wrench,
} from "lucide-react";

import { supabase } from "@/integrations/supabase/client";
import {
  EQUIPMENT_BRANCHES,
  getBranch,
  resolveRoute,
  type Equipment,
} from "@/components/funnel/equipmentBranches";
import { getSessionId } from "@/lib/funnelSubmission";
import { buildFaqPageSchema, SITE } from "@/lib/jsonLd";
import { NAP_PHONE_DIGITS } from "@/lib/nap";
import { readUtms } from "@/lib/leadContext";
import {
  LAB_RESUMO,
  OS_COLETA_MIN,
  OS_VISITA_PRECO,
  VISITA_ENV_RULES,
  VISITA_RESUMO,
  buildLabTerms,
  buildOsMessage,
  generateOsCode,
  type OsModalidade,
} from "@/lib/osTerms";

const TITLE = "Abrir O.S. em Curitiba | Ordem de Serviço com Código";
const DESCRIPTION =
  "Abra sua Ordem de Serviço em Curitiba: Visita Técnica R$ 99,99 ou Coleta para Laboratório (mínimo R$ 299,99). Código de acompanhamento e confirmação pelo WhatsApp.";
const CANONICAL = `${SITE}/abrir-os`;

const FAQS = [
  {
    question: "O que é a Ordem de Serviço (O.S.)?",
    answer:
      "É o registro formal do seu atendimento, com código único de acompanhamento. Ao abrir a O.S., você escolhe a modalidade, aceita os termos e recebe a síntese para confirmar pelo WhatsApp.",
  },
  {
    question: "Qual a diferença entre Visita Técnica e Coleta para Laboratório?",
    answer: `A Visita Técnica (${OS_VISITA_PRECO}, até 30 minutos) vale para equipamentos funcionando: upgrades, atualização de sistemas e montagem. Equipamentos que não ligam ou defeitos complexos vão para o Laboratório (mínimo pré-aprovado ${OS_COLETA_MIN}), com prazo de reparo de 15 a 45 dias após aprovação do orçamento.`,
  },
  {
    question: "A Visita Técnica garante a resolução no local?",
    answer:
      "Não há garantia de resolução imediata. A visita cobre até 30 minutos de inspeção e ajustes; diagnósticos profundos exigem bancada e seguem para a modalidade Laboratório.",
  },
  {
    question: "Como acompanho o status da minha O.S.?",
    answer:
      "Guarde o código gerado (ex.: OS-2026-AB12). Você pode consultar o status na própria página /abrir-os, aba Consultar, ou em /status-os.",
  },
  {
    question: "Posso cancelar ou desistir?",
    answer:
      "Na modalidade Laboratório, cancelamento gratuito ou desistência somente se manifestados em até 24 horas após a coleta. Após esse prazo ou após aprovação do orçamento, aplica-se a taxa de cancelamento prevista nos termos.",
  },
];

const BREADCRUMB_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Início", item: `${SITE}/` },
    { "@type": "ListItem", position: 2, name: "Abrir O.S.", item: CANONICAL },
  ],
};

export const Route = createFileRoute("/abrir-os")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: CANONICAL },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: CANONICAL }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(buildFaqPageSchema(FAQS)) },
      { type: "application/ld+json", children: JSON.stringify(BREADCRUMB_SCHEMA) },
    ],
  }),
  component: AbrirOsPage,
});

type Step = 0 | 1 | 2 | 3 | 4;

interface OsForm {
  equipamento: Equipment | null;
  sintoma: string;
  marca: string;
  descricao: string;
  bairro: string;
  cidade: string;
  telefone: string;
}

const EMPTY_FORM: OsForm = {
  equipamento: null,
  sintoma: "",
  marca: "",
  descricao: "",
  bairro: "",
  cidade: "Curitiba",
  telefone: "",
};

interface OsLookupRow {
  numero: string;
  etapa: string;
  descricao_curta: string | null;
  equipamento: string | null;
  prazo_estimado: string | null;
  previsao_conclusao: string | null;
  observacao_publica: string | null;
  historico: Array<{ etapa?: string; em?: string; obs?: string }> | null;
  created_at: string;
  updated_at: string;
}

function AbrirOsPage() {
  const [tab, setTab] = useState<"abrir" | "consultar">("abrir");
  const [step, setStep] = useState<Step>(0);
  const [form, setForm] = useState<OsForm>(EMPTY_FORM);
  const [accepted, setAccepted] = useState<boolean[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [codigo, setCodigo] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState<{ codigo: string; waUrl: string } | null>(null);
  const [copied, setCopied] = useState(false);
  const errorRef = useRef<HTMLDivElement>(null);

  // Pré-preenche localidade via geo do navegador (client-only, import dinâmico — SSR-safe).
  useEffect(() => {
    let alive = true;
    let unsub: (() => void) | undefined;
    void import("@/lib/geoCity").then((m) => {
      if (!alive) return;
      const apply = (g: { status: string; city?: string; neighborhood?: string }) => {
        if (g.status === "ok" && g.city) {
          setForm((f) => ({
            ...f,
            cidade: f.cidade || g.city || "",
            bairro: f.bairro || g.neighborhood || "",
          }));
        }
      };
      apply(m.getGeoState());
      unsub = m.subscribeGeo(apply);
      void m.initGeo();
    });
    return () => {
      alive = false;
      unsub?.();
    };
  }, []);

  const branch = form.equipamento ? getBranch(form.equipamento) : undefined;
  const modalidade: OsModalidade | null =
    form.equipamento && form.sintoma
      ? resolveRoute(form.equipamento, form.sintoma) === "coleta"
        ? "laboratorio"
        : "visita"
      : null;

  const sintomaLabel = useMemo(() => {
    if (!branch) return "";
    return branch.sintomas.find((s) => s.id === form.sintoma)?.label ?? "";
  }, [branch, form.sintoma]);

  // Aceites: Visita exige 4 regras de ambiente; Laboratório, 1 aceite integral.
  const requiredAccepts = modalidade === "visita" ? VISITA_ENV_RULES.length : 1;
  useEffect(() => {
    setAccepted(Array.from({ length: requiredAccepts }, () => false));
  }, [requiredAccepts]);
  const allAccepted = accepted.length > 0 && accepted.every(Boolean);

  const message = useMemo(() => {
    if (!codigo || !modalidade || !branch) return "";
    return buildOsMessage({
      codigo,
      modalidade,
      equipamentoLabel: branch.label,
      sintomaLabel,
      marca: form.marca.trim(),
      descricao: form.descricao.trim(),
      bairro: form.bairro.trim(),
      cidade: form.cidade.trim(),
    });
  }, [codigo, modalidade, branch, sintomaLabel, form]);

  const waUrl = useMemo(
    () => (message ? `https://wa.me/${NAP_PHONE_DIGITS}?text=${encodeURIComponent(message)}` : ""),
    [message],
  );

  const showError = (msg: string) => {
    setError(msg);
    requestAnimationFrame(() =>
      errorRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }),
    );
  };

  const canNext = (): boolean => {
    switch (step) {
      case 0:
        return !!form.equipamento;
      case 1:
        return !!form.sintoma;
      case 2:
        return allAccepted;
      case 3: {
        if (form.descricao.trim().length < 10) return false;
        if (!form.bairro.trim()) return false;
        const digits = form.telefone.replace(/\D/g, "");
        if (form.telefone && (digits.length < 10 || digits.length > 13)) return false;
        return true;
      }
      case 4:
        return !!codigo;
    }
  };

  const next = () => {
    setError(null);
    if (step === 3) {
      if (form.descricao.trim().length < 10) {
        showError("Descreva o defeito/serviço com pelo menos 10 caracteres.");
        return;
      }
      if (!form.bairro.trim()) {
        showError("Informe o bairro — usado para a logística de atendimento.");
        return;
      }
      const digits = form.telefone.replace(/\D/g, "");
      if (form.telefone && (digits.length < 10 || digits.length > 13)) {
        showError("Telefone deve ter entre 10 e 13 dígitos (com DDD), ou deixe em branco.");
        return;
      }
      if (!codigo) setCodigo(generateOsCode());
    }
    if (canNext()) setStep((s) => Math.min(4, s + 1) as Step);
  };

  const submit = async () => {
    if (!codigo || !modalidade || !branch) return;
    setSubmitting(true);
    setError(null);
    try {
      const digits = form.telefone.replace(/\D/g, "");
      const modalidadeLabel =
        modalidade === "visita"
          ? `Visita Técnica / Inspeção Local (${OS_VISITA_PRECO})`
          : `Coleta para Laboratório (mínimo ${OS_COLETA_MIN})`;
      const { error: dbError } = await supabase.from("ordens_servico").insert({
        numero: codigo,
        etapa: "aberta",
        descricao_curta: `${modalidadeLabel} · ${sintomaLabel || "Serviço"}`.slice(0, 400),
        equipamento: `${branch.label}${form.marca ? ` — ${form.marca.trim()}` : ""}`.slice(0, 120),
        sintomas: form.descricao.trim().slice(0, 2000),
        cidade: form.cidade.trim().slice(0, 80) || "Curitiba",
        bairro: form.bairro.trim().slice(0, 80),
        telefone: digits || null,
        prazo_estimado:
          modalidade === "visita"
            ? "Visita técnica — até 30 min no local"
            : "Coleta — reparo de 15 a 45 dias após aprovação",
        observacao_publica: "O.S. aberta via site — aguardando confirmação pelo WhatsApp.",
        historico: [],
        fotos: [],
        session_id: getSessionId(),
      });
      if (dbError) throw dbError;
      setDone({ codigo, waUrl });
    } catch {
      showError("Não foi possível registrar a O.S. agora. Tente novamente em instantes.");
    } finally {
      setSubmitting(false);
    }
  };

  const copyCode = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard indisponível — código continua visível */
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border/60">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4">
          <Link to="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <Home className="h-4 w-4" aria-hidden />
            Início
          </Link>
          <span className="inline-flex items-center gap-1.5 text-sm font-medium">
            <ClipboardList className="h-4 w-4 text-primary" aria-hidden />
            Ordem de Serviço
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 pb-20 pt-10">
        <nav aria-label="Breadcrumb" className="mb-6 text-xs text-muted-foreground">
          <ol className="flex items-center gap-1.5">
            <li>
              <Link to="/" className="hover:text-foreground">Início</Link>
            </li>
            <li aria-hidden>›</li>
            <li aria-current="page" className="text-foreground">Abrir O.S.</li>
          </ol>
        </nav>

        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Abrir Ordem de Serviço (O.S.)
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          Registre seu atendimento com código único, aceite os termos da modalidade e
          confirme pelo WhatsApp. Sem cadastro, sem e-mail — contato exclusivamente
          pelo WhatsApp.
        </p>

        <div role="tablist" aria-label="Abrir ou consultar O.S." className="mt-8 flex gap-2">
          {(
            [
              { id: "abrir", label: "Abrir O.S.", icon: Wrench },
              { id: "consultar", label: "Consultar O.S.", icon: Search },
            ] as const
          ).map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              role="tab"
              aria-selected={tab === id}
              onClick={() => setTab(id)}
              className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
                tab === id
                  ? "border-primary bg-primary/10 text-foreground"
                  : "border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="h-4 w-4" aria-hidden />
              {label}
            </button>
          ))}
        </div>

        {tab === "abrir" ? (
          done ? (
            <SuccessPanel done={done} copied={copied} onCopy={copyCode} />
          ) : (
            <section className="mt-6 rounded-2xl border border-border/60 bg-card/60 p-5 backdrop-blur-sm sm:p-7">
              <StepIndicator step={step} />

              {error && (
                <div
                  ref={errorRef}
                  role="alert"
                  className="mb-5 rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive"
                >
                  {error}
                </div>
              )}

              {step === 0 && (
                <fieldset>
                  <legend className="mb-4 text-base font-semibold">Qual é o equipamento?</legend>
                  <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                    {EQUIPMENT_BRANCHES.map((b) => (
                      <button
                        key={b.id}
                        type="button"
                        onClick={() => {
                          setForm((f) => ({ ...f, equipamento: b.id, sintoma: "" }));
                          setError(null);
                        }}
                        aria-pressed={form.equipamento === b.id}
                        className={`rounded-xl border px-3 py-3.5 text-left text-sm transition-all ${
                          form.equipamento === b.id
                            ? "border-primary bg-primary/10"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <span className="mb-1 block text-lg" aria-hidden>{b.emoji}</span>
                        {b.label}
                      </button>
                    ))}
                  </div>
                </fieldset>
              )}

              {step === 1 && branch && (
                <fieldset>
                  <legend className="mb-4 text-base font-semibold">
                    O que está acontecendo com {branch.label}?
                  </legend>
                  <div className="grid gap-2">
                    {branch.sintomas.map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => {
                          setForm((f) => ({ ...f, sintoma: s.id }));
                          setError(null);
                        }}
                        aria-pressed={form.sintoma === s.id}
                        className={`flex items-center justify-between rounded-xl border px-4 py-3 text-left text-sm transition-all ${
                          form.sintoma === s.id
                            ? "border-primary bg-primary/10"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <span>{s.label}</span>
                        {s.requiresColeta && (
                          <span className="ml-3 shrink-0 rounded-full border border-border px-2 py-0.5 text-[10px] uppercase tracking-wide text-muted-foreground">
                            Laboratório
                          </span>
                        )}
                      </button>
                    ))}
                    {branch.sintomas.length === 0 && (
                      <button
                        type="button"
                        onClick={() => {
                          setForm((f) => ({ ...f, sintoma: "outro" }));
                          setError(null);
                        }}
                        className={`rounded-xl border px-4 py-3 text-left text-sm transition-all ${
                          form.sintoma === "outro"
                            ? "border-primary bg-primary/10"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        Outro serviço — descrevo na próxima etapa
                      </button>
                    )}
                  </div>
                </fieldset>
              )}

              {step === 2 && modalidade && (
                <TermsStep
                  modalidade={modalidade}
                  accepted={accepted}
                  onToggle={(i) =>
                    setAccepted((a) => a.map((v, idx) => (idx === i ? !v : v)))
                  }
                  codigoPreview={codigo ?? "OS-2026-XXXX"}
                />
              )}

              {step === 3 && (
                <fieldset className="grid gap-4">
                  <legend className="mb-1 text-base font-semibold">Dados do equipamento e local</legend>
                  <label className="grid gap-1.5 text-sm">
                    <span className="font-medium">Marca/Modelo (opcional)</span>
                    <input
                      type="text"
                      value={form.marca}
                      maxLength={80}
                      onChange={(e) => setForm((f) => ({ ...f, marca: e.target.value }))}
                      placeholder={branch?.marcaLabel ?? "Ex.: Dell Inspiron 15"}
                      className="rounded-lg border border-border bg-background px-3 py-2.5 outline-none focus:border-primary"
                    />
                  </label>
                  <label className="grid gap-1.5 text-sm">
                    <span className="font-medium">
                      Descreva o defeito ou serviço <span className="text-destructive">*</span>
                    </span>
                    <textarea
                      value={form.descricao}
                      maxLength={2000}
                      rows={4}
                      onChange={(e) => setForm((f) => ({ ...f, descricao: e.target.value }))}
                      placeholder="Ex.: Notebook liga, mas a tela fica preta após o logo. Começou após uma queda leve."
                      className="resize-y rounded-lg border border-border bg-background px-3 py-2.5 outline-none focus:border-primary"
                    />
                    <span className="text-xs text-muted-foreground">
                      Fotos e vídeo do defeito são enviados depois, na conversa do WhatsApp.
                    </span>
                  </label>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="grid gap-1.5 text-sm">
                      <span className="font-medium">
                        Bairro <span className="text-destructive">*</span>
                      </span>
                      <div className="relative">
                        <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
                        <input
                          type="text"
                          value={form.bairro}
                          maxLength={80}
                          onChange={(e) => setForm((f) => ({ ...f, bairro: e.target.value }))}
                          placeholder="Ex.: Água Verde"
                          className="w-full rounded-lg border border-border bg-background py-2.5 pl-9 pr-3 outline-none focus:border-primary"
                        />
                      </div>
                      <span className="text-xs text-muted-foreground">
                        Se a localização automática falhar, digite manualmente.
                      </span>
                    </label>
                    <label className="grid gap-1.5 text-sm">
                      <span className="font-medium">Cidade</span>
                      <input
                        type="text"
                        value={form.cidade}
                        maxLength={80}
                        onChange={(e) => setForm((f) => ({ ...f, cidade: e.target.value }))}
                        className="rounded-lg border border-border bg-background px-3 py-2.5 outline-none focus:border-primary"
                      />
                    </label>
                  </div>
                  <label className="grid gap-1.5 text-sm">
                    <span className="font-medium">Telefone para contato (opcional)</span>
                    <input
                      type="tel"
                      inputMode="numeric"
                      value={form.telefone}
                      maxLength={15}
                      onChange={(e) => setForm((f) => ({ ...f, telefone: e.target.value }))}
                      placeholder="DDD + número — usado só para o técnico falar com você"
                      className="rounded-lg border border-border bg-background px-3 py-2.5 outline-none focus:border-primary"
                    />
                  </label>
                </fieldset>
              )}

              {step === 4 && codigo && modalidade && (
                <div>
                  <h2 className="mb-1 text-base font-semibold">Revisão e confirmação</h2>
                  <p className="mb-4 text-sm text-muted-foreground">
                    Confira a síntese que será enviada ao atendimento. Ao confirmar, a O.S. é
                    registrada e o WhatsApp abre com esta mensagem pronta.
                  </p>
                  <div className="mb-4 flex items-center gap-3 rounded-xl border border-primary/40 bg-primary/5 px-4 py-3">
                    <span className="text-sm text-muted-foreground">Código da O.S.:</span>
                    <strong className="font-mono text-base tracking-wide">{codigo}</strong>
                    <button
                      type="button"
                      onClick={() => void copyCode(codigo)}
                      className="ml-auto inline-flex items-center gap-1 rounded-md border border-border px-2 py-1 text-xs hover:border-primary/60"
                    >
                      <Copy className="h-3.5 w-3.5" aria-hidden />
                      {copied ? "Copiado!" : "Copiar"}
                    </button>
                  </div>
                  <pre className="max-h-72 overflow-y-auto whitespace-pre-wrap rounded-xl border border-border bg-background/70 p-4 text-xs leading-relaxed text-foreground/90">
                    {message}
                  </pre>
                  <button
                    type="button"
                    onClick={() => void submit()}
                    disabled={submitting}
                    className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                        Registrando O.S.…
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" aria-hidden />
                        Registrar O.S. e confirmar no WhatsApp
                      </>
                    )}
                  </button>
                </div>
              )}

              {step < 4 && (
                <div className="mt-7 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => {
                      setError(null);
                      setStep((s) => Math.max(0, s - 1) as Step);
                    }}
                    disabled={step === 0}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-border px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground disabled:invisible"
                  >
                    <ArrowLeft className="h-4 w-4" aria-hidden />
                    Voltar
                  </button>
                  <button
                    type="button"
                    onClick={next}
                    disabled={!canNext()}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-40"
                  >
                    Avançar
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </button>
                </div>
              )}
            </section>
          )
        ) : (
          <ConsultaOs />
        )}

        <section className="mt-12 rounded-2xl border border-border/60 bg-card/40 p-5 sm:p-7">
          <h2 className="flex items-center gap-2 text-base font-semibold">
            <ShieldCheck className="h-5 w-5 text-primary" aria-hidden />
            Perguntas frequentes sobre a O.S.
          </h2>
          <dl className="mt-4 grid gap-5">
            {FAQS.map((f) => (
              <div key={f.question}>
                <dt className="text-sm font-medium">{f.question}</dt>
                <dd className="mt-1 text-sm leading-relaxed text-muted-foreground">{f.answer}</dd>
              </div>
            ))}
          </dl>
        </section>
      </main>
    </div>
  );
}

function StepIndicator({ step }: { step: Step }) {
  const labels = ["Equipamento", "Sintoma", "Termos", "Dados", "Confirmação"];
  return (
    <ol className="mb-6 flex flex-wrap items-center gap-1.5" aria-label="Etapas da O.S.">
      {labels.map((label, i) => (
        <li key={label} className="flex items-center gap-1.5">
          <span
            aria-current={i === step ? "step" : undefined}
            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium ${
              i < step
                ? "border-primary/50 bg-primary/10 text-foreground"
                : i === step
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-muted-foreground"
            }`}
          >
            {i < step ? <CheckCircle2 className="h-3 w-3" aria-hidden /> : null}
            {label}
          </span>
          {i < labels.length - 1 && <span className="text-border" aria-hidden>›</span>}
        </li>
      ))}
    </ol>
  );
}

function TermsStep({
  modalidade,
  accepted,
  onToggle,
  codigoPreview,
}: {
  modalidade: OsModalidade;
  accepted: boolean[];
  onToggle: (index: number) => void;
  codigoPreview: string;
}) {
  const isVisita = modalidade === "visita";
  return (
    <div>
      <div className="mb-5 flex items-start gap-3 rounded-xl border border-primary/40 bg-primary/5 p-4">
        {isVisita ? (
          <Wrench className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
        ) : (
          <Building2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
        )}
        <div>
          <h2 className="text-base font-semibold">
            {isVisita
              ? `Modalidade A — Visita Técnica / Inspeção Local · ${OS_VISITA_PRECO}`
              : `Modalidade B — Coleta para Laboratório · mínimo ${OS_COLETA_MIN}`}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {isVisita
              ? "Indicada porque seu equipamento funciona (liga e dá vídeo)."
              : "Indicada porque o defeito exige análise de bancada ou o equipamento não liga."}
          </p>
        </div>
      </div>

      <ul className="mb-5 grid gap-2 text-sm text-muted-foreground">
        {(isVisita ? VISITA_RESUMO : LAB_RESUMO).map((item) => (
          <li key={item} className="flex gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
            {item}
          </li>
        ))}
      </ul>

      {isVisita ? (
        <fieldset className="grid gap-2.5">
          <legend className="mb-2 text-sm font-semibold">
            Regras de ambiente — aceite obrigatório (item a item)
          </legend>
          {VISITA_ENV_RULES.map((rule, i) => (
            <label
              key={rule}
              className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3.5 text-sm transition-colors ${
                accepted[i] ? "border-primary/60 bg-primary/5" : "border-border hover:border-primary/40"
              }`}
            >
              <input
                type="checkbox"
                checked={!!accepted[i]}
                onChange={() => onToggle(i)}
                className="mt-0.5 h-4 w-4 shrink-0 accent-[hsl(var(--primary))]"
              />
              <span>{rule}</span>
            </label>
          ))}
        </fieldset>
      ) : (
        <div>
          <h3 className="mb-2 text-sm font-semibold">
            Termos da O.S. de laboratório — leia com atenção
          </h3>
          <pre className="max-h-80 overflow-y-auto whitespace-pre-wrap rounded-xl border border-border bg-background/70 p-4 text-xs leading-relaxed text-foreground/90">
            {buildLabTerms(codigoPreview)}
          </pre>
          <label
            className={`mt-4 flex cursor-pointer items-start gap-3 rounded-xl border p-3.5 text-sm transition-colors ${
              accepted[0] ? "border-primary/60 bg-primary/5" : "border-border hover:border-primary/40"
            }`}
          >
            <input
              type="checkbox"
              checked={!!accepted[0]}
              onChange={() => onToggle(0)}
              className="mt-0.5 h-4 w-4 shrink-0 accent-[hsl(var(--primary))]"
            />
            <span>
              Li e aceito integralmente os termos da O.S. de laboratório, incluindo taxa de
              tentativa, taxa de cancelamento ({OS_COLETA_MIN}), logística de desistência (retirada
              pelo cliente), prazo de reparo de 15 a 45 dias e reciclagem após 90 dias de abandono.
            </span>
          </label>
        </div>
      )}
    </div>
  );
}

function SuccessPanel({
  done,
  copied,
  onCopy,
}: {
  done: { codigo: string; waUrl: string };
  copied: boolean;
  onCopy: (value: string) => void;
}) {
  return (
    <section className="mt-6 rounded-2xl border border-primary/40 bg-primary/5 p-6 text-center sm:p-8">
      <CheckCircle2 className="mx-auto h-10 w-10 text-primary" aria-hidden />
      <h2 className="mt-3 text-xl font-bold">O.S. registrada com sucesso!</h2>
      <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
        Guarde seu código para acompanhar o status. Para concluir, confirme o recebimento
        com o atendimento no WhatsApp — a mensagem já vai preenchida.
      </p>
      <div className="mx-auto mt-5 flex w-fit items-center gap-3 rounded-xl border border-border bg-background px-5 py-3">
        <span className="font-mono text-lg font-semibold tracking-wide">{done.codigo}</span>
        <button
          type="button"
          onClick={() => onCopy(done.codigo)}
          className="inline-flex items-center gap-1 rounded-md border border-border px-2 py-1 text-xs hover:border-primary/60"
        >
          <Copy className="h-3.5 w-3.5" aria-hidden />
          {copied ? "Copiado!" : "Copiar"}
        </button>
      </div>
      <a
        href={done.waUrl}
        target="_blank"
        rel="noopener noreferrer"
        data-funnel-skip="1"
        className="mt-5 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
      >
        <Send className="h-4 w-4" aria-hidden />
        Confirmar no WhatsApp
      </a>
      <p className="mt-3 text-xs text-muted-foreground">
        Envie as fotos/vídeo do defeito na própria conversa.
      </p>
    </section>
  );
}

function ConsultaOs() {
  const [numero, setNumero] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<OsLookupRow[] | null>(null);
  const [lookupError, setLookupError] = useState<string | null>(null);

  const lookup = async () => {
    const value = numero.trim().toUpperCase();
    if (!value) {
      setLookupError("Digite o código da O.S. (ex.: OS-2026-AB12).");
      return;
    }
    setLoading(true);
    setLookupError(null);
    setResult(null);
    try {
      const { data, error: rpcError } = await supabase.rpc("consultar_os", {
        _numero: value,
        _origem: "/abrir-os",
        _utm: readUtms(),
      });
      if (rpcError) {
        const msg = rpcError.message ?? "";
        if (msg.includes("numero_invalido")) {
          setLookupError("Código inválido. Confira o formato (ex.: OS-2026-AB12).");
        } else if (msg.includes("rate_limited")) {
          setLookupError("Muitas consultas em sequência. Aguarde alguns minutos e tente de novo.");
        } else {
          setLookupError("Não foi possível consultar agora. Tente novamente em instantes.");
        }
        return;
      }
      setResult((data as unknown as OsLookupRow[]) ?? []);
    } catch {
      setLookupError("Falha de conexão ao consultar. Verifique sua internet e tente de novo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mt-6 rounded-2xl border border-border/60 bg-card/60 p-5 backdrop-blur-sm sm:p-7">
      <h2 className="text-base font-semibold">Consultar status da O.S.</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Digite o código recebido na abertura para ver a etapa atual do atendimento.
      </p>
      <form
        className="mt-4 flex flex-col gap-2.5 sm:flex-row"
        onSubmit={(e) => {
          e.preventDefault();
          void lookup();
        }}
      >
        <input
          type="text"
          value={numero}
          maxLength={40}
          onChange={(e) => setNumero(e.target.value)}
          placeholder="Ex.: OS-2026-AB12"
          aria-label="Código da O.S."
          className="flex-1 rounded-lg border border-border bg-background px-3.5 py-2.5 font-mono text-sm uppercase outline-none focus:border-primary"
        />
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-40"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : <Search className="h-4 w-4" aria-hidden />}
          Consultar
        </button>
      </form>

      {lookupError && (
        <p role="alert" className="mt-4 rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {lookupError}
        </p>
      )}

      {loading && (
        <div className="mt-5 grid gap-3" aria-busy="true" aria-label="Consultando">
          <div className="h-5 w-40 animate-pulse rounded bg-muted" />
          <div className="h-24 animate-pulse rounded-xl bg-muted/70" />
        </div>
      )}

      {result && result.length === 0 && !loading && (
        <p className="mt-4 rounded-lg border border-border bg-background/60 px-4 py-3 text-sm text-muted-foreground">
          Nenhuma O.S. encontrada com esse código. Confira os caracteres e tente novamente.
        </p>
      )}

      {result?.map((os) => (
        <article key={os.numero} className="mt-5 rounded-xl border border-border bg-background/60 p-5">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="font-mono text-sm font-semibold">{os.numero}</span>
            <span className="rounded-full bg-primary/15 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-primary">
              {os.etapa.replace(/_/g, " ")}
            </span>
          </div>
          {os.descricao_curta && <p className="mt-2 text-sm">{os.descricao_curta}</p>}
          <dl className="mt-3 grid gap-1.5 text-xs text-muted-foreground sm:grid-cols-2">
            {os.equipamento && (
              <div><dt className="inline font-medium text-foreground/80">Equipamento: </dt><dd className="inline">{os.equipamento}</dd></div>
            )}
            {os.prazo_estimado && (
              <div><dt className="inline font-medium text-foreground/80">Prazo: </dt><dd className="inline">{os.prazo_estimado}</dd></div>
            )}
            {os.previsao_conclusao && (
              <div><dt className="inline font-medium text-foreground/80">Previsão: </dt><dd className="inline">{new Date(os.previsao_conclusao).toLocaleDateString("pt-BR")}</dd></div>
            )}
          </dl>
          {os.observacao_publica && (
            <p className="mt-3 rounded-lg border border-border/70 bg-card/60 px-3.5 py-2.5 text-sm text-muted-foreground">
              {os.observacao_publica}
            </p>
          )}
          {Array.isArray(os.historico) && os.historico.length > 0 && (
            <ol className="mt-4 grid gap-2 border-l-2 border-border pl-4">
              {os.historico.map((h, i) => (
                <li key={i} className="text-xs text-muted-foreground">
                  <span className="font-medium text-foreground/80">{h.etapa ?? "Atualização"}</span>
                  {h.em ? ` — ${new Date(h.em).toLocaleString("pt-BR")}` : ""}
                  {h.obs ? ` · ${h.obs}` : ""}
                </li>
              ))}
            </ol>
          )}
        </article>
      ))}
    </section>
  );
}
