#!/usr/bin/env node
/**
 * CI gate: validates JSON-LD on /assistencia-tecnica-curitiba.
 *
 * Boots Vite preview, opens the route with Playwright, and asserts that
 * BreadcrumbList, LocalBusiness, FAQPage, and Service schemas are present
 * and shaped correctly. Exits non-zero on any failure.
 *
 * Usage:
 *   node scripts/validate-jsonld.mjs              # builds + serves locally
 *   BASE_URL=https://tecnicocuritiba.com.br \
 *     node scripts/validate-jsonld.mjs            # validates a live URL
 */
import { spawn } from "node:child_process";
import { setTimeout as sleep } from "node:timers/promises";
import { chromium } from "playwright";

// Rotas auditadas dinamicamente: home + hub + todas as rotas de /bairros e /servicos
// derivadas do sitemap-main.xml + sitemap-bairros.xml + sitemap-servicos.xml. Um sample
// completo (opt-in via FULL=1) audita 100% das rotas de bairro/serviço; padrão audita
// primeiras N (default 12) para manter CI barato.
import fs from "node:fs";
import path from "node:path";

function readSitemap(file) {
  const p = path.resolve(file);
  if (!fs.existsSync(p)) return [];
  const xml = fs.readFileSync(p, "utf8");
  const matches = [...xml.matchAll(/<loc>https:\/\/tecnicocuritiba\.com\.br(\/[^<]*)<\/loc>/g)];
  return matches.map((m) => m[1]);
}

const FULL = process.env.FULL === "1";
const SAMPLE = Number(process.env.SAMPLE || 12);
const bairros = readSitemap("public/sitemap-bairros.xml").filter((p) => p.startsWith("/bairros/"));
const servicos = readSitemap("public/sitemap-servicos.xml").filter((p) => p.startsWith("/servicos/"));

const pick = (arr) => (FULL ? arr : arr.slice(0, SAMPLE));

const ROUTES = [
  { path: "/", required: ["LocalBusiness", "WebSite"] },
  { path: "/suporte-empresas", required: ["LocalBusiness", "WebSite", "BreadcrumbList", "FAQPage", "Service"] },
  { path: "/assistencia-tecnica-curitiba", required: ["BreadcrumbList", "LocalBusiness", "FAQPage", "Service", "WebSite"] },
  ...pick(bairros).map((p) => ({ path: p, required: ["LocalBusiness", "WebSite", "BreadcrumbList"] })),
  ...pick(servicos).map((p) => ({ path: p, required: ["LocalBusiness", "WebSite", "Service"] })),
];
const REQUIRED = ["BreadcrumbList", "LocalBusiness", "FAQPage", "Service"];


async function waitForServer(url, timeoutMs = 30_000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url);
      if (res.ok) return;
    } catch {
      /* not ready */
    }
    await sleep(500);
  }
  throw new Error(`Server not ready at ${url}`);
}

async function auditRoute(browser, url, required) {
  const errors = [];
  const page = await browser.newPage();
  try {
    await page.goto(url, { waitUntil: "networkidle" });
    // Seções lazy injetam schemas ao entrar no viewport: rola até o fim antes de coletar.
    for (let i = 0; i < 2; i++) {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(1200);
    }
    const raw = await page.$$eval('script[type="application/ld+json"]', (nodes) =>
      nodes
        .map((n) => {
          try {
            return JSON.parse(n.textContent || "null");
          } catch (e) {
            return { __parseError: String(e) };
          }
        })
        .filter(Boolean),
    );

    // Achata @graph e arrays para que hasType enxergue nós aninhados.
    const schemas = raw.flatMap((s) => {
      const arr = Array.isArray(s) ? s : [s];
      return arr.flatMap((n) => (Array.isArray(n?.["@graph"]) ? [n, ...n["@graph"]] : [n]));
    });

    for (const s of schemas) {
      if (s.__parseError) errors.push(`JSON parse error: ${s.__parseError}`);
    }

    const hasType = (t) =>
      schemas.find((s) => {
        const ty = s["@type"];
        return Array.isArray(ty) ? ty.includes(t) : ty === t;
      });

    for (const t of required) {
      if (!hasType(t)) errors.push(`Missing required @type: ${t}`);
    }

    const lb = hasType("LocalBusiness");
    if (lb) {
      if (!lb.name) errors.push("LocalBusiness.name is missing");
      if (!lb.telephone) errors.push("LocalBusiness.telephone is missing");
      if (lb.address) errors.push("LocalBusiness must NOT include a postal address");
      const area = JSON.stringify(lb.areaServed || "").toLowerCase();
      if (!area.includes("curitiba")) errors.push("LocalBusiness.areaServed must include Curitiba");
    }

    const ws = hasType("WebSite");
    if (ws && required.includes("WebSite")) {
      if (!ws.url) errors.push("WebSite.url is missing");
      if (!ws.potentialAction) errors.push("WebSite.potentialAction (SearchAction) is missing");
    }

    if (required.includes("FAQPage")) {
      const faq = hasType("FAQPage");
      if (faq) {
        const m = faq.mainEntity || [];
        if (!Array.isArray(m) || m.length < 3)
          errors.push(`FAQPage.mainEntity must have >=3 questions (got ${m.length})`);
      }
    }

    if (required.includes("BreadcrumbList")) {
      const bc = hasType("BreadcrumbList");
      if (bc) {
        const items = bc.itemListElement;
        if (!Array.isArray(items) || items.length < 2)
          errors.push("BreadcrumbList.itemListElement must have >=2 entries");
      }
    }
  } finally {
    await page.close();
  }
  return errors;
}

async function main() {
  const baseUrl = process.env.BASE_URL;
  let preview;
  let base;

  if (baseUrl) {
    base = baseUrl.replace(/\/$/, "");
  } else {
    preview = spawn("npx", ["vite", "preview", "--port", "4173", "--strictPort"], {
      stdio: "inherit",
      env: process.env,
    });
    await waitForServer("http://localhost:4173/");
    base = "http://localhost:4173";
  }

  const browser = await chromium.launch();
  const allErrors = [];
  try {
    for (const { path, required } of ROUTES) {
      const errs = await auditRoute(browser, `${base}${path}`, required);
      if (errs.length) {
        allErrors.push(`\n✗ ${path}:\n  - ${errs.join("\n  - ")}`);
      } else {
        console.log(`✓ ${path} (${required.join(", ")})`);
      }
    }
  } finally {
    await browser.close();
    if (preview) preview.kill("SIGTERM");
  }

  if (allErrors.length) {
    console.error("\nJSON-LD validation FAILED:" + allErrors.join(""));
    process.exit(1);
  }
  console.log(`\n✓ JSON-LD validation passed for ${ROUTES.length} routes`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
