import type { ProblemaPageData } from "./types";

export const problema: ProblemaPageData = {
  "slug": "pc-sem-imagem-curitiba",
  "title": "PC Sem Imagem no Monitor em Curitiba | Diagnóstico Especializado",
  "metaDescription": "PC liga mas não aparece imagem no monitor? Técnico em Curitiba diagnostica e resolve problemas de vídeo, GPU, cabo e placa-mãe. Atendimento rápido.",
  "h1": "PC Sem Imagem no Monitor — Diagnóstico e Reparo em Curitiba",
  "categoria": "Hardware — Vídeo",
  "intro": "O computador liga, os LEDs acendem, a ventoinha gira, mas o monitor fica preto sem nenhuma imagem? Esse é um dos problemas mais comuns e ao mesmo tempo mais difíceis de diagnosticar sem experiência, porque a causa pode estar em qualquer ponto da cadeia: monitor, cabo, placa de vídeo, memória RAM, processador ou placa-mãe.\n\nA primeira coisa a entender é: \"sem imagem\" é diferente de \"tela preta com cursor\". Se o monitor mostra \"sem sinal\" ou fica completamente apagado, o problema está antes do sistema operacional — é hardware. Se aparece o logo do Windows e depois fica preto, geralmente é software.\n\nEm Curitiba, atendemos esse problema diariamente. Na maioria dos casos, a causa é simples: cabo HDMI/VGA solto, RAM mal encaixada ou monitor na entrada errada. Mas também pode indicar GPU queimada ou placa-mãe com defeito, especialmente após quedas de energia.",
  "sintomas": [
    {
      "titulo": "Monitor mostra 'Sem Sinal' (No Signal)",
      "desc": "O monitor está funcionando mas não recebe sinal de vídeo do computador. Pode ser cabo, entrada errada, GPU ou RAM.",
      "gravidade": "Média"
    },
    {
      "titulo": "PC liga mas monitor fica totalmente preto",
      "desc": "Ventoinhas giram, LEDs acendem, mas nenhuma imagem aparece. O monitor pode estar desligado, em standby ou sem receber sinal.",
      "gravidade": "Média-Alta"
    },
    {
      "titulo": "Imagem aparece por segundos e some",
      "desc": "A imagem pisca brevemente durante o boot e depois desaparece. Pode indicar GPU com mau contato ou superaquecimento.",
      "gravidade": "Alta"
    },
    {
      "titulo": "Bipes ao ligar sem imagem",
      "desc": "O PC emite sequência de bipes ao ligar e não mostra imagem. Os bipes indicam o tipo de erro — geralmente RAM ou GPU.",
      "gravidade": "Média-Alta"
    },
    {
      "titulo": "Monitor funciona em outro PC",
      "desc": "Testou o monitor em outro computador e funciona. O problema está no PC — GPU, cabo, RAM ou placa-mãe.",
      "gravidade": "Média"
    },
    {
      "titulo": "Ventoinhas giram forte mas sem imagem",
      "desc": "O cooler da GPU gira no máximo e não há imagem. Indica que o POST não completa — o sistema trava antes de inicializar vídeo.",
      "gravidade": "Alta"
    }
  ],
  "causas": [
    {
      "titulo": "Cabo de vídeo solto ou defeituoso",
      "desc": "Cabos HDMI, DisplayPort e VGA podem ter mau contato ou fio rompido internamente. É a causa mais simples e a primeira a verificar.",
      "tipo": "hardware"
    },
    {
      "titulo": "Memória RAM mal encaixada ou com defeito",
      "desc": "RAM fora do slot ou com oxidação nos contatos impede o POST. Sem completar o POST, não há sinal de vídeo. Solução: reencaixar ou limpar contatos.",
      "tipo": "hardware"
    },
    {
      "titulo": "Placa de vídeo com defeito",
      "desc": "GPU queimada, com solda BGA trincada ou superaquecimento. Pode falhar gradualmente (artefatos) ou de repente (sem imagem total).",
      "tipo": "hardware"
    },
    {
      "titulo": "Saída de vídeo errada selecionada",
      "desc": "PC com vídeo integrado e placa dedicada — o cabo pode estar na saída errada. Ao instalar GPU, o vídeo integrado geralmente é desabilitado.",
      "tipo": "erro-humano"
    },
    {
      "titulo": "Placa-mãe com defeito no slot PCIe ou VRM",
      "desc": "Problemas no slot da placa de vídeo ou nos reguladores de tensão da placa-mãe impedem a GPU de funcionar.",
      "tipo": "hardware"
    },
    {
      "titulo": "Processador sem vídeo integrado",
      "desc": "CPUs como Ryzen sem 'G' (ex: Ryzen 5 5600) não têm vídeo integrado. Sem GPU dedicada, não há saída de vídeo.",
      "tipo": "erro-humano"
    }
  ],
  "cenarios": [
    {
      "nivel": "Simples",
      "desc": "Troca de cabo, reencaixe de RAM ou ajuste de saída de vídeo. Resolve 50% dos casos.",
      "tempo": "30-60 min",
      "custo": "R$ 80–150"
    },
    {
      "nivel": "Médio",
      "desc": "Diagnóstico de GPU + teste com outra placa + limpeza de contatos oxidados.",
      "tempo": "1-3 horas",
      "custo": "R$ 150–300"
    },
    {
      "nivel": "Complexo",
      "desc": "Troca de placa de vídeo ou reparo de placa-mãe (slot PCIe, VRM). Pode exigir peça nova.",
      "tempo": "1-5 dias",
      "custo": "R$ 300–1500+"
    }
  ],
  "riscos": [
    "Forçar cabo em entrada errada pode danificar os conectores",
    "Ignorar bipes de erro e continuar ligando pode piorar danos na placa-mãe",
    "Usar GPU em slot PCIe com defeito pode queimar a placa de vídeo nova",
    "Tentar reballing caseiro de GPU com secador/forno causa mais dano",
    "Comprar GPU nova sem diagnosticar pode ser desperdício se o problema é na placa-mãe",
    "Desmontar notebook sem experiência pode romper cabos flat do display"
  ],
  "diagnostico": "Diagnóstico de vídeo completo:\n\n1. Teste com outro cabo (HDMI, DP, VGA)\n2. Teste com outro monitor/TV\n3. Verificação de RAM (reencaixe, teste individual de cada pente)\n4. Teste de POST (beep codes)\n5. Teste com GPU alternativa\n6. Teste de vídeo integrado (remover GPU dedicada)\n7. Verificação de fonte (voltagem nos trilhos PCIe)\n\nCusto: R$ 99,99 (incorporado se aprovar o serviço).",
  "solucao": "Solução conforme a causa:\n\n- **Cabo**: Troca por cabo novo de qualidade certificada\n- **RAM**: Limpeza dos contatos com borracha + reencaixe firme\n- **GPU**: Troca da placa de vídeo ou reparo de solda BGA profissional\n- **Saída errada**: Redirecionamento do cabo para a saída correta + configuração de BIOS\n- **Placa-mãe**: Reparo do slot PCIe ou VRM (quando viável) ou troca\n\nTeste completo com monitor e resolução nativa após o reparo.",
  "quandoCompensa": "Na maioria dos casos — problemas simples (cabo, RAM) custam R$ 80-150. Mesmo troca de GPU vale se o restante do PC é bom.",
  "quandoNaoCompensa": "Quando a placa-mãe e GPU precisam de troca e o PC tem mais de 8 anos — o custo de peças supera o valor de um PC usado equivalente.",
  "whatsappMessage": "Olá! Meu PC liga mas não aparece imagem no monitor. Podem me ajudar?",
  "relatedPages": [
    {
      "to": "/problemas/monitor-sem-sinal-curitiba",
      "label": "Monitor Sem Sinal"
    },
    {
      "to": "/problemas/pc-com-tela-preta-curitiba",
      "label": "PC com Tela Preta"
    },
    {
      "to": "/problemas/computador-nao-liga-curitiba",
      "label": "Computador Não Liga"
    },
    {
      "to": "/problemas/erro-bios-curitiba",
      "label": "Erro de BIOS"
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
  "conteudoExtra": "## PC Sem Imagem: Guia Completo de Diagnóstico\n\n### Fluxograma de Diagnóstico Rápido\n\n1. Monitor liga? → Se não, verifique cabo de força e botão do monitor\n2. Monitor mostra \"sem sinal\"? → Troque o cabo HDMI/DP\n3. PC emite bipes? → Consulte tabela de beep codes\n4. Tem GPU dedicada? → Teste na saída de vídeo integrada\n5. Reencaixe a RAM → Resolve 30% dos casos\n\n### Tipos de Cabo de Vídeo\n\n| Cabo | Resolução Máx | Áudio | Observação |\n|---|---|---|---|\n| VGA | 1920x1080 | Não | Analógico, evite |\n| DVI-D | 2560x1600 | Não | Digital, bom |\n| HDMI 2.0 | 4K 60Hz | Sim | Mais comum |\n| HDMI 2.1 | 4K 120Hz | Sim | Para gaming |\n| DisplayPort 1.4 | 4K 120Hz | Sim | Melhor para PC |\n\n### Beep Codes Relacionados a Vídeo\n\n| Fabricante | Padrão | Significado |\n|---|---|---|\n| Award | 1 longo + 2 curtos | Erro de GPU/vídeo |\n| AMI | 8 curtos | Erro de memória de vídeo |\n| Intel | 2 curtos | Erro de vídeo |\n| Phoenix | 1-2-2-3 | Verificação de ROM de vídeo falhou |"
};
