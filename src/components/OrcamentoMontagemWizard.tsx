import { useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AlertCircle, ArrowLeft, ArrowRight, CheckCircle, FileDown, ImagePlus, MessageCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { bip } from "@/lib/attentionBip";
import { trackCTAClick } from "@/lib/analytics";
import { buildSiteReviewUrl } from "@/lib/reviewRequest";
import { WhatsAppQr } from "@/components/WhatsAppQr";
import { NAP_PHONE_DIGITS } from "@/lib/nap";
import { baixarOrdemServicoPdf, gerarNumeroOS } from "@/lib/ordemServicoPdf";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";

/**
 * Mini-wizard de orçamento para montagem de PC.
 * Coleta uso pretendido, configuração/modelo, origem das peças, anexos,
 * localização, consentimento LGPD e aceite de termos, e abre o WhatsApp com a
 * mensagem completa já preenchida.
 * Nenhum número é exposto no DOM (regra do projeto): o link só é montado no clique.
 * Campos pendentes recebem borda pulsante + foco automático + bip.
 */

const USOS = [
  { id: "jogos", label: "Jogos (PC Gamer)" },
  { id: "edicao", label: "Edição / 3D / workstation" },
  { id: "trabalho", label: "Trabalho e estudo" },
  { id: "servidor", label: "Servidor / uso específico" },
] as const;

const PECAS_ORIGEM = [
  { id: "cliente_todas", label: "Eu forneço todas as peças" },
  { id: "cliente_algumas", label: "Forneço algumas peças" },
  { id: "tecnico", label: "Preciso que vocês indiquem as peças" },
] as const;

const CIDADES = [
  "Curitiba",
  "São José dos Pinhais",
  "Pinhais",
  "Colombo",
  "Araucária",
  "Campo Largo",
  "Almirante Tamandaré",
  "Fazenda Rio Grande",
  "Piraquara",
  "Outra cidade",
];

const STEPS = ["Uso", "Configuração", "Peças", "Local", "Aceite"] as const;

type FieldKey =
  | "uso"
  | "modelo"
  | "pecasOrigem"
  | "pecasLista"
  | "cidade"
  | "aceite"
  | "lgpd";

interface FormState {
  uso: string;
  modelo: string;
  pecasOrigem: string;
  pecasLista: string;
  orcamento: string;
  cidade: string;
  bairro: string;
  periodo: string;
  aceite: boolean;
  lgpd: boolean;
}

const INITIAL: FormState = {
  uso: "",
  modelo: "",
  pecasOrigem: "",
  pecasLista: "",
  orcamento: "",
  cidade: "",
  bairro: "",
  periodo: "",
  aceite: false,
  lgpd: false,
};

const labelOf = (list: readonly { id: string; label: string }[], id: string) =>
  list.find((i) => i.id === id)?.label || "";

export function OrcamentoMontagemWizard() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(INITIAL);
  const [anexos, setAnexos] = useState<string[]>([]);
  const [numeroOS, setNumeroOS] = useState<string | null>(null);
  const [errors, setErrors] = useState<Partial<Record<FieldKey, string>>>({});
  const refs = useRef<Partial<Record<FieldKey, HTMLElement | null>>>({});
  const registradas = useRef<Set<string>>(new Set());

  const set = <K extends keyof FormState>(k: K, v: FormState[K]) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => {
      if (!(k in e)) return e;
      const next = { ...e };
      delete next[k as FieldKey];
      return next;
    });
  };

  const collect = (s: number): Partial<Record<FieldKey, string>> => {
    const e: Partial<Record<FieldKey, string>> = {};
    if (s === 0 && !form.uso) e.uso = "Escolha o uso pretendido do computador.";
    if (s === 1 && form.modelo.trim().length < 5)
      e.modelo = "Descreva a configuração ou o modelo pretendido (mínimo 5 caracteres).";
    if (s === 2) {
      if (!form.pecasOrigem) e.pecasOrigem = "Informe quem fornece as peças.";
      else if (form.pecasOrigem !== "tecnico" && form.pecasLista.trim().length < 3)
        e.pecasLista = "Liste as peças que você já tem.";
    }
    if (s === 3 && !form.cidade) e.cidade = "Selecione sua cidade.";
    if (s === 4) {
      if (!form.aceite) e.aceite = "É necessário aceitar os termos, a política de peças e o valor mínimo.";
      if (!form.lgpd) e.lgpd = "É necessário autorizar o uso dos dados e arquivos enviados (LGPD).";
    }
    return e;
  };

  /** Valida a etapa: marca os campos, dispara bip/vibração e foca o primeiro pendente. */
  const validate = (s: number): boolean => {
    const e = collect(s);
    setErrors(e);
    const first = Object.keys(e)[0] as FieldKey | undefined;
    if (first) {
      bip();
      const el = refs.current[first];
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
      window.setTimeout(() => el?.focus?.(), 250);
      return false;
    }
    return true;
  };

  const next = () => {
    if (!validate(step)) return;
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  const back = () => {
    setErrors({});
    setStep((s) => Math.max(s - 1, 0));
  };

  const message = useMemo(() => {
    const local = [form.bairro.trim(), form.cidade].filter(Boolean).join(", ");
    const lines = [
      "Olá! Vim do site tecnicocuritiba.com.br.",
      "Assunto: Orçamento de montagem de PC",
      numeroOS ? `Ordem de serviço: ${numeroOS} (PDF gerado no site).` : "",
      form.uso ? `Uso pretendido: ${labelOf(USOS, form.uso)}.` : "",
      form.modelo.trim() ? `Configuração/modelo: ${form.modelo.trim()}.` : "",
      form.pecasOrigem ? `Peças: ${labelOf(PECAS_ORIGEM, form.pecasOrigem)}.` : "",
      form.pecasLista.trim() ? `Peças que já tenho: ${form.pecasLista.trim()}.` : "",
      anexos.length ? `Vou anexar ${anexos.length} arquivo(s) (fotos/vídeos das peças) aqui no WhatsApp.` : "",
      form.orcamento.trim() ? `Faixa de investimento: ${form.orcamento.trim()}.` : "",
      local ? `Local: ${local}.` : "",
      form.periodo ? `Período preferido para contato/atendimento: ${form.periodo}.` : "",
      "Li e aceito os termos e condições, a política de peças do cliente e a mão de obra a partir de R$ 99,99 com orçamento aprovado antes do serviço.",
      "Autorizo o uso dos meus dados e arquivos para atendimento e emissão da ordem de serviço (LGPD).",
      numeroOS
        ? `Depois do serviço posso avaliar por aqui: ${buildSiteReviewUrl({ service: "montagem-pc", neighborhood: form.bairro.trim() || undefined, os: numeroOS, medium: "whatsapp_os" })}`
        : "",
      "[ref: wizard/montagem-pc]",
      "Podem me atender?",
    ].filter(Boolean);
    return lines.join("\n");
  }, [form, anexos, numeroOS]);

  /** Registra a OS no backend para acompanhamento em /status-os (best-effort). */
  const registrarOS = async (numero: string) => {
    if (registradas.current.has(numero)) return;
    registradas.current.add(numero);
    try {
      await supabase.from("ordens_servico").insert({
        numero,
        etapa: "aberta",
        descricao_curta: `Montagem de PC — ${labelOf(USOS, form.uso) || "uso não informado"}`.slice(0, 400),
        cidade: form.cidade || null,
        bairro: form.bairro.trim() || null,
        prazo_estimado: "Definido após diagnóstico e aprovação do orçamento.",
        observacao_publica: "Pedido registrado pelo site. Aguardando contato para confirmar escopo.",
      });
    } catch {
      /* acompanhamento é opcional: não bloqueia o atendimento */
    }
  };

  const baixarOS = async () => {
    if (!validate(4)) return;
    const numero = numeroOS || gerarNumeroOS();
    setNumeroOS(numero);
    void registrarOS(numero);

    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "os_pdf_download", {
        event_category: "engagement",
        os_numero: numero,
        servico: "montagem_pc",
        bairro: form.bairro.trim() || "nao_informado",
        cidade: form.cidade,
        anexos: anexos.length,
      });
    }
    trackCTAClick("whatsapp", "montagem_pc_wizard_os_pdf", {
      servico: "montagem_pc",
      category: form.uso,
      cidade: form.cidade,
      bairro: form.bairro || undefined,
    });
    await baixarOrdemServicoPdf({
      numero,
      uso: labelOf(USOS, form.uso),
      modelo: form.modelo.trim(),
      pecasOrigem: labelOf(PECAS_ORIGEM, form.pecasOrigem),
      pecasLista: form.pecasLista.trim(),
      orcamento: form.orcamento.trim(),
      cidade: form.cidade,
      bairro: form.bairro.trim(),
      fotos: anexos,
    });
  };

  const submit = () => {
    if (!validate(4)) return;
    const num = numeroOS || gerarNumeroOS();
    if (!numeroOS) setNumeroOS(num);
    void registrarOS(num);
    trackCTAClick("whatsapp", "montagem_pc_wizard", {
      servico: "montagem_pc",
      category: form.uso,
      equipamento: form.pecasOrigem,
      cidade: form.cidade,
      bairro: form.bairro || undefined,
    });
    window.open(
      `https://wa.me/${NAP_PHONE_DIGITS}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  const baseFieldCls =
    "w-full rounded-xl border border-border bg-background px-4 py-3 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent";

  const fieldCls = (k: FieldKey) =>
    cn(
      "w-full rounded-xl border bg-background px-4 py-3 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent",
      errors[k] ? "border-destructive animate-field-alert" : "border-border",
    );

  const groupCls = (k: FieldKey) =>
    cn("rounded-xl", errors[k] && "ring-2 ring-destructive animate-field-alert p-2 -m-2");

  const optionCls = (active: boolean) =>
    cn(
      "w-full text-left rounded-xl border px-4 py-4 min-h-[52px] transition-colors",
      active
        ? "border-accent bg-accent/10 text-foreground font-semibold"
        : "border-border bg-background text-foreground hover:border-accent/60",
    );

  const FieldError = ({ k }: { k: FieldKey }) =>
    errors[k] ? (
      <p className="mt-2 flex items-start gap-2 text-sm font-medium text-destructive" role="alert">
        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
        {errors[k]}
      </p>
    ) : null;

  return (
    <div className="max-w-2xl mx-auto bg-secondary rounded-2xl p-4 sm:p-6 md:p-8" id="orcamento-wizard">
      <ol className="flex flex-wrap gap-2 mb-6" aria-label="Etapas do orçamento">
        {STEPS.map((s, i) => (
          <li
            key={s}
            className={cn(
              "text-xs px-3 py-1 rounded-full border",
              i === step
                ? "bg-accent text-white border-accent"
                : i < step
                  ? "bg-accent/15 text-foreground border-accent/40"
                  : "bg-background text-muted-foreground border-border",
            )}
          >
            {i + 1}. {s}
          </li>
        ))}
      </ol>

      {step === 0 && (
        <fieldset className="space-y-3">
          <legend className="font-bold text-foreground mb-2">Para que você vai usar o computador?</legend>
          <div
            className={groupCls("uso")}
            ref={(el) => {
              refs.current.uso = el;
            }}
            tabIndex={-1}
          >
            <div className="space-y-3">
              {USOS.map((u) => (
                <button
                  key={u.id}
                  type="button"
                  className={optionCls(form.uso === u.id)}
                  onClick={() => set("uso", u.id)}
                >
                  {u.label}
                </button>
              ))}
            </div>
          </div>
          <FieldError k="uso" />
        </fieldset>
      )}

      {step === 1 && (
        <div className="space-y-3">
          <label className="block font-bold text-foreground" htmlFor="wz-modelo">
            Qual configuração ou modelo você pretende? <span className="text-destructive">*</span>
          </label>
          <textarea
            id="wz-modelo"
            ref={(el) => {
              refs.current.modelo = el;
            }}
            aria-invalid={!!errors.modelo}
            className={cn(fieldCls("modelo"), "min-h-28")}
            maxLength={600}
            placeholder="Ex.: Ryzen 5 7600 + RX 7600 + 32GB, ou 'não sei, quero indicação para jogar em 1080p'."
            value={form.modelo}
            onChange={(e) => set("modelo", e.target.value)}
          />
          <FieldError k="modelo" />
          <label className="block font-bold text-foreground" htmlFor="wz-orcamento">
            Faixa de investimento (opcional)
          </label>
          <input
            id="wz-orcamento"
            className={baseFieldCls}
            maxLength={60}
            placeholder="Ex.: até R$ 5.000"
            value={form.orcamento}
            onChange={(e) => set("orcamento", e.target.value)}
          />
        </div>
      )}

      {step === 2 && (
        <div className="space-y-3">
          <fieldset className="space-y-3">
            <legend className="font-bold text-foreground mb-2">
              Quem fornece as peças? <span className="text-destructive">*</span>
            </legend>
            <div
              className={groupCls("pecasOrigem")}
              ref={(el) => {
                refs.current.pecasOrigem = el;
              }}
              tabIndex={-1}
            >
              <div className="space-y-3">
                {PECAS_ORIGEM.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    className={optionCls(form.pecasOrigem === p.id)}
                    onClick={() => set("pecasOrigem", p.id)}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
            <FieldError k="pecasOrigem" />
          </fieldset>
          {form.pecasOrigem && form.pecasOrigem !== "tecnico" && (
            <>
              <label className="block font-bold text-foreground" htmlFor="wz-pecas">
                Quais peças você já tem? <span className="text-destructive">*</span>
              </label>
              <textarea
                id="wz-pecas"
                ref={(el) => {
                  refs.current.pecasLista = el;
                }}
                aria-invalid={!!errors.pecasLista}
                className={cn(fieldCls("pecasLista"), "min-h-24")}
                maxLength={600}
                placeholder="Ex.: placa-mãe B650, fonte 650W, gabinete, SSD 1TB."
                value={form.pecasLista}
                onChange={(e) => set("pecasLista", e.target.value)}
              />
              <FieldError k="pecasLista" />
              <label className="block font-bold text-foreground" htmlFor="wz-fotos">
                Fotos ou vídeos das peças/defeito (opcional)
              </label>
              <input
                id="wz-fotos"
                type="file"
                accept="image/*,video/*"
                multiple
                className={cn(
                  baseFieldCls,
                  "file:mr-3 file:rounded-lg file:border-0 file:bg-accent file:px-3 file:py-1.5 file:text-white",
                )}
                onChange={(e) =>
                  setAnexos(Array.from(e.target.files || []).slice(0, 10).map((f) => f.name))
                }
              />
              {anexos.length > 0 && (
                <p className="text-sm text-foreground flex items-start gap-2">
                  <ImagePlus className="h-4 w-4 mt-0.5 shrink-0 text-accent" />
                  {anexos.length} arquivo(s) selecionado(s): {anexos.join(", ")}. Ficam registrados na ordem de
                  serviço — anexe os arquivos direto na conversa do WhatsApp ao enviar.
                </p>
              )}
              <p className="text-sm text-muted-foreground">
                Peças fornecidas por você seguem a{" "}
                <Link to="/politica-pecas-cliente" className="text-primary underline underline-offset-4">
                  política de peças do cliente
                </Link>
                : garantia da peça é do vendedor; a nossa cobre montagem e configuração.
              </p>
            </>
          )}
        </div>
      )}

      {step === 3 && (
        <div className="space-y-3">
          <label className="block font-bold text-foreground" htmlFor="wz-cidade">
            Cidade <span className="text-destructive">*</span>
          </label>
          <select
            id="wz-cidade"
            ref={(el) => {
              refs.current.cidade = el;
            }}
            aria-invalid={!!errors.cidade}
            className={fieldCls("cidade")}
            value={form.cidade}
            onChange={(e) => set("cidade", e.target.value)}
          >
            <option value="">Selecione…</option>
            {CIDADES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <FieldError k="cidade" />
          <label className="block font-bold text-foreground" htmlFor="wz-bairro">
            Bairro (opcional)
          </label>
          <input
            id="wz-bairro"
            className={baseFieldCls}
            maxLength={60}
            placeholder="Ex.: Batel"
            value={form.bairro}
            onChange={(e) => set("bairro", e.target.value)}
          />
          <label className="block font-bold text-foreground" htmlFor="wz-periodo">
            Período preferido para o contato (opcional)
          </label>
          <select
            id="wz-periodo"
            className={baseFieldCls}
            value={form.periodo}
            onChange={(e) => set("periodo", e.target.value)}
          >
            <option value="">Tanto faz</option>
            <option value="Manhã (08h–12h)">Manhã (08h–12h)</option>
            <option value="Tarde (13h–18h)">Tarde (13h–18h)</option>
          </select>
        </div>
      )}


      {step === 4 && (
        <div className="space-y-4">
          <h3 className="font-bold text-foreground">Confira e aceite antes de enviar</h3>
          <pre className="whitespace-pre-wrap break-words text-sm bg-background rounded-xl p-4 text-foreground border border-border">
            {message}
          </pre>

          <div
            className={groupCls("aceite")}
            ref={(el) => {
              refs.current.aceite = el;
            }}
            tabIndex={-1}
          >
            <label className="flex gap-3 items-start text-sm text-foreground">
              <input
                type="checkbox"
                className="mt-1 h-5 w-5 accent-[hsl(var(--accent))]"
                checked={form.aceite}
                onChange={(e) => set("aceite", e.target.checked)}
              />
              <span>
                Li e aceito os{" "}
                <Link to="/termos-e-condicoes" className="text-primary underline underline-offset-4">
                  termos e condições
                </Link>{" "}
                e a{" "}
                <Link to="/politica-pecas-cliente" className="text-primary underline underline-offset-4">
                  política de peças do cliente
                </Link>
                , incluindo a regra de avaliação de valor do equipamento em caso de sinistro ou venda no estado, e a
                mão de obra a partir de R$ 99,99 com orçamento aprovado antes do serviço.
              </span>
            </label>
          </div>
          <FieldError k="aceite" />

          <div
            className={groupCls("lgpd")}
            ref={(el) => {
              refs.current.lgpd = el;
            }}
            tabIndex={-1}
          >
            <label className="flex gap-3 items-start text-sm text-foreground">
              <input
                type="checkbox"
                className="mt-1 h-5 w-5 accent-[hsl(var(--accent))]"
                checked={form.lgpd}
                onChange={(e) => set("lgpd", e.target.checked)}
              />
              <span>
                Autorizo o uso dos dados e arquivos informados (fotos/vídeos das peças, cidade e bairro) para
                atendimento, orçamento e emissão da ordem de serviço, conforme a{" "}
                <Link to="/politica-de-privacidade" className="text-primary underline underline-offset-4">
                  política de privacidade
                </Link>
                . Os dados ficam apenas no seu dispositivo e no WhatsApp enviado por você; nada é armazenado em
                servidor pelo site.
              </span>
            </label>
          </div>
          <FieldError k="lgpd" />
        </div>
      )}

      <div className="flex flex-col-reverse sm:flex-row gap-3 mt-6">
        {step > 0 && (
          <Button type="button" variant="outline" onClick={back} className="w-full sm:w-auto min-h-[48px]">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Button>
        )}
        {step < STEPS.length - 1 ? (
          <Button type="button" onClick={next} className="w-full sm:w-auto sm:ml-auto min-h-[48px]">
            Continuar
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <span data-cta-location="montagem_pc_wizard" className="w-full sm:w-auto sm:ml-auto">
            <Button
              type="button"
              onClick={submit}
              className="w-full min-h-[52px] bg-[hsl(var(--whatsapp))] hover:bg-[hsl(var(--whatsapp-hover))] text-white"
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              Enviar orçamento no WhatsApp
            </Button>
          </span>
        )}
      </div>

      {step === STEPS.length - 1 && (
        <div className="mt-4 rounded-xl border border-border bg-background p-4">
          <Button type="button" variant="outline" onClick={baixarOS} className="w-full min-h-[48px]">
            <FileDown className="mr-2 h-4 w-4" />
            Baixar Ordem de Serviço em PDF
          </Button>
          <div className="mt-4 grid gap-4 sm:grid-cols-[auto,1fr] sm:items-center">
            <WhatsAppQr
              size={132}
              campaign="wizard_montagem_pc"
              servico="montagem-pc"
              bairro={form.bairro.trim() || undefined}
              message="Olá! Fiz o orçamento de montagem no site e quero continuar."
              label="Escaneie para abrir a conversa no celular"
            />
            <p className="text-xs text-muted-foreground">
              Prefere continuar pelo celular? Aponte a câmera para o QR code — o link já leva o histórico do orçamento
              e a origem da página para o atendimento.
            </p>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            {numeroOS
              ? `Ordem de serviço ${numeroOS} gerada. O número segue junto na mensagem do WhatsApp como comprovante de abertura do pedido.`
              : "Gera um PDF com tudo que você preencheu (uso, peças, arquivos informados, local e condições) para você guardar e enviar junto no WhatsApp."}
          </p>
        </div>
      )}

      <p className="mt-4 text-xs text-muted-foreground flex gap-2 items-start">
        <CheckCircle className="h-4 w-4 shrink-0 text-accent mt-0.5" />
        Nada é enviado automaticamente: a mensagem abre no seu WhatsApp para você revisar antes de mandar.
      </p>
    </div>
  );
}

export default OrcamentoMontagemWizard;
