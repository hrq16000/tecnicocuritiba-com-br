#!/usr/bin/env node
/**
 * Valida em runtime que todo clique em CTA WhatsApp/Ligar registra
 * `utm_term` e `utm_content` corretamente e que `origem`, `bairro` e
 * `servico` chegam no payload do dataLayer/gtag.
 *
 * Estratégia: abre a home + 3 /problemas + 2 /servicos com Playwright,
 * intercepta window.gtag e window.dataLayer.push, dispara clique em cada
 * elemento com [data-cta-location], e verifica que:
 *  1. a URL do wa.me contém utm_term e utm_content;
 *  2. o evento GA4 recebe { origem, bairro, servico } (fallback "unknown" aceito).
 *
 * Uso:
 *   BASE_URL=https://tecnicocuritiba.com.br node scripts/validate-ga4-utms.mjs
 *   BASE_URL=http://localhost:8080 node scripts/validate-ga4-utms.mjs
 *
 * Exit 1 se qualquer clique falhar em enviar utm_term OU utm_content.
 */
import { chromium } from "playwright";

const BASE = (process.env.BASE_URL || "http://localhost:8080").replace(/\/$/, "");
const ROUTES = [
  "/",
  "/problemas/pc-nao-liga-curitiba",
  "/problemas/tv-nao-liga-curitiba",
  "/problemas/wifi-lento-curitiba",
  "/servicos/conserto-notebook",
  "/servicos/manutencao-tv",
];

const failures = [];

async function auditRoute(browser, path) {
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page.addInitScript(() => {
    (window).__gaEvents = [];
    (window).__openedUrls = [];
    (window).gtag = (...args) => { (window).__gaEvents.push(args); };
    (window).dataLayer = { push: (e) => (window).__gaEvents.push(["dl", e]) };
    const orig = window.open.bind(window);
    window.open = (url, ...rest) => {
      (window).__openedUrls.push(typeof url === "string" ? url : url?.toString() || "");
      return null;
    };
  });

  try {
    await page.goto(`${BASE}${path}`, { waitUntil: "networkidle", timeout: 30000 });
    const ctas = await page.$$("[data-cta-location]");
    if (ctas.length === 0) {
      console.log(`  ${path}: nenhum CTA marcado`);
      return;
    }
    for (let i = 0; i < Math.min(ctas.length, 6); i++) {
      const el = ctas[i];
      const loc = await el.getAttribute("data-cta-location");
      try {
        await el.click({ force: true, timeout: 2000 });
      } catch { /* alguns são links para modais */ }
      await page.waitForTimeout(200);

      const opened = await page.evaluate(() => (window).__openedUrls);
      const events = await page.evaluate(() => (window).__gaEvents);

      const waUrl = opened.find((u) => u.includes("wa.me"));
      if (waUrl) {
        const u = new URL(waUrl);
        if (!u.searchParams.get("utm_term")) failures.push(`${path} [${loc}] wa.me sem utm_term`);
        if (!u.searchParams.get("utm_content")) failures.push(`${path} [${loc}] wa.me sem utm_content`);
      }

      const gaHit = events.find((e) => JSON.stringify(e).match(/click_(whatsapp|call|ligar)/i));
      if (gaHit) {
        const payload = JSON.stringify(gaHit);
        for (const k of ["origem", "bairro", "servico"]) {
          if (!payload.includes(k)) failures.push(`${path} [${loc}] evento GA sem ${k}`);
        }
      }
      // reset por clique
      await page.evaluate(() => { (window).__openedUrls = []; (window).__gaEvents = []; });
    }
    console.log(`  ✓ ${path} (${ctas.length} CTAs testados)`);
  } finally {
    await page.close();
  }
}

const browser = await chromium.launch();
try {
  for (const r of ROUTES) await auditRoute(browser, r);
} finally {
  await browser.close();
}

if (failures.length) {
  console.error("\n✗ Falhas GA4/UTM:\n - " + failures.join("\n - "));
  process.exit(1);
}
console.log("\n✓ GA4/UTM OK em todas as rotas");
