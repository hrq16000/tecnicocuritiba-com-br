import type { ProblemaPageData } from "./types";

export const problema: ProblemaPageData = {
  "slug": "tv-som-sem-video-curitiba",
  "title": "TV com Som Mas Sem Vídeo em Curitiba | Conserto",
  "metaDescription": "TV com som mas sem vídeo? Tela apagada mas áudio funcionando? Diagnóstico e conserto em Curitiba.",
  "h1": "TV com Som Mas Sem Vídeo — Conserto em Curitiba",
  "categoria": "Problemas de TV",
  "intro": "Quando a TV tem som mas não tem vídeo, o problema está no backlight ou na T-CON. A placa principal funciona — por isso o áudio está OK.\n\n**Necessário trazer a TV à oficina.**",
  "sintomas": [
    {
      "titulo": "Som perfeito, tela preta",
      "desc": "Backlight ou T-CON.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Tela acende sem imagem",
      "desc": "T-CON ou flat cable.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Imagem aparece e some",
      "desc": "Backlight instável.",
      "gravidade": "Médio"
    }
  ],
  "causas": [
    {
      "titulo": "Backlight queimado",
      "desc": "LEDs de iluminação queimados.",
      "tipo": "desgaste"
    },
    {
      "titulo": "T-CON com defeito",
      "desc": "Distribui sinal de vídeo para o painel.",
      "tipo": "hardware"
    },
    {
      "titulo": "Flat cable danificado",
      "desc": "Conexão frágil entre T-CON e painel.",
      "tipo": "desgaste"
    },
    {
      "titulo": "Driver de backlight",
      "desc": "Circuito na placa fonte.",
      "tipo": "hardware"
    }
  ],
  "cenarios": [
    {
      "nivel": "Simples",
      "desc": "Reconexão de flat cable.",
      "tempo": "1 a 3 dias",
      "custo": "R$ 150 a R$ 250"
    },
    {
      "nivel": "Médio",
      "desc": "Troca de barras de LED ou T-CON.",
      "tempo": "3 a 10 dias",
      "custo": "R$ 250 a R$ 600"
    },
    {
      "nivel": "Complexo",
      "desc": "Reparo combinado.",
      "tempo": "7 a 20 dias",
      "custo": "R$ 400 a R$ 900"
    }
  ],
  "riscos": [
    "Forçar ligar repetidamente pode danificar mais componentes"
  ],
  "diagnostico": "Teste de backlight, medição de driver, verificação de T-CON. Presencial na oficina.",
  "solucao": "Troca de backlight, reparo de driver ou troca de T-CON.",
  "quandoCompensa": "Reparo custa 25-40% de TV nova equivalente.",
  "quandoNaoCompensa": "Painel LCD danificado internamente.",
  "whatsappMessage": "Olá! Minha TV tem som mas não tem imagem. Podem consertar?",
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
      "label": "TV Não Liga",
      "to": "/problemas/tv-nao-liga-curitiba"
    },
    {
      "label": "TV Sem Imagem",
      "to": "/problemas/tv-sem-imagem-curitiba"
    }
  ],
  "conteudoExtra": "## Diferença\n\n- **Sem imagem (tela preta):** Backlight\n- **Sem vídeo (tela acende):** T-CON ou sinal"
};
