import type { ProblemaPageData } from "./types";

export const problema: ProblemaPageData = {
  "slug": "listras-tela-celular-apos-atualizacao-curitiba",
  "title": "Listras no Celular Após Atualização em Curitiba | Samsung e iPhone",
  "metaDescription": "Celular com listras após atualização do sistema? Problema documentado em Samsung Galaxy e iPhone. Diagnóstico especializado em Curitiba.",
  "h1": "Listras no Celular Após Atualização — Samsung e iPhone em Curitiba",
  "categoria": "Problemas de Celular",
  "intro": "**\"Atualizei meu celular e ganhei listras na tela.\"** Esta frase aparece centenas de vezes nos fóruns Samsung Members e Apple Community. Não é coincidência — é um fenômeno técnico documentado.\n\nEm 2024-2025, atualizações do One UI 6.x (Samsung) e iOS 17-18 (Apple) causaram uma onda de reclamações sobre listras verdes, brancas e coloridas em celulares que estavam funcionando perfeitamente.\n\n**A atualização quebra a tela?** Na maioria dos casos, não diretamente. O que acontece é que o novo firmware altera os parâmetros do driver de display — voltagens, frequências de refresh, timings de pixel. Se o painel OLED já tinha um defeito microscópico latente, o novo driver o expõe.\n\n**O conserto existe, mas pode ser caro.** Em 70-85% dos casos, a solução é troca do display AMOLED/OLED — peça que custa de R$ 350 a R$ 2.000+ dependendo do modelo. Em 10-20% dos casos, um downgrade de firmware ou reset pode resolver temporariamente.",
  "sintomas": [
    {
      "titulo": "Linha verde vertical após atualização Samsung",
      "desc": "O sintoma mais reportado no Samsung Members. Galaxy S23, S24, A54 e A34 lideram reclamações. Linha verde fina aparece após reiniciar com novo One UI.",
      "gravidade": "Complexo"
    },
    {
      "titulo": "Linha verde no iPhone após iOS update",
      "desc": "Documentado pela Apple em iPhones com OLED (X até 15). Linha verde vertical persistente. Apple ofereceu troca gratuita para iPhone 14 Pro em lotes específicos.",
      "gravidade": "Complexo"
    },
    {
      "titulo": "Múltiplas listras coloridas pós-update",
      "desc": "4+ linhas de cores diferentes. Indica que o driver de display está enviando sinais incorretos para múltiplas colunas de pixels.",
      "gravidade": "Complexo"
    },
    {
      "titulo": "Listras que vêm e vão após atualização",
      "desc": "Intermitentes — aparecem quando a tela esquenta ou em determinados apps. Pode ser recuperável com software ou conector.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Tela normal no boot, listras no sistema",
      "desc": "Logo do fabricante aparece normal, listras surgem quando o Android/iOS carrega. Forte indicação de problema de driver de display — software.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Flickering + listras após update",
      "desc": "Tela pisca rapidamente com listras sobrepostas. GPU ou controlador de display incompatível com novo firmware.",
      "gravidade": "Complexo"
    }
  ],
  "causas": [
    {
      "titulo": "Alteração no driver de display",
      "desc": "Atualizações de SO incluem novos drivers para o controlador DDIC (Display Driver IC). Mudanças em voltagem de gate/source ou timing de refresh podem revelar defeitos latentes no painel OLED.",
      "tipo": "software"
    },
    {
      "titulo": "Defeito latente no painel OLED",
      "desc": "Painéis AMOLED da Samsung Display e LG Display têm variações microscópicas entre unidades. Algumas operam no limite — o firmware antigo compensava, o novo não.",
      "tipo": "hardware"
    },
    {
      "titulo": "Incompatibilidade de refresh rate",
      "desc": "Atualizações que habilitam ou alteram LTPO (taxa variável 1-120Hz) podem estressar sub-pixels que já estavam degradando.",
      "tipo": "software"
    },
    {
      "titulo": "Oxidação acelerada",
      "desc": "O novo driver pode operar sub-pixels em condições que aceleram a degradação orgânica (OLED é material orgânico que degrada com corrente).",
      "tipo": "desgaste"
    }
  ],
  "cenarios": [
    {
      "nivel": "Simples",
      "desc": "Downgrade de firmware ou reset DFU. Resolve 10-20% dos casos. Custo mínimo.",
      "tempo": "2 a 4 horas",
      "custo": "R$ 80 a R$ 200"
    },
    {
      "nivel": "Médio",
      "desc": "Reconexão de flat cable + flash de firmware. Ou troca por display compatível.",
      "tempo": "1 a 3 dias",
      "custo": "R$ 400 a R$ 800"
    },
    {
      "nivel": "Complexo",
      "desc": "Troca de display original. Galaxy S24: ~R$ 1.200-1.800. iPhone 15 Pro: ~R$ 1.500-2.200.",
      "tempo": "3 a 10 dias",
      "custo": "R$ 1.000 a R$ 2.500"
    }
  ],
  "riscos": [
    "Downgrade de firmware pode causar perda de dados se não fizer backup",
    "Voltar à versão anterior não garante que as listras sumam — pode ser dano permanente",
    "Esperar para ver se 'resolve sozinho' — defeitos progressivos só pioram",
    "Samsung e Apple podem não cobrir em garantia se considerar 'uso normal'",
    "Atualizar novamente quando sair patch pode piorar ou resolver — imprevisível"
  ],
  "diagnostico": "**Protocolo específico para listras pós-atualização:**\n\n1. **Verificar versão do firmware** — Identificar exatamente qual update causou o problema\n2. **Teste em modo seguro/recovery** — Se as listras aparecem no recovery, é hardware. Se só no sistema, pode ser software\n3. **Downgrade de teste** — Instalar firmware anterior para verificar se resolve\n4. **Teste de display** — Conectar display auxiliar para isolar o problema\n5. **Verificação de garantia** — Samsung ofereceu troca de display gratuita para alguns modelos afetados por One UI\n\n**Custo do diagnóstico: R$ 50-80, abatido do serviço.**",
  "solucao": "**Tentativa 1 — Software (20% de sucesso):**\n- Reset de fábrica\n- Downgrade para firmware anterior (requer unlock em Samsung, DFU em iPhone)\n- Flash de firmware de outra região\n\n**Tentativa 2 — Hardware/Conector (10% dos casos):**\n- Reconexão do flat cable do display\n- Limpeza de contatos oxidados\n\n**Tentativa 3 — Troca de Display (70% dos casos):**\n- Display compatível (menor custo, 85-90% da qualidade)\n- Display original (máxima qualidade, preço elevado)\n\n**IMPORTANTE:** Sempre tentamos software primeiro. É mais barato e, quando funciona, preserva o display original.",
  "quandoCompensa": "Sempre vale o diagnóstico. Se é software, resolve barato. Se é display, compatível resolve bem na maioria dos modelos. Celulares premium de até 2 anos — investir em display original faz sentido.",
  "quandoNaoCompensa": "Celulares de entrada (< R$ 800 novos) onde o display original custa mais que o aparelho. Celulares com 3+ anos — considere upgrade.",
  "whatsappMessage": "Olá! Meu celular apareceu listras na tela após atualização. Tem como resolver?",
  "relatedPages": [
    {
      "label": "Celular com Listras",
      "to": "/problemas/celular-listras-na-tela-curitiba"
    },
    {
      "label": "Tela Quebrada Celular",
      "to": "/problemas/celular-tela-quebrada-curitiba"
    },
    {
      "label": "Custo Troca de Tela",
      "to": "/problemas/quanto-custa-trocar-tela-celular-curitiba"
    },
    {
      "label": "Conserto de Celular",
      "to": "/servicos/conserto-celular"
    },
    {
      "label": "TV com Listras",
      "to": "/problemas/tv-listras-na-tela-curitiba"
    },
    {
      "label": "Por Que Display é Caro",
      "to": "/problemas/por-que-display-e-caro-curitiba"
    }
  ],
  "conteudoExtra": "## Dados Reais — Fóruns e Reclamações\n\n### Samsung Members Brasil (2024-2025)\n- Tópico \"Listra na tela após atualização\" — 189+ visualizações\n- Tópico \"Listras... De novo\" — 230+ visualizações, Samsung A54\n- Tópico \"Vício oculto: Listras na tela\" — usuários classificam como defeito de fábrica\n- Tópico \"Atualizei meu celular e ganhei 4 listras na tela\" — 672+ visualizações\n\n### Apple Community / Reddit\n- \"Apple Update caused green line issue. Refused for replacement\" — usuário iPhone 14\n- iPhone 14 Pro programa de substituição reconhecido pela Apple em 2023\n- iPhone 13 com green line após iOS 17.2 — centenas de posts no Reddit r/iPhone\n\n### Modelos Mais Afetados\n\n**Samsung:**\n- Galaxy S23 / S23 Ultra (One UI 6.0/6.1)\n- Galaxy S24 / S24 Ultra (One UI 6.1.1)\n- Galaxy A54 / A34 (atualizações de segurança)\n- Galaxy Z Flip 4/5 (tela interna)\n\n**Apple:**\n- iPhone 14 Pro / Pro Max (programa de troca reconhecido)\n- iPhone 13 / 13 Pro (iOS 17.x)\n- iPhone X / XS (defeito clássico)\n- iPhone 12 (iOS 16.x em diante)\n\n**Outros:**\n- Motorola Edge 30/40 (Android 14)\n- Xiaomi 13T (HyperOS)\n- OnePlus 12 (OxygenOS 14)\n\n## O Que Dizem os Especialistas\n\nSegundo técnicos especializados em reparo de display OLED:\n- **85%** dos casos de listras pós-atualização são defeitos de hardware revelados pelo software\n- **15%** são genuinamente causados por bugs de driver que podem ser revertidos\n- A melhor janela para tentar o reparo via software é **nas primeiras 48 horas** — depois, a degradação do painel pode se tornar permanente\n\n## Seus Direitos\n\n### Código de Defesa do Consumidor\n- **Art. 18:** Vício oculto — fabricante deve reparar em até 30 dias\n- **Art. 26, §3°:** Prazo de reclamação conta a partir da **descoberta do defeito**, não da compra\n- Se o celular está na garantia e as listras apareceram após atualização oficial, **o fabricante deve cobrir**\n- Guarde prints do fórum do fabricante mostrando que é problema conhecido"
};
