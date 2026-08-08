import { test, expect } from "@playwright/test";

/**
 * /anuncie e /publicidade redirecionam para a rota canônica /patrocinadores.
 * Valida canonical, og:url, og:image e twitter:image após o redirecionamento,
 * em mobile e desktop.
 */
const VIEWPORTS = [
  { name: "mobile", viewport: { width: 390, height: 844 } },
  { name: "desktop", viewport: { width: 1280, height: 900 } },
] as const;

const ENTRY_POINTS = ["/anuncie", "/publicidade"];

for (const { name, viewport } of VIEWPORTS) {
  test.describe(`redirect publicitário — ${name}`, () => {
    test.use({ viewport });

    for (const entry of ENTRY_POINTS) {
      test(`${entry} → /patrocinadores com metadados sociais válidos`, async ({ page, request }) => {
        await page.goto(entry, { waitUntil: "domcontentloaded" });
        await expect(page.locator("h1").first()).toBeVisible({ timeout: 15000 });
        await expect(page).toHaveURL(/\/patrocinadores$/);

        const canonical = await page.locator('link[rel="canonical"]').last().getAttribute("href");
        const ogUrl = await page.locator('meta[property="og:url"]').last().getAttribute("content");
        expect(canonical, "canonical ausente").toBeTruthy();
        expect(canonical!).toMatch(/\/patrocinadores$/);
        expect(ogUrl, "og:url ausente").toBeTruthy();
        expect(ogUrl!).toMatch(/\/patrocinadores$/);

        const og = await page.locator('meta[property="og:image"]').last().getAttribute("content");
        const tw = await page.locator('meta[name="twitter:image"]').last().getAttribute("content");
        expect(og).toMatch(/^https:\/\//);
        expect(tw).toMatch(/^https:\/\//);

        const res = await request.get(og!);
        expect(res.status(), `og:image ${og} não retornou 200`).toBeLessThan(400);
      });
    }
  });
}
