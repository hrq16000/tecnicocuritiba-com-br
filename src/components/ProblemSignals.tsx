import { Activity } from "lucide-react";

export type Signal = { label: string; to: string };

/** Sintomas mais buscados — todos apontam para rotas canônicas já existentes. */
export const HOME_SIGNALS: Signal[] = [
  { label: "Computador lento ou travando", to: "/problemas/computador-lento-curitiba" },
  { label: "Notebook não liga", to: "/problemas/notebook-nao-liga-curitiba" },
  { label: "Equipamento aquecendo", to: "/problemas/notebook-superaquecendo-curitiba" },
  { label: "Arquivos não aparecem", to: "/problemas/pc-nao-reconhece-hd-curitiba" },
  { label: "Internet ou Wi-Fi instável", to: "/problemas/pc-nao-conecta-wifi-curitiba" },
  { label: "Vírus ou programas indesejados", to: "/problemas/computador-com-virus-curitiba" },
];

/**
 * Bloco "o que está acontecendo" (sintomas), visualmente distinto dos chips de
 * serviços ("como podemos atender"). Não cria URLs novas.
 */
export const ProblemSignals = ({
  title = "Qual problema você está enfrentando?",
  signals = HOME_SIGNALS,
  className = "",
}: { title?: string; signals?: Signal[]; className?: string }) => (
  <section className={`py-8 ${className}`} aria-labelledby="sintomas-heading">
    <div className="container mx-auto">
      <div className="mx-auto max-w-4xl">
        <h2 id="sintomas-heading" className="text-xl font-bold text-foreground sm:text-2xl">
          {title}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Escolha o sintoma mais parecido com o seu para ver causas possíveis e o que fazer antes do atendimento.
        </p>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {signals.slice(0, 6).map((s) => (
            <li key={s.to}>
              <a
                href={s.to}
                className="flex min-h-12 items-center gap-2 rounded-lg border border-dashed border-border bg-card/50 px-3 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Activity className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>
);

export default ProblemSignals;
