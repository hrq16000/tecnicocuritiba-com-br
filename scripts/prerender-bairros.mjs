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

// Foto real (Unsplash, Unsplash License) exibida no card principal das páginas
// locais — usada como imagem social para que qualquer citação da URL mostre
// a mesma imagem que o usuário vê na página.
const LOCAL_PHOTO_ID = "photo-1531482615713-2afd69097998";
const LOCAL_PHOTO_BASE = `https://images.unsplash.com/${LOCAL_PHOTO_ID}`;
const LOCAL_PHOTO_OG = `${LOCAL_PHOTO_BASE}?auto=format&fit=crop&w=1200&h=630&q=72`;
const LOCAL_PHOTO_CREDIT = "Foto: Unsplash (Unsplash License)";
const LOCAL_PHOTO_SOURCE = "https://unsplash.com/photos/1531482615713-2afd69097998";
const LOCAL_PHOTO_LICENSE = "https://unsplash.com/license";

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

// Título curto e único (limite de 70 chars, validado por check-title-meta-unique).
function clampTitle(main, suffix) {
  const full = suffix ? `${main} | ${suffix}` : main;
  if (full.length <= 70) return full;
  return main.length <= 70 ? main : `${main.slice(0, 67).trimEnd()}...`;
}

// Posts do blog: título/descrição reais extraídos de src/pages/Blog.tsx para
// que o shell estático não caia no fallback genérico "… em Curitiba".
const BLOG_POSTS = (() => {
  const map = new Map();
  try {
    const src = fsSync.readFileSync(path.resolve("src/pages/Blog.tsx"), "utf8");
    const start = src.indexOf("const blogPosts = [");
    if (start !== -1) {
      const end = src.indexOf("\n];", start);
      const block = src.slice(start, end === -1 ? undefined : end);
      const re = /slug:\s*"([^"]+)"[\s\S]{0,400}?title:\s*"([^"]*)"[\s\S]{0,600}?excerpt:\s*"([^"]*)"/g;
      for (const m of block.matchAll(re)) {
        map.set(m[1], { title: m[2], excerpt: m[3] });
      }
    }
  } catch { /* opcional */ }
  return map;
})();

function metaForPath(routePath) {
  const url = `${SITE}${routePath}`;
  const segs = routePath.split("/").filter(Boolean);

  if (segs[0] === "blog" && segs[1]) {
    const post = BLOG_POSTS.get(segs[1]);
    const title = clampTitle(post?.title || titleize(segs[1]), "Blog | Técnico em Curitiba");
    const raw = post?.excerpt || `${titleize(segs[1])}: guia prático do Técnico em Curitiba com passo a passo, custos e quando chamar um profissional.`;
    return {
      url,
      routePath,
      title,
      description: raw.length <= 175 ? raw : `${raw.slice(0, 172).trimEnd()}...`,
      areaServed: ["Curitiba"],
    };
  }

  if (routePath.startsWith("/bairros/")) {
    const { bairro, city } = bairroMeta(segs[1]);
    return {
      url,
      routePath,
      title: clampTitle(`Técnico de Informática em ${bairro}, ${city}`, "Atendimento a domicílio"),
      description: `Assistência técnica de computador e notebook em ${bairro}, ${city}. Atendimento a domicílio, remoto ou coleta. Diagnóstico e orçamento pelo WhatsApp.`,
      areaServed: [bairro, city],
    };
  }

  // /atendimento/<cidade> e /atendimento/<cidade>/<bairro>
  if (segs[0] === "atendimento" && segs[1]) {
    const city = titleize(segs[1]);
    if (segs[2]) {
      const bairro = titleize(segs[2]);
      return {
        url,
        routePath,
        title: clampTitle(`Atendimento Técnico em ${bairro}, ${city}`, "WhatsApp"),
        description: `Suporte de informática no bairro ${bairro}, em ${city}. Atendimento a domicílio, coleta ou remoto, com orçamento pelo WhatsApp a partir de R$ 99,99.`,
        areaServed: [bairro, city],
      };
    }
    return {
      url,
      routePath,
      title: clampTitle(`Atendimento Técnico em ${city}`, "Orçamento no WhatsApp"),
      description: `Atendimento técnico de informática em ${city}: domicílio, coleta ou remoto. Orçamento pelo WhatsApp a partir de R$ 99,99, com garantia de 90 dias.`,
      areaServed: [city, "Curitiba"],
    };
  }

  // /servicos/<servico>/<bairro>
  if (segs[0] === "servicos" && segs[2]) {
    const servico = titleize(segs[1]);
    const { bairro, city } = bairroMeta(segs[2]);
    return {
      url,
      routePath,
      title: clampTitle(`${servico} em ${bairro}, ${city}`, "Técnico em Curitiba"),
      description: `${servico} em ${bairro}, ${city}. Atendimento a domicílio, coleta ou suporte remoto, com diagnóstico e orçamento pelo WhatsApp a partir de R$ 99,99.`,
      areaServed: [bairro, city],
    };
  }

  const last = segs[segs.length - 1] || "";
  const nome = titleize(last);
  const desc = `${nome}: assistência técnica de informática em Curitiba e RMC, com atendimento a domicílio, coleta ou remoto e orçamento pelo WhatsApp.`;
  return {
    url,
    routePath,
    title: clampTitle(`${nome} em Curitiba`, "Técnico em Curitiba"),
    description: desc.length <= 175 ? desc : `${nome}: assistência técnica em Curitiba e RMC — atendimento a domicílio, coleta ou remoto, orçamento pelo WhatsApp.`,
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
        "@type": "ImageObject",
        "@id": `${meta.url}#primaryimage`,
        contentUrl: LOCAL_PHOTO_OG,
        url: LOCAL_PHOTO_OG,
        name: `Atendimento técnico em ${meta.areaServed[0]}`,
        description: `Técnico de informática realizando manutenção em computador — atendimento em ${meta.areaServed.join(", ")}`,
        creditText: LOCAL_PHOTO_CREDIT,
        creator: { "@type": "Organization", name: "Unsplash", url: "https://unsplash.com" },
        copyrightNotice: LOCAL_PHOTO_CREDIT,
        license: LOCAL_PHOTO_LICENSE,
        acquireLicensePage: LOCAL_PHOTO_SOURCE,
        width: 1200,
        height: 630,
      },
      {
        "@type": "WebPage",
        "@id": `${meta.url}#webpage`,
        url: meta.url,
        name: meta.title,
        description: meta.description,
        inLanguage: "pt-BR",
        primaryImageOfPage: { "@id": `${meta.url}#primaryimage` },
      },
    ],
  };
}

function injectMeta(html, meta) {
  const ogImage = LOCAL_PHOTO_OG;
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
    `<meta property="og:image:width" content="1200">`,
    `<meta property="og:image:height" content="630">`,
    `<meta property="og:image:alt" content="${htmlEscape("Atendimento técnico de informática em " + meta.areaServed[0])}">`,
    `<meta name="twitter:image" content="${ogImage}">`,
    `<meta name="twitter:image:alt" content="${htmlEscape("Atendimento técnico de informática em " + meta.areaServed[0])}">`,
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
