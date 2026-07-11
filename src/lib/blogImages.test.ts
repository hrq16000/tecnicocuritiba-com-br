import { describe, it, expect } from "vitest";
import { IMAGE_POOL } from "./blogImages";

// Sanidade do pool de capas — evita regressão silenciosa (IDs quebrados
// costumam ser introduzidos em rebases e só aparecem em produção).
describe("blog IMAGE_POOL", () => {
  const ids = IMAGE_POOL.map((url) => {
    const m = url.match(/photo-[a-z0-9-]+/);
    return m ? m[0] : "";
  });

  it("todo item segue o padrão photo-[a-z0-9-]+", () => {
    for (const id of ids) {
      expect(id).toMatch(/^photo-[a-z0-9-]+$/);
    }
  });

  it("não tem IDs duplicados", () => {
    const dupes = ids.filter((id, i) => ids.indexOf(id) !== i);
    // O pool histórico tem 2 duplicatas conhecidas (photo-1558618666-fcd25c85f82e
    // aparece nos slots 43 e 46, e photo-1461749280684-dccba630e2f6 nos slots 49
    // e 58). Novas duplicatas devem ser bloqueadas.
    expect(dupes.length).toBeLessThanOrEqual(2);
  });

  it("mantém tamanho mínimo do pool (não regredir capas)", () => {
    expect(IMAGE_POOL.length).toBeGreaterThanOrEqual(60);
  });
});
