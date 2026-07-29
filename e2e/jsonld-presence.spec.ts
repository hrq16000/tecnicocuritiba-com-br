import { test, expect } from "@playwright/test";

const BASE = process.env.E2E_BASE_URL ?? "http://localhost:8080";

// Amostragem estável cobrindo serviço, cidade, bairro e problema.
const ROUTES = [
  "/servicos",
  "/assistencia-tecnica-curitiba",
  "/bairros/batel",
  "/problemas/pc-nao-liga-curitiba",
  "/problemas/tv-nao-liga-curitiba",
];

async function collectJsonLd(page: import("@playwright/test").Page) {
  return page.$$eval('script[type="application/ld+json"]', (els) =>
    els.flatMap((el) => {
      try {
        const data = JSON.parse(el.textContent || "null");
        return Array.isArray(data) ? data : [data];
      } catch {
        return [];
      }
    }),
  );
}

for (const route of ROUTES) {
  test(`JSON-LD presente em ${route}`, async ({ page }) => {
    await page.goto(`${BASE}${route}`, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(600);
    const blocks = await collectJsonLd(page);
    expect(blocks.length, `${route} sem JSON-LD`).toBeGreaterThan(0);

    const types = new Set<string>();
    for (const b of blocks) {
      const t = b?.["@type"];
      if (Array.isArray(t)) t.forEach((x) => types.add(String(x)));
      else if (t) types.add(String(t));
      // Aceita também @graph aninhado
      if (Array.isArray(b?.["@graph"])) {
        for (const g of b["@graph"]) {
          const gt = g?.["@type"];
          if (Array.isArray(gt)) gt.forEach((x) => types.add(String(x)));
          else if (gt) types.add(String(gt));
        }
      }
    }

    // Cada página deve conter Breadcrumb + pelo menos um dos tipos de conteúdo.
    expect([...types], `${route} sem BreadcrumbList (achou: ${[...types].join(", ")})`).toContain("BreadcrumbList");
    const hasContent = ["Service", "FAQPage", "LocalBusiness", "Article", "Product"].some((t) => types.has(t));
    expect(hasContent, `${route} sem Service/FAQPage/LocalBusiness/Article (achou: ${[...types].join(", ")})`).toBe(true);
  });
}
