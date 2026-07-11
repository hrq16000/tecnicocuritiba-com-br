import type { ProblemaPageData } from "./types";

export const problema: ProblemaPageData = {
  "slug": "pc-com-pop-ups-e-propagandas-curitiba",
  "title": "PC com Pop-ups e Propagandas em Curitiba | Remoção de Adware",
  "metaDescription": "Computador cheio de pop-ups e propagandas? Técnico em Curitiba remove adware, browser hijackers e PUPs com limpeza profunda e proteção contra reinfecção.",
  "h1": "PC com Pop-ups e Propagandas — Remoção Profissional em Curitiba",
  "categoria": "Software / Segurança",
  "intro": "Seu computador abriu uma enxurrada de pop-ups, propagandas em sites que antes não tinham, barras de ferramentas estranhas no navegador ou a página inicial mudou sozinha? Esses são sintomas clássicos de adware e browser hijackers — softwares indesejados que se instalam silenciosamente e bombardeiam você com publicidade.\n\nDiferente de vírus tradicionais que danificam arquivos, adwares são projetados para gerar receita publicitária às custas do seu conforto e privacidade. Eles rastreiam seus hábitos de navegação, redirecionam buscas para sites patrocinados e podem abrir portas para ameaças mais graves como ransomware e trojans.\n\nEm Curitiba, esse é um dos problemas mais frequentes que atendemos. Muitas vezes o adware chega junto com programas \"gratuitos\" baixados da internet, extensões de navegador maliciosas ou cliques em links suspeitos. A remoção completa exige mais do que um antivírus — é necessário limpar registros, extensões, tarefas agendadas e políticas de grupo.",
  "sintomas": [
    {
      "titulo": "Pop-ups constantes mesmo sem navegador aberto",
      "desc": "Janelas de propaganda aparecem na área de trabalho. Indica adware instalado como serviço do sistema ou tarefa agendada.",
      "gravidade": "Alto"
    },
    {
      "titulo": "Página inicial do navegador alterada",
      "desc": "O Google foi substituído por um buscador desconhecido (Hao123, Delta Search, etc.). Browser hijacker modificou as configurações.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Propagandas inseridas em sites limpos",
      "desc": "Banners e links patrocinados aparecem em sites como Google e Wikipedia. Extensão maliciosa injetando anúncios nas páginas.",
      "gravidade": "Alto"
    },
    {
      "titulo": "Navegador abrindo abas sozinho",
      "desc": "Novas abas com sites de apostas, downloads ou conteúdo adulto abrem automaticamente. Redirecionamento por script malicioso.",
      "gravidade": "Alto"
    },
    {
      "titulo": "Computador lento após infecção",
      "desc": "O adware consome CPU e memória para exibir propagandas, tornando o sistema visivelmente mais lento.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Barras de ferramentas desconhecidas",
      "desc": "Toolbars como Ask, Babylon ou Conduit aparecem no navegador sem terem sido instaladas conscientemente.",
      "gravidade": "Médio"
    }
  ],
  "causas": [
    {
      "titulo": "Download de programas com bundleware",
      "desc": "Instaladores de programas gratuitos incluem adware nas opções 'Recomendado' ou 'Express'. Clicar em 'Avançar' sem ler instala tudo.",
      "tipo": "erro-humano"
    },
    {
      "titulo": "Extensões maliciosas de navegador",
      "desc": "Extensões que prometem funcionalidades úteis mas na verdade injetam propagandas e rastreiam navegação.",
      "tipo": "software"
    },
    {
      "titulo": "Clique em anúncios enganosos",
      "desc": "Botões falsos de 'Download' ou 'Fechar' em sites de pirataria que na verdade instalam adware.",
      "tipo": "erro-humano"
    },
    {
      "titulo": "Cracks e keygens infectados",
      "desc": "Ativadores piratas de software frequentemente contêm adware, spyware e trojans embutidos.",
      "tipo": "software"
    },
    {
      "titulo": "Políticas de grupo (GPO) alteradas",
      "desc": "Adwares avançados modificam políticas de grupo do Windows para impedir a remoção e forçar configurações do navegador.",
      "tipo": "software"
    },
    {
      "titulo": "Notificações push aceitas acidentalmente",
      "desc": "Sites que pedem para 'Permitir notificações' e depois enviam spam de propaganda pelo sistema de notificações do navegador.",
      "tipo": "erro-humano"
    }
  ],
  "cenarios": [
    {
      "nivel": "Simples",
      "desc": "Adware superficial — remoção de extensões, limpeza de navegadores e desinstalação de PUPs. Caso resolva.",
      "tempo": "1-2 horas",
      "custo": "R$80–R$150"
    },
    {
      "nivel": "Médio",
      "desc": "Adware persistente com tarefas agendadas, GPO alterado e múltiplos navegadores infectados. Limpeza profunda necessária.",
      "tempo": "2-4 horas",
      "custo": "R$150–R$250"
    },
    {
      "nivel": "Complexo",
      "desc": "Infecção combinada (adware + trojan + rootkit). Pode exigir formatação com backup seletivo e reinstalação limpa.",
      "tempo": "4-8 horas",
      "custo": "R$200–R$350"
    }
  ],
  "riscos": [
    "Adware pode evoluir para spyware que rouba senhas e dados bancários",
    "Pop-ups podem redirecionar para sites de phishing e golpes financeiros",
    "Extensões maliciosas têm acesso a tudo que você digita no navegador, incluindo senhas",
    "Ignorar a infecção permite que mais malware seja baixado silenciosamente"
  ],
  "diagnostico": "O diagnóstico de adware é minucioso e envolve: verificação de programas instalados (lista de PUPs conhecidos), análise de extensões em todos os navegadores (Chrome, Firefox, Edge), inspeção de tarefas agendadas no Windows, verificação de políticas de grupo (GPO), análise do arquivo HOSTS e das configurações de proxy.\n\nUtilizamos ferramentas especializadas como AdwCleaner, Malwarebytes, HitmanPro e FRST (Farbar Recovery Scan Tool) para identificar todos os componentes da infecção. O relatório do FRST mostra modificações em registros, serviços e tarefas que antivírus comuns não detectam.",
  "solucao": "A remoção profissional de adware segue um protocolo rigoroso:\n\n1. Desinstalação de todos os PUPs (Programas Potencialmente Indesejados) pelo Painel de Controle e ferramentas especializadas.\n\n2. Remoção de extensões maliciosas de todos os navegadores instalados e reset das configurações (página inicial, buscador padrão, proxy).\n\n3. Limpeza de tarefas agendadas, serviços e entradas de registro criadas pelo adware.\n\n4. Restauração de políticas de grupo (GPO) ao padrão do Windows.\n\n5. Verificação e limpeza do arquivo HOSTS e configurações de DNS.\n\n6. Instalação de bloqueador de anúncios (uBlock Origin) e configuração de proteção contra notificações push indesejadas.\n\n7. Orientação ao usuário sobre práticas seguras de download e navegação para evitar reinfecção.",
  "quandoCompensa": "Sempre compensa remover adware — o custo é baixo e os riscos de não agir são altos (roubo de dados, phishing, mais infecções).",
  "quandoNaoCompensa": "Se o sistema já está comprometido com múltiplos tipos de malware (rootkits, ransomware), pode ser mais eficiente formatar e reinstalar o Windows.",
  "whatsappMessage": "Olá! Meu computador está cheio de pop-ups e propagandas. Preciso de ajuda para remover.",
  "relatedPages": [
    {
      "to": "/remocao-virus-malware-curitiba",
      "label": "Remoção de Vírus"
    },
    {
      "to": "/problemas/computador-lento-curitiba",
      "label": "Computador Lento"
    },
    {
      "to": "/servicos/remocao-virus",
      "label": "Serviço Remoção de Vírus"
    },
    {
      "to": "/servicos/formatacao-computador",
      "label": "Formatação"
    },
    {
      "to": "/tela-azul-curitiba",
      "label": "Tela Azul (BSOD)"
    },
    {
      "to": "/diagnostico-tecnico",
      "label": "Diagnóstico Técnico"
    }
  ],
  "conteudoExtra": "## Como Evitar Adware e Pop-ups\n\n### Regras de Ouro\n1. **Nunca clique em \"Avançar\" sem ler** — sempre escolha instalação \"Personalizada\" ou \"Avançada\"\n2. **Baixe apenas de fontes oficiais** — site do fabricante ou lojas de apps verificadas\n3. **Use uBlock Origin** — o melhor bloqueador de anúncios gratuito para navegadores\n4. **Nunca aceite notificações push** de sites desconhecidos\n5. **Evite cracks e keygens** — são a principal porta de entrada para malware\n\n### O Que Fazer se Já Está Infectado\n- Não clique em nenhum pop-up, nem no botão \"X\" — use o Gerenciador de Tarefas para fechar\n- Não insira senhas ou dados bancários até o computador ser limpo\n- Procure assistência técnica profissional para remoção completa"
};
