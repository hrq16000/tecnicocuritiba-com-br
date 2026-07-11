import type { ProblemaPageData } from "./types";

export const problema: ProblemaPageData = {
  "slug": "notebook-desligando-sozinho-curitiba",
  "title": "Notebook Desligando Sozinho | Técnico em Curitiba",
  "metaDescription": "Notebook desligando sozinho? Superaquecimento, bateria ou placa-mãe. Diagnóstico profissional em Curitiba.",
  "h1": "Notebook Desligando Sozinho em Curitiba — Causas e Solução",
  "categoria": "Notebook",
  "intro": "Notebook que desliga sozinho é sinal de proteção ativa — o sistema está se desligando para evitar dano. As causas mais comuns são superaquecimento (pasta térmica seca, poeira) e bateria degradada. Em casos mais sérios, pode ser a placa-mãe. O diagnóstico profissional identifica a causa exata antes de qualquer reparo.",
  "sintomas": [
    {
      "titulo": "Desliga após minutos de uso intenso",
      "desc": "Superaquecimento. O processador atinge temperatura crítica.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Desliga ao desconectar da tomada",
      "desc": "Bateria completamente degradada. Só funciona na energia.",
      "gravidade": "Simples"
    },
    {
      "titulo": "Desliga aleatoriamente",
      "desc": "Sem padrão definido. Pode ser placa-mãe, RAM ou fonte.",
      "gravidade": "Médio a complexo"
    }
  ],
  "causas": [
    {
      "titulo": "Superaquecimento",
      "desc": "Causa mais comum. Pasta térmica seca + poeira = proteção térmica ativa.",
      "tipo": "desgaste"
    },
    {
      "titulo": "Bateria degradada",
      "desc": "Bateria que não segura carga desliga o notebook ao sair da tomada.",
      "tipo": "desgaste"
    },
    {
      "titulo": "Curto intermitente na placa-mãe",
      "desc": "Trilha danificada ou componente com solda fria causa desligamentos aleatórios.",
      "tipo": "hardware"
    }
  ],
  "cenarios": [
    {
      "nivel": "Simples",
      "desc": "Limpeza + pasta térmica ou troca de bateria.",
      "tempo": "1h a 2h",
      "custo": "R$ 150 a R$ 350"
    },
    {
      "nivel": "Médio",
      "desc": "Diagnóstico de placa + reparo de componente.",
      "tempo": "2 a 5 dias",
      "custo": "R$ 250 a R$ 500"
    },
    {
      "nivel": "Complexo",
      "desc": "Reparo de placa-mãe com microssolda.",
      "tempo": "5 a 10 dias",
      "custo": "R$ 400 a R$ 800"
    }
  ],
  "riscos": [
    "Cada desligamento abrupto pode corromper dados",
    "Bateria inchada pode ser perigosa",
    "Ignorar superaquecimento danifica GPU permanentemente"
  ],
  "diagnostico": "Teste de temperatura, teste de bateria, análise de placa-mãe. Custo: R$ 99,99.",
  "solucao": "Identificação e reparo da causa específica. Para superaquecimento: limpeza completa. Para bateria: troca. Para placa: reparo em bancada.",
  "quandoCompensa": "Compensa para notebooks de menos de 5 anos com causa identificável.",
  "quandoNaoCompensa": "Não compensa reparo complexo de placa-mãe em notebook de baixo valor.",
  "whatsappMessage": "Olá! Meu notebook está desligando sozinho. Podem me ajudar?",
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
      "label": "Notebook Esquentando",
      "to": "/problemas/notebook-esquentando-curitiba"
    },
    {
      "label": "Notebook Não Liga",
      "to": "/problemas/notebook-nao-liga-curitiba"
    }
  ],
  "conteudoExtra": "### Bateria Inchada: Atenção!\n\nSe o notebook está com a base estufada ou o touchpad levantando, a bateria pode estar inchada. Pare de usar imediatamente e procure assistência. Bateria inchada pode explodir ou pegar fogo."
};
