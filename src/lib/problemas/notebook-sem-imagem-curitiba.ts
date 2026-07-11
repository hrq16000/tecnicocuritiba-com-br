import type { ProblemaPageData } from "./types";

export const problema: ProblemaPageData = {
  "slug": "notebook-sem-imagem-curitiba",
  "title": "Notebook Sem Imagem em Curitiba | Tela Preta",
  "metaDescription": "Notebook liga mas tela fica preta? Veja causas e soluções. Flex, tela, GPU. Diagnóstico em Curitiba.",
  "h1": "Notebook Sem Imagem em Curitiba — Tela Preta com Notebook Ligado",
  "categoria": "Notebook",
  "intro": "Notebook que liga (ventoinha gira, LEDs acendem) mas a tela fica preta é um problema com múltiplas causas possíveis. Diferente do desktop, onde você pode trocar facilmente o cabo de vídeo, no notebook a tela está integrada e conectada por um cabo flexível (flex) que pode romper com o uso.",
  "sintomas": [
    {
      "titulo": "Tela totalmente preta, notebook ligado",
      "desc": "LED de energia acende, ventoinha gira, mas nada na tela.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Tela pisca ou funciona em ângulos",
      "desc": "Imagem aparece ao inclinar a tela. Flex com mau contato.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Funciona em monitor externo",
      "desc": "Conectou HDMI e funciona. Problema é na tela ou flex.",
      "gravidade": "Médio"
    }
  ],
  "causas": [
    {
      "titulo": "Flex da tela rompido ou com mau contato",
      "desc": "Cabo que conecta placa à tela pode romper com abertura/fechamento repetido.",
      "tipo": "desgaste"
    },
    {
      "titulo": "Inverter ou backlight queimado",
      "desc": "Em telas mais antigas, o backlight pode queimar. Em modernas, LED pode falhar.",
      "tipo": "hardware"
    },
    {
      "titulo": "GPU integrada com defeito",
      "desc": "Problema no chip de vídeo da placa-mãe. Geralmente requer reballing.",
      "tipo": "hardware"
    },
    {
      "titulo": "Tela LCD/LED danificada",
      "desc": "Impacto, pressão ou defeito de fabricação na tela.",
      "tipo": "hardware"
    }
  ],
  "cenarios": [
    {
      "nivel": "Simples",
      "desc": "Reencaixe de flex, ajuste de configuração de display.",
      "tempo": "30 min a 1h",
      "custo": "R$ 99,99 a R$ 150"
    },
    {
      "nivel": "Médio",
      "desc": "Troca de flex ou troca de tela.",
      "tempo": "1 a 3 dias",
      "custo": "R$ 200 a R$ 600 + peça"
    },
    {
      "nivel": "Complexo",
      "desc": "Reballing de GPU ou reparo de placa-mãe.",
      "tempo": "5 a 10 dias",
      "custo": "R$ 400 a R$ 900+"
    }
  ],
  "riscos": [
    "Tentar trocar tela sem experiência pode danificar mais componentes",
    "Flex é muito delicado e pode romper ao manusear"
  ],
  "diagnostico": "Teste com monitor externo, inspeção de flex, teste de backlight, análise de GPU. Custo: R$ 99,99.",
  "solucao": "Depende da causa: flex → troca. Tela → substituição. GPU → reballing ou troca de placa. Sempre com laudo prévio.",
  "quandoCompensa": "Compensa trocar tela ou flex em notebooks de médio a alto valor.",
  "quandoNaoCompensa": "Reballing de GPU em notebook antigo de baixo valor geralmente não compensa.",
  "whatsappMessage": "Olá! Meu notebook liga mas a tela fica preta. Podem me ajudar?",
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
      "label": "Tela Quebrada",
      "to": "/problemas/notebook-com-tela-quebrada-curitiba"
    },
    {
      "label": "Notebook Não Liga",
      "to": "/problemas/notebook-nao-liga-curitiba"
    }
  ],
  "conteudoExtra": "### Teste Rápido: Monitor Externo\n\nConecte o notebook a uma TV ou monitor via HDMI. Se a imagem aparecer, o problema é na tela ou flex — não na placa-mãe. Isso ajuda a direcionar o diagnóstico."
};
