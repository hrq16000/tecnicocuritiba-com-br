import type { ReactNode } from "react";

export interface BusinessContext {
  title: string;
  body: ReactNode;
}

interface Props {
  id: string;
  title: string;
  intro: string;
  contexts: BusinessContext[];
}

/**
 * Contextos operacionais empresariais — nunca nichos/profissões em heading.
 * Layout em grid sóbrio, sem promessa de especialização setorial.
 */
export const BusinessContextGrid = ({ id, title, intro, contexts }: Props) => (
  <section
    id={id}
    aria-labelledby={`${id}-titulo`}
    className="scroll-mt-24 bg-background py-8 md:py-10"
  >
    <div className="container mx-auto max-w-5xl px-4">
      <h2 id={`${id}-titulo`} className="text-center font-heading text-2xl font-bold text-foreground md:text-3xl">
        {title}
      </h2>
      <p className="mx-auto mt-3 max-w-3xl text-center text-muted-foreground">{intro}</p>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {contexts.map((c) => (
          <article
            key={c.title}
            className="rounded-xl border border-border bg-muted/30 p-6 transition-colors hover:border-accent/40"
          >
            <h3 className="text-lg font-semibold text-foreground">{c.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default BusinessContextGrid;
