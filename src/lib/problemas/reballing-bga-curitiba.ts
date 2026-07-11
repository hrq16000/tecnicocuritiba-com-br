import type { ProblemaPageData } from "./types";

export const problema: ProblemaPageData = {
  "slug": "reballing-bga-curitiba",
  "title": "Reballing BGA em Curitiba — Procedimento Definitivo com Garantia",
  "metaDescription": "Reballing BGA profissional em Curitiba. Troca completa das esferas de solda. Garantia de 90 dias. GPU, CPU, chipsets. Notebooks, consoles, placas de vídeo.",
  "h1": "Reballing BGA — Troca de Esferas de Solda com Garantia em Curitiba",
  "categoria": "Procedimentos Técnicos",
  "intro": "O reballing é o procedimento **correto e definitivo** para problemas de solda BGA. Diferente do reflow (que apenas re-derrete), o reballing **remove o chip, descarta as esferas antigas e aplica esferas novas** usando stencil de precisão.\n\n**Por que TEM garantia (90 dias):**\n- As esferas de solda são **100% novas** — sem trincas, sem deformações\n- A geometria esférica é restaurada pelo stencil — distribuição uniforme de estresse\n- O processo é controlado com perfil térmico preciso\n- Se o chip em si estiver funcional, o reballing resolve de forma duradoura\n\n**Equipamento necessário (investimento real):**\n- Estação BGA infravermelha (Achi IR6000, Scotle IR360 Pro): R$ 3.000 a R$ 35.000\n- Stencils BGA por chip (centenas de modelos): R$ 30-150 cada, acervo de R$ 2.000-5.000\n- Esferas de solda (0.3mm a 0.76mm, SAC305 ou Sn63Pb37): R$ 20-60/frasco\n- Flux profissional (Amtech, Kingbo): R$ 30-80/seringa\n- Jigs de fixação: R$ 50-300 cada\n\n**Por que é mais caro que reflow:** O processo leva 2-4 horas vs 30 minutos do reflow, exige equipamento 10x mais caro e consumíveis específicos.",
  "sintomas": [
    {
      "titulo": "GPU com solda fria (sem vídeo/artefatos)",
      "desc": "O candidato #1 para reballing. Chips NVIDIA e AMD em notebooks, consoles e placas de vídeo. Esferas BGA trincam após 2-5 anos de uso intenso.",
      "gravidade": "Complexo"
    },
    {
      "titulo": "Chipset/ponte norte com defeito",
      "desc": "Notebook não reconhece HD, USB falha, rede para. Chipset Intel/AMD com solda BGA deteriorada.",
      "gravidade": "Complexo"
    },
    {
      "titulo": "CPU com contato intermitente",
      "desc": "Raro em desktops (soquete LGA) mas comum em notebooks (CPU soldada BGA). Reinícios aleatórios, travamentos.",
      "gravidade": "Complexo"
    },
    {
      "titulo": "Console após reflow fracassado",
      "desc": "PS3/PS4/Xbox que passou por reflow e voltou a falhar. Reballing é o próximo passo antes de trocar o chip.",
      "gravidade": "Complexo"
    }
  ],
  "causas": [
    {
      "titulo": "Fadiga termomecânica das esferas",
      "desc": "O coeficiente de expansão térmica (CTE) do chip de silício é diferente da placa FR-4. A cada ciclo térmico, as esferas sofrem estresse de cisalhamento. Após 10.000-50.000 ciclos, trincam.",
      "tipo": "desgaste"
    },
    {
      "titulo": "Solda lead-free (RoHS) mais frágil",
      "desc": "Solda SAC305 (Sn96.5/Ag3.0/Cu0.5) tem ponto de fusão de 217-221°C vs 183°C da Sn63Pb37. É mais rígida, forma trincas mais facilmente. Muitos técnicos fazem reballing com solda com chumbo para maior durabilidade.",
      "tipo": "hardware"
    },
    {
      "titulo": "Design térmico inadequado",
      "desc": "Notebooks ultrafinos, consoles compactos — pouco espaço para dissipação. GPUs operam a 80-95°C constantemente.",
      "tipo": "hardware"
    },
    {
      "titulo": "Reflow anterior mal feito",
      "desc": "Reflows repetidos deformam as esferas, oxidam pads e pioram progressivamente o contato.",
      "tipo": "erro-humano"
    }
  ],
  "cenarios": [
    {
      "nivel": "Simples",
      "desc": "Reballing de chip com stencil disponível. Pads limpos, sem danos anteriores.",
      "tempo": "3 a 5 dias",
      "custo": "R$ 400 a R$ 600"
    },
    {
      "nivel": "Médio",
      "desc": "Reballing após reflow anterior. Pads precisam de limpeza extra. Stencil raro.",
      "tempo": "5 a 10 dias",
      "custo": "R$ 500 a R$ 800"
    },
    {
      "nivel": "Complexo",
      "desc": "Reballing com troca de pasta térmica do die + recuperação de pads danificados.",
      "tempo": "7 a 15 dias",
      "custo": "R$ 600 a R$ 1.000"
    }
  ],
  "riscos": [
    "Se o chip de silício tem defeito interno, o reballing não resolve (gasto sem resultado)",
    "Pads da placa danificados por reflows anteriores podem não segurar novas esferas",
    "Stencil errado = esferas fora de posição = curto-circuito",
    "Temperatura incorreta pode delaminar a placa PCB",
    "Chips com underfill (cola epóxi) são muito mais difíceis de remover"
  ],
  "diagnostico": "**Antes do reballing, confirmamos que o problema é solda:**\n\n1. **Teste térmico** — aquecimento localizado na GPU/chipset. Se funciona temporariamente, é solda.\n2. **Teste de flexão** — leve pressão no chip. Melhora = solda.\n3. **Histórico** — modelo com defeito BGA conhecido?\n4. **Descartamos** — fonte, memória RAM, HD/SSD, BIOS como causas.\n5. **Informamos** — taxa de sucesso estimada para o modelo específico.\n\n**Só procedemos ao reballing quando temos confiança de que é solda BGA.**",
  "solucao": "**Processo completo de reballing — 10 etapas:**\n\n**Etapa 1 — Preparação:**\nDesmontagem completa. Remoção de dissipador, pasta térmica antiga.\n\n**Etapa 2 — Proteção:**\nCobrir componentes sensíveis com fita kapton e folha de alumínio.\n\n**Etapa 3 — Pré-aquecimento:**\nPlaca aquecida por baixo a 100-150°C para evitar choque térmico.\n\n**Etapa 4 — Remoção do chip:**\nAr quente ou infravermelho a 220-250°C. Flux aplicado. Chip removido com ventosa ou pinça quando a solda flui.\n\n**Etapa 5 — Limpeza da placa:**\nRemoção de resíduos de solda dos pads com malha dessoldadora e ferro. Inspeção com microscópio.\n\n**Etapa 6 — Limpeza do chip:**\nMesmo processo no chip — remoção de esferas antigas dos pads do BGA.\n\n**Etapa 7 — Reballing:**\nStencil BGA posicionado sobre o chip. Esferas de solda (0.3-0.76mm) aplicadas nos furos do stencil. Aquecimento com ar quente para fixar as esferas. Remoção do stencil.\n\n**Etapa 8 — Recolocação:**\nChip com esferas novas posicionado na placa. Alinhamento preciso. Reflow controlado com perfil térmico.\n\n**Etapa 9 — Limpeza final:**\nRemoção de flux residual. Inspeção com microscópio.\n\n**Etapa 10 — Teste:**\nMontagem, teste funcional, teste de estresse por 4-8 horas.\n\n**GARANTIA DE 90 DIAS** — Se o problema retornar no período, refazemos sem custo.",
  "quandoCompensa": "Notebooks gamers / workstations com GPU dedicada (R$ 4.000-15.000 novos). Consoles (PS4 Pro, Xbox One X). Placas de vídeo desktop de valor (RTX 3060+). MacBooks com GPU dedicada.",
  "quandoNaoCompensa": "Notebooks com mais de 6 anos e GPU integrada (chip não é substituível separadamente). Quando o chip de silício tem defeito interno (não é a solda). Após 3+ tentativas de reflow com pads destruídos.",
  "whatsappMessage": "Olá! Preciso de reballing BGA. Meu notebook/console tem problema de GPU/vídeo.",
  "relatedPages": [
    {
      "label": "Reflow BGA",
      "to": "/procedimentos/reflow-bga-curitiba"
    },
    {
      "label": "Troca de Chip BGA",
      "to": "/procedimentos/troca-chip-bga-curitiba"
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
  "conteudoExtra": "## Reballing: O Que Ninguém Te Conta\n\n### Lead-Free vs Leaded: A Escolha do Técnico\n\nUm segredo da indústria: **muitos técnicos fazem reballing com solda COM chumbo** (Sn63Pb37) mesmo em equipamentos que vieram com solda sem chumbo (SAC305).\n\n**Por quê?**\n- Solda com chumbo funde a 183°C (vs 217°C sem chumbo) — menos estresse térmico\n- É mais maleável — absorve melhor os ciclos de expansão/contração\n- Forma juntas mais confiáveis — menos trincas\n- É a mesma solda usada em equipamentos militares e aeroespaciais\n\n**É seguro?** Sim, o chumbo está encapsulado dentro do chip. Não há exposição ao usuário.\n\n**O resultado é melhor?** Na maioria dos casos, sim. Reballing com solda leaded tende a durar mais.\n\n### Stencils: A Precisão do Processo\n\nO stencil é uma placa fina de aço inoxidável com furos microscopicamente posicionados — cada furo corresponde a um pad do chip BGA.\n\n- Stencil direto (1:1): posicionado diretamente sobre o chip\n- Stencil universal: ajustável para vários chips similares\n- Precisão dos furos: ±0.02mm\n- Custo: R$ 30-150 cada (precisamos de centenas em estoque)\n\n### Taxa de Sucesso por Tipo de Chip\n\n| Chip | Taxa de Sucesso | Observação |\n|------|----------------|------------|\n| GPU notebook (NVIDIA) | 75-85% | Depende se o silício está bom |\n| GPU console (PS4/Xbox) | 80-90% | Chips mais robustos |\n| Chipset Intel | 85-90% | Geralmente é só a solda |\n| CPU BGA notebook | 70-80% | Alto risco, alto valor |\n| GPU desktop (placa de vídeo) | 80-90% | Mais espaço, melhor acesso |\n\n### Quanto Dura um Reballing?\n\n- **Com solda sem chumbo:** 1-5 anos (mesma durabilidade do original)\n- **Com solda com chumbo:** 2-7+ anos (mais durável)\n- **Depende de:** ventilação do equipamento, pasta térmica, uso (games vs escritório)\n\n### Manutenção Pós-Reballing\n\n1. **Troque pasta térmica** a cada 1-2 anos\n2. **Limpe ventiladores** a cada 6 meses\n3. **Use base refrigerada** em notebooks\n4. **Evite bloquear saídas de ar** (cama, sofá)\n5. **Monitore temperaturas** com HWMonitor ou similar"
};
