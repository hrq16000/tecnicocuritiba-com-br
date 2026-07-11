import type { ProblemaPageData } from "./types";

export const problema: ProblemaPageData = {
  "slug": "tv-listras-na-tela-curitiba",
  "title": "TV com Listras na Tela em Curitiba | Conserto",
  "metaDescription": "TV com listras verticais, horizontais ou coloridas? Conserto de painel, T-CON e flat cable em Curitiba.",
  "h1": "TV com Listras na Tela — Diagnóstico e Conserto em Curitiba",
  "categoria": "Problemas de TV",
  "intro": "Listras na tela da TV são um dos defeitos mais comuns — e mais temidos. A boa notícia: **na maioria dos casos tem conserto**. A notícia realista: dependendo da causa, pode sair caro.\n\n**Dados técnicos:** As listras são causadas principalmente por 3 componentes: flat cables (cabos flexíveis entre a placa T-CON e o painel), a própria placa T-CON (controlador de timing) e, nos piores casos, degradação do painel LCD/LED.\n\n**Flat cables** são a causa mais comum e o reparo mais delicado. São cabos com trilhas de 0.05mm soldados ao vidro do painel por pressão e calor. Com o tempo (3-7 anos), a soldagem se deteriora por ciclos térmicos (ligar/desligar). O reparo é possível com máquina TAB (Tape Automated Bonding), mas nem todos os técnicos possuem esse equipamento.\n\n**O conserto é delicado e nem sempre dá certo.** A taxa de sucesso no reparo de flat cables é de 60-80% — depende do grau de oxidação e da integridade das trilhas. Quando funciona, é uma solução econômica. Quando não, a alternativa é trocar o painel (caro) ou aceitar o defeito.",
  "sintomas": [
    {
      "titulo": "Listras verticais finas e coloridas",
      "desc": "Linhas finas de uma cor (verde, vermelho, azul) da parte superior à inferior da tela. Indica driver de colunas na placa T-CON ou flat cable COF (Chip on Film) com defeito.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Faixa horizontal grossa",
      "desc": "Uma banda larga horizontal de cor distorcida ou escura. Geralmente flat cable ROW driver. Comum em TVs Samsung e LG após 4-6 anos de uso.",
      "gravidade": "Médio a Complexo"
    },
    {
      "titulo": "Listras que aparecem após aquecer",
      "desc": "TV liga normal e após 20-40 minutos surgem listras. Dilatação térmica afeta soldas frias no flat cable ou T-CON. Sinal clássico de flat cable.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Metade da tela com listras",
      "desc": "Exatamente metade (esquerda ou direita, superior ou inferior) distorcida. O painel é dividido em setores controlados por flat cables diferentes. Um setor falhou.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Listras progressivas (piorando)",
      "desc": "Começou com 1-2 linhas finas e está aumentando semana a semana. Degeneração progressiva do flat cable — quanto antes tratar, maior a chance de sucesso.",
      "gravidade": "Complexo"
    },
    {
      "titulo": "Listras + manchas escuras",
      "desc": "Combinação de listras com áreas escuras indica problema no painel (LED/LCD danificado) além do flat cable. Prognóstico reservado.",
      "gravidade": "Complexo"
    }
  ],
  "causas": [
    {
      "titulo": "Flat cable deteriorado (COF/TAB)",
      "desc": "A causa mais comum (60-70% dos casos). Os flat cables são soldados ao vidro do painel por pressão ACF (Anisotropic Conductive Film). Após milhares de ciclos térmicos, a conexão se degrada. TVs Samsung, LG, Philco e AOC de 4-8 anos são as mais afetadas.",
      "tipo": "desgaste"
    },
    {
      "titulo": "Placa T-CON defeituosa",
      "desc": "A T-CON (Timing Controller) controla o refresh de cada pixel. Capacitores ou o chip principal podem falhar, causando listras em padrões regulares. Reparo mais previsível — troca da placa inteira.",
      "tipo": "hardware"
    },
    {
      "titulo": "Driver IC do painel",
      "desc": "Os chips IC soldados diretamente ao vidro do painel podem falhar. Reparo possível com máquina TAB, mas delicado e com taxa de sucesso de 60-80%.",
      "tipo": "hardware"
    },
    {
      "titulo": "Dano no painel LCD/LED",
      "desc": "Impacto, pressão ou defeito de fabricação pode danificar a matriz de cristal líquido. Linhas inteiras de pixels mortos. Sem reparo — apenas troca do painel.",
      "tipo": "hardware"
    },
    {
      "titulo": "Surto elétrico",
      "desc": "Picos de tensão (raios, oscilações) podem queimar o chip da T-CON ou drivers do flat cable instantaneamente.",
      "tipo": "erro-humano"
    },
    {
      "titulo": "Transporte inadequado",
      "desc": "TVs transportadas deitadas ou sem proteção podem ter flat cables desconectados ou danificados por flexão.",
      "tipo": "erro-humano"
    }
  ],
  "cenarios": [
    {
      "nivel": "Simples",
      "desc": "Placa T-CON — troca direta. Peça de R$ 80-200 + mão de obra.",
      "tempo": "3 a 7 dias",
      "custo": "R$ 200 a R$ 450"
    },
    {
      "nivel": "Médio",
      "desc": "Reparo de flat cable com máquina TAB/ACF. Processo delicado com taxa de sucesso de 60-80%.",
      "tempo": "5 a 15 dias",
      "custo": "R$ 300 a R$ 700"
    },
    {
      "nivel": "Complexo",
      "desc": "Painel danificado — troca. Custo do painel: R$ 800-2.500 dependendo do tamanho/tecnologia. Muitas vezes inviável.",
      "tempo": "15 a 30 dias",
      "custo": "R$ 1.000 a R$ 3.000+"
    }
  ],
  "riscos": [
    "Reparo de flat cable tem taxa de sucesso de 60-80% — pode não resolver",
    "O processo de resolda com máquina TAB pode danificar trilhas adjacentes",
    "Flat cables são específicos por modelo — nem sempre disponíveis",
    "Listras progressivas indicam que o problema vai piorar rapidamente",
    "Tentar 'pressionar' o flat cable sem ferramentas pode romper trilhas",
    "Painel de TV 55\" LED custa R$ 1.200-2.000 — frequentemente inviável"
  ],
  "diagnostico": "O diagnóstico de listras em TV exige experiência e equipamento específico:\n\n**1. Análise visual do padrão:** O tipo de listra (vertical/horizontal, fina/grossa, cor) indica qual componente está falhando.\n\n**2. Teste de T-CON:** Substituição temporária da placa T-CON por uma compatível. Se as listras somem, é a T-CON (reparo simples).\n\n**3. Inspeção dos flat cables:** Verificação visual e com lupa de aumento das soldas ACF. Oxidação visível indica ponto de falha.\n\n**4. Teste térmico:** Aplicar calor controlado no flat cable com soprador. Se as listras somem temporariamente, confirma que o flat cable é a causa e que o reparo TAB pode funcionar.\n\n**5. Teste de painel:** Se T-CON e flat cables estão OK, o problema é no painel — prognóstico reservado.\n\n**Custo do diagnóstico: R$ 80-120 (TVs exigem desmontagem mais complexa), abatido do serviço.**",
  "solucao": "**Cenário 1 — T-CON (20-25% dos casos, melhor prognóstico):**\nTroca da placa T-CON. Peça relativamente acessível (R$ 80-200 dependendo do modelo). Sucesso de praticamente 100% quando é a causa.\n\n**Cenário 2 — Flat Cable / TAB Bonding (50-60% dos casos, resultado variável):**\nReparo com máquina TAB (Tape Automated Bonding) ou ACF (Anisotropic Conductive Film). O técnico re-solda as conexões microscópicas entre o flat cable e o vidro do painel.\n- **Taxa de sucesso: 60-80%**\n- Quando funciona: TV volta ao normal, resultado pode durar 2-5+ anos\n- Quando não funciona: as trilhas estão corroídas demais para nova soldagem\n- **É um reparo honesto — informamos a probabilidade antes de executar**\n\n**Cenário 3 — Painel (15-20% dos casos, geralmente inviável):**\nDano no painel LCD/LED. Troca necessária. Custo do painel + mão de obra frequentemente ultrapassa o valor da TV.\n\n**TRANSPARÊNCIA:** Informamos a taxa de sucesso estimada ANTES de iniciar o reparo. O cliente decide se quer arriscar.",
  "quandoCompensa": "T-CON: sempre compensa (reparo barato e confiável). Flat cable: compensa em TVs de 40\"+ com valor acima de R$ 1.500, considerando a taxa de sucesso. Vale a tentativa quando a alternativa é descarte.",
  "quandoNaoCompensa": "Troca de painel em TVs de entrada (32-43\" básicas). Quando o custo do painel ultrapassa 50% do valor de uma TV nova equivalente. TVs com mais de 8 anos com múltiplos flat cables deteriorados.",
  "whatsappMessage": "Olá! Minha TV está com listras na tela. Quero saber se tem conserto e quanto custa.",
  "relatedPages": [
    {
      "label": "TV Não Liga",
      "to": "/problemas/tv-nao-liga-curitiba"
    },
    {
      "label": "TV Sem Imagem",
      "to": "/problemas/tv-sem-imagem-curitiba"
    },
    {
      "label": "Conserto de TV",
      "to": "/servicos/conserto-tv"
    },
    {
      "label": "TV Imagem Fantasma",
      "to": "/tv-imagem-fantasma-curitiba"
    },
    {
      "label": "Custo Troca Tela TV",
      "to": "/problemas/quanto-custa-trocar-tela-tv-curitiba"
    },
    {
      "label": "Celular com Listras",
      "to": "/problemas/celular-listras-na-tela-curitiba"
    }
  ],
  "conteudoExtra": "## A Tecnologia Por Trás das Listras\n\n### Flat Cables: A Parte Mais Delicada da TV\n\nOs flat cables de uma TV são diferentes de qualquer outro cabo. Eles são **soldados diretamente ao vidro do painel** usando um filme adesivo condutor (ACF — Anisotropic Conductive Film).\n\n**Como funciona:**\n- O vidro do painel tem trilhas condutoras microscópicas (ITO — Indium Tin Oxide)\n- O flat cable tem trilhas de cobre de 0.05mm\n- O ACF cola as duas superfícies com microesferas condutoras\n- A pressão + calor durante a fabricação cria o contato elétrico\n\n**Por que falha:**\n- Ciclos térmicos (ligar/desligar) causam expansão/contração\n- Após 15.000-25.000 ciclos (4-7 anos de uso normal), a cola ACF degrada\n- Umidade ambiente acelera a oxidação das microesferas\n- TVs em ambientes úmidos (cozinha, banheiro, varanda) falham mais cedo\n\n### Máquina TAB: O Reparo Especializado\n\nA máquina TAB (Tape Automated Bonding) re-aplica pressão e calor controlados para restaurar o contato. É o mesmo princípio da fábrica, mas em escala de reparo.\n\n**Nem todo técnico tem:** O equipamento custa R$ 5.000-15.000 e exige treinamento específico. Por isso muitos técnicos dizem que \"listras não tem conserto\" — eles não têm a ferramenta.\n\n## Custos Reais por Tamanho de TV\n\n| Tamanho | T-CON | Flat Cable (TAB) | Painel Novo |\n|---------|-------|-----------------|-------------|\n| 32\" | R$ 150-250 | R$ 250-400 | R$ 600-900 |\n| 43\" | R$ 200-350 | R$ 350-550 | R$ 900-1.400 |\n| 50\" | R$ 250-400 | R$ 400-650 | R$ 1.200-1.800 |\n| 55\" | R$ 300-450 | R$ 450-700 | R$ 1.500-2.200 |\n| 65\" | R$ 350-500 | R$ 500-800 | R$ 2.000-3.000+ |\n| 75\"+ | R$ 400-600 | R$ 600-900 | R$ 3.000-5.000+ |\n\n## Marcas Mais Afetadas\n\n### Samsung\n- Séries TU e AU (2020-2022) com flat cables mais finos\n- Crystal UHD sofre mais que QLED\n\n### LG\n- Séries UK e UM com T-CON frágil\n- Smart TVs WebOS com painel IPS mais resistente\n\n### Philco / AOC / Semp TCL\n- Flat cables de qualidade inferior\n- Deterioração mais rápida (3-5 anos)\n- Peças mais difíceis de encontrar\n\n### Sony / Panasonic\n- Menor incidência de problemas de flat cable\n- Quando ocorre, peças são mais caras\n\n## Perguntas Que Sempre Fazem\n\n### \"Se o reparo do flat cable tem 60-80% de chance, vale a pena?\"\nDepende: se a alternativa é jogar a TV fora, o custo do reparo (R$ 300-700) é uma fração de uma TV nova (R$ 1.500-4.000). Mesmo com risco, a matemática favorece tentar.\n\n### \"O reparo é definitivo?\"\nQuando funciona, o reparo TAB pode durar 2-5+ anos. Não é eterno, mas estende significativamente a vida útil.\n\n### \"Por que alguns técnicos dizem que não tem conserto?\"\nPorque eles não possuem máquina TAB. Para eles, realmente não tem. Mas com o equipamento certo, muitos casos são reparáveis."
};
