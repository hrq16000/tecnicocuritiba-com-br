#!/usr/bin/env node
/**
 * Gera o ROPA (Registro das Operações de Tratamento) a partir de docs/lgpd/decisoes.json.
 *
 *   node scripts/generate-ropa.mjs          -> escreve docs/lgpd/ropa.md
 *   node scripts/generate-ropa.mjs --check  -> falha se o arquivo estiver desatualizado
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const SRC = resolve("docs/lgpd/decisoes.json");
const OUT = resolve("docs/lgpd/ropa.md");
const check = process.argv.includes("--check");

const data = JSON.parse(readFileSync(SRC, "utf8"));
const { controlador, decisoes, status, versao } = data;

if (!Array.isArray(decisoes) || decisoes.length === 0) {
  console.error("ROPA: nenhuma decisão encontrada em docs/lgpd/decisoes.json");
  process.exit(1);
}
if (status !== "autorizado") {
  console.error(`ROPA: status "${status}" não autorizado. Ajuste docs/lgpd/decisoes.json.`);
  process.exit(1);
}

const list = (arr) => (arr && arr.length ? arr.map((i) => `- ${i}`).join("\n") : "- Não aplicável");

const blocks = decisoes.map(
  (d) => `## ${d.id}. ${d.titulo}

**Finalidade:** ${d.finalidade}

**Base legal:** ${d.baseLegal}

**Categorias de titulares:** ${(d.titulares || []).join(", ") || "Não aplicável"}

**Dados tratados:**
${list(d.dados)}

**Prazo de retenção:** ${d.retencao}

**Compartilhamento:**
${list(d.compartilhamento)}

**Transferência internacional:** ${d.transferenciaInternacional ? "Sim (provedores com operação fora do Brasil)" : "Não"}

**Medidas de segurança e governança:**
${list(d.medidas)}`,
);

const doc = `# Registro das Operações de Tratamento (ROPA)

> Documento gerado automaticamente por \`scripts/generate-ropa.mjs\` a partir de
> \`docs/lgpd/decisoes.json\`. Não edite manualmente.

- **Controlador:** ${controlador.nome}
- **Site:** ${controlador.site}
- **Canal do titular:** ${controlador.canalTitular}
- **Encarregado:** ${controlador.encarregado}
- **Versão:** ${versao}
- **Status:** AUTORIZADO
- **Operações registradas:** ${decisoes.length}

${blocks.join("\n\n---\n\n")}

---

## Direitos do titular

Confirmação, acesso, correção, anonimização, portabilidade, informação sobre
compartilhamento e revogação do consentimento podem ser exercidos pela página
\`/exclusao-de-dados\` ou pelo canal oficial de WhatsApp. Prazo de resposta: até
15 dias corridos.
`;

if (check) {
  if (!existsSync(OUT) || readFileSync(OUT, "utf8") !== doc) {
    console.error("ROPA desatualizado. Rode `npm run lgpd:ropa` e faça commit de docs/lgpd/ropa.md.");
    process.exit(1);
  }
  console.log(`ROPA OK — ${decisoes.length} operações, status autorizado.`);
  process.exit(0);
}

writeFileSync(OUT, doc);
console.log(`docs/lgpd/ropa.md gerado (${decisoes.length} operações, status autorizado).`);
