import type { ProblemaPageData } from "./types";

export const problema: ProblemaPageData = {
  "slug": "tv-nao-conecta-wifi-bluetooth-curitiba",
  "title": "TV Não Conecta Wi-Fi/Bluetooth em Curitiba",
  "metaDescription": "Smart TV sem Wi-Fi ou Bluetooth? Módulo wireless defeituoso? Conserto em Curitiba.",
  "h1": "TV Não Conecta Wi-Fi nem Bluetooth — Conserto em Curitiba",
  "categoria": "Problemas de TV",
  "intro": "Wi-Fi e Bluetooth usam mesmo módulo. Quando ambos falham, é o módulo. Pode ser software (reset) ou hardware (troca).\n\n**Trazer à oficina.**",
  "sintomas": [
    {
      "titulo": "Não encontra redes",
      "desc": "Módulo desativado ou defeituoso.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Conecta e cai",
      "desc": "Módulo, roteador ou interferência.",
      "gravidade": "Simples a Médio"
    },
    {
      "titulo": "Bluetooth não pareia",
      "desc": "Não encontra dispositivos.",
      "gravidade": "Médio"
    }
  ],
  "causas": [
    {
      "titulo": "Módulo defeituoso",
      "desc": "Peça substituível.",
      "tipo": "hardware"
    },
    {
      "titulo": "Antena desconectada",
      "desc": "Vibração ou transporte.",
      "tipo": "hardware"
    },
    {
      "titulo": "Firmware",
      "desc": "Bugs de conectividade.",
      "tipo": "software"
    }
  ],
  "cenarios": [
    {
      "nivel": "Simples",
      "desc": "Reset de rede ou firmware.",
      "tempo": "1 hora",
      "custo": "R$ 80 a R$ 150"
    },
    {
      "nivel": "Médio",
      "desc": "Troca do módulo.",
      "tempo": "3 a 10 dias",
      "custo": "R$ 200 a R$ 400"
    },
    {
      "nivel": "Complexo",
      "desc": "Placa principal.",
      "tempo": "7 a 15 dias",
      "custo": "R$ 350 a R$ 700"
    }
  ],
  "riscos": [
    "TV perde funções smart"
  ],
  "diagnostico": "Software, módulo, antenas. Presencial.",
  "solucao": "Reset, firmware ou troca do módulo.",
  "quandoCompensa": "Sempre — módulo barato.",
  "quandoNaoCompensa": "Placa principal em TV barata.",
  "whatsappMessage": "Olá! TV não conecta Wi-Fi. Podem diagnosticar?",
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
      "label": "Conserto de TV",
      "to": "/servicos/conserto-tv"
    },
    {
      "label": "TV Sem Wi-Fi",
      "to": "/tv-sem-wifi-curitiba"
    }
  ],
  "conteudoExtra": "## Alternativa\n- Cabo Ethernet\n- Chromecast/Fire Stick"
};
