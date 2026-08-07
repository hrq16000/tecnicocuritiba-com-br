import { getSponsorsFor, type SponsorPlacement } from "@/lib/sponsors";

const trackAdEvent = (name: string, params: Record<string, unknown>) => {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", name, { event_category: "monetization", ...params });
};


interface AdSlotProps {
  placement: SponsorPlacement;
  className?: string;
}

/**
 * Espaço patrocinado com disclosure obrigatório ("Publicidade").
 *
 * Neutro para Core Web Vitals: altura mínima reservada (sem CLS), sem imagens
 * externas e sem scripts de terceiros — portanto nunca disputa o LCP.
 * Validado no CI por `npm run check:ad-slots`.
 */
export const AdSlot = ({ placement, className = "" }: AdSlotProps) => {
  const creatives = getSponsorsFor(placement);
  if (creatives.length === 0) return null;

  return (
    <section
      aria-label="Conteúdo patrocinado"
      data-ad-slot={placement}
      className={`container mx-auto px-4 py-8 ${className}`}
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {creatives.map((creative) => {
          const isExternal = /^https?:/i.test(creative.href);
          return (
            <aside
              key={creative.id}
              data-ad-creative={creative.id}
              className="flex min-h-[180px] flex-col justify-between rounded-xl border border-border bg-card/60 p-5 shadow-sm"
            >
              <div>
                <p
                  data-ad-disclosure
                  className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground"
                >
                  Publicidade
                </p>
                <h3 className="text-base font-semibold text-foreground">{creative.headline}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{creative.description}</p>
              </div>
              <a
                href={creative.href}
                rel={isExternal ? "sponsored nofollow noopener" : "sponsored"}
                target={isExternal ? "_blank" : undefined}
                onClick={() =>
                  trackEvent("ad_click", {
                    ad_id: creative.id,
                    ad_placement: placement,
                    advertiser: creative.advertiser,
                    click_location: `ad_slot_${placement}`,
                  })
                }
                className="mt-4 inline-flex min-h-11 items-center justify-center rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                {creative.ctaLabel}
              </a>
              <p className="mt-2 text-[11px] text-muted-foreground">
                Anunciante: {creative.advertiser}
              </p>
            </aside>
          );
        })}
      </div>
    </section>
  );
};

export default AdSlot;
