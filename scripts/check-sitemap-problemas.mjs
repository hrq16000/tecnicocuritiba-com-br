#!/usr/bin/env node
// Guard: sitemap-problemas.xml must contain exactly 189 /problemas/* URLs
// with no duplicates. Blocks deploy if the split regresses.
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const EXPECTED = 189;
const path = resolve("public/sitemap-problemas.xml");
const xml = readFileSync(path, "utf8");
const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const problemas = locs.filter((u) => /\/problemas\//.test(u));
const unique = new Set(problemas);

const errors = [];
if (problemas.length !== EXPECTED)
  errors.push(`expected ${EXPECTED} /problemas/* URLs, got ${problemas.length}`);
if (unique.size !== problemas.length)
  errors.push(`duplicates detected: ${problemas.length - unique.size}`);

if (errors.length) {
  console.error("[sitemap-problemas] FAIL");
  errors.forEach((e) => console.error("  -", e));
  process.exit(1);
}
console.log(`[sitemap-problemas] OK — ${problemas.length} unique /problemas/* URLs`);
