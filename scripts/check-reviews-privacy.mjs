#!/usr/bin/env node
/**
 * Gate de privacidade das reviews (teste de integração contra o backend real,
 * usando SOMENTE a chave anon/pública — exatamente o que um visitante teria).
 *
 * Confirma, a cada CI/scan agendado:
 *  1. SELECT de client_phone → permission denied (42501) ou coluna inexistente (42703)
 *  2. SELECT de client_contact → idem
 *  3. SELECT * → se retornar linhas, nenhuma pode conter chaves sensíveis
 *  4. View public_reviews (se exposta) → sem chaves sensíveis
 *  5. RPCs públicos de status (consultar_os*) → rejeitam entrada inválida (4xx)
 *
 * Env: SUPABASE_URL + SUPABASE_ANON_KEY (ou VITE_SUPABASE_URL /
 * VITE_SUPABASE_PUBLISHABLE_KEY, ou arquivo .env local).
 *
 * Exit 1 = vazamento ou permissão indevida → bloqueia o pipeline.
 */
import { readFileSync, existsSync } from "node:fs";

const SENSITIVE_COLUMNS = ["client_phone", "client_contact"];
const PERMISSION_CODES = new Set(["42501", "42703", "PGRST301"]);

function loadEnv() {
  const env = { ...process.env };
  if (existsSync(".env")) {
    for (const line of readFileSync(".env", "utf8").split("\n")) {
      const m = line.match(/^([A-Z_]+)=(.*)$/);
      if (m && !env[m[1]]) env[m[1]] = m[2].trim().replace(/^["']|["']$/g, "");
    }
  }
  return env;
}

const env = loadEnv();
const BASE = env.SUPABASE_URL || env.VITE_SUPABASE_URL;
const KEY = env.SUPABASE_ANON_KEY || env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!BASE || !KEY) {
  console.error("[reviews-privacy] SUPABASE_URL/ANON_KEY ausentes — configure os secrets no CI.");
  process.exit(1);
}

const headers = { apikey: KEY, Authorization: `Bearer ${KEY}`, "Content-Type": "application/json" };

const failures = [];
const notes = [];
const ok = (msg) => console.log(`  ✔ ${msg}`);
const fail = (msg) => {
  failures.push(msg);
  console.error(`  ✗ ${msg}`);
};
const note = (msg) => {
  notes.push(msg);
  console.log(`  • ${msg}`);
};

async function api(path, init = {}) {
  const res = await fetch(`${BASE}/rest/v1${path}`, { headers, ...init });
  let body = null;
  try {
    body = await res.json();
  } catch {
    body = null;
  }
  return { status: res.status, body };
}

const containsSensitiveKeys = (rows) =>
  Array.isArray(rows) &&
  rows.some((row) => row && typeof row === "object" && SENSITIVE_COLUMNS.some((c) => c in row));

async function checkColumnBlocked(column) {
  const { status, body } = await api(`/reviews?select=${column}&limit=1`);
  if (status >= 200 && status < 300) {
    fail(`anon conseguiu ler reviews.${column} (HTTP ${status}) — grant indevido!`);
    return;
  }
  const code = body?.code ?? "";
  const msg = String(body?.message ?? "");
  if (PERMISSION_CODES.has(code) || /permission denied/i.test(msg)) {
    ok(`reviews.${column} bloqueado para anon (HTTP ${status}, code ${code || "n/a"})`);
  } else {
    // 4xx por outro motivo ainda significa "não vazou", mas queremos saber por quê.
    note(`reviews.${column} retornou HTTP ${status} (${code || msg}) — sem vazamento, mas valide o motivo.`);
  }
}

async function checkSelectAll() {
  const { status, body } = await api(`/reviews?select=*&limit=5`);
  if (status >= 400) {
    ok(`SELECT * em reviews negado para anon (HTTP ${status}) — tabela totalmente protegida`);
    return;
  }
  if (containsSensitiveKeys(body)) {
    fail(`SELECT * em reviews expõe client_phone/client_contact para anon!`);
  } else {
    ok(`SELECT * em reviews retorna somente colunas públicas (${Array.isArray(body) ? body.length : 0} linha(s) amostradas)`);
  }
}

async function checkPublicView() {
  const { status, body } = await api(`/public_reviews?select=*&limit=5`);
  if (status >= 400) {
    note(`view public_reviews não exposta (HTTP ${status}) — proteção está na tabela base`);
    return;
  }
  if (containsSensitiveKeys(body)) {
    fail(`view public_reviews expõe client_phone/client_contact!`);
  } else {
    ok(`view public_reviews sem colunas sensíveis`);
  }
}

async function checkRpcRejectsBadInput(name, payload) {
  const { status, body } = await api(`/rpc/${name}`, { method: "POST", body: JSON.stringify(payload) });
  if (status >= 400) {
    ok(`rpc ${name} rejeita entrada inválida (HTTP ${status})`);
    return;
  }
  const empty = Array.isArray(body) && body.length === 0;
  const leaked = containsSensitiveKeys(body) || (body && typeof body === "object" && SENSITIVE_COLUMNS.some((c) => c in body));
  if (leaked) {
    fail(`rpc ${name} vazou colunas sensíveis com entrada inválida!`);
  } else if (empty || body === null) {
    ok(`rpc ${name} com entrada inválida retornou vazio (HTTP ${status})`);
  } else {
    note(`rpc ${name} aceitou entrada inválida (HTTP ${status}) — revise validação server-side.`);
  }
}

console.log("[reviews-privacy] Testando API pública com chave anon…\n");
await checkColumnBlocked("client_phone");
await checkColumnBlocked("client_contact");
await checkSelectAll();
await checkPublicView();
await checkRpcRejectsBadInput("consultar_os", { p_codigo: "__gate__", p_telefone: "0" });
await checkRpcRejectsBadInput("consultar_os_por_telefone", { p_telefone: "0" });

console.log("");
if (failures.length > 0) {
  console.error(`[reviews-privacy] FALHOU — ${failures.length} problema(s):`);
  for (const f of failures) console.error(`  - ${f}`);
  process.exit(1);
}
console.log(`[reviews-privacy] OK — client_phone/client_contact seguem bloqueados para anon ✔ (${notes.length} nota(s))`);
