import { test, expect } from "@playwright/test";

/**
 * Checklist de meta social: og:image absoluto + Twitter Card completo,
 * com exatamente UMA tag twitter:card por rota.
 */

const ROUTES = [
  "/",
  "/servicos",
  "/sobre",
  "/faq",
  "/contato",
  "/como-funciona",
  "/suporte-empresas",
  "/atendimento",
  "/atendimento/curitiba",
  "/gestor-responsavel",
  "/atendimento-domicilio",
  "/atendimento-remoto",
  "/coleta-e-entrega",
];

for (const route of ROUTES) {
  test(`meta social consistente em ${route}`, async ({ page }) => {
    await page.goto(route);
    await page.waitForLoadState("networkidle");

    const cards = page.locator('meta[name="twitter:card"]');
    await expect(cards, `exatamente 1 twitter:card em ${route}`).toHaveCount(1);
    await expect(cards).toHaveAttribute("content", "summary_large_image");

    for (const name of ["twitter:title", "twitter:description", "twitter:image"]) {
      const el = page.locator(`meta[name="${name}"]`);
      await expect(el, `${name} ausente em ${route}`).toHaveCount(1);
      const content = await el.getAttribute("content");
      expect(String(content).trim().length, `${name} vazio em ${route}`).toBeGreaterThan(0);
    }

    const ogImage = page.locator('meta[property="og:image"]').first();
    await expect(ogImage).toHaveCount(1);
    const ogUrl = await ogImage.getAttribute("content");
    expect(ogUrl, `og:image deve ser absoluto https em ${route}`).toMatch(/^https:\/\//);

    // A imagem final precisa responder 200.
    const res = await page.request.get(ogUrl!.split("?")[0]);
    expect(res.status(), `og:image inacessível em ${route} (${ogUrl})`).toBeLessThan(400);

    // Dimensões declaradas.
    const w = await page.locator('meta[property="og:image:width"]').first().getAttribute("content");
    const h = await page.locator('meta[property="og:image:height"]').first().getAttribute("content");
    expect(Number(w)).toBeGreaterThanOrEqual(600);
    expect(Number(h)).toBeGreaterThanOrEqual(315);

    // twitter:image deve apontar para a mesma imagem do og:image.
    const twImage = await page.locator('meta[name="twitter:image"]').getAttribute("content");
    expect(twImage).toBe(ogUrl);
  });
}
