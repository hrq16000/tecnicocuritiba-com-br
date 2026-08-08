import { test, expect, devices } from "@playwright/test";

/**
 * Valida que /areas-atendidas carrega e que os links internos de cidades e
 * bairros nao retornam 404, em desktop e mobile.
 */

const VIEWPORTS = [
  { name: "desktop", viewport: { width: 1280, height: 900 } },
  { name: "mobile", viewport: devices["Pixel 5"].viewport },
];

for (const { name, viewport } of VIEWPORTS) {
  test.describe(`/areas-atendidas — ${name}`, () => {
    test.use({ viewport });

    test("carrega com H1 e links internos sem 404", async ({ page, request, baseURL }) => {
      const response = await page.goto("/areas-atendidas", { waitUntil: "domcontentloaded" });
      expect(response?.status(), "status HTTP da pagina").toBeLessThan(400);

      // aguarda hidratacao do SPA antes de coletar os links
      await expect(page.locator("h1").first()).toBeVisible({ timeout: 15000 });
      await expect(page.locator("h1")).toHaveCount(1);

      const hrefs = await page
        .locator('a[href^="/atendimento"], a[href^="/tecnico-informatica"], a[href^="/servicos/"]')
        .evaluateAll((els) =>
          Array.from(new Set(els.map((el) => (el as HTMLAnchorElement).getAttribute("href") || ""))).filter(Boolean),
        );

      expect(hrefs.length, "links internos de cidade/bairro encontrados").toBeGreaterThan(0);

      const sample = hrefs.slice(0, 25);
      const broken: string[] = [];

      for (const href of sample) {
        const url = new URL(href, baseURL ?? "http://localhost:8080").toString();
        const res = await request.get(url);
        if (res.status() >= 400) broken.push(`${href} → ${res.status()}`);
      }

      expect(broken, `links quebrados em ${name}`).toEqual([]);
    });
  });
}
