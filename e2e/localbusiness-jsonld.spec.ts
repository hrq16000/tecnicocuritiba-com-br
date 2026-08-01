import { test, expect, type Page } from "@playwright/test";

/**
 * Regressão estrutural do JSON-LD LocalBusiness (home) e do BreadcrumbList
 * nas rotas de atendimento + gestor responsável.
 * Falha se NAP, areaServed ou horários mudarem de forma inválida.
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
      throw new Error(`JSON-LD inválido em ${page.url()}: ${txt.slice(0, 120)}`);
    }
    const items = Array.isArray(parsed) ? parsed : [parsed];
    for (const item of items) {
      const node = item as Json;
      const graph = node["@graph"];
      if (Array.isArray(graph)) out.push(...(graph as Json[]));
      else out.push(node);
    }
  }
  return out;
}

const hasType = (node: Json, type: string) => {
  const t = node["@type"];
  return Array.isArray(t) ? t.includes(type) : t === type;
};

test.describe("JSON-LD LocalBusiness / BreadcrumbList", () => {
  test("home expõe LocalBusiness com NAP, areaServed e horários", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    const nodes = await readJsonLd(page);
    const lb = nodes.find((n) => hasType(n, "LocalBusiness"));
    expect(lb, "LocalBusiness ausente na home").toBeTruthy();

    // Name + Address + Phone (NAP)
    expect(String(lb!.name || "")).toContain("Curitiba");
    expect(String(lb!.telephone || "")).toMatch(/\+?55.?41.?9{0,1}9745.?2053/);
    const address = lb!.address as Json;
    expect(address, "address ausente").toBeTruthy();
    expect(address.addressLocality).toBe("Curitiba");
    expect(address.addressRegion).toBe("PR");
    expect(address.addressCountry).toBe("BR");

    // Área atendida
    const areaServed = lb!.areaServed as Json[];
    expect(Array.isArray(areaServed)).toBe(true);
    const cidades = areaServed.map((a) => String(a.name));
    expect(cidades).toContain("Curitiba");
    expect(cidades).toContain("São José dos Pinhais");
    expect(cidades.length).toBeGreaterThanOrEqual(5);

    // Horários
    const hours = lb!.openingHoursSpecification as Json[];
    expect(Array.isArray(hours)).toBe(true);
    expect(hours.length).toBeGreaterThanOrEqual(1);
    for (const h of hours) {
      expect(h["@type"]).toBe("OpeningHoursSpecification");
      expect(String(h.opens)).toMatch(/^\d{2}:\d{2}$/);
      expect(String(h.closes)).toMatch(/^\d{2}:\d{2}$/);
      expect(h.dayOfWeek).toBeTruthy();
    }
  });

  const breadcrumbRoutes = [
    "/atendimento",
    "/atendimento/curitiba",
    "/gestor-responsavel",
  ];

  for (const route of breadcrumbRoutes) {
    test(`BreadcrumbList consistente em ${route}`, async ({ page }) => {
      await page.goto(route);
      await page.waitForLoadState("networkidle");
      const nodes = await readJsonLd(page);
      const crumbs = nodes.filter((n) => hasType(n, "BreadcrumbList"));
      expect(crumbs.length, `BreadcrumbList ausente em ${route}`).toBeGreaterThanOrEqual(1);

      const items = crumbs[0].itemListElement as Json[];
      expect(Array.isArray(items)).toBe(true);
      expect(items.length).toBeGreaterThanOrEqual(2);
      items.forEach((item, i) => {
        expect(item["@type"]).toBe("ListItem");
        expect(item.position).toBe(i + 1);
        expect(String(item.name).length).toBeGreaterThan(0);
        expect(String(item.item)).toMatch(/^https:\/\/tecnicocuritiba\.com\.br\//);
      });
      expect(String(items[0].name)).toBe("Início");
      // Último item aponta para a própria URL.
      expect(String(items[items.length - 1].item)).toContain(route);
    });
  }

  test("gestor-responsavel expõe Person e Organization coerentes", async ({ page }) => {
    await page.goto("/gestor-responsavel");
    await page.waitForLoadState("networkidle");
    const nodes = await readJsonLd(page);
    const person = nodes.find((n) => hasType(n, "Person"));
    const org = nodes.find((n) => hasType(n, "Organization"));
    expect(person, "Person ausente").toBeTruthy();
    expect(org, "Organization ausente").toBeTruthy();
    expect(String(person!.jobTitle)).toContain("Gestor");
    expect(Array.isArray(person!.hasCredential)).toBe(true);
    expect((person!.hasCredential as Json[]).length).toBeGreaterThanOrEqual(3);
    expect((org!.founder as Json)["@id"]).toBe(person!["@id"]);
    expect(org!.foundingDate).toBe("1998");

    await expect(page.locator("h1")).toHaveCount(1);
  });
});
