import type { ProblemaPageData } from "./types";

export const problema: ProblemaPageData = {
  "slug": "pc-fazendo-barulho-estranho-curitiba",
  "title": "PC Fazendo Barulho Estranho em Curitiba | Diagnóstico Profissional",
  "metaDescription": "Computador fazendo barulho estranho? Cliques, zumbido, chiado ou vibração? Técnico em Curitiba identifica a origem e resolve. Diagnóstico rápido e preciso.",
  "h1": "PC Fazendo Barulho Estranho — Diagnóstico e Reparo em Curitiba",
  "categoria": "Hardware — Mecânico",
  "intro": "Seu computador começou a fazer barulhos estranhos — cliques, zumbidos, chiados, vibrações ou roncos? Qualquer ruído incomum é um sinal de alerta que não deve ser ignorado. O tipo de barulho indica exatamente qual componente está com problema e qual a urgência do reparo.\n\nCliques repetitivos podem indicar um HD mecânico em falha iminente (e seus dados em risco). Zumbido alto pode ser uma ventoinha com rolamento desgastado. Chiado elétrico (coil whine) geralmente vem da placa de vídeo ou fonte sob carga. Vibração excessiva pode ser uma ventoinha desbalanceada ou parafuso solto.\n\nEm Curitiba, o diagnóstico acústico é parte essencial do nosso atendimento. Com experiência, conseguimos identificar a origem do barulho sem sequer abrir o gabinete em muitos casos. Mas o diagnóstico completo envolve isolar cada componente para confirmar a fonte exata.",
  "sintomas": [
    {
      "titulo": "Cliques rítmicos e repetitivos",
      "desc": "Som de 'tec-tec-tec' em intervalos regulares. URGENTE: forte indicativo de HD mecânico com cabeça de leitura danificada. Risco de perda total de dados.",
      "gravidade": "Crítica"
    },
    {
      "titulo": "Zumbido alto e constante",
      "desc": "Ruído contínuo como de motor. Geralmente uma ventoinha (cooler de CPU, GPU ou gabinete) com rolamento desgastado girando com atrito.",
      "gravidade": "Média"
    },
    {
      "titulo": "Chiado elétrico (coil whine)",
      "desc": "Som agudo de alta frequência, como um 'iiiii' fino. Vem de indutores na placa de vídeo ou fonte sob carga pesada. Geralmente não é defeito.",
      "gravidade": "Baixa"
    },
    {
      "titulo": "Vibração forte no gabinete",
      "desc": "O gabinete inteiro treme ou vibra. Pode ser ventoinha desbalanceada, HD sem amortecedor de borracha ou parafuso solto.",
      "gravidade": "Baixa-Média"
    },
    {
      "titulo": "Barulho de arranhar/raspar",
      "desc": "Som de algo raspando dentro do gabinete. Pode ser cabo encostando em ventoinha, ventoinha batendo na grade ou HD com prato danificado.",
      "gravidade": "Média-Alta"
    },
    {
      "titulo": "Estalidos ao ligar o PC",
      "desc": "Sons de estalo quando o computador é ligado. Pode ser relé da fonte acionando, capacitor estufado ou arco elétrico em conexão frouxa.",
      "gravidade": "Média"
    }
  ],
  "causas": [
    {
      "titulo": "HD mecânico com falha",
      "desc": "O disco rígido tem peças móveis que desgastam. Cliques indicam que a cabeça de leitura não consegue se posicionar — falha iminente e risco de perda de dados.",
      "tipo": "desgaste"
    },
    {
      "titulo": "Ventoinha com rolamento desgastado",
      "desc": "Coolers de CPU, GPU e gabinete têm rolamentos que desgastam após 3-5 anos. O barulho começa baixo e piora progressivamente.",
      "tipo": "desgaste"
    },
    {
      "titulo": "Cabo encostando na ventoinha",
      "desc": "Cabos de alimentação ou SATA podem cair e encostar nas pás da ventoinha, causando ruído de batida intermitente.",
      "tipo": "erro-humano"
    },
    {
      "titulo": "Fonte de alimentação com problema",
      "desc": "Fontes baratas ou velhas podem apresentar chiado (coil whine), estalidos ou zumbido. Ventoinhas de fonte também desgastam.",
      "tipo": "hardware"
    },
    {
      "titulo": "Parafusos soltos ou gabinete vibrando",
      "desc": "Parafusos de HD, SSD, ventoinha ou tampa do gabinete podem afrouxar com vibração, amplificando ruídos.",
      "tipo": "desgaste"
    },
    {
      "titulo": "Placa de vídeo com coil whine",
      "desc": "Indutores da GPU vibram microscopicamente sob carga pesada (jogos), emitindo som agudo. É normal em muitas GPUs, mas pode ser atenuado.",
      "tipo": "hardware"
    }
  ],
  "cenarios": [
    {
      "nivel": "Simples",
      "desc": "Organização de cabos + reaperto de parafusos + limpeza de ventoinhas. Resolve vibrações e barulhos mecânicos simples.",
      "tempo": "30-60 min",
      "custo": "R$ 80–150"
    },
    {
      "nivel": "Médio",
      "desc": "Troca de ventoinha defeituosa + lubrificação de rolamentos + amortecedores de HD.",
      "tempo": "1-2 horas",
      "custo": "R$ 120–300"
    },
    {
      "nivel": "Complexo",
      "desc": "Backup emergencial de HD clicando + migração para SSD + troca de fonte. Quando múltiplos componentes estão barulhentos.",
      "tempo": "1-3 dias",
      "custo": "R$ 250–700"
    }
  ],
  "riscos": [
    "HD clicando pode falhar totalmente a qualquer momento — faça backup IMEDIATO",
    "Ventoinha parada por rolamento travado causa superaquecimento e danos térmicos",
    "Ignorar vibração pode afrouxar conexões internas e causar mau contato",
    "Fonte com estalidos pode indicar arco elétrico — risco de curto-circuito",
    "Continuar usando HD barulhento reduz drasticamente as chances de recuperação de dados",
    "Cabo preso em ventoinha pode derreter por atrito e causar curto"
  ],
  "diagnostico": "Diagnóstico acústico e mecânico:\n\n1. Identificação da origem do barulho com PC ligado (escuta técnica)\n2. Teste individual de cada ventoinha (parar uma por vez com segurança)\n3. Verificação de saúde do HD (SMART, CrystalDiskInfo)\n4. Inspeção de cabos e parafusos internos\n5. Teste de fonte com multímetro e sob carga\n6. Verificação de coil whine em GPU sob stress test\n\nCusto: R$ 80 (incorporado se aprovar o serviço).",
  "solucao": "Solução conforme a origem:\n\n- **HD clicando**: Backup emergencial IMEDIATO + migração para SSD\n- **Ventoinha**: Troca por modelo silencioso ou lubrificação profissional\n- **Cabos**: Reorganização com abraçadeiras e afastamento de ventoinhas\n- **Parafusos**: Reaperto + uso de arruelas de borracha para amortecimento\n- **Fonte**: Troca por modelo silencioso com ventoinha de 120mm\n- **Coil whine**: Atenuação com ajuste de frame rate ou troca de fonte\n\nTeste de ruído comparativo antes e depois do reparo.",
  "quandoCompensa": "Quase sempre — troca de ventoinha ou organização de cabos custa R$ 80-200. Migração de HD para SSD elimina o barulho e melhora a performance.",
  "quandoNaoCompensa": "Quando o coil whine é inerente ao design da GPU e não indica defeito — nesse caso, é característica do hardware.",
  "whatsappMessage": "Olá! Meu PC está fazendo barulho estranho. Podem diagnosticar a origem?",
  "relatedPages": [
    {
      "to": "/problemas/hd-fazendo-barulho-curitiba",
      "label": "HD Fazendo Barulho"
    },
    {
      "to": "/problemas/notebook-esquentando-desligando-curitiba",
      "label": "Notebook Esquentando"
    },
    {
      "to": "/problemas/fonte-queimada-curitiba",
      "label": "Fonte Queimada"
    },
    {
      "to": "/servicos/conserto-pc-notebook",
      "label": "Conserto de PC"
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
  "conteudoExtra": "## Barulhos no PC: Guia de Identificação\n\n### Tabela de Sons e Causas\n\n| Som | Origem Provável | Urgência |\n|---|---|---|\n| Tec-tec-tec (clique) | HD mecânico | 🔴 Crítica |\n| Zumbido contínuo | Ventoinha | 🟡 Média |\n| Chiado agudo | Coil whine (GPU/fonte) | 🟢 Baixa |\n| Vibração/treme | Parafuso/HD solto | 🟡 Média |\n| Raspando/arranhando | Cabo na ventoinha | 🟠 Média-Alta |\n| Estalo ao ligar | Relé da fonte/capacitor | 🟡 Média |\n| Ronco intermitente | Ventoinha suja | 🟡 Média |\n\n### Como Reduzir Ruído do PC\n\n1. **Troque por ventoinhas silenciosas** (Noctua, Arctic, be quiet!)\n2. **Migre o HD para SSD** — elimina 100% do ruído do disco\n3. **Organize os cabos** — afaste de ventoinhas\n4. **Use amortecedores de borracha** em HDs e ventoinhas\n5. **Limpe as ventoinhas** a cada 6 meses\n6. **Considere gabinete com isolamento acústico**"
};
