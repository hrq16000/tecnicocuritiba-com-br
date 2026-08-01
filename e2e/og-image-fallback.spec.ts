import { test, expect, type Page } from "@playwright/test";

/**
 * og:image precisa ser absoluto (https), responder 200 e manter dimensões
 * declaradas — tanto no desktop quanto no mobile.
 */

const ROUTES = [
  "/",
  "/servicos",
  "/servicos/redes-wifi",
  "/atendimento",
  "/atendimento/curitiba",
  "/atendimento/curitiba/batel",
  "/suporte-empresas",
  "/gestor-responsavel",
  "/faq",
];

const metaContent = (page: Page, sel: string) =>
  page.locator(sel).first().getAttribute("content").catch(() => null);

for (const viewport of [
  { name: "mobile", width: 390, height: 844 },
  { name: "desktop", width: 1280, height: 900 },
]) {
  test(`og:image absoluto e válido em todas as rotas (${viewport.name})`, async ({ page, request }) => {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    const checked = new Set<string>();

    for (const route of ROUTES) {
      await page.goto(route);
      await page.waitForLoadState("networkidle");
      await page.waitForTimeout(400);

      const og = await metaContent(page, 'meta[property="og:image"]');
      expect(og, `og:image ausente em ${route}`).toBeTruthy();
      expect(og!, `og:image não absoluto em ${route}`).toMatch(/^https:\/\//);

      const tw = await metaContent(page, 'meta[name="twitter:image"]');
      expect(tw, `twitter:image ausente em ${route}`).toBeTruthy();
      expect(tw!).toMatch(/^https:\/\//);

      const w = await metaContent(page, 'meta[property="og:image:width"]');
      const h = await metaContent(page, 'meta[property="og:image:height"]');
      expect(w, `og:image:width ausente em ${route}`).toBe("1200");
      expect(h, `og:image:height ausente em ${route}`).toBe("630");

      // Exatamente um og:image e um twitter:card por rota.
      expect(await page.locator('meta[property="og:image"]').count(), `og:image duplicado em ${route}`).toBe(1);
      expect(await page.locator('meta[name="twitter:card"]').count()).toBe(1);

      // Fetch único por URL de imagem (cache local do teste).
      const bare = og!.split("?")[0];
      if (!checked.has(bare)) {
        checked.add(bare);
        const res = await request.get(og!);
        expect(res.status(), `og:image ${og} respondeu ${res.status()}`).toBeLessThan(400);
        const type = res.headers()["content-type"] || "";
        expect(type, `og:image não é imagem (${type})`).toMatch(/^image\//);
      }
    }
  });
}
