import type { ProblemaPageData } from "./types";

export const problema: ProblemaPageData = {
  "slug": "pc-nao-conecta-bluetooth-curitiba",
  "title": "PC Não Conecta Bluetooth Curitiba — Diagnóstico e Solução",
  "metaDescription": "PC ou notebook não conecta Bluetooth em Curitiba? Técnico resolve problemas de driver, adaptador e pareamento. Diagnóstico profissional com atendimento rápido.",
  "h1": "PC Não Conecta Bluetooth — Diagnóstico e Solução em Curitiba",
  "categoria": "Hardware / Conectividade",
  "intro": "Problemas de Bluetooth são extremamente comuns e podem impedir o uso de fones de ouvido, teclados, mouses, caixas de som e até transferência de arquivos. Quando o Bluetooth não funciona, o ícone pode desaparecer da bandeja, o dispositivo pode não parear, ou a conexão pode cair constantemente.\n\nAs causas variam entre driver desatualizado, adaptador Bluetooth desativado no BIOS, conflito de software, interferência de sinal, ou falha física do módulo Bluetooth (que em notebooks geralmente é integrado à placa Wi-Fi).\n\nAntes de assumir que o hardware está com defeito, é importante verificar configurações de software, pois a grande maioria dos problemas de Bluetooth é resolvida sem troca de peças.",
  "sintomas": [
    {
      "titulo": "Ícone do Bluetooth sumiu da bandeja do sistema",
      "desc": "O Bluetooth não aparece nas configurações nem na bandeja. Pode indicar driver não instalado, adaptador desativado ou desabilitado no BIOS.",
      "gravidade": "Simples"
    },
    {
      "titulo": "Dispositivo não é encontrado ao parear",
      "desc": "O PC procura mas não encontra o dispositivo Bluetooth. Pode ser modo de pareamento incorreto, distância excessiva ou interferência.",
      "gravidade": "Simples"
    },
    {
      "titulo": "Conexão Bluetooth cai constantemente",
      "desc": "Dispositivo conecta mas desconecta após segundos ou minutos. Indica interferência, driver instável ou economia de energia desligando o adaptador.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Áudio Bluetooth com falhas e cortes",
      "desc": "Fone ou caixa Bluetooth conecta mas o áudio tem cortes, delay ou qualidade ruim. Pode ser codec inadequado, interferência ou driver.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Bluetooth funciona mas transferência de arquivos falha",
      "desc": "Pareamento funciona mas não consegue enviar/receber arquivos. Geralmente problema de permissões, firewall ou protocolo OBEX.",
      "gravidade": "Simples"
    },
    {
      "titulo": "Erro 'Dispositivo Bluetooth não encontrado' no Gerenciador",
      "desc": "O Gerenciador de Dispositivos mostra erro ou não lista o adaptador Bluetooth. Indica falha de driver ou hardware.",
      "gravidade": "Médio"
    }
  ],
  "causas": [
    {
      "titulo": "Driver Bluetooth ausente ou desatualizado",
      "desc": "Após formatação ou atualização do Windows, o driver correto pode não ser instalado automaticamente. Requer download do site do fabricante.",
      "tipo": "software"
    },
    {
      "titulo": "Bluetooth desativado no BIOS/UEFI",
      "desc": "Alguns notebooks permitem desativar Bluetooth no BIOS. Se desativado, o Windows não detecta o hardware.",
      "tipo": "erro-humano"
    },
    {
      "titulo": "Serviço Bluetooth parado no Windows",
      "desc": "O serviço 'Bluetooth Support Service' pode estar parado ou desativado. Sem ele, nenhum dispositivo funciona.",
      "tipo": "software"
    },
    {
      "titulo": "Interferência de sinal",
      "desc": "Dispositivos USB 3.0, roteadores Wi-Fi no canal 2.4GHz e micro-ondas podem interferir no sinal Bluetooth.",
      "tipo": "hardware"
    },
    {
      "titulo": "Módulo Bluetooth/Wi-Fi com defeito",
      "desc": "Em notebooks, o módulo é geralmente uma placa combo Wi-Fi+Bluetooth. Se falhar, ambos param de funcionar.",
      "tipo": "hardware"
    },
    {
      "titulo": "Economia de energia desligando o adaptador",
      "desc": "O Windows pode configurar o adaptador para desligar automaticamente para economizar energia, causando desconexões.",
      "tipo": "software"
    }
  ],
  "cenarios": [
    {
      "nivel": "Simples",
      "desc": "Driver ausente, serviço parado, BIOS desativado ou configuração de energia. Resolvido com software.",
      "tempo": "30min–1 hora",
      "custo": "R$60–R$100"
    },
    {
      "nivel": "Médio",
      "desc": "Conflito de driver, interferência de sinal ou codec inadequado. Requer diagnóstico e ajuste fino.",
      "tempo": "1–2 horas",
      "custo": "R$100–R$180"
    },
    {
      "nivel": "Complexo",
      "desc": "Módulo Bluetooth/Wi-Fi com defeito. Requer troca do módulo interno ou adaptador USB externo.",
      "tempo": "1–3 dias (peça)",
      "custo": "R$150–R$300"
    }
  ],
  "riscos": [
    "Instalar drivers de fontes não oficiais pode trazer malware",
    "Alterar configurações do BIOS sem conhecimento pode desativar outros componentes",
    "Adaptadores USB Bluetooth genéricos podem ter compatibilidade ruim",
    "Ignorar problemas de Bluetooth pode indicar falha maior na placa Wi-Fi",
    "Forçar pareamento repetidamente pode corromper o perfil do dispositivo"
  ],
  "diagnostico": "Verificamos no Gerenciador de Dispositivos se o adaptador Bluetooth aparece e seu estado. Checamos se o serviço Bluetooth Support Service está ativo. Testamos o BIOS para confirmar que o hardware está habilitado.\n\nInstalamos o driver correto do fabricante (não genérico do Windows). Verificamos configurações de economia de energia e desativamos o desligamento automático. Testamos com diferentes dispositivos Bluetooth para isolar se o problema é no PC ou no periférico.\n\nPara problemas de áudio, verificamos o codec utilizado (SBC vs aptX vs AAC) e otimizamos as configurações.",
  "solucao": "Para problemas de software: instalamos o driver correto, habilitamos serviços, ajustamos economia de energia e resolvemos conflitos. Para interferência: reposicionamos dispositivos USB 3.0, alteramos canal do Wi-Fi ou usamos extensores Bluetooth.\n\nPara hardware defeituoso em notebooks: substituímos o módulo Wi-Fi+Bluetooth por um compatível (geralmente M.2). Em desktops: instalamos adaptador USB Bluetooth 5.0+ com antena externa para melhor alcance.\n\nConfiguramos todos os dispositivos do cliente e verificamos o pareamento de cada um antes de finalizar.",
  "quandoCompensa": "Sempre compensa resolver — Bluetooth é essencial para periféricos modernos. Mesmo a troca do módulo é acessível (R$80–R$150 pela peça).",
  "quandoNaoCompensa": "Em PCs desktop muito antigos sem Bluetooth nativo, pode ser mais prático usar um adaptador USB do que tentar integrar ao hardware.",
  "whatsappMessage": "Olá! Meu PC/notebook não está conectando no Bluetooth. Os dispositivos não pareiam ou a conexão cai. Preciso de ajuda.",
  "relatedPages": [
    {
      "to": "/problemas/wifi-caindo-curitiba",
      "label": "Wi-Fi Caindo"
    },
    {
      "to": "/problemas/pc-sem-som-hdmi-curitiba",
      "label": "PC Sem Som HDMI"
    },
    {
      "to": "/redes-wifi-curitiba",
      "label": "Redes e Wi-Fi"
    },
    {
      "to": "/problemas/pc-nao-reconhece-usb-curitiba",
      "label": "PC Não Reconhece USB"
    },
    {
      "to": "/servicos",
      "label": "Todos os Serviços"
    }
  ],
  "conteudoExtra": "## Verificações Rápidas\n\n1. **Modo avião**: Verifique se não está ativado (desativa Bluetooth junto)\n2. **Tecla de atalho**: Muitos notebooks têm Fn+tecla para ligar/desligar Bluetooth\n3. **Serviço**: Win+R → services.msc → \"Bluetooth Support Service\" deve estar \"Em execução\"\n4. **Pareamento**: Coloque o dispositivo em modo de pareamento (geralmente segurando botão por 5s)\n\n## Bluetooth 4.0 vs 5.0 vs 5.3\n\nBluetooth 5.0+ oferece alcance 4x maior, velocidade 2x maior e consumo menor. Se seu adaptador é antigo (4.0 ou inferior), upgrade para 5.0+ pode resolver problemas de conexão instável e melhorar a qualidade de áudio."
};
