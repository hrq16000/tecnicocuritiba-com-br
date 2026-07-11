import type { ProblemaPageData } from "./types";

export const problema: ProblemaPageData = {
  "slug": "fonte-queimada-curitiba",
  "title": "Fonte Queimada em Curitiba | Diagnóstico e Troca de Fonte",
  "metaDescription": "Fonte do computador ou notebook queimou? Técnico em Curitiba faz diagnóstico e troca de fonte com garantia. Atendimento rápido em domicílio.",
  "h1": "Fonte Queimada — Diagnóstico e Substituição em Curitiba",
  "categoria": "Hardware",
  "intro": "A fonte de alimentação é responsável por converter a energia da tomada para o padrão que os componentes internos do computador ou notebook necessitam. Quando ela queima, o equipamento simplesmente para de funcionar — sem nenhum sinal de vida.\n\nUma fonte com defeito pode causar danos graves em outros componentes como placa-mãe, processador e HD/SSD. Por isso, é fundamental usar fontes de qualidade e fazer a substituição corretamente quando necessário.\n\nEm Curitiba, oferecemos diagnóstico preciso para confirmar se o problema é realmente na fonte (e não na placa-mãe) e fazemos a substituição com fontes certificadas 80 Plus, garantindo eficiência energética e proteção para seus componentes.",
  "sintomas": [
    {
      "titulo": "Computador não liga de jeito nenhum",
      "desc": "Nenhuma luz, nenhum som, nenhuma reação ao pressionar o botão de ligar. Pode ser fonte queimada ou botão com defeito.",
      "gravidade": "Alta"
    },
    {
      "titulo": "Computador desliga sozinho sob carga",
      "desc": "Desliga durante jogos ou tarefas pesadas. A fonte não consegue fornecer energia suficiente.",
      "gravidade": "Alta"
    },
    {
      "titulo": "Cheiro de queimado vindo do gabinete",
      "desc": "Componentes internos da fonte queimaram. Desligue imediatamente da tomada para evitar danos maiores.",
      "gravidade": "Crítica"
    },
    {
      "titulo": "Computador reinicia aleatoriamente",
      "desc": "Instabilidade na alimentação elétrica causa reinicializações sem motivo aparente.",
      "gravidade": "Média"
    },
    {
      "titulo": "Ventilador da fonte parou de girar",
      "desc": "A ventoinha da fonte não funciona, causando superaquecimento interno que pode levar à queima.",
      "gravidade": "Média"
    },
    {
      "titulo": "Notebook não carrega a bateria",
      "desc": "O carregador/fonte do notebook pode estar com defeito, impedindo o carregamento mesmo conectado na tomada.",
      "gravidade": "Média"
    }
  ],
  "causas": [
    {
      "titulo": "Surto ou oscilação na rede elétrica",
      "desc": "Picos de tensão, quedas de energia e raios podem queimar a fonte instantaneamente. Uso de estabilizador/nobreak previne.",
      "tipo": "hardware"
    },
    {
      "titulo": "Fonte subdimensionada para os componentes",
      "desc": "Fonte de baixa potência (300W) alimentando placa de vídeo que exige 500W+ causa sobrecarga e queima.",
      "tipo": "erro-humano"
    },
    {
      "titulo": "Desgaste natural dos capacitores",
      "desc": "Capacitores internos da fonte perdem capacidade ao longo dos anos, especialmente em fontes genéricas de baixa qualidade.",
      "tipo": "desgaste"
    },
    {
      "titulo": "Acúmulo de poeira interna",
      "desc": "Poeira bloqueia a ventilação da fonte, causando superaquecimento dos componentes internos.",
      "tipo": "desgaste"
    },
    {
      "titulo": "Tomada sem aterramento",
      "desc": "Instalação elétrica sem aterramento adequado aumenta o risco de danos por surtos e descargas.",
      "tipo": "erro-humano"
    }
  ],
  "cenarios": [
    {
      "nivel": "Simples",
      "desc": "Troca de fonte de desktop por modelo certificado 80 Plus. Apenas a fonte com defeito, sem danos em outros componentes.",
      "tempo": "1-2 horas",
      "custo": "R$200–R$400"
    },
    {
      "nivel": "Médio",
      "desc": "Troca de fonte + diagnóstico de componentes que podem ter sido afetados (placa-mãe, HD).",
      "tempo": "2-4 horas",
      "custo": "R$300–R$600"
    },
    {
      "nivel": "Complexo",
      "desc": "Fonte queimou e danificou placa-mãe ou outros componentes. Requer substituição múltipla.",
      "tempo": "3-7 dias",
      "custo": "R$500–R$1.500"
    }
  ],
  "riscos": [
    "Fonte genérica pode queimar e levar junto placa-mãe, processador e memórias",
    "Fonte subdimensionada causa instabilidade e corrupção de dados",
    "Risco de curto-circuito e incêndio com fontes de procedência duvidosa",
    "Perda total do equipamento se a queima se propagar para outros componentes",
    "Danos à rede elétrica do ambiente em casos extremos"
  ],
  "diagnostico": "O diagnóstico de fonte é feito com multímetro digital, verificando as tensões de saída em cada trilha (3.3V, 5V, 12V) e comparando com os valores de referência ATX.\n\nUtilizamos testador de fonte ATX para simular carga e verificar estabilidade. Também inspecionamos visualmente os capacitores internos (capacitores estufados ou com vazamento indicam defeito). O teste inclui verificação da placa-mãe para garantir que não houve dano colateral.",
  "solucao": "A solução profissional para fonte queimada inclui:\n\n1. Diagnóstico com multímetro e testador de fonte ATX\n2. Verificação de danos em outros componentes\n3. Dimensionamento correto da nova fonte (potência adequada para os componentes)\n4. Instalação de fonte certificada 80 Plus (Bronze, Silver ou Gold)\n5. Teste de estabilidade sob carga\n6. Orientação sobre proteção elétrica (nobreak, estabilizador, DPS)\n\nSempre recomendamos fontes de marcas reconhecidas (Corsair, EVGA, Cooler Master, DeepCool) para evitar reincidência.",
  "quandoCompensa": "Trocar a fonte sempre compensa quando os demais componentes estão funcionando. Uma fonte de qualidade custa R$200-R$500 e protege um investimento de R$2.000-R$10.000 em componentes.",
  "quandoNaoCompensa": "Quando a fonte queimada danificou placa-mãe e processador de um computador antigo, o custo total de reparo pode ultrapassar o valor de um equipamento novo e mais moderno.",
  "whatsappMessage": "Olá! A fonte do meu computador queimou e ele não liga mais. Podem me ajudar?",
  "relatedPages": [
    {
      "to": "/problemas/computador-nao-liga-curitiba",
      "label": "Computador Não Liga"
    },
    {
      "to": "/problemas/placa-mae-com-defeito-curitiba",
      "label": "Placa-Mãe com Defeito"
    },
    {
      "to": "/servicos/conserto-pc-notebook",
      "label": "Conserto PC/Notebook"
    },
    {
      "to": "/servicos/montagem-pc",
      "label": "Montagem de PC"
    },
    {
      "to": "/problemas/computador-com-som-estranho-curitiba",
      "label": "Som Estranho no PC"
    },
    {
      "to": "/como-funciona",
      "label": "Como Funciona"
    }
  ],
  "conteudoExtra": "## Como Escolher a Fonte Certa Para Seu Computador\n\nA fonte de alimentação é o componente mais negligenciado na montagem de PCs, mas é o mais importante para a segurança de todo o sistema.\n\n### Certificação 80 Plus: O Que Significa\n\nA certificação 80 Plus garante que a fonte converte pelo menos 80% da energia da tomada em energia útil para o computador:\n\n- **80 Plus White** — 80% de eficiência (entrada de linha)\n- **80 Plus Bronze** — 82-85% (melhor custo-benefício)\n- **80 Plus Gold** — 87-90% (ideal para uso intenso)\n- **80 Plus Platinum/Titanium** — 90-94% (profissional/servidor)\n\n### Dimensionamento: Quanto de Potência Você Precisa\n\n- **PC básico (sem placa de vídeo)** — 300-400W\n- **PC intermediário (GTX 1650/RX 6500)** — 450-500W\n- **PC gamer (RTX 3060/RX 6700)** — 550-650W\n- **PC gamer high-end (RTX 4070+)** — 750-850W\n- **Workstation profissional** — 850W+\n\n### Fontes Genéricas vs. Certificadas\n\nFontes genéricas (sem certificação) custam R$50-R$100 mas representam risco real:\n- Não têm proteção contra surto, curto-circuito ou sobrecarga\n- Componentes internos de baixa qualidade falham prematuramente\n- Podem fornecer tensões instáveis que danificam componentes\n- Em casos extremos, podem causar incêndio\n\nUma fonte certificada de R$250-R$400 protege um investimento de milhares de reais em componentes. É economia inteligente.\n\n### Proteção Adicional: Nobreak e DPS\n\nAlém de uma boa fonte, recomendamos:\n- **Nobreak (UPS)** — Mantém o PC ligado durante quedas de energia, evitando corrupção de dados\n- **DPS (Dispositivo de Proteção contra Surtos)** — Protege contra raios e picos de tensão na rede elétrica"
};
