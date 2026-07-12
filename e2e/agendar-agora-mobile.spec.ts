import { test, expect, type Page } from "@playwright/test";

/**
 * Regressão: "Agendar agora" no mobile abre o WhatsApp, redireciona
 * para /obrigado e NÃO reinicia o funil (o dialog deve fechar e o
 * progresso persistido em localStorage deve ser limpo).
 */

async function installStubs(page: Page) {
  await page.addInitScript(() => {
    (window as unknown as { gtag: (...a: unknown[]) => void }).gtag = () => {};
    // Impede que window.open abra uma janela real e interfira no teste.
    const origOpen = window.open.bind(window);
    (window as unknown as { __openedUrls: string[] }).__openedUrls = [];
    window.open = ((url?: string | URL, target?: string, features?: string) => {
      const href = typeof url === "string" ? url : url?.toString() || "";
      (window as unknown as { __openedUrls: string[] }).__openedUrls.push(href);
      if (href.includes("wa.me")) return null;
      return origOpen(url, target, features);
    }) as typeof window.open;
  });
}

test.describe("Regressão — Agendar agora (mobile)", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test.beforeEach(async ({ page, context }) => {
    await installStubs(page);
    await context.route("https://wa.me/**", (route) => route.fulfill({ status: 204, body: "" }));
  });

  test("completa PC/lento no mobile → abre wa.me, navega /obrigado, não reinicia", async ({ page }) => {
    await page.goto("/?utm_source=ci&utm_medium=cpc&utm_campaign=agendar_mobile_regression");
    await page.waitForLoadState("networkidle");

    await page.evaluate(() => {
      window.dispatchEvent(new CustomEvent("wa-funnel:open", { detail: { location: "test" } }));
    });
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible({ timeout: 5000 });

    // Fluxo PC / Notebook — Dell — Lento
    await dialog.getByRole("button", { name: /PC \/ Notebook/i }).click();
    await dialog.getByRole("button", { name: /^Dell$/ }).click();
    await dialog.getByRole("button", { name: /Lento \/ travando/i }).click();

    // Etapa 2 — contexto
    await dialog.getByRole("button", { name: /^Hoje$/ }).click();
    await dialog.getByRole("button", { name: /^Só às vezes$/i }).click();
    await dialog.getByRole("button", { name: /^Reiniciei$/i }).click();
    await dialog.getByRole("button", { name: /Próximas 72 horas/i }).click();

    // Etapa 3 → 4 (auto-advance ao ficar válida ou Continuar)
    const cont = dialog.getByRole("button", { name: /Continuar/i });
    if (await cont.count()) await cont.first().click().catch(() => {});

    // Aceita valor mínimo e clica Agendar agora
    await dialog.getByLabel(/valor mínimo.*R\$ 99,99/i).check();
    const submit = dialog.getByRole("button", { name: /Agendar agora|Abrindo WhatsApp/i });
    await expect(submit).toBeEnabled();

    // Anti-duplo-clique: clica 3x rápido — só deve haver 1 chamada a wa.me.
    await submit.click({ clickCount: 3, delay: 40 });

    await page.waitForURL(/\/obrigado/, { timeout: 5000 });

    // Dialog fechado (funil não reiniciou).
    await expect(dialog).toBeHidden();

    // Uma única chamada wa.me.
    const opened = await page.evaluate(
      () => (window as unknown as { __openedUrls: string[] }).__openedUrls.filter((u) => u.includes("wa.me")),
    );
    expect(opened.length).toBe(1);

    // Progresso persistido foi limpo após submit bem-sucedido.
    const persisted = await page.evaluate(() => localStorage.getItem("wa_funnel_state_v5"));
    expect(persisted).toBeNull();

    // Diagnóstico registrou submit_ok.
    const diag = await page.evaluate(() => localStorage.getItem("wa_funnel_diag_v1"));
    expect(diag).toContain("submit_ok");
  });

  test("persistência: fechar/reabrir mantém etapa e respostas", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await page.evaluate(() => {
      window.dispatchEvent(new CustomEvent("wa-funnel:open", { detail: { location: "test" } }));
    });
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await dialog.getByRole("button", { name: /PC \/ Notebook/i }).click();
    await dialog.getByRole("button", { name: /^Dell$/ }).click();

    // Fecha o dialog (Escape) e reabre — deve manter progresso.
    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    await page.evaluate(() => {
      window.dispatchEvent(new CustomEvent("wa-funnel:open", { detail: { location: "test" } }));
    });
    await expect(dialog).toBeVisible();
    // Marca Dell continua selecionada visualmente (botão com estilo primary).
    const dell = dialog.getByRole("button", { name: /^Dell$/ });
    await expect(dell).toHaveClass(/bg-primary/);
  });
});
