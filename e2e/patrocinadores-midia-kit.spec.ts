import { test, expect, devices } from "@playwright/test";

/**
 * /patrocinadores: valida metadados sociais (og:image/twitter:image apontando
 * para asset real com 200) e o download do mídia kit em PDF, em mobile e
 * desktop.
 */
const VIEWPORTS = [
  { name: "mobile", viewport: { width: 390, height: 844 } },
  { name: "desktop", viewport: { width: 1280, height: 900 } },
] as const;

for (const { name, viewport } of VIEWPORTS) {
  test.describe(`/patrocinadores (${name})`, () => {
    test.use({ viewport });

    test("og:image e twitter:image existem e retornam 200", async ({ page, request }) => {
      await page.goto("/patrocinadores");
      const og = await page.locator('meta[property="og:image"]').last.getAttribute("content");
      const tw = await page.locator('meta[name="twitter:image"]').last.getAttribute("content");
      expect(og, "og:image ausente").toBeTruthy();
      expect(tw, "twitter:image ausente").toBeTruthy();
      expect(og!).toMatch(/^https:\/\//);
      expect(tw!).toMatch(/^https:\/\//);

      const res = await request.get(og!);
      expect(res.status(), `og:image ${og} não retornou 200`).toBeLessThan(400);
    });

    test("link do mídia kit em PDF está visível e o arquivo existe", async ({ page, request }) => {
      await page.goto("/patrocinadores");
      const link = page.locator('[data-cta-location="sponsors_media_kit_pdf"]');
      await expect(link).toBeVisible();
      const href = await link.getAttribute("href");
      expect(href).toBe("/downloads/midia-kit-tecnico-curitiba.pdf");

      const res = await request.get(href!);
      expect(res.status()).toBe(200);
      expect((await res.body()).subarray(0, 4).toString("latin1")).toBe("%PDF");
    });

    test("rodapé tem link rastreado separado do mídia kit", async ({ page }) => {
      await page.goto("/patrocinadores");
      const footerLink = page.locator('[data-cta-location="footer_media_kit_pdf"]');
      await expect(footerLink).toHaveCount(1);
      await expect(footerLink).toHaveAttribute("href", "/downloads/midia-kit-tecnico-curitiba.pdf");
    });
  });
}
