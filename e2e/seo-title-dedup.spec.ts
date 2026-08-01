import { test, expect } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";
import { abs } from "./utils/baseUrl";

// SEO gate — nenhuma página indexável pode ter <title> duplicado com outra.
// Amostra 50 URLs. Em falha, salva CSV para inspeção.

const readSitemapUrls = (): string[] => {
  const publicDir = path.resolve(process.cwd(), "public");
  const indexPath = path.join(publicDir, "sitemap-index.xml");
  if (!fs.existsSync(indexPath)) throw new Error("sitemap-index.xml não encontrado");
  const indexXml = fs.readFileSync(indexPath, "utf8");
  const childSitemaps = [...indexXml.matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map((m) => m[1].replace(/^https?:\/\/[^/]+/, ""))
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

test.describe("SEO: <title> único por URL", () => {
  test("amostra de 50 URLs do sitemap", async ({ page }, testInfo) => {
    const all = readSitemapUrls();
    expect(all.length).toBeGreaterThan(0);
    const sampled = sample(all, 50);
    const rows: Array<{ url: string; title: string }> = [];

    for (const url of sampled) {
      const res = await page.goto(abs(url), { waitUntil: "domcontentloaded", timeout: 15000 }).catch(() => null);
      if (!res || !res.ok()) continue;
      // Aguarda react-helmet-async escrever o <title>.
      await page.waitForFunction(() => !!document.title && document.title !== "", { timeout: 5000 }).catch(() => null);
      const title = await page.title();
      rows.push({ url, title });
    }

    // Dedup check
    const seen = new Map<string, string[]>();
    for (const r of rows) {
      const list = seen.get(r.title) ?? [];
      list.push(r.url);
      seen.set(r.title, list);
    }
    const duplicates = [...seen.entries()].filter(([, urls]) => urls.length > 1);

    // Dump CSV sempre (inspeção manual).
    const outDir = path.join(testInfo.project.outputDir, "..", "..");
    const csvPath = path.join(outDir, "titles-dump.csv");
    fs.mkdirSync(path.dirname(csvPath), { recursive: true });
    fs.writeFileSync(
      csvPath,
      "url,title\n" +
        rows.map((r) => `"${r.url}","${r.title.replace(/"/g, '""')}"`).join("\n"),
    );

    if (duplicates.length) {
      console.error("Títulos duplicados:\n" + duplicates.map(([t, u]) => `  "${t}" → ${u.join(", ")}`).join("\n"));
    }
    expect(duplicates, `Títulos duplicados encontrados: ${duplicates.length}`).toHaveLength(0);
  });
});
