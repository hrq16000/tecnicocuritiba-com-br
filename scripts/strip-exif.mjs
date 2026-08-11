#!/usr/bin/env node
/**
 * strip-exif.mjs — remove EXIF/GPS/XMP/IPTC de fotos antes de publicar
 * no site ou anexar no Google Business Profile.
 *
 * Uso:
 *   node scripts/strip-exif.mjs                      # limpa public/ e src/assets/
 *   node scripts/strip-exif.mjs caminho/da/pasta     # limpa uma pasta
 *   node scripts/strip-exif.mjs foto.jpg --out limpa.jpg
 *   node scripts/strip-exif.mjs pasta --dry-run      # apenas relatório
 *
 * Não recomprime a imagem: apenas descarta blocos de metadados, então a
 * qualidade visual permanece idêntica byte a byte nos dados de pixel.
 */
import fs from "node:fs";
import path from "node:path";
import { analyzeImage, personalFlags } from "./lib/exif.mjs";

const IMAGE_EXT = new Set([".jpg", ".jpeg", ".png", ".webp"]);
const DEFAULT_TARGETS = ["public", "src/assets"];

const argv = process.argv.slice(2);
const dryRun = argv.includes("--dry-run");
const outIdx = argv.indexOf("--out");
const outFile = outIdx >= 0 ? argv[outIdx + 1] : null;
const targets = argv.filter((a, idx) => !a.startsWith("--") && idx !== outIdx + 1);

function collect(target) {
  const stat = fs.statSync(target);
  if (stat.isFile()) return IMAGE_EXT.has(path.extname(target).toLowerCase()) ? [target] : [];
  const files = [];
  for (const entry of fs.readdirSync(target, { withFileTypes: true })) {
    const full = path.join(target, entry.name);
    if (entry.isDirectory()) files.push(...collect(full));
    else if (IMAGE_EXT.has(path.extname(entry.name).toLowerCase())) files.push(full);
  }
  return files;
}

const roots = (targets.length ? targets : DEFAULT_TARGETS).filter((t) => fs.existsSync(t));
if (!roots.length) {
  console.error("Nenhum caminho válido informado.");
  process.exit(1);
}

const files = roots.flatMap(collect);
let cleaned = 0;
let bytesSaved = 0;
const flagged = [];

for (const file of files) {
  const buf = fs.readFileSync(file);
  const { kind, meta, output } = analyzeImage(buf);
  if (!kind || meta.length === 0) continue;
  const flags = personalFlags(meta);
  const saved = buf.length - output.length;
  cleaned++;
  bytesSaved += saved;
  if (flags.length) flagged.push({ file, flags });
  console.log(
    `${dryRun ? "[dry-run] " : ""}${file} — removidos ${meta
      .map((m) => m.block)
      .join(", ")} (${saved} bytes)${flags.length ? ` ⚠ ${flags.join(", ")}` : ""}`,
  );
  if (!dryRun) fs.writeFileSync(outFile || file, output);
}

console.log(
  `\n${files.length} imagens analisadas • ${cleaned} limpas • ${(bytesSaved / 1024).toFixed(1)} kB de metadados removidos`,
);
if (flagged.length) {
  console.log(`\n⚠ ${flagged.length} arquivo(s) continham dados pessoais/GPS antes da limpeza:`);
  for (const f of flagged) console.log(`   - ${f.file}: ${f.flags.join(", ")}`);
}
