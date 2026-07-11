import type { ProblemaPageData } from "./types";

export const problema: ProblemaPageData = {
  "slug": "memoria-ram-com-defeito-curitiba",
  "title": "Memória RAM com Defeito em Curitiba | Diagnóstico e Troca",
  "metaDescription": "Memória RAM com defeito? PC travando, tela azul ou reiniciando? Técnico em Curitiba diagnostica e troca RAM com teste MemTest86. Atendimento profissional.",
  "h1": "Memória RAM com Defeito — Diagnóstico e Troca em Curitiba",
  "categoria": "Hardware — Memória",
  "intro": "A memória RAM é o componente mais traiçoeiro quando apresenta defeito. Diferente de um HD que para de funcionar de vez ou uma GPU que mostra artefatos claros, RAM defeituosa causa problemas intermitentes e aparentemente aleatórios: telas azuis esporádicas, travamentos que somem após reiniciar, programas que crasham sem motivo e erros de corrupção de dados.\n\nO diagnóstico é especialmente difícil porque os sintomas imitam outros problemas — parece vírus, parece driver, parece superaquecimento. Muitos técnicos inexperientes formatam o computador ou trocam o HD sem nunca testar a RAM, e o cliente volta com o mesmo problema semanas depois.\n\nEm Curitiba, usamos MemTest86 com mínimo de 4 passes completos (2-4 horas de teste) para garantir detecção de erros intermitentes. Também testamos cada pente individualmente em cada slot para identificar se o defeito é no módulo de RAM ou no slot da placa-mãe.",
  "sintomas": [
    {
      "titulo": "Telas azuis aleatórias com códigos variados",
      "desc": "BSODs como MEMORY_MANAGEMENT, IRQL_NOT_LESS_OR_EQUAL, PAGE_FAULT_IN_NONPAGED_AREA. Diferentes erros em momentos diferentes = forte sinal de RAM.",
      "gravidade": "Alta"
    },
    {
      "titulo": "PC reinicia sozinho sem tela azul",
      "desc": "O computador reinicia abruptamente sem mensagem de erro. Pode ser RAM com erro que causa crash tão severo que o Windows nem grava o BSOD.",
      "gravidade": "Alta"
    },
    {
      "titulo": "Programas fecham com 'erro de memória'",
      "desc": "Aplicativos mostram mensagens como 'A instrução em 0x... referenciou memória em 0x...' ou simplesmente fecham sem aviso.",
      "gravidade": "Média-Alta"
    },
    {
      "titulo": "Lentidão extrema mesmo com pouco uso",
      "desc": "O PC fica muito lento mesmo com poucas janelas abertas. Pode indicar que o Windows está evitando setores defeituosos da RAM, usando menos memória.",
      "gravidade": "Média"
    },
    {
      "titulo": "PC não liga ou dá bipes ao ligar",
      "desc": "Bipes contínuos ou sequência de bipes ao ligar sem imagem. RAM não detectada ou completamente defeituosa.",
      "gravidade": "Alta"
    },
    {
      "titulo": "Arquivos corrompidos aleatoriamente",
      "desc": "Documentos, fotos ou programas ficam corrompidos sem motivo. A RAM defeituosa altera bits durante a gravação no disco.",
      "gravidade": "Alta"
    }
  ],
  "causas": [
    {
      "titulo": "Defeito de fabricação ou desgaste",
      "desc": "Módulos de RAM podem ter defeito de fábrica que só se manifesta com o tempo, ou desgastar após anos de uso intenso (calor, ciclos de energia).",
      "tipo": "desgaste"
    },
    {
      "titulo": "Pico de tensão elétrica",
      "desc": "Raios, picos na rede elétrica ou fontes de alimentação instáveis podem danificar chips de memória instantaneamente.",
      "tipo": "hardware"
    },
    {
      "titulo": "Contatos oxidados",
      "desc": "Os contatos dourados do pente de RAM oxidam com o tempo, especialmente em ambientes úmidos. Causa mau contato intermitente.",
      "tipo": "desgaste"
    },
    {
      "titulo": "Overclock ou XMP instável",
      "desc": "Perfil XMP ativado na BIOS pode exigir mais do que os módulos suportam. Funciona em testes curtos mas falha sob carga prolongada.",
      "tipo": "erro-humano"
    },
    {
      "titulo": "Incompatibilidade entre módulos",
      "desc": "Misturar pentes de marcas, velocidades ou timings diferentes pode causar instabilidade. A placa-mãe opera na velocidade do mais lento.",
      "tipo": "erro-humano"
    },
    {
      "titulo": "Slot de RAM da placa-mãe com defeito",
      "desc": "O problema pode não ser no pente mas no slot. Trilha solta, sujeira no conector ou dano físico no encaixe.",
      "tipo": "hardware"
    }
  ],
  "cenarios": [
    {
      "nivel": "Simples",
      "desc": "Limpeza de contatos + reencaixe + teste MemTest86. Resolve quando o problema é oxidação ou mau contato.",
      "tempo": "2-4 horas",
      "custo": "R$ 80–150"
    },
    {
      "nivel": "Médio",
      "desc": "Troca de pente defeituoso por módulo novo compatível + configuração de XMP/timings na BIOS.",
      "tempo": "1-2 horas",
      "custo": "R$ 150–400"
    },
    {
      "nivel": "Complexo",
      "desc": "Diagnóstico de slot de placa-mãe + troca de RAM + teste extensivo de estabilidade (8h+).",
      "tempo": "1-2 dias",
      "custo": "R$ 300–600"
    }
  ],
  "riscos": [
    "RAM defeituosa pode corromper dados no HD/SSD silenciosamente por semanas antes de ser detectada",
    "Formatar o PC sem testar RAM faz o cliente voltar com o mesmo problema",
    "Comprar RAM incompatível pode causar instabilidade igual ou pior",
    "Misturar pentes de velocidades diferentes causa degradação de performance",
    "Ignorar o problema pode danificar o sistema de arquivos e causar perda de dados",
    "Overclock de RAM sem conhecimento pode degradar a vida útil dos módulos"
  ],
  "diagnostico": "Diagnóstico completo de memória RAM:\n\n1. Identificação dos módulos instalados (marca, velocidade, timings)\n2. Teste individual de cada pente com MemTest86 (mínimo 4 passes = ~2h por pente)\n3. Teste de cada slot da placa-mãe com pente sabidamente bom\n4. Verificação de configuração de XMP/DOCP na BIOS\n5. Teste de estabilidade sob carga (Prime95 modo Large FFTs)\n6. Verificação visual de contatos (oxidação, sujeira, dano)\n\nCusto: R$ 99,99 (incorporado se aprovar o serviço).",
  "solucao": "Solução conforme o diagnóstico:\n\n- **Oxidação**: Limpeza dos contatos com borracha branca + álcool isopropílico\n- **Pente defeituoso**: Troca por módulo novo compatível (mesma velocidade e timings)\n- **Incompatibilidade**: Substituição de todos os módulos por kit pareado (dual channel)\n- **XMP instável**: Ajuste manual de frequência e timings na BIOS\n- **Slot defeituoso**: Uso de slots alternativos ou reparo da placa-mãe\n\nTeste MemTest86 completo (8+ passes) após a troca para garantir zero erros.",
  "quandoCompensa": "Quase sempre — troca de RAM custa R$ 150-400 e pode dar anos de vida estável ao PC. É um dos upgrades com melhor custo-benefício.",
  "quandoNaoCompensa": "Quando a placa-mãe é tão antiga que usa DDR2 ou DDR3 cara e rara. Nesse caso, upgrade completo (placa + CPU + RAM DDR4/DDR5) faz mais sentido.",
  "whatsappMessage": "Olá! Meu PC está com suspeita de memória RAM defeituosa (telas azuis, travamentos). Podem diagnosticar?",
  "relatedPages": [
    {
      "to": "/problemas/pc-reiniciando-sozinho-curitiba",
      "label": "PC Reiniciando Sozinho"
    },
    {
      "to": "/erro-tela-azul-curitiba",
      "label": "Tela Azul (BSOD)"
    },
    {
      "to": "/problemas/computador-lento-curitiba",
      "label": "Computador Lento"
    },
    {
      "to": "/servicos/upgrade-ssd-memoria",
      "label": "Upgrade SSD/Memória"
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
  "conteudoExtra": "## Memória RAM: Guia Completo\n\n### Tipos de RAM por Geração\n\n| Geração | Velocidade Típica | Voltagem | Ano | Status |\n|---|---|---|---|---|\n| DDR3 | 1333-1866 MHz | 1.5V | 2007-2014 | Obsoleta |\n| DDR4 | 2400-3600 MHz | 1.2V | 2014-2022 | Atual |\n| DDR5 | 4800-7200 MHz | 1.1V | 2022+ | Nova geração |\n\n### Quanto de RAM Você Precisa?\n\n| Uso | Mínimo | Recomendado |\n|---|---|---|\n| Navegação/Office | 4 GB | 8 GB |\n| Multitarefa/Trabalho | 8 GB | 16 GB |\n| Gaming | 16 GB | 32 GB |\n| Edição de vídeo/3D | 32 GB | 64 GB |\n\n### Como Verificar a RAM no Windows\n\n1. **Gerenciador de Tarefas** (Ctrl+Shift+Esc) → Aba Desempenho → Memória\n2. **msinfo32** → Mostra tipo, velocidade e fabricante\n3. **CPU-Z** (gratuito) → Aba SPD mostra detalhes técnicos de cada slot\n\n### Dual Channel: Por Que Importa\n\nUsar 2 pentes idênticos em vez de 1 dobra a largura de banda da memória:\n- ❌ 1x 16GB = Single Channel = ~25 GB/s\n- ✅ 2x 8GB = Dual Channel = ~50 GB/s\n\nImpacto real: 10-30% mais performance em jogos e aplicações pesadas."
};
