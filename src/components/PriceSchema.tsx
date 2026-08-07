import { useEffect, useMemo } from "react";

export interface PriceItem {
  nome: string;
  valor: string;
  obs?: string;
}

interface Props {
  /** Categorias exatamente como renderizadas na tabela visível */
  categorias: { categoria: string; servicos: PriceItem[] }[];
  url: string;
  name: string;
}

/** "a partir de R$ 99,99" -> { price: "99.99", minimum: true } */
export function parsePrice(valor: string): { price: string; minimum: boolean } | null {
  const m = valor.match(/R\$\s*([\d.]+(?:,\d{2})?)/i);
  if (!m) return null;
  const price = m[1].replace(/\./g, "").replace(",", ".");
  if (!price || Number.isNaN(Number(price))) return null;
  return { price, minimum: /a partir de|mínimo/i.test(valor) };
}

/**
 * Offer + UnitPriceSpecification derivados da MESMA fonte de dados da tabela
 * visível — garante paridade 1:1 (validado em CI por check-price-schema.mjs).
 */
export const PriceSchema = ({ categorias, url, name }: Props) => {
  const json = useMemo(() => {
    const offers = categorias.flatMap((cat) =>
      cat.servicos
        .map((s) => {
          const parsed = parsePrice(s.valor);
          if (!parsed) return null;
          return {
            "@type": "Offer",
            name: s.nome,
            category: cat.categoria,
            description: s.obs || undefined,
            availability: "https://schema.org/InStock",
            areaServed: { "@type": "City", name: "Curitiba" },
            priceSpecification: {
              "@type": "UnitPriceSpecification",
              price: parsed.price,
              priceCurrency: "BRL",
              valueAddedTaxIncluded: true,
              ...(parsed.minimum
                ? { minPrice: parsed.price, priceType: "https://schema.org/MinimumAdvertisedPrice" }
                : {}),
            },
          };
        })
        .filter(Boolean),
    );

    return {
      "@context": "https://schema.org",
      "@type": "OfferCatalog",
      "@id": `${url}#precos`,
      name,
      url,
      numberOfItems: offers.length,
      itemListElement: offers,
    };
  }, [categorias, url, name]);

  useEffect(() => {
    const el = document.createElement("script");
    el.type = "application/ld+json";
    el.setAttribute("data-jsonld-scope", "prices");
    el.text = JSON.stringify(json);
    document.head.appendChild(el);
    return () => {
      el.remove();
    };
  }, [json]);

  return null;
};

export default PriceSchema;
