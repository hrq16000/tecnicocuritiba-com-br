import type { ProblemaPageData } from "./types";

export const problema: ProblemaPageData = {
  "slug": "notebook-tela-escura-curitiba",
  "title": "Notebook com Tela Escura em Curitiba — Diagnóstico e Reparo | Técnico em Curitiba",
  "metaDescription": "Notebook com tela escura ou apagada? Técnico em Curitiba diagnostica backlight, flat cable e placa de vídeo. Atendimento em domicílio. WhatsApp agora!",
  "h1": "Notebook com Tela Escura — Diagnóstico e Reparo em Curitiba",
  "categoria": "Notebooks",
  "intro": "Seu notebook liga mas a tela fica escura ou muito fraca? Esse é um dos problemas mais frustrantes para usuários de notebook em Curitiba. Você ouve o sistema iniciando, os LEDs acendem, mas a tela não exibe nada — ou exibe uma imagem tão fraca que só é visível em ambiente completamente escuro.\n\nA causa mais comum é falha no backlight (iluminação de fundo) da tela, mas pode também ser o flat cable que conecta a tela à placa-mãe, a própria placa de vídeo integrada ou até uma configuração de brilho no BIOS.\n\nÉ importante não confundir tela escura com tela quebrada: na tela escura, o painel está intacto mas sem iluminação. Nosso técnico em Curitiba faz o diagnóstico preciso usando monitor externo, lanterna e ferramentas específicas para identificar exatamente onde está a falha.",
  "sintomas": [
    {
      "titulo": "Tela totalmente preta mas notebook funciona",
      "desc": "LEDs acendem, HD roda, sistema inicia — mas a tela não exibe absolutamente nada.",
      "gravidade": "Complexo"
    },
    {
      "titulo": "Imagem muito fraca, visível só no escuro",
      "desc": "Tela exibe imagem extremamente escura, perceptível apenas com lanterna.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Tela pisca e apaga após alguns segundos",
      "desc": "Imagem aparece brevemente ao ligar e depois a tela fica escura.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Tela funciona em monitor externo",
      "desc": "Conectando HDMI a um monitor externo, a imagem aparece normalmente.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Tela escura após abrir e fechar a tampa",
      "desc": "Problema aparece ao movimentar a tampa do notebook, indica flat cable.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Tela com brilho irregular ou manchas escuras",
      "desc": "Partes da tela mais escuras que outras, iluminação desigual.",
      "gravidade": "Complexo"
    }
  ],
  "causas": [
    {
      "titulo": "Falha no backlight (LED ou CCFL)",
      "desc": "LEDs de iluminação de fundo queimados ou circuito inverter com defeito.",
      "tipo": "hardware"
    },
    {
      "titulo": "Flat cable danificado ou solto",
      "desc": "Cabo flexível que conecta a tela à placa-mãe rompido por uso ou dobra excessiva.",
      "tipo": "desgaste"
    },
    {
      "titulo": "GPU integrada com defeito",
      "desc": "Chip de vídeo integrado à placa-mãe com falha de solda (BGA) ou superaquecimento.",
      "tipo": "hardware"
    },
    {
      "titulo": "Conector LVDS oxidado ou solto",
      "desc": "Conector na placa-mãe que recebe o flat cable da tela com mau contato.",
      "tipo": "desgaste"
    },
    {
      "titulo": "Configuração de brilho no mínimo",
      "desc": "Teclas de função (Fn+brilho) podem ter reduzido o brilho ao mínimo sem o usuário perceber.",
      "tipo": "erro-humano"
    },
    {
      "titulo": "Placa inverter com defeito",
      "desc": "Em notebooks com tela CCFL (mais antigos), o inverter que alimenta a lâmpada pode falhar.",
      "tipo": "hardware"
    }
  ],
  "cenarios": [
    {
      "nivel": "Simples",
      "desc": "Ajuste de brilho, reconexão de flat cable ou atualização de driver de vídeo.",
      "tempo": "15-30 min",
      "custo": "R$50–R$100"
    },
    {
      "nivel": "Médio",
      "desc": "Troca de flat cable LVDS ou reparo de conector na placa-mãe.",
      "tempo": "1-2 horas",
      "custo": "R$120–R$250"
    },
    {
      "nivel": "Complexo",
      "desc": "Troca de tela completa, reparo de GPU (reballing) ou troca de placa inverter.",
      "tempo": "2-5 horas",
      "custo": "R$250–R$600"
    }
  ],
  "riscos": [
    "Forçar o flat cable pode romper trilhas e inutilizar a tela permanentemente.",
    "Usar o notebook sem tela (via monitor externo) pode mascarar problemas que se agravam.",
    "GPU com defeito pode piorar progressivamente e afetar outros componentes.",
    "Tentativa de troca de tela sem experiência pode danificar dobradiças e carcaça."
  ],
  "diagnostico": "Realizamos teste com monitor externo (HDMI/VGA) para isolar se o problema é na tela ou na GPU. Usamos lanterna para verificar se há imagem fraca (backlight). Inspecionamos o flat cable e conector LVDS. Testamos as teclas de brilho e configurações de BIOS.\n\nO diagnóstico profissional custa a partir de R$50, valor abatido do serviço caso aprovado.",
  "solucao": "A solução varia conforme a causa: reconexão ou troca do flat cable LVDS, reparo do circuito de backlight, substituição da tela LCD/LED completa ou, em casos de GPU, reballing do chip de vídeo.\n\nTrabalhamos com telas originais e compatíveis, sempre com garantia no serviço. O notebook é testado em múltiplos ciclos de abrir/fechar tampa para garantir a estabilidade.",
  "quandoCompensa": "Compensa reparar quando o notebook é de boa qualidade e o problema é no flat cable ou backlight. O reparo custa uma fração do preço de um notebook novo.",
  "quandoNaoCompensa": "Se a GPU integrada está com defeito (reballing tem taxa de sucesso limitada) e o notebook é antigo, substituir pode ser mais econômico a longo prazo.",
  "whatsappMessage": "Olá! Meu notebook está com a tela escura. Gostaria de um diagnóstico técnico em Curitiba.",
  "relatedPages": [
    {
      "to": "/problemas/monitor-piscando-curitiba",
      "label": "Monitor Piscando"
    },
    {
      "to": "/problemas/notebook-superaquecendo-curitiba",
      "label": "Notebook Superaquecendo"
    },
    {
      "to": "/problemas/computador-nao-liga-curitiba",
      "label": "Computador Não Liga"
    },
    {
      "to": "/conserto-pc-notebook",
      "label": "Conserto de PC e Notebook"
    },
    {
      "to": "/servicos",
      "label": "Todos os Serviços"
    }
  ],
  "conteudoExtra": "## Teste Rápido: Lanterna na Tela\n\nUm teste simples que você pode fazer em casa: com o notebook ligado e a tela aparentemente apagada, aponte uma lanterna forte diretamente na tela. Se você conseguir ver uma imagem muito fraca, o problema é no backlight (iluminação) e não na tela em si.\n\n## Flat Cable: O Vilão Silencioso\n\nO flat cable é um cabo flexível fino que passa pela dobradiça do notebook. Cada vez que você abre e fecha a tampa, ele é dobrado. Com o tempo (geralmente 2-4 anos de uso intenso), pode romper internamente. É uma das causas mais comuns de tela escura e também uma das mais baratas de resolver.\n\n## Monitor Externo como Solução Temporária\n\nSe você precisa usar o notebook urgentemente enquanto aguarda o reparo, conecte um monitor externo via HDMI. Na maioria dos notebooks, basta pressionar Win+P e selecionar \"Somente segunda tela\" para trabalhar normalmente."
};
