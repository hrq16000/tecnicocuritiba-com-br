import type { ProblemaPageData } from "./types";

export const problema: ProblemaPageData = {
  "slug": "hd-externo-nao-reconhece-curitiba",
  "title": "HD Externo Não Reconhece em Curitiba | Recuperação e Diagnóstico",
  "metaDescription": "HD externo não reconhece? Diagnóstico e recuperação de dados em Curitiba. USB, partição, firmware. Atendimento especializado. Atendimento pelo WhatsApp.",
  "h1": "HD Externo Não Reconhece — Diagnóstico e Recuperação de Dados",
  "categoria": "Hardware / Armazenamento",
  "intro": "Quando o HD externo não é reconhecido pelo computador, a preocupação principal é sempre os dados. Fotos, documentos, trabalhos acadêmicos e backups podem estar em risco. O problema pode ser tão simples quanto um cabo defeituoso ou tão grave quanto falha mecânica do disco.\n\nAntes de tentar qualquer solução por conta própria, é fundamental entender que HDs externos com problemas mecânicos (cliques, ruídos) NÃO devem ser ligados repetidamente — cada tentativa pode piorar o dano e tornar a recuperação mais cara ou impossível.\n\nOs HDs externos são especialmente vulneráveis porque são transportados constantemente e podem sofrer quedas, vibrações e variações de temperatura que HDs internos não experimentam.",
  "sintomas": [
    {
      "titulo": "HD externo não aparece no Explorador de Arquivos",
      "desc": "O disco não é listado no Windows Explorer mas pode aparecer no Gerenciador de Discos. Pode ser problema de partição, letra de unidade ou formatação incompatível.",
      "gravidade": "Simples"
    },
    {
      "titulo": "HD faz cliques ou ruídos ao conectar",
      "desc": "Ruídos de clique repetitivo indicam falha mecânica na cabeça de leitura. DESLIGUE IMEDIATAMENTE — cada tentativa pode riscar os pratos e destruir dados.",
      "gravidade": "Complexo"
    },
    {
      "titulo": "LED do HD acende mas não é detectado",
      "desc": "O disco recebe energia mas o computador não o reconhece. Pode ser falha na placa controladora (PCB), cabo de dados ou porta USB insuficiente.",
      "gravidade": "Médio"
    },
    {
      "titulo": "HD aparece como 'Não inicializado' no Gerenciador de Discos",
      "desc": "O Windows detecta o disco mas mostra como não inicializado ou RAW. Tabela de partição corrompida — dados podem ser recuperáveis.",
      "gravidade": "Médio"
    },
    {
      "titulo": "HD externo extremamente lento para acessar",
      "desc": "Arquivos demoram minutos para abrir. Indica setores defeituosos (bad blocks) que o disco tenta ler repetidamente.",
      "gravidade": "Médio"
    },
    {
      "titulo": "HD reconhece em um PC mas não em outro",
      "desc": "Pode ser driver USB, formato de arquivo (ex: Mac HFS+ não lê no Windows) ou porta USB com defeito no PC específico.",
      "gravidade": "Simples"
    }
  ],
  "causas": [
    {
      "titulo": "Cabo USB defeituoso ou incompatível",
      "desc": "Cabos USB podem parecer bons externamente mas ter fios rompidos internamente. HDs de 3.5\" precisam de fonte de alimentação externa — cabo USB sozinho não fornece energia suficiente.",
      "tipo": "hardware"
    },
    {
      "titulo": "Porta USB com alimentação insuficiente",
      "desc": "Portas USB frontais de desktops ou hubs USB sem alimentação podem não fornecer corrente suficiente para o HD girar.",
      "tipo": "hardware"
    },
    {
      "titulo": "Tabela de partição corrompida (MBR/GPT)",
      "desc": "Remoção insegura ('puxar o cabo') pode corromper a tabela de partição. O disco existe mas o Windows não consegue ler a estrutura de arquivos.",
      "tipo": "erro-humano"
    },
    {
      "titulo": "Setores defeituosos (bad blocks)",
      "desc": "Desgaste natural ou queda pode criar áreas ilegíveis no disco. O HD tenta ler repetidamente, ficando lento ou travando.",
      "tipo": "desgaste"
    },
    {
      "titulo": "Falha mecânica (cabeça de leitura)",
      "desc": "Queda ou impacto pode desalinhar a cabeça de leitura. O disco faz cliques e não consegue ler os pratos. Recuperação requer sala limpa.",
      "tipo": "hardware"
    },
    {
      "titulo": "Placa controladora (PCB) queimada",
      "desc": "Surtos de energia ou curto-circuito podem queimar a PCB do HD. O disco não liga ou não é detectado. Troca de PCB pode resolver.",
      "tipo": "hardware"
    }
  ],
  "cenarios": [
    {
      "nivel": "Simples",
      "desc": "Cabo defeituoso, porta USB fraca, partição sem letra de unidade ou formato incompatível. Sem perda de dados.",
      "tempo": "30min–1 hora",
      "custo": "R$60–R$120"
    },
    {
      "nivel": "Médio",
      "desc": "Tabela de partição corrompida ou setores defeituosos. Recuperação de dados via software especializado.",
      "tempo": "2–8 horas",
      "custo": "R$150–R$400"
    },
    {
      "nivel": "Complexo",
      "desc": "Falha mecânica ou PCB queimada. Recuperação em sala limpa ou troca de PCB. Dados críticos podem exigir laboratório.",
      "tempo": "5–30 dias",
      "custo": "R$400–R$2000+"
    }
  ],
  "riscos": [
    "Ligar repetidamente um HD com cliques pode riscar os pratos permanentemente",
    "Usar software de recuperação em HD com falha mecânica piora o dano",
    "Abrir o HD fora de sala limpa contamina os pratos com poeira",
    "Formatar acidentalmente o HD para 'resolver' o problema destrói os dados",
    "Inicializar disco 'Não inicializado' sem cuidado pode sobrescrever a tabela de partição"
  ],
  "diagnostico": "Primeiro, verificamos o básico: cabo, porta USB, alimentação. Testamos com cabo e porta diferentes. Verificamos no Gerenciador de Discos se o HD é detectado em nível de hardware.\n\nSe o HD faz ruídos anormais, NÃO prosseguimos com tentativas — orientamos sobre recuperação profissional. Para HDs silenciosos que não são reconhecidos, analisamos a PCB e testamos com adaptador SATA direto.\n\nPara dados acessíveis mas disco lento: fazemos clone bit-a-bit para disco saudável antes de qualquer tentativa de reparo, garantindo que os dados estejam seguros.",
  "solucao": "Para problemas simples: trocamos cabo, testamos alimentação adequada, atribuímos letra de unidade ou convertemos formato de arquivo. Para partição corrompida: usamos ferramentas profissionais (R-Studio, DMDE) para reconstruir a tabela e recuperar dados.\n\nPara setores defeituosos: clonamos o disco com ddrescue para mídia saudável antes de reparar. Para PCB queimada: localizamos PCB compatível e fazemos transplante do chip BIOS.\n\nPara falha mecânica grave: encaminhamos para laboratório parceiro com sala limpa, com orçamento prévio aprovado pelo cliente. Sempre priorizamos a segurança dos dados.",
  "quandoCompensa": "Para dados importantes e insubstituíveis (fotos de família, trabalhos acadêmicos, documentos empresariais), o investimento em recuperação quase sempre compensa.",
  "quandoNaoCompensa": "Se o HD contém apenas dados que existem em outros backups ou são facilmente baixáveis novamente. HDs antigos com pouca capacidade também não justificam recuperação cara.",
  "whatsappMessage": "Olá! Meu HD externo não está sendo reconhecido pelo computador. Tenho dados importantes nele. Preciso de diagnóstico urgente.",
  "relatedPages": [
    {
      "to": "/problemas/pc-nao-reconhece-usb-curitiba",
      "label": "PC Não Reconhece USB"
    },
    {
      "to": "/backup-recuperacao-curitiba",
      "label": "Backup e Recuperação"
    },
    {
      "to": "/upgrade-ssd-memoria-curitiba",
      "label": "Upgrade SSD"
    },
    {
      "to": "/problemas/computador-lento-curitiba",
      "label": "Computador Lento"
    },
    {
      "to": "/servicos",
      "label": "Todos os Serviços"
    }
  ],
  "conteudoExtra": "## O Que Fazer AGORA\n\n1. **HD com cliques**: DESLIGUE IMEDIATAMENTE. Não tente mais. Cada tentativa reduz as chances de recuperação\n2. **HD silencioso**: Teste com outro cabo USB e em porta traseira do PC (mais energia)\n3. **HD detectado mas sem arquivos**: NÃO formate. Os dados podem estar lá com partição corrompida\n4. **HD lento**: Não force acesso. Desligue e procure diagnóstico profissional\n\n## Prevenção\n\n- Sempre use \"Remover Hardware com Segurança\" antes de desconectar\n- Nunca transporte o HD ligado ou em funcionamento\n- Mantenha backup em pelo menos 2 locais diferentes (regra 3-2-1)\n- SSDs externos são mais resistentes a quedas que HDs mecânicos"
};
