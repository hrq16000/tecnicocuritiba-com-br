/**
 * Schema base do site (WebSite + SearchAction) para rotas que não montam o
 * JsonLdSchema completo. Renderiza estático (sem lazy) para que crawlers
 * encontrem o schema sem precisar rolar a página.
 */
const SITE = "https://tecnicocuritiba.com.br";

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE}/#website`,
  name: "Técnico em Curitiba",
  url: SITE,
  inLanguage: "pt-BR",
  publisher: { "@id": `${SITE}/#organization` },
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE}/servicos?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

export const SiteBaseSchema = () => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
  />
);

export default SiteBaseSchema;
