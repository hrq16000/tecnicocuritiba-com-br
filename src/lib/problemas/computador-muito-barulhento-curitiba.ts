import type { ProblemaPageData } from "./types";

export const problema: ProblemaPageData = {
  "slug": "computador-muito-barulhento-curitiba",
  "title": "Computador Muito Barulhento em Curitiba | Ventoinhas e Ruídos Anormais",
  "metaDescription": "Computador fazendo barulho em Curitiba? Diagnóstico de cooler, HD, ventoinha e vibração. Técnico especialista com atendimento rápido e solução definitiva.",
  "h1": "Computador Muito Barulhento em Curitiba — Ventoinhas e Ruídos Anormais",
  "categoria": "Problemas de Computador",
  "intro": "O computador começou a fazer barulho excessivo — ventoinhas girando em alta rotação, sons de clique, zumbido constante ou vibração. Esse problema vai além do incômodo: ruídos anormais frequentemente indicam que algum componente está falhando ou que o sistema está superaquecendo.\n\nEm Curitiba, diagnosticamos que a maioria dos computadores barulhentos sofre de acúmulo de poeira nos coolers (que força rotações mais altas para compensar), rolamentos desgastados em ventoinhas, ou HD mecânico com falha iminente emitindo sons de clique.",
  "sintomas": [
    {
      "titulo": "Ventoinhas em alta rotação constante",
      "desc": "Coolers giram no máximo o tempo todo, mesmo em idle. Indica superaquecimento ou curva de fan agressiva na BIOS.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Sons de clique rítmico do HD",
      "desc": "Cliques vindos do disco rígido indicam cabeças de leitura com dificuldade — sinal de falha iminente.",
      "gravidade": "Complexo"
    },
    {
      "titulo": "Zumbido ou vibração do gabinete",
      "desc": "Ressonância causada por parafusos soltos, painéis desencaixados ou HD sem borrachas anti-vibração.",
      "gravidade": "Simples"
    },
    {
      "titulo": "Barulho aumenta com programas ou jogos",
      "desc": "Ruído cresce proporcionalmente à carga do sistema, indicando que o resfriamento está no limite.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Ventoinha com raspagem ou ranger",
      "desc": "Rolamento desgastado produz ruído metálico de raspagem. A ventoinha pode parar a qualquer momento.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Notebook parece um 'secador de cabelo'",
      "desc": "Ventilação extrema ao ligar indica pasta térmica seca ou sistema de refrigeração obstruído por poeira.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Coil whine da placa de vídeo ou fonte",
      "desc": "Zumbido agudo de alta frequência vindo de indutores sob carga. Comum em GPUs e fontes de baixa qualidade.",
      "gravidade": "Simples a médio"
    }
  ],
  "causas": [
    {
      "titulo": "Acúmulo de poeira nos coolers",
      "desc": "Poeira obstrui as aletas do dissipador, reduzindo a eficiência térmica e forçando rotações mais altas.",
      "tipo": "desgaste"
    },
    {
      "titulo": "Rolamento desgastado nas ventoinhas",
      "desc": "Ventoinhas com rolamento gasto produzem ruído de raspagem, vibração e podem parar de funcionar.",
      "tipo": "desgaste"
    },
    {
      "titulo": "HD mecânico com falha iminente",
      "desc": "Sons de clique indicam que as cabeças de leitura estão com dificuldade para acessar dados — falha próxima.",
      "tipo": "hardware"
    },
    {
      "titulo": "Pasta térmica seca",
      "desc": "Sem transferência térmica eficiente entre processador e dissipador, o cooler precisa girar mais rápido para compensar.",
      "tipo": "desgaste"
    },
    {
      "titulo": "Curva de ventoinha agressiva na BIOS",
      "desc": "BIOS configurada para manter ventoinhas em alta rotação mesmo com temperaturas normais.",
      "tipo": "software"
    },
    {
      "titulo": "Vibração estrutural do gabinete",
      "desc": "Parafusos soltos, painéis desencaixados ou HD montado sem borrachas anti-vibração causam ressonância.",
      "tipo": "hardware"
    },
    {
      "titulo": "Coil whine em componentes eletrônicos",
      "desc": "Vibração de indutores em placas de vídeo ou fontes sob carga pesada. Característica do componente.",
      "tipo": "hardware"
    }
  ],
  "cenarios": [
    {
      "nivel": "Simples",
      "desc": "Parafusos soltos, curva de fan na BIOS ou vibração de gabinete. Ajuste rápido na visita.",
      "tempo": "15 min a 30 min",
      "custo": "Dentro da visita técnica"
    },
    {
      "nivel": "Médio",
      "desc": "Limpeza de coolers, troca de pasta térmica e substituição de ventoinha com rolamento desgastado.",
      "tempo": "1h a 2h",
      "custo": "R$ 100 a R$ 200 + peça"
    },
    {
      "nivel": "Complexo",
      "desc": "HD com cliques (falha iminente) — backup emergencial e substituição por SSD.",
      "tempo": "2h a 1 dia",
      "custo": "R$ 200 a R$ 450 + SSD"
    }
  ],
  "riscos": [
    "Ignorar cliques do HD pode resultar em perda total de dados sem aviso",
    "Rodar com ventoinhas ineficientes causa superaquecimento e danos permanentes",
    "Lubrificar ventoinhas com produtos inadequados pode causar curto-circuito",
    "Usar o computador sem cooler funcional pode queimar o processador"
  ],
  "diagnostico": "O diagnóstico inicia identificando a fonte exata do ruído. Abrimos o gabinete e, com o sistema ligado, paramos individualmente cada ventoinha (com segurança) para isolar qual está gerando o barulho.\n\nPara HDs, usamos ferramentas SMART (CrystalDiskInfo) para verificar contadores de erro e saúde do disco. Verificamos temperaturas do processador e GPU para confirmar se o ruído é compensação por superaquecimento. Inspecionamos parafusos, painéis e borrachas anti-vibração do gabinete.",
  "solucao": "Para acúmulo de poeira, fazemos limpeza completa com ar comprimido e aspirador antiestático, incluindo troca de pasta térmica. Para ventoinhas com rolamento desgastado, substituímos por modelos de qualidade com rolamento de esferas ou hidráulico.\n\nPara HD com cliques, fazemos backup emergencial dos dados e substituímos por SSD — que é silencioso e muito mais rápido. Para coil whine, ajustamos configurações de energia ou limitamos FPS em jogos. Para vibrações do gabinete, reposicionamos componentes e adicionamos borrachas anti-vibração.",
  "quandoCompensa": "Quando a solução é limpeza, troca de pasta térmica ou substituição de ventoinha — custos baixos e resultado imediato.",
  "quandoNaoCompensa": "Quando o coil whine é inerente ao modelo da placa de vídeo (característica do componente) ou quando o gabinete inteiro está comprometido estruturalmente.",
  "whatsappMessage": "Olá! Meu computador está fazendo muito barulho. Preciso de diagnóstico em Curitiba.",
  "relatedPages": [
    {
      "label": "Superaquecimento",
      "to": "/computador-superaquecendo-curitiba"
    },
    {
      "label": "PC Lento",
      "to": "/problemas/computador-lento-curitiba"
    },
    {
      "label": "HD com Barulho",
      "to": "/problemas/hd-fazendo-barulho-curitiba"
    },
    {
      "label": "Upgrade SSD",
      "to": "/servicos/upgrade-ssd-memoria"
    }
  ],
  "conteudoExtra": "## Identificando o Tipo de Ruído\n\n- **Ventilação alta constante**: Provavelmente poeira ou pasta térmica seca → limpeza resolve\n- **Cliques rítmicos**: HD mecânico com falha → **faça backup imediatamente**\n- **Raspagem/ranger**: Ventoinha com rolamento gasto → substituição do cooler\n- **Vibração/ressonância**: Parafusos soltos ou HD sem borrachas → reposicionamento\n- **Zumbido agudo sob carga**: Coil whine → ajuste de software ou troca de componente\n\n## Manutenção Preventiva — Evite Ruídos\n\nA limpeza interna a cada 6-12 meses previne a maioria dos problemas de ruído. Em ambientes com pets ou muita poeira, recomendamos limpeza a cada 6 meses. A troca de pasta térmica a cada 2-3 anos mantém as temperaturas baixas e os coolers silenciosos.\n\n## SSD — A Solução Silenciosa\n\nSe seu computador ainda usa HD mecânico, a troca por SSD elimina completamente o ruído do disco, além de acelerar o sistema em até 10x. É o upgrade com melhor custo-benefício disponível."
};
