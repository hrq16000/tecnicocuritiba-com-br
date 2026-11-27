#!/usr/bin/env node
/**
 * Link checker interno:
 * - Lê sitemap-index.xml + filhos, extrai URLs (paths).
 * - HEAD/GET em cada uma contra http://localhost:4173 (bun run preview).
 * - Também extrai <a href> internos de cada página e valida que apontam
 *   para paths conhecidos do sitemap (evita link quebrado interno).
 * - Falha com exit 1 se qualquer URL retornar 404/500.
 */
import fs from "node:fs";
import path from "node:path";

const BASE = process.env.PREVIEW_URL || "http://localhost:4173";
const CONCURRENCY = 10;
const PUBLIC = path.resolve("public");

function readSitemapPaths() {
  const idx = path.join(PUBLIC, "sitemap-index.xml");
  if (!fs.existsSync(idx)) throw new Error("sitemap-index.xml não encontrado");
  const indexXml = fs.readFileSync(idx, "utf8");
  const children = [...indexXml.matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map((m) => m[1].replace(/^https?:\/\/[^/]+/, ""))
    .map((rel) => path.join(PUBLIC, rel.replace(/^\/+/, "")))
    .filter((p) => fs.existsSync(p));
  const paths = new Set();
  for (const sm of children) {
    const xml = fs.readFileSync(sm, "utf8");
    for (const m of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) {
      paths.add(m[1].replace(/^https?:\/\/[^/]+/, "") || "/");
    }
  }
  return [...paths];
}

async function check(url) {
  try {
    const res = await fetch(`${BASE}${url}`, { redirect: "manual" });
    return { url, status: res.status };
  } catch (e) {
    return { url, status: `ERR:${e.message}` };
  }
}

async function extractHrefs(url) {
  try {
    const res = await fetch(`${BASE}${url}`);
    if (!res.ok) return [];
    const html = await res.text();
    const hrefs = [...html.matchAll(/<a[^>]+href=["']([^"']+)["']/gi)].map((m) => m[1]);
    return hrefs
      .filter((h) => h.startsWith("/") && !h.startsWith("//") && !h.startsWith("/#"))
      .map((h) => h.split("#")[0].split("?")[0])
      .map((h) => h.replace(/\/$/, "") || "/");
  } catch {
    return [];
  }
}

async function runPool(items, worker) {
  const results = [];
  let cursor = 0;
  async function next() {
    while (cursor < items.length) {
      const i = cursor++;
      results[i] = await worker(items[i]);
    }
  }
  await Promise.all(Array.from({ length: CONCURRENCY }, next));
  return results;
}

const paths = readSitemapPaths();
console.log(`Verificando ${paths.length} URLs contra ${BASE}…`);

const statusResults = await runPool(paths, check);
const bad = statusResults.filter((r) => typeof r.status === "number" ? r.status >= 400 : true);

console.log(`\nStatus HTTP: ${statusResults.length - bad.length}/${statusResults.length} OK`);
if (bad.length) {
  console.error("❌ URLs com problema:");
  for (const b of bad) console.error(`  ${b.status}\t${b.url}`);
}

// Todas as URLs, determinísticas. Reutiliza consultas para destinos repetidos.
const sample = [...paths].sort();
const validPathSet = new Set(paths.map((p) => (p.replace(/\/$/, "") || "/")));
const brokenLinks = [];
const extraStatuses = new Map();
const checkExtra = (href) => {
  if (!extraStatuses.has(href)) extraStatuses.set(href, check(href));
  return extraStatuses.get(href);
};
await runPool(sample, async (url) => {
  const hrefs = await extractHrefs(url);
  for (const h of new Set(hrefs)) {
    if (!validPathSet.has(h)) {
      // Segunda chance: HEAD real (arquivo estático como /rss.xml, /robots.txt).
      const res = await checkExtra(h);
      if (typeof res.status !== "number" || res.status >= 400) brokenLinks.push({ referrer: url, href: h, status: res.status });
    }
  }
});

if (brokenLinks.length) {
  console.error(`\n❌ Links internos quebrados (${brokenLinks.length}):`);
  for (const l of brokenLinks.slice(0, 50)) {
    console.error(`  ${l.status}\t${l.href}\t(em ${l.referrer})`);
  }
}

if (bad.length || brokenLinks.length) process.exit(1);
console.log("✅ Sitemap + links internos íntegros.");
