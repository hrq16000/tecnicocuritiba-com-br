import type { ProblemaPageData } from "./types";

export const problema: ProblemaPageData = {
  "slug": "pc-travando-jogos-curitiba",
  "title": "PC Travando em Jogos em Curitiba | Diagnóstico Gamer Profissional",
  "metaDescription": "PC trava, congela ou dá tela azul em jogos? Técnico gamer em Curitiba diagnostica GPU, CPU, RAM, temperaturas e fonte. Atendimento especializado.",
  "h1": "PC Travando em Jogos — Diagnóstico Gamer em Curitiba",
  "categoria": "Hardware / Desktop",
  "intro": "Travamentos durante jogos são um dos problemas mais frustrantes para gamers. O PC pode congelar, apresentar tela preta, dar tela azul (BSOD) ou simplesmente fechar o jogo sem aviso. As causas vão desde superaquecimento até problemas de hardware.\n\nEm Curitiba, nosso técnico especializado em PCs gamer utiliza benchmarks profissionais, monitoramento térmico e testes de estresse para identificar o componente responsável — seja GPU, CPU, RAM, fonte ou armazenamento.",
  "sintomas": [
    {
      "titulo": "Jogo congela e PC não responde",
      "desc": "A tela trava completamente e nem Ctrl+Alt+Del funciona. Geralmente indica problema de GPU, driver ou superaquecimento.",
      "gravidade": "Alta"
    },
    {
      "titulo": "Tela preta durante gameplay",
      "desc": "O monitor fica preto mas o PC continua ligado. Pode ser crash de driver da GPU ou proteção térmica.",
      "gravidade": "Alta"
    },
    {
      "titulo": "FPS cai drasticamente após alguns minutos",
      "desc": "Começa bem mas depois fica lento. Clássico sintoma de thermal throttling — CPU ou GPU reduzindo clock por calor.",
      "gravidade": "Média"
    },
    {
      "titulo": "Tela azul (BSOD) em jogos específicos",
      "desc": "Erros como VIDEO_TDR_FAILURE ou IRQL_NOT_LESS_OR_EQUAL indicam driver de vídeo ou RAM com defeito.",
      "gravidade": "Alta"
    },
    {
      "titulo": "PC reinicia sozinho durante jogos pesados",
      "desc": "Desliga e reinicia sem aviso. Forte indicativo de fonte subdimensionada ou com defeito.",
      "gravidade": "Alta"
    },
    {
      "titulo": "Artefatos visuais (quadrados, linhas coloridas)",
      "desc": "Elementos gráficos estranhos na tela durante jogos. Pode ser VRAM com defeito ou GPU com problema de solda.",
      "gravidade": "Alta"
    }
  ],
  "causas": [
    {
      "titulo": "Superaquecimento de CPU ou GPU",
      "tipo": "hardware",
      "desc": "Pasta térmica seca, cooler com poeira ou ventilação inadequada elevam temperaturas acima de 90°C, causando throttling e travamentos."
    },
    {
      "titulo": "Fonte subdimensionada ou instável",
      "tipo": "hardware",
      "desc": "Fonte sem potência suficiente para GPU + CPU em carga máxima causa quedas de tensão e desligamentos."
    },
    {
      "titulo": "RAM com defeito ou incompatível",
      "tipo": "hardware",
      "desc": "Módulos de memória com erros causam BSOD e travamentos aleatórios, especialmente sob alta demanda."
    },
    {
      "titulo": "Driver de vídeo problemático",
      "tipo": "software",
      "desc": "Versão de driver NVIDIA/AMD com bug para seu modelo de GPU pode causar crashes em jogos específicos."
    },
    {
      "titulo": "SSD/HD com setores defeituosos",
      "tipo": "desgaste",
      "desc": "Se o jogo está instalado em disco com falhas, pode travar ao tentar carregar texturas ou assets."
    },
    {
      "titulo": "GPU com defeito de hardware",
      "tipo": "hardware",
      "desc": "VRAM com falha ou chip BGA com micro-trincas causa artefatos e crashes sob carga pesada."
    }
  ],
  "cenarios": [
    {
      "nivel": "Simples",
      "desc": "Limpeza, troca de pasta térmica e atualização/rollback de drivers.",
      "tempo": "2-3 horas",
      "custo": "R$100–R$200"
    },
    {
      "nivel": "Médio",
      "desc": "Troca de fonte, módulo de RAM ou configuração de overclock/underclock.",
      "tempo": "2-4 horas",
      "custo": "R$200–R$500"
    },
    {
      "nivel": "Complexo",
      "desc": "Substituição de GPU ou reparo de placa-mãe com BGA rework.",
      "tempo": "3-7 dias",
      "custo": "R$400–R$1.200"
    }
  ],
  "riscos": [
    "Superaquecimento prolongado pode danificar permanentemente CPU e GPU",
    "Fonte instável pode queimar outros componentes como placa-mãe e SSD",
    "Overclock sem monitoramento térmico adequado acelera o desgaste",
    "RAM com defeito pode corromper dados do sistema e saves de jogos"
  ],
  "diagnostico": "O diagnóstico gamer inclui: teste de estresse com FurMark (GPU) e Prime95 (CPU) com monitoramento de temperaturas via HWiNFO, teste de memória com MemTest86, verificação de tensões da fonte com multímetro, análise de logs de BSOD e benchmark comparativo para identificar gargalos.\n\nEsse processo identifica com precisão qual componente está causando os travamentos.",
  "solucao": "A solução varia conforme a causa: limpeza profunda com troca de pasta térmica para superaquecimento, upgrade de fonte 80 Plus para instabilidade elétrica, substituição de módulo de RAM, clean install de drivers com DDU, ou substituição de GPU quando há defeito de hardware.\n\nTodo serviço inclui teste de estabilidade com jogos pesados antes da entrega.",
  "quandoCompensa": "PCs com hardware relativamente recente (últimas 2-3 gerações) quase sempre compensam o reparo. Troca de pasta térmica e fonte são investimentos que prolongam muito a vida útil.",
  "quandoNaoCompensa": "Se a GPU tem defeito irreparável e é de geração muito antiga, pode ser melhor fazer upgrade. Avaliaremos o custo-benefício com você.",
  "whatsappMessage": "Olá! Meu PC está travando em jogos. Gostaria de agendar um diagnóstico gamer.",
  "relatedPages": [
    {
      "to": "/computador-lento",
      "label": "Computador Lento"
    },
    {
      "to": "/problemas/pc-reiniciando-sozinho-curitiba",
      "label": "PC Reiniciando Sozinho"
    },
    {
      "to": "/problemas/placa-de-video-nao-funciona-curitiba",
      "label": "Placa de Vídeo Não Funciona"
    },
    {
      "to": "/montagem-pc",
      "label": "Montagem de PC"
    }
  ],
  "conteudoExtra": "## Temperaturas Ideais Para Gaming\n\n| Componente | Temperatura Ideal | Limite Crítico |\n|---|---|---|\n| CPU | 60-75°C | 90°C+ |\n| GPU | 65-80°C | 95°C+ |\n| RAM | 35-45°C | 60°C+ |\n\n## Potência de Fonte Recomendada\n\n- RTX 3060 / RX 6600: mínimo 550W\n- RTX 4070 / RX 7800 XT: mínimo 650W\n- RTX 4080/4090: mínimo 850W\n\nSempre use fontes 80 Plus Bronze ou superior para estabilidade."
};
