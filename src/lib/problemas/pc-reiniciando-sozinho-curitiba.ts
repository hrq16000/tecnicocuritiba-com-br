import type { ProblemaPageData } from "./types";

export const problema: ProblemaPageData = {
  "slug": "pc-reiniciando-sozinho-curitiba",
  "title": "PC Reiniciando Sozinho em Curitiba | Diagnóstico",
  "metaDescription": "Computador reiniciando sozinho? Descubra as causas e soluções. Diagnóstico profissional em Curitiba com atendimento a domicílio.",
  "h1": "PC Reiniciando Sozinho em Curitiba — Por Que Acontece?",
  "categoria": "Hardware",
  "intro": "Seu computador reinicia sozinho sem aviso, no meio do trabalho ou durante jogos? Esse problema pode ser causado por superaquecimento do processador, fonte de alimentação instável, memória RAM com defeito ou até mesmo infecção por malware.\n\nO reinício espontâneo é um dos problemas mais frustrantes porque pode causar perda de trabalho não salvo e, em casos graves, corrupção de dados. Em Curitiba, realizamos diagnóstico completo para identificar a causa exata.",
  "sintomas": [
    {
      "titulo": "PC reinicia sem tela azul",
      "desc": "O computador simplesmente desliga e reinicia instantaneamente, sem exibir mensagem de erro ou tela azul.",
      "gravidade": "Complexo"
    },
    {
      "titulo": "Reinício durante jogos ou uso pesado",
      "desc": "O PC só reinicia quando está sob carga pesada — jogos, renderização, ou múltiplos programas abertos.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Reinício aleatório em momentos diversos",
      "desc": "O computador reinicia em horários e situações diferentes, sem padrão aparente identificável.",
      "gravidade": "Complexo"
    },
    {
      "titulo": "Tela azul rápida seguida de reinício",
      "desc": "Uma tela azul aparece por uma fração de segundo antes do PC reiniciar, impedindo a leitura do erro.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Reinício durante inicialização do Windows",
      "desc": "O PC começa a carregar o Windows mas reinicia antes de completar o boot, entrando em loop.",
      "gravidade": "Complexo"
    },
    {
      "titulo": "PC reinicia ao conectar periférico",
      "desc": "O reinício acontece ao plugar um dispositivo USB, HD externo ou outro periférico.",
      "gravidade": "Simples"
    }
  ],
  "causas": [
    {
      "titulo": "Superaquecimento do processador",
      "desc": "Pasta térmica ressecada, cooler com rolamento desgastado ou dissipador com poeira acumulada elevam a temperatura até o ponto de proteção térmica.",
      "tipo": "desgaste"
    },
    {
      "titulo": "Fonte de alimentação instável",
      "desc": "Fonte com capacitores estufados ou potência insuficiente não consegue manter tensão estável sob carga, causando shutdown de proteção.",
      "tipo": "hardware"
    },
    {
      "titulo": "Memória RAM defeituosa",
      "desc": "Módulos de RAM com células defeituosas causam erros de leitura/escrita que resultam em reinícios ou telas azuis.",
      "tipo": "hardware"
    },
    {
      "titulo": "Driver com defeito causando BSOD",
      "desc": "Drivers incompatíveis ou corrompidos podem causar telas azuis configuradas para reinício automático.",
      "tipo": "software"
    },
    {
      "titulo": "Malware ou minerador de criptomoeda",
      "desc": "Malwares que usam 100% da CPU/GPU para mineração causam superaquecimento e reinícios por proteção térmica.",
      "tipo": "software"
    },
    {
      "titulo": "Rede elétrica instável",
      "desc": "Oscilações na rede elétrica, especialmente sem estabilizador ou no-break, causam reinícios por subtensão.",
      "tipo": "hardware"
    }
  ],
  "cenarios": [
    {
      "nivel": "Simples",
      "desc": "BSOD por driver, reinício automático habilitado, ou periférico causando curto. Resolução via software ou desconexão.",
      "tempo": "1–2h",
      "custo": "R$80–R$150"
    },
    {
      "nivel": "Médio",
      "desc": "Superaquecimento por pasta térmica/cooler, ou RAM defeituosa identificada em teste. Limpeza térmica ou troca de módulo.",
      "tempo": "2–4h",
      "custo": "R$150–R$280"
    },
    {
      "nivel": "Complexo",
      "desc": "Fonte instável necessitando substituição, ou múltiplas causas combinadas exigindo diagnóstico aprofundado.",
      "tempo": "1–3 dias",
      "custo": "R$250–R$500"
    }
  ],
  "riscos": [
    "Reinícios constantes podem corromper o sistema de arquivos e causar perda de dados",
    "Superaquecimento prolongado pode danificar permanentemente o processador ou placa-mãe",
    "Fonte instável pode causar surto de tensão que queima múltiplos componentes simultaneamente",
    "Ignorar o problema pode levar à falha total do sistema sem possibilidade de recuperação"
  ],
  "diagnostico": "O diagnóstico de reinícios espontâneos segue um protocolo rigoroso: monitoramento de temperaturas em tempo real (HWMonitor), teste de memória RAM (MemTest86 por 4+ passes), teste de fonte com multímetro digital, análise de minidumps do Windows para identificar BSODs ocultos.\n\nTambém verificamos o log de eventos do Windows para padrões de Kernel-Power (Event ID 41) e realizamos stress test controlado para reproduzir o problema em ambiente monitorado.",
  "solucao": "Para superaquecimento, realizamos limpeza completa do sistema de refrigeração, troca de pasta térmica por compostos de alta performance e, se necessário, substituição do cooler. Para fontes instáveis, recomendamos e instalamos fontes certificadas 80 Plus.\n\nEm caso de RAM defeituosa, identificamos o módulo problemático e realizamos a substituição. Para problemas de software, desabilitamos o reinício automático, analisamos os dumps de memória e corrigimos drivers ou removemos malwares.",
  "quandoCompensa": "Quando o PC é relativamente novo, o problema tem causa única identificável, ou quando os dados armazenados justificam o investimento no reparo.",
  "quandoNaoCompensa": "Quando múltiplos componentes estão falhando simultaneamente (fonte + RAM + placa-mãe), indicando desgaste generalizado do equipamento.",
  "whatsappMessage": "Olá! Meu PC está reiniciando sozinho. Gostaria de agendar um diagnóstico.",
  "relatedPages": [
    {
      "to": "/problemas/computador-nao-liga-curitiba",
      "label": "PC Não Liga"
    },
    {
      "to": "/problemas/notebook-superaquecendo-curitiba",
      "label": "Superaquecimento"
    },
    {
      "to": "/problemas/fonte-queimada-curitiba",
      "label": "Fonte Queimada"
    },
    {
      "to": "/tela-azul-curitiba",
      "label": "Tela Azul"
    },
    {
      "to": "/servicos",
      "label": "Todos os Serviços"
    }
  ],
  "conteudoExtra": "## Como Desabilitar Reinício Automático\n\nPara conseguir ver a tela azul e identificar o erro:\n\n1. **Clique direito** em \"Este Computador\" → Propriedades\n2. **Configurações avançadas** do sistema\n3. Em \"Inicialização e Recuperação\" → **Configurações**\n4. Desmarque **\"Reiniciar automaticamente\"**\n5. Na próxima tela azul, anote o código de erro\n\n## Prevenção\n\n- Use **estabilizador ou no-break** para proteger contra oscilações\n- Faça **limpeza térmica** a cada 6-12 meses\n- Mantenha **drivers atualizados** pelo site do fabricante\n- Monitore **temperaturas** regularmente com HWMonitor"
};
