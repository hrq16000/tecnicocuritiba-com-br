import type { ProblemaPageData } from "./types";

export const problema: ProblemaPageData = {
  "slug": "erro-ao-instalar-memoria-ram",
  "title": "Erro ao Instalar Memória RAM | Guia Técnico",
  "metaDescription": "Erro ao instalar RAM? Computador não liga após trocar memória? Veja causas e soluções. Diagnóstico profissional em Curitiba.",
  "h1": "Erro ao Instalar Memória RAM — O Que Fazer?",
  "categoria": "Erros e Casos Reais",
  "intro": "Instalou memória RAM nova e o computador não liga, emite bips ou fica com tela preta? RAM incompatível, mal encaixada ou frequência diferente são as causas mais comuns. Cada placa-mãe aceita tipos específicos de memória (DDR3, DDR4, DDR5) com frequências específicas. Instalar o módulo errado pode resultar em tela preta, instabilidade ou até dano ao slot.",
  "sintomas": [
    {
      "titulo": "Computador não liga após instalar RAM",
      "desc": "RAM incompatível ou mal encaixada.",
      "gravidade": "Simples"
    },
    {
      "titulo": "Bips ao ligar",
      "desc": "Sequência de bips indica problema de memória.",
      "gravidade": "Simples"
    },
    {
      "titulo": "Instabilidade e travamentos",
      "desc": "RAM funcionou mas é incompatível em frequência ou timings.",
      "gravidade": "Simples a médio"
    }
  ],
  "causas": [
    {
      "titulo": "RAM de geração errada",
      "desc": "DDR4 em slot DDR3 ou vice-versa. Não são compatíveis.",
      "tipo": "erro-humano"
    },
    {
      "titulo": "Frequência incompatível",
      "desc": "RAM com frequência diferente da suportada pela placa.",
      "tipo": "erro-humano"
    },
    {
      "titulo": "Módulo mal encaixado",
      "desc": "Trava não clicou completamente.",
      "tipo": "erro-humano"
    },
    {
      "titulo": "Slot com defeito",
      "desc": "Slot danificado durante a instalação.",
      "tipo": "hardware"
    }
  ],
  "cenarios": [
    {
      "nivel": "Simples",
      "desc": "Reencaixe correto ou troca por módulo compatível.",
      "tempo": "30 min",
      "custo": "R$ 99,99"
    },
    {
      "nivel": "Médio",
      "desc": "Diagnóstico de compatibilidade + compra do módulo correto.",
      "tempo": "1h",
      "custo": "R$ 100 a R$ 200 + peça"
    },
    {
      "nivel": "Complexo",
      "desc": "Slot danificado — reparo de placa-mãe.",
      "tempo": "3 a 7 dias",
      "custo": "R$ 200 a R$ 500"
    }
  ],
  "riscos": [
    "Forçar módulo pode danificar o slot permanentemente",
    "RAM incompatível pode causar instabilidade em dados"
  ],
  "diagnostico": "Verificação de compatibilidade, teste de módulos, inspeção de slots. Custo: R$ 99,99.",
  "solucao": "Identificar módulo compatível, instalar corretamente, testar estabilidade.",
  "quandoCompensa": "Quase sempre — o erro geralmente é reversível.",
  "quandoNaoCompensa": "Se o slot foi danificado fisicamente em placa antiga.",
  "whatsappMessage": "Olá! Instalei memória RAM e meu computador não funciona. Podem me ajudar?",
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
      "label": "Upgrade Deu Problema",
      "to": "/problemas/upgrade-deu-problema"
    },
    {
      "label": "Upgrade SSD/Memória",
      "to": "/servicos/upgrade-ssd-memoria"
    },
    {
      "label": "Computador Não Liga",
      "to": "/problemas/computador-nao-liga-curitiba"
    },
    {
      "label": "Erros Comuns em Upgrade",
      "to": "/problemas/erros-comuns-em-upgrade"
    }
  ],
  "conteudoExtra": "### Como Evitar Erros de RAM\n\n1. Verifique o manual da placa-mãe para saber DDR e frequência suportados\n2. Use sites como Crucial.com para verificar compatibilidade\n3. Sempre desligue e desconecte da tomada antes de instalar\n4. Use pulseira antiestática\n5. Ouça o \"click\" da trava ao encaixar\n\n### Entendendo os Tipos de RAM\n\nA memória RAM passou por diversas gerações, cada uma incompatível fisicamente com a anterior:\n\n- **DDR3**: Computadores de 2007 a 2015. Voltagem 1.5V. Chanfro (encaixe) diferente da DDR4.\n- **DDR4**: Computadores de 2015 a 2022. Voltagem 1.2V. Padrão mais comum atualmente.\n- **DDR5**: Computadores a partir de 2022. Voltagem 1.1V. Plataformas Intel 12ª geração+ e AMD AM5.\n\nCada tipo tem o chanfro (corte no módulo) em posição diferente, o que impede fisicamente a instalação no slot errado. Porém, módulos com voltagem ou frequência inadequada podem encaixar mas não funcionar, gerando tela preta ou bips.\n\n### Frequência e Timings: O Que Importa\n\nNão basta ser o DDR correto. A frequência (ex: 2400MHz, 3200MHz, 4800MHz) deve ser suportada pela placa-mãe. Instalar RAM de 3200MHz em placa que suporta até 2400MHz não vai danificar nada, mas o módulo vai operar em velocidade reduzida. Já instalar frequência ABAIXO do mínimo pode causar instabilidade.\n\nOs **timings** (CL16, CL18, etc.) também importam quando se mistura módulos diferentes. Dois pentes com timings muito diferentes podem causar travamentos intermitentes — difíceis de diagnosticar sem ferramentas profissionais como MemTest86.\n\n### Casos Reais em Curitiba\n\nRecebemos semanalmente casos de upgrade de RAM mal executado na região de Curitiba e metropolitana:\n\n- **Caso 1 - Portão**: Cliente comprou DDR4 2666MHz para placa que suportava apenas DDR3. Módulo não encaixava e ele forçou — resultado: slot quebrado. Reparo: R$ 350.\n- **Caso 2 - Pinhais**: Cliente misturou pentes DDR4 de 2400MHz com 3200MHz. PC funcionava mas travava aleatoriamente. Solução: manter apenas os pentes de mesma frequência.\n- **Caso 3 - São José dos Pinhais**: Notebook com RAM soldada na placa — cliente tentou adicionar módulo no slot extra sem verificar que o notebook só suportava 1 slot adicional de 8GB. Funcionou perfeitamente após orientação.\n\n### Quanto de RAM Você Realmente Precisa?\n\n| Uso | RAM Recomendada |\n|---|---|\n| Navegação e Office | 8GB |\n| Trabalho multitarefa | 16GB |\n| Design e vídeo | 32GB |\n| Jogos modernos | 16-32GB |\n| Servidor/virtualização | 32-64GB+ |\n\nSe você está em dúvida sobre qual RAM comprar para seu computador em Curitiba, entre em contato antes de comprar. Uma consultoria rápida pode evitar uma compra errada e um reparo desnecessário."
};
