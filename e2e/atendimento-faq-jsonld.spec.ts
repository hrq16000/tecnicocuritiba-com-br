import { test, expect } from "@playwright/test";

/**
 * Valida presença e validade do JSON-LD FAQPage em /atendimento/:cidade e
 * /atendimento/:cidade/:bairro — garante que conteúdo muda por slug.
 */
const BASE = process.env.E2E_BASE_URL || "http://localhost:8080";

const CASES = [
  { path: "/atendimento/curitiba", token: "Curitiba" },
  { path: "/atendimento/curitiba/batel", token: "Batel" },
  { path: "/atendimento/sao-jose-dos-pinhais/afonso-pena", token: "Afonso Pena" },
];

for (const c of CASES) {
  test(`FAQPage JSON-LD válido em ${c.path}`, async ({ page }) => {
    await page.goto(`${BASE}${c.path}`, { waitUntil: "domcontentloaded" });
    const blocks = await page.locator('script[type="application/ld+json"]').allTextContents();
    const faqs = blocks
      .map((t) => {
        try { return JSON.parse(t); } catch { return null; }
      })
      .filter((j) => j && j["@type"] === "FAQPage");

    expect(faqs.length, "exatamente um FAQPage").toBe(1);
    const faq = faqs[0] as { mainEntity: Array<{ "@type": string; name: string; acceptedAnswer: { "@type": string; text: string } }> };
    expect(faq.mainEntity.length).toBeGreaterThanOrEqual(3);
    for (const q of faq.mainEntity) {
      expect(q["@type"]).toBe("Question");
      expect(q.name.length).toBeGreaterThan(5);
      expect(q.acceptedAnswer["@type"]).toBe("Answer");
      expect(q.acceptedAnswer.text.length).toBeGreaterThan(10);
    }
    // Conteúdo local: pelo menos uma pergunta cita o slug (cidade ou bairro)
    const asText = JSON.stringify(faq).toLowerCase();
    expect(asText).toContain(c.token.toLowerCase());
  });
}
