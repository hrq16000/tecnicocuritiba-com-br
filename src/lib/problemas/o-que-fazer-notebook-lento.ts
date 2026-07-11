import type { ProblemaPageData } from "./types";

export const problema: ProblemaPageData = {
  "slug": "o-que-fazer-notebook-lento",
  "title": "O Que Fazer Com Notebook Lento? | Guia Prático",
  "metaDescription": "Notebook lento? Guia prático com verificações e soluções. Quando otimizar, quando fazer upgrade, quando trocar.",
  "h1": "O Que Fazer Com Notebook Lento? — Guia Prático",
  "categoria": "Buscas Educativas",
  "intro": "Notebook lento atrapalha trabalho, estudo e lazer. Mas antes de sair comprando um novo, existem coisas que você pode verificar e ações simples que podem melhorar a performance. Este guia explica o que fazer, desde verificações básicas até quando é hora de buscar upgrade profissional.",
  "sintomas": [
    {
      "titulo": "Coisas que você pode fazer",
      "desc": "Fechar programas, limpar inicialização, verificar disco.",
      "gravidade": "Simples"
    }
  ],
  "causas": [
    {
      "titulo": "Software (você pode resolver)",
      "desc": "Programas desnecessários, navegador pesado, cache cheio.",
      "tipo": "software"
    },
    {
      "titulo": "Hardware (precisa de técnico)",
      "desc": "HD antigo, pouca RAM, superaquecimento.",
      "tipo": "hardware"
    }
  ],
  "cenarios": [
    {
      "nivel": "Simples",
      "desc": "Otimização de software pelo próprio usuário.",
      "tempo": "30 min",
      "custo": "R$ 0"
    },
    {
      "nivel": "Médio",
      "desc": "Upgrade profissional (SSD + RAM).",
      "tempo": "2h a 4h",
      "custo": "R$ 300 a R$ 600"
    },
    {
      "nivel": "Complexo",
      "desc": "Diagnóstico + upgrade + limpeza interna.",
      "tempo": "1 dia",
      "custo": "R$ 400 a R$ 800"
    }
  ],
  "riscos": [
    "Programas de 'otimização' podem piorar",
    "Upgrade errado desperdiça dinheiro"
  ],
  "diagnostico": "Se as dicas básicas não resolveram, diagnóstico identifica o gargalo. Custo: R$ 99,99.",
  "solucao": "Guia de autoajuda + opções de upgrade profissional.",
  "quandoCompensa": "Upgrade compensa na maioria dos notebooks com menos de 6 anos.",
  "quandoNaoCompensa": "Notebooks muito antigos onde o gargalo é o processador.",
  "whatsappMessage": "Olá! Meu notebook está lento e já tentei otimizar. Podem me ajudar?",
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
      "label": "Notebook Lento",
      "to": "/problemas/notebook-lento-curitiba"
    },
    {
      "label": "Upgrade SSD",
      "to": "/servicos/upgrade-ssd-memoria"
    },
    {
      "label": "Windows Lento",
      "to": "/problemas/windows-lento-curitiba"
    },
    {
      "label": "Formatação Resolve?",
      "to": "/problemas/formatacao-resolve-curitiba"
    },
    {
      "label": "Computador Lento",
      "to": "/problemas/computador-lento-curitiba"
    }
  ],
  "conteudoExtra": "### Dicas Rápidas (Faça Você Mesmo)\n\n1. Ctrl+Shift+Esc → Inicializar → Desative programas desnecessários\n2. Desinstale programas que não usa\n3. Limite as abas do Chrome (cada aba = memória)\n4. Verifique espaço no disco (mínimo 20% livre)\n5. Reinicie o notebook (sério, muita gente só fecha a tampa)\n\n### O Teste dos 3 Minutos: Identifique Seu Gargalo\n\nAbra o Gerenciador de Tarefas (Ctrl+Shift+Esc) e observe por 3 minutos enquanto usa o notebook normalmente:\n\n**Se o Disco fica em 100%** → Seu gargalo é o disco. Se é HD mecânico, trocar por SSD é a solução mais impactante. Custo: R$ 250-400.\n\n**Se a Memória fica acima de 85%** → Seu gargalo é RAM. Muitos notebooks permitem adicionar mais RAM. Custo: R$ 150-350.\n\n**Se a CPU fica acima de 90%** → Pode ser malware (minerador) ou processador insuficiente. Scan de vírus primeiro; se o problema é o processador, upgrade não é possível em notebooks.\n\n**Se tudo fica normal** → O problema pode ser software (muitos programas na inicialização, Windows corrompido).\n\n### O Impacto Real de Cada Upgrade\n\n| Upgrade | Melhoria Percebida | Custo em Curitiba |\n|---|---|---|\n| HD → SSD SATA | ⭐⭐⭐⭐⭐ Transformador | R$ 250-400 |\n| SSD SATA → NVMe | ⭐⭐ Leve melhoria | R$ 300-500 |\n| 4GB → 8GB RAM | ⭐⭐⭐⭐ Muito significativo | R$ 150-250 |\n| 8GB → 16GB RAM | ⭐⭐⭐ Significativo | R$ 200-350 |\n| Limpeza + pasta térmica | ⭐⭐⭐ Reduz throttling | R$ 120-200 |\n\n### Programas que Mais Consomem Recursos\n\nEm ordem de impacto na performance do notebook:\n\n1. **Google Chrome** — Cada aba consome 50-300MB de RAM. 10 abas = até 3GB\n2. **Antivírus pesados** — Norton, McAfee e Kaspersky versões completas são notoriamente pesados. Windows Defender é suficiente para a maioria.\n3. **OneDrive/Google Drive sincronizando** — Sincronização contínua em segundo plano\n4. **Adobe Creative Cloud** — Mantém vários serviços em background mesmo sem usar\n5. **Discord/Spotify/Steam** — Abrem com o Windows e ficam consumindo\n\n### Quando o Notebook Lento é Sinal de Problema Maior\n\nÀs vezes a lentidão é sintoma de algo mais sério:\n- **Superaquecimento** → Notebook esquenta muito e fica lento? Pasta térmica seca.\n- **HD com setores defeituosos** → Lentidão + sons de clique no disco.\n- **Malware** → Lento de repente sem motivo aparente? Scan profissional.\n- **Bateria inchada** → Base do notebook estufando? PARE DE USAR. Urgente."
};
