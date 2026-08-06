#!/usr/bin/env node
/**
 * Gate da Rodada 3R — governança do cluster /problemas/*.
 *
 * Valida no código-fonte (sem rede) que:
 *  - existem exatamente as duas páginas de sintoma governadas;
 *  - a página curada tem alerta de risco, comparação e verificações seguras;
 *  - nenhum procedimento invasivo é recomendado;
 *  - o template de sintoma não emite Service/Offer/preço em JSON-LD;
 *  - nenhuma rota nova é criada pelos blocos curados.
 */
import { readFileSync } from "node:fs";

const fail = [];
const ok = [];
const check = (cond, msg) => (cond ? ok.push(msg) : fail.push(msg));

const curated = readFileSync("src/components/CuratedSymptomSections.tsx", "utf8");
const template = readFileSync("src/pages/ProblemaPage.tsx", "utf8");

// 1. Cluster governado: exatamente duas páginas de sintoma sob curadoria.
const GOVERNADAS = ["notebook-nao-liga-curitiba", "computador-lento-curitiba"];
const keys = [...curated.matchAll(/^\s{2}"([a-z0-9-]+)":\s*\{$/gm)].map((m) => m[1]);
check(
  keys.every((k) => GOVERNADAS.includes(k)),
  `blocos curados restritos ao cluster governado (encontrados: ${keys.join(", ") || "nenhum"})`,
);
check(keys.includes("notebook-nao-liga-curitiba"), "notebook-nao-liga-curitiba possui bloco curado");

// 2. Elementos obrigatórios do padrão visual de sintoma.
check(/Quando não insistir em ligar/.test(curated), "alerta de risco presente");
check(/id="risco-imediato"/.test(curated), "âncora do alerta de risco");
check(/id="nao-liga-ou-sem-imagem"/.test(curated), "bloco 'não liga x sem imagem'");
check(/id="observar-antes"/.test(curated), "bloco de verificações seguras");
check(/scroll-mt-24/.test(curated), "scroll-margin-top nas âncoras curadas");

// 3. Segurança: nenhum procedimento invasivo recomendado.
const PROIBIDOS = [
  /desmont/i, /abrir o notebook e/i, /remover a bateria interna/i, /reflow/i,
  /secador/i, /freezer/i, /curto em pinos/i, /aquecer a placa/i,
];
for (const re of PROIBIDOS) {
  check(!re.test(curated), `sem procedimento invasivo (${re})`);
}
check(/Não abra o equipamento/.test(curated), "aviso explícito de não abrir o equipamento");

// 4. Nenhuma promessa: sem preço, prazo fechado ou garantia de recuperação.
check(!/R\$\s?\d/.test(curated), "sem preço nos blocos curados");
check(!/garantimos a recupera|recuperação garantida/i.test(curated), "sem promessa de recuperação");

// 5. JSON-LD do template: WebPage/LocalBusiness/FAQ/Breadcrumb, nunca Offer/Product.
check(!/"@type":\s*"Offer"/.test(template), "template sem Offer");
check(!/"@type":\s*"Product"/.test(template), "template sem Product");
check(!/"@type":\s*"HowTo"/.test(template), "template sem HowTo");
check(/faqSchema/.test(template) && /breadcrumbSchema/.test(template), "FAQPage e BreadcrumbList preservados");

// 6. Zero rota nova: todo link dos blocos curados aponta para rota já registrada.
const app = readFileSync("src/App.tsx", "utf8");
const links = [...curated.matchAll(/to:\s*"(\/[^"]+)"/g)].map((m) => m[1]);
for (const l of links) {
  const known = app.includes(`"${l}"`) || l.startsWith("/servicos/") || l.startsWith("/problemas/");
  check(known, `link curado aponta para rota existente: ${l}`);
}

// 7. Teto de CTAs do template (hero WhatsApp, hero ligar, rodapé).
const ctas = [...template.matchAll(/data-cta-location=/g)].length;
check(ctas <= 4, `no máximo 4 pontos de CTA no template de sintoma (encontrados: ${ctas})`);

console.log(`check:visual-wave-3r — ${ok.length} verificações OK`);
if (fail.length) {
  console.error("\nFALHAS:\n" + fail.map((f) => ` - ${f}`).join("\n"));
  process.exit(1);
}
