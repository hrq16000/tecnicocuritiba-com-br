#!/usr/bin/env node
/**
 * Pipeline de performance por páginas de bairro/cidade (LCP / CLS / TBT).
 *
 * - Roda Lighthouse mobile em uma amostra determinística de páginas locais.
 * - Compara com a baseline em docs/perf/local-pages-baseline.json.
 * - Alerta (e falha, com LH_FAIL_ON_REGRESSION=1) quando há regressão após
 *   mudanças de imagens ou layout.
 *
 * Uso:
 *   BASE_URL=http://localhost:8080 node scripts/lh-local-pages.mjs
 *   UPDATE_BASELINE=1 ... (grava nova baseline)
 */
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const SITE = "https://tecnicocuritiba.com.br";
const BASE = (process.env.BASE_URL || "http://localhost:8080").replace(/\/$/, "");
const SAMPLE = Number(process.env.SAMPLE || 8);
const MAX_LCP_REGRESSION_MS = Number(process.env.MAX_LCP_REGRESSION_MS || 400);
const MAX_CLS_REGRESSION = Number(process.env.MAX_CLS_REGRESSION || 0.02);
const MAX_TBT_REGRESSION_MS = Number(process.env.MAX_TBT_REGRESSION_MS || 150);
const FAIL = process.env.LH_FAIL_ON_REGRESSION === "1";

const OUT_DIR = path.resolve("docs/perf");
const BASELINE = path.join(OUT_DIR, "local-pages-baseline.json");
const LATEST = path.join(OUT_DIR, "local-pages-latest.json");
const DIFF = path.join(OUT_DIR, "local-pages-diff.md");

function localRoutes() {
  const dir = path.resolve("public");
  const files = fs.readdirSync(dir).filter((f) => /^sitemap.*\.xml$/.test(f) && f !== "sitemap-images.xml");
  const out = new Set();
  for (const f of files) {
    const xml = fs.readFileSync(path.join(dir, f), "utf8");
    for (const m of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) {
      const loc = m[1].trim();
      if (!loc.startsWith(SITE) || /sitemap[\w-]*\.xml$/.test(loc)) continue;
      const p = loc.slice(SITE.length).replace(/\/$/, "") || "/";
      if (/^\/(bairros|atendimento)\//.test(p)) out.add(p);
    }
  }
  const all = [...out].sort();
  // amostra determinística e espalhada
  const step = Math.max(1, Math.floor(all.length / SAMPLE));
  return all.filter((_, i) => i % step === 0).slice(0, SAMPLE);
}

function runLighthouse(url) {
  const tmp = path.join(OUT_DIR, "tmp-lh.json");
  execFileSync(
    "lighthouse",
    [
      url,
      "--quiet",
      "--output=json",
      `--output-path=${tmp}`,
      "--preset=perf",
      "--form-factor=mobile",
      "--screenEmulation.mobile",
      "--chrome-flags=--headless=new --no-sandbox --disable-dev-shm-usage",
    ],
    { stdio: ["ignore", "ignore", "inherit"] },
  );
  const j = JSON.parse(fs.readFileSync(tmp, "utf8"));
  fs.rmSync(tmp, { force: true });
  const a = j.audits;
  return {
    lcp: Math.round(a["largest-contentful-paint"].numericValue),
    cls: Number(a["cumulative-layout-shift"].numericValue.toFixed(3)),
    tbt: Math.round(a["total-blocking-time"].numericValue),
    bytes: Math.round((a["total-byte-weight"]?.numericValue || 0) / 1024),
    score: Math.round((j.categories.performance.score || 0) * 100),
  };
}

fs.mkdirSync(OUT_DIR, { recursive: true });
const routes = localRoutes();
const latest = {};
for (const r of routes) {
  try {
    latest[r] = runLighthouse(`${BASE}${r}`);
    console.log(`· ${r} → LCP ${latest[r].lcp}ms CLS ${latest[r].cls} TBT ${latest[r].tbt}ms (${latest[r].score})`);
  } catch (err) {
    console.warn(`⚠️  ${r}: Lighthouse falhou (${err.message.slice(0, 80)})`);
  }
}
fs.writeFileSync(LATEST, JSON.stringify(latest, null, 2));

const baseline = fs.existsSync(BASELINE) ? JSON.parse(fs.readFileSync(BASELINE, "utf8")) : null;
if (!baseline || process.env.UPDATE_BASELINE === "1") {
  fs.writeFileSync(BASELINE, JSON.stringify(latest, null, 2));
  console.log(`✅ Baseline de performance local gravada (${Object.keys(latest).length} páginas).`);
  process.exit(0);
}

const regressions = [];
const lines = ["# Performance — páginas de bairro/cidade", "", "| Rota | LCP | Δ LCP | CLS | Δ CLS | TBT | Δ TBT |", "| --- | --- | --- | --- | --- | --- | --- |"];
for (const [route, cur] of Object.entries(latest)) {
  const b = baseline[route];
  if (!b) continue;
  const dLcp = cur.lcp - b.lcp;
  const dCls = Number((cur.cls - b.cls).toFixed(3));
  const dTbt = cur.tbt - b.tbt;
  lines.push(`| ${route} | ${cur.lcp}ms | ${dLcp >= 0 ? "+" : ""}${dLcp} | ${cur.cls} | ${dCls >= 0 ? "+" : ""}${dCls} | ${cur.tbt}ms | ${dTbt >= 0 ? "+" : ""}${dTbt} |`);
  if (dLcp > MAX_LCP_REGRESSION_MS) regressions.push(`${route}: LCP +${dLcp}ms (limite ${MAX_LCP_REGRESSION_MS}ms)`);
  if (dCls > MAX_CLS_REGRESSION) regressions.push(`${route}: CLS +${dCls} (limite ${MAX_CLS_REGRESSION})`);
  if (dTbt > MAX_TBT_REGRESSION_MS) regressions.push(`${route}: TBT +${dTbt}ms (limite ${MAX_TBT_REGRESSION_MS}ms)`);
}
if (regressions.length) {
  lines.push("", "## ⚠️ Regressões detectadas", "", ...regressions.map((r) => `- ${r}`));
}
fs.writeFileSync(DIFF, lines.join("\n") + "\n");

if (regressions.length) {
  console.error(`\n⚠️  ${regressions.length} regressão(ões) de performance após mudanças de imagem/layout:`);
  regressions.forEach((r) => console.error(` - ${r}`));
  if (FAIL) process.exit(1);
} else {
  console.log("✅ Nenhuma regressão de LCP/CLS/TBT nas páginas locais.");
}
