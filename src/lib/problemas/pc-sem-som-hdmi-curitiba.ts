import type { ProblemaPageData } from "./types";

export const problema: ProblemaPageData = {
  "slug": "pc-sem-som-hdmi-curitiba",
  "title": "PC Sem Som no HDMI em Curitiba | Diagnóstico e Solução",
  "metaDescription": "PC ou notebook sem som na TV via HDMI? Áudio não sai pelo HDMI? Técnico em Curitiba resolve problemas de áudio HDMI com diagnóstico preciso.",
  "h1": "PC Sem Som no HDMI — Diagnóstico e Solução em Curitiba",
  "categoria": "Hardware / Áudio",
  "intro": "Conectar o PC ou notebook na TV via HDMI e não ter som é um problema extremamente comum e frustrante. O cabo HDMI transmite tanto vídeo quanto áudio, mas o Windows nem sempre configura automaticamente a saída de som para o dispositivo HDMI.\n\nAs causas variam desde configurações simples de dispositivo de reprodução até problemas mais complexos com drivers de áudio HDMI (geralmente vinculados à placa de vídeo), cabos defeituosos ou incompatibilidade de handshake HDMI entre o PC e a TV.\n\nEm Curitiba, nosso técnico diagnostica e resolve problemas de áudio HDMI em PCs, notebooks e home theaters, garantindo que vídeo e som funcionem perfeitamente na sua TV.",
  "sintomas": [
    {
      "titulo": "Imagem aparece na TV mas sem som",
      "desc": "O vídeo é transmitido normalmente pelo HDMI, porém o áudio continua saindo pelos alto-falantes do PC/notebook.",
      "gravidade": "Simples"
    },
    {
      "titulo": "Dispositivo HDMI não aparece nas opções de som",
      "desc": "Ao acessar as configurações de som do Windows, não há opção de saída HDMI disponível para seleção.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Som no HDMI falha intermitentemente",
      "desc": "O áudio funciona por alguns minutos e depois para, ou falha ao alternar entre aplicações.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Áudio com estalos ou distorção pelo HDMI",
      "desc": "O som sai pela TV mas com qualidade degradada, estalos, atrasos ou cortes frequentes.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Som funciona com um cabo mas não com outro",
      "desc": "Trocar o cabo HDMI resolve temporariamente, indicando problema no cabo ou na porta HDMI.",
      "gravidade": "Simples"
    },
    {
      "titulo": "HDMI funciona em uma TV mas não em outra",
      "desc": "O áudio HDMI funciona em determinados dispositivos mas falha em outros, indicando problema de handshake ou EDID.",
      "gravidade": "Complexo"
    }
  ],
  "causas": [
    {
      "titulo": "Dispositivo de reprodução padrão incorreto",
      "desc": "O Windows está configurado para enviar o áudio para os alto-falantes internos ou outra saída, ignorando o HDMI.",
      "tipo": "software"
    },
    {
      "titulo": "Driver de áudio HDMI não instalado",
      "desc": "O componente de áudio HD da placa de vídeo (NVIDIA/AMD/Intel) não está instalado ou está desabilitado no Gerenciador de Dispositivos.",
      "tipo": "software"
    },
    {
      "titulo": "Cabo HDMI defeituoso ou de baixa qualidade",
      "desc": "Cabos HDMI danificados ou de qualidade inferior podem transmitir vídeo mas falhar na transmissão de áudio.",
      "tipo": "hardware"
    },
    {
      "titulo": "Porta HDMI com defeito",
      "desc": "Pinos danificados na porta HDMI do PC ou da TV podem comprometer o canal de áudio.",
      "tipo": "hardware"
    },
    {
      "titulo": "Incompatibilidade de handshake HDMI/EDID",
      "desc": "O protocolo de negociação entre PC e TV falha, resultando em transmissão parcial (apenas vídeo).",
      "tipo": "hardware"
    }
  ],
  "cenarios": [
    {
      "nivel": "Simples",
      "desc": "Configuração do dispositivo de reprodução padrão e habilitação do áudio HDMI no Windows.",
      "tempo": "30min–1h",
      "custo": "R$80–R$120"
    },
    {
      "nivel": "Médio",
      "desc": "Instalação/atualização de drivers de áudio HDMI da placa de vídeo e configuração avançada.",
      "tempo": "1–2h",
      "custo": "R$120–R$200"
    },
    {
      "nivel": "Complexo",
      "desc": "Problema de hardware na porta HDMI ou placa de vídeo — diagnóstico com teste de componentes.",
      "tempo": "2–4h",
      "custo": "R$200–R$350"
    }
  ],
  "riscos": [
    "Instalar drivers genéricos pode causar conflitos com a placa de vídeo e afetar o desempenho gráfico",
    "Forçar resoluções incompatíveis pode danificar a configuração de vídeo, resultando em tela preta",
    "Desabilitar dispositivos de áudio incorretos pode deixar o PC completamente sem som",
    "Usar adaptadores HDMI de baixa qualidade pode danificar a porta HDMI do PC ou da TV"
  ],
  "diagnostico": "O diagnóstico de problemas de áudio HDMI segue estas etapas:\n\n1. Verificação das configurações de dispositivo de reprodução padrão no Windows.\n2. Teste com cabo HDMI diferente para descartar problema no cabo.\n3. Verificação do Gerenciador de Dispositivos para drivers de áudio HDMI (Intel Display Audio, NVIDIA High Definition Audio, AMD High Definition Audio).\n4. Teste em outra TV/monitor para isolar o problema.\n5. Análise dos logs de eventos do Windows para erros de dispositivo de áudio.\n\nO diagnóstico custa a partir de R$50 e é abatido do serviço caso o reparo seja aprovado.",
  "solucao": "A solução para problemas de áudio HDMI envolve:\n\n**Configuração de software:**\nDefinir o dispositivo HDMI como saída de áudio padrão em Configurações > Som > Saída. Habilitar dispositivos desabilitados e desconectados na lista de reprodução.\n\n**Drivers:**\nInstalar o driver completo da placa de vídeo (NVIDIA GeForce Experience, AMD Adrenalin ou Intel Graphics) com o componente de áudio HD incluído. Verificar se o \"HD Audio Controller\" está habilitado no Gerenciador de Dispositivos.\n\n**Hardware:**\nTeste e substituição de cabo HDMI. Verificação das portas HDMI com lupa para identificar pinos danificados. Em último caso, uso de extrator de áudio HDMI ou adaptador DisplayPort-HDMI com suporte a áudio.\n\nTodas as soluções incluem teste completo com o equipamento do cliente.",
  "quandoCompensa": "Sempre compensa resolver, pois na maioria dos casos é um problema de configuração ou driver que se resolve rapidamente e a baixo custo.",
  "quandoNaoCompensa": "Quando a porta HDMI da placa-mãe ou placa de vídeo está fisicamente danificada e o custo de reparo se aproxima do valor de uma placa de vídeo nova.",
  "whatsappMessage": "Olá! Meu PC/notebook não está enviando som pelo HDMI para a TV. Preciso de ajuda em Curitiba.",
  "relatedPages": [
    {
      "to": "/problemas/notebook-sem-audio-curitiba",
      "label": "Notebook Sem Áudio"
    },
    {
      "to": "/conserto-notebook-curitiba",
      "label": "Conserto de Notebook"
    },
    {
      "to": "/problemas/computador-lento-curitiba",
      "label": "Computador Lento"
    },
    {
      "to": "/redes-wifi-curitiba",
      "label": "Redes e Wi-Fi"
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
  "conteudoExtra": "## Guia Rápido: Verificando o Áudio HDMI no Windows\n\n### Passo 1: Verificar dispositivo de reprodução\n1. Clique com o botão direito no ícone de som na bandeja do sistema\n2. Selecione \"Configurações de som\"\n3. Em \"Saída\", verifique se o dispositivo HDMI está listado e selecionado\n\n### Passo 2: Verificar dispositivos ocultos\n1. Clique com o botão direito no ícone de som\n2. Selecione \"Configurações de som\" > \"Mais configurações de som\"\n3. Na aba \"Reprodução\", clique com o botão direito e marque \"Mostrar dispositivos desabilitados\"\n4. Se o HDMI aparecer desabilitado, clique com o botão direito e selecione \"Habilitar\"\n\n### HDMI ARC vs HDMI normal\nSe você está conectando a uma soundbar via HDMI ARC na TV, certifique-se de usar a porta HDMI marcada como \"ARC\" na TV e habilitar o CEC/ARC nas configurações da TV.\n\n## Diferenças entre HDMI 1.4, 2.0 e 2.1\nTodos suportam áudio, mas cabos mais antigos (1.4) podem não suportar formatos avançados como Dolby Atmos. Para uso básico (TV como monitor), qualquer versão funciona."
};
