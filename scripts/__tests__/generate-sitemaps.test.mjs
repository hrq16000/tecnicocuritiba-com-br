// @vitest-environment node
import { describe, it, expect, beforeAll } from "vitest";
import { execFileSync } from "node:child_process";
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const ROOT = process.cwd();
const PROBLEMAS_SITEMAP = resolve(ROOT, "public/sitemap-problemas.xml");
const EXPECTED_PROBLEMAS = 189;

const locs = (xml) => [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());

describe("scripts/generate-sitemaps.mjs", () => {
  let xml = "";

  beforeAll(() => {
    execFileSync("node", ["scripts/generate-sitemaps.mjs"], { cwd: ROOT, stdio: "pipe" });
    expect(existsSync(PROBLEMAS_SITEMAP)).toBe(true);
    xml = readFileSync(PROBLEMAS_SITEMAP, "utf8");
  });

  const problemaUrls = () =>
    locs(xml).filter((u) => new URL(u).pathname.startsWith("/problemas/"));

  it("gera sitemap-problemas.xml com exatamente 189 rotas /problemas/*", () => {
    expect(problemaUrls().length).toBe(EXPECTED_PROBLEMAS);
  });

  it("não contém rotas /problemas/* duplicadas", () => {
    const urls = problemaUrls();
    const dups = [...new Set(urls.filter((u, i) => urls.indexOf(u) !== i))];
    expect(dups, `duplicadas: ${dups.join(", ")}`).toHaveLength(0);
    expect(new Set(urls).size).toBe(EXPECTED_PROBLEMAS);
  });

  it("está referenciado no sitemap-index.xml e no robots.txt", () => {
    const index = readFileSync(resolve(ROOT, "public/sitemap-index.xml"), "utf8");
    expect(index).toContain("sitemap-problemas.xml");
    const robots = readFileSync(resolve(ROOT, "public/robots.txt"), "utf8");
    expect(robots).toMatch(/Sitemap:\s*https:\/\/tecnicocuritiba\.com\.br\/sitemap-problemas\.xml/);
  });
});
