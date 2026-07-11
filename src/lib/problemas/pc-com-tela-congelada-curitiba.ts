import type { ProblemaPageData } from "./types";

export const problema: ProblemaPageData = {
  "slug": "pc-com-tela-congelada-curitiba",
  "title": "PC com Tela Congelada em Curitiba | Computador Trava e Não Responde",
  "metaDescription": "Computador congela e trava em Curitiba? Diagnóstico de superaquecimento, RAM, disco e drivers. Técnico especialista resolve com atendimento rápido.",
  "h1": "PC com Tela Congelada em Curitiba — Computador Trava e Não Responde",
  "categoria": "Problemas de Computador",
  "intro": "O computador congela completamente — o mouse para, o teclado não responde e a única saída é forçar o desligamento pelo botão de energia. Esse problema pode ser aleatório ou ocorrer em situações específicas como ao abrir programas pesados, jogar ou após um tempo de uso.\n\nEm Curitiba, diagnosticamos centenas de casos de tela congelada. As causas mais comuns são superaquecimento (especialmente em dias quentes ou notebooks com ventilação obstruída), memória RAM defeituosa, disco rígido com setores defeituosos e drivers de vídeo incompatíveis.",
  "sintomas": [
    {
      "titulo": "Tela congela completamente",
      "desc": "Mouse e teclado não respondem. A única saída é forçar desligamento pelo botão de energia.",
      "gravidade": "Médio a complexo"
    },
    {
      "titulo": "Travamentos aleatórios durante o uso",
      "desc": "O computador congela sem padrão aparente, podendo ocorrer a qualquer momento durante uso normal.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Congelamento ao usar programas específicos",
      "desc": "Sempre trava ao abrir determinado programa ou jogo, sugerindo incompatibilidade ou falta de recursos.",
      "gravidade": "Simples a médio"
    },
    {
      "titulo": "Trava durante jogos ou tarefas pesadas",
      "desc": "Congelamento sob carga indica superaquecimento, fonte instável ou GPU com defeito.",
      "gravidade": "Médio a complexo"
    },
    {
      "titulo": "Trava após poucos minutos de uso",
      "desc": "PC funciona brevemente e congela, sugerindo superaquecimento rápido ou RAM com erro.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Travamento com áudio em loop",
      "desc": "O som fica repetindo o último fragmento enquanto a tela congela — indica travamento de kernel.",
      "gravidade": "Complexo"
    }
  ],
  "causas": [
    {
      "titulo": "Superaquecimento",
      "desc": "Pasta térmica seca, cooler obstruído por poeira ou ventilação insuficiente fazem o processador throttle e congelar o sistema.",
      "tipo": "hardware"
    },
    {
      "titulo": "Memória RAM defeituosa",
      "desc": "Módulos com erros intermitentes causam travamentos aleatórios. Pode ser oxidação ou chip danificado.",
      "tipo": "hardware"
    },
    {
      "titulo": "HD com setores defeituosos",
      "desc": "HD mecânico com bad blocks congela ao tentar ler áreas danificadas do disco.",
      "tipo": "desgaste"
    },
    {
      "titulo": "Driver de vídeo incompatível",
      "desc": "Driver da GPU corrompido ou versão incompatível com o Windows causa travamento durante renderização.",
      "tipo": "software"
    },
    {
      "titulo": "Fonte de alimentação instável",
      "desc": "Fonte fornecendo voltagem irregular causa travamentos sob carga quando a demanda de energia aumenta.",
      "tipo": "hardware"
    },
    {
      "titulo": "Capacitores estufados na placa-mãe",
      "desc": "Capacitores danificados causam instabilidade geral e travamentos imprevisíveis.",
      "tipo": "desgaste"
    },
    {
      "titulo": "Conflito de software ou malware",
      "desc": "Antivírus, programas em segundo plano ou malware consumindo 100% dos recursos do sistema.",
      "tipo": "software"
    }
  ],
  "cenarios": [
    {
      "nivel": "Simples",
      "desc": "Driver de vídeo desatualizado, conflito de software ou configuração errada. Resolvido com atualização ou remoção.",
      "tempo": "30 min a 1h",
      "custo": "Dentro da visita técnica"
    },
    {
      "nivel": "Médio",
      "desc": "Superaquecimento por poeira ou pasta térmica seca. Limpeza completa e troca de pasta térmica.",
      "tempo": "1h a 2h",
      "custo": "R$ 120 a R$ 200"
    },
    {
      "nivel": "Complexo",
      "desc": "RAM defeituosa, HD com bad blocks, fonte instável ou capacitores estufados. Substituição de componentes.",
      "tempo": "1 a 3 dias",
      "custo": "R$ 200 a R$ 500 + peças"
    }
  ],
  "riscos": [
    "Desligamentos forçados repetidos podem corromper o sistema de arquivos",
    "Ignorar superaquecimento pode danificar permanentemente o processador",
    "Continuar usando HD com setores defeituosos pode causar perda total de dados",
    "Atualizar driver de vídeo incorretamente pode causar tela preta"
  ],
  "diagnostico": "O diagnóstico segue uma metodologia de eliminação. Primeiro, monitoramos temperaturas do processador e GPU em tempo real durante stress test para descartar superaquecimento. Em seguida, executamos MemTest86 para verificar a integridade da RAM.\n\nTestamos o disco com ferramentas como CrystalDiskInfo (SMART) e Victoria para identificar setores defeituosos. Verificamos a estabilidade da fonte com multímetro nas linhas de 3.3V, 5V e 12V sob carga. Por fim, analisamos logs do Windows (Visualizador de Eventos) para identificar o componente responsável pelo congelamento.",
  "solucao": "Para superaquecimento, fazemos limpeza completa do sistema de refrigeração, troca de pasta térmica e verificação dos coolers. Para RAM defeituosa, identificamos o módulo com falha e substituímos.\n\nPara HD com setores defeituosos, fazemos backup imediato dos dados e substituímos por SSD. Para drivers de vídeo, fazemos remoção completa com DDU (Display Driver Uninstaller) e instalação da versão estável mais recente. Para fontes instáveis, substituímos por modelo de qualidade certificada.",
  "quandoCompensa": "Quando o problema é resolvível com limpeza, troca de pasta térmica, substituição de RAM ou HD — custos acessíveis com grande impacto.",
  "quandoNaoCompensa": "Quando a placa-mãe tem capacitores estufados extensivamente ou quando múltiplos componentes estão falhando simultaneamente em equipamento antigo.",
  "whatsappMessage": "Olá! Meu computador está congelando e travando. Preciso de diagnóstico e reparo em Curitiba.",
  "relatedPages": [
    {
      "label": "PC Lento",
      "to": "/problemas/computador-lento-curitiba"
    },
    {
      "label": "Tela Azul (BSOD)",
      "to": "/tela-azul-bsod-curitiba"
    },
    {
      "label": "Superaquecimento",
      "to": "/computador-superaquecendo-curitiba"
    },
    {
      "label": "Conserto de PC",
      "to": "/servicos/conserto-pc-notebook"
    }
  ],
  "conteudoExtra": "## O Que Fazer Quando o PC Congela\n\n1. **Aguarde 2-3 minutos**: Às vezes o sistema está processando e pode voltar ao normal\n2. **Ctrl+Alt+Del**: Tente abrir o Gerenciador de Tarefas para fechar o programa travado\n3. **Verifique a temperatura**: Toque na saída de ar — se estiver muito quente, desligue e aguarde esfriar\n4. **Monitore a frequência**: Anote quando os travamentos ocorrem (horário, programa aberto, tempo de uso)\n5. **Faça backup**: Se travamentos são frequentes, faça backup dos dados importantes imediatamente\n\n## Superaquecimento — A Causa Mais Comum\n\nEm Curitiba, especialmente nos meses mais quentes, o superaquecimento é a causa #1 de travamentos. Notebooks usados sobre cama, almofada ou superfícies que bloqueiam a ventilação são os mais afetados. Uma limpeza preventiva a cada 12 meses evita esse problema."
};
