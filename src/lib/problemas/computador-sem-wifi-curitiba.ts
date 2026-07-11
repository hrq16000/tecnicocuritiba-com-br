import type { ProblemaPageData } from "./types";

export const problema: ProblemaPageData = {
  "slug": "computador-sem-wifi-curitiba",
  "title": "Computador Sem Wi-Fi em Curitiba | Diagnóstico e Reparo",
  "metaDescription": "Computador não conecta no Wi-Fi? Ícone de rede ausente ou adaptador desativado? Saiba as causas e como resolver em Curitiba.",
  "h1": "Computador Sem Wi-Fi — Causas, Diagnóstico e Reparo em Curitiba",
  "categoria": "Hardware/Software — Rede",
  "intro": "O computador parou de mostrar redes Wi-Fi disponíveis ou o ícone de rede sem fio desapareceu? Este problema pode ter causas variadas — desde um simples botão de Wi-Fi desativado até falha no adaptador de rede sem fio.\n\nAs causas mais comuns incluem adaptador Wi-Fi desativado no Windows ou por tecla de função (Fn), driver de rede corrompido após atualização, serviço WLAN AutoConfig parado, antena Wi-Fi desconectada (em notebooks) ou falha física no módulo wireless.\n\nEm Curitiba, nosso técnico diagnostica rapidamente se o problema é de software (driver, serviço, configuração) ou hardware (módulo Wi-Fi, antena), resolvendo na maioria dos casos no mesmo dia.",
  "sintomas": [
    {
      "titulo": "Ícone de Wi-Fi ausente na barra de tarefas",
      "desc": "O ícone de rede sem fio desapareceu completamente, sem opção de conectar a redes.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Adaptador Wi-Fi não aparece no Gerenciador de Dispositivos",
      "desc": "O Windows não reconhece nenhum adaptador de rede sem fio instalado.",
      "gravidade": "Alto"
    },
    {
      "titulo": "Wi-Fi aparece mas não encontra redes",
      "desc": "O adaptador está ativo mas a lista de redes disponíveis está sempre vazia.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Conecta mas desconecta frequentemente",
      "desc": "O Wi-Fi conecta por alguns minutos e depois cai, exigindo reconexão manual.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Erro 'Sem adaptador de rede sem fio'",
      "desc": "Mensagem indicando que nenhum adaptador wireless foi encontrado no sistema.",
      "gravidade": "Alto"
    }
  ],
  "causas": [
    {
      "titulo": "Adaptador Wi-Fi desativado",
      "desc": "O adaptador pode ter sido desativado por tecla de função (Fn+F2/F5), pelo Modo Avião ou nas configurações do Windows.",
      "tipo": "software"
    },
    {
      "titulo": "Driver de rede corrompido ou ausente",
      "desc": "Atualização do Windows removeu ou corrompeu o driver do adaptador Wi-Fi.",
      "tipo": "software"
    },
    {
      "titulo": "Serviço WLAN AutoConfig parado",
      "desc": "O serviço do Windows responsável por gerenciar conexões Wi-Fi não está em execução.",
      "tipo": "software"
    },
    {
      "titulo": "Antena Wi-Fi desconectada (notebook)",
      "desc": "Os cabos da antena Wi-Fi dentro do notebook podem ter se desconectado, especialmente após manutenção.",
      "tipo": "hardware"
    },
    {
      "titulo": "Módulo Wi-Fi com defeito",
      "desc": "O chip ou placa Wi-Fi (geralmente mini PCIe ou M.2) falhou e precisa ser substituído.",
      "tipo": "hardware"
    }
  ],
  "cenarios": [
    {
      "nivel": "Simples",
      "desc": "Adaptador desativado ou Modo Avião ligado — reativação via configurações, tecla Fn ou Gerenciador de Dispositivos.",
      "tempo": "15-30 min",
      "custo": "R$50–R$80"
    },
    {
      "nivel": "Médio",
      "desc": "Driver corrompido ou serviço parado — reinstalação do driver e configuração de serviços do Windows.",
      "tempo": "30-60 min",
      "custo": "R$80–R$150"
    },
    {
      "nivel": "Complexo",
      "desc": "Módulo Wi-Fi defeituoso ou antena desconectada — substituição do módulo wireless ou reconexão da antena.",
      "tempo": "1-2 horas",
      "custo": "R$150–R$350"
    }
  ],
  "riscos": [
    "Instalar drivers genéricos pode causar instabilidade no sistema",
    "Abrir o notebook sem experiência pode danificar cabos flat e antenas",
    "Usar adaptador USB como solução permanente pode causar desconexões",
    "Ignorar o problema pode indicar falha progressiva na placa-mãe"
  ],
  "diagnostico": "O diagnóstico inicia verificando se o adaptador está visível no Gerenciador de Dispositivos. Se ausente, testamos com boot via Linux Live para verificar se o hardware é reconhecido — isso diferencia falha de software (driver Windows) de falha física.\n\nVerificamos o serviço WLAN AutoConfig, testamos diferentes drivers e, em notebooks, inspecionamos a conexão física da antena e do módulo Wi-Fi. Em desktops, testamos com outro adaptador Wi-Fi para confirmar a falha.",
  "solucao": "Para problemas de software, reinstalamos o driver correto do fabricante, reiniciamos serviços de rede e reconfiguramos o adaptador. Em casos de driver removido por atualização, fazemos rollback.\n\nPara falhas de hardware em notebooks, reconectamos a antena ou substituímos o módulo Wi-Fi (mini PCIe/M.2) por peça compatível. Em desktops, substituímos a placa Wi-Fi PCIe ou configuramos um adaptador USB de alta qualidade como alternativa.",
  "quandoCompensa": "Quando o problema é de software (driver, serviço) ou quando o módulo Wi-Fi é barato e fácil de substituir no modelo específico.",
  "quandoNaoCompensa": "Quando a falha está na placa-mãe (trilha do slot Wi-Fi danificada) e o custo de reparo ultrapassa o valor de um adaptador USB externo de qualidade.",
  "whatsappMessage": "Olá! Meu computador não conecta no Wi-Fi. Preciso de diagnóstico e reparo em Curitiba.",
  "relatedPages": [
    {
      "to": "/problemas/pc-nao-conecta-internet-curitiba",
      "label": "PC Sem Internet"
    },
    {
      "to": "/problemas/notebook-nao-conecta-bluetooth-curitiba",
      "label": "Sem Bluetooth"
    },
    {
      "to": "/servicos/redes-wifi",
      "label": "Redes e Wi-Fi"
    },
    {
      "to": "/diagnostico-tecnico",
      "label": "Diagnóstico Técnico"
    }
  ],
  "conteudoExtra": "## Verificações Rápidas Antes de Chamar um Técnico\n\n1. **Verifique o Modo Avião**: Configurações → Rede e Internet → certifique-se que o Modo Avião está desligado\n2. **Tecla de função**: Pressione Fn + tecla com ícone de Wi-Fi (varia por fabricante: F2, F5, F12)\n3. **Gerenciador de Dispositivos**: Clique com botão direito no menu Iniciar → Gerenciador de Dispositivos → Adaptadores de Rede → verifique se o adaptador Wi-Fi está ativo\n4. **Serviço WLAN**: Execute services.msc → procure \"Configuração Automática de WLAN\" → certifique-se que está Iniciado e Automático\n5. **Reset de rede**: Configurações → Rede → Redefinição de rede\n\n## Adaptador USB como Solução Temporária\n\nEnquanto aguarda o reparo, um adaptador Wi-Fi USB pode restaurar a conectividade. Recomendamos modelos com antena externa para melhor sinal. Nosso técnico pode indicar o modelo ideal para seu caso."
};
