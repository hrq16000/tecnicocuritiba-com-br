import type { ProblemaPageData } from "./types";

export const problema: ProblemaPageData = {
  "slug": "troca-chip-bga-curitiba",
  "title": "Troca de Chip BGA em Curitiba — GPU, CPU, Chipset | Solução Definitiva",
  "metaDescription": "Troca completa de chip BGA (GPU, CPU, chipset) em Curitiba. Solução definitiva quando reflow e reballing não resolvem. Garantia de 90 dias.",
  "h1": "Troca de Chip BGA — Quando Reballing Não É Suficiente",
  "categoria": "Procedimentos Técnicos",
  "intro": "Quando o chip em si está com **defeito interno no silício**, nem reflow nem reballing resolvem. A solução é a **troca completa do chip** por um novo ou funcional testado.\n\n**Por que TEM garantia (90 dias):**\n- O chip é novo ou testado e funcional\n- As esferas de solda são novas (reballing no chip novo)\n- O processo é o mesmo do reballing + um chip comprovadamente bom\n\n**É o procedimento mais caro mas também o mais definitivo:**\n- Custo do chip: R$ 100 a R$ 800 dependendo do modelo\n- Mão de obra: R$ 300 a R$ 500\n- Total: R$ 500 a R$ 1.200\n\n**Chips mais comuns que trocamos:**\n- GPU NVIDIA: GeForce MX, GTX, RTX Mobile — R$ 150 a R$ 600\n- GPU AMD: Radeon RX Mobile — R$ 100 a R$ 400\n- Chipset Intel: HM370, HM470 — R$ 80 a R$ 200\n- APU AMD: Ryzen com Vega — R$ 200 a R$ 500\n- HDMI IC (consoles): Panasonic MN864729 — R$ 30 a R$ 80",
  "sintomas": [
    {
      "titulo": "Artefatos persistem após reballing",
      "desc": "Se o reballing foi feito corretamente e os artefatos voltaram rapidamente, o chip de silício tem defeito interno. Troca é necessária.",
      "gravidade": "Complexo"
    },
    {
      "titulo": "Chip esquenta excessivamente",
      "desc": "Consumo anormal de energia no chip = curto interno no silício. Reballing não resolve curto interno.",
      "gravidade": "Complexo"
    },
    {
      "titulo": "Sem vídeo com chip novo verificado",
      "desc": "Testamos com chip sabidamente bom. Se funciona, o chip original estava defeituoso internamente.",
      "gravidade": "Complexo"
    },
    {
      "titulo": "Defeito de fabricação conhecido",
      "desc": "Lotes de chips com defeito (ex: NVIDIA GT 330M, AMD Radeon HD 6770M). Troca por revisão corrigida quando disponível.",
      "gravidade": "Complexo"
    }
  ],
  "causas": [
    {
      "titulo": "Defeito interno no silício (die)",
      "desc": "Eletromigração, degradação de óxido de gate, latch-up — problemas no nível do transistor dentro do chip. Nenhum processo de solda resolve.",
      "tipo": "hardware"
    },
    {
      "titulo": "Dano por sobretensão/surto",
      "desc": "Picos de tensão podem queimar circuitos internos do chip permanentemente.",
      "tipo": "erro-humano"
    },
    {
      "titulo": "Superaquecimento prolongado",
      "desc": "Operação acima de 100°C por períodos extensos degrada o silício. Comum em notebooks com ventilação entupida.",
      "tipo": "desgaste"
    },
    {
      "titulo": "Defeito de lote/fabricação",
      "desc": "Alguns lotes de chips saem da fábrica com defeito. NVIDIA e AMD já reconheceram lotes problemáticos.",
      "tipo": "hardware"
    }
  ],
  "cenarios": [
    {
      "nivel": "Simples",
      "desc": "Chip HDMI de console (Panasonic MN864729). Peça barata, soldagem acessível.",
      "tempo": "3 a 5 dias",
      "custo": "R$ 300 a R$ 500"
    },
    {
      "nivel": "Médio",
      "desc": "GPU mobile (NVIDIA MX/GTX). Chip R$ 150-400 + reballing + soldagem.",
      "tempo": "5 a 10 dias",
      "custo": "R$ 500 a R$ 900"
    },
    {
      "nivel": "Complexo",
      "desc": "GPU de alto desempenho (RTX) ou CPU/APU. Chip caro, processo de alto risco.",
      "tempo": "7 a 15 dias",
      "custo": "R$ 700 a R$ 1.200"
    }
  ],
  "riscos": [
    "Chip de reposição pode ser reciclado/usado — verificamos antes",
    "Chips falsificados existem no mercado — compramos de fornecedores confiáveis",
    "Remoção do chip antigo pode danificar pads se mal executada",
    "Compatibilidade de revisão — mesma GPU pode ter revisões diferentes",
    "Em notebooks com GPU + CPU no mesmo package (APU), troca é mais arriscada"
  ],
  "diagnostico": "**Como determinamos que é necessária troca de chip:**\n\n1. **Reballing foi feito corretamente** e o problema retornou em < 30 dias\n2. **Chip apresenta curto interno** — consumo de corrente anormal medido com fonte\n3. **Teste com chip funcional** — se um chip bom resolve, confirma defeito do original\n4. **Análise do modelo** — verificar se há defeito de lote conhecido\n\n**Só indicamos troca de chip quando temos certeza** de que reballing não é suficiente.",
  "solucao": "**Processo de troca de chip BGA:**\n\n1. **Sourcing do chip** — localizar chip novo ou testado compatível (modelo exato + revisão)\n2. **Remoção do chip antigo** — estação BGA, perfil térmico, ventosa\n3. **Limpeza dos pads** — remoção de solda antiga, inspeção de integridade\n4. **Reballing do chip novo** — esferas de solda novas via stencil\n5. **Soldagem** — chip novo posicionado e soldado com perfil controlado\n6. **Teste funcional** — boot, drivers, teste de estresse (FurMark, Prime95)\n7. **Teste de durabilidade** — 8-12 horas de uso intenso antes de liberar\n\n**GARANTIA DE 90 DIAS** em todo o processo.",
  "quandoCompensa": "Notebooks de alto valor (R$ 5.000+), placas de vídeo desktop (RTX 3060+), MacBooks, consoles de última geração. Quando o equipamento está em bom estado geral e só o chip falhou.",
  "quandoNaoCompensa": "Notebooks com mais de 5 anos onde o custo do chip + mão de obra ultrapassa 50% do valor do equipamento. Quando há múltiplos problemas além do chip.",
  "whatsappMessage": "Olá! Preciso de troca de chip BGA. Meu notebook/console não funciona após reballing.",
  "relatedPages": [
    {
      "label": "Reballing BGA",
      "to": "/procedimentos/reballing-bga-curitiba"
    },
    {
      "label": "Reflow BGA",
      "to": "/procedimentos/reflow-bga-curitiba"
    },
    {
      "label": "Microsoldagem Celular",
      "to": "/procedimentos/microsoldagem-celular-curitiba"
    },
    {
      "label": "Reparo Placa Notebook",
      "to": "/problemas/reparo-placa-mae-notebook-curitiba"
    },
    {
      "label": "Conserto de Placa",
      "to": "/servicos/conserto-placa"
    },
    {
      "label": "Por Que Custa Caro",
      "to": "/problemas/por-que-conserto-placa-mae-custa-caro-curitiba"
    }
  ],
  "conteudoExtra": "## Chips Mais Comuns e Preços de Referência\n\n| Chip | Aplicação | Preço da peça |\n|------|----------|---------------|\n| NVIDIA MX150 (N17S-G1-A1) | Notebooks intermediários | R$ 150-250 |\n| NVIDIA GTX 1650 Mobile | Notebooks gamers entrada | R$ 200-350 |\n| NVIDIA RTX 3050 Mobile | Notebooks gamers | R$ 300-500 |\n| AMD Radeon RX 5500M | Notebooks gamers | R$ 200-350 |\n| Intel HM370/HM470 | Chipset de notebook | R$ 80-180 |\n| Panasonic MN864729 | HDMI PS4/PS5 | R$ 30-80 |\n| AMD APU Ryzen 5 (BGA) | Notebooks AMD | R$ 250-500 |\n| Apple T2 | MacBook 2018-2020 | R$ 300-600 |\n\n## Fontes de Chips — Onde Compramos\n\n- **Distribuidores especializados** — chips novos com procedência\n- **Chips de placas doadoras** — extraídos de placas com outros defeitos, testados individualmente\n- **Importação direta** — AliExpress (fornecedores verificados), Mouser, DigiKey\n\n**NUNCA usamos chips sem testar.** Todo chip passa por verificação visual (microscópio) e teste elétrico antes de instalar.\n\n## Hierarquia de Procedimentos\n\n**Problema de solda BGA detectado:**\n\n**1. REFLOW (R$ 150-350)** — Temporário, sem garantia. Se não resolver ou voltar:\n\n**2. REBALLING (R$ 400-800)** — Troca de esferas, com garantia 90 dias. Se não resolver:\n\n**3. TROCA DE CHIP (R$ 500-1.200)** — Chip novo, com garantia 90 dias. Se não resolver:\n\n**4. PROBLEMA NA PLACA (não no chip)** — Trilha interna rompida, pad destruído = Troca de placa-mãe ou descarte"
};
