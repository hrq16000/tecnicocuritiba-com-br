#!/usr/bin/env node
/**
 * Gate da Rodada 3T — propagação controlada do sistema visual empresarial.
 *
 * Escopo real (URLs existentes, zero rota nova):
 *  - /servicos/redes-wifi          (src/pages/servicos/RedesWifi.tsx)
 *  - /servicos/backup-recuperacao  (src/pages/servicos/BackupRecuperacao.tsx)
 *
 * /servicos/manutencao-preventiva-empresas, /servicos/backup-para-empresas e
 * /servicos/redes-e-wifi não existem no projeto — criar essas rotas violaria
 * "zero URL nova" e canibalizaria as páginas canônicas acima.
 *
 * A propagação é por SEÇÃO empresarial (BusinessContextGrid / ThirdPartyLimits),
 * sem substituir o template de serviço residencial (hero, ServiceHeroSummary, FAQ).
 */
import { readFileSync, existsSync } from "node:fs";

const errors = [];
let checks = 0;
const ok = (cond, msg) => {
  checks += 1;
  if (!cond) errors.push(msg);
};

const PAGES = {
  "src/pages/servicos/RedesWifi.tsx": {
    contextId: "rede-empresarial",
    limitsId: "limites-rede",
    canonical: "/servicos/redes-wifi",
  },
  "src/pages/servicos/BackupRecuperacao.tsx": {
    contextId: "contextos-backup",
    limitsId: "credenciais",
    canonical: "/servicos/backup-recuperacao",
  },
};

// Rotas inexistentes não podem ser criadas nesta rodada
const legacy = readFileSync("src/LegacyApp.tsx", "utf8");
for (const rota of [
  "/servicos/manutencao-preventiva-empresas",
  "/servicos/backup-para-empresas",
  "/servicos/redes-e-wifi",
]) {
  ok(!legacy.includes(`path="${rota}"`), `rota nova fora do escopo da 3T: ${rota}`);
}

for (const [file, cfg] of Object.entries(PAGES)) {
  ok(existsSync(file), `página ausente: ${file}`);
  if (!existsSync(file)) continue;
  const src = readFileSync(file, "utf8");

  // 1. Sistema visual empresarial aplicado por seção
  ok(src.includes("<BusinessContextGrid"), `${file}: BusinessContextGrid não aplicado`);
  ok(src.includes("<ThirdPartyLimits"), `${file}: ThirdPartyLimits não aplicado`);
  ok(src.includes(`id="${cfg.contextId}"`), `${file}: âncora ${cfg.contextId} ausente`);
  ok(src.includes(`id="${cfg.limitsId}"`), `${file}: âncora ${cfg.limitsId} ausente`);

  // 2. Template de serviço preservado (sem virar página empresarial)
  ok(src.includes("<ServiceHeroSummary"), `${file}: template de serviço removido (ServiceHeroSummary)`);
  ok(!src.includes("<BusinessHero"), `${file}: hero empresarial não deve substituir o hero de serviço`);
  ok(!src.includes("CuratedSymptomSections"), `${file}: template de sintomas não pertence a esta página`);

  // 3. Sumário navegável cobre as novas seções
  ok(
    src.includes(`{ id: "${cfg.contextId}"`),
    `${file}: seção empresarial fora do sumário (${cfg.contextId})`,
  );
  ok(src.includes(`{ id: "${cfg.limitsId}"`), `${file}: seção de limites fora do sumário (${cfg.limitsId})`);

  // 4. SEO preservado: canonical, PageSEO, breadcrumbs e schema de serviço
  ok(src.includes("<PageSEO"), `${file}: PageSEO removido`);
  ok(src.includes(`path="${cfg.canonical}"`), `${file}: canonical alterado (${cfg.canonical})`);
  ok(src.includes("<ServiceLandingSchema"), `${file}: JSON-LD de serviço removido`);
  ok(src.includes("breadcrumbs={["), `${file}: BreadcrumbList removido`);
  ok(/faqs=\{\[/.test(src), `${file}: FAQPage removida do schema`);
  ok(
    !/"@type":\s*"(LegalService|MedicalBusiness|AggregateRating|Review)"/.test(src),
    `${file}: schema fora do escopo`,
  );

  // 5. Governança editorial empresarial
  const proibidos = [/\bSLA\b/, /suporte ilimitado/i, /atendimento prioritário/i, /24 horas por dia/i, /\/m[êe]s\b/i];
  for (const re of proibidos) {
    const m = src.match(re);
    ok(!m, `${file}: termo proibido na rodada 3T: "${m ? m[0] : re}"`);
  }

  // 6. Contextos sem falsa especialização por profissão
  const nichos = /(TI|Suporte|Rede|Backup)\s+para\s+(advogados|advocacia|cl[íi]nicas|m[ée]dicos|cont(adores|abilidade)|arquitet)/i;
  ok(!nichos.test(src), `${file}: heading com falsa especialização por profissão`);

  // 7. Limites de terceiros explícitos + link de governança
  ok(/fornecedor/i.test(src), `${file}: limites de terceiros ausentes`);
  ok(
    src.includes("/suporte-empresas") || src.includes("/seguranca-dos-dados"),
    `${file}: link para governança empresarial ausente`,
  );
}

// 8. Sem propagação acidental para sintomas / montagem
for (const f of ["src/pages/ProblemaPage.tsx", "src/pages/servicos/MontagemPc.tsx"]) {
  if (!existsSync(f)) continue;
  ok(!/components\/b2b\//.test(readFileSync(f, "utf8")), `${f}: propagação empresarial fora do escopo da 3T`);
}

if (errors.length) {
  console.error("check:visual-wave-3t FALHOU\n" + errors.map((e) => ` - ${e}`).join("\n"));
  process.exit(1);
}
console.log(`check:visual-wave-3t — ${checks} verificações OK`);

// 9. Blocos editoriais da rodada 3T (backup e redes)
const backup = readFileSync("src/pages/servicos/BackupRecuperacao.tsx", "utf8");
ok(backup.includes('id="conceitos"'), "backup: bloco sincronização × backup × recuperação ausente");
ok(/Sincroniza[çc][ãa]o/.test(backup), "backup: conceito de sincronização ausente");
ok(backup.includes('id="estrategia"'), "backup: estratégia de cópias ausente");
ok(backup.includes('id="restauracao"'), "backup: teste de restauração ausente");
ok(!/nunca perca|seguran[çc]a total|backup inf[aá]l[ií]vel|sempre protegidos/i.test(backup), "backup: promessa absoluta");

const redes = readFileSync("src/pages/servicos/RedesWifi.tsx", "utf8");
ok(redes.includes('id="contextos-rede"'), "redes: bloco residencial × empresarial ausente");
ok(redes.includes('id="pilares-rede"'), "redes: pilares de rede ausentes");
ok(/home office/i.test(redes), "redes: público residencial/home office perdido");
ok(/operadora/i.test(redes), "redes: limite de operadora ausente");
ok(/reparo mec[âa]nico ou eletr[ôo]nico/i.test(redes), "redes: limite de impressoras (somente rede) ausente");

if (errors.length) {
  console.error("check:visual-wave-3t (3T extra) FALHOU\n" + errors.map((e) => ` - ${e}`).join("\n"));
  process.exit(1);
}
console.log(`check:visual-wave-3t extras — ${checks} verificações OK`);
