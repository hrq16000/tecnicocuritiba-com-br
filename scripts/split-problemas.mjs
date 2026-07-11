#!/usr/bin/env bun
// One-shot: split problemaPagesData.ts into per-slug files with hybrid merge for 8 slugs.
import { createHash } from "node:crypto";
import { writeFileSync, mkdirSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const { problemaPagesData } = await import(resolve("src/lib/problemaPagesData.ts"));

const MERGES = [
  { slug: "pc-reiniciando-sozinho-curitiba", winner: 7, loser: 159 },
  { slug: "notebook-com-tela-quebrada-curitiba", winner: 16, loser: 73 },
  { slug: "notebook-nao-carrega-bateria-curitiba", winner: 17, loser: 148 },
  { slug: "notebook-teclado-nao-funciona-curitiba", winner: 18, loser: 143 },
  { slug: "tv-nao-liga-curitiba", winner: 22, loser: 174 },
  { slug: "hd-externo-nao-reconhece-curitiba", winner: 55, loser: 135 },
  { slug: "erro-0xc000021a-curitiba", winner: 110, loser: 129 },
  { slug: "tv-listras-na-tela-curitiba", winner: 177, loser: 206 },
];
// idx in the doc is 1-based (#1 = first entry)
const mergeBySlug = new Map(MERGES.map((m) => [m.slug, m]));

// Build first-occurrence index per slug (1-based to match doc)
const firstIdxBySlug = new Map();
problemaPagesData.forEach((p, i) => {
  if (!firstIdxBySlug.has(p.slug)) firstIdxBySlug.set(p.slug, i + 1);
});

// Sanity: 189 unique slugs
if (firstIdxBySlug.size !== 189) {
  console.error(`Expected 189 unique slugs, got ${firstIdxBySlug.size}`);
  process.exit(1);
}

// Verify merge indices reference the right slugs
for (const m of MERGES) {
  const w = problemaPagesData[m.winner - 1];
  const l = problemaPagesData[m.loser - 1];
  if (!w || w.slug !== m.slug) {
    console.error(`Merge winner mismatch ${m.slug} @ ${m.winner}: got ${w?.slug}`);
    process.exit(1);
  }
  if (!l || l.slug !== m.slug) {
    console.error(`Merge loser mismatch ${m.slug} @ ${m.loser}: got ${l?.slug}`);
    process.exit(1);
  }
}
console.log("[ok] merge indices validated");

// Build ordered final list (189 entries), in original first-occurrence order
const finalEntries = [];
const seen = new Set();
problemaPagesData.forEach((p, i) => {
  if (seen.has(p.slug)) return;
  seen.add(p.slug);
  const merge = mergeBySlug.get(p.slug);
  if (merge) {
    const winner = problemaPagesData[merge.winner - 1];
    const loser = problemaPagesData[merge.loser - 1];
    const merged = { ...loser, title: winner.title, h1: winner.h1, metaDescription: winner.metaDescription };
    // Ensure slug canonical
    merged.slug = p.slug;
    finalEntries.push({ entry: merged, strategy: "hybrid-merge", winnerIdx: merge.winner, loserIdx: merge.loser });
  } else {
    finalEntries.push({ entry: p, strategy: "keep-winner", winnerIdx: i + 1, loserIdx: null });
  }
});

if (finalEntries.length !== 189) {
  console.error(`Final count ${finalEntries.length} != 189`);
  process.exit(1);
}

// Order keys to match original interface order for stable serialization
const KEY_ORDER = [
  "slug","title","metaDescription","h1","categoria","intro","sintomas","causas","cenarios",
  "riscos","diagnostico","solucao","quandoCompensa","quandoNaoCompensa","whatsappMessage",
  "relatedPages","conteudoExtra",
];
function reorder(e) {
  const out = {};
  for (const k of KEY_ORDER) if (k in e) out[k] = e[k];
  // include any stray extra keys (should be none)
  for (const k of Object.keys(e)) if (!(k in out)) out[k] = e[k];
  return out;
}

// Write output dir
const OUT = resolve("src/lib/problemas");
mkdirSync(OUT, { recursive: true });

// types.ts
writeFileSync(
  resolve(OUT, "types.ts"),
  `// Auto-generated types for problemaPagesData split. Do not edit by hand.
export interface ProblemaSintoma {
  titulo: string;
  desc: string;
  gravidade: string;
}

export interface ProblemaCausa {
  titulo: string;
  desc: string;
  tipo: "hardware" | "software" | "erro-humano" | "desgaste";
}

export interface ProblemaCenario {
  nivel: "Simples" | "Médio" | "Complexo";
  desc: string;
  tempo: string;
  custo: string;
}

export interface ProblemaPageData {
  slug: string;
  title: string;
  metaDescription: string;
  h1: string;
  categoria: string;
  intro: string;
  sintomas: ProblemaSintoma[];
  causas: ProblemaCausa[];
  cenarios: ProblemaCenario[];
  riscos: string[];
  diagnostico: string;
  solucao: string;
  quandoCompensa: string;
  quandoNaoCompensa: string;
  whatsappMessage: string;
  relatedPages: { label: string; to: string }[];
  conteudoExtra: string;
}
`,
);

// Variable name from slug
function varName(slug) {
  return "p_" + slug.replace(/[^a-zA-Z0-9]/g, "_");
}

// Per-slug file. Use JSON.stringify then remove key quoting for TS style? JSON is valid TS.
const hashes = {};
const imports = [];
const arrayItems = [];
for (const { entry, strategy, winnerIdx, loserIdx } of finalEntries) {
  const ordered = reorder(entry);
  const json = JSON.stringify(ordered, null, 2);
  const v = varName(entry.slug);
  const content = `import type { ProblemaPageData } from "./types";

export const problema: ProblemaPageData = ${json};
`;
  writeFileSync(resolve(OUT, `${entry.slug}.ts`), content);
  const h = createHash("sha256").update(JSON.stringify(ordered)).digest("hex");
  hashes[entry.slug] = { strategy, winnerIdx, loserIdx, sha256: h };
  imports.push(`import { problema as ${v} } from "./${entry.slug}";`);
  arrayItems.push(`  ${v},`);
}

// index.ts
const indexTs = `// Auto-generated. Do not edit by hand — regenerate via scripts/split-problemas.mjs.
import type { ProblemaPageData } from "./types";
${imports.join("\n")}

export type { ProblemaPageData, ProblemaSintoma, ProblemaCausa, ProblemaCenario } from "./types";

export const problemaPagesData: ProblemaPageData[] = [
${arrayItems.join("\n")}
];

export const getProblemaPageBySlug = (slug: string): ProblemaPageData | undefined =>
  problemaPagesData.find((p) => p.slug === slug);

export const getAllProblemaSlugs = (): string[] => problemaPagesData.map((p) => p.slug);
`;
writeFileSync(resolve(OUT, "index.ts"), indexTs);

// Shim
writeFileSync(
  resolve("src/lib/problemaPagesData.ts"),
  `// Shim — real data lives in ./problemas/. Kept to preserve legacy import paths.
export * from "./problemas";
`,
);

// hashes file
writeFileSync(
  resolve("docs/refactor/problemas-hashes-post-split.json"),
  JSON.stringify(hashes, null, 2),
);

console.log(`[ok] wrote ${finalEntries.length} slug files + index.ts + types.ts + shim`);
console.log(`[ok] hashes at docs/refactor/problemas-hashes-post-split.json`);
