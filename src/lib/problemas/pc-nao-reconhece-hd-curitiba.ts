import type { ProblemaPageData } from "./types";

export const problema: ProblemaPageData = {
  "slug": "pc-nao-reconhece-hd-curitiba",
  "title": "PC Não Reconhece HD/SSD em Curitiba | Diagnóstico",
  "metaDescription": "Computador não reconhece HD ou SSD? Veja causas e soluções profissionais em Curitiba. Diagnóstico e recuperação de dados.",
  "h1": "PC Não Reconhece HD ou SSD em Curitiba — Causas e Soluções",
  "categoria": "Problemas de Computador",
  "intro": "Quando o computador não reconhece o HD ou SSD, o resultado é que o Windows não carrega, os dados ficam inacessíveis e o pânico bate. Mas calma — na maioria dos casos, os dados ainda estão lá, só o acesso que foi comprometido.\n\nAs causas vão desde cabo SATA solto (2 minutos para resolver) até falha eletrônica do disco (requer bancada). O diagnóstico profissional identifica a causa exata e define a melhor abordagem.",
  "sintomas": [
    {
      "titulo": "HD não aparece no Windows",
      "desc": "O disco existe na BIOS mas não aparece em 'Meu Computador'. Pode ser partição corrompida ou sistema de arquivos danificado.",
      "gravidade": "Simples a médio"
    },
    {
      "titulo": "HD não aparece na BIOS",
      "desc": "O disco simplesmente não é detectado. Cabo solto, porta SATA com defeito, ou disco com falha eletrônica.",
      "gravidade": "Médio a complexo"
    },
    {
      "titulo": "SSD não reconhece após upgrade",
      "desc": "SSD novo instalado mas não aparece. Compatibilidade (SATA vs NVMe), BIOS não configurada ou SSD com defeito de fábrica.",
      "gravidade": "Simples"
    },
    {
      "titulo": "Mensagem 'No boot device'",
      "desc": "BIOS não encontra sistema para iniciar. HD/SSD desconectado, boot corrompido ou disco falhando.",
      "gravidade": "Médio"
    }
  ],
  "causas": [
    {
      "titulo": "Cabo SATA ou de dados solto",
      "desc": "Vibração ou manutenção anterior pode ter soltado o cabo. A solução mais simples e mais ignorada.",
      "tipo": "hardware"
    },
    {
      "titulo": "HD com falha mecânica",
      "desc": "Motor travado, cabeça de leitura danificada ou placa controladora queimada.",
      "tipo": "hardware"
    },
    {
      "titulo": "Partição ou sistema de arquivos corrompido",
      "desc": "O disco funciona mas os dados ficam inacessíveis por corrupção lógica.",
      "tipo": "software"
    },
    {
      "titulo": "Incompatibilidade de interface",
      "desc": "SSD NVMe em slot que só aceita SATA, ou vice-versa. Erro comum em upgrades feitos por conta.",
      "tipo": "erro-humano"
    }
  ],
  "cenarios": [
    {
      "nivel": "Simples",
      "desc": "Reencaixe de cabo, configuração de BIOS, formatação de partição.",
      "tempo": "30 min a 1h",
      "custo": "R$ 99,99 a R$ 150"
    },
    {
      "nivel": "Médio",
      "desc": "Recuperação de partição, reparo de boot, migração de dados.",
      "tempo": "2h a 6h",
      "custo": "R$ 200 a R$ 400"
    },
    {
      "nivel": "Complexo",
      "desc": "Recuperação de dados de HD com falha mecânica ou eletrônica.",
      "tempo": "5 a 15 dias",
      "custo": "R$ 500 a R$ 2000+"
    }
  ],
  "riscos": [
    "Tentativas caseiras de recuperação podem sobrescrever dados e torná-los irrecuperáveis",
    "Software de recuperação errado pode piorar a corrupção",
    "Abrir HD em ambiente não controlado destrói as superfícies de leitura"
  ],
  "diagnostico": "Teste de cabo e portas, verificação de BIOS, leitura de SMART do disco, tentativa de acesso via Linux live USB, análise de partições. Custo: R$ 99,99.",
  "solucao": "Para cabo solto: solução imediata. Para corrupção lógica: ferramentas profissionais de recuperação. Para falha mecânica: encaminhamento para laboratório especializado com ambiente controlado.",
  "quandoCompensa": "Depende da importância dos dados. Para dados insubstituíveis (fotos, documentos profissionais), quase sempre compensa. Para dados substituíveis, pode ser mais barato formatar e reinstalar.",
  "quandoNaoCompensa": "Para HDs antigos sem dados importantes, é mais viável comprar um SSD novo.",
  "whatsappMessage": "Olá! Meu computador não reconhece o HD/SSD. Podem me ajudar?",
  "relatedPages": [
    {
      "label": "Como Funciona",
      "to": "/como-funciona"
    },
    {
      "label": "Preços e Políticas",
      "to": "/precos-e-politicas"
    },
    {
      "label": "Diagnóstico Técnico",
      "to": "/diagnostico-tecnico"
    },
    {
      "label": "Backup e Recuperação",
      "to": "/servicos/backup-recuperacao"
    },
    {
      "label": "Upgrade SSD",
      "to": "/servicos/upgrade-ssd-memoria"
    },
    {
      "label": "Barulho Estranho",
      "to": "/problemas/pc-com-barulho-estranho-curitiba"
    }
  ],
  "conteudoExtra": "### Seus Dados Podem Estar Salvos\n\nNa maioria dos casos em que o HD \"não é reconhecido\", os dados ainda existem no disco — apenas o acesso foi perdido. Um técnico profissional pode recuperar esses dados antes de qualquer formatação.\n\nRegra de ouro: não formate o disco antes de tentar recuperar os dados."
};
