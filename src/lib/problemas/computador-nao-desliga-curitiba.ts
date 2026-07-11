import type { ProblemaPageData } from "./types";

export const problema: ProblemaPageData = {
  "slug": "computador-nao-desliga-curitiba",
  "title": "Computador Não Desliga em Curitiba | Diagnóstico Técnico",
  "metaDescription": "Computador não desliga ou fica na tela de desligamento? Técnico em Curitiba resolve problema de shutdown, driver e energia.",
  "h1": "Computador Não Desliga — Diagnóstico e Solução em Curitiba",
  "categoria": "Sistema Operacional",
  "intro": "Clicar em \"Desligar\" e o computador ficar preso na tela de encerramento ou simplesmente não desligar é um problema mais comum do que parece. Isso pode acontecer por processos travados, drivers incompatíveis, atualizações pendentes ou problemas na configuração de energia.\n\nEm casos mais graves, o computador pode reiniciar ao invés de desligar, ou a tela fica preta mas os coolers continuam rodando. Esses sintomas indicam problemas diferentes que requerem abordagens específicas.\n\nEm Curitiba, diagnosticamos e resolvemos problemas de desligamento no mesmo dia, seja a domicílio ou em nosso laboratório.",
  "sintomas": [
    {
      "titulo": "Computador fica travado na tela 'Desligando...'",
      "desc": "O Windows inicia o processo de shutdown mas nunca completa, ficando preso indefinidamente.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Tela fica preta mas o computador continua ligado",
      "desc": "O monitor apaga mas coolers, LEDs e HD continuam funcionando — shutdown incompleto.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Computador reinicia ao invés de desligar",
      "desc": "Ao clicar em Desligar, o PC reinicia automaticamente — ciclo infinito.",
      "gravidade": "Alto"
    },
    {
      "titulo": "Demora mais de 5 minutos para desligar",
      "desc": "Processos ou serviços em segundo plano impedem o encerramento rápido.",
      "gravidade": "Simples"
    },
    {
      "titulo": "Mensagem 'Aguardando programas fecharem'",
      "desc": "Um ou mais programas não respondem ao comando de encerramento do Windows.",
      "gravidade": "Simples"
    },
    {
      "titulo": "Só desliga forçando pelo botão de energia",
      "desc": "O shutdown por software não funciona, obrigando desligamento físico — pode corromper dados.",
      "gravidade": "Alto"
    }
  ],
  "causas": [
    {
      "titulo": "Driver de dispositivo impedindo shutdown",
      "desc": "Drivers de rede, USB ou vídeo com bugs podem travar o processo de encerramento.",
      "tipo": "software"
    },
    {
      "titulo": "Inicialização rápida (Fast Startup) com conflito",
      "desc": "O recurso de inicialização rápida do Windows 10/11 pode conflitar com certos hardwares.",
      "tipo": "software"
    },
    {
      "titulo": "Atualização do Windows pendente ou travada",
      "desc": "Updates que não conseguem ser instalados podem travar o shutdown indefinidamente.",
      "tipo": "software"
    },
    {
      "titulo": "Processo ou serviço travado em segundo plano",
      "desc": "Antivírus, sincronizadores de nuvem ou malware podem impedir o encerramento.",
      "tipo": "software"
    },
    {
      "titulo": "Problema na fonte de alimentação",
      "desc": "Fonte com defeito pode não cortar a energia corretamente após o shutdown do software.",
      "tipo": "hardware"
    }
  ],
  "cenarios": [
    {
      "nivel": "Simples",
      "desc": "Desabilitar inicialização rápida e ajustar configurações de energia resolve.",
      "tempo": "30-60 min",
      "custo": "R$50-80"
    },
    {
      "nivel": "Médio",
      "desc": "Driver problemático ou atualização travada — diagnóstico, atualização e limpeza de sistema.",
      "tempo": "1-2 horas",
      "custo": "R$80-150"
    },
    {
      "nivel": "Complexo",
      "desc": "Problema de hardware (fonte/placa-mãe) — teste e substituição de componentes.",
      "tempo": "2-4 horas",
      "custo": "R$150-350"
    }
  ],
  "riscos": [
    "Desligar forçando pelo botão repetidamente pode corromper o disco e o sistema operacional",
    "Atualizações interrompidas podem inutilizar o Windows",
    "Fonte com defeito pode danificar outros componentes por não cortar energia corretamente",
    "Ignorar o problema pode mascarar falhas de hardware progressivas"
  ],
  "diagnostico": "Analisamos o Event Viewer do Windows para identificar processos ou drivers que bloqueiam o shutdown. Verificamos configurações de energia, Fast Startup e atualizações pendentes.\n\nTestamos o comportamento em Modo de Segurança para isolar se é problema de software ou hardware. Verificamos também a fonte de alimentação com multímetro.",
  "solucao": "Desabilitamos o Fast Startup, atualizamos drivers problemáticos, resolvemos updates travados e configuramos corretamente as opções de energia.\n\nSe o problema for de hardware, testamos e substituímos a fonte de alimentação ou verificamos a placa-mãe. Sempre garantimos que o shutdown funcione corretamente antes de encerrar o atendimento.",
  "quandoCompensa": "Sempre compensa resolver — forçar desligamento pelo botão repetidamente leva a problemas muito mais graves e caros no futuro.",
  "quandoNaoCompensa": "Apenas se o computador já apresenta múltiplos problemas de hardware e tem mais de 8 anos — nesse caso, considerar upgrade ou troca.",
  "whatsappMessage": "Olá! Meu computador não está desligando corretamente. Preciso de diagnóstico.",
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
      "label": "Computador Lento",
      "to": "/problemas/computador-lento-curitiba"
    },
    {
      "label": "Tela Azul Windows",
      "to": "/problemas/tela-azul-windows-curitiba"
    }
  ],
  "conteudoExtra": "## Guia: Computador Não Desliga em Curitiba\n\n### Soluções Rápidas\n\n1. Desabilite Fast Startup: Painel de Controle > Opções de Energia > Alterar comportamento dos botões\n2. Verifique atualizações pendentes: Configurações > Windows Update\n3. Feche todos os programas manualmente antes de desligar\n4. Teste no Modo de Segurança para isolar drivers\n5. Execute `shutdown /s /f /t 0` no Prompt de Comando\n\n### Quando o Problema é Grave\n\nSe o computador reinicia ao invés de desligar, pode ser BSOD oculto. Verifique o Event Viewer (eventvwr.msc) para erros críticos no momento do shutdown.\n\n### Atendimento em Curitiba\n\nDiagnóstico e solução no mesmo dia para problemas de desligamento em Curitiba e região."
};
