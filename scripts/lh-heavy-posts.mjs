#!/usr/bin/env node
/**
 * Roda Lighthouse (mobile + desktop) nos 10 posts pesados de /problemas/*
 * e emite um diff LCP + transferência (bytes) contra baseline se existir.
 *
 * Uso:
 *   BASE_URL=https://tecnicocuritiba.com.br node scripts/lh-heavy-posts.mjs
 *   node scripts/lh-heavy-posts.mjs --update-baseline   # grava baseline atual
 *
 * Baseline: docs/perf/heavy-posts-baseline.json
 * Relatório: docs/perf/heavy-posts-latest.json + .md
 *
 * Requer `lighthouse` global (npm i -g lighthouse@12) ou npx.
 */
import { execSync } from "node:child_process";
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";

const BASE = (process.env.BASE_URL || "https://tecnicocuritiba.com.br").replace(/\/$/, "");
const UPDATE = process.argv.includes("--update-baseline");

// Top 10 problemas historicamente com maior peso (imagens, FAQ longo, tabelas).
const SLUGS = [
  "pc-nao-liga-curitiba",
  "pc-lento-curitiba",
  "notebook-tela-quebrada-curitiba",
  "tv-listras-na-tela-curitiba",
  "tv-nao-liga-curitiba",
  "celular-tela-quebrada-curitiba",
  "wifi-lento-curitiba",
  "impressora-nao-imprime-curitiba",
  "recuperacao-de-arquivos-curitiba",
  "pc-reiniciando-sozinho-curitiba",
];

const OUT_DIR = resolve("docs/perf");
mkdirSync(OUT_DIR, { recursive: true });
const BASELINE_PATH = resolve(OUT_DIR, "heavy-posts-baseline.json");
const LATEST_PATH = resolve(OUT_DIR, "heavy-posts-latest.json");
const REPORT_PATH = resolve(OUT_DIR, "heavy-posts-diff.md");

function runLH(url, formFactor) {
  const preset = formFactor === "desktop" ? "--preset=desktop" : "--form-factor=mobile";
  const tmp = `/tmp/lh-${formFactor}-${Date.now()}.json`;
  execSync(
    `npx -y lighthouse@12 "${url}" ${preset} --output=json --output-path=${tmp} --quiet --chrome-flags="--headless --no-sandbox"`,
    { stdio: ["ignore", "ignore", "inherit"] },
  );
  const r = JSON.parse(readFileSync(tmp, "utf8"));
  return {
    lcp: r.audits?.["largest-contentful-paint"]?.numericValue ?? null,
    bytes: r.audits?.["total-byte-weight"]?.numericValue ?? null,
    score: r.categories?.performance?.score ?? null,
  };
}

const current = {};
for (const slug of SLUGS) {
  const url = `${BASE}/problemas/${slug}`;
  console.log(`\n▶ ${url}`);
  try {
    current[slug] = {
      mobile: runLH(url, "mobile"),
      desktop: runLH(url, "desktop"),
    };
    console.log("  mobile ", current[slug].mobile);
    console.log("  desktop", current[slug].desktop);
  } catch (e) {
    console.error(`  ✗ falhou: ${e.message}`);
    current[slug] = { error: String(e) };
  }
}

writeFileSync(LATEST_PATH, JSON.stringify(current, null, 2));

if (UPDATE || !existsSync(BASELINE_PATH)) {
  writeFileSync(BASELINE_PATH, JSON.stringify(current, null, 2));
  console.log(`\n✓ baseline gravado em ${BASELINE_PATH}`);
  process.exit(0);
}

const baseline = JSON.parse(readFileSync(BASELINE_PATH, "utf8"));
const rows = ["| slug | form | LCP antes | LCP depois | Δ LCP | bytes antes | bytes depois | Δ bytes |", "|---|---|---:|---:|---:|---:|---:|---:|"];
const fmt = (n) => (n == null ? "—" : Math.round(n).toLocaleString("pt-BR"));
const delta = (a, b) => (a == null || b == null ? "—" : `${b - a >= 0 ? "+" : ""}${Math.round(b - a).toLocaleString("pt-BR")}`);

for (const slug of SLUGS) {
  for (const ff of ["mobile", "desktop"]) {
    const a = baseline[slug]?.[ff] || {};
    const b = current[slug]?.[ff] || {};
    rows.push(`| ${slug} | ${ff} | ${fmt(a.lcp)} | ${fmt(b.lcp)} | ${delta(a.lcp, b.lcp)} | ${fmt(a.bytes)} | ${fmt(b.bytes)} | ${delta(a.bytes, b.bytes)} |`);
  }
}

const md = `# Lighthouse — 10 posts pesados (${new Date().toISOString()})\n\nBase: ${BASE}\n\n${rows.join("\n")}\n`;
writeFileSync(REPORT_PATH, md);
console.log(`\n✓ diff em ${REPORT_PATH}`);
