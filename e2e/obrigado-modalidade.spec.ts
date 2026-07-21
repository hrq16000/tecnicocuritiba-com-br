import { test, expect } from "@playwright/test";

/**
 * Regressão: após o funil enviar para /obrigado, a página exibe o conteúdo
 * correto por modalidade e o estado do funil NÃO reinicia caso o usuário
 * volte para a home (o localStorage do funil deve permanecer limpo, e a
 * página de origem deve renderizar normalmente sem re-abrir o modal).
 */
const MODALIDADES = [
  {
    q: "remoto",
    badge: "Atendimento Remoto",
    proximo: "sessão remota",
  },
  {
    q: "visita",
    badge: "Visita Domiciliar",
    proximo: "bairro",
  },
  {
    q: "coleta",
    badge: "Coleta e Entrega",
    proximo: "motoboy",
  },
] as const;

for (const m of MODALIDADES) {
  test(`/obrigado?modalidade=${m.q} exibe conteúdo específico`, async ({ page }) => {
    await page.goto(`/obrigado?modalidade=${m.q}&origem=hero_test&equipamento=pc`);
    const card = page.getByTestId("obrigado-card");
    await expect(card).toBeVisible();
    await expect(card).toHaveAttribute("data-modalidade", m.q);
    await expect(page.getByTestId("obrigado-badge")).toContainText(m.badge);
    await expect(card).toContainText(new RegExp(m.proximo, "i"));
    // WhatsApp CTA presente e apontando para o número certo
    const cta = page.getByTestId("obrigado-whatsapp");
    await expect(cta).toHaveAttribute("href", /wa\.me\/5541997452053/);
    // JSON-LD LocalBusiness + FAQPage presentes
    const jsonldCount = await page.locator('script[type="application/ld+json"]').count();
    expect(jsonldCount).toBeGreaterThanOrEqual(2);
  });
}

test("funil não reinicia após retornar de /obrigado", async ({ page }) => {
  // Simula fluxo pós-submit: /obrigado limpa o storage do funil.
  await page.goto("/obrigado?modalidade=coleta&origem=hero");
  const funnelState = await page.evaluate(() =>
    localStorage.getItem("wa_funnel_state_v6"),
  );
  expect(funnelState).toBeNull();

  // Ao voltar para a home, o modal do funil NÃO deve estar aberto automaticamente.
  await page.goto("/");
  await expect(page.locator("[data-funnel-open]")).toHaveCount(0);
});
