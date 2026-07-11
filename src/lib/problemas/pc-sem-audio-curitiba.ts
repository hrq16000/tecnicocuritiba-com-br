import type { ProblemaPageData } from "./types";

export const problema: ProblemaPageData = {
  "slug": "pc-sem-audio-curitiba",
  "title": "PC Sem Áudio? Computador Sem Som | Técnico em Curitiba",
  "metaDescription": "Computador ou notebook sem som? Áudio parou de funcionar? Diagnóstico e reparo em Curitiba e região metropolitana. Atendimento rápido a domicílio.",
  "h1": "PC ou Notebook Sem Áudio em Curitiba? Diagnóstico e Solução",
  "categoria": "Hardware / Software",
  "intro": "Ficar sem áudio no computador é mais do que um incômodo — afeta reuniões online, aulas, entretenimento e trabalho. O problema pode estar no hardware (placa de som, alto-falantes, conector P2) ou no software (driver, configuração do Windows, serviço de áudio). Nosso técnico em Curitiba identifica a causa exata e resolve com agilidade.",
  "sintomas": [
    {
      "titulo": "Nenhum som sai do computador",
      "desc": "Sem áudio em nenhum programa, ícone de som com X vermelho. Pode ser driver, serviço de áudio parado ou placa de som com defeito.",
      "gravidade": "Simples a médio"
    },
    {
      "titulo": "Som apenas pelo fone de ouvido",
      "desc": "Alto-falantes não funcionam mas fone sim (ou vice-versa). Problema no conector, detecção automática ou configuração de saída.",
      "gravidade": "Simples"
    },
    {
      "titulo": "Áudio com chiado ou estalo",
      "desc": "Som sai mas com ruído, estalo ou distorção. Pode ser interferência, driver desatualizado ou alto-falante danificado.",
      "gravidade": "Simples a médio"
    },
    {
      "titulo": "Volume muito baixo",
      "desc": "Mesmo no máximo o som é fraco. Equalização mal configurada, driver incorreto ou alto-falante desgastado.",
      "gravidade": "Simples"
    },
    {
      "titulo": "Microfone não funciona",
      "desc": "O microfone integrado ou externo não capta áudio. Driver, permissões de privacidade ou hardware defeituoso.",
      "gravidade": "Simples a médio"
    },
    {
      "titulo": "Áudio trava ou falha intermitente",
      "desc": "Som funciona e para aleatoriamente. Conflito de driver, gerenciamento de energia ou problema no chipset de áudio.",
      "gravidade": "Médio"
    }
  ],
  "causas": [
    {
      "titulo": "Driver de áudio corrompido",
      "desc": "Atualizações do Windows podem instalar drivers genéricos incompatíveis com o chipset Realtek, Conexant ou outro.",
      "tipo": "software"
    },
    {
      "titulo": "Serviço Windows Audio parado",
      "desc": "O serviço responsável pelo áudio pode travar ou ser desabilitado por otimizadores de sistema.",
      "tipo": "software"
    },
    {
      "titulo": "Conector P2 danificado",
      "desc": "Entrada de fone de ouvido ou microfone com mau contato, oxidação ou soldas frias.",
      "tipo": "hardware"
    },
    {
      "titulo": "Chipset de áudio com defeito",
      "desc": "O chip Realtek/Conexant na placa-mãe pode falhar, especialmente após picos de energia.",
      "tipo": "hardware"
    },
    {
      "titulo": "Configuração de saída errada",
      "desc": "Windows direcionando áudio para dispositivo inexistente (HDMI, Bluetooth desconectado, monitor sem caixas).",
      "tipo": "software"
    }
  ],
  "cenarios": [
    {
      "nivel": "Simples",
      "desc": "Reinstalação de driver ou reconfiguração de dispositivo de saída padrão",
      "tempo": "30–60 min",
      "custo": "R$ 80–120"
    },
    {
      "nivel": "Médio",
      "desc": "Reparo do conector P2 ou substituição de alto-falantes internos do notebook",
      "tempo": "1–2 horas",
      "custo": "R$ 120–220"
    },
    {
      "nivel": "Complexo",
      "desc": "Substituição do chipset de áudio na placa-mãe ou instalação de placa de som dedicada",
      "tempo": "2–3 horas",
      "custo": "R$ 200–400"
    }
  ],
  "riscos": [
    "Instalar drivers de áudio de fontes não confiáveis pode trazer malware",
    "Forçar o conector P2 pode quebrar a ponta do plug dentro da entrada",
    "Desabilitar serviços do Windows sem conhecimento pode causar outros problemas",
    "Ajustar volume no máximo com driver incorreto pode danificar alto-falantes"
  ],
  "diagnostico": "1. Verificação do Gerenciador de Dispositivos para status do driver de áudio (exclamação amarela, driver genérico, dispositivo desabilitado).\n\n2. Teste do serviço Windows Audio (services.msc) — verificar se está iniciado e em modo automático.\n\n3. Teste com fone de ouvido e com alto-falante externo para isolar se o problema é na saída interna.\n\n4. Verificação da configuração de dispositivo de reprodução padrão no painel de som do Windows.\n\n5. Teste em outro sistema operacional (Linux live USB) para confirmar se é hardware ou software.\n\n6. Inspeção física dos conectores, alto-falantes internos e chicote de cabos de áudio.",
  "solucao": "**Driver**: Download e instalação do driver oficial do fabricante da placa-mãe/notebook. Remoção completa do driver anterior com DDU (Display Driver Uninstaller para áudio Realtek).\n\n**Serviço**: Reinicialização do Windows Audio e dependências (Windows Audio Endpoint Builder, RPC). Configuração para início automático.\n\n**Hardware**: Resolda do conector P2, substituição de alto-falantes internos ou instalação de placa de som USB/PCI-E como alternativa ao chipset integrado com defeito.\n\n**Configuração**: Definição correta do dispositivo de reprodução padrão, desativação de aprimoramentos de áudio que causam conflito, ajuste de formato de áudio (16/24 bit, 44.1/48 kHz).",
  "quandoCompensa": "Problemas de software são rápidos e baratos de resolver. Mesmo troca de conector P2 ou alto-falantes internos tem custo acessível.",
  "quandoNaoCompensa": "Se o chipset de áudio da placa-mãe falhou em notebook antigo, uma placa de som USB externa (R$ 30-80) pode ser mais prática que micro-solda.",
  "whatsappMessage": "Olá! Meu computador está sem áudio/som. Podem me ajudar?",
  "relatedPages": [
    {
      "to": "/problemas/erro-driver-windows-curitiba",
      "label": "Erro de Driver Windows"
    },
    {
      "to": "/servicos/conserto-pc-notebook",
      "label": "Conserto de PC/Notebook"
    },
    {
      "to": "/problemas/computador-lento-curitiba",
      "label": "Computador Lento"
    },
    {
      "to": "/problemas/pc-sem-imagem-curitiba",
      "label": "PC Sem Imagem"
    },
    {
      "to": "/diagnostico-tecnico",
      "label": "Diagnóstico Técnico"
    }
  ],
  "conteudoExtra": "## Soluções Rápidas Para Problemas de Áudio\n\n### Checklist Antes do Técnico\n1. Verifique se o volume não está no mudo (ícone na barra de tarefas)\n2. Clique com botão direito no ícone de som > Configurações de som > verifique o dispositivo de saída\n3. Teste com fone de ouvido — se funcionar, o problema é nos alto-falantes\n4. Reinicie o computador — às vezes o serviço de áudio trava\n\n### Atalho Útil\n- **Win + I > Sistema > Som**: acesso rápido às configurações de áudio no Windows 10/11\n- **Painel de Controle > Som**: acesso às propriedades avançadas do dispositivo\n\n### Placa de Som USB\nPara quem não quer esperar o reparo, uma placa de som USB externa (adaptador USB para P2) custa entre R$ 20 e R$ 80 e funciona plug-and-play na maioria dos computadores."
};
