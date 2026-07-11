import type { ProblemaPageData } from "./types";

export const problema: ProblemaPageData = {
  "slug": "tv-sem-som-curitiba",
  "title": "TV Sem Som em Curitiba | Diagnóstico e Conserto",
  "metaDescription": "TV sem som, chiando ou distorcido? Conserto de alto-falante em Curitiba.",
  "h1": "TV Sem Som — Diagnóstico e Conserto em Curitiba",
  "categoria": "Problemas de TV",
  "intro": "TV com imagem mas sem som pode ser configuração ou hardware. Verifique mudo e saída de áudio antes.\n\n**Necessário trazer a TV à oficina.**",
  "sintomas": [
    {
      "titulo": "Sem som nenhum",
      "desc": "Configuração, alto-falante ou placa.",
      "gravidade": "Simples a médio"
    },
    {
      "titulo": "Som muito baixo",
      "desc": "Alto-falante ou amplificador.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Som distorcido/chiando",
      "desc": "Alto-falante danificado.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Som só de um lado",
      "desc": "Alto-falante queimado ou conector solto.",
      "gravidade": "Simples a médio"
    }
  ],
  "causas": [
    {
      "titulo": "Saída de áudio incorreta",
      "desc": "Configurada para HDMI ARC ou Bluetooth.",
      "tipo": "software"
    },
    {
      "titulo": "Alto-falante queimado",
      "desc": "Volume alto ou surto.",
      "tipo": "desgaste"
    },
    {
      "titulo": "CI de áudio",
      "desc": "Amplificador na placa principal.",
      "tipo": "hardware"
    },
    {
      "titulo": "Cabo solto",
      "desc": "Conectores internos.",
      "tipo": "desgaste"
    }
  ],
  "cenarios": [
    {
      "nivel": "Simples",
      "desc": "Ajuste de configuração ou reconexão.",
      "tempo": "1 hora",
      "custo": "R$ 80 a R$ 150"
    },
    {
      "nivel": "Médio",
      "desc": "Troca de alto-falante.",
      "tempo": "1 a 3 dias",
      "custo": "R$ 150 a R$ 300"
    },
    {
      "nivel": "Complexo",
      "desc": "Reparo de CI de áudio.",
      "tempo": "3 a 10 dias",
      "custo": "R$ 250 a R$ 500"
    }
  ],
  "riscos": [
    "Problema no CI pode indicar falha na placa principal"
  ],
  "diagnostico": "Teste de alto-falantes, medição de amplificador. Presencial na oficina.",
  "solucao": "Ajuste, troca de alto-falante ou reparo de CI.",
  "quandoCompensa": "Troca de alto-falante é barata. Alternativa: soundbar.",
  "quandoNaoCompensa": "Soundbar pode ser mais prático que reparo em alguns casos.",
  "whatsappMessage": "Olá! Minha TV está sem som. Podem diagnosticar?",
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
      "label": "TV Som Sem Vídeo",
      "to": "/problemas/tv-som-sem-video-curitiba"
    }
  ],
  "conteudoExtra": "## Verifique Antes\n\n1. Volume no mudo?\n2. Saída > Alto-falante da TV\n3. Teste com fone de ouvido\n\n## Alternativa: Soundbar\n\nUma soundbar básica (R$ 200-400) pode ter qualidade superior aos alto-falantes originais."
};
