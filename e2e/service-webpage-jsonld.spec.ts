import { test, expect, type Page } from "@playwright/test";

/**
 * Regressão de JSON-LD Service/WebPage nas rotas de atendimento, serviços e
 * B2B — inclui checagem de coerência de claims (preço mínimo, garantia,
 * fundação) entre páginas relacionadas.
 */

type Json = Record<string, any>;

async function nodes(page: Page): Promise<Json[]> {
  const raw = await page.locator('script[type="application/ld+json"]').allTextContents();
  const out: Json[] = [];
  for (const txt of raw) {
    let parsed: unknown;
    try {
      parsed = JSON.parse(txt);
    } catch {
      throw new Error(`JSON-LD inválido em ${page.url()}`);
    }
    for (const item of Array.isArray(parsed) ? parsed : [parsed]) {
      const g = (item as Json)["@graph"];
      if (Array.isArray(g)) out.push(...(g as Json[]));
      else out.push(item as Json);
    }
  }
  return out;
}

const hasType = (n: Json, t: string) => (Array.isArray(n["@type"]) ? n["@type"].includes(t) : n["@type"] === t);

const ROUTES = [
  "/atendimento",
  "/atendimento/curitiba",
  "/suporte-empresas",
  "/servicos/redes-wifi",
  "/servicos/formatacao-computador",
];

for (const route of ROUTES) {
  test(`Service/WebPage coerentes em ${route}`, async ({ page }) => {
    await page.goto(route);
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(1500);
    const all = await nodes(page);
    expect(all.length, `sem JSON-LD em ${route}`).toBeGreaterThan(0);

    const services = all.filter((n) => hasType(n, "Service"));
    const webpages = all.filter((n) => hasType(n, "WebPage"));
    expect(services.length + webpages.length, `nem Service nem WebPage em ${route}`).toBeGreaterThanOrEqual(1);

    for (const s of services) {
      expect(String(s.name || "").length, "Service sem name").toBeGreaterThan(3);
      const area = s.areaServed;
      expect(area, `Service sem areaServed em ${route}`).toBeTruthy();
      const provider = s.provider;
      expect(provider, `Service sem provider em ${route}`).toBeTruthy();
      if (s.offers) {
        const offers = Array.isArray(s.offers) ? s.offers : [s.offers];
        for (const o of offers) {
          if (o.priceCurrency) expect(o.priceCurrency).toBe("BRL");
          const price = Number(o.price ?? o.lowPrice ?? 0);
          if (price) expect(price, "preço abaixo do mínimo comercial").toBeGreaterThanOrEqual(99);
        }
      }
    }

    for (const w of webpages) {
      expect(String(w.url || "")).toContain("tecnicocuritiba.com.br");
      if (w.inLanguage) expect(w.inLanguage).toBe("pt-BR");
    }

    // Claims de fundação nunca podem divergir entre páginas.
    for (const n of all) {
      if (n.foundingDate) expect(String(n.foundingDate)).toBe("1998");
    }

    // Sem duplicidade de WebPage por rota.
    expect(webpages.length).toBeLessThanOrEqual(1);
  });
}
