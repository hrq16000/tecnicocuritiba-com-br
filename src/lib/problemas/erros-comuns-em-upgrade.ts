import type { ProblemaPageData } from "./types";

export const problema: ProblemaPageData = {
  "slug": "erros-comuns-em-upgrade",
  "title": "Erros Comuns em Upgrade de PC | Evite Problemas",
  "metaDescription": "Os erros mais comuns ao fazer upgrade de PC. Evite problemas com RAM, SSD, GPU. Guia técnico.",
  "h1": "Erros Comuns em Upgrade de PC — Evite Problemas",
  "categoria": "Buscas Educativas",
  "intro": "Upgrades são a forma mais inteligente de melhorar o computador. Mas erros na escolha das peças ou na instalação podem transformar uma melhoria em um problema. Neste guia, listamos os erros mais comuns que vemos em Curitiba e como evitá-los.",
  "sintomas": [
    {
      "titulo": "Computador não liga após upgrade",
      "desc": "Peça incompatível ou mal instalada.",
      "gravidade": "Simples a médio"
    }
  ],
  "causas": [
    {
      "titulo": "Comprar peça errada",
      "desc": "RAM DDR4 para placa DDR3, SSD NVMe para slot SATA.",
      "tipo": "erro-humano"
    },
    {
      "titulo": "Não verificar compatibilidade",
      "desc": "Processador incompatível com placa-mãe, fonte insuficiente para GPU.",
      "tipo": "erro-humano"
    },
    {
      "titulo": "Instalação sem cuidado",
      "desc": "Forçar peças, não usar antiestática, conectar cabos errados.",
      "tipo": "erro-humano"
    }
  ],
  "cenarios": [
    {
      "nivel": "Simples",
      "desc": "Troca por peça compatível resolve.",
      "tempo": "1h",
      "custo": "R$ 99,99 + diferença de peça"
    },
    {
      "nivel": "Médio",
      "desc": "Peça incompatível causou dano leve.",
      "tempo": "1 a 2 dias",
      "custo": "R$ 150 a R$ 300"
    },
    {
      "nivel": "Complexo",
      "desc": "Dano a componentes durante instalação.",
      "tempo": "3 a 7 dias",
      "custo": "R$ 250 a R$ 600"
    }
  ],
  "riscos": [
    "Cada erro pode ser mais caro que contratar um técnico desde o início"
  ],
  "diagnostico": "Avaliação do upgrade realizado + correção. Custo: R$ 99,99.",
  "solucao": "Identificação do erro + correção + orientação.",
  "quandoCompensa": "Quase sempre — o erro geralmente é reversível.",
  "quandoNaoCompensa": "Quando causou dano físico irreversível.",
  "whatsappMessage": "Olá! Fiz um upgrade e deu problema. Podem me ajudar a corrigir?",
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
      "label": "Upgrade Deu Problema",
      "to": "/problemas/upgrade-deu-problema"
    },
    {
      "label": "Erro RAM",
      "to": "/problemas/erro-ao-instalar-memoria-ram"
    },
    {
      "label": "Upgrade SSD/Memória",
      "to": "/servicos/upgrade-ssd-memoria"
    },
    {
      "label": "Notebook Após Upgrade",
      "to": "/problemas/notebook-apos-upgrade-nao-liga-curitiba"
    },
    {
      "label": "Riscos de Consertar Sozinho",
      "to": "/problemas/riscos-de-tentar-consertar"
    }
  ],
  "conteudoExtra": "### Top 5 Erros de Upgrade\n\n1. **RAM errada** — DDR4 em placa DDR3 (não encaixa mas tentam forçar)\n2. **SSD errado** — NVMe em slot M.2 SATA (parece igual mas não é)\n3. **Fonte insuficiente** — GPU nova com fonte antiga que não aguenta\n4. **Sem antiestática** — Descarga queima chips invisíveis\n5. **Sem backup** — Trocar SSD sem migrar dados\n\n### Guia Completo de Compatibilidade por Componente\n\n**RAM — O Que Verificar**\n- Geração: DDR3, DDR4 ou DDR5 (placa-mãe suporta apenas uma)\n- Frequência: verificar frequência máxima suportada pela placa\n- Quantidade de slots e máximo por slot (ex: 2 slots, 16GB max cada)\n- Formato: DIMM (desktop) vs SO-DIMM (notebook) — fisicamente diferentes\n- Site útil: crucial.com/compatibility (insere modelo, mostra opções compatíveis)\n\n**SSD — O Que Verificar**\n- Interface: SATA (2.5\" ou M.2 SATA) vs NVMe (M.2 NVMe)\n- O slot M.2 pode ser SATA-only, NVMe-only ou ambos — verificar manual\n- Tamanho do M.2: 2230, 2242, 2260, 2280 — notebooks variam\n- Para desktop: SSD 2.5\" SATA funciona em qualquer PC com porta SATA\n\n**GPU — O Que Verificar**\n- Slot PCI-Express: versão e número de lanes (x16 para GPU)\n- Fonte de alimentação: wattagem total e conectores disponíveis (6pin, 8pin)\n- Tamanho físico: a GPU cabe no gabinete? (medir comprimento)\n- Alimentação: GPUs potentes precisam de 2x conectores de 8pin\n\n**Processador — O Que Verificar**\n- Socket: LGA 1700, AM5, etc. — incompatível = não encaixa\n- Chipset: nem todo chipset suporta todo processador do mesmo socket\n- Geração: processadores mais novos podem não ser suportados por placas mais antigas (mesmo socket)\n- TDP: a placa-mãe e o cooler precisam suportar o TDP do processador\n\n### Erro de Upgrade vs Custo de Contratar Técnico\n\n| Cenário | Fazer Sozinho (com erro) | Contratar Técnico |\n|---|---|---|\n| Consultoria pré-compra | R$ 0 | R$ 50-90 |\n| Comprar peça errada | R$ 200-400 perdidos | R$ 0 (orienta antes) |\n| Danificar slot/conector | R$ 200-500 reparo | R$ 0 (instala corretamente) |\n| Total médio em caso de erro | R$ 400-900 | R$ 140-280 (consulta + instalação) |\n\nA economia de fazer sozinho pode virar prejuízo. O investimento em consultoria técnica pré-upgrade é o melhor custo-benefício em upgrades.\n\n### Checklist Universal Pré-Upgrade\n\nAntes de comprar QUALQUER peça, verifique:\n1. ☐ Manual da placa-mãe/notebook (especificações suportadas)\n2. ☐ Compatibilidade no site do fabricante\n3. ☐ Wattagem da fonte (para GPU)\n4. ☐ Espaço físico (para GPU e coolers)\n5. ☐ Backup completo dos dados\n6. ☐ Ferramentas adequadas (chaves, pulseira antiestática)\n7. ☐ Vídeo/fotos do estado atual (para referência na remontagem)"
};
