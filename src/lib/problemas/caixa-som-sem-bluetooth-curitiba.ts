import type { ProblemaPageData } from "./types";

export const problema: ProblemaPageData = {
  "slug": "caixa-som-sem-bluetooth-curitiba",
  "title": "Caixa de Som Sem Bluetooth em Curitiba | Conserto",
  "metaDescription": "Caixa de som não conecta no Bluetooth? Não aparece para parear? Conserto de módulo Bluetooth em Curitiba.",
  "h1": "Caixa de Som Sem Bluetooth — Conserto em Curitiba",
  "categoria": "Problemas de Rádio / Som",
  "intro": "Caixa de som que não conecta no Bluetooth, não aparece para parear ou desconecta constantemente. Pode ser módulo Bluetooth queimado, antena solta ou firmware.\n\n**Necessário trazer o equipamento à oficina.**",
  "sintomas": [
    {
      "titulo": "Não aparece para parear",
      "desc": "A caixa não é encontrada pelo celular. Módulo Bluetooth com defeito.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Conecta e desconecta",
      "desc": "Pareamento instável, cai a cada poucos segundos. Antena ou interferência.",
      "gravidade": "Simples a médio"
    },
    {
      "titulo": "Conecta mas sem som",
      "desc": "Bluetooth pareado mas nenhum áudio sai. Problema de codec ou amplificador.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Alcance muito curto",
      "desc": "Só funciona a menos de 1 metro. Antena danificada.",
      "gravidade": "Simples"
    }
  ],
  "causas": [
    {
      "titulo": "Módulo Bluetooth queimado",
      "desc": "Chip Bluetooth pode queimar com surto de energia ou desgaste.",
      "tipo": "hardware"
    },
    {
      "titulo": "Antena Bluetooth solta/danificada",
      "desc": "Antena interna desconectada reduz alcance a quase zero.",
      "tipo": "desgaste"
    },
    {
      "titulo": "Firmware corrompido",
      "desc": "Software interno do módulo pode corromper.",
      "tipo": "software"
    },
    {
      "titulo": "Interferência com outros dispositivos",
      "desc": "Muitos dispositivos BT próximos causam conflito.",
      "tipo": "erro-humano"
    }
  ],
  "cenarios": [
    {
      "nivel": "Simples",
      "desc": "Reconexão de antena ou reset de firmware.",
      "tempo": "1 a 2 dias",
      "custo": "R$ 80 a R$ 180"
    },
    {
      "nivel": "Médio",
      "desc": "Troca de módulo Bluetooth.",
      "tempo": "3 a 7 dias",
      "custo": "R$ 120 a R$ 300"
    },
    {
      "nivel": "Complexo",
      "desc": "Módulo soldado na placa principal — microssolda.",
      "tempo": "5 a 10 dias",
      "custo": "R$ 200 a R$ 450"
    }
  ],
  "riscos": [
    "Módulo Bluetooth integrado à placa pode dificultar reparo isolado"
  ],
  "diagnostico": "Teste de pareamento, verificação de módulo e antena. Presencial na oficina.",
  "solucao": "Reset, reconexão de antena ou troca de módulo Bluetooth.",
  "quandoCompensa": "Caixas de som de boa qualidade (JBL, Bose, Harman Kardon, Marshall).",
  "quandoNaoCompensa": "Caixas genéricas baratas onde o módulo é soldado na placa principal.",
  "whatsappMessage": "Olá! Minha caixa de som não conecta no Bluetooth. Podem consertar?",
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
      "label": "Som Chiando",
      "to": "/problemas/som-chiando-curitiba"
    }
  ],
  "conteudoExtra": "## Antes de Trazer\n\n1. Tente \"esquecer\" o dispositivo no celular e parear novamente\n2. Teste com outro celular\n3. Verifique se a caixa está em modo de pareamento (LED piscando)\n4. Reinicie a caixa (desligue e ligue)"
};
