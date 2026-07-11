import type { ProblemaPageData } from "./types";

export const problema: ProblemaPageData = {
  "slug": "tv-demora-ligar-curitiba",
  "title": "TV Demora Para Ligar em Curitiba | Capacitores",
  "metaDescription": "TV demora para ligar? Diagnóstico de fonte e capacitores em Curitiba.",
  "h1": "TV Demora Para Ligar — Diagnóstico em Curitiba",
  "categoria": "Problemas de TV",
  "intro": "TV saudável liga em 5-15s. Se demora 30+, geralmente capacitores desgastados na fonte.\n\n**Trazer à oficina.**",
  "sintomas": [
    {
      "titulo": "LED pisca antes de ligar",
      "desc": "Capacitores fracos.",
      "gravidade": "Médio"
    },
    {
      "titulo": "30+ segundos para imagem",
      "desc": "Fonte ou backlight.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Liga na 2ª tentativa",
      "desc": "Fonte instável.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Estalo ao ligar",
      "desc": "Capacitor ou relé.",
      "gravidade": "Médio"
    }
  ],
  "causas": [
    {
      "titulo": "Capacitores desgastados",
      "desc": "Incham com o tempo (3-7 anos).",
      "tipo": "hardware"
    },
    {
      "titulo": "Backlight enfraquecendo",
      "desc": "LEDs exigem mais energia.",
      "tipo": "hardware"
    },
    {
      "titulo": "Firmware corrompido",
      "desc": "Inicialização lenta.",
      "tipo": "software"
    }
  ],
  "cenarios": [
    {
      "nivel": "Simples",
      "desc": "Troca de capacitores.",
      "tempo": "3 a 7 dias",
      "custo": "R$ 150 a R$ 300"
    },
    {
      "nivel": "Médio",
      "desc": "Placa fonte ou backlight.",
      "tempo": "5 a 10 dias",
      "custo": "R$ 250 a R$ 500"
    },
    {
      "nivel": "Complexo",
      "desc": "Placa principal + fonte.",
      "tempo": "7 a 15 dias",
      "custo": "R$ 400 a R$ 800"
    }
  ],
  "riscos": [
    "Capacitores podem estourar",
    "Problema piora progressivamente"
  ],
  "diagnostico": "Medição de tensões, inspeção de capacitores. Presencial.",
  "solucao": "Troca de capacitores, reparo da fonte.",
  "quandoCompensa": "Quase sempre — reparo barato.",
  "quandoNaoCompensa": "Múltiplas placas em TV antiga.",
  "whatsappMessage": "Olá! TV demora para ligar. Podem diagnosticar?",
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
  "conteudoExtra": "## Sinais de Capacitores\n- Demora mais a cada semana\n- Melhor quando quente\n- Piora no frio"
};
