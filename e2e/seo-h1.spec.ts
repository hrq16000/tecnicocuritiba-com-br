import { test, expect } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";
import { abs } from "./utils/baseUrl";

// SEO gate — cada URL indexável deve ter exatamente 1 <h1>.
// Amostra 50 URLs do sitemap para manter o CI rápido.

const readSitemapUrls = async (): Promise<string[]> => {
  const publicDir = path.resolve(process.cwd(), "public");
  const indexPath = path.join(publicDir, "sitemap-index.xml");
  if (!fs.existsSync(indexPath)) throw new Error("sitemap-index.xml não encontrado em /public");
  const indexXml = fs.readFileSync(indexPath, "utf8");
  const childSitemaps = [...indexXml.matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map((m) => m[1])
    .map((u) => u.replace(/^https?:\/\/[^/]+/, ""))
    .map((rel) => path.join(publicDir, rel.replace(/^\/+/, "")))
    .filter((p) => fs.existsSync(p));

  const urls = new Set<string>();
  for (const sm of childSitemaps) {
    const xml = fs.readFileSync(sm, "utf8");
    for (const m of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) {
      urls.add(m[1].replace(/^https?:\/\/[^/]+/, ""));
    }
  }
  return [...urls];
};

const sample = <T,>(arr: T[], n: number): T[] => {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, n);
};

test.describe("SEO: cada URL indexável tem exatamente 1 <h1>", () => {
  test("amostra de 50 URLs do sitemap", async ({ page }) => {
    const all = await readSitemapUrls();
    expect(all.length, "sitemap deve ter URLs").toBeGreaterThan(0);
    const sampled = sample(all, 50);
    const failures: Array<{ url: string; count: number }> = [];

    for (const url of sampled) {
      const res = await page.goto(abs(url), { waitUntil: "domcontentloaded", timeout: 15000 }).catch(() => null);
      if (!res || !res.ok()) {
        failures.push({ url, count: -1 });
        continue;
      }
      const count = await page.locator("h1").count();
      if (count !== 1) failures.push({ url, count });
    }

    if (failures.length) {
      console.error("H1 issues:\n" + failures.map((f) => `  ${f.count} h1 → ${f.url}`).join("\n"));
    }
    expect(failures, `URLs sem 1 h1 único: ${failures.length}`).toHaveLength(0);
  });
});
