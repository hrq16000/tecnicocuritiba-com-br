import { test, expect } from "@playwright/test";

/**
 * Gate de navegação interna das páginas empresariais:
 * - cada âncora do sumário aponta para um bloco existente na página;
 * - nenhum link interno da página responde com redirect inesperado;
 * - o CTA empresarial permanece acima da dobra em 360/390/430.
 */
const BASE = process.env.E2E_BASE_URL || "http://localhost:8080";

const PAGES = [
  "/suporte-empresas",
  "/servicos/redes-wifi",
  "/servicos/backup-recuperacao",
];

for (const route of PAGES) {
  test(`âncoras do sumário resolvem em ${route}`, async ({ page }) => {
    await page.goto(`${BASE}${route}`, { waitUntil: "networkidle" });

    const hashes = await page.evaluate(() =>
      Array.from(document.querySelectorAll('a[href^="#"]'))
        .map((a) => (a as HTMLAnchorElement).getAttribute("href") || "")
        .filter((h) => h.length > 1),
    );
    expect(hashes.length).toBeGreaterThan(0);

    const missing: string[] = [];
    for (const h of hashes) {
      const id = decodeURIComponent(h.slice(1));
      if ((await page.locator(`#${CSS.escape(id)}`).count()) === 0) missing.push(h);
    }
    expect(missing, `Âncoras sem destino em ${route}`).toEqual([]);
  });

  test(`links internos sem redirect inesperado em ${route}`, async ({ page, request }) => {
    await page.goto(`${BASE}${route}`, { waitUntil: "networkidle" });
    const links: string[] = await page.evaluate(() =>
      Array.from(new Set(
        Array.from(document.querySelectorAll("a[href^='/']"))
          .map((a) => (a as HTMLAnchorElement).getAttribute("href") || "")
          .filter((h) => h && !h.startsWith("//")),
      )).slice(0, 25),
    );
    for (const href of links) {
      const res = await request.get(`${BASE}${href}`, { maxRedirects: 0 });
      expect([200, 304], `${href} respondeu ${res.status()}`).toContain(res.status());
    }
  });

  for (const width of [360, 390, 430]) {
    test(`CTA empresarial acima da dobra (${width}px) em ${route}`, async ({ page }) => {
      await page.setViewportSize({ width, height: 844 });
      await page.goto(`${BASE}${route}`, { waitUntil: "networkidle" });

      const cta = page.locator("a[data-cta-location]").first();
      const box = await cta.boundingBox();
      expect(box, "CTA não encontrado").not.toBeNull();
      expect(box!.y).toBeLessThan(750);

      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      expect(overflow, "overflow horizontal").toBeLessThanOrEqual(1);
    });
  }
}
