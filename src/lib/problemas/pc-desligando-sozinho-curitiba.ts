import type { ProblemaPageData } from "./types";

export const problema: ProblemaPageData = {
  "slug": "pc-desligando-sozinho-curitiba",
  "title": "PC Desligando Sozinho em Curitiba — Diagnóstico e Solução",
  "metaDescription": "PC desliga sozinho sem aviso? Veja causas reais (superaquecimento, fonte, placa-mãe) e solução profissional em Curitiba. Diagnóstico técnico.",
  "h1": "PC Desligando Sozinho — Diagnóstico e Reparo em Curitiba",
  "categoria": "Hardware",
  "intro": "Quando o computador desliga completamente sozinho — sem reiniciar, sem tela azul — o problema quase sempre é hardware. Diferente do reinício, onde o PC volta a ligar automaticamente, o desligamento total indica que algo cortou a energia abruptamente.\n\nAs causas mais comuns são superaquecimento severo (o processador ativa proteção térmica e corta energia), fonte de alimentação falhando sob carga, e problemas na placa-mãe como capacitores estufados ou VRM com defeito.\n\nEsse é um sintoma que não deve ser ignorado: cada desligamento abrupto pode causar dano ao disco rígido, corrupção de dados e desgaste acelerado de componentes. O diagnóstico rápido previne danos maiores e mais caros.",
  "sintomas": [
    {
      "titulo": "PC desliga completamente sem aviso",
      "desc": "Como se tivesse tirado da tomada — sem tela azul, sem mensagem. Indica corte abrupto de energia.",
      "gravidade": "Complexo"
    },
    {
      "titulo": "Desliga após alguns minutos de uso",
      "desc": "Padrão típico de superaquecimento: funciona frio, desliga quando esquenta. Tempo diminui progressivamente.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Desliga só em jogos ou renderização",
      "desc": "A fonte não suporta o consumo máximo de CPU + GPU, cortando energia sob carga pesada.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Desliga e não liga mais por alguns minutos",
      "desc": "Proteção térmica ativada — o sistema só permite religar após o processador esfriar.",
      "gravidade": "Complexo"
    },
    {
      "titulo": "Desliga com cheiro de queimado",
      "desc": "Componente em curto-circuito — situação grave que requer desligar da tomada imediatamente.",
      "gravidade": "Complexo"
    },
    {
      "titulo": "Desliga ao tocar ou mover o gabinete",
      "desc": "Mau contato em cabos de energia, placa-mãe com parafuso solto ou conector ATX com folga.",
      "gravidade": "Simples"
    }
  ],
  "causas": [
    {
      "titulo": "Superaquecimento crítico do processador",
      "desc": "Quando o CPU ultrapassa a temperatura máxima (geralmente 100-105°C), o sistema desliga instantaneamente para evitar dano permanente.",
      "tipo": "desgaste"
    },
    {
      "titulo": "Fonte de alimentação com defeito",
      "desc": "Fontes desgastadas ou subdimensionadas falham ao fornecer energia estável, especialmente sob carga máxima.",
      "tipo": "hardware"
    },
    {
      "titulo": "Capacitores estufados na placa-mãe",
      "desc": "Capacitores eletrolíticos incham com o tempo, causando instabilidade de tensão e desligamentos aleatórios.",
      "tipo": "desgaste"
    },
    {
      "titulo": "VRM da placa-mãe superaquecendo",
      "desc": "Os reguladores de tensão (VRM) aquecem excessivamente em placas sem dissipador adequado, cortando energia ao CPU.",
      "tipo": "hardware"
    },
    {
      "titulo": "Curto-circuito interno",
      "desc": "Parafuso solto, cabo encostando em componente ou placa com trilha rompida podem causar curto intermitente.",
      "tipo": "hardware"
    },
    {
      "titulo": "Botão power com mau contato",
      "desc": "O botão de ligar/desligar pode estar com contato intermitente, enviando sinal de desligamento aleatoriamente.",
      "tipo": "desgaste"
    }
  ],
  "cenarios": [
    {
      "nivel": "Simples",
      "desc": "Limpeza interna profunda, troca de pasta térmica, reencaixe de cabos e conectores.",
      "tempo": "1-2 horas",
      "custo": "R$80–R$150"
    },
    {
      "nivel": "Médio",
      "desc": "Troca de fonte de alimentação, reparo do botão power, substituição de cooler.",
      "tempo": "2-4 horas",
      "custo": "R$150–R$400"
    },
    {
      "nivel": "Complexo",
      "desc": "Substituição de placa-mãe, reparo de VRM/capacitores, diagnóstico de curto-circuito.",
      "tempo": "2-5 dias",
      "custo": "R$300–R$800+"
    }
  ],
  "riscos": [
    "HD pode desenvolver setores defeituosos por desligamentos abruptos repetidos",
    "SSD pode sofrer corrupção da tabela de partição",
    "Componente em curto pode danificar outros componentes conectados",
    "Dados não salvos são perdidos a cada desligamento",
    "Superaquecimento ignorado pode queimar o processador permanentemente"
  ],
  "diagnostico": "Abrimos o gabinete para inspeção visual: procuramos capacitores estufados, marcas de queimado, poeira excessiva e cabos soltos. Medimos temperaturas do CPU/GPU/VRM com sensores. Testamos a fonte com multímetro em todas as linhas (3.3V, 5V, 12V). Verificamos o botão power. Fazemos teste de estresse controlado para reproduzir o desligamento e identificar o limiar exato (temperatura, carga, tempo).",
  "solucao": "Para superaquecimento: limpeza profunda com ar comprimido, troca de pasta térmica premium, verificação/substituição de coolers. Para fonte: substituição por modelo 80 Plus certificado com potência adequada ao sistema. Para placa-mãe: reparo de capacitores (quando viável) ou substituição completa. Para curto-circuito: identificação e isolamento do ponto de falha. Sempre recomendamos uso de nobreak para proteção adicional.",
  "quandoCompensa": "Na maioria dos casos compensa reparar. Troca de fonte e limpeza térmica são soluções de baixo custo com alto impacto. Mesmo troca de placa-mãe pode valer se processador e memórias estiverem funcionais.",
  "quandoNaoCompensa": "Se a placa-mãe queimou e levou junto processador e/ou memórias, o custo acumulado de substituição pode se aproximar de um PC novo. PCs com mais de 8-10 anos geralmente não justificam investimento alto em reparo.",
  "whatsappMessage": "Olá! Meu PC está desligando sozinho e preciso de diagnóstico profissional em Curitiba. Podem me ajudar?",
  "relatedPages": [
    {
      "to": "/problemas/pc-reiniciando-sozinho-curitiba",
      "label": "PC Reiniciando Sozinho"
    },
    {
      "to": "/problemas/computador-nao-liga-curitiba",
      "label": "Computador Não Liga"
    },
    {
      "to": "/problemas/computador-muito-barulhento-curitiba",
      "label": "PC Barulhento"
    },
    {
      "to": "/problemas/tela-azul-windows-curitiba",
      "label": "Tela Azul Windows"
    },
    {
      "to": "/problemas/computador-lento-curitiba",
      "label": "Computador Lento"
    },
    {
      "to": "/servicos",
      "label": "Todos os Serviços"
    }
  ],
  "conteudoExtra": "## Desligando vs. Reiniciando: Qual a Diferença?\n\nÉ importante distinguir os dois sintomas, pois indicam causas diferentes:\n\n| Comportamento | Causa Provável | Gravidade |\n|---|---|---|\n| **Desliga e não religa** | Superaquecimento, fonte defeituosa | Alta |\n| **Desliga e religa sozinho** | Driver, RAM, instabilidade elétrica | Média |\n| **Desliga só em jogos** | Fonte subdimensionada, GPU superaquecendo | Média |\n| **Desliga com cheiro** | Curto-circuito, componente queimando | Crítica |\n\n## Superaquecimento: O Inimigo #1 em Curitiba\n\nEmbora Curitiba tenha clima mais ameno, o acúmulo de poeira nos coolers é igualmente problemático. PCs em ambientes com carpete, cortinas e animais de estimação acumulam poeira muito mais rapidamente.\n\n### Sinais de Superaquecimento\n- PC desliga após tempo previsível (5, 10, 15 minutos)\n- Ventiladores fazem barulho excessivo antes de desligar\n- Gabinete está quente ao toque\n- O tempo até desligar é cada vez menor\n\n### Prevenção\n- Limpeza interna a cada 6 meses\n- Troca de pasta térmica anualmente\n- Gabinete em local ventilado (não dentro de móvel fechado)\n- Filtros de poeira nos ventiladores\n\n## Fonte de Alimentação: Não Economize\n\nUma fonte de qualidade é o investimento mais importante para a longevidade do PC. Fontes genéricas sem certificação podem:\n- Entregar tensão instável que danifica componentes\n- Não ter proteção contra surto/curto\n- Falhar silenciosamente, degradando outros componentes\n\n**Recomendação**: invista em fonte 80 Plus Bronze ou superior, dimensionada com 20-30% de folga acima do consumo real do sistema."
};
