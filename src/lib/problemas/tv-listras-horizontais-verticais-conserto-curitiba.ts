import type { ProblemaPageData } from "./types";

export const problema: ProblemaPageData = {
  "slug": "tv-listras-horizontais-verticais-conserto-curitiba",
  "title": "TV Listras Horizontais e Verticais — Conserto Delicado em Curitiba",
  "metaDescription": "TV com listras horizontais ou verticais? Flat cable, T-CON ou painel? Entenda por que o conserto é delicado e os custos reais.",
  "h1": "TV com Listras Horizontais ou Verticais — Conserto Delicado em Curitiba",
  "categoria": "Problemas de TV",
  "intro": "Listras horizontais e verticais em TVs têm causas diferentes e prognósticos diferentes. **O tipo de listra indica qual componente falhou** — e isso determina se o reparo é viável e quanto vai custar.\n\n**Listras verticais** geralmente são causadas pelo driver de colunas (COF — Chip on Film) no flat cable. **Listras horizontais** indicam driver de linhas (ROW driver). Ambos podem ser reparados com máquina TAB, mas o processo é delicado e com taxa de sucesso variável.\n\n**O conserto existe, mas é honesto dizer: nem sempre dá certo.** O reparo de flat cable com máquina TAB tem taxa de sucesso de 60-80%. Quando funciona, é econômico e duradouro. Quando não funciona, a alternativa é conviver com o defeito ou trocar o painel (caro).",
  "sintomas": [
    {
      "titulo": "Linhas verticais finas coloridas",
      "desc": "1 a 5 linhas finas da cor de sub-pixels (vermelho, verde ou azul). Driver de coluna (COF) no flat cable inferior ou superior. Causa mais comum.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Faixa vertical larga branca ou preta",
      "desc": "Coluna inteira de pixels mortos ou brancos. Pode ser T-CON (mais fácil) ou trilha principal do flat cable (mais difícil).",
      "gravidade": "Médio a Complexo"
    },
    {
      "titulo": "Listras horizontais na metade inferior",
      "desc": "Flat cable ROW driver do lado inferior do painel. Comum em Samsung UN40-UN55 séries J/K.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Listras que mudam com temperatura",
      "desc": "Desaparecem quando a TV esquenta ou pioram com calor. Solda fria clássica no flat cable. Melhor prognóstico para reparo TAB.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Grade/quadriculado na tela",
      "desc": "Padrão de quadrados. T-CON com defeito no chip de timing. Troca da placa resolve.",
      "gravidade": "Simples"
    },
    {
      "titulo": "Listras + imagem duplicada",
      "desc": "Combinação indica T-CON falhando em múltiplas funções. Troca da placa T-CON geralmente resolve.",
      "gravidade": "Simples a Médio"
    }
  ],
  "causas": [
    {
      "titulo": "Flat cable COF (Chip on Film)",
      "desc": "O chip controlador é montado diretamente no filme flexível. Após anos de ciclos térmicos, a soldagem entre chip e filme degrada. É a causa de 60-70% das listras em TVs.",
      "tipo": "desgaste"
    },
    {
      "titulo": "Soldagem ACF deteriorada",
      "desc": "O Anisotropic Conductive Film que cola o flat cable ao vidro perde condutividade. Microesferas de níquel/ouro oxidam.",
      "tipo": "desgaste"
    },
    {
      "titulo": "T-CON — Timing Controller",
      "desc": "Placa que sincroniza o refresh de todos os pixels. Capacitores inchados ou chip principal falhando causam padrões regulares.",
      "tipo": "hardware"
    },
    {
      "titulo": "Dano mecânico no flat cable",
      "desc": "Transporte incorreto, limpeza com pressão ou puxões acidentais podem romper trilhas. Dano irreversível.",
      "tipo": "erro-humano"
    },
    {
      "titulo": "Degeneração do painel",
      "desc": "Em TVs com 8+ anos, o próprio cristal líquido ou os filtros de cor podem degradar, causando listras permanentes. Sem reparo.",
      "tipo": "desgaste"
    }
  ],
  "cenarios": [
    {
      "nivel": "Simples",
      "desc": "Troca de T-CON. Sucesso ~100%. Peça acessível.",
      "tempo": "3 a 7 dias",
      "custo": "R$ 200 a R$ 450"
    },
    {
      "nivel": "Médio",
      "desc": "Reparo TAB/ACF de flat cable. Taxa de sucesso 60-80%. Processo delicado.",
      "tempo": "5 a 15 dias",
      "custo": "R$ 350 a R$ 750"
    },
    {
      "nivel": "Complexo",
      "desc": "Painel danificado ou flat cable irrecuperável. Troca de painel ou descarte.",
      "tempo": "15-30 dias",
      "custo": "R$ 1.200 a R$ 3.500+"
    }
  ],
  "riscos": [
    "Reparo TAB pode não funcionar (20-40% de falha)",
    "Flat cable pode romper durante a tentativa de reparo",
    "Peças T-CON nem sempre estão disponíveis para modelos antigos",
    "Painel de reposição pode ser recondicionado com qualidade inferior",
    "Custo do painel frequentemente ultrapassa o valor da TV"
  ],
  "diagnostico": "**Protocolo de diagnóstico para listras em TV:**\n\n1. **Classificação visual:** Tipo, direção, cor, quantidade e comportamento das listras\n2. **Teste térmico:** Soprador de calor na região dos flat cables — se as listras mudam, é flat cable\n3. **Troca de T-CON de teste:** Substituição temporária para eliminar T-CON como causa\n4. **Inspeção com lupa:** Verificar oxidação, trilhas rompidas e chip COF no flat cable\n5. **Laudo com prognóstico:** Informamos a causa, taxa de sucesso esperada e custos antes de qualquer reparo\n\n**Custo: R$ 80-120, abatido do serviço.**",
  "solucao": "**O reparo é feito em etapas, da mais simples à mais complexa:**\n\n**Etapa 1 — T-CON (se aplicável):**\nTroca da placa T-CON. Quando é a causa, sucesso é praticamente garantido.\n\n**Etapa 2 — Flat Cable (TAB Bonding):**\nUsamos máquina TAB para re-aplicar pressão e calor controlados na soldagem ACF. O processo:\n- Temperatura: 180-220°C\n- Pressão: calibrada por modelo\n- Tempo: 10-30 segundos por seção\n- Resultado: imediato — se funcionou, as listras somem na hora\n\n**Etapa 3 — Avaliação final:**\nSe o TAB não resolveu, fornecemos laudo com opções: troca de painel (com custo), conviver com o defeito, ou considerar TV nova.\n\n**TRANSPARÊNCIA TOTAL:** O cliente sempre sabe a taxa de sucesso estimada antes de autorizar o reparo.",
  "quandoCompensa": "T-CON sempre compensa. Flat cable (TAB) compensa em TVs de 43\"+ com menos de 6 anos — o custo do reparo (R$ 350-750) é 15-25% do valor de uma TV nova equivalente.",
  "quandoNaoCompensa": "TVs de 32\" ou menores (TV nova custa R$ 800-1.200). TVs com 8+ anos com múltiplos problemas. Quando o diagnóstico indica painel danificado (troca inviável).",
  "whatsappMessage": "Olá! Minha TV está com listras na tela. Quero saber se tem conserto e quanto custa.",
  "relatedPages": [
    {
      "label": "TV com Listras",
      "to": "/problemas/tv-listras-na-tela-curitiba"
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
  "conteudoExtra": "## Entendendo os Tipos de Listras\n\n### Listras Verticais\n- **Causa principal:** Driver de colunas (COF no flat cable inferior)\n- **Cor:** Geralmente uma cor de sub-pixel (R, G ou B)\n- **Reparo:** TAB bonding no flat cable inferior\n- **Sucesso:** 65-80%\n\n### Listras Horizontais\n- **Causa principal:** Driver de linhas (flat cable lateral)\n- **Aparência:** Faixas largas ou linhas finas horizontais\n- **Reparo:** TAB bonding no flat cable lateral\n- **Sucesso:** 55-75% (acesso mais difícil)\n\n### Grade/Quadriculado\n- **Causa principal:** T-CON\n- **Reparo:** Troca da placa\n- **Sucesso:** ~100%\n\n## Dúvidas Frequentes\n\n### \"Posso usar a TV com listras?\"\nSim, as listras não oferecem risco elétrico. Mas tendem a piorar com o tempo.\n\n### \"Compensa mais comprar TV nova?\"\nDepende do tamanho e idade. TV 55\" de 3 anos com listras de T-CON — reparo de R$ 300 vs TV nova de R$ 2.500. Claramente compensa reparar.\n\n### \"O reparo tem garantia?\"\nT-CON: sim, 90 dias. Flat cable (TAB): garantia limitada de 30-60 dias, pela natureza do reparo."
};
