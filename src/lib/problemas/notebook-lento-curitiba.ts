import type { ProblemaPageData } from "./types";

export const problema: ProblemaPageData = {
  "slug": "notebook-lento-curitiba",
  "title": "Notebook Lento em Curitiba | Upgrade e Otimização",
  "metaDescription": "Notebook lento? Saiba quando fazer upgrade de SSD e RAM, quando formatar e quando trocar. Diagnóstico em Curitiba no mesmo dia.",
  "h1": "Notebook Lento em Curitiba — Upgrade, Otimização ou Troca?",
  "categoria": "Notebook",
  "intro": "Notebook lento é a reclamação número 1 que recebemos. E na maioria dos casos, a solução é simples e tem ótimo custo-benefício: upgrade de SSD. Um notebook com HD mecânico que levava 5 minutos para iniciar passa a levar 20 segundos com SSD.\n\nMas nem sempre é só o disco. Pouca RAM, superaquecimento, malware e até bateria degradada podem contribuir para a lentidão. O diagnóstico identifica exatamente onde está o gargalo.",
  "sintomas": [
    {
      "titulo": "Demora muito para iniciar",
      "desc": "3-10 minutos até ficar usável. HD mecânico + muitos programas na inicialização.",
      "gravidade": "Simples"
    },
    {
      "titulo": "Trava ao abrir programas",
      "desc": "Congela ao abrir Chrome, Office ou outros. Falta de RAM ou disco em 100%.",
      "gravidade": "Simples a médio"
    },
    {
      "titulo": "Fica lento conforme esquenta",
      "desc": "Funciona bem por 10-20 min e depois fica lento. Superaquecimento + throttling.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Lento mesmo após formatação",
      "desc": "Formatou e continua lento. Problema é hardware (HD antigo ou RAM insuficiente).",
      "gravidade": "Simples"
    }
  ],
  "causas": [
    {
      "titulo": "HD mecânico antigo",
      "desc": "90% dos notebooks lentos que atendemos têm HD mecânico. A troca por SSD é a melhoria mais impactante.",
      "tipo": "hardware"
    },
    {
      "titulo": "RAM insuficiente (4GB)",
      "desc": "Windows 11 + Chrome com 3 abas já esgota 4GB. 8GB é o mínimo para uso fluido.",
      "tipo": "hardware"
    },
    {
      "titulo": "Pasta térmica seca + poeira",
      "desc": "Notebook esquenta, processador reduz velocidade (throttling). Limpeza resolve.",
      "tipo": "desgaste"
    },
    {
      "titulo": "Malware e bloatware",
      "desc": "Programas pré-instalados e vírus consomem recursos em segundo plano.",
      "tipo": "software"
    }
  ],
  "cenarios": [
    {
      "nivel": "Simples",
      "desc": "Limpeza de software + desativação de programas desnecessários.",
      "tempo": "1h",
      "custo": "R$ 100 a R$ 150"
    },
    {
      "nivel": "Médio",
      "desc": "Upgrade SSD + aumento de RAM + instalação limpa de Windows.",
      "tempo": "2h a 4h",
      "custo": "R$ 300 a R$ 600 com peças"
    },
    {
      "nivel": "Complexo",
      "desc": "Upgrade + limpeza interna + troca de pasta térmica + diagnóstico completo.",
      "tempo": "4h a 1 dia",
      "custo": "R$ 400 a R$ 800"
    }
  ],
  "riscos": [
    "Formatar sem trocar o HD não resolve — continua lento",
    "Comprar SSD incompatível (SATA vs NVMe) desperdiça dinheiro",
    "Programas de 'otimização' geralmente pioram"
  ],
  "diagnostico": "Análise de gargalo: velocidade de disco, uso de RAM, temperatura, saúde do disco (SMART), análise de software. Custo: R$ 99,99 (incorporado ao serviço se aprovado).",
  "solucao": "Na maioria dos casos: SSD 240/480GB + clonagem do sistema + limpeza de software. Em alguns: upgrade de RAM também. Fazemos tudo no mesmo atendimento.",
  "quandoCompensa": "Quase sempre compensa o upgrade de SSD. Com R$ 300-500 você transforma o notebook em uma máquina rápida por mais 3-5 anos.",
  "quandoNaoCompensa": "Não compensa upgrade em notebooks com processador anterior a 2014 ou com placa-mãe apresentando outros defeitos.",
  "whatsappMessage": "Olá! Meu notebook está muito lento. Podem me ajudar com upgrade?",
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
      "label": "Upgrade SSD/Memória",
      "to": "/servicos/upgrade-ssd-memoria"
    },
    {
      "label": "Formatação",
      "to": "/servicos/formatacao-computador"
    },
    {
      "label": "Notebook Esquentando",
      "to": "/problemas/notebook-esquentando-curitiba"
    }
  ],
  "conteudoExtra": "### Investimento vs Resultado\n\n| Upgrade | Custo Médio | Melhoria Esperada |\n|---|---|---|\n| SSD 240GB | R$ 200-300 | 5-10x mais rápido no boot e abertura de programas |\n| RAM 4GB → 8GB | R$ 150-250 | Menos travamentos ao usar vários programas |\n| SSD + RAM | R$ 350-500 | Transformação completa — como notebook novo |\n| Limpeza + pasta térmica | R$ 150-200 | Menos throttling, performance estável |"
};
