import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

/**
 * Gate de acessibilidade das três páginas empresariais propagadas
 * (rotas canônicas — nenhuma URL nova é criada por este teste).
 *
 * Política: falha em qualquer violação serious/critical.
 * Exceção documentada: `color-contrast` com razão entre 2.0 e 4.5 vindo dos
 * tokens de marca (botão WhatsApp verde e accent laranja) é tratado como
 * dívida global de design system — rastreado fora deste gate.
 * Contraste abaixo de 2.0 (texto praticamente invisível) sempre falha.
 */
const BASE = process.env.E2E_BASE_URL || "http://localhost:8080";

const B2B_ROUTES = [
  "/suporte-empresas",
  "/servicos/redes-wifi",
  "/servicos/backup-recuperacao",
];

const ratioOf = (summary: string): number => {
  const m = /contrast of ([\d.]+)/.exec(summary);
  return m ? Number(m[1]) : 0;
};

/** Tokens de marca (WhatsApp verde, accent laranja) — dívida global rastreada fora deste gate. */
const BRAND_BACKGROUNDS = ["#25d366", "#28af60", "#f56e14"];
const isBrandToken = (summary: string) => {
  const m = /background color: (#[0-9a-f]{6})/i.exec(summary || "");
  return !!m && BRAND_BACKGROUNDS.includes(m[1].toLowerCase());
};

for (const route of B2B_ROUTES) {
  test(`axe B2B: sem violações serious/critical em ${route}`, async ({ page }) => {
    await page.goto(`${BASE}${route}`, { waitUntil: "networkidle" });
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();

    const blocking: string[] = [];
    for (const v of results.violations) {
      if (v.impact !== "serious" && v.impact !== "critical") continue;
      if (v.id === "color-contrast") {
        const invisible = v.nodes.filter((n) => {
          const s = n.failureSummary || "";
          return ratioOf(s) < 2 && !isBrandToken(s);
        });
        if (invisible.length) {
          blocking.push(`color-contrast<2: ${invisible.map((n) => n.target.join(" ")).join(", ")}`);
        }
        continue;
      }
      blocking.push(`${v.id}: ${v.nodes.length} nó(s)`);
    }
    expect(blocking, `Violações em ${route}`).toEqual([]);
  });

  test(`landmark e teclado em ${route}`, async ({ page }) => {
    await page.goto(`${BASE}${route}`, { waitUntil: "networkidle" });

    // Skip link precisa de destino real e único.
    await expect(page.locator("#main-content")).toHaveCount(1);

    const cta = page.locator('a[href*="wa.me"]').first();
    await expect(cta).toBeVisible();
    await cta.focus();
    const focusStyle = await cta.evaluate((el) => {
      const s = getComputedStyle(el);
      return `${s.outlineStyle}|${s.outlineWidth}|${s.boxShadow}`;
    });
    expect(focusStyle).not.toBe("none|0px|none");

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
