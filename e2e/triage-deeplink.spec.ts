import { test, expect } from "@playwright/test";

const BASE = process.env.E2E_BASE_URL ?? "http://localhost:8080";

/**
 * Deep links de triagem: #agendamento / #triagem abrem o popup do funil
 * imediatamente, com equipamento pré-selecionado quando presente no hash
 * (#agendamento-notebook), e o estado sobrevive a um reload
 * (localStorage wa_funnel_state_v6).
 */
test.describe("Triagem via deep link (#agendamento)", () => {
  test("abre o funil, persiste respostas e restaura após reload", async ({ page }) => {
    await page.goto(`${BASE}/#agendamento`, { waitUntil: "domcontentloaded" });

    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible({ timeout: 10000 });

    // Etapa 0: seleção de equipamento
    await dialog.getByRole("button", { name: /PC \/ Notebook/ }).first().click();

    // Estado persistido em localStorage (chave v6)
    const saved = await page.evaluate(() =>
      localStorage.getItem("wa_funnel_state_v6"),
    );
    expect(saved).toBeTruthy();
    expect(saved).toContain('"equipamento":"pc"');

    // Reload: o funil reabre sozinho, no passo em que o usuário parou (2/5)
    await page.reload({ waitUntil: "domcontentloaded" });
    const dialogAfter = page.getByRole("dialog");
    await expect(dialogAfter).toBeVisible({ timeout: 10000 });
    await expect(dialogAfter).toContainText(/Triagem — 2\/5/);

    // E o estado continua íntegro após o reload
    const savedAfter = await page.evaluate(() =>
      localStorage.getItem("wa_funnel_state_v6"),
    );
    expect(savedAfter).toContain('"equipamento":"pc"');
  });

  test("hash com equipamento (#agendamento-notebook) já entra na etapa de sintoma", async ({ page }) => {
    await page.goto(`${BASE}/#agendamento-notebook`, { waitUntil: "domcontentloaded" });

    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible({ timeout: 10000 });

    // Equipamento já respondido pelo link — funil avança direto para
    // marca/sintoma (etapa 2/5), sem exigir novo clique em "PC / Notebook".
    await expect(dialog).toContainText(/Triagem — 2\/5/);

    // Seleção persistida (sobrevive a reload)
    const saved = await page.evaluate(() =>
      localStorage.getItem("wa_funnel_state_v6"),
    );
    expect(saved).toBeTruthy();
    expect(saved).toContain('"equipamento":"pc"');
  });
});
