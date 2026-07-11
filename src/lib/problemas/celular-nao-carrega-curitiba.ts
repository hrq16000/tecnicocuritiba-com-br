import type { ProblemaPageData } from "./types";

export const problema: ProblemaPageData = {
  "slug": "celular-nao-carrega-curitiba",
  "title": "Celular Não Carrega em Curitiba | Conserto de Carga",
  "metaDescription": "Celular não carrega ou carrega muito devagar? Conserto de conector USB, troca de bateria em Curitiba. Diagnóstico presencial na oficina.",
  "h1": "Celular Não Carrega — Conserto em Curitiba",
  "categoria": "Problemas de Celular",
  "intro": "Celular que não carrega é um problema que começa como inconveniente e rapidamente se torna urgente. O cabo não encaixa direito, a carga não sobe, ou o celular só carrega em determinada posição — esses são sinais de que algo precisa ser consertado.\n\nAs causas mais comuns são conector de carga sujo ou danificado, cabo/carregador incompatível, e bateria degradada. Em casos mais raros, pode ser problema no CI de carga (chip da placa responsável pelo carregamento).\n\nDiagnóstico e conserto presencial na oficina em Curitiba.",
  "sintomas": [
    {
      "titulo": "Cabo não encaixa ou fica frouxo",
      "desc": "O conector USB-C ou Lightning está desgastado, com sujeira acumulada ou trilhas danificadas.",
      "gravidade": "Simples"
    },
    {
      "titulo": "Carrega muito devagar",
      "desc": "O celular demora 4-6 horas para carregar completamente. Pode ser cabo fraco, carregador inadequado ou bateria degradada.",
      "gravidade": "Simples a médio"
    },
    {
      "titulo": "Só carrega em determinada posição",
      "desc": "Precisa segurar o cabo em ângulo específico. Conector com mau contato interno.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Mostra carregando mas não sobe",
      "desc": "O ícone de carregamento aparece mas a porcentagem não aumenta ou até diminui. Problema no CI de carga ou bateria.",
      "gravidade": "Médio a complexo"
    },
    {
      "titulo": "Esquenta muito ao carregar",
      "desc": "Calor excessivo durante carga indica bateria inchada, curto no conector ou carregador incompatível.",
      "gravidade": "Alto"
    }
  ],
  "causas": [
    {
      "titulo": "Sujeira no conector de carga",
      "desc": "Poeira, fiapos do bolso e oxidação acumulam no conector ao longo dos meses.",
      "tipo": "desgaste"
    },
    {
      "titulo": "Conector USB danificado",
      "desc": "Inserções e remoções diárias desgastam as trilhas internas do conector.",
      "tipo": "desgaste"
    },
    {
      "titulo": "Carregador ou cabo incompatível",
      "desc": "Carregadores genéricos podem não fornecer a amperagem correta, causando carga lenta ou instável.",
      "tipo": "erro-humano"
    },
    {
      "titulo": "Bateria degradada",
      "desc": "Bateria com ciclos excessivos não aceita carga completa ou se descarrega rapidamente.",
      "tipo": "desgaste"
    },
    {
      "titulo": "CI de carga queimado",
      "desc": "Chip na placa-mãe responsável por gerenciar a carga. Pode queimar com picos de tensão.",
      "tipo": "hardware"
    }
  ],
  "cenarios": [
    {
      "nivel": "Simples",
      "desc": "Limpeza profissional do conector de carga.",
      "tempo": "30 minutos",
      "custo": "R$ 50 a R$ 80"
    },
    {
      "nivel": "Médio",
      "desc": "Troca do conector de carga ou bateria.",
      "tempo": "1 a 3 horas",
      "custo": "R$ 100 a R$ 250"
    },
    {
      "nivel": "Complexo",
      "desc": "Troca do CI de carga (microssolda na placa).",
      "tempo": "2 a 5 dias",
      "custo": "R$ 200 a R$ 500"
    }
  ],
  "riscos": [
    "Continuar usando carregador incompatível pode queimar o CI de carga",
    "Bateria que esquenta excessivamente ao carregar pode inchar ou vazar",
    "Celular que não carrega eventualmente vai desligar e pode não ligar mais"
  ],
  "diagnostico": "Teste com fonte de bancada para medir consumo de energia, verificação de conector, teste de bateria e análise do CI de carga. Presencial na oficina.",
  "solucao": "Limpeza, troca de conector, troca de bateria ou reparo de placa, conforme diagnóstico.",
  "quandoCompensa": "Limpeza e troca de conector são baratos e resolvem 70% dos casos. Troca de bateria compensa em celulares de até 3 anos.",
  "quandoNaoCompensa": "CI de carga queimado em celular de baixo valor — o custo da microssolda pode não justificar.",
  "whatsappMessage": "Olá! Meu celular não está carregando. Podem fazer um diagnóstico?",
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
      "label": "Conserto de Celular",
      "to": "/servicos/conserto-celular"
    },
    {
      "label": "Celular Não Liga",
      "to": "/problemas/celular-nao-liga-curitiba"
    },
    {
      "label": "Celular Bateria Inchada",
      "to": "/problemas/celular-bateria-inchada-curitiba"
    }
  ],
  "conteudoExtra": "## Dicas Para Preservar o Conector e a Bateria\n\n1. **Limpe o conector periodicamente** — Use um palito de dente com cuidado para remover fiapos\n2. **Use carregador original ou certificado** — Evite carregadores genéricos de bancas\n3. **Não use o celular carregando** — Gera calor excessivo que degrada a bateria\n4. **Evite carregar até 100%** — Manter entre 20-80% prolonga a vida útil\n5. **Não deixe descarregar até 0%** — Descargas completas estressam a bateria"
};
