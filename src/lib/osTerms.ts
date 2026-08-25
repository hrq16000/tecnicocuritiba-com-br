/**
 * Módulo "Abrir O.S." — termos operacionais, geração de código e síntese
 * para WhatsApp. Fonte única dos textos legais exibidos na página
 * /abrir-os e embutidos na mensagem enviada ao atendimento.
 *
 * Regras globais respeitadas:
 * - Zero CNPJ e zero e-mail em qualquer texto.
 * - Número de WhatsApp nunca aparece como texto visível (só no href wa.me).
 */

export const OS_VISITA_PRECO = "R$ 99,99";
export const OS_COLETA_MIN = "R$ 299,99";

export type OsModalidade = "visita" | "laboratorio";

/** Regras de ambiente da Visita Técnica (aceite obrigatório, item a item). */
export const VISITA_ENV_RULES: string[] = [
  "Estacionamento é de inteira responsabilidade do solicitante (fornecer vaga ou reembolsar os custos).",
  "Distância e silêncio: sem conversas ou perguntas durante o atendimento — dúvidas devem ser sanadas antes do agendamento.",
  "Animais (cães) e crianças mantidos à distância durante o atendimento.",
  "Ambiente livre de fumantes/fumo, sem odores fortes e sem poluição sonora (TV, rádio e celular desligados/baixos próximos ao técnico).",
];

/** Resumo operacional da Modalidade A (visão curta, acima dos aceites). */
export const VISITA_RESUMO: string[] = [
  "Válida SOMENTE para equipamentos FUNCIONANDO (ligam e dão vídeo): upgrades, atualização de sistemas ou montagem.",
  "Tempo máximo de atendimento: 30 minutos.",
  "Não há garantia de resolução imediata — diagnósticos profundos exigem bancada (Modalidade Laboratório).",
];

/** Resumo operacional da Modalidade B (coleta para laboratório). */
export const LAB_RESUMO: string[] = [
  "Para equipamentos que NÃO ligam, eletrônicos complexos (TV, Notebook, Surface, Som etc.) ou defeitos que exigem análise de bancada.",
  "Logística geral (coleta/entrega): 2 a 90 dias úteis.",
  "Cancelamento gratuito ou desistência somente se manifestados em até 24 horas após a coleta.",
];

/**
 * Termos completos da O.S. de laboratório — ESCOPO EXATO exibido na página
 * e embutido na síntese final (cliente + banco de dados). Não reformatar.
 */
export const buildLabTerms = (codigo: string): string =>
  `O.S: ${codigo}

🔎 ⚙️ OBS.: No processo de reparo, efetuaremos os seguintes procedimentos como tentativa de sanar o defeito:
✔️ Reparo no Circuito

Processos inclusos em todos os reparos:
✔️ Banho químico
✔️ Limpeza completa
✔️ Troca de pasta térmica (Utilizada: 12.8w/mk Alta Performance)

➡️ VALOR MÍNIMO PRÉ-APROVADO: R$ 299,99 (Com garantia de 90 dias sobre o reparo).
SE aprovado, pagar o valor inicial de R$ 99,99 (via PIX Nubank) que será abatido no valor do reparo final. Se não sanar o problema, este valor cobre o custo da TENTATIVA / DIAGNÓSTICO.
✔️ Após o diagnóstico, é informado o valor final.

🔎 Este é um ORÇAMENTO. Trabalhamos com prestadores especializados em várias regiões do Brasil. De acordo com a fila, o equipamento pode ser direcionado para laboratório especializado. NÃO INCLUSO PEÇAS.

⚠️ ATENÇÃO: ⚠️
✔️ Aviso Importante (Reballing): Caso seja necessário reballing, o equipamento sofrerá altas temperaturas (forno Honton R690). Devido ao estado prévio da placa, podem ocorrer danos irreversíveis durante o processo.

1️⃣ 🔎 Taxa de TENTATIVA de Reparo: Caso os processos não resolvam o problema ou o defeito mude, é cobrada uma TAXA FIXA (por modelo) à vista/PIX pelos insumos e tempo dedicado.

2️⃣ 🔎 Taxa de CANCELAMENTO: R$ 299,99 (taxa mínima pré-aprovada) caso o cancelamento ocorra após aprovação do orçamento OU após 24 horas úteis da coleta.

3️⃣ 🔎 Logística de Desistência: Caso não aprove, solicitamos a RETIRADA do seu equipamento. NÃO REALIZAMOS ENTREGAS EM CASOS DE DESISTÊNCIA, CANCELAMENTO OU ORÇAMENTO NÃO APROVADO.

4️⃣ 🔎 Abandono: Equipamentos não retirados após aviso (WhatsApp/Ligação) serão RECICLADOS após 90 dias de armazenamento.

5️⃣ 🔎 TEMPO de REPARO: 15 a 45 dias após aprovação do orçamento.`;

/** Código público da O.S.: legível, único na prática e dentro de 6–40 chars. */
export const generateOsCode = (): string => {
  const year = new Date().getFullYear();
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // sem 0/O/1/I — leitura por telefone
  const buf = new Uint8Array(4);
  crypto.getRandomValues(buf);
  const rand = Array.from(buf, (b) => alphabet[b % alphabet.length]).join("");
  return `OS-${year}-${rand}`;
};

export interface OsMessageInput {
  codigo: string;
  modalidade: OsModalidade;
  equipamentoLabel: string;
  sintomaLabel: string;
  marca: string;
  descricao: string;
  bairro: string;
  cidade: string;
}

/**
 * Síntese enxuta e formatada da O.S. para o WhatsApp do atendimento.
 * A Modalidade Laboratório carrega o escopo integral dos termos (exigência
 * contratual); a Visita carrega o aceite das regras de ambiente.
 */
export const buildOsMessage = (input: OsMessageInput): string => {
  const lines: string[] = [
    `🧾 *NOVA O.S. — ${input.codigo}*`,
    `━━━━━━━━━━━━━━━`,
  ];

  if (input.modalidade === "visita") {
    lines.push(
      `🛠️ *Modalidade:* Visita Técnica / Inspeção Local — ${OS_VISITA_PRECO} (até 30 min)`,
    );
  } else {
    lines.push(
      `🔬 *Modalidade:* Coleta para Laboratório — mínimo pré-aprovado ${OS_COLETA_MIN}`,
    );
  }

  lines.push(`💻 *Equipamento:* ${input.equipamentoLabel}`);
  if (input.sintomaLabel) lines.push(`🔧 *Serviço/Sintoma:* ${input.sintomaLabel}`);
  if (input.marca) lines.push(`🏷️ *Marca/Modelo:* ${input.marca}`);
  if (input.descricao) lines.push(`📝 *Descrição:* ${input.descricao}`);
  const local = [input.bairro, input.cidade].filter(Boolean).join(", ");
  if (local) lines.push(`📍 *Local:* ${local}`);

  if (input.modalidade === "visita") {
    lines.push(
      ``,
      `✅ *Regras de ambiente aceitas:* estacionamento pelo solicitante · silêncio durante o atendimento · animais/crianças à distância · ambiente sem fumo, odores fortes ou ruído.`,
    );
  } else {
    lines.push(``, buildLabTerms(input.codigo));
  }

  lines.push(
    ``,
    `📎 Fotos/vídeo do defeito: envio aqui nesta conversa.`,
    `Podem confirmar o recebimento da O.S.?`,
  );

  return lines.join("\n");
};
