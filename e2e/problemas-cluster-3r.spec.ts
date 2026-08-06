import { test, expect } from "@playwright/test";

/**
 * Rodada 3R — governança do cluster /problemas/*.
 * Página curada: notebook-nao-liga. Página de regressão: computador-lento.
 */
const BASE = process.env.E2E_BASE_URL || "http://localhost:8080";
const CURADA = "/problemas/notebook-nao-liga-curitiba";
const REGRESSAO = "/problemas/computador-lento-curitiba";

test("notebook não liga: CTA acima da dobra e blocos de segurança", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${BASE}${CURADA}`, { waitUntil: "domcontentloaded" });

  const cta = page.locator("[data-cta-location$='_hero']").first();
  const box = await cta.boundingBox();
  expect(box, "CTA do hero deve existir").not.toBeNull();
  expect(box!.y).toBeLessThan(750);

  await expect(page.locator("#risco-imediato")).toBeVisible();
  await expect(page.locator("#nao-liga-ou-sem-imagem")).toHaveCount(1);
  await expect(page.locator("#observar-antes")).toHaveCount(1);
  await expect(page.getByText(/Quando não insistir em ligar/i).first()).toBeVisible();

  // Nenhuma orientação invasiva
  const body = (await page.locator("main, body").first().innerText()).toLowerCase();
  for (const proibido of ["reflow", "secador", "freezer", "remova a bateria interna"]) {
    expect(body).not.toContain(proibido);
  }
});

test("cluster de sintomas: JSON-LD sem Offer/Product e breadcrumb de Problemas", async ({ page }) => {
  for (const route of [CURADA, REGRESSAO]) {
    await page.goto(`${BASE}${route}`, { waitUntil: "domcontentloaded" });
    const ld = (
      await page.locator('script[type="application/ld+json"]').allTextContents()
    ).join(" ");
    expect(ld).not.toContain('"Offer"');
    expect(ld).not.toContain('"Product"');
    expect(ld).toContain("BreadcrumbList");
    await expect(page.getByRole("navigation", { name: /nesta página/i })).toHaveCount(1);
    await expect(page.getByText("Problemas comuns").first()).toBeVisible();
  }
});

test("computador lento: não recebe blocos exclusivos da página curada", async ({ page }) => {
  await page.goto(`${BASE}${REGRESSAO}`, { waitUntil: "domcontentloaded" });
  await expect(page.locator("#risco-imediato")).toHaveCount(0);
  await expect(page.locator("#nao-liga-ou-sem-imagem")).toHaveCount(0);
});
