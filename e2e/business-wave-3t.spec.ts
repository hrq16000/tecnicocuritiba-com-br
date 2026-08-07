import { test, expect, type Page } from "@playwright/test";
import { BASE_URL } from "./utils/baseUrl";

const PAGES = [
  { path: "/servicos/redes-wifi", contextId: "rede-empresarial", limitsId: "limites-rede" },
  { path: "/servicos/backup-recuperacao", contextId: "contextos-backup", limitsId: "credenciais" },
];

const VIEWPORTS = [
  { w: 360, h: 800 },
  { w: 390, h: 844 },
  { w: 430, h: 932 },
];

async function gotoReady(page: Page, path: string) {
  await page.goto(`${BASE_URL}${path}`, { waitUntil: "domcontentloaded" });
  await page.waitForLoadState("networkidle").catch(() => undefined);
}

test.describe("Rodada 3T — propagação empresarial nas páginas de serviço", () => {
  for (const p of PAGES) {
    test(`${p.path}: CTA acima da dobra em mobile`, async ({ page }) => {
      for (const vp of VIEWPORTS) {
        await page.setViewportSize({ width: vp.w, height: vp.h });
        await gotoReady(page, p.path);
        const cta = page.locator("main button, main a, button").filter({ hasText: /WhatsApp|Melhorar|Recuperar|Solicitar/i }).first();
        await expect(cta).toBeVisible();
        const box = await cta.boundingBox();
        expect(box, `sem bounding box em ${vp.w}px`).not.toBeNull();
        expect(box!.y, `CTA abaixo de 750px em ${vp.w}px`).toBeLessThan(750);
      }
    });

    test(`${p.path}: seções empresariais, limites de terceiros e sumário navegável`, async ({ page }) => {
      await page.setViewportSize({ width: 390, height: 844 });
      await gotoReady(page, p.path);

      const contexts = page.locator(`#${p.contextId}`);
      const limits = page.locator(`#${p.limitsId}`);
      await expect(contexts).toHaveCount(1);
      await expect(limits).toHaveCount(1);
      await expect(limits).toContainText(/fornecedor/i);

      // Sumário aponta para as novas âncoras
      await expect(page.locator(`a[href$="#${p.contextId}"]`).first()).toHaveCount(1);

      // Sem heading com falsa especialização por profissão
      const headings = (await page.locator("h2, h3").allTextContents()).join(" | ");
      expect(headings).not.toMatch(/para (advogados|cl[íi]nicas|contadores|arquitetos)/i);
    });

    test(`${p.path}: sem overflow horizontal e console limpo`, async ({ page }) => {
      const errors: string[] = [];
      page.on("console", (m) => {
        if (m.type() === "error") errors.push(m.text());
      });
      await page.setViewportSize({ width: 360, height: 800 });
      await gotoReady(page, p.path);
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      expect(overflow).toBeLessThanOrEqual(2);
      expect(errors.filter((e) => !/favicon|analytics|gtag|Warning:|Failed to load resource/i.test(e))).toEqual([]);
    });

    test(`${p.path}: navegação por teclado com foco visível`, async ({ page }) => {
      await page.setViewportSize({ width: 1366, height: 768 });
      await gotoReady(page, p.path);
      await page.keyboard.press("Tab");
      for (let i = 0; i < 12; i += 1) {
        const focused = await page.evaluate(() => {
          const el = document.activeElement as HTMLElement | null;
          if (!el || el === document.body) return null;
          const s = getComputedStyle(el);
          return {
            tag: el.tagName,
            outline: s.outlineStyle,
            width: s.outlineWidth,
            shadow: s.boxShadow,
            ring: s.getPropertyValue("--tw-ring-offset-shadow"),
          };
        });
        if (focused) {
          const visible =
            (focused.outline !== "none" && focused.width !== "0px") ||
            (focused.shadow && focused.shadow !== "none") ||
            Boolean(focused.ring);
          expect(visible, `foco sem indicador visível em ${focused.tag}`).toBeTruthy();
          break;
        }
        await page.keyboard.press("Tab");
      }
    });
  }
});
