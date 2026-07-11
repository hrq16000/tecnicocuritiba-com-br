import type { ProblemaPageData } from "./types";

export const problema: ProblemaPageData = {
  "slug": "pc-com-virus-ransomware-curitiba",
  "title": "PC com Vírus Ransomware? Arquivos Criptografados | Técnico em Curitiba",
  "metaDescription": "Computador infectado com ransomware? Arquivos criptografados e pedido de resgate? Diagnóstico e tentativa de recuperação em Curitiba. Atendimento urgente.",
  "h1": "PC com Ransomware em Curitiba? Ação Urgente Necessária",
  "categoria": "Segurança",
  "intro": "O ransomware é o tipo mais devastador de malware: ele criptografa todos os seus arquivos (documentos, fotos, vídeos) e exige pagamento de resgate para devolver o acesso. É uma emergência digital que exige ação imediata e profissional. Em Curitiba, nosso técnico atua com urgência para identificar a variante do ransomware, avaliar possibilidades de recuperação e proteger contra novos ataques.",
  "sintomas": [
    {
      "titulo": "Arquivos com extensão estranha",
      "desc": "Documentos renomeados com extensões como .locked, .encrypted, .crypt, .cerber, .wannacry. São os arquivos criptografados.",
      "gravidade": "Complexo"
    },
    {
      "titulo": "Mensagem pedindo resgate",
      "desc": "Tela ou arquivo de texto exigindo pagamento em Bitcoin para desbloquear os arquivos. NÃO PAGUE.",
      "gravidade": "Complexo"
    },
    {
      "titulo": "Arquivos não abrem",
      "desc": "Fotos, documentos e planilhas existem mas não abrem — conteúdo foi criptografado e é ilegível.",
      "gravidade": "Complexo"
    },
    {
      "titulo": "Papel de parede alterado",
      "desc": "Fundo de tela trocado por mensagem do ransomware com instruções de pagamento.",
      "gravidade": "Complexo"
    },
    {
      "titulo": "Computador extremamente lento",
      "desc": "Durante a criptografia, o ransomware consome todo o disco e CPU. Se pegar nessa fase, desligue IMEDIATAMENTE.",
      "gravidade": "Médio a complexo"
    },
    {
      "titulo": "Programas e sistema funcionam",
      "desc": "O Windows funciona mas seus arquivos pessoais estão inacessíveis. O ransomware foca em dados, não no sistema.",
      "gravidade": "Complexo"
    }
  ],
  "causas": [
    {
      "titulo": "E-mail com anexo infectado",
      "desc": "Anexos .zip, .doc com macro, .exe disfarçado em e-mails falsos de bancos, correios ou empresas.",
      "tipo": "erro-humano"
    },
    {
      "titulo": "Download de software pirata",
      "desc": "Cracks, keygens e ativadores são os maiores vetores de ransomware. O 'software grátis' sai caríssimo.",
      "tipo": "erro-humano"
    },
    {
      "titulo": "Site comprometido",
      "desc": "Anúncios maliciosos (malvertising) em sites legítimos podem instalar ransomware via exploit do navegador.",
      "tipo": "software"
    },
    {
      "titulo": "Acesso remoto exposto (RDP)",
      "desc": "Porta 3389 aberta na internet permite que atacantes entrem no computador e executem o ransomware manualmente.",
      "tipo": "software"
    },
    {
      "titulo": "Rede compartilhada infectada",
      "desc": "Ransomware pode se espalhar por pastas compartilhadas na rede, infectando todos os computadores conectados.",
      "tipo": "software"
    }
  ],
  "cenarios": [
    {
      "nivel": "Simples",
      "desc": "Ransomware de tela (screen locker) sem criptografia real — remoção do malware restaura acesso",
      "tempo": "1–2 horas",
      "custo": "R$ 150–250"
    },
    {
      "nivel": "Médio",
      "desc": "Ransomware com criptografia mas com ferramenta de descriptografia disponível (variante conhecida)",
      "tempo": "2–5 horas",
      "custo": "R$ 200–400"
    },
    {
      "nivel": "Complexo",
      "desc": "Ransomware com criptografia forte sem ferramenta disponível — recuperação parcial de backups/shadow copies",
      "tempo": "4–8 horas",
      "custo": "R$ 300–600"
    }
  ],
  "riscos": [
    "NUNCA pague o resgate — não há garantia de que receberá a chave e você financia criminosos",
    "Tentar descriptografar sem identificar a variante correta pode corromper os arquivos permanentemente",
    "O ransomware pode estar ainda ativo e criptografar backups conectados ao computador",
    "Reinstalar Windows sem análise forense destrói evidências e possíveis chaves na memória RAM",
    "Conectar pendrives ou HDs externos no PC infectado pode criptografá-los também"
  ],
  "diagnostico": "1. **ISOLAMENTO IMEDIATO**: Desconexão do computador da rede (Wi-Fi e cabo) para evitar propagação.\n\n2. Identificação da variante do ransomware: análise da extensão dos arquivos criptografados e da nota de resgate.\n\n3. Consulta em bancos de dados como ID Ransomware (id-ransomware.malwarehunterteam.com) e No More Ransom (nomoreransom.org).\n\n4. Verificação de Shadow Volume Copies (versões anteriores do Windows) que podem não ter sido deletadas.\n\n5. Análise de backups disponíveis: nuvem (OneDrive, Google Drive), HD externo, backups de rede.\n\n6. Scan completo com ferramentas anti-malware para garantir que o ransomware foi completamente removido antes de qualquer recuperação.",
  "solucao": "**Identificação**: Determinação exata da família/variante do ransomware através da nota de resgate e extensão dos arquivos.\n\n**Descriptografia**: Se houver ferramenta disponível (No More Ransom, Emsisoft, Kaspersky), aplicação da ferramenta de descriptografia específica para a variante.\n\n**Recuperação**: Restauração de arquivos a partir de Shadow Copies, backups em nuvem, versões anteriores do OneDrive/Google Drive ou backups offline.\n\n**Remoção**: Eliminação completa do ransomware e backdoors associados. Verificação de persistência no sistema.\n\n**Proteção**: Instalação de anti-ransomware, configuração de backup automático (regra 3-2-1), fechamento de portas expostas, atualização do sistema e orientação sobre engenharia social.",
  "quandoCompensa": "Sempre compensa tentar a recuperação profissional. Mesmo que os arquivos não possam ser descriptografados agora, novas ferramentas são lançadas regularmente.",
  "quandoNaoCompensa": "Se não havia backup e a variante não tem descriptografador disponível, a reinstalação limpa é o caminho mais rápido para voltar a usar o computador.",
  "whatsappMessage": "Olá! Meu computador foi infectado com ransomware e meus arquivos estão criptografados. URGENTE!",
  "relatedPages": [
    {
      "to": "/problemas/pc-com-pop-ups-e-propagandas-curitiba",
      "label": "PC com Pop-ups"
    },
    {
      "to": "/servicos/remocao-virus",
      "label": "Remoção de Vírus"
    },
    {
      "to": "/servicos/backup-recuperacao",
      "label": "Backup e Recuperação"
    },
    {
      "to": "/problemas/backup-perdido-curitiba",
      "label": "Backup Perdido"
    },
    {
      "to": "/servicos/formatacao-computador",
      "label": "Formatação"
    },
    {
      "to": "/diagnostico-tecnico",
      "label": "Diagnóstico Técnico"
    }
  ],
  "conteudoExtra": "## Ransomware: O Que Fazer IMEDIATAMENTE\n\n### Primeiros 5 Minutos (Críticos)\n1. **DESLIGUE O WI-FI E DESCONECTE O CABO DE REDE** — impede propagação\n2. **NÃO desligue o computador** se estiver ligado — chaves podem estar na RAM\n3. **NÃO conecte pendrives ou HDs externos** — serão criptografados\n4. **Tire fotos da tela de resgate** — ajuda na identificação da variante\n5. **Ligue para o técnico IMEDIATAMENTE**\n\n### NUNCA Faça Isso\n- ❌ Pagar o resgate (você financia criminosos e não tem garantia)\n- ❌ Tentar descriptografar com ferramentas aleatórias\n- ❌ Formatar sem analisar antes (destrói possibilidades de recuperação)\n- ❌ Conectar dispositivos de backup no PC infectado\n\n### Prevenção (Regra 3-2-1 de Backup)\n- **3** cópias dos seus dados\n- **2** tipos de mídia diferentes (HD externo + nuvem)\n- **1** cópia offline (desconectada do computador)\n\n### Recursos Gratuitos\n- **No More Ransom** (nomoreransom.org): ferramentas gratuitas de descriptografia\n- **ID Ransomware**: identifica a variante pelo arquivo criptografado\n- **Emsisoft Decryptor**: ferramentas para dezenas de variantes"
};
