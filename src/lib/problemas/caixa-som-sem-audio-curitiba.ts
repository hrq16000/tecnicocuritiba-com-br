import type { ProblemaPageData } from "./types";

export const problema: ProblemaPageData = {
  "slug": "caixa-som-sem-audio-curitiba",
  "title": "Caixa de Som Sem Áudio em Curitiba | Conserto",
  "metaDescription": "Caixa de som liga mas sem áudio? Alto-falante queimado ou amplificador com defeito? Conserto em Curitiba.",
  "h1": "Caixa de Som Sem Áudio — Diagnóstico e Conserto em Curitiba",
  "categoria": "Problemas de Rádio / Som",
  "intro": "A caixa de som liga normalmente, os LEDs funcionam, mas não sai nenhum som. O problema pode estar no alto-falante, no amplificador interno ou nas conexões.\n\n**Necessário trazer à oficina.**",
  "sintomas": [
    {
      "titulo": "Liga mas sem nenhum som",
      "desc": "LED acende, conecta, mas silêncio total. Amplificador ou alto-falante.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Som muito fraco",
      "desc": "Volume no máximo mas som quase inaudível. Alto-falante ou amplificador.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Som sai só de um lado",
      "desc": "Um alto-falante funciona, outro não.",
      "gravidade": "Simples a médio"
    },
    {
      "titulo": "Som corta intermitentemente",
      "desc": "Funciona e para. Mau contato ou solda fria.",
      "gravidade": "Simples a médio"
    }
  ],
  "causas": [
    {
      "titulo": "Alto-falante queimado",
      "desc": "Bobina queimada por volume excessivo ou curto.",
      "tipo": "desgaste"
    },
    {
      "titulo": "Amplificador interno com defeito",
      "desc": "CI de amplificação queimado.",
      "tipo": "hardware"
    },
    {
      "titulo": "Conector de saída danificado",
      "desc": "Conector interno entre placa e alto-falante.",
      "tipo": "desgaste"
    },
    {
      "titulo": "Cabo interno rompido",
      "desc": "Fios internos finos podem romper com vibração.",
      "tipo": "desgaste"
    }
  ],
  "cenarios": [
    {
      "nivel": "Simples",
      "desc": "Reconexão de cabo ou conector solto.",
      "tempo": "1 a 2 dias",
      "custo": "R$ 80 a R$ 150"
    },
    {
      "nivel": "Médio",
      "desc": "Troca de alto-falante.",
      "tempo": "3 a 7 dias",
      "custo": "R$ 120 a R$ 350"
    },
    {
      "nivel": "Complexo",
      "desc": "Reparo de amplificador interno.",
      "tempo": "5 a 15 dias",
      "custo": "R$ 200 a R$ 500"
    }
  ],
  "riscos": [
    "Forçar volume com alto-falante danificado pode queimar o amplificador"
  ],
  "diagnostico": "Teste de alto-falante, medição do amplificador, verificação de conexões. Presencial na oficina.",
  "solucao": "Reconexão, troca de alto-falante ou reparo de amplificador.",
  "quandoCompensa": "Caixas de som de marca com alto-falante substituível.",
  "quandoNaoCompensa": "Caixas genéricas com amplificador e alto-falante integrados sem peça de reposição.",
  "whatsappMessage": "Olá! Minha caixa de som não tem áudio. Podem consertar?",
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
  "conteudoExtra": "## Teste Rápido\n\n1. Conecte fone de ouvido (se tiver saída P2)\n2. Se o fone tem som = alto-falante queimado\n3. Se o fone também não tem = amplificador ou placa"
};
