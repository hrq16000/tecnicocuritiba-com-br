import type { ProblemaPageData } from "./types";

export const problema: ProblemaPageData = {
  "slug": "notebook-esquentando-curitiba",
  "title": "Notebook Esquentando em Curitiba | Limpeza Técnica",
  "metaDescription": "Notebook esquentando demais? Limpeza interna profissional, troca de pasta térmica e diagnóstico em Curitiba. Atendimento no mesmo dia.",
  "h1": "Notebook Esquentando em Curitiba — Limpeza e Manutenção",
  "categoria": "Notebook",
  "intro": "Notebooks esquentam mais que desktops por terem espaço interno reduzido para ventilação. Mas quando o calor fica excessivo ao ponto de incomodar ao tocar, desligar sozinho ou ficar lento, é sinal de que a manutenção está atrasada.\n\nNa maioria dos casos, a solução é limpeza interna + troca de pasta térmica — um serviço que deveria ser feito a cada 12-18 meses.",
  "sintomas": [
    {
      "titulo": "Base do notebook muito quente",
      "desc": "Calor intenso na parte inferior, incomodando o uso no colo.",
      "gravidade": "Simples a médio"
    },
    {
      "titulo": "Desliga sozinho em jogos",
      "desc": "Proteção térmica ativa quando GPU ou CPU atingem limite.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Ventoinha sempre em velocidade máxima",
      "desc": "Barulho alto constante. Sistema tentando resfriar.",
      "gravidade": "Simples"
    },
    {
      "titulo": "Lentidão progressiva",
      "desc": "Começa bem e piora conforme esquenta. Throttling térmico.",
      "gravidade": "Simples a médio"
    }
  ],
  "causas": [
    {
      "titulo": "Pasta térmica seca",
      "desc": "Após 2-3 anos, a pasta perde eficiência. Causa mais comum de superaquecimento em notebooks.",
      "tipo": "desgaste"
    },
    {
      "titulo": "Poeira no dissipador e ventoinha",
      "desc": "Poeira bloqueia o fluxo de ar. Notebook não consegue expulsar o calor.",
      "tipo": "desgaste"
    },
    {
      "titulo": "Uso em superfícies que bloqueiam ventilação",
      "desc": "Cama, almofada, cobertor bloqueiam as entradas de ar do notebook.",
      "tipo": "erro-humano"
    },
    {
      "titulo": "Pads térmicos desgastados",
      "desc": "Em notebooks com GPU dedicada, os pads térmicos sobre VRMs e VRAM podem desgastar.",
      "tipo": "desgaste"
    }
  ],
  "cenarios": [
    {
      "nivel": "Simples",
      "desc": "Limpeza externa de ventoinhas + orientação de uso.",
      "tempo": "30 min",
      "custo": "R$ 80 a R$ 120"
    },
    {
      "nivel": "Médio",
      "desc": "Desmontagem completa + limpeza + troca de pasta térmica.",
      "tempo": "1h a 2h",
      "custo": "R$ 150 a R$ 250"
    },
    {
      "nivel": "Complexo",
      "desc": "Troca de pads térmicos, reparo de heatpipe, troca de ventoinha.",
      "tempo": "2 a 5 dias",
      "custo": "R$ 250 a R$ 500 + peças"
    }
  ],
  "riscos": [
    "Calor excessivo reduz vida útil da bateria drasticamente",
    "GPU com solda fria por calor gera tela preta permanente",
    "Processador degradado por calor perde performance definitivamente"
  ],
  "diagnostico": "Monitoramento de temperatura em repouso e sob carga, inspeção visual da pasta térmica e ventoinhas, teste de eficiência do sistema de refrigeração. Custo: R$ 99,99.",
  "solucao": "Desmontagem completa do notebook, limpeza profissional com ar comprimido e aspiração, troca de pasta térmica por MX-4 ou equivalente, remontagem e teste de temperatura.",
  "quandoCompensa": "Sempre compensa. A limpeza preventiva custa R$ 150-250 e evita reparos de R$ 500-1000.",
  "quandoNaoCompensa": "Não se aplica — manutenção térmica sempre vale a pena.",
  "whatsappMessage": "Olá! Meu notebook está esquentando muito. Podem fazer limpeza?",
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
      "label": "Notebook Lento",
      "to": "/problemas/notebook-lento-curitiba"
    },
    {
      "label": "Notebook Desligando",
      "to": "/problemas/notebook-desligando-sozinho-curitiba"
    },
    {
      "label": "PC Superaquecendo",
      "to": "/problemas/pc-superaquecendo-curitiba"
    }
  ],
  "conteudoExtra": "### Dicas Para Reduzir o Aquecimento\n\n1. Use o notebook em superfícies planas e rígidas (mesa, suporte)\n2. Evite usar na cama ou no colo por longos períodos\n3. Considere um cooler externo para uso intensivo\n4. Faça limpeza profissional a cada 12-18 meses\n5. Evite bloquear as saídas de ar laterais e traseiras"
};
