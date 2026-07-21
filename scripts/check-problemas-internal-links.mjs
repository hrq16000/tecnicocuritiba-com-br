#!/usr/bin/env node
/**
 * CI guard: valida que todo link interno usado em src/lib/problemas/* e
 * dentro de src/pages/ProblemaPage.tsx aponta para rotas válidas
 * (/servicos/<slug canônico> ou rotas extras conhecidas).
 *
 * Fonte da verdade: src/lib/validServicoSlugs.ts.
 * Falha (exit 1) se qualquer link quebrado for encontrado.
 */
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const PROBLEMAS_DIR = join(ROOT, "src/lib/problemas");
const PROBLEMA_PAGE = join(ROOT, "src/pages/ProblemaPage.tsx");
const VALID_SRC = join(ROOT, "src/lib/validServicoSlugs.ts");

const validSrc = readFileSync(VALID_SRC, "utf8");

const extractSet = (marker) => {
  const m = validSrc.match(new RegExp(`${marker}[^\\[]*\\[([^\\]]+)\\]`, "s"));
  if (!m) return new Set();
  return new Set(
    [...m[1].matchAll(/"([^"]+)"/g)].map((x) => x[1]),
  );
};

const validServicos = extractSet("VALID_SERVICO_SLUGS");
const validExtras = extractSet("VALID_EXTRA_ROUTES");

const dynamicPrefixes = ["/problemas/", "/marcas/", "/bairros/", "/tecnico-informatica-"];

const isValid = (to) => {
  if (!to) return false;
  if (to.startsWith("/servicos/")) {
    const slug = to.replace("/servicos/", "").split("/")[0];
    return validServicos.has(slug);
  }
  if (dynamicPrefixes.some((p) => to.startsWith(p))) return true;
  return validExtras.has(to);
};

// Coleta strings de rota internas dos arquivos de problemas.
const files = readdirSync(PROBLEMAS_DIR).filter((f) => f.endsWith(".ts") && f !== "index.ts" && f !== "types.ts");

const broken = [];
const seenLinks = new Set();

const inspect = (label, src) => {
  const re = /"(\/(?:servicos|coleta|diagnostico|precos|atendimento|como|problemas|marcas|bairros|tecnico)[a-z0-9\-\/]*)"/gi;
  let m;
  while ((m = re.exec(src))) {
    const to = m[1];
    seenLinks.add(to);
    if (!isValid(to)) broken.push({ file: label, to });
  }
};

for (const f of files) {
  inspect(`src/lib/problemas/${f}`, readFileSync(join(PROBLEMAS_DIR, f), "utf8"));
}
inspect("src/pages/ProblemaPage.tsx", readFileSync(PROBLEMA_PAGE, "utf8"));

console.log(`[check-problemas-internal-links] ${files.length} arquivos de problemas, ${seenLinks.size} links únicos inspecionados.`);
if (broken.length) {
  console.error(`\n❌ ${broken.length} link(s) interno(s) inválido(s):`);
  for (const b of broken) console.error(`  ${b.file} → ${b.to}`);
  process.exit(1);
}
console.log("✅ Nenhum link interno quebrado.");
