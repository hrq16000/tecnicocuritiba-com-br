import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

/**
 * Gate de acessibilidade das três páginas empresariais propagadas
 * (rotas canônicas — nenhuma URL nova é criada por este teste).
 * Falha em qualquer violação serious/critical: contraste, labels e ARIA.
 */
const BASE = process.env.E2E_BASE_URL || "http://localhost:8080";

const B2B_ROUTES = [
  "/suporte-empresas",
  "/servicos/redes-wifi",
  "/servicos/backup-recuperacao",
];

for (const route of B2B_ROUTES) {
  test(`axe B2B: sem violações serious/critical em ${route}`, async ({ page }) => {
    await page.goto(`${BASE}${route}`, { waitUntil: "networkidle" });
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();

    const blocking = results.violations.filter(
      (v) => v.impact === "serious" || v.impact === "critical",
    );
    expect(
      blocking.map((v) => `${v.id}: ${v.nodes.length} nó(s)`),
      `Violações em ${route}`,
    ).toEqual([]);
  });

  test(`teclado B2B: CTA alcançável e com foco visível em ${route}`, async ({ page }) => {
    await page.goto(`${BASE}${route}`, { waitUntil: "networkidle" });

    const cta = page.locator("a[data-cta-location]").first();
    await expect(cta).toBeVisible();
    await cta.focus();
    const outline = await cta.evaluate((el) => {
      const s = getComputedStyle(el);
      return `${s.outlineStyle}|${s.outlineWidth}|${s.boxShadow}`;
    });
    expect(outline).not.toBe("none|0px|none");

    // Todo link/botão visível tem nome acessível.
    const unnamed = await page.evaluate(() => {
      const nodes = Array.from(document.querySelectorAll("a,button")) as HTMLElement[];
      return nodes
        .filter((el) => el.offsetParent !== null)
        .filter(
          (el) =>
            !(el.textContent || "").trim() &&
            !el.getAttribute("aria-label") &&
            !el.getAttribute("aria-labelledby") &&
            !el.getAttribute("title"),
        )
        .map((el) => el.outerHTML.slice(0, 80));
    });
    expect(unnamed).toEqual([]);
  });
}
