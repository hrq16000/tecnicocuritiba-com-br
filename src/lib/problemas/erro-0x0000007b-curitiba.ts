import type { ProblemaPageData } from "./types";

export const problema: ProblemaPageData = {
  "slug": "erro-0x0000007b-curitiba",
  "title": "Erro 0x0000007B (INACCESSIBLE_BOOT_DEVICE) Curitiba | Reparo Especializado",
  "metaDescription": "Erro 0x0000007B INACCESSIBLE_BOOT_DEVICE? Técnico em Curitiba resolve tela azul na inicialização com diagnóstico de disco, BIOS e drivers de armazenamento.",
  "h1": "Erro 0x0000007B (INACCESSIBLE_BOOT_DEVICE) — Reparo em Curitiba",
  "categoria": "Software / Hardware",
  "intro": "O erro 0x0000007B — também conhecido como INACCESSIBLE_BOOT_DEVICE — é uma das telas azuis (BSOD) mais temidas do Windows. Ele aparece durante a inicialização e impede completamente o carregamento do sistema operacional. A tela exibe a mensagem \"Your PC ran into a problem\" seguida do código de parada INACCESSIBLE_BOOT_DEVICE.\n\nEsse erro significa que o Windows não consegue acessar o dispositivo de armazenamento (HD ou SSD) onde está instalado. As causas vão desde configurações erradas na BIOS (modo AHCI/IDE) até falhas físicas no disco, cabo SATA danificado ou drivers de armazenamento corrompidos.\n\nEm Curitiba, esse é um erro frequente após atualizações do Windows, troca de placa-mãe, clonagem de disco mal-feita ou quando o HD/SSD começa a apresentar defeitos. Sem diagnóstico correto, tentativas de reparo podem piorar a situação e até causar perda de dados.",
  "sintomas": [
    {
      "titulo": "Tela azul com código 0x0000007B na inicialização",
      "desc": "O Windows não chega a carregar e exibe a BSOD com o código de parada. Sistema completamente inacessível.",
      "gravidade": "Alto"
    },
    {
      "titulo": "Loop de reparo automático",
      "desc": "O Windows tenta reparar a inicialização repetidamente sem sucesso, alternando entre tela azul e tela de reparo.",
      "gravidade": "Alto"
    },
    {
      "titulo": "Erro após atualização do Windows",
      "desc": "O sistema funcionava normalmente, atualizou e na próxima reinicialização deu o erro 0x0000007B.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Erro após troca de hardware",
      "desc": "Trocou placa-mãe, adicionou SSD ou alterou configurações da BIOS e o erro começou.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Erro intermitente",
      "desc": "O computador às vezes inicia normalmente e às vezes dá o erro. Indica problema físico no disco ou cabo SATA.",
      "gravidade": "Alto"
    },
    {
      "titulo": "Disco não aparece na BIOS",
      "desc": "Além do erro no Windows, a própria BIOS não detecta o HD/SSD. Indica falha física grave.",
      "gravidade": "Alto"
    }
  ],
  "causas": [
    {
      "titulo": "Modo SATA alterado na BIOS (AHCI/IDE/RAID)",
      "desc": "A mudança do modo de operação SATA na BIOS sem preparar o Windows causa o erro porque os drivers de armazenamento são incompatíveis.",
      "tipo": "software"
    },
    {
      "titulo": "Drivers de armazenamento corrompidos",
      "desc": "O driver iaStorV, storahci ou outro driver de controladora de disco pode corromper após atualização falha ou malware.",
      "tipo": "software"
    },
    {
      "titulo": "Cabo SATA defeituoso",
      "desc": "Cabo SATA com mau contato ou rompimento interno impede a comunicação estável entre a placa-mãe e o disco.",
      "tipo": "hardware"
    },
    {
      "titulo": "HD/SSD com setores defeituosos no boot",
      "desc": "Setores ruins na área de inicialização do disco impedem a leitura dos arquivos de boot do Windows.",
      "tipo": "hardware"
    },
    {
      "titulo": "BCD (Boot Configuration Data) corrompido",
      "desc": "O registro de inicialização do Windows foi danificado, apontando para um dispositivo incorreto ou inexistente.",
      "tipo": "software"
    },
    {
      "titulo": "Clonagem de disco mal-feita",
      "desc": "Ao clonar um HD para SSD sem ajustar o modo SATA ou o esquema de partição (MBR/GPT), o boot falha.",
      "tipo": "erro-humano"
    }
  ],
  "cenarios": [
    {
      "nivel": "Simples",
      "desc": "Configuração BIOS incorreta (AHCI/IDE) — ajuste na BIOS e/ou ativação do driver correto via registro offline resolve.",
      "tempo": "1-2 horas",
      "custo": "R$80–R$150"
    },
    {
      "nivel": "Médio",
      "desc": "BCD corrompido ou drivers danificados — reparo via WinPE com bootrec, bcdedit e injeção de drivers.",
      "tempo": "2-4 horas",
      "custo": "R$150–R$300"
    },
    {
      "nivel": "Complexo",
      "desc": "Disco com falha física — necessita substituição do disco, reinstalação do Windows e recuperação de dados.",
      "tempo": "4-24 horas",
      "custo": "R$250–R$600"
    }
  ],
  "riscos": [
    "Tentativas de reparo sem conhecimento podem sobrescrever o BCD e tornar a recuperação impossível",
    "Alterar configurações na BIOS aleatoriamente pode agravar o problema",
    "Se o disco tem defeito físico, cada tentativa de boot pode danificar mais setores",
    "Formatação sem diagnóstico correto não resolve se o problema é hardware"
  ],
  "diagnostico": "O diagnóstico do erro 0x0000007B segue uma sequência lógica:\n\n1. Verificação da BIOS: modo SATA (AHCI/IDE/RAID), ordem de boot e detecção do disco.\n\n2. Boot via WinPE ou Linux Live para acessar o disco sem depender do Windows instalado.\n\n3. Teste de integridade do disco: SMART (via CrystalDiskInfo), teste de superfície e verificação de setores na área de boot.\n\n4. Análise do BCD e dos drivers de armazenamento instalados no Windows offline.\n\n5. Teste de cabos SATA e portas SATA alternativas na placa-mãe.\n\n6. Verificação do dump de memória (minidump) quando disponível para confirmar o driver causador.",
  "solucao": "A solução é aplicada conforme a causa identificada:\n\n**Modo SATA incorreto**: Ajuste na BIOS para o modo original (AHCI ou IDE). Se precisar mudar o modo, primeiro ativamos o driver correspondente via registro offline antes de alterar a BIOS.\n\n**BCD corrompido**: Usamos o ambiente de recuperação do Windows (WinRE) com os comandos bootrec /fixmbr, bootrec /fixboot, bootrec /rebuildbcd para reconstruir a configuração de inicialização.\n\n**Drivers corrompidos**: Injeção de drivers de armazenamento corretos via DISM offline ou modificação do registro para ativar o driver genérico storahci.\n\n**Falha no disco**: Substituição do HD/SSD defeituoso, reinstalação limpa do Windows e recuperação de dados do disco antigo (quando possível).\n\n**Cabo SATA**: Substituição do cabo e teste em porta SATA alternativa.",
  "quandoCompensa": "Sempre compensa diagnosticar — o reparo de software (BIOS, BCD, drivers) é rápido e barato. Mesmo troca de disco compensa se os dados são importantes.",
  "quandoNaoCompensa": "Se o disco tem falha física grave E não há dados importantes, pode ser mais rápido substituir o disco e reinstalar tudo do zero.",
  "whatsappMessage": "Olá! Meu computador está dando erro 0x0000007B (INACCESSIBLE_BOOT_DEVICE). Preciso de ajuda.",
  "relatedPages": [
    {
      "to": "/tela-azul-curitiba",
      "label": "Tela Azul (BSOD)"
    },
    {
      "to": "/problemas/computador-nao-liga-curitiba",
      "label": "PC Não Liga"
    },
    {
      "to": "/problemas/erro-driver-windows-curitiba",
      "label": "Erro de Driver"
    },
    {
      "to": "/hd-com-defeito-curitiba",
      "label": "HD com Defeito"
    },
    {
      "to": "/problemas/erro-particao-windows-curitiba",
      "label": "Erro de Partição"
    },
    {
      "to": "/diagnostico-tecnico",
      "label": "Diagnóstico Técnico"
    }
  ],
  "conteudoExtra": "## Entendendo o Erro 0x0000007B\n\n### O Que o Código Significa\nO código 0x0000007B traduz-se como INACCESSIBLE_BOOT_DEVICE. Em termos simples: o Windows encontrou o kernel na memória, mas quando tentou acessar o disco para continuar carregando, não conseguiu.\n\n### Diferença Entre AHCI e IDE\n- **AHCI** (Advanced Host Controller Interface): modo moderno, suporta NCQ, hot-swap e melhor desempenho com SSDs\n- **IDE** (Legacy): modo de compatibilidade antigo, mais lento, sem recursos avançados\n- O Windows instala drivers específicos para o modo selecionado. Mudar sem preparação causa o erro 0x0000007B\n\n### Prevenção\n- Antes de alterar a BIOS, crie um ponto de restauração\n- Ao clonar discos, use ferramentas que ajustam automaticamente o esquema de partição\n- Mantenha um pen drive de recuperação do Windows atualizado"
};
