#!/usr/bin/env node
/**
 * Guard de Core Web Vitals — bloqueia publicação quando LCP/CLS/INP (ou TBT)
 * pioram além do limite definido, comparando com .lighthouse-baseline.json
 * quando disponível e com tetos absolutos sempre.
 *
 * Uso: node scripts/check-cwv-guard.mjs .lighthouseci .lighthouseci-mobile
 */
import { promises as fs } from "node:fs";
import path from "node:path";

const DIRS = process.argv.slice(2).length ? process.argv.slice(2) : [".lighthouseci", ".lighthouseci-mobile"];

// Tetos absolutos por form factor (desktop / mobile).
const HARD_LIMITS = {
  desktop: { lcp: 2500, cls: 0.1, inp: 200, tbt: 300 },
  mobile: { lcp: 3500, cls: 0.1, inp: 300, tbt: 600 },
};

// Regressão máxima tolerada frente ao baseline.
const MAX_REGRESSION = { lcp: 0.15, cls: 0.02, inp: 0.15, tbt: 0.2 };

const readJson = async (f) => JSON.parse(await fs.readFile(f, "utf8"));

async function loadBaseline() {
  try {
    return await readJson(".lighthouse-baseline.json");
  } catch {
    return null;
  }
}

async function collect(dir) {
  let files;
  try {
    files = (await fs.readdir(dir)).filter((f) => f.startsWith("lhr-") && f.endsWith(".json"));
  } catch {
    return [];
  }
  const out = [];
  for (const f of files) {
    try {
      const lhr = await readJson(path.join(dir, f));
      const a = lhr.audits || {};
      out.push({
        url: lhr.finalUrl || lhr.requestedUrl,
        formFactor: lhr.configSettings?.formFactor === "mobile" ? "mobile" : "desktop",
        lcp: a["largest-contentful-paint"]?.numericValue ?? null,
        cls: a["cumulative-layout-shift"]?.numericValue ?? null,
        inp: a["interaction-to-next-paint"]?.numericValue ?? a["experimental-interaction-to-next-paint"]?.numericValue ?? null,
        tbt: a["total-blocking-time"]?.numericValue ?? null,
      });
    } catch {
      /* ignora relatório corrompido */
    }
  }
  return out;
}

const baseline = await loadBaseline();
const runs = (await Promise.all(DIRS.map(collect))).flat();

if (!runs.length) {
  console.error("✗ Nenhum relatório Lighthouse encontrado em:", DIRS.join(", "));
  process.exit(1);
}

const failures = [];
const fmt = (v, k) => (v == null ? "n/d" : k === "cls" ? v.toFixed(3) : `${Math.round(v)}ms`);

for (const run of runs) {
  const limits = HARD_LIMITS[run.formFactor];
  const key = new URL(run.url).pathname;
  const base = baseline?.[run.formFactor]?.[key] ?? baseline?.[key] ?? null;

  for (const metric of ["lcp", "cls", "inp", "tbt"]) {
    const value = run[metric];
    if (value == null) continue;

    if (value > limits[metric]) {
      failures.push(`${run.formFactor} ${key}: ${metric.toUpperCase()} ${fmt(value, metric)} > teto ${fmt(limits[metric], metric)}`);
      continue;
    }
    const prev = base?.[metric];
    if (typeof prev === "number" && prev > 0) {
      const allowed = metric === "cls" ? prev + MAX_REGRESSION.cls : prev * (1 + MAX_REGRESSION[metric]);
      if (value > allowed) {
        failures.push(
          `${run.formFactor} ${key}: ${metric.toUpperCase()} regrediu ${fmt(value, metric)} vs baseline ${fmt(prev, metric)} (máx ${fmt(allowed, metric)})`,
        );
      }
    }
  }
  console.log(
    `• ${run.formFactor} ${key} — LCP ${fmt(run.lcp, "lcp")} · CLS ${fmt(run.cls, "cls")} · INP ${fmt(run.inp, "inp")} · TBT ${fmt(run.tbt, "tbt")}`,
  );
}

if (failures.length) {
  console.error(`\n✗ Guard de Core Web Vitals bloqueou a publicação (${failures.length} regressões):`);
  for (const f of failures) console.error(`  - ${f}`);
  process.exit(1);
}
console.log("\n✓ Core Web Vitals dentro dos limites (tetos absolutos + regressão vs baseline).");
