interface Model {
  title: string;
  lead: string;
  bullets?: string[];
  note?: string;
}

interface Props {
  id: string;
  title: string;
  intro: string;
  avulso: Model;
  recorrente: Model;
  rows: [string, string, string][];
  decisionNote: string;
}

/**
 * Comparação avulso × recorrente.
 * Cards no mobile + tabela acessível no desktop, sem plano, preço ou SLA.
 */
export const SupportModelComparison = ({
  id,
  title,
  intro,
  avulso,
  recorrente,
  rows,
  decisionNote,
}: Props) => (
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
        {[avulso, recorrente].map((m) => (
          <div key={m.title} className="rounded-xl border border-border bg-secondary p-6">
            <h3 className="text-xl font-bold text-foreground">{m.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{m.lead}</p>
            {m.bullets ? (
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                {m.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            ) : null}
            {m.note ? (
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{m.note}</p>
            ) : null}
          </div>
        ))}
      </div>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full overflow-hidden rounded-xl border border-border text-sm">
          <caption className="sr-only">Comparação entre atendimento avulso e recorrente</caption>
          <thead className="bg-muted/50">
            <tr>
              <th scope="col" className="p-3 text-left font-semibold text-foreground">Critério</th>
              <th scope="col" className="p-3 text-left font-semibold text-foreground">Avulso</th>
              <th scope="col" className="p-3 text-left font-semibold text-foreground">Recorrente</th>
            </tr>
          </thead>
          <tbody className="text-muted-foreground">
            {rows.map(([c, a, r]) => (
              <tr key={c} className="border-t border-border">
                <th scope="row" className="p-3 text-left font-medium text-foreground">{c}</th>
                <td className="p-3">{a}</td>
                <td className="p-3">{r}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-6 rounded-xl border-l-4 border-accent bg-accent/5 p-4 text-sm leading-relaxed text-foreground">
        {decisionNote}
      </p>
    </div>
  </section>
);

export default SupportModelComparison;
