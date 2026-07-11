import type { ProblemaPageData } from "./types";

export const problema: ProblemaPageData = {
  "slug": "pc-com-programas-pesados",
  "title": "PC com Programas Pesados em Curitiba | Otimização",
  "metaDescription": "PC não roda programas pesados? AutoCAD, Photoshop, jogos? Diagnóstico e upgrade em Curitiba.",
  "h1": "PC com Programas Pesados em Curitiba — Otimização e Upgrade",
  "categoria": "Software / Sistema",
  "intro": "Programas como AutoCAD, Photoshop, Premiere, jogos modernos e softwares de engenharia exigem hardware específico. Se seu computador trava, fica lento ou não abre esses programas, o diagnóstico identifica qual componente é o gargalo e qual upgrade resolve.",
  "sintomas": [
    {
      "titulo": "Programa trava ao abrir",
      "desc": "RAM ou GPU insuficiente para o software.",
      "gravidade": "Simples"
    },
    {
      "titulo": "Lentidão extrema ao usar",
      "desc": "Processador ou disco não acompanha.",
      "gravidade": "Simples a médio"
    },
    {
      "titulo": "Renderização muito lenta",
      "desc": "CPU/GPU insuficiente para processamento pesado.",
      "gravidade": "Simples"
    }
  ],
  "causas": [
    {
      "titulo": "RAM insuficiente",
      "desc": "Programas pesados exigem 16-32GB. Muitos PCs têm 4-8GB.",
      "tipo": "hardware"
    },
    {
      "titulo": "GPU insuficiente",
      "desc": "Jogos e 3D exigem GPU dedicada. Integrada não dá conta.",
      "tipo": "hardware"
    },
    {
      "titulo": "Disco lento (HD)",
      "desc": "Programas grandes precisam de SSD para carregar rápido.",
      "tipo": "hardware"
    },
    {
      "titulo": "Processador antigo",
      "desc": "Processadores de 5+ anos podem não acompanhar software moderno.",
      "tipo": "hardware"
    }
  ],
  "cenarios": [
    {
      "nivel": "Simples",
      "desc": "Upgrade de RAM + SSD resolve a maioria.",
      "tempo": "2h a 4h",
      "custo": "R$ 300 a R$ 600"
    },
    {
      "nivel": "Médio",
      "desc": "Upgrade de RAM + SSD + GPU.",
      "tempo": "4h a 1 dia",
      "custo": "R$ 600 a R$ 1500"
    },
    {
      "nivel": "Complexo",
      "desc": "Montagem de PC otimizada para a carga de trabalho.",
      "tempo": "Sob consulta",
      "custo": "Sob consulta"
    }
  ],
  "riscos": [
    "Comprar peça errada por não saber qual é o gargalo",
    "Upgrade parcial pode não resolver se o gargalo é outro componente"
  ],
  "diagnostico": "Análise de requisitos do software vs hardware atual, identificação do gargalo, recomendação de upgrade. Custo: R$ 99,99 (incorporado ao serviço).",
  "solucao": "Upgrade direcionado ao gargalo identificado. Sem desperdício.",
  "quandoCompensa": "Quando o upgrade resolve o gargalo e o hardware base ainda é bom.",
  "quandoNaoCompensa": "Quando o hardware todo é defasado e o upgrade seria quase uma montagem nova.",
  "whatsappMessage": "Olá! Meu PC não roda programas pesados. Podem me ajudar com upgrade?",
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
      "label": "Upgrade SSD/Memória",
      "to": "/servicos/upgrade-ssd-memoria"
    },
    {
      "label": "Montagem PC",
      "to": "/servicos/montagem-pc"
    },
    {
      "label": "Computador Travando",
      "to": "/problemas/computador-travando-curitiba"
    },
    {
      "label": "Vale Consertar?",
      "to": "/problemas/vale-a-pena-consertar-computador"
    }
  ],
  "conteudoExtra": "### Requisitos Mínimos Recomendados\n\n| Software | RAM Mínima | GPU | SSD |\n|---|---|---|---|\n| AutoCAD | 16GB | Dedicada | Sim |\n| Photoshop | 16GB | 2GB+ | Sim |\n| Premiere Pro | 32GB | 4GB+ | NVMe |\n| Jogos Modernos | 16GB | GTX 1060+ | Sim |\n| Office/Navegação | 8GB | Integrada | Sim |\n\n### Identificando o Gargalo: O Passo Mais Importante\n\nAntes de comprar qualquer peça, é ESSENCIAL identificar qual componente está limitando o desempenho. Comprar RAM extra quando o problema é GPU não resolve nada — e vice-versa.\n\n**Como identificamos o gargalo:**\n\n1. **Monitoramos CPU, RAM, GPU e Disco** durante o uso do programa problemático\n2. O componente que fica a 100% enquanto os outros ficam ociosos é o gargalo\n3. Ex: Se a RAM fica a 95% mas CPU fica a 30% → gargalo é RAM → upgrade de RAM resolve\n\n### Cenários Comuns em Curitiba\n\n**Estudante de arquitetura/engenharia** — AutoCAD e Revit em notebook com 8GB RAM e GPU integrada. Solução: upgrade para 16GB RAM + SSD (se notebook suportar). Se não suportar, montagem de desktop dedicado.\n\n**Designer gráfico** — Photoshop e Illustrator em PC com HD mecânico. Solução: SSD NVMe (files de trabalho carregam 10x mais rápido) + upgrade de RAM para 16-32GB.\n\n**Editor de vídeo** — Premiere Pro em PC com 8GB RAM e GPU fraca. Solução: 32GB RAM + SSD NVMe para scratch disk + GPU com pelo menos 4GB VRAM.\n\n**Gamer** — Jogos modernos (GTA V, Cyberpunk, Valorant) em PC antigo. Solução: depende do orçamento — pode ser upgrade gradual (SSD → RAM → GPU) ou montagem completa otimizada.\n\n### Upgrade Gradual vs Montagem Nova\n\n| Fator | Upgrade Gradual | Montagem Nova |\n|---|---|---|\n| Custo | R$ 300-1500 | R$ 2500-8000+ |\n| Tempo para usar | Mesmo dia | 1-3 dias |\n| Performance | Boa (se base ok) | Máxima |\n| Recomendado quando | PC tem menos de 5 anos | PC tem 7+ anos |\n| Risco | Gargalo pode migrar | Nenhum |\n\nNa maioria dos casos em Curitiba, o upgrade gradual é a melhor opção: SSD + RAM resolve 80% dos problemas de performance por uma fração do custo de um PC novo."
};
