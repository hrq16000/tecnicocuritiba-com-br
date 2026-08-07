/**
 * Matriz operacional oficial dos serviços (fonte única de verdade).
 *
 * Toda página de serviço renderiza `<ServiceOperationalSpec path="..." />`,
 * que lê deste arquivo. Alterar valores/prazos AQUI propaga para todo o site
 * e evita divergências de preço, tempo e regras entre páginas.
 *
 * Valores derivam de `src/lib/coletaConfig.ts` — nunca duplicar números soltos.
 */
import {
  COLETA_TAXA_MINIMA_LABEL,
  DIAGNOSTICO_VALOR_LABEL,
  FRACAO_PRECO_LABEL,
  PRAZO_LONGO,
  PRAZO_RAPIDO,
  VISITA_MINIMA_LABEL,
} from "./coletaConfig";

export type Modalidade = "visita" | "remoto" | "coleta";

export interface ServiceSpec {
  /** Rota canônica da página de serviço */
  path: string;
  /** Nome comercial curto (usado no WhatsApp e no título do bloco) */
  nome: string;
  /** Valor inicial exibido (string já formatada) */
  valorInicial: string;
  /** Observação curta sobre como o valor evolui */
  valorRegra: string;
  /** Tempo estimado de execução / prazo */
  tempoEstimado: string;
  modalidade: Modalidade;
  incluso: string[];
  naoIncluso: string[];
  acrescimos: string[];
  observacoes: string[];
  /** Fotos/vídeos que o cliente deve enviar antes do atendimento */
  fotosNecessarias: string[];
  /** Regras que obrigam visita técnica ou orçamento personalizado */
  quandoVisitaOuOrcamento: string[];
}

const GARANTIA = "Garantia de 90 dias sobre a mão de obra. Peças seguem a garantia do fabricante.";
const APROVACAO = "Nenhum serviço é executado sem aprovação prévia do orçamento pelo WhatsApp.";
const SEM_DESLOCAMENTO_EXTRA = `Deslocamento incluso na taxa de ${VISITA_MINIMA_LABEL} dentro de Curitiba e região metropolitana atendida.`;

const visitaBase = {
  valorInicial: VISITA_MINIMA_LABEL,
  valorRegra: FRACAO_PRECO_LABEL,
  modalidade: "visita" as const,
};

const coletaBase = {
  valorInicial: COLETA_TAXA_MINIMA_LABEL,
  valorRegra: `Taxa mínima ${COLETA_TAXA_MINIMA_LABEL} pré-aprovada, com coleta e entrega inclusas. Em caso de desistência após o diagnóstico, cobra-se ${DIAGNOSTICO_VALOR_LABEL}.`,
  modalidade: "coleta" as const,
};

const fotosPadrao = [
  "Foto do equipamento ligado (ou da tentativa de ligar)",
  "Foto da etiqueta com marca e modelo",
  "Vídeo curto mostrando o defeito acontecendo",
];

const fotosColeta = [
  ...fotosPadrao,
  "Fotos das laterais e da traseira do aparelho (estado físico)",
];

