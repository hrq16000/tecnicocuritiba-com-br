import type { ProblemaPageData } from "./types";

export const problema: ProblemaPageData = {
  "slug": "som-nao-funciona-curitiba",
  "title": "Som Não Funciona no Computador em Curitiba | Técnico",
  "metaDescription": "Computador sem som em Curitiba? Diagnóstico de áudio, drivers, placa de som e alto-falantes. Atendimento rápido a domicílio.",
  "h1": "Som Não Funciona no Computador — Diagnóstico em Curitiba",
  "categoria": "Áudio & Multimídia",
  "intro": "Seu computador ficou mudo de repente? Problemas de áudio são extremamente comuns e podem ter causas variadas: driver corrompido após atualização do Windows, configuração errada de saída de som, placa de áudio com defeito ou até cabo/conector danificado.\n\nO Windows 10 e 11 frequentemente alteram o dispositivo de saída padrão após atualizações, deixando o som direcionado para um dispositivo que não está conectado. Antes de trocar peças, um diagnóstico simples pode resolver.\n\nEm Curitiba, atendemos no mesmo dia problemas de áudio em desktops, notebooks, monitores com alto-falantes integrados e sistemas de home office com múltiplas saídas de som.",
  "sintomas": [
    {
      "titulo": "Ícone de som com X vermelho na bandeja",
      "desc": "O Windows indica que nenhum dispositivo de áudio está instalado ou funcional.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Som funciona no fone mas não nos alto-falantes",
      "desc": "Indica problema na saída de áudio específica ou configuração de dispositivo padrão.",
      "gravidade": "Simples"
    },
    {
      "titulo": "Áudio com chiado, estalo ou distorção",
      "desc": "Pode indicar driver incompatível, interferência elétrica ou alto-falante danificado.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Som parou após atualização do Windows",
      "desc": "Atualização substituiu o driver de áudio por versão genérica incompatível.",
      "gravidade": "Simples"
    },
    {
      "titulo": "Volume no máximo mas som muito baixo",
      "desc": "Pode ser configuração de equalização, limitador de volume ou alto-falante desgastado.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Som funciona em alguns programas mas não em outros",
      "desc": "Configuração de áudio por aplicativo ou mixer de volume com canal silenciado.",
      "gravidade": "Simples"
    }
  ],
  "causas": [
    {
      "titulo": "Driver de áudio corrompido ou incompatível",
      "desc": "Atualizações do Windows frequentemente instalam drivers genéricos que não funcionam com o chipset de áudio.",
      "tipo": "software"
    },
    {
      "titulo": "Dispositivo de saída padrão incorreto",
      "desc": "O Windows pode direcionar o áudio para HDMI, Bluetooth ou dispositivo virtual inexistente.",
      "tipo": "software"
    },
    {
      "titulo": "Serviço Windows Audio desativado",
      "desc": "O serviço responsável pelo áudio pode ter sido desabilitado por otimizadores ou malware.",
      "tipo": "software"
    },
    {
      "titulo": "Conector P2 com mau contato",
      "desc": "Poeira, oxidação ou desgaste no conector de 3.5mm causa perda de áudio intermitente.",
      "tipo": "hardware"
    },
    {
      "titulo": "Placa de som onboard com defeito",
      "desc": "Chipset de áudio na placa-mãe pode falhar por desgaste ou surto elétrico.",
      "tipo": "hardware"
    }
  ],
  "cenarios": [
    {
      "nivel": "Simples",
      "desc": "Problema de configuração ou driver — reinstalação e ajuste resolve rapidamente.",
      "tempo": "30-60 min",
      "custo": "R$50-80"
    },
    {
      "nivel": "Médio",
      "desc": "Conector danificado ou conflito de hardware — reparo ou placa de som USB externa.",
      "tempo": "1-2 horas",
      "custo": "R$80-150"
    },
    {
      "nivel": "Complexo",
      "desc": "Placa de som onboard queimada — instalação de placa de som dedicada ou USB.",
      "tempo": "1-2 horas",
      "custo": "R$120-250"
    }
  ],
  "riscos": [
    "Instalar drivers de fontes não confiáveis pode introduzir malware",
    "Forçar volume no máximo com alto-falantes danificados pode queimar a saída de áudio",
    "Desabilitar serviços do Windows sem conhecimento pode afetar outras funcionalidades",
    "Usar adaptadores baratos pode causar interferência e ruído no áudio"
  ],
  "diagnostico": "Verificamos o Gerenciador de Dispositivos, testamos diferentes saídas de áudio, reinstalamos drivers do fabricante e testamos com fones/caixas diferentes.\n\nUsamos ferramentas de diagnóstico para verificar se o chipset de áudio está respondendo corretamente e se há conflitos de IRQ ou recursos do sistema.",
  "solucao": "Na maioria dos casos, reinstalar o driver correto do fabricante da placa-mãe resolve. Ajustamos o dispositivo de saída padrão, verificamos o mixer de volume e habilitamos serviços necessários.\n\nSe a placa onboard estiver com defeito, instalamos uma placa de som USB ou PCIe de qualidade, com configuração otimizada para o uso do cliente.",
  "quandoCompensa": "Sempre compensa investigar — 80% dos problemas de áudio são resolvidos com software (driver/configuração) sem custo de peças.",
  "quandoNaoCompensa": "Apenas quando a placa-mãe está com defeito generalizado e já apresenta outros problemas — nesse caso, a troca da placa é mais indicada.",
  "whatsappMessage": "Olá! O som do meu computador parou de funcionar. Preciso de diagnóstico e reparo.",
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
      "label": "Formatação",
      "to": "/servicos/formatacao-computador"
    }
  ],
  "conteudoExtra": "## Guia: Resolver Problemas de Som no Computador\n\n### Checklist Rápido Antes de Chamar o Técnico\n\n1. Clique com botão direito no ícone de som > Configurações de som\n2. Verifique se o dispositivo de saída correto está selecionado\n3. Abra o Mixer de Volume e veja se algum app está silenciado\n4. Teste com outro fone de ouvido ou caixa de som\n5. Reinicie o serviço Windows Audio (services.msc)\n\n### Problemas Comuns por Marca de Notebook\n\n- **Dell**: Driver Realtek conflita com MaxxAudio após updates\n- **Lenovo**: Dolby Audio pode silenciar saídas não reconhecidas\n- **HP**: Bang & Olufsen software requer driver específico\n- **Acer/Asus**: Drivers genéricos do Windows geralmente funcionam\n\n### Atendimento em Curitiba\n\nResolvemos problemas de áudio no mesmo dia em toda Curitiba e região metropolitana."
};
