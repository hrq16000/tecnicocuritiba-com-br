import { describe, expect, it } from "vitest";
import { isValidInternalTarget, VALID_SERVICO_SLUGS } from "./validServicoSlugs";

describe("validServicoSlugs", () => {
  it("aceita slugs canônicos de /servicos/*", () => {
    expect(isValidInternalTarget("/servicos/redes-wifi")).toBe(true);
    expect(isValidInternalTarget("/servicos/conserto-tv/batel")).toBe(true);
    expect(isValidInternalTarget("/servicos/remocao-virus")).toBe(true);
  });

  it("rejeita slugs inexistentes", () => {
    expect(isValidInternalTarget("/servicos/nao-existe")).toBe(false);
    expect(isValidInternalTarget("/servicos/inventado-slug/curitiba")).toBe(false);
  });

  it("aceita rotas extras conhecidas", () => {
    expect(isValidInternalTarget("/coleta-e-entrega")).toBe(true);
    expect(isValidInternalTarget("/diagnostico-tecnico")).toBe(true);
  });

  it("aceita hubs dinâmicos", () => {
    expect(isValidInternalTarget("/problemas/notebook-nao-liga-curitiba")).toBe(true);
    expect(isValidInternalTarget("/bairros/batel")).toBe(true);
    expect(isValidInternalTarget("/marcas/samsung")).toBe(true);
  });

  it("rejeita paths vazios ou desconhecidos", () => {
    expect(isValidInternalTarget("")).toBe(false);
    expect(isValidInternalTarget("/inventado-xyz")).toBe(false);
  });

  it("tem pelo menos os 14 serviços conhecidos", () => {
    expect(VALID_SERVICO_SLUGS.size).toBeGreaterThanOrEqual(14);
  });
});
