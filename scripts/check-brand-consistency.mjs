#!/usr/bin/env node
/**
 * Falha o CI se og:site_name, Organization.name ou LocalBusiness.name divergirem
 * do nome oficial "Técnico em Curitiba" nos HTMLs pré-renderizados em dist/.
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
const files = walk(DIST);
if (!files.length) {
  console.error(`[brand-check] dist/ vazio ou sem index.html. Rode o build antes.`);
  process.exit(2);
}

for (const file of files) {
  const rel = path.relative(DIST, file);
  const html = fs.readFileSync(file, "utf8");

  // og:site_name
  const og = html.match(/<meta[^>]+property=["']og:site_name["'][^>]+content=["']([^"']+)["']/i);
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

function checkNode(node, rel) {
  if (!node || typeof node !== "object") return;
  const type = node["@type"];
  const types = Array.isArray(type) ? type : [type];
  const isBrandType = types.some((t) => t === "Organization" || t === "LocalBusiness" || (typeof t === "string" && t.endsWith("Business")));
  if (isBrandType && typeof node.name === "string" && node.name.trim() !== BRAND) {
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
