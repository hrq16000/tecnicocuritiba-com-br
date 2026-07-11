import { test, expect } from "@playwright/test";

/**
 * Acessibilidade: skip-link do header deve ser o primeiro focável do Tab,
 * ficar visível ao receber foco e levar para <main id="main-content">.
 */
test("skip-link fica visível ao Tab e leva ao <main>", async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });

  await page.keyboard.press("Tab");

  const skip = page.getByRole("link", { name: /pular para o conteúdo/i });
  await expect(skip).toBeFocused();

  // Após foco, deve estar visualmente presente (não sr-only)
  const rect = await skip.boundingBox();
  expect(rect).not.toBeNull();
  expect(rect!.width).toBeGreaterThan(1);
  expect(rect!.height).toBeGreaterThan(1);

  // Alvo existe
  const main = page.locator("main#main-content");
  await expect(main).toHaveCount(1);

  // Ativar leva a âncora para o main
  await skip.click();
  await expect(page).toHaveURL(/#main-content$/);
});
