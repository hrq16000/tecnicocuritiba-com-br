import type { ProblemaPageData } from "./types";

export const problema: ProblemaPageData = {
  "slug": "notebook-nao-carrega-bateria-curitiba",
  "title": "Notebook Não Carrega Bateria em Curitiba | Solução",
  "metaDescription": "Notebook não carrega bateria? Veja causas: carregador, bateria ou placa-mãe. Diagnóstico em Curitiba.",
  "h1": "Notebook Não Carrega Bateria em Curitiba — Diagnóstico",
  "categoria": "Hardware / Notebook",
  "intro": "Quando o notebook para de carregar a bateria, o problema pode estar no carregador, no conector DC jack, no circuito de carga da placa-mãe ou na própria bateria. Ignorar o sintoma pode levar a desligamentos inesperados e perda de dados.\n\nEm Curitiba, nosso técnico utiliza multímetro e ferramentas de diagnóstico para identificar exatamente onde está a falha — evitando trocar peças desnecessárias e economizando seu dinheiro.",
  "sintomas": [
    {
      "titulo": "LED do carregador apaga ao conectar",
      "desc": "Indica possível curto-circuito no conector DC ou na placa-mãe, fazendo o carregador entrar em proteção.",
      "gravidade": "Alta"
    },
    {
      "titulo": "Bateria fica em 0% mesmo conectado",
      "desc": "O notebook liga na tomada mas a bateria não carrega — pode ser circuito de carga ou bateria com células mortas.",
      "gravidade": "Média"
    },
    {
      "titulo": "Carrega só até certa porcentagem",
      "desc": "Bateria para de carregar em 40%, 60% ou 80%. Pode ser desgaste natural ou configuração de software limitando a carga.",
      "gravidade": "Baixa"
    },
    {
      "titulo": "Notebook só funciona na tomada",
      "desc": "Desliga imediatamente ao remover o carregador. Bateria pode estar inchada ou com falha total de células.",
      "gravidade": "Alta"
    },
    {
      "titulo": "Conector do carregador fica solto",
      "desc": "O plug não encaixa bem ou precisa ficar em posição específica. DC jack pode estar quebrado ou com solda fria.",
      "gravidade": "Média"
    },
    {
      "titulo": "Mensagem 'plugado, não carregando'",
      "desc": "Windows reconhece o carregador mas não carrega. Problema pode ser driver ACPI, carregador incompatível ou circuito de carga.",
      "gravidade": "Média"
    }
  ],
  "causas": [
    {
      "titulo": "Carregador com defeito ou incompatível",
      "tipo": "hardware",
      "desc": "Fonte com voltagem/amperagem errada ou cabo interno rompido. Carregadores genéricos frequentemente falham antes."
    },
    {
      "titulo": "DC Jack quebrado ou com solda fria",
      "tipo": "hardware",
      "desc": "O conector de força do notebook sofre desgaste mecânico com o tempo, perdendo contato elétrico."
    },
    {
      "titulo": "Bateria com células degradadas",
      "tipo": "desgaste",
      "desc": "Baterias de lítio perdem capacidade após 300-500 ciclos. Células mortas impedem a carga completa."
    },
    {
      "titulo": "Circuito de carga na placa-mãe",
      "tipo": "hardware",
      "desc": "O chip controlador de carga (ex: BQ24780) pode queimar por surto ou curto, impedindo a carga mesmo com bateria e carregador bons."
    },
    {
      "titulo": "Driver ACPI ou configuração de energia",
      "tipo": "software",
      "desc": "Drivers desatualizados ou configurações de limite de carga podem impedir o carregamento correto."
    }
  ],
  "cenarios": [
    {
      "nivel": "Simples",
      "desc": "Troca de carregador ou reset de bateria via BIOS/software.",
      "tempo": "1-2 horas",
      "custo": "R$80–R$200"
    },
    {
      "nivel": "Médio",
      "desc": "Substituição de DC jack com ressoldagem ou troca de bateria.",
      "tempo": "2-4 horas",
      "custo": "R$150–R$350"
    },
    {
      "nivel": "Complexo",
      "desc": "Reparo de circuito de carga na placa-mãe com micro-soldagem.",
      "tempo": "3-7 dias",
      "custo": "R$300–R$600"
    }
  ],
  "riscos": [
    "Bateria inchada pode estourar e danificar o notebook inteiro",
    "Usar carregador genérico incompatível pode queimar o circuito de carga",
    "Forçar o conector pode quebrar o DC jack e danificar a placa-mãe",
    "Ignorar o problema leva a desligamentos inesperados e perda de dados"
  ],
  "diagnostico": "O técnico testa individualmente o carregador com multímetro (voltagem e amperagem), verifica o DC jack com inspeção visual e teste de continuidade, mede as células da bateria e analisa o circuito de carga da placa-mãe.\n\nEsse diagnóstico preciso evita trocar peças desnecessárias — um problema comum quando se assume que 'é a bateria' sem testar.",
  "solucao": "Dependendo da causa: substituição do carregador por original/compatível certificado, ressoldagem ou troca do DC jack, instalação de bateria nova com células de qualidade, ou reparo do circuito de carga com micro-soldagem.\n\nTodas as peças substituídas têm garantia e o serviço inclui teste de carga completo antes da entrega.",
  "quandoCompensa": "Notebooks com menos de 4 anos geralmente compensam o reparo. Troca de bateria ou DC jack tem custo-benefício excelente comparado a um notebook novo.",
  "quandoNaoCompensa": "Se o circuito de carga queimou em notebook com mais de 5 anos e outros componentes já apresentam desgaste, pode ser mais vantajoso investir em um equipamento novo.",
  "whatsappMessage": "Olá! Meu notebook não está carregando a bateria. Gostaria de agendar um diagnóstico.",
  "relatedPages": [
    {
      "to": "/problemas/notebook-desliga-sozinho-curitiba",
      "label": "Notebook Desliga Sozinho"
    },
    {
      "to": "/problemas/computador-nao-liga-curitiba",
      "label": "Computador Não Liga"
    },
    {
      "to": "/conserto-notebook",
      "label": "Conserto de Notebook"
    },
    {
      "to": "/problemas/fonte-queimada-curitiba",
      "label": "Fonte Queimada"
    }
  ],
  "conteudoExtra": "## Dicas Para Prolongar a Vida da Bateria\n\n- Evite usar o notebook sempre na tomada — faça ciclos de carga/descarga periodicamente\n- Use carregador original ou de marca certificada\n- Não deixe a bateria chegar a 0% frequentemente\n- Em notebooks com opção, ative o limite de carga em 80% para uso fixo\n\n## Tipos de Conector DC\n\nExistem dezenas de padrões: barrel jack (redondo), USB-C PD, pino central fino. Cada modelo exige peça específica — por isso o diagnóstico profissional é essencial antes de comprar qualquer peça."
};
