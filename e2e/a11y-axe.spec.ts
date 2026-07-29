import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

/**
 * A11y gate: nenhuma violação `serious` ou `critical` em rotas-chave.
 * Rodado no CI a cada PR — falha se novas regressões forem introduzidas.
 * Ajuste a lista `ROUTES` com cuidado (mudanças de escopo).
 */
const BASE = process.env.E2E_BASE_URL || "http://localhost:8080";
const ROUTES = [
  "/",
  "/servicos",
  "/como-funciona",
  "/atendimento",
  "/atendimento/curitiba",
  "/precos-e-politicas",
  "/obrigado",
];

for (const route of ROUTES) {
  test(`axe: sem violações serious/critical em ${route}`, async ({ page }) => {
    await page.goto(`${BASE}${route}`, { waitUntil: "networkidle" });
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();

    const blocking = results.violations.filter(
      (v) => v.impact === "serious" || v.impact === "critical",
    );

    if (blocking.length) {
      const summary = blocking
        .map(
          (v) =>
            `- [${v.impact}] ${v.id}: ${v.help} (${v.nodes.length} nós) → ${v.helpUrl}`,
        )
        .join("\n");
      console.error(`\nA11Y REGRESSIONS em ${route}:\n${summary}\n`);
    }
    expect(blocking, `A11y serious/critical em ${route}`).toEqual([]);
  });
}
