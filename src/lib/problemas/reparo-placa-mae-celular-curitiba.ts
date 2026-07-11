import type { ProblemaPageData } from "./types";

export const problema: ProblemaPageData = {
  "slug": "reparo-placa-mae-celular-curitiba",
  "title": "Reparo de Placa-Mãe de Celular em Curitiba | Microsoldagem Especializada",
  "metaDescription": "Conserto de placa-mãe de celular com microsoldagem em Curitiba. Equipamentos de R$ 15.000+. iPhone, Samsung, Motorola. Custos reais e quando compensa.",
  "h1": "Reparo de Placa-Mãe de Celular — Microsoldagem Especializada em Curitiba",
  "categoria": "Reparo de Placa-Mãe",
  "intro": "A placa-mãe do celular é menor que um cartão de crédito, mas contém **mais de 1.000 componentes** soldados em ambos os lados. Reparar um componente de 0.3mm exige microscópio com aumento de 20x-50x, estação de solda com ponta de 0.1mm e mãos extremamente firmes.\n\n**O investimento para microsoldagem de celular:**\n- Microscópio trinocular (7x-50x com câmera): R$ 2.000 a R$ 5.000\n- Estação de solda JBC ou equivalente: R$ 2.000 a R$ 6.000\n- Estação de ar quente com controle digital: R$ 500 a R$ 2.000\n- Separador de tela com vácuo: R$ 300 a R$ 1.500\n- Stencils BGA por modelo (iPhone, Samsung): R$ 30 a R$ 150 cada (dezenas necessários)\n- Fonte regulável com amperímetro: R$ 300 a R$ 1.000\n- Programadora de NAND/NOR Flash: R$ 500 a R$ 3.000\n- Jigs e fixtures por modelo: R$ 50 a R$ 300 cada\n- Fluxo, estanho, fios, malhas, pontas: R$ 200-500/mês de consumíveis\n\n**Investimento total: R$ 15.000 a R$ 40.000+**\n\nPor isso, microsoldagem de celular custa de R$ 200 a R$ 1.200+ — é um serviço altamente especializado.",
  "sintomas": [
    {
      "titulo": "Celular não liga (morto)",
      "desc": "Sem reação ao botão power. Pode ser PMIC (Power Management IC) queimado, trilha rompida ou curto-circuito. Diagnóstico com fonte regulável + câmera térmica.",
      "gravidade": "Complexo"
    },
    {
      "titulo": "Sem sinal / sem rede (baseband)",
      "desc": "Chip de baseband (modem) com defeito. Em iPhones é o Qualcomm MDM, em Samsung é o Exynos Modem. Microsoldagem delicada.",
      "gravidade": "Complexo"
    },
    {
      "titulo": "Não carrega / porta USB-C defeituosa",
      "desc": "Chip Tristar (iPhone) ou controlador de carga danificado. Comum após uso de cabos genéricos ou entrada de líquido.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Touch não funciona (tela OK)",
      "desc": "IC de touch (Cumulus em iPhone, touch IC em Samsung) com solda fria ou defeituoso. Microsoldagem do IC.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Celular reinicia em loop",
      "desc": "NAND Flash corrompida, CPU com solda fria ou curto no circuito de alimentação. Requer diagnóstico aprofundado.",
      "gravidade": "Complexo"
    },
    {
      "titulo": "Sem Wi-Fi / sem Bluetooth",
      "desc": "Chip de comunicação wireless (BCM em iPhone, WCN em Qualcomm) com defeito. Troca do IC específico.",
      "gravidade": "Médio"
    }
  ],
  "causas": [
    {
      "titulo": "Chip PMIC (Power Management) queimado",
      "desc": "O PMIC gerencia todas as tensões do celular. Um curto em qualquer linha pode queimá-lo. É o chip mais caro e complexo de trocar — em iPhones (Qualcomm PM8150) custa R$ 100-300 só a peça.",
      "tipo": "hardware"
    },
    {
      "titulo": "Oxidação por entrada de líquido",
      "desc": "Mesmo celulares IP68 podem ter entrada de líquido pela porta USB ou SIM. A oxidação corrói trilhas de 0.05mm em horas. Limpeza ultrassônica + microsoldagem das trilhas afetadas.",
      "tipo": "erro-humano"
    },
    {
      "titulo": "Solda BGA fria por ciclos térmicos",
      "desc": "Games pesados, carregamento rápido e uso intenso causam ciclos de temperatura que deterioram soldas BGA dos chips principais.",
      "tipo": "desgaste"
    },
    {
      "titulo": "Dano por queda/impacto",
      "desc": "Impacto pode deslocar chips BGA ou romper trilhas internas da placa multicamada (8-12 layers nos celulares modernos).",
      "tipo": "erro-humano"
    },
    {
      "titulo": "Curto por carregador genérico",
      "desc": "Carregadores sem certificação podem enviar picos de tensão que queimam o chip Tristar (iPhone) ou controlador USB (Samsung).",
      "tipo": "erro-humano"
    },
    {
      "titulo": "NAND Flash defeituosa",
      "desc": "Memória de armazenamento com setores defeituosos. Pode ser reprogramada ou trocada. Em iPhones, requer programadora NAND específica.",
      "tipo": "hardware"
    }
  ],
  "cenarios": [
    {
      "nivel": "Simples",
      "desc": "IC de carga (Tristar/Tigris), capacitor em curto, conector de bateria. Componentes acessíveis.",
      "tempo": "1 a 3 dias",
      "custo": "R$ 200 a R$ 450"
    },
    {
      "nivel": "Médio",
      "desc": "IC de touch, Wi-Fi, áudio. Microsoldagem BGA com stencil. Componentes R$ 50-200.",
      "tempo": "3 a 7 dias",
      "custo": "R$ 400 a R$ 800"
    },
    {
      "nivel": "Complexo",
      "desc": "PMIC, baseband, CPU, NAND. Chips caros (R$ 100-500), processo de alto risco.",
      "tempo": "7 a 20 dias",
      "custo": "R$ 600 a R$ 1.500"
    }
  ],
  "riscos": [
    "Microsoldagem em placa de celular tem taxa de sucesso de 65-85%",
    "Placas multicamada (8-12 camadas) — dano em camada interna é irreparável",
    "Chips de celular são menores que os de notebook — margem de erro é mínima",
    "Componentes originais nem sempre disponíveis — pode usar compatível/reciclado",
    "Calor excessivo durante o reparo pode danificar chips adjacentes",
    "Em iPhones, troca de NAND requer pareamento com CPU — processo complexo"
  ],
  "diagnostico": "**Protocolo para diagnóstico de placa de celular:**\n\n**1. Teste com fonte regulável (DC Power Supply):**\nConecta-se a placa diretamente à fonte (sem bateria). O consumo de corrente no momento do boot indica:\n- 0mA = circuito aberto / chip morto\n- 50-200mA = boot parcial\n- 500mA+ = curto-circuito\n\n**2. Câmera térmica / toque:**\nIdentifica o componente em curto pelo aquecimento anormal.\n\n**3. Microscópio trinocular:**\nInspeção visual de todos os componentes em busca de queimados, oxidação, trilhas rompidas.\n\n**4. Multímetro em modo diodo:**\nTeste de todas as linhas de alimentação (VCC_MAIN, PP_BATT_VCC, PP1V8, PP_GPU, etc.).\n\n**5. Esquemático (quando disponível):**\nComparação de valores medidos com valores de referência do esquemático.\n\n**Custo do diagnóstico: R$ 60-100, abatido do serviço.**",
  "solucao": "**Microsoldagem de celular é trabalho de precisão cirúrgica:**\n\n**Nível 1 — Componentes passivos (30% dos casos):**\n- Capacitores, resistores, bobinas de filtro\n- Tamanho: 0201 a 0402 (0.5mm a 1mm)\n- Solda com ferro de ponta cônica 0.1mm sob microscópio\n\n**Nível 2 — ICs secundários (40% dos casos):**\n- Touch IC, Wi-Fi IC, áudio IC, IC de carga\n- Remoção com ar quente (360-380°C)\n- Limpeza de pads com malha\n- Aplicação de stencil BGA + esferas de solda\n- Recolocação com ar quente e perfil controlado\n\n**Nível 3 — Chips principais (30% dos casos):**\n- PMIC, CPU, baseband, NAND\n- Processo igual ao Nível 2, mas com risco maior\n- NAND em iPhone requer pareamento via programadora\n- CPU requer reballing perfeito — uma esfera fora de posição = placa morta\n\n**Cada microsoldagem leva de 30 minutos a 4 horas dependendo do componente.**",
  "quandoCompensa": "Celulares de até 2 anos com valor acima de R$ 2.000. iPhones e Samsung Galaxy S/Note — placa de reposição custa R$ 1.500-4.000, então reparo de R$ 400-800 compensa. Celulares com dados importantes sem backup.",
  "quandoNaoCompensa": "Celulares com mais de 3 anos ou valor abaixo de R$ 1.000 quando novos. Danos por líquido com mais de 48h sem atendimento (oxidação extensa). Quando o custo do reparo ultrapassa 50% do valor de um celular novo equivalente.",
  "whatsappMessage": "Olá! Meu celular tem problema na placa-mãe. Quero saber se tem conserto e quanto custa.",
  "relatedPages": [
    {
      "label": "Conserto de Celular",
      "to": "/servicos/conserto-celular"
    },
    {
      "label": "Celular Não Liga",
      "to": "/problemas/celular-nao-liga-curitiba"
    },
    {
      "label": "Conserto de Placa",
      "to": "/servicos/conserto-placa"
    },
    {
      "label": "Reparo Placa Notebook",
      "to": "/problemas/reparo-placa-mae-notebook-curitiba"
    },
    {
      "label": "Celular com Listras",
      "to": "/problemas/celular-listras-na-tela-curitiba"
    },
    {
      "label": "Diagnóstico Técnico",
      "to": "/diagnostico-tecnico"
    }
  ],
  "conteudoExtra": "## O Universo da Microsoldagem de Celular\n\n### Tamanho dos Componentes\n\nPara ter noção da escala:\n- **Capacitor 0201:** 0.6mm x 0.3mm — menor que um grão de areia\n- **Resistor 0402:** 1mm x 0.5mm — visível mas impossível de soldar sem microscópio\n- **IC de carga:** 3mm x 3mm com 20-40 pads\n- **PMIC:** 5mm x 5mm com 100+ pads BGA\n- **CPU:** 8mm x 8mm com 500+ pads BGA de 0.15mm\n\n### Ferramentas Essenciais e Preços Reais\n\n| Ferramenta | Função | Preço Médio |\n|-----------|--------|------------|\n| Microscópio trinocular 7x-50x | Visualizar componentes | R$ 2.000-5.000 |\n| Câmera 37MP HDMI | Filmar reparo no monitor | R$ 800-2.000 |\n| Estação de solda JBC CD-2BE | Soldagem precisa | R$ 3.000-5.000 |\n| Pontas JBC C210/C245 | Pontas de solda finas | R$ 100-300/cada |\n| Estação de ar quente Quick 861DW | Remoção de BGA | R$ 800-1.500 |\n| Stencils BGA (por modelo) | Reballing de chips | R$ 30-150/cada |\n| Preheater (pré-aquecedor) | Aquecer placa uniformemente | R$ 500-1.500 |\n| Programadora NAND (JC/iRepair) | iPhone NAND | R$ 1.500-3.000 |\n| Jigs de fixação | Segurar placa | R$ 50-300/cada |\n\n### Modelos e Problemas Mais Comuns\n\n**iPhone:**\n- iPhone 7/7 Plus: IC de áudio (doença conhecida como \"loop disease\")\n- iPhone 8/X: Tristar / Hydra (não carrega)\n- iPhone 11-15: Baseband, Wi-Fi, NAND\n- iPhone com Face ID: módulo dot projector (pareamento)\n\n**Samsung:**\n- Galaxy S20/S21/S22: eMMC / UFS com setores defeituosos\n- Galaxy A série: PMIC após surto elétrico\n- Galaxy Z Flip/Fold: flex cable da dobradiça + placa\n\n**Motorola:**\n- Moto G série: IC de carga USB\n- Moto Edge: problemas de baseband\n\n**Xiaomi:**\n- Redmi Note série: PMIC e reguladores de tensão\n- Poco: GPU com superaquecimento\n\n## Direitos do Consumidor\n\n- Se o celular está na **garantia** e o defeito é de fabricação, o fabricante DEVE reparar sem custo\n- Vício oculto (CDC Art. 18/26): prazo conta da descoberta do defeito\n- Se a assistência autorizada demora mais de 30 dias, você pode exigir troca ou devolução"
};
