import { test, expect, type Page } from "@playwright/test";
import { NAP, NAP_PHONE_DIGITS, NAP_PHONE_E164 } from "../src/lib/nap";

/**
 * NAP (Name · Address · Phone) precisa ser idêntico em todo JSON-LD e em todo
 * botão de contato. Divergência de telefone/razão social entre páginas quebra
 * a consistência exigida pelo SEO local.
 */

const ROUTES = ["/", "/atendimento", "/atendimento/curitiba", "/atendimento/curitiba/batel", "/gestor-responsavel"];

type Json = Record<string, any>;

async function graph(page: Page): Promise<Json[]> {
  const raw = await page.locator('script[type="application/ld+json"]').allTextContents();
  const out: Json[] = [];
  for (const txt of raw) {
    const parsed = JSON.parse(txt);
    for (const item of Array.isArray(parsed) ? parsed : [parsed]) {
      const g = (item as Json)["@graph"];
      if (Array.isArray(g)) out.push(...(g as Json[]));
      else out.push(item as Json);
    }
  }
  return out;
}

const hasType = (n: Json, t: string) => (Array.isArray(n["@type"]) ? n["@type"].includes(t) : n["@type"] === t);

const collectPhones = (node: unknown, acc: string[] = []): string[] => {
  if (!node || typeof node !== "object") return acc;
  for (const [k, v] of Object.entries(node as Json)) {
    if (k === "telephone" && typeof v === "string") acc.push(v);
    else if (typeof v === "object") collectPhones(v, acc);
  }
  return acc;
};

for (const route of ROUTES) {
  test(`NAP consistente em ${route}`, async ({ page }) => {
    await page.goto(route);
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(1500);

    const nodes = await graph(page);
    expect(nodes.length, `sem JSON-LD em ${route}`).toBeGreaterThan(0);

    // 1) Todo telephone do JSON-LD usa exatamente o E.164 da fonte única.
    const phones = collectPhones(nodes);
    for (const p of phones) {
      expect(p, `telefone divergente em ${route}: ${p}`).toBe(NAP_PHONE_E164);
    }

    // 2) LocalBusiness carrega endereço e horários da fonte única.
    const lb = nodes.filter((n) => hasType(n, "LocalBusiness"));
    for (const n of lb) {
      expect(n.address?.addressLocality).toBe(NAP.city);
      expect(n.address?.addressRegion).toBe(NAP.region);
      expect(n.address?.addressCountry).toBe(NAP.country);
      const hours = Array.isArray(n.openingHoursSpecification)
        ? n.openingHoursSpecification
        : [n.openingHoursSpecification].filter(Boolean);
      expect(hours.length, `LocalBusiness sem horários em ${route}`).toBeGreaterThan(0);
      for (const h of hours) {
        expect(h.opens).toBe(NAP.opens);
        expect(h.closes).toBe(NAP.closes);
      }
      expect(n.areaServed, `LocalBusiness sem areaServed em ${route}`).toBeTruthy();
      if (n.foundingDate) expect(String(n.foundingDate)).toBe(NAP.foundingDate);
    }

    // 3) Todo botão/link de contato aponta para o mesmo número.
    const hrefs = await page.locator('a[href*="wa.me"]').evaluateAll((els) =>
      els.map((e) => (e as HTMLAnchorElement).href),
    );
    for (const h of hrefs) {
      expect(h, `wa.me com número divergente em ${route}: ${h}`).toContain(`wa.me/${NAP_PHONE_DIGITS}`);
    }

    // 4) Contato é exclusivamente WhatsApp — nenhum link tel: na página.
    expect(await page.locator('a[href^="tel:"]').count(), `link tel: encontrado em ${route}`).toBe(0);
  });
}
