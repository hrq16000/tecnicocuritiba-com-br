import { test, expect } from "@playwright/test";
import { BASE_URL } from "./utils/baseUrl";

/**
 * Gate de qualidade visual: nenhuma rota crítica pode renderizar com scroll
 * horizontal, elementos vazando para fora da área visível ou texto cortado
 * por container — em mobile (360/430) e desktop (1280).
 *
 * Elementos decorativos (blur/gradiente) contidos por um ancestral com
 * overflow hidden não são vazamento real e são ignorados de propósito.
 */
const ROUTES = [
  "/",
  "/servicos",
  "/precos-e-politicas",
  "/tecnico-informatica-curitiba",
  "/areas-atendidas",
  "/contato",
  "/faq",
  "/blog",
];

const VIEWPORTS = [
  { name: "mobile-360", width: 360, height: 780 },
  { name: "mobile-430", width: 430, height: 932 },
  { name: "desktop-1280", width: 1280, height: 900 },
];

for (const viewport of VIEWPORTS) {
  for (const route of ROUTES) {
    test(`layout íntegro em ${route} (${viewport.name})`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto(`${BASE_URL}${route}`, { waitUntil: "domcontentloaded" });
      await page.waitForTimeout(700);

      // 1) Sem scroll horizontal na página.
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      expect(overflow, `overflow horizontal em ${route}`).toBeLessThanOrEqual(2);

      // 2) Nenhum conteúdo real vazando à direita (decorativos contidos por
      //    ancestral com overflow hidden não contam).
      const bleeding = await page.evaluate((vw) => {
        const isClippedByAncestor = (el: HTMLElement) => {
          let parent = el.parentElement;
          while (parent && parent !== document.body) {
            const style = getComputedStyle(parent);
            if (style.overflow !== "visible" || style.overflowX !== "visible") return true;
            parent = parent.parentElement;
          }
          return false;
        };
        const out: string[] = [];
        document.querySelectorAll<HTMLElement>("main *").forEach((el) => {
          const style = getComputedStyle(el);
          if (style.display === "none" || style.visibility === "hidden") return;
          if (style.position === "fixed" || style.position === "absolute") return;
          if (el.getAttribute("aria-hidden") === "true") return;
          const rect = el.getBoundingClientRect();
          if (rect.width === 0 || rect.height === 0) return;
          if (isClippedByAncestor(el)) return;
          if (rect.right > vw + 2) {
            out.push(`${el.tagName.toLowerCase()}.${el.className?.toString().slice(0, 40)}`);
          }
        });
        return out.slice(0, 5);
      }, viewport.width);
      expect(bleeding, `elementos vazando à direita em ${route}`).toEqual([]);

      // 3) Sem frases cortadas: blocos de texto sem line-clamp/ellipsis não
      //    podem transbordar a própria caixa.
      const clipped = await page.evaluate(() => {
        const out: string[] = [];
        document.querySelectorAll<HTMLElement>("main p, main h1, main h2, main h3, main li").forEach((el) => {
          const style = getComputedStyle(el);
          if (style.display === "none" || style.visibility === "hidden") return;
          if (style.overflow !== "hidden" && style.overflowY !== "hidden") return;
          if (style.textOverflow === "ellipsis") return;
          if (style.webkitLineClamp && style.webkitLineClamp !== "none") return;
          if (el.scrollHeight - el.clientHeight > 8) {
            out.push(`${el.tagName.toLowerCase()}: ${el.textContent?.trim().slice(0, 60)}`);
          }
        });
        return out.slice(0, 5);
      });
      expect(clipped, `texto cortado sem ellipsis em ${route}`).toEqual([]);
    });
  }
}
