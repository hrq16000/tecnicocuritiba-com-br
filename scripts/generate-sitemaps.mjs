// Generates sitemap-index.xml + sub-sitemaps (main, servicos, bairros, marcas, problemas).
// Runs via predev/prebuild. Parses src/App.tsx + data files; outputs to public/.
import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { resolve } from "node:path";

const BASE_URL = "https://tecnicocuritiba.com.br";
const TODAY = new Date().toISOString().slice(0, 10);

// Rotas ficam em LegacyApp.tsx (App.tsx só orquestra o shell/Suspense).
const appSrc = readFileSync(resolve("src/LegacyApp.tsx"), "utf8");
const brandsSrc = readFileSync(resolve("src/lib/brandsData.ts"), "utf8");
// Após o split (2026-07-11), cada slug é um arquivo em src/lib/problemas/.
const problemasDir = resolve("src/lib/problemas");
const problemSlugsFromDir = readdirSync(problemasDir)
  .filter((f) => f.endsWith(".ts") && !["index.ts", "types.ts"].includes(f))
  .map((f) => f.replace(/\.ts$/, ""));

// 1) Extract literal routes from App.tsx (no params, no admin/ads, no wildcards).
const routes = new Set();
const reRoute = /<Route\s+path="([^"]+)"/g;
for (const m of appSrc.matchAll(reRoute)) {
  const p = m[1];
  if (p.includes(":") || p.includes("*")) continue;
  if (p.startsWith("/admin") || p.startsWith("/ads") || p === "/index") continue;
  // Skip redirect-only old URLs (they have <Navigate>)
  routes.add(p);
}

// Remove pure redirect rows by checking the source line contains <Navigate
const redirectPaths = new Set();
for (const m of appSrc.matchAll(/<Route\s+path="([^"]+)"\s+element=\{<Navigate/g)) {
  redirectPaths.add(m[1]);
}
for (const p of redirectPaths) routes.delete(p);

// Páginas com <meta name="robots" content="noindex"> não entram no sitemap.
for (const p of ["/avaliar", "/obrigado", "/funil-indisponivel", "/status-anuncios"]) routes.delete(p);

// Rotas públicas migradas para TanStack Start (src/routes/) — o parser acima
// lê apenas o LegacyApp.tsx (React Router). Adicionar novas rotas públicas aqui;
// /ordem-de-servico é redirect 301 para /abrir-os, portanto fica fora.
for (const p of ["/abrir-os"]) routes.add(p);

// 2) Expand dynamic routes from data files.
const brandSlugs = [...brandsSrc.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]);
const problemSlugs = problemSlugsFromDir;

for (const s of brandSlugs) routes.add(`/marcas/${s}`);
for (const s of problemSlugs) routes.add(`/problemas/${s}`);

// Expande /atendimento/:cidade e /atendimento/:cidade/:bairro
try {
  const cidadesSrc = readFileSync(resolve("src/lib/servicoCidadeData.ts"), "utf8");
  const cidadesBlock = cidadesSrc.match(/export const CIDADES[\s\S]*?\];/);
  if (cidadesBlock) {
    const citySlugs = [...cidadesBlock[0].matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]);
    for (const s of citySlugs) routes.add(`/atendimento/${s}`);
  }
  const bairrosSrc = readFileSync(resolve("src/lib/atendimentoBairrosData.ts"), "utf8");
  // Parseia BAIRROS_ATENDIMENTO: mapeia "cidade-slug": [ {slug: "..."} ]
  const re = /"?([a-z0-9-]+)"?\s*:\s*\[([^\]]*)\]/g;
  for (const m of bairrosSrc.matchAll(re)) {
    const cidade = m[1];
    const bairros = [...m[2].matchAll(/slug:\s*"([^"]+)"/g)].map((b) => b[1]);
    for (const b of bairros) routes.add(`/atendimento/${cidade}/${b}`);
  }
} catch { /* opcional */ }

