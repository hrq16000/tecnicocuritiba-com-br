import type { ProblemaPageData } from "./types";

export const problema: ProblemaPageData = {
  "slug": "tv-sem-hdmi-curitiba",
  "title": "TV Não Reconhece HDMI em Curitiba | Sem Sinal",
  "metaDescription": "TV não reconhece HDMI? Sem sinal ou tela preta? Diagnóstico em Curitiba.",
  "h1": "TV Não Reconhece HDMI — Conserto em Curitiba",
  "categoria": "Problemas de TV",
  "intro": "Porta HDMI é a principal conexão de vídeo. Problema pode ser cabo, porta queimada ou chip HDMI danificado por descarga estática.\n\n**Orçamento presencial.**",
  "sintomas": [
    {
      "titulo": "Sem sinal ao conectar",
      "desc": "Tela preta ou 'Sem Sinal'.",
      "gravidade": "Simples"
    },
    {
      "titulo": "Imagem intermitente",
      "desc": "Imagem pisca via HDMI.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Só uma porta funciona",
      "desc": "Outras pararam.",
      "gravidade": "Médio"
    },
    {
      "titulo": "HDMI sem áudio",
      "desc": "Vídeo OK mas sem som.",
      "gravidade": "Simples"
    }
  ],
  "causas": [
    {
      "titulo": "Cabo defeituoso",
      "desc": "Causa mais comum.",
      "tipo": "hardware"
    },
    {
      "titulo": "Porta queimada",
      "desc": "Descarga estática com TV ligada.",
      "tipo": "hardware"
    },
    {
      "titulo": "Chip HDMI danificado",
      "desc": "Requer microsoldagem.",
      "tipo": "hardware"
    },
    {
      "titulo": "Incompatibilidade",
      "desc": "Resolução não suportada.",
      "tipo": "software"
    }
  ],
  "cenarios": [
    {
      "nivel": "Simples",
      "desc": "Troca de cabo.",
      "tempo": "Imediato",
      "custo": "R$ 30 a R$ 80"
    },
    {
      "nivel": "Médio",
      "desc": "Troca da porta HDMI.",
      "tempo": "3 a 7 dias",
      "custo": "R$ 200 a R$ 400"
    },
    {
      "nivel": "Complexo",
      "desc": "Chip HDMI. Microsoldagem.",
      "tempo": "7 a 15 dias",
      "custo": "R$ 400 a R$ 900"
    }
  ],
  "riscos": [
    "Conectar HDMI com TV ligada queima porta"
  ],
  "diagnostico": "Teste com cabos e portas diferentes. Presencial.",
  "solucao": "Troca de cabo, conector ou microsoldagem.",
  "quandoCompensa": "Sempre vale investigar.",
  "quandoNaoCompensa": "Placa principal em TV barata.",
  "whatsappMessage": "Olá! TV não reconhece HDMI. Podem diagnosticar?",
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
      "label": "TV Sem Imagem",
      "to": "/tv-sem-imagem-curitiba"
    }
  ],
  "conteudoExtra": "## NUNCA conecte HDMI com TV ligada\n\n## Antes de Levar\n1. Teste outro cabo\n2. Teste outra porta\n3. Teste dispositivo em outra TV"
};
