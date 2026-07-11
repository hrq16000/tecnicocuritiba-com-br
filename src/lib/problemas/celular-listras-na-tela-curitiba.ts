import type { ProblemaPageData } from "./types";

export const problema: ProblemaPageData = {
  "slug": "celular-listras-na-tela-curitiba",
  "title": "Celular com Listras na Tela em Curitiba | Conserto Especializado",
  "metaDescription": "Celular com listras verdes, brancas ou coloridas na tela? Problema comum após atualizações. Diagnóstico e conserto especializado em Curitiba. Saiba custos reais.",
  "h1": "Celular com Listras na Tela — Diagnóstico e Conserto em Curitiba",
  "categoria": "Problemas de Celular",
  "intro": "Listras na tela do celular são um dos problemas mais relatados em fóruns como Samsung Members e Apple Community. O problema pode surgir após atualizações de sistema (iOS ou Android) ou por danos físicos no display.\n\n**Dados reais:** Em 2024-2025, milhares de usuários Samsung relataram listras verdes e brancas no Galaxy S23, S24 e A54 após atualizações de One UI. Nos iPhones, o problema da \"linha verde\" (green line) afeta modelos com tela OLED desde o iPhone X até o iPhone 15, com picos de reclamações após atualizações do iOS 17 e 18.\n\n**O conserto existe, porém é delicado.** Em muitos casos envolve troca do display AMOLED/OLED, que é a peça mais cara do aparelho — podendo custar de R$ 400 a R$ 2.000+ dependendo do modelo.\n\nNem sempre é o display. Flat cables, conectores soltos e até bugs de software podem causar listras temporárias. **Diagnóstico profissional é essencial antes de qualquer decisão.**",
  "sintomas": [
    {
      "titulo": "Linha verde vertical permanente",
      "desc": "Problema amplamente documentado em iPhones com OLED (X, 11, 12, 13, 14, 15) e Samsung Galaxy S23/S24. A Apple reconheceu o defeito em alguns lotes. Aparece do nada ou após atualização do iOS/One UI.",
      "gravidade": "Complexo"
    },
    {
      "titulo": "Listras coloridas horizontais",
      "desc": "Faixas de cores distorcidas que cobrem parte da tela. Geralmente indica flat cable danificado ou conector do display solto. Comum após quedas leves.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Listras brancas/cinzas intermitentes",
      "desc": "Aparecem e somem. Podem piorar com calor. Indica mau contato no conector do display ou defeito inicial do painel AMOLED.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Listras após atualização de sistema",
      "desc": "Relatos massivos no Samsung Members: 'Atualizei meu celular e ganhei 4 listras na tela'. A atualização pode revelar defeitos latentes no driver de display ou causar incompatibilidade com o controlador.",
      "gravidade": "Médio a Complexo"
    },
    {
      "titulo": "Tela com faixas piscando",
      "desc": "Flickering com listras. Pode ser problema de refresh rate, GPU com defeito ou display em degradação. Em AMOLED, indica fim da vida útil de sub-pixels.",
      "gravidade": "Complexo"
    },
    {
      "titulo": "Mancha + listras progressivas",
      "desc": "Começa com uma listra fina e vai aumentando. Sinal claro de degeneração do painel OLED. Sem reparo — apenas troca do display.",
      "gravidade": "Complexo"
    }
  ],
  "causas": [
    {
      "titulo": "Defeito no painel OLED/AMOLED",
      "desc": "Sub-pixels orgânicos degradam de forma desigual. Samsung e LG Display (principais fabricantes) têm lotes com taxas de defeito variáveis. O iPhone 14 Pro teve recall parcial por linhas verdes em 2023.",
      "tipo": "hardware"
    },
    {
      "titulo": "Flat cable do display danificado",
      "desc": "O cabo flex que conecta a tela à placa principal é extremamente fino (0.1mm). Flexões repetidas ao abrir/fechar o celular ou quedas leves podem romper trilhas microscópicas, causando listras em colunas ou linhas específicas.",
      "tipo": "hardware"
    },
    {
      "titulo": "Atualização de firmware revela defeito latente",
      "desc": "Atualizações como One UI 6.1 e iOS 17.x alteraram drivers de display. Isso pode revelar defeitos que já existiam no painel mas estavam 'compensados' pelo firmware anterior. Não é a atualização que quebra — ela expõe.",
      "tipo": "software"
    },
    {
      "titulo": "Conector do display solto",
      "desc": "O conector ZIF/FPC que liga o flat cable à placa pode se soltar com vibração ou impacto. Causa listras intermitentes que pioram ao pressionar a traseira do celular.",
      "tipo": "hardware"
    },
    {
      "titulo": "Dano por impacto sem trinca visível",
      "desc": "Uma queda pode danificar a matriz OLED internamente sem quebrar o vidro externo. As listras aparecem dias ou semanas depois, quando o dano se propaga.",
      "tipo": "erro-humano"
    },
    {
      "titulo": "Oxidação/umidade no conector",
      "desc": "Exposição à umidade (mesmo IP68) pode causar micro-oxidação nos contatos do display, gerando mau contato progressivo.",
      "tipo": "desgaste"
    }
  ],
  "cenarios": [
    {
      "nivel": "Simples",
      "desc": "Conector solto — reconectar flat cable. Ou bug de software resolvido com downgrade/reset.",
      "tempo": "1 a 3 horas",
      "custo": "R$ 80 a R$ 200"
    },
    {
      "nivel": "Médio",
      "desc": "Flat cable rompido ou troca de display compatível. Display compatível Samsung A54: ~R$ 350-500. iPhone 12: ~R$ 400-600.",
      "tempo": "1 a 3 dias",
      "custo": "R$ 400 a R$ 800"
    },
    {
      "nivel": "Complexo",
      "desc": "Troca de display original AMOLED. Galaxy S24 Ultra: R$ 1.500-2.200. iPhone 15 Pro Max: R$ 1.800-2.500. Peça + mão de obra.",
      "tempo": "3 a 10 dias",
      "custo": "R$ 1.000 a R$ 2.500"
    }
  ],
  "riscos": [
    "Listras progressivas — o que é 1 listra hoje pode ser tela inteira amanhã",
    "Display compatível pode ter qualidade inferior (brilho 30-40% menor, cores menos precisas)",
    "Reparo por conta própria pode danificar flat cables irreversivelmente",
    "Atualizar o sistema novamente pode piorar ou melhorar — imprevisível",
    "Seguros de celular geralmente cobrem, mas franquia pode ser alta (R$ 300-500)",
    "Em modelos dobráveis (Flip/Fold), o reparo da tela interna custa R$ 2.000-3.500"
  ],
  "diagnostico": "O diagnóstico de listras exige análise em bancada com ferramentas especializadas:\n\n**1. Teste de conector:** Desmontar e reconectar o flat cable do display. Se as listras somem, era mau contato (reparo simples).\n\n**2. Teste com display auxiliar:** Conectar temporariamente outro display para verificar se o problema está no painel ou na placa principal.\n\n**3. Análise do padrão:** Listras verticais geralmente indicam problema no driver de colunas (IC do display). Horizontais indicam driver de linhas. Aleatórias indicam flat cable.\n\n**4. Histórico de software:** Verificar se a listra coincidiu com atualização. Em alguns casos, downgrade do firmware resolve.\n\n**Custo do diagnóstico: R$ 50-80, abatido do serviço.**",
  "solucao": "**Nível 1 — Software/Conector (5-15% dos casos):**\nReconexão do flat cable, reset de fábrica ou downgrade de firmware. Resolve quando é mau contato ou bug.\n\n**Nível 2 — Troca de Display (85-90% dos casos):**\nA maioria das listras permanentes exige troca do módulo de display. Opções:\n- **Display compatível:** 40-60% do preço do original. Qualidade boa mas inferior em brilho e resposta ao toque.\n- **Display original (OEM):** Máxima qualidade, garantia do fabricante, preço elevado.\n\n**Nível 3 — Placa principal (raro, 2-5%):**\nQuando o teste com display novo mantém as listras, o problema está no IC de vídeo da placa. Microsoldagem BGA necessária.\n\n**IMPORTANTE:** O reparo de display é delicado. A tela AMOLED tem 0.2mm de espessura e pode quebrar durante a remoção se não houver estação de calor adequada. Técnicos sem equipamento podem danificar o novo display durante a instalação.",
  "quandoCompensa": "Celulares de até 2 anos e valor acima de R$ 2.000. Display compatível quase sempre compensa — custo de 20-30% do valor do aparelho. Modelos como Galaxy A54, iPhone 12/13 têm displays compatíveis acessíveis (R$ 350-500).",
  "quandoNaoCompensa": "Celulares com mais de 3 anos ou valor abaixo de R$ 1.000. Quando o display original custa mais de 50% do valor de um aparelho novo equivalente. Exemplo: trocar display original do Galaxy S21 por R$ 1.200 quando um S23 FE custa R$ 1.800.",
  "whatsappMessage": "Olá! Meu celular está com listras na tela. Podem diagnosticar se tem conserto e quanto custa?",
  "relatedPages": [
    {
      "label": "Tela Quebrada Celular",
      "to": "/problemas/celular-tela-quebrada-curitiba"
    },
    {
      "label": "Custo Troca de Tela",
      "to": "/problemas/quanto-custa-trocar-tela-celular-curitiba"
    },
    {
      "label": "Por Que Display é Caro",
      "to": "/problemas/por-que-display-e-caro-curitiba"
    },
    {
      "label": "Celular Não Liga",
      "to": "/problemas/celular-nao-liga-curitiba"
    },
    {
      "label": "Conserto de Celular",
      "to": "/servicos/conserto-celular"
    },
    {
      "label": "TV com Listras",
      "to": "/problemas/tv-listras-na-tela-curitiba"
    }
  ],
  "conteudoExtra": "## Casos Reais Documentados\n\n### Samsung Galaxy — \"Vício Oculto\"\nNo fórum Samsung Members Brasil, centenas de usuários documentaram listras aparecendo após atualizações do One UI:\n- **Galaxy S23 Ultra:** Listras verdes após One UI 6.1 — Samsung reconheceu e trocou em garantia para alguns\n- **Galaxy A54:** Listras brancas progressivas — display compatível resolve por ~R$ 400\n- **Galaxy S24:** Usuários relatam: \"Atualizei e ganhei 4 listras na tela\" — problema de driver de display\n\n### iPhone — \"Green Line of Death\"\nA famosa \"linha verde\" dos iPhones OLED é documentada globalmente:\n- **iPhone 14 Pro:** Apple reconheceu defeito em lotes específicos — troca gratuita em garantia\n- **iPhone 13:** Linha verde após iOS 17 — alguns resolveram com restauração DFU\n- **iPhone X/XS:** Problema clássico — display aftermarket resolve por ~R$ 350-500\n\n### Estatísticas\n- **85%** dos casos de listras = problema no display (troca necessária)\n- **10%** = flat cable/conector (reparo mais barato)\n- **5%** = software/placa principal\n\n## Tabela de Custos por Modelo\n\n| Modelo | Display Compatível | Display Original |\n|--------|-------------------|------------------|\n| Galaxy A54 | R$ 350-450 | R$ 600-800 |\n| Galaxy S23 | R$ 600-800 | R$ 1.200-1.500 |\n| Galaxy S24 Ultra | R$ 900-1.200 | R$ 1.500-2.200 |\n| iPhone 12 | R$ 350-500 | R$ 800-1.000 |\n| iPhone 13 Pro | R$ 500-700 | R$ 1.000-1.400 |\n| iPhone 15 Pro Max | R$ 800-1.100 | R$ 1.800-2.500 |\n| Motorola Edge 40 | R$ 400-550 | R$ 700-900 |\n| Xiaomi 13T | R$ 300-450 | R$ 600-800 |\n\n## Por Que Listras Após Atualização?\n\nAtualizações de sistema alteram o **driver do controlador de display**. O driver é o software que comunica com o chip IC que controla cada pixel. Quando o novo driver opera em frequências ou voltagens ligeiramente diferentes, defeitos latentes no painel OLED se manifestam.\n\n**Analogia:** É como dirigir um carro com embreagem quase no fim. Na cidade (firmware antigo), funciona. Na estrada (firmware novo exige mais), falha.\n\n## O Que Fazer Agora?\n\n1. **Tire fotos** do padrão das listras (vertical? horizontal? cor?)\n2. **Anote** quando apareceu (após queda? atualização? do nada?)\n3. **Verifique garantia** — se < 1 ano, acione o fabricante\n4. **Traga para diagnóstico** — podemos confirmar a causa em 30-60 minutos"
};
