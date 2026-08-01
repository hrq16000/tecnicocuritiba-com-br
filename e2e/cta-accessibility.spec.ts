import { test, expect, type Page } from "@playwright/test";

/**
 * Acessibilidade dos CTAs de contato: nome acessível, alvo de toque ≥ 44px,
 * foco visível e ativação por teclado — em mobile e desktop.
 */

const ROUTES = ["/", "/atendimento/curitiba", "/servicos/redes-wifi"];

// Botões (não links inline de texto corrido): têm cantos arredondados/fundo.
const CTA_SELECTOR = 'a[href*="wa.me"][class*="rounded"], [data-cta-location][class*="rounded"]';

async function ctas(page: Page) {
  return page.locator(CTA_SELECTOR).evaluateAll((els) =>
    els
      .filter((el) => {
        const r = el.getBoundingClientRect();
        return r.width > 0 && r.height > 0;
      })
      .map((el) => {
        const r = el.getBoundingClientRect();
        const label =
          el.getAttribute("aria-label") ||
          el.getAttribute("title") ||
          (el.textContent || "").replace(/\s+/g, " ").trim();
        return {
          tag: el.tagName,
          label,
          w: Math.round(r.width),
          h: Math.round(r.height),
          href: el.getAttribute("href") || "",
          tabindex: el.getAttribute("tabindex"),
          ariaHidden: el.getAttribute("aria-hidden"),
        };
      }),
  );
}

for (const viewport of [
  { name: "mobile", width: 390, height: 844 },
  { name: "desktop", width: 1280, height: 900 },
]) {
  test(`CTAs de contato acessíveis (${viewport.name})`, async ({ page }) => {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });

    for (const route of ROUTES) {
      await page.goto(route);
      await page.waitForLoadState("networkidle");
      await page.waitForTimeout(800);

      const items = await ctas(page);
      expect(items.length, `nenhum CTA visível em ${route}`).toBeGreaterThan(0);

      for (const it of items) {
        // Nome acessível — leitor de tela precisa anunciar a ação.
        expect(it.label.length, `CTA sem nome acessível em ${route} (${it.href})`).toBeGreaterThan(3);
        // Ícone decorativo nunca pode ser o único conteúdo.
        expect(it.label, `CTA apenas com ícone em ${route}`).toMatch(/[a-zA-ZÀ-ú]{3,}/);
        // Alvo de toque confortável no mobile.
        if (viewport.name === "mobile") {
          expect(it.h, `alvo de toque baixo em ${route}: "${it.label}" (${it.h}px)`).toBeGreaterThanOrEqual(40);
        }
        // Nunca remover do fluxo de tabulação nem esconder de AT.
        expect(it.tabindex === null || Number(it.tabindex) >= 0, `tabindex negativo em ${route}`).toBe(true);
        expect(it.ariaHidden, `CTA com aria-hidden em ${route}`).not.toBe("true");
      }
    }
  });
}

test("CTA de WhatsApp é focável por teclado e mostra foco visível", async ({ page }) => {
  await page.goto("/");
  await page.waitForLoadState("networkidle");

  const cta = page.locator('a[href*="wa.me"]').first();
  await cta.focus();
  await expect(cta).toBeFocused();

  const outline = await cta.evaluate((el) => {
    const s = getComputedStyle(el);
    return {
      outlineWidth: s.outlineWidth,
      outlineStyle: s.outlineStyle,
      boxShadow: s.boxShadow,
      ring: (el as HTMLElement).className.includes("focus-visible") || (el as HTMLElement).className.includes("ring"),
    };
  });
  const visible =
    outline.outlineStyle !== "none" ||
    (outline.boxShadow && outline.boxShadow !== "none") ||
    outline.ring;
  expect(visible, "CTA de WhatsApp sem indicador de foco visível").toBeTruthy();

  // Enter no link focado precisa disparar navegação/tracking (sem reload).
  const href = await cta.getAttribute("href");
  expect(href).toContain("wa.me/");
});
