import type { ProblemaPageData } from "./types";

export const problema: ProblemaPageData = {
  "slug": "por-que-conserto-placa-mae-custa-caro-curitiba",
  "title": "Por Que Conserto de Placa-Mãe Custa Caro? | Entenda os Custos Reais",
  "metaDescription": "Entenda por que o reparo de placa-mãe custa R$ 300-1.500. Equipamentos de R$ 20.000-65.000, anos de treinamento e componentes importados.",
  "h1": "Por Que o Conserto de Placa-Mãe Custa Caro? — A Verdade Sobre os Custos",
  "categoria": "Educacional",
  "intro": "**\"Por que vocês cobram R$ 500 para trocar um componentezinho?\"** — Essa é uma das perguntas mais comuns. A resposta envolve entender o **investimento brutal** que um técnico de microsoldagem faz para poder oferecer esse serviço.\n\n**O \"componentezinho\" custa R$ 3. O equipamento para trocá-lo custa R$ 30.000.**\n\nUm técnico especializado em reparo de placas-mãe investe:\n- **R$ 20.000 a R$ 65.000** em equipamentos\n- **2 a 5 anos** de treinamento e prática\n- **R$ 500 a R$ 1.500/mês** em consumíveis (flux, estanho, pontas, stencils)\n- **R$ 200-500/mês** em componentes de estoque (ICs, MOSFETs, capacitores)\n\nAlém disso, nem todo reparo dá certo. A taxa de sucesso varia de 60% a 90% dependendo do tipo de defeito. Nos reparos que não funcionam, o técnico investiu tempo e material sem retorno.\n\n**É como um cirurgião:** você não paga pelo corte — paga pelos anos de estudo e pelo equipamento de R$ 500.000 da sala de cirurgia.",
  "sintomas": [
    {
      "titulo": "Cliente acha caro o orçamento",
      "desc": "Compara com o preço do componente (R$ 3-30) sem considerar equipamento, treinamento e risco.",
      "gravidade": "Simples"
    },
    {
      "titulo": "Busca técnico mais barato",
      "desc": "Técnicos baratos sem equipamento adequado podem danificar a placa irreversivelmente.",
      "gravidade": "Complexo"
    },
    {
      "titulo": "Quer consertar sozinho (YouTube)",
      "desc": "Sem microscópio e estação adequada, chance de sucesso é mínima e risco de piorar é alto.",
      "gravidade": "Complexo"
    },
    {
      "titulo": "Compara com preço de formatação",
      "desc": "Formatação usa R$ 50 em equipamento. Microsoldagem usa R$ 30.000+. São serviços incomparáveis.",
      "gravidade": "Simples"
    }
  ],
  "causas": [
    {
      "titulo": "Equipamentos custam R$ 20.000-65.000",
      "desc": "Estação BGA (R$ 5.000-35.000), microscópio (R$ 2.000-5.000), osciloscópio (R$ 2.000-8.000), estação de solda profissional (R$ 1.500-5.000), câmera térmica (R$ 1.500-5.000).",
      "tipo": "hardware"
    },
    {
      "titulo": "Treinamento leva 2-5 anos",
      "desc": "Cursos de eletrônica, microsoldagem, diagnóstico BGA. Prática diária. Não se aprende em 1 curso de fim de semana.",
      "tipo": "erro-humano"
    },
    {
      "titulo": "Componentes são importados",
      "desc": "ICs, chips BGA e componentes específicos vêm da China com frete + impostos. Prazo de 15-30 dias. Estoque mínimo: R$ 2.000-5.000.",
      "tipo": "hardware"
    },
    {
      "titulo": "Taxa de sucesso não é 100%",
      "desc": "Em reballing BGA, taxa é 70-85%. O técnico investe 2-4 horas de trabalho que pode não ter resultado. Isso é embutido no preço.",
      "tipo": "desgaste"
    }
  ],
  "cenarios": [
    {
      "nivel": "Simples",
      "desc": "Componentes discretos (capacitor, resistor, MOSFET). Equipamento básico suficiente.",
      "tempo": "1 a 3 dias",
      "custo": "R$ 200 a R$ 450"
    },
    {
      "nivel": "Médio",
      "desc": "ICs de gerenciamento, controladores. Estação BGA necessária.",
      "tempo": "3 a 7 dias",
      "custo": "R$ 400 a R$ 800"
    },
    {
      "nivel": "Complexo",
      "desc": "CPU, GPU, NAND, PMIC. Estação BGA profissional + stencils específicos.",
      "tempo": "7 a 20 dias",
      "custo": "R$ 600 a R$ 1.500"
    }
  ],
  "riscos": [
    "Técnico barato sem equipamento pode destruir a placa",
    "Componentes falsificados/reciclados podem falhar em semanas",
    "Reparo DIY sem microscópio tem taxa de sucesso próxima de 0%",
    "Cada tentativa fracassada dificulta a próxima (pads danificados)",
    "Aquecimento incorreto destrói chips adjacentes ao componente alvo"
  ],
  "diagnostico": "**O que está incluso no custo do diagnóstico:**\n\n1. **Desmontagem completa** do equipamento\n2. **Inspeção visual com microscópio** (R$ 2.000-5.000 de equipamento)\n3. **Medições com multímetro e osciloscópio** (R$ 3.000-10.000)\n4. **Teste com fonte regulável** (R$ 300-1.500)\n5. **Identificação do componente defeituoso**\n6. **Orçamento detalhado** com probabilidade de sucesso\n7. **Remontagem** se o cliente não aprovar\n\n**Tempo médio: 30 minutos a 2 horas de trabalho técnico.**\n\n**Custo: R$ 50-150, abatido do serviço aprovado.**",
  "solucao": "**Entendendo a composição do preço:**\n\n**R$ 500 de reparo de placa = isso:**\n- R$ 5-30 em componente\n- R$ 50-100 em amortização de equipamento\n- R$ 30-50 em consumíveis (flux, estanho, ponta)\n- R$ 200-300 em mão de obra especializada (2-4 horas)\n- R$ 50-100 em risco (% de reparos sem sucesso)\n- R$ 20-30 em energia, aluguel, impostos\n\n**Comparação internacional:**\n- EUA: reparo de placa-mãe custa US$ 150-500 (R$ 750-2.500)\n- Europa: €120-400 (R$ 660-2.200)\n- Brasil: R$ 300-1.500\n\n**O Brasil pratica preços menores que o mercado internacional.**",
  "quandoCompensa": "Sempre que o equipamento vale mais que o dobro do custo do reparo. Notebooks de R$ 3.000+, celulares de R$ 2.000+, TVs de R$ 2.500+, receivers de R$ 3.000+.",
  "quandoNaoCompensa": "Quando o custo do reparo ultrapassa 50% do valor de um equipamento novo equivalente. Nesse caso, o investimento é melhor direcionado para um aparelho novo com garantia.",
  "whatsappMessage": "Olá! Quero entender melhor sobre reparo de placa-mãe. Podem me orientar?",
  "relatedPages": [
    {
      "label": "Reparo Placa Notebook",
      "to": "/problemas/reparo-placa-mae-notebook-curitiba"
    },
    {
      "label": "Reparo Placa Celular",
      "to": "/problemas/reparo-placa-mae-celular-curitiba"
    },
    {
      "label": "Reparo Placa TV",
      "to": "/problemas/reparo-placa-principal-tv-curitiba"
    },
    {
      "label": "Reparo Placa Som",
      "to": "/problemas/reparo-placa-som-amplificador-curitiba"
    },
    {
      "label": "Conserto de Placa",
      "to": "/servicos/conserto-placa"
    },
    {
      "label": "Diagnóstico Técnico",
      "to": "/diagnostico-tecnico"
    }
  ],
  "conteudoExtra": "## Investimento Total de Uma Bancada Profissional\n\n### Bancada de Microsoldagem de Celular\n\n| Equipamento | Marca/Modelo Referência | Preço Médio |\n|------------|------------------------|------------|\n| Microscópio trinocular 7x-50x | Simul-focal com LED | R$ 2.500 |\n| Câmera 37MP HDMI | Para monitor externo | R$ 1.200 |\n| Monitor 22\" | Para câmera do microscópio | R$ 800 |\n| Estação de solda | JBC CD-2BE | R$ 4.000 |\n| Pontas de solda (kit) | JBC C210 (5 pontas) | R$ 500 |\n| Ar quente | Quick 861DW | R$ 1.200 |\n| Pré-aquecedor | Placa inferior | R$ 800 |\n| Fonte regulável | 30V/5A com display | R$ 600 |\n| Multímetro | Fluke 117 | R$ 1.200 |\n| Programadora NAND | JC P7 / iRepair P10 | R$ 2.500 |\n| Ultrassônica | 3L digital | R$ 500 |\n| Stencils (acervo) | 50+ modelos | R$ 3.000 |\n| Consumíveis iniciais | Flux, estanho, fios, etc. | R$ 1.500 |\n| **SUBTOTAL** | | **~R$ 20.300** |\n\n### Bancada de BGA para Notebook\n\n| Equipamento | Marca/Modelo Referência | Preço Médio |\n|------------|------------------------|------------|\n| Estação BGA IR | Achi IR6000 | R$ 4.500 |\n| OU Estação BGA Pro | Pro-660/Pro-880 | R$ 18.000-30.000 |\n| Osciloscópio 4ch | Rigol DS1054Z | R$ 3.000 |\n| Câmera térmica | Uni-T UTi120S | R$ 2.500 |\n| Programador BIOS | CH341A + adaptadores | R$ 150 |\n| **SUBTOTAL** | | **~R$ 10.000-36.000** |\n\n### Bancada de Reparo de TV\n\n| Equipamento | Marca/Modelo Referência | Preço Médio |\n|------------|------------------------|------------|\n| Máquina TAB | Para flat cables | R$ 5.000-15.000 |\n| Estação de solda | Para componentes THT/SMD | R$ 1.000 |\n| Multímetro de bancada | Para medições precisas | R$ 1.500 |\n| Fonte regulável | Para teste de placas | R$ 600 |\n| Lâmpada série | Para teste de fonte | R$ 50 |\n| **SUBTOTAL** | | **~R$ 8.000-18.000** |\n\n### TOTAL de uma oficina completa (celular + notebook + TV):\n**R$ 38.000 a R$ 75.000+**\n\n## A Realidade do Técnico\n\n### Formação\n- Curso técnico em eletrônica: 1-2 anos\n- Curso de microsoldagem BGA: 40-80 horas + prática\n- Curso de diagnóstico de placas: 40-60 horas\n- Prática diária: 2-5 anos até se tornar proficiente\n- Atualização constante: novos modelos, novos chips, novos processos\n\n### Por Que Poucos Técnicos Fazem Microsoldagem\n- Investimento alto (R$ 20.000-75.000)\n- Curva de aprendizado longa (2-5 anos)\n- Risco financeiro (reparos sem sucesso)\n- Demanda por precisão extrema\n- Estresse (componentes de R$ 2.000 na mão)\n\n## Conclusão: Valor vs Preço\n\nO cliente não está pagando por um \"componentezinho de R$ 3\".\nEstá pagando por:\n- **R$ 30.000-75.000** em equipamento\n- **3-5 anos** de treinamento\n- **2-4 horas** de trabalho especializado\n- **A chance de salvar um equipamento** que de outra forma iria para o lixo\n\nPense assim: um médico não cobra pelo esparadrapo. Cobra pelo diagnóstico correto."
};
