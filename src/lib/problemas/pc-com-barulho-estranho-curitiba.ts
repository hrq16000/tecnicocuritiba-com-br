import type { ProblemaPageData } from "./types";

export const problema: ProblemaPageData = {
  "slug": "pc-com-barulho-estranho-curitiba",
  "title": "PC com Barulho Estranho em Curitiba | Diagnóstico",
  "metaDescription": "Computador fazendo barulho estranho? Cliques, zumbidos ou ventoinhas altas? Veja o que pode ser e quando procurar técnico em Curitiba.",
  "h1": "PC com Barulho Estranho em Curitiba — O Que Significa?",
  "categoria": "Problemas de Computador",
  "intro": "Barulhos novos vindos do computador são sinais de alerta que não devem ser ignorados. Cada tipo de barulho indica um componente diferente e um nível de urgência diferente. Cliques vindos do HD, por exemplo, são emergência — significam que o disco está falhando e seus dados estão em risco.\n\nNesta página, explicamos os tipos de barulho, o que cada um significa e quando é hora de agir.",
  "sintomas": [
    {
      "titulo": "Cliques repetitivos",
      "desc": "Som de 'tec-tec-tec' vindo do gabinete. HD com cabeça de leitura batendo — sinal de falha iminente.",
      "gravidade": "Complexo - URGENTE"
    },
    {
      "titulo": "Zumbido ou vibração",
      "desc": "Vibração constante. Ventoinha desbalanceada, parafuso solto ou HD vibrando.",
      "gravidade": "Simples"
    },
    {
      "titulo": "Ventoinha muito alta",
      "desc": "Barulho de 'avião decolando'. Ventoinhas em velocidade máxima por superaquecimento.",
      "gravidade": "Simples a médio"
    },
    {
      "titulo": "Apito ou chiado eletrônico",
      "desc": "Som agudo vindo da placa-mãe ou fonte. Coil whine ou capacitor com problema.",
      "gravidade": "Simples a médio"
    }
  ],
  "causas": [
    {
      "titulo": "HD com falha mecânica",
      "desc": "Cliques indicam que a cabeça de leitura não consegue posicionar. Dados em risco. Backup urgente!",
      "tipo": "hardware"
    },
    {
      "titulo": "Ventoinha com rolamento desgastado",
      "desc": "Rolamento do cooler desgastado causa zumbido ou vibração. Troca simples.",
      "tipo": "desgaste"
    },
    {
      "titulo": "Poeira acumulada nas ventoinhas",
      "desc": "Poeira desbalanceia as pás e causa vibração e barulho.",
      "tipo": "desgaste"
    },
    {
      "titulo": "Coil whine",
      "desc": "Vibração de bobinas em placas de vídeo ou fontes sob carga. Normal em alguns modelos mas pode indicar componente estressado.",
      "tipo": "hardware"
    }
  ],
  "cenarios": [
    {
      "nivel": "Simples",
      "desc": "Limpeza de ventoinhas, fixação de parafusos, troca de cooler.",
      "tempo": "30 min a 1h",
      "custo": "R$ 99,99 a R$ 200"
    },
    {
      "nivel": "Médio",
      "desc": "Troca de HD com migração de dados para SSD.",
      "tempo": "2h a 4h",
      "custo": "R$ 250 a R$ 500"
    },
    {
      "nivel": "Complexo",
      "desc": "Recuperação de dados de HD com cliques + substituição.",
      "tempo": "3 a 10 dias",
      "custo": "R$ 400 a R$ 1500+ (recuperação)"
    }
  ],
  "riscos": [
    "Ignorar cliques de HD pode resultar em perda total de dados",
    "Ventoinha travada causa superaquecimento progressivo",
    "Vibração constante pode soltar componentes internos"
  ],
  "diagnostico": "Identificação do componente responsável pelo barulho, teste de saúde do HD (SMART), inspeção de ventoinhas e análise de fonte. Custo: R$ 99,99.",
  "solucao": "Depende da origem: ventoinhas → limpeza ou troca. HD → backup urgente + migração para SSD. Fonte → substituição.",
  "quandoCompensa": "Sempre compensa investigar barulhos — o custo da prevenção é muito menor que o da recuperação de dados.",
  "quandoNaoCompensa": "Recuperação de dados de HD com dano severo pode não justificar o custo dependendo da importância dos dados.",
  "whatsappMessage": "Olá! Meu computador está fazendo barulho estranho. Podem me ajudar?",
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
      "label": "Superaquecendo",
      "to": "/problemas/pc-superaquecendo-curitiba"
    },
    {
      "label": "HD Não Reconhece",
      "to": "/problemas/pc-nao-reconhece-hd-curitiba"
    },
    {
      "label": "Backup e Recuperação",
      "to": "/servicos/backup-recuperacao"
    }
  ],
  "conteudoExtra": "### URGENTE: Se o HD Está Clicando\n\nSe você ouve cliques vindos do computador, pare de usar imediatamente e faça backup do que puder. Cada minuto de uso com HD clicando reduz as chances de recuperação dos dados. Não desligue e ligue repetidamente — isso piora."
};
