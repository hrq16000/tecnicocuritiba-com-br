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
  <section className={`border-b border-border bg-background py-8 md:py-12 ${className}`} aria-labelledby="sintomas-heading">
    <div className="container mx-auto">
      <div className="mx-auto max-w-5xl">
        <h2 id="sintomas-heading" className="text-xl font-bold text-foreground sm:text-2xl">
          {title}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Escolha o sintoma mais parecido com o seu para ver causas possíveis e o que fazer antes do atendimento.
        </p>
        <ul className="mt-5 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {signals.slice(0, 6).map((s) => (
            <li key={s.to}>
              <a
                href={s.to}
                className="group relative flex h-full min-h-14 items-center gap-3 bg-card px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary hover:text-primary focus-visible:z-10 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
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
