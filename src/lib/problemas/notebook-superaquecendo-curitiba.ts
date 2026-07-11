import type { ProblemaPageData } from "./types";

export const problema: ProblemaPageData = {
  "slug": "notebook-superaquecendo-curitiba",
  "title": "Notebook Superaquecendo em Curitiba | Diagnóstico e Reparo",
  "metaDescription": "Notebook esquentando demais e desligando sozinho? Técnico em Curitiba resolve superaquecimento com limpeza térmica, troca de pasta e reparo de cooler. Atendimento rápido.",
  "h1": "Notebook Superaquecendo — Diagnóstico e Solução em Curitiba",
  "categoria": "Hardware",
  "intro": "O superaquecimento é uma das falhas mais perigosas para notebooks. Quando a temperatura interna ultrapassa os limites seguros, o processador reduz a velocidade (thermal throttling) ou o notebook desliga abruptamente para se proteger. Ignorar esse problema pode causar danos irreversíveis na placa-mãe e no processador.\n\nEm Curitiba, especialmente em dias quentes ou em ambientes com pouca ventilação, notebooks podem atingir temperaturas críticas rapidamente. Usar o notebook na cama, sofá ou sobre superfícies que bloqueiam a ventilação agrava ainda mais o problema.\n\nNosso serviço inclui diagnóstico térmico completo com software profissional, limpeza interna, troca de pasta térmica e, quando necessário, reparo ou substituição do cooler. Tudo com garantia e atendimento em domicílio na região metropolitana de Curitiba.",
  "sintomas": [
    {
      "titulo": "Notebook desliga sozinho durante uso",
      "desc": "Desligamento abrupto sem aviso, geralmente durante tarefas pesadas como jogos ou edição de vídeo. É o mecanismo de proteção térmica do processador.",
      "gravidade": "Alta"
    },
    {
      "titulo": "Base do notebook muito quente ao toque",
      "desc": "Calor excessivo na parte inferior indica que o sistema de refrigeração não está dissipando o calor adequadamente.",
      "gravidade": "Média"
    },
    {
      "titulo": "Ventilador faz barulho alto constantemente",
      "desc": "O cooler gira em velocidade máxima tentando compensar a temperatura elevada. Pode indicar pasta térmica ressecada ou duto entupido.",
      "gravidade": "Média"
    },
    {
      "titulo": "Lentidão progressiva durante o uso",
      "desc": "O processador reduz a frequência (throttling) para diminuir a temperatura, causando travamentos e lentidão.",
      "gravidade": "Média"
    },
    {
      "titulo": "Tela congela e só volta após esfriar",
      "desc": "Congelamento causado por proteção térmica. Após esfriar, o notebook volta a funcionar temporariamente.",
      "gravidade": "Alta"
    },
    {
      "titulo": "Cheiro de queimado vindo do notebook",
      "desc": "Sinal grave de que componentes podem estar sendo danificados pelo calor excessivo. Pare de usar imediatamente.",
      "gravidade": "Crítica"
    }
  ],
  "causas": [
    {
      "titulo": "Pasta térmica ressecada",
      "desc": "A pasta térmica perde eficiência após 2-3 anos, reduzindo drasticamente a transferência de calor entre o processador e o dissipador.",
      "tipo": "desgaste"
    },
    {
      "titulo": "Ventilador obstruído por poeira",
      "desc": "Acúmulo de poeira e pelos bloqueia as saídas de ar e as aletas do dissipador, impedindo a circulação de ar.",
      "tipo": "desgaste"
    },
    {
      "titulo": "Cooler com defeito ou travado",
      "desc": "O motor do ventilador pode falhar por desgaste, fazendo-o girar devagar ou parar completamente.",
      "tipo": "hardware"
    },
    {
      "titulo": "Uso em superfície inadequada",
      "desc": "Cama, travesseiro e sofá bloqueiam as entradas de ar na parte inferior do notebook, causando superaquecimento.",
      "tipo": "erro-humano"
    },
    {
      "titulo": "Heatpipe danificado ou descolado",
      "desc": "O tubo de calor (heatpipe) pode perder o contato com o processador ou desenvolver vazamento interno.",
      "tipo": "hardware"
    }
  ],
  "cenarios": [
    {
      "nivel": "Simples",
      "desc": "Limpeza interna + troca de pasta térmica. Resolve 70% dos casos de superaquecimento.",
      "tempo": "1-2 horas",
      "custo": "R$100–R$180"
    },
    {
      "nivel": "Médio",
      "desc": "Substituição de cooler/ventilador + limpeza completa + pasta térmica premium.",
      "tempo": "2-4 horas",
      "custo": "R$180–R$350"
    },
    {
      "nivel": "Complexo",
      "desc": "Reparo de heatpipe, substituição de dissipador completo ou dano na placa por superaquecimento prolongado.",
      "tempo": "3-7 dias",
      "custo": "R$350–R$800"
    }
  ],
  "riscos": [
    "Dano permanente no processador por exposição prolongada a altas temperaturas",
    "Queima de componentes da placa-mãe (VRM, chipset)",
    "Descolamento de solda BGA do processador ou GPU",
    "Perda de dados por desligamento abrupto durante gravação",
    "Redução da vida útil da bateria por calor excessivo"
  ],
  "diagnostico": "O diagnóstico térmico profissional utiliza software especializado (HWMonitor, AIDA64) para medir as temperaturas em tempo real de CPU, GPU e disco durante testes de estresse.\n\nVerificamos a rotação do cooler com tacômetro, inspecionamos a condição da pasta térmica, avaliamos o estado das aletas do dissipador e testamos o fluxo de ar. O resultado é um laudo completo com as causas identificadas e as soluções recomendadas.",
  "solucao": "A solução profissional para superaquecimento inclui:\n\n1. Desmontagem cuidadosa do notebook\n2. Limpeza completa do sistema de refrigeração (cooler, dutos e aletas)\n3. Remoção da pasta térmica antiga com solvente isopropílico\n4. Aplicação de pasta térmica de alta performance (Arctic MX-4 ou similar)\n5. Teste de estresse pós-reparo para validar temperaturas\n6. Orientações sobre uso correto e prevenção\n\nUsamos pasta térmica premium que mantém a eficiência por até 8 anos, muito superior às pastas genéricas.",
  "quandoCompensa": "Na maioria dos casos, o superaquecimento é resolvido com limpeza e troca de pasta térmica — um investimento baixo que prolonga a vida útil do notebook em vários anos.",
  "quandoNaoCompensa": "Quando há dano severo na placa-mãe por superaquecimento prolongado, com componentes queimados ou solda BGA comprometida, pode ser mais viável investir em um notebook novo.",
  "whatsappMessage": "Olá! Meu notebook está superaquecendo e preciso de diagnóstico. Podem me ajudar?",
  "relatedPages": [
    {
      "to": "/problemas/computador-lento-curitiba",
      "label": "Computador Lento"
    },
    {
      "to": "/problemas/pc-trava-ao-jogar-curitiba",
      "label": "PC Trava ao Jogar"
    },
    {
      "to": "/problemas/computador-com-som-estranho-curitiba",
      "label": "Som Estranho no PC"
    },
    {
      "to": "/servicos/conserto-pc-notebook",
      "label": "Conserto de Notebook"
    },
    {
      "to": "/servicos/upgrade-ssd-memoria",
      "label": "Upgrade SSD"
    },
    {
      "to": "/como-funciona",
      "label": "Como Funciona"
    }
  ],
  "conteudoExtra": "## Por Que o Superaquecimento é Tão Perigoso?\n\nO superaquecimento não é apenas um inconveniente — é uma ameaça real à integridade do seu notebook. Processadores modernos operam em temperaturas de 60-80°C sob carga, mas quando ultrapassam 90-100°C, entram em modo de proteção.\n\n### Thermal Throttling: O Que é e Como Afeta Seu Notebook\n\nQuando a temperatura sobe demais, o processador reduz automaticamente sua velocidade para gerar menos calor. Isso significa que seu notebook com processador i7 pode estar operando como um i3 — você pagou por desempenho que não está usando.\n\n### A Importância da Pasta Térmica\n\nA pasta térmica é o material que preenche as micro-imperfeições entre o processador e o dissipador de calor. Sem ela, o contato térmico é ineficiente e as temperaturas sobem drasticamente.\n\nPastas térmicas de qualidade inferior ressecam em 1-2 anos. Utilizamos pasta térmica profissional (Arctic MX-4, Thermal Grizzly Kryonaut) que mantém suas propriedades por até 8 anos.\n\n### Prevenção: Como Evitar o Superaquecimento\n\n1. **Use sempre em superfície rígida e plana** — mesa, escrivaninha ou suporte para notebook\n2. **Evite bloquear as saídas de ar** — nunca use na cama ou sobre almofadas\n3. **Faça limpeza preventiva a cada 12-18 meses** — especialmente se tiver pets\n4. **Considere um cooler externo** — base refrigerada ajuda em ambientes quentes\n5. **Monitore temperaturas** — apps como HWMonitor alertam sobre temperaturas anormais\n\n### Marcas Que Mais Sofrem Com Superaquecimento\n\nAlguns modelos são mais propensos ao problema:\n- **Dell Inspiron e Vostro** — sistema de refrigeração compacto\n- **Lenovo Ideapad** — pasta térmica de fábrica de baixa qualidade\n- **Acer Nitro** — notebooks gamer com dissipação subdimensionada\n- **HP Pavilion** — dutos de ar estreitos que entopem facilmente\n\nTemos experiência com todas as marcas e modelos, com peças de reposição em estoque para agilizar o reparo."
};
