import type { ProblemaPageData } from "./types";

export const problema: ProblemaPageData = {
  "slug": "notebook-nao-liga-curitiba",
  "title": "Notebook Não Liga em Curitiba | Diagnóstico Profissional",
  "metaDescription": "Notebook não liga? Veja causas, sintomas e soluções. Diagnóstico profissional em Curitiba com atendimento a domicílio no mesmo dia.",
  "h1": "Notebook Não Liga em Curitiba — Diagnóstico e Solução",
  "categoria": "Notebook",
  "intro": "Um notebook que não liga é uma situação comum, mas que pode ter causas muito variadas. Diferente de um desktop, o notebook tem componentes integrados (bateria, teclado, tela) que adicionam mais variáveis ao diagnóstico.\n\nAs causas podem ir de algo simples como bateria completamente descarregada até problemas sérios como placa-mãe com curto. O importante é não tentar abrir o notebook por conta própria — a maioria dos modelos usa parafusos especiais e clips frágeis que quebram facilmente.\n\nAtendemos notebooks de todas as marcas (Dell, Lenovo, HP, Acer, Asus, Samsung, Apple) em Curitiba e região metropolitana.",
  "sintomas": [
    {
      "titulo": "Nenhuma reação ao botão power",
      "desc": "Nada acontece. Pode ser bateria morta, carregador com defeito, jack de energia solto ou placa-mãe.",
      "gravidade": "Médio a complexo"
    },
    {
      "titulo": "LED de carregamento pisca",
      "desc": "Indica atividade mas não inicia. Bateria com problema, memória ou placa-mãe.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Tela preta mas ventoinha gira",
      "desc": "Notebook liga internamente mas não exibe imagem. Tela, GPU integrada ou flex.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Liga e desliga imediatamente",
      "desc": "Inicia por 1-2 segundos e desliga. Curto, superaquecimento ou proteção de energia.",
      "gravidade": "Complexo"
    },
    {
      "titulo": "Fica na tela do logo e trava",
      "desc": "Não passa do boot. Windows corrompido, disco com falha ou BIOS com problema.",
      "gravidade": "Simples a médio"
    }
  ],
  "causas": [
    {
      "titulo": "Carregador ou jack de energia com defeito",
      "desc": "O carregador pode ter cabo rompido internamente ou o conector no notebook pode estar solto/oxidado.",
      "tipo": "hardware"
    },
    {
      "titulo": "Bateria completamente degradada",
      "desc": "Baterias de notebook duram 2-4 anos. Após esse período, podem inchar, não carregar ou impedir a inicialização.",
      "tipo": "desgaste"
    },
    {
      "titulo": "Memória RAM mal encaixada",
      "desc": "Após quedas ou vibrações, a RAM pode sair do slot. O notebook liga mas não inicializa.",
      "tipo": "hardware"
    },
    {
      "titulo": "Placa-mãe com curto",
      "desc": "Pode ser causado por líquido derramado, pico de energia ou desgaste natural de componentes.",
      "tipo": "hardware"
    },
    {
      "titulo": "Flex da tela rompido",
      "desc": "O cabo que conecta a placa à tela pode romper com o tempo. Notebook liga (você ouve sons) mas tela fica preta.",
      "tipo": "desgaste"
    }
  ],
  "cenarios": [
    {
      "nivel": "Simples",
      "desc": "Troca de carregador, reset de BIOS, reencaixe de RAM.",
      "tempo": "30 min a 1h",
      "custo": "R$ 99,99 a R$ 200"
    },
    {
      "nivel": "Médio",
      "desc": "Troca de bateria, reparo de jack de energia, reinstalação de sistema.",
      "tempo": "1h a 4h",
      "custo": "R$ 200 a R$ 450 + peça"
    },
    {
      "nivel": "Complexo",
      "desc": "Reparo de placa-mãe, troca de flex, reballing de GPU. Requer bancada.",
      "tempo": "3 a 10 dias",
      "custo": "R$ 350 a R$ 800+"
    }
  ],
  "riscos": [
    "Abrir notebook sem experiência quebra clips e conectores delicados",
    "Usar carregador incompatível pode queimar a placa-mãe",
    "Forçar bateria inchada pode causar incêndio",
    "Trocar peças por achismo é caro e pode não resolver"
  ],
  "diagnostico": "Diagnóstico completo de notebook: teste de carregador com multímetro, verificação de jack de energia, teste de bateria, reencaixe de RAM, boot externo, inspeção de placa-mãe. Custo: R$ 99,99.",
  "solucao": "Após diagnóstico, apresentamos laudo com opções. Para problemas simples, resolvemos na visita. Para reparo de placa ou troca de componentes, levamos para bancada com prazo definido.",
  "quandoCompensa": "Compensa quando o notebook tem menos de 5 anos e o custo do reparo é inferior a 40% do valor de um equivalente novo.",
  "quandoNaoCompensa": "Não compensa quando a placa-mãe precisa de reparo complexo em notebook de baixo valor ou muito antigo.",
  "whatsappMessage": "Olá! Meu notebook não liga. Podem me ajudar?",
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
      "label": "Notebook Lento",
      "to": "/problemas/notebook-lento-curitiba"
    },
    {
      "label": "Notebook Sem Imagem",
      "to": "/problemas/notebook-sem-imagem-curitiba"
    },
    {
      "label": "Conserto PC/Notebook",
      "to": "/servicos/conserto-pc-notebook"
    },
    {
      "label": "Reparo Placa Notebook",
      "to": "/problemas/reparo-placa-mae-notebook-curitiba"
    },
    {
      "label": "Reballing BGA",
      "to": "/procedimentos/reballing-bga-curitiba"
    }
  ],
  "conteudoExtra": "### Antes de Chamar o Técnico\n\n1. Teste com outro carregador se possível (mesmo voltagem e amperagem)\n2. Remova a bateria (se removível) e tente ligar só na tomada\n3. Pressione e segure o botão power por 15 segundos com tudo desconectado\n4. Reconecte e tente ligar novamente\n\nSe nada funcionar, é hora do diagnóstico profissional."
};
