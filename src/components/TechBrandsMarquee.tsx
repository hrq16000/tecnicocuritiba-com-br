// @ts-nocheck — legacy file silenced during TanStack migration (see .lovable/migrate-to-tanstack/tsc-silenced.json)
import { useEffect, useState, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { brandsData } from "@/lib/brandsData";

const animations = [
  "animate-brand-flip",
  "animate-brand-zoom",
  "animate-brand-slide-up",
  "animate-brand-slide-down",
  "animate-brand-rotate",
  "animate-brand-blur-in",
  "animate-brand-bounce-in",
  "animate-brand-glitch",
];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export const TechBrandsMarquee = () => {
  const [visibleBrands, setVisibleBrands] = useState<
    { slug: string; name: string; logoPath: string; color: string; anim: string; key: number }[]
  >([]);
  const keyRef = useRef(0);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  const generate = useCallback(() => {
    const shuffled = shuffle(brandsData).slice(0, 8);
    keyRef.current++;
    setVisibleBrands(
      shuffled.map((brand, i) => ({
        slug: brand.slug,
        name: brand.name,
        logoPath: brand.logoPath,
        color: brand.color,
        anim: animations[Math.floor(Math.random() * animations.length)],
        key: keyRef.current * 100 + i,
      }))
    );
  }, []);

  useEffect(() => {
    generate();
    intervalRef.current = setInterval(generate, 4000);
    return () => clearInterval(intervalRef.current);
  }, [generate]);

  return (
    <section className="py-8 md:py-10 bg-muted/30 border-y border-border/50 overflow-hidden relative">
      <div className="container mx-auto mb-5">
        <p className="text-center text-xs text-muted-foreground uppercase tracking-widest font-medium">
          Marcas que atendemos
        </p>
      </div>
      <div className="container mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-4 items-center justify-items-center min-h-[60px]">
          {visibleBrands.map((b) => {
            const brandColor = b.color === "#000000" ? "hsl(var(--foreground))" : b.color;
            return (
              <Link
                key={b.key}
                to={`/marcas/${b.slug}`}
                className={`${b.anim} select-none group inline-flex items-center justify-center px-3 py-2 rounded-md border border-border/60 bg-background/70 hover:bg-background hover:border-accent/50 hover:scale-105 transition-all duration-300`}
                title={`Assistência Técnica ${b.name}`}
              >
                <span
                  className="font-heading font-extrabold text-sm md:text-base tracking-tight text-foreground group-hover:text-accent transition-colors duration-300 leading-none"
                  style={{ color: brandColor }}
                >
                  {b.name}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
