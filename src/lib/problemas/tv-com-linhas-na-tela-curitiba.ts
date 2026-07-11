import type { ProblemaPageData } from "./types";

export const problema: ProblemaPageData = {
  "slug": "tv-com-linhas-na-tela-curitiba",
  "title": "TV com Linhas na Tela em Curitiba | Diagnóstico",
  "metaDescription": "TV com linhas horizontais ou verticais na tela? Veja causas e soluções. Reparo profissional em Curitiba.",
  "h1": "TV com Linhas na Tela em Curitiba — Causas e Reparo",
  "categoria": "TV / Eletrônicos",
  "intro": "Linhas na tela da TV — horizontais, verticais, coloridas ou pretas — indicam problema no painel LCD, na placa T-CON ou nos cabos de conexão interna. O tipo de linha e onde ela aparece ajuda a diagnosticar a causa.",
  "sintomas": [
    {
      "titulo": "Linhas verticais coloridas",
      "desc": "T-CON ou cabo TAB com defeito.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Linhas horizontais",
      "desc": "Painel LCD com defeito ou T-CON.",
      "gravidade": "Médio a complexo"
    },
    {
      "titulo": "Faixa preta vertical/horizontal",
      "desc": "Grupo de pixels mortos no painel ou driver de linha queimado.",
      "gravidade": "Complexo"
    }
  ],
  "causas": [
    {
      "titulo": "Placa T-CON com defeito",
      "desc": "Controla as linhas do display. Capacitores ou chip com problema.",
      "tipo": "hardware"
    },
    {
      "titulo": "Cabo TAB/COF solto ou danificado",
      "desc": "Conexões ultrafinas entre painel e driver.",
      "tipo": "hardware"
    },
    {
      "titulo": "Painel LCD danificado",
      "desc": "Dano físico ou desgaste do painel. Geralmente irreparável.",
      "tipo": "hardware"
    }
  ],
  "cenarios": [
    {
      "nivel": "Simples",
      "desc": "Reencaixe de cabos ou troca de T-CON.",
      "tempo": "2 a 5 dias",
      "custo": "R$ 200 a R$ 400"
    },
    {
      "nivel": "Médio",
      "desc": "Reparo de T-CON ou reconexão de TAB.",
      "tempo": "5 a 10 dias",
      "custo": "R$ 300 a R$ 600"
    },
    {
      "nivel": "Complexo",
      "desc": "Painel danificado — geralmente inviável.",
      "tempo": "N/A",
      "custo": "Troca de painel = TV nova"
    }
  ],
  "riscos": [
    "Reparo de TAB é delicado e pode piorar",
    "Painel danificado geralmente significa TV nova"
  ],
  "diagnostico": "Inspeção de T-CON, cabos TAB, teste com pressão nas conexões. Custo: R$ 99,99-120.",
  "solucao": "Para T-CON: reparo ou troca. Para TAB: reconexão. Para painel: geralmente inviável.",
  "quandoCompensa": "Se o problema é T-CON ou cabo, compensa. Se é painel, geralmente não.",
  "quandoNaoCompensa": "Troca de painel LCD custa quase tanto quanto TV nova.",
  "whatsappMessage": "Olá! Minha TV está com linhas na tela. Podem me ajudar?",
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
  "conteudoExtra": "### Diagnóstico Rápido\n\n- Linhas que mudam ou somem ao pressionar levemente a tela → cabo TAB (possível reparo)\n- Linhas fixas que não mudam → painel ou T-CON (diagnóstico necessário)\n- Linhas que aparecem apenas em certos canais/fontes → sinal ou cabo HDMI (simples)"
};
