import { useState } from "react";
import { Sparkles, RotateCcw } from "lucide-react";
import { InlineTriageCTA } from "@/components/InlineTriageCTA";
import {
  COLETA_TAXA_MINIMA_LABEL,
  FRACAO_PRECO_LABEL,
  MSG_ORCAMENTO_APOS_COLETA,
  PRAZO_LONGO,
  PRAZO_RAPIDO,
  VISITA_MINIMA_LABEL,
} from "@/lib/coletaConfig";
import { trackCTAClick } from "@/lib/analytics";

/**
 * Estimativa rápida em 3 perguntas.
 * Não inventa preços: todos os valores vêm de src/lib/coletaConfig.ts
 * (fonte única) — mantém o gate check:price-consistency verde.
 */

type Equipamento = "notebook" | "desktop" | "tv-monitor" | "celular" | "rede";
type Problema = "nao-liga" | "lentidao-virus" | "upgrade" | "tela-imagem" | "internet";
type Local = "sim" | "nao";

const EQUIPAMENTOS: { id: Equipamento; label: string }[] = [
  { id: "notebook", label: "Notebook" },
  { id: "desktop", label: "PC / Desktop" },
  { id: "tv-monitor", label: "TV ou Monitor" },
  { id: "celular", label: "Celular / Som" },
  { id: "rede", label: "Internet / Wi-Fi" },
];

const PROBLEMAS: { id: Problema; label: string }[] = [
  { id: "nao-liga", label: "Não liga / desliga sozinho" },
  { id: "lentidao-virus", label: "Lentidão, vírus ou formatação" },
  { id: "upgrade", label: "Upgrade (SSD, memória)" },
  { id: "tela-imagem", label: "Problema de imagem/tela" },
  { id: "internet", label: "Internet caindo / sinal fraco" },
];

type Recomendacao = {
  modalidade: "Visita técnica" | "Coleta e entrega" | "Atendimento remoto";
  valor: string;
  regra: string;
  prazo: string;
  motivo: string;
};

function resolver(equipamento: Equipamento, problema: Problema, atendeNoLocal: Local): Recomendacao {
  // TV, monitor e celular são sempre laboratório (sem visita a domicílio).
  if (equipamento === "tv-monitor" || equipamento === "celular") {
    return {
      modalidade: "Coleta e entrega",
      valor: COLETA_TAXA_MINIMA_LABEL,
      regra: `Taxa mínima pré-aprovada, com coleta e entrega inclusas. ${MSG_ORCAMENTO_APOS_COLETA}.`,
      prazo: equipamento === "celular" ? PRAZO_RAPIDO : PRAZO_LONGO,
      motivo: "Esse tipo de aparelho é atendido em laboratório, com bancada e instrumentos próprios.",
    };
  }

  // Software puro pode ser resolvido remotamente quando o equipamento liga.
  if (problema === "lentidao-virus" && atendeNoLocal === "nao") {
    return {
      modalidade: "Atendimento remoto",
      valor: VISITA_MINIMA_LABEL,
      regra: FRACAO_PRECO_LABEL,
      prazo: "Normalmente no mesmo dia, conforme agenda",
      motivo: "Problemas de software com o equipamento ligando são resolvidos por acesso remoto.",
    };
  }

  if (problema === "nao-liga" && equipamento !== "rede") {
    return {
      modalidade: "Coleta e entrega",
      valor: COLETA_TAXA_MINIMA_LABEL,
      regra: `Taxa mínima pré-aprovada, com coleta e entrega inclusas. ${MSG_ORCAMENTO_APOS_COLETA}.`,
      prazo: PRAZO_LONGO,
      motivo: "Equipamento que não liga exige teste de placa e fonte em bancada.",
    };
  }

  return {
    modalidade: "Visita técnica",
    valor: VISITA_MINIMA_LABEL,
    regra: FRACAO_PRECO_LABEL,
    prazo: "Atendimento agendado conforme a rota do dia",
    motivo:
      problema === "internet"
        ? "Rede e Wi-Fi precisam ser medidos no ambiente real do cliente."
        : "O serviço pode ser executado no local, com você acompanhando.",
  };
}

