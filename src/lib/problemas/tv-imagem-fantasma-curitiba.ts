import type { ProblemaPageData } from "./types";

export const problema: ProblemaPageData = {
  "slug": "tv-imagem-fantasma-curitiba",
  "title": "TV com Imagem Fantasma em Curitiba | Conserto",
  "metaDescription": "TV com imagem fantasma, duplicada ou sombra? Diagnóstico em Curitiba.",
  "h1": "TV com Imagem Fantasma — Conserto em Curitiba",
  "categoria": "Problemas de TV",
  "intro": "Ghosting mostra sombra/duplicação. Em OLED pode ser burn-in (permanente). Em LED/LCD geralmente é T-CON ou flat cable.\n\n**Trazer à oficina.**",
  "sintomas": [
    {
      "titulo": "Sombra da imagem",
      "desc": "Cópia fantasma ao lado.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Burn-in (OLED)",
      "desc": "Logo permanece visível.",
      "gravidade": "Complexo"
    },
    {
      "titulo": "Rastro em cenas rápidas",
      "desc": "Motion blur excessivo.",
      "gravidade": "Simples"
    },
    {
      "titulo": "Cores desalinhadas",
      "desc": "Bordas coloridas.",
      "gravidade": "Médio"
    }
  ],
  "causas": [
    {
      "titulo": "T-CON com defeito",
      "desc": "Timing dos pixels falhando.",
      "tipo": "hardware"
    },
    {
      "titulo": "Flat cable solto",
      "desc": "Cabos entre T-CON e painel.",
      "tipo": "hardware"
    },
    {
      "titulo": "Burn-in OLED",
      "desc": "Dano permanente.",
      "tipo": "hardware"
    },
    {
      "titulo": "Configuração",
      "desc": "Motion smoothing.",
      "tipo": "software"
    }
  ],
  "cenarios": [
    {
      "nivel": "Simples",
      "desc": "Ajuste de configurações.",
      "tempo": "Imediato",
      "custo": "R$ 0 a R$ 100"
    },
    {
      "nivel": "Médio",
      "desc": "T-CON ou flat cables.",
      "tempo": "3 a 10 dias",
      "custo": "R$ 200 a R$ 500"
    },
    {
      "nivel": "Complexo",
      "desc": "Burn-in OLED. Painel.",
      "tempo": "15+ dias",
      "custo": "R$ 2.000 a R$ 5.000+"
    }
  ],
  "riscos": [
    "Burn-in é irreversível"
  ],
  "diagnostico": "Teste com fontes, T-CON e flat cables. Presencial.",
  "solucao": "Configurações, T-CON/flat cable ou painel.",
  "quandoCompensa": "T-CON ou flat cable sempre.",
  "quandoNaoCompensa": "Burn-in severo em OLED.",
  "whatsappMessage": "Olá! TV com imagem fantasma. Podem diagnosticar?",
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
      "label": "TV Listras",
      "to": "/tv-listras-na-tela-curitiba"
    }
  ],
  "conteudoExtra": "## Prevenir Burn-in OLED\n1. Evite imagens estáticas\n2. Protetor de tela\n3. Reduza brilho\n4. Ative pixel shift"
};
