import type { ProblemaPageData } from "./types";

export const problema: ProblemaPageData = {
  "slug": "pc-nao-reconhece-usb-curitiba",
  "title": "PC Não Reconhece USB em Curitiba | Diagnóstico e Solução",
  "metaDescription": "PC ou notebook não reconhece pendrive, HD externo ou dispositivo USB? Técnico em Curitiba resolve problemas de portas USB com diagnóstico preciso.",
  "h1": "PC Não Reconhece USB — Diagnóstico e Solução em Curitiba",
  "categoria": "Hardware / Periféricos",
  "intro": "Quando o PC não reconhece dispositivos USB — pendrives, HDs externos, teclados, mouses ou impressoras — a produtividade é diretamente afetada. O problema pode estar nas portas USB do computador, nos drivers do sistema, no próprio dispositivo ou no gerenciamento de energia do Windows.\n\nÉ fundamental identificar se o problema é em todas as portas ou apenas em algumas, se afeta todos os dispositivos ou apenas um específico, e se começou após alguma atualização ou mudança no sistema. Cada combinação aponta para uma causa diferente.\n\nEm Curitiba, nosso técnico realiza diagnóstico completo das portas USB, controladores e drivers para identificar a causa exata e aplicar a solução correta.",
  "sintomas": [
    {
      "titulo": "Dispositivo USB não é reconhecido",
      "desc": "Ao conectar pendrive ou HD externo, o Windows exibe 'Dispositivo USB não reconhecido' ou não acontece nada.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Portas USB pararam de funcionar",
      "desc": "Nenhum dispositivo funciona em uma ou mais portas USB, enquanto outras portas funcionam normalmente.",
      "gravidade": "Médio"
    },
    {
      "titulo": "USB conecta e desconecta repetidamente",
      "desc": "O som de conexão/desconexão do Windows toca repetidamente, e o dispositivo aparece e desaparece no sistema.",
      "gravidade": "Médio"
    },
    {
      "titulo": "HD externo não aparece no Explorer",
      "desc": "O HD externo é detectado no Gerenciador de Dispositivos mas não aparece em 'Meu Computador' para acesso aos arquivos.",
      "gravidade": "Simples"
    },
    {
      "titulo": "USB funciona em outro PC mas não neste",
      "desc": "O mesmo dispositivo funciona perfeitamente em outro computador, confirmando que o problema é no PC.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Todas as portas USB param após suspensão",
      "desc": "Após o PC entrar em modo de suspensão ou hibernação, as portas USB não voltam a funcionar até reiniciar.",
      "gravidade": "Simples"
    }
  ],
  "causas": [
    {
      "titulo": "Gerenciamento de energia desativando portas",
      "desc": "O Windows desativa portas USB para economizar energia, mas nem sempre as reativa corretamente, especialmente após suspensão.",
      "tipo": "software"
    },
    {
      "titulo": "Driver do controlador USB corrompido",
      "desc": "Drivers do Hub USB Root ou controlador xHCI/eHCI corrompidos após atualizações impedem o reconhecimento de dispositivos.",
      "tipo": "software"
    },
    {
      "titulo": "Porta USB fisicamente danificada",
      "desc": "Pinos tortos, oxidados ou solda fria no conector USB da placa-mãe impedem o contato elétrico adequado.",
      "tipo": "hardware"
    },
    {
      "titulo": "Dispositivo USB com defeito",
      "desc": "O pendrive, HD externo ou cabo USB está danificado — controlador interno queimado ou cabo com fio rompido.",
      "tipo": "hardware"
    },
    {
      "titulo": "Conflito de drivers após atualização",
      "desc": "Atualizações do Windows podem instalar drivers genéricos que conflitam com os controladores USB específicos da placa-mãe.",
      "tipo": "software"
    }
  ],
  "cenarios": [
    {
      "nivel": "Simples",
      "desc": "Problema de gerenciamento de energia ou driver — ajuste de configuração e reinstalação de driver.",
      "tempo": "30min–1h",
      "custo": "R$80–R$120"
    },
    {
      "nivel": "Médio",
      "desc": "Controlador USB com conflito ou dispositivo com problema lógico — reparo de drivers e partição.",
      "tempo": "1–2h",
      "custo": "R$120–R$200"
    },
    {
      "nivel": "Complexo",
      "desc": "Porta USB danificada fisicamente ou controlador na placa-mãe com defeito — reparo de hardware.",
      "tempo": "2–5 dias",
      "custo": "R$200–R$400"
    }
  ],
  "riscos": [
    "Remover HD externo sem 'Ejetar com segurança' pode corromper dados e o sistema de arquivos do dispositivo",
    "Usar hub USB de baixa qualidade pode causar queda de tensão e danificar dispositivos conectados",
    "Ignorar desconexões intermitentes de HD externo pode resultar em perda definitiva de dados",
    "Desinstalar drivers USB incorretos pode deixar teclado e mouse sem funcionar, travando o acesso ao PC"
  ],
  "diagnostico": "O diagnóstico de problemas USB é metódico:\n\n1. Teste do dispositivo em outro PC para confirmar se o defeito é no computador ou no dispositivo.\n2. Teste de diferentes portas USB (frontais, traseiras, USB 2.0, USB 3.0) para mapear quais funcionam.\n3. Verificação do Gerenciador de Dispositivos para erros em controladores USB e dispositivos desconhecidos.\n4. Análise das configurações de gerenciamento de energia do Hub USB Root.\n5. Verificação do Gerenciamento de Disco para dispositivos detectados mas sem letra de unidade.\n6. Teste de voltagem nas portas USB com multímetro para identificar problemas elétricos.\n\nO diagnóstico custa a partir de R$50 e é abatido do serviço caso o reparo seja aprovado.",
  "solucao": "A solução varia conforme a causa:\n\n**Gerenciamento de energia:** Desabilitar a opção \"O computador pode desligar este dispositivo para economizar energia\" em cada Hub USB Root no Gerenciador de Dispositivos.\n\n**Drivers:** Desinstalar todos os controladores USB no Gerenciador de Dispositivos e reiniciar para que o Windows reinstale automaticamente. Em alguns casos, instalar o driver do chipset da placa-mãe resolve.\n\n**Dispositivo não aparece no Explorer:** Acessar Gerenciamento de Disco, atribuir letra de unidade ou formatar a partição (se não houver dados importantes).\n\n**Hardware:** Limpeza dos contatos da porta USB com álcool isopropílico. Ressolda de conectores com solda fria. Em último caso, instalação de placa USB PCI-Express.\n\nTodos os reparos incluem teste com múltiplos dispositivos para garantir funcionamento completo.",
  "quandoCompensa": "Sempre compensa diagnosticar, pois na maioria dos casos o problema é de software (driver/configuração) e se resolve rapidamente.",
  "quandoNaoCompensa": "Quando o controlador USB da placa-mãe está queimado em um PC muito antigo — uma placa USB PCI-E é mais econômica que trocar a placa-mãe.",
  "whatsappMessage": "Olá! Meu PC não está reconhecendo dispositivos USB. Preciso de diagnóstico em Curitiba.",
  "relatedPages": [
    {
      "to": "/problemas/impressora-nao-imprime-curitiba",
      "label": "Impressora Não Imprime"
    },
    {
      "to": "/problemas/computador-nao-liga-curitiba",
      "label": "Computador Não Liga"
    },
    {
      "to": "/problemas/computador-lento-curitiba",
      "label": "Computador Lento"
    },
    {
      "to": "/conserto-notebook-curitiba",
      "label": "Conserto de Notebook"
    },
    {
      "to": "/atendimento-domicilio",
      "label": "Atendimento a Domicílio"
    },
    {
      "to": "/servicos",
      "label": "Todos os Serviços"
    }
  ],
  "conteudoExtra": "## Diferenças entre USB 2.0, 3.0 e USB-C\n\n| Padrão | Velocidade | Cor do conector | Uso ideal |\n|--------|-----------|----------------|----------|\n| USB 2.0 | 480 Mbps | Preto/Branco | Mouse, teclado, impressora |\n| USB 3.0 | 5 Gbps | Azul | Pendrive, HD externo |\n| USB 3.1 | 10 Gbps | Teal | SSD externo |\n| USB-C | Até 40 Gbps | Sem cor padrão | Dispositivos modernos |\n\n### Dicas para Evitar Problemas com USB\n\n- Sempre use \"Ejetar com segurança\" antes de remover pendrives e HDs externos\n- Evite conectar muitos dispositivos USB de alta potência sem um hub alimentado\n- Mantenha os drivers do chipset da placa-mãe atualizados\n- Não force conectores — se não encaixa facilmente, verifique a orientação\n- Use cabos USB de qualidade, especialmente para HDs externos e transferência de dados"
};
