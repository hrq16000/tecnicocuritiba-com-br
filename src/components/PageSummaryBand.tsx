import TrustStrip from "@/components/TrustStrip";
import PageTableOfContents, { type TocItem } from "@/components/PageTableOfContents";

/**
 * Faixa de resumo + confiança + sumário navegável para páginas editoriais/empresariais.
 * Mantém identidade semântica própria: não é o template de serviços nem o de sintomas.
 * O resumo deve ser derivado da copy já existente da página (sem claims novos).
 */
export const PageSummaryBand = ({
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
  <section className={`py-6 ${className}`} aria-label="Resumo e navegação da página">
    <div className="max-w-4xl mx-auto space-y-4">
      {summary ? (
        <p className="text-base leading-relaxed text-muted-foreground">{summary}</p>
      ) : null}
      <TrustStrip />
      <PageTableOfContents items={items} title={tocTitle} />
    </div>
  </section>
);

export default PageSummaryBand;
