import type { ProblemaPageData } from "./types";

export const problema: ProblemaPageData = {
  "slug": "tv-sem-cores-curitiba",
  "title": "TV Sem Cores / Preto e Branco em Curitiba",
  "metaDescription": "TV em preto e branco ou cores erradas? Diagnóstico em Curitiba.",
  "h1": "TV Sem Cores — Conserto em Curitiba",
  "categoria": "Problemas de TV",
  "intro": "TV em preto e branco ou cores erradas? Pode ser configuração de acessibilidade ou T-CON/flat cable.\n\n**Trazer à oficina.**",
  "sintomas": [
    {
      "titulo": "Preto e branco",
      "desc": "Configuração, T-CON ou flat cable.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Cores invertidas",
      "desc": "Acessibilidade ou T-CON.",
      "gravidade": "Simples a Médio"
    },
    {
      "titulo": "Uma cor dominante",
      "desc": "Flat cable ou T-CON.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Cores desbotadas",
      "desc": "Backlight ou configuração.",
      "gravidade": "Simples"
    }
  ],
  "causas": [
    {
      "titulo": "Acessibilidade ativada",
      "desc": "Filtro de cor acidental.",
      "tipo": "software"
    },
    {
      "titulo": "Flat cable solto",
      "desc": "Informação de cor não chega.",
      "tipo": "hardware"
    },
    {
      "titulo": "T-CON defeituoso",
      "desc": "Controlador de cor.",
      "tipo": "hardware"
    }
  ],
  "cenarios": [
    {
      "nivel": "Simples",
      "desc": "Desativar filtro de cor.",
      "tempo": "Imediato",
      "custo": "R$ 0"
    },
    {
      "nivel": "Médio",
      "desc": "Flat cables ou T-CON.",
      "tempo": "3 a 10 dias",
      "custo": "R$ 200 a R$ 500"
    },
    {
      "nivel": "Complexo",
      "desc": "Degeneração do painel.",
      "tempo": "N/A",
      "custo": "Ver custo de painel"
    }
  ],
  "riscos": [
    "Flat cables delicados",
    "Degeneração progressiva"
  ],
  "diagnostico": "Configurações, fontes, flat cables. Presencial.",
  "solucao": "Configurações, flat cables ou T-CON.",
  "quandoCompensa": "Configuração (grátis) ou T-CON.",
  "quandoNaoCompensa": "Degeneração do painel.",
  "whatsappMessage": "Olá! TV sem cores. Podem diagnosticar?",
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
  "conteudoExtra": "## Verifique Antes\n1. Acessibilidade > Filtro de Cor > Desativar\n2. Teste outra fonte\n3. Reset de imagem"
};
