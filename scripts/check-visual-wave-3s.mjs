#!/usr/bin/env node
/**
 * Gate da Rodada 3S — sistema visual empresarial.
 *
 * Escopo real: a página empresarial canônica do projeto é /suporte-empresas.
 * /empresa-de-ti-curitiba e /assistencia-tecnica-empresas-curitiba são redirects
 * de consolidação B2B (anti-canibalização) — o gate garante que continuam redirects
 * e que o piloto não foi propagado para outras páginas.
 */
import { readFileSync, existsSync } from "node:fs";

const PAGE = "src/pages/SuporteEmpresas.tsx";
const B2B_COMPONENTS = [
  "src/components/b2b/BusinessHero.tsx",
  "src/components/b2b/BusinessPageSchema.tsx",
  "src/components/b2b/BusinessContextGrid.tsx",
  "src/components/b2b/SupportModelComparison.tsx",
  "src/components/b2b/ThirdPartyLimits.tsx",
  "src/components/b2b/BusinessInlineCTA.tsx",
  "src/components/b2b/BusinessContinuityPillars.tsx",
];

const errors = [];
let checks = 0;
const ok = (cond, msg) => {
  checks += 1;
  if (!cond) errors.push(msg);
};

for (const f of B2B_COMPONENTS) {
  ok(existsSync(f), `componente empresarial ausente: ${f}`);
}

const src = readFileSync(PAGE, "utf8");

// 1. Sistema visual empresarial aplicado (nada de template residencial/sintomas)
for (const c of ["BusinessHero", "BusinessContinuityPillars", "BusinessContextGrid", "SupportModelComparison", "ThirdPartyLimits", "BusinessInlineCTA"]) {
  ok(src.includes(`<${c}`), `${PAGE}: componente <${c}> não aplicado`);
}
ok(!src.includes("<PageHero"), `${PAGE}: não deve usar PageHero (template residencial)`);
ok(!src.includes("CuratedSymptomSections"), `${PAGE}: não deve usar template de sintomas`);

// 2. Máximo de três CTAs de WhatsApp na página
const ctas = (src.match(/data-cta-location=/g) || []).length + (src.match(/<CTASection/g) || []).length;
ok(ctas <= 3, `${PAGE}: máximo de 3 CTAs empresariais (encontrados ${ctas})`);
ok(src.includes("suporte_empresas_hero"), `${PAGE}: CTA do hero deve manter contexto de rastreio`);
ok(src.includes("suporte_empresas_inline"), `${PAGE}: CTA intermediário ausente`);

// 3. TrustStrip/sinais sem duplicação de autoridade acima da dobra
const desde1998 = (src.match(/desde 1998/gi) || []).length;
ok(desde1998 <= 1, `${PAGE}: "desde 1998" deve aparecer no máximo uma vez (${desde1998})`);

// 4. Avulso × recorrente presente e sem promessa de ilimitado
ok(/Atendimento avulso ou recorrente/.test(src), `${PAGE}: comparação avulso × recorrente ausente`);
ok(
  /não significa suporte ilimitado/i.test(src),
  `${PAGE}: falta a linha de decisão sobre recorrente não ser ilimitado`,
);

// 5. Limites de terceiros
ok(/depende de fornecedor/i.test(src), `${PAGE}: bloco de limites de terceiros ausente`);
ok(src.includes("/seguranca-dos-dados"), `${PAGE}: link para /seguranca-dos-dados ausente`);

// 6. Zero SLA, prioridade prometida ou preço novo
const proibidos = [
  /\bSLA\b/,
  /suporte ilimitado (?!não)/i,
  /atendimento prioritário/i,
  /remoto prioritário/i,
  /24 horas por dia/i,
  /R\$\s?\d/,
  /\/m[êe]s/i,
];
for (const re of proibidos) {
  const m = src.match(re);
  ok(!m, `${PAGE}: termo proibido na rodada 3S: "${m ? m[0] : re}"`);
}

// 6b. "tempo de resposta garantido" só é aceito em forma negativa
for (const m of src.match(/.{0,160}tempo de resposta garantido/gi) || []) {
  ok(/n[ãa]o trabalhamos|n[ãa]o oferecemos|sem |n[ãa]o h[áa]|nunca/i.test(m), `${PAGE}: promessa de tempo de resposta: "${m.trim()}"`);
}

// 7. Contextos sem falsa especialização por profissão em heading
const nichos = /(TI|Suporte)\s+para\s+(advogados|advocacia|cl[íi]nicas|m[ée]dicos|cont(adores|abilidade)|arquitet)/i;
ok(!nichos.test(src), `${PAGE}: heading com falsa especialização por profissão`);

// 8. Checklist não pede senha
ok(/Não envie por mensagem/.test(src), `${PAGE}: checklist de segurança ausente`);
ok(!/envie sua senha|informe sua senha/i.test(src), `${PAGE}: checklist não pode solicitar senha`);

// 9. JSON-LD preservado (WebPage/BreadcrumbList/FAQPage via BusinessPageSchema)
ok(src.includes("<BusinessPageSchema"), `${PAGE}: JSON-LD empresarial removido`);
ok(!/"@type":\s*"(Offer|Review|AggregateRating|LegalService|MedicalBusiness)"/.test(src),
  `${PAGE}: schema fora do escopo empresarial`);

// 10. Zero rota nova: redirects de consolidação preservados
const legacy = readFileSync("src/LegacyApp.tsx", "utf8");
ok(
  /path="\/empresa-de-ti-curitiba" element=\{<Navigate to="\/suporte-empresas"/.test(legacy),
  "src/LegacyApp.tsx: redirect /empresa-de-ti-curitiba → /suporte-empresas foi alterado",
);
ok(
  !/path="\/servicos\/suporte-tecnico-empresarial"/.test(legacy),
  "src/LegacyApp.tsx: rota nova criada fora do escopo (zero URL nova)",
);

// 11. Sem propagação do piloto para outras páginas
const NAO_PROPAGAR = [
  "src/pages/servicos/RedesWifi.tsx",
  "src/pages/servicos/BackupRecuperacao.tsx",
  "src/pages/servicos/MontagemPc.tsx",
  "src/pages/ProblemaPage.tsx",
];
for (const f of NAO_PROPAGAR) {
  if (!existsSync(f)) continue;
  const c = readFileSync(f, "utf8");
  ok(!/components\/b2b\//.test(c), `${f}: piloto empresarial propagado fora do escopo da 3S`);
}

if (errors.length) {
  console.error("check:visual-wave-3s FALHOU\n" + errors.map((e) => ` - ${e}`).join("\n"));
  process.exit(1);
}
console.log(`check:visual-wave-3s — ${checks} verificações OK`);
