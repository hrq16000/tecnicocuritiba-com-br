import { test, expect } from "@playwright/test";
import { baseUrl } from "./utils/baseUrl";

const WIDTHS = [360, 390, 430, 1366, 1440];

/**
 * Regressão de responsividade da Rodada 3P:
 * - CTA principal de WhatsApp visível na primeira dobra (750px no mobile)
 * - Banner de cookies não cobre o CTA flutuante de WhatsApp
 * - Sumário/âncoras funcionam em /precos-e-politicas
 */
for (const width of WIDTHS) {
  test(`CTA principal na primeira dobra @${width}`, async ({ page }) => {
    await page.setViewportSize({ width, height: 800 });
    await page.goto(`${baseUrl}/`, { waitUntil: "domcontentloaded" });

    const cta = page
      .getByRole("button", { name: /whatsapp|chamar|falar|problema/i })
      .or(page.getByRole("link", { name: /whatsapp/i }))
      .first();

    await expect(cta).toBeVisible();
    const box = await cta.boundingBox();
    expect(box).not.toBeNull();
    const foldLimit = width < 1024 ? 750 : 900;
    expect(box!.y).toBeLessThan(foldLimit);
  });

  test(`Banner de cookies não cobre o CTA flutuante @${width}`, async ({ page }) => {
    await page.setViewportSize({ width, height: 800 });
    await page.goto(`${baseUrl}/`, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(1500);

    const banner = page.locator('[data-testid="consent-banner"], [role="dialog"][aria-label*="cookies" i]').first();
    if (!(await banner.count())) test.skip(true, "Banner de cookies não exibido nesta sessão");

    const float = page.locator('[data-cta-location="whatsapp-float"], a[href*="wa.me"]').last();
    if (!(await float.count())) return;

    const b = await banner.boundingBox();
    const f = await float.boundingBox();
    if (!b || !f) return;
    const overlapX = Math.min(b.x + b.width, f.x + f.width) - Math.max(b.x, f.x);
    const overlapY = Math.min(b.y + b.height, f.y + f.height) - Math.max(b.y, f.y);
    expect(overlapX <= 0 || overlapY <= 0).toBeTruthy();
  });
}

test.describe("Sumário navegável em /precos-e-politicas", () => {
  for (const width of [390, 1366]) {
    test(`âncoras do sumário resolvem @${width}`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(`${baseUrl}/precos-e-politicas`, { waitUntil: "domcontentloaded" });

      const anchors = page.locator('a[href^="#"]');
      const count = await anchors.count();
      expect(count).toBeGreaterThan(0);

      for (let i = 0; i < Math.min(count, 8); i++) {
        const href = await anchors.nth(i).getAttribute("href");
        if (!href || href === "#") continue;
        const id = href.slice(1);
        await expect(page.locator(`#${CSS.escape ? id : id}`).first()).toHaveCount(1);
      }
    });
  }
});
