// Prerender genérico de "reparo de canônico" para rotas do sitemap que não
// receberam um index.html estático nas etapas anteriores (cities/pilot).
//
// Problema resolvido: crawlers sem JS liam o shell da SPA, cujo
// <link rel="canonical"> aponta para a home. Isso afetava as 221 rotas
// /bairros/* (consolidação indevida na home).
//
// Aqui geramos dist/<rota>/index.html com canonical/og:url auto-referentes,
// título/descrição derivados e JSON-LD LocalBusiness + Service.

import { promises as fs } from "node:fs";
import fsSync from "node:fs";
import path from "node:path";

const SITE = "https://tecnicocuritiba.com.br";
const PHONE = "+5541997452053";

// Sufixos de slug → cidade da RMC
const CITY_SUFFIX = [
  ["-sjp", "São José dos Pinhais"],
  ["-sao-jose-dos-pinhais", "São José dos Pinhais"],
  ["-araucaria", "Araucária"],
  ["-colombo", "Colombo"],
  ["-pinhais", "Pinhais"],
  ["-piraquara", "Piraquara"],
  ["-fazenda-rio-grande", "Fazenda Rio Grande"],
  ["-campo-largo", "Campo Largo"],
  ["-cl", "Campo Largo"],
  ["-campo-magro", "Campo Magro"],
  ["-cm", "Campo Magro"],
  ["-quatro-barras", "Quatro Barras"],
  ["-qb", "Quatro Barras"],
  ["-almirante-tamandare", "Almirante Tamandaré"],
  ["-at", "Almirante Tamandaré"],
];

const SMALL_WORDS = new Set(["de", "da", "do", "das", "dos", "e"]);

function titleize(slug) {
  return slug
    .split("-")
    .map((w, i) => (i > 0 && SMALL_WORDS.has(w) ? w : w.charAt(0).toUpperCase() + w.slice(1)))
    .join(" ");
}

function bairroMeta(slug) {
  let city = "Curitiba";
  let rest = slug;
  for (const [suffix, cityName] of CITY_SUFFIX) {
    if (slug.endsWith(suffix)) {
      city = cityName;
      rest = slug.slice(0, -suffix.length);
      break;
    }
  }
  return { bairro: titleize(rest || slug), city };
}

function htmlEscape(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function metaForPath(routePath) {
  const url = `${SITE}${routePath}`;
  if (routePath.startsWith("/bairros/")) {
    const { bairro, city } = bairroMeta(routePath.replace("/bairros/", ""));
    return {
      url,
      routePath,
      title: `Técnico de Informática em ${bairro}, ${city} | Atendimento a domicílio`,
      description: `Assistência técnica de computador e notebook em ${bairro}, ${city}. Atendimento a domicílio, remoto ou coleta. Diagnóstico e orçamento pelo WhatsApp.`,
      areaServed: [bairro, city],
    };
  }
  const last = routePath.split("/").filter(Boolean).pop() || "";
  return {
    url,
    routePath,
    title: `${titleize(last)} | Técnico em Curitiba`,
    description: `Assistência técnica de informática em Curitiba e Região Metropolitana. Diagnóstico e orçamento pelo WhatsApp.`,
    areaServed: ["Curitiba"],
  };
}

function buildJsonLd(meta) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": `${meta.url}#business`,
        name: "Técnico em Curitiba",
        url: meta.url,
        telephone: PHONE,
        priceRange: "$$",
        image: `${SITE}/og-image.jpg`,
        areaServed: meta.areaServed.map((name) => ({ "@type": "Place", name })),
      },
      {
        "@type": "Service",
        "@id": `${meta.url}#service`,
        name: meta.title,
        serviceType: "Assistência técnica de informática",
        description: meta.description,
        url: meta.url,
        provider: { "@id": `${meta.url}#business` },
        areaServed: meta.areaServed.map((name) => ({ "@type": "Place", name })),
      },
      {
        "@type": "WebPage",
        "@id": `${meta.url}#webpage`,
        url: meta.url,
        name: meta.title,
        description: meta.description,
        inLanguage: "pt-BR",
      },
    ],
  };
}

function injectMeta(html, meta) {
  const ogImage = `${SITE}/og-image.jpg`;
  const block = [
    `<title>${htmlEscape(meta.title)}</title>`,
    `<meta name="description" content="${htmlEscape(meta.description)}">`,
    `<link rel="canonical" href="${meta.url}">`,
    `<meta property="og:type" content="website">`,
    `<meta property="og:url" content="${meta.url}">`,
    `<meta property="og:site_name" content="Técnico em Curitiba">`,
    `<meta property="og:locale" content="pt_BR">`,
    `<meta property="og:title" content="${htmlEscape(meta.title)}">`,
    `<meta property="og:description" content="${htmlEscape(meta.description)}">`,
    `<meta property="og:image" content="${ogImage}">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="${htmlEscape(meta.title)}">`,
    `<meta name="twitter:description" content="${htmlEscape(meta.description)}">`,
    `<meta name="twitter:image" content="${ogImage}">`,
    `<script type="application/ld+json">${JSON.stringify(buildJsonLd(meta))}</script>`,
  ].join("\n    ");

  return html
    .replace(/<title>[\s\S]*?<\/title>/i, "")
    .replace(/<meta\s+name=["']description["'][^>]*>/gi, "")
    .replace(/<link\s+rel=["']canonical["'][^>]*>/gi, "")
    .replace(/<meta\s+property=["']og:[^"']+["'][^>]*>/gi, "")
    .replace(/<meta\s+name=["']twitter:[^"']+["'][^>]*>/gi, "")
    .replace(/<\/head>/i, `\n    ${block}\n  </head>`);
}

function sitemapPaths() {
  const publicDir = path.resolve("public");
  const files = fsSync.readdirSync(publicDir).filter((f) => /^sitemap.*\.xml$/.test(f));
  const paths = new Set();
  for (const file of files) {
    const xml = fsSync.readFileSync(path.join(publicDir, file), "utf8");
    for (const m of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) {
      const loc = m[1].trim();
      if (!loc.startsWith(SITE)) continue;
      if (/sitemap[\w-]*\.xml$/.test(loc)) continue;
      const routePath = loc.slice(SITE.length) || "/";
      if (routePath === "/") continue;
      paths.add(routePath.replace(/\/$/, ""));
    }
  }
  return [...paths];
}

export async function prerenderSitemapShells(distDir) {
  const baseHtml = await fs.readFile(path.join(distDir, "index.html"), "utf8");
  let written = 0;
  let skipped = 0;

  for (const routePath of sitemapPaths()) {
    const outDir = path.join(distDir, ...routePath.split("/").filter(Boolean));
    const outFile = path.join(outDir, "index.html");
    if (fsSync.existsSync(outFile)) {
      skipped++;
      continue; // já prerenderizado com conteúdo mais rico
    }
    const meta = metaForPath(routePath);
    await fs.mkdir(outDir, { recursive: true });
    await fs.writeFile(outFile, injectMeta(baseHtml, meta), "utf8");
    written++;
  }
  // eslint-disable-next-line no-console
  console.log(`[prerender-bairros] ${written} shells com canônico próprio (${skipped} já existiam)`);
}

export function prerenderSitemapShellsPlugin() {
  return {
    name: "prerender-sitemap-shells",
    apply: "build",
    enforce: "post",
    async closeBundle() {
      try {
        await prerenderSitemapShells(path.resolve("dist"));
      } catch (err) {
        console.error("[prerender-bairros] failed:", err);
      }
    },
  };
}
