import type { ProblemaPageData } from "./types";

export const problema: ProblemaPageData = {
  "slug": "quando-trocar-computador",
  "title": "Quando Trocar o Computador? | Guia Técnico",
  "metaDescription": "Quando vale trocar o computador por um novo? Guia técnico honesto. Diagnóstico em Curitiba.",
  "h1": "Quando Trocar o Computador? — Guia Técnico Honesto",
  "categoria": "Decisão do Cliente",
  "intro": "Trocar nem sempre é a resposta. Mas às vezes é a decisão mais racional. Nesta página, explicamos os sinais claros de que chegou a hora de trocar, e quando ainda vale investir em reparo ou upgrade.",
  "sintomas": [
    {
      "titulo": "Sinais de que é hora de trocar",
      "desc": "Múltiplos defeitos, lentidão irrecuperável, incompatibilidade com software atual.",
      "gravidade": "N/A"
    },
    {
      "titulo": "Sinais de que NÃO precisa trocar",
      "desc": "Problema único, upgrade resolve, equipamento atende necessidades.",
      "gravidade": "N/A"
    }
  ],
  "causas": [
    {
      "titulo": "Obsolescência real",
      "desc": "Processador não suporta Windows 11, DDR3 não suporta mais RAM, etc.",
      "tipo": "hardware"
    },
    {
      "titulo": "Obsolescência percebida",
      "desc": "Computador parece velho mas um SSD + RAM resolve.",
      "tipo": "software"
    }
  ],
  "cenarios": [
    {
      "nivel": "Simples",
      "desc": "Upgrade resolve → NÃO precisa trocar",
      "tempo": "N/A",
      "custo": "R$ 300 a R$ 600 de upgrade"
    },
    {
      "nivel": "Médio",
      "desc": "Avaliar: upgrade parcial + uso por mais 2-3 anos",
      "tempo": "N/A",
      "custo": "Variável"
    },
    {
      "nivel": "Complexo",
      "desc": "Hardware defasado + múltiplos problemas → TROCAR",
      "tempo": "N/A",
      "custo": "Investir em novo"
    }
  ],
  "riscos": [
    "Trocar prematuramente desperdiça dinheiro",
    "Não trocar quando deveria desperdiça tempo e produtividade"
  ],
  "diagnostico": "Avaliação completa: vale upgrade ou trocar? Custo: R$ 99,99 (investimento que pode economizar centenas).",
  "solucao": "Recomendação honesta baseada em dados técnicos, não em venda.",
  "quandoCompensa": "Trocar quando o custo total de reparos + upgrades ultrapassa 60% de um novo que atende melhor.",
  "quandoNaoCompensa": "Quando um upgrade de R$ 300-500 resolve o problema e estende a vida útil em 3-4 anos.",
  "whatsappMessage": "Olá! Quero saber se devo trocar meu computador ou reparar. Podem me ajudar?",
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
      "label": "Vale Consertar PC?",
      "to": "/problemas/vale-a-pena-consertar-computador"
    },
    {
      "label": "Custo Reparo vs Novo",
      "to": "/problemas/custo-reparo-vs-novo"
    },
    {
      "label": "Quando Não Compensa",
      "to": "/problemas/quando-nao-compensa-reparo"
    },
    {
      "label": "Upgrade SSD",
      "to": "/servicos/upgrade-ssd-memoria"
    }
  ],
  "conteudoExtra": "### Os 5 Sinais de Que Chegou a Hora\n\n1. Processador anterior a 2015 (não suporta software atual)\n2. Máximo de RAM suportada é 4GB\n3. Não suporta SSD\n4. Terceiro reparo em 12 meses\n5. Não roda mais os programas que você precisa\n\n### Obsolescência Real vs Percebida\n\nA indústria de tecnologia quer que você compre novo a cada 2-3 anos. A realidade é que um computador bem cuidado dura 7-10 anos com upgrades adequados.\n\n**Obsolescência percebida**: \"Meu computador está lento, preciso de um novo.\" — Na maioria dos casos, um SSD + RAM resolve. Custo: R$ 300-500 em vez de R$ 3.000+.\n\n**Obsolescência real**: Quando o hardware não pode ser atualizado para atender necessidades atuais. Exemplos:\n- Processador Intel 4ª geração ou anterior (2013-) → não suporta Windows 11\n- Placa-mãe com DDR3 → máximo de 16GB RAM, insuficiente para workloads modernos\n- Slot PCI-Express 2.0 → limita GPUs modernas\n\n### Matriz de Decisão Completa\n\n| Idade do PC | Problema | Custo Reparo | Decisão |\n|---|---|---|---|\n| 0-3 anos | Qualquer | Até R$ 800 | REPARAR ✅ |\n| 3-5 anos | Simples/Médio | Até R$ 600 | REPARAR ✅ |\n| 3-5 anos | Complexo | R$ 600+ | AVALIAR ⚠️ |\n| 5-7 anos | Simples | Até R$ 400 | REPARAR ✅ |\n| 5-7 anos | Médio/Complexo | R$ 400+ | UPGRADE ou TROCAR 🔄 |\n| 7+ anos | Qualquer | Qualquer | AVALIAR TROCA 🆕 |\n\n### Quanto Custa um PC Novo em 2024-2025?\n\nPara ajudar na comparação, estes são os preços médios em Curitiba:\n\n| Perfil de Uso | Desktop | Notebook |\n|---|---|---|\n| Básico (Office/Internet) | R$ 2.000-3.000 | R$ 2.500-3.500 |\n| Intermediário (Multitarefa) | R$ 3.000-5.000 | R$ 3.500-5.500 |\n| Profissional (Design/Dev) | R$ 5.000-8.000 | R$ 5.500-10.000 |\n| Gamer/Pesado | R$ 5.000-15.000 | R$ 6.000-15.000 |\n\nCompare esses valores com o custo do reparo/upgrade do seu equipamento atual para tomar a decisão mais racional."
};
