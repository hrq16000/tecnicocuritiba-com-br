import type { ProblemaPageData } from "./types";

export const problema: ProblemaPageData = {
  "slug": "notebook-apos-upgrade-nao-liga-curitiba",
  "title": "Notebook Não Liga Após Upgrade | Curitiba",
  "metaDescription": "Fez upgrade de SSD ou RAM e o notebook não liga? Veja causas e soluções. Diagnóstico em Curitiba.",
  "h1": "Notebook Não Liga Após Upgrade em Curitiba — O Que Aconteceu?",
  "categoria": "Notebook",
  "intro": "Você instalou SSD novo, adicionou RAM ou fez alguma modificação e agora o notebook não liga? Isso é mais comum do que parece. Peças incompatíveis, instalação incorreta ou componente danificado durante a montagem são as causas mais frequentes.\n\nAntes de entrar em pânico, saiba que na maioria dos casos o problema é reversível. Mas é importante não continuar tentando sem saber o que está acontecendo.",
  "sintomas": [
    {
      "titulo": "Não liga após trocar RAM",
      "desc": "RAM incompatível, mal encaixada ou voltagem diferente.",
      "gravidade": "Simples"
    },
    {
      "titulo": "Não liga após instalar SSD",
      "desc": "SSD pode estar incompatível (NVMe vs SATA) ou cabo de dados com problema.",
      "gravidade": "Simples"
    },
    {
      "titulo": "Liga mas BIOS não reconhece o SSD/RAM",
      "desc": "Incompatibilidade ou slot/porta com defeito.",
      "gravidade": "Simples a médio"
    },
    {
      "titulo": "Não liga mais de jeito nenhum",
      "desc": "Pode ter causado curto ou danificado conector durante a instalação.",
      "gravidade": "Médio a complexo"
    }
  ],
  "causas": [
    {
      "titulo": "Peça incompatível",
      "desc": "RAM DDR4 em slot DDR3, SSD NVMe em slot SATA M.2, ou frequência incompatível.",
      "tipo": "erro-humano"
    },
    {
      "titulo": "Instalação incorreta",
      "desc": "Módulo mal encaixado, conector forçado ou parafuso muito apertado.",
      "tipo": "erro-humano"
    },
    {
      "titulo": "Descarga eletrostática",
      "desc": "Manusear componentes sem proteção antiestática pode queimar chips.",
      "tipo": "erro-humano"
    },
    {
      "titulo": "Dano ao conector ou flex",
      "desc": "Ao abrir o notebook, algum flex ou conector pode ter sido danificado.",
      "tipo": "erro-humano"
    }
  ],
  "cenarios": [
    {
      "nivel": "Simples",
      "desc": "Reencaixe correto da peça ou troca por modelo compatível.",
      "tempo": "30 min a 1h",
      "custo": "R$ 99,99 a R$ 150"
    },
    {
      "nivel": "Médio",
      "desc": "Reverter upgrade, identificar e substituir peça incompatível.",
      "tempo": "1h a 2h",
      "custo": "R$ 150 a R$ 300"
    },
    {
      "nivel": "Complexo",
      "desc": "Reparo de dano causado durante a instalação (conector, flex, placa).",
      "tempo": "2 a 7 dias",
      "custo": "R$ 250 a R$ 600+"
    }
  ],
  "riscos": [
    "Forçar peça incompatível pode danificar o slot permanentemente",
    "Continuar tentando pode piorar o dano"
  ],
  "diagnostico": "Análise da peça instalada, verificação de compatibilidade, inspeção de conectores e componentes adjacentes. Custo: R$ 99,99.",
  "solucao": "Identificação do problema (incompatibilidade, mau encaixe ou dano) e correção. Na maioria dos casos, é resolvido rapidamente.",
  "quandoCompensa": "Quase sempre — o notebook geralmente não está danificado, apenas com peça errada.",
  "quandoNaoCompensa": "Se houve curto e dano à placa-mãe durante o upgrade amador.",
  "whatsappMessage": "Olá! Fiz um upgrade e agora meu notebook não liga. Podem me ajudar?",
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
      "label": "Erros de Upgrade",
      "to": "/problemas/erros-comuns-em-upgrade"
    },
    {
      "label": "Upgrade SSD",
      "to": "/servicos/upgrade-ssd-memoria"
    },
    {
      "label": "Upgrade Deu Problema",
      "to": "/problemas/upgrade-deu-problema"
    }
  ],
  "conteudoExtra": "### Antes de Fazer Upgrade: Checklist\n\n1. Verifique a compatibilidade EXATA (modelo, geração, interface)\n2. Use pulseira antiestática\n3. Fotografe tudo antes de desmontar\n4. Não force nenhuma peça — se não encaixa facilmente, pode ser incompatível\n5. Guarde as peças originais para reverter se necessário"
};
