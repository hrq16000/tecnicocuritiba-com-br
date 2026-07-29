#!/usr/bin/env node
/**
 * CI check: valida infra do IndexNow.
 *  1. Chave `public/<KEY>.txt` existe e contém apenas a KEY.
 *  2. Edge function `indexnow-ping` (GET) responde 200 quando SUPABASE_URL
 *     estiver disponível — soft-fail se não estiver (permite rodar em PRs
 *     sem acesso ao backend).
 *  3. Se algum sitemap-*.xml em public/ mudou em relação ao último commit,
 *     dispara um ping simulado (ou real quando URL disponível) para o
 *     sitemap-index e reporta o resultado.
 */
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

const HOST = "tecnicocuritiba.com.br";
const KEY = "f783ab585dfa9e6b017cb058009cccae";
const KEY_FILE = path.join(process.cwd(), "public", `${KEY}.txt`);

let failed = 0;
const log = (ok, msg) => { console.log(`${ok ? "✓" : "✗"} ${msg}`); if (!ok) failed++; };

// 1) Verifica arquivo da chave
try {
  const content = fs.readFileSync(KEY_FILE, "utf8").trim();
  log(content === KEY, `arquivo de chave public/${KEY}.txt contém a chave correta`);
} catch (e) {
  log(false, `arquivo public/${KEY}.txt ausente (${e.message})`);
}

// 2) Detecta mudança em sitemaps para decidir se pinga
let sitemapsChanged = false;
try {
  const diff = execSync("git diff --name-only HEAD~1 HEAD -- public/sitemap*.xml", {
    encoding: "utf8",
  }).trim();
  sitemapsChanged = diff.length > 0;
  if (sitemapsChanged) console.log(`  sitemaps modificados: ${diff.split("\n").length}`);
} catch {
  // Sem histórico (shallow clone) — assume mudança para não silenciar.
  sitemapsChanged = true;
}

// 3) Ping (edge function e/ou Google/Bing)
const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const ANON = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (sitemapsChanged && SUPABASE_URL && ANON) {
  try {
    const r = await fetch(`${SUPABASE_URL}/functions/v1/indexnow-ping`, {
      method: "GET",
      headers: { Authorization: `Bearer ${ANON}`, apikey: ANON },
    });
    const body = await r.text();
    log(r.ok, `edge function indexnow-ping GET → ${r.status} (${body.slice(0, 80)})`);
  } catch (e) {
    log(false, `edge function indexnow-ping GET falhou: ${e.message}`);
  }
} else if (sitemapsChanged) {
  console.log("  (edge function não testada — SUPABASE_URL/ANON ausentes; soft-skip)");
}

if (sitemapsChanged) {
  const sitemapUrl = `https://${HOST}/sitemap.xml`;
  try {
    const r = await fetch(`https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`);
    log(r.ok || r.status === 404, `Google ping (sitemap): HTTP ${r.status}`);
  } catch (e) {
    log(false, `Google ping falhou: ${e.message}`);
  }
}

process.exit(failed > 0 ? 1 : 0);