const specs: ServiceSpec[] = [
  {
    ...visitaBase,
    path: "/servicos/formatacao-computador",
    nome: "Formatação de computador",
    tempoEstimado: "1h a 3h, conforme volume de dados e programas",
    incluso: [
      "Backup dos arquivos do usuário para mídia do cliente",
      "Instalação limpa do Windows e drivers",
      "Pacote básico (navegador, compactador, leitor de PDF)",
      "Atualizações e ajustes de desempenho",
    ],
    naoIncluso: [
      "Licenças de software pagas (Windows, Office, antivírus)",
      "HD/SSD externo para backup",
      "Recuperação de arquivos já apagados ou de disco danificado",
    ],
    acrescimos: [
      "Backup acima de 500 GB (tempo adicional por fração de 30 min)",
      "Reinstalação de programas específicos do cliente",
      "Troca de disco por SSD (peça à parte)",
    ],
    observacoes: [APROVACAO, GARANTIA, SEM_DESLOCAMENTO_EXTRA],
    fotosNecessarias: fotosPadrao,
    quandoVisitaOuOrcamento: [
      "Disco com falha física (barulho, travas, setores ruins) — vira orçamento personalizado",
      "Mais de um equipamento no mesmo endereço — orçamento combinado",
    ],
  },
  {
    ...visitaBase,
    path: "/servicos/remocao-virus",
    nome: "Remoção de vírus e malware",
    tempoEstimado: "1h a 2h na maioria dos casos",
    incluso: [
      "Varredura completa e remoção de vírus, trojans e spyware",
      "Limpeza de inicialização e extensões de navegador",
      "Antivírus configurado com proteção em tempo real",
      "Orientação de segurança para o usuário",
    ],
    naoIncluso: [
      "Licença de antivírus pago",
      "Recuperação de arquivos criptografados por ransomware sem backup",
      "Formatação (cobrada como serviço próprio quando necessária)",
    ],
    acrescimos: [
      "Sistema muito comprometido exigindo formatação",
      "Limpeza de mais de um equipamento",
    ],
    observacoes: [APROVACAO, GARANTIA, "Recomendamos backup antes de qualquer limpeza profunda."],
    fotosNecessarias: fotosPadrao,
    quandoVisitaOuOrcamento: [
      "Ransomware com arquivos já criptografados — orçamento personalizado após análise",
      "Rede com vários dispositivos infectados — atendimento avaliado como projeto",
    ],
  },
  {
    ...visitaBase,
    path: "/servicos/upgrade-ssd-memoria",
    nome: "Upgrade de SSD e memória",
    tempoEstimado: "40 min a 2h (clonagem pode estender o prazo)",
    incluso: [
      "Instalação física da peça",
      "Clonagem do sistema para o novo SSD quando aplicável",
      "Testes de leitura/escrita e estabilidade",
      "Ajustes de BIOS e inicialização",
    ],
    naoIncluso: [
      "Valor das peças (SSD, memória) — cotadas à parte",
      "Licenças de software",
    ],
    acrescimos: [
      "Clonagem de discos acima de 1 TB",
      "Notebooks que exigem desmontagem completa do gabinete",
    ],
    observacoes: [
      APROVACAO,
      GARANTIA,
      "Peça fornecida pelo cliente é aceita — garantia cobre apenas a mão de obra.",
    ],
    fotosNecessarias: fotosPadrao,
    quandoVisitaOuOrcamento: [
      "Modelo com memória soldada ou slot exclusivo — checagem prévia obrigatória",
      "Upgrade em lote (empresas) — orçamento personalizado",
    ],
  },
  {
    ...visitaBase,
    path: "/servicos/conserto-pc-notebook",
    nome: "Conserto de PC e notebook",
    tempoEstimado: "Diagnóstico em até 1h; reparo conforme a peça",
    incluso: [
      "Diagnóstico técnico presencial",
      "Limpeza básica e verificação de temperatura",
      "Relatório do que foi encontrado e próximo passo",
    ],
    naoIncluso: ["Peças de reposição", "Reparo em nível de placa (feito em laboratório)"],
    acrescimos: [
      "Troca de peças (cotadas à parte)",
      "Tempo adicional por fração de 30 min",
    ],
    observacoes: [APROVACAO, GARANTIA, SEM_DESLOCAMENTO_EXTRA],
    fotosNecessarias: fotosPadrao,
    quandoVisitaOuOrcamento: [
      "Defeito intermitente que não se reproduz na visita — segue para coleta",
      "Suspeita de falha na placa-mãe — orçamento personalizado em laboratório",
    ],
  },
  {
    ...visitaBase,
    path: "/servicos/conserto-notebook-curitiba",
    nome: "Conserto de notebook",
    tempoEstimado: "Diagnóstico em até 1h; reparo conforme a peça",
    incluso: [
      "Diagnóstico presencial do notebook",
      "Limpeza de ventilação e troca de pasta térmica quando aplicável",
      "Testes de bateria, carregador e tela",
    ],
    naoIncluso: ["Peças (tela, bateria, teclado, carregador)", "Reparo de placa (laboratório)"],
    acrescimos: ["Desmontagem completa", "Troca de tela ou teclado (peça à parte)"],
    observacoes: [APROVACAO, GARANTIA, SEM_DESLOCAMENTO_EXTRA],
    fotosNecessarias: fotosPadrao,
    quandoVisitaOuOrcamento: [
      "Notebook que não liga ou desliga sozinho — exige coleta para bancada",
      "Aparelho que sofreu queda ou contato com líquido — orçamento personalizado",
    ],
  },
  {
    ...visitaBase,
    path: "/servicos/computador-lento",
    nome: "Computador lento — otimização",
    tempoEstimado: "1h a 2h",
    incluso: [
      "Análise de inicialização, disco, memória e temperatura",
      "Limpeza de arquivos temporários e programas desnecessários",
      "Ajuste de energia e serviços do Windows",
      "Relatório com recomendação de upgrade quando fizer sentido",
    ],
    naoIncluso: ["Peças de upgrade", "Formatação (serviço próprio)"],
    acrescimos: ["Formatação quando a lentidão vem de sistema corrompido", "Instalação de SSD"],
    observacoes: [APROVACAO, GARANTIA],
    fotosNecessarias: fotosPadrao,
    quandoVisitaOuOrcamento: [
      "Lentidão causada por disco em falha — orçamento personalizado com troca de peça",
    ],
  },
  {
    ...visitaBase,
    path: "/servicos/computador-nao-liga",
    nome: "Computador não liga",
    tempoEstimado: "Diagnóstico em até 1h",
    incluso: [
      "Teste de fonte, botão, memória e placa de vídeo",
      "Verificação de alimentação e curto aparente",
      "Relatório com causa provável e próximo passo",
    ],
    naoIncluso: ["Peças (fonte, memória, placa)", "Reparo em nível de componente"],
    acrescimos: ["Troca de fonte ou peça (cotada à parte)"],
    observacoes: [
      APROVACAO,
      GARANTIA,
      "Se o defeito for na placa-mãe, o serviço segue para laboratório com coleta.",
    ],
    fotosNecessarias: fotosPadrao,
    quandoVisitaOuOrcamento: [
      "Sem sinal de energia após teste de fonte — coleta obrigatória para bancada",
      "Equipamento que já foi aberto por terceiros — orçamento personalizado",
    ],
  },
  {
    ...visitaBase,
    path: "/servicos/redes-wifi",
    nome: "Redes e Wi-Fi",
    tempoEstimado: "1h a 3h conforme o número de pontos",
    incluso: [
      "Diagnóstico de cobertura e interferência",
      "Configuração de roteador, canais e senha",
      "Segmentação de rede de visitantes",
      "Teste de velocidade por ambiente",
    ],
    naoIncluso: [
      "Equipamentos (roteador, repetidor, switch, cabos)",
      "Infraestrutura civil (furos, canaletas, forro)",
      "Suporte ao plano da operadora",
    ],
    acrescimos: [
      "Passagem de cabo de rede",
      "Ambientes acima de 120 m² ou mais de um pavimento",
      "Instalação de pontos adicionais",
    ],
    observacoes: [
      APROVACAO,
      GARANTIA,
      "Não realizamos trabalho em altura acima de 3 m nem intervenção estrutural.",
    ],
    fotosNecessarias: [
      "Foto do roteador e da entrada da operadora",
      "Foto dos ambientes com sinal fraco",
      "Planta ou descrição do imóvel (metragem e pavimentos)",
    ],
    quandoVisitaOuOrcamento: [
      "Projetos com cabeamento estruturado — orçamento personalizado após visita",
      "Imóveis com laje, paredes de concreto ou múltiplos andares — visita obrigatória",
    ],
  },
  {
    ...visitaBase,
    path: "/servicos/backup-recuperacao",
    nome: "Backup e recuperação de dados",
    tempoEstimado: "1h a 3h para backup; recuperação conforme o caso",
    incluso: [
      "Mapeamento dos dados críticos",
      "Configuração de rotina de backup local ou em nuvem",
      "Teste de restauração",
      "Orientação de responsabilidades e credenciais",
    ],
    naoIncluso: [
      "Mídias e assinaturas de nuvem",
      "Recuperação em sala limpa (disco com falha mecânica)",
    ],
    acrescimos: [
      "Volume acima de 1 TB",
      "Recuperação lógica de arquivos apagados",
    ],
    observacoes: [
      APROVACAO,
      "Recuperação de dados não tem resultado garantido — o diagnóstico informa a chance real antes de qualquer cobrança de reparo.",
    ],
    fotosNecessarias: [
      "Foto do equipamento e da etiqueta de modelo",
      "Print do erro ou da tela de disco não reconhecido",
    ],
    quandoVisitaOuOrcamento: [
      "Disco com ruído ou não reconhecido pela BIOS — coleta e orçamento personalizado",
      "Servidores e NAS empresariais — orçamento personalizado",
    ],
  },
  {
    ...visitaBase,
    path: "/servicos/montagem-pc",
    nome: "Montagem de computador",
    tempoEstimado: "2h a 4h de bancada, com testes",
    incluso: [
      "Montagem completa com organização de cabos",
      "Instalação do sistema e drivers",
      "Checklist de 7 etapas com testes de estabilidade e temperatura",
      "Termo de aceite e checklist em PDF",
    ],
    naoIncluso: [
      "Peças e componentes",
      "Overclock (não realizamos)",
      "Promessa de desempenho em jogos ou benchmarks específicos",
    ],
    acrescimos: ["Refrigeração líquida", "Migração de dados do PC antigo"],
    observacoes: [
      APROVACAO,
      "Peças fornecidas pelo cliente são aceitas: a garantia da peça é do fabricante/vendedor, a nossa cobre a mão de obra.",
      GARANTIA,
    ],
    fotosNecessarias: [
      "Lista ou fotos das notas fiscais das peças",
      "Foto das peças ainda lacradas quando fornecidas pelo cliente",
    ],
    quandoVisitaOuOrcamento: [
      "Configurações workstation ou uso profissional — orçamento personalizado",
      "Peças incompatíveis identificadas na conferência — nova aprovação do cliente",
    ],
  },
  {
    ...coletaBase,
    path: "/servicos/conserto-celular",
    nome: "Conserto de celular",
    tempoEstimado: PRAZO_RAPIDO,
    incluso: [
      "Coleta e entrega no endereço do cliente",
      "Diagnóstico em bancada",
      "Testes finais de tela, botões, câmera e carga",
    ],
    naoIncluso: ["Peças de reposição", "Recuperação de dados de aparelho sem acesso"],
    acrescimos: ["Aparelhos com oxidação", "Troca de tela ou placa (peça à parte)"],
    observacoes: [
      APROVACAO,
      "Sem visita técnica: o serviço é feito em laboratório com coleta e entrega.",
      GARANTIA,
    ],
    fotosNecessarias: fotosColeta,
    quandoVisitaOuOrcamento: [
      "Tela quebrada, aparelho molhado ou que não liga — coleta obrigatória",
      "Reparo em placa — orçamento personalizado após diagnóstico",
    ],
  },
  {
    ...coletaBase,
    path: "/servicos/conserto-tv",
    nome: "Conserto de TV",
    tempoEstimado: PRAZO_LONGO,
    incluso: [
      "Coleta e entrega no endereço do cliente",
      "Diagnóstico em bancada",
      "Testes de imagem, som e conectividade",
    ],
    naoIncluso: ["Peças (placas, fontes, backlight)", "Troca de painel/tela"],
    acrescimos: ["TVs acima de 55\" (logística)", "Peças importadas com prazo de importação"],
    observacoes: [
      APROVACAO,
      "Sem visita técnica para TV. Aparelhos com tela trincada não têm reparo de painel.",
      `Em caso de desistência após diagnóstico, cobra-se ${DIAGNOSTICO_VALOR_LABEL}.`,
    ],
    fotosNecessarias: fotosColeta,
    quandoVisitaOuOrcamento: [
      "TV que não liga, desliga sozinha ou ficou sem imagem — coleta obrigatória",
      "Necessidade de peça específica de fabricante — orçamento personalizado",
    ],
  },
  {
    ...coletaBase,
    path: "/servicos/manutencao-tv",
    nome: "Manutenção de TV",
    tempoEstimado: PRAZO_LONGO,
    incluso: [
      "Coleta e entrega",
      "Limpeza interna e revisão de conectores",
      "Atualização de firmware quando disponível",
      "Testes finais de imagem e som",
    ],
    naoIncluso: ["Peças", "Painel/tela", "Instalação de suporte de parede"],
    acrescimos: ["TVs acima de 55\"", "Reparo de placa detectado na revisão"],
    observacoes: [APROVACAO, "Sem visita técnica: serviço em laboratório com coleta e entrega.", GARANTIA],
    fotosNecessarias: fotosColeta,
    quandoVisitaOuOrcamento: [
      "Defeito identificado durante a revisão — orçamento personalizado antes de continuar",
    ],
  },
  {
    ...coletaBase,
    path: "/servicos/conserto-placa",
    nome: "Reparo de placa (nível componente)",
    tempoEstimado: PRAZO_LONGO,
    incluso: [
      "Coleta e entrega",
      "Diagnóstico com medição de trilhas e componentes",
      "Retrabalho de solda quando viável",
      "Testes de carga após o reparo",
    ],
    naoIncluso: ["Componentes e chips", "Reparo com resultado garantido em placas oxidadas"],
    acrescimos: ["Placas com oxidação avançada", "Chips com prazo de importação"],
    observacoes: [
      APROVACAO,
      "Reparo em nível de componente é sempre orçamento personalizado após diagnóstico em bancada.",
      `Em caso de desistência, cobra-se ${DIAGNOSTICO_VALOR_LABEL}.`,
    ],
    fotosNecessarias: fotosColeta,
    quandoVisitaOuOrcamento: [
      "Todo reparo de placa exige coleta — não há atendimento a domicílio",
      "Placas com dano físico visível — orçamento personalizado obrigatório",
    ],
  },
];

export const SERVICE_SPECS: Record<string, ServiceSpec> = Object.fromEntries(
  specs.map((s) => [s.path, s]),
);

export const getServiceSpec = (path: string): ServiceSpec | undefined => SERVICE_SPECS[path];

export const SERVICE_SPEC_PATHS = specs.map((s) => s.path);
