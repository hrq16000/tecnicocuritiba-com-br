import type { ProblemaPageData } from "./types";

export const problema: ProblemaPageData = {
  "slug": "pc-travando-em-jogos-curitiba",
  "title": "PC Travando em Jogos em Curitiba | Diagnóstico Gamer Profissional",
  "metaDescription": "PC travando, engasgando ou dando tela azul em jogos? Técnico gamer em Curitiba diagnostica e resolve problemas de performance, FPS baixo e crashes. Atendimento especializado.",
  "h1": "PC Travando em Jogos — Diagnóstico e Otimização Gamer em Curitiba",
  "categoria": "Performance — Gaming",
  "intro": "Seu PC trava, engasga ou dá tela azul durante jogos? Esse é um dos problemas mais frustrantes para gamers — especialmente quando o computador funciona normalmente para tarefas básicas e só apresenta problemas sob carga pesada de jogos.\n\nTravamentos em jogos podem ter dezenas de causas: desde driver de vídeo desatualizado até RAM com defeito, superaquecimento da GPU, fonte insuficiente ou até mesmo configurações erradas do jogo. Identificar a causa exata exige diagnóstico profissional com ferramentas específicas.\n\nEm Curitiba, atendemos gamers de todas as configurações — desde PCs gamer de entrada até setups high-end. O importante é entender que o hardware precisa trabalhar em harmonia: não adianta ter uma RTX 4070 se a fonte é de 400W ou a pasta térmica da GPU está seca há 4 anos.",
  "sintomas": [
    {
      "titulo": "FPS cai drasticamente durante o jogo",
      "desc": "O jogo começa fluido mas depois de 10-30 minutos o FPS despenca. Forte indicativo de throttling térmico — GPU ou CPU reduzindo velocidade por calor.",
      "gravidade": "Média"
    },
    {
      "titulo": "Jogo fecha sozinho sem mensagem de erro",
      "desc": "O jogo simplesmente desaparece e volta para a área de trabalho. Pode ser driver de vídeo, RAM defeituosa ou DX/Vulkan instável.",
      "gravidade": "Média-Alta"
    },
    {
      "titulo": "Tela azul (BSOD) durante jogos",
      "desc": "O Windows dá tela azul com erros como VIDEO_TDR_FAILURE, IRQL_NOT_LESS_OR_EQUAL ou WHEA_UNCORRECTABLE_ERROR. Indica problema sério de hardware ou driver.",
      "gravidade": "Alta"
    },
    {
      "titulo": "Artefatos visuais (quadrados, linhas coloridas)",
      "desc": "Aparecem blocos coloridos, linhas ou texturas corrompidas durante o jogo. Pode ser GPU superaquecendo, VRAM com defeito ou overclock instável.",
      "gravidade": "Alta"
    },
    {
      "titulo": "PC desliga completamente durante jogos pesados",
      "desc": "O computador simplesmente apaga como se tivesse puxado o cabo de força. Forte indicativo de fonte de alimentação insuficiente ou defeituosa.",
      "gravidade": "Alta"
    },
    {
      "titulo": "Engasgos e stuttering constante",
      "desc": "O jogo não é fluido mesmo com FPS alto no contador. Pode ser problema de RAM insuficiente, HDD lento ou CPU bottleneck.",
      "gravidade": "Média"
    }
  ],
  "causas": [
    {
      "titulo": "Driver de vídeo desatualizado ou corrompido",
      "desc": "Drivers da NVIDIA/AMD são atualizados frequentemente com otimizações para jogos novos. Driver antigo ou instalação corrompida causa crashes e baixa performance.",
      "tipo": "software"
    },
    {
      "titulo": "Superaquecimento de GPU ou CPU",
      "desc": "Sob carga de jogos, GPU e CPU atingem temperaturas máximas. Pasta térmica seca, cooler sujo ou gabinete sem ventilação causam throttling e desligamentos.",
      "tipo": "hardware"
    },
    {
      "titulo": "Fonte de alimentação insuficiente",
      "desc": "Jogos pesados fazem a GPU consumir 200-350W. Se a fonte não aguenta os picos de consumo, o PC desliga instantaneamente.",
      "tipo": "hardware"
    },
    {
      "titulo": "RAM com defeito ou insuficiente",
      "desc": "8GB já não é suficiente para muitos jogos modernos. RAM com erro intermitente causa crashes aleatórios que só aparecem sob carga pesada.",
      "tipo": "hardware"
    },
    {
      "titulo": "HD/SSD lento causando stuttering",
      "desc": "Jogos modernos carregam texturas e assets em tempo real. HD mecânico causa engasgos visíveis; SSD SATA pode ser lento para jogos AAA.",
      "tipo": "hardware"
    },
    {
      "titulo": "Windows ou jogo mal configurado",
      "desc": "Configurações de energia no modo economia, game mode do Windows com bug, overlay de programas (Discord, GeForce Experience) causando conflito.",
      "tipo": "software"
    }
  ],
  "cenarios": [
    {
      "nivel": "Simples",
      "desc": "Reinstalação limpa de drivers + otimização de Windows + configuração de jogo. Resolve crashes por software.",
      "tempo": "1-2 horas",
      "custo": "R$ 100–200"
    },
    {
      "nivel": "Médio",
      "desc": "Limpeza térmica completa + troca de pasta térmica + diagnóstico de RAM + otimização geral.",
      "tempo": "2-4 horas",
      "custo": "R$ 200–400"
    },
    {
      "nivel": "Complexo",
      "desc": "Troca de fonte + upgrade de RAM + diagnóstico completo de GPU com teste de estresse prolongado.",
      "tempo": "1-3 dias",
      "custo": "R$ 400–1200"
    }
  ],
  "riscos": [
    "Ignorar superaquecimento da GPU pode causar dano permanente ao chip gráfico",
    "Fonte subdimensionada pode queimar e levar outros componentes junto (placa-mãe, GPU)",
    "RAM com defeito pode corromper saves de jogos e arquivos do sistema",
    "Overclock instável pode degradar a vida útil do processador e GPU",
    "Drivers beta ou modificados podem causar instabilidade crônica",
    "Ignorar artefatos visuais pode significar GPU em estágio final de vida"
  ],
  "diagnostico": "Diagnóstico gamer completo:\n\n1. Monitoramento de temperaturas em tempo real (GPU, CPU, VRM)\n2. Teste de estresse com FurMark (GPU) e Prime95 (CPU) por 30 minutos\n3. Teste de memória RAM com MemTest86 (mínimo 4 passes)\n4. Verificação de fonte com multímetro (voltagens nos trilhos 12V, 5V, 3.3V)\n5. Benchmark comparativo (3DMark) vs resultado esperado para o hardware\n6. Análise de logs de crash do Windows (Event Viewer + BlueScreenView)\n7. Verificação de drivers e conflitos de software\n\nCusto: R$ 100 (incorporado se aprovar o serviço).",
  "solucao": "Solução conforme a causa:\n\n- **Drivers**: DDU (Display Driver Uninstaller) + instalação limpa do driver mais recente estável\n- **Térmico**: Limpeza completa + pasta térmica premium + otimização de curva de fan\n- **Fonte**: Troca por fonte 80 Plus Bronze/Gold com potência adequada ao setup\n- **RAM**: Troca de pente defeituoso + ativação de XMP na BIOS\n- **Storage**: Migração do jogo para SSD NVMe\n- **Software**: Otimização de Windows para gaming + remoção de overlays conflitantes\n\nTeste com os jogos que apresentavam problema por 1+ hora após o reparo.",
  "quandoCompensa": "Quase sempre — a maioria dos problemas de gaming custa R$ 100-400 para resolver. Até troca de fonte (R$ 300-600) é mais barato que um PC novo.",
  "quandoNaoCompensa": "Quando o hardware é tão antigo que não atende os requisitos mínimos do jogo (ex: GPU de 10+ anos). Nesse caso, upgrade ou PC novo é o caminho.",
  "whatsappMessage": "Olá! Meu PC está travando durante jogos. Podem me ajudar com diagnóstico?",
  "relatedPages": [
    {
      "to": "/problemas/computador-lento-curitiba",
      "label": "Computador Lento"
    },
    {
      "to": "/problemas/notebook-esquentando-desligando-curitiba",
      "label": "Notebook Esquentando"
    },
    {
      "to": "/problemas/pc-reiniciando-sozinho-curitiba",
      "label": "PC Reiniciando Sozinho"
    },
    {
      "to": "/servicos/montagem-pc",
      "label": "Montagem de PC"
    },
    {
      "to": "/servicos/upgrade-ssd-memoria",
      "label": "Upgrade SSD/Memória"
    },
    {
      "to": "/precos-e-politicas",
      "label": "Preços e Políticas"
    }
  ],
  "conteudoExtra": "## PC Gamer Travando: Guia Completo de Solução\n\n### Temperaturas Máximas Aceitáveis em Jogos\n\n| Componente | Aceitável | Preocupante | Crítico |\n|---|---|---|---|\n| CPU Intel | < 85°C | 85-95°C | > 95°C |\n| CPU AMD | < 85°C | 85-90°C | > 90°C |\n| GPU NVIDIA | < 83°C | 83-90°C | > 90°C |\n| GPU AMD | < 90°C | 90-100°C | > 100°C |\n\n### Fonte: Quanto de Potência Você Precisa?\n\n| Setup | Potência Mínima | Recomendada |\n|---|---|---|\n| GT 1030 / RX 550 | 300W | 400W |\n| GTX 1660 / RX 5600 | 450W | 550W |\n| RTX 3060 / RX 6700 | 550W | 650W |\n| RTX 4070 / RX 7800 | 650W | 750W |\n| RTX 4080/4090 | 750W | 850-1000W |\n\n### Checklist Rápido de Diagnóstico\n\n1. ✅ Temperatura da GPU durante o jogo (MSI Afterburner)\n2. ✅ Uso de RAM durante o jogo (Gerenciador de Tarefas)\n3. ✅ Driver de vídeo atualizado (GeForce Experience / AMD Software)\n4. ✅ Windows atualizado\n5. ✅ Plano de energia em \"Alto Desempenho\"\n6. ✅ Jogo instalado no SSD (não no HD)\n7. ✅ Overlays desativados (teste sem Discord/GeForce overlay)"
};
