import type { ProblemaPageData } from "./types";

export const problema: ProblemaPageData = {
  "slug": "som-automotivo-nao-funciona-curitiba",
  "title": "Som Automotivo Não Funciona em Curitiba | Conserto",
  "metaDescription": "Som do carro não liga, sem áudio ou com chiado? Conserto de rádio automotivo, amplificador e alto-falante em Curitiba.",
  "h1": "Som Automotivo Não Funciona — Conserto em Curitiba",
  "categoria": "Problemas de Rádio / Som",
  "intro": "Problema no som do carro? Rádio que não liga, alto-falante queimado, amplificador sem saída ou Bluetooth que não conecta. Trazendo o aparelho à oficina, fazemos o diagnóstico completo.\n\n**Para rádios removíveis (1-DIN, 2-DIN), traga o aparelho. Para sistemas integrados, consulte disponibilidade.**",
  "sintomas": [
    {
      "titulo": "Rádio não liga",
      "desc": "Sem display, sem reação. Fusível, fiação ou placa.",
      "gravidade": "Simples a médio"
    },
    {
      "titulo": "Liga mas sem som",
      "desc": "Display funciona mas nenhuma saída de áudio.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Som só em alguns alto-falantes",
      "desc": "Canais intermitentes. Fiação ou amplificador.",
      "gravidade": "Simples a médio"
    },
    {
      "titulo": "Bluetooth não conecta",
      "desc": "Módulo BT com defeito ou firmware.",
      "gravidade": "Simples a médio"
    },
    {
      "titulo": "CD/USB não lê",
      "desc": "Leitor de CD com lente suja ou USB sem contato.",
      "gravidade": "Simples"
    }
  ],
  "causas": [
    {
      "titulo": "Fusível queimado",
      "desc": "Fusível do rádio ou da linha de áudio.",
      "tipo": "hardware"
    },
    {
      "titulo": "Conector de fiação com mau contato",
      "desc": "Conectores ISO ou proprietários com oxidação.",
      "tipo": "desgaste"
    },
    {
      "titulo": "Amplificador interno queimado",
      "desc": "CI de potência do rádio queimado.",
      "tipo": "hardware"
    },
    {
      "titulo": "Alto-falante do carro queimado",
      "desc": "Água, poeira e vibração degradam alto-falantes automotivos.",
      "tipo": "desgaste"
    }
  ],
  "cenarios": [
    {
      "nivel": "Simples",
      "desc": "Troca de fusível, limpeza de leitor, ajuste de fiação.",
      "tempo": "1 a 2 dias",
      "custo": "R$ 60 a R$ 150"
    },
    {
      "nivel": "Médio",
      "desc": "Troca de CI de potência ou módulo Bluetooth.",
      "tempo": "3 a 7 dias",
      "custo": "R$ 150 a R$ 350"
    },
    {
      "nivel": "Complexo",
      "desc": "Reparo de placa principal do rádio.",
      "tempo": "7 a 15 dias",
      "custo": "R$ 250 a R$ 500"
    }
  ],
  "riscos": [
    "Instalação elétrica mal feita pode drenar a bateria do carro",
    "Fusível errado pode causar curto na fiação"
  ],
  "diagnostico": "Teste de fusíveis, verificação de fiação, medição de saídas. Presencial na oficina (trazer o aparelho removido).",
  "solucao": "Troca de fusível, reparo de amplificador, ajuste de fiação ou troca de módulo BT.",
  "quandoCompensa": "Rádios Pioneer, Kenwood, JVC, Alpine — peças disponíveis.",
  "quandoNaoCompensa": "Rádios genéricos chineses muito baratos — mais fácil substituir.",
  "whatsappMessage": "Olá! O som do meu carro não funciona. Podem consertar?",
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
      "label": "Rádio Não Liga",
      "to": "/problemas/radio-nao-liga-curitiba"
    },
    {
      "label": "Alto-Falante Queimado",
      "to": "/problemas/alto-falante-queimado-curitiba"
    }
  ],
  "conteudoExtra": "## Como Trazer o Rádio\n\n1. Remova o rádio do painel (ou peça ao eletricista do carro)\n2. Traga o chicote de fiação junto se possível\n3. Anote marca, modelo e sintoma\n\n## Dica\n\nSe o rádio original do carro parou e não compensa reparo, um rádio universal 1-DIN ou 2-DIN é uma alternativa acessível."
};
