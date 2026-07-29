#!/usr/bin/env node
/**
 * Roda Lighthouse (mobile + desktop) nos 10 posts pesados de /problemas/*
 * e emite um diff LCP + transferência (bytes) contra baseline.
 *
 * Uso:
 *   BASE_URL=https://tecnicocuritiba.com.br node scripts/lh-heavy-posts.mjs
 *   node scripts/lh-heavy-posts.mjs --update-baseline
 *   node scripts/lh-heavy-posts.mjs --auto-select        # recalcula top 10 via peso bruto
 *
 * Saídas em docs/perf/:
 *   - heavy-posts-latest.json         (últimos resultados)
 *   - heavy-posts-baseline.json       (referência)
 *   - heavy-posts-diff.md             (tabela de diff em markdown)
 *   - heavy-posts-report.html         (relatório consolidado com gráficos SVG)
 *   - heavy-posts-slugs.json          (lista atual usada; atualizada por --auto-select)
 */
import { execSync } from "node:child_process";
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";

const BASE = (process.env.BASE_URL || "https://tecnicocuritiba.com.br").replace(/\/$/, "");
const UPDATE = process.argv.includes("--update-baseline");
const AUTO_SELECT = process.argv.includes("--auto-select");

const DEFAULT_SLUGS = [
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
const HTML_PATH = resolve(OUT_DIR, "heavy-posts-report.html");
const SLUGS_PATH = resolve(OUT_DIR, "heavy-posts-slugs.json");

// --- Auto-select via peso bruto (HEAD + gzip HTML) ---------------------------
async function autoSelectSlugs() {
  console.log("▶ auto-select: escaneando /problemas/* por peso bruto…");
  const listDir = resolve("src/lib/problemas");
  const { readdirSync } = await import("node:fs");
  const all = readdirSync(listDir)
    .filter((f) => f.endsWith(".ts") && !["index.ts", "types.ts"].includes(f))
    .map((f) => f.replace(/\.ts$/, ""));

  const results = [];
  for (const slug of all) {
    const url = `${BASE}/problemas/${slug}`;
    try {
      const res = await fetch(url, { headers: { "accept-encoding": "gzip" } });
      const buf = await res.arrayBuffer();
      results.push({ slug, bytes: buf.byteLength });
    } catch {
      /* ignora */
    }
  }
  results.sort((a, b) => b.bytes - a.bytes);
  const top = results.slice(0, 10).map((r) => r.slug);
  writeFileSync(SLUGS_PATH, JSON.stringify({ updatedAt: new Date().toISOString(), top }, null, 2));
  console.log(`✓ top 10 gravado em ${SLUGS_PATH}`);
  return top;
}

function loadSlugs() {
  if (existsSync(SLUGS_PATH)) {
    try {
      const j = JSON.parse(readFileSync(SLUGS_PATH, "utf8"));
      if (Array.isArray(j.top) && j.top.length) return j.top;
    } catch { /* fallback */ }
  }
  return DEFAULT_SLUGS;
}

function runLH(url, formFactor) {
  const preset = formFactor === "desktop" ? "--preset=desktop" : "--form-factor=mobile";
  const tmp = `/tmp/lh-${formFactor}-${Date.now()}.json`;
  execSync(
    `npx -y lighthouse@12 "${url}" ${preset} --output=json --output-path=${tmp} --quiet --chrome-flags="--headless --no-sandbox --disable-dev-shm-usage"`,
    { stdio: ["ignore", "ignore", "inherit"] },
  );
  const r = JSON.parse(readFileSync(tmp, "utf8"));
  return {
    lcp: r.audits?.["largest-contentful-paint"]?.numericValue ?? null,
    bytes: r.audits?.["total-byte-weight"]?.numericValue ?? null,
    score: r.categories?.performance?.score ?? null,
  };
}

const main = async () => {
  const SLUGS = AUTO_SELECT ? await autoSelectSlugs() : loadSlugs();

  const current = {};
  for (const slug of SLUGS) {
    const url = `${BASE}/problemas/${slug}`;
    console.log(`\n▶ ${url}`);
    try {
      current[slug] = { mobile: runLH(url, "mobile"), desktop: runLH(url, "desktop") };
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
    return;
  }

  const baseline = JSON.parse(readFileSync(BASELINE_PATH, "utf8"));
  const MAX_LCP_REGRESSION_MS = Number(process.env.MAX_LCP_REGRESSION_MS || 400);
  const MAX_BYTES_REGRESSION_PCT = Number(process.env.MAX_BYTES_REGRESSION_PCT || 15);
  const regressions = [];
  const rowsData = [];

  for (const slug of SLUGS) {
    for (const ff of ["mobile", "desktop"]) {
      const a = baseline[slug]?.[ff] || {};
      const b = current[slug]?.[ff] || {};
      const dLcp = a.lcp != null && b.lcp != null ? b.lcp - a.lcp : null;
      const dBytesPct = a.bytes != null && b.bytes != null && a.bytes > 0
        ? ((b.bytes - a.bytes) / a.bytes) * 100 : null;
      rowsData.push({ slug, ff, a, b, dLcp, dBytesPct });

      if (dLcp != null && dLcp > MAX_LCP_REGRESSION_MS) {
        regressions.push({
          slug, ff, kind: "LCP",
          delta: `+${Math.round(dLcp)}ms`,
          limit: `${MAX_LCP_REGRESSION_MS}ms`,
          url: `${BASE}/problemas/${slug}`,
        });
      }
      if (dBytesPct != null && dBytesPct > MAX_BYTES_REGRESSION_PCT) {
        regressions.push({
          slug, ff, kind: "BYTES",
          delta: `+${dBytesPct.toFixed(1)}%`,
          limit: `${MAX_BYTES_REGRESSION_PCT}%`,
          url: `${BASE}/problemas/${slug}`,
        });
      }
    }
  }

  // --- Markdown -------------------------------------------------------------
  const fmt = (n) => (n == null ? "—" : Math.round(n).toLocaleString("pt-BR"));
  const delta = (n) => (n == null ? "—" : `${n >= 0 ? "+" : ""}${Math.round(n).toLocaleString("pt-BR")}`);
  const mdRows = ["| slug | form | LCP antes | LCP depois | Δ LCP | bytes antes | bytes depois | Δ bytes % |",
                  "|---|---|---:|---:|---:|---:|---:|---:|"];
  for (const r of rowsData) {
    mdRows.push(`| ${r.slug} | ${r.ff} | ${fmt(r.a.lcp)} | ${fmt(r.b.lcp)} | ${delta(r.dLcp)} | ${fmt(r.a.bytes)} | ${fmt(r.b.bytes)} | ${r.dBytesPct == null ? "—" : (r.dBytesPct >= 0 ? "+" : "") + r.dBytesPct.toFixed(1) + "%"} |`);
  }

  const suggestions = (kind) => kind === "LCP"
    ? "Otimize a imagem LCP (AVIF/WebP + preload), reduza JS bloqueante e defer de terceiros."
    : "Compacte imagens/vídeos, lazy-load abaixo da dobra, remova libs não usadas, ative code-split.";

  const summary = regressions.length
    ? `\n## ⚠️ Regressões acima do limite\n\n${regressions.map((r) =>
        `- **${r.slug}** [${r.ff}] ${r.kind} ${r.delta} (limite ${r.limit})\n  - ${r.url}\n  - Sugestão: ${suggestions(r.kind)}`
      ).join("\n")}\n`
    : `\n## ✓ Sem regressões acima do limite (LCP ≤ +${MAX_LCP_REGRESSION_MS}ms; bytes ≤ +${MAX_BYTES_REGRESSION_PCT}%)\n`;

  writeFileSync(REPORT_PATH,
    `# Lighthouse — 10 posts pesados (${new Date().toISOString()})\n\nBase: ${BASE}\n${summary}\n${mdRows.join("\n")}\n`);
  console.log(`\n✓ diff em ${REPORT_PATH}`);

  // --- HTML consolidado -----------------------------------------------------
  const maxAbsLcp = Math.max(1, ...rowsData.map((r) => Math.abs(r.dLcp ?? 0)));
  const maxAbsBytes = Math.max(1, ...rowsData.map((r) => Math.abs(r.dBytesPct ?? 0)));
  const bar = (val, max, color) => {
    if (val == null) return `<span style="color:#888">—</span>`;
    const w = Math.max(2, Math.min(100, (Math.abs(val) / max) * 100));
    const sign = val >= 0 ? "+" : "";
    return `<span style="display:inline-block;width:${w}px;height:10px;background:${color};vertical-align:middle;margin-right:6px;border-radius:2px"></span>${sign}${Math.round(val)}`;
  };

  const html = `<!doctype html><html lang="pt-BR"><meta charset="utf-8">
<title>Lighthouse — Heavy posts</title>
<style>
body{font:14px system-ui,sans-serif;max-width:1100px;margin:24px auto;padding:0 16px;color:#111}
h1{margin:0 0 8px}.muted{color:#666}
table{width:100%;border-collapse:collapse;margin-top:16px}
th,td{padding:6px 8px;border-bottom:1px solid #eee;text-align:left;vertical-align:middle}
th{background:#f7f7f9;position:sticky;top:0}
td.num{text-align:right;font-variant-numeric:tabular-nums}
.reg{background:#fff5f5}.ok{background:#f4fbf4}
.badge{display:inline-block;padding:2px 8px;border-radius:999px;font-size:12px;font-weight:600}
.b-fail{background:#fee;color:#a10}.b-ok{background:#efe;color:#161}
</style>
<h1>Lighthouse — 10 posts pesados</h1>
<div class="muted">${new Date().toISOString()} · base: ${BASE}</div>
<p>${regressions.length
  ? `<span class="badge b-fail">${regressions.length} regressão(ões)</span>`
  : `<span class="badge b-ok">Sem regressões</span>`}
  &nbsp;Limites: Δ LCP ≤ ${MAX_LCP_REGRESSION_MS}ms · Δ bytes ≤ ${MAX_BYTES_REGRESSION_PCT}%</p>
<table>
<thead><tr><th>Slug</th><th>Form</th><th>LCP antes</th><th>LCP depois</th><th>Δ LCP (ms)</th><th>Bytes antes</th><th>Bytes depois</th><th>Δ Bytes (%)</th></tr></thead>
<tbody>
${rowsData.map((r) => {
  const isReg = (r.dLcp != null && r.dLcp > MAX_LCP_REGRESSION_MS) ||
                (r.dBytesPct != null && r.dBytesPct > MAX_BYTES_REGRESSION_PCT);
  return `<tr class="${isReg ? "reg" : "ok"}">
    <td><a href="${BASE}/problemas/${r.slug}" target="_blank" rel="noopener">${r.slug}</a></td>
    <td>${r.ff}</td>
    <td class="num">${fmt(r.a.lcp)}</td><td class="num">${fmt(r.b.lcp)}</td>
    <td class="num">${bar(r.dLcp, maxAbsLcp, r.dLcp > 0 ? "#e33" : "#2a2")}</td>
    <td class="num">${fmt(r.a.bytes)}</td><td class="num">${fmt(r.b.bytes)}</td>
    <td class="num">${bar(r.dBytesPct, maxAbsBytes, r.dBytesPct > 0 ? "#e33" : "#2a2")}</td>
  </tr>`;
}).join("")}
</tbody></table>
${regressions.length ? `<h2>Regressões e sugestões</h2><ul>${regressions.map((r) =>
  `<li><strong>${r.slug}</strong> [${r.ff}] ${r.kind} ${r.delta} (limite ${r.limit}) — ${suggestions(r.kind)}</li>`
).join("")}</ul>` : ""}
</html>`;
  writeFileSync(HTML_PATH, html);
  console.log(`✓ relatório HTML em ${HTML_PATH}`);

  if (regressions.length) {
    console.error(`\n✗ ${regressions.length} regressão(ões):`);
    for (const r of regressions) {
      console.error(`  - ${r.slug} [${r.ff}] ${r.kind} ${r.delta} > ${r.limit}`);
      console.error(`      URL: ${r.url}`);
      console.error(`      Sugestão: ${suggestions(r.kind)}`);
    }
    if (process.env.LH_FAIL_ON_REGRESSION === "1") process.exit(1);
  }
};

main().catch((e) => { console.error(e); process.exit(1); });
