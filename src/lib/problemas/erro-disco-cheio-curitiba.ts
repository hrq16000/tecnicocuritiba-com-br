import type { ProblemaPageData } from "./types";

export const problema: ProblemaPageData = {
  "slug": "erro-disco-cheio-curitiba",
  "title": "Erro de Disco Cheio em Curitiba — Diagnóstico e Solução",
  "metaDescription": "Computador com disco cheio em Curitiba? Limpeza profissional, migração para SSD e organização de arquivos. Atendimento rápido em domicílio.",
  "h1": "Erro de Disco Cheio — Diagnóstico e Solução em Curitiba",
  "categoria": "Software — Armazenamento",
  "intro": "Seu computador está mostrando avisos de \"disco cheio\" ou \"espaço insuficiente\"? Além de impedir que você salve arquivos, o disco cheio causa lentidão extrema, travamentos e até impede atualizações de segurança do Windows.\n\nNa maioria dos casos, o problema não é que você tem \"coisas demais\" — mas sim que arquivos temporários, logs, caches e backups antigos estão ocupando dezenas de gigabytes sem você saber.\n\nEm Curitiba, fazemos uma limpeza profissional completa e, quando necessário, migramos seus dados para um SSD maior — mantendo tudo funcionando como antes, só que mais rápido.",
  "sintomas": [
    {
      "titulo": "Aviso 'Disco Local (C:) com pouco espaço'",
      "desc": "Windows exibe notificação vermelha na barra de tarefas quando restam menos de 10% livres.",
      "gravidade": "Média"
    },
    {
      "titulo": "Computador extremamente lento",
      "desc": "Sem espaço livre, o Windows não consegue criar arquivos de paginação e swap.",
      "gravidade": "Alta"
    },
    {
      "titulo": "Programas não abrem ou travam",
      "desc": "Aplicativos precisam de espaço temporário para funcionar. Sem espaço = crash.",
      "gravidade": "Alta"
    },
    {
      "titulo": "Windows Update falha repetidamente",
      "desc": "Atualizações precisam de 10-20 GB livres. Sem espaço, ficam em loop de falha.",
      "gravidade": "Média"
    },
    {
      "titulo": "Não consegue salvar arquivos",
      "desc": "Erro ao salvar documentos, fotos ou downloads — disco 100% ocupado.",
      "gravidade": "Alta"
    },
    {
      "titulo": "Lixeira não esvazia ou está vazia mas sem espaço",
      "desc": "Arquivos ocultos, Shadow Copies ou WinSxS estão ocupando o espaço.",
      "gravidade": "Média"
    }
  ],
  "causas": [
    {
      "titulo": "Arquivos temporários acumulados",
      "desc": "O Windows acumula GBs de arquivos temp, cache de navegador, logs antigos.",
      "tipo": "software"
    },
    {
      "titulo": "Pasta WinSxS inchada",
      "desc": "A pasta de componentes do Windows pode ocupar 15-30 GB com backups de atualizações.",
      "tipo": "software"
    },
    {
      "titulo": "Shadow Copies (pontos de restauração)",
      "desc": "O Windows cria cópias de segurança automáticas que podem ocupar dezenas de GB.",
      "tipo": "software"
    },
    {
      "titulo": "HD/SSD pequeno demais",
      "desc": "SSDs de 120-240 GB ficam cheios rapidamente com Windows 11 + programas.",
      "tipo": "hardware"
    },
    {
      "titulo": "Downloads e duplicatas esquecidos",
      "desc": "Pasta de downloads com GBs de instaladores antigos e arquivos duplicados.",
      "tipo": "erro-humano"
    },
    {
      "titulo": "Backup local do celular",
      "desc": "Backup do iPhone/Android pode ocupar 20-50 GB sem o usuário saber.",
      "tipo": "erro-humano"
    }
  ],
  "cenarios": [
    {
      "nivel": "Simples",
      "desc": "Limpeza de temporários, cache e downloads antigos. Recupera 10-30 GB.",
      "tempo": "1h a 2h",
      "custo": "R$ 99,99 a R$ 180"
    },
    {
      "nivel": "Médio",
      "desc": "Limpeza profunda + reorganização de dados + mover arquivos para HD externo.",
      "tempo": "2h a 4h",
      "custo": "R$ 150 a R$ 300"
    },
    {
      "nivel": "Complexo",
      "desc": "Migração completa para SSD maior com clonagem do sistema.",
      "tempo": "3h a 5h",
      "custo": "R$ 250 a R$ 600 (com SSD)"
    }
  ],
  "riscos": [
    "Disco 100% cheio pode corromper o sistema de arquivos do Windows",
    "Sem espaço para swap/paginação, o sistema pode travar e perder dados não salvos",
    "Atualizações de segurança paradas deixam o sistema vulnerável a vírus",
    "Apagar arquivos sem saber o que são pode remover dados importantes do sistema",
    "SSD funcionando em 100% de capacidade degrada mais rápido (wear leveling prejudicado)"
  ],
  "diagnostico": "Análise completa de espaço em disco:\n\n1. Mapeamento de uso com WizTree/TreeSize — identifica exatamente o que ocupa espaço\n2. Análise de arquivos temporários, cache e logs\n3. Verificação de Shadow Copies e pontos de restauração\n4. Identificação de pastas ocultas grandes (WinSxS, backup celular, WSL)\n5. Avaliação se o disco atual comporta suas necessidades\n6. Recomendação: limpeza vs. upgrade de SSD\n\nCusto: R$ 99,99 (incorporado se aprovar o serviço).",
  "solucao": "Solução em camadas:\n\n1. **Limpeza segura** — Removemos apenas o que é seguro: temp, cache, logs, duplicatas\n2. **Otimização** — Compactação NTFS, limpeza de WinSxS, ajuste de Shadow Copies\n3. **Reorganização** — Movemos arquivos grandes para unidade secundária ou nuvem\n4. **Upgrade** (quando necessário) — Migração para SSD de 480GB/1TB com clonagem\n\nTudo com backup prévio dos dados importantes.",
  "quandoCompensa": "Sempre — limpeza custa pouco e resolve na maioria dos casos. Upgrade de SSD é o melhor investimento para PCs com SSD de 120-240 GB.",
  "quandoNaoCompensa": "Quando o disco está cheio porque o computador é muito antigo com HD de 320 GB e o custo de SSD + mão de obra se aproxima de um notebook novo.",
  "whatsappMessage": "Olá! Meu computador está com disco cheio e muito lento. Podem me ajudar?",
  "relatedPages": [
    {
      "to": "/problemas/computador-lento-curitiba",
      "label": "Computador Lento"
    },
    {
      "to": "/servicos/upgrade-ssd-memoria",
      "label": "Upgrade SSD"
    },
    {
      "to": "/servicos/formatacao-computador",
      "label": "Formatação"
    },
    {
      "to": "/servicos/backup-recuperacao",
      "label": "Backup e Recuperação"
    },
    {
      "to": "/como-funciona",
      "label": "Como Funciona"
    },
    {
      "to": "/precos-e-politicas",
      "label": "Preços e Políticas"
    }
  ],
  "conteudoExtra": "## O Que Está Ocupando Espaço no Seu Disco?\n\nA maioria das pessoas se surpreende ao descobrir o que realmente ocupa espaço:\n\n### Top 10 Maiores Consumidores de Espaço\n\n| Item | Espaço Típico | Pode Limpar? |\n|---|---|---|\n| Pasta Windows\\Temp | 2-15 GB | ✅ Sim |\n| Cache do navegador | 1-5 GB | ✅ Sim |\n| Windows Update cache | 5-20 GB | ✅ Com cuidado |\n| WinSxS (componentes) | 10-30 GB | ⚠️ Parcialmente |\n| Shadow Copies | 5-50 GB | ✅ Ajustar limite |\n| Backup iPhone/Android | 10-50 GB | ⚠️ Se tiver cópia |\n| Pasta Downloads | 5-30 GB | ✅ Manualmente |\n| Jogos (Steam, Epic) | 20-200 GB | ⚠️ Mover para outro disco |\n| Arquivos PST (Outlook) | 2-20 GB | ⚠️ Compactar |\n| WSL/Docker | 5-50 GB | ⚠️ Se não usar |\n\n### SSD de 120 GB: Por Que Não é Suficiente em 2026\n\nO Windows 11 sozinho ocupa 25-40 GB. Adicione Office, navegador, antivírus e atualizações: você já usou 60-70 GB. Sobram 50 GB para TUDO o mais.\n\nNossa recomendação mínima: **SSD de 480 GB** para uso básico, **1 TB** para quem trabalha com arquivos grandes.\n\n### Dica Preventiva: Regra dos 20%\n\nMantenha sempre pelo menos 20% do disco livre. Para um SSD de 240 GB, isso significa manter 48 GB livres. Isso garante:\n\n- Espaço para swap/paginação do Windows\n- Espaço para atualizações de segurança\n- Vida útil maior do SSD (wear leveling eficiente)\n- Performance consistente do sistema\n\n### Passo a Passo: Limpeza Básica Que Você Pode Fazer\n\n1. **Limpeza de Disco** — Pesquise \"Limpeza de Disco\" no menu Iniciar → selecione tudo → limpar\n2. **Pasta Downloads** — Abra a pasta e delete instaladores antigos\n3. **Lixeira** — Esvazie a lixeira (clique direito no ícone da área de trabalho)\n4. **Cache do navegador** — Chrome: Ctrl+Shift+Del → Limpar dados\n\nSe depois disso ainda não resolver, é hora de chamar o técnico para uma limpeza profunda."
};
