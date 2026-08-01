#!/usr/bin/env node
/**
 * IndexNow ping helper.
 * Lê todas as URLs dos sitemaps em public/ e dispara POSTs em lote para o
 * endpoint IndexNow (Bing/Yandex/Seznam), com retry + backoff exponencial
 * e logs detalhados por tentativa.
 *
 * Uso: INDEXNOW_KEY=xxx node scripts/indexnow-ping.mjs
 * Flags via env:
 *   INDEXNOW_HOST      (default tecnicocuritiba.com.br)
 *   INDEXNOW_RETRIES   (default 4 tentativas)
 *   INDEXNOW_BATCH     (default 1000 URLs por request)
 *   INDEXNOW_DRY_RUN   ("1" apenas loga o payload)
 */
import { readdirSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const HOST = process.env.INDEXNOW_HOST || "tecnicocuritiba.com.br";
const KEY = process.env.INDEXNOW_KEY;
const ENDPOINT = "https://api.indexnow.org/IndexNow";
const MAX_RETRIES = Number(process.env.INDEXNOW_RETRIES || 4);
const BATCH_SIZE = Number(process.env.INDEXNOW_BATCH || 1000);
const DRY_RUN = process.env.INDEXNOW_DRY_RUN === "1";

const ts = () => new Date().toISOString();
const log = (msg) => console.log(`[indexnow ${ts()}] ${msg}`);
const warn = (msg) => console.warn(`[indexnow ${ts()}] ${msg}`);
const err = (msg) => console.error(`[indexnow ${ts()}] ${msg}`);

if (!KEY) {
  warn("INDEXNOW_KEY não definido — pulando ping (sem erro).");
  process.exit(0);
}

function extractUrlsFromSitemap(xml) {
  return Array.from(xml.matchAll(/<loc>([^<]+)<\/loc>/g), (m) => m[1].trim()).filter((u) =>
    u.includes(HOST),
  );
}

const publicDir = resolve(process.cwd(), "public");
const sitemaps = readdirSync(publicDir).filter((f) => f.startsWith("sitemap") && f.endsWith(".xml"));
const urls = new Set();
for (const f of sitemaps) {
  try {
    const found = extractUrlsFromSitemap(readFileSync(resolve(publicDir, f), "utf8"));
    found.forEach((u) => urls.add(u));
    log(`${f}: ${found.length} URLs`);
  } catch (e) {
    warn(`falha ao ler ${f}: ${e.message}`);
  }
}

const urlList = Array.from(urls).filter((u) => !/\/sitemap[^/]*\.xml$/.test(u));
if (urlList.length === 0) {
  warn("nenhuma URL encontrada nos sitemaps.");
  process.exit(0);
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/** 429 e 5xx são transitórios; 4xx restantes são definitivos. */
const isTransient = (status) => status === 408 || status === 429 || status >= 500;

async function postBatch(batch, label) {
  const payload = {
    host: HOST,
    key: KEY,
    keyLocation: `https://${HOST}/${KEY}.txt`,
    urlList: batch,
  };

  if (DRY_RUN) {
    log(`[dry-run] ${label} — ${batch.length} URLs (ex.: ${batch[0]})`);
    return true;
  }

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    const started = Date.now();
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify(payload),
      });
      const ms = Date.now() - started;
      if (res.ok) {
        log(`${label} OK ${res.status} ${res.statusText} — ${batch.length} URLs em ${ms}ms (tentativa ${attempt})`);
        return true;
      }
      const body = await res.text().catch(() => "");
      const msg = `${label} FALHA ${res.status} ${res.statusText} em ${ms}ms (tentativa ${attempt}/${MAX_RETRIES}) — ${body.slice(0, 400)}`;
      if (!isTransient(res.status)) {
        err(`${msg} [erro definitivo, sem retry]`);
        return false;
      }
      warn(msg);
    } catch (e) {
      warn(`${label} erro de rede (tentativa ${attempt}/${MAX_RETRIES}): ${e.message}`);
    }

    if (attempt < MAX_RETRIES) {
      const backoff = Math.min(30000, 1000 * 2 ** (attempt - 1)) + Math.floor(Math.random() * 500);
      log(`${label} aguardando ${backoff}ms antes do retry...`);
      await sleep(backoff);
    }
  }
  err(`${label} esgotou ${MAX_RETRIES} tentativas — ${batch.length} URLs não confirmadas`);
  return false;
}

const batches = [];
for (let i = 0; i < urlList.length; i += BATCH_SIZE) batches.push(urlList.slice(i, i + BATCH_SIZE));

log(`enviando ${urlList.length} URLs em ${batches.length} lote(s) para ${HOST}`);

let failed = 0;
for (let i = 0; i < batches.length; i++) {
  const ok = await postBatch(batches[i], `lote ${i + 1}/${batches.length}`);
  if (!ok) failed++;
}

if (failed > 0) {
  err(`${failed}/${batches.length} lote(s) falharam após retries.`);
  process.exit(1);
}
log(`concluído: ${urlList.length} URLs confirmadas em ${batches.length} lote(s).`);
