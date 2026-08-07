import { useEffect, useRef } from "react";
import { creditLabel, getImageCredit, imageTitle } from "@/lib/imageCredits";
import { IMAGES } from "@/lib/images";

export interface GalleryItem {
  imageKey: keyof typeof IMAGES;
  altOverride?: string;
  caption: string;
}

interface Props {
  title: string;
  subtitle?: string;
  items: GalleryItem[];
  bgClass?: string;
  /** Localidade usada nos títulos/alt (ex.: "Batel, Curitiba") */
  local?: string;
}

/**
 * Galeria acessível (WebP via Unsplash `?fm=webp`), com legendas, alt semântico,
 * atributo `title` descritivo e crédito/licença visível por foto.
 * `loading="lazy"` + `decoding="async"` para preservar LCP/INP.
 */
export const ServiceGallery = ({ title, subtitle, items, bgClass = "bg-background", local }: Props) => {
  const ref = useRef<HTMLElement | null>(null);

  // Guard de desenvolvimento: a galeria precisa ficar ANTES do <footer> no DOM.
  // Se alguém renderizar o bloco como sibling fora do layout, avisa no console.
  useEffect(() => {
    if (!import.meta.env.DEV) return;
    const el = ref.current;
    const footer = document.querySelector("footer");
    if (!el || !footer) return;
    const footerFollows = !!(el.compareDocumentPosition(footer) & Node.DOCUMENT_POSITION_FOLLOWING);
    if (!footerFollows) {
      // eslint-disable-next-line no-console
      console.error(
        "[ServiceGallery] renderizada APÓS o <footer> — mova o bloco para dentro do layout da página.",
        { title, route: window.location.pathname },
      );
    }
  }, [title]);

  return (
  <section
    ref={ref} className={`py-10 ${bgClass}`} aria-labelledby="service-gallery-title">
    <div className="container mx-auto px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h2 id="service-gallery-title" className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-2">
            {title}
          </h2>
          {subtitle && <p className="text-muted-foreground text-sm max-w-2xl mx-auto">{subtitle}</p>}
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((it, i) => {
            const rawSrc = IMAGES[it.imageKey] as string;
            const src = rawSrc.includes("unsplash.com")
              ? rawSrc.replace(/(\?|&)auto=format/, "$1fm=webp&auto=format")
              : rawSrc;
            const credit = getImageCredit(it.imageKey as string);
            const alt = it.altOverride || (IMAGES[`${it.imageKey}Alt` as keyof typeof IMAGES] as string) || it.caption;
            const imgTitle = credit ? imageTitle(credit, local) : alt;
            return (
              <figure key={i} className="rounded-xl overflow-hidden bg-secondary border border-border">
                <img
                  src={src}
                  alt={alt}
                  title={imgTitle}
                  loading="lazy"
                  decoding="async"
                  width={600}
                  height={400}
                  className="w-full h-52 object-cover"
                />
                <figcaption className="text-xs text-muted-foreground p-3 leading-snug italic text-center">
                  {it.caption}
                  {credit && (
                    <span className="not-italic block mt-1.5 text-[11px] text-muted-foreground/80" data-image-credit={credit.key}>
                      {creditLabel(credit)} ·{" "}
                      <a
                        href={credit.sourceUrl}
                        target="_blank"
                        rel="noopener nofollow"
                        className="underline underline-offset-2 hover:text-foreground"
                      >
                        foto original
                      </a>{" "}
                      ·{" "}
                      <a
                        href={credit.licenseUrl}
                        target="_blank"
                        rel="noopener nofollow license"
                        className="underline underline-offset-2 hover:text-foreground"
                      >
                        licença
                      </a>
                    </span>
                  )}
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>
    </div>
  </section>
  );
};
