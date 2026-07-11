import type { ProblemaPageData } from "./types";

export const problema: ProblemaPageData = {
  "slug": "tv-sem-imagem-curitiba",
  "title": "TV Sem Imagem em Curitiba | Tela Preta com Som",
  "metaDescription": "TV ligada mas sem imagem? Tela preta com som funcionando? Conserto de backlight e placa em Curitiba.",
  "h1": "TV Sem Imagem — Diagnóstico e Conserto em Curitiba",
  "categoria": "Problemas de TV",
  "intro": "A TV liga, você ouve o som, mas a tela está preta. Quase sempre é backlight ou placa T-CON.\n\nTeste: ilumine a tela com lanterna no escuro. Se vir imagem fraca, é backlight.\n\n**Necessário trazer a TV à oficina.**",
  "sintomas": [
    {
      "titulo": "Tela preta com som normal",
      "desc": "Backlight queimado é a causa mais provável.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Tela muito escura",
      "desc": "Barras de LED parcialmente queimadas.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Tela pisca e apaga",
      "desc": "Backlight instável.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Metade da tela escura",
      "desc": "Barras de LED queimadas em uma seção.",
      "gravidade": "Médio"
    }
  ],
  "causas": [
    {
      "titulo": "Barras de LED queimadas",
      "desc": "Causa principal em TVs com 3-8 anos.",
      "tipo": "desgaste"
    },
    {
      "titulo": "Placa T-CON com defeito",
      "desc": "Processa a imagem para o painel.",
      "tipo": "hardware"
    },
    {
      "titulo": "Driver de LED queimado",
      "desc": "Circuito na placa fonte.",
      "tipo": "hardware"
    },
    {
      "titulo": "Flat cable solto",
      "desc": "Conexões soltam com variação térmica.",
      "tipo": "desgaste"
    }
  ],
  "cenarios": [
    {
      "nivel": "Simples",
      "desc": "Reconexão de flat cables ou ajuste de driver.",
      "tempo": "1 a 3 dias",
      "custo": "R$ 150 a R$ 300"
    },
    {
      "nivel": "Médio",
      "desc": "Troca de barras de LED.",
      "tempo": "3 a 10 dias",
      "custo": "R$ 250 a R$ 600"
    },
    {
      "nivel": "Complexo",
      "desc": "Troca de T-CON ou reparo combinado.",
      "tempo": "7 a 20 dias",
      "custo": "R$ 400 a R$ 900"
    }
  ],
  "riscos": [
    "Backlight parcial sobrecarrega barras restantes",
    "Abrir a TV em casa pode danificar o painel"
  ],
  "diagnostico": "Teste de backlight com lanterna, medição de tensão do driver. Presencial na oficina.",
  "solucao": "Troca de barras de LED, reparo de driver ou troca de T-CON.",
  "quandoCompensa": "Troca de backlight custa 20-40% de uma TV nova. Quase sempre compensa.",
  "quandoNaoCompensa": "Painel trincado internamente ou modelos muito baratos.",
  "whatsappMessage": "Olá! Minha TV está sem imagem mas com som. Podem diagnosticar?",
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
      "label": "TV Desliga Sozinha",
      "to": "/problemas/tv-desliga-sozinha-curitiba"
    }
  ],
  "conteudoExtra": "## O Teste da Lanterna\n\n1. Ligue a TV\n2. Apague as luzes\n3. Aponte lanterna forte na tela\n4. Se vir imagem fraca = backlight"
};
