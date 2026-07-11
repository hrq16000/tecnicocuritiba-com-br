import type { ProblemaPageData } from "./types";

export const problema: ProblemaPageData = {
  "slug": "computador-reiniciando-sozinho-curitiba",
  "title": "Computador Reiniciando Sozinho? Causas e Soluções | Técnico em Curitiba",
  "metaDescription": "Computador reiniciando sozinho sem aviso? Pode ser superaquecimento, fonte, RAM ou Windows. Diagnóstico profissional em Curitiba. Atendimento rápido.",
  "h1": "Computador Reiniciando Sozinho em Curitiba? Encontramos a Causa!",
  "categoria": "Hardware / Software",
  "intro": "Um computador que reinicia sozinho sem aviso é sinal de algo grave. O sistema detecta uma condição crítica (temperatura, voltagem, erro de memória) e faz um desligamento de proteção. Ignorar esse sintoma pode levar a danos permanentes no hardware. Em Curitiba, nosso técnico identifica a causa raiz com ferramentas profissionais de diagnóstico.",
  "sintomas": [
    {
      "titulo": "Reinicia sem aviso prévio",
      "desc": "O computador simplesmente desliga e liga novamente, sem tela azul ou mensagem de erro. Geralmente é hardware.",
      "gravidade": "Médio a complexo"
    },
    {
      "titulo": "Reinicia com tela azul (BSOD)",
      "desc": "Aparece uma tela azul com código de erro antes de reiniciar. O código indica a causa: memória, driver ou disco.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Reinicia durante jogos ou uso pesado",
      "desc": "Só acontece em carga alta (jogos, renderização). Indica superaquecimento ou fonte insuficiente.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Reinicia aleatoriamente",
      "desc": "Acontece em momentos imprevisíveis, sem padrão. Pode ser memória RAM com defeito ou fonte instável.",
      "gravidade": "Médio a complexo"
    },
    {
      "titulo": "Reinicia em loop (boot loop)",
      "desc": "Liga, começa a carregar e reinicia antes de completar o boot. Windows corrompido ou hardware falhando.",
      "gravidade": "Complexo"
    },
    {
      "titulo": "Reinicia apenas com programas específicos",
      "desc": "Certos programas causam o reinício. Driver incompatível, conflito de software ou recurso de hardware insuficiente.",
      "gravidade": "Simples a médio"
    }
  ],
  "causas": [
    {
      "titulo": "Superaquecimento",
      "desc": "CPU ou GPU ultrapassam a temperatura máxima e o sistema desliga por proteção. Pasta térmica seca ou cooler obstruído.",
      "tipo": "hardware"
    },
    {
      "titulo": "Fonte de alimentação instável",
      "desc": "Fonte sub-dimensionada ou com capacitores estufados não mantém voltagem estável, causando reinícios sob carga.",
      "tipo": "hardware"
    },
    {
      "titulo": "Memória RAM com defeito",
      "desc": "Módulos de RAM com células defeituosas causam erros aleatórios que forçam reinícios de proteção.",
      "tipo": "hardware"
    },
    {
      "titulo": "Driver incompatível ou corrompido",
      "desc": "Drivers de vídeo, chipset ou rede podem causar BSOD que resulta em reinício automático.",
      "tipo": "software"
    },
    {
      "titulo": "Windows corrompido",
      "desc": "Arquivos de sistema corrompidos por desligamento forçado, vírus ou disco com defeito.",
      "tipo": "software"
    },
    {
      "titulo": "Placa-mãe com defeito",
      "desc": "Capacitores estufados, reguladores de tensão falhando ou trilhas com micro-fissuras.",
      "tipo": "hardware"
    }
  ],
  "cenarios": [
    {
      "nivel": "Simples",
      "desc": "Driver corrompido ou configuração do Windows (reinício automático em erro) — resolvido com software",
      "tempo": "1–2 horas",
      "custo": "R$ 100–150"
    },
    {
      "nivel": "Médio",
      "desc": "Limpeza + troca de pasta térmica, troca de memória RAM ou substituição da fonte",
      "tempo": "1–3 horas",
      "custo": "R$ 150–350"
    },
    {
      "nivel": "Complexo",
      "desc": "Diagnóstico de placa-mãe com defeito, reparo ou substituição de componentes",
      "tempo": "3–5 horas",
      "custo": "R$ 300–600"
    }
  ],
  "riscos": [
    "Reinícios constantes podem corromper o sistema de arquivos e causar perda de dados",
    "Superaquecimento ignorado pode queimar o processador permanentemente",
    "Fonte instável pode danificar placa-mãe, memória e outros componentes",
    "Usar o computador com RAM defeituosa pode corromper arquivos e instalações de programas"
  ],
  "diagnostico": "1. Monitoramento de temperatura em tempo real da CPU e GPU com HWMonitor para detectar superaquecimento.\n\n2. Teste de memória RAM com MemTest86 (mínimo 4 passes) para identificar células defeituosas.\n\n3. Teste de estabilidade da fonte com multímetro nas linhas 12V, 5V e 3.3V sob carga.\n\n4. Análise dos dumps de BSOD (arquivos .dmp) para identificar o driver ou componente causador.\n\n5. Verificação visual da placa-mãe: capacitores estufados, marcas de queimado, soldas frias.\n\n6. Teste de estresse (Prime95 + FurMark) para reproduzir o problema em ambiente controlado.",
  "solucao": "**Superaquecimento**: Limpeza completa interna, troca de pasta térmica (Arctic MX-4 ou similar), verificação dos coolers e ventilação. Em notebooks, limpeza do sistema de heat pipe.\n\n**Fonte**: Substituição por fonte de qualidade com potência adequada ao sistema. Em notebooks, teste e troca do carregador se necessário.\n\n**Memória RAM**: Identificação do módulo defeituoso e substituição. Teste dos slots da placa-mãe para confirmar que não é o slot com defeito.\n\n**Software**: Desativação do reinício automático em erro (para poder ver o código BSOD), atualização de drivers problemáticos, reparo ou reinstalação do Windows.\n\n**Placa-mãe**: Troca de capacitores estufados, reparo de reguladores de tensão ou substituição da placa em casos mais graves.",
  "quandoCompensa": "Na maioria dos casos, a causa é algo reparável (limpeza, pasta térmica, fonte, RAM). O diagnóstico é essencial para não trocar peças desnecessariamente.",
  "quandoNaoCompensa": "Se a placa-mãe tem múltiplos capacitores estufados em computador antigo, ou se o processador já sofreu dano térmico, pode ser mais vantajoso trocar o equipamento.",
  "whatsappMessage": "Olá! Meu computador fica reiniciando sozinho. Podem me ajudar?",
  "relatedPages": [
    {
      "to": "/problemas/computador-nao-liga-curitiba",
      "label": "PC Não Liga"
    },
    {
      "to": "/problemas/notebook-esquentando-desligando-curitiba",
      "label": "Notebook Esquentando"
    },
    {
      "to": "/problemas/computador-desligando-apos-segundos-curitiba",
      "label": "Desligando Após Segundos"
    },
    {
      "to": "/problemas/memoria-ram-com-defeito-curitiba",
      "label": "RAM com Defeito"
    },
    {
      "to": "/servicos/conserto-pc-notebook",
      "label": "Conserto de PC/Notebook"
    },
    {
      "to": "/diagnostico-tecnico",
      "label": "Diagnóstico Técnico"
    }
  ],
  "conteudoExtra": "## Reinício Constante: Guia de Emergência\n\n### Antes de Chamar o Técnico\n1. **Desabilite o reinício automático**: Painel de Controle > Sistema > Configurações avançadas > Inicialização e Recuperação > desmarque \"Reiniciar automaticamente\"\n2. **Anote o código da tela azul** — ex: KERNEL_DATA_INPAGE_ERROR, WHEA_UNCORRECTABLE_ERROR\n3. **Verifique a temperatura** — se o gabinete está muito quente, desligue e espere esfriar\n4. **Ouça a fonte** — estalo ou cheiro de queimado indica problema elétrico urgente\n\n### Códigos de BSOD Mais Comuns\n- **WHEA_UNCORRECTABLE_ERROR**: Problema de hardware (CPU, RAM, placa-mãe)\n- **KERNEL_DATA_INPAGE_ERROR**: HD/SSD com setores defeituosos\n- **IRQL_NOT_LESS_OR_EQUAL**: Driver incompatível ou RAM defeituosa\n- **CRITICAL_PROCESS_DIED**: Arquivo de sistema corrompido\n- **MEMORY_MANAGEMENT**: RAM com defeito\n\n### Prevenção\n- Mantenha a limpeza interna a cada 6 meses\n- Use um nobreak/estabilizador para proteger contra oscilações elétricas\n- Monitore temperaturas periodicamente com HWMonitor ou Core Temp"
};
