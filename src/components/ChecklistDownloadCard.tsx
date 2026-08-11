import { Download, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { getChecklist, trackChecklistDownload } from "@/lib/checklists";

/**
 * Bloco de download do checklist rápido (PDF) para páginas de sintoma.
 * Não substitui a triagem: reforça o próximo passo e alimenta o evento GA4
 * `checklist_download` com a origem da página.
 */
export const ChecklistDownloadCard = ({
  slug,
  source,
  className = "",
}: {
  slug: string;
  source: string;
  className?: string;
}) => {
  const item = getChecklist(slug);
  if (!item) return null;

  return (
    <div className={`rounded-2xl border bg-card p-5 ${className}`}>
      <div className="flex items-start gap-3">
        <FileText className="mt-1 h-6 w-6 shrink-0 text-primary" aria-hidden />
        <div className="flex-1">
          <h3 className="text-lg font-semibold">Checklist rápido: {item.title}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <a
              href={item.file}
              download
              onClick={() => trackChecklistDownload(item.slug, source)}
              data-cta-location={`checklist_pdf_${item.slug}`}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-primary px-4 text-sm font-semibold text-primary transition hover:bg-primary/5"
            >
              <Download className="h-4 w-4" aria-hidden />
              Baixar PDF gratuito
            </a>
            <Link to="/checklists" className="text-sm text-primary hover:underline">
              Ver todos os checklists
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChecklistDownloadCard;
