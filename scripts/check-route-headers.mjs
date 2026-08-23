#!/usr/bin/env node
/**
 * Gate de headers de segurança por rota crítica (live check).
 *
 * Valida em CADA rota crítica do site publicado:
 *  - HTTP 200 (após redirects)
 *  - Strict-Transport-Security com max-age >= 1 ano
 *  - Referrer-Policy: strict-origin-when-cross-origin
 *  - X-Content-Type-Options: nosniff
 *  - Sem X-Powered-By (information disclosure)
 *  - CSP e X-Frame-Options: validados quando presentes. Se ausentes, viram
 *    WARNING — a hospedagem atual não emite esses dois headers (a fonte de
 *    verdade deles é public/_headers, protegida por check-security-headers.ts).
 *    Para exigir os dois ao vivo (ex.: migração para host que honre _headers),
 *    rode com STRICT_EXTRAS=1.
 *
 * Env: BASE_URL (default https://tecnicocuritiba.com.br)
 *      STRICT_EXTRAS=1 → CSP/XFO ausentes viram falha
 *
 * Exit 1 = qualquer header obrigatório fora do padrão.
 */
const BASE_URL = (process.env.BASE_URL || "https://tecnicocuritiba.com.br").replace(/\/$/, "");
const STRICT_EXTRAS = process.env.STRICT_EXTRAS === "1";

const CRITICAL_ROUTES = (
  process.env.ROUTES?.split(",").map((r) => r.trim()).filter(Boolean) || [
    "/",
    "/servicos",
    "/servicos/formatacao-computador",
    "/como-funciona",
    "/areas-atendidas",
    "/avaliacoes",
    "/status-os",
    "/contato",
    "/faq",
    "/blog",
  ]
);

const failures = [];
const warnings = [];

async function checkRoute(route) {
  const url = `${BASE_URL}${route}`;
  let res;
  try {
    res = await fetch(url, { redirect: "follow" });
  } catch (e) {
    failures.push(`${route}: fetch falhou — ${e.message}`);
    return;
  }
  const h = res.headers;
  const tag = `${route} [${res.status}]`;

  if (res.status !== 200) {
    failures.push(`${tag}: esperado HTTP 200`);
    return;
  }

  // HSTS
  const hsts = h.get("strict-transport-security") || "";
  const maxAge = Number(hsts.match(/max-age=(\d+)/i)?.[1] ?? 0);
  if (maxAge < 31536000) {
    failures.push(`${tag}: HSTS ausente ou max-age < 1 ano ("${hsts || "—"}")`);
  }

  // Referrer-Policy
  const ref = (h.get("referrer-policy") || "").toLowerCase();
  if (ref !== "strict-origin-when-cross-origin") {
    failures.push(`${tag}: Referrer-Policy fora do padrão ("${ref || "—"}")`);
  }

  // X-Content-Type-Options
  if ((h.get("x-content-type-options") || "").toLowerCase() !== "nosniff") {
    failures.push(`${tag}: X-Content-Type-Options != nosniff`);
  }

  // Information disclosure
  if (h.get("x-powered-by")) {
    failures.push(`${tag}: header X-Powered-By exposto ("${h.get("x-powered-by")}")`);
  }

  // CSP / XFO — valida valor quando presentes; ausência é warning (host atual
  // não emite) ou falha com STRICT_EXTRAS=1.
  const csp = h.get("content-security-policy");
  if (csp) {
    for (const directive of ["default-src", "frame-ancestors", "object-src"]) {
      if (!csp.includes(directive)) failures.push(`${tag}: CSP sem diretiva ${directive}`);
    }
  } else {
    const msg = `${tag}: sem CSP no response (hospedagem não emite; garantido em public/_headers)`;
    (STRICT_EXTRAS ? failures : warnings).push(msg);
  }

  const xfo = (h.get("x-frame-options") || "").toUpperCase();
  if (xfo) {
    if (!["DENY", "SAMEORIGIN"].includes(xfo)) failures.push(`${tag}: X-Frame-Options inválido ("${xfo}")`);
  } else {
    const msg = `${tag}: sem X-Frame-Options no response (hospedagem não emite; garantido em public/_headers)`;
    (STRICT_EXTRAS ? failures : warnings).push(msg);
  }

  console.log(`  ✔ ${tag} headers obrigatórios OK`);
}

console.log(`[route-headers] Validando ${CRITICAL_ROUTES.length} rota(s) críticas em ${BASE_URL}${STRICT_EXTRAS ? " (STRICT_EXTRAS)" : ""}…\n`);
for (const route of CRITICAL_ROUTES) {
  await checkRoute(route);
}

if (warnings.length > 0) {
  console.log(`\n[route-headers] ${warnings.length} aviso(s) (não bloqueiam):`);
  for (const w of [...new Set(warnings)]) console.log(`  • ${w}`);
}
if (failures.length > 0) {
  console.error(`\n[route-headers] FALHOU — ${failures.length} problema(s):`);
  for (const f of failures) console.error(`  ✗ ${f}`);
  process.exit(1);
}
console.log(`\n[route-headers] OK — headers de segurança dentro do padrão em todas as rotas críticas ✔`);
