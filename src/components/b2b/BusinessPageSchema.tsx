import { useEffect } from "react";

const SITE = "https://tecnicocuritiba.com.br";

export interface BusinessPageSchemaProps {
  /** identificador curto usado no data-attribute dos scripts injetados */
  id: string;
  path: string;
  name: string;
  description: string;
  breadcrumbs: { name: string; path: string }[];
  faq?: { q: string; a: string }[];
}

/**
 * JSON-LD padronizado das páginas empresariais: WebPage + BreadcrumbList + FAQPage.
 * Escopo fechado de propósito — sem Offer, Product, HowTo ou AggregateRating,
 * evitando schema que prometa preço/prazo fora da política editorial.
 */
export const BusinessPageSchema = ({
  id,
  path,
  name,
  description,
  breadcrumbs,
  faq,
}: BusinessPageSchemaProps) => {
  useEffect(() => {
    const attr = `data-b2b-schema-${id}`;
    const url = `${SITE}${path}`;

    const graph: Record<string, unknown>[] = [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name,
        description,
        inLanguage: "pt-BR",
        isPartOf: { "@id": `${SITE}/#website` },
        about: { "@id": `${SITE}/#organization` },
        breadcrumb: { "@id": `${url}#breadcrumb` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: breadcrumbs.map((b, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: b.name,
          item: `${SITE}${b.path}`,
        })),
      },
    ];

    if (faq?.length) {
      graph.push({
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: faq.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      });
    }

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.setAttribute(attr, "true");
    script.text = JSON.stringify({ "@context": "https://schema.org", "@graph": graph });
    document.head.appendChild(script);

    return () => {
      document.querySelectorAll(`script[${attr}]`).forEach((s) => s.remove());
    };
  }, [id, path, name, description, breadcrumbs, faq]);

  return null;
};

export default BusinessPageSchema;
