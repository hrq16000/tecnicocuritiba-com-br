#!/usr/bin/env node
/**
 * Gate da Rodada 3Q — propagação controlada do padrão visual de serviços.
 *
 * Valida, apenas nas seis páginas comerciais do escopo:
 *  - presença do padrão (ServiceHeroSummary + sumário com ids reais + caixas editoriais + CTA intermediário);
 *  - no máximo três CTAs de conversão por página;
 *  - todos os ids referenciados no sumário existem na página;
 *  - nenhuma promessa proibida (percentuais de ganho, segurança absoluta, garantia de recuperação,
 *    reparo físico de impressora);
 *  - FAQ preservada.
 */
import { readFileSync } from "node:fs";

const PAGES = [
  { file: "src/pages/servicos/ConsertoPcNotebook.tsx", route: "/servicos/conserto-pc-notebook" },
  { file: "src/pages/servicos/FormatacaoComputador.tsx", route: "/servicos/formatacao-computador" },
  { file: "src/pages/servicos/RemocaoVirus.tsx", route: "/servicos/remocao-virus" },
  { file: "src/pages/servicos/UpgradeSsdMemoria.tsx", route: "/servicos/upgrade-ssd-memoria" },
  { file: "src/pages/servicos/BackupRecuperacao.tsx", route: "/servicos/backup-recuperacao" },
  { file: "src/pages/servicos/RedesWifi.tsx", route: "/servicos/redes-wifi" },
];

const FORBIDDEN = [
  { re: /\b\d+\s*(vezes|x)\s*mais\s*r[áa]pido/i, msg: "promessa numérica de desempenho" },
  { re: /at[ée]\s+\d+\s*%\s*(mais|de)\s*(r[áa]pido|desempenho|performance)/i, msg: "percentual de desempenho" },
  { re: /seguran[çc]a\s+(absoluta|total|100%)/i, msg: "promessa de segurança absoluta" },
  { re: /garantia\s+de\s+recupera[çc][ãa]o/i, msg: "garantia de recuperação de dados" },
  { re: /(conserto|reparo)\s+(de|da)\s+impressora/i, msg: "reparo físico de impressora" },
];

const errors = [];

for (const { file, route } of PAGES) {
  let src;
  try {
    src = readFileSync(file, "utf8");
  } catch {
    errors.push(`${route}: arquivo não encontrado (${file})`);
    continue;
  }

  if (!src.includes("<ServiceHeroSummary")) errors.push(`${route}: faltando ServiceHeroSummary (resumo + confiança + sumário)`);
  if (!src.includes("<InlineTriageCTA")) errors.push(`${route}: faltando CTA intermediário de triagem`);

  const callouts = (src.match(/<EditorialCallout/g) || []).length;
  if (callouts < 2 || callouts > 3) errors.push(`${route}: caixas editoriais fora do intervalo 2–3 (encontradas ${callouts})`);

  // Sumário: todos os ids precisam existir como âncora real na página.
  const tocBlock = src.split("<ServiceHeroSummary")[1]?.split("/>")[0] ?? "";
  const ids = [...tocBlock.matchAll(/\{\s*id:\s*"([^"]+)"/g)].map((m) => m[1]);
  if (ids.length < 3) errors.push(`${route}: sumário com menos de 3 âncoras`);
  if (new Set(ids).size !== ids.length) errors.push(`${route}: sumário com âncoras duplicadas`);
  for (const id of ids) {
    if (!src.includes(`id="${id}"`)) errors.push(`${route}: âncora "${id}" do sumário não existe na página`);
  }

  // Confiança aparece uma única vez (via ServiceHeroSummary).
  const trust = (src.match(/<TrustStrip/g) || []).length + (src.match(/<ServiceHeroSummary/g) || []).length;
  if (trust !== 1) errors.push(`${route}: faixa de confiança deve aparecer exatamente uma vez (encontradas ${trust})`);

  // Máximo de três CTAs de conversão (hero, intermediário, final).
  const ctas =
    (src.match(/onClick=\{handleWhatsAppClick\}/g) || []).length +
    (src.match(/<InlineTriageCTA/g) || []).length;
  if (ctas > 3) errors.push(`${route}: mais de três CTAs de conversão (${ctas})`);

  if (!/Perguntas Frequentes/i.test(src)) errors.push(`${route}: bloco de FAQ ausente`);
  if (!src.includes('id="faq"')) errors.push(`${route}: FAQ sem âncora estável id="faq"`);

  for (const { re, msg } of FORBIDDEN) {
    if (re.test(src)) errors.push(`${route}: conteúdo proibido — ${msg}`);
  }
}

// Checagens específicas por serviço.
const specific = [
  { file: "src/pages/servicos/FormatacaoComputador.tsx", re: /backup/i, msg: "formatação precisa manter bloco de backup" },
  { file: "src/pages/servicos/RemocaoVirus.tsx", re: /Limites da remo[çc][ãa]o/i, msg: "vírus precisa manter limites da remoção" },
  { file: "src/pages/servicos/UpgradeSsdMemoria.tsx", re: /Compatibilidade antes da compra/i, msg: "upgrade precisa manter checagem de compatibilidade" },
  { file: "src/pages/servicos/BackupRecuperacao.tsx", re: /Quando parar de usar/i, msg: "recuperação precisa manter alerta de interrupção do uso" },
  { file: "src/pages/servicos/RedesWifi.tsx", re: /se limita à configura[çc][ãa]o, comunica[çc][ãa]o e\s*\n?\s*compartilhamento em rede/i, msg: "redes precisa manter limite de impressoras à conectividade" },
];

for (const { file, re, msg } of specific) {
  const src = readFileSync(file, "utf8");
  if (!re.test(src)) errors.push(`${file}: ${msg}`);
}

if (errors.length) {
  console.error("check:visual-wave-3q FALHOU:\n" + errors.map((e) => ` - ${e}`).join("\n"));
  process.exit(1);
}

console.log(`check:visual-wave-3q OK — ${PAGES.length} páginas no escopo validadas.`);
