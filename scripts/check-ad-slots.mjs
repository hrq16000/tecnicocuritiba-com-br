#!/usr/bin/env node
/**
 * Gate de CI: espaços patrocinados (AdSlot).
 *
 * Valida, contra o preview local, que cada slot de anúncio:
 *  1. exibe o disclosure "Publicidade";
 *  2. NÃO fica acima da dobra em mobile (360x750) — não disputa o LCP;
 *  3. não usa <script> ou <iframe> de terceiros dentro do slot;
 *  4. links externos usam rel="sponsored nofollow";
 *  5. não altera canonical nem meta robots da rota.
 *
 * Uso: node scripts/check-ad-slots.mjs [baseUrl]
 */
import { chromium } from "@playwright/test";

const BASE = process.argv[2] || process.env.BASE_URL || "http://localhost:4173";
const ROUTES = ["/", "/problemas/notebook-nao-liga-curitiba"];
const FOLD_PX = 750;

const errors = [];
const warn = (msg) => console.log(`  ! ${msg}`);

const run = async () => {
  const browser = await chromium.launch(
    process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {},
  );
  const page = await browser.newPage({ viewport: { width: 360, height: FOLD_PX } });

  for (const route of ROUTES) {
    const url = `${BASE}${route}`;
    const res = await page.goto(url, { waitUntil: "networkidle" });
    if (!res || res.status() >= 400) {
      errors.push(`${route}: status ${res ? res.status() : "sem resposta"}`);
      continue;
    }
    // Rola até o fim para montar seções lazy.
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(900);

    const canonical = await page.getAttribute('link[rel="canonical"]', "href");
    const robots = await page.getAttribute('meta[name="robots"]', "content");
    if (!canonical) errors.push(`${route}: canonical ausente`);
    if (robots && /noindex/i.test(robots)) errors.push(`${route}: meta robots noindex inesperado`);

    const slots = await page.$$("[data-ad-slot]");
    if (slots.length === 0) {
      warn(`${route}: nenhum slot patrocinado renderizado`);
      continue;
    }

    for (const slot of slots) {
      const name = await slot.getAttribute("data-ad-slot");
      const box = await slot.boundingBox();
      if (box && box.y < FOLD_PX) {
        errors.push(`${route} [${name}]: slot acima da dobra (y=${Math.round(box.y)}px < ${FOLD_PX}px)`);
      }
      const info = await slot.evaluate((el) => ({
        creatives: el.querySelectorAll("[data-ad-creative]").length,
        disclosures: [...el.querySelectorAll("[data-ad-disclosure]")].map((d) => d.textContent.trim()),
        thirdParty: el.querySelectorAll("script,iframe,embed,object").length,
        links: [...el.querySelectorAll("a[href]")].map((a) => ({
          href: a.getAttribute("href"),
          rel: a.getAttribute("rel") || "",
          external: /^https?:/i.test(a.getAttribute("href") || "") && !a.href.startsWith(location.origin),
        })),
      }));

      if (info.disclosures.length !== info.creatives) {
        errors.push(`${route} [${name}]: ${info.creatives} criativos e ${info.disclosures.length} disclosures`);
      }
      for (const text of info.disclosures) {
        if (!/publicidade/i.test(text)) errors.push(`${route} [${name}]: disclosure inválido ("${text}")`);
      }
      if (info.thirdParty > 0) {
        errors.push(`${route} [${name}]: ${info.thirdParty} recurso(s) de terceiros dentro do slot (risco de LCP/CLS)`);
      }
      for (const link of info.links) {
        if (link.external && !/sponsored/i.test(link.rel)) {
          errors.push(`${route} [${name}]: link externo sem rel="sponsored" (${link.href})`);
        }
        if (link.external && !/nofollow/i.test(link.rel)) {
          errors.push(`${route} [${name}]: link externo sem rel="nofollow" (${link.href})`);
        }
      }
      console.log(`  ✓ ${route} [${name}] ${info.creatives} criativo(s), disclosure OK`);
    }
  }

  await browser.close();

  if (errors.length) {
    console.error(`\n✗ check:ad-slots falhou (${errors.length}):`);
    errors.forEach((e) => console.error(`  - ${e}`));
    process.exit(1);
  }
  console.log("\n✓ check:ad-slots OK");
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
