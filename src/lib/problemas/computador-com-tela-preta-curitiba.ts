import type { ProblemaPageData } from "./types";

export const problema: ProblemaPageData = {
  "slug": "computador-com-tela-preta-curitiba",
  "title": "Computador com Tela Preta em Curitiba | Solução",
  "metaDescription": "Tela preta no computador? Veja as causas mais comuns e como resolver. Diagnóstico profissional em Curitiba com atendimento no mesmo dia.",
  "h1": "Computador com Tela Preta em Curitiba — Causas e Solução",
  "categoria": "Problemas de Computador",
  "intro": "Tela preta é um sintoma, não um diagnóstico. Pode aparecer em momentos diferentes (ao ligar, após o logo do Windows, durante o uso) e cada momento indica uma causa diferente. É um dos problemas que mais causa confusão porque o cliente não sabe se o computador está ligado ou não.\n\nA boa notícia é que a maioria dos casos de tela preta tem solução — desde que diagnosticado corretamente. O erro mais comum é assumir que \"o monitor quebrou\" ou que \"a placa de vídeo queimou\" sem testar.\n\nNesta página, diferenciamos os tipos de tela preta e explicamos o que cada um significa.",
  "sintomas": [
    {
      "titulo": "Tela preta total desde o início",
      "desc": "Nenhuma imagem em nenhum momento. Problema na saída de vídeo, RAM ou placa-mãe.",
      "gravidade": "Médio a complexo"
    },
    {
      "titulo": "Tela preta após logo do Windows",
      "desc": "BIOS aparece mas Windows não carrega. Sistema corrompido, driver com bug ou disco com falha.",
      "gravidade": "Simples a médio"
    },
    {
      "titulo": "Tela preta durante o uso",
      "desc": "Imagem some de repente. GPU superaquecendo, driver travando ou cabo com mau contato.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Tela preta com som funcionando",
      "desc": "Você ouve o Windows mas não vê nada. Problema específico de vídeo — GPU, cabo ou monitor.",
      "gravidade": "Médio"
    }
  ],
  "causas": [
    {
      "titulo": "Monitor desligado ou no canal errado",
      "desc": "Parece óbvio mas é a causa em 15% dos casos. Monitor no HDMI2 e cabo no HDMI1, por exemplo.",
      "tipo": "erro-humano"
    },
    {
      "titulo": "Driver de vídeo corrompido",
      "desc": "Após atualização do Windows ou do driver NVIDIA/AMD, o sistema pode não iniciar o display corretamente.",
      "tipo": "software"
    },
    {
      "titulo": "GPU com defeito ou superaquecimento",
      "desc": "Placa de vídeo com solda fria, capacitor estufado ou pasta térmica seca.",
      "tipo": "hardware"
    },
    {
      "titulo": "RAM com defeito",
      "desc": "Memória que impede o POST gera tela preta sem bips em algumas placas-mãe.",
      "tipo": "hardware"
    }
  ],
  "cenarios": [
    {
      "nivel": "Simples",
      "desc": "Troca de canal do monitor, troca de cabo, boot em modo seguro para corrigir driver.",
      "tempo": "30 min a 1h",
      "custo": "R$ 99,99 a R$ 150"
    },
    {
      "nivel": "Médio",
      "desc": "Reinstalação de drivers, reencaixe de GPU, limpeza + pasta térmica.",
      "tempo": "1h a 3h",
      "custo": "R$ 150 a R$ 300"
    },
    {
      "nivel": "Complexo",
      "desc": "Diagnóstico e reparo de GPU ou placa-mãe em bancada.",
      "tempo": "3 a 7 dias",
      "custo": "R$ 300 a R$ 700+"
    }
  ],
  "riscos": [
    "Comprar monitor novo achando que é o problema quando não é",
    "Trocar GPU sem diagnóstico — pode ser apenas driver",
    "Forçar desligamentos repetidos danifica o disco"
  ],
  "diagnostico": "Diagnóstico específico para tela preta: teste cruzado com outro monitor/cabo, boot em modo seguro, teste de vídeo integrado, inspeção de componentes. Custo: R$ 99,99.",
  "solucao": "Após o diagnóstico, a solução pode ser imediata (cable swap, driver fix) ou exigir bancada (reparo de GPU). Sempre com laudo completo.",
  "quandoCompensa": "Na maioria dos casos compensa — a causa geralmente é simples e o reparo tem bom custo-benefício.",
  "quandoNaoCompensa": "Não compensa quando a GPU de um computador antigo precisa de reballing caro.",
  "whatsappMessage": "Olá! Meu computador está com tela preta. Podem me ajudar?",
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
      "label": "Sem Vídeo",
      "to": "/problemas/computador-sem-video-curitiba"
    },
    {
      "label": "Computador Não Liga",
      "to": "/problemas/computador-nao-liga-curitiba"
    }
  ],
  "conteudoExtra": "### Diferença Entre Tela Preta e Sem Vídeo\n\nSão termos que os clientes usam de forma intercambiável, mas tecnicamente:\n- **Tela preta**: o monitor recebe sinal mas exibe preto (driver, Windows)\n- **Sem vídeo**: o monitor não recebe sinal algum (hardware)\n\nA distinção é importante para o diagnóstico correto."
};
