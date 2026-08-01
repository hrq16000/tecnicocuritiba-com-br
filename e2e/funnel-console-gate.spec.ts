import { test, expect, type ConsoleMessage } from "@playwright/test";

/**
 * Gate de console: percorrer a triagem (PF e PJ) não pode produzir NENHUM
 * erro novo no console nem exceção de página — em desktop e no mobile
 * pequeno (320x568). Ruído externo conhecido é filtrado pela allowlist.
 */
const BASE = process.env.E2E_BASE_URL || "http://localhost:8080";

const ALLOW = [
  /favicon/i,
  /net::ERR_(BLOCKED_BY_CLIENT|INTERNET_DISCONNECTED)/i,
  /google-analytics|googletagmanager|gtag|doubleclick|sentry\.io/i,
  /Failed to load resource.*(analytics|fonts)/i,
];

const isNoise = (text: string) => ALLOW.some((re) => re.test(text));

const VIEWPORTS = [
  { name: "desktop", width: 1280, height: 900 },
  { name: "mobile-320", width: 320, height: 568 },
];

for (const vp of VIEWPORTS) {
  test(`triagem PF x PJ sem erros de console (${vp.name})`, async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg: ConsoleMessage) => {
      if (msg.type() !== "error") return;
      const text = msg.text();
      if (!isNoise(text)) errors.push(`[console] ${text}`);
    });
    page.on("pageerror", (err) => {
      if (!isNoise(String(err))) errors.push(`[pageerror] ${err.message}`);
    });

    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.goto(`${BASE}/`, { waitUntil: "domcontentloaded" });
    await page.waitForLoadState("networkidle");

    // Abre o funil pelo primeiro CTA disponível.
    const cta = page
      .locator('[data-cta-location] button, button:has-text("Agendar"), button:has-text("WhatsApp")')
      .first();
    if (await cta.count()) {
      await cta.click({ noWaitAfter: true }).catch(() => {});
      await page.waitForTimeout(600);

      // Percorre opções da etapa atual (PF/PJ ou equipamento) sem enviar.
      const options = page.getByRole("button").filter({ hasNotText: /fechar|voltar/i });
      const n = Math.min(await options.count(), 4);
      for (let i = 0; i < n; i++) {
        await options.nth(i).click({ noWaitAfter: true }).catch(() => {});
        await page.waitForTimeout(250);
      }
      await page.keyboard.press("Escape").catch(() => {});
    }

    // Rota B2B (PJ) — mesma exigência de console limpo.
    await page.goto(`${BASE}/suporte-empresas`, { waitUntil: "domcontentloaded" });
    await page.waitForLoadState("networkidle");

    expect(errors, `erros de console em ${vp.name}:\n${errors.join("\n")}`).toEqual([]);
  });
}
