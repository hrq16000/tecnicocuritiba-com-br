#!/usr/bin/env node
/**
 * Audita JSON-LD de /obrigado (todas as modalidades) e amostra de /problemas/*.
 * Regras:
 *  - FAQPage presente, com >=3 questões, sem duplicidades de `name`.
 *  - LocalBusiness presente, único por página (sem duplicatas com mesmo @id),
 *    com telephone e areaServed contendo "Curitiba".
 *  - Nenhum tipo (FAQPage/LocalBusiness) duplicado por página.
 *
 * Uso:
 *   node scripts/audit-jsonld-obrigado-problemas.mjs             # local (:4173)
 *   BASE_URL=https://tecnicocuritiba.com.br node scripts/audit-jsonld-obrigado-problemas.mjs
 */
import { spawn } from "node:child_process";
import { setTimeout as sleep } from "node:timers/promises";
import { readdirSync } from "node:fs";
import { chromium } from "playwright";

const BASE_URL = process.env.BASE_URL?.replace(/\/$/, "");
const SAMPLE = Number(process.env.SAMPLE || 12);

const problemas = readdirSync("src/lib/problemas")
  .filter((f) => f.endsWith(".ts") && !f.startsWith("index") && !f.startsWith("types"))
  .map((f) => f.replace(/\.ts$/, ""))
  .slice(0, SAMPLE);

const OBRIGADO_MODALIDADES = ["remoto", "visita", "coleta", "invalida"];

async function extract(page, url) {
  await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });
  return page.$$eval('script[type="application/ld+json"]', (nodes) =>
    nodes.flatMap((n) => {
      try {
        const parsed = JSON.parse(n.textContent || "null");
        const arr = Array.isArray(parsed) ? parsed : parsed?.["@graph"] || [parsed];
        return arr.filter(Boolean);
      } catch { return []; }
    }),
  );
}

function typesOf(node) {
  const t = node?.["@type"];
  return Array.isArray(t) ? t : t ? [t] : [];
}

function audit(url, schemas) {
  const errs = [];
  const faqs = schemas.filter((s) => typesOf(s).includes("FAQPage"));
  const lbs = schemas.filter((s) => typesOf(s).some((t) => t === "LocalBusiness" || t === "ComputerRepairService"));

  // /obrigado?modalidade=invalida não precisa manter FAQPage estruturado
  const wantsFaq = !url.includes("modalidade=invalida");

  if (wantsFaq) {
    if (faqs.length === 0) errs.push("FAQPage ausente");
    if (faqs.length > 1) errs.push(`FAQPage duplicado (${faqs.length}x)`);
    for (const faq of faqs) {
      const main = faq.mainEntity || [];
      if (!Array.isArray(main) || main.length < 3) errs.push(`FAQPage.mainEntity <3 (${main.length})`);
      const names = main.map((q) => q?.name).filter(Boolean);
      const dupNames = names.filter((n, i) => names.indexOf(n) !== i);
      if (dupNames.length) errs.push(`FAQPage duplicated questions: ${[...new Set(dupNames)].join(" | ")}`);
    }
  }

  if (lbs.length === 0) errs.push("LocalBusiness ausente");
  const ids = lbs.map((l) => l["@id"]).filter(Boolean);
  const dupIds = ids.filter((n, i) => ids.indexOf(n) !== i);
  if (dupIds.length) errs.push(`LocalBusiness @id duplicado: ${dupIds.join(", ")}`);
  for (const lb of lbs) {
    if (!lb.telephone) errs.push("LocalBusiness.telephone ausente");
    const area = JSON.stringify(lb.areaServed || "").toLowerCase();
    if (!area.includes("curitiba")) errs.push("LocalBusiness.areaServed sem Curitiba");
  }
  return errs;
}

async function waitForServer(url, timeoutMs = 30000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try { const r = await fetch(url); if (r.ok) return; } catch { /* not ready */ }
    await sleep(500);
  }
  throw new Error(`server not ready: ${url}`);
}

let preview;
let base = BASE_URL;
if (!base) {
  preview = spawn("npx", ["vite", "preview", "--port", "4173", "--strictPort"], { stdio: "inherit", env: process.env });
  await waitForServer("http://localhost:4173/");
  base = "http://localhost:4173";
}

const browser = await chromium.launch();
const page = await browser.newPage();
const allErrors = [];

try {
  // /obrigado por modalidade
  for (const m of OBRIGADO_MODALIDADES) {
    const url = `${base}/obrigado?modalidade=${m}&equipamento=pc`;
    const schemas = await extract(page, url);
    const errs = audit(url, schemas);
    if (errs.length) allErrors.push(`\n✗ /obrigado?modalidade=${m}\n  - ${errs.join("\n  - ")}`);
    else console.log(`✓ /obrigado?modalidade=${m}`);
  }
  // /problemas/* amostra
  for (const slug of problemas) {
    const url = `${base}/problemas/${slug}`;
    const schemas = await extract(page, url);
    const errs = audit(url, schemas);
    if (errs.length) allErrors.push(`\n✗ /problemas/${slug}\n  - ${errs.join("\n  - ")}`);
    else console.log(`✓ /problemas/${slug}`);
  }
} finally {
  await browser.close();
  if (preview) preview.kill("SIGTERM");
}

if (allErrors.length) {
  console.error("\nJSON-LD audit FALHOU:" + allErrors.join(""));
  process.exit(1);
}
console.log(`\n✓ Audit JSON-LD OK (${OBRIGADO_MODALIDADES.length} /obrigado + ${problemas.length} /problemas/*)`);
