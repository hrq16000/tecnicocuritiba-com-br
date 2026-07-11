import type { ProblemaPageData } from "./types";

export const problema: ProblemaPageData = {
  "slug": "pc-superaquecendo-curitiba",
  "title": "PC Superaquecendo em Curitiba | Limpeza e Reparo",
  "metaDescription": "Computador superaquecendo? Veja causas, riscos e soluções profissionais em Curitiba. Limpeza interna, troca de pasta térmica e diagnóstico.",
  "h1": "PC Superaquecendo em Curitiba — Causas e Solução Profissional",
  "categoria": "Problemas de Computador",
  "intro": "Um computador que esquenta demais não é apenas desconfortável — é um risco real para o hardware. Processadores, GPUs e outros componentes têm limites de temperatura, e ultrapassá-los causa degradação permanente e falhas.\n\nO superaquecimento é uma das causas mais comuns de outros problemas: computador lento (throttling), desligamentos aleatórios, travamentos e até queima de componentes. Resolver o superaquecimento geralmente resolve vários problemas de uma vez.\n\nNa maioria dos casos, a solução é simples: limpeza interna profissional + troca de pasta térmica. Mas existem situações mais complexas que exigem diagnóstico.",
  "sintomas": [
    {
      "titulo": "Gabinete/notebook muito quente ao toque",
      "desc": "Calor excessivo saindo pelas aberturas de ventilação.",
      "gravidade": "Simples a médio"
    },
    {
      "titulo": "Ventoinhas em velocidade máxima constante",
      "desc": "Barulho alto de ventilação o tempo todo. Tentativa do sistema de resfriar.",
      "gravidade": "Simples"
    },
    {
      "titulo": "Desliga durante jogos ou programas pesados",
      "desc": "Proteção térmica ativa sob carga. Processo ou GPU atingindo limite.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Lentidão progressiva durante o uso",
      "desc": "Começa bem e fica lento conforme esquenta. Throttling térmico.",
      "gravidade": "Simples a médio"
    }
  ],
  "causas": [
    {
      "titulo": "Pasta térmica seca",
      "desc": "A pasta térmica entre processador e cooler seca após 2-4 anos, perdendo eficiência de condução de calor. É a causa mais comum.",
      "tipo": "desgaste"
    },
    {
      "titulo": "Poeira acumulada",
      "desc": "Poeira bloqueia a passagem de ar nas ventoinhas e dissipadores, reduzindo a capacidade de resfriamento.",
      "tipo": "desgaste"
    },
    {
      "titulo": "Ventoinha travada ou com defeito",
      "desc": "Cooler que não gira ou gira devagar não refrigera adequadamente.",
      "tipo": "hardware"
    },
    {
      "titulo": "Ambiente mal ventilado",
      "desc": "Computador em local fechado, apertado ou exposto ao sol reduz a dissipação de calor.",
      "tipo": "erro-humano"
    }
  ],
  "cenarios": [
    {
      "nivel": "Simples",
      "desc": "Limpeza interna completa + troca de pasta térmica. Resolve 80% dos casos.",
      "tempo": "1h a 2h",
      "custo": "R$ 120 a R$ 200"
    },
    {
      "nivel": "Médio",
      "desc": "Troca de cooler/ventoinha + limpeza + pasta térmica.",
      "tempo": "2h",
      "custo": "R$ 200 a R$ 350 + peça"
    },
    {
      "nivel": "Complexo",
      "desc": "Reparo de sistema de refrigeração, troca de pads térmicos em notebook, reparo de heatpipe.",
      "tempo": "2 a 5 dias",
      "custo": "R$ 250 a R$ 500+"
    }
  ],
  "riscos": [
    "Calor excessivo degrada processador e GPU permanentemente",
    "Pode causar solda fria em componentes da placa-mãe",
    "Disco rígido sofre com calor e pode falhar prematuramente",
    "Capacitores estufam e explodem com temperatura alta constante"
  ],
  "diagnostico": "Monitoramento de temperatura com software profissional, inspeção visual de ventoinhas e dissipadores, teste de estresse térmico para reproduzir o problema. Custo: R$ 99,99.",
  "solucao": "Para a maioria dos casos: limpeza interna profissional com ar comprimido + aspiração + troca de pasta térmica de qualidade. Para notebooks: desmontagem completa, limpeza e troca de pads térmicos quando necessário.",
  "quandoCompensa": "Sempre compensa manter a refrigeração em dia. O custo da limpeza é mínimo comparado ao custo de substituir componentes queimados por calor.",
  "quandoNaoCompensa": "Não se aplica — a manutenção preventiva de temperatura sempre compensa.",
  "whatsappMessage": "Olá! Meu computador está superaquecendo. Podem me ajudar?",
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
      "label": "Computador Lento",
      "to": "/problemas/computador-lento-curitiba"
    },
    {
      "label": "Liga e Desliga",
      "to": "/problemas/computador-liga-e-desliga-curitiba"
    },
    {
      "label": "Barulho Estranho",
      "to": "/problemas/pc-com-barulho-estranho-curitiba"
    }
  ],
  "conteudoExtra": "### Temperaturas Normais vs Preocupantes\n\n| Componente | Normal | Aceitável | Preocupante | Crítico |\n|---|---|---|---|---|\n| CPU em repouso | 30-45°C | 45-55°C | 55-70°C | 70°C+ |\n| CPU sob carga | 55-75°C | 75-85°C | 85-95°C | 95°C+ |\n| GPU sob carga | 60-80°C | 80-90°C | 90-100°C | 100°C+ |\n\n### Manutenção Preventiva\n\nRecomendamos limpeza interna + pasta térmica a cada 12-18 meses para desktops e notebooks. É a manutenção mais barata e eficiente para prolongar a vida útil do computador."
};
