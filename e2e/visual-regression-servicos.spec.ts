import { test, expect } from "@playwright/test";

/**
 * Regressão visual (screenshot diff) das páginas de backup e redes/Wi-Fi.
 * Garante que hero, TrustStrip e CTA empresarial não quebrem em mudanças futuras.
 * Baseline: `bunx playwright test e2e/visual-regression-servicos.spec.ts --update-snapshots`.
 */
const PAGES = [
  { nome: "backup-dados", url: "/servicos/backup-recuperacao" },
  { nome: "rede-wifi", url: "/servicos/redes-wifi" },
];

const VIEWPORTS = [
  { nome: "mobile", width: 390, height: 844 },
  { nome: "desktop", width: 1280, height: 900 },
];

for (const page of PAGES) {
  for (const vp of VIEWPORTS) {
    test(`${page.nome} @ ${vp.nome} mantém layout e CTA`, async ({ page: p }) => {
      await p.setViewportSize({ width: vp.width, height: vp.height });
      await p.goto(page.url, { waitUntil: "networkidle" });

      // Estabiliza animações e conteúdo dinâmico antes do diff.
      await p.addStyleTag({
        content: `*,*::before,*::after{animation:none!important;transition:none!important;caret-color:transparent!important}`,
      });
      await p.waitForTimeout(400);

      // CTA de WhatsApp precisa continuar presente e visível.
      const cta = p.locator('a[href*="wa.me"]').first();
      await expect(cta).toBeVisible();

      await expect(p.locator("main")).toHaveScreenshot(`${page.nome}-${vp.nome}.png`, {
        maxDiffPixelRatio: 0.02,
        animations: "disabled",
        timeout: 20000,
      });
    });
  }
}
