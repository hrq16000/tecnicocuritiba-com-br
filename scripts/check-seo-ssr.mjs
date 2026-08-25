#!/usr/bin/env node
/**
 * Gate de SEO SSR (TanStack Start) — bloqueia o deploy se os schemas
 * estruturais saírem do SSR ou voltarem a ser duplicados no cliente.
 *
 * Verifica:
 *  1. __root.tsx injeta LocalBusiness + Organization via head() (SSR, todas as rotas)
 *  2. index.tsx injeta HowTo via head() (rich snippet do processo)
 *  3. JsonLdSchema.tsx NÃO reintroduz ld-localbusiness/ld-organization (anti-duplicata)
 *  4. robots.txt existe, permite o site e referencia sitemap
 *  5. sitemap-index.xml existe
 *  6. src/lib/jsonLd.ts existe (fonte única dos schemas estruturais)
 */
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const errors = [];
const read = (p) => readFileSync(resolve(process.cwd(), p), "utf8");

// 1-2. Schemas estruturais no SSR
const root = read("src/routes/__root.tsx");
if (!root.includes("localBusinessSchema")) errors.push("__root.tsx sem LocalBusiness no head() SSR");
if (!root.includes("organizationSchema")) errors.push("__root.tsx sem Organization no head() SSR");
if (!/head:\s*\(\)/.test(root)) errors.push("__root.tsx sem head() — metadados globais ausentes");

const index = read("src/routes/index.tsx");
if (!index.includes("howToAtendimentoSchema")) errors.push("index.tsx sem HowTo no head() SSR");
for (const tag of ["og:title", "og:description", "twitter:card", "canonical"]) {
  if (!index.includes(tag)) errors.push(`index.tsx sem ${tag} no head()`);
}

// 3. Anti-duplicata: LocalBusiness/Organization não voltam ao client-side
const legacy = read("src/components/JsonLdSchema.tsx");
if (legacy.includes("ld-localbusiness")) {
  errors.push("JsonLdSchema.tsx reintroduziu ld-localbusiness — LocalBusiness é SSR-only no __root");
}
if (legacy.includes("ld-organization")) {
  errors.push("JsonLdSchema.tsx reintroduziu ld-organization — Organization é SSR-only no __root");
}

// 4-6. Arquivos de indexação
if (!existsSync(resolve(process.cwd(), "public/robots.txt"))) {
  errors.push("public/robots.txt ausente");
} else {
  const robots = read("public/robots.txt");
  if (!/user-agent:\s*\*/i.test(robots)) errors.push("robots.txt sem User-agent: *");
  if (!/sitemap:/i.test(robots)) errors.push("robots.txt sem referência a sitemap");
  if (/^disallow:\s*\/\s*$/im.test(robots)) errors.push("robots.txt bloqueia o site inteiro");
}
if (!existsSync(resolve(process.cwd(), "public/sitemap-index.xml"))) {
  errors.push("public/sitemap-index.xml ausente");
}
if (!existsSync(resolve(process.cwd(), "src/lib/jsonLd.ts"))) {
  errors.push("src/lib/jsonLd.ts ausente (fonte única dos schemas estruturais)");
}

if (errors.length) {
  console.error("[check:seo-ssr] FALHOU:");
  errors.forEach((e) => console.error(`  ✗ ${e}`));
  process.exit(1);
}
console.log("[check:seo-ssr] OK — schemas estruturais no SSR, sem duplicatas, robots/sitemap íntegros.");
