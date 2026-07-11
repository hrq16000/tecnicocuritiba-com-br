import type { ProblemaPageData } from "./types";

export const problema: ProblemaPageData = {
  "slug": "reparo-placa-mae-notebook-curitiba",
  "title": "Reparo de Placa-Mãe de Notebook em Curitiba | Microsoldagem BGA",
  "metaDescription": "Reparo de placa-mãe de notebook com microsoldagem BGA em Curitiba. Entenda por que o serviço custa caro: equipamentos de R$ 5.000 a R$ 50.000+.",
  "h1": "Reparo de Placa-Mãe de Notebook — Por Que Custa Caro e Quando Vale a Pena",
  "categoria": "Reparo de Placa-Mãe",
  "intro": "O reparo de placa-mãe de notebook é um dos serviços mais complexos da eletrônica de consumo. Não é um reparo que qualquer técnico faz — exige **equipamentos que custam de R$ 5.000 a R$ 50.000+**, treinamento especializado e anos de experiência.\n\n**Dados reais de equipamentos:**\n- Estação de retrabalho BGA (Achi IR6000): R$ 2.800 a R$ 5.000\n- Estação BGA profissional (Pro-660/Pro-880): R$ 15.000 a R$ 35.000\n- Microscópio trinocular (7x-50x): R$ 1.500 a R$ 4.000\n- Multímetro de bancada profissional: R$ 800 a R$ 3.000\n- Estação de solda com controle digital: R$ 500 a R$ 2.000\n- Osciloscópio digital: R$ 2.000 a R$ 8.000\n- Fonte de alimentação regulável: R$ 300 a R$ 1.500\n- Ultrassônica para limpeza de placas: R$ 400 a R$ 1.500\n\n**Investimento total de uma bancada profissional: R$ 20.000 a R$ 60.000+**\n\nPor isso, o reparo de placa-mãe custa entre R$ 300 e R$ 1.500 — o técnico precisa amortizar dezenas de milhares de reais em equipamento, além de cobrar pela expertise que levou anos para adquirir.",
  "sintomas": [
    {
      "titulo": "Notebook não liga (sem reação)",
      "desc": "Sem LEDs, sem ventilador. Pode ser MOSFET queimado na seção de energia, chip regulador de tensão ou curto-circuito na placa. Diagnóstico com multímetro e injeção de corrente.",
      "gravidade": "Complexo"
    },
    {
      "titulo": "Liga mas não dá vídeo",
      "desc": "Ventilador gira mas tela preta. Clássico problema de GPU (chip gráfico BGA) com solda fria ou defeito. Afeta muito notebooks com GPU dedicada NVIDIA/AMD.",
      "gravidade": "Complexo"
    },
    {
      "titulo": "Reinicia sozinho / desliga",
      "desc": "Superaquecimento de VRM (reguladores de tensão) ou GPU. Pode ser pasta térmica seca, MOSFET em curto ou problema no BIOS.",
      "gravidade": "Médio a Complexo"
    },
    {
      "titulo": "Não carrega bateria",
      "desc": "Chip controlador de carga (ISL6251, BQ24780) com defeito. Comum após uso de carregador genérico ou surto elétrico.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Curto-circuito (consome muita corrente)",
      "desc": "Ao conectar na fonte, a corrente dispara. Indica capacitor em curto, MOSFET queimado ou trilha comprometida. Diagnóstico com câmera térmica.",
      "gravidade": "Complexo"
    },
    {
      "titulo": "Notebook com líquido (água/café/refrigerante)",
      "desc": "Oxidação progressiva destrói trilhas e componentes. Cada hora conta — quanto antes levar, maior a chance de salvar.",
      "gravidade": "Complexo"
    }
  ],
  "causas": [
    {
      "titulo": "GPU com solda BGA fria (defeito mais comum)",
      "desc": "Os chips gráficos NVIDIA e AMD são soldados com centenas de micro-esferas de solda (BGA — Ball Grid Array). Com ciclos térmicos (aquecer/resfriar), as esferas trincam e perdem contato. Notebooks gamers e workstations são os mais afetados.",
      "tipo": "desgaste"
    },
    {
      "titulo": "MOSFET queimado na seção de energia",
      "desc": "MOSFETs são transistores que regulam a tensão. Surtos, curtos e carregadores genéricos podem queimá-los. Componentes SMD minúsculos (3-5mm) que exigem microsoldagem.",
      "tipo": "hardware"
    },
    {
      "titulo": "Chip controlador de carga defeituoso",
      "desc": "ICs como ISL6251, BQ24780, RT8223 controlam carga da bateria, tensões do processador e gerenciamento de energia. Falha causa sintomas variados.",
      "tipo": "hardware"
    },
    {
      "titulo": "Oxidação por líquido",
      "desc": "Água, café, refrigerante corroem trilhas de cobre e pads dos componentes. A oxidação é progressiva — começa no ponto de contato e se espalha em horas/dias.",
      "tipo": "erro-humano"
    },
    {
      "titulo": "BIOS/firmware corrompido",
      "desc": "Chip BIOS (SPI Flash) com firmware corrompido. Pode ser regravado com programador CH341 (R$ 30-50) se o chip estiver funcional.",
      "tipo": "software"
    },
    {
      "titulo": "Trilha rompida por estresse mecânico",
      "desc": "Flexão do notebook ao transportar ou quedas podem romper trilhas internas da PCB (Printed Circuit Board). Diagnóstico com multímetro e reparo com jumper.",
      "tipo": "erro-humano"
    }
  ],
  "cenarios": [
    {
      "nivel": "Simples",
      "desc": "BIOS corrompido (regravação), conector de carga solto, MOSFET isolado. Componentes baratos, mão de obra moderada.",
      "tempo": "1 a 3 dias",
      "custo": "R$ 200 a R$ 450"
    },
    {
      "nivel": "Médio",
      "desc": "Chip controlador de carga, regulador de tensão, capacitor em curto. Microsoldagem com componentes específicos.",
      "tempo": "3 a 7 dias",
      "custo": "R$ 400 a R$ 800"
    },
    {
      "nivel": "Complexo",
      "desc": "Reballing de GPU/CPU (BGA), recuperação de placa com oxidação extensa, troca de chip gráfico.",
      "tempo": "7 a 15 dias",
      "custo": "R$ 600 a R$ 1.500"
    }
  ],
  "riscos": [
    "Reballing de GPU tem taxa de sucesso de 70-85% — não é garantido",
    "Placas com oxidação extensa podem ter danos irreversíveis em trilhas internas",
    "Componentes BGA específicos nem sempre estão disponíveis no Brasil",
    "Reparo por técnico não qualificado pode danificar pads e inviabilizar reparo futuro",
    "Notebooks muito finos (ultrabooks) têm placas com componentes soldados dos dois lados — mais difícil",
    "Custo do reparo pode se aproximar do valor de uma placa usada (R$ 800-2.000)"
  ],
  "diagnostico": "**Protocolo profissional de diagnóstico de placa-mãe:**\n\n**1. Inspeção visual com microscópio (7x-50x):**\nBusca por componentes visivelmente queimados, capacitores inchados, trilhas rompidas, oxidação.\n\n**2. Teste de curto-circuito com multímetro:**\nMedição de resistência nas linhas de alimentação (3.3V, 5V, 12V, VCORE). Valores próximos de 0Ω indicam curto.\n\n**3. Injeção de corrente controlada:**\nFonte regulável fornece tensão baixa (1-3V) com limite de corrente. Câmera térmica identifica o componente em curto pelo aquecimento.\n\n**4. Teste de BIOS/firmware:**\nLeitura do chip SPI Flash com programador CH341. Verifica integridade do firmware.\n\n**5. Teste funcional progressivo:**\nAlimentar a placa com fonte externa, monitorando tensões em cada estágio de power-on.\n\n**Custo do diagnóstico: R$ 80-150 (placas exigem mais tempo). Abatido do serviço.**",
  "solucao": "**Nível 1 — Componentes discretos (40% dos casos):**\n- Troca de MOSFET, capacitores, resistores, diodos\n- Microsoldagem com estação de ar quente e ferro de solda com ponta fina\n- Componentes custam R$ 0,50 a R$ 30 cada — o valor está na mão de obra\n\n**Nível 2 — Chips IC / controladores (35% dos casos):**\n- Troca de chips BGA de gerenciamento de energia\n- Requer estação BGA ou ar quente com perfil térmico controlado\n- Chips custam R$ 20 a R$ 150 — importados da China em 15-30 dias\n\n**Nível 3 — Reballing / troca de GPU ou CPU (25% dos casos):**\n- Processo: remoção do chip com estação BGA → limpeza dos pads → aplicação de novas esferas de solda (reballing) → recolocação com perfil térmico\n- Temperatura: 220-250°C controlada por 60-180 segundos\n- Equipamento: estação BGA infravermelha (R$ 5.000-35.000)\n- Taxa de sucesso: 70-85%\n\n**IMPORTANTE:** Todo reparo de placa-mãe é feito sob **microscópio trinocular** com aumento de 7x a 50x. Componentes têm 1-3mm — é impossível trabalhar a olho nu.",
  "quandoCompensa": "Notebooks de até 4 anos com valor acima de R$ 3.000 quando novos. Notebooks com dados importantes que não foram backup (o reparo permite recuperar dados). MacBooks e notebooks empresariais (Dell Latitude, Lenovo ThinkPad) — placas de reposição custam R$ 1.500-4.000.",
  "quandoNaoCompensa": "Notebooks com mais de 5 anos ou valor de mercado abaixo de R$ 1.500. Quando o custo do reparo (R$ 800+) se aproxima do preço de uma placa usada ou notebook usado equivalente. Notebooks de entrada (Celeron/Pentium) onde o reparo custa mais que o aparelho.",
  "whatsappMessage": "Olá! Meu notebook tem problema na placa-mãe. Quero saber se tem conserto e quanto custa.",
  "relatedPages": [
    {
      "label": "Conserto de Placa",
      "to": "/servicos/conserto-placa"
    },
    {
      "label": "Notebook Não Liga",
      "to": "/problemas/notebook-nao-liga-curitiba"
    },
    {
      "label": "Conserto Notebook",
      "to": "/servicos/conserto-pc-notebook"
    },
    {
      "label": "Reparo Placa TV",
      "to": "/problemas/reparo-placa-principal-tv-curitiba"
    },
    {
      "label": "Reparo Placa Celular",
      "to": "/problemas/reparo-placa-mae-celular-curitiba"
    },
    {
      "label": "Diagnóstico Técnico",
      "to": "/diagnostico-tecnico"
    }
  ],
  "conteudoExtra": "## Por Que o Reparo de Placa-Mãe Custa Caro?\n\n### O Investimento do Técnico\n\nUm técnico especializado em microsoldagem BGA investe:\n\n| Equipamento | Preço Médio |\n|-------------|------------|\n| Estação BGA infravermelha (Achi IR6000) | R$ 2.800 - 5.000 |\n| Estação BGA profissional (Pro-660/880) | R$ 15.000 - 35.000 |\n| Microscópio trinocular 7x-50x | R$ 1.500 - 4.000 |\n| Câmera para microscópio (37MP HDMI) | R$ 800 - 2.000 |\n| Estação de solda digital (JBC/Hakko) | R$ 1.500 - 4.000 |\n| Osciloscópio digital 4 canais | R$ 2.000 - 8.000 |\n| Fonte regulável de bancada | R$ 300 - 1.500 |\n| Multímetro de bancada (Fluke) | R$ 800 - 3.000 |\n| Câmera térmica (FLIR/Uni-T) | R$ 1.500 - 5.000 |\n| Cuba ultrassônica | R$ 400 - 1.500 |\n| Programador CH341 + adaptadores | R$ 50 - 200 |\n| **TOTAL estimado** | **R$ 20.000 - 65.000+** |\n\nAlém disso, o técnico investiu **2-5 anos de treinamento** em cursos de microsoldagem, eletrônica SMD e diagnóstico avançado.\n\n### Comparação com Outros Reparos\n\n| Serviço | Equipamento necessário | Custo do equipamento |\n|---------|----------------------|---------------------|\n| Formatação | Pendrive + software | R$ 50 |\n| Troca de HD/SSD | Chave Phillips | R$ 20 |\n| Troca de tela | Kit abertura | R$ 100 |\n| **Microsoldagem BGA** | **Bancada completa** | **R$ 20.000-65.000** |\n\nPor isso, cobrar R$ 400-1.500 por um reparo de placa-mãe é justo — o técnico precisa amortizar o investimento e cobrar pela expertise.\n\n## O Processo de Reballing BGA — Passo a Passo\n\n1. **Desmontagem completa** do notebook\n2. **Limpeza da placa** em cuba ultrassônica\n3. **Inspeção com microscópio** — identificar o chip problemático\n4. **Aplicação de flux** ao redor do chip\n5. **Remoção do chip** com estação BGA infravermelha (220-250°C por 60-120s)\n6. **Limpeza dos pads** na placa e no chip com malha dessoldadora\n7. **Reballing** — aplicação de novas esferas de solda com stencil BGA\n8. **Recolocação do chip** com estação BGA e perfil térmico controlado\n9. **Teste funcional** — ligar a placa e verificar todas as funções\n10. **Teste de estresse** — 2-4 horas de uso intenso para garantir estabilidade\n\n## Modelos Mais Afetados\n\n### GPU com Solda BGA Fria (problema clássico)\n- **NVIDIA GeForce MX150/MX250/MX350** — muito comum em notebooks intermediários\n- **AMD Radeon RX 5500M/6500M** — notebooks gamers de entrada\n- **NVIDIA RTX 3050/3060 Mobile** — notebooks gamers, alto custo de reparo\n\n### Problemas de Energia\n- **Dell Inspiron série 3000/5000** — MOSFET de carga\n- **Lenovo IdeaPad** — chip ISL controlador de carga\n- **HP Pavilion** — reguladores de tensão\n- **MacBook Pro 2016-2020** — chip T2 e controlador USB-C\n\n### Oxidação por Líquido\n- **Qualquer modelo** — taxa de recuperação: 50-70% se levado em até 24h\n- **MacBook** — placa mais densa, mais difícil, recuperação 40-60%"
};
