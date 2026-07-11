#!/usr/bin/env node
/**
 * Valida IMAGE_POOL de src/lib/blogImages.ts:
 * - HEAD em cada URL do Unsplash (concorrência 5).
 * - Exit 1 se qualquer item != 200.
 * Rodado no CI + cron semanal para pegar deprecations antes que quebrem posts.
 */
import fs from "fs/promises";

const src = await fs.readFile("src/lib/blogImages.ts", "utf8");
const ids = [...src.matchAll(/photo-[a-z0-9-]+/g)].map((m) => m[0]);

if (ids.length === 0) {
  console.error("❌ Nenhum photo-* encontrado em src/lib/blogImages.ts");
  process.exit(1);
}

const CONCURRENCY = 5;
const results = new Array(ids.length);

async function head(idx, id) {
  const url = `https://images.unsplash.com/${id}?w=100`;
  try {
    const res = await fetch(url, { method: "HEAD" });
    results[idx] = { idx, id, status: res.status };
  } catch (e) {
    results[idx] = { idx, id, status: `ERR:${e.message}` };
  }
}

let cursor = 0;
async function worker() {
  while (cursor < ids.length) {
    const i = cursor++;
    await head(i, ids[i]);
  }
}
await Promise.all(Array.from({ length: CONCURRENCY }, worker));

const bad = results.filter((r) => r.status !== 200);
console.log("idx\tstatus\tid");
for (const r of results) console.log(`${r.idx}\t${r.status}\t${r.id}`);
console.log(`\nTotal: ${results.length} · OK: ${results.length - bad.length} · Broken: ${bad.length}`);

if (bad.length) {
  console.error("\n❌ IDs quebrados:");
  for (const b of bad) console.error(`  [${b.idx}] ${b.id} → ${b.status}`);
  process.exit(1);
}
console.log("✅ Todos os IDs do IMAGE_POOL respondem 200.");
