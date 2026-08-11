#!/usr/bin/env node
/**
 * Gate de CI: higiene do JSON-LD do cluster de informática.
 *
 * Objetivo: impedir regressão de verticais recusadas (som, linha branca,
 * eletrodomésticos convencionais) dentro dos blocos `application/ld+json`
 * das páginas do cluster de informática — que atendem apenas computadores,
 * notebooks, periféricos, redes e smartphones.
 *
 * Uso: node scripts/check-cluster-jsonld.mjs
 */
import fs from "node:fs";
import path from "node:path";

const PAGES = [
  "src/pages/TecnicoInformaticaCuritiba.tsx",
  "src/pages/AssistenciaTecnicaCuritiba.tsx",
  "src/pages/guias/GuiaTecnicoInformatica.tsx",
  "src/pages/Servicos.tsx",
];

// Termos que NUNCA podem aparecer como serviço declarado no schema do cluster.
const FORBIDDEN = [
  "equipamento de som",
  "aparelho de som",
  "home theater",
  "amplificador",
  "máquina de lavar",
  "maquina de lavar",
  "geladeira",
  "micro-ondas",
  "microondas",
  "fogão",
  "fogao",
  "ar-condicionado",
  "ar condicionado",
];

const errors = [];
let scanned = 0;

for (const file of PAGES) {
  const p = path.resolve(file);
  if (!fs.existsSync(p)) {
    errors.push(`${file}: arquivo não encontrado (rota do cluster removida?)`);
    continue;
  }
  const src = fs.readFileSync(p, "utf8");
  scanned++;

  // Schemas podem vir de componentes compartilhados; aqui validamos só o conteúdo.
  const lower = src.toLowerCase();


  for (const term of FORBIDDEN) {
    if (lower.includes(term)) {
      errors.push(`${file}: vertical recusada presente no arquivo — "${term}"`);
    }
  }
}

if (errors.length) {
  console.error("\n✗ check:cluster-jsonld FALHOU:\n - " + errors.join("\n - "));
  process.exit(1);
}
console.log(`✓ check:cluster-jsonld OK (${scanned} páginas do cluster sem verticais recusadas)`);
