import { useEffect, useState } from "react";
import { List, Share2, MessageCircle, Facebook } from "lucide-react";
import { trackShareClick } from "@/lib/analytics";

type Heading = { id: string; text: string; level: 2 | 3 };

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 80);
}

interface Props {
  articleSelector?: string;
  title: string;
  url: string; // absolute URL
  slug?: string;
}

/**
 * Após o post renderizar, atribui IDs a H2/H3 e monta um sumário clicável (TOC)
 * + botões de compartilhamento (WhatsApp, Facebook, X). Client-only.
 */
export const BlogTOCAndShare = ({ articleSelector = "article", title, url, slug }: Props) => {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const fire = (network: "whatsapp" | "facebook" | "x") => () =>
    trackShareClick(network, { slug, title, url, location: "blog_post" });

  useEffect(() => {
    const root = document.querySelector(articleSelector);
    if (!root) return;
    const list: Heading[] = [];
    const used = new Set<string>();
    root.querySelectorAll<HTMLHeadingElement>("h2, h3").forEach((h) => {
      const level = h.tagName === "H2" ? 2 : 3;
      const text = (h.textContent || "").trim();
      if (!text) return;
      let id = h.id || slugify(text);
      let i = 2;
      while (used.has(id)) id = `${slugify(text)}-${i++}`;
      used.add(id);
      h.id = id;
      h.classList.add("scroll-mt-24");
      list.push({ id, text, level });
    });
    setHeadings(list);
  }, [articleSelector, url]);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const shareWa = `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`;
  const shareFb = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
  const shareX = `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`;

  return (
    <div className="not-prose mb-8 grid gap-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-start">
      {headings.length > 0 && (
        <nav
          aria-label="Sumário do artigo"
          className="rounded-2xl border border-border bg-muted/30 p-5"
        >
          <p className="mb-3 flex items-center gap-2 text-sm font-bold text-foreground">
            <List className="h-4 w-4 text-accent" aria-hidden="true" />
            Sumário
          </p>
          <ol className="grid gap-1.5 text-sm text-muted-foreground list-decimal pl-5">
            {headings.map((h) => (
              <li key={h.id} className={h.level === 3 ? "ml-4 list-[circle]" : ""}>
                <a href={`#${h.id}`} className="hover:text-accent underline-offset-2 hover:underline">
                  {h.text}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      )}
      <div className="flex flex-col gap-2 md:min-w-[180px]">
        <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          <Share2 className="h-3.5 w-3.5" aria-hidden="true" />
          Compartilhar
        </p>
        <a
          href={shareWa}
          target="_blank"
          rel="noopener nofollow"
          data-funnel-skip="1"
          aria-label="Compartilhar este artigo no WhatsApp"
          className="inline-flex items-center gap-2 rounded-lg bg-[hsl(var(--whatsapp))] px-3 py-2 text-xs font-semibold text-white transition-opacity hover:opacity-90"
        >
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
          WhatsApp
        </a>
        <a
          href={shareFb}
          target="_blank"
          rel="noopener nofollow"
          aria-label="Compartilhar este artigo no Facebook"
          className="inline-flex items-center gap-2 rounded-lg bg-[#1877F2] px-3 py-2 text-xs font-semibold text-white transition-opacity hover:opacity-90"
        >
          <Facebook className="h-4 w-4" aria-hidden="true" />
          Facebook
        </a>
        <a
          href={shareX}
          target="_blank"
          rel="noopener nofollow"
          aria-label="Compartilhar este artigo no X (Twitter)"
          className="inline-flex items-center gap-2 rounded-lg bg-black px-3 py-2 text-xs font-semibold text-white transition-opacity hover:opacity-90"
        >
          <span aria-hidden="true" className="font-bold">𝕏</span>
          X (Twitter)
        </a>
      </div>
    </div>
  );
};

export default BlogTOCAndShare;
