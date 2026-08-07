/**
 * Geradores de FAQ localizada.
 *
 * REGRA (gate `check:local-faq`): o array retornado aqui é a ÚNICA fonte de
 * verdade — ele alimenta ao mesmo tempo o conteúdo visível e o JSON-LD
 * `FAQPage`. Nunca escreva perguntas direto no JSON-LD.
 */

export type LocalFaq = { question: string; answer: string };

export interface BairroFaqInput {
  nome: string;
  cidade: string;
  tempoDeslocamento: string;
  servicosDestaque: string[];
  pontosReferencia?: string[];
}

const lower = (s: string) => s.charAt(0).toLowerCase() + s.slice(1);

/**
 * 8 perguntas localizadas por bairro, derivadas dos dados reais da página
 * (tempo de deslocamento, serviços em destaque e regiões vizinhas).
 */
export function buildBairroFaqs(data: BairroFaqInput): LocalFaq[] {
  const { nome, cidade, tempoDeslocamento, servicosDestaque } = data;
  const vizinhos = (data.pontosReferencia ?? []).slice(0, 4);
  const servicos = servicosDestaque.slice(0, 4).map(lower);

  const faqs: LocalFaq[] = [
    {
      question: `Vocês atendem a domicílio no ${nome}, em ${cidade}?`,
      answer: `Sim. Fazemos atendimento a domicílio no ${nome} (${cidade}) com horário agendado. O técnico leva as ferramentas e faz o diagnóstico no local sempre que o caso permite; se precisar de bancada, combinamos a retirada antes de qualquer coisa.`,
    },
    {
      question: `Quanto tempo o técnico demora para chegar no ${nome}?`,
      answer: `${tempoDeslocamento} no ${nome}. O prazo pode variar conforme o trânsito de ${cidade} e a agenda do dia — confirmamos a janela de horário pelo WhatsApp antes de sair.`,
    },
    {
      question: `Qual o valor da visita técnica no ${nome}?`,
      answer: `A visita técnica no ${nome} começa em R$ 99,99, já com o deslocamento incluso. Depois do diagnóstico informamos o orçamento fechado e só executamos com a sua aprovação.`,
    },
    {
      question: `Quais serviços vocês fazem no ${nome}?`,
      answer: `No ${nome} os mais pedidos são ${servicos.join(", ")}. Também fazemos diagnóstico, manutenção preventiva, backup e suporte remoto para quem prefere resolver sem visita.`,
    },
    {
      question: `Atendem no mesmo dia no ${nome} em caso de urgência?`,
      answer: `Na maioria dos dias sim. Se você chamar no WhatsApp pela manhã, costumamos encaixar o ${nome} ainda no período da tarde. Urgências de empresa têm prioridade de agenda.`,
    },
    {
      question: `Vocês atendem empresas e escritórios no ${nome}?`,
      answer: `Sim. Atendemos comércios, clínicas e escritórios no ${nome} tanto de forma avulsa quanto com acompanhamento mensal: rede, backup, estações de trabalho e suporte ao usuário.`,
    },
    {
      question: `O serviço feito no ${nome} tem garantia?`,
      answer: `Tem. São 90 dias de garantia sobre a mão de obra executada. Peças seguem a garantia do fabricante, informada por escrito no orçamento antes da troca.`,
    },
  ];

  if (vizinhos.length) {
    faqs.push({
      question: `Além do ${nome}, quais regiões próximas vocês atendem?`,
      answer: `Atendemos também ${vizinhos.join(", ")} e demais bairros vizinhos de ${cidade}, no mesmo formato de agendamento e sem taxa extra de deslocamento.`,
    });
  }

  return faqs;
}

/** Remove perguntas repetidas mantendo a primeira ocorrência. */
export function dedupeFaqs(faqs: LocalFaq[]): LocalFaq[] {
  const seen = new Set<string>();
  return faqs.filter((f) => {
    const key = f.question.trim().toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
