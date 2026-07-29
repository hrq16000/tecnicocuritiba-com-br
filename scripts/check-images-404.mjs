#!/usr/bin/env node
/**
 * Crawler leve: baixa /blog + amostragem de /problemas/* e testa cada asset
 * carregado no HTML e nos CSS externos: <img src/srcset>, preload as=image|font,
 * og:image, <link rel="stylesheet"> (baixa o CSS e checa url(...) em font-face
 * e background-image). Falha listando página → asset com status.
 *
 * Uso:
 *   BASE_URL=http://localhost:8080 node scripts/check-images-404.mjs
 *   SAMPLE=25 node scripts/check-images-404.mjs
 */
import { readdirSync } from "node:fs";
import { resolve } from "node:path";

const BASE = (process.env.BASE_URL || "http://localhost:8080").replace(/\/$/, "");
const SAMPLE = Number(process.env.SAMPLE || 25);

const problemasDir = resolve("src/lib/problemas");
const slugs = readdirSync(problemasDir)
  .filter((f) => f.endsWith(".ts") && !["index.ts", "types.ts"].includes(f))
  .map((f) => f.replace(/\.ts$/, ""));

const sampled = slugs.slice(0, SAMPLE);
const routes = ["/", "/blog", ...sampled.map((s) => `/problemas/${s}`)];

function extractFromHtml(html, pageUrl) {
  const assets = [];         // { url, kind }
  const stylesheets = [];    // absolute URLs
  const push = (u, kind) => {
    if (!u || u.startsWith("data:") || u.startsWith("blob:")) return;
    try { assets.push({ url: new URL(u, pageUrl).toString(), kind }); } catch { /* ignore */ }
  };
  for (const m of html.matchAll(/<img\b[^>]*\bsrc=["']([^"']+)["']/gi)) push(m[1], "img");
  for (const m of html.matchAll(/<img\b[^>]*\bsrcset=["']([^"']+)["']/gi))
    for (const p of m[1].split(",")) push(p.trim().split(/\s+/)[0], "img");
  for (const m of html.matchAll(/<source\b[^>]*\bsrcset=["']([^"']+)["']/gi))
    for (const p of m[1].split(",")) push(p.trim().split(/\s+/)[0], "img");
  for (const m of html.matchAll(/<link\b[^>]*rel=["']preload["'][^>]*as=["'](image|font)["'][^>]*href=["']([^"']+)["']/gi))
    push(m[2], m[1]);
  for (const m of html.matchAll(/<link\b[^>]*rel=["']preload["'][^>]*href=["']([^"']+)["'][^>]*as=["'](image|font)["']/gi))
    push(m[1], m[2]);
  for (const m of html.matchAll(/<meta\b[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["']/gi))
    push(m[1], "og");
  for (const m of html.matchAll(/<link\b[^>]*rel=["']stylesheet["'][^>]*href=["']([^"']+)["']/gi)) {
    try { stylesheets.push(new URL(m[1], pageUrl).toString()); } catch { /* ignore */ }
  }
  return { assets, stylesheets };
}

function extractFromCss(css, cssUrl) {
  const assets = [];
  const push = (u, kind) => {
    if (!u || u.startsWith("data:")) return;
    try { assets.push({ url: new URL(u, cssUrl).toString(), kind }); } catch { /* ignore */ }
  };
  // url(...) genérico (background-image, mask, cursor, list-style-image, etc.)
  for (const m of css.matchAll(/url\(\s*(?:"([^"]+)"|'([^']+)'|([^)]+?))\s*\)/gi)) {
    push(m[1] || m[2] || m[3], "css");
  }
  return assets;
}

async function checkStatus(url) {
  try {
    let r = await fetch(url, { method: "HEAD", redirect: "follow" });
    if (r.status === 405 || r.status === 501 || r.status === 403) {
      r = await fetch(url, { method: "GET", redirect: "follow" });
    }
    return r.ok ? null : r.status;
  } catch (e) {
    return `fetch-error: ${e.message}`;
  }
}

const bad = [];
const checked = new Map(); // url → status (null = ok)
const cssCache = new Set();

for (const route of routes) {
  const pageUrl = `${BASE}${route}`;
  let html;
  try {
    const res = await fetch(pageUrl);
    if (!res.ok) { bad.push({ page: route, kind: "HTML", asset: pageUrl, status: res.status }); continue; }
    html = await res.text();
  } catch (e) {
    bad.push({ page: route, kind: "HTML", asset: pageUrl, status: `fetch-error: ${e.message}` });
    continue;
  }
  const { assets, stylesheets } = extractFromHtml(html, pageUrl);

  // Puxa CSS externos (uma vez) e adiciona os assets referenciados
  for (const cssUrl of stylesheets) {
    if (cssCache.has(cssUrl)) continue;
    cssCache.add(cssUrl);
    // Verifica também o próprio CSS
    if (!checked.has(cssUrl)) {
      const s = await checkStatus(cssUrl);
      checked.set(cssUrl, s);
      if (s) bad.push({ page: route, kind: "css-file", asset: cssUrl, status: s });
    }
    if (checked.get(cssUrl) == null) {
      try {
        const cssRes = await fetch(cssUrl);
        if (cssRes.ok) assets.push(...extractFromCss(await cssRes.text(), cssUrl));
      } catch { /* ignore */ }
    }
  }

  for (const { url, kind } of assets) {
    if (checked.has(url)) {
      const s = checked.get(url);
      if (s) bad.push({ page: route, kind, asset: url, status: s });
      continue;
    }
    const s = await checkStatus(url);
    checked.set(url, s);
    if (s) bad.push({ page: route, kind, asset: url, status: s });
  }
}

const okCount = [...checked.values()].filter((v) => v == null).length;
console.log(`✓ verificados ${checked.size} assets (${okCount} ok) em ${routes.length} páginas + ${cssCache.size} CSS externos`);
if (bad.length) {
  console.error(`\n✗ ${bad.length} asset(s) com falha:`);
  for (const b of bad) console.error(`  - [${b.status}] (${b.kind}) ${b.page}  →  ${b.asset}`);
  process.exit(1);
}
