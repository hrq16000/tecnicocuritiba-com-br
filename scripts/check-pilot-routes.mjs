#!/usr/bin/env node
/**
 * Crawler do sitemap piloto (Lote 2).
 * Valida, para cada rota prerenderizada de alto valor:
 *  - HTTP 200 sem redirect inesperado
 *  - <title> e <meta name="description"> próprios (não o shell da home)
 *  - canonical self-referente
 *  - exatamente 1 twitter:card e presença de og:image
 *  - ao menos 1 bloco JSON-LD com BreadcrumbList
 *
 * Uso: BASE_URL=http://localhost:4173 node scripts/check-pilot-routes.mjs
 */
import { PILOT_ROUTES } from "./prerender-pilot.mjs";

const BASE = (process.env.BASE_URL || "http://localhost:4173").replace(/\/$/, "");
const SITE = "https://tecnicocuritiba.com.br";

const errors = [];
const rows = [];

for (const route of PILOT_ROUTES) {
  const url = `${BASE}${route.path}`;
  let res;
  try {
    res = await fetch(url, { redirect: "manual" });
  } catch (e) {
    errors.push(`${route.path}: falha de rede (${e.message})`);
    continue;
  }

  if (res.status >= 300 && res.status < 400) {
    errors.push(`${route.path}: redirect inesperado ${res.status} → ${res.headers.get("location")}`);
    continue;
  }
  if (res.status !== 200) {
    errors.push(`${route.path}: HTTP ${res.status}`);
    continue;
  }

  const html = await res.text();
  const title = (html.match(/<title>([\s\S]*?)<\/title>/i) || [])[1]?.trim() || "";
  const desc = (html.match(/<meta\s+name=["']description["'][^>]*content=["']([^"']*)["']/i) || [])[1] || "";
  const canonical = (html.match(/<link\s+rel=["']canonical["'][^>]*href=["']([^"']*)["']/i) || [])[1] || "";
  const twitterCards = html.match(/<meta\s+name=["']twitter:card["'][^>]*>/gi) || [];
  const ogImage = (html.match(/<meta\s+property=["']og:image["'][^>]*content=["']([^"']*)["']/i) || [])[1] || "";
  const hasBreadcrumb = /"@type"\s*:\s*"BreadcrumbList"/.test(html);

  if (title !== route.title) errors.push(`${route.path}: title divergente → "${title}"`);
  if (!desc || desc !== route.description) errors.push(`${route.path}: description divergente/ausente`);
  if (canonical !== `${SITE}${route.path}`) errors.push(`${route.path}: canonical "${canonical}" != ${SITE}${route.path}`);
  if (twitterCards.length !== 1) errors.push(`${route.path}: ${twitterCards.length} tags twitter:card (esperado 1)`);
  if (!/^https:\/\//.test(ogImage)) errors.push(`${route.path}: og:image ausente ou não absoluto`);
  if (!hasBreadcrumb) errors.push(`${route.path}: BreadcrumbList ausente no HTML estático`);

  rows.push({ path: route.path, status: res.status, twitterCards: twitterCards.length, breadcrumb: hasBreadcrumb });
}

console.log(`\nRotas piloto verificadas: ${rows.length}/${PILOT_ROUTES.length}`);
for (const r of rows) {
  console.log(`  ✓ ${r.path} — ${r.status} · twitter:card=${r.twitterCards} · breadcrumb=${r.breadcrumb}`);
}

if (errors.length) {
  console.error(`\n✗ Piloto falhou (${errors.length} problemas):`);
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}
console.log("\n✓ Piloto de prerender OK: HTTP, canônicos, meta social e JSON-LD válidos.");
