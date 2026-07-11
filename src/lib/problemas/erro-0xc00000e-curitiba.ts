import type { ProblemaPageData } from "./types";

export const problema: ProblemaPageData = {
  "slug": "erro-0xc00000e-curitiba",
  "title": "Erro 0xc00000e em Curitiba | PC Não Inicia — BCD Corrompido",
  "metaDescription": "Erro 0xc00000e no Windows em Curitiba? Reparo de BCD, boot manager e configuração de inicialização. Técnico especialista com diagnóstico rápido.",
  "h1": "Erro 0xc00000e — PC Não Inicia em Curitiba — BCD Corrompido",
  "categoria": "Erros de Windows",
  "intro": "O erro 0xc00000e é uma das telas azuis mais comuns que impedem o Windows de iniciar. Ele indica que o Boot Configuration Data (BCD) — o arquivo que diz ao sistema onde encontrar o Windows no disco — está corrompido, ausente ou referenciando uma partição incorreta.\n\nEm Curitiba, atendemos esse erro frequentemente após atualizações do Windows que falharam, clonagem de disco mal feita, ou quando o usuário adicionou/removeu um segundo HD/SSD sem reconfigurar o boot. A tela exibe \"Seu PC precisa ser reparado\" com o código 0xc000000e.",
  "sintomas": [
    {
      "titulo": "Tela azul com código 0xc000000e",
      "desc": "Ao ligar o PC, aparece tela azul de recuperação com o código de erro específico, impedindo qualquer acesso ao sistema.",
      "gravidade": "Complexo"
    },
    {
      "titulo": "Mensagem 'Seu PC precisa ser reparado'",
      "desc": "O Windows exibe tela de recuperação indicando que o dispositivo precisa ser reparado antes de iniciar.",
      "gravidade": "Médio a complexo"
    },
    {
      "titulo": "Windows não inicia após múltiplas tentativas",
      "desc": "Mesmo reiniciando várias vezes, o sistema não consegue passar da tela de erro.",
      "gravidade": "Complexo"
    },
    {
      "titulo": "Erro após atualização do Windows",
      "desc": "O problema surgiu imediatamente após uma atualização do Windows que foi interrompida ou falhou.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Problema após clonar disco ou trocar SSD",
      "desc": "Ao migrar para SSD novo, o BCD não foi transferido corretamente e o boot falha.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Tela de recuperação em loop infinito",
      "desc": "O reparo automático tenta corrigir mas falha repetidamente, entrando em ciclo.",
      "gravidade": "Complexo"
    }
  ],
  "causas": [
    {
      "titulo": "BCD corrompido",
      "desc": "O arquivo de configuração de boot foi danificado por desligamento forçado ou falha de energia durante gravação.",
      "tipo": "software"
    },
    {
      "titulo": "Clonagem de disco incorreta",
      "desc": "Ao migrar para SSD, a partição EFI/boot não foi clonada corretamente, deixando o bootloader órfão.",
      "tipo": "erro-humano"
    },
    {
      "titulo": "Atualização do Windows falhou",
      "desc": "Update interrompido por falta de energia ou desligamento corrompeu os arquivos de inicialização.",
      "tipo": "software"
    },
    {
      "titulo": "Ordem de boot alterada na BIOS",
      "desc": "BIOS/UEFI está tentando iniciar pelo disco errado após alteração manual ou reset de CMOS.",
      "tipo": "erro-humano"
    },
    {
      "titulo": "Partição EFI danificada",
      "desc": "A partição de sistema EFI (100-500MB) foi modificada ou formatada acidentalmente por software de partição.",
      "tipo": "software"
    },
    {
      "titulo": "Setores defeituosos no disco",
      "desc": "Área do disco onde o BCD está armazenado possui bad blocks, impossibilitando a leitura do bootloader.",
      "tipo": "hardware"
    }
  ],
  "cenarios": [
    {
      "nivel": "Simples",
      "desc": "Ordem de boot errada na BIOS ou BCD com referência incorreta após adição de segundo disco. Correção rápida.",
      "tempo": "20 min a 40 min",
      "custo": "Dentro da visita técnica"
    },
    {
      "nivel": "Médio",
      "desc": "BCD corrompido por atualização ou clonagem. Reconstrução com bootrec e bcdboot via ambiente de recuperação.",
      "tempo": "1h a 2h",
      "custo": "R$ 120 a R$ 200"
    },
    {
      "nivel": "Complexo",
      "desc": "Partição EFI danificada ou disco com setores defeituosos. Recriação da partição EFI ou substituição de disco.",
      "tempo": "2h a 4h",
      "custo": "R$ 200 a R$ 400 + peça"
    }
  ],
  "riscos": [
    "Usar comandos bootrec sem conhecimento pode apagar a configuração de todos os sistemas instalados",
    "Formatar a partição EFI incorreta pode tornar outros sistemas (dual boot) inacessíveis",
    "Ignorar setores defeituosos pode levar à perda de dados progressiva",
    "Tentativas repetidas de reparo automático podem agravar a corrupção"
  ],
  "diagnostico": "O diagnóstico inicia com boot via mídia de instalação do Windows (USB/DVD) para acessar o Prompt de Comando do ambiente de recuperação. Verificamos o estado do BCD com `bcdedit /enum` e identificamos se as referências de partição estão corretas.\n\nTestamos a integridade do disco com `chkdsk /r` na partição do sistema e verificamos se a partição EFI existe e está íntegra. Em sistemas UEFI, confirmamos que o tipo de partição GPT está correto. Se o erro surgiu após clonagem, verificamos se o bootloader foi transferido corretamente.",
  "solucao": "Para BCD corrompido, reconstruímos usando os comandos `bootrec /fixmbr`, `bootrec /fixboot`, `bootrec /scanos` e `bootrec /rebuildbcd` a partir do ambiente de recuperação. Em sistemas UEFI, recriamos a entrada no boot manager com `bcdboot`.\n\nSe a partição EFI foi danificada, recriamos a partição de sistema EFI e reinstalamos o bootloader. Para discos com setores defeituosos, fazemos backup dos dados e substituímos o disco. Após clonagem mal feita, reconfiguramos o BCD para apontar para as partições corretas no novo SSD.",
  "quandoCompensa": "Quando o problema é apenas de BCD corrompido e o disco está saudável — o reparo é rápido e sem perda de dados.",
  "quandoNaoCompensa": "Quando o disco possui setores defeituosos extensos na área de boot ou quando a instalação do Windows está severamente corrompida, sendo mais rápido reinstalar.",
  "whatsappMessage": "Olá! Meu PC está com erro 0xc00000e e não inicia. Preciso de reparo em Curitiba.",
  "relatedPages": [
    {
      "label": "Erro 0xc000021a",
      "to": "/problemas/erro-0xc000021a-curitiba"
    },
    {
      "label": "Tela Azul (BSOD)",
      "to": "/tela-azul-bsod-curitiba"
    },
    {
      "label": "PC Não Liga",
      "to": "/problemas/computador-nao-liga-curitiba"
    },
    {
      "label": "Formatação",
      "to": "/servicos/formatacao-computador"
    }
  ],
  "conteudoExtra": "## O Que Fazer Quando Aparece o Erro 0xc00000e\n\n1. **Não entre em pânico**: Seus dados provavelmente estão seguros — o erro é no bootloader, não nos arquivos\n2. **Verifique a ordem de boot**: Entre na BIOS (Del, F2 ou F12 ao ligar) e confirme que o disco correto está como primeiro boot\n3. **Tente o Reparo Automático**: Se o Windows oferece \"Opções avançadas\", tente \"Reparo de Inicialização\"\n4. **Não formate**: Formatar apaga seus dados — o erro pode ser resolvido sem perda\n5. **Desligue o PC**: Tentativas repetidas de ligar com disco defeituoso podem agravar o problema\n\n## Erro Após Clonagem de SSD\n\nSe o erro apareceu após migrar para um SSD novo, o problema quase certamente é que o BCD não foi transferido. Nosso técnico reconfigura o bootloader no novo SSD sem necessidade de reinstalar o Windows, preservando todos os programas e configurações."
};
