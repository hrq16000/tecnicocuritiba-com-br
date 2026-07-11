import type { ProblemaPageData } from "./types";

export const problema: ProblemaPageData = {
  "slug": "curto-em-placa-eletronica",
  "title": "Curto em Placa Eletrônica | Diagnóstico Curitiba",
  "metaDescription": "Curto-circuito em placa eletrônica? Diagnóstico profissional e reparo com microssolda em Curitiba.",
  "h1": "Curto em Placa Eletrônica — Diagnóstico e Reparo",
  "categoria": "Erros e Casos Reais",
  "intro": "Um curto-circuito em placa eletrônica pode afetar computadores, notebooks, TVs e diversos equipamentos. O curto ocorre quando dois pontos que não deveriam estar conectados fazem contato — por líquido, poeira condutiva, componente queimado ou trilha danificada. O diagnóstico com multímetro e câmera térmica localiza o ponto exato do curto.",
  "sintomas": [
    {
      "titulo": "Equipamento não liga",
      "desc": "Curto impede alimentação. Fonte entra em proteção.",
      "gravidade": "Médio a complexo"
    },
    {
      "titulo": "Cheiro de queimado",
      "desc": "Componente em curto gera calor e queima.",
      "gravidade": "Complexo"
    },
    {
      "titulo": "Funciona parcialmente",
      "desc": "Curto em trilha específica afeta apenas uma função.",
      "gravidade": "Médio"
    }
  ],
  "causas": [
    {
      "titulo": "Líquido na placa",
      "desc": "Água, café ou outros líquidos criam caminhos de curto.",
      "tipo": "erro-humano"
    },
    {
      "titulo": "Componente SMD queimado",
      "desc": "Resistor, capacitor ou diodo que falhou e criou curto.",
      "tipo": "hardware"
    },
    {
      "titulo": "Poeira condutiva",
      "desc": "Acúmulo de poeira metálica ou úmida entre trilhas.",
      "tipo": "desgaste"
    },
    {
      "titulo": "Dano por ferramenta",
      "desc": "Chave de fenda escorregou e riscou trilha, criando contato.",
      "tipo": "erro-humano"
    }
  ],
  "cenarios": [
    {
      "nivel": "Simples",
      "desc": "Limpeza e remoção do agente causador do curto.",
      "tempo": "1h a 2h",
      "custo": "R$ 150 a R$ 300"
    },
    {
      "nivel": "Médio",
      "desc": "Troca de componente SMD em curto.",
      "tempo": "2 a 5 dias",
      "custo": "R$ 200 a R$ 500"
    },
    {
      "nivel": "Complexo",
      "desc": "Reparo de trilha danificada + troca de componentes.",
      "tempo": "5 a 15 dias",
      "custo": "R$ 400 a R$ 800+"
    }
  ],
  "riscos": [
    "Curto em cadeia pode danificar vários componentes",
    "Tentar reparar sem equipamento adequado causa mais dano"
  ],
  "diagnostico": "Localização do curto com multímetro e câmera térmica, identificação do componente causador, análise da extensão do dano. Custo: R$ 99,99-150.",
  "solucao": "Remoção do componente em curto, troca por novo, limpeza e teste completo.",
  "quandoCompensa": "Quando o curto é localizado e o equipamento tem valor. O reparo é viável na maioria dos casos.",
  "quandoNaoCompensa": "Quando o curto causou dano em cadeia extenso.",
  "whatsappMessage": "Olá! Meu equipamento tem curto-circuito. Podem me ajudar?",
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
      "label": "Placa-Mãe Queimada",
      "to": "/problemas/placa-mae-queimada"
    },
    {
      "label": "Conserto Placa",
      "to": "/servicos/conserto-placa"
    },
    {
      "label": "Notebook com Líquido",
      "to": "/problemas/notebook-com-agua-ou-liquido-curitiba"
    },
    {
      "label": "Computador Não Liga",
      "to": "/problemas/computador-nao-liga-curitiba"
    }
  ],
  "conteudoExtra": "### Como Ocorre um Curto?\n\nImagine trilhas de cobre na placa como estradas. Um curto é como uma ponte ilegal entre duas estradas — a energia vai para onde não deveria, causando dano. O diagnóstico localiza essa \"ponte\" e a remove.\n\n### O Processo de Diagnóstico de Curto-Circuito\n\nDiagnosticar um curto em placa eletrônica é um trabalho técnico que exige ferramentas específicas e experiência. O processo na nossa bancada em Curitiba segue estas etapas:\n\n**1. Inspeção Visual com Microscópio**\nAntes de ligar qualquer instrumento, inspecionamos a placa sob microscópio estereoscópico (aumento de 10-40x). Procuramos sinais visíveis: trilhas escurecidas, componentes queimados, resíduos de líquido, soldas frias.\n\n**2. Medição com Multímetro**\nTestamos resistência entre linhas de alimentação. Valores anormalmente baixos (próximos de zero ohms) indicam curto direto. Cada linha de tensão é testada individualmente.\n\n**3. Injeção de Corrente Controlada**\nCom uma fonte de bancada limitada em corrente, alimentamos a placa com tensão baixa. O componente em curto esquenta — e é aí que entra a câmera térmica.\n\n**4. Câmera Térmica / Thermal Pad**\nA câmera infravermelha identifica exatamente qual componente está gerando calor anormal. É o ponto do curto.\n\n**5. Remoção e Teste**\nRemovemos o componente suspeito com estação de solda de ar quente e testamos novamente. Se o curto desaparece, encontramos o culpado.\n\n### Tipos de Componentes que Causam Curto\n\n| Componente | Frequência | Reparo |\n|---|---|---|\n| Capacitor cerâmico | Muito comum | Fácil — troca rápida |\n| MOSFET | Comum | Médio — precisa do componente certo |\n| Diodo de proteção | Comum | Fácil — troca rápida |\n| Chip BGA | Raro | Complexo — reballing ou troca |\n| Trilha danificada | Variável | Médio — ponte com fio |\n\n### Prevenção de Curtos em Equipamentos\n\nEm Curitiba e região metropolitana, os fatores ambientais que mais contribuem para curtos são:\n\n1. **Umidade alta** — especialmente em garagens e cômodos sem ventilação. Use desumidificador ou mantenha o PC em local arejado.\n2. **Poeira** — ambientes com reformas, oficinas mecânicas ou próximos a avenidas movimentadas acumulam poeira condutiva. Limpeza preventiva a cada 6-12 meses.\n3. **Rede elétrica instável** — bairros mais afastados de Curitiba e cidades como Fazenda Rio Grande e Piraquara sofrem mais com oscilações. Use no mínimo filtro de linha com varistor.\n4. **Animais domésticos** — pelos de gato e cachorro acumulam dentro de gabinetes e podem reter umidade."
};
