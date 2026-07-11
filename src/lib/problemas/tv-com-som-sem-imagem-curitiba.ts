import type { ProblemaPageData } from "./types";

export const problema: ProblemaPageData = {
  "slug": "tv-com-som-sem-imagem-curitiba",
  "title": "TV com Som Sem Imagem em Curitiba | Diagnóstico",
  "metaDescription": "TV com som mas sem imagem? Veja causas e soluções. Backlight, placa T-CON, LED. Reparo em Curitiba.",
  "h1": "TV com Som Sem Imagem em Curitiba — Causas e Reparo",
  "categoria": "TV / Eletrônicos",
  "intro": "Se a TV tem som mas a tela fica escura ou preta, o problema está no sistema de vídeo da TV — não na fonte ou placa principal. As causas mais comuns são: barra de LED (backlight) queimada, placa T-CON com defeito ou cabo LVDS com mau contato.\n\nEsse tipo de reparo geralmente exige bancada técnica pois a TV precisa ser desmontada para diagnóstico dos LEDs e placas internas.",
  "sintomas": [
    {
      "titulo": "Tela totalmente escura com áudio normal",
      "desc": "Backlight (LEDs) queimados. Teste: com lanterna na tela, você pode ver imagem fraca.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Tela com brilho mas sem imagem",
      "desc": "Placa T-CON com defeito ou cabo LVDS solto.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Imagem aparece e some",
      "desc": "LED intermitente ou T-CON com mau contato.",
      "gravidade": "Médio"
    }
  ],
  "causas": [
    {
      "titulo": "Barra de LED (backlight) queimada",
      "desc": "LEDs que iluminam a tela queimam com o tempo. Causa mais comum. Troca da barra resolve.",
      "tipo": "desgaste"
    },
    {
      "titulo": "Placa T-CON com defeito",
      "desc": "Placa que controla a imagem na tela. Capacitores estufados ou chip com defeito.",
      "tipo": "hardware"
    },
    {
      "titulo": "Cabo LVDS solto ou danificado",
      "desc": "Cabo que conecta placa principal à tela pode oxidar ou soltar.",
      "tipo": "hardware"
    }
  ],
  "cenarios": [
    {
      "nivel": "Simples",
      "desc": "Cabo LVDS solto — reencaixe.",
      "tempo": "1h",
      "custo": "R$ 100 a R$ 200"
    },
    {
      "nivel": "Médio",
      "desc": "Troca de barra de LED ou T-CON.",
      "tempo": "2 a 5 dias",
      "custo": "R$ 200 a R$ 500 + peça"
    },
    {
      "nivel": "Complexo",
      "desc": "Reparo de placa T-CON ou múltiplas barras.",
      "tempo": "5 a 10 dias",
      "custo": "R$ 400 a R$ 800+"
    }
  ],
  "riscos": [
    "Abrir TV tem risco de choque — capacitores armazenam carga",
    "LEDs genéricos podem ter vida útil curta"
  ],
  "diagnostico": "Desmontagem da TV, teste individual de LEDs, verificação de T-CON, medição de tensões. Custo: R$ 99,99-120.",
  "solucao": "Troca de barras de LED (mais comum), reparo ou troca de T-CON, reencaixe de cabos. Sempre com peças de qualidade.",
  "quandoCompensa": "TVs de 32-55\" com menos de 6 anos geralmente compensam. O reparo custa 20-40% de uma nova.",
  "quandoNaoCompensa": "TVs muito baratas onde o reparo se aproxima do valor de uma nova.",
  "whatsappMessage": "Olá! Minha TV tem som mas não tem imagem. Podem me ajudar?",
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
      "label": "TV Não Liga",
      "to": "/problemas/tv-nao-liga-curitiba"
    },
    {
      "label": "Manutenção TV",
      "to": "/servicos/manutencao-tv"
    }
  ],
  "conteudoExtra": "### Teste do Backlight com Lanterna\n\nLigue a TV no escuro e aponte uma lanterna forte diretamente na tela. Se você consegue ver uma imagem fraca, o problema é backlight (LEDs). Esse teste simples confirma o diagnóstico antes da desmontagem."
};
