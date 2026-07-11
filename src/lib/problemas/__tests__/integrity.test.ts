import { describe, it, expect } from "vitest";
import {
  problemaPagesData,
  getProblemaPageBySlug,
  getAllProblemaSlugs,
} from "../index";

describe("problemas split integrity", () => {
  it("has exactly 189 entries", () => {
    expect(problemaPagesData.length).toBe(189);
  });

  it("has no duplicate slugs", () => {
    const slugs = getAllProblemaSlugs();
    expect(new Set(slugs).size).toBe(189);
  });

  it("resolves known slugs (incl. one merged)", () => {
    expect(getProblemaPageBySlug("computador-nao-liga-curitiba")?.slug).toBe(
      "computador-nao-liga-curitiba",
    );
    expect(getProblemaPageBySlug("notebook-nao-liga-curitiba")?.slug).toBe(
      "notebook-nao-liga-curitiba",
    );
    // Merged slug — should still resolve and carry non-empty body
    const merged = getProblemaPageBySlug("pc-reiniciando-sozinho-curitiba");
    expect(merged).toBeDefined();
    expect(merged?.slug).toBe("pc-reiniciando-sozinho-curitiba");
    expect(merged?.intro?.length ?? 0).toBeGreaterThan(0);
  });

  it("returns undefined for unknown slugs", () => {
    expect(getProblemaPageBySlug("does-not-exist")).toBeUndefined();
  });
});
