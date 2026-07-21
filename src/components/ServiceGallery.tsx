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
}

/**
 * Galeria acessível (WebP via Unsplash `?fm=webp`), com legendas e alt semântico.
 * `loading="lazy"` + `decoding="async"` para preservar LCP/INP.
 */
export const ServiceGallery = ({ title, subtitle, items, bgClass = "bg-background" }: Props) => (
  <section className={`py-10 ${bgClass}`} aria-labelledby="service-gallery-title">
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
            const alt = it.altOverride || (IMAGES[`${it.imageKey}Alt` as keyof typeof IMAGES] as string) || it.caption;
            return (
              <figure key={i} className="rounded-xl overflow-hidden bg-secondary border border-border">
                <img
                  src={src}
                  alt={alt}
                  loading="lazy"
                  decoding="async"
                  width={600}
                  height={400}
                  className="w-full h-52 object-cover"
                />
                <figcaption className="text-xs text-muted-foreground p-3 leading-snug italic text-center">
                  {it.caption}
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>
    </div>
  </section>
);
