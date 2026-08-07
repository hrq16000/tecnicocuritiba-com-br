import { test, expect } from "@playwright/test";

/**
 * Gate 1:1 — cada FAQPage do JSON-LD precisa ter exatamente as mesmas
 * perguntas/respostas que aparecem no conteúdo visível da localidade.
 */
const BASE = process.env.E2E_BASE_URL || "http://localhost:8080";

const ROUTES = [
  "/bairros/batel",
  "/bairros/afonso-pena",
  "/bairros/jardim-tropical-pinhais",
  "/bairros/lamenha-grande-cl",
  "/tecnico-informatica-curitiba",
  "/tecnico-informatica-pinhais",
  "/tecnico-informatica-araucaria",
  "/atendimento/curitiba",
  "/atendimento/curitiba/batel",
  "/servicos/formatacao-computador/centro",
  "/servicos/redes-wifi/pinhais",
  "/conserto-tv/curitiba",
];

const norm = (s: string) => s.replace(/\s+/g, " ").trim().toLowerCase();

for (const route of ROUTES) {
  test(`FAQPage 1:1 com conteúdo visível em ${route}`, async ({ page }) => {
    await page.goto(`${BASE}${route}`, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(600);

    const blocks = await page.locator('script[type="application/ld+json"]').allTextContents();
    const faqs = blocks
      .map((t) => {
        try {
          return JSON.parse(t);
        } catch {
          return null;
        }
      })
      .filter((j) => j && j["@type"] === "FAQPage");

    expect(faqs.length, "exatamente um FAQPage por rota").toBe(1);

    const entities = faqs[0].mainEntity as Array<{
      "@type": string;
      name: string;
      acceptedAnswer: { "@type": string; text: string };
    }>;
    expect(entities.length, "mínimo de 4 perguntas localizadas").toBeGreaterThanOrEqual(4);

    const bodyText = norm((await page.locator("body").first().textContent()) ?? "");

    for (const q of entities) {
      expect(q["@type"]).toBe("Question");
      expect(q.acceptedAnswer["@type"]).toBe("Answer");
      // Pergunta precisa estar visível no DOM
      expect(bodyText, `pergunta ausente no conteúdo visível: ${q.name}`).toContain(norm(q.name));
      // Resposta também (accordions renderizam o texto no DOM)
      const answerHead = norm(q.acceptedAnswer.text).slice(0, 60);
      expect(bodyText, `resposta ausente no conteúdo visível: ${q.name}`).toContain(answerHead);
    }
  });
}
