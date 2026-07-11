import type { ProblemaPageData } from "./types";

export const problema: ProblemaPageData = {
  "slug": "notebook-nao-carrega-curitiba",
  "title": "Notebook Não Carrega a Bateria em Curitiba — Diagnóstico e Reparo",
  "metaDescription": "Notebook não carrega a bateria em Curitiba? Diagnóstico profissional identifica se é carregador, conector DC, bateria ou placa. Atendimento rápido.",
  "h1": "Notebook Não Carrega a Bateria — Diagnóstico e Reparo em Curitiba",
  "categoria": "Hardware — Energia",
  "intro": "Seu notebook está conectado à tomada mas a bateria não carrega? Ou carrega até um ponto e para? Esse problema é mais comum do que parece e pode ter causas simples (carregador defeituoso) ou complexas (circuito de carga da placa-mãe).\n\nIgnorar esse sintoma pode levar a danos permanentes na bateria ou na placa-mãe. Quanto antes diagnosticar, menor o custo do reparo.\n\nEm Curitiba, fazemos diagnóstico preciso para identificar exatamente o que está impedindo o carregamento — e só então propomos a solução adequada. Sem trocar peças desnecessárias.",
  "sintomas": [
    {
      "titulo": "LED do carregador apaga ao conectar",
      "desc": "Indica possível curto-circuito no notebook ou carregador com defeito.",
      "gravidade": "Alta"
    },
    {
      "titulo": "Bateria carrega até 80% e para",
      "desc": "Pode ser limitação de software (modo de conservação) ou bateria em degradação.",
      "gravidade": "Média"
    },
    {
      "titulo": "Carrega só com notebook desligado",
      "desc": "Circuito de carga pode estar sobrecarregado ou componente da placa com defeito.",
      "gravidade": "Alta"
    },
    {
      "titulo": "Mensagem 'conectado, sem carregar'",
      "desc": "O sistema reconhece o carregador mas não inicia a carga — problema no IC de carga.",
      "gravidade": "Alta"
    },
    {
      "titulo": "Bateria descarrega mesmo na tomada",
      "desc": "Carregador com potência insuficiente ou conector DC com mau contato.",
      "gravidade": "Média"
    },
    {
      "titulo": "Notebook só funciona na tomada",
      "desc": "Bateria completamente degradada ou desconectada internamente.",
      "gravidade": "Média"
    }
  ],
  "causas": [
    {
      "titulo": "Carregador defeituoso ou incompatível",
      "desc": "Carregador com voltagem/amperagem errada ou cabo rompido internamente.",
      "tipo": "hardware"
    },
    {
      "titulo": "Conector DC (jack) com mau contato",
      "desc": "O conector onde o carregador encaixa está solto, oxidado ou com solda fria.",
      "tipo": "desgaste"
    },
    {
      "titulo": "Bateria degradada (ciclos esgotados)",
      "desc": "Baterias de lítio perdem capacidade após 300-500 ciclos de carga.",
      "tipo": "desgaste"
    },
    {
      "titulo": "Circuito de carga da placa-mãe",
      "desc": "O IC (chip) responsável por gerenciar a carga está danificado.",
      "tipo": "hardware"
    },
    {
      "titulo": "Configuração de software",
      "desc": "Modo de conservação de bateria ativado (Lenovo, ASUS) limita carga a 60-80%.",
      "tipo": "software"
    },
    {
      "titulo": "Driver ACPI corrompido",
      "desc": "Driver de gerenciamento de energia com defeito impede o carregamento correto.",
      "tipo": "software"
    }
  ],
  "cenarios": [
    {
      "nivel": "Simples",
      "desc": "Troca de carregador ou reset de bateria via software. Solução em minutos.",
      "tempo": "30min a 1h",
      "custo": "R$ 99,99 a R$ 200"
    },
    {
      "nivel": "Médio",
      "desc": "Troca de conector DC (jack de carga) ou substituição da bateria.",
      "tempo": "1h a 3h",
      "custo": "R$ 150 a R$ 400"
    },
    {
      "nivel": "Complexo",
      "desc": "Reparo de circuito de carga na placa-mãe com micro-soldagem.",
      "tempo": "3 a 7 dias",
      "custo": "R$ 300 a R$ 700"
    }
  ],
  "riscos": [
    "Usar carregador genérico incompatível pode danificar a placa-mãe permanentemente",
    "Bateria inchada pode deformar o chassis e romper a tela internamente",
    "Continuar usando com bateria defeituosa pode causar superaquecimento e incêndio",
    "Conector DC solto pode causar curto-circuito intermitente na placa",
    "Ignorar o problema degrada a bateria mais rápido — o que era troca de R$200 vira reparo de R$600"
  ],
  "diagnostico": "O diagnóstico avalia cada ponto da cadeia de carga:\n\n1. Teste do carregador com multímetro (voltagem e amperagem real)\n2. Inspeção do conector DC (mau contato, solda fria, oxidação)\n3. Verificação da saúde da bateria (ciclos, capacidade residual, inchaço)\n4. Teste do circuito de carga da placa-mãe\n5. Verificação de configurações de software (modo conservação, driver ACPI)\n\nCusto do diagnóstico: R$ 99,99 (incorporado se aprovar o serviço).",
  "solucao": "A solução depende da causa identificada:\n\n- **Carregador**: Substituição por modelo original ou compatível certificado\n- **Conector DC**: Resoldagem ou troca do conector (requer desmontagem)\n- **Bateria**: Substituição por bateria compatível com garantia\n- **Circuito de carga**: Micro-soldagem de componentes na placa-mãe\n- **Software**: Atualização de drivers ACPI e ajuste de configurações\n\nTodos os reparos incluem teste de carga completo antes da entrega.",
  "quandoCompensa": "Na maioria dos casos compensa reparar — trocar bateria ou conector custa uma fração do valor do notebook. Até reparo de circuito na placa pode valer a pena em notebooks de R$ 3.000+.",
  "quandoNaoCompensa": "Quando o notebook tem mais de 7 anos e o reparo envolve placa-mãe + bateria + carregador simultaneamente. Ou quando o custo total ultrapassa 50% do valor de um notebook novo equivalente.",
  "whatsappMessage": "Olá! Meu notebook não está carregando a bateria. Podem fazer um diagnóstico?",
  "relatedPages": [
    {
      "to": "/problemas/notebook-superaquecendo-curitiba",
      "label": "Notebook Superaquecendo"
    },
    {
      "to": "/problemas/computador-nao-liga-curitiba",
      "label": "Computador Não Liga"
    },
    {
      "to": "/problemas/fonte-queimada-curitiba",
      "label": "Fonte Queimada"
    },
    {
      "to": "/servicos/conserto-pc-notebook",
      "label": "Conserto de Notebook"
    },
    {
      "to": "/como-funciona",
      "label": "Como Funciona"
    },
    {
      "to": "/precos-e-politicas",
      "label": "Preços e Políticas"
    }
  ],
  "conteudoExtra": "## Como Verificar a Saúde da Bateria do Notebook\n\nAntes de levar ao técnico, você pode fazer um teste rápido:\n\n### Windows — Relatório de Bateria\n\n1. Abra o Prompt de Comando como administrador\n2. Digite: `powercfg /batteryreport`\n3. Abra o arquivo HTML gerado em C:\\Windows\\System32\n4. Compare \"Design Capacity\" com \"Full Charge Capacity\"\n\n**Se a Full Charge Capacity for menos de 50% da Design Capacity, a bateria precisa ser trocada.**\n\n### Tabela: Sinais e Possíveis Causas\n\n| Sintoma | Causa Provável | Urgência |\n|---|---|---|\n| LED apaga ao conectar | Curto ou carregador | Alta |\n| Carrega até 80% | Software ou degradação | Média |\n| Só funciona na tomada | Bateria morta | Média |\n| Carregador esquenta muito | Carregador incompatível | Alta |\n| Bateria inchada | Degradação química | URGENTE |\n\n### Atenção: Bateria Inchada\n\nSe o touchpad está levantado, o chassis está deformado ou há uma protuberância na parte inferior do notebook, **desligue imediatamente**. Bateria inchada de lítio pode romper e causar incêndio. Não tente remover sozinho — leve ao técnico.\n\n### Marcas e Modelos com Problemas Comuns de Carga\n\n| Marca | Problema Frequente | Solução Típica |\n|---|---|---|\n| Dell | Mensagem \"carregador não reconhecido\" | Trocar carregador original Dell |\n| Lenovo | Modo conservação ativado de fábrica | Desativar no Lenovo Vantage |\n| HP | Conector DC frágil | Resoldagem do jack |\n| Acer | Bateria degrada rápido | Troca de bateria |\n| Samsung | IC de carga sensível | Reparo de placa |"
};
