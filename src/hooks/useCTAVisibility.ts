import { useEffect, RefObject } from "react";
import { trackCTAVisible } from "@/lib/analytics";

/**
 * Dispara `cta_visible` no GA4 quando o CTA aparece no viewport (>=50%).
 * Uma vez por CTA/página (dedup em sessionStorage).
 */
export const useCTAVisibility = (
  ref: RefObject<HTMLElement | null>,
  ctaId: string,
  extra: Record<string, unknown> = {},
) => {
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof window === "undefined" || typeof IntersectionObserver === "undefined") return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            trackCTAVisible(ctaId, extra);
            obs.disconnect();
            break;
          }
        }
      },
      { threshold: 0.5 },
    );
    obs.observe(el);
    return () => obs.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ctaId]);
};
