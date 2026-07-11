import type { ProblemaPageData } from "./types";

export const problema: ProblemaPageData = {
  "slug": "computador-travando-curitiba",
  "title": "Computador Travando em Curitiba | Causas e Soluções",
  "metaDescription": "Computador travando constantemente? Veja causas reais, desde hardware até software, e como resolver com diagnóstico profissional em Curitiba.",
  "h1": "Computador Travando em Curitiba — Causas Reais e Diagnóstico",
  "categoria": "Problemas de Computador",
  "intro": "Computador que trava no meio do trabalho, congela durante jogos ou simplesmente para de responder — esse problema é tão comum quanto frustrante. E o pior: as causas podem ser muito variadas, desde falta de memória RAM até HD prestes a falhar.\n\nO travamento pode ser pontual (acontece de vez em quando) ou constante. Quando é constante, geralmente indica um problema de hardware que vai piorar com o tempo. Quando é pontual, pode ser software — mas também pode ser um sinal de alerta precoce.\n\nNesta página, explicamos os tipos de travamento, suas causas reais e quando é hora de buscar ajuda profissional.",
  "sintomas": [
    {
      "titulo": "Congela completamente",
      "desc": "Mouse e teclado param de responder. Precisa forçar desligamento.",
      "gravidade": "Médio a complexo"
    },
    {
      "titulo": "Trava e volta sozinho",
      "desc": "Congela por segundos e depois volta ao normal. Geralmente disco ou RAM.",
      "gravidade": "Simples a médio"
    },
    {
      "titulo": "Trava em programas específicos",
      "desc": "Só congela em jogos ou aplicações pesadas. Hardware insuficiente ou superaquecimento.",
      "gravidade": "Simples a médio"
    },
    {
      "titulo": "Trava com tela azul",
      "desc": "Aparece tela azul do Windows (BSOD) com código de erro. Driver ou hardware com defeito.",
      "gravidade": "Médio"
    }
  ],
  "causas": [
    {
      "titulo": "HD com setores defeituosos",
      "desc": "Um HD danificado causa travamentos constantes enquanto tenta ler dados corrompidos. É a causa mais perigosa pois indica que o disco pode falhar a qualquer momento.",
      "tipo": "hardware"
    },
    {
      "titulo": "Memória RAM insuficiente ou com defeito",
      "desc": "RAM lotada força o Windows a usar o disco como memória virtual, causando lentidão extrema e travamentos.",
      "tipo": "hardware"
    },
    {
      "titulo": "Superaquecimento",
      "desc": "Processador que atinge temperatura crítica reduz velocidade (throttling) ou trava o sistema para se proteger.",
      "tipo": "desgaste"
    },
    {
      "titulo": "Driver incompatível ou corrompido",
      "desc": "Drivers de vídeo, áudio ou chipset com bug causam travamentos específicos, especialmente após atualizações.",
      "tipo": "software"
    },
    {
      "titulo": "Malware consumindo recursos",
      "desc": "Vírus e mineradores usam CPU e RAM em segundo plano, causando travamentos quando o sistema fica sem recursos.",
      "tipo": "software"
    }
  ],
  "cenarios": [
    {
      "nivel": "Simples",
      "desc": "Atualização de drivers, limpeza de software, aumento de memória virtual.",
      "tempo": "1h",
      "custo": "R$ 100 a R$ 150"
    },
    {
      "nivel": "Médio",
      "desc": "Upgrade de RAM, troca de HD por SSD, reinstalação de Windows.",
      "tempo": "2h a 4h",
      "custo": "R$ 200 a R$ 500"
    },
    {
      "nivel": "Complexo",
      "desc": "Reparo de placa-mãe, substituição de GPU, recuperação de dados de HD falhando.",
      "tempo": "2 a 5 dias",
      "custo": "R$ 300 a R$ 700+"
    }
  ],
  "riscos": [
    "Cada travamento pode corromper arquivos e causar perda de dados",
    "Forçar desligamento repetidamente danifica o disco rígido",
    "Ignorar tela azul pode levar a falha completa do sistema",
    "Continuar usando com HD defeituoso pode tornar dados irrecuperáveis"
  ],
  "diagnostico": "Diagnóstico de travamento exige análise completa: teste de memória (MemTest), verificação de saúde do disco (SMART), monitoramento de temperaturas, análise de logs do Windows e teste de estabilidade sob carga. Custo: R$ 99,99.",
  "solucao": "Após identificar a causa, o reparo pode ir desde simples otimização até troca de componentes. O laudo detalha o problema encontrado, a solução proposta e o custo antes da execução.",
  "quandoCompensa": "Compensa reparar quando a causa é identificável e o custo do reparo é razoável frente ao valor do equipamento.",
  "quandoNaoCompensa": "Não compensa quando há múltiplos componentes falhando, indicando desgaste generalizado do equipamento.",
  "whatsappMessage": "Olá! Meu computador está travando muito. Podem me ajudar?",
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
      "label": "Computador Lento",
      "to": "/problemas/computador-lento-curitiba"
    },
    {
      "label": "Upgrade SSD",
      "to": "/servicos/upgrade-ssd-memoria"
    },
    {
      "label": "Remoção de Vírus",
      "to": "/servicos/remocao-virus"
    }
  ],
  "conteudoExtra": "### Travamento vs Lentidão\n\nTravamento é quando o computador para de responder completamente. Lentidão é quando funciona devagar mas ainda responde. Embora pareçam similares, as causas podem ser bem diferentes:\n\n- **Travamento** → geralmente hardware (RAM, HD, placa-mãe)\n- **Lentidão** → geralmente software ou disco antigo\n\n### Quando é Urgente\n\nSe o computador trava e você ouve cliques vindos do HD, é sinal de falha iminente. Faça backup imediato e procure diagnóstico — seus dados estão em risco."
};
