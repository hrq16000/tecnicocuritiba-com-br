import { describe, expect, it } from "vitest";
import { isLegacyPath, isKnownProblemSlug, legacyRedirectFor } from "./legacyRoutes";

describe("legacy routes", () => {
  it("redirects known legacy problem slugs to the canonical catalog", () => {
    expect(isKnownProblemSlug("computador-nao-liga-curitiba")).toBe(true);
    expect(legacyRedirectFor("/computador-nao-liga-curitiba")).toBe("/problemas/computador-nao-liga-curitiba");
    expect(isLegacyPath("/problemas/computador-nao-liga-curitiba")).toBe(true);
    expect(legacyRedirectFor("/tela-azul-bsod-curitiba")).toBe("/problemas/tela-azul-windows-curitiba");
  });
  it("keeps invalid problem slugs as genuine 404s", () => {
    expect(isLegacyPath("/problemas/not-a-real-problem-xyz")).toBe(false);
    expect(legacyRedirectFor("/not-a-real-problem-xyz")).toBeNull();
  });
});
