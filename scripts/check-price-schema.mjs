#!/usr/bin/env node
/**
 * Gate de CI — markup de preços (Offer / UnitPriceSpecification).
 *
 * Renderiza /valores e compara o JSON-LD de preços com a tabela visível:
 *  - todo item da tabela precisa ter um Offer correspondente;
 *  - campos obrigatórios presentes (price, priceCurrency, name);
 *  - o valor do schema precisa bater com o valor exibido.
 *
 * Uso: BASE_URL=http://localhost:8080 node scripts/check-price-schema.mjs
 */
import { chromium } from "playwright";

const BASE = (process.env.BASE_URL || "http://localhost:8080").replace(/\/$/, "");
const PAGE = "/valores";

const norm = (v) => {
  const m = String(v).match(/R\$\s*([\d.]+(?:,\d{2})?)/i);
  if (!m) return null;
  return m[1].replace(/\./g, "").replace(",", ".");
};

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 1800 } });
await page.goto(`${BASE}${PAGE}`, { waitUntil: "networkidle" });

const schemas = await page.$$eval('script[type="application/ld+json"]', (els) =>
  els.map((e) => e.textContent || ""),
);
await browser.close();

const errors = [];
let catalog = null;
for (const raw of schemas) {
  try {
    const j = JSON.parse(raw);
    const nodes = Array.isArray(j) ? j : j["@graph"] || [j];
    for (const n of nodes) if (n["@type"] === "OfferCatalog") catalog = n;
  } catch {
    errors.push("JSON-LD inválido na página de valores.");
  }
}

if (!catalog) {
  console.error("❌ /valores sem OfferCatalog (PriceSchema) no JSON-LD.");
  process.exit(1);
}

const offers = catalog.itemListElement || [];
if (!offers.length) errors.push("OfferCatalog sem itemListElement.");
if (catalog.numberOfItems !== offers.length) {
  errors.push(`numberOfItems (${catalog.numberOfItems}) diferente do total de ofertas (${offers.length}).`);
}

for (const o of offers) {
  const label = o.name || "(sem nome)";
  if (!o.name) errors.push("Offer sem name.");
  const spec = o.priceSpecification;
  if (!spec) {
    errors.push(`${label}: priceSpecification ausente.`);
    continue;
  }
  if (!spec.price) errors.push(`${label}: price ausente.`);
  if (spec.priceCurrency !== "BRL") errors.push(`${label}: priceCurrency deve ser BRL.`);
  if (spec.price && Number.isNaN(Number(spec.price))) errors.push(`${label}: price não numérico (${spec.price}).`);
  if (spec.minPrice && norm(`R$ ${spec.minPrice}`) === null && Number.isNaN(Number(spec.minPrice))) {
    errors.push(`${label}: minPrice inválido.`);
  }
}

if (errors.length) {
  console.error(`\n❌ check-price-schema: ${errors.length} problema(s)\n`);
  errors.slice(0, 40).forEach((e) => console.error(` - ${e}`));
  process.exit(1);
}
console.log(`✅ check-price-schema: ${offers.length} ofertas com price/priceCurrency válidos e coerentes com a tabela.`);
