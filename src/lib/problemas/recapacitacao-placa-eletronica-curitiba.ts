import type { ProblemaPageData } from "./types";

export const problema: ProblemaPageData = {
  "slug": "recapacitacao-placa-eletronica-curitiba",
  "title": "Recapacitação de Placa Eletrônica em Curitiba — Capacitores Novos",
  "metaDescription": "Recapacitação: troca de todos os capacitores eletrolíticos de uma placa. Restauração de TVs, amplificadores, fontes. Garantia de 90 dias.",
  "h1": "Recapacitação — Troca Completa de Capacitores em Curitiba",
  "categoria": "Procedimentos Técnicos",
  "intro": "A recapacitação é a **troca de todos os capacitores eletrolíticos** de uma placa. É o procedimento mais comum em restauração de equipamentos com 5-20+ anos.\n\n**Por que TEM garantia (90 dias):**\n- Todos os capacitores são novos (marcas confiáveis: Nichicon, Rubycon, Panasonic)\n- O procedimento é simples e controlado\n- Taxa de sucesso: 90-95% quando o diagnóstico aponta capacitores\n\n**Por que é necessário:**\nCapacitores eletrolíticos contêm um **eletrólito líquido** que evapora lentamente ao longo dos anos. Após 5-15 anos, perdem capacitância, aumentam a resistência série (ESR) e podem:\n- Inchar (topo abaulado — sinal visual claro)\n- Vazar eletrólito (marca marrom na placa)\n- Explodir (raro, mas acontece com sobretensão)\n\n**É o reparo com melhor custo-benefício em eletrônica:**\n- Custo dos capacitores: R$ 20 a R$ 100 (kit completo para uma placa)\n- Mão de obra: R$ 100 a R$ 300\n- Resultado: equipamento volta a funcionar como novo",
  "sintomas": [
    {
      "titulo": "TV/amplificador não liga ou demora",
      "desc": "Capacitores de filtro secos na fonte. Não sustentam a tensão necessária para o arranque.",
      "gravidade": "Simples"
    },
    {
      "titulo": "Ronco / hum audível",
      "desc": "Em amplificadores: capacitores de filtro não filtram mais o ripple de 60Hz da rede. Som de 'ronco' constante.",
      "gravidade": "Simples"
    },
    {
      "titulo": "Equipamento esquenta mais que o normal",
      "desc": "Capacitores com ESR alta dissipam energia como calor em vez de armazená-la.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Instabilidade / comportamento errático",
      "desc": "Tensões instáveis por capacitores degradados causam comportamento imprevisível.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Capacitores visivelmente inchados",
      "desc": "Topo abaulado ou vazamento visível. O sinal mais óbvio — se você abrir o equipamento e ver, é hora de recapacitar.",
      "gravidade": "Simples"
    }
  ],
  "causas": [
    {
      "titulo": "Evaporação natural do eletrólito",
      "desc": "Processo inevitável ao longo de 5-20 anos. Acelerado por calor (TVs em nichos, amplificadores potentes).",
      "tipo": "desgaste"
    },
    {
      "titulo": "Capacitores de baixa qualidade",
      "desc": "Muitos eletrônicos usam capacitores baratos (CapXon, Teapo de baixa série). Falham em 3-5 anos vs 10-15 de marcas premium (Nichicon, Rubycon).",
      "tipo": "hardware"
    },
    {
      "titulo": "Sobretensão na rede elétrica",
      "desc": "Picos acima da tensão nominal do capacitor aceleram a degradação drasticamente.",
      "tipo": "erro-humano"
    },
    {
      "titulo": "Ventilação inadequada",
      "desc": "Calor é o inimigo #1 dos capacitores. Cada 10°C acima de 85°C reduz a vida útil pela metade.",
      "tipo": "erro-humano"
    }
  ],
  "cenarios": [
    {
      "nivel": "Simples",
      "desc": "Placa fonte de TV (5-10 capacitores). Componentes THT de fácil acesso.",
      "tempo": "2 a 5 dias",
      "custo": "R$ 150 a R$ 300"
    },
    {
      "nivel": "Médio",
      "desc": "Amplificador / receiver (20-40 capacitores). Inclui capacitores de filtro grandes.",
      "tempo": "5 a 10 dias",
      "custo": "R$ 250 a R$ 500"
    },
    {
      "nivel": "Complexo",
      "desc": "Recapacitação completa de equipamento vintage (50-100+ capacitores). Restauração.",
      "tempo": "10 a 20 dias",
      "custo": "R$ 400 a R$ 800"
    }
  ],
  "riscos": [
    "Capacitores podem estar soldados em locais de difícil acesso (SMD em placas dupla face)",
    "Trocar capacitor com polaridade invertida = explosão imediata",
    "Em equipamentos muito antigos, outros componentes também podem estar degradados",
    "Capacitores genéricos sem marca podem falhar em poucos anos — usamos apenas marcas confiáveis"
  ],
  "diagnostico": "**Diagnóstico de capacitores:**\n\n1. **Inspeção visual** — capacitores inchados ou com vazamento são óbvios\n2. **Medidor de ESR** — mede a resistência série equivalente sem dessoldar\n3. **Capacímetro** — mede a capacitância real vs nominal\n4. **Osciloscópio** — verifica ripple nas saídas da fonte (alto ripple = filtro ruim)\n\n**Custo: R$ 60-100, abatido do serviço.**",
  "solucao": "**Processo de recapacitação:**\n\n1. **Mapear todos os capacitores** — anotar valores (µF, tensão, temperatura)\n2. **Encomendar kit de capacitores** — marcas premium (Nichicon, Rubycon, Panasonic)\n3. **Dessoldar capacitores antigos** — um por um, anotando polaridade\n4. **Limpar pads** — remover resíduos de solda antiga\n5. **Soldar capacitores novos** — verificar polaridade (banda = negativo)\n6. **Teste de tensões** — verificar se todas as saídas estão corretas\n7. **Teste funcional** — ligar equipamento e testar 2-4 horas\n\n**GARANTIA DE 90 DIAS** — Capacitores novos de marca têm vida útil de 5.000-10.000 horas (5-10+ anos).",
  "quandoCompensa": "Sempre quando o diagnóstico aponta capacitores. É o reparo mais barato em eletrônica. TVs de R$ 1.000+, amplificadores de R$ 500+, fontes de computador.",
  "quandoNaoCompensa": "Quando há outros problemas além dos capacitores (queima extensa por surto). Equipamentos extremamente baratos (caixa bluetooth de R$ 50).",
  "whatsappMessage": "Olá! Meu equipamento precisa de troca de capacitores. Podem diagnosticar?",
  "relatedPages": [
    {
      "label": "Reparo Placa TV",
      "to": "/problemas/reparo-placa-principal-tv-curitiba"
    },
    {
      "label": "Reparo Placa Som",
      "to": "/problemas/reparo-placa-som-amplificador-curitiba"
    },
    {
      "label": "TV Não Liga",
      "to": "/problemas/tv-nao-liga-curitiba"
    },
    {
      "label": "Conserto de Placa",
      "to": "/servicos/conserto-placa"
    },
    {
      "label": "TV Demora Ligar",
      "to": "/tv-demora-ligar-curitiba"
    },
    {
      "label": "Por Que Custa Caro",
      "to": "/problemas/por-que-conserto-placa-mae-custa-caro-curitiba"
    }
  ],
  "conteudoExtra": "## Capacitores: O Componente Mais Importante (e Mais Frágil)\n\n### Marcas Confiáveis vs Genéricas\n\n| Marca | Qualidade | Vida útil | Preço |\n|-------|----------|----------|-------|\n| Nichicon | Premium | 10.000+ horas | R$ 2-8/cada |\n| Rubycon | Premium | 10.000+ horas | R$ 2-8/cada |\n| Panasonic | Premium | 8.000+ horas | R$ 2-6/cada |\n| United Chemi-Con | Muito boa | 8.000+ horas | R$ 2-5/cada |\n| Vishay | Muito boa | 8.000+ horas | R$ 2-6/cada |\n| CapXon | Regular | 3.000-5.000 horas | R$ 1-3/cada |\n| Teapo | Regular | 3.000-5.000 horas | R$ 1-3/cada |\n| Sem marca / genérico | Ruim | 1.000-3.000 horas | R$ 0,50-1/cada |\n\n### Como Identificar Capacitor Ruim (Visual)\n\n**Sinais visuais:**\n- **Topo abaulado** — o mais comum. O topo deve ser plano com linhas em X ou K\n- **Vazamento marrom** — eletrólito escapando pela base ou topo\n- **Mancha na placa** — resíduo de vazamento ao redor do capacitor\n- **Inchaço lateral** — capa de plástico estufada\n\n### A Regra dos 10°C\n\nPara cada 10°C acima da temperatura nominal:\n- Capacitor de 85°C em ambiente de 95°C = **metade** da vida útil\n- Capacitor de 85°C em ambiente de 105°C = **1/4** da vida útil\n\nPor isso TVs em nichos sem ventilação e amplificadores em racks fechados falham muito mais rápido.\n\n### Equipamentos Que Mais Precisam de Recapacitação\n\n1. **TVs LCD/LED** (fonte) — 4-8 anos\n2. **Amplificadores de áudio** — 8-15 anos\n3. **Receivers home theater** — 6-12 anos\n4. **Fontes de computador** — 5-10 anos\n5. **Monitores** — 5-10 anos\n6. **Consoles (PS3/Xbox 360)** — 8-15 anos\n7. **Equipamentos vintage** — 20-40+ anos"
};
