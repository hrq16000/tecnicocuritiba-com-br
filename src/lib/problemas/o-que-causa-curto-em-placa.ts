import type { ProblemaPageData } from "./types";

export const problema: ProblemaPageData = {
  "slug": "o-que-causa-curto-em-placa",
  "title": "O Que Causa Curto em Placa Eletrônica?",
  "metaDescription": "Entenda o que causa curto-circuito em placas eletrônicas. Prevenção, causas e reparo. Curitiba.",
  "h1": "O Que Causa Curto em Placa Eletrônica?",
  "categoria": "Buscas Educativas",
  "intro": "Curto-circuito em placas eletrônicas é um dos problemas mais técnicos que atendemos. Entender como ele acontece ajuda a prevenir e a tomar decisões mais informadas sobre reparo. Neste guia educativo, explicamos as causas, como identificar e como prevenir.",
  "sintomas": [
    {
      "titulo": "Equipamento não liga",
      "desc": "Curto impede fornecimento de energia.",
      "gravidade": "Complexo"
    }
  ],
  "causas": [
    {
      "titulo": "Líquido",
      "desc": "Qualquer líquido condutivo entre trilhas energizadas causa curto instantâneo.",
      "tipo": "erro-humano"
    },
    {
      "titulo": "Poeira metálica",
      "desc": "Ambientes com partículas metálicas (oficinas, indústrias).",
      "tipo": "desgaste"
    },
    {
      "titulo": "Componente que falhou",
      "desc": "Capacitor ou transistor que entrou em curto internamente.",
      "tipo": "hardware"
    },
    {
      "titulo": "Dano mecânico",
      "desc": "Ferramenta que riscou trilha, parafuso que caiu na placa.",
      "tipo": "erro-humano"
    }
  ],
  "cenarios": [
    {
      "nivel": "Simples",
      "desc": "Limpeza remove causa do curto.",
      "tempo": "1h",
      "custo": "R$ 150 a R$ 300"
    },
    {
      "nivel": "Médio",
      "desc": "Troca de componente em curto.",
      "tempo": "3 a 5 dias",
      "custo": "R$ 200 a R$ 500"
    },
    {
      "nivel": "Complexo",
      "desc": "Reparo de trilha + troca de componentes.",
      "tempo": "5 a 15 dias",
      "custo": "R$ 400 a R$ 800"
    }
  ],
  "riscos": [
    "Curto pode causar dano em cadeia",
    "Reparo amador piora o problema"
  ],
  "diagnostico": "Localização com multímetro e câmera térmica. Custo: R$ 99,99-150.",
  "solucao": "Remoção da causa + troca do componente + teste completo.",
  "quandoCompensa": "Na maioria dos casos quando o curto é localizado.",
  "quandoNaoCompensa": "Quando causou dano extenso em cadeia.",
  "whatsappMessage": "Olá! Meu equipamento teve curto-circuito. Podem me ajudar?",
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
      "label": "Curto em Placa",
      "to": "/problemas/curto-em-placa-eletronica"
    },
    {
      "label": "Placa-Mãe Queimada",
      "to": "/problemas/placa-mae-queimada"
    },
    {
      "label": "Riscos de Consertar Sozinho",
      "to": "/problemas/riscos-de-tentar-consertar"
    },
    {
      "label": "Conserto Placa",
      "to": "/servicos/conserto-placa"
    }
  ],
  "conteudoExtra": "### Como Prevenir Curtos\n\n1. Use estabilizador ou nobreak\n2. Mantenha o equipamento em local seco e limpo\n3. Evite comer/beber perto do computador\n4. Faça limpeza preventiva anual\n5. Use fonte de qualidade\n\n### Entendendo o Curto-Circuito: Explicação Simples\n\nImagine as trilhas de cobre na placa como ruas de uma cidade. Cada rua leva energia para um destino específico (processador, memória, vídeo). Um curto-circuito é como construir uma ponte ilegal entre duas ruas — a energia vai para onde não deveria, e o resultado é destruição.\n\n### Os 4 Tipos de Curto em Placas\n\n**1. Curto Direto (Baixa Resistência)**\nDois pontos conectados com resistência quase zero. A corrente sobe dramaticamente e queima o componente ou a trilha. Causa: líquido, solda com excesso, parafuso solto.\n\n**2. Curto por Fuga (Alta Resistência)**\nConexão parcial — corrente pequena \"vaza\" onde não deveria. Pode causar comportamento errático sem queimar. Causa: umidade, oxidação, poeira condutiva.\n\n**3. Curto Intermitente**\nAcontece apenas em certas condições (temperatura, vibração, posição). O mais difícil de diagnosticar. Causa: solda fria, fio parcialmente rompido, componente com fissura.\n\n**4. Curto em Cadeia**\nUm componente queima e o curto se propaga para componentes adjacentes. Pode transformar um reparo simples em dano extenso. Causa: continuar usando equipamento com cheiro de queimado.\n\n### Fatores Ambientais em Curitiba e Região\n\nO clima e as condições locais influenciam na incidência de curtos:\n\n**Umidade** — Curitiba tem umidade relativa média de 80-85%. Equipamentos em garagens, sótãos ou próximos a janelas estão mais sujeitos a oxidação e curtos por umidade.\n\n**Tempestades elétricas** — O Paraná é um dos estados com maior incidência de raios no Brasil. Surtos de tensão causados por descargas atmosféricas podem induzir curtos em equipamentos sem proteção.\n\n**Poeira** — Regiões com obras ou próximas a vias movimentadas (BR-116, BR-277) acumulam mais poeira. Poeira misturada com umidade se torna condutiva.\n\n### Kit de Prevenção Recomendado\n\n| Item | Custo | Proteção |\n|---|---|---|\n| Filtro de linha com varistor | R$ 30-80 | Surtos leves |\n| Estabilizador | R$ 150-300 | Variação de tensão |\n| Nobreak | R$ 400-1000 | Queda + surto |\n| Limpeza preventiva anual | R$ 120-200 | Poeira + pasta térmica |\n| Desumidificador (ambientes úmidos) | R$ 200-600 | Umidade |"
};
