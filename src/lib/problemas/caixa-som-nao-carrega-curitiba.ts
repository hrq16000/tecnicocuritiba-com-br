import type { ProblemaPageData } from "./types";

export const problema: ProblemaPageData = {
  "slug": "caixa-som-nao-carrega-curitiba",
  "title": "Caixa de Som Não Carrega em Curitiba | Conserto",
  "metaDescription": "Caixa de som Bluetooth não carrega, bateria viciada ou conector quebrado? Conserto em Curitiba. JBL, Bose, Sony.",
  "h1": "Caixa de Som Não Carrega — Conserto em Curitiba",
  "categoria": "Problemas de Rádio / Som",
  "intro": "Caixa de som portátil que não carrega ou descarrega muito rápido. Pode ser conector USB danificado, bateria viciada ou circuito de carga com defeito.\n\n**Necessário trazer à oficina.**",
  "sintomas": [
    {
      "titulo": "Não carrega ao conectar cabo",
      "desc": "Nenhuma indicação de carga. Conector ou circuito de carga.",
      "gravidade": "Médio"
    },
    {
      "titulo": "LED de carga pisca e para",
      "desc": "Inicia carga mas desiste. Bateria ou controlador.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Bateria dura poucos minutos",
      "desc": "Antes durava horas, agora minutos. Bateria degradada.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Só funciona na tomada",
      "desc": "Liga com cabo mas desliga ao tirar. Bateria morta.",
      "gravidade": "Médio"
    }
  ],
  "causas": [
    {
      "titulo": "Conector USB-C/micro-USB danificado",
      "desc": "Uso intenso quebra ou entorta os pinos do conector de carga.",
      "tipo": "desgaste"
    },
    {
      "titulo": "Bateria degradada",
      "desc": "Baterias de lítio perdem capacidade após 300-500 ciclos.",
      "tipo": "desgaste"
    },
    {
      "titulo": "Circuito de carga (BMS) com defeito",
      "desc": "O chip controlador de carga pode queimar.",
      "tipo": "hardware"
    },
    {
      "titulo": "Cabo de carga defeituoso",
      "desc": "Cabo sem contato adequado não carrega.",
      "tipo": "erro-humano"
    }
  ],
  "cenarios": [
    {
      "nivel": "Simples",
      "desc": "Troca de conector de carga.",
      "tempo": "1 a 3 dias",
      "custo": "R$ 80 a R$ 200"
    },
    {
      "nivel": "Médio",
      "desc": "Troca de bateria.",
      "tempo": "3 a 10 dias",
      "custo": "R$ 150 a R$ 400"
    },
    {
      "nivel": "Complexo",
      "desc": "Reparo de circuito de carga (BMS).",
      "tempo": "5 a 15 dias",
      "custo": "R$ 200 a R$ 450"
    }
  ],
  "riscos": [
    "Bateria inchada é perigosa — não continue usando",
    "Usar carregador incompatível pode queimar o circuito de carga"
  ],
  "diagnostico": "Teste de conector, medição de bateria e circuito de carga. Presencial na oficina.",
  "solucao": "Troca de conector, bateria ou reparo do circuito de carga.",
  "quandoCompensa": "JBL, Bose, Sony, Marshall — peças disponíveis e custo acessível.",
  "quandoNaoCompensa": "Caixas genéricas sem bateria de reposição disponível.",
  "whatsappMessage": "Olá! Minha caixa de som não carrega. Podem consertar?",
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
      "label": "Caixa Sem Áudio",
      "to": "/problemas/caixa-som-sem-audio-curitiba"
    },
    {
      "label": "Caixa Sem Bluetooth",
      "to": "/problemas/caixa-som-sem-bluetooth-curitiba"
    }
  ],
  "conteudoExtra": "## Cuidados com a Bateria\n\n- Não deixe descarregar completamente\n- Evite carregar e usar ao mesmo tempo por longos períodos\n- Use carregador compatível (5V para maioria)\n- Se a bateria inchar, pare de usar imediatamente"
};
