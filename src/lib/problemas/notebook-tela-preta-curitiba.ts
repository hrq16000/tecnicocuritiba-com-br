import type { ProblemaPageData } from "./types";

export const problema: ProblemaPageData = {
  "slug": "notebook-tela-preta-curitiba",
  "title": "Notebook com Tela Preta em Curitiba — Diagnóstico e Reparo",
  "metaDescription": "Notebook ligou mas a tela ficou preta? Técnico em Curitiba identifica se é backlight, flat cable, GPU ou placa-mãe. Diagnóstico profissional com orçamento transparente.",
  "h1": "Notebook com Tela Preta — Diagnóstico e Reparo em Curitiba",
  "categoria": "Hardware",
  "intro": "Quando o notebook liga mas a tela permanece completamente preta, o problema pode variar de algo simples como brilho no mínimo até falhas graves na GPU ou placa-mãe. Muitos clientes confundem tela preta com notebook que não liga — mas se os LEDs acendem e o cooler gira, o sistema está funcionando; o problema está no vídeo.\n\nEsse é um dos defeitos mais comuns e mais frustrantes: você ouve o Windows iniciando, mas não vê nada. A causa pode ser o inverter/backlight, o flat cable da tela, a própria tela LCD/LED, a GPU dedicada com solda fria, ou até problemas de BIOS/firmware.\n\nO diagnóstico correto é essencial porque trocar peças sem saber a causa real resulta em desperdício de dinheiro. Conectar um monitor externo é o primeiro teste que separa falha de tela de falha de GPU.",
  "sintomas": [
    {
      "titulo": "Tela totalmente preta mas LEDs acesos",
      "desc": "O notebook liga normalmente (LEDs, cooler, sons do sistema), porém a tela não exibe absolutamente nada. Pode indicar falha no backlight, inverter ou flat cable.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Tela pisca e apaga após alguns segundos",
      "desc": "A imagem aparece brevemente e depois a tela escurece. Geralmente relacionado a falha no inverter ou driver gráfico corrompido.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Imagem aparece no monitor externo mas não no notebook",
      "desc": "Confirma que GPU e sistema estão funcionando. O defeito está na tela, flat cable ou conector interno.",
      "gravidade": "Simples"
    },
    {
      "titulo": "Tela preta com linhas ou artefatos antes de apagar",
      "desc": "Indica possível falha na GPU dedicada (solda fria) ou defeito na própria tela LCD/LED.",
      "gravidade": "Complexo"
    },
    {
      "titulo": "Tela preta após atualização de driver ou Windows",
      "desc": "Driver de vídeo incompatível ou atualização corrompida. Geralmente resolvido via modo seguro.",
      "gravidade": "Simples"
    },
    {
      "titulo": "Notebook não exibe BIOS nem logo da fabricante",
      "desc": "Se nem a BIOS aparece, o problema é anterior ao sistema operacional — flat cable, tela ou GPU com defeito severo.",
      "gravidade": "Complexo"
    }
  ],
  "causas": [
    {
      "titulo": "Flat cable danificado ou desconectado",
      "desc": "O cabo flexível que liga a placa-mãe à tela pode romper com o uso, especialmente em dobradiças desgastadas. É uma das causas mais comuns e de reparo acessível.",
      "tipo": "desgaste"
    },
    {
      "titulo": "Backlight ou inverter queimado",
      "desc": "O sistema de iluminação da tela falha, deixando a imagem 'invisível' — se você iluminar com lanterna, pode ver a imagem fraca. Troca de backlight/inverter resolve.",
      "tipo": "hardware"
    },
    {
      "titulo": "GPU com solda fria (BGA)",
      "desc": "Em notebooks com GPU dedicada (NVIDIA/AMD), o chip pode apresentar solda fria devido ao aquecimento constante. É o cenário mais complexo e caro.",
      "tipo": "hardware"
    },
    {
      "titulo": "Driver de vídeo corrompido ou incompatível",
      "desc": "Após atualizações do Windows ou instalação manual de drivers errados, a tela pode ficar preta. Boot em modo seguro e reinstalação do driver resolve.",
      "tipo": "software"
    },
    {
      "titulo": "Tela LCD/LED com defeito interno",
      "desc": "Painéis LCD podem falhar por impacto, pressão ou defeito de fabricação. Requer substituição completa do painel.",
      "tipo": "hardware"
    },
    {
      "titulo": "Configuração de múltiplos monitores incorreta",
      "desc": "O notebook pode estar configurado para enviar imagem apenas para monitor externo. Atalho Win+P ou reset de configuração resolve.",
      "tipo": "erro-humano"
    }
  ],
  "cenarios": [
    {
      "nivel": "Simples",
      "desc": "Driver corrompido, configuração de monitor, brilho no mínimo ou flat cable solto. Resolvido com software ou reconexão.",
      "tempo": "1–2 horas",
      "custo": "R$80–R$150"
    },
    {
      "nivel": "Médio",
      "desc": "Flat cable rompido, backlight/inverter queimado ou tela com defeito. Requer troca de componente.",
      "tempo": "2–5 dias (peça)",
      "custo": "R$150–R$400"
    },
    {
      "nivel": "Complexo",
      "desc": "GPU com solda fria (reballing), placa-mãe com trilha queimada. Reparo especializado em bancada.",
      "tempo": "5–15 dias",
      "custo": "R$350–R$800+"
    }
  ],
  "riscos": [
    "Forçar abertura do notebook sem experiência pode romper o flat cable permanentemente",
    "Reballing caseiro (secador de cabelo/forno) pode destruir a placa-mãe",
    "Trocar a tela sem verificar a GPU resulta em gasto desnecessário",
    "Ignorar o problema pode indicar superaquecimento progressivo da GPU que danifica outros componentes",
    "Drivers genéricos podem causar instabilidade mesmo que 'resolvam' temporariamente"
  ],
  "diagnostico": "O diagnóstico começa conectando um monitor externo via HDMI/VGA. Se a imagem aparece no externo, descartamos GPU e focamos em tela/flat/backlight. Se não aparece em nenhum, o problema é GPU ou placa-mãe.\n\nTestamos o backlight com lanterna na tela (se a imagem fraca é visível, é backlight). Verificamos o flat cable com multímetro de continuidade. Para GPU, usamos software de stress test e análise térmica.\n\nO diagnóstico profissional evita que você gaste R$300+ trocando uma tela quando o problema é um cabo de R$30.",
  "solucao": "Para problemas de software (driver), fazemos boot em modo seguro, removemos o driver problemático e instalamos a versão correta do fabricante. Flat cables são substituídos por peças compatíveis com o modelo exato.\n\nBacklight e inverter são trocados em bancada com peças testadas. Para GPU com solda fria, realizamos reballing profissional com estação BGA e esferas de solda adequadas, com garantia do serviço.\n\nEm casos onde o custo de reparo supera 60% do valor do notebook, orientamos sobre a melhor decisão econômica.",
  "quandoCompensa": "Notebooks de até 3 anos com problema de flat cable, backlight ou driver — reparo rápido e econômico. Notebooks com GPU integrada Intel onde o problema é na tela também compensam.",
  "quandoNaoCompensa": "Notebooks com mais de 5 anos e GPU dedicada com solda fria — o custo de reballing pode ser alto e a recorrência é comum. Melhor investir em equipamento novo.",
  "whatsappMessage": "Olá! Meu notebook está com a tela preta. Ele liga (LEDs acendem) mas não aparece nada na tela. Preciso de diagnóstico.",
  "relatedPages": [
    {
      "to": "/problemas/computador-nao-liga-curitiba",
      "label": "Computador Não Liga"
    },
    {
      "to": "/problemas/monitor-piscando-curitiba",
      "label": "Monitor Piscando"
    },
    {
      "to": "/problemas/notebook-superaquecendo-curitiba",
      "label": "Notebook Superaquecendo"
    },
    {
      "to": "/conserto-notebook-curitiba",
      "label": "Conserto de Notebook"
    },
    {
      "to": "/servicos",
      "label": "Todos os Serviços"
    }
  ],
  "conteudoExtra": "## Teste Rápido em Casa\n\n1. **Teste de brilho**: Pressione as teclas de brilho (Fn + tecla de sol) — pode estar no mínimo\n2. **Monitor externo**: Conecte via HDMI e pressione Win+P → selecione \"Duplicar\"\n3. **Teste de lanterna**: Com o notebook ligado, ilumine a tela com lanterna — se vir imagem fraca, é backlight\n4. **Hard reset**: Desligue, remova bateria (se possível), segure power 30s, religue\n\n## Modelos Mais Afetados\n\nNotebooks com GPU dedicada NVIDIA (séries GeForce GT/GTX mais antigas) são os mais propensos a solda fria. Modelos Dell, HP e Lenovo com dobradiças rígidas sofrem mais com flat cable. Acer e Samsung com telas finas são mais vulneráveis a danos no painel."
};
