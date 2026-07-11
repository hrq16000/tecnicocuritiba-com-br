import type { ProblemaPageData } from "./types";

export const problema: ProblemaPageData = {
  "slug": "tv-manchas-na-tela-curitiba",
  "title": "TV com Manchas na Tela em Curitiba | Diagnóstico",
  "metaDescription": "TV com manchas escuras, claras ou coloridas? Diagnóstico de painel e backlight em Curitiba.",
  "h1": "TV com Manchas na Tela — Diagnóstico em Curitiba",
  "categoria": "Problemas de TV",
  "intro": "Manchas escuras, claras (clouding), coloridas ou bolhas na tela. Cada tipo indica causa diferente. Clouding é comum em TVs baratas. Manchas escuras crescentes = cristal líquido vazando.\n\n**Necessário trazer a TV à oficina.**",
  "sintomas": [
    {
      "titulo": "Manchas claras nas bordas (clouding)",
      "desc": "Distribuição desigual do backlight.",
      "gravidade": "Simples"
    },
    {
      "titulo": "Manchas escuras crescentes",
      "desc": "Vazamento de cristal líquido.",
      "gravidade": "Complexo"
    },
    {
      "titulo": "Manchas coloridas fixas",
      "desc": "Dano no painel ou T-CON.",
      "gravidade": "Médio a complexo"
    },
    {
      "titulo": "Pixels mortos",
      "desc": "Poucos pontos são normais.",
      "gravidade": "Simples"
    }
  ],
  "causas": [
    {
      "titulo": "Backlight desalinhado",
      "desc": "LEDs mal posicionados.",
      "tipo": "hardware"
    },
    {
      "titulo": "Pressão no painel",
      "desc": "Toque forte ou objeto na tela.",
      "tipo": "erro-humano"
    },
    {
      "titulo": "Dano térmico",
      "desc": "Sol direto ou calor excessivo.",
      "tipo": "erro-humano"
    }
  ],
  "cenarios": [
    {
      "nivel": "Simples",
      "desc": "Ajuste de backlight.",
      "tempo": "1 a 3 dias",
      "custo": "R$ 150 a R$ 300"
    },
    {
      "nivel": "Médio",
      "desc": "Troca de barras de LED.",
      "tempo": "3 a 7 dias",
      "custo": "R$ 250 a R$ 500"
    },
    {
      "nivel": "Complexo",
      "desc": "Mancha no painel — sem reparo viável.",
      "tempo": "—",
      "custo": "Não compensa"
    }
  ],
  "riscos": [
    "Manchas de cristal líquido são progressivas e irreversíveis"
  ],
  "diagnostico": "Análise visual com tela de teste. Presencial na oficina.",
  "solucao": "Ajuste de backlight para clouding. Manchas no painel: avaliação caso a caso.",
  "quandoCompensa": "Clouding por backlight pode ser corrigido.",
  "quandoNaoCompensa": "Manchas escuras crescentes. Painel novo custa quase o preço de TV nova.",
  "whatsappMessage": "Olá! Minha TV está com manchas na tela. Podem avaliar?",
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
      "to": "/problemas/tv-listras-na-tela-curitiba"
    },
    {
      "label": "TV Sem Imagem",
      "to": "/problemas/tv-sem-imagem-curitiba"
    }
  ],
  "conteudoExtra": "## Clouding vs Mancha\n\n- **Clouding:** Áreas brilhantes nas bordas. Pode atenuar.\n- **Mancha no painel:** Áreas escuras que crescem. Sem reparo."
};
