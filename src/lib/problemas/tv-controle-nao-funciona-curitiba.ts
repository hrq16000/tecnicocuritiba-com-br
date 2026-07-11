import type { ProblemaPageData } from "./types";

export const problema: ProblemaPageData = {
  "slug": "tv-controle-nao-funciona-curitiba",
  "title": "Controle Remoto da TV Não Funciona em Curitiba",
  "metaDescription": "Controle remoto não funciona? Diagnóstico de sensor IR em Curitiba.",
  "h1": "Controle Remoto Não Funciona — Soluções em Curitiba",
  "categoria": "Problemas de TV",
  "intro": "Na maioria é problema do controle (pilhas). Quando o controle está OK, pode ser sensor IR ou placa.\n\n**Orçamento presencial.**",
  "sintomas": [
    {
      "titulo": "TV não responde",
      "desc": "Pilha, controle ou sensor.",
      "gravidade": "Simples"
    },
    {
      "titulo": "Alguns botões falham",
      "desc": "Membrana desgastada.",
      "gravidade": "Simples"
    },
    {
      "titulo": "Funciona só de perto",
      "desc": "LED fraco ou sensor bloqueado.",
      "gravidade": "Simples"
    }
  ],
  "causas": [
    {
      "titulo": "Pilhas fracas",
      "desc": "Troque primeiro.",
      "tipo": "hardware"
    },
    {
      "titulo": "Controle defeituoso",
      "desc": "Membrana ou LED queimado.",
      "tipo": "hardware"
    },
    {
      "titulo": "Sensor IR bloqueado",
      "desc": "Objeto na frente.",
      "tipo": "erro-humano"
    },
    {
      "titulo": "Placa do sensor",
      "desc": "Receptora IR defeituosa.",
      "tipo": "hardware"
    }
  ],
  "cenarios": [
    {
      "nivel": "Simples",
      "desc": "Pilhas ou controle universal.",
      "tempo": "Imediato",
      "custo": "R$ 5 a R$ 80"
    },
    {
      "nivel": "Médio",
      "desc": "Reparo do sensor IR.",
      "tempo": "3 a 7 dias",
      "custo": "R$ 100 a R$ 250"
    },
    {
      "nivel": "Complexo",
      "desc": "Placa principal.",
      "tempo": "5 a 10 dias",
      "custo": "R$ 250 a R$ 500"
    }
  ],
  "riscos": [
    "Universais podem não ter todas as funções"
  ],
  "diagnostico": "Teste com câmera do celular. Presencial.",
  "solucao": "Pilhas, controle novo ou reparo.",
  "quandoCompensa": "Sempre — barato.",
  "quandoNaoCompensa": "Nunca.",
  "whatsappMessage": "Olá! Controle da TV não funciona. Podem ajudar?",
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
  "conteudoExtra": "## Teste com Câmera\n1. Abra câmera do celular\n2. Aponte LED do controle\n3. Pressione botão\n4. Luz roxa = controle OK"
};
