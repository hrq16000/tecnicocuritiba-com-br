import type { ProblemaPageData } from "./types";

export const problema: ProblemaPageData = {
  "slug": "computador-nao-liga-curitiba",
  "title": "Computador Não Liga em Curitiba | Diagnóstico Profissional",
  "metaDescription": "Seu computador não liga? Veja causas reais, sintomas, riscos e como resolver com diagnóstico técnico em Curitiba. Atendimento a domicílio no mesmo dia.",
  "h1": "Computador Não Liga em Curitiba — Causas Reais e Solução Profissional",
  "categoria": "Problemas de Computador",
  "intro": "Um computador que não liga pode gerar pânico — especialmente se você depende dele para trabalho, estudo ou uso diário. Mas antes de imaginar o pior cenário, saiba que esse é um dos problemas mais comuns que atendemos em Curitiba e região metropolitana. A maioria dos casos tem solução, desde que o diagnóstico seja feito corretamente.\n\nO erro mais frequente é tentar resolver sem conhecimento técnico. Trocar peças por achismo, forçar botões, abrir o gabinete sem cuidado — tudo isso pode transformar um problema simples em algo caro e irreversível. Por isso, o primeiro passo é entender o que está acontecendo antes de agir.\n\nNesta página, você vai encontrar uma explicação completa sobre os sintomas mais comuns, as causas reais (e não as que aparecem no Google de forma genérica), os riscos de tentar resolver sozinho, e como funciona o atendimento técnico profissional para esse tipo de situação. Se o seu computador parou de ligar, você está no lugar certo.",
  "sintomas": [
    {
      "titulo": "Nenhuma reação ao pressionar o botão",
      "desc": "O computador simplesmente não responde. Nenhum LED, nenhum som, nenhuma ventoinha. Pode ser fonte queimada, botão power com defeito, curto na placa-mãe ou cabo de energia danificado.",
      "gravidade": "Médio a complexo"
    },
    {
      "titulo": "LEDs acendem mas tela fica preta",
      "desc": "As ventoinhas giram, algum LED acende, mas o monitor não exibe nada. Isso geralmente indica problema com memória RAM, GPU, processador ou BIOS corrompida.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Liga por segundos e desliga",
      "desc": "O computador inicia por 2-5 segundos e se desliga sozinho. Causas comuns: superaquecimento crítico, fonte instável, curto na placa ou memória com defeito.",
      "gravidade": "Médio a complexo"
    },
    {
      "titulo": "Emite bips ao ligar",
      "desc": "Sequências de bip indicam qual componente falhou. Cada padrão (curto, longo, repetido) aponta para memória, vídeo ou processador. É um código de erro da placa-mãe.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Trava na tela do logo/BIOS",
      "desc": "O computador inicia mas não passa da tela de boot. Pode ser disco rígido falhando, Windows corrompido, BIOS desatualizada ou dispositivo USB interferindo.",
      "gravidade": "Simples a médio"
    },
    {
      "titulo": "Tela azul (BSOD) ao iniciar",
      "desc": "O Windows começa a carregar mas exibe tela azul com código de erro. Drivers corrompidos, atualizações com bug, HD/SSD com setores defeituosos são as causas mais comuns.",
      "gravidade": "Simples a médio"
    }
  ],
  "causas": [
    {
      "titulo": "Fonte de alimentação queimada",
      "desc": "A fonte converte energia da tomada para o computador. Picos de energia, uso prolongado e fontes de baixa qualidade são as principais causas de falha. Uma fonte que morre pode levar outros componentes junto.",
      "tipo": "hardware"
    },
    {
      "titulo": "Curto-circuito na placa-mãe",
      "desc": "Pode ser causado por descarga eletrostática, parafuso solto dentro do gabinete, ou acúmulo de poeira condutiva. O curto impede qualquer tentativa de ligar.",
      "tipo": "hardware"
    },
    {
      "titulo": "Memória RAM com defeito ou mal encaixada",
      "desc": "RAM oxidada, fora do slot ou com chips queimados impede o POST (Power On Self Test). O computador liga mas não exibe imagem.",
      "tipo": "hardware"
    },
    {
      "titulo": "Windows corrompido ou atualização com bug",
      "desc": "Atualizações do Windows podem corromper arquivos de boot. O sistema tenta iniciar e falha, gerando loop ou tela azul.",
      "tipo": "software"
    },
    {
      "titulo": "Upgrade mal executado",
      "desc": "Instalação incorreta de peças novas (RAM incompatível, SSD mal conectado, pasta térmica em excesso) pode impedir o computador de ligar.",
      "tipo": "erro-humano"
    },
    {
      "titulo": "Desgaste natural de componentes",
      "desc": "Após 5-8 anos de uso, capacitores da placa-mãe estufam, pasta térmica seca, e contatos oxidam. O computador passa a falhar intermitentemente até parar.",
      "tipo": "desgaste"
    }
  ],
  "cenarios": [
    {
      "nivel": "Simples",
      "desc": "Cabo solto, RAM mal encaixada, botão power com mau contato, ou configuração de BIOS alterada. Resolvido na visita técnica.",
      "tempo": "30 min a 1h",
      "custo": "Dentro da visita técnica"
    },
    {
      "nivel": "Médio",
      "desc": "Fonte queimada que precisa ser substituída, reinstalação de Windows, ou limpeza profunda com troca de pasta térmica.",
      "tempo": "1h a 3h",
      "custo": "R$ 150 a R$ 350 + peças"
    },
    {
      "nivel": "Complexo",
      "desc": "Curto na placa-mãe, reparo em trilhas, troca de capacitores, ou diagnóstico de GPU integrada com defeito. Requer bancada.",
      "tempo": "2 a 7 dias úteis",
      "custo": "R$ 250 a R$ 600+ dependendo do componente"
    }
  ],
  "riscos": [
    "Curto-circuito por descarga eletrostática ao abrir o gabinete sem proteção",
    "Dano em conectores e trilhas da placa-mãe ao forçar componentes",
    "Troca de peças por achismo, gastando dinheiro em componentes errados",
    "Perda total de dados ao tentar formatar sem backup",
    "Queimar a fonte nova ao ligar sem testar a rede elétrica",
    "Perder a garantia do equipamento ao abrir sem autorização"
  ],
  "diagnostico": "O diagnóstico é a etapa mais importante quando um computador não liga. Sem ele, qualquer tentativa de reparo é achismo — e achismo custa caro.\n\nNosso diagnóstico profissional inclui: teste de fonte com multímetro, verificação de curto-circuito na placa-mãe, teste individual de memória RAM, análise de GPU, verificação de processador e inspeção visual de capacitores e componentes.\n\nO diagnóstico tem custo fixo de R$ 99,99 porque envolve tempo técnico real, uso de equipamentos profissionais e responsabilidade sobre a análise. Se o reparo for aprovado, o valor do diagnóstico é incorporado ao serviço.",
  "solucao": "Após o diagnóstico, apresentamos o laudo completo com: o que foi encontrado, o que precisa ser feito, quanto custa e quanto tempo leva.\n\nPara casos simples (cabo, RAM, config), resolvemos na própria visita. Para casos médios (troca de fonte, reinstalação), geralmente resolvemos no mesmo dia. Para casos complexos (reparo de placa, troca de componentes SMD), o equipamento vai para bancada com prazo de 2 a 7 dias úteis.\n\nExiste um valor mínimo pré-aprovado: se o reparo estiver dentro desse limite, já executamos sem necessidade de nova autorização. Se ultrapassar, o cliente é consultado antes.",
  "quandoCompensa": "Compensa reparar quando o computador tem menos de 6 anos, quando o custo do reparo é inferior a 40% do valor de um equivalente novo, quando os demais componentes estão em boas condições, e quando o equipamento atende às necessidades do usuário.",
  "quandoNaoCompensa": "Não compensa quando o computador tem mais de 8 anos com múltiplos problemas, quando o custo do reparo se aproxima de um novo, quando há dano por líquido extenso, ou quando o hardware é muito defasado para as tarefas necessárias.",
  "whatsappMessage": "Olá! Meu computador não liga. Podem me ajudar com diagnóstico?",
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
      "label": "Computador Liga e Desliga",
      "to": "/problemas/computador-liga-e-desliga-curitiba"
    },
    {
      "label": "Computador Sem Vídeo",
      "to": "/problemas/computador-sem-video-curitiba"
    },
    {
      "label": "Conserto PC/Notebook",
      "to": "/servicos/conserto-pc-notebook"
    },
    {
      "label": "Conserto de Placa",
      "to": "/servicos/conserto-placa"
    },
    {
      "label": "Reballing BGA",
      "to": "/procedimentos/reballing-bga-curitiba"
    },
    {
      "label": "Quando Não Compensa",
      "to": "/quando-nao-compensa"
    }
  ],
  "conteudoExtra": "### Diferença Entre \"Não Liga\" e \"Não Exibe Imagem\"\n\nMuitos clientes dizem que o computador \"não liga\" quando na verdade ele liga mas não exibe imagem. A diferença é crucial para o diagnóstico:\n\n- **Não liga de verdade**: zero reação. Nenhum LED, nenhum som, nenhuma ventoinha. O problema está na alimentação (fonte, cabo, tomada) ou em curto na placa-mãe.\n- **Liga mas não exibe**: ventoinhas giram, LEDs acendem, mas a tela fica preta. O problema está no vídeo (GPU, memória, monitor ou cabo de vídeo).\n\nEssa distinção economiza tempo e dinheiro no diagnóstico.\n\n### O Que Fazer Enquanto Espera o Técnico\n\n1. Não tente abrir o computador\n2. Anote se houve queda de energia, barulho estranho ou cheiro de queimado\n3. Verifique se o problema é na tomada (teste outro aparelho)\n4. Se possível, filme o comportamento ao tentar ligar\n5. Tenha em mãos a nota fiscal ou informações do equipamento\n\n### Atendimento em Curitiba e Região\n\nAtendemos toda Curitiba (Centro, Batel, Portão, CIC, Santa Felicidade, Campo Comprido e todos os bairros), São José dos Pinhais, Araucária, Campo Largo, Pinhais, Colombo, Almirante Tamandaré, Fazenda Rio Grande, Piraquara, Campo Magro e Quatro Barras.\n\nO atendimento a domicílio está disponível no mesmo dia para a maioria das regiões, sujeito à disponibilidade da agenda."
};
