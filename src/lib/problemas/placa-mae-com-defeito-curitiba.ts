import type { ProblemaPageData } from "./types";

export const problema: ProblemaPageData = {
  "slug": "placa-mae-com-defeito-curitiba",
  "title": "Placa-Mãe com Defeito em Curitiba | Diagnóstico e Reparo",
  "metaDescription": "Placa-mãe com defeito? Técnico em Curitiba faz diagnóstico profissional, reparo de componentes e substituição. Atendimento para desktop e notebook.",
  "h1": "Placa-Mãe com Defeito — Diagnóstico e Reparo em Curitiba",
  "categoria": "Hardware",
  "intro": "A placa-mãe é o componente central do computador — ela conecta e gerencia a comunicação entre processador, memória, disco, placa de vídeo e todos os periféricos. Um defeito na placa-mãe pode causar desde instabilidade e travamentos até a impossibilidade total de ligar o equipamento.\n\nO diagnóstico de placa-mãe exige conhecimento técnico avançado e ferramentas específicas, pois os sintomas podem ser confundidos com problemas em outros componentes. Em Curitiba, oferecemos diagnóstico profissional com multímetro, osciloscópio e testes de bancada para identificar com precisão o componente defeituoso.\n\nTrabalhamos com reparo de placa-mãe (quando viável) e substituição, tanto para desktops quanto para notebooks de todas as marcas.",
  "sintomas": [
    {
      "titulo": "Computador não liga (sem nenhuma reação)",
      "desc": "Ao pressionar o botão power, não há luzes, ventiladores ou bipes. Pode ser placa-mãe, fonte ou botão power.",
      "gravidade": "Alta"
    },
    {
      "titulo": "Bipes ao ligar (código de erro)",
      "desc": "Sequência de bipes indica erro específico: memória, vídeo, processador ou placa-mãe. Cada fabricante tem códigos diferentes.",
      "gravidade": "Alta"
    },
    {
      "titulo": "Portas USB, áudio ou rede não funcionam",
      "desc": "Controladores integrados à placa-mãe podem falhar individualmente, desativando portas e funções específicas.",
      "gravidade": "Média"
    },
    {
      "titulo": "Computador liga mas não exibe imagem",
      "desc": "POST falha — o computador liga os ventiladores mas não inicializa. Pode ser VRM, BIOS corrompida ou slot de memória.",
      "gravidade": "Alta"
    },
    {
      "titulo": "Reinicializações e travamentos frequentes",
      "desc": "Capacitores estufados, trilhas oxidadas ou VRM com defeito causam instabilidade generalizada.",
      "gravidade": "Alta"
    },
    {
      "titulo": "Capacitores visivelmente estufados ou vazando",
      "desc": "Capacitores com topo abaulado ou com resíduo marrom são sinal claro de defeito e devem ser substituídos.",
      "gravidade": "Crítica"
    }
  ],
  "causas": [
    {
      "titulo": "Surto elétrico / raio",
      "desc": "Picos de tensão na rede elétrica podem queimar trilhas e componentes da placa-mãe instantaneamente.",
      "tipo": "hardware"
    },
    {
      "titulo": "Capacitores estufados por desgaste",
      "desc": "Capacitores eletrolíticos perdem eficiência com o tempo e temperatura, causando instabilidade progressiva.",
      "tipo": "desgaste"
    },
    {
      "titulo": "Curto-circuito por líquido ou poeira condutiva",
      "desc": "Líquido derramado ou acúmulo de poeira metálica pode causar curto entre trilhas da placa.",
      "tipo": "erro-humano"
    },
    {
      "titulo": "BIOS corrompida",
      "desc": "Atualização de BIOS interrompida ou falha de firmware pode tornar a placa inoperante.",
      "tipo": "software"
    },
    {
      "titulo": "VRM (regulador de tensão) com defeito",
      "desc": "O circuito que regula a tensão para o processador pode falhar, impedindo a inicialização ou causando instabilidade.",
      "tipo": "hardware"
    }
  ],
  "cenarios": [
    {
      "nivel": "Simples",
      "desc": "Reset de BIOS, troca de bateria CMOS, limpeza de contatos oxidados. Sem substituição de componentes.",
      "tempo": "1-2 horas",
      "custo": "R$80–R$150"
    },
    {
      "nivel": "Médio",
      "desc": "Troca de capacitores, reparo de conector, atualização/recuperação de BIOS com gravador.",
      "tempo": "2-5 horas",
      "custo": "R$150–R$400"
    },
    {
      "nivel": "Complexo",
      "desc": "Substituição completa da placa-mãe. Requer compatibilidade com processador e memórias existentes.",
      "tempo": "3-7 dias",
      "custo": "R$400–R$1.500"
    }
  ],
  "riscos": [
    "Placa-mãe com defeito parcial pode danificar processador ou memórias",
    "Curto-circuito em andamento pode queimar componentes ainda funcionando",
    "VRM com defeito pode fornecer tensão excessiva ao processador, queimando-o",
    "Tentativa amadora de reparo pode agravar o dano e inutilizar a placa",
    "Perda total de dados se o defeito causar dano ao controlador de disco"
  ],
  "diagnostico": "O diagnóstico profissional de placa-mãe utiliza múltiplas ferramentas:\n\n1. Inspeção visual com lupa — capacitores estufados, trilhas queimadas, componentes carbonizados\n2. Multímetro — verificação de tensões, continuidade e curto-circuito\n3. Teste com fonte de bancada — alimentação controlada para identificar consumo anormal\n4. Teste de POST — cartão de diagnóstico PCI/PCIe que exibe códigos de erro\n5. Teste de componentes isolados — memória, processador e vídeo testados separadamente\n\nO resultado é um laudo preciso indicando se o reparo é viável ou se a substituição é mais indicada.",
  "solucao": "A solução profissional para placa-mãe com defeito inclui:\n\n1. Diagnóstico completo com ferramentas de bancada\n2. Reparo quando viável (troca de capacitores, resolda de componentes, recuperação de BIOS)\n3. Substituição quando o reparo não é viável — com compatibilidade garantida para seu processador e memórias\n4. Teste de estabilidade completo (Prime95, MemTest86)\n5. Reinstalação de drivers se necessário\n6. Garantia de 90 dias no serviço\n\nPara notebooks, trabalhamos com reballing BGA e micro-soldagem quando aplicável.",
  "quandoCompensa": "Reparos simples (capacitores, BIOS) compensam em qualquer situação. Substituição de placa compensa quando processador e memórias são recentes e compatíveis com placas disponíveis no mercado.",
  "quandoNaoCompensa": "Quando a placa é de geração antiga (mais de 6 anos) e não há substituta compatível no mercado, ou quando o custo de placa + mão de obra ultrapassa 60% do valor de um PC novo equivalente.",
  "whatsappMessage": "Olá! Suspeito que a placa-mãe do meu computador está com defeito. Podem fazer um diagnóstico?",
  "relatedPages": [
    {
      "to": "/problemas/fonte-queimada-curitiba",
      "label": "Fonte Queimada"
    },
    {
      "to": "/problemas/computador-nao-liga-curitiba",
      "label": "Computador Não Liga"
    },
    {
      "to": "/servicos/conserto-placa",
      "label": "Conserto de Placa"
    },
    {
      "to": "/servicos/conserto-pc-notebook",
      "label": "Conserto PC/Notebook"
    },
    {
      "to": "/servicos/montagem-pc",
      "label": "Montagem de PC"
    },
    {
      "to": "/como-funciona",
      "label": "Como Funciona"
    }
  ],
  "conteudoExtra": "## Entendendo os Defeitos de Placa-Mãe\n\nA placa-mãe é um componente complexo com centenas de circuitos integrados, capacitores, resistores e trilhas. Entender como ela funciona ajuda a prevenir problemas.\n\n### Componentes Críticos da Placa-Mãe\n\n1. **VRM (Voltage Regulator Module)** — Regula a tensão para o processador. Falha = PC não liga ou instável\n2. **Chipset** — Gerencia a comunicação entre CPU, memória e periféricos\n3. **BIOS/UEFI** — Firmware que inicializa o hardware antes do sistema operacional\n4. **Capacitores** — Filtram e estabilizam a energia. São os componentes que mais falham\n5. **Slots e conectores** — PCIe, RAM, SATA, USB, áudio\n\n### Sinais de Alerta Que Você Não Deve Ignorar\n\n- **Bipes ao ligar** — Cada sequência tem um significado (consulte o manual da placa)\n- **LEDs de diagnóstico** — Placas modernas têm LEDs que indicam qual etapa do POST falhou\n- **Cheiro de queimado** — Desligue imediatamente. Componente pode estar em curto\n- **Instabilidade progressiva** — Travamentos cada vez mais frequentes indicam degeneração\n\n### Desktop vs. Notebook: Diferenças no Reparo\n\n**Desktop:**\n- Placa-mãe facilmente substituível\n- Padrão ATX/mATX = muitas opções de substituição\n- Reparo de capacitores é relativamente simples\n\n**Notebook:**\n- Placa-mãe é específica para cada modelo\n- Substituição cara e com pouca disponibilidade\n- Reparo com micro-soldagem e reballing é mais viável\n- Maior probabilidade de dano por líquido ou superaquecimento\n\n### Prevenção: Como Proteger Sua Placa-Mãe\n\n1. **Use nobreak** — Protege contra surtos e quedas de energia\n2. **Mantenha aterramento** — Instalação elétrica com fio terra é essencial\n3. **Evite poeira** — Limpeza interna a cada 6-12 meses\n4. **Não force componentes** — Instalação incorreta de RAM ou placa de vídeo pode danificar slots\n5. **Atualize BIOS com cuidado** — Nunca desligue o PC durante atualização de BIOS"
};
