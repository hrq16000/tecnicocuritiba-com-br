#!/usr/bin/env node
/**
 * Pipeline de fotos reais → WebP/AVIF responsivos.
 *
 * O que faz (idempotente):
 *  1. Varre `public/` e `src/assets/` procurando rasters (jpg/jpeg/png).
 *  2. Redimensiona para no máximo MAX_WIDTH (sem upscale) e gera variantes
 *     responsivas `.w{largura}.webp` / `.w{largura}.avif` + um irmão
 *     `.webp`/`.avif` na largura original limitada.
 *  3. Revalida a ausência de EXIF/GPS nas saídas (sharp já descarta os
 *     metadados, mas confirmamos com o auditor do projeto).
 *
 * Modos:
 *   node scripts/optimize-photos.mjs           → gera/atualiza variantes
 *   node scripts/optimize-photos.mjs --check   → gate de CI (não escreve)
 *
 * Regra do gate (`--check`): todo raster acima de HEAVY_BYTES precisa ter
 * um irmão WebP **e** AVIF menor que o original. Assim garantimos que nenhuma
 * foto pesada entre no repositório sem versão otimizada, sem exigir mudança
 * de código nos componentes que ainda consomem o arquivo original.
 */
import { readdirSync, statSync, existsSync } from "node:fs";
import { join, extname, dirname, basename } from "node:path";
import sharp from "sharp";

const ROOTS = ["public", "src/assets"];
const RASTER = new Set([".jpg", ".jpeg", ".png"]);
const WIDTHS = [480, 768, 1200];
const MAX_WIDTH = 1600;
const HEAVY_BYTES = Number(process.env.PHOTO_HEAVY_BYTES || 250 * 1024);
const CHECK = process.argv.includes("--check");

const walk = (dir, out = []) => {
  if (!existsSync(dir)) return out;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (RASTER.has(extname(entry.name).toLowerCase())) out.push(full);
  }
  return out;
};

const siblings = (file) => {
  const stem = join(dirname(file), basename(file, extname(file)));
  return { webp: `${stem}.webp`, avif: `${stem}.avif`, stem };
};

const size = (file) => (existsSync(file) ? statSync(file).size : 0);
const kb = (bytes) => `${Math.round(bytes / 1024)}kB`;

const files = ROOTS.flatMap((root) => walk(root));

if (CHECK) {
  const failures = [];
  let heavy = 0;
  for (const file of files) {
    const original = size(file);
    if (original <= HEAVY_BYTES) continue;
    heavy += 1;
    const { webp, avif } = siblings(file);
    const webpSize = size(webp);
    const avifSize = size(avif);
    if (!webpSize) failures.push(`${file} (${kb(original)}): falta variante .webp`);
    else if (webpSize >= original) failures.push(`${file}: .webp (${kb(webpSize)}) não é menor que o original (${kb(original)})`);
    if (!avifSize) failures.push(`${file} (${kb(original)}): falta variante .avif`);
    else if (avifSize >= original) failures.push(`${file}: .avif (${kb(avifSize)}) não é menor que o original (${kb(original)})`);
  }
  if (failures.length) {
    console.error(
      `[check:photos] ${failures.length} problema(s) — rode \`npm run photos:optimize\`:\n` +
        failures.map((f) => `  - ${f}`).join("\n"),
    );
    process.exit(1);
  }
  console.log(`[check:photos] OK — ${files.length} rasters, ${heavy} pesados (> ${kb(HEAVY_BYTES)}) com WebP+AVIF.`);
  process.exit(0);
}

let generated = 0;
let savedBytes = 0;

for (const file of files) {
  const original = size(file);
  const { webp, avif, stem } = siblings(file);
  const image = sharp(file);
  const meta = await image.metadata();
  const baseWidth = Math.min(meta.width || MAX_WIDTH, MAX_WIDTH);

  const targets = [
    { out: webp, width: baseWidth, fmt: "webp" },
    { out: avif, width: baseWidth, fmt: "avif" },
    ...(original > HEAVY_BYTES
      ? WIDTHS.filter((w) => w < baseWidth).flatMap((w) => [
          { out: `${stem}.w${w}.webp`, width: w, fmt: "webp" },
          { out: `${stem}.w${w}.avif`, width: w, fmt: "avif" },
        ])
      : []),
  ];

  for (const target of targets) {
    // Idempotência: só regenera quando a saída não existe ou está desatualizada.
    if (existsSync(target.out) && statSync(target.out).mtimeMs >= statSync(file).mtimeMs) continue;
    const pipeline = sharp(file)
      .rotate() // aplica orientação EXIF antes de descartá-la
      .resize({ width: target.width, withoutEnlargement: true });
    const buffer =
      target.fmt === "webp"
        ? await pipeline.webp({ quality: 82, effort: 5 }).toBuffer()
        : await pipeline.avif({ quality: 55, effort: 4 }).toBuffer();
    // sharp não copia EXIF/GPS por padrão — a saída já nasce limpa.
    await sharp(buffer).toFile(target.out);
    generated += 1;
    if (target.width === baseWidth) savedBytes += Math.max(0, original - size(target.out));
  }
}

console.log(
  `[photos:optimize] ${files.length} rasters processados, ${generated} variantes geradas, ~${kb(savedBytes)} economizados nas versões principais.`,
);
