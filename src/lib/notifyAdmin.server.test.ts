import { describe, expect, it } from "vitest";

import {
  backoffDelayMs,
  buildAdminAlertText,
  validateCallMeBotConfig,
} from "./notifyAdmin.server";

describe("validateCallMeBotConfig", () => {
  it("rejeita config ausente", () => {
    expect(validateCallMeBotConfig(undefined, undefined)).toMatchObject({
      ok: false,
      kind: "config_missing",
    });
    expect(validateCallMeBotConfig("abc123", undefined)).toMatchObject({
      ok: false,
      kind: "config_missing",
    });
  });

  it("rejeita telefone com formato inválido", () => {
    const r = validateCallMeBotConfig("abc123", "+55 41 99999-0000");
    expect(r).toMatchObject({ ok: false, kind: "config_invalid" });
  });

  it("rejeita apikey muito curta", () => {
    const r = validateCallMeBotConfig("abc", "5541999990000");
    expect(r).toMatchObject({ ok: false, kind: "config_invalid" });
  });

  it("aceita config válida", () => {
    expect(validateCallMeBotConfig("k9X2_ab-77", "5541999990000")).toEqual({
      ok: true,
    });
  });
});

describe("backoffDelayMs", () => {
  it("cresce exponencialmente (700 → 2100 → 6300)", () => {
    expect(backoffDelayMs(0)).toBe(700);
    expect(backoffDelayMs(1)).toBe(2100);
    expect(backoffDelayMs(2)).toBe(6300);
  });
});

describe("buildAdminAlertText", () => {
  it("monta resumo estruturado sem PII", () => {
    const text = buildAdminAlertText({
      equipamento: "Notebook",
      sintoma: "Não liga",
      marca: "Dell",
      bairro: "Batel",
      cidade: "Curitiba",
      requires_coleta: true,
      utm_source: "google",
      created_at: "2026-07-14T12:00:00Z",
    });
    expect(text).toContain("Notebook");
    expect(text).toContain("Não liga");
    expect(text).toContain("Batel — Curitiba");
    expect(text).toContain("coleta e entrega");
    expect(text).not.toContain("@");
    expect(text).not.toMatch(/\(\d{2}\)\s*9?\d{4}-\d{4}/);
  });

  it("omite campos ausentes sem deixar rótulos vazios", () => {
    const text = buildAdminAlertText({});
    expect(text).toContain("Novo lead");
    expect(text).not.toContain("Serviço:");
    expect(text).not.toContain("Localidade:");
  });
});
