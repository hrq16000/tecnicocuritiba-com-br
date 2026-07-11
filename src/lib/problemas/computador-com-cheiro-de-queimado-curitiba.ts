import type { ProblemaPageData } from "./types";

export const problema: ProblemaPageData = {
  "slug": "computador-com-cheiro-de-queimado-curitiba",
  "title": "Computador com Cheiro de Queimado em Curitiba | Emergência Técnica",
  "metaDescription": "Computador com cheiro de queimado? DESLIGUE IMEDIATAMENTE. Técnico em Curitiba diagnostica componente queimado (fonte, placa-mãe, capacitor) com urgência.",
  "h1": "Computador com Cheiro de Queimado — Atendimento de Emergência em Curitiba",
  "categoria": "Hardware — Emergência",
  "intro": "Se seu computador está exalando cheiro de queimado, a primeira e mais importante ação é: DESLIGUE DA TOMADA IMEDIATAMENTE. Não desligue pelo botão — puxe o cabo de força da parede. Cheiro de queimado em eletrônico indica que algum componente está superaquecendo perigosamente ou já queimou, e continuar com o PC ligado pode causar danos em cadeia, incêndio ou choque elétrico.\n\nOs cheiros mais comuns são: plástico queimando (geralmente isolamento de fio ou conector derretendo), cheiro químico acre (capacitor estufando ou vazando eletrólito) e cheiro de metal quente (componente eletrônico queimando). Cada tipo de cheiro aponta para uma causa diferente.\n\nEm Curitiba, tratamos cheiro de queimado como atendimento de emergência. Após quedas de energia (frequentes durante tempestades), picos de tensão e uso de fontes de alimentação baratas, componentes podem queimar silenciosamente e o cheiro é o primeiro — e às vezes único — aviso antes de uma falha catastrófica.",
  "sintomas": [
    {
      "titulo": "Cheiro de plástico queimando",
      "desc": "Isolamento de fios, conectores Molex/SATA ou plástico do gabinete derretendo por calor excessivo. DESLIGUE IMEDIATAMENTE.",
      "gravidade": "Crítica"
    },
    {
      "titulo": "Cheiro químico acre (vinagre/azedo)",
      "desc": "Capacitor eletrolítico estufando ou vazando. O eletrólito tem cheiro característico. Comum em fontes baratas e placas-mãe com mais de 5 anos.",
      "gravidade": "Crítica"
    },
    {
      "titulo": "Fumaça visível saindo do gabinete",
      "desc": "Fumaça indica combustão ativa. DESLIGUE DA TOMADA (não pelo botão), afaste-se e ventile o ambiente. Não abra o gabinete enquanto houver fumaça.",
      "gravidade": "Crítica"
    },
    {
      "titulo": "Cheiro de queimado após queda de energia",
      "desc": "Pico de tensão ao retornar a energia pode queimar fonte, placa-mãe ou outros componentes. Não religue sem diagnóstico.",
      "gravidade": "Alta"
    },
    {
      "titulo": "PC funciona mas com cheiro constante",
      "desc": "O cheiro persiste durante o uso normal. Pode ser poeira acumulada queimando no dissipador ou componente no limite térmico.",
      "gravidade": "Média-Alta"
    },
    {
      "titulo": "Cheiro apenas durante uso pesado (jogos, renderização)",
      "desc": "Aparece só sob carga alta. Pode ser GPU superaquecendo, VRMs da placa-mãe no limite ou fonte subdimensionada.",
      "gravidade": "Média-Alta"
    }
  ],
  "causas": [
    {
      "titulo": "Capacitor eletrolítico estufado/vazando",
      "desc": "Capacitores em fontes e placas-mãe podem estufar (topo abaulado) e vazar eletrólito por calor excessivo, idade ou fabricação defeituosa. Cheiro ácido característico.",
      "tipo": "desgaste"
    },
    {
      "titulo": "Fonte de alimentação barata ou subdimensionada",
      "desc": "Fontes sem certificação 80 Plus usam componentes de baixa qualidade que falham sob carga. Pior cenário: curto-circuito que danifica todo o PC.",
      "tipo": "hardware"
    },
    {
      "titulo": "Pico de tensão na rede elétrica",
      "desc": "Raios, oscilações e retorno de energia após queda podem enviar voltagem acima do normal. Sem protetor de surto ou nobreak, componentes queimam.",
      "tipo": "hardware"
    },
    {
      "titulo": "Poeira acumulada em componentes quentes",
      "desc": "Poeira depositada em dissipadores, VRMs e reguladores de tensão pode carbonizar com o calor, gerando cheiro de queimado sem necessariamente haver dano.",
      "tipo": "desgaste"
    },
    {
      "titulo": "Conector Molex/SATA derretendo",
      "desc": "Conectores de alimentação Molex e SATA com mau contato geram calor no ponto de conexão, derretendo o plástico. Adaptadores Molex-SATA são notórios por isso.",
      "tipo": "hardware"
    },
    {
      "titulo": "VRM da placa-mãe sobrecarregado",
      "desc": "Os reguladores de tensão (VRMs) que alimentam o processador podem sobrecarregar com CPUs de alto consumo ou overclock, gerando calor extremo.",
      "tipo": "hardware"
    }
  ],
  "cenarios": [
    {
      "nivel": "Simples",
      "desc": "Limpeza de poeira carbonizada + verificação de todos os componentes. Nenhum dano real — apenas acúmulo de sujeira em peças quentes.",
      "tempo": "1-2 horas",
      "custo": "R$ 100–200"
    },
    {
      "nivel": "Médio",
      "desc": "Troca de fonte queimada ou capacitor estufado + verificação de danos colaterais em outros componentes.",
      "tempo": "2-4 horas",
      "custo": "R$ 200–500"
    },
    {
      "nivel": "Complexo",
      "desc": "Múltiplos componentes queimados (fonte + placa-mãe + possível GPU). Avaliação de viabilidade de reparo vs troca.",
      "tempo": "2-5 dias",
      "custo": "R$ 400–1500+"
    }
  ],
  "riscos": [
    "RISCO DE INCÊNDIO: componente em combustão pode causar fogo no gabinete e se espalhar",
    "RISCO DE CHOQUE: componente queimado pode expor partes energizadas",
    "Continuar usando pode queimar componentes saudáveis por efeito cascata",
    "Fonte queimada pode enviar tensão errada para placa-mãe, RAM e GPU, destruindo tudo",
    "Inalação de fumaça de eletrônico é tóxica — ventile o ambiente imediatamente",
    "Capacitor vazando pode corroer trilhas da placa-mãe se não limpo rapidamente"
  ],
  "diagnostico": "Diagnóstico de emergência (com PC DESLIGADO da tomada):\n\n1. Inspeção visual completa: componentes queimados, estufados, derretidos\n2. Teste de cheiro isolado (qual componente exala o odor)\n3. Verificação de capacitores em fonte e placa-mãe (visual + multímetro)\n4. Teste de fonte isolada (sem conectar na placa-mãe)\n5. Verificação de conectores (Molex, SATA, EPS, PCIe) — derretidos/escurecidos\n6. Teste individual de cada componente em bancada limpa\n\nCusto: R$ 100 (incorporado se aprovar o serviço). Atendimento prioritário.",
  "solucao": "Solução conforme a causa:\n\n- **Poeira**: Limpeza profunda completa + verificação térmica de todos os componentes\n- **Capacitor**: Troca de capacitor por técnico em eletrônica (quando viável) ou troca da placa\n- **Fonte**: Troca por fonte 80 Plus Bronze/Gold certificada + instalação de protetor de surto\n- **Conector**: Troca do cabo de alimentação danificado + verificação de todos os conectores\n- **VRM**: Verificação de compatibilidade CPU/placa + melhoria de refrigeração dos VRMs\n\nInstalação de protetor de surto ou nobreak recomendada para evitar recorrência.\n\nTeste de estabilidade prolongado (2h+) com monitoramento térmico após o reparo.",
  "quandoCompensa": "Quando apenas a fonte ou um capacitor queimou e os demais componentes estão intactos. Diagnóstico rápido evita gastar com peças desnecessárias.",
  "quandoNaoCompensa": "Quando fonte, placa-mãe e GPU queimaram juntas em efeito cascata. O custo de reparo pode ultrapassar o valor de um PC novo equivalente.",
  "whatsappMessage": "Olá! Meu computador está com cheiro de queimado. URGENTE — podem me ajudar?",
  "relatedPages": [
    {
      "to": "/problemas/fonte-queimada-curitiba",
      "label": "Fonte Queimada"
    },
    {
      "to": "/problemas/placa-mae-com-defeito-curitiba",
      "label": "Placa-Mãe com Defeito"
    },
    {
      "to": "/problemas/computador-desligando-apos-segundos-curitiba",
      "label": "PC Desligando em Segundos"
    },
    {
      "to": "/problemas/computador-nao-liga-curitiba",
      "label": "Computador Não Liga"
    },
    {
      "to": "/como-funciona",
      "label": "Como Funciona"
    },
    {
      "to": "/precos-e-politicas",
      "label": "Preços e Políticas"
    }
  ],
  "conteudoExtra": "## Cheiro de Queimado no PC: Guia de Emergência\n\n### O Que Fazer IMEDIATAMENTE\n\n1. 🔴 **DESLIGUE DA TOMADA** (puxe o cabo, não use o botão)\n2. 🔴 **AFASTE-SE** se houver fumaça — ventile o ambiente\n3. ❌ **NÃO ABRA** o gabinete enquanto houver fumaça ou calor\n4. ❌ **NÃO RELIGUE** sem diagnóstico profissional\n5. ✅ **AGUARDE** esfriar completamente (30+ minutos)\n6. ✅ **PROCURE** técnico especializado\n\n### Identificando o Componente pelo Cheiro\n\n| Cheiro | Componente Provável |\n|---|---|\n| Plástico derretendo | Conector Molex/SATA, cabo |\n| Químico acre/vinagre | Capacitor estufado |\n| Metal quente | VRM, regulador, chip |\n| Borracha queimando | Fio de alimentação |\n| Poeira queimando | Dissipador sujo (menos grave) |\n\n### Prevenção: Como Proteger Seu PC\n\n| Proteção | Custo | Protege Contra |\n|---|---|---|\n| Filtro de linha básico | R$ 20-50 | Nada (não protege de verdade) |\n| Protetor de surto (DPS) | R$ 50-150 | Picos de tensão |\n| Estabilizador | R$ 100-300 | Oscilações leves |\n| Nobreak (UPS) | R$ 300-1000 | Queda + pico + estabilização |\n\n⚠️ **Filtro de linha NÃO É protetor de surto** — a maioria dos filtros baratos não tem proteção real contra picos."
};
