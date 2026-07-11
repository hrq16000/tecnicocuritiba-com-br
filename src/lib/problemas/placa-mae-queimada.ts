import type { ProblemaPageData } from "./types";

export const problema: ProblemaPageData = {
  "slug": "placa-mae-queimada",
  "title": "Placa-Mãe Queimada | Diagnóstico Curitiba",
  "metaDescription": "Placa-mãe queimada? Veja sintomas, causas e quando compensa reparar. Diagnóstico profissional em Curitiba.",
  "h1": "Placa-Mãe Queimada — Diagnóstico e Opções",
  "categoria": "Erros e Casos Reais",
  "intro": "Uma placa-mãe queimada é um dos diagnósticos mais temidos — mas nem sempre significa substituição total. Em muitos casos, o dano é localizado (um capacitor, um regulador de tensão, uma trilha) e pode ser reparado em bancada por um valor muito menor que a troca.",
  "sintomas": [
    {
      "titulo": "Computador não liga de jeito nenhum",
      "desc": "Curto na placa impede qualquer inicialização.",
      "gravidade": "Complexo"
    },
    {
      "titulo": "Cheiro de queimado",
      "desc": "Componente queimou. Pode ser localizado ou extenso.",
      "gravidade": "Complexo"
    },
    {
      "titulo": "Funciona parcialmente",
      "desc": "Algumas portas não funcionam, USB mortas, etc.",
      "gravidade": "Médio"
    }
  ],
  "causas": [
    {
      "titulo": "Pico de energia",
      "desc": "Surto na rede elétrica queima componentes. Usar estabilizador/nobreak previne.",
      "tipo": "hardware"
    },
    {
      "titulo": "Curto por líquido ou poeira",
      "desc": "Líquido ou poeira condutiva entre trilhas causa curto.",
      "tipo": "erro-humano"
    },
    {
      "titulo": "Desgaste natural",
      "desc": "Capacitores estufam após 5-10 anos de uso.",
      "tipo": "desgaste"
    },
    {
      "titulo": "Uso de fonte de baixa qualidade",
      "desc": "Fontes genéricas podem enviar tensão irregular e danificar a placa.",
      "tipo": "hardware"
    }
  ],
  "cenarios": [
    {
      "nivel": "Simples",
      "desc": "Componente localizado (capacitor, fusível). Reparo em bancada.",
      "tempo": "2 a 5 dias",
      "custo": "R$ 200 a R$ 400"
    },
    {
      "nivel": "Médio",
      "desc": "Regulador de tensão ou múltiplos capacitores.",
      "tempo": "5 a 10 dias",
      "custo": "R$ 300 a R$ 600"
    },
    {
      "nivel": "Complexo",
      "desc": "Dano extenso — troca de placa necessária.",
      "tempo": "Depende",
      "custo": "R$ 400 a R$ 1500+ (placa nova)"
    }
  ],
  "riscos": [
    "Continuar usando com queima parcial pode danificar outros componentes",
    "Reparo amador pode causar mais curtos"
  ],
  "diagnostico": "Inspeção visual com lupa/microscópio, teste de curto com multímetro, medição de tensões. Custo: R$ 99,99.",
  "solucao": "Para dano localizado: reparo com microssolda. Para dano extenso: troca de placa.",
  "quandoCompensa": "Reparo de componentes localizados quase sempre compensa. Vale verificar antes de comprar placa nova.",
  "quandoNaoCompensa": "Dano extenso em placa antiga onde o custo da troca supera o valor do computador.",
  "whatsappMessage": "Olá! Acho que a placa-mãe do meu computador queimou. Podem me ajudar?",
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
      "label": "Computador Não Liga",
      "to": "/problemas/computador-nao-liga-curitiba"
    },
    {
      "label": "Curto em Placa",
      "to": "/problemas/curto-em-placa-eletronica"
    },
    {
      "label": "Conserto Placa",
      "to": "/servicos/conserto-placa"
    },
    {
      "label": "GPU Desgastada",
      "to": "/problemas/gpu-desgastada"
    },
    {
      "label": "Vale Consertar?",
      "to": "/problemas/vale-a-pena-consertar-computador"
    }
  ],
  "conteudoExtra": "### Vale a Pena Reparar a Placa-Mãe?\n\nDepende:\n- **Sim**: quando o dano é localizado (1-2 componentes), reparo custa R$ 200-400\n- **Talvez**: quando precisa de análise para determinar extensão\n- **Não**: quando há queima extensa ou a placa é antiga demais\n\n### Anatomia de uma Placa-Mãe: O Que Pode Queimar\n\nUma placa-mãe é um circuito complexo com centenas de componentes. Quando dizemos \"queimou\", pode significar coisas bem diferentes:\n\n**Capacitores** — São os cilindros metálicos visíveis na placa. Quando estufam (topo arredondado em vez de plano) ou vazam (resíduo marrom), estão com defeito. É o reparo mais comum e mais barato: R$ 50-150 por capacitor, mais mão de obra.\n\n**VRM (Reguladores de Tensão)** — Alimentam o processador. Quando falham, o PC não liga ou desliga sob carga. Reparo possível mas mais complexo: R$ 200-400.\n\n**Chipset** — O \"cérebro secundário\" da placa. Falha rara mas grave. Se o chipset queimou, geralmente não compensa reparar.\n\n**Trilhas de circuito** — As \"estradas\" de cobre na placa. Podem ser danificadas por curto, líquido ou dano mecânico. Reparo com microssolda é possível em muitos casos.\n\n### Sinais de Alerta: Quando Sua Placa Está em Risco\n\n1. **Cheiro leve de queimado** ao usar o PC — NÃO ignore. Desligue imediatamente.\n2. **Portas USB parando de funcionar** uma a uma — sinal de degradação progressiva.\n3. **Reinicializações sob carga** — VRM pode estar falhando.\n4. **Capacitores visivelmente estufados** — troque ANTES que causem mais dano.\n\n### Prevenção: Como Proteger Sua Placa-Mãe\n\nA maioria dos danos em placas-mãe em Curitiba é causada por **picos de energia** — comuns na rede elétrica do Paraná, especialmente durante tempestades.\n\n**Proteção recomendada:**\n- **Mínimo**: filtro de linha com proteção contra surtos (R$ 30-80)\n- **Recomendado**: estabilizador de qualidade (R$ 150-300)\n- **Ideal**: nobreak/UPS (R$ 400-1000) — protege contra queda E surto\n\n### Casos Atendidos em Curitiba e Região\n\n- **Batel**: PC gamer de R$ 8.000 com placa-mãe \"queimada\". Diagnóstico revelou apenas 2 capacitores estufados. Reparo: R$ 250. Equipamento voltou a funcionar perfeitamente.\n- **Araucária**: Notebook corporativo com placa danificada por pico durante tempestade. Reparo de VRM: R$ 400. Economizou R$ 3.000+ em notebook novo.\n- **Campo Largo**: PC de escritório com 6 anos, múltiplos componentes queimados. Nesse caso, recomendamos troca — reparo custaria mais que um PC novo equivalente."
};
