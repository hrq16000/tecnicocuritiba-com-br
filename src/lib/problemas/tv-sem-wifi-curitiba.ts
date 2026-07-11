import type { ProblemaPageData } from "./types";

export const problema: ProblemaPageData = {
  "slug": "tv-sem-wifi-curitiba",
  "title": "TV Sem Wi-Fi em Curitiba | Problema de Conexão",
  "metaDescription": "Smart TV não conecta no Wi-Fi? Diagnóstico de rede e conserto em Curitiba.",
  "h1": "TV Sem Wi-Fi ou Sem Internet — Diagnóstico em Curitiba",
  "categoria": "Problemas de TV",
  "intro": "Smart TV sem Wi-Fi perde Netflix, YouTube e todos os apps. Pode ser módulo Wi-Fi, roteador ou provedor.\n\n**Necessário trazer a TV à oficina.**",
  "sintomas": [
    {
      "titulo": "Não encontra redes",
      "desc": "Módulo Wi-Fi defeituoso ou antena solta.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Conecta sem internet",
      "desc": "DNS, roteador ou bloqueio.",
      "gravidade": "Simples a médio"
    },
    {
      "titulo": "Wi-Fi instável",
      "desc": "Sinal fraco ou módulo com defeito.",
      "gravidade": "Simples a médio"
    },
    {
      "titulo": "Streaming bufferiza",
      "desc": "Velocidade insuficiente.",
      "gravidade": "Simples"
    }
  ],
  "causas": [
    {
      "titulo": "Módulo Wi-Fi defeituoso",
      "desc": "Chip pode queimar ou degradar.",
      "tipo": "hardware"
    },
    {
      "titulo": "Antena solta",
      "desc": "Cabo da antena pode soltar.",
      "tipo": "desgaste"
    },
    {
      "titulo": "Distância do roteador",
      "desc": "TVs têm antenas fracas.",
      "tipo": "erro-humano"
    },
    {
      "titulo": "Firmware desatualizado",
      "desc": "Bugs de Wi-Fi.",
      "tipo": "software"
    }
  ],
  "cenarios": [
    {
      "nivel": "Simples",
      "desc": "Configuração, troca de canal, firmware.",
      "tempo": "1 a 2 horas",
      "custo": "R$ 80 a R$ 150"
    },
    {
      "nivel": "Médio",
      "desc": "Reconexão de antena ou troca de módulo.",
      "tempo": "1 a 3 dias",
      "custo": "R$ 150 a R$ 350"
    },
    {
      "nivel": "Complexo",
      "desc": "Módulo soldado — microssolda.",
      "tempo": "3 a 10 dias",
      "custo": "R$ 250 a R$ 500"
    }
  ],
  "riscos": [
    "Sem Wi-Fi, atualizações de segurança param"
  ],
  "diagnostico": "Teste de módulo, verificação de antena. Presencial na oficina.",
  "solucao": "Configuração, troca de módulo ou cabo ethernet.",
  "quandoCompensa": "Troca de módulo é acessível. Alternativa: cabo ethernet.",
  "quandoNaoCompensa": "Módulo soldado em TV barata.",
  "whatsappMessage": "Olá! Minha Smart TV não conecta no Wi-Fi. Podem ajudar?",
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
      "label": "Smart TV Lenta",
      "to": "/problemas/smart-tv-lenta-curitiba"
    },
    {
      "label": "Redes Wi-Fi",
      "to": "/servicos/redes-wifi"
    }
  ],
  "conteudoExtra": "## Antes de Trazer\n\n1. Teste Wi-Fi com outro dispositivo no mesmo local\n2. Reinicie o roteador\n3. Tente cabo ethernet\n4. Verifique se a TV é 2.4 GHz only"
};
