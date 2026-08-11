import type { ProblemaPageData } from "./types";

export const problema: ProblemaPageData = {
  "slug": "computador-nao-conecta-bluetooth-curitiba",
  "title": "Computador Não Conecta Bluetooth em Curitiba | Diagnóstico Rápido",
  "metaDescription": "Bluetooth não funciona no computador? Diagnóstico rápido em Curitiba. Driver, adaptador, configuração. Atendimento no mesmo dia. Atendimento pelo WhatsApp.",
  "h1": "Computador Não Conecta Bluetooth — Diagnóstico e Solução",
  "categoria": "Problemas de Conectividade",
  "intro": "O Bluetooth do seu computador parou de funcionar? Não consegue parear fones, mouse, teclado ou caixas de som sem fio?\n\nEsse problema é extremamente comum e na maioria dos casos é causado por driver, configuração ou adaptador desativado.\n\nEm Curitiba, resolvemos problemas de Bluetooth em PCs e notebooks com rapidez.",
  "sintomas": [
    {
      "titulo": "Ícone Bluetooth não aparece",
      "desc": "Adaptador desativado, driver ausente ou hardware não presente.",
      "gravidade": "Simples a Médio"
    },
    {
      "titulo": "Não encontra dispositivos para parear",
      "desc": "O dispositivo pode não estar em modo de pareamento ou há interferência.",
      "gravidade": "Simples"
    },
    {
      "titulo": "Conecta mas desconecta rapidamente",
      "desc": "Driver instável, interferência Wi-Fi ou bateria do dispositivo.",
      "gravidade": "Simples a Médio"
    },
    {
      "titulo": "Áudio Bluetooth com atraso/cortes",
      "desc": "Protocolo A2DP com problemas, interferência ou largura de banda insuficiente.",
      "gravidade": "Simples"
    },
    {
      "titulo": "Bluetooth conecta mas não funciona",
      "desc": "Perfil errado ativado (ex: telefonia em vez de mídia).",
      "gravidade": "Simples"
    }
  ],
  "causas": [
    {
      "titulo": "Driver Bluetooth corrompido",
      "desc": "Windows Update pode corromper o driver do adaptador Bluetooth.",
      "tipo": "software"
    },
    {
      "titulo": "Adaptador desativado no BIOS/Windows",
      "desc": "Bluetooth pode estar desativado nas configurações do sistema.",
      "tipo": "erro-humano"
    },
    {
      "titulo": "Interferência com Wi-Fi 2.4GHz",
      "desc": "Bluetooth e Wi-Fi 2.4GHz usam a mesma faixa de frequência.",
      "tipo": "hardware"
    },
    {
      "titulo": "Adaptador USB Bluetooth com defeito",
      "desc": "Adaptadores baratos falham com frequência.",
      "tipo": "hardware"
    },
    {
      "titulo": "Serviço Bluetooth parado no Windows",
      "desc": "O serviço do Windows que gerencia Bluetooth pode estar desativado.",
      "tipo": "software"
    }
  ],
  "cenarios": [
    {
      "nivel": "Simples",
      "desc": "Ativação do serviço, reinstalação de driver, reconfiguração",
      "tempo": "15–30min",
      "custo": "R$50–R$100"
    },
    {
      "nivel": "Médio",
      "desc": "Instalação de adaptador USB, ajuste de protocolos, redução de interferência",
      "tempo": "30min–1h",
      "custo": "R$80–R$180"
    },
    {
      "nivel": "Complexo",
      "desc": "Troca de placa wireless com Bluetooth integrado no notebook",
      "tempo": "1–2h",
      "custo": "R$150–R$300"
    }
  ],
  "riscos": [
    "Instalar driver genérico pode causar conflitos com Wi-Fi",
    "Adaptadores USB muito baratos têm alcance mínimo"
  ],
  "diagnostico": "Verificamos status do adaptador, driver, serviços do Windows e fazemos teste de pareamento com dispositivos conhecidos.\n\nPara notebooks, verificamos se a placa wireless inclui Bluetooth (nem todas incluem).",
  "solucao": "Na maioria dos casos: reinstalação de driver + ativação de serviço (15 min). Quando o hardware não tem Bluetooth, instalamos adaptador USB de qualidade.\n\nPara notebooks, podemos trocar a placa wireless por uma com Bluetooth integrado.",
  "quandoCompensa": "Sempre compensa — soluções de Bluetooth são geralmente baratas e rápidas.",
  "quandoNaoCompensa": "Praticamente nunca — adaptadores USB Bluetooth custam a partir de R$30.",
  "whatsappMessage": "Olá! O Bluetooth do meu computador não funciona. Preciso de ajuda.",
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
      "label": "Notebook Sem Wi-Fi",
      "to": "/problemas/notebook-sem-wifi-curitiba"
    },
    {
      "label": "Teclado/Mouse",
      "to": "/problemas/teclado-mouse-nao-funciona-curitiba"
    },
    {
      "label": "Internet Lenta",
      "to": "/problemas/internet-lenta-curitiba"
    }
  ],
  "conteudoExtra": "## Guia: Bluetooth no Computador em Curitiba\n\n### Checklist Rápido\n\n1. Verifique se Bluetooth está ativado (Configurações > Dispositivos)\n2. Coloque o dispositivo em modo de pareamento\n3. Reinicie o serviço Bluetooth (services.msc)\n4. Reinstale o driver no Gerenciador de Dispositivos\n5. Teste com outro dispositivo Bluetooth\n\n### Atendimento em Curitiba\n\nResolvemos problemas de Bluetooth no mesmo dia em toda Curitiba e região."
};
