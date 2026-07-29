import { test, expect } from "@playwright/test";

/**
 * Valida CTAs de WhatsApp em páginas /atendimento/:cidade/:bairro:
 * - href deve conter wa.me + mensagem pré-preenchida com bairro
 * - data-attrs de tracking (service/neighborhood/wa-source) presentes
 * - fluxo funciona sem depender de Supabase (o CI usa stub via
 *   window.__SUPABASE_INVOKE_STUB para bloquear chamadas reais durante o smoke).
 */
const BASE = process.env.E2E_BASE_URL || "http://localhost:8080";

const CASES = [
  { cidade: "curitiba", bairro: "centro", nome: "Centro" },
  { cidade: "curitiba", bairro: "batel", nome: "Batel" },
  { cidade: "sao-jose-dos-pinhais", bairro: "afonso-pena", nome: "Afonso Pena" },
];

test.beforeEach(async ({ context }) => {
  // Stub: intercepta qualquer POST para functions.invoke — evita side-effect
  // externo enquanto valida atributos e URL do CTA.
  await context.route(/functions\/v1\//, (r) =>
    r.fulfill({ status: 200, contentType: "application/json", body: '{"ok":true}' }),
  );
});

for (const c of CASES) {
  test(`WhatsApp em /atendimento/${c.cidade}/${c.bairro} tem contexto correto`, async ({ page }) => {
    await page.goto(`${BASE}/atendimento/${c.cidade}/${c.bairro}`, { waitUntil: "networkidle" });

    // H1 único com bairro
    const h1 = page.locator("h1");
    await expect(h1).toHaveCount(1);
    await expect(h1).toContainText(c.nome);

    // CTA hero
    const hero = page.locator(`[data-cta-location="atendimento_${c.cidade}_${c.bairro}_hero"] a`);
    await expect(hero).toBeVisible();

    const href = await hero.getAttribute("href");
    expect(href, "wa.me href").toMatch(/wa\.me\/5541997452053/);
    expect(decodeURIComponent(href || ""), "mensagem contém bairro").toContain(c.nome);

    // Data-attrs padronizados (origem/servico/bairro)
    const btn = page.locator(`[data-cta-location="atendimento_${c.cidade}_${c.bairro}_hero"]`);
    await expect(btn).toHaveAttribute("data-service", "atendimento_bairro");
    await expect(btn).toHaveAttribute("data-neighborhood", `${c.cidade}/${c.bairro}`);
    await expect(btn).toHaveAttribute("data-wa-source", `atendimento_${c.cidade}_${c.bairro}`);
  });
}
