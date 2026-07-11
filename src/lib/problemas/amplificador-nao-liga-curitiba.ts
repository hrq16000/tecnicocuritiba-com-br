import type { ProblemaPageData } from "./types";

export const problema: ProblemaPageData = {
  "slug": "amplificador-nao-liga-curitiba",
  "title": "Amplificador Não Liga em Curitiba | Conserto",
  "metaDescription": "Amplificador de som não liga? Receiver, potência ou integrado? Conserto profissional em Curitiba.",
  "h1": "Amplificador Não Liga — Conserto em Curitiba",
  "categoria": "Problemas de Rádio / Som",
  "intro": "Amplificadores, receivers e potências são equipamentos robustos mas que podem apresentar falhas na fonte de alimentação, fusíveis de proteção e transistores de saída. Muitos são consertáveis com custo acessível.\n\n**Necessário trazer à oficina.**",
  "sintomas": [
    {
      "titulo": "Nenhuma reação",
      "desc": "Sem LED, sem relé. Fusível ou transformador.",
      "gravidade": "Médio"
    },
    {
      "titulo": "LED acende mas sem som",
      "desc": "Proteção ativada. Transistor de saída em curto.",
      "gravidade": "Médio a complexo"
    },
    {
      "titulo": "Relé clica e desliga",
      "desc": "Tenta ligar mas a proteção desativa. Curto na saída.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Esquenta demais e desliga",
      "desc": "Superaquecimento por ventilação ruim ou componente em fuga.",
      "gravidade": "Médio"
    }
  ],
  "causas": [
    {
      "titulo": "Fusível queimado",
      "desc": "Proteção contra surto. Pode ser só o fusível.",
      "tipo": "hardware"
    },
    {
      "titulo": "Transistores de saída queimados",
      "desc": "Curto nas caixas ou impedância errada queima transistores.",
      "tipo": "hardware"
    },
    {
      "titulo": "Transformador queimado",
      "desc": "Surto de energia pode queimar o transformador.",
      "tipo": "hardware"
    },
    {
      "titulo": "Capacitores da fonte degradados",
      "desc": "Capacitores eletrolíticos perdem capacidade com o tempo.",
      "tipo": "desgaste"
    }
  ],
  "cenarios": [
    {
      "nivel": "Simples",
      "desc": "Troca de fusível.",
      "tempo": "1 dia",
      "custo": "R$ 50 a R$ 120"
    },
    {
      "nivel": "Médio",
      "desc": "Troca de transistores de saída e ajuste de bias.",
      "tempo": "3 a 7 dias",
      "custo": "R$ 200 a R$ 500"
    },
    {
      "nivel": "Complexo",
      "desc": "Troca de transformador ou reparo extenso da placa.",
      "tempo": "7 a 20 dias",
      "custo": "R$ 350 a R$ 800"
    }
  ],
  "riscos": [
    "Amplificadores de potência trabalham com tensões altas — perigoso abrir em casa",
    "Impedância errada das caixas queima transistores"
  ],
  "diagnostico": "Medição de fonte, teste de transistores, verificação de fusíveis e proteção. Presencial na oficina.",
  "solucao": "Troca de fusível, transistores, capacitores ou transformador.",
  "quandoCompensa": "Amplificadores de qualidade (Onkyo, Yamaha, Marantz, Crown) quase sempre compensam.",
  "quandoNaoCompensa": "Amplificadores genéricos muito baratos com transformador queimado.",
  "whatsappMessage": "Olá! Meu amplificador não liga. Podem consertar?",
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
      "label": "Rádio Não Liga",
      "to": "/problemas/radio-nao-liga-curitiba"
    }
  ],
  "conteudoExtra": "## Impedância das Caixas\n\nVerifique se as caixas conectadas têm a impedância correta (4Ω ou 8Ω). Caixas com impedância muito baixa sobrecarregam o amplificador e queimam transistores."
};
