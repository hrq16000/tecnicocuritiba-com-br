import { test, expect } from "@playwright/test";

/**
 * Gate: FAQPage JSON-LD presente e bem formado em páginas de FAQ e hubs
 * internos. Exatamente um FAQPage por página (após dedup), >= 2 perguntas,
 * cada uma com Question.name e Answer.text não vazios.
 */
const BASE = process.env.E2E_BASE_URL || "http://localhost:8080";

const PAGES = [
  "/faq",
  "/empresa-de-ti-curitiba",
  "/assistencia-tecnica-computador-curitiba",
  "/assistencia-tecnica-notebook-curitiba",
  "/suporte-empresas",
  "/manutencao-notebook-pc-curitiba",
  "/guia-tecnico-informatica",
  "/abrir-os",
  "/atendimento/curitiba",
];

type Node = Record<string, unknown>;
const flatten = (n: unknown): Node[] => {
  if (Array.isArray(n)) return n.flatMap(flatten);
  if (n && typeof n === "object") {
    const g = (n as Node)["@graph"];
    return Array.isArray(g) ? g.flatMap(flatten) : [n as Node];
  }
  return [];
};
const isType = (n: Node, t: string) => {
  const v = n["@type"];
  return v === t || (Array.isArray(v) && v.includes(t));
};

for (const path of PAGES) {
  test(`FAQPage JSON-LD válido em ${path}`, async ({ page }) => {
    const res = await page.goto(`${BASE}${path}`, { waitUntil: "networkidle" });
    expect(res?.status(), "HTTP 200").toBe(200);
    await page.waitForTimeout(4500); // SchemaDedup roda a 2ª passada em 4s
    const blocks = await page.locator('script[type="application/ld+json"]').allTextContents();
    const faqs = blocks
      .flatMap((t) => {
        try { return flatten(JSON.parse(t)); } catch { return []; }
      })
      .filter((n) => isType(n, "FAQPage"));
    expect(faqs.length, "exatamente um FAQPage").toBe(1);
    const main = faqs[0]!.mainEntity as Node[];
    expect(Array.isArray(main) && main.length, "mainEntity com perguntas").toBeGreaterThanOrEqual(2);
    for (const q of main) {
      expect(isType(q, "Question")).toBe(true);
      expect(String(q.name ?? "").length).toBeGreaterThan(5);
      const a = q.acceptedAnswer as Node;
      expect(a && isType(a, "Answer")).toBe(true);
      expect(String(a.text ?? "").length).toBeGreaterThan(10);
    }
  });
}
