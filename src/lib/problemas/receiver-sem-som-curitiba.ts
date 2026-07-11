import type { ProblemaPageData } from "./types";

export const problema: ProblemaPageData = {
  "slug": "receiver-sem-som-curitiba",
  "title": "Receiver Sem Som em Curitiba | Conserto de Home Theater",
  "metaDescription": "Receiver sem som, home theater mudo? Conserto de receiver e sistema de som em Curitiba. Yamaha, Onkyo, Denon, Sony.",
  "h1": "Receiver Sem Som — Conserto de Home Theater em Curitiba",
  "categoria": "Problemas de Rádio / Som",
  "intro": "Receiver que liga mas não tem som pode ser desde configuração incorreta de saída até amplificador com defeito. Home theaters com múltiplas entradas HDMI adicionam complexidade ao diagnóstico.\n\n**Necessário trazer à oficina.**",
  "sintomas": [
    {
      "titulo": "Liga mas silêncio total",
      "desc": "Nenhuma saída de áudio. Proteção, amplificador ou configuração.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Som em alguns canais apenas",
      "desc": "Só frontal, só surround. Amplificador parcial ou configuração.",
      "gravidade": "Simples a médio"
    },
    {
      "titulo": "HDMI sem áudio",
      "desc": "Imagem passa mas sem som. Configuração ARC ou extrator.",
      "gravidade": "Simples"
    },
    {
      "titulo": "Som com delay/eco",
      "desc": "Atraso entre vídeo e áudio. Configuração de processamento.",
      "gravidade": "Simples"
    }
  ],
  "causas": [
    {
      "titulo": "Proteção ativada",
      "desc": "Curto nas caixas ou impedância errada ativa proteção.",
      "tipo": "hardware"
    },
    {
      "titulo": "Configuração de entrada/saída",
      "desc": "Entrada selecionada errada ou saída configurada incorretamente.",
      "tipo": "software"
    },
    {
      "titulo": "HDMI ARC não configurado",
      "desc": "TV e receiver precisam de HDMI ARC/eARC configurado.",
      "tipo": "software"
    },
    {
      "titulo": "Amplificador parcialmente queimado",
      "desc": "Um ou mais canais com transistor queimado.",
      "tipo": "hardware"
    }
  ],
  "cenarios": [
    {
      "nivel": "Simples",
      "desc": "Configuração de entradas, HDMI ARC e canais.",
      "tempo": "1 a 2 horas",
      "custo": "R$ 80 a R$ 180"
    },
    {
      "nivel": "Médio",
      "desc": "Reparo de canal de amplificação.",
      "tempo": "3 a 10 dias",
      "custo": "R$ 200 a R$ 500"
    },
    {
      "nivel": "Complexo",
      "desc": "Reparo de placa HDMI ou placa principal.",
      "tempo": "7 a 20 dias",
      "custo": "R$ 350 a R$ 700"
    }
  ],
  "riscos": [
    "Caixas com impedância errada podem queimar mais canais"
  ],
  "diagnostico": "Teste de todos os canais, verificação de configuração e entradas HDMI. Presencial na oficina.",
  "solucao": "Configuração correta, reparo de amplificação ou placa HDMI.",
  "quandoCompensa": "Receivers de marca (Yamaha, Denon, Onkyo) têm peças disponíveis e longa vida útil.",
  "quandoNaoCompensa": "Home theaters compactos integrados (barra + sub) com placa principal queimada.",
  "whatsappMessage": "Olá! Meu receiver/home theater está sem som. Podem diagnosticar?",
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
      "label": "Amplificador Não Liga",
      "to": "/problemas/amplificador-nao-liga-curitiba"
    },
    {
      "label": "Som Chiando",
      "to": "/problemas/som-chiando-curitiba"
    }
  ],
  "conteudoExtra": "## Configuração HDMI ARC\n\n1. Conecte o cabo HDMI na porta ARC da TV e do receiver\n2. Na TV: Config > Som > Saída > HDMI ARC\n3. No receiver: selecione entrada correspondente\n4. Ative CEC em ambos (Anynet+, Simplink, Bravia Sync)"
};
