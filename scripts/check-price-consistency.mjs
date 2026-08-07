/**
 * check:price-consistency
 *
 * Compara os valores/prazos exibidos nas páginas de serviço com a planilha
 * oficial (src/lib/coletaConfig.ts, via src/lib/serviceSpecs.ts) e falha o
 * build se alguma página imprimir um preço divergente hardcoded.
 *
 * Regra: nas páginas de src/pages/servicos/ só podem aparecer valores em R$
 * que existam na configuração central. Qualquer outro número é divergência
 * crítica e deve virar constante em coletaConfig.ts.
 */
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const cfg = readFileSync("src/lib/coletaConfig.ts", "utf8");
const specsSrc = readFileSync("src/lib/serviceSpecs.ts", "utf8");

const normalize = (v) => v.replace(/\s+/g, " ").replace(/R\$\s*/g, "").replace(/,00$/, "").trim();

const allowed = new Set(
  [...cfg.matchAll(/R\$\s*\$?\{?[^"`'\n]*?([0-9][0-9.]*(?:,[0-9]{2})?)/g)].map((m) => normalize(m[1])),
);
// Valores derivados de constantes numéricas (ex.: `R$ ${COLETA_TAXA_MINIMA}`)
for (const m of cfg.matchAll(/=\s*([0-9]+(?:\.[0-9]+)?)\s*;/g)) {
  const n = Number(m[1]);
  allowed.add(normalize(String(n).replace(".", ",")));
  allowed.add(normalize(String(n)));
}

const errors = [];
const dir = "src/pages/servicos";
for (const file of readdirSync(dir).filter((f) => f.endsWith(".tsx"))) {
  const src = readFileSync(join(dir, file), "utf8");
  for (const m of src.matchAll(/R\$\s*([0-9][0-9.]*(?:,[0-9]{2})?)/g)) {
    const value = normalize(m[1]);
    if (!allowed.has(value)) {
      errors.push(`${dir}/${file}: valor R$ ${m[1]} não existe em coletaConfig.ts (divergência de preço)`);
    }
  }
}

// Toda spec precisa herdar valor inicial de constante, nunca literal.
for (const m of specsSrc.matchAll(/valorInicial:\s*"([^"]+)"/g)) {
  errors.push(`src/lib/serviceSpecs.ts: valorInicial literal "${m[1]}" — use as constantes de coletaConfig.ts`);
}

if (errors.length) {
  console.error("check:price-consistency FALHOU:\n" + errors.map((e) => ` - ${e}`).join("\n"));
  process.exit(1);
}

console.log(
  `check:price-consistency OK — valores das páginas de serviço batem com a planilha oficial (${allowed.size} valores válidos).`,
);
