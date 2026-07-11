import type { ProblemaPageData } from "./types";

export const problema: ProblemaPageData = {
  "slug": "microsoldagem-celular-curitiba",
  "title": "Microsoldagem de Celular em Curitiba — Procedimento, Equipamento e Custos",
  "metaDescription": "Microsoldagem profissional de celular em Curitiba. Reparo de componentes de 0.3mm sob microscópio. iPhone, Samsung, Motorola. Garantia de 90 dias.",
  "h1": "Microsoldagem de Celular — Precisão Cirúrgica em Curitiba",
  "categoria": "Procedimentos Técnicos",
  "intro": "Microsoldagem é o reparo de **componentes menores que um grão de areia** na placa-mãe do celular. É feito sob **microscópio com aumento de 20x-50x**, com ferro de solda de ponta de 0.1mm e estação de ar quente com controle digital.\n\n**Por que TEM garantia (90 dias):**\n- Componentes novos são soldados (não reutilizados)\n- O processo é controlado com precisão de temperatura (±5°C)\n- Teste funcional extenso após o reparo\n- Se o componente novo falhar, refazemos\n\n**Quando NÃO tem garantia:**\n- Placas com oxidação extensa por líquido — podemos reparar, mas a oxidação pode progredir em outras áreas\n- Placas com múltiplas trilhas rompidas — jumpers podem se soltar com o tempo\n- Quando informamos que é reparo paliativo (como reflow)\n\n**O investimento do técnico:**\n- Microscópio + câmera: R$ 3.000-7.000\n- Estação JBC + pontas: R$ 3.000-6.000\n- Ar quente profissional: R$ 800-2.000\n- Programadoras (NAND, NOR): R$ 1.500-3.000\n- Consumíveis mensais: R$ 300-500\n- Stencils (acervo): R$ 2.000-5.000",
  "sintomas": [
    {
      "titulo": "Celular não liga (totalmente morto)",
      "desc": "Diagnóstico com fonte regulável. Se consome 0mA = circuito aberto. Se consome demais = curto. Microsoldagem identifica e troca o componente.",
      "gravidade": "Complexo"
    },
    {
      "titulo": "Não carrega / carrega lento",
      "desc": "IC de carga (Tristar em iPhone 6/7, Hydra em iPhone 8+). Microsoldagem do IC com ar quente e stencil.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Sem serviço / sem sinal",
      "desc": "Chip de baseband ou componentes de RF. Microsoldagem BGA delicada na área de antena.",
      "gravidade": "Complexo"
    },
    {
      "titulo": "Touch fantasma / sem touch",
      "desc": "IC de touch desconectado ou defeituoso. Cumulus (iPhone 6), Meson (iPhone 8+). Microsoldagem com ar quente.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Sem áudio / microfone",
      "desc": "IC de áudio (338S00248 em iPhone 7 — famoso 'loop disease'). Microsoldagem + jumper em alguns casos.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Celular com líquido — resgate urgente",
      "desc": "Desmontagem, limpeza ultrassônica, microsoldagem de trilhas corroídas. Cada hora conta.",
      "gravidade": "Complexo"
    }
  ],
  "causas": [
    {
      "titulo": "Componente BGA com solda fria",
      "desc": "Mesma causa que em notebooks mas em escala menor. ICs de 3-5mm com pads de 0.15mm.",
      "tipo": "desgaste"
    },
    {
      "titulo": "Trilha rompida por impacto",
      "desc": "Placas multicamada (8-12 layers) podem ter trilhas internas rompidas por queda. Reparo com jumper de fio 0.02mm.",
      "tipo": "erro-humano"
    },
    {
      "titulo": "Componente passivo queimado",
      "desc": "Capacitores 0201 (0.6mm) e resistores podem entrar em curto. Identificação com câmera térmica + remoção com pinça.",
      "tipo": "hardware"
    },
    {
      "titulo": "Oxidação por líquido",
      "desc": "Corrosão verde/branca nos pads e trilhas. Limpeza com ultrassônica + reconstrução de conexões com microsoldagem.",
      "tipo": "erro-humano"
    },
    {
      "titulo": "IC NAND/NOR corrompido",
      "desc": "Memória flash com erro. Leitura com programadora, correção ou troca. Em iPhone requer pareamento.",
      "tipo": "hardware"
    }
  ],
  "cenarios": [
    {
      "nivel": "Simples",
      "desc": "Componente passivo (capacitor/resistor) ou IC de carga. Troca direta.",
      "tempo": "1 a 3 dias",
      "custo": "R$ 200 a R$ 400"
    },
    {
      "nivel": "Médio",
      "desc": "IC BGA (touch, Wi-Fi, áudio). Remoção + stencil + recolocação.",
      "tempo": "3 a 7 dias",
      "custo": "R$ 400 a R$ 700"
    },
    {
      "nivel": "Complexo",
      "desc": "PMIC, baseband, NAND + jumpers. Alto risco, componentes caros.",
      "tempo": "7 a 15 dias",
      "custo": "R$ 600 a R$ 1.200"
    }
  ],
  "riscos": [
    "Componentes adjacentes podem ser danificados pelo calor durante a microsoldagem",
    "Trilhas internas (camadas 3-8 da placa) não são acessíveis externamente",
    "Jumpers de fio 0.02mm são frágeis — podem se romper com impacto forte",
    "Placas com Face ID (iPhone) — danos no módulo podem desativar Face ID permanentemente",
    "Componentes falsificados são comuns — verificamos cada IC antes de instalar"
  ],
  "diagnostico": "**Diagnóstico de microsoldagem — etapas:**\n\n1. **Fonte regulável + amperímetro** — perfil de consumo durante boot\n2. **Câmera térmica** — componente em curto esquenta (identificação exata)\n3. **Microscópio** — inspeção visual de todos os ICs e passivos\n4. **Multímetro modo diodo** — verificar linhas de alimentação (VCC, PP_BATT, etc.)\n5. **Esquemático** — comparar valores medidos com referência\n6. **Laudo** — componente identificado, custo, probabilidade de sucesso\n\n**Custo: R$ 50-100, abatido do serviço.**",
  "solucao": "**Tipos de microsoldagem que realizamos:**\n\n### 1. Troca de componente passivo (capacitor/resistor)\n- Ferro de solda com ponta 0.1mm\n- Pinça antiestática\n- Componente novo (R$ 0,20-2,00)\n- Tempo: 5-15 minutos por componente\n- **Garantia: 90 dias**\n\n### 2. Troca de IC BGA\n- Ar quente a 360-380°C com bocal direcionado\n- Remoção do IC defeituoso\n- Limpeza de pads com malha e ferro\n- Reballing do IC novo com stencil\n- Recolocação com ar quente\n- Tempo: 30 min - 2 horas\n- **Garantia: 90 dias**\n\n### 3. Reparo de trilha (jumper)\n- Fio de cobre esmaltado 0.02-0.05mm\n- Soldado nos pads de origem e destino\n- Fixado com UV glue (cola UV)\n- Tempo: 15-60 minutos por trilha\n- **Garantia: 60 dias** (jumpers são mais frágeis)\n\n### 4. Resgate de placa com líquido\n- Desmontagem + limpeza ultrassônica (5-10 min em solução)\n- Inspeção com microscópio de CADA componente\n- Microsoldagem de trilhas/pads corroídos\n- Teste extenso\n- **Garantia: 30 dias** (oxidação pode progredir)",
  "quandoCompensa": "Celulares de até 2 anos com valor > R$ 2.000. iPhones (placa de reposição: R$ 2.000-4.000 — microsoldagem de R$ 300-700 é muito mais barato). Celulares com dados sem backup.",
  "quandoNaoCompensa": "Celulares com valor < R$ 800 novos. Oxidação extensa (>48h sem atendimento). Quando 3+ componentes principais falharam.",
  "whatsappMessage": "Olá! Meu celular precisa de microsoldagem. Podem diagnosticar?",
  "relatedPages": [
    {
      "label": "Reparo Placa Celular",
      "to": "/problemas/reparo-placa-mae-celular-curitiba"
    },
    {
      "label": "Reballing BGA",
      "to": "/procedimentos/reballing-bga-curitiba"
    },
    {
      "label": "Reflow BGA",
      "to": "/procedimentos/reflow-bga-curitiba"
    },
    {
      "label": "Troca de Chip",
      "to": "/procedimentos/troca-chip-bga-curitiba"
    },
    {
      "label": "Conserto de Celular",
      "to": "/servicos/conserto-celular"
    },
    {
      "label": "Por Que Custa Caro",
      "to": "/problemas/por-que-conserto-placa-mae-custa-caro-curitiba"
    }
  ],
  "conteudoExtra": "## Procedimentos Especiais\n\n### Jumper Wire (Reconstrução de Trilha)\nQuando uma trilha da placa está rompida (por impacto, oxidação ou reparo anterior), usamos **fio de cobre esmaltado de 0.02-0.05mm** para reconstruir a conexão.\n\n**O processo:**\n1. Identificar trilha rompida (multímetro + esquemático)\n2. Raspar isolamento dos pads de origem e destino\n3. Estanhar os pads\n4. Cortar fio no comprimento exato\n5. Soldar com ferro de ponta fina sob microscópio\n6. Fixar com cola UV para proteção mecânica\n\n**É um dos procedimentos mais delicados** — o fio tem espessura de um fio de cabelo.\n\n### Underfill — O Desafio Extra\nAlguns chips BGA vêm com **underfill** — uma resina epóxi aplicada entre o chip e a placa para reforçar a soldagem. O underfill:\n- Dificulta a remoção do chip (precisa de mais calor + tempo)\n- Pode danificar pads ao ser removido\n- Exige solvente específico + paciência\n- Aumenta o tempo e custo do serviço\n\nChips da Apple (A-series, M-series) e alguns Qualcomm têm underfill pesado.\n\n### Programação de NAND/NOR\nEm iPhones, a memória NAND é **pareada com o processador** (vínculo criptográfico). Trocar a NAND exige:\n1. Ler a NAND original (se possível)\n2. Programar a NAND nova com dados do processador\n3. Soldar e testar\n\nEquipamento: JC P7, iRepair P10, JCID — R$ 1.500-3.000\n\n## Tabela de Garantias por Procedimento\n\n| Procedimento | Garantia | Por quê? |\n|-------------|---------|----------|\n| Troca de IC (componente novo) | 90 dias | Componente novo + soldagem controlada |\n| Troca de capacitor/resistor | 90 dias | Componente novo, processo simples |\n| Reballing de IC | 90 dias | Esferas novas, processo controlado |\n| Jumper wire | 60 dias | Fio frágil, pode romper com impacto |\n| Resgate de líquido | 30 dias | Oxidação pode progredir internamente |\n| Reflow | ❌ Sem garantia | Temporário por natureza |\n| Reparo paliativo informado | ❌ Sem garantia | Cliente ciente do risco |\n\n**A garantia é proporcional à confiabilidade do procedimento.** Somos transparentes."
};
