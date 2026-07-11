import type { ProblemaPageData } from "./types";

export const problema: ProblemaPageData = {
  "slug": "som-chiando-curitiba",
  "title": "Som Chiando em Curitiba | Conserto de Áudio",
  "metaDescription": "Som chiando, com ruído, estalo ou distorção? Conserto de caixa de som, amplificador e receiver em Curitiba. Diagnóstico presencial.",
  "h1": "Som Chiando ou com Ruído — Conserto em Curitiba",
  "categoria": "Problemas de Rádio / Som",
  "intro": "Chiado, estalo, zumbido ou distorção no som podem ter várias causas — desde cabos mal conectados até alto-falantes queimados ou amplificadores com defeito. O tipo de ruído ajuda muito no diagnóstico.\n\n**Necessário trazer o equipamento à oficina.**",
  "sintomas": [
    {
      "titulo": "Chiado constante (hiss)",
      "desc": "Ruído de fundo mesmo sem música. Amplificador ou pré-amplificador.",
      "gravidade": "Simples a médio"
    },
    {
      "titulo": "Estalos ao tocar música",
      "desc": "Pops e clicks durante reprodução. Potenciômetro sujo ou solda fria.",
      "gravidade": "Simples a médio"
    },
    {
      "titulo": "Zumbido grave (hum)",
      "desc": "Zumbido em 60Hz constante. Problema de aterramento ou filtro da fonte.",
      "gravidade": "Simples"
    },
    {
      "titulo": "Distorção no volume alto",
      "desc": "Som distorce quando aumenta volume. Alto-falante ou amplificador saturado.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Som só em um canal",
      "desc": "Um lado funciona, outro não ou chia. Amplificador ou cabo.",
      "gravidade": "Simples a médio"
    }
  ],
  "causas": [
    {
      "titulo": "Potenciômetro de volume sujo",
      "desc": "Sujeira e oxidação no potenciômetro causam estalos ao girar o volume.",
      "tipo": "desgaste"
    },
    {
      "titulo": "Alto-falante com bobina danificada",
      "desc": "Bobina descolada ou raspando causa distorção e chiado.",
      "tipo": "desgaste"
    },
    {
      "titulo": "Capacitores de filtro degradados",
      "desc": "Capacitores eletrolíticos da fonte envelhecem e causam zumbido.",
      "tipo": "desgaste"
    },
    {
      "titulo": "Cabos e conectores oxidados",
      "desc": "Oxidação nos conectores RCA, P2 ou P10 causa mau contato e ruído.",
      "tipo": "desgaste"
    },
    {
      "titulo": "CI amplificador com defeito",
      "desc": "Chip de amplificação parcialmente queimado causa distorção.",
      "tipo": "hardware"
    }
  ],
  "cenarios": [
    {
      "nivel": "Simples",
      "desc": "Limpeza de potenciômetro, troca de cabos ou conectores.",
      "tempo": "1 a 2 dias",
      "custo": "R$ 80 a R$ 180"
    },
    {
      "nivel": "Médio",
      "desc": "Troca de capacitores, reparo de solda fria ou troca de alto-falante.",
      "tempo": "3 a 7 dias",
      "custo": "R$ 150 a R$ 400"
    },
    {
      "nivel": "Complexo",
      "desc": "Troca de CI amplificador ou reparo de placa.",
      "tempo": "7 a 15 dias",
      "custo": "R$ 250 a R$ 600"
    }
  ],
  "riscos": [
    "Usar som distorcido por muito tempo pode queimar alto-falantes",
    "Volume alto com amplificador defeituoso danifica caixas"
  ],
  "diagnostico": "Teste de canais, medição de saída do amplificador, verificação de alto-falantes e cabos. Presencial na oficina.",
  "solucao": "Limpeza de potenciômetros, troca de capacitores, reparo de amplificador ou troca de alto-falante.",
  "quandoCompensa": "Equipamentos de qualidade sempre compensam. Limpeza de potenciômetro é barata e resolve muitos casos.",
  "quandoNaoCompensa": "Caixas de som bluetooth baratas com amplificador integrado queimado.",
  "whatsappMessage": "Olá! Meu som está chiando/com ruído. Podem diagnosticar?",
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
      "label": "Rádio Não Liga",
      "to": "/problemas/radio-nao-liga-curitiba"
    },
    {
      "label": "Caixa de Som Sem Áudio",
      "to": "/problemas/caixa-som-sem-audio-curitiba"
    }
  ],
  "conteudoExtra": "## Tipos de Ruído\n\n| Ruído | Causa Provável |\n|-------|----------------|\n| Chiado (hiss) | Pré-amplificador ou ganho alto |\n| Estalo (pop/click) | Potenciômetro sujo |\n| Zumbido (hum 60Hz) | Aterramento ou fonte |\n| Distorção | Amplificador ou alto-falante |\n| Microfonia | Feedback do microfone |"
};
