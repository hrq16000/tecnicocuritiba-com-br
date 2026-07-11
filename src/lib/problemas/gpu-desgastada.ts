import type { ProblemaPageData } from "./types";

export const problema: ProblemaPageData = {
  "slug": "gpu-desgastada",
  "title": "GPU Desgastada | Diagnóstico Curitiba",
  "metaDescription": "GPU/placa de vídeo com problemas? Artefatos, tela preta, desempenho baixo? Diagnóstico em Curitiba.",
  "h1": "GPU Desgastada — Sinais e O Que Fazer",
  "categoria": "Erros e Casos Reais",
  "intro": "GPUs (placas de vídeo) são componentes que trabalham sob alta temperatura e carga. Com o tempo, solda, pasta térmica e capacitores degradam. Os sinais mais comuns são artefatos na tela, travamentos em jogos e tela preta. GPUs usadas em mineração de criptomoedas sofrem desgaste acelerado.",
  "sintomas": [
    {
      "titulo": "Artefatos visuais (pixels coloridos)",
      "desc": "Pontos, linhas ou blocos coloridos na tela. Memória da GPU ou chip com defeito.",
      "gravidade": "Médio a complexo"
    },
    {
      "titulo": "Tela preta em jogos",
      "desc": "GPU não aguenta carga e desliga o vídeo.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Performance muito abaixo do esperado",
      "desc": "Temperaturas altas causam throttling ou chip degradado.",
      "gravidade": "Médio"
    }
  ],
  "causas": [
    {
      "titulo": "Desgaste por temperatura",
      "desc": "Anos de uso em temperatura alta degradam a solda e os chips.",
      "tipo": "desgaste"
    },
    {
      "titulo": "Mineração de criptomoedas",
      "desc": "Uso 24/7 em carga máxima acelera o desgaste em 3-5x.",
      "tipo": "desgaste"
    },
    {
      "titulo": "Pasta térmica seca",
      "desc": "GPU esquenta mais que deveria, acelerando degradação.",
      "tipo": "desgaste"
    },
    {
      "titulo": "Solda fria (BGA)",
      "desc": "Microsoldas entre chip e substrato perdem contato.",
      "tipo": "desgaste"
    }
  ],
  "cenarios": [
    {
      "nivel": "Simples",
      "desc": "Troca de pasta térmica e limpeza. Pode resolver throttling.",
      "tempo": "1h",
      "custo": "R$ 120 a R$ 200"
    },
    {
      "nivel": "Médio",
      "desc": "Troca de pasta + pads térmicos + teste extensivo.",
      "tempo": "1 a 2 dias",
      "custo": "R$ 200 a R$ 350"
    },
    {
      "nivel": "Complexo",
      "desc": "Reballing (resolda do chip). Nem sempre funciona.",
      "tempo": "5 a 15 dias",
      "custo": "R$ 300 a R$ 600"
    }
  ],
  "riscos": [
    "Reballing não é garantido e a GPU pode falhar novamente",
    "Continuar usando com artefatos pode causar dano ao monitor (raro)"
  ],
  "diagnostico": "Teste de estresse com monitoramento de temperatura, análise de artefatos, verificação de solda com diagnóstico térmico. Custo: R$ 99,99.",
  "solucao": "Para superaquecimento: manutenção térmica. Para solda fria: reballing (quando viável). Para desgaste severo: substituição.",
  "quandoCompensa": "Limpeza + pasta sempre compensa. Reballing compensa para GPUs de médio a alto valor.",
  "quandoNaoCompensa": "Reballing de GPU de baixo valor (GT 710, GT 1030) ou muito antiga.",
  "whatsappMessage": "Olá! Minha placa de vídeo está com problemas. Podem me ajudar?",
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
      "label": "Sem Vídeo",
      "to": "/problemas/computador-sem-video-curitiba"
    },
    {
      "label": "Conserto Placa",
      "to": "/servicos/conserto-placa"
    },
    {
      "label": "Placa-Mãe Queimada",
      "to": "/problemas/placa-mae-queimada"
    },
    {
      "label": "PC Superaquecendo",
      "to": "/problemas/pc-superaquecendo-curitiba"
    },
    {
      "label": "Montagem PC",
      "to": "/servicos/montagem-pc"
    }
  ],
  "conteudoExtra": "### GPUs de Mineração: Cuidado\n\nSe você comprou GPU usada que foi usada em mineração, saiba que:\n- A vida útil foi drasticamente reduzida\n- Soldas BGA estão mais frágeis\n- Ventoinhas podem estar desgastadas\n- Reballing pode dar sobrevida temporária\n\n### Entendendo os Artefatos Visuais\n\nArtefatos são o sintoma mais visível de uma GPU com problemas. Existem diferentes tipos:\n\n- **Pontos coloridos aleatórios**: Geralmente memória VRAM com defeito. Pode ser solda fria no chip de memória.\n- **Blocos retangulares**: Chip GPU com degradação. Sinal mais grave.\n- **Linhas horizontais/verticais**: Pode ser GPU ou monitor — teste com outro monitor primeiro.\n- **Textos distorcidos**: Memória de vídeo ou driver corrompido (testar com DDU + reinstalação).\n\n### Temperatura: O Inimigo Número 1\n\nGPUs são projetadas para operar até 80-85°C sob carga. Acima de 90°C, entram em **thermal throttling** (reduzem performance para não queimar). Acima de 100°C, começam a sofrer danos reais.\n\n**Causas de superaquecimento em GPUs:**\n1. Pasta térmica seca (após 2-4 anos de uso)\n2. Ventoinhas com rolamento desgastado\n3. Pads térmicos comprimidos ou ressecados\n4. Gabinete sem fluxo de ar adequado\n5. Cooler obstruído por poeira\n\n### Reballing: O Que É e Quando Funciona\n\nReballing é o processo de remover o chip GPU da placa, limpar as microsoldas BGA e resoldá-las com esferas novas de estanho. É um procedimento complexo que exige:\n\n- Estação de retrabalho BGA profissional\n- Stencils específicos para cada chip\n- Experiência técnica significativa\n\n**Taxa de sucesso**: 60-80% dependendo do chip e extensão do dano. Pode dar sobrevida de meses a anos, mas não é garantia permanente.\n\n**Compensa quando**: GPU custa R$ 1.500+ nova e o reballing fica em R$ 300-500.\n**Não compensa quando**: GPU vale menos de R$ 500 nova ou já foi reballing antes.\n\n### Manutenção Preventiva para GPUs\n\nPara prolongar a vida da sua GPU em Curitiba (onde o clima úmido e a poeira são fatores):\n\n| Intervalo | Ação | Custo |\n|---|---|---|\n| 6 meses | Limpeza externa com ar comprimido | Grátis (DIY) |\n| 12-18 meses | Troca de pasta térmica | R$ 120-200 |\n| 24 meses | Troca de pads térmicos | R$ 150-250 |\n| Quando necessário | Troca de ventoinhas | R$ 80-200 |"
};
