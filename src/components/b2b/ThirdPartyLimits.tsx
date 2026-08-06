import type { ReactNode } from "react";

export interface LimitColumn {
  title: string;
  tone?: "neutral" | "warning";
  items: string[];
}

interface Props {
  id: string;
  title: string;
  intro: ReactNode;
  columns: LimitColumn[];
  footer?: ReactNode;
}

/**
 * Limites e responsabilidades (técnico / cliente / fornecedor).
 * Transparência de escopo — não usar linguagem defensiva excessiva.
 */
export const ThirdPartyLimits = ({ id, title, intro, columns, footer }: Props) => (
  <section
    id={id}
    aria-labelledby={`${id}-titulo`}
    className="scroll-mt-24 bg-secondary py-8 md:py-10"
  >
    <div className="container mx-auto max-w-5xl px-4">
      <h2 id={`${id}-titulo`} className="text-center font-heading text-2xl font-bold text-foreground md:text-3xl">
        {title}
      </h2>
      <p className="mx-auto mt-3 max-w-3xl text-center text-muted-foreground">{intro}</p>

      <div
        className={`mt-8 grid gap-5 ${columns.length >= 3 ? "md:grid-cols-3" : "md:grid-cols-2"}`}
      >
        {columns.map((col) => (
          <div
            key={col.title}
            className={`rounded-xl border bg-background p-6 ${
              col.tone === "warning" ? "border-destructive/30" : "border-border"
            }`}
          >
            <h3 className="mb-3 font-semibold text-foreground">{col.title}</h3>
            <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
              {col.items.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {footer ? <p className="mt-6 text-center text-sm text-muted-foreground">{footer}</p> : null}
    </div>
  </section>
);

export default ThirdPartyLimits;
