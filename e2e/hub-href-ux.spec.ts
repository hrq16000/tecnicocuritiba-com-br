import { test, expect, devices } from "@playwright/test";

/**
 * UX do hub de serviços e do cluster de informática (mobile + desktop):
 *  - nenhum item pode "parecer clicável" sem destino real (href ausente/vazio/#)
 *  - links internos não podem apontar para href vazio
 */

const ROUTES = ["/servicos", "/tecnico-informatica-curitiba", "/guia-tecnico-informatica"];

const VIEWPORTS = [
  { name: "desktop", viewport: { width: 1280, height: 900 } },
  { name: "mobile", viewport: devices["Pixel 5"].viewport },
];

for (const { name, viewport } of VIEWPORTS) {
  test.describe(`hub UX — ${name}`, () => {
    test.use({ viewport });

    for (const route of ROUTES) {
      test(`${route} não tem itens clicáveis sem destino`, async ({ page }) => {
        const res = await page.goto(route, { waitUntil: "domcontentloaded" });
        expect(res?.status(), "status HTTP").toBeLessThan(400);
        await expect(page.locator("h1").first()).toBeVisible({ timeout: 15000 });

        // 1) âncoras sem href utilizável
        const badAnchors = await page.$$eval("a", (nodes) =>
          nodes
            .filter((a) => {
              const href = a.getAttribute("href");
              return href === null || href.trim() === "" || href.trim() === "#";
            })
            .map((a) => (a.textContent || "").trim().slice(0, 60)),
        );
        expect(badAnchors, `âncoras sem href em ${route}`).toEqual([]);

        // 2) elementos com aparência clicável (cursor-pointer) que não são
        //    link/botão nem têm handler acessível (role/tabindex)
        const fakeClickables = await page.$$eval("[class*='cursor-pointer']", (nodes) =>
          nodes
            .filter((el) => {
              if (el.closest("a,button,[role='button'],[role='link'],label,summary")) return false;
              if (el.hasAttribute("tabindex") || el.getAttribute("role")) return false;
              return true;
            })
            .map((el) => (el.textContent || "").trim().slice(0, 60)),
        );
        expect(fakeClickables, `elementos falsamente clicáveis em ${route}`).toEqual([]);
      });
    }
  });
}
