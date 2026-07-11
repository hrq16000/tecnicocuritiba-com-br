import type { ProblemaPageData } from "./types";

export const problema: ProblemaPageData = {
  "slug": "computador-liga-e-desliga-curitiba",
  "title": "Computador Liga e Desliga Sozinho | Técnico em Curitiba",
  "metaDescription": "Computador ligando e desligando sozinho em Curitiba? Veja causas, riscos e solução profissional. Diagnóstico no mesmo dia.",
  "h1": "Computador Liga e Desliga Sozinho em Curitiba — O Que Está Acontecendo?",
  "categoria": "Problemas de Computador",
  "intro": "Seu computador liga por alguns segundos e desliga? Ou funciona por minutos e reinicia sem aviso? Esse é um dos problemas mais frustrantes e também um dos mais perigosos para o hardware. Cada vez que o computador desliga abruptamente, existe risco de dano ao disco rígido, corrupção de dados e até queima de componentes.\n\nEsse comportamento pode ter várias causas — desde algo simples como pasta térmica seca até problemas graves como curto na placa-mãe. O importante é não ignorar: um computador que liga e desliga repetidamente está tentando se proteger de algo, e continuar forçando pode piorar muito o problema.\n\nAtendemos esse tipo de caso diariamente em Curitiba e região. Nesta página, explicamos tudo o que você precisa saber antes de buscar ajuda técnica.",
  "sintomas": [
    {
      "titulo": "Desliga após 3-5 segundos",
      "desc": "Mal inicia e já desliga. Indica proteção do processador por superaquecimento extremo ou curto-circuito na placa.",
      "gravidade": "Complexo"
    },
    {
      "titulo": "Desliga após 10-30 minutos de uso",
      "desc": "Funciona normalmente por um tempo e depois desliga. Superaquecimento progressivo, pasta térmica seca ou ventoinha travada.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Reinicia aleatoriamente",
      "desc": "Desliga e liga sozinho em momentos imprevisíveis. Pode ser fonte instável, memória com defeito ou driver com bug.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Desliga durante jogos ou programas pesados",
      "desc": "Funciona no uso leve mas desliga sob carga. GPU superaquecendo, fonte subdimensionada ou throttling térmico.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Desliga e não liga mais por minutos",
      "desc": "Precisa esperar esfriar para ligar de novo. Superaquecimento severo com proteção térmica ativa.",
      "gravidade": "Médio a complexo"
    }
  ],
  "causas": [
    {
      "titulo": "Superaquecimento do processador",
      "desc": "Pasta térmica seca, cooler com poeira acumulada ou ventoinha travada fazem o processador atingir temperatura crítica. O sistema desliga para se proteger.",
      "tipo": "desgaste"
    },
    {
      "titulo": "Fonte de alimentação instável",
      "desc": "Uma fonte degradada pode não fornecer energia estável. Sob carga, a tensão cai e o sistema desliga. Fontes genéricas são as mais propensas.",
      "tipo": "hardware"
    },
    {
      "titulo": "Curto-circuito intermitente",
      "desc": "Fios encostando, parafuso solto na placa ou trilha parcialmente danificada podem causar desligamentos aleatórios.",
      "tipo": "hardware"
    },
    {
      "titulo": "Memória RAM com defeito",
      "desc": "RAM com setores corrompidos pode funcionar em operações leves mas falhar sob pressão, causando reinicializações.",
      "tipo": "hardware"
    },
    {
      "titulo": "Driver ou Windows corrompido",
      "desc": "Drivers de vídeo com bug ou Windows com arquivos corrompidos podem causar tela azul seguida de reinício automático.",
      "tipo": "software"
    },
    {
      "titulo": "Overclock instável ou upgrade mal feito",
      "desc": "Configurações de overclock agressivas ou upgrade de peças incompatíveis podem causar instabilidade.",
      "tipo": "erro-humano"
    }
  ],
  "cenarios": [
    {
      "nivel": "Simples",
      "desc": "Limpeza interna, troca de pasta térmica, reencaixe de componentes. Resolvido na visita.",
      "tempo": "1h a 2h",
      "custo": "R$ 120 a R$ 200"
    },
    {
      "nivel": "Médio",
      "desc": "Troca de fonte, troca de cooler, reinstalação de drivers ou Windows.",
      "tempo": "2h a 4h",
      "custo": "R$ 200 a R$ 400 + peças"
    },
    {
      "nivel": "Complexo",
      "desc": "Reparo de placa-mãe, diagnóstico de curto intermitente, troca de componentes SMD.",
      "tempo": "3 a 7 dias úteis",
      "custo": "R$ 300 a R$ 600+"
    }
  ],
  "riscos": [
    "Cada desligamento abrupto pode danificar o disco rígido e corromper dados",
    "Continuar usando força o hardware ao limite e pode queimar componentes",
    "Trocar peças por achismo sem diagnóstico desperdiça dinheiro",
    "Abrir o gabinete sem conhecimento pode causar descarga eletrostática",
    "Ignorar o problema pode transformar reparo simples em substituição total"
  ],
  "diagnostico": "O diagnóstico para computador que liga e desliga envolve: monitoramento de temperatura em tempo real, teste de estresse do processador e GPU, análise da fonte com multímetro sob carga, teste de memória RAM por horas, e inspeção da placa-mãe com lupa.\n\nÉ um dos diagnósticos mais detalhados porque o problema pode ser intermitente — ou seja, nem sempre aparece na primeira tentativa. Por isso o diagnóstico profissional é essencial: R$ 99,99 de investimento que podem economizar centenas em peças trocadas sem necessidade.",
  "solucao": "Após identificar a causa exata, o reparo pode variar desde uma simples limpeza (30 min) até reparo em bancada (dias). O laudo técnico detalha exatamente o que foi encontrado e o que precisa ser feito.\n\nPara superaquecimento: limpeza profunda + troca de pasta térmica. Para fonte: substituição por modelo adequado. Para placa-mãe: reparo em bancada com equipamento profissional.",
  "quandoCompensa": "Compensa reparar na maioria dos casos de superaquecimento e fonte. O custo é baixo comparado a um computador novo e o equipamento volta a funcionar normalmente.",
  "quandoNaoCompensa": "Não compensa quando há múltiplos curtos na placa-mãe de equipamento antigo, quando o processador foi danificado pelo calor excessivo, ou quando o custo total ultrapassa 50% de um novo.",
  "whatsappMessage": "Olá! Meu computador está ligando e desligando sozinho. Podem me ajudar?",
  "relatedPages": [
    {
      "label": "Como Funciona",
      "to": "/como-funciona"
    },
    {
      "label": "Preços e Políticas",
      "to": "/precos-e-politicas"
    },
    {
      "label": "Diagnóstico Técnico",
      "to": "/diagnostico-tecnico"
    },
    {
      "label": "PC Superaquecendo",
      "to": "/problemas/pc-superaquecendo-curitiba"
    },
    {
      "label": "Computador Não Liga",
      "to": "/problemas/computador-nao-liga-curitiba"
    },
    {
      "label": "Conserto PC/Notebook",
      "to": "/servicos/conserto-pc-notebook"
    }
  ],
  "conteudoExtra": "### Por Que o Computador Desliga Sozinho?\n\nO computador tem mecanismos de autoproteção. Quando a temperatura do processador ultrapassa o limite seguro (geralmente 95-105°C), o sistema desliga automaticamente para evitar dano permanente. Da mesma forma, quando a fonte não consegue fornecer energia estável, o computador se desliga para proteger os componentes.\n\n### O Que NÃO Fazer\n\n1. Não continue usando o computador normalmente — cada desligamento pode causar mais dano\n2. Não tente resolver com ventilador externo — o problema é interno\n3. Não reinstale Windows achando que é software — na maioria das vezes é hardware\n4. Não compre fonte nova sem diagnóstico — pode não ser a fonte\n\n### Atendimento Urgente em Curitiba\n\nPara casos de computador ligando e desligando, priorizamos o atendimento por se tratar de risco de dano progressivo. Atendemos toda Curitiba e região metropolitana com visita técnica no mesmo dia."
};
