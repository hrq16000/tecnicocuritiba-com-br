import type { ProblemaPageData } from "./types";

export const problema: ProblemaPageData = {
  "slug": "erro-0x80070005-curitiba",
  "title": "Erro 0x80070005 em Curitiba — Acesso Negado no Windows",
  "metaDescription": "Erro 0x80070005 (Acesso Negado) no Windows? Veja causas reais e soluções profissionais em Curitiba. Diagnóstico técnico especializado.",
  "h1": "Erro 0x80070005 (Acesso Negado) — Solução em Curitiba",
  "categoria": "Erros do Windows",
  "intro": "O erro 0x80070005, também conhecido como ACCESS_DENIED, é um dos códigos mais frustrantes do Windows. Ele impede atualizações do sistema, instalação de programas, ativação do Windows e até o funcionamento correto de aplicativos.\n\nEsse erro ocorre quando o Windows ou um programa não tem permissões suficientes para acessar um arquivo, pasta ou registro do sistema. As causas incluem permissões corrompidas, perfil de usuário danificado, antivírus bloqueando operações do sistema e infecção por malware que altera permissões de arquivos críticos.\n\nDiferente de erros simples, o 0x80070005 frequentemente exige intervenção em permissões NTFS, registro do Windows e políticas de grupo — operações que, se feitas incorretamente, podem tornar o sistema inacessível.",
  "sintomas": [
    {
      "titulo": "Windows Update falha com erro 0x80070005",
      "desc": "As atualizações baixam mas não instalam, exibindo 'Acesso negado' repetidamente.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Impossível instalar ou atualizar programas",
      "desc": "Instaladores travam com mensagem de permissão insuficiente, mesmo executando como administrador.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Ativação do Windows falha",
      "desc": "Ao tentar ativar o Windows, o erro 0x80070005 impede a comunicação com servidores Microsoft.",
      "gravidade": "Simples"
    },
    {
      "titulo": "Restauração do sistema bloqueada",
      "desc": "Não é possível criar ou restaurar pontos de restauração — acesso negado às pastas de backup.",
      "gravidade": "Complexo"
    },
    {
      "titulo": "Erro ao acessar pastas do sistema",
      "desc": "Pastas como Windows, System32 ou ProgramData ficam inacessíveis mesmo para administradores.",
      "gravidade": "Complexo"
    },
    {
      "titulo": "Microsoft Store não instala apps",
      "desc": "Aplicativos da Store falham com erro de permissão durante download ou instalação.",
      "gravidade": "Simples"
    }
  ],
  "causas": [
    {
      "titulo": "Permissões NTFS corrompidas",
      "desc": "Atualizações falhas ou desligamentos abruptos podem corromper a tabela de permissões de arquivos do sistema.",
      "tipo": "software"
    },
    {
      "titulo": "Perfil de usuário danificado",
      "desc": "O perfil do usuário atual pode ter perdido privilégios administrativos por corrupção do registro.",
      "tipo": "software"
    },
    {
      "titulo": "Antivírus bloqueando operações do sistema",
      "desc": "Softwares de segurança podem interpretar operações legítimas do Windows Update como ameaças.",
      "tipo": "software"
    },
    {
      "titulo": "Malware alterando permissões",
      "desc": "Vírus e ransomware alteram permissões de pastas críticas para impedir remoção e reparo do sistema.",
      "tipo": "software"
    },
    {
      "titulo": "Serviço Windows Update corrompido",
      "desc": "Os componentes do Windows Update (pasta SoftwareDistribution, serviços BITS/wuauserv) podem estar danificados.",
      "tipo": "software"
    },
    {
      "titulo": "Política de grupo mal configurada",
      "desc": "Em ambientes corporativos ou após uso de 'otimizadores', políticas de grupo podem restringir acesso.",
      "tipo": "erro-humano"
    }
  ],
  "cenarios": [
    {
      "nivel": "Simples",
      "desc": "Reset do Windows Update, limpeza de cache, execução como administrador.",
      "tempo": "30-60 min",
      "custo": "R$60–R$120"
    },
    {
      "nivel": "Médio",
      "desc": "Reparo de permissões NTFS, recriação de perfil de usuário, SFC/DISM.",
      "tempo": "1-3 horas",
      "custo": "R$120–R$250"
    },
    {
      "nivel": "Complexo",
      "desc": "Reparo offline do registro, remoção de malware avançado, reinstalação do Windows preservando dados.",
      "tempo": "3-8 horas",
      "custo": "R$200–R$400"
    }
  ],
  "riscos": [
    "Alterar permissões NTFS incorretamente pode tornar o Windows inacessível",
    "Ignorar o erro permite acúmulo de atualizações de segurança pendentes",
    "Sistema sem atualizações fica vulnerável a ransomware e exploits",
    "Tentar 'forçar' permissões com takeown em pastas erradas pode quebrar o sistema",
    "Malware pode estar usando o erro como cortina de fumaça para atividade maliciosa"
  ],
  "diagnostico": "Identificamos primeiro o contexto exato do erro: Windows Update, instalação de programa ou acesso a pasta. Verificamos o Visualizador de Eventos para logs detalhados. Testamos permissões NTFS com icacls. Verificamos integridade do sistema com SFC /scannow e DISM. Escaneamos por malware com ferramentas offline. Analisamos políticas de grupo e perfil do usuário.",
  "solucao": "Para Windows Update: reset completo dos componentes (parar serviços, renomear SoftwareDistribution/catroot2, reiniciar serviços). Para permissões: reparo via icacls e takeown nos diretórios corretos. Para perfil corrompido: criação de novo perfil com migração de dados. Para malware: remoção com boot externo e restauração de permissões padrão. Executamos SFC/DISM para garantir integridade dos arquivos do sistema.",
  "quandoCompensa": "Sempre compensa resolver — o erro 0x80070005 geralmente é software puro, sem necessidade de trocar hardware. Mesmo nos casos mais complexos, o custo é muito inferior ao de um equipamento novo.",
  "quandoNaoCompensa": "Raramente não compensa. Apenas se o Windows estiver tão corrompido que múltiplos erros se acumularam e uma formatação limpa seria mais rápida e econômica que tentar reparar individualmente.",
  "whatsappMessage": "Olá! Meu computador está com erro 0x80070005 (Acesso Negado) e preciso de ajuda profissional em Curitiba.",
  "relatedPages": [
    {
      "to": "/problemas/erro-0xc000021a-curitiba",
      "label": "Erro 0xc000021a"
    },
    {
      "to": "/problemas/erro-0xc00000e-curitiba",
      "label": "Erro 0xc00000e"
    },
    {
      "to": "/problemas/tela-azul-windows-curitiba",
      "label": "Tela Azul Windows"
    },
    {
      "to": "/remocao-virus-curitiba",
      "label": "Remoção de Vírus"
    },
    {
      "to": "/formatacao-computador-curitiba",
      "label": "Formatação"
    },
    {
      "to": "/servicos",
      "label": "Todos os Serviços"
    }
  ],
  "conteudoExtra": "## Entendendo o Erro 0x80070005 em Detalhes\n\nO código **0x80070005** traduz para **E_ACCESSDENIED** na API do Windows. Significa que uma operação tentou acessar um recurso (arquivo, pasta, chave de registro, serviço) sem ter as permissões necessárias.\n\n### Onde Este Erro Aparece\n- **Windows Update**: a situação mais comum\n- **Microsoft Store**: ao instalar ou atualizar apps\n- **Ativação do Windows**: ao tentar ativar licença\n- **Backup e Restauração**: ao criar pontos de restauração\n- **Instalação de programas**: especialmente .NET Framework e Visual C++\n\n### Solução Passo a Passo (Nível Básico)\n\n#### Reset do Windows Update\n```\nnet stop wuauserv\nnet stop cryptSvc\nnet stop bits\nnet stop msiserver\nren C:\\Windows\\SoftwareDistribution SoftwareDistribution.old\nren C:\\Windows\\System32\\catroot2 catroot2.old\nnet start wuauserv\nnet start cryptSvc\nnet start bits\nnet start msiserver\n```\n\n#### Verificação de Integridade\n```\nsfc /scannow\nDISM /Online /Cleanup-Image /RestoreHealth\n```\n\n**Importante**: se esses comandos também retornarem erro de acesso, o problema é mais profundo e requer diagnóstico profissional.\n\n## Quando o Erro Indica Malware\n\nAlguns tipos de malware alteram propositalmente as permissões de pastas do Windows para:\n- Impedir que o antivírus acesse seus arquivos\n- Bloquear atualizações de segurança\n- Impedir que o usuário remova o malware\n\nSe o erro 0x80070005 surgiu repentinamente junto com lentidão e comportamento estranho, há forte suspeita de infecção."
};
