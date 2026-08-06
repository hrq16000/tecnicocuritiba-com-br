import { Link } from "react-router-dom";
import { ArrowRight, type LucideIcon } from "lucide-react";

export interface BusinessPillar {
  icon: LucideIcon;
  title: string;
  description: string;
  to: string;
  linkLabel: string;
}

interface Props {
  id: string;
  title: string;
  intro?: string;
  pillars: BusinessPillar[];
}

/**
 * Pilares operacionais do sistema visual empresarial.
 * Cada pilar conduz a uma rota real existente — não cria serviço novo.
 */
export const BusinessContinuityPillars = ({ id, title, intro, pillars }: Props) => (
  <section
    id={id}
    aria-labelledby={`${id}-titulo`}
    className="scroll-mt-24 border-y border-border bg-card/30 py-8 md:py-10"
  >
    <div className="container mx-auto max-w-5xl px-4">
      <h2 id={`${id}-titulo`} className="text-center font-heading text-2xl font-bold text-foreground md:text-3xl">
        {title}
      </h2>
      {intro ? (
        <p className="mx-auto mt-3 max-w-3xl text-center text-muted-foreground">{intro}</p>
      ) : null}

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {pillars.map((p) => (
          <div
            key={p.title}
            className="flex h-full flex-col rounded-xl border border-border bg-background p-5"
          >
            <p.icon className="h-6 w-6 text-accent" aria-hidden="true" />
            <h3 className="mt-3 text-base font-semibold text-foreground">{p.title}</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{p.description}</p>
            <Link
              to={p.to}
              className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary underline-offset-4 hover:underline"
            >
              {p.linkLabel}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default BusinessContinuityPillars;
