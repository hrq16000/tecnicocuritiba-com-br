import { useState } from "react";
import { ChevronDown } from "lucide-react";

export type TocItem = { id: string; label: string };

/**
 * Sumário navegável para páginas longas.
 * Usa âncoras reais dos headings da página (ids estáveis definidos no conteúdo).
 * No mobile inicia recolhido; no desktop fica sempre visível. Sem sticky invasivo.
 */
export const PageTableOfContents = ({
  items,
  title = "Nesta página",
  className = "",
}: { items: TocItem[]; title?: string; className?: string }) => {
  const [open, setOpen] = useState(false);
  if (!items.length) return null;

  return (
    <nav aria-label={title} className={`rounded-xl border border-border bg-card/60 ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex min-h-11 w-full items-center justify-between gap-2 px-4 py-3 text-left text-sm font-semibold text-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring-3 md:cursor-default md:pointer-events-none"
      >
        {title}
        <ChevronDown
          className={`h-4 w-4 text-muted-foreground transition-transform md:hidden ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>
      <ul className={`${open ? "block" : "hidden"} gap-x-6 px-4 pb-4 md:grid md:grid-cols-2`}>
        {items.map((it) => (
          <li key={it.id} className="py-1">
            <a
              href={`#${it.id}`}
              className="inline-flex min-h-9 items-center text-sm text-muted-foreground underline-offset-4 hover:text-primary hover:underline focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring-3"
            >
              {it.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default PageTableOfContents;
