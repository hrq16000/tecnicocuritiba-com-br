#!/usr/bin/env node
/**
 * Gate: check:pc-assembly-service
 *
 * Bloqueia o build quando a página de montagem de PC não comprova as
 * capacidades operacionais exigidas, ou quando volta a prometer o que
 * não é executado (FPS, overclock, preços fechados de build).
 *
 * Também impede a criação de rotas duplicadas/canibalizadoras
 * (/servicos/pc-gamer, /servicos/montagem-de-pc) — a URL canônica é
 * /servicos/montagem-pc.
 */
import fs from "node:fs";
import path from "node:path";

const PAGE = path.join(process.cwd(), "src/pages/servicos/MontagemPc.tsx");
const ROUTES = path.join(process.cwd(), "src/LegacyApp.tsx");

let failed = 0;
const ok = (cond, msg) => {
  console.log(`${cond ? "✓" : "✗"} ${msg}`);
  if (!cond) failed++;
};

const src = fs.readFileSync(PAGE, "utf8");
const routes = fs.existsSync(ROUTES) ? fs.readFileSync(ROUTES, "utf8") : "";

// 1) Capacidades confirmadas pelo responsável — devem estar documentadas na página.
const REQUIRED = [
  [/Compatibilidade conferida/i, "checklist: compatibilidade"],
  [/Fonte e consumo/i, "checklist: fonte/consumo"],
  [/Refrigera[çc][ãa]o/i, "checklist: refrigeração"],
  [/BIOS\/UEFI/i, "checklist: BIOS/UEFI"],
  [/Drivers oficiais/i, "checklist: drivers oficiais"],
  [/Teste de mem[óo]ria/i, "checklist: teste de memória"],
  [/Teste de temperatura e estabilidade/i, "checklist: temperatura + estabilidade"],
  [/stress test/i, "checklist: stress test completo"],
];
for (const [re, label] of REQUIRED) ok(re.test(src), `${label} presente`);

// 2) Blocos obrigatórios de política.
const BLOCKS = [
  [/pecas-do-cliente/, "seção de política de peças do cliente"],
  [/Garantia da pe[çc]a/i, "distinção garantia da peça"],
  [/Garantia da m[ãa]o de obra/i, "distinção garantia da mão de obra"],
  [/Prazos de troca/i, "prazos de troca de peça"],
  [/id="garantia"/, "seção de garantia delimitada"],
  [/id="checklist-entrega"/, "seção de checklist final"],
];
for (const [re, label] of BLOCKS) ok(re.test(src), `${label} presente`);

// 3) Promessas proibidas.
const FORBIDDEN = [
  [/A partir de R\$\s?\d\.\d{3}/, "preço fechado de build (R$ x.xxx)"],
  [/garantimos?\s+\d+\s*fps/i, "promessa de FPS"],
  [/(?<!n[ãa]o\s)(?<!nem\s)fazemos overclock|overclock inclu[ií]d/i, "promessa de overclock"],
  [/alta performance garantida|desempenho garantido/i, "promessa de desempenho"],
];
for (const [re, label] of FORBIDDEN) ok(!re.test(src), `sem ${label}`);

// 4) Interlinking contextual anti-canibalização.
ok(src.includes("/servicos/conserto-pc-notebook"), "link para manutenção de computador");
ok(src.includes("/servicos/upgrade-ssd-memoria"), "link para upgrade de SSD/RAM");

// 5) Rotas duplicadas bloqueadas.
for (const dup of ["/servicos/pc-gamer", "/servicos/montagem-de-pc"]) {
  // Redirecionar (Navigate) para a canônica é permitido; renderizar página própria não.
  const re = new RegExp(`path="${dup}"[^>]*element=\\{<(?!Navigate)`);
  ok(!re.test(routes), `rota duplicada ${dup} não renderiza página própria (canônica: /servicos/montagem-pc)`);
}

if (failed > 0) {
  console.error(`\n✗ check:pc-assembly-service falhou (${failed} verificação(ões)).`);
  console.error("  Corrija a página /servicos/montagem-pc antes de publicar.");
  process.exit(1);
}
console.log("\n✓ check:pc-assembly-service OK");
