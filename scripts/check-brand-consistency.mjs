#!/usr/bin/env node
/**
 * Falha o CI se og:site_name, Organization.name ou LocalBusiness.name divergirem
 * do nome oficial "Técnico em Curitiba" nos HTMLs SSR servidos pelo preview (BASE_URL) ou pré-renderizados em dist/.
 *
 * Uso: node scripts/check-brand-consistency.mjs
 *   BRAND override via env BRAND
 */
import fs from "node:fs";
import path from "node:path";

const BRAND = process.env.BRAND || "Técnico em Curitiba";
const DIST = path.resolve("dist");

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p, out);
    else if (entry.isFile() && entry.name === "index.html") out.push(p);
  }
  return out;
}

const errors = [];
const BASE = process.env.BASE_URL;
const files = BASE ? [] : walk(DIST);
if (BASE) {
  const index = fs.readFileSync("public/sitemap-index.xml", "utf8");
  const urls = new Set();
  for (const [, loc] of index.matchAll(/<loc>([^<]+)<\/loc>/g)) {
    const child = path.join("public", new URL(loc).pathname.replace(/^\/+/, ""));
    const xml = fs.readFileSync(child, "utf8");
    for (const [, page] of xml.matchAll(/<loc>([^<]+)<\/loc>/g))
      urls.add(new URL(page).pathname);
  }
  files.push(...urls);
}

if (!files.length) {
  console.error(`[brand-check] Nenhuma página encontrada. Rode o build antes.`);
  process.exit(2);
}

async function inspect(file) {
  const rel = BASE ? file : path.relative(DIST, file);
  let html;
  try {
    if (BASE) {
      const response = await fetch(new URL(file, BASE), { redirect: "manual" });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      html = await response.text();
    } else html = fs.readFileSync(file, "utf8");
  } catch (error) { errors.push(`${rel}: ${error.message}`); return; }

  // og:site_name
  const og = html.match(/<meta[^>]+property=["']og:site_name["'][^>]+content=["']([^"']+)["']/i);
  if (BASE && !og) errors.push(`${rel}: og:site_name ausente`);
  if (og && og[1].trim() !== BRAND) {
    errors.push(`${rel}: og:site_name = "${og[1]}" (esperado "${BRAND}")`);
  }

  // JSON-LD blocks
  const jsonLdBlocks = [...html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  for (const m of jsonLdBlocks) {
    let data;
    try { data = JSON.parse(m[1]); } catch { continue; }
    const nodes = Array.isArray(data) ? data : [data];
    for (const node of nodes) checkNode(node, rel);
  }
}

let cursor = 0;
await Promise.all(Array.from({ length: 10 }, async () => {
  while (cursor < files.length) await inspect(files[cursor++]);
}));

function checkNode(node, rel) {
  if (!node || typeof node !== "object") return;
  const type = node["@type"];
  const types = Array.isArray(type) ? type : [type];
  const isBrandType = types.some((t) => t === "Organization" || t === "LocalBusiness" || (typeof t === "string" && t.endsWith("Business")));
  // The actual CFTV installation partner is explicitly separate from the site
  // organization. Do not relabel a third party as the first-party business.
  const externalCftvProvider = rel.startsWith("/cftv") &&
    node.name === "Mileuma Soluções / Mestre dos Serviços" &&
    !node["@id"] && !node.url;
  if (isBrandType && !externalCftvProvider && typeof node.name === "string" && node.name.trim() !== BRAND) {
    errors.push(`${rel}: ${types.join("/")}.name = "${node.name}" (esperado "${BRAND}")`);
  }
  // provider aninhado
  if (node.provider) checkNode(node.provider, rel);
  if (Array.isArray(node["@graph"])) node["@graph"].forEach((n) => checkNode(n, rel));
}

if (errors.length) {
  console.error(`\n✗ Brand consistency FAILED (${errors.length} divergências):`);
  for (const e of errors.slice(0, 50)) console.error(`  - ${e}`);
  if (errors.length > 50) console.error(`  … +${errors.length - 50} outras`);
  process.exit(1);
}
console.log(`✓ Brand consistency OK: ${files.length} arquivos, marca "${BRAND}" consistente.`);
