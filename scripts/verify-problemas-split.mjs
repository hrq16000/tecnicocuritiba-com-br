#!/usr/bin/env bun
// Verify post-split integrity: hashes match, SEO fields preserved for merged slugs.
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const { problemaPagesData } = await import(resolve("src/lib/problemas/index.ts"));
const expected = JSON.parse(readFileSync(resolve("docs/refactor/problemas-hashes-post-split.json"), "utf8"));

const KEY_ORDER = [
  "slug","title","metaDescription","h1","categoria","intro","sintomas","causas","cenarios",
  "riscos","diagnostico","solucao","quandoCompensa","quandoNaoCompensa","whatsappMessage",
  "relatedPages","conteudoExtra",
];
function reorder(e) {
  const out = {};
  for (const k of KEY_ORDER) if (k in e) out[k] = e[k];
  for (const k of Object.keys(e)) if (!(k in out)) out[k] = e[k];
  return out;
}

let fails = 0;
const rows = [];
for (const entry of problemaPagesData) {
  const ordered = reorder(entry);
  const actual = createHash("sha256").update(JSON.stringify(ordered)).digest("hex");
  const exp = expected[entry.slug];
  const match = exp && exp.sha256 === actual;
  if (!match) fails++;
  rows.push([entry.slug, exp?.sha256?.slice(0, 10) ?? "MISSING", actual.slice(0, 10), match ? "OK" : "FAIL", exp?.strategy ?? "?"]);
}

// SEO guard on the 8 merged
const MERGES = [
  ["pc-reiniciando-sozinho-curitiba", 7],
  ["notebook-com-tela-quebrada-curitiba", 16],
  ["notebook-nao-carrega-bateria-curitiba", 17],
  ["notebook-teclado-nao-funciona-curitiba", 18],
  ["tv-nao-liga-curitiba", 22],
  ["hd-externo-nao-reconhece-curitiba", 55],
  ["erro-0xc000021a-curitiba", 110],
  ["tv-listras-na-tela-curitiba", 177],
];
// Recover winner SEO fields from the pre-split original snapshot.
const origText = readFileSync("/tmp/orig-problemas.ts", "utf8");
function extractWinner(slug) {
  const re = new RegExp(`slug:\\s*"${slug}",[\\s\\S]*?title:\\s*"((?:[^"\\\\]|\\\\.)*)",[\\s\\S]*?metaDescription:\\s*"((?:[^"\\\\]|\\\\.)*)",[\\s\\S]*?h1:\\s*"((?:[^"\\\\]|\\\\.)*)",`);
  const m = origText.match(re);
  if (!m) throw new Error(`winner not found in snapshot: ${slug}`);
  return { title: JSON.parse(`"${m[1]}"`), metaDescription: JSON.parse(`"${m[2]}"`), h1: JSON.parse(`"${m[3]}"`) };
}
let seoFails = 0;
for (const [slug, widx] of MERGES) {
  const winner = orig.problemaPagesData[widx - 1];
  const now = problemaPagesData.find((p) => p.slug === slug);
  const ok =
    winner.title === now.title &&
    winner.h1 === now.h1 &&
    winner.metaDescription === now.metaDescription;
  if (!ok) {
    seoFails++;
    console.error(`[SEO FAIL] ${slug}`);
  }
}

console.log(`\n${rows.length} slugs checked — ${rows.length - fails}/${rows.length} hashes OK`);
console.log(`SEO guard on 8 merged: ${8 - seoFails}/8 OK`);
if (fails > 0) {
  console.error("Failing rows:");
  rows.filter((r) => r[3] === "FAIL").forEach((r) => console.error(r.join(" | ")));
}
if (fails > 0 || seoFails > 0) process.exit(1);
console.log("[ok] all integrity checks passed");
