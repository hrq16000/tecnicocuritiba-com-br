import type { ProblemaPageData } from "./types";

export const problema: ProblemaPageData = {
  "slug": "pc-com-tela-preta-curitiba",
  "title": "PC com Tela Preta em Curitiba — Diagnóstico e Reparo",
  "metaDescription": "Computador ou notebook com tela preta em Curitiba? Diagnóstico identifica se é placa de vídeo, RAM, monitor ou sistema. Atendimento rápido.",
  "h1": "PC com Tela Preta — Diagnóstico e Reparo em Curitiba",
  "categoria": "Hardware — Vídeo",
  "intro": "Ligar o computador e não ver nada na tela é desesperador. O PC com tela preta pode ter causas simples — como cabo HDMI solto — ou graves, como placa de vídeo queimada ou placa-mãe com defeito.\n\nO mais importante é não entrar em pânico e não ficar reiniciando sem parar. Cada reinicialização forçada pode agravar o problema se a causa for um componente em curto.\n\nEm Curitiba, nosso diagnóstico identifica a causa exata da tela preta — e só então propomos o reparo adequado. Trabalhamos com desktops e notebooks de todas as marcas.",
  "sintomas": [
    {
      "titulo": "Tela totalmente preta, sem sinal",
      "desc": "Monitor/tela não recebe nenhum sinal — pode ser cabo, placa de vídeo ou RAM.",
      "gravidade": "Alta"
    },
    {
      "titulo": "Tela preta com cursor piscando",
      "desc": "O hardware funciona mas o sistema operacional não carregou corretamente.",
      "gravidade": "Média"
    },
    {
      "titulo": "Tela preta após logo do Windows",
      "desc": "Problema de software: driver de vídeo, atualização corrompida ou perfil de usuário.",
      "gravidade": "Média"
    },
    {
      "titulo": "Tela preta com bipes ao ligar",
      "desc": "POST falhou — o padrão de bipes indica qual componente está com defeito.",
      "gravidade": "Alta"
    },
    {
      "titulo": "Tela pisca e apaga",
      "desc": "Backlight do monitor/tela com defeito ou inversor queimado (notebooks).",
      "gravidade": "Média"
    },
    {
      "titulo": "Tela preta intermitente",
      "desc": "Problema de contato no cabo flat (notebook) ou placa de vídeo instável.",
      "gravidade": "Alta"
    }
  ],
  "causas": [
    {
      "titulo": "Memória RAM mal encaixada ou com defeito",
      "desc": "RAM com mau contato é a causa mais comum de tela preta. Basta reencaixar.",
      "tipo": "hardware"
    },
    {
      "titulo": "Placa de vídeo com defeito",
      "desc": "GPU queimada, superaquecida ou com solda BGA trincada.",
      "tipo": "hardware"
    },
    {
      "titulo": "Cabo de vídeo desconectado ou defeituoso",
      "desc": "Cabo HDMI, VGA ou DisplayPort com mau contato ou rompido.",
      "tipo": "hardware"
    },
    {
      "titulo": "Monitor com defeito",
      "desc": "Backlight queimado, placa de controle do monitor ou cabo flat danificado.",
      "tipo": "hardware"
    },
    {
      "titulo": "Driver de vídeo corrompido",
      "desc": "Após atualização do Windows, o driver de vídeo pode ficar incompatível.",
      "tipo": "software"
    },
    {
      "titulo": "Fonte de alimentação insuficiente",
      "desc": "Fonte sem potência para alimentar a placa de vídeo = tela preta.",
      "tipo": "hardware"
    }
  ],
  "cenarios": [
    {
      "nivel": "Simples",
      "desc": "Reencaixe de RAM, troca de cabo ou ajuste de saída de vídeo.",
      "tempo": "30min a 1h",
      "custo": "R$ 99,99 a R$ 150"
    },
    {
      "nivel": "Médio",
      "desc": "Reinstalação de driver de vídeo em modo seguro ou troca de monitor.",
      "tempo": "1h a 3h",
      "custo": "R$ 120 a R$ 300"
    },
    {
      "nivel": "Complexo",
      "desc": "Troca de placa de vídeo, reparo de GPU (reballing) ou substituição de tela.",
      "tempo": "2 a 7 dias",
      "custo": "R$ 300 a R$ 1.200"
    }
  ],
  "riscos": [
    "Reinicializações forçadas repetidas podem corromper o sistema de arquivos e causar perda de dados",
    "Placa de vídeo superaquecida continua danificando a solda BGA a cada uso",
    "Fonte subdimensionada pode queimar componentes além da GPU",
    "Ignorar bipes de erro pode resultar em dano progressivo à placa-mãe",
    "Tentar trocar RAM ou GPU sem aterramento pode causar descarga eletrostática"
  ],
  "diagnostico": "Diagnóstico sistemático para tela preta:\n\n1. Verificação de cabos e conexões externas\n2. Teste com monitor externo (notebook) ou outro monitor (desktop)\n3. Teste de RAM (reencaixe e teste individual de cada pente)\n4. Verificação de bipes/LEDs de diagnóstico do POST\n5. Teste de placa de vídeo dedicada vs integrada\n6. Boot em modo seguro para descartar problemas de driver\n7. Teste de fonte com multímetro\n\nCusto: R$ 99,99 (incorporado se aprovar o serviço).",
  "solucao": "Solução conforme a causa:\n\n- **RAM**: Limpeza dos contatos e reencaixe (ou substituição se defeituosa)\n- **Placa de vídeo**: Substituição ou reparo (reballing em casos específicos)\n- **Cabo/Monitor**: Troca do cabo ou reparo/troca do monitor\n- **Driver**: Reinstalação em modo seguro ou reversão de atualização\n- **Fonte**: Upgrade para fonte com potência adequada\n\nTeste completo de estresse após o reparo para garantir estabilidade.",
  "quandoCompensa": "Na maioria dos casos — o problema pode ser tão simples quanto um pente de RAM solto (R$ 99,99). Mesmo troca de placa de vídeo compensa se o restante do PC é atual.",
  "quandoNaoCompensa": "Quando envolve GPU integrada na placa-mãe de notebook antigo (reparo de BGA caro e sem garantia de durabilidade) e o notebook já tem mais de 5-6 anos.",
  "whatsappMessage": "Olá! Meu computador está com tela preta ao ligar. Podem fazer um diagnóstico?",
  "relatedPages": [
    {
      "to": "/problemas/computador-nao-liga-curitiba",
      "label": "Computador Não Liga"
    },
    {
      "to": "/problemas/placa-mae-com-defeito-curitiba",
      "label": "Placa-Mãe com Defeito"
    },
    {
      "to": "/tela-azul-curitiba",
      "label": "Tela Azul (BSOD)"
    },
    {
      "to": "/servicos/conserto-pc-notebook",
      "label": "Conserto PC/Notebook"
    },
    {
      "to": "/servicos/conserto-placa",
      "label": "Conserto de Placa"
    },
    {
      "to": "/como-funciona",
      "label": "Como Funciona"
    }
  ],
  "conteudoExtra": "## Guia: Como Identificar a Causa da Tela Preta\n\nAntes de chamar o técnico, observe estes detalhes:\n\n### Checklist Rápido\n\n1. **O PC liga?** (ventoinhas giram, LEDs acendem)\n   - Sim → Problema é vídeo/monitor\n   - Não → Problema é energia/placa-mãe\n\n2. **Há bipes ao ligar?**\n   - 1 bipe curto = POST OK (problema é no monitor/cabo)\n   - 3 bipes curtos = RAM com defeito\n   - 1 longo + 3 curtos = Placa de vídeo\n\n3. **Funciona com monitor externo?** (para notebooks)\n   - Sim → Tela/cabo flat do notebook com defeito\n   - Não → GPU ou placa-mãe\n\n### Tabela de Diagnóstico por Sintoma\n\n| Situação | Causa Mais Provável | Custo Médio |\n|---|---|---|\n| Tela preta + ventoinhas ligam | RAM ou cabo | R$ 99,99-150 |\n| Tela preta + bipes | RAM ou GPU | R$ 99,99-400 |\n| Tela preta após atualização | Driver de vídeo | R$ 120-200 |\n| Tela preta + cursor | Sistema corrompido | R$ 150-250 |\n| Tela preta intermitente | Cabo flat ou GPU | R$ 150-600 |\n| Nada funciona | Fonte ou placa-mãe | R$ 200-800 |\n\n### Erro Comum: \"Tentei Trocar a RAM e Não Resolveu\"\n\nTrocar RAM sem diagnóstico pode ser inútil. O problema pode estar no slot da placa-mãe, não na memória. Um técnico testa cada slot individualmente e identifica se o defeito é do pente ou do encaixe.\n\n### Desktop vs. Notebook: Diferenças\n\n**Desktop** — Mais fácil de diagnosticar: componentes são removíveis e testáveis individualmente. Placa de vídeo pode ser trocada facilmente.\n\n**Notebook** — GPU geralmente soldada na placa-mãe. Se a GPU falhar, pode ser necessário reballing (resoldagem) ou troca de placa inteira."
};
