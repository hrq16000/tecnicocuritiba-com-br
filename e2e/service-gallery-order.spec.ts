import { test, expect, type Page } from "@playwright/test";

/**
 * Garante que a galeria de serviço (Redes/Wi-Fi e TV) renderize DENTRO do
 * layout da página — sempre antes do <footer> — e nunca como bloco solto
 * depois do rodapé.
 */

const ROUTES = ["/servicos/redes-wifi", "/servicos/conserto-tv"];

async function galleryPosition(page: Page) {
  return page.evaluate(() => {
    const gallery = document.querySelector('[aria-labelledby="service-gallery-title"]');
    const footer = document.querySelector("footer");
    if (!gallery || !footer) return { hasGallery: !!gallery, hasFooter: !!footer } as const;
    const footerFollows = !!(gallery.compareDocumentPosition(footer) & Node.DOCUMENT_POSITION_FOLLOWING);
    const g = gallery.getBoundingClientRect();
    const f = footer.getBoundingClientRect();
    return {
      hasGallery: true,
      hasFooter: true,
      footerFollows,
      galleryTop: g.top + window.scrollY,
      footerTop: f.top + window.scrollY,
      galleryVisible: g.width > 0 && g.height > 0,
      parentIsMain: !!gallery.closest("main, div"),
    } as const;
  });
}

for (const route of ROUTES) {
  for (const viewport of [
    { name: "mobile", width: 390, height: 844 },
    { name: "desktop", width: 1280, height: 900 },
  ]) {
    test(`galeria antes do footer em ${route} (${viewport.name})`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto(route);
      await page.waitForLoadState("networkidle");
      await page.locator('[aria-labelledby="service-gallery-title"]').first().waitFor({ state: "attached" });

      const pos = await galleryPosition(page);
      expect(pos.hasGallery, `galeria ausente em ${route}`).toBe(true);
      expect(pos.hasFooter, `footer ausente em ${route}`).toBe(true);
      expect(pos.footerFollows, "galeria renderizada depois do <footer>").toBe(true);
      expect(pos.galleryTop!).toBeLessThan(pos.footerTop!);
      expect(pos.galleryVisible).toBe(true);
      expect(pos.parentIsMain).toBe(true);

      // Nenhum bloco de galeria pode existir como irmão posterior ao footer.
      const orphan = await page.evaluate(() => {
        const footer = document.querySelector("footer");
        if (!footer) return 0;
        let n = footer.nextElementSibling;
        let count = 0;
        while (n) {
          if (n.querySelector?.('[aria-labelledby="service-gallery-title"]') || n.matches?.('[aria-labelledby="service-gallery-title"]')) count++;
          n = n.nextElementSibling;
        }
        return count;
      });
      expect(orphan, "existe galeria solta após o rodapé").toBe(0);

      // Ordem esperada do layout: h1 → galeria → footer.
      const h1Top = await page.locator("h1").first().evaluate((el) => el.getBoundingClientRect().top + window.scrollY);
      expect(h1Top).toBeLessThan(pos.galleryTop!);
    });
  }
}
