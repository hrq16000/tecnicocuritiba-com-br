import { test, expect, type Page } from "@playwright/test";

/**
 * Consistência do BreadcrumbList (hierarquia + deduplicação pós-hidratação).
 */

type Json = Record<string, unknown>;

async function readJsonLd(page: Page): Promise<Json[]> {
  const raw = await page.locator('script[type="application/ld+json"]').allTextContents();
  const out: Json[] = [];
  for (const txt of raw) {
    let parsed: unknown;
    try {
      parsed = JSON.parse(txt);
    } catch {
      throw new Error(`JSON-LD inválido em ${page.url()}`);
    }
    const items = Array.isArray(parsed) ? parsed : [parsed];
    for (const item of items) {
      const graph = (item as Json)["@graph"];
      if (Array.isArray(graph)) out.push(...(graph as Json[]));
      else out.push(item as Json);
    }
  }
  return out;
}

const hasType = (node: Json, type: string) => {
  const t = node["@type"];
  return Array.isArray(t) ? t.includes(type) : t === type;
};

const ROUTES = ["/", "/atendimento", "/atendimento/curitiba", "/gestor-responsavel"];

for (const route of ROUTES) {
  test(`BreadcrumbList único e hierárquico em ${route}`, async ({ page }) => {
    await page.goto(route);
    await page.waitForLoadState("networkidle");
    // Aguarda a passada de deduplicação (SchemaDedup roda até ~1.2s após montar).
    await page.waitForTimeout(1600);

    const nodes = await readJsonLd(page);
    const crumbs = nodes.filter((n) => hasType(n, "BreadcrumbList"));

    if (route === "/") {
      expect(crumbs.length, "home não deve ter mais de 1 BreadcrumbList").toBeLessThanOrEqual(1);
      return;
    }

    expect(crumbs.length, `esperado exatamente 1 BreadcrumbList em ${route}`).toBe(1);

    const items = crumbs[0].itemListElement as Json[];
    expect(Array.isArray(items)).toBe(true);
    expect(items.length).toBeGreaterThanOrEqual(2);

    items.forEach((item, i) => {
      expect(item["@type"]).toBe("ListItem");
      expect(item.position).toBe(i + 1);
      expect(String(item.name).trim().length).toBeGreaterThan(0);
      expect(String(item.item)).toMatch(/^https:\/\/tecnicocuritiba\.com\.br\//);
    });

    expect(String(items[0].name)).toBe("Início");
    expect(String(items[items.length - 1].item)).toContain(route);
  });
}

test("LocalBusiness não duplica na home após hidratação", async ({ page }) => {
  await page.goto("/");
  await page.waitForLoadState("networkidle");
  await page.waitForTimeout(1600);
  const nodes = await readJsonLd(page);
  const lb = nodes.filter((n) => hasType(n, "LocalBusiness"));
  expect(lb.length, "esperado no máximo 1 nó LocalBusiness").toBeLessThanOrEqual(1);
});
