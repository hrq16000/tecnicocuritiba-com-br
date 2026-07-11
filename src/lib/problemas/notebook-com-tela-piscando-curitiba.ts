import type { ProblemaPageData } from "./types";

export const problema: ProblemaPageData = {
  "slug": "notebook-com-tela-piscando-curitiba",
  "title": "Notebook com Tela Piscando em Curitiba | Diagnóstico e Reparo",
  "metaDescription": "Tela do notebook piscando, tremendo ou com flickering? Técnico em Curitiba diagnostica e resolve problemas de tela com reparo profissional. Atendimento rápido.",
  "h1": "Notebook com Tela Piscando — Diagnóstico e Reparo em Curitiba",
  "categoria": "Hardware — Display",
  "intro": "A tela do notebook fica piscando, tremendo ou dando flicker? Esse problema pode ser desde algo simples como uma configuração de taxa de atualização errada até um defeito físico no cabo flat que conecta a tela à placa-mãe.\n\nO flickering de tela é especialmente incômodo porque causa fadiga visual, dor de cabeça e torna o notebook praticamente inutilizável para trabalho prolongado. Muitos usuários tentam conviver com o problema, mas ele tende a piorar progressivamente — o que era um piscar ocasional vira tela completamente apagando e voltando.\n\nEm Curitiba, o diagnóstico mais importante é determinar se o problema é de hardware (cabo flat, inversor, painel LCD) ou software (driver de vídeo, taxa de atualização, aplicativo conflitante). Um teste simples: conecte um monitor externo — se a imagem no monitor externo é estável, o problema é na tela/cabo do notebook.",
  "sintomas": [
    {
      "titulo": "Tela pisca rapidamente (flickering constante)",
      "desc": "A tela fica piscando em frequência rápida, como se estivesse sendo ligada e desligada várias vezes por segundo. Pode ser driver, taxa de atualização ou backlight.",
      "gravidade": "Média"
    },
    {
      "titulo": "Tela pisca ao abrir/fechar a tampa",
      "desc": "Mover a tampa do notebook causa piscar ou apagão momentâneo. Forte indicativo de cabo flat com mau contato na dobradiça.",
      "gravidade": "Média-Alta"
    },
    {
      "titulo": "Linhas horizontais ou verticais piscando",
      "desc": "Linhas coloridas aparecem e desaparecem na tela. Pode ser painel LCD com defeito, cabo flat danificado ou GPU com problema.",
      "gravidade": "Alta"
    },
    {
      "titulo": "Brilho da tela oscila sozinho",
      "desc": "O brilho sobe e desce sem controle do usuário. Pode ser sensor de luz ambiente com defeito ou problema no circuito de backlight.",
      "gravidade": "Baixa-Média"
    },
    {
      "titulo": "Tela apaga por segundos e volta",
      "desc": "A tela fica preta por 1-3 segundos e depois volta ao normal. Pode ser driver de vídeo crashando e reiniciando ou cabo flat intermitente.",
      "gravidade": "Média-Alta"
    },
    {
      "titulo": "Flickering só em determinados programas",
      "desc": "A tela só pisca ao usar Chrome, Excel ou jogos específicos. Indica problema de software — driver de vídeo, aceleração de hardware ou incompatibilidade.",
      "gravidade": "Baixa"
    }
  ],
  "causas": [
    {
      "titulo": "Cabo flat (LVDS/eDP) com mau contato",
      "desc": "O cabo que conecta a tela à placa-mãe passa pela dobradiça e sofre flexão a cada abertura/fechamento. Com o tempo, fios internos se rompem parcialmente.",
      "tipo": "desgaste"
    },
    {
      "titulo": "Driver de vídeo com problema",
      "desc": "Driver de GPU desatualizado, corrompido ou incompatível pode causar flickering. Windows Update frequentemente instala drivers genéricos problemáticos.",
      "tipo": "software"
    },
    {
      "titulo": "Taxa de atualização incompatível",
      "desc": "Configurar a tela para uma taxa de atualização não suportada nativamente pode causar flickering. Comum após conectar/desconectar monitor externo.",
      "tipo": "software"
    },
    {
      "titulo": "Painel LCD/LED com defeito",
      "desc": "O próprio painel da tela pode ter defeito nos transistores (TFT) ou no circuito de backlight LED. Mais comum em telas com mais de 5 anos.",
      "tipo": "hardware"
    },
    {
      "titulo": "Aplicativo com aceleração de hardware conflitante",
      "desc": "Chrome, Discord e outros apps usam aceleração de hardware da GPU. Se o driver tem bug, esses apps causam flickering.",
      "tipo": "software"
    },
    {
      "titulo": "Inversor de backlight com defeito (telas CCFL)",
      "desc": "Em notebooks mais antigos com backlight CCFL (não LED), o inversor pode falhar, causando piscar ou escurecimento progressivo.",
      "tipo": "hardware"
    }
  ],
  "cenarios": [
    {
      "nivel": "Simples",
      "desc": "Atualização de driver de vídeo + ajuste de taxa de atualização + desabilitar aceleração de hardware em apps.",
      "tempo": "30-60 min",
      "custo": "R$ 80–150"
    },
    {
      "nivel": "Médio",
      "desc": "Troca do cabo flat (LVDS/eDP) + limpeza dos conectores. Resolve a maioria dos flickerings por hardware.",
      "tempo": "1-3 horas",
      "custo": "R$ 150–350"
    },
    {
      "nivel": "Complexo",
      "desc": "Troca do painel LCD/LED completo ou reparo do circuito de backlight na placa-mãe.",
      "tempo": "2-5 dias",
      "custo": "R$ 350–900"
    }
  ],
  "riscos": [
    "Flickering prolongado causa fadiga visual, dor de cabeça e pode afetar a visão",
    "Cabo flat com fio semi-rompido pode causar curto-circuito e danificar a placa-mãe",
    "Ignorar o problema faz o cabo flat se romper completamente — tela apaga de vez",
    "Trocar tela por modelo incompatível pode causar cores erradas ou resolução incorreta",
    "Desmontar notebook sem experiência pode danificar a dobradiça ou romper outros cabos"
  ],
  "diagnostico": "Diagnóstico de tela piscando:\n\n1. Teste com monitor externo (HDMI/VGA) — se estável, problema é na tela/cabo\n2. Teste de driver: boot em Modo de Segurança — se não pisca, é driver\n3. Verificação de cabo flat (movimentar tampa e observar)\n4. Teste de taxa de atualização e resolução\n5. Inspeção visual do cabo flat e conectores\n6. Teste com painel substituto (quando disponível)\n\nCusto: R$ 80 (incorporado se aprovar o serviço).",
  "solucao": "Solução conforme a causa:\n\n- **Driver**: DDU + instalação limpa do driver Intel/NVIDIA/AMD oficial\n- **Configuração**: Ajuste de taxa de atualização para nativa + desabilitar aceleração de hardware\n- **Cabo flat**: Troca do cabo LVDS/eDP por modelo original compatível\n- **Painel**: Substituição do LCD/LED por painel compatível (mesma resolução e conector)\n- **Backlight**: Reparo do circuito inversor ou troca de LEDs de backlight\n\nTeste de estabilidade por 1+ hora com abertura/fechamento da tampa.",
  "quandoCompensa": "Na maioria dos casos — troca de cabo flat custa R$ 150-350 e resolve o problema. Até troca de tela (R$ 400-800) vale para notebooks de até 5 anos.",
  "quandoNaoCompensa": "Quando o painel é de resolução ou tamanho raro e o custo da peça + mão de obra supera 60% do valor do notebook.",
  "whatsappMessage": "Olá! A tela do meu notebook está piscando/tremendo. Podem me ajudar?",
  "relatedPages": [
    {
      "to": "/problemas/notebook-com-tela-quebrada-curitiba",
      "label": "Tela Quebrada"
    },
    {
      "to": "/problemas/pc-sem-imagem-curitiba",
      "label": "PC Sem Imagem"
    },
    {
      "to": "/problemas/erro-driver-windows-curitiba",
      "label": "Erro de Driver"
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
  "conteudoExtra": "## Tela Piscando: Guia Completo\n\n### Teste Rápido: Software ou Hardware?\n\n| Teste | Resultado | Diagnóstico |\n|---|---|---|\n| Monitor externo estável? | Sim | Problema na tela/cabo do notebook |\n| Pisca no Modo de Segurança? | Não | Problema de driver/software |\n| Pisca ao mover a tampa? | Sim | Cabo flat com mau contato |\n| Pisca em tela preta (BIOS)? | Sim | Hardware (backlight/painel) |\n\n### Tipos de Cabo de Tela\n\n| Tipo | Uso | Pinos |\n|---|---|---|\n| LVDS | Notebooks até 2015 | 30 ou 40 pinos |\n| eDP | Notebooks modernos | 30 ou 40 pinos |\n| eDP 2.0 | Notebooks premium 4K | 40 pinos |\n\n### Como Desabilitar Aceleração de Hardware\n\n**Chrome**: Configurações → Sistema → Desativar \"Usar aceleração de hardware\"\n**Discord**: Configurações → Avançado → Desativar \"Aceleração de hardware\"\n**Excel/Office**: Arquivo → Opções → Avançado → Marcar \"Desabilitar aceleração gráfica de hardware\""
};
