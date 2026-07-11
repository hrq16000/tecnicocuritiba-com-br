import { test, expect } from "@playwright/test";

/**
 * NAP consistency guard: garante que TODOS os links wa.me e telefones
 * exibidos usam exatamente 5541997452053 (formato E.164 sem "+" no wa.me
 * e +5541997452053 nos telefones). Falha o build se qualquer outro
 * número for encontrado no HTML da home.
 */
const CANONICAL_WA = "5541997452053";
const CANONICAL_TEL = "5541997452053";

const routes = ["/", "/faq", "/como-funciona", "/valores"];

for (const route of routes) {
  test(`NAP consistente em ${route}`, async ({ page }) => {
    await page.goto(route, { waitUntil: "domcontentloaded" });
    // Aguarda hidratação para incluir Footer/FAQSection
    await page.waitForLoadState("networkidle").catch(() => {});

    const html = await page.content();

    // Nenhum wa.me apontando para número diferente
    const waMatches = Array.from(html.matchAll(/wa\.me\/(\+?\d{10,15})/g)).map(
      (m) => m[1].replace(/^\+/, ""),
    );
    for (const num of waMatches) {
      expect(num, `wa.me link com número divergente encontrado`).toBe(CANONICAL_WA);
    }

    // Números de telefone brasileiros expostos (11 dígitos com DDD 41)
    const phoneMatches = Array.from(
      html.matchAll(/\+?55\s*\(?41\)?\s*\d{4,5}[- ]?\d{4}/g),
    ).map((m) => m[0].replace(/\D/g, ""));
    for (const num of phoneMatches) {
      expect(num, `telefone divergente exibido: ${num}`).toBe(CANONICAL_TEL);
    }
  });
}
