import type { ProblemaPageData } from "./types";

export const problema: ProblemaPageData = {
  "slug": "backup-perdido-curitiba",
  "title": "Backup Perdido em Curitiba | Recuperação de Dados Especializada",
  "metaDescription": "Perdeu backup, arquivos ou fotos importantes? Técnico em Curitiba recupera dados de HD, SSD, pen drive e nuvem. Atendimento emergencial com sigilo total.",
  "h1": "Backup Perdido — Recuperação de Dados em Curitiba",
  "categoria": "Dados — Recuperação",
  "intro": "Perder um backup é uma das situações mais desesperadoras na informática. Fotos de família, documentos de trabalho, projetos acadêmicos, planilhas financeiras — anos de dados podem desaparecer em um instante por falha de hardware, exclusão acidental, ransomware ou corrupção de disco.\n\nA boa notícia é que, na maioria dos casos, os dados ainda existem no disco — mesmo quando você não consegue vê-los. Quando um arquivo é \"deletado\", o sistema apenas marca o espaço como disponível. Enquanto nada for gravado por cima, a recuperação é possível.\n\nA má notícia é que cada minuto que você continua usando o dispositivo após a perda reduz as chances de recuperação. Por isso, a primeira regra é: PARE DE USAR O DISPOSITIVO IMEDIATAMENTE e procure ajuda profissional.\n\nEm Curitiba, realizamos recuperação de dados com ferramentas profissionais (R-Studio, DMDE, PC-3000) e ambiente controlado para casos de HD com dano físico.",
  "sintomas": [
    {
      "titulo": "Arquivos sumiram sem explicação",
      "desc": "Pastas inteiras ou arquivos específicos desapareceram. Pode ser exclusão acidental, vírus ou corrupção do sistema de arquivos.",
      "gravidade": "Média-Alta"
    },
    {
      "titulo": "HD externo de backup não é reconhecido",
      "desc": "O HD externo onde você guardava seus backups não aparece mais no computador. Pode ser problema no USB, no controlador do HD ou falha mecânica.",
      "gravidade": "Alta"
    },
    {
      "titulo": "Mensagem 'Disco precisa ser formatado'",
      "desc": "O Windows pede para formatar o disco. NÃO FORMATE — isso pode sobrescrever dados. O sistema de arquivos está corrompido mas os dados provavelmente estão intactos.",
      "gravidade": "Alta"
    },
    {
      "titulo": "Fotos e vídeos corrompidos (não abrem)",
      "desc": "Os arquivos existem mas não abrem ou aparecem com erros. Pode ser corrupção parcial do sistema de arquivos ou setores defeituosos no disco.",
      "gravidade": "Média"
    },
    {
      "titulo": "Ransomware criptografou os arquivos",
      "desc": "Todos os arquivos foram criptografados e há uma mensagem pedindo resgate em bitcoin. NÃO PAGUE — procure ajuda profissional primeiro.",
      "gravidade": "Crítica"
    },
    {
      "titulo": "Formatou o HD/SSD por engano",
      "desc": "Formatou o disco errado ou reinstalou o Windows no disco com os dados. Recuperação é possível se a formatação foi rápida e pouco foi gravado depois.",
      "gravidade": "Alta"
    }
  ],
  "causas": [
    {
      "titulo": "Exclusão acidental",
      "desc": "Deletou arquivos da lixeira, formatou pen drive sem querer ou apagou partição errada. É a causa mais comum e geralmente tem alta taxa de recuperação.",
      "tipo": "erro-humano"
    },
    {
      "titulo": "Falha de HD mecânico",
      "desc": "HDs mecânicos têm partes móveis que desgastam com o tempo. Setores defeituosos, cabeça de leitura danificada ou motor travado causam perda de acesso aos dados.",
      "tipo": "desgaste"
    },
    {
      "titulo": "Ransomware ou vírus destrutivo",
      "desc": "Malware que criptografa ou destrói arquivos intencionalmente. Ransomware cobra resgate; vírus destrutivos simplesmente apagam dados sem aviso.",
      "tipo": "software"
    },
    {
      "titulo": "Queda de energia durante gravação",
      "desc": "Corte de luz enquanto o sistema gravava dados pode corromper o sistema de arquivos inteiro (FAT32, NTFS, ext4). Comum em Curitiba durante tempestades.",
      "tipo": "hardware"
    },
    {
      "titulo": "Backup em mídia única sem redundância",
      "desc": "Confiar em um único HD externo, pen drive ou mesmo nuvem sem cópia secundária. Qualquer falha na mídia única significa perda total.",
      "tipo": "erro-humano"
    },
    {
      "titulo": "SSD com falha no controlador",
      "desc": "SSDs não fazem barulho quando falham — simplesmente param de funcionar. O controlador pode pifar sem aviso, tornando todos os dados inacessíveis.",
      "tipo": "hardware"
    }
  ],
  "cenarios": [
    {
      "nivel": "Simples",
      "desc": "Recuperação de arquivos deletados ou de pen drive formatado. Software profissional em disco saudável.",
      "tempo": "2-6 horas",
      "custo": "R$ 150–350"
    },
    {
      "nivel": "Médio",
      "desc": "Recuperação de HD/SSD com corrupção lógica, sistema de arquivos danificado ou formatação acidental.",
      "tempo": "1-3 dias",
      "custo": "R$ 300–800"
    },
    {
      "nivel": "Complexo",
      "desc": "Recuperação de HD com dano físico (clique, não gira) ou SSD com controlador queimado. Pode exigir câmara limpa.",
      "tempo": "5-15 dias",
      "custo": "R$ 800–3000+"
    }
  ],
  "riscos": [
    "Continuar usando o dispositivo após perda de dados reduz drasticamente as chances de recuperação",
    "Formatar o disco 'para ver se resolve' sobrescreve os dados permanentemente",
    "Softwares gratuitos de recuperação podem piorar a situação se usados incorretamente",
    "Abrir um HD mecânico fora de ambiente limpo contamina os pratos com poeira e destrói dados",
    "Pagar resgate de ransomware não garante recuperação e financia criminosos",
    "Tentar recuperar dados de SSD com TRIM ativado pode ser impossível — o controlador já apagou os blocos"
  ],
  "diagnostico": "Diagnóstico de recuperação de dados:\n\n1. Avaliação do dispositivo (HD, SSD, pen drive, cartão SD)\n2. Verificação de saúde do disco (SMART, setores defeituosos)\n3. Clone bit-a-bit do disco original (para trabalhar na cópia, protegendo o original)\n4. Análise do sistema de arquivos (NTFS, FAT32, ext4, APFS)\n5. Scan profundo com ferramentas profissionais (R-Studio, DMDE)\n6. Listagem de arquivos recuperáveis com prévia\n7. Orçamento baseado na complexidade e volume de dados\n\nCusto do diagnóstico: R$ 100 (incorporado se aprovar a recuperação).",
  "solucao": "Solução conforme o cenário:\n\n- **Exclusão acidental**: Scan profundo + recuperação com R-Studio ou PhotoRec\n- **Corrupção lógica**: Reparo de tabela de partição + reconstrução de sistema de arquivos\n- **HD com dano físico**: Clone em ambiente controlado + recuperação da imagem\n- **Ransomware**: Verificação de chave de descriptografia conhecida + recuperação de shadow-sm copies\n- **SSD**: Recuperação via modo de manutenção do controlador (quando possível)\n\nTodos os dados recuperados são entregues em mídia nova (HD externo ou SSD) com verificação de integridade.\n\nAdicional: montamos estratégia de backup 3-2-1 para evitar futuras perdas.",
  "quandoCompensa": "Sempre que os dados têm valor sentimental ou profissional insubstituível. Fotos de família, documentos únicos e projetos acadêmicos não têm preço.",
  "quandoNaoCompensa": "Quando os dados podem ser baixados novamente (jogos, programas, músicas compradas) ou quando o custo de recuperação excede o valor comercial dos dados.",
  "whatsappMessage": "Olá! Perdi dados importantes e preciso de recuperação. Podem me ajudar urgentemente?",
  "relatedPages": [
    {
      "to": "/servicos/backup-recuperacao",
      "label": "Backup e Recuperação"
    },
    {
      "to": "/problemas/hd-fazendo-barulho-curitiba",
      "label": "HD Fazendo Barulho"
    },
    {
      "to": "/problemas/erro-disco-cheio-curitiba",
      "label": "Disco Cheio"
    },
    {
      "to": "/virus-ransomware-curitiba",
      "label": "Vírus e Ransomware"
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
  "conteudoExtra": "## Recuperação de Dados: Guia Completo\n\n### Regra 3-2-1 de Backup\n\n- **3** cópias dos seus dados\n- **2** tipos de mídia diferentes (ex: SSD + nuvem)\n- **1** cópia em local físico diferente (nuvem ou HD na casa de familiar)\n\n### O Que Fazer Imediatamente Após Perder Dados\n\n1. 🛑 **PARE** de usar o dispositivo imediatamente\n2. ❌ **NÃO** instale software de recuperação no mesmo disco\n3. ❌ **NÃO** formate o disco \"para ver se resolve\"\n4. ❌ **NÃO** abra HD mecânico em casa\n5. ✅ **DESLIGUE** o computador se o HD estiver fazendo cliques\n6. ✅ **PROCURE** ajuda profissional o mais rápido possível\n\n### Chances de Recuperação por Cenário\n\n| Cenário | Chance de Sucesso |\n|---|---|\n| Deletou da lixeira (sem uso após) | 90-95% |\n| Formatação rápida (sem uso após) | 80-90% |\n| Formatação completa | 40-70% |\n| HD com cliques/não reconhece | 60-80% (com câmara limpa) |\n| SSD com TRIM (após 24h) | 10-30% |\n| Ransomware (sem chave) | 30-60% (shadow-sm copies) |\n| Dano por água/fogo | 20-50% |\n\n### Soluções de Backup Recomendadas\n\n| Solução | Custo Mensal | Espaço | Facilidade |\n|---|---|---|---|\n| Google Drive | Grátis-R$ 35 | 15GB-2TB | Muito fácil |\n| OneDrive | Grátis-R$ 45 | 5GB-1TB | Fácil (integrado ao Windows) |\n| HD Externo 1TB | R$ 0 (compra R$ 250) | 1TB | Médio |\n| NAS Synology | R$ 0 (compra R$ 1500+) | 2TB+ | Avançado |\n| Backblaze | ~R$ 35/mês | Ilimitado | Fácil |"
};
