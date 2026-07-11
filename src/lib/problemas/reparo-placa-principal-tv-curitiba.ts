import type { ProblemaPageData } from "./types";

export const problema: ProblemaPageData = {
  "slug": "reparo-placa-principal-tv-curitiba",
  "title": "Reparo de Placa Principal de TV em Curitiba | Componentes e Custos",
  "metaDescription": "Reparo de placa principal, fonte e T-CON de TV em Curitiba. Conserto a nível de componente. Custos reais: R$ 150 a R$ 1.200.",
  "h1": "Reparo de Placa Principal de TV — Conserto a Nível de Componente em Curitiba",
  "categoria": "Reparo de Placa-Mãe",
  "intro": "Uma TV moderna tem 3-4 placas principais: **placa fonte** (alimentação), **placa principal** (processamento), **placa T-CON** (controle do painel) e **placa inverter/LED driver** (iluminação). Cada uma pode falhar independentemente.\n\n**Muitas assistências condenam a placa inteira** e cobram R$ 500-1.500 pela troca. Nós reparamos a **nível de componente** — identificamos o capacitor, MOSFET ou IC específico que falhou e trocamos apenas ele. Resultado: **reparo de R$ 150-600 em vez de R$ 500-1.500.**\n\n**Dados reais de custos de placas (troca completa vs reparo):**\n- Placa fonte Samsung UN55: placa nova R$ 400-700 / reparo R$ 150-350\n- Placa principal LG 50\": placa nova R$ 500-900 / reparo R$ 200-500\n- T-CON Samsung 43\": placa nova R$ 200-400 / reparo de chip R$ 150-300\n- LED driver Philco 32\": placa nova R$ 250-500 / reparo R$ 100-250\n\n**O reparo a nível de componente economiza 40-70% em relação à troca da placa.**",
  "sintomas": [
    {
      "titulo": "TV não liga (LED standby apagado)",
      "desc": "Problema na placa fonte. Capacitores eletrolíticos inchados são a causa #1 — componentes de R$ 1-5 que custam centenas se for trocar a placa inteira.",
      "gravidade": "Médio"
    },
    {
      "titulo": "TV liga e desliga sozinha",
      "desc": "Proteção ativando por defeito na fonte, backlight ou placa principal. Diagnóstico em bancada identifica qual.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Sem imagem mas com som",
      "desc": "Backlight (LEDs) queimados ou LED driver defeituoso. Teste com lanterna no painel confirma.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Imagem distorcida / travando",
      "desc": "Placa principal com eMMC cheia/defeituosa ou processador com solda fria.",
      "gravidade": "Médio a Complexo"
    },
    {
      "titulo": "HDMI / USB não funciona",
      "desc": "Chip HDMI ou controlador USB na placa principal com defeito. Microsoldagem.",
      "gravidade": "Médio"
    },
    {
      "titulo": "TV faz estalo e não liga",
      "desc": "Relé da fonte não segura. Capacitores ou MOSFET da fonte queimados. Reparo de componente.",
      "gravidade": "Simples a Médio"
    }
  ],
  "causas": [
    {
      "titulo": "Capacitores eletrolíticos inchados/secos",
      "desc": "A causa #1 de falha em TVs com 3-8 anos. Capacitores da placa fonte perdem capacitância com o tempo. Custam R$ 1-5 cada mas muitas assistências trocam a placa inteira por R$ 400-700.",
      "tipo": "desgaste"
    },
    {
      "titulo": "MOSFET queimado na fonte",
      "desc": "Transistores de potência que regulam a tensão AC/DC. Queimam por surtos elétricos ou desgaste. Componente: R$ 3-15. Reparo: R$ 150-300.",
      "tipo": "hardware"
    },
    {
      "titulo": "LEDs do backlight queimados",
      "desc": "TVs LED usam barras de LEDs como retroiluminação. Quando 1 LED queima, a barra inteira para (em série). Barra: R$ 30-80. Mão de obra de desmontagem do painel: R$ 150-400.",
      "tipo": "desgaste"
    },
    {
      "titulo": "eMMC corrompida na placa principal",
      "desc": "A memória flash da Smart TV fica cheia ou com setores defeituosos. TV trava, reinicia ou não carrega o sistema. Regravação ou troca da eMMC.",
      "tipo": "hardware"
    },
    {
      "titulo": "Surto elétrico (raio/oscilação)",
      "desc": "Queima MOSFETs, diodos e ICs da fonte e placa principal de uma vez. Dano pode ser extenso.",
      "tipo": "erro-humano"
    },
    {
      "titulo": "Solda fria em conectores",
      "desc": "Conectores entre placas com mau contato por vibração térmica. Ressoldagem resolve.",
      "tipo": "desgaste"
    }
  ],
  "cenarios": [
    {
      "nivel": "Simples",
      "desc": "Capacitores inchados, fusível, solda fria. Componentes de centavos a poucos reais.",
      "tempo": "2 a 5 dias",
      "custo": "R$ 150 a R$ 300"
    },
    {
      "nivel": "Médio",
      "desc": "MOSFET, LED driver, barras de LED, eMMC. Desmontagem do painel quando necessário.",
      "tempo": "5 a 10 dias",
      "custo": "R$ 300 a R$ 700"
    },
    {
      "nivel": "Complexo",
      "desc": "Chip processador da placa principal, dano extenso por surto. Múltiplos componentes.",
      "tempo": "10 a 20 dias",
      "custo": "R$ 500 a R$ 1.200"
    }
  ],
  "riscos": [
    "Desmontagem do painel para troca de LEDs é delicada — risco de quebrar a tela",
    "Placas de TVs antigas (8+ anos) podem ter múltiplos componentes degradados",
    "Componentes SMD de TVs baratas (Philco, Semp) são difíceis de encontrar",
    "Surto elétrico pode ter danificado todas as placas simultaneamente",
    "eMMC de reposição pode exigir gravação de firmware específico por modelo/região"
  ],
  "diagnostico": "**Diagnóstico de placas de TV — protocolo:**\n\n**1. Teste da fonte com multímetro:**\nMedir tensões de saída (5V standby, 12V, 24V, VLED). Valores fora da faixa indicam componente na fonte.\n\n**2. Inspeção visual:**\nCapacitores inchados (topo abaulado) são visíveis a olho nu. É a causa mais fácil de identificar e mais barata de resolver.\n\n**3. Teste de backlight:**\nLanterna no painel com TV ligada — se a imagem aparece fraca, backlight falhou.\n\n**4. Teste de T-CON:**\nSubstituição por T-CON compatível para isolar o problema.\n\n**5. Teste da placa principal:**\nVerificar se HDMI, USB, rede e sistema operacional (WebOS/Tizen) respondem.\n\n**Custo: R$ 80-120, abatido do serviço.**",
  "solucao": "**Reparo a nível de componente — a diferença está aqui:**\n\n**Placa Fonte (40% dos casos de TV):**\n- Troca de capacitores eletrolíticos: R$ 1-5/cada, solda convencional\n- Troca de MOSFET: R$ 3-15, solda com ar quente\n- Troca de diodo/retificador: R$ 2-10\n- Troca de transformador (raro): R$ 30-80\n\n**Backlight / LED Driver (25%):**\n- Troca de barras de LED: R$ 30-80/barra, desmontagem total do painel\n- Reparo do LED driver IC: microsoldagem\n\n**Placa Principal (20%):**\n- Regravação de eMMC: programador + firmware\n- Troca de eMMC (8-32GB): R$ 20-50, BGA\n- Reparo de chip HDMI: microsoldagem\n\n**T-CON (15%):**\n- Troca da placa inteira: R$ 80-200\n- Reparo de componente na T-CON: R$ 100-250\n\n**ECONOMIA REAL:** Um cliente traria TV com \"fonte queimada\". Outra assistência: placa nova R$ 600. Nosso reparo: 3 capacitores (R$ 12 em peças) + mão de obra = R$ 200. Economia de R$ 400.",
  "quandoCompensa": "Quase sempre quando é fonte ou T-CON (reparo barato). Backlight compensa em TVs de 43\"+. Placa principal compensa em TVs de R$ 2.000+ com menos de 5 anos.",
  "quandoNaoCompensa": "TVs de 32\" básicas (TV nova custa R$ 900-1.200). Múltiplas placas queimadas por surto. TVs com painel danificado além da placa.",
  "whatsappMessage": "Olá! Minha TV tem problema na placa. Quero saber se tem conserto a nível de componente.",
  "relatedPages": [
    {
      "label": "Conserto de TV",
      "to": "/servicos/conserto-tv"
    },
    {
      "label": "TV Não Liga",
      "to": "/problemas/tv-nao-liga-curitiba"
    },
    {
      "label": "TV com Listras",
      "to": "/problemas/tv-listras-na-tela-curitiba"
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
      "label": "TV Cheiro Queimado",
      "to": "/tv-cheiro-queimado-curitiba"
    }
  ],
  "conteudoExtra": "## Reparo a Nível de Componente vs Troca de Placa\n\n### O Problema da Maioria das Assistências\n\nA maioria das assistências técnicas trabalha no modelo de **troca de placa**: identifica qual placa falhou e troca por uma nova ou recondicionada. É mais rápido, mas muito mais caro para o cliente.\n\n**Exemplo real — Samsung UN55TU8000:**\n- Sintoma: TV não liga\n- Causa: 2 capacitores inchados na placa fonte\n- Troca de placa fonte: R$ 450-700\n- Reparo dos capacitores: R$ 180 (peças: R$ 8)\n- **Economia: R$ 270-520**\n\n### Custos Reais de Componentes vs Placas\n\n| Componente | Preço da peça | Reparo total | Placa nova |\n|-----------|--------------|-------------|------------|\n| Capacitor eletrolítico | R$ 1-5 | R$ 150-250 | R$ 400-700 |\n| MOSFET IRF540/840 | R$ 3-15 | R$ 180-350 | R$ 400-700 |\n| LED barra (1 unid) | R$ 30-80 | R$ 250-500 | R$ 300-600 |\n| eMMC 8GB | R$ 20-40 | R$ 250-450 | R$ 500-900 |\n| T-CON (placa) | R$ 80-200 | R$ 200-350 | R$ 200-400 |\n| Chip HDMI | R$ 40-100 | R$ 300-500 | R$ 500-900 |\n\n## Marcas e Modelos — O Que Esperar\n\n### Samsung\n- Séries TU/AU/BU: capacitores da fonte são o ponto fraco\n- QLED: backlight e T-CON robustos, placa principal pode falhar\n- Neo QLED: Mini-LED driver sofisticado, reparo mais caro\n\n### LG\n- Séries UK/UM/UP: LEDs do backlight queimam com frequência\n- Smart TV WebOS: eMMC cheia após 3-4 anos de uso\n- OLED: placa de alimentação OLED é cara (R$ 600-1.200)\n\n### Philco / Semp TCL / AOC\n- Componentes de qualidade inferior = falham mais cedo\n- Peças de reposição mais difíceis de encontrar\n- Reparo a nível de componente é a melhor opção (placas inteiras escassas)\n\n### Sony / Panasonic\n- Qualidade superior = falham menos\n- Quando falham, peças originais são mais caras\n- Reparo a nível de componente compensa ainda mais"
};
