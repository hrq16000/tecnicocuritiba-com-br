import type { ProblemaPageData } from "./types";

export const problema: ProblemaPageData = {
  "slug": "pc-nao-entra-modo-seguro-curitiba",
  "title": "PC Não Entra no Modo Seguro em Curitiba | Diagnóstico e Reparo",
  "metaDescription": "Computador não entra no Modo Seguro do Windows? Saiba as causas — BCD corrompido, falha no disco, malware — e como resolver em Curitiba.",
  "h1": "PC Não Entra no Modo Seguro — Causas e Soluções em Curitiba",
  "categoria": "Software — Windows",
  "intro": "O Modo Seguro é essencial para diagnosticar e resolver problemas do Windows. Quando o computador não consegue entrar nesse modo, a situação é crítica — indica que o sistema operacional pode estar severamente corrompido.\n\nAs causas mais comuns incluem BCD (Boot Configuration Data) corrompido, setores defeituosos no disco que impedem o carregamento dos arquivos de boot, infecção por malware que altera o bootloader, ou falha em componentes de hardware como RAM e disco.\n\nEm Curitiba, nosso técnico utiliza ferramentas de boot externo (WinPE, Linux Live) para acessar o sistema, reparar o BCD e recuperar o acesso ao Modo Seguro, preservando os dados do cliente.",
  "sintomas": [
    {
      "titulo": "Tela preta ao tentar Modo Seguro",
      "desc": "O computador exibe tela preta sem cursor após selecionar Modo Seguro no menu de boot.",
      "gravidade": "Alto"
    },
    {
      "titulo": "Reinicia em loop ao selecionar Modo Seguro",
      "desc": "O PC tenta carregar o Modo Seguro mas reinicia automaticamente, entrando em loop infinito.",
      "gravidade": "Alto"
    },
    {
      "titulo": "Erro 'Winload.exe ausente' no boot",
      "desc": "Mensagem de erro indicando que o arquivo de boot do Windows está corrompido ou ausente.",
      "gravidade": "Alto"
    },
    {
      "titulo": "Menu de boot não aparece com F8",
      "desc": "A tecla F8 não abre o menu de opções avançadas, impedindo o acesso ao Modo Seguro.",
      "gravidade": "Médio"
    },
    {
      "titulo": "BSOD ao carregar Modo Seguro",
      "desc": "Tela azul aparece durante o carregamento do Modo Seguro, indicando falha crítica de driver ou hardware.",
      "gravidade": "Alto"
    }
  ],
  "causas": [
    {
      "titulo": "BCD (Boot Configuration Data) corrompido",
      "desc": "O arquivo de configuração de boot foi danificado por desligamento forçado, vírus ou falha de disco.",
      "tipo": "software"
    },
    {
      "titulo": "Setores defeituosos no disco",
      "desc": "Áreas do disco onde estão os arquivos de boot do Modo Seguro estão fisicamente danificadas.",
      "tipo": "hardware"
    },
    {
      "titulo": "Malware no bootloader",
      "desc": "Rootkits e bootkits podem alterar o processo de boot, impedindo o carregamento do Modo Seguro.",
      "tipo": "software"
    },
    {
      "titulo": "Driver incompatível travando o boot",
      "desc": "Um driver essencial falha mesmo no Modo Seguro, causando BSOD ou trava.",
      "tipo": "software"
    },
    {
      "titulo": "RAM com defeito",
      "desc": "Módulos de memória com falha podem causar erros aleatórios durante qualquer processo de boot.",
      "tipo": "hardware"
    }
  ],
  "cenarios": [
    {
      "nivel": "Simples",
      "desc": "BCD corrompido — reparo via bcdedit e bootrec a partir de mídia de instalação do Windows.",
      "tempo": "30-60 min",
      "custo": "R$80–R$150"
    },
    {
      "nivel": "Médio",
      "desc": "Arquivos de sistema corrompidos — reparo via SFC/DISM com boot externo ou reinstalação preservando dados.",
      "tempo": "2-4 horas",
      "custo": "R$150–R$300"
    },
    {
      "nivel": "Complexo",
      "desc": "Disco com setores defeituosos ou malware no bootloader — clonagem de disco, remoção de rootkit ou substituição de hardware.",
      "tempo": "1-3 dias",
      "custo": "R$250–R$500"
    }
  ],
  "riscos": [
    "Tentativas incorretas de reparo do BCD podem tornar o Windows completamente inacessível",
    "Formatação precipitada causa perda total de dados sem necessidade",
    "Ignorar setores defeituosos leva à perda progressiva de dados",
    "Rootkits não removidos podem roubar senhas e dados bancários"
  ],
  "diagnostico": "Iniciamos o diagnóstico com boot via mídia externa (WinPE ou Linux Live) para acessar o disco e verificar a integridade dos arquivos de boot. Executamos bootrec /fixmbr, bootrec /fixboot e bootrec /rebuildbcd.\n\nSe o reparo do BCD não resolver, verificamos a integridade do disco com CHKDSK e realizamos teste de memória RAM. Em casos de suspeita de malware, fazemos varredura offline com ferramentas especializadas.",
  "solucao": "Para BCD corrompido, reconstruímos a configuração de boot usando o Prompt de Comando do ambiente de recuperação. Para arquivos de sistema danificados, executamos SFC /scannow e DISM offline.\n\nEm casos de disco defeituoso, realizamos clonagem para um disco saudável antes de qualquer reparo. Para malware no bootloader, utilizamos ferramentas de remoção offline e, se necessário, reinstalamos o Windows preservando os dados do usuário.",
  "quandoCompensa": "Quando o problema é apenas BCD corrompido ou driver incompatível — reparo rápido e barato que restaura o acesso completo.",
  "quandoNaoCompensa": "Quando o disco está com muitos setores defeituosos e o sistema já apresentava instabilidade — melhor migrar para SSD novo com instalação limpa.",
  "whatsappMessage": "Olá! Meu PC não entra no Modo Seguro do Windows. Preciso de ajuda técnica em Curitiba.",
  "relatedPages": [
    {
      "to": "/problemas/erro-0xc000021a-curitiba",
      "label": "Erro 0xc000021a"
    },
    {
      "to": "/tela-azul-bsod-curitiba",
      "label": "Tela Azul (BSOD)"
    },
    {
      "to": "/problemas/computador-nao-liga-curitiba",
      "label": "PC Não Liga"
    },
    {
      "to": "/servicos/formatacao-computador",
      "label": "Formatação"
    }
  ],
  "conteudoExtra": "## Alternativas ao F8 para Acessar o Modo Seguro\n\nNo Windows 10/11, o F8 está desabilitado por padrão. Alternativas:\n\n1. **Via Configurações**: Configurações → Atualização → Recuperação → Reiniciar agora → Solução de Problemas → Opções Avançadas → Configurações de Inicialização\n2. **Via msconfig**: Execute msconfig → aba Inicialização do Sistema → marque \"Inicialização segura\"\n3. **Via Shift+Reiniciar**: Na tela de login, segure Shift e clique em Reiniciar\n4. **Forçar Recuperação**: Desligue o PC 3 vezes durante o boot para ativar o Reparo Automático\n\n## Quando o Modo Seguro é Essencial\n\nO Modo Seguro carrega apenas drivers básicos, permitindo remover programas problemáticos, desinstalar drivers incompatíveis e executar antivírus em ambiente limpo."
};
