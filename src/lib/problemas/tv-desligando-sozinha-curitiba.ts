import type { ProblemaPageData } from "./types";

export const problema: ProblemaPageData = {
  "slug": "tv-desligando-sozinha-curitiba",
  "title": "TV Desligando Sozinha em Curitiba | Diagnóstico",
  "metaDescription": "TV desligando sozinha? Veja causas: timer, superaquecimento, placa com defeito. Reparo em Curitiba.",
  "h1": "TV Desligando Sozinha em Curitiba — O Que Pode Ser?",
  "categoria": "TV / Eletrônicos",
  "intro": "TV que desliga sozinha pode ter causas simples (timer de desligamento automático, CEC ativado) ou complexas (capacitor estufado, superaquecimento interno). Antes de chamar o técnico, verifique as configurações de timer e modo econômico.",
  "sintomas": [
    {
      "titulo": "Desliga após tempo fixo",
      "desc": "Timer de desligamento automático ativado. Configuração do menu.",
      "gravidade": "Simples"
    },
    {
      "titulo": "Desliga aleatoriamente",
      "desc": "Capacitor estufado, placa com defeito ou superaquecimento.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Desliga e liga sozinha",
      "desc": "CEC (HDMI-CEC) ou dispositivo conectado enviando comando.",
      "gravidade": "Simples"
    }
  ],
  "causas": [
    {
      "titulo": "Timer/Sleep ativado",
      "desc": "Configuração de desligamento automático por inatividade.",
      "tipo": "software"
    },
    {
      "titulo": "HDMI-CEC ativo",
      "desc": "Outros dispositivos (chromecast, console) enviam comando de desligar.",
      "tipo": "software"
    },
    {
      "titulo": "Capacitores estufados",
      "desc": "Capacitores da fonte perdem capacidade e a TV desliga quando a tensão cai.",
      "tipo": "desgaste"
    },
    {
      "titulo": "Superaquecimento",
      "desc": "TV em local sem ventilação ou próxima a fonte de calor.",
      "tipo": "erro-humano"
    }
  ],
  "cenarios": [
    {
      "nivel": "Simples",
      "desc": "Ajuste de configurações (timer, CEC).",
      "tempo": "30 min",
      "custo": "R$ 99,99"
    },
    {
      "nivel": "Médio",
      "desc": "Troca de capacitores da fonte.",
      "tempo": "2 a 5 dias",
      "custo": "R$ 150 a R$ 350"
    },
    {
      "nivel": "Complexo",
      "desc": "Reparo de placa principal.",
      "tempo": "5 a 10 dias",
      "custo": "R$ 300 a R$ 600"
    }
  ],
  "riscos": [
    "Ignorar capacitores estufados pode levar a falha completa"
  ],
  "diagnostico": "Verificação de configurações, teste de tensões da fonte, inspeção de capacitores. Custo: R$ 99,99.",
  "solucao": "Para configurações: ajuste no menu. Para hardware: reparo em bancada.",
  "quandoCompensa": "Troca de capacitores é muito barata — sempre compensa.",
  "quandoNaoCompensa": "Múltiplos defeitos em TV antiga de baixo valor.",
  "whatsappMessage": "Olá! Minha TV fica desligando sozinha. Podem me ajudar?",
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
      "label": "TV Não Liga",
      "to": "/problemas/tv-nao-liga-curitiba"
    },
    {
      "label": "Manutenção TV",
      "to": "/servicos/manutencao-tv"
    }
  ],
  "conteudoExtra": "### Antes de Chamar: Verifique\n\n1. Menu > Timer > Desligamento automático → desative\n2. Menu > HDMI-CEC / Anynet+ / Simplink → desative\n3. Verifique se a TV está em local ventilado"
};
