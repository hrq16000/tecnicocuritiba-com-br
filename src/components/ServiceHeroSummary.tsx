import TrustStrip from "@/components/TrustStrip";
import PageTableOfContents, { type TocItem } from "@/components/PageTableOfContents";

/**
 * Faixa padrão das páginas de serviço (Rodada 3Q).
 * Reapresenta o resumo já aprovado da página + faixa de confiança + sumário navegável.
 * Não cria claims novos: o resumo deve ser derivado da copy existente da própria página.
 */
export const ServiceHeroSummary = ({
  summary,
  items,
  tocTitle = "Nesta página",
  className = "",
}: {
  summary?: string;
  items: TocItem[];
  tocTitle?: string;
  className?: string;
}) => (
  <section className={`py-6 bg-background border-b border-border ${className}`}>
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto space-y-4">
        {summary ? (
          <p className="text-base leading-relaxed text-muted-foreground">{summary}</p>
        ) : null}
        <TrustStrip />
        <PageTableOfContents items={items} title={tocTitle} />
      </div>
    </div>
  </section>
);

export default ServiceHeroSummary;
