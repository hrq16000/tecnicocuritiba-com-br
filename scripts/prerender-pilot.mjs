// Lote 2 — piloto de prerender para ~15 rotas comerciais de alto valor.
// Gera dist/<rota>/index.html com title/description/canonical/og/twitter + JSON-LD
// para que crawlers sem JS não recebam o shell da home (canonical errado).

import { promises as fs } from "node:fs";
import path from "node:path";

const SITE = "https://tecnicocuritiba.com.br";
const OG_VERSION = "20260615";

const provider = {
  "@type": "LocalBusiness",
  "@id": `${SITE}/#organization`,
  name: "Técnico em Curitiba",
  url: SITE,
  telephone: "+55-41-99745-2053",
  areaServed: { "@type": "City", name: "Curitiba" },
};

const crumbs = (items) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: it.name,
    item: `${SITE}${it.path}`,
  })),
});

const service = (name, description, url) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name,
  serviceType: name,
  description,
  provider,
  areaServed: { "@type": "AdministrativeArea", name: "Curitiba e Região Metropolitana" },
  offers: {
    "@type": "Offer",
    priceCurrency: "BRL",
    price: "99.99",
    priceSpecification: { "@type": "PriceSpecification", priceCurrency: "BRL", minPrice: "99.99" },
    availability: "https://schema.org/InStock",
    url,
  },
  url,
});

/** Rotas do piloto — alto valor comercial (serviços, institucional, B2B). */
export const PILOT_ROUTES = [
  {
    path: "/servicos",
    title: "Serviços de Informática em Curitiba | Técnico em Curitiba",
    description:
      "Todos os serviços: formatação, conserto de notebook, remoção de vírus, upgrade de SSD, redes Wi-Fi e backup. Visita técnica a partir de R$ 99,99 em Curitiba e região.",
    kind: "service",
  },
  {
    path: "/sobre",
    title: "Sobre a Técnico em Curitiba | Assistência Técnica desde 1998",
    description:
      "Quem somos: assistência técnica de informática em Curitiba desde 1998, com atendimento domiciliar, remoto e coleta. Orçamento sem compromisso pelo WhatsApp.",
    kind: "page",
  },
  {
    path: "/faq",
    title: "Perguntas Frequentes | Técnico de Informática em Curitiba",
    description:
      "Dúvidas sobre preços, prazos, garantia, coleta e atendimento domiciliar em Curitiba. Visita técnica a partir de R$ 99,99 com orçamento antes do reparo.",
    kind: "page",
  },
  {
    path: "/contato",
    title: "Contato | Técnico de Informática em Curitiba",
    description:
      "Fale com um técnico de informática em Curitiba pelo WhatsApp. Atendimento domiciliar, remoto e coleta em Curitiba e Região Metropolitana.",
    kind: "page",
  },
  {
    path: "/como-funciona",
    title: "Como Funciona o Atendimento | Técnico em Curitiba",
    description:
      "Triagem pelo WhatsApp, diagnóstico, orçamento e reparo. Entenda as modalidades remoto, visita e coleta, com prazos e valores claros em Curitiba.",
    kind: "page",
  },
  {
    path: "/suporte-empresas",
    title: "Suporte de TI para Empresas em Curitiba | Contratos, M365 e Backup",
    description:
      "Suporte de TI corporativo em Curitiba: contratos mensais com SLA, Microsoft 365, Google Workspace, backup e servidores. Nota fiscal e pagamento faturado.",
    kind: "service",
  },
  {
    path: "/atendimento-domicilio",
    title: "Atendimento Domiciliar de Informática em Curitiba | Mesmo Dia",
    description:
      "Técnico de informática em domicílio em Curitiba e região. Visita a partir de R$ 99,99 (30 min), orçamento no local e garantia no serviço.",
    kind: "service",
  },
  {
    path: "/atendimento-remoto",
    title: "Suporte Remoto de Informática em Curitiba | A partir de R$ 99,99",
    description:
      "Suporte remoto imediato para lentidão, vírus, impressora e configurações. R$ 99,99 por até 30 min · R$ 169,99 por 1h combinada.",
    kind: "service",
  },
  {
    path: "/coleta-e-entrega",
    title: "Coleta e Entrega de Notebook e PC em Curitiba | Reparo em Bancada",
    description:
      "Coletamos seu equipamento, reparamos em bancada e devolvemos. Valor mínimo R$ 299,99 (coleta, entrega e diagnóstico), peças não inclusas.",
    kind: "service",
  },
  {
    path: "/equipamentos-atendidos",
    title: "Equipamentos Atendidos | Notebook, PC, TV, Impressora e Rede",
    description:
      "Notebooks, desktops, all-in-one, TVs, impressoras, roteadores e câmeras. Veja o que atendemos em Curitiba e região e como funciona a triagem.",
    kind: "page",
  },
  {
    path: "/diagnostico-60s",
    title: "Diagnóstico em 60 Segundos | Descubra o Defeito do seu Equipamento",
    description:
      "Responda algumas perguntas e receba um diagnóstico inicial com modalidade recomendada (remoto, visita ou coleta) e faixa de preço.",
    kind: "page",
  },
  {
    path: "/problemas-reais-e-casos",
    title: "Problemas Reais e Casos Resolvidos | Técnico em Curitiba",
    description:
      "Casos reais de reparo em Curitiba: notebook que não liga, tela quebrada, Wi-Fi instável, lentidão e perda de dados. Veja o diagnóstico e o custo.",
    kind: "page",
  },
  {
    path: "/gestor-responsavel",
    title: "Gestor Responsável | Técnico em Curitiba desde 1998",
    description:
      "Conheça o gestor técnico responsável pelos atendimentos, certificações e área de atuação em Curitiba e Região Metropolitana.",
    kind: "page",
  },
  {
    path: "/atendimento",
    title: "Atendimento por Cidade e Bairro | Técnico em Curitiba",
    description:
      "Cobertura de atendimento em Curitiba e Região Metropolitana por cidade e bairro. Escolha sua região e fale com um técnico agora.",
    kind: "page",
  },
  {
    path: "/areas-atendidas",
    title: "Áreas Atendidas em Curitiba e Região | Bairros e Cidades",
    description:
      "Mapa e lista completa de bairros e cidades atendidas em Curitiba e Região Metropolitana: domicílio, coleta e remoto a partir de R$ 99,99.",
    kind: "page",
  },
  {
    path: "/quando-nao-compensa",
    title: "Quando Não Compensa Consertar | Guia Honesto | Técnico em Curitiba",
    description:
      "Critérios objetivos para decidir entre reparar ou trocar notebook, PC e TV. Comparativo de custo, vida útil e disponibilidade de peças.",
    kind: "page",
  },
];

