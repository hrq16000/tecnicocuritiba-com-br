#!/usr/bin/env node
/**
 * check-photo-privacy.mjs — gate de CI (LGPD / privacidade de imagens).
 *
 * Falha se alguma imagem publicada em public/ ou src/assets/ ainda carregar
 * EXIF, GPS, XMP ou IPTC. Corrija com:  npm run photos:strip
 */
import fs from "node:fs";
import path from "node:path";
import { analyzeImage, personalFlags } from "./lib/exif.mjs";

const IMAGE_EXT = new Set([".jpg", ".jpeg", ".png", ".webp"]);
const ROOTS = ["public", "src/assets"];

function collect(target) {
  const files = [];
  for (const entry of fs.readdirSync(target, { withFileTypes: true })) {
    const full = path.join(target, entry.name);
    if (entry.isDirectory()) files.push(...collect(full));
    else if (IMAGE_EXT.has(path.extname(entry.name).toLowerCase())) files.push(full);
  }
  return files;
}

const files = ROOTS.filter((r) => fs.existsSync(r)).flatMap(collect);
const withMeta = [];
const withPersonal = [];

for (const file of files) {
  const { kind, meta } = analyzeImage(fs.readFileSync(file));
  if (!kind || meta.length === 0) continue;
  const flags = personalFlags(meta);
  withMeta.push({ file, blocks: meta.map((m) => m.block), flags });
  if (flags.length) withPersonal.push({ file, flags });
}

console.log(`check:photo-privacy — ${files.length} imagens analisadas`);

if (withMeta.length === 0) {
  console.log("✓ Nenhuma imagem com EXIF/GPS/XMP/IPTC. Seguro para GBP e para o site.");
  process.exit(0);
}

for (const item of withMeta) {
  const tag = item.flags.length ? "⚠ DADO PESSOAL/GPS" : "metadado";
  console.log(`  ${tag}: ${item.file} → ${item.blocks.join(", ")}${item.flags.length ? ` (${item.flags.join(", ")})` : ""}`);
}

console.error(
  `\n✗ ${withMeta.length} imagem(ns) com metadados${withPersonal.length ? ` (${withPersonal.length} com GPS/dados pessoais)` : ""}.\n  Rode: npm run photos:strip`,
);
process.exit(1);
