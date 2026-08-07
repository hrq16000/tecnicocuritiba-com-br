#!/usr/bin/env node
/**
 * Valida sitemap-index.xml + todos os sub-sitemaps:
 *  - XML bem-formado
 *  - cada <loc> retorna 200
 *  - canônico da página bate com a URL do sitemap (quando presente)
 *
 * Uso:
 *   BASE_URL=http://localhost:8080 node scripts/check-sitemap-urls.mjs
 *   MAX_URLS=60 node scripts/check-sitemap-urls.mjs
 */
const BASE = (process.env.BASE_URL || "http://localhost:8080").replace(/\/$/, "");
const MAX_URLS = Number(process.env.MAX_URLS || 80);

const locsFromXml = (xml) => [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());

async function getText(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} em ${url}`);
  return res.text();
}

const indexUrl = `${BASE}/sitemap-index.xml`;
console.log(`▶ ${indexUrl}`);
const indexXml = await getText(indexUrl);
const subSitemaps = locsFromXml(indexXml);
if (!subSitemaps.length) {
  console.error("✗ sitemap-index.xml sem <loc>");
  process.exit(1);
}

const allUrls = new Set();
for (const sm of subSitemaps) {
  // rebaser para BASE (caso o sitemap traga o domínio de produção)
  const localSm = sm.replace(/^https?:\/\/[^/]+/, BASE);
  console.log(`  ▸ ${localSm}`);
  try {
    const xml = await getText(localSm);
    for (const loc of locsFromXml(xml)) allUrls.add(loc);
  } catch (e) {
    console.error(`  ✗ ${e.message}`);
    process.exit(1);
  }
}

// Amostragem estável (primeiros MAX_URLS depois de ordenar) para manter CI rápido.
const sample = [...allUrls].sort().slice(0, MAX_URLS);
console.log(`\nchecando ${sample.length}/${allUrls.size} URLs (MAX_URLS=${MAX_URLS})`);

const bad = [];
// `vite preview` faz fallback de SPA e não serve dist/<rota>/index.html; a
// hospedagem de produção serve. Em base local, lemos o arquivo estático quando existe.
const IS_LOCAL = /^https?:\/\/(localhost|127\.0\.0\.1)/.test(BASE);
const readPrerendered = (original) => {
  if (!IS_LOCAL) return null;
  const parts = new URL(original).pathname.split("/").filter(Boolean);
  const file = nodePath.resolve("dist", ...parts, "index.html");
  return nodeFs.existsSync(file) ? nodeFs.readFileSync(file, "utf8") : null;
};
for (const original of sample) {
  const url = original.replace(/^https?:\/\/[^/]+/, BASE);
  try {
    const r = await fetch(url, { redirect: "manual" });
    if (r.status !== 200) { bad.push({ url: original, status: r.status, kind: "http" }); continue; }
    const html = readPrerendered(original) ?? (await r.text());
    const m = html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i);

    if (m) {
      const canonicalPath = new URL(m[1], url).pathname.replace(/\/+$/, "") || "/";
      const expectedPath = new URL(original).pathname.replace(/\/+$/, "") || "/";
      if (canonicalPath !== expectedPath) {
        bad.push({ url: original, status: `canonical=${canonicalPath} ≠ ${expectedPath}`, kind: "canonical" });
      }
    }
  } catch (e) {
    bad.push({ url: original, status: `fetch-error: ${e.message}`, kind: "http" });
  }
}

console.log(`✓ index=${subSitemaps.length} sub-sitemaps, ${allUrls.size} URLs totais, ${sample.length} testadas`);
if (bad.length) {
  console.error(`\n✗ ${bad.length} problema(s):`);
  for (const b of bad) console.error(`  - [${b.kind}] ${b.status}  →  ${b.url}`);
  process.exit(1);
}