const htmlEscape = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const labelFor = (p) =>
  p
    .split("/")
    .filter(Boolean)
    .pop()
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

async function findHashedAsset(distDir, base) {
  try {
    const dir = path.join(distDir, "assets");
    const files = await fs.readdir(dir);
    const hit = files.find((f) => f.startsWith(base) && /\.(jpe?g|png|webp|avif)$/.test(f));
    return hit ? `/assets/${hit}` : null;
  } catch {
    return null;
  }
}

function injectMeta(html, meta) {
  const head = [
    `<title>${htmlEscape(meta.title)}</title>`,
    `<meta name="description" content="${htmlEscape(meta.description)}">`,
    `<link rel="canonical" href="${meta.url}">`,
    `<meta property="og:type" content="website">`,
    `<meta property="og:url" content="${meta.url}">`,
    `<meta property="og:site_name" content="Técnico em Curitiba">`,
    `<meta property="og:locale" content="pt_BR">`,
    `<meta property="og:title" content="${htmlEscape(meta.title)}">`,
    `<meta property="og:description" content="${htmlEscape(meta.description)}">`,
    meta.ogImage ? `<meta property="og:image" content="${meta.ogImage}?v=${OG_VERSION}">` : "",
    meta.ogImage ? `<meta property="og:image:secure_url" content="${meta.ogImage}?v=${OG_VERSION}">` : "",
    `<meta property="og:image:width" content="1200">`,
    `<meta property="og:image:height" content="630">`,
    `<meta property="og:image:type" content="image/jpeg">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="${htmlEscape(meta.title)}">`,
    `<meta name="twitter:description" content="${htmlEscape(meta.description)}">`,
    meta.ogImage ? `<meta name="twitter:image" content="${meta.ogImage}?v=${OG_VERSION}">` : "",
    ...meta.jsonLd.map((s) => `<script type="application/ld+json">${JSON.stringify(s)}</script>`),
  ].filter(Boolean);

  const out = html
    .replace(/<title>[\s\S]*?<\/title>/i, "")
    .replace(/<meta\s+name=["']description["'][^>]*>/gi, "")
    .replace(/<link\s+rel=["']canonical["'][^>]*>/gi, "")
    .replace(/<meta\s+property=["']og:[^"']+["'][^>]*>/gi, "")
    .replace(/<meta\s+name=["']twitter:[^"']+["'][^>]*>/gi, "");

  return out.replace(/<\/head>/i, `\n    ${head.join("\n    ")}\n  </head>`);
}

export async function prerenderPilot(distDir) {
  const baseHtml = await fs.readFile(path.join(distDir, "index.html"), "utf8");
  const og = await findHashedAsset(distDir, "og-image");
  const absoluteOg = og ? `${SITE}${og}` : `${SITE}/og-image.jpg`;
  let written = 0;

  for (const route of PILOT_ROUTES) {
    const url = `${SITE}${route.path}`;
    const jsonLd = [
      crumbs([{ name: "Início", path: "/" }, { name: labelFor(route.path), path: route.path }]),
      route.kind === "service"
        ? service(route.title.split("|")[0].trim(), route.description, url)
        : {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: route.title,
            description: route.description,
            url,
            inLanguage: "pt-BR",
            isPartOf: { "@id": `${SITE}/#website` },
            about: { "@id": `${SITE}/#organization` },
          },
    ];
    const html = injectMeta(baseHtml, { ...route, url, ogImage: absoluteOg, jsonLd });
    const outDir = path.join(distDir, ...route.path.split("/").filter(Boolean));
    await fs.mkdir(outDir, { recursive: true });
    await fs.writeFile(path.join(outDir, "index.html"), html, "utf8");
    written++;
  }

  // eslint-disable-next-line no-console
  console.log(`[prerender-pilot] wrote ${written} high-value route files`);
  return written;
}

export function prerenderPilotPlugin() {
  return {
    name: "prerender-pilot-routes",
    apply: "build",
    async closeBundle() {
      try {
        await prerenderPilot(path.resolve("dist"));
      } catch (err) {
        console.error("[prerender-pilot] failed:", err);
      }
    },
  };
}
