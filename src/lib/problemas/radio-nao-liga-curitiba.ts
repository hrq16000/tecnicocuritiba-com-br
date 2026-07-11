import type { ProblemaPageData } from "./types";

export const problema: ProblemaPageData = {
  "slug": "radio-nao-liga-curitiba",
  "title": "Rádio Não Liga em Curitiba | Conserto de Som",
  "metaDescription": "Rádio não liga, sem reação ao botão? Conserto profissional de rádio e equipamento de som em Curitiba. Diagnóstico presencial na oficina.",
  "h1": "Rádio Não Liga — Conserto Profissional em Curitiba",
  "categoria": "Problemas de Rádio / Som",
  "intro": "Seu rádio ou aparelho de som não liga? Pode ser fonte de alimentação queimada, fusível interno, botão de power com defeito ou placa principal danificada. Antes de descartar, vale a pena um diagnóstico — muitos casos são resolvidos com troca de componentes simples.\n\n**Importante:** Para conserto de rádio e equipamento de som, o atendimento é presencial na oficina. É necessário trazer o aparelho.",
  "sintomas": [
    {
      "titulo": "Nenhuma reação ao ligar",
      "desc": "Sem LED, sem som, nenhuma resposta. Fonte ou fusível.",
      "gravidade": "Médio"
    },
    {
      "titulo": "LED acende mas não funciona",
      "desc": "Indicador liga mas sem som ou funções. Placa principal.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Liga e desliga sozinho",
      "desc": "Proteção ativada por curto ou superaquecimento.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Funciona intermitentemente",
      "desc": "Às vezes liga, às vezes não. Mau contato ou solda fria.",
      "gravidade": "Simples a médio"
    }
  ],
  "causas": [
    {
      "titulo": "Fonte de alimentação queimada",
      "desc": "Picos de energia queimam capacitores e reguladores de tensão.",
      "tipo": "hardware"
    },
    {
      "titulo": "Fusível interno queimado",
      "desc": "Proteção contra surtos. Pode ser só o fusível ou indicar problema maior.",
      "tipo": "hardware"
    },
    {
      "titulo": "Botão de power com defeito",
      "desc": "Desgaste mecânico do botão liga/desliga.",
      "tipo": "desgaste"
    },
    {
      "titulo": "Solda fria na placa",
      "desc": "Soldas que se deterioram com ciclos térmicos ao longo dos anos.",
      "tipo": "desgaste"
    }
  ],
  "cenarios": [
    {
      "nivel": "Simples",
      "desc": "Troca de fusível ou botão de power.",
      "tempo": "1 a 3 dias",
      "custo": "R$ 80 a R$ 200"
    },
    {
      "nivel": "Médio",
      "desc": "Reparo da fonte de alimentação (capacitores, reguladores).",
      "tempo": "3 a 7 dias",
      "custo": "R$ 150 a R$ 350"
    },
    {
      "nivel": "Complexo",
      "desc": "Reparo de placa principal ou troca de transformador.",
      "tempo": "7 a 15 dias",
      "custo": "R$ 250 a R$ 500"
    }
  ],
  "riscos": [
    "Não tente abrir aparelhos ligados na tomada",
    "Capacitores armazenam carga mesmo desligado"
  ],
  "diagnostico": "Teste de fonte com multímetro, verificação de fusível e componentes. Presencial na oficina.",
  "solucao": "Troca de fusível, reparo de fonte ou placa principal conforme diagnóstico.",
  "quandoCompensa": "Aparelhos de som de qualidade (Yamaha, Denon, Marantz, Sony) quase sempre compensam reparo.",
  "quandoNaoCompensa": "Rádios portáteis baratos onde o custo do reparo supera o valor do aparelho.",
  "whatsappMessage": "Olá! Meu rádio/som não liga. Podem consertar?",
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
      "label": "Som Chiando",
      "to": "/problemas/som-chiando-curitiba"
    },
    {
      "label": "Caixa de Som Sem Bluetooth",
      "to": "/problemas/caixa-som-sem-bluetooth-curitiba"
    }
  ],
  "conteudoExtra": "## Atendimento Presencial\n\nPara conserto de rádio e som, traga o aparelho à oficina.\n\n### O Que Trazer\n\n- O aparelho completo\n- Controle remoto (se tiver)\n- Cabo de força original"
};
