import type { ProblemaPageData } from "./types";

export const problema: ProblemaPageData = {
  "slug": "reflow-bga-curitiba",
  "title": "Reflow BGA em Curitiba — O Que É, Funciona? Tem Garantia?",
  "metaDescription": "Reflow BGA: solução temporária ou definitiva? Entenda o procedimento, por que NÃO tem garantia, taxa de sucesso e quando é indicado. Curitiba.",
  "h1": "Reflow BGA — O Que É, Por Que Não Tem Garantia e Quando É Indicado",
  "categoria": "Procedimentos Técnicos",
  "intro": "O reflow é o procedimento mais controverso em eletrônica. Consiste em **reaquecer as soldas BGA de um chip** para que se refundam e restabeleçam o contato elétrico. É rápido, barato — e **temporário**.\n\n**Por que não tem garantia?** Porque o reflow **não resolve a causa raiz do problema**. Se o chip falhou por solda fria (trincas nas microesferas de solda), o reflow apenas re-derrete as esferas existentes. Elas voltam a trincar em semanas, meses ou, com sorte, 1-2 anos.\n\n**Dados reais:**\n- Taxa de sucesso imediato: 60-80%\n- Duração média do reparo: 1 a 6 meses (pode durar mais, pode durar dias)\n- Custo: R$ 150 a R$ 350\n- Garantia: **NÃO oferecemos garantia** em reflow — e desconfie de quem oferece\n\n**Comparação direta:**\n- Reflow: R$ 150-350, sem garantia, temporário\n- Reballing: R$ 400-800, com garantia de 90 dias, mais duradouro\n- Troca de chip: R$ 500-1.200, com garantia de 90 dias, definitivo\n\n**Somos transparentes:** informamos que o reflow é um \"tapa-buraco\". Alguns clientes optam por ele conscientemente quando o equipamento é antigo ou o orçamento é limitado.",
  "sintomas": [
    {
      "titulo": "Notebook/console com artefatos na tela",
      "desc": "Quadrados coloridos, linhas, imagem distorcida. GPU com solda BGA trincada — candidato clássico a reflow (temporário) ou reballing (mais duradouro).",
      "gravidade": "Complexo"
    },
    {
      "titulo": "Equipamento não dá vídeo após aquecer",
      "desc": "Liga, ventilador gira, mas sem imagem. Melhora após esfriar. Solda BGA da GPU expandindo com calor = contato intermitente.",
      "gravidade": "Complexo"
    },
    {
      "titulo": "Notebook reinicia ao forçar GPU",
      "desc": "Funciona em tarefas leves mas desliga/reinicia em jogos ou vídeo pesado. GPU com solda comprometida sob estresse térmico.",
      "gravidade": "Complexo"
    },
    {
      "titulo": "Console com tela preta (PS4, Xbox)",
      "desc": "Problema clássico de GPU/APU com solda BGA deteriorada. Reflow é comum mas temporário. Reballing é a solução correta.",
      "gravidade": "Complexo"
    }
  ],
  "causas": [
    {
      "titulo": "Solda BGA trincada por ciclos térmicos",
      "desc": "Ligar/desligar = aquecer/resfriar = expandir/contrair. Após milhares de ciclos, microesferas de solda lead-free (sem chumbo) trincam. É um problema de fadiga mecânica da solda.",
      "tipo": "desgaste"
    },
    {
      "titulo": "Solda lead-free (sem chumbo) mais frágil",
      "desc": "Desde a diretiva RoHS (2006), eletrônicos usam solda sem chumbo (SAC305). Esta solda é mais rígida e forma trincas mais facilmente que a antiga solda com chumbo (Sn63Pb37).",
      "tipo": "desgaste"
    },
    {
      "titulo": "Dissipação térmica insuficiente",
      "desc": "Pasta térmica seca, ventilador obstruído ou design térmico ruim (notebook fino demais) = temperaturas mais altas = degradação mais rápida da solda.",
      "tipo": "hardware"
    },
    {
      "titulo": "Defeito de projeto (design flaw)",
      "desc": "Alguns modelos têm defeito de projeto reconhecido: MacBook Pro 2011 (GPU Radeon), Xbox 360 (RROD), PS3 (YLOD). A solda BGA falha sistematicamente.",
      "tipo": "hardware"
    }
  ],
  "cenarios": [
    {
      "nivel": "Simples",
      "desc": "Reflow com ar quente / estação infravermelha. Rápido, barato, temporário.",
      "tempo": "1 a 2 dias",
      "custo": "R$ 150 a R$ 350"
    },
    {
      "nivel": "Médio",
      "desc": "Reballing — remoção do chip, limpeza, novas esferas, recolocação. Mais duradouro.",
      "tempo": "3 a 7 dias",
      "custo": "R$ 400 a R$ 800"
    },
    {
      "nivel": "Complexo",
      "desc": "Troca do chip por um novo/funcional. Solução definitiva quando o chip em si falhou.",
      "tempo": "7 a 15 dias",
      "custo": "R$ 500 a R$ 1.200"
    }
  ],
  "riscos": [
    "Reflow é TEMPORÁRIO — pode durar de dias a meses, raramente anos",
    "Cada reflow subsequente tem menor chance de sucesso",
    "Calor excessivo pode danificar componentes próximos ao chip",
    "Reflow com soprador de calor comum (sem controle) é perigoso para a placa",
    "Técnicos inescrupulosos vendem reflow como 'reballing' — peça para ver o processo",
    "Após 2-3 reflows sem sucesso, os pads podem estar danificados demais para reballing"
  ],
  "diagnostico": "**Como identificamos se o problema é solda BGA:**\n\n**1. Sintomas típicos:** artefatos, sem vídeo, reinício sob carga — padrão de GPU/CPU com solda fria.\n\n**2. Teste térmico:** Aquecer a região do chip com ar quente. Se o problema melhora temporariamente, confirma solda BGA.\n\n**3. Teste de flexão (cuidadoso):** Leve pressão na região do chip. Se a imagem volta, é solda.\n\n**4. Histórico do modelo:** Verificar se é um modelo com defeito conhecido de BGA.\n\n**Custo do diagnóstico: R$ 60-100, abatido do serviço.**",
  "solucao": "**O procedimento de reflow passo a passo:**\n\n1. **Desmontagem completa** — remover placa-mãe do equipamento\n2. **Proteção** — cobrir componentes sensíveis com fita kapton\n3. **Aplicação de flux** — flux líquido ou em pasta ao redor do chip BGA\n4. **Pré-aquecimento** — placa aquecida por baixo a 100-150°C\n5. **Reflow** — ar quente ou infravermelho no chip a 220-250°C por 30-90 segundos\n6. **Resfriamento controlado** — diminuir temperatura gradualmente (2-3°C/segundo)\n7. **Limpeza** — remover resíduos de flux\n8. **Teste funcional** — religar e testar por 2-4 horas\n\n**Por que NÃO damos garantia:**\n- O reflow não substitui as esferas de solda — apenas re-derrete as trincadas\n- As mesmas trincas se reformam com novos ciclos térmicos\n- Não há como prever se durará 1 semana ou 1 ano\n- Seria desonesto garantir um procedimento sabidamente temporário\n\n**Somos transparentes:** Explicamos ao cliente que é uma solução paliativa e deixamos ele decidir.",
  "quandoCompensa": "Equipamentos antigos (5+ anos) onde o investimento em reballing não se justifica. Quando o cliente precisa extrair dados urgentes e depois vai trocar o equipamento. Como teste diagnóstico — se o reflow funciona, confirma que o problema é solda BGA e o reballing é viável.",
  "quandoNaoCompensa": "Equipamentos que o cliente pretende usar por mais 2+ anos — reballing é melhor investimento. Quando já foram feitos 2+ reflows anteriores. Em chips com defeito interno (não é a solda, é o silício).",
  "whatsappMessage": "Olá! Quero saber sobre reflow BGA. Meu equipamento tem problema de vídeo/placa.",
  "relatedPages": [
    {
      "label": "Reballing BGA",
      "to": "/procedimentos/reballing-bga-curitiba"
    },
    {
      "label": "Troca de Chip BGA",
      "to": "/procedimentos/troca-chip-bga-curitiba"
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
    },
    {
      "label": "Microsoldagem Celular",
      "to": "/procedimentos/microsoldagem-celular-curitiba"
    }
  ],
  "conteudoExtra": "## Reflow vs Reballing — Comparação Honesta\n\n| Aspecto | Reflow | Reballing |\n|---------|--------|-----------|\n| **O que faz** | Re-derrete soldas existentes | Remove chip, troca todas as esferas, recoloca |\n| **Temperatura** | 220-250°C no chip | 220-250°C (remoção) + reballing + recolocação |\n| **Tempo** | 30-90 segundos de calor | 2-4 horas de processo completo |\n| **Custo** | R$ 150-350 | R$ 400-800 |\n| **Taxa de sucesso** | 60-80% imediato | 75-90% imediato |\n| **Duração** | Dias a meses (imprevisível) | 1-5+ anos |\n| **Garantia** | ❌ NÃO | ✅ 90 dias |\n| **Resolve a causa?** | ❌ Paliativo | ✅ Troca as esferas |\n| **Equipamento necessário** | Ar quente / IR | Estação BGA (R$ 5.000-35.000) |\n\n## Por Que o Reflow É Temporário — Explicação Técnica\n\n### O Problema Raiz\nAs esferas de solda BGA trincam por **fadiga termomecânica**. Cada ciclo liga/desliga causa:\n- Aquecimento: chip expande mais que a placa (coeficientes térmicos diferentes)\n- Resfriamento: chip contrai, placa contrai em velocidade diferente\n- Resultado: microtrincas nas esferas de solda\n\n### O Que o Reflow Faz\nAquece as esferas até o ponto de fusão (~217°C para SAC305). As trincas se fecham temporariamente. Mas:\n- As esferas não recuperam a forma esférica original\n- A geometria deformada concentra estresse nos mesmos pontos\n- As trincas se reformam mais rapidamente que da primeira vez\n\n### O Que o Reballing Faz\nRemove o chip, **limpa todas as esferas antigas** e aplica **esferas novas** com stencil. A geometria é restaurada completamente. Por isso dura mais.\n\n## Casos Clássicos de BGA\n\n### Xbox 360 — Red Ring of Death (RROD)\n- GPU com solda BGA falha em massa (2005-2009)\n- Microsoft gastou US$ 1 bilhão em reparos/trocas\n- Reflow era \"solução\" caseira com toalha (mito)\n- Reballing era a solução real\n\n### MacBook Pro 2011 — GPU Radeon\n- AMD Radeon HD 6750M/6770M com solda BGA falha\n- Apple lançou programa de reparo (encerrado em 2016)\n- Reflow funcionava por 1-3 meses\n- Reballing ou troca de chip é a solução\n\n### PS3 — Yellow Light of Death (YLOD)\n- RSX (GPU) com solda BGA\n- Mesmo problema do Xbox 360\n\n### PS4 — Sem vídeo HDMI\n- Chip HDMI com solda BGA\n- Reballing do chip HDMI resolve\n\n## Nosso Compromisso\n\n**Nunca fazemos reflow dizendo que é reballing.** Se o procedimento indicado é reflow (por custo-benefício), informamos claramente:\n- É temporário\n- Não tem garantia\n- O reballing é a opção mais segura\n- O cliente decide"
};
