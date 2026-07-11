import type { ProblemaPageData } from "./types";

export const problema: ProblemaPageData = {
  "slug": "tv-cheiro-queimado-curitiba",
  "title": "TV com Cheiro de Queimado em Curitiba | URGENTE",
  "metaDescription": "TV com cheiro de queimado? DESLIGUE imediatamente. Diagnóstico urgente em Curitiba.",
  "h1": "TV com Cheiro de Queimado — Desligue Imediatamente!",
  "categoria": "Problemas de TV",
  "intro": "**DESLIGUE DA TOMADA IMEDIATAMENTE.** Cheiro de queimado indica curto-circuito ou componente superaquecido. Risco de incêndio.\n\n**URGENTE — Trazer à oficina.**",
  "sintomas": [
    {
      "titulo": "Cheiro de plástico queimado",
      "desc": "DESLIGUE.",
      "gravidade": "Complexo"
    },
    {
      "titulo": "Fumaça",
      "desc": "Curto ativo. DESLIGUE DA TOMADA.",
      "gravidade": "Complexo"
    },
    {
      "titulo": "Estalo + cheiro",
      "desc": "Capacitor estourou.",
      "gravidade": "Complexo"
    }
  ],
  "causas": [
    {
      "titulo": "Capacitor estourado",
      "desc": "Idade ou sobretensão.",
      "tipo": "hardware"
    },
    {
      "titulo": "Curto na fonte",
      "desc": "Causa mais comum.",
      "tipo": "hardware"
    },
    {
      "titulo": "Surto elétrico",
      "desc": "Pico de tensão (raio).",
      "tipo": "hardware"
    },
    {
      "titulo": "Ventilação bloqueada",
      "desc": "TV em nicho sem ar.",
      "tipo": "erro-humano"
    }
  ],
  "cenarios": [
    {
      "nivel": "Simples",
      "desc": "Capacitor isolado.",
      "tempo": "3 a 7 dias",
      "custo": "R$ 150 a R$ 300"
    },
    {
      "nivel": "Médio",
      "desc": "Fonte queimada.",
      "tempo": "5 a 10 dias",
      "custo": "R$ 250 a R$ 600"
    },
    {
      "nivel": "Complexo",
      "desc": "Curto propagou.",
      "tempo": "10 a 20 dias",
      "custo": "R$ 500 a R$ 1.200"
    }
  ],
  "riscos": [
    "RISCO DE INCÊNDIO",
    "Danos se propagam",
    "Gases tóxicos"
  ],
  "diagnostico": "Inspeção visual e teste de continuidade. Presencial.",
  "solucao": "Substituição de componentes danificados.",
  "quandoCompensa": "Dano restrito à fonte.",
  "quandoNaoCompensa": "Curto em todas as placas.",
  "whatsappMessage": "Olá! TV com cheiro de queimado. Já desliguei. Urgente?",
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
      "label": "Conserto de TV",
      "to": "/servicos/conserto-tv"
    },
    {
      "label": "TV Não Liga",
      "to": "/tv-nao-liga-curitiba"
    }
  ],
  "conteudoExtra": "## O Que Fazer\n1. DESLIGUE DA TOMADA\n2. Ventile o ambiente\n3. NÃO ligue novamente\n4. Traga à oficina"
};
