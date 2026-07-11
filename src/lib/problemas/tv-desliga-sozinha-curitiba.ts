import type { ProblemaPageData } from "./types";

export const problema: ProblemaPageData = {
  "slug": "tv-desliga-sozinha-curitiba",
  "title": "TV Desliga Sozinha em Curitiba | Diagnóstico e Conserto",
  "metaDescription": "TV desliga sozinha, reinicia ou entra em standby? Conserto profissional em Curitiba.",
  "h1": "TV Desliga Sozinha — Diagnóstico e Conserto em Curitiba",
  "categoria": "Problemas de TV",
  "intro": "TV que desliga sozinha pode ser timer, superaquecimento ou placa fonte. Verifique configurações antes de trazer.\n\n**Necessário trazer a TV à oficina.**",
  "sintomas": [
    {
      "titulo": "Desliga após minutos",
      "desc": "Superaquecimento ou proteção ativada.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Reinicia em loop",
      "desc": "Firmware, placa principal ou fonte instável.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Desliga aleatoriamente",
      "desc": "Timer, sensor ou interferência.",
      "gravidade": "Simples a médio"
    },
    {
      "titulo": "Entra em standby sozinha",
      "desc": "Modo eco, CEC ou timer.",
      "gravidade": "Simples"
    }
  ],
  "causas": [
    {
      "titulo": "Timer de desligamento",
      "desc": "Sleep timer programado.",
      "tipo": "software"
    },
    {
      "titulo": "Superaquecimento",
      "desc": "Sem ventilação adequada.",
      "tipo": "erro-humano"
    },
    {
      "titulo": "Placa fonte instável",
      "desc": "Capacitores degradados.",
      "tipo": "desgaste"
    },
    {
      "titulo": "HDMI CEC",
      "desc": "Dispositivos enviando comando de desligar.",
      "tipo": "software"
    },
    {
      "titulo": "Firmware com bug",
      "desc": "Atualizações com problemas.",
      "tipo": "software"
    }
  ],
  "cenarios": [
    {
      "nivel": "Simples",
      "desc": "Ajuste de configurações.",
      "tempo": "Imediato",
      "custo": "R$ 50 a R$ 100"
    },
    {
      "nivel": "Médio",
      "desc": "Troca de capacitores ou firmware.",
      "tempo": "1 a 5 dias",
      "custo": "R$ 200 a R$ 400"
    },
    {
      "nivel": "Complexo",
      "desc": "Reparo de placa principal.",
      "tempo": "5 a 15 dias",
      "custo": "R$ 350 a R$ 700"
    }
  ],
  "riscos": [
    "Fonte instável pode queimar a placa principal"
  ],
  "diagnostico": "Teste de temperatura, medição de tensões, verificação de firmware. Presencial na oficina.",
  "solucao": "Ajuste de configurações, capacitores, firmware ou reparo de placa.",
  "quandoCompensa": "Configurações e capacitores são baratos.",
  "quandoNaoCompensa": "Placa principal em TV de baixo valor.",
  "whatsappMessage": "Olá! Minha TV fica desligando sozinha. Podem diagnosticar?",
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
      "to": "/problemas/tv-nao-liga-curitiba"
    },
    {
      "label": "TV Sem Imagem",
      "to": "/problemas/tv-sem-imagem-curitiba"
    }
  ],
  "conteudoExtra": "## Verifique Antes\n\n1. Timer > Desativar\n2. Eco Mode > Desativar\n3. HDMI CEC > Desativar\n4. Controle remoto > botão preso?\n5. Ventilação > espaço atrás da TV?"
};
