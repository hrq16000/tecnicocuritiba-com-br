import type { ProblemaPageData } from "./types";

export const problema: ProblemaPageData = {
  "slug": "tv-travando-lenta-curitiba",
  "title": "Smart TV Travando e Lenta em Curitiba | Conserto",
  "metaDescription": "Smart TV travando, lenta ou apps demorados? Diagnóstico e conserto em Curitiba.",
  "h1": "Smart TV Travando e Lenta — Diagnóstico em Curitiba",
  "categoria": "Problemas de TV",
  "intro": "Smart TVs ficam lentas por cache, firmware desatualizado ou hardware fraco. Muitas vezes é software resolvido com reset. Em outros casos, placa principal com defeito.\n\n**Trazer a TV à oficina.**",
  "sintomas": [
    {
      "titulo": "Apps demoram para abrir",
      "desc": "Netflix, YouTube levam 30+ segundos.",
      "gravidade": "Simples"
    },
    {
      "titulo": "TV congela durante uso",
      "desc": "Imagem trava. RAM ou processador sobrecarregado.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Menu da TV lento",
      "desc": "Configurações demoram para responder.",
      "gravidade": "Simples"
    },
    {
      "titulo": "TV reinicia ao abrir app",
      "desc": "Falta de RAM faz o sistema reiniciar.",
      "gravidade": "Médio"
    }
  ],
  "causas": [
    {
      "titulo": "Cache acumulado",
      "desc": "Apps lotam a memória interna.",
      "tipo": "software"
    },
    {
      "titulo": "Firmware desatualizado",
      "desc": "Versões antigas com bugs.",
      "tipo": "software"
    },
    {
      "titulo": "Hardware subdimensionado",
      "desc": "TVs baratas não acompanham apps modernos.",
      "tipo": "hardware"
    },
    {
      "titulo": "Placa principal com defeito",
      "desc": "Componentes falhando.",
      "tipo": "hardware"
    }
  ],
  "cenarios": [
    {
      "nivel": "Simples",
      "desc": "Reset de fábrica + firmware.",
      "tempo": "1 a 2 horas",
      "custo": "R$ 80 a R$ 150"
    },
    {
      "nivel": "Médio",
      "desc": "Troca de eMMC ou regravação.",
      "tempo": "3 a 7 dias",
      "custo": "R$ 200 a R$ 400"
    },
    {
      "nivel": "Complexo",
      "desc": "Placa principal.",
      "tempo": "5 a 15 dias",
      "custo": "R$ 300 a R$ 800"
    }
  ],
  "riscos": [
    "Reset apaga configurações",
    "TVs antigas sem atualizações"
  ],
  "diagnostico": "Teste de software e hardware. Presencial.",
  "solucao": "Reset, firmware, eMMC ou placa principal.",
  "quandoCompensa": "TVs de até 5 anos.",
  "quandoNaoCompensa": "TVs 7+ anos. Use Chromecast/Fire Stick.",
  "whatsappMessage": "Olá! Minha Smart TV está travando. Podem diagnosticar?",
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
      "label": "TV Desliga Sozinha",
      "to": "/tv-desliga-sozinha-curitiba"
    }
  ],
  "conteudoExtra": "## Antes de Levar\n\n1. Desligue da tomada por 2 min\n2. Limpe cache dos apps\n3. Atualize firmware\n4. Reset de fábrica\n\n## Alternativa\n- Chromecast (R$ 250-350)\n- Fire Stick (R$ 300-400)"
};
