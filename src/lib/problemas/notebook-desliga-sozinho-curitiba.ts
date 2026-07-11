import type { ProblemaPageData } from "./types";

export const problema: ProblemaPageData = {
  "slug": "notebook-desliga-sozinho-curitiba",
  "title": "Notebook Desliga Sozinho em Curitiba — Causas e Solução Técnica",
  "metaDescription": "Notebook desliga sozinho? Técnico em Curitiba diagnostica superaquecimento, bateria defeituosa, falha de placa e instabilidade elétrica. Atendimento profissional.",
  "h1": "Notebook Desliga Sozinho — Diagnóstico e Reparo em Curitiba",
  "categoria": "Hardware",
  "intro": "O notebook desliga sem aviso, no meio de um trabalho ou reunião. Pode acontecer após minutos de uso ou sob carga pesada como jogos e edição de vídeo. Esse sintoma indica problemas que vão de superaquecimento a falhas críticas de hardware.\n\nIgnorar desligamentos repentinos acelera o desgaste de componentes e pode causar perda de dados. Cada desligamento abrupto é um risco para o HD/SSD e para a integridade do sistema operacional.\n\nNosso técnico em Curitiba realiza diagnóstico térmico, elétrico e de software para identificar e resolver a causa raiz do problema.",
  "sintomas": [
    {
      "titulo": "Desliga após poucos minutos de uso",
      "desc": "Superaquecimento rápido por pasta térmica ressecada, cooler travado ou dissipador obstruído por poeira.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Desliga sob carga pesada (jogos, vídeo)",
      "desc": "Processador ou GPU atinge temperatura crítica e o sistema desliga como proteção. Indica refrigeração insuficiente.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Desliga e não liga mais por alguns minutos",
      "desc": "Proteção térmica ativada. O notebook precisa esfriar antes de ligar novamente. Sinal claro de superaquecimento severo.",
      "gravidade": "Complexo"
    },
    {
      "titulo": "Desliga mesmo frio, logo ao ligar",
      "desc": "Pode indicar falha na placa-mãe, curto-circuito, capacitor estufado ou problema na regulação de tensão.",
      "gravidade": "Complexo"
    },
    {
      "titulo": "Desliga ao desconectar o carregador",
      "desc": "Bateria defeituosa que não sustenta carga. Pode estar inchada, com células mortas ou circuito de carga danificado.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Tela azul antes de desligar",
      "desc": "BSOD seguido de desligamento indica driver corrompido, RAM defeituosa ou falha de disco.",
      "gravidade": "Médio"
    }
  ],
  "causas": [
    {
      "titulo": "Superaquecimento por pasta térmica ressecada",
      "desc": "A pasta térmica perde eficiência após 2-3 anos, fazendo o processador atingir temperaturas críticas rapidamente.",
      "tipo": "desgaste"
    },
    {
      "titulo": "Cooler obstruído ou travado",
      "desc": "Acúmulo de poeira bloqueia o fluxo de ar. Cooler com rolamento desgastado não gira na velocidade necessária.",
      "tipo": "desgaste"
    },
    {
      "titulo": "Bateria defeituosa ou inchada",
      "desc": "Baterias de lítio degradam com o tempo. Células mortas causam desligamento ao sair da tomada. Inchaço é risco de segurança.",
      "tipo": "desgaste"
    },
    {
      "titulo": "Falha no circuito de alimentação",
      "desc": "Capacitores estufados, MOSFETs queimados ou trilhas danificadas na placa-mãe causam instabilidade elétrica.",
      "tipo": "hardware"
    },
    {
      "titulo": "Memória RAM defeituosa",
      "desc": "Erros em módulos de RAM causam travamentos e desligamentos, especialmente sob carga que exige mais memória.",
      "tipo": "hardware"
    },
    {
      "titulo": "Driver ou atualização problemática",
      "desc": "Drivers de vídeo ou chipset com bugs causam BSOD e desligamento. Comum após atualizações do Windows.",
      "tipo": "software"
    }
  ],
  "cenarios": [
    {
      "nivel": "Simples",
      "desc": "Limpeza interna, troca de pasta térmica e atualização de drivers. Notebook volta a operar em temperaturas normais.",
      "tempo": "1-2 horas",
      "custo": "R$120–R$180"
    },
    {
      "nivel": "Médio",
      "desc": "Troca de cooler, substituição de bateria ou reparo de conector de carga. Componentes substituídos por compatíveis.",
      "tempo": "2-4 horas",
      "custo": "R$180–R$350"
    },
    {
      "nivel": "Complexo",
      "desc": "Reparo de placa-mãe (solda BGA, troca de capacitor/MOSFET), troca de módulo de RAM ou recuperação de dados.",
      "tempo": "3-7 dias",
      "custo": "R$350–R$800"
    }
  ],
  "riscos": [
    "Perda de dados por desligamento abrupto corrompendo arquivos e sistema",
    "Bateria inchada pode estourar e danificar o notebook permanentemente",
    "Superaquecimento prolongado reduz a vida útil do processador e GPU",
    "Desligamentos repetidos danificam setores do HD convencional"
  ],
  "diagnostico": "O diagnóstico começa com monitoramento térmico em tempo real usando sensores do processador e GPU. Abrimos o notebook para inspeção visual de pasta térmica, cooler e bateria.\n\nRealizamos stress test controlado para reproduzir o desligamento e identificar o ponto de falha. Testamos memória RAM com ferramentas específicas e verificamos tensões da placa-mãe.\n\nO diagnóstico custa a partir de R$50, valor abatido do serviço aprovado.",
  "solucao": "Para superaquecimento: limpeza completa, troca de pasta térmica de qualidade e verificação do cooler. Para bateria: substituição por modelo compatível com garantia.\n\nEm falhas de placa-mãe, realizamos microssolda de componentes (capacitores, MOSFETs) quando viável. Sempre orientamos sobre custo-benefício antes de aprovar reparos complexos.\n\nProblemas de software são resolvidos com atualização de drivers, reparo do Windows ou reinstalação limpa quando necessário.",
  "quandoCompensa": "Notebooks de até 4 anos com superaquecimento ou bateria ruim sempre compensam. Reparos de placa compensam em modelos de alto valor (acima de R$3.000 novo).",
  "quandoNaoCompensa": "Notebooks muito antigos (6+ anos) com falha grave de placa-mãe. Quando o custo do reparo ultrapassa 50% de um equivalente novo.",
  "whatsappMessage": "Olá! Meu notebook está desligando sozinho. Preciso de diagnóstico técnico.",
  "relatedPages": [
    {
      "to": "/problemas/notebook-superaquecendo-curitiba",
      "label": "Notebook Superaquecendo"
    },
    {
      "to": "/problemas/notebook-nao-liga-curitiba",
      "label": "Notebook Não Liga"
    },
    {
      "to": "/problemas/notebook-tela-preta-curitiba",
      "label": "Notebook Tela Preta"
    },
    {
      "to": "/problemas/computador-travando-curitiba",
      "label": "Computador Travando"
    },
    {
      "to": "/servicos",
      "label": "Todos os Serviços"
    }
  ],
  "conteudoExtra": "## Como Prevenir Desligamentos\n\nMantenha as saídas de ar desobstruídas. Use o notebook em superfícies rígidas, nunca em cama ou almofada. Troque a pasta térmica a cada 2 anos.\n\n## Sinais de Bateria Inchada\n\nSe o touchpad está alto, a base não fecha direito ou há deformação na carcaça, desligue imediatamente e procure um técnico. Bateria inchada é risco de incêndio."
};
