// ⚠️ RISCO SEO: emitir schema.org/AggregateRating sem base real de reviews
// verificáveis na página pode gerar Manual Action ("spammy structured markup")
// no Google Search Console. Este componente aplica DUPLO GUARD:
//   1) exige VITE_AGGREGATE_RATING_ENABLED === "true" (default: desativado);
//   2) exige >= MIN_REVIEWS_TO_PUBLISH reviews reais vindas da edge function
//      `aggregate-rating`, que consulta a tabela `reviews` (verified=true).
// Enquanto qualquer um dos guards falhar, NENHUM JSON-LD é injetado.
import { useEffect } from "react";
import { useAggregateRating } from "@/hooks/useAggregateRating";

const MIN_REVIEWS_TO_PUBLISH = 10;
const AGGREGATE_RATING_ENABLED =
  (import.meta.env.VITE_AGGREGATE_RATING_ENABLED as string | undefined) === "true";

interface Props {
  itemId: string; // ex: "https://tecnicocuritiba.com.br/#organization"
  itemType?: string; // ex: "LocalBusiness" | "Service"
  itemName?: string;
  service?: string;
  city?: string;
}

/**
 * Injeta AggregateRating no <head> APENAS quando:
 *  - a flag global VITE_AGGREGATE_RATING_ENABLED estiver "true"; E
 *  - houver >= MIN_REVIEWS_TO_PUBLISH reviews verificadas na tabela `reviews`.
 * Isso evita penalização do Google por dados estruturados sem base real.
 *
 * Use junto com <ReviewsGrid /> renderizado na mesma página para que
 * o Google encontre as reviews visíveis associadas ao schema.
 */
export const DynamicAggregateRating = ({
  itemId,
  itemType = "LocalBusiness",
  itemName,
  service,
  city,
}: Props) => {
  const { data } = useAggregateRating({ service, city });

  useEffect(() => {
    const SCRIPT_ID = `dyn-aggregate-${itemId}`;
    document.getElementById(SCRIPT_ID)?.remove();

    if (!AGGREGATE_RATING_ENABLED) return;
    if (!data?.enabled || !data.ratingValue) return;
    if ((data.reviewCount ?? 0) < MIN_REVIEWS_TO_PUBLISH) return;

    const schema = {
      "@context": "https://schema.org",
      "@type": itemType,
      "@id": itemId,
      ...(itemName ? { name: itemName } : {}),
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: data.ratingValue,
        reviewCount: data.reviewCount,
        bestRating: data.bestRating ?? 5,
        worstRating: data.worstRating ?? 1,
      },
    };

    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.type = "application/ld+json";
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      document.getElementById(SCRIPT_ID)?.remove();
    };
  }, [data, itemId, itemType, itemName]);

  return null;
};

export default DynamicAggregateRating;
