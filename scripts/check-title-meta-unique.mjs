#!/usr/bin/env node
/**
 * Gate de CI — unicidade e qualidade de <title>/<meta description>.
 *
 * Alvo: shells estáticos de serviço×cidade, bairros e blog (prerender).
 * Falha quando: título/descrição duplicados, fora dos limites de tamanho
 * ou usando padrão genérico.
 *
 * Uso: BASE_URL=http://localhost:8080 node scripts/check-title-meta-unique.mjs
 */
import fs from "node:fs";
import path from "node:path";

const SITE = "https://tecnicocuritiba.com.br";
const BASE = (process.env.BASE_URL || "http://localhost:8080").replace(/\/$/, "");
const MAX = Number(process.env.MAX_URLS || 300);

const TITLE_MIN = 25;
const TITLE_MAX = 70;
const DESC_MIN = 70;
const DESC_MAX = 175;
const GENERIC = [/^lovable/i, /lovable generated/i, /^home$/i, /^untitled/i, /^página$/i, /^técnico em curitiba$/i];

function routes() {
  const dir = path.resolve("public");
  const files = fs.readdirSync(dir).filter((f) => /^sitemap.*\.xml$/.test(f) && f !== "sitemap-images.xml");
  const out = new Set();
  for (const f of files) {
    const xml = fs.readFileSync(path.join(dir, f), "utf8");
    for (const m of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) {
      const loc = m[1].trim();
      if (!loc.startsWith(SITE) || /sitemap[\w-]*\.xml$/.test(loc)) continue;
      const p = loc.slice(SITE.length).replace(/\/$/, "") || "/";
      if (/^\/(servicos|bairros|blog|atendimento)\//.test(p)) out.add(p);
    }
  }
  return [...out].sort().slice(0, MAX);
}

const pick = (html, re) => {
  const m = html.match(re);
  return m ? m[1].replace(/\s+/g, " ").trim() : "";
};

const errors = [];
const titles = new Map();
const descs = new Map();
let checked = 0;

for (const route of routes()) {
  let html;
  try {
    const res = await fetch(`${BASE}${route}`, { redirect: "follow" });
    if (!res.ok) {
      errors.push(`${route}: HTTP ${res.status}`);
      continue;
    }
    html = await res.text();
  } catch (err) {
    errors.push(`${route}: falha de rede (${err.message})`);
    continue;
  }
  checked++;

  const title = pick(html, /<title>([\s\S]*?)<\/title>/i);
  const desc = pick(html, /<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i);

  if (!title) errors.push(`${route}: <title> ausente.`);
  else {
    if (title.length < TITLE_MIN || title.length > TITLE_MAX)
      errors.push(`${route}: title com ${title.length} chars (limite ${TITLE_MIN}-${TITLE_MAX}) — "${title}"`);
    if (GENERIC.some((r) => r.test(title))) errors.push(`${route}: title genérico — "${title}"`);
    if (titles.has(title)) errors.push(`${route}: title duplicado de ${titles.get(title)} — "${title}"`);
    else titles.set(title, route);
  }

  if (!desc) errors.push(`${route}: meta description ausente.`);
  else {
    if (desc.length < DESC_MIN || desc.length > DESC_MAX)
      errors.push(`${route}: description com ${desc.length} chars (limite ${DESC_MIN}-${DESC_MAX}).`);
    if (GENERIC.some((r) => r.test(desc))) errors.push(`${route}: description genérica.`);
    if (descs.has(desc)) errors.push(`${route}: description duplicada de ${descs.get(desc)}.`);
    else descs.set(desc, route);
  }
}

if (errors.length) {
  console.error(`\n❌ title/description: ${errors.length} violação(ões) em ${checked} rotas\n`);
  errors.slice(0, 60).forEach((e) => console.error(` - ${e}`));
  if (errors.length > 60) console.error(` ... +${errors.length - 60}`);
  process.exit(1);
}
console.log(`✅ title/description únicos e dentro dos limites em ${checked} rotas.`);
