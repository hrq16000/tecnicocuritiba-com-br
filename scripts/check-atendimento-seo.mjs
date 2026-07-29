#!/usr/bin/env node
// Valida SEO nas rotas /atendimento/* e /atendimento/:cidade/:bairro.
// Regras: 1 <h1>, <title> não vazio/genérico, <meta name="description"> com >=50 chars,
// e >=1 <script type="application/ld+json"> por rota. Falha CI em regressão.
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const BASE = process.env.E2E_BASE_URL || "http://localhost:8080";

const cidadesSrc = readFileSync(resolve("src/lib/servicoCidadeData.ts"), "utf8");
const cidades = [
  ...cidadesSrc.match(/export const CIDADES[\s\S]*?\];/)[0]
    .matchAll(/slug:\s*"([^"]+)"/g),
].map((m) => m[1]);

const bairrosSrc = readFileSync(resolve("src/lib/atendimentoBairrosData.ts"), "utf8");
const bairrosByCidade = {};
for (const m of bairrosSrc.matchAll(/"?([a-z0-9-]+)"?\s*:\s*\[([^\]]*)\]/g)) {
  bairrosByCidade[m[1]] = [...m[2].matchAll(/slug:\s*"([^"]+)"/g)].map((b) => b[1]);
}

const routes = ["/atendimento"];
for (const c of cidades) {
  routes.push(`/atendimento/${c}`);
  for (const b of bairrosByCidade[c] || []) routes.push(`/atendimento/${c}/${b}`);
}

const GENERIC_TITLES = ["Lovable App", "Vite + React + TS", ""];
const failures = [];

for (const route of routes) {
  const url = `${BASE}${route}`;
  let html = "";
  try {
    const res = await fetch(url);
    if (!res.ok) {
      failures.push(`${route}: HTTP ${res.status}`);
      continue;
    }
    html = await res.text();
  } catch (e) {
    failures.push(`${route}: fetch falhou (${e.message})`);
    continue;
  }

  const title = (html.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [, ""])[1].trim();
  const desc = (html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i) || [, ""])[1].trim();
  const h1s = [...html.matchAll(/<h1[\s>][\s\S]*?<\/h1>/gi)];
  const jsonld = [...html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>/gi)];

  if (!title || GENERIC_TITLES.includes(title)) failures.push(`${route}: title inválido "${title}"`);
  if (!desc || desc.length < 50) failures.push(`${route}: description curta/ausente (${desc.length}c)`);
  if (h1s.length !== 1) failures.push(`${route}: H1 count=${h1s.length} (esperado 1)`);
  if (jsonld.length < 1) failures.push(`${route}: JSON-LD ausente`);
}

if (failures.length) {
  console.error(`\n❌ ${failures.length} regressão(ões) SEO em /atendimento:`);
  for (const f of failures) console.error(`  - ${f}`);
  process.exit(1);
}
console.log(`✅ SEO OK em ${routes.length} rotas /atendimento`);
