import { test, expect } from "@playwright/test";

/**
 * Gate LGPD do /status-os: a consulta só pode ser disparada após o aceite
 * explícito. Roda em desktop e mobile para travar regressão do bloqueio.
 */
const BASE = process.env.E2E_BASE_URL || "http://localhost:8080";

const viewports = [
  { name: "mobile", width: 390, height: 844 },
  { name: "desktop", width: 1280, height: 900 },
];

for (const vp of viewports) {
  test(`status-os: consentimento LGPD bloqueia e libera a consulta (${vp.name})`, async ({ page }) => {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.goto(`${BASE}/status-os`, { waitUntil: "domcontentloaded" });

    const consent = page.getByRole("checkbox").first();
    await expect(consent).toBeVisible();
    await expect(consent).not.toBeChecked();

    const submit = page.getByRole("button", { name: /consultar|buscar/i }).first();
    await expect(submit).toBeDisabled();

    // aceite libera o botão
    await consent.check();
    await expect(submit).toBeEnabled();

    // descarte da sessão volta ao estado bloqueado
    const descartar = page.getByRole("button", { name: /descartar dados desta sess/i });
    if (await descartar.count()) {
      await descartar.first().click();
      await expect(page.getByRole("checkbox").first()).not.toBeChecked();
      await expect(page.getByRole("button", { name: /consultar|buscar/i }).first()).toBeDisabled();
    }
  });
}

test("status-os: dados sensíveis não aparecem antes da consulta", async ({ page }) => {
  await page.goto(`${BASE}/status-os`, { waitUntil: "domcontentloaded" });
  await expect(page.getByRole("button", { name: /exibir sintomas e fotos/i })).toHaveCount(0);
  await expect(page.getByRole("button", { name: /baixar comprovante em pdf/i })).toHaveCount(0);
});
