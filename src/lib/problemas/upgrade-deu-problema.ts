import type { ProblemaPageData } from "./types";

export const problema: ProblemaPageData = {
  "slug": "upgrade-deu-problema",
  "title": "Upgrade Deu Problema | Técnico em Curitiba",
  "metaDescription": "Fez upgrade e deu problema? SSD, RAM ou outro componente não funciona? Diagnóstico em Curitiba.",
  "h1": "Upgrade Deu Problema — Como Resolver?",
  "categoria": "Erros e Casos Reais",
  "intro": "Upgrades de hardware são a forma mais eficiente de melhorar o desempenho de um computador. Mas quando feitos sem conhecimento técnico adequado, podem causar problemas sérios: computador que não liga, instabilidade, perda de dados ou até dano permanente. Atendemos dezenas de casos por mês de upgrades mal executados em Curitiba.",
  "sintomas": [
    {
      "titulo": "Não liga após upgrade",
      "desc": "Peça incompatível ou mal instalada.",
      "gravidade": "Simples a médio"
    },
    {
      "titulo": "Instabilidade após upgrade",
      "desc": "Trava, tela azul ou reinicia. Compatibilidade ou instalação.",
      "gravidade": "Simples a médio"
    },
    {
      "titulo": "Performance não melhorou",
      "desc": "Upgrade errado para o gargalo real.",
      "gravidade": "Simples"
    }
  ],
  "causas": [
    {
      "titulo": "Incompatibilidade de componentes",
      "desc": "Peça que não funciona com o hardware existente.",
      "tipo": "erro-humano"
    },
    {
      "titulo": "Instalação incorreta",
      "desc": "Componente mal encaixado, cabo errado, sem pasta térmica.",
      "tipo": "erro-humano"
    },
    {
      "titulo": "BIOS não configurada",
      "desc": "Alguns upgrades exigem ajustes na BIOS para funcionar.",
      "tipo": "erro-humano"
    },
    {
      "titulo": "Componente com defeito de fábrica",
      "desc": "Peça nova já com defeito — acontece.",
      "tipo": "hardware"
    }
  ],
  "cenarios": [
    {
      "nivel": "Simples",
      "desc": "Reconfiguração, reencaixe, ajuste de BIOS.",
      "tempo": "1h",
      "custo": "R$ 99,99 a R$ 150"
    },
    {
      "nivel": "Médio",
      "desc": "Troca de peça por modelo compatível.",
      "tempo": "1 a 2 dias",
      "custo": "R$ 150 a R$ 300"
    },
    {
      "nivel": "Complexo",
      "desc": "Reparo de dano causado pelo upgrade.",
      "tempo": "3 a 7 dias",
      "custo": "R$ 250 a R$ 600"
    }
  ],
  "riscos": [
    "Continuar tentando pode piorar o dano",
    "Trocar mais peças por achismo desperdiça dinheiro"
  ],
  "diagnostico": "Análise completa do upgrade realizado, teste de compatibilidade, verificação de instalação. Custo: R$ 99,99.",
  "solucao": "Correção do upgrade (peça certa, instalação certa, configuração certa).",
  "quandoCompensa": "Na maioria dos casos — o equipamento original geralmente está intacto.",
  "quandoNaoCompensa": "Quando o upgrade causou curto e danificou a placa-mãe.",
  "whatsappMessage": "Olá! Fiz um upgrade e agora meu computador tem problemas. Podem ajudar?",
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
      "label": "Erro RAM",
      "to": "/problemas/erro-ao-instalar-memoria-ram"
    },
    {
      "label": "Erros Comuns em Upgrade",
      "to": "/problemas/erros-comuns-em-upgrade"
    },
    {
      "label": "Upgrade SSD/Memória",
      "to": "/servicos/upgrade-ssd-memoria"
    },
    {
      "label": "Computador Não Liga",
      "to": "/problemas/computador-nao-liga-curitiba"
    },
    {
      "label": "Notebook Após Upgrade",
      "to": "/problemas/notebook-apos-upgrade-nao-liga-curitiba"
    }
  ],
  "conteudoExtra": "### Os Upgrades Mais Comuns (e Erros)\n\n| Upgrade | Erro Comum | Como Evitar |\n|---|---|---|\n| SSD | Interface errada (NVMe vs SATA) | Verificar manual da placa |\n| RAM | Geração ou frequência errada | Consultar QVL da placa |\n| GPU | Fonte insuficiente | Calcular TDP total |\n| Processador | Socket incompatível | Verificar compatibilidade exata |\n\n### Por Que Upgrades Dão Errado?\n\nO principal motivo é a **confiança em tutoriais genéricos**. O YouTube está cheio de vídeos \"como instalar SSD\" ou \"como trocar RAM\", mas nenhum deles verifica a compatibilidade específica do SEU equipamento. Cada placa-mãe, cada notebook, cada geração tem suas particularidades.\n\nEm Curitiba, atendemos em média 15 a 20 casos por mês de upgrades mal executados. Os mais comuns:\n\n1. **SSD M.2 NVMe em slot M.2 SATA** — O conector é igual, o módulo encaixa, mas não funciona. São protocolos diferentes e o slot precisa suportar NVMe. Muitos notebooks de 2015-2018 têm M.2 mas só SATA.\n\n2. **RAM dual-channel com pentes diferentes** — Misturar pentes de marcas, frequências ou timings diferentes pode causar instabilidade intermitente. O computador funciona \"às vezes\" e trava \"aleatoriamente\".\n\n3. **GPU sem fonte adequada** — Uma GTX 1660 precisa de pelo menos 450W de fonte de qualidade. Instalar em fonte genérica de 400W causa desligamentos sob carga.\n\n4. **Processador de geração errada** — Um Core i7 de 10ª geração NÃO funciona em placa de 8ª geração, mesmo sendo LGA 1200 vs LGA 1151.\n\n### O Que Fazer Quando o Upgrade Dá Errado\n\n**Passo 1**: Não entre em pânico. Na maioria dos casos, o equipamento original não está danificado.\n\n**Passo 2**: Se possível, reverta o upgrade (reinstale a peça original) para confirmar que o PC funciona normalmente.\n\n**Passo 3**: Se não consegue reverter ou o problema persiste, chame diagnóstico profissional.\n\n### Custo de Correção vs Custo de Fazer Certo\n\n| Cenário | Custo do Upgrade DIY (com erro) | Custo com Técnico desde o Início |\n|---|---|---|\n| RAM incompatível | Peça errada R$ 200 + correção R$ 150 = R$ 350 | Peça certa R$ 200 + instalação R$ 99,99 = R$ 290 |\n| SSD errado | SSD errado R$ 250 + troca R$ 150 = R$ 400 | SSD certo R$ 250 + instalação R$ 120 = R$ 370 |\n| Dano ao slot | Peça R$ 200 + reparo R$ 400 = R$ 600 | Peça R$ 200 + instalação R$ 99,99 = R$ 290 |\n\nContratar um técnico para orientar ou executar o upgrade quase sempre sai mais barato do que tentar sozinho e errar."
};
