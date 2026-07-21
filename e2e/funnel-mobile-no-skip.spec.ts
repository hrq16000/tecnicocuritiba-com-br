import { test, expect, type Page } from "@playwright/test";

/**
 * Regressão mobile:
 *  1. TODA combinação (equipamento × sintoma amostra) DEVE passar pela etapa 3
 *     (contexto detalhado). Nenhum path pode pular direto para modalidade/confirmação.
 *  2. Após clicar "Agendar agora", o localStorage do funil é limpo e o dialog fecha —
 *     não há resurgimento do modal, não há regressão para etapa anterior.
 */

const CASES: Array<{ eq: RegExp; marca?: RegExp; sintoma: RegExp; label: string }> = [
  { eq: /PC \/ Notebook/i, marca: /^Dell$/, sintoma: /Lento \/ travando/i, label: "pc-lento" },
  { eq: /PC \/ Notebook/i, marca: /^HP$/, sintoma: /Não liga/i, label: "pc-nao-liga" },
  { eq: /^TV$/i, marca: /^Samsung$/, sintoma: /Não liga/i, label: "tv-nao-liga" },
  { eq: /Celular/i, marca: /^Apple/i, sintoma: /Tela quebrada/i, label: "celular-tela" },
  { eq: /^Outro$/i, sintoma: /./, label: "outro-branch" },
];

async function stubs(page: Page) {
  await page.addInitScript(() => {
    (window as unknown as { gtag: (...a: unknown[]) => void }).gtag = () => {};
    (window as unknown as { __waUrls: string[] }).__waUrls = [];
    const orig = window.open.bind(window);
    window.open = ((url?: string | URL) => {
      const href = typeof url === "string" ? url : url?.toString() || "";
      (window as unknown as { __waUrls: string[] }).__waUrls.push(href);
      return null;
    }) as typeof window.open;
  });
}

test.describe("Mobile — funil nunca pula etapa 3", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  for (const c of CASES) {
    test(`[${c.label}] passa pela etapa 3 e reseta após envio`, async ({ page }) => {
      await stubs(page);
      await page.goto("/");
      await page.waitForLoadState("networkidle");
      await page.evaluate(() => {
        window.dispatchEvent(new CustomEvent("wa-funnel:open", { detail: { location: "test" } }));
      });
      const dialog = page.getByRole("dialog");
      await expect(dialog).toBeVisible({ timeout: 5000 });

      // Etapa 0/1 — equipamento + (marca) + sintoma
      await dialog.getByRole("button", { name: c.eq }).first().click();
      if (c.marca) {
        await dialog.getByRole("button", { name: c.marca }).first().click().catch(() => {});
      }
      // Sintoma / branch "outro" usa inputs.
      if (c.label === "outro-branch") {
        // Preenche campos livres do branch "outro".
        const inputs = dialog.locator("input[type='text'], textarea");
        const n = await inputs.count();
        for (let i = 0; i < Math.min(n, 3); i++) {
          await inputs.nth(i).fill(`teste-${i}`).catch(() => {});
        }
      } else {
        await dialog.getByRole("button", { name: c.sintoma }).first().click().catch(() => {});
      }

      // ✅ ETAPA 3 OBRIGATÓRIA: verifica presença de pelo menos uma pergunta
      // de contexto detalhado ("quando começou / aconteceu", "com que frequência",
      // "já tentou", ou "qual a urgência").
      const contextRegex = /(Quando começou|Quando aconteceu|frequência|Já tentou|Reiniciei|urgência|Próximas 72)/i;
      await expect(dialog.getByText(contextRegex).first()).toBeVisible({ timeout: 5000 });

      // Preenche etapa 3 clicando na primeira opção de cada grupo visível.
      const chips = dialog.locator("button:visible").filter({ hasText: /Hoje|Só às vezes|Reiniciei|72 horas|Sempre|Ontem/i });
      const cCount = await chips.count();
      for (let i = 0; i < cCount; i++) {
        await chips.nth(i).click().catch(() => {});
      }

      // Continua e conclui.
      const cont = dialog.getByRole("button", { name: /Continuar/i });
      if (await cont.count()) await cont.first().click().catch(() => {});

      const aceitar = dialog.getByLabel(/valor mínimo/i);
      if (await aceitar.count()) await aceitar.check().catch(() => {});

      const submit = dialog.getByRole("button", { name: /Agendar agora|Abrindo WhatsApp/i });
      await expect(submit).toBeEnabled({ timeout: 5000 });
      await submit.click();

      await page.waitForURL(/\/obrigado/, { timeout: 5000 });

      // Dialog fechado.
      await expect(dialog).toBeHidden();

      // Estado do funil limpo (nenhuma das chaves conhecidas persistiu).
      const persisted = await page.evaluate(() =>
        ["wa_funnel_state_v5", "wa_funnel_state_v6"].map((k) => localStorage.getItem(k)),
      );
      expect(persisted.every((v) => v === null)).toBe(true);

      // Exatamente 1 chamada wa.me.
      const opened = await page.evaluate(
        () => (window as unknown as { __waUrls: string[] }).__waUrls.filter((u) => u.includes("wa.me")),
      );
      expect(opened.length).toBe(1);
    });
  }
});
