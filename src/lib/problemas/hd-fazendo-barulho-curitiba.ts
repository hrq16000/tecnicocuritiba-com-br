import type { ProblemaPageData } from "./types";

export const problema: ProblemaPageData = {
  "slug": "hd-fazendo-barulho-curitiba",
  "title": "HD Fazendo Barulho em Curitiba — Diagnóstico e Recuperação de Dados",
  "metaDescription": "HD fazendo barulho, clique ou rangido em Curitiba? Diagnóstico urgente e recuperação de dados. Não ignore — cada minuto conta. Atendimento rápido.",
  "h1": "HD Fazendo Barulho — Diagnóstico e Recuperação de Dados em Curitiba",
  "categoria": "Hardware — Armazenamento",
  "intro": "Se o HD do seu computador está fazendo barulhos estranhos — cliques, rangidos, estalos ou zumbidos — isso é um sinal de URGÊNCIA. Diferente de outros problemas que podem esperar, um HD barulhento pode parar de funcionar a qualquer momento, levando todos os seus dados junto.\n\nCada vez que você liga o computador com o HD barulhento, aumenta o risco de perda permanente de dados. Fotos, documentos, trabalhos — tudo pode ser perdido.\n\nEm Curitiba, tratamos HD barulhento como emergência: diagnóstico prioritário para avaliar o estado do disco, tentativa de backup imediato dos dados e orientação sobre os próximos passos — sempre com transparência.",
  "sintomas": [
    {
      "titulo": "Cliques repetitivos (click of death)",
      "desc": "A cabeça de leitura não consegue posicionar — disco em estado crítico. DESLIGUE IMEDIATAMENTE.",
      "gravidade": "Crítica"
    },
    {
      "titulo": "Rangido ou chiado constante",
      "desc": "Rolamento do motor com desgaste. O disco pode parar a qualquer momento.",
      "gravidade": "Alta"
    },
    {
      "titulo": "Estalos esporádicos",
      "desc": "Setores defeituosos sendo remapeados. Disco em degradação progressiva.",
      "gravidade": "Alta"
    },
    {
      "titulo": "Zumbido mais alto que o normal",
      "desc": "Motor do disco trabalhando com esforço extra — pode ser início de falha mecânica.",
      "gravidade": "Média"
    },
    {
      "titulo": "Barulho + computador travando",
      "desc": "O sistema tenta ler setores defeituosos e trava esperando resposta do disco.",
      "gravidade": "Alta"
    },
    {
      "titulo": "Barulho + arquivos desaparecendo",
      "desc": "Setores com dados estão se tornando ilegíveis — perda de dados em andamento.",
      "gravidade": "Crítica"
    }
  ],
  "causas": [
    {
      "titulo": "Desgaste mecânico natural",
      "desc": "HDs têm vida útil de 3-5 anos. Após esse período, componentes mecânicos começam a falhar.",
      "tipo": "desgaste"
    },
    {
      "titulo": "Queda ou impacto",
      "desc": "Mesmo uma pequena queda pode desalinhar as cabeças de leitura ou danificar os pratos.",
      "tipo": "erro-humano"
    },
    {
      "titulo": "Superaquecimento prolongado",
      "desc": "Temperatura acima de 50°C degrada os componentes internos do HD.",
      "tipo": "desgaste"
    },
    {
      "titulo": "Setores defeituosos acumulados",
      "desc": "Setores bad se multiplicam progressivamente até o disco ficar ilegível.",
      "tipo": "desgaste"
    },
    {
      "titulo": "Falha do motor (spindle)",
      "desc": "O motor que gira os pratos está travando ou com rolamento danificado.",
      "tipo": "hardware"
    },
    {
      "titulo": "Cabeça de leitura desalinhada",
      "desc": "A cabeça que lê os dados está tocando os pratos (head crash) — dano físico.",
      "tipo": "hardware"
    }
  ],
  "cenarios": [
    {
      "nivel": "Simples",
      "desc": "HD com poucos setores defeituosos — backup urgente + migração para SSD.",
      "tempo": "2h a 4h",
      "custo": "R$ 200 a R$ 400"
    },
    {
      "nivel": "Médio",
      "desc": "HD com muitos bad sectors — clonagem setor a setor com ferramenta especializada.",
      "tempo": "6h a 24h",
      "custo": "R$ 300 a R$ 600"
    },
    {
      "nivel": "Complexo",
      "desc": "HD não detectado ou cabeça danificada — recuperação em sala limpa (lab especializado).",
      "tempo": "5 a 30 dias",
      "custo": "R$ 800 a R$ 5.000+"
    }
  ],
  "riscos": [
    "CADA VEZ que o HD barulhento é ligado, o risco de perda total de dados aumenta",
    "Head crash (cabeça tocando o prato) causa dano físico irreversível nos dados",
    "Tentar usar software de recuperação em HD com falha mecânica pode piorar o dano",
    "Congelar o HD (mito da internet) pode causar condensação e destruir os pratos",
    "Abrir o HD fora de sala limpa contamina os pratos com poeira e inviabiliza a recuperação"
  ],
  "diagnostico": "Diagnóstico de EMERGÊNCIA para HD barulhento:\n\n1. Avaliação sonora (tipo de barulho indica gravidade)\n2. Verificação SMART (saúde do disco via software)\n3. Teste de leitura superficial (sem estressar o disco)\n4. Se detectado: tentativa imediata de backup dos dados mais importantes\n5. Avaliação: clonagem possível vs. necessidade de lab especializado\n6. Orçamento para migração de dados para SSD novo\n\nCusto: R$ 99,99 (incorporado se aprovar o serviço). URGENTE — não adie.",
  "solucao": "Protocolo para HD barulhento:\n\n1. **Não ligue mais o PC** até o diagnóstico — cada boot é um risco\n2. **Backup emergencial** — Se o HD ainda lê, copiamos os dados prioritários primeiro\n3. **Clonagem** — Para HDs com setores ruins, usamos ferramentas de clonagem bit-a-bit\n4. **Migração para SSD** — Instalamos SSD novo com seus dados e sistema operacional\n5. **Casos graves** — Encaminhamos para laboratório de recuperação em sala limpa\n\nSempre preservamos o HD original como último recurso até confirmar que todos os dados foram recuperados.",
  "quandoCompensa": "Sempre vale diagnosticar — o custo do diagnóstico é mínimo comparado ao valor dos dados. Se a clonagem funcionar (R$ 200-600), é excelente custo-benefício.",
  "quandoNaoCompensa": "Quando o HD precisa de sala limpa (R$ 2.000-5.000+), vale avaliar se os dados justificam o investimento. Para dados substituíveis, melhor comprar SSD novo.",
  "whatsappMessage": "Olá! O HD do meu computador está fazendo barulho estranho e estou preocupado com meus dados. É urgente!",
  "relatedPages": [
    {
      "to": "/problemas/erro-disco-cheio-curitiba",
      "label": "Disco Cheio"
    },
    {
      "to": "/problemas/computador-lento-curitiba",
      "label": "Computador Lento"
    },
    {
      "to": "/servicos/backup-recuperacao",
      "label": "Backup e Recuperação"
    },
    {
      "to": "/servicos/upgrade-ssd-memoria",
      "label": "Upgrade SSD"
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
  "conteudoExtra": "## URGENTE: O Que Fazer Agora Se Seu HD Está Barulhento\n\n### Ação Imediata\n\n1. **DESLIGUE o computador** — Não \"normalmente\", pode desligar direto no botão se necessário\n2. **NÃO ligue de novo** para \"ver se melhorou\" — cada tentativa pode ser a última\n3. **NÃO tente software de recuperação** — Em falha mecânica, isso piora o dano\n4. **NÃO congele o HD** — Mito perigoso. Condensação destrói os pratos\n5. **NÃO abra o HD** — Poeira microscópica inutiliza os dados\n6. **Ligue para um técnico** — Diagnóstico urgente\n\n### Guia Sonoro: O Que Cada Barulho Significa\n\n| Barulho | Significado | Gravidade | Ação |\n|---|---|---|---|\n| Click-click-click | Cabeça não posiciona | CRÍTICA | Desligue AGORA |\n| Rangido contínuo | Motor travando | ALTA | Desligue em breve |\n| Estalos esporádicos | Setores ruins | ALTA | Backup urgente |\n| Zumbido alto | Motor com esforço | MÉDIA | Agende diagnóstico |\n| Silêncio total | Motor não gira | CRÍTICA | HD já parou |\n\n### HD vs. SSD: Por Que Migrar\n\n| Característica | HD (mecânico) | SSD (estado sólido) |\n|---|---|---|\n| Partes móveis | Sim (motor, cabeças) | Não |\n| Risco de falha mecânica | Alto após 3-5 anos | Zero |\n| Barulho | Sim | Silencioso |\n| Velocidade | 80-150 MB/s | 500-3.500 MB/s |\n| Resistência a queda | Baixa | Alta |\n| Vida útil | 3-5 anos típicos | 5-10 anos típicos |\n\n### Quanto Valem Seus Dados?\n\nAntes de decidir se vale investir em recuperação, considere:\n\n- **Fotos de família** — Insubstituíveis. Qualquer custo justificado\n- **Documentos de trabalho** — Podem custar muito mais que a recuperação\n- **Downloads e programas** — Podem ser baixados de novo\n- **Sistema operacional** — Reinstalável\n\n### Prevenção: Como Evitar Perder Dados\n\n1. **Backup 3-2-1**: 3 cópias, 2 mídias diferentes, 1 fora de casa (nuvem)\n2. **Migre para SSD**: Sem partes mecânicas = sem risco de falha mecânica\n3. **Monitore o SMART**: CrystalDiskInfo (gratuito) avisa antes do HD falhar\n4. **Nobreak**: Protege contra queda de energia que pode danificar o HD\n5. **Não mova o PC ligado**: Vibrações danificam o HD em operação"
};
