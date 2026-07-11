import type { ProblemaPageData } from "./types";

export const problema: ProblemaPageData = {
  "slug": "tv-com-tela-escura-curitiba",
  "title": "TV com Tela Escura em Curitiba | Backlight",
  "metaDescription": "TV com tela escura ou pouco brilho? Backlight com defeito. Reparo profissional em Curitiba.",
  "h1": "TV com Tela Escura em Curitiba — Backlight com Defeito",
  "categoria": "TV / Eletrônicos",
  "intro": "TV com tela escura — onde você percebe que tem imagem mas muito fraca — é quase sempre problema de backlight (LEDs de iluminação). Os LEDs internos que iluminam o painel queimam parcial ou totalmente, deixando a tela escura. A troca das barras de LED resolve na maioria dos casos.",
  "sintomas": [
    {
      "titulo": "Imagem muito escura mesmo com brilho no máximo",
      "desc": "LEDs do backlight degradados ou queimados.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Áreas mais claras e mais escuras na tela",
      "desc": "Alguns LEDs queimados enquanto outros funcionam.",
      "gravidade": "Médio"
    }
  ],
  "causas": [
    {
      "titulo": "LEDs do backlight queimados",
      "desc": "Desgaste natural após 3-7 anos de uso.",
      "tipo": "desgaste"
    },
    {
      "titulo": "Driver de LED com defeito",
      "desc": "Componente na placa fonte que alimenta os LEDs.",
      "tipo": "hardware"
    }
  ],
  "cenarios": [
    {
      "nivel": "Simples",
      "desc": "Ajuste de brilho e configurações.",
      "tempo": "30 min",
      "custo": "R$ 99,99"
    },
    {
      "nivel": "Médio",
      "desc": "Troca de barras de LED.",
      "tempo": "2 a 5 dias",
      "custo": "R$ 200 a R$ 500"
    },
    {
      "nivel": "Complexo",
      "desc": "Troca de barras + reparo de driver.",
      "tempo": "5 a 10 dias",
      "custo": "R$ 350 a R$ 700"
    }
  ],
  "riscos": [
    "LEDs genéricos podem ter vida útil curta"
  ],
  "diagnostico": "Desmontagem, teste individual de LEDs, verificação de driver de backlight. Custo: R$ 99,99-120.",
  "solucao": "Troca de barras de LED por modelos de qualidade com garantia.",
  "quandoCompensa": "TVs de 32-55\" quase sempre compensam. Reparo custa 20-40% de uma nova.",
  "quandoNaoCompensa": "TVs muito pequenas ou muito antigas.",
  "whatsappMessage": "Olá! Minha TV está com a tela muito escura. Podem me ajudar?",
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
      "label": "TV Sem Imagem",
      "to": "/problemas/tv-com-som-sem-imagem-curitiba"
    },
    {
      "label": "Manutenção TV",
      "to": "/servicos/manutencao-tv"
    }
  ],
  "conteudoExtra": "### O Que é Backlight?\n\nTVs LED modernas usam tiras de LEDs para iluminar o painel LCD. Quando esses LEDs queimam, a imagem fica escura ou desaparece. A troca das barras é o reparo mais comum em TVs e tem bom custo-benefício."
};
