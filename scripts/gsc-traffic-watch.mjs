#!/usr/bin/env node
/**
 * Watch de tráfego do Search Console (alerta de queda).
 *
 * Compara os últimos 7 dias completos com os 7 dias anteriores via Search
 * Analytics API (gateway Lovable) e FALHA (exit 1) quando cliques ou
 * impressões caem mais que DROP_THRESHOLD_PCT (default 30%). No workflow
 * agendado (gsc-watch.yml), a falha abre uma issue de alerta no repositório.
 *
 * Nota: o Search Console não expõe API para configurar alertas nativos de
 * queda de tráfego — este job agendado é o mecanismo de alerta do projeto.
 *
 * Env:
 *   LOVABLE_API_KEY + GOOGLE_SEARCH_CONSOLE_API_KEY  (secrets do repositório)
 *   GSC_SITE_URL        (default sc-domain:tecnicocuritiba.com.br)
 *   DROP_THRESHOLD_PCT  (default 30)
 *
 * Sem os secrets: pula com exit 0 (uso local/dev).
 */
const LOVABLE_API_KEY = process.env.LOVABLE_API_KEY;
const CONNECTION_KEY = process.env.GOOGLE_SEARCH_CONSOLE_API_KEY;
const SITE_URL = process.env.GSC_SITE_URL || "sc-domain:tecnicocuritiba.com.br";
const THRESHOLD = Number(process.env.DROP_THRESHOLD_PCT || 30);
const GATEWAY = "https://connector-gateway.lovable.dev/google_search_console";

if (!LOVABLE_API_KEY || !CONNECTION_KEY) {
  console.log(
    "[gsc-traffic] LOVABLE_API_KEY/GOOGLE_SEARCH_CONSOLE_API_KEY ausentes — " +
      "pulando (configure os secrets no GitHub para ativar o alerta diário)."
  );
  process.exit(0);
}

const fmt = (d) => d.toISOString().slice(0, 10);
const daysAgo = (n) => {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - n);
  return d;
};
// Dados do GSC têm lag de ~2 dias: último dia confiável = hoje-3.
const cur = { start: fmt(daysAgo(9)), end: fmt(daysAgo(3)) };
const prev = { start: fmt(daysAgo(16)), end: fmt(daysAgo(10)) };

async function query(range) {
  const res = await fetch(
    `${GATEWAY}/webmasters/v3/sites/${encodeURIComponent(SITE_URL)}/searchAnalytics/query`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "X-Connection-Api-Key": CONNECTION_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        startDate: range.start,
        endDate: range.end,
        dimensions: ["date"],
        rowLimit: 31,
      }),
    }
  );
  if (!res.ok) {
    throw new Error(`searchAnalytics falhou [${res.status}]: ${await res.text()}`);
  }
  const data = await res.json();
  const rows = data.rows || [];
  return rows.reduce(
    (acc, r) => ({
      clicks: acc.clicks + (r.clicks || 0),
      impressions: acc.impressions + (r.impressions || 0),
    }),
    { clicks: 0, impressions: 0 }
  );
}

console.log(`[gsc-traffic] Propriedade: ${SITE_URL} | limiar de queda: ${THRESHOLD}%\n`);
const curT = await query(cur);
const prevT = await query(prev);
console.log(`  Período anterior ${prev.start}..${prev.end}: ${prevT.clicks} cliques, ${prevT.impressions} impressões`);
console.log(`  Período atual    ${cur.start}..${cur.end}: ${curT.clicks} cliques, ${curT.impressions} impressões\n`);

const failures = [];
for (const metric of ["clicks", "impressions"]) {
  const before = prevT[metric];
  const now = curT[metric];
  const tag = metric === "clicks" ? "cliques" : "impressões";
  if (before === 0) {
    console.log(`  • ${tag}: sem dados no período anterior — comparação ignorada`);
    continue;
  }
  const dropPct = ((before - now) / before) * 100;
  if (dropPct >= THRESHOLD) {
    failures.push(`${tag}: queda de ${dropPct.toFixed(1)}% (${before} → ${now}) — limiar ${THRESHOLD}%`);
  } else {
    console.log(`  ✔ ${tag}: variação de ${(-dropPct).toFixed(1)}% (dentro do limiar de ${THRESHOLD}%)`);
  }
}

if (failures.length > 0) {
  console.error(`\n[gsc-traffic] ALERTA — queda relevante detectada:`);
  for (const f of failures) console.error(`  ✗ ${f}`);
  process.exit(1);
}
console.log(`\n[gsc-traffic] OK — sem queda relevante de tráfego ✔`);
