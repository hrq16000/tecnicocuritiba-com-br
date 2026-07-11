import { test, expect } from "@playwright/test";

const BASE = process.env.SMOKE_URL || "http://localhost:8080";

test.describe("Funil obrigatório: dedup de aberturas simultâneas", () => {
  test("cliques rápidos em CTAs não abrem 2 quizzes ao mesmo tempo", async ({ page }) => {
    await page.goto(`${BASE}/`, { waitUntil: "domcontentloaded" });
    await page.waitForLoadState("networkidle").catch(() => { /* tolerante */ });

    // Encontra o primeiro CTA de WhatsApp visível
    const ctas = page.locator("a[href*='wa.me'], [data-wa-funnel], [data-cta-location]");
    await expect(ctas.first()).toBeVisible({ timeout: 10_000 });

    const target = ctas.first();

    // Dispara 5 cliques em sequência muito rápida
    for (let i = 0; i < 5; i++) {
      await target.click({ force: true, noWaitAfter: true }).catch(() => { /* noop */ });
    }

    // Aguarda o dialog abrir e valida que existe apenas 1
    await page.waitForTimeout(400);
    const dialogs = page.locator("[role='dialog']");
    const count = await dialogs.count();
    expect(count, `Esperado 1 dialog, encontrado ${count}`).toBeLessThanOrEqual(1);
  });

  test("clique duplo em CTAs diferentes ainda mostra apenas 1 dialog", async ({ page }) => {
    await page.goto(`${BASE}/`, { waitUntil: "domcontentloaded" });
    await page.waitForLoadState("networkidle").catch(() => { /* tolerante */ });

    const ctas = page.locator("a[href*='wa.me'], [data-wa-funnel]");
    const n = await ctas.count();
    if (n < 2) test.skip(true, "Menos de 2 CTAs disponíveis");

    await ctas.nth(0).click({ force: true, noWaitAfter: true }).catch(() => { /* noop */ });
    await ctas.nth(1).click({ force: true, noWaitAfter: true }).catch(() => { /* noop */ });

    await page.waitForTimeout(400);
    const dialogs = page.locator("[role='dialog']");
    expect(await dialogs.count()).toBeLessThanOrEqual(1);
  });
});
