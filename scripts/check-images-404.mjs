#!/usr/bin/env node
/**
 * Crawler leve: baixa /blog + amostragem de /problemas/* e testa cada <img src>
 * (e og:image, preload as=image). Falha com lista de slug → asset em 404.
 *
 * Uso:
 *   BASE_URL=http://localhost:8080 node scripts/check-images-404.mjs
 *   SAMPLE=20 node scripts/check-images-404.mjs
 */
import { readdirSync } from "node:fs";
import { resolve } from "node:path";

const BASE = (process.env.BASE_URL || "http://localhost:8080").replace(/\/$/, "");
const SAMPLE = Number(process.env.SAMPLE || 25);

const problemasDir = resolve("src/lib/problemas");
const slugs = readdirSync(problemasDir)
  .filter((f) => f.endsWith(".ts") && !["index.ts", "types.ts"].includes(f))
  .map((f) => f.replace(/\.ts$/, ""));

// Amostragem estável (primeiros N em ordem alfabética) para manter CI rápido.
const sampled = slugs.slice(0, SAMPLE);
const routes = ["/blog", ...sampled.map((s) => `/problemas/${s}`)];

function extractImageUrls(html, pageUrl) {
  const urls = new Set();
  const push = (u) => {
    if (!u) return;
    if (u.startsWith("data:")) return;
    try {
      urls.add(new URL(u, pageUrl).toString());
    } catch { /* ignore */ }
  };
  for (const m of html.matchAll(/<img\b[^>]*\bsrc=["']([^"']+)["']/gi)) push(m[1]);
  for (const m of html.matchAll(/<img\b[^>]*\bsrcset=["']([^"']+)["']/gi)) {
    for (const part of m[1].split(",")) push(part.trim().split(/\s+/)[0]);
  }
  for (const m of html.matchAll(/<link\b[^>]*rel=["']preload["'][^>]*as=["']image["'][^>]*href=["']([^"']+)["']/gi)) push(m[1]);
  for (const m of html.matchAll(/<meta\b[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["']/gi)) push(m[1]);
  return [...urls];
}

const bad = [];
const checked = new Set();

for (const route of routes) {
  const pageUrl = `${BASE}${route}`;
  let html;
  try {
    const res = await fetch(pageUrl);
    if (!res.ok) { bad.push({ page: route, asset: "(HTML)", status: res.status }); continue; }
    html = await res.text();
  } catch (e) {
    bad.push({ page: route, asset: "(HTML)", status: `fetch-error: ${e.message}` });
    continue;
  }
  for (const url of extractImageUrls(html, pageUrl)) {
    if (checked.has(url)) continue;
    checked.add(url);
    try {
      let r = await fetch(url, { method: "HEAD" });
      if (r.status === 405 || r.status === 501) r = await fetch(url, { method: "GET" });
      if (!r.ok) bad.push({ page: route, asset: url, status: r.status });
    } catch (e) {
      bad.push({ page: route, asset: url, status: `fetch-error: ${e.message}` });
    }
  }
}

console.log(`✓ verificadas ${checked.size} imagens em ${routes.length} páginas`);
if (bad.length) {
  console.error(`\n✗ ${bad.length} imagem(ns) com falha:`);
  for (const b of bad) console.error(`  - [${b.status}] ${b.page}  →  ${b.asset}`);
  process.exit(1);
}