// 2.1) Posts do blog — extraídos de src/pages/Blog.tsx (mesma fonte do RSS).
// sitemap-news.xml só cobre 30 dias (regra do Google News), então sem este
// bucket os posts antigos ficam fora de qualquer sitemap indexável.
const blogSlugs = [];
try {
  const blogSrc = readFileSync(resolve("src/pages/Blog.tsx"), "utf8");
  const start = blogSrc.indexOf("const blogPosts = [");
  if (start !== -1) {
    const end = blogSrc.indexOf("\n];", start);
    const block = blogSrc.slice(start, end === -1 ? undefined : end);
    for (const m of block.matchAll(/slug:\s*"([^"]+)"/g)) blogSlugs.push(m[1]);
  }
} catch { /* opcional */ }
for (const s of new Set(blogSlugs)) routes.add(`/blog/${s}`);

// 3) Categorize.
const buckets = { bairros: [], marcas: [], problemas: [], servicos: [], blog: [], main: [] };
for (const p of [...routes].sort()) {
  if (p.startsWith("/bairros/")) buckets.bairros.push(p);
  else if (p.startsWith("/marcas")) buckets.marcas.push(p);
  else if (p.startsWith("/problemas/") || p.startsWith("/procedimentos")) buckets.problemas.push(p);
  else if (p.startsWith("/blog/")) buckets.blog.push(p);
  else if (p.startsWith("/atendimento")) buckets.servicos.push(p);
  else if (p.startsWith("/servicos") || /^\/conserto-.+-curitiba$/.test(p) || p.startsWith("/conserto-tv/") || p.startsWith("/conserto-som/") || p.startsWith("/conserto-videogame/") || p.startsWith("/conserto-celular/")) buckets.servicos.push(p);
  else buckets.main.push(p);
}

// 4) Priority + changefreq heuristic.
function meta(p) {
  if (p === "/") return { changefreq: "weekly", priority: "1.0" };
  if (p.startsWith("/bairros/")) return { changefreq: "monthly", priority: "0.7" };
  if (p.startsWith("/marcas/")) return { changefreq: "monthly", priority: "0.7" };
  // /problemas/* e /servicos/* são as rotas de maior valor de conversão —
  // priorizamos com peso alto e crawl semanal para indexação acelerada.
  if (p.startsWith("/problemas/") || p.startsWith("/procedimentos")) return { changefreq: "weekly", priority: "0.9" };
  if (p.startsWith("/servicos/") || p.startsWith("/conserto-")) return { changefreq: "weekly", priority: "0.9" };
  if (p.startsWith("/blog/")) return { changefreq: "monthly", priority: "0.7" };
  if (p.startsWith("/atendimento/")) return { changefreq: "weekly", priority: "0.85" };
  if (p === "/atendimento") return { changefreq: "weekly", priority: "0.8" };
  return { changefreq: "weekly", priority: "0.8" };
}

function buildUrlset(paths) {
  const urls = paths
    .map((p) => {
      const { changefreq, priority } = meta(p);
      // Sem <lastmod>: não temos timestamp real de alteração por página.
      return `  <url><loc>${BASE_URL}${p}</loc><changefreq>${changefreq}</changefreq><priority>${priority}</priority></url>`;
    })
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

const files = [
  ["sitemap-main.xml", buckets.main],
  ["sitemap-servicos.xml", buckets.servicos],
  ["sitemap-bairros.xml", buckets.bairros],
  ["sitemap-marcas.xml", buckets.marcas],
  ["sitemap-problemas.xml", buckets.problemas],
  ["sitemap-blog.xml", buckets.blog],
];

for (const [name, paths] of files) {
  writeFileSync(resolve("public", name), buildUrlset(paths));
}

// 5) Sitemap index.
const indexXml =
  `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  files
    .map(
      ([name]) =>
        `  <sitemap><loc>${BASE_URL}/${name}</loc><lastmod>${TODAY}</lastmod></sitemap>`,
    )
    .join("\n") +
  `\n  <sitemap><loc>${BASE_URL}/sitemap-news.xml</loc><lastmod>${TODAY}</lastmod></sitemap>\n` +
  `</sitemapindex>\n`;

writeFileSync(resolve("public/sitemap-index.xml"), indexXml);

// Keep legacy /sitemap.xml as an alias of the index so old refs keep working.
writeFileSync(resolve("public/sitemap.xml"), indexXml);

const total = files.reduce((n, [, p]) => n + p.length, 0);
console.log(
  `sitemaps: index + ${files.length} sub-sitemaps written (${total} urls): ` +
    files.map(([n, p]) => `${n}=${p.length}`).join(", "),
);
