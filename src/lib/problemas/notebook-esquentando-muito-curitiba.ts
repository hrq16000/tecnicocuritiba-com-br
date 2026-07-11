import type { ProblemaPageData } from "./types";

export const problema: ProblemaPageData = {
  "slug": "notebook-esquentando-muito-curitiba",
  "title": "Notebook Esquentando Muito em Curitiba | Superaquecimento — Técnico Especializado",
  "metaDescription": "Notebook esquentando demais em Curitiba? Limpeza interna, troca de pasta térmica e reparo de cooler. Diagnóstico profissional com atendimento rápido.",
  "h1": "Notebook Esquentando Muito — Diagnóstico e Reparo em Curitiba",
  "categoria": "Hardware",
  "intro": "Quando o notebook esquenta além do normal, o desempenho cai drasticamente e há risco real de dano permanente aos componentes internos. Processadores modernos possuem proteção térmica (thermal throttling) que reduz a velocidade para evitar queima, mas isso transforma seu notebook em uma máquina lenta e instável.\n\nO superaquecimento é um dos problemas mais comuns e mais negligenciados. Poeira acumulada nos dutos de ventilação, pasta térmica ressecada e ventoinhas com rolamento desgastado são as causas mais frequentes. Em Curitiba, apesar do clima mais ameno, ambientes com carpete, cama e superfícies que bloqueiam a ventilação aceleram o problema.\n\nIgnorar o superaquecimento pode levar à queima do processador, da GPU ou até da placa-mãe — reparos que custam muito mais do que a manutenção preventiva. Nosso diagnóstico térmico identifica exatamente a causa e aplica a solução correta.",
  "sintomas": [
    {
      "titulo": "Base do notebook muito quente ao toque",
      "desc": "A região do processador e GPU irradia calor excessivo, desconfortável para uso no colo.",
      "gravidade": "Moderada"
    },
    {
      "titulo": "Ventoinha girando em alta rotação constantemente",
      "desc": "O cooler trabalha no máximo o tempo todo, gerando ruído alto e indicando que não consegue dissipar o calor.",
      "gravidade": "Moderada"
    },
    {
      "titulo": "Desligamentos repentinos durante uso intenso",
      "desc": "O notebook desliga sozinho como proteção térmica quando a temperatura ultrapassa o limite seguro.",
      "gravidade": "Alta"
    },
    {
      "titulo": "Lentidão progressiva após minutos de uso",
      "desc": "O processador reduz a frequência (throttling) para se proteger, causando travamentos e lentidão.",
      "gravidade": "Moderada"
    },
    {
      "titulo": "Tela congela durante jogos ou edição de vídeo",
      "desc": "Tarefas que exigem GPU causam congelamento por superaquecimento do chip gráfico.",
      "gravidade": "Alta"
    },
    {
      "titulo": "Ventoinha parou de funcionar",
      "desc": "Ausência total de ruído do cooler indica falha mecânica — risco iminente de dano.",
      "gravidade": "Crítica"
    }
  ],
  "causas": [
    {
      "titulo": "Pasta térmica ressecada",
      "desc": "A pasta térmica entre o processador e o dissipador perde eficiência após 2-3 anos, criando uma barreira de calor.",
      "tipo": "desgaste"
    },
    {
      "titulo": "Dutos de ventilação obstruídos por poeira",
      "desc": "Acúmulo de poeira e pelos nos dutos e aletas do dissipador bloqueia o fluxo de ar.",
      "tipo": "desgaste"
    },
    {
      "titulo": "Ventoinha com rolamento desgastado",
      "desc": "O motor do cooler perde eficiência ou para completamente, eliminando a refrigeração ativa.",
      "tipo": "desgaste"
    },
    {
      "titulo": "Uso em superfícies que bloqueiam ventilação",
      "desc": "Cama, almofada ou colo bloqueiam as entradas de ar na base do notebook.",
      "tipo": "erro-humano"
    },
    {
      "titulo": "Thermal pad degradado na GPU",
      "desc": "Os pads térmicos que transferem calor dos chips de memória e VRM para o dissipador se deterioram.",
      "tipo": "desgaste"
    },
    {
      "titulo": "Dissipador de calor com mau contato",
      "desc": "Parafusos soltos ou deformação no dissipador criam gaps que impedem a transferência de calor.",
      "tipo": "hardware"
    }
  ],
  "cenarios": [
    {
      "nivel": "Simples",
      "desc": "Limpeza interna completa com ar comprimido, remoção de poeira dos dutos e troca de pasta térmica.",
      "tempo": "1-2 horas",
      "custo": "R$120–R$180"
    },
    {
      "nivel": "Médio",
      "desc": "Limpeza + troca de pasta térmica premium + substituição de thermal pads da GPU e VRM.",
      "tempo": "2-3 horas",
      "custo": "R$180–R$280"
    },
    {
      "nivel": "Complexo",
      "desc": "Substituição completa do sistema de refrigeração (ventoinha + dissipador) + repaste com pasta de alta performance.",
      "tempo": "3-5 horas",
      "custo": "R$280–R$450"
    }
  ],
  "riscos": [
    "Queima permanente do processador por exposição prolongada a temperaturas acima de 100°C",
    "Dano irreversível à GPU, especialmente em notebooks com chip soldado à placa-mãe",
    "Degradação acelerada da bateria — calor excessivo reduz a vida útil em até 50%",
    "Dessolda de componentes BGA (Ball Grid Array) causando falhas intermitentes",
    "Perda de dados por desligamentos abruptos sem salvamento"
  ],
  "diagnostico": "O diagnóstico térmico profissional utiliza software de monitoramento em tempo real (HWiNFO, ThrottleStop) para medir temperaturas de CPU, GPU e SSD sob carga controlada. Verificamos o funcionamento do cooler com RPM real, inspecionamos visualmente a pasta térmica e os dutos de ventilação.\n\nAnalisamos o histórico de throttling para determinar se houve dano térmico acumulado. O diagnóstico identifica se o problema é apenas manutenção preventiva ou se há componentes danificados que precisam de substituição.",
  "solucao": "A solução padrão envolve desmontagem completa do notebook, limpeza profunda de todos os componentes internos com ar comprimido e álcool isopropílico, remoção da pasta térmica antiga e aplicação de pasta de alta qualidade (Arctic MX-6 ou Thermal Grizzly Kryonaut).\n\nEm casos mais graves, substituímos thermal pads degradados por versões de maior condutividade térmica e trocamos ventoinhas com rolamento desgastado. Após a remontagem, realizamos teste de estresse térmico para validar que as temperaturas estão dentro dos parâmetros ideais (CPU abaixo de 85°C sob carga total).",
  "quandoCompensa": "Notebooks com menos de 4 anos que nunca fizeram manutenção térmica se beneficiam enormemente. Uma limpeza + repaste pode reduzir as temperaturas em 15-25°C e devolver o desempenho original.",
  "quandoNaoCompensa": "Se o processador ou GPU já apresentam danos por superaquecimento crônico (artefatos visuais permanentes, crashes mesmo em temperaturas normais), o custo de troca da placa-mãe pode não justificar em notebooks antigos.",
  "whatsappMessage": "Olá! Meu notebook está esquentando muito e preciso de diagnóstico térmico. Podem me ajudar?",
  "relatedPages": [
    {
      "to": "/problemas/computador-muito-barulhento-curitiba",
      "label": "PC Barulhento"
    },
    {
      "to": "/problemas/pc-desligando-sozinho-curitiba",
      "label": "PC Desligando Sozinho"
    },
    {
      "to": "/problemas/pc-travando-em-jogos-curitiba",
      "label": "PC Travando em Jogos"
    },
    {
      "to": "/problemas/notebook-lento-curitiba",
      "label": "Notebook Lento"
    },
    {
      "to": "/problemas/pc-reiniciando-sozinho-curitiba",
      "label": "PC Reiniciando Sozinho"
    },
    {
      "to": "/servicos",
      "label": "Todos os Serviços"
    }
  ],
  "conteudoExtra": "## Temperaturas Ideais para Notebooks\n\n| Componente | Idle | Carga Leve | Carga Total | Limite Crítico |\n|---|---|---|---|---|\n| CPU | 35-50°C | 50-70°C | 70-85°C | 100°C |\n| GPU | 30-45°C | 45-65°C | 65-85°C | 95°C |\n| SSD NVMe | 30-40°C | 40-55°C | 55-70°C | 75°C |\n\n## Dicas de Prevenção\n\n- Use o notebook sempre em superfícies planas e rígidas\n- Invista em uma base com ventilação (cooler pad)\n- Faça limpeza interna preventiva a cada 12-18 meses\n- Evite bloquear as saídas de ar laterais e traseiras\n- Monitore temperaturas com HWiNFO64 (gratuito)"
};
