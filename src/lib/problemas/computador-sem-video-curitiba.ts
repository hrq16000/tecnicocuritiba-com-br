import type { ProblemaPageData } from "./types";

export const problema: ProblemaPageData = {
  "slug": "computador-sem-video-curitiba",
  "title": "Computador Sem Vídeo em Curitiba | Tela Preta",
  "metaDescription": "Computador liga mas não exibe imagem? Veja causas e soluções. Diagnóstico de GPU, RAM e placa-mãe em Curitiba. Atendimento técnico no mesmo dia.",
  "h1": "Computador Sem Vídeo em Curitiba — Liga Mas Tela Fica Preta",
  "categoria": "Problemas de Computador",
  "intro": "O computador liga — você ouve ventoinhas, vê LEDs — mas o monitor continua preto. Esse é um problema extremamente comum e que pode ter causas variadas, desde algo trivial como cabo de vídeo solto até problemas sérios como GPU queimada.\n\nO importante é entender que \"sem vídeo\" não é o mesmo que \"não liga\". Se o computador mostra sinais de vida (LEDs, ventoinhas, sons), o problema está especificamente na saída de vídeo ou nos componentes responsáveis pela inicialização visual.\n\nEm Curitiba e região, atendemos esse tipo de caso com diagnóstico profissional que identifica a causa exata em vez de trocar peças por achismo.",
  "sintomas": [
    {
      "titulo": "Tela completamente preta",
      "desc": "Monitor não recebe sinal algum. GPU, RAM ou placa-mãe podem ser a causa.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Tela preta com cursor piscando",
      "desc": "Windows não carrega mas há sinal de vídeo. Boot corrompido ou disco com falha.",
      "gravidade": "Simples a médio"
    },
    {
      "titulo": "Imagem distorcida ou com artefatos",
      "desc": "Pixels coloridos, listras ou imagem embaralhada. GPU com defeito ou driver corrompido.",
      "gravidade": "Médio a complexo"
    },
    {
      "titulo": "Funciona no integrado mas não na placa de vídeo",
      "desc": "Monitor funciona conectado na placa-mãe mas não na GPU. Placa de vídeo com defeito.",
      "gravidade": "Médio"
    }
  ],
  "causas": [
    {
      "titulo": "Cabo de vídeo ou monitor",
      "desc": "Cabo HDMI/VGA/DisplayPort com defeito ou monitor configurado no canal errado. É a causa mais simples e mais comum.",
      "tipo": "hardware"
    },
    {
      "titulo": "Memória RAM mal encaixada ou oxidada",
      "desc": "RAM fora do slot ou com contatos sujos impede o POST. O computador liga mas não inicia o vídeo.",
      "tipo": "hardware"
    },
    {
      "titulo": "GPU com defeito",
      "desc": "Placa de vídeo queimada, com solda fria ou degradada por calor excessivo. Comum em GPUs antigas ou usadas em mineração.",
      "tipo": "hardware"
    },
    {
      "titulo": "BIOS corrompida",
      "desc": "Atualização de BIOS que falhou ou corrupção por queda de energia pode impedir a inicialização visual.",
      "tipo": "software"
    },
    {
      "titulo": "Processador ou socket danificado",
      "desc": "Pinos tortos no socket ou processador com defeito podem impedir o POST. Menos comum mas possível.",
      "tipo": "hardware"
    }
  ],
  "cenarios": [
    {
      "nivel": "Simples",
      "desc": "Troca de cabo, reencaixe de RAM, limpeza de contatos. Resolvido na visita.",
      "tempo": "30 min a 1h",
      "custo": "R$ 99,99 a R$ 150"
    },
    {
      "nivel": "Médio",
      "desc": "Teste e substituição de GPU, reinstalação de drivers em modo seguro.",
      "tempo": "1h a 3h",
      "custo": "R$ 150 a R$ 350"
    },
    {
      "nivel": "Complexo",
      "desc": "Reparo de GPU (reballing), recuperação de BIOS, diagnóstico de placa-mãe.",
      "tempo": "3 a 7 dias",
      "custo": "R$ 300 a R$ 800+"
    }
  ],
  "riscos": [
    "Forçar cabo no conector errado pode danificar a saída de vídeo",
    "Trocar GPU sem diagnóstico pode desperdiçar dinheiro se o problema é outro",
    "Reballing caseiro destrói a GPU definitivamente",
    "Tentar atualizar BIOS sem conhecimento pode inutilizar a placa-mãe"
  ],
  "diagnostico": "Diagnóstico de vídeo inclui: teste com monitor e cabo alternativos, reencaixe de RAM e GPU, teste de vídeo integrado vs dedicado, verificação de BIOS e inspeção visual da placa-mãe. Custo: R$ 99,99.",
  "solucao": "Identificada a causa, o reparo varia. Para cabo/monitor: solução imediata. Para RAM: limpeza e reencaixe. Para GPU: substituição ou reballing em bancada. Sempre com laudo e aprovação antes da execução.",
  "quandoCompensa": "Compensa quando é apenas cabo, RAM ou driver. Para GPU, depende do valor da placa e do custo do reparo.",
  "quandoNaoCompensa": "Não compensa reballing de GPU de baixo valor ou reparo de placa-mãe com múltiplos defeitos.",
  "whatsappMessage": "Olá! Meu computador liga mas a tela fica preta. Podem me ajudar?",
  "relatedPages": [
    {
      "label": "Como Funciona",
      "to": "/como-funciona"
    },
    {
      "label": "Preços e Políticas",
      "to": "/precos-e-politicas"
    },
    {
      "label": "Diagnóstico Técnico",
      "to": "/diagnostico-tecnico"
    },
    {
      "label": "Computador Não Liga",
      "to": "/problemas/computador-nao-liga-curitiba"
    },
    {
      "label": "Tela Preta",
      "to": "/problemas/computador-com-tela-preta-curitiba"
    },
    {
      "label": "GPU Desgastada",
      "to": "/problemas/gpu-desgastada"
    }
  ],
  "conteudoExtra": "### Teste Rápido Antes de Chamar o Técnico\n\n1. Verifique se o monitor está ligado e no canal correto (HDMI, VGA, etc.)\n2. Teste outro cabo de vídeo se possível\n3. Se tem vídeo integrado na placa-mãe, teste conectando o monitor nela\n4. Ouça se há bips — eles indicam qual componente falhou\n\n### Atendimento em Curitiba\n\nAtendemos toda Curitiba e região com diagnóstico de vídeo no mesmo dia. Para casos que precisam de bancada, fazemos coleta e entrega."
};
