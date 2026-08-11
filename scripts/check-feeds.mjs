#!/usr/bin/env node
/**
 * Gate de feeds e sitemaps.
 *
 * Local (padrão): valida os arquivos em public/ — existência, XML bem-formado,
 * datas parseáveis, sem datas no futuro e coerência entre rss.xml/atom.xml.
 * Produção: BASE_URL=https://tecnicocuritiba.com.br node scripts/check-feeds.mjs
 * também exige HTTP 200 e Content-Type XML para cada arquivo.
 */
import fs from "node:fs";
import path from "node:path";

const FILES = ["sitemap.xml", "sitemap-index.xml", "rss.xml", "atom.xml"];
const PUBLIC_DIR = path.resolve("public");
const BASE = (process.env.BASE_URL || "").replace(/\/$/, "");
const errors = [];
const warnings = [];
const NOW = Date.now();
const FUTURE_TOLERANCE_MS = 36 * 60 * 60 * 1000; // fuso + build

const read = (f) => fs.readFileSync(path.join(PUBLIC_DIR, f), "utf8");

function checkWellFormed(file, xml) {
  if (!xml.trimStart().startsWith("<?xml")) errors.push(`${file}: sem declaração XML`);
  const opens = (xml.match(/<[a-zA-Z][^>\/]*[^\/]>/g) || []).length;
  const closes = (xml.match(/<\/[a-zA-Z][^>]*>/g) || []).length;
  if (opens !== closes) {
    errors.push(`${file}: tags abertas (${opens}) diferem das fechadas (${closes})`);
  }
}

function parseDates(file, xml, re, label) {
  const dates = [...xml.matchAll(re)].map((m) => m[1].trim());
  if (dates.length === 0) errors.push(`${file}: nenhuma data <${label}> encontrada`);
  for (const d of dates) {
    const t = Date.parse(d);
    if (Number.isNaN(t)) {
      errors.push(`${file}: data inválida em <${label}>: "${d}"`);
      continue;
    }
    if (t > NOW + FUTURE_TOLERANCE_MS) {
      errors.push(`${file}: data no futuro em <${label}>: "${d}"`);
    }
  }
  return dates;
}

// 1) Arquivos presentes e bem-formados
for (const f of FILES) {
  const full = path.join(PUBLIC_DIR, f);
  if (!fs.existsSync(full)) {
    errors.push(`AUSENTE: public/${f}`);
    continue;
  }
  checkWellFormed(f, read(full === full ? f : f));
}
if (errors.length === 0) {
  // 2) Datas dos sitemaps
  for (const f of ["sitemap.xml", "sitemap-index.xml"]) {
    parseDates(f, read(f), /<lastmod>([^<]+)<\/lastmod>/g, "lastmod");
  }

  // 3) RSS
  const rss = read("rss.xml");
  parseDates("rss.xml", rss, /<lastBuildDate>([^<]+)<\/lastBuildDate>/g, "lastBuildDate");
  const pubDates = parseDates("rss.xml", rss, /<pubDate>([^<]+)<\/pubDate>/g, "pubDate");
  const rssItems = (rss.match(/<item>/g) || []).length;
  if (rssItems === 0) errors.push("rss.xml: nenhum <item>");
  if (pubDates.length !== rssItems) {
    errors.push(`rss.xml: ${rssItems} itens mas ${pubDates.length} pubDate`);
  }

  // 4) Atom
  const atom = read("atom.xml");
  const updated = parseDates("atom.xml", atom, /<updated>([^<]+)<\/updated>/g, "updated");
  const atomEntries = (atom.match(/<entry>/g) || []).length;
  if (atomEntries === 0) errors.push("atom.xml: nenhum <entry>");
  if (atomEntries !== rssItems) {
    errors.push(`Divergência: rss.xml tem ${rssItems} itens e atom.xml tem ${atomEntries} entries`);
  }

  // 5) Coerência: feed atualizado depois do post mais recente
  const newestPost = Math.max(...pubDates.map((d) => Date.parse(d)).filter((n) => !Number.isNaN(n)));
  const feedUpdated = Math.max(...updated.map((d) => Date.parse(d)).filter((n) => !Number.isNaN(n)));
  if (Number.isFinite(newestPost) && Number.isFinite(feedUpdated) && feedUpdated + 1000 < newestPost) {
    errors.push("atom.xml: <updated> do feed é anterior ao post mais recente do rss.xml");
  }
}

// 6) HTTP (opcional, quando BASE_URL é informado)
if (BASE) {
  await Promise.all(
    FILES.map(async (f) => {
      const url = `${BASE}/${f}`;
      try {
        const res = await fetch(url, { redirect: "manual", headers: { "user-agent": "feeds-gate/1.0" } });
        if (res.status !== 200) {
          errors.push(`HTTP ${res.status}: ${url}`);
          return;
        }
        const ct = res.headers.get("content-type") || "";
        if (!/xml/i.test(ct)) warnings.push(`Content-Type inesperado em ${url}: "${ct}"`);
      } catch (err) {
        errors.push(`REDE: ${url} → ${err.message}`);
      }
    }),
  );
}

for (const w of warnings) console.warn(`⚠️  ${w}`);
if (errors.length) {
  console.error("\n❌ check:feeds falhou:");
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}
console.log(`✅ check:feeds OK (${FILES.join(", ")}${BASE ? ` @ ${BASE}` : " — local"})`);
