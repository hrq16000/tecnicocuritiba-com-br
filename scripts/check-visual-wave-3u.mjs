#!/usr/bin/env node
/**
 * Gate RODADA 3U — propagação visual contextual
 * Verifica que /atendimento-remoto, /seguranca-dos-dados e /servicos/montagem-de-pc
 * mantêm as seções exigidas, sem template único e sem claims proibidos.
 */
import { readFileSync } from "node:fs";

const FORBIDDEN = [
  /\bSLA\b/i,
  /plano mensal de (?:suporte|manuten)/i,
  /suporte ilimitado(?! )/i,
  /monitoramento 24\/7/i,
  /garantia de desempenho/i,
  /\bFPS garantid/i,
  /overclock (?:incluso|garantido)/i,
];

const ALLOW_NEGATIVE = [
  /não oferecemos/i,
  /não é plano/i,
  /não prometemos/i,
  /não trabalhamos/i,
  /não fazemos/i,
  /nem com metas/i,
  /não assumimos/i,
];

const TARGETS = [
  {
    file: "src/pages/AtendimentoRemoto.tsx",
    label: "/atendimento-remoto",
    required: [
      'id="requisitos"',
      'id="fluxo"',
      'id="autorizacao"',
      'id="limites-remoto"',
      'id="perguntas"',
      "BusinessPageSchema",
      "/seguranca-dos-dados",
      "/atendimento-domicilio",
    ],
  },
  {
    file: "src/pages/SegurancaDados.tsx",
    label: "/seguranca-dos-dados",
    required: [
      'id="pilares"',
      'id="responsabilidades"',
      'id="credenciais"',
      'id="acesso-remoto"',
      'id="armazenamento"',
      'id="perguntas"',
      "/atendimento-remoto",
      "/servicos/backup-recuperacao",
    ],
  },
  {
    file: "src/pages/servicos/MontagemPc.tsx",
    label: "/servicos/montagem-de-pc",
    required: [
      "data-escopo-montagem",
      'id="tipos-de-pc"',
      'id="compatibilidade"',
      'id="bios-drivers"',
      'id="contextos-montagem"',
      "/empresa-de-ti-curitiba",
      "/servicos/upgrade-ssd-ram",
    ],
  },
];

let failures = 0;

for (const t of TARGETS) {
  let src;
  try {
    src = readFileSync(t.file, "utf8");
  } catch {
    console.error(`✖ ${t.label}: arquivo ausente (${t.file})`);
    failures++;
    continue;
  }

  for (const token of t.required) {
    if (!src.includes(token)) {
      console.error(`✖ ${t.label}: faltando "${token}"`);
      failures++;
    }
  }

  for (const line of src.split("\n")) {
    if (ALLOW_NEGATIVE.some((r) => r.test(line))) continue;
    for (const re of FORBIDDEN) {
      if (re.test(line)) {
        console.error(`✖ ${t.label}: claim proibido (${re}) em: ${line.trim().slice(0, 120)}`);
        failures++;
      }
    }
  }
}

if (failures > 0) {
  console.error(`\nGate 3U falhou com ${failures} problema(s).`);
  process.exit(1);
}

console.log("✔ Gate visual 3U: atendimento remoto, segurança dos dados e montagem de PC OK.");
