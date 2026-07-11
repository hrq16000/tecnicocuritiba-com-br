import type { ProblemaPageData } from "./types";

export const problema: ProblemaPageData = {
  "slug": "tv-nao-liga-curitiba",
  "title": "TV Não Liga em Curitiba | Diagnóstico e Reparo",
  "metaDescription": "TV não liga? Veja causas comuns: fonte, placa, LED de standby. Reparo profissional em Curitiba.",
  "h1": "TV Não Liga em Curitiba — Diagnóstico Profissional",
  "categoria": "Problemas de TV",
  "intro": "Uma TV que não liga pode ter diversas causas — desde uma simples falha na tomada até uma placa de fonte queimada. As TVs modernas possuem placas sensíveis a picos de energia. Capacitores estufados, fusíveis queimados e CI de standby com defeito são os vilões mais comuns.\n\n**Importante:** Para conserto de TV, o atendimento é exclusivamente presencial na oficina. É necessário trazer o aparelho.",
  "sintomas": [
    {
      "titulo": "Nenhuma reação ao ligar",
      "desc": "Nem LED de standby, nem som. Placa fonte ou fusível.",
      "gravidade": "Médio"
    },
    {
      "titulo": "LED de standby acende mas não liga",
      "desc": "O LED acende mas a TV não responde. Placa principal ou firmware.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Liga e desliga em loop",
      "desc": "Mostra o logo e desliga. Proteção por defeito em backlight ou fonte.",
      "gravidade": "Médio a complexo"
    },
    {
      "titulo": "Estala ao tentar ligar",
      "desc": "Capacitor ou componente em curto na placa fonte.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Demora muito para ligar",
      "desc": "Capacitores da fonte perdendo capacidade.",
      "gravidade": "Simples a médio"
    }
  ],
  "causas": [
    {
      "titulo": "Placa fonte queimada",
      "desc": "Picos de energia queimam capacitores, fusíveis e CIs. Causa mais comum.",
      "tipo": "hardware"
    },
    {
      "titulo": "Capacitores estufados",
      "desc": "Capacitores eletrolíticos estufam e perdem função com o tempo.",
      "tipo": "desgaste"
    },
    {
      "titulo": "Fusível de proteção queimado",
      "desc": "Pode ser só o fusível ou indicar problema maior.",
      "tipo": "hardware"
    },
    {
      "titulo": "Firmware corrompido",
      "desc": "EEPROM corrompida impedindo boot.",
      "tipo": "software"
    },
    {
      "titulo": "Backlight com defeito",
      "desc": "Barras de LED queimadas ativam proteção.",
      "tipo": "desgaste"
    }
  ],
  "cenarios": [
    {
      "nivel": "Simples",
      "desc": "Troca de fusível ou capacitores.",
      "tempo": "1 a 3 dias",
      "custo": "R$ 150 a R$ 300"
    },
    {
      "nivel": "Médio",
      "desc": "Reparo da placa fonte ou regravação de firmware.",
      "tempo": "3 a 7 dias",
      "custo": "R$ 250 a R$ 500"
    },
    {
      "nivel": "Complexo",
      "desc": "Troca de placa fonte completa ou reparo de placa principal.",
      "tempo": "7 a 30 dias",
      "custo": "R$ 400 a R$ 900"
    }
  ],
  "riscos": [
    "Capacitores armazenam carga mesmo desligada — perigoso abrir em casa",
    "Picos recorrentes podem queimar novamente sem proteção"
  ],
  "diagnostico": "Teste de fonte com multímetro, verificação de capacitores, fusíveis e CIs. Presencial na oficina — necessário trazer a TV.",
  "solucao": "Reparo ou troca de placa fonte, troca de capacitores, regravação de firmware ou substituição de backlight.",
  "quandoCompensa": "TVs de 32\" a 65\" com até 8 anos geralmente compensam. Troca de capacitores é barata.",
  "quandoNaoCompensa": "TVs com mais de 10 anos ou placa principal queimada onde o custo se aproxima de uma TV nova.",
  "whatsappMessage": "Olá! Minha TV não liga e preciso de conserto. Podem me ajudar?",
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
      "label": "Conserto de TV",
      "to": "/servicos/conserto-tv"
    },
    {
      "label": "TV Sem Imagem",
      "to": "/problemas/tv-sem-imagem-curitiba"
    },
    {
      "label": "TV Desliga Sozinha",
      "to": "/problemas/tv-desliga-sozinha-curitiba"
    }
  ],
  "conteudoExtra": "## Atendimento Presencial\n\nPara conserto de TV, é necessário trazer o aparelho à oficina.\n\n### Como Transportar\n\n- Na vertical (em pé), nunca deitada\n- Proteja a tela com cobertor ou papelão\n- Cuidado com as bordas finas"
};
