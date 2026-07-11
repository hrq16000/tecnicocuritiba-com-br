import type { ProblemaPageData } from "./types";

export const problema: ProblemaPageData = {
  "slug": "monitor-sem-sinal-curitiba",
  "title": "Monitor Sem Sinal em Curitiba | Diagnóstico e Soluções Reais",
  "metaDescription": "Monitor sem sinal? Diagnóstico profissional em Curitiba. Problema na placa de vídeo, cabo, monitor ou configuração. Atendimento rápido. WhatsApp (41) 99745-2053.",
  "h1": "Monitor Sem Sinal — Diagnóstico e Soluções Reais",
  "categoria": "Problemas de Monitor/Vídeo",
  "intro": "Ligar o computador e ver \"Sem Sinal\" ou \"No Signal\" no monitor é assustador. Você não sabe se o problema é no monitor, no cabo, na placa de vídeo ou na placa-mãe.\n\nA boa notícia: na maioria dos casos o problema é simples — cabo solto, entrada errada ou driver corrompido. Mas em casos graves, pode indicar falha na GPU ou placa-mãe.\n\nEm Curitiba, atendemos este problema diariamente. Nosso diagnóstico identifica a causa real e evita substituições desnecessárias.",
  "sintomas": [
    {
      "titulo": "Monitor exibe 'Sem Sinal' ou 'No Signal'",
      "desc": "O monitor liga mas não recebe sinal do computador.",
      "gravidade": "Simples a Complexo"
    },
    {
      "titulo": "Tela preta mas o PC parece ligado",
      "desc": "Ventoinhas giram, LEDs acendem, mas nenhuma imagem aparece.",
      "gravidade": "Médio a Complexo"
    },
    {
      "titulo": "Imagem pisca e some",
      "desc": "A imagem aparece por segundos e desaparece — cabo defeituoso ou GPU instável.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Monitor funciona em outro PC",
      "desc": "Se funciona em outro PC, o problema está na saída de vídeo do seu computador.",
      "gravidade": "Médio a Complexo"
    },
    {
      "titulo": "Resolução errada ou tela distorcida",
      "desc": "Após atualização de driver ou troca de monitor, a resolução fica errada.",
      "gravidade": "Simples"
    }
  ],
  "causas": [
    {
      "titulo": "Cabo HDMI/VGA/DP solto ou defeituoso",
      "desc": "Causa mais comum. Cabos com mau contato impedem transmissão de vídeo.",
      "tipo": "hardware"
    },
    {
      "titulo": "Entrada errada selecionada no monitor",
      "desc": "Monitor configurado para HDMI mas o cabo está no VGA.",
      "tipo": "erro-humano"
    },
    {
      "titulo": "Driver de vídeo corrompido",
      "desc": "Após atualizações do Windows, o driver da GPU pode corromper.",
      "tipo": "software"
    },
    {
      "titulo": "Placa de vídeo com defeito",
      "desc": "GPU superaquecida ou com defeito pode parar de enviar sinal.",
      "tipo": "hardware"
    },
    {
      "titulo": "Memória RAM mal encaixada",
      "desc": "RAM solta ou com oxidação impede o POST e gera tela preta.",
      "tipo": "hardware"
    }
  ],
  "cenarios": [
    {
      "nivel": "Simples",
      "desc": "Troca de cabo, reencaixe de RAM, seleção de entrada correta",
      "tempo": "15–30min",
      "custo": "R$50–R$100"
    },
    {
      "nivel": "Médio",
      "desc": "Reinstalação de driver, limpeza de contatos, teste com outra GPU",
      "tempo": "1–2h",
      "custo": "R$100–R$200"
    },
    {
      "nivel": "Complexo",
      "desc": "Substituição de placa de vídeo, reparo de saída na placa-mãe",
      "tempo": "1–3 dias",
      "custo": "R$200–R$800+"
    }
  ],
  "riscos": [
    "Forçar cabo na porta errada pode danificar o conector",
    "Ignorar superaquecimento da GPU causa dano permanente",
    "Reinstalar driver errado pode causar tela preta no Windows",
    "Trocar GPU sem conhecimento pode causar curto-circuito"
  ],
  "diagnostico": "Sequência lógica: 1) Verificar cabos; 2) Testar monitor em outro PC; 3) Testar outra saída de vídeo; 4) Verificar RAM e POST; 5) Testar com outra GPU.\n\nUsamos equipamentos de teste para verificar o sinal antes de chegar ao monitor.",
  "solucao": "Na maioria dos casos: troca de cabo (R$20-50) ou reencaixe de componentes. Para driver, usamos Modo de Segurança para reinstalar.\n\nQuando a GPU está com defeito, avaliamos reparo vs. substituição com transparência.",
  "quandoCompensa": "Quando o problema é cabo, driver ou RAM — custo baixo e solução rápida.",
  "quandoNaoCompensa": "Quando a GPU dedicada queimou e custa mais de 60% do valor do PC.",
  "whatsappMessage": "Olá! Meu monitor está sem sinal. Preciso de diagnóstico.",
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
      "label": "Computador Sem Vídeo",
      "to": "/problemas/computador-sem-video-curitiba"
    },
    {
      "label": "Tela Preta",
      "to": "/problemas/computador-com-tela-preta-curitiba"
    },
    {
      "label": "GPU Desgastada",
      "to": "/problemas/gpu-desgastada"
    },
    {
      "label": "PC Não Liga",
      "to": "/problemas/computador-nao-liga-curitiba"
    }
  ],
  "conteudoExtra": "## Guia Completo: Monitor Sem Sinal em Curitiba\n\n### Diagnóstico Rápido\n\n1. **Verifique o cabo** nas duas pontas\n2. **Pressione o botão de entrada** do monitor (HDMI/VGA/DP)\n3. **Teste com outro cabo**\n4. **Conecte em outro PC** para descartar defeito do monitor\n5. **Ouça se o PC emite bips** — indicam erro de hardware\n\n### Sintoma → Causa Provável\n\n| Sintoma | Causa | Custo |\n|---|---|---|\n| \"No Signal\" com PC ligado | Cabo ou entrada errada | R$50–R$100 |\n| Tela preta + bips | RAM solta | R$80–R$150 |\n| Imagem pisca e some | Cabo ou GPU instável | R$100–R$300 |\n| HDMI não funciona, VGA sim | Porta HDMI queimada | R$150–R$400 |\n| Nenhuma saída funciona | GPU ou placa-mãe | R$200–R$800 |\n\n### Tipos de Cabo e Problemas\n\n- **HDMI**: Sensível a mau contato. Versão importa (1.4/2.0/2.1)\n- **VGA**: Analógico, robusto mas qualidade inferior. Pinos entortados\n- **DisplayPort**: Confiável mas não puxe sem apertar a trava\n- **DVI**: Menos comum. Problemas com adaptadores\n\n### Atendimento em Curitiba e Região\n\nDiagnosticamos problemas de monitor/vídeo em toda Curitiba e região metropolitana. Levamos cabos de teste no atendimento a domicílio."
};
