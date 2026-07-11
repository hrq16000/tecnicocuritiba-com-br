import type { ProblemaPageData } from "./types";

export const problema: ProblemaPageData = {
  "slug": "notebook-bateria-nao-carrega-curitiba",
  "title": "Notebook Não Carrega a Bateria em Curitiba | Diagnóstico Especializado",
  "metaDescription": "Notebook não carrega a bateria? Técnico em Curitiba diagnostica problemas no carregador, conector DC, chip de carga e bateria com laudo profissional.",
  "h1": "Notebook Não Carrega a Bateria — Diagnóstico e Reparo em Curitiba",
  "categoria": "Hardware",
  "intro": "Seu notebook está conectado na tomada, mostra \"conectado, sem carregar\" ou simplesmente não reconhece o carregador? Esse é um dos problemas mais comuns em notebooks com mais de 2 anos de uso e pode ter causas simples (cabo danificado) ou complexas (chip de gerenciamento de carga queimado).\n\nEm Curitiba, atendemos dezenas de casos por mês de notebooks que não carregam. O problema pode estar no carregador, no conector DC-in do notebook, na placa-mãe (circuito de carga) ou na própria bateria. Sem diagnóstico correto, muitos usuários trocam peças desnecessariamente.\n\nA bateria de íon-lítio tem vida útil de 300 a 500 ciclos completos. Após esse período, sua capacidade cai significativamente. Mas antes de trocar a bateria, é fundamental verificar se o problema não está no carregador ou no circuito de carga da placa-mãe — caso contrário, a bateria nova também não carregará.",
  "sintomas": [
    {
      "titulo": "Mensagem 'Conectado, sem carregar'",
      "desc": "O Windows reconhece o carregador mas a bateria não carrega. Pode indicar bateria no fim da vida útil, driver corrompido ou problema no chip de carga.",
      "gravidade": "Médio"
    },
    {
      "titulo": "LED de carga não acende",
      "desc": "O indicador luminoso de carregamento não liga ao conectar o carregador. Problema pode ser no carregador, cabo ou conector DC-in.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Bateria trava em percentual fixo",
      "desc": "A bateria fica parada em 0%, 50% ou outro valor e não avança. Indica célula defeituosa ou controlador BMS com falha.",
      "gravidade": "Alto"
    },
    {
      "titulo": "Notebook só funciona na tomada",
      "desc": "Ao desconectar o carregador, o notebook desliga imediatamente. Bateria completamente degradada ou desconectada internamente.",
      "gravidade": "Alto"
    },
    {
      "titulo": "Carregador esquenta excessivamente",
      "desc": "A fonte de alimentação fica muito quente e para de fornecer energia. Pode indicar curto interno no carregador ou consumo anormal do notebook.",
      "gravidade": "Alto"
    },
    {
      "titulo": "Carga intermitente",
      "desc": "A bateria carrega e para, carrega e para, de forma aleatória. Conector DC-in com mau contato ou cabo do carregador danificado internamente.",
      "gravidade": "Médio"
    }
  ],
  "causas": [
    {
      "titulo": "Carregador defeituoso ou incompatível",
      "desc": "Carregadores genéricos com voltagem/amperagem errada não fornecem energia suficiente. Cabos com rompimento interno são causa frequente.",
      "tipo": "hardware"
    },
    {
      "titulo": "Conector DC-in danificado",
      "desc": "O conector onde o carregador é plugado se desgasta com o tempo, causando mau contato. Em muitos modelos é soldado à placa-mãe.",
      "tipo": "desgaste"
    },
    {
      "titulo": "Bateria com ciclos esgotados",
      "desc": "Baterias de lítio perdem capacidade após 300-500 ciclos. Software como BatteryInfoView mostra o desgaste real (wear level).",
      "tipo": "desgaste"
    },
    {
      "titulo": "Chip de gerenciamento de carga (BQ chip)",
      "desc": "O CI responsável por controlar a carga da bateria na placa-mãe pode queimar por picos de energia ou uso de carregadores incompatíveis.",
      "tipo": "hardware"
    },
    {
      "titulo": "Driver ACPI corrompido",
      "desc": "O driver de gerenciamento de energia do Windows pode corromper e impedir o reconhecimento correto da bateria.",
      "tipo": "software"
    },
    {
      "titulo": "Oxidação nos contatos da bateria",
      "desc": "Umidade e tempo causam oxidação nos terminais de contato entre a bateria e a placa-mãe, interrompendo a comunicação.",
      "tipo": "desgaste"
    }
  ],
  "cenarios": [
    {
      "nivel": "Simples",
      "desc": "Problema no carregador ou driver — substituição do carregador ou reinstalação do driver ACPI resolve.",
      "tempo": "1-2 horas",
      "custo": "R$80–R$200"
    },
    {
      "nivel": "Médio",
      "desc": "Conector DC-in com mau contato — necessita dessoldar e ressoldar ou substituir o conector. Ou troca de bateria.",
      "tempo": "2-4 horas",
      "custo": "R$150–R$400"
    },
    {
      "nivel": "Complexo",
      "desc": "Chip de gerenciamento de carga queimado na placa-mãe — reparo de micro-solda BGA com estação profissional.",
      "tempo": "3-7 dias",
      "custo": "R$300–R$700"
    }
  ],
  "riscos": [
    "Usar carregador genérico com especificações erradas pode queimar o chip de carga da placa-mãe",
    "Bateria completamente degradada pode inchar e danificar o chassi ou a tela do notebook",
    "Ignorar o problema pode causar desligamentos abruptos e perda de dados",
    "Tentativas de reparo sem experiência podem danificar o conector soldado à placa-mãe"
  ],
  "diagnostico": "O diagnóstico de carregamento envolve múltiplas etapas: teste do carregador com multímetro (voltagem e amperagem de saída), inspeção do conector DC-in com lupa e teste de continuidade, verificação do estado da bateria via software (ciclos, wear level, voltagem das células) e análise do circuito de carga na placa-mãe.\n\nUtilizamos carregadores de referência para isolar o problema e ferramentas de diagnóstico de bateria que mostram a saúde real das células. Em casos de suspeita de chip de carga, usamos osciloscópio para verificar os sinais de controle.",
  "solucao": "A solução depende da causa raiz identificada no diagnóstico:\n\nPara carregadores defeituosos, recomendamos sempre fontes originais ou compatíveis homologadas com a voltagem e amperagem corretas para o modelo.\n\nConectores DC-in são reparados com estação de solda — em modelos onde o conector é separado da placa, a troca é simples. Quando soldado à placa-mãe, requer micro-solda.\n\nBaterias degradadas são substituídas por células compatíveis. Verificamos o Part Number original para garantir compatibilidade física e elétrica.\n\nProblemas no chip de carga (BQ24xxx, ISL6xxx, etc.) exigem reballing ou substituição do componente SMD com estação BGA profissional.",
  "quandoCompensa": "Notebooks com menos de 4 anos, quando o problema é carregador, conector ou bateria. Mesmo reparo de chip de carga compensa se o notebook vale mais de R$2.500.",
  "quandoNaoCompensa": "Notebooks muito antigos (7+ anos) com placa-mãe danificada em múltiplos pontos. O custo do reparo pode ultrapassar o valor do equipamento.",
  "whatsappMessage": "Olá! Meu notebook não está carregando a bateria. Gostaria de agendar um diagnóstico.",
  "relatedPages": [
    {
      "to": "/computador-desligando-sozinho-curitiba",
      "label": "PC Desligando Sozinho"
    },
    {
      "to": "/problemas/notebook-esquentando-desligando-curitiba",
      "label": "Notebook Esquentando"
    },
    {
      "to": "/servicos/conserto-pc-notebook",
      "label": "Conserto de Notebook"
    },
    {
      "to": "/problemas/computador-com-cheiro-de-queimado-curitiba",
      "label": "Cheiro de Queimado"
    },
    {
      "to": "/servicos/upgrade-ssd-memoria",
      "label": "Upgrade SSD e Memória"
    },
    {
      "to": "/diagnostico-tecnico",
      "label": "Diagnóstico Técnico"
    }
  ],
  "conteudoExtra": "## Dicas para Preservar a Bateria do Notebook\n\n### Cuidados no Dia a Dia\n- Mantenha a carga entre 20% e 80% sempre que possível\n- Evite usar o notebook em superfícies que bloqueiem a ventilação\n- Use sempre carregadores originais ou homologados\n- Em uso fixo prolongado, alguns fabricantes oferecem modo de \"carga limitada\" na BIOS\n\n### Sinais de Bateria Inchada\nSe o touchpad começar a ficar alto, a base do notebook não fechar direito ou você notar uma protuberância na parte inferior, **desligue imediatamente** e procure assistência. Baterias inchadas são risco de incêndio.\n\n### Verificando a Saúde da Bateria\nNo Windows, execute no Prompt de Comando como administrador:\n`powercfg /batteryreport`\nO relatório mostra a capacidade original vs. atual e o número de ciclos."
};
