#!/usr/bin/env node
/**
 * Monitoramento contínuo de SEO (gate de CI + execução manual contra produção).
 *
 * Verifica, para TODAS as URLs dos sitemaps:
 *  1. 404 / 5xx        → erro
 *  2. Redirects (3xx)  → erro (URL do sitemap deve ser a final)
 *  3. Canônico         → deve auto-referenciar a própria URL
 *  4. noindex          → conflito se a URL está no sitemap
 *  5. Duplicatas       → mesma <loc> em mais de um sitemap
 *  6. Diff de sitemap  → compara com o snapshot em docs/seo/sitemap-snapshot.json
 *
 * Uso:
 *   node scripts/check-seo-monitor.mjs                       # contra http://localhost:4173
 *   BASE_URL=https://tecnicocuritiba.com.br node scripts/check-seo-monitor.mjs
 *   node scripts/check-seo-monitor.mjs --update-snapshot
 */
import fs from "node:fs";
import path from "node:path";

const SITE = "https://tecnicocuritiba.com.br";
const BASE = (process.env.BASE_URL || "http://localhost:4173").replace(/\/$/, "");
const UPDATE = process.argv.includes("--update-snapshot");
const CONCURRENCY = Number(process.env.SEO_MONITOR_CONCURRENCY || 12);
const SNAPSHOT = path.resolve("docs/seo/sitemap-snapshot.json");
const PUBLIC_DIR = path.resolve("public");

const errors = [];
const warnings = [];

/** Lê todas as <loc> dos sitemaps em public/, detectando duplicatas. */
function collectUrls() {
  const files = fs
    .readdirSync(PUBLIC_DIR)
    .filter((f) => /^sitemap.*\.xml$/.test(f))
    .sort();
  const seen = new Map();
  for (const file of files) {
    const xml = fs.readFileSync(path.join(PUBLIC_DIR, file), "utf8");
    const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
    for (const loc of locs) {
      if (/sitemap[\w-]*\.xml$/.test(loc)) continue; // entradas de sitemapindex
      if (!seen.has(loc)) seen.set(loc, []);
      seen.get(loc).push(file);
    }
  }
  for (const [loc, inFiles] of seen) {
    if (inFiles.length > 1) errors.push(`DUPLICADA: ${loc} aparece em ${inFiles.join(", ")}`);
  }
  return { files, urls: [...seen.keys()] };
}

function toTarget(loc) {
  return loc.startsWith(SITE) ? BASE + loc.slice(SITE.length) : loc;
}

const IS_LOCAL = /^https?:\/\/(localhost|127\.0\.0\.1)/.test(BASE);
const DIST = path.resolve("dist");

/**
 * `vite preview` aplica fallback de SPA e nunca serve dist/<rota>/index.html.
 * A hospedagem de produção serve. Então, em base local, lemos o arquivo estático
 * quando ele existe — HTTP continua validando status/redirect.
 */
function localPrerendered(loc) {
  if (!IS_LOCAL) return null;
  const route = loc.slice(SITE.length).replace(/\/$/, "");
  const file = path.join(DIST, ...route.split("/").filter(Boolean), "index.html");
  return fs.existsSync(file) ? fs.readFileSync(file, "utf8") : null;
}

async function checkUrl(loc) {
  const target = toTarget(loc);
  let res;
  try {
    res = await fetch(target, { redirect: "manual", headers: { "user-agent": "seo-monitor/1.0" } });
  } catch (err) {
    errors.push(`REDE: ${loc} → ${err.message}`);
    return;
  }
  if (res.status >= 300 && res.status < 400) {
    errors.push(`REDIRECT ${res.status}: ${loc} → ${res.headers.get("location")}`);
    return;
  }
  if (res.status === 404) {
    errors.push(`404: ${loc}`);
    return;
  }
  if (!res.ok) {
    errors.push(`STATUS ${res.status}: ${loc}`);
    return;
  }
  const served = await res.text();
  const html = localPrerendered(loc) ?? served;


  const robots = html.match(/<meta[^>]+name=["']robots["'][^>]*content=["']([^"']+)["']/i)?.[1] || "";
  if (/noindex/i.test(robots)) {
    errors.push(`NOINDEX no sitemap: ${loc} (robots="${robots}")`);
  }

  const canonical = html.match(/<link[^>]+rel=["']canonical["'][^>]*href=["']([^"']+)["']/i)?.[1];
  if (!canonical) {
    warnings.push(`SEM CANONICAL: ${loc}`);
  } else {
    const norm = (u) => u.replace(/\/$/, "").replace(BASE, SITE);
    if (norm(canonical) !== norm(loc)) {
      errors.push(`CANONICAL divergente: ${loc} aponta para ${canonical}`);
    }
  }
}

async function runPool(items, worker) {
  let i = 0;
  await Promise.all(
    Array.from({ length: Math.min(CONCURRENCY, items.length) }, async () => {
      while (i < items.length) {
        const item = items[i++];
        await worker(item);
      }
    }),
  );
}

function diffSnapshot(urls) {
  const current = { count: urls.length, urls: [...urls].sort() };
  if (UPDATE || !fs.existsSync(SNAPSHOT)) {
    fs.mkdirSync(path.dirname(SNAPSHOT), { recursive: true });
    fs.writeFileSync(SNAPSHOT, JSON.stringify(current, null, 2) + "\n");
    console.log(`[seo-monitor] snapshot gravado (${current.count} URLs)`);
    return;
  }
  const prev = JSON.parse(fs.readFileSync(SNAPSHOT, "utf8"));
  const prevSet = new Set(prev.urls);
  const currSet = new Set(current.urls);
  const removed = prev.urls.filter((u) => !currSet.has(u));
  const added = current.urls.filter((u) => !prevSet.has(u));
  if (removed.length) {
    errors.push(
      `SITEMAP: ${removed.length} URL(s) removida(s) do sitemap — confirme redirect 301 e rode --update-snapshot:\n   ` +
        removed.slice(0, 15).join("\n   "),
    );
  }
  if (added.length) {
    console.log(`[seo-monitor] ${added.length} URL(s) nova(s) no sitemap:`);
    added.slice(0, 15).forEach((u) => console.log("   + " + u));
    console.log("   (rode `bun run check:seo-monitor -- --update-snapshot` para aceitar)");
  }
}

(async () => {
  const { files, urls } = collectUrls();
  console.log(`[seo-monitor] ${files.length} sitemaps, ${urls.length} URLs únicas | base=${BASE}`);

  diffSnapshot(urls);

  if (process.env.SEO_MONITOR_SKIP_HTTP !== "1") {
    await runPool(urls, checkUrl);
  }

  if (warnings.length) {
    console.log(`\n[seo-monitor] ${warnings.length} aviso(s):`);
    warnings.slice(0, 30).forEach((w) => console.log("  ! " + w));
  }
  if (errors.length) {
    console.error(`\n[seo-monitor] ${errors.length} ERRO(S):`);
    errors.slice(0, 60).forEach((e) => console.error("  ✗ " + e));
    process.exit(1);
  }
  console.log("\n[seo-monitor] OK — sem 404, redirects, noindex ou canônicos divergentes.");
})();
