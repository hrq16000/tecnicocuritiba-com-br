import { describe, expect, it } from "vitest";
import { toWhatsAppPlainText } from "./whatsappSafeText";

describe("WhatsApp triage text safety", () => {
  it("removes broken-prone icons but preserves accents, amounts and all sections", () => {
    const input = [
      "Olá! Triagem completa pelo site Técnico em Curitiba ✅",
      "🔧 *Equipamento:* 💻 PC / Notebook",
      "• Bairro informado: Boa Vista",
      "🧭 *Contexto:*",
      "📦 *Modalidade indicada: COLETA E ENTREGA*",
      "• Valor mínimo R$ 299,99 · peças não inclusas",
      "📍 *Contexto do atendimento:*",
      "📝 Gostaria de fazer cotação de SSD e reinstalação.",
      "🚨 *Atenção — obrigatório para iniciar o atendimento:*",
    ].join("\n");

    const safe = toWhatsAppPlainText(input);
    expect(safe).toContain("Olá! Triagem completa pelo site Técnico em Curitiba");
    expect(safe).toContain("*Equipamento:* PC / Notebook");
    expect(safe).toContain("*Contexto:*");
    expect(safe).toContain("*Modalidade indicada: COLETA E ENTREGA*");
    expect(safe).toContain("Valor mínimo R$ 299,99 · peças não inclusas");
    expect(safe).toContain("Boa Vista");
    expect(safe).toContain("*Atenção — obrigatório para iniciar o atendimento:*");
    expect(safe).not.toMatch(/[\uFFFD\uFE0F\u200D]/u);
    expect(safe).not.toMatch(/[\p{Extended_Pictographic}\p{Emoji_Presentation}]/u);
    expect(toWhatsAppPlainText(safe)).toBe(safe);
  });

  it("survives WhatsApp URL encoding without replacement characters", () => {
    const safe = toWhatsAppPlainText("🧰 Olá! Prévia: Câmera, Wi-Fi, preço R$ 99,99. ✅");
    const url = new URL("https://wa.me/5541997452053");
    url.searchParams.set("text", safe);
    expect(new URL(url.toString()).searchParams.get("text")).toBe(safe);
    expect(safe).toContain("Olá! Prévia: Câmera, Wi-Fi, preço R$ 99,99.");
  });
});
