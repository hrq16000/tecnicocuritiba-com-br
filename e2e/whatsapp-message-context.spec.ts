import { test, expect, type Page } from "@playwright/test";

/**
 * Valida que a mensagem pré-preenchida do WhatsApp carrega o contexto
 * profissional: assunto com categoria/sintoma, cidade, bairro e a condição
 * comercial (mínimo R$ 99,99) quando aplicável.
 */

async function waMessages(page: Page): Promise<string[]> {
  const hrefs = await page.locator('a[href*="wa.me/"]').evaluateAll((els) =>
    els.map((e) => (e as HTMLAnchorElement).href),
  );
  return hrefs
    .map((h) => {
      try {
        return decodeURIComponent(new URL(h).searchParams.get("text") || "");
      } catch {
        return "";
      }
    })
    .filter(Boolean);
}

test("mensagem do WhatsApp inclui cidade em /atendimento/:cidade", async ({ page }) => {
  await page.goto("/atendimento/curitiba");
  await page.waitForLoadState("networkidle");
  const msgs = await waMessages(page);
  expect(msgs.length, "nenhum link wa.me na página").toBeGreaterThan(0);

  const withSubject = msgs.filter((m) => m.includes("Assunto:"));
  expect(withSubject.length, "nenhuma mensagem com Assunto:").toBeGreaterThan(0);
  expect(withSubject.some((m) => /Curitiba/i.test(m))).toBe(true);
  expect(withSubject.every((m) => m.includes("R$ 99,99"))).toBe(true);
  expect(msgs.every((m) => !/unknown|undefined|desconhecida/i.test(m))).toBe(true);
});

test("mensagem do WhatsApp inclui bairro + cidade em /atendimento/:cidade/:bairro", async ({ page }) => {
  await page.goto("/atendimento/curitiba/batel");
  await page.waitForLoadState("networkidle");
  const msgs = await waMessages(page);
  const withSubject = msgs.filter((m) => m.includes("Assunto:"));
  expect(withSubject.length).toBeGreaterThan(0);
  expect(withSubject.some((m) => /Batel/i.test(m)), "bairro ausente no assunto").toBe(true);
  expect(withSubject.some((m) => /Curitiba/i.test(m)), "cidade ausente no assunto").toBe(true);
  expect(withSubject.every((m) => m.includes("R$ 99,99"))).toBe(true);
});

test("refs de triagem trazem category/symptomSlug válidos", async ({ page }) => {
  await page.goto("/atendimento/curitiba");
  await page.waitForLoadState("networkidle");
  const msgs = await waMessages(page);
  const refs = msgs.filter((m) => m.includes("[ref:"));
  test.skip(refs.length === 0, "rota sem links de triagem nesta build");
  for (const m of refs) {
    const ref = m.match(/\[ref:\s*([^\]]+)\]/)![1];
    expect(ref).toMatch(/^[a-z0-9-]+(\/[a-z0-9-]+)?$/i);
    expect(ref).not.toContain("unknown");
  }
});
