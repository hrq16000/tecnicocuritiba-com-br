/**
 * Testes unitários do gate check-brand-privacy.mjs — garantem que o detector
 * pega CNPJ e número de WhatsApp visível, sem falso positivo nos contextos
 * legítimos (links wa.me, constantes, JSON-LD).
 */
import { describe, it, expect } from "vitest";
import { scanContent } from "../check-brand-privacy.mjs";

describe("brand-privacy scanner", () => {
  it("bloqueia CNPJ formatado", () => {
    const v = scanContent("src/pages/Foo.tsx", "<p>12.345.678/0001-90</p>");
    expect(v.some((x) => x.rule === "cnpj-digits")).toBe(true);
  });

  it("bloqueia CNPJ só com dígitos", () => {
    const v = scanContent("src/pages/Foo.tsx", "<p>12345678000190</p>");
    expect(v.some((x) => x.rule === "cnpj-digits")).toBe(true);
  });

  it("bloqueia a palavra CNPJ mesmo sem número", () => {
    const v = scanContent("src/pages/Foo.tsx", "<p>Empresa com CNPJ ativo</p>");
    expect(v.some((x) => x.rule === "cnpj-word")).toBe(true);
  });

  it("bloqueia WhatsApp formatado com parênteses", () => {
    const v = scanContent("src/pages/Foo.tsx", "<p>Ligue (41) 99745-2053</p>");
    expect(v.some((x) => x.rule === "whatsapp-formatted-visible")).toBe(true);
  });

  it("bloqueia WhatsApp formatado com código do país e espaços", () => {
    const v = scanContent("src/pages/Foo.tsx", "<p>+55 41 9 9745-2053</p>");
    expect(v.some((x) => x.rule === "whatsapp-formatted-visible")).toBe(true);
  });

  it("bloqueia número cru fora de contexto de link", () => {
    const v = scanContent("src/pages/Foo.tsx", "<p>Chame no 5541997452053</p>");
    expect(v.some((x) => x.rule === "whatsapp-raw-outside-link-context")).toBe(true);
  });

  it("permite número cru em link wa.me", () => {
    const v = scanContent(
      "src/lib/whatsappUtm.ts",
      'const a = "https://wa.me/5541997452053?text=oi";'
    );
    expect(v).toHaveLength(0);
  });

  it("permite número cru em constante WHATSAPP_NUMBER", () => {
    const v = scanContent(
      "src/pages/servicos/RedesWifi.tsx",
      'const WHATSAPP_NUMBER = "5541997452053";'
    );
    expect(v).toHaveLength(0);
  });

  it("permite número cru em constantes NAP / schema telephone", () => {
    expect(
      scanContent("src/lib/nap.ts", 'export const NAP_PHONE_E164 = "+5541997452053";')
    ).toHaveLength(0);
    expect(
      scanContent("src/lib/schema.ts", '"telephone": "+5541997452053", "contactPoint": {}')
    ).toHaveLength(0);
  });

  it("modo dist ignora dígitos crus (bundle embute constantes) mas pega formato visível", () => {
    expect(scanContent("dist/assets/app.js", "5541997452053", { dist: true })).toHaveLength(0);
    const v = scanContent("dist/index.html", "<p>(41) 99745-2053</p>", { dist: true });
    expect(v.some((x) => x.rule === "whatsapp-formatted-visible")).toBe(true);
  });

  it("não confunde preços/datas com CNPJ", () => {
    expect(
      scanContent("src/pages/Foo.tsx", "<p>R$ 99,99 — atualizado em 23/08/2026 às 03:30</p>")
    ).toHaveLength(0);
  });

  it("não confunde URL de embed do Google Maps com CNPJ", () => {
    const v = scanContent(
      "src/components/CoverageMapSection.tsx",
      'src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115063.98825866027!2d-49.35951754843749!3d-25.494912899999998"'
    );
    expect(v).toHaveLength(0);
  });
});
