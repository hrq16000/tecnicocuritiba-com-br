import type { ProblemaPageData } from "./types";

export const problema: ProblemaPageData = {
  "slug": "computador-nao-reconhece-usb-curitiba",
  "title": "Computador Não Reconhece USB em Curitiba | Diagnóstico e Reparo",
  "metaDescription": "Computador não reconhece pendrive, HD externo ou dispositivo USB? Técnico em Curitiba diagnostica portas, drivers, hub e controladora USB.",
  "h1": "Computador Não Reconhece USB — Diagnóstico e Reparo em Curitiba",
  "categoria": "Hardware / Software",
  "intro": "Você conecta um pendrive, HD externo, mouse, teclado ou impressora na porta USB e nada acontece? O Windows não emite o som de conexão, o dispositivo não aparece no Explorador de Arquivos ou surge a mensagem \"Dispositivo USB não reconhecido\"? Esse é um problema extremamente comum e pode ter causas simples ou complexas.\n\nAs portas USB são os conectores mais utilizados em qualquer computador. Com o uso constante, elas podem sofrer desgaste mecânico, acumular poeira, ou ter problemas elétricos. Além disso, drivers USB corrompidos, conflitos de energia e falhas na controladora USB da placa-mãe também causam o problema.\n\nEm Curitiba, atendemos muitos casos de portas USB que param de funcionar — especialmente em notebooks, onde o reparo da porta exige micro-solda. Antes de trocar qualquer peça, nosso diagnóstico identifica se o problema está na porta, no cabo, no dispositivo ou no software.",
  "sintomas": [
    {
      "titulo": "'Dispositivo USB não reconhecido'",
      "desc": "Mensagem do Windows indicando que o dispositivo conectado não foi identificado. Pode ser problema no dispositivo, driver ou porta.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Nenhuma reação ao conectar USB",
      "desc": "Não há som, não há notificação, dispositivo não aparece em lugar nenhum. Porta pode estar desabilitada ou fisicamente danificada.",
      "gravidade": "Alto"
    },
    {
      "titulo": "USB funciona e para intermitentemente",
      "desc": "O dispositivo conecta, funciona por alguns segundos e desconecta. Mau contato na porta ou cabo defeituoso.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Apenas algumas portas USB não funcionam",
      "desc": "Portas traseiras funcionam mas frontais não (ou vice-versa). Problema no cabo interno do painel frontal ou na controladora.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Todos os dispositivos USB falhando",
      "desc": "Nenhum dispositivo é reconhecido em nenhuma porta. Indica problema no driver da controladora USB ou falha na placa-mãe.",
      "gravidade": "Alto"
    },
    {
      "titulo": "USB fornece pouca energia",
      "desc": "Dispositivos como HDs externos não ligam ou pendrives não são detectados, mas mouse funciona. Problema de fornecimento de energia USB.",
      "gravidade": "Médio"
    }
  ],
  "causas": [
    {
      "titulo": "Porta USB com desgaste mecânico",
      "desc": "Conectar e desconectar dispositivos milhares de vezes causa folga nos contatos internos da porta. Comum em notebooks.",
      "tipo": "desgaste"
    },
    {
      "titulo": "Driver de controladora USB corrompido",
      "desc": "Atualizações do Windows, vírus ou remoção insegura podem corromper os drivers da controladora xHCI/EHCI.",
      "tipo": "software"
    },
    {
      "titulo": "Gerenciamento de energia suspendendo USB",
      "desc": "O Windows pode desativar portas USB para economizar energia. Configuração comum em notebooks que causa falhas.",
      "tipo": "software"
    },
    {
      "titulo": "Hub USB interno sobrecarregado",
      "desc": "Cada controladora USB tem limite de dispositivos e banda. Conectar muitos dispositivos pode exceder a capacidade.",
      "tipo": "hardware"
    },
    {
      "titulo": "Cabo do painel frontal desconectado",
      "desc": "O cabo que liga as portas USB frontais à placa-mãe pode se soltar com vibrações ou manutenções.",
      "tipo": "hardware"
    },
    {
      "titulo": "Controladora USB da placa-mãe com defeito",
      "desc": "O chipset responsável pelas portas USB pode falhar por pico de energia ou curto-circuito ao conectar dispositivos defeituosos.",
      "tipo": "hardware"
    }
  ],
  "cenarios": [
    {
      "nivel": "Simples",
      "desc": "Problema de driver ou configuração de energia — reinstalação de drivers e ajuste de gerenciamento de energia resolve.",
      "tempo": "1-2 horas",
      "custo": "R$80–R$150"
    },
    {
      "nivel": "Médio",
      "desc": "Porta USB com mau contato ou cabo frontal desconectado — resolda da porta ou reconexão do cabo interno.",
      "tempo": "2-3 horas",
      "custo": "R$100–R$250"
    },
    {
      "nivel": "Complexo",
      "desc": "Controladora USB na placa-mãe com defeito — reparo de componente SMD ou substituição da placa-mãe.",
      "tempo": "3-7 dias",
      "custo": "R$250–R$600"
    }
  ],
  "riscos": [
    "Forçar dispositivos em portas com mau contato pode causar curto-circuito e danificar o dispositivo",
    "Conectar dispositivos em portas com defeito elétrico pode queimar pendrives e HDs externos",
    "Ignorar o problema pode indicar falha progressiva na placa-mãe que vai afetar outras funções",
    "Remoção insegura de pendrives com dados importantes pode causar corrupção de arquivos"
  ],
  "diagnostico": "O diagnóstico de USB envolve testes sistemáticos:\n\n1. Teste cruzado: conectar dispositivos conhecidos (mouse, pendrive testado) em todas as portas para mapear quais funcionam.\n\n2. Verificação no Gerenciador de Dispositivos: buscar controladoras USB com erro (triângulo amarelo), dispositivos desconhecidos ou desabilitados.\n\n3. Teste de energia USB: medição da voltagem nas portas (devem fornecer 5V estáveis com corrente adequada para o padrão USB 2.0/3.0).\n\n4. Inspeção física: verificação de contatos oxidados, tortos ou com folga usando lupa e teste de continuidade.\n\n5. Teste de software: verificação de drivers, políticas de grupo e configurações de gerenciamento de energia.\n\n6. Análise da BIOS: verificação de portas USB desabilitadas na configuração do sistema.",
  "solucao": "A solução varia conforme a causa identificada:\n\n**Drivers**: Reinstalação dos drivers da controladora USB via Gerenciador de Dispositivos, com remoção completa dos drivers antigos e instalação dos oficiais do fabricante da placa-mãe.\n\n**Gerenciamento de energia**: Desativação da opção \"O computador pode desligar este dispositivo para economizar energia\" em todas as controladoras USB e Root Hubs.\n\n**Porta física**: Resolda dos contatos da porta USB com estação de solda. Em notebooks, pode exigir troca do módulo USB (placa filha) ou micro-solda na placa-mãe.\n\n**Painel frontal**: Reconexão ou substituição do cabo que liga as portas frontais ao header USB da placa-mãe.\n\n**Controladora**: Quando a controladora USB integrada ao chipset falha, a solução é usar uma placa PCI-E USB ou, em casos graves, substituir a placa-mãe.",
  "quandoCompensa": "Problemas de driver ou portas individuais sempre compensam reparar. Mesmo resolda de portas em notebooks é viável e econômica.",
  "quandoNaoCompensa": "Se a controladora USB do chipset falhou e o computador é antigo, o custo de reparo da placa-mãe pode não compensar. Uma placa PCI-E USB é alternativa para desktops.",
  "whatsappMessage": "Olá! Meu computador não está reconhecendo dispositivos USB. Gostaria de agendar um diagnóstico.",
  "relatedPages": [
    {
      "to": "/problemas/computador-nao-liga-curitiba",
      "label": "PC Não Liga"
    },
    {
      "to": "/problemas/erro-driver-windows-curitiba",
      "label": "Erro de Driver Windows"
    },
    {
      "to": "/servicos/conserto-pc-notebook",
      "label": "Conserto de PC/Notebook"
    },
    {
      "to": "/problemas/pc-sem-imagem-curitiba",
      "label": "PC Sem Imagem"
    },
    {
      "to": "/servicos/redes-wifi",
      "label": "Redes e Conectividade"
    },
    {
      "to": "/diagnostico-tecnico",
      "label": "Diagnóstico Técnico"
    }
  ],
  "conteudoExtra": "## Guia Rápido de Problemas USB\n\n### Checklist Antes de Chamar o Técnico\n1. Teste o dispositivo em outro computador — pode ser o dispositivo e não a porta\n2. Teste com outro cabo USB — cabos são a causa mais frequente e barata\n3. Reinicie o computador — às vezes o driver trava e reiniciar resolve\n4. Teste em portas traseiras — portas frontais dependem de cabo interno que pode estar solto\n\n### USB 2.0 vs 3.0 vs USB-C\n- **USB 2.0** (preto): 480 Mbps, 500 mA de corrente\n- **USB 3.0** (azul): 5 Gbps, 900 mA de corrente\n- **USB-C**: conector reversível, pode ser USB 3.1/3.2 ou Thunderbolt\n- Dispositivos USB 3.0 em portas 2.0 funcionam mais lentos mas devem ser reconhecidos\n\n### Remoção Segura\nSempre use \"Remover hardware com segurança\" antes de desconectar pendrives e HDs externos. A remoção sem ejetar pode corromper o sistema de arquivos do dispositivo."
};
