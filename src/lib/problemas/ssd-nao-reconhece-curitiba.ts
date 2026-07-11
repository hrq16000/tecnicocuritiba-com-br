import type { ProblemaPageData } from "./types";

export const problema: ProblemaPageData = {
  "slug": "ssd-nao-reconhece-curitiba",
  "title": "SSD Não Reconhece em Curitiba — Diagnóstico e Recuperação",
  "metaDescription": "SSD não reconhece no PC? Técnico em Curitiba diagnostica falha de firmware, BIOS, partição e recupera dados. Atendimento profissional com garantia.",
  "h1": "SSD Não Reconhece — Diagnóstico e Solução em Curitiba",
  "categoria": "Hardware",
  "intro": "O SSD não aparece no Windows, não é detectado na BIOS ou sumiu do dia para a noite. SSDs são mais confiáveis que HDs mecânicos, mas também falham — e quando falham, podem perder dados sem aviso.\n\nAs causas variam: BIOS desatualizada, modo AHCI desativado, partição corrompida, cabo/slot defeituoso ou falha de firmware. Em SSDs M.2 NVMe, incompatibilidade de slot é muito comum.\n\nNosso técnico em Curitiba diagnostica com precisão, recupera dados quando possível e resolve o problema — seja configuração, hardware ou substituição.",
  "sintomas": [
    {
      "titulo": "SSD não aparece na BIOS/UEFI",
      "desc": "Problema físico: cabo SATA defeituoso, slot M.2 incompatível, SSD com firmware corrompido ou componente queimado.",
      "gravidade": "Complexo"
    },
    {
      "titulo": "SSD aparece na BIOS mas não no Windows",
      "desc": "Partição não inicializada, sistema de arquivos corrompido ou letra de unidade não atribuída. Geralmente resolvível.",
      "gravidade": "Simples"
    },
    {
      "titulo": "SSD fica sumindo intermitentemente",
      "desc": "Mau contato no cabo SATA, slot M.2 com problema ou SSD com células NAND degradadas em estágio inicial de falha.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Windows não inicia após instalar SSD",
      "desc": "Modo de boot (UEFI/Legacy) incompatível, prioridade de boot errada ou falta de driver NVMe na instalação.",
      "gravidade": "Médio"
    },
    {
      "titulo": "SSD detectado com capacidade errada",
      "desc": "Firmware corrompido mostra capacidade incorreta (ex: 2TB aparece como 8MB). Requer reparo de firmware ou RMA.",
      "gravidade": "Complexo"
    },
    {
      "titulo": "Lentidão extrema após SSD reconhecer",
      "desc": "SSD com TRIM desativado, modo IDE em vez de AHCI, ou células NAND com muitas escritas (desgaste).",
      "gravidade": "Médio"
    }
  ],
  "causas": [
    {
      "titulo": "Cabo SATA defeituoso ou porta danificada",
      "desc": "Cabos SATA são frágeis e perdem contato. Portas SATA da placa-mãe podem queimar por oscilação elétrica.",
      "tipo": "hardware"
    },
    {
      "titulo": "Slot M.2 incompatível",
      "desc": "SSD NVMe em slot que só suporta SATA M.2, ou vice-versa. Placa-mãe pode ter slots M.2 com limitações.",
      "tipo": "erro-humano"
    },
    {
      "titulo": "BIOS desatualizada ou AHCI desativado",
      "desc": "BIOS antiga pode não reconhecer SSDs NVMe. Modo IDE em vez de AHCI impede detecção correta.",
      "tipo": "software"
    },
    {
      "titulo": "Partição corrompida ou não inicializada",
      "desc": "SSD novo sem inicialização ou tabela de partição corrompida por desligamento abrupto.",
      "tipo": "software"
    },
    {
      "titulo": "Firmware do SSD com bug",
      "desc": "Alguns modelos têm bugs de firmware que causam desaparecimento após certo tempo de uso ou número de escritas.",
      "tipo": "software"
    },
    {
      "titulo": "Desgaste de células NAND",
      "desc": "SSDs têm vida útil limitada de escritas. TLC/QLC em uso intensivo pode degradar após 3-5 anos.",
      "tipo": "desgaste"
    }
  ],
  "cenarios": [
    {
      "nivel": "Simples",
      "desc": "Inicialização de disco no Gerenciamento de Disco, ativação de AHCI na BIOS, troca de cabo SATA.",
      "tempo": "30-60 min",
      "custo": "R$80–R$130"
    },
    {
      "nivel": "Médio",
      "desc": "Atualização de BIOS, reparo de partição, configuração de boot UEFI, verificação de compatibilidade M.2.",
      "tempo": "1-3 horas",
      "custo": "R$130–R$230"
    },
    {
      "nivel": "Complexo",
      "desc": "Recuperação de dados de SSD com falha de firmware, reparo de controlador ou substituição com migração.",
      "tempo": "2-7 dias",
      "custo": "R$230–R$700"
    }
  ],
  "riscos": [
    "Perda total de dados se o SSD falhar completamente sem backup",
    "Inicializar disco errado no Gerenciamento de Disco e apagar dados",
    "Forçar SSD NVMe em slot M.2 SATA e danificar conector",
    "Atualização de firmware mal sucedida pode briquear o SSD"
  ],
  "diagnostico": "Verificamos detecção na BIOS primeiro. Testamos com outro cabo SATA ou slot M.2 para isolar problema físico. Checamos compatibilidade do slot (NVMe vs SATA M.2).\n\nAnalisamos saúde do SSD com ferramentas do fabricante (Samsung Magician, Crucial Storage Executive, CrystalDiskInfo). Verificamos SMART para identificar desgaste e erros.\n\nO diagnóstico custa a partir de R$50, abatido do serviço aprovado.",
  "solucao": "Para problemas de configuração: ativamos AHCI, atualizamos BIOS e inicializamos o disco corretamente. Cabo defeituoso é substituído.\n\nPara SSDs com desgaste: monitoramos saúde e orientamos backup e substituição preventiva antes da falha total. Migramos sistema e dados para o novo SSD.\n\nEm casos de falha de firmware: tentamos reparo com ferramentas do fabricante. Quando possível, recuperamos dados antes da substituição.",
  "quandoCompensa": "Sempre compensa quando o problema é configuração (BIOS, cabo, partição). SSDs de boa qualidade com pouco desgaste compensam reparo e recuperação.",
  "quandoNaoCompensa": "SSDs com SMART indicando falha iminente e desgaste extremo. Modelos baratos sem marca com controlador proprietário sem ferramentas de reparo.",
  "whatsappMessage": "Olá! Meu SSD não está sendo reconhecido. Preciso de diagnóstico técnico.",
  "relatedPages": [
    {
      "to": "/problemas/hd-externo-nao-reconhece-curitiba",
      "label": "HD Externo Não Reconhece"
    },
    {
      "to": "/upgrade-ssd-memoria-curitiba",
      "label": "Upgrade SSD e Memória"
    },
    {
      "to": "/problemas/computador-lento-curitiba",
      "label": "Computador Lento"
    },
    {
      "to": "/backup-recuperacao-curitiba",
      "label": "Backup e Recuperação"
    },
    {
      "to": "/servicos",
      "label": "Todos os Serviços"
    }
  ],
  "conteudoExtra": "## SSD SATA vs NVMe — Cuidados na Instalação\n\nSSDs M.2 existem em dois tipos: SATA e NVMe. Eles usam o mesmo conector físico mas são eletricamente diferentes. Verifique a compatibilidade do slot antes de comprar.\n\n## Vida Útil do SSD\n\nSSDs modernos duram 5-10 anos em uso normal. Use CrystalDiskInfo para monitorar a saúde. Quando atingir 80%+ de desgaste, faça backup e planeje a substituição."
};
