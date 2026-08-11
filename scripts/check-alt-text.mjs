#!/usr/bin/env node
/**
 * Gate `check:alt` — garante que toda <img> do site tenha alt descritivo.
 *
 * Regras:
 *  - Toda <img> precisa de `alt` (ou ser explicitamente decorativa com
 *    alt="" + aria-hidden).
 *  - Alt genérico ("imagem", "foto", "image", "banner", "logo"...) é recusado.
 *  - Alt com menos de 12 caracteres é recusado (não descreve nada útil).
 *  - `src` apontando para placeholder é recusado.
 *
 * Expressões dinâmicas (alt={...}) são aceitas: o valor é resolvido em runtime
 * e coberto pelos testes E2E de acessibilidade.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const ROOTS = ["src"];
const GENERIC = [
  "imagem", "image", "foto", "photo", "picture", "banner", "logo", "icone",
  "ícone", "icon", "img", "capa", "cover", "thumbnail", "placeholder",
];
const MIN_LEN = 12;

const files = [];
const walk = (dir) => {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      if (entry === "node_modules" || entry.startsWith(".")) continue;
      walk(full);
    } else if (/\.(tsx|jsx)$/.test(entry)) {
      files.push(full);
    }
  }
};
ROOTS.forEach(walk);

const errors = [];

const attr = (tag, name) => {
  const literal = new RegExp(`${name}\\s*=\\s*"([^"]*)"`).exec(tag);
  if (literal) return { dynamic: false, value: literal[1] };
  if (new RegExp(`${name}\\s*=\\s*\\{`).test(tag)) return { dynamic: true, value: "" };
  return null;
};

for (const file of files) {
  const raw = readFileSync(file, "utf8");
  // Neutraliza comentários (preservando o comprimento para manter as linhas)
  // para não confundir menções a "<img>" em prosa com markup real.
  const source = raw
    .replace(/\/\*[\s\S]*?\*\//g, (c) => c.replace(/[^\n]/g, " "))
    .replace(/(^|[^:])\/\/[^\n]*/g, (c, pre) => pre + c.slice(pre.length).replace(/[^\n]/g, " "));
  // Ignora componentes de UI genéricos do shadcn.
  if (file.includes("/components/ui/")) continue;

  // Parser consciente de chaves/strings: expressões JSX como `(w) => ...`
  // contêm ">" e quebrariam uma regex ingênua.
  const tags = [];
  const re = /<img\b/g;
  let m;
  while ((m = re.exec(source)) !== null) {
    let depth = 0;
    let quote = null;
    let i = m.index + 4;
    for (; i < source.length; i += 1) {
      const ch = source[i];
      if (quote) {
        if (ch === quote) quote = null;
        continue;
      }
      if (ch === '"' || ch === "'" || ch === "`") { quote = ch; continue; }
      if (ch === "{") depth += 1;
      else if (ch === "}") depth -= 1;
      else if (ch === ">" && depth === 0) break;
    }
    tags.push({ tag: source.slice(m.index, i + 1), index: m.index });
  }

  for (const { tag, index } of tags) {
    const line = source.slice(0, index).split("\n").length;
    const at = `${file}:${line}`;

    const src = attr(tag, "src");
    if (src && !src.dynamic && /placeholder/i.test(src.value)) {
      errors.push(`${at} — src aponta para placeholder (${src.value}).`);
    }

    const alt = attr(tag, "alt");
    if (!alt) {
      errors.push(`${at} — <img> sem atributo alt.`);
      continue;
    }
    if (alt.dynamic) continue;

    const value = alt.value.trim();
    if (value === "") {
      if (!/aria-hidden/.test(tag)) {
        errors.push(`${at} — alt="" sem aria-hidden (imagem decorativa deve declarar aria-hidden).`);
      }
      continue;
    }
    const normalized = value.toLowerCase().replace(/[^a-zà-ú\s]/gi, "").trim();
    if (GENERIC.includes(normalized)) {
      errors.push(`${at} — alt genérico ("${value}").`);
      continue;
    }
    if (value.length < MIN_LEN) {
      errors.push(`${at} — alt curto demais ("${value}", mínimo ${MIN_LEN} caracteres).`);
    }
  }
}

if (errors.length > 0) {
  console.error(`\n[check:alt] ${errors.length} problema(s) de alt text:\n`);
  errors.forEach((e) => console.error(`  ✗ ${e}`));
  console.error("\nCorrija os alts acima antes do merge.\n");
  process.exit(1);
}

console.log(`[check:alt] OK — ${files.length} arquivos auditados, nenhum alt inválido.`);
