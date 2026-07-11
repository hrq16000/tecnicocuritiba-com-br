import type { ProblemaPageData } from "./types";

export const problema: ProblemaPageData = {
  "slug": "erro-atualizacao-windows-11-curitiba",
  "title": "Erro na Atualização do Windows 11 em Curitiba | Técnico Especialista",
  "metaDescription": "Erro ao atualizar o Windows 11? Atualização travada, falha de instalação ou PC incompatível? Técnico em Curitiba resolve problemas de update com segurança.",
  "h1": "Erro na Atualização do Windows 11 — Diagnóstico e Correção em Curitiba",
  "categoria": "Software — Windows",
  "intro": "Atualizações do Windows 11 são essenciais para segurança e desempenho, mas frequentemente causam dor de cabeça: atualizações que travam em uma porcentagem, erros com códigos incompreensíveis (0x80070002, 0x800f081f), PC que não inicia após update ou a mensagem temida \"Desfazendo alterações, não desligue o computador\".\n\nO Windows 11 trouxe requisitos de hardware mais rígidos (TPM 2.0, Secure Boot, processador compatível), e muitos PCs que rodavam Windows 10 perfeitamente enfrentam bloqueios ou instabilidade ao tentar migrar ou atualizar. Além disso, atualizações cumulativas mensais podem conflitar com drivers, softwares de terceiros ou configurações específicas.\n\nEm Curitiba, atendemos diariamente problemas de atualização — desde updates mensais que falham até migrações completas do Windows 10 para 11. Nosso diagnóstico identifica a causa exata e resolve sem perda de dados.",
  "sintomas": [
    {
      "titulo": "Atualização trava em porcentagem fixa",
      "desc": "O update fica parado em 20%, 45%, 73% ou 99% por horas. Pode ser conflito de driver, espaço em disco insuficiente ou arquivo de update corrompido.",
      "gravidade": "Média"
    },
    {
      "titulo": "Erro com código (0x80070002, 0x800f081f, etc.)",
      "desc": "Windows exibe código de erro e a atualização falha. Cada código indica uma causa diferente — arquivo corrompido, serviço parado ou componente ausente.",
      "gravidade": "Média"
    },
    {
      "titulo": "'Desfazendo alterações' em loop",
      "desc": "O PC reinicia mostrando 'Desfazendo alterações, não desligue' e fica em loop. A atualização falhou e o Windows tenta reverter sem sucesso.",
      "gravidade": "Alta"
    },
    {
      "titulo": "PC não inicia após atualização",
      "desc": "Tela azul, tela preta ou loop de reparo automático após instalar update. A atualização corrompeu drivers ou arquivos do sistema.",
      "gravidade": "Alta"
    },
    {
      "titulo": "Mensagem 'Este PC não atende aos requisitos'",
      "desc": "O Windows 11 exige TPM 2.0, Secure Boot e processador compatível. PCs de antes de 2018 geralmente são bloqueados.",
      "gravidade": "Média"
    },
    {
      "titulo": "Espaço insuficiente para atualização",
      "desc": "Windows pede 20-64 GB livres para updates maiores. Em SSDs de 128 GB, o espaço acaba rapidamente com cache de update.",
      "gravidade": "Baixa-Média"
    }
  ],
  "causas": [
    {
      "titulo": "Cache de Windows Update corrompido",
      "desc": "A pasta SoftwareDistribution acumula arquivos de updates anteriores que podem se corromper e bloquear novas atualizações.",
      "tipo": "software"
    },
    {
      "titulo": "Driver incompatível com a nova versão",
      "desc": "Drivers de vídeo, áudio ou rede antigos podem conflitar com a atualização, causando tela azul ou falha na instalação.",
      "tipo": "software"
    },
    {
      "titulo": "Espaço em disco insuficiente",
      "desc": "Updates grandes (feature updates) precisam de 20-64 GB livres. SSDs de 128 GB frequentemente não têm espaço suficiente.",
      "tipo": "software"
    },
    {
      "titulo": "Hardware não atende requisitos do Windows 11",
      "desc": "TPM 2.0 não presente ou desabilitado, Secure Boot desligado ou processador fora da lista de compatibilidade da Microsoft.",
      "tipo": "hardware"
    },
    {
      "titulo": "Software de segurança bloqueando o update",
      "desc": "Antivírus de terceiros (Avast, Kaspersky, Norton) podem interferir no processo de atualização, corrompendo arquivos durante a instalação.",
      "tipo": "software"
    },
    {
      "titulo": "Arquivos de sistema corrompidos",
      "desc": "Erros pré-existentes nos arquivos do Windows (detectáveis com SFC /scannow e DISM) impedem que updates se instalem corretamente.",
      "tipo": "software"
    }
  ],
  "cenarios": [
    {
      "nivel": "Simples",
      "desc": "Limpeza de cache de update + reset de componentes do Windows Update + reinstalação do update. Resolve 60% dos casos.",
      "tempo": "1-2 horas",
      "custo": "R$ 100–200"
    },
    {
      "nivel": "Médio",
      "desc": "Reparo de arquivos de sistema (SFC + DISM) + atualização de drivers + resolução de erros específicos por código.",
      "tempo": "2-4 horas",
      "custo": "R$ 200–350"
    },
    {
      "nivel": "Complexo",
      "desc": "Repair install do Windows 11 (mantém dados e programas) + resolução de incompatibilidades de hardware/TPM.",
      "tempo": "3-6 horas",
      "custo": "R$ 300–500"
    }
  ],
  "riscos": [
    "Desligar o PC durante atualização pode corromper o Windows permanentemente",
    "Forçar instalação do Windows 11 em hardware incompatível pode causar instabilidade crônica",
    "Ignorar atualizações de segurança deixa o PC vulnerável a malware e ransomware",
    "Resetar o Windows Update incorretamente pode quebrar o sistema de updates permanentemente",
    "Antivírus de terceiros podem corromper arquivos de sistema durante o update",
    "Updates grandes podem apagar programas instalados sem aviso prévio"
  ],
  "diagnostico": "Diagnóstico de atualização do Windows 11:\n\n1. Verificação de código de erro específico e causa catalogada\n2. Análise de logs do Windows Update (CBS.log, WindowsUpdate.log)\n3. Verificação de espaço em disco e saúde do SSD/HD\n4. Teste de integridade do sistema (SFC /scannow + DISM)\n5. Verificação de compatibilidade de hardware (TPM, Secure Boot, CPU)\n6. Identificação de drivers e softwares conflitantes\n\nCusto: R$ 99,99 (incorporado se aprovar o serviço).",
  "solucao": "Solução conforme o problema:\n\n- **Cache corrompido**: Reset da pasta SoftwareDistribution + reinício dos serviços de update\n- **Arquivos de sistema**: Reparo com SFC /scannow + DISM /RestoreHealth\n- **Drivers**: Atualização prévia de todos os drivers críticos antes do update\n- **Espaço**: Limpeza de disco + remoção de updates antigos + Storage Sense\n- **Incompatibilidade**: Configuração de TPM na BIOS + habilitação de Secure Boot\n- **Loop**: Boot em modo de segurança + desinstalação do update problemático\n\nVerificação completa de funcionamento do sistema após a atualização bem-sucedida.",
  "quandoCompensa": "Sempre — manter o Windows atualizado é essencial para segurança. O custo de R$ 100-350 evita problemas maiores no futuro.",
  "quandoNaoCompensa": "Quando o hardware é incompatível com Windows 11 e o PC roda bem com Windows 10 (que terá suporte até outubro de 2025). Nesse caso, usar o 10 até planejar upgrade.",
  "whatsappMessage": "Olá! Estou com erro ao atualizar o Windows 11. Podem me ajudar?",
  "relatedPages": [
    {
      "to": "/problemas/windows-travando-na-atualizacao-curitiba",
      "label": "Windows Travando na Atualização"
    },
    {
      "to": "/problemas/erro-driver-windows-curitiba",
      "label": "Erro de Driver"
    },
    {
      "to": "/problemas/computador-lento-curitiba",
      "label": "Computador Lento"
    },
    {
      "to": "/servicos/formatacao-computador",
      "label": "Formatação"
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
  "conteudoExtra": "## Atualização do Windows 11: Guia Completo\n\n### Requisitos Mínimos do Windows 11\n\n| Componente | Requisito |\n|---|---|\n| Processador | 1 GHz, 2+ núcleos, 64-bit compatível |\n| RAM | 4 GB (recomendado 8 GB) |\n| Armazenamento | 64 GB livres |\n| TPM | Versão 2.0 |\n| Secure Boot | Habilitado |\n| Placa de vídeo | DirectX 12 com WDDM 2.0 |\n| Tela | 720p, 9\" ou maior |\n\n### Códigos de Erro Comuns e Soluções\n\n| Código | Significado | Solução |\n|---|---|---|\n| 0x80070002 | Arquivo não encontrado | Limpar cache do WU |\n| 0x800f081f | Componente ausente | DISM /RestoreHealth |\n| 0x80240034 | Download falhou | Reset do WU + tentar novamente |\n| 0xC1900101 | Erro de driver | Atualizar drivers antes |\n| 0x80070070 | Espaço insuficiente | Liberar disco |\n\n### Como Limpar Cache do Windows Update\n\n```\nnet stop wuauserv\nnet stop cryptSvc\nnet stop bits\nren C:\\Windows\\SoftwareDistribution SoftwareDistribution.old\nren C:\\Windows\\System32\\catroot2 catroot2.old\nnet start wuauserv\nnet start cryptSvc\nnet start bits\n```\n\n### Como Verificar TPM 2.0\n\n1. Pressione **Win + R** → digite **tpm.msc** → Enter\n2. Se mostrar \"TPM está pronto para uso\" e versão 2.0 → OK\n3. Se não encontrar: verifique na BIOS (Security → TPM → Enable)"
};
