#!/usr/bin/env node
/**
 * Gate: padronização operacional das páginas de serviço.
 *
 * Falha o build quando:
 *  - uma rota declarada em src/lib/serviceSpecs.ts não renderiza <ServiceOperationalSpec />
 *  - uma página de serviço em src/pages/servicos não tem o bloco (exceto whitelist)
 *  - um spec está incompleto (campo obrigatório vazio)
 */
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const SPECS_FILE = "src/lib/serviceSpecs.ts";
const PAGES_DIR = "src/pages/servicos";
// Sub-páginas explicativas não repetem o bloco (a página canônica já o tem).
const WHITELIST = new Set(["MontagemPcComoFunciona.tsx"]);

const specSrc = readFileSync(SPECS_FILE, "utf8");
const paths = [...specSrc.matchAll(/path:\s*"(\/servicos\/[^"]+)"/g)].map((m) => m[1]);
const errors = [];

if (paths.length === 0) errors.push(`${SPECS_FILE}: nenhum spec encontrado.`);

// Campos obrigatórios por spec (checagem textual por bloco).
const blocks = specSrc.split(/\n  \{\n/).slice(1);
const REQUIRED = [
  "path",
  "nome",
  "valorInicial",
  "valorRegra",
  "tempoEstimado",
  "modalidade",
  "incluso",
  "naoIncluso",
  "acrescimos",
  "observacoes",
  "fotosNecessarias",
  "quandoVisitaOuOrcamento",
];
for (const block of blocks) {
  const path = block.match(/path:\s*"([^"]+)"/)?.[1];
  if (!path) continue;
  const inherited = block.includes("...visitaBase")
    ? ["valorInicial", "valorRegra", "modalidade"]
    : block.includes("...coletaBase")
      ? ["valorInicial", "valorRegra", "modalidade"]
      : [];
  for (const field of REQUIRED) {
    if (inherited.includes(field)) continue;
    if (!new RegExp(`\\b${field}:`).test(block)) errors.push(`${path}: campo obrigatório ausente "${field}"`);
  }
  for (const arrayField of ["incluso", "naoIncluso", "acrescimos", "observacoes", "fotosNecessarias", "quandoVisitaOuOrcamento"]) {
    if (new RegExp(`\\b${arrayField}:\\s*\\[\\s*\\]`).test(block)) errors.push(`${path}: "${arrayField}" está vazio`);
  }
}

const rendered = new Set();
for (const file of readdirSync(PAGES_DIR).filter((f) => f.endsWith(".tsx"))) {
  if (WHITELIST.has(file)) continue;
  const src = readFileSync(join(PAGES_DIR, file), "utf8");
  const uses = [...src.matchAll(/<ServiceOperationalSpec\s+path="([^"]+)"/g)].map((m) => m[1]);
  if (uses.length === 0) {
    errors.push(`${file}: falta <ServiceOperationalSpec path="..." /> (padronização obrigatória).`);
    continue;
  }
  for (const p of uses) {
    if (!paths.includes(p)) errors.push(`${file}: path "${p}" não existe em ${SPECS_FILE}.`);
    rendered.add(p);
  }
}

for (const p of paths) {
  if (!rendered.has(p)) errors.push(`${SPECS_FILE}: spec "${p}" não é renderizado por nenhuma página.`);
}

if (errors.length) {
  console.error("check:service-specs FALHOU:\n" + errors.map((e) => ` - ${e}`).join("\n"));
  process.exit(1);
}

console.log(`check:service-specs OK — ${paths.length} serviços padronizados com campos obrigatórios.`);
