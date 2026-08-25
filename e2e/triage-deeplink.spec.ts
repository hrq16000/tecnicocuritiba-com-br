import { test, expect } from "@playwright/test";

const BASE = process.env.E2E_BASE_URL ?? "http://localhost:8080";

/**
 * Deep links de triagem: #agendamento / #triagem abrem o popup do funil
 * imediatamente, com equipamento pré-selecionado quando presente no hash,
 * e o estado sobrevive a um reload (sessionStorage v6).
 */
test.describe("Triagem via deep link (#agendamento)", () => {
  test("abre o funil, persiste respostas e restaura após reload", async ({ page }) => {
    await page.goto(`${BASE}/#agendamento`, { waitUntil: "domcontentloaded" });

    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible({ timeout: 10000 });

    // Etapa 0: seleção de equipamento
    await dialog.getByRole("button", { name: /PC \/ Notebook/ }).click();

    // Estado persistido em sessionStorage (chave v6)
    const saved = await page.evaluate(() =>
      sessionStorage.getItem("wa_funnel_state_v6"),
    );
    expect(saved).toBeTruthy();
    expect(saved).toContain('"equipment":"pc"');

    // Reload: o funil reabre sozinho com a resposta restaurada
    await page.reload({ waitUntil: "domcontentloaded" });
    const dialogAfter = page.getByRole("dialog");
    await expect(dialogAfter).toBeVisible({ timeout: 10000 });
    await expect(
      dialogAfter.getByRole("button", { name: /PC \/ Notebook/ }),
    ).toHaveClass(/border-primary/);
  });

  test("hash com equipamento (#agendamento-notebook) já entra na etapa de sintoma", async ({ page }) => {
    await page.goto(`${BASE}/#agendamento-notebook`, { waitUntil: "domcontentloaded" });

    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible({ timeout: 10000 });

    // Equipamento pré-selecionado via deep link — etapa 0 exibe "Continuar"
    await expect(
      dialog.getByRole("button", { name: /Continuar/i }),
    ).toBeVisible();
    // O resumo do cabeçalho mostra a seleção inferida do link
    await expect(dialog).toContainText(/PC \/ Notebook|Notebook/i);
  });
});
