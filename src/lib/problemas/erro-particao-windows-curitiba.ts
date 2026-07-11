import type { ProblemaPageData } from "./types";

export const problema: ProblemaPageData = {
  "slug": "erro-particao-windows-curitiba",
  "title": "Erro de Partição no Windows em Curitiba | Reparo Profissional",
  "metaDescription": "Erro de partição no Windows? Disco não reconhecido, partição RAW ou corrompida? Técnico em Curitiba recupera partições e dados. Atendimento especializado.",
  "h1": "Erro de Partição no Windows — Reparo e Recuperação em Curitiba",
  "categoria": "Software — Disco",
  "intro": "Erros de partição são problemas na estrutura lógica do disco que impedem o Windows de acessar seus dados. O disco pode aparecer como RAW (sem sistema de arquivos), a partição pode sumir do Explorador de Arquivos, ou o Windows pode pedir para formatar o disco — mas NUNCA formate sem antes consultar um técnico.\n\nA tabela de partições (MBR ou GPT) é como um índice que diz ao sistema operacional onde cada partição começa e termina. Quando esse índice se corrompe — por queda de energia, vírus, erro de software ou operação incorreta — o Windows perde o acesso a todo o conteúdo, mesmo que os dados estejam intactos no disco.\n\nEm Curitiba, atendemos frequentemente casos de partição corrompida após queda de energia (especialmente em HDs mecânicos), tentativas fracassadas de redimensionar partições e erros causados por dual boot mal configurado.",
  "sintomas": [
    {
      "titulo": "Disco aparece como RAW no Gerenciamento de Disco",
      "desc": "A partição perdeu o sistema de arquivos e aparece como RAW. O Windows não consegue ler os dados mas eles geralmente ainda estão lá.",
      "gravidade": "Alta"
    },
    {
      "titulo": "Windows pede para formatar o disco",
      "desc": "Mensagem 'Você precisa formatar o disco antes de usá-lo'. NÃO FORMATE — os dados existem mas a tabela de partições está corrompida.",
      "gravidade": "Alta"
    },
    {
      "titulo": "Partição sumiu do Explorador de Arquivos",
      "desc": "O disco existe no Gerenciamento de Disco mas a partição não aparece. Pode ter perdido a letra de unidade ou a partição foi deletada acidentalmente.",
      "gravidade": "Média-Alta"
    },
    {
      "titulo": "Erro 'Disco não inicializado' no Gerenciamento",
      "desc": "O disco aparece como 'Não inicializado' e o Windows quer inicializar (apagar tudo). A tabela de partições MBR/GPT foi corrompida.",
      "gravidade": "Alta"
    },
    {
      "titulo": "Windows não inicia após redimensionar partição",
      "desc": "Tentou redimensionar, mover ou criar partição com software e agora o Windows não inicia. O bootloader ou partição EFI foram corrompidos.",
      "gravidade": "Alta"
    },
    {
      "titulo": "Erro de boot: 'Operating System Not Found'",
      "desc": "O BIOS/UEFI não encontra o sistema operacional. A partição de boot (EFI ou MBR) pode ter sido deletada ou corrompida.",
      "gravidade": "Alta"
    }
  ],
  "causas": [
    {
      "titulo": "Queda de energia durante gravação",
      "desc": "Corte de luz enquanto o sistema gravava na tabela de partições corrompe a estrutura. Muito comum em Curitiba com HDs mecânicos.",
      "tipo": "hardware"
    },
    {
      "titulo": "Software de particionamento causou erro",
      "desc": "Programas como EaseUS, MiniTool ou GParted podem corromper partições se interrompidos, usados incorretamente ou com bugs.",
      "tipo": "software"
    },
    {
      "titulo": "Vírus ou ransomware",
      "desc": "Alguns malwares atacam diretamente a tabela de partições ou o MBR para impedir o boot e exigir resgate.",
      "tipo": "software"
    },
    {
      "titulo": "Remoção incorreta de disco externo",
      "desc": "Desconectar HD externo ou pen drive sem 'Remover com segurança' pode corromper a tabela de partições, especialmente durante gravação.",
      "tipo": "erro-humano"
    },
    {
      "titulo": "Dual boot mal configurado",
      "desc": "Instalar Linux ao lado do Windows sem configurar corretamente o GRUB ou redimensionar partições pode corromper o bootloader do Windows.",
      "tipo": "erro-humano"
    },
    {
      "titulo": "Setores defeituosos na área da tabela de partições",
      "desc": "Setores bad exatamente na região onde a tabela MBR/GPT está gravada tornam a partição inacessível.",
      "tipo": "desgaste"
    }
  ],
  "cenarios": [
    {
      "nivel": "Simples",
      "desc": "Recuperação de partição deletada ou reassociação de letra de unidade. Ferramentas como TestDisk resolvem em minutos.",
      "tempo": "30-90 min",
      "custo": "R$ 100–200"
    },
    {
      "nivel": "Médio",
      "desc": "Reparo de tabela de partições corrompida + reconstrução de MBR/GPT + recuperação de bootloader EFI.",
      "tempo": "2-4 horas",
      "custo": "R$ 200–400"
    },
    {
      "nivel": "Complexo",
      "desc": "Recuperação de dados de partição RAW + reconstrução de sistema de arquivos NTFS + migração de dados.",
      "tempo": "1-3 dias",
      "custo": "R$ 350–800"
    }
  ],
  "riscos": [
    "Formatar o disco quando o Windows pede APAGA todos os dados permanentemente",
    "Inicializar disco 'Não inicializado' destrói a tabela de partições existente",
    "Usar chkdsk em partição RAW pode piorar a corrupção em alguns casos",
    "Software gratuito de partição pode ter bugs que causam mais danos",
    "Converter MBR para GPT sem backup pode perder todas as partições",
    "Tentar reparar boot sem conhecimento pode tornar o Windows irrecuperável"
  ],
  "diagnostico": "Diagnóstico de partição:\n\n1. Análise do Gerenciamento de Disco (estrutura atual)\n2. Verificação de tabela de partições com ferramentas profissionais (TestDisk, GParted)\n3. Verificação de saúde do disco (SMART, setores defeituosos)\n4. Identificação do tipo de tabela (MBR vs GPT)\n5. Scan de partições perdidas/deletadas\n6. Verificação de integridade do sistema de arquivos\n\nCusto: R$ 99,99 (incorporado se aprovar o serviço).",
  "solucao": "Solução conforme o caso:\n\n- **Partição deletada**: Recuperação com TestDisk (restaura a partição original)\n- **Tabela corrompida**: Reconstrução de MBR/GPT com ferramentas profissionais\n- **Partição RAW**: Recuperação de dados + recriação da partição com sistema de arquivos correto\n- **Boot corrompido**: Reparo do bootloader Windows (bootrec, bcdboot) ou recriação da partição EFI\n- **Dual boot**: Reparação do GRUB/bootloader + configuração correta de partições\n\nTodos os dados são verificados e validados após a recuperação da partição.",
  "quandoCompensa": "Sempre quando há dados importantes na partição. Recuperação custa R$ 100-400 na maioria dos casos — muito menos que perder os dados.",
  "quandoNaoCompensa": "Quando o disco tem dano físico severo (muitos setores defeituosos) e os dados já têm backup em outro lugar.",
  "whatsappMessage": "Olá! Meu disco está com erro de partição e não consigo acessar meus dados. Podem me ajudar?",
  "relatedPages": [
    {
      "to": "/problemas/erro-disco-cheio-curitiba",
      "label": "Disco Cheio"
    },
    {
      "to": "/problemas/backup-perdido-curitiba",
      "label": "Backup Perdido"
    },
    {
      "to": "/problemas/hd-fazendo-barulho-curitiba",
      "label": "HD Fazendo Barulho"
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
  "conteudoExtra": "## Partições no Windows: Guia Completo\n\n### MBR vs GPT — Qual a Diferença?\n\n| Característica | MBR | GPT |\n|---|---|---|\n| Limite de disco | 2 TB | 9.4 ZB |\n| Partições primárias | 4 | 128 |\n| Redundância | Nenhuma | Backup no final do disco |\n| Compatibilidade | BIOS + UEFI | Apenas UEFI |\n| Windows 11 | Não suporta | Obrigatório |\n\n### Estrutura de Partições do Windows\n\n| Partição | Tamanho | Função |\n|---|---|---|\n| EFI System (ESP) | 100-500 MB | Bootloader UEFI |\n| MSR (Microsoft Reserved) | 16-128 MB | Reservada pelo Windows |\n| Windows (C:) | Restante | Sistema operacional + dados |\n| Recovery | 500-1000 MB | Ambiente de recuperação |\n\n### Ferramentas Profissionais de Reparo\n\n- **TestDisk** (gratuito) — Recupera partições deletadas e repara tabela de partições\n- **GParted** (gratuito) — Gerenciamento de partições em Linux\n- **DMDE** — Recuperação avançada de dados e partições\n- **bootrec /fixmbr** — Repara MBR do Windows\n- **bcdboot** — Recria bootloader EFI do Windows"
};
