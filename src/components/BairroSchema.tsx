import { Helmet } from "react-helmet";

interface BairroSchemaProps {
  bairro: string;
  cidade: string;
  servico: string;
  servicoSlug: string;
  bairroSlug: string;
  descricao: string;
  precoBase?: string;
}

/**
 * JSON-LD específico para páginas de bairro:
 * - LocalBusiness com areaServed = Neighborhood dentro da City.
 * - Service com serviceType, provider e areaServed espelhados.
 * Reforça SEO local e habilita rich results por bairro.
 */
export function BairroSchema({
  bairro,
  cidade,
  servico,
  servicoSlug,
  bairroSlug,
  descricao,
  precoBase,
}: BairroSchemaProps) {
  const url = `https://tecnicocuritiba.com.br/servicos/${servicoSlug}/${bairroSlug}`;
  const priceValue = precoBase ? precoBase.replace(/[^\d,]/g, "").replace(",", ".") : undefined;

  const areaServed = {
    "@type": "Neighborhood",
    name: bairro,
    containedInPlace: {
      "@type": "City",
      name: cidade,
      address: {
        "@type": "PostalAddress",
        addressLocality: cidade,
        addressRegion: "PR",
        addressCountry: "BR",
      },
    },
  };

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ComputerRepairService"],
    "@id": `${url}#localbusiness`,
    name: `Técnico em Curitiba — ${servico} no ${bairro}`,
    description: descricao,
    url,
    telephone: "+55-41-99745-2053",
    priceRange: "R$ 99,99 - R$ 500",
    address: {
      "@type": "PostalAddress",
      addressLocality: cidade,
      addressRegion: "PR",
      addressCountry: "BR",
    },
    areaServed,
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "08:00",
      closes: "20:00",
    },
  };

  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name: `${servico} no ${bairro}`,
    serviceType: servico,
    description: descricao,
    url,
    provider: { "@id": `${url}#localbusiness` },
    areaServed,
    ...(priceValue
      ? {
          offers: {
            "@type": "Offer",
            price: priceValue,
            priceCurrency: "BRL",
            availability: "https://schema.org/InStock",
          },
        }
      : {}),
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify({ "@context": "https://schema.org", "@graph": [localBusiness, service] })}
      </script>
    </Helmet>
  );
}
