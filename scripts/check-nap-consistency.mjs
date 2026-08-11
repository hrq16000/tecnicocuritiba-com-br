#!/usr/bin/env node
/**
 * check:nap — gate de consistência NAP (Name · Address · Phone · Hours).
 *
 * Fonte única de verdade: src/lib/nap.ts. O gate falha se qualquer arquivo
 * de src/ ou public/ expuser telefone, horário de funcionamento ou cidade
 * divergentes dos valores canônicos — divergência de NAP quebra SEO local
 * e rich results de LocalBusiness.
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, extname } from "node:path";

const ROOT = process.cwd();
const napSrc = readFileSync(join(ROOT, "src/lib/nap.ts"), "utf8");

const pick = (key) => {
  const m = napSrc.match(new RegExp(`${key}:\\s*"([^"]+)"`));
  return m ? m[1] : null;
};
const PHONE_DIGITS = napSrc.match(/NAP_PHONE_DIGITS\s*=\s*"(\d+)"/)?.[1];
const PHONE_E164 = napSrc.match(/NAP_PHONE_E164\s*=\s*"(\+\d+)"/)?.[1];
const OPENS = pick("opens");
const CLOSES = pick("closes");
const CITY = pick("city");

if (!PHONE_DIGITS || !PHONE_E164 || !OPENS || !CLOSES || !CITY) {
  console.error("[check:nap] Não foi possível ler as constantes de src/lib/nap.ts");
  process.exit(1);
}

const SCAN_DIRS = ["src", "public", "index.html", "scripts"];
const EXTS = new Set([".ts", ".tsx", ".js", ".mjs", ".json", ".html", ".txt", ".xml", ".md"]);
const SKIP = new Set(["node_modules", "dist", ".git", ".lighthouseci", ".lighthouseci-mobile"]);

function walk(p, out = []) {
  let st;
  try {
    st = statSync(p);
  } catch {
    return out;
  }
  if (st.isDirectory()) {
    for (const e of readdirSync(p)) {
      if (SKIP.has(e)) continue;
      walk(join(p, e), out);
    }
  } else if (EXTS.has(extname(p))) {
    out.push(p);
  }
  return out;
}

const files = SCAN_DIRS.flatMap((d) => walk(join(ROOT, d)));
const errors = [];

// 1) Qualquer link wa.me deve usar exatamente o número canônico.
const WA_RE = /wa\.me\/(\d+)/g;
// 2) Qualquer telephone: "+55..." em JSON-LD deve bater com o E.164 canônico.
const TEL_RE = /"?(?:telephone|servicePhone)"?\s*:\s*"(\+?\d[\d\s()-]*)"/g;
// 3) Horários exibidos: aceita apenas a janela canônica.
const HOURS_TEXT_RE = /Seg[^\n]{0,40}?0?(\d{1,2})h\s*(?:às|–|-|a)\s*(\d{1,2})h/gi;
// 4) openingHours JSON-LD.
const OPENS_RE = /"?opens"?\s*:\s*"(\d{2}:\d{2})"/g;
const CLOSES_RE = /"?closes"?\s*:\s*"(\d{2}:\d{2})"/g;

const expectedOpenH = String(Number(OPENS.split(":")[0]));
const expectedCloseH = String(Number(CLOSES.split(":")[0]));

for (const file of files) {
  const rel = file.replace(`${ROOT}/`, "");
  if (rel === "src/lib/nap.ts") continue;
  const text = readFileSync(file, "utf8");
  const at = (idx) => text.slice(0, idx).split("\n").length;

  for (const m of text.matchAll(WA_RE)) {
    if (m[1] !== PHONE_DIGITS) errors.push(`${rel}:${at(m.index)} wa.me/${m[1]} ≠ wa.me/${PHONE_DIGITS}`);
  }
  for (const m of text.matchAll(TEL_RE)) {
    const norm = m[1].replace(/[^\d+]/g, "");
    const canon = norm.startsWith("+") ? norm : `+${norm}`;
    if (canon !== PHONE_E164) errors.push(`${rel}:${at(m.index)} telephone ${m[1]} ≠ ${PHONE_E164}`);
  }
  for (const m of text.matchAll(HOURS_TEXT_RE)) {
    if (String(Number(m[1])) !== expectedOpenH || String(Number(m[2])) !== expectedCloseH) {
      errors.push(`${rel}:${at(m.index)} horário "${m[0]}" ≠ ${expectedOpenH}h–${expectedCloseH}h`);
    }
  }
  for (const m of text.matchAll(OPENS_RE)) {
    if (m[1] !== OPENS) errors.push(`${rel}:${at(m.index)} opens "${m[1]}" ≠ "${OPENS}"`);
  }
  for (const m of text.matchAll(CLOSES_RE)) {
    if (m[1] !== CLOSES) errors.push(`${rel}:${at(m.index)} closes "${m[1]}" ≠ "${CLOSES}"`);
  }
}

// 5) O rodapé precisa citar a cidade canônica (âncora de NAP visível).
const footer = readFileSync(join(ROOT, "src/components/Footer.tsx"), "utf8");
if (!footer.includes(CITY)) {
  errors.push(`src/components/Footer.tsx: cidade canônica "${CITY}" ausente no rodapé`);
}

if (errors.length) {
  console.error(`\n[check:nap] ${errors.length} divergência(s) de NAP:\n`);
  for (const e of errors) console.error(`  ✗ ${e}`);
  console.error("\nCorrija usando src/lib/nap.ts como fonte única de verdade.\n");
  process.exit(1);
}

console.log(
  `[check:nap] OK — ${files.length} arquivos verificados (telefone ${PHONE_E164}, ${OPENS}–${CLOSES}, ${CITY}).`,
);
