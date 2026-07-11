import type { ProblemaPageData } from "./types";

export const problema: ProblemaPageData = {
  "slug": "celular-nao-liga-curitiba",
  "title": "Celular Não Liga em Curitiba | Conserto Profissional",
  "metaDescription": "Celular não liga? Tela preta, sem resposta ao botão? Diagnóstico e conserto de celular em Curitiba. Atendimento presencial na oficina com orçamento humanizado.",
  "h1": "Celular Não Liga — Diagnóstico e Conserto em Curitiba",
  "categoria": "Problemas de Celular",
  "intro": "Um celular que não liga gera pânico imediato — fotos, contatos, apps bancários, tudo parece perdido. Mas na maioria dos casos o problema tem solução, desde que o diagnóstico seja feito por um técnico qualificado.\n\nAs causas mais comuns vão desde bateria totalmente descarregada até placa queimada por curto-circuito. O importante é não tentar resolver sozinho: abrir o celular sem ferramentas adequadas pode danificar flex cables, conectores e componentes delicados.\n\nEm nossa oficina em Curitiba, realizamos diagnóstico completo com orçamento humanizado — você só paga se aprovar o serviço.",
  "sintomas": [
    {
      "titulo": "Nenhuma reação ao pressionar o botão power",
      "desc": "Celular completamente morto, sem vibração, sem LED, sem som. Pode ser bateria zerada, conector de carga danificado ou placa com curto.",
      "gravidade": "Médio a complexo"
    },
    {
      "titulo": "Vibra mas tela fica preta",
      "desc": "O celular responde ao botão (vibra ou emite som) mas a tela não acende. Problema no display, flat cable ou conector da tela.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Liga e desliga em loop (bootloop)",
      "desc": "O celular mostra o logo da marca e reinicia infinitamente. Pode ser software corrompido, memória interna com defeito ou falha na placa.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Acende LED mas não inicia",
      "desc": "LED de notificação pisca mas a tela permanece preta. Geralmente problema de display ou firmware corrompido.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Esquentou muito e parou de funcionar",
      "desc": "Após superaquecimento, o celular desligou e não liga mais. Possível dano térmico na bateria ou no processador.",
      "gravidade": "Complexo"
    }
  ],
  "causas": [
    {
      "titulo": "Bateria degradada ou inchada",
      "desc": "Baterias de lítio perdem capacidade com o tempo. Após 2-3 anos, podem não segurar carga ou inchar, causando risco.",
      "tipo": "desgaste"
    },
    {
      "titulo": "Conector de carga danificado",
      "desc": "Poeira, umidade e mau uso do cabo danificam o conector USB-C/Lightning. O celular para de carregar e eventualmente desliga.",
      "tipo": "desgaste"
    },
    {
      "titulo": "Curto-circuito na placa",
      "desc": "Queda com impacto, contato com água ou carregador de má qualidade podem causar curto na placa principal.",
      "tipo": "hardware"
    },
    {
      "titulo": "Software corrompido",
      "desc": "Atualizações interrompidas, root/jailbreak mal feito ou apps maliciosos podem corromper o sistema.",
      "tipo": "software"
    },
    {
      "titulo": "Queda ou impacto forte",
      "desc": "Mesmo sem trincar a tela, uma queda pode soltar componentes internos como conectores de bateria ou display.",
      "tipo": "erro-humano"
    }
  ],
  "cenarios": [
    {
      "nivel": "Simples",
      "desc": "Troca de bateria ou conector de carga.",
      "tempo": "1 a 2 horas",
      "custo": "R$ 120 a R$ 250"
    },
    {
      "nivel": "Médio",
      "desc": "Troca de display ou reparo de software (flash de firmware).",
      "tempo": "1 a 2 dias",
      "custo": "R$ 200 a R$ 500"
    },
    {
      "nivel": "Complexo",
      "desc": "Reparo de placa (microssolda, troca de CI). Requer equipamento especializado.",
      "tempo": "3 a 10 dias",
      "custo": "R$ 300 a R$ 800"
    }
  ],
  "riscos": [
    "Bateria inchada pode estourar se manipulada incorretamente",
    "Abrir o celular sem ferramentas adequadas danifica flex cables",
    "Dados podem ser perdidos se a memória interna estiver comprometida"
  ],
  "diagnostico": "Diagnóstico completo com teste de bateria, conector, display e placa. Atendimento presencial na oficina. Orçamento humanizado — sem valores passados por chat.",
  "solucao": "Depende do diagnóstico: troca de bateria, conector, display ou reparo de placa. Sempre com peças de qualidade e garantia do serviço.",
  "quandoCompensa": "Celulares de médio e alto valor (acima de R$ 1.000 novo) quase sempre compensam reparo. Troca de bateria e conector são reparos baratos e muito eficientes.",
  "quandoNaoCompensa": "Celulares muito antigos (mais de 4 anos) ou de baixo valor original (abaixo de R$ 500 novo) com problema de placa podem não compensar o reparo.",
  "whatsappMessage": "Olá! Meu celular não liga e preciso de conserto. Podem me ajudar?",
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
      "label": "Celular Tela Quebrada",
      "to": "/problemas/celular-tela-quebrada-curitiba"
    },
    {
      "label": "Celular Lento",
      "to": "/problemas/celular-lento-curitiba"
    }
  ],
  "conteudoExtra": "## Importante: Atendimento Presencial\n\nPara conserto de celular, o atendimento é exclusivamente presencial na oficina. Não realizamos visita técnica a domicílio para celulares.\n\n### Por Que Presencial?\n\n- Celulares exigem ferramentas de precisão (chaves Pentalobe, ventosa, espátula)\n- Ambiente controlado com ESD (proteção contra descarga eletrostática)\n- Microscópio e estação de solda para diagnóstico de placa\n- Testes com fontes de bancada para isolar problemas elétricos\n\n### O Que Trazer\n\n- O celular com o problema\n- Carregador original (se tiver)\n- Descrição do que aconteceu antes do problema\n- Senha de desbloqueio (necessário para testes após reparo)"
};
