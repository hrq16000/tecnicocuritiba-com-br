import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, CheckCircle, FileDown, ImagePlus, MessageCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { trackCTAClick } from "@/lib/analytics";
import { NAP_PHONE_DIGITS } from "@/lib/nap";
import { baixarOrdemServicoPdf, gerarNumeroOS } from "@/lib/ordemServicoPdf";
import { cn } from "@/lib/utils";

/**
 * Mini-wizard de orçamento para montagem de PC.
 * Coleta uso pretendido, configuração/modelo, origem das peças, localização e
 * aceite de termos, e abre o WhatsApp com a mensagem completa já preenchida.
 * Nenhum número é exposto no DOM (regra do projeto): o link só é montado no clique.
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

interface FormState {
  uso: string;
  modelo: string;
  pecasOrigem: string;
  pecasLista: string;
  orcamento: string;
  cidade: string;
  bairro: string;
  aceite: boolean;
}

const INITIAL: FormState = {
  uso: "",
  modelo: "",
  pecasOrigem: "",
  pecasLista: "",
  orcamento: "",
  cidade: "",
  bairro: "",
  aceite: false,
};

const labelOf = (list: readonly { id: string; label: string }[], id: string) =>
  list.find((i) => i.id === id)?.label || "";

export function OrcamentoMontagemWizard() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(INITIAL);
  const [error, setError] = useState<string | null>(null);

  const set = <K extends keyof FormState>(k: K, v: FormState[K]) => {
    setForm((f) => ({ ...f, [k]: v }));
    setError(null);
  };

  const validate = (s: number): string | null => {
    if (s === 0 && !form.uso) return "Escolha o uso pretendido do computador.";
    if (s === 1 && form.modelo.trim().length < 5)
      return "Descreva em poucas palavras a configuração ou o modelo pretendido (mínimo 5 caracteres).";
    if (s === 2) {
      if (!form.pecasOrigem) return "Informe quem fornece as peças.";
      if (form.pecasOrigem !== "tecnico" && form.pecasLista.trim().length < 3)
        return "Liste as peças que você já tem.";
    }
    if (s === 3 && !form.cidade) return "Selecione sua cidade.";
    if (s === 4 && !form.aceite)
      return "É necessário aceitar os termos, a política de peças e a condição de valor mínimo.";
    return null;
  };

  const next = () => {
    const err = validate(step);
    if (err) return setError(err);
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  const back = () => {
    setError(null);
    setStep((s) => Math.max(s - 1, 0));
  };

  const message = useMemo(() => {
    const local = [form.bairro.trim(), form.cidade].filter(Boolean).join(", ");
    const lines = [
      "Olá! Vim do site tecnicocuritiba.com.br.",
      "Assunto: Orçamento de montagem de PC",
      form.uso ? `Uso pretendido: ${labelOf(USOS, form.uso)}.` : "",
      form.modelo.trim() ? `Configuração/modelo: ${form.modelo.trim()}.` : "",
      form.pecasOrigem ? `Peças: ${labelOf(PECAS_ORIGEM, form.pecasOrigem)}.` : "",
      form.pecasLista.trim() ? `Peças que já tenho: ${form.pecasLista.trim()}.` : "",
      form.orcamento.trim() ? `Faixa de investimento: ${form.orcamento.trim()}.` : "",
      local ? `Local: ${local}.` : "",
      "Li e aceito os termos e condições, a política de peças do cliente e a mão de obra a partir de R$ 99,99 com orçamento aprovado antes do serviço.",
      "[ref: wizard/montagem-pc]",
      "Podem me atender?",
    ].filter(Boolean);
    return lines.join("\n");
  }, [form]);

  const submit = () => {
    const err = validate(4);
    if (err) return setError(err);
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

  const inputCls =
    "w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent";

  const optionCls = (active: boolean) =>
    cn(
      "w-full text-left rounded-xl border px-4 py-3 transition-colors",
      active
        ? "border-accent bg-accent/10 text-foreground font-semibold"
        : "border-border bg-background text-foreground hover:border-accent/60",
    );

  return (
    <div className="max-w-2xl mx-auto bg-secondary rounded-2xl p-6 md:p-8" id="orcamento-wizard">
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
          {USOS.map((u) => (
            <button key={u.id} type="button" className={optionCls(form.uso === u.id)} onClick={() => set("uso", u.id)}>
              {u.label}
            </button>
          ))}
        </fieldset>
      )}

      {step === 1 && (
        <div className="space-y-3">
          <label className="block font-bold text-foreground" htmlFor="wz-modelo">
            Qual configuração ou modelo você pretende?
          </label>
          <textarea
            id="wz-modelo"
            className={cn(inputCls, "min-h-28")}
            maxLength={600}
            placeholder="Ex.: Ryzen 5 7600 + RX 7600 + 32GB, ou 'não sei, quero indicação para jogar em 1080p'."
            value={form.modelo}
            onChange={(e) => set("modelo", e.target.value)}
          />
          <label className="block font-bold text-foreground" htmlFor="wz-orcamento">
            Faixa de investimento (opcional)
          </label>
          <input
            id="wz-orcamento"
            className={inputCls}
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
            <legend className="font-bold text-foreground mb-2">Quem fornece as peças?</legend>
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
          </fieldset>
          {form.pecasOrigem && form.pecasOrigem !== "tecnico" && (
            <>
              <label className="block font-bold text-foreground" htmlFor="wz-pecas">
                Quais peças você já tem?
              </label>
              <textarea
                id="wz-pecas"
                className={cn(inputCls, "min-h-24")}
                maxLength={600}
                placeholder="Ex.: placa-mãe B650, fonte 650W, gabinete, SSD 1TB."
                value={form.pecasLista}
                onChange={(e) => set("pecasLista", e.target.value)}
              />
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
            Cidade
          </label>
          <select
            id="wz-cidade"
            className={inputCls}
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
          <label className="block font-bold text-foreground" htmlFor="wz-bairro">
            Bairro (opcional)
          </label>
          <input
            id="wz-bairro"
            className={inputCls}
            maxLength={60}
            placeholder="Ex.: Batel"
            value={form.bairro}
            onChange={(e) => set("bairro", e.target.value)}
          />
        </div>
      )}

      {step === 4 && (
        <div className="space-y-4">
          <h3 className="font-bold text-foreground">Confira e aceite antes de enviar</h3>
          <pre className="whitespace-pre-wrap text-sm bg-background rounded-xl p-4 text-foreground border border-border">
            {message}
          </pre>
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
              , incluindo a regra de avaliação de valor do equipamento em caso de sinistro ou venda no estado, e a mão de
              obra a partir de R$ 99,99 com orçamento aprovado antes do serviço.
            </span>
          </label>
        </div>
      )}

      {error && (
        <p className="mt-4 text-sm font-medium text-destructive" role="alert">
          {error}
        </p>
      )}

      <div className="flex flex-col sm:flex-row gap-3 mt-6">
        {step > 0 && (
          <Button type="button" variant="outline" onClick={back}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Button>
        )}
        {step < STEPS.length - 1 ? (
          <Button type="button" onClick={next} className="sm:ml-auto">
            Continuar
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <span data-cta-location="montagem_pc_wizard" className="sm:ml-auto">
            <Button
              type="button"
              onClick={submit}
              disabled={!form.aceite}
              className="w-full bg-[hsl(var(--whatsapp))] hover:bg-[hsl(var(--whatsapp-hover))] text-white"
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              Enviar orçamento no WhatsApp
            </Button>
          </span>
        )}
      </div>

      <p className="mt-4 text-xs text-muted-foreground flex gap-2 items-start">
        <CheckCircle className="h-4 w-4 shrink-0 text-accent mt-0.5" />
        Nada é enviado automaticamente: a mensagem abre no seu WhatsApp para você revisar antes de mandar.
      </p>
    </div>
  );
}

export default OrcamentoMontagemWizard;