export const EstimativaRapida = ({ className = "" }: { className?: string }) => {
  const [equipamento, setEquipamento] = useState<Equipamento | null>(null);
  const [problema, setProblema] = useState<Problema | null>(null);
  const [atendeNoLocal, setAtendeNoLocal] = useState<Local | null>(null);

  const pronto = equipamento && problema && atendeNoLocal;
  const rec = pronto ? resolver(equipamento!, problema!, atendeNoLocal!) : null;

  const labelDe = <T extends string>(lista: { id: T; label: string }[], id: T | null) =>
    lista.find((i) => i.id === id)?.label ?? "";

  const mensagem = rec
    ? [
        "Olá! Vim da estimativa rápida do site tecnicocuritiba.com.br.",
        `Equipamento: ${labelDe(EQUIPAMENTOS, equipamento)}.`,
        `Problema: ${labelDe(PROBLEMAS, problema)}.`,
        `Prefere atendimento no local: ${atendeNoLocal === "sim" ? "sim" : "não / tanto faz"}.`,
        `Opção indicada pelo site: ${rec.modalidade} — a partir de ${rec.valor}.`,
        "Podem confirmar o valor e o prazo?",
      ].join("\n")
    : undefined;

  const Grupo = <T extends string>({
    titulo,
    passo,
    itens,
    valor,
    onSelect,
  }: {
    titulo: string;
    passo: number;
    itens: { id: T; label: string }[];
    valor: T | null;
    onSelect: (id: T) => void;
  }) => (
    <fieldset className="mb-5">
      <legend className="text-sm font-semibold mb-2">
        <span className="text-accent">{passo}.</span> {titulo}
      </legend>
      <div className="flex flex-wrap gap-2">
        {itens.map((i) => (
          <button
            key={i.id}
            type="button"
            aria-pressed={valor === i.id}
            onClick={() => onSelect(i.id)}
            className={`rounded-full border px-4 py-2 text-sm transition-colors ${
              valor === i.id
                ? "border-accent bg-accent/10 text-accent font-semibold"
                : "border-border hover:border-accent/60"
            }`}
          >
            {i.label}
          </button>
        ))}
      </div>
    </fieldset>
  );

  return (
    <div className={`rounded-2xl border border-accent/20 bg-background p-5 md:p-6 ${className}`}>
      <div className="flex items-center gap-2 mb-1">
        <Sparkles className="h-5 w-5 text-accent" aria-hidden />
        <h3 className="text-xl font-bold">Estimativa rápida em 3 perguntas</h3>
      </div>
      <p className="text-sm text-muted-foreground mb-5">
        Responda três itens e veja qual modalidade encaixa melhor, o valor inicial e o prazo. O valor final só é
        confirmado após a descrição do defeito — nada é executado sem aprovação.
      </p>

      <Grupo titulo="Qual é o equipamento?" passo={1} itens={EQUIPAMENTOS} valor={equipamento} onSelect={setEquipamento} />
      <Grupo titulo="O que está acontecendo?" passo={2} itens={PROBLEMAS} valor={problema} onSelect={setProblema} />
      <Grupo
        titulo="Você precisa que seja no local?"
        passo={3}
        itens={[
          { id: "sim" as Local, label: "Sim, no meu endereço" },
          { id: "nao" as Local, label: "Não / tanto faz" },
        ]}
        valor={atendeNoLocal}
        onSelect={setAtendeNoLocal}
      />

      <div aria-live="polite">
        {rec && (
          <div className="rounded-xl border bg-secondary p-4">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Melhor opção para o seu caso</p>
            <p className="text-lg font-bold">{rec.modalidade}</p>
            <dl className="mt-2 grid gap-2 sm:grid-cols-2 text-sm">
              <div>
                <dt className="text-muted-foreground">A partir de</dt>
                <dd className="font-semibold">{rec.valor}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Prazo estimado</dt>
                <dd className="font-semibold">{rec.prazo}</dd>
              </div>
            </dl>
            <p className="mt-2 text-sm text-muted-foreground">{rec.regra}</p>
            <p className="mt-1 text-sm text-muted-foreground">{rec.motivo}</p>

            <div
              onClick={() =>
                trackCTAClick("whatsapp", "precos_estimativa_rapida", {
                  equipamento: equipamento ?? undefined,
                  problema: problema ?? undefined,
                  modalidade:
                    rec.modalidade === "Visita técnica"
                      ? "visita"
                      : rec.modalidade === "Coleta e entrega"
                        ? "coleta"
                        : "remoto",
                })
              }
            >
              <InlineTriageCTA
                className="mt-4"
                location="precos_estimativa_rapida"
                message={mensagem}
                label="Confirmar valor no WhatsApp"
                hint="A mensagem já vai com suas respostas preenchidas."
              />
            </div>

            <button
              type="button"
              onClick={() => {
                setEquipamento(null);
                setProblema(null);
                setAtendeNoLocal(null);
              }}
              className="mt-3 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
            >
              <RotateCcw className="h-4 w-4" aria-hidden /> Refazer estimativa
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EstimativaRapida;
