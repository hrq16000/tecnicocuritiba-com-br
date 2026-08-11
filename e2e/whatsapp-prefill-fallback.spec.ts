import { test, expect, type Page } from "@playwright/test";

/**
 * Garante que a mensagem do WhatsApp sai sempre pré-preenchida (serviço /
 * sintoma / localidade) e que NUNCA quebra quando a detecção geo/IP falha.
 * Fallback esperado: mensagem válida, sem "unknown"/"undefined", mantendo
 * a saudação e o pedido de atendimento.
 */

const ROUTES = [
  "/",
  "/atendimento",
  "/atendimento/curitiba",
  "/atendimento/curitiba/batel",
  "/urgente",
];

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

/** Simula falha total do provedor de geo/IP. */
async function blockGeo(page: Page) {
  await page.route("**://ipapi.co/**", (route) => route.abort());
}

test.describe("WhatsApp pré-preenchido — fallback geo/IP", () => {
  for (const route of ROUTES) {
    test(`mensagem válida sem geo/IP em ${route}`, async ({ page }) => {
      await blockGeo(page);
      await page.goto(route);
      await page.waitForLoadState("networkidle");

      const msgs = await waMessages(page);
      test.skip(msgs.length === 0, `rota ${route} sem links wa.me nesta build`);

      for (const m of msgs) {
        expect(m.length, `mensagem vazia em ${route}`).toBeGreaterThan(10);
        expect(m, `placeholder vazado em ${route}`).not.toMatch(
          /unknown|undefined|null|desconhecida|\[object/i,
        );
        expect(m).toContain("tecnicocuritiba.com.br");
      }
    });
  }

  test("UTM e gclid da rota entram no rastro [ref: ...]", async ({ page }) => {
    await blockGeo(page);
    await page.goto("/atendimento/curitiba?utm_source=googleads&gclid=TESTE123ABC");
    await page.waitForLoadState("networkidle");

    const msgs = await waMessages(page);
    expect(msgs.length).toBeGreaterThan(0);
    const refs = msgs.filter((m) => m.includes("[ref:"));
    expect(refs.length, "nenhuma mensagem carregou o rastro de origem").toBeGreaterThan(0);
    expect(refs.some((m) => m.includes("via googleads"))).toBe(true);
    expect(refs.some((m) => m.includes("gclid TESTE123ABC"))).toBe(true);
  });

  test("localidade da rota permanece mesmo sem geo/IP", async ({ page }) => {
    await blockGeo(page);
    await page.goto("/atendimento/curitiba/batel");
    await page.waitForLoadState("networkidle");

    const withSubject = (await waMessages(page)).filter((m) => m.includes("Assunto:"));
    expect(withSubject.length, "nenhuma mensagem com Assunto:").toBeGreaterThan(0);
    expect(withSubject.some((m) => /Batel/i.test(m))).toBe(true);
    expect(withSubject.some((m) => /Curitiba/i.test(m))).toBe(true);
  });
});
