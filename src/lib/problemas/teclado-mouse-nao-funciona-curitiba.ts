import type { ProblemaPageData } from "./types";

export const problema: ProblemaPageData = {
  "slug": "teclado-mouse-nao-funciona-curitiba",
  "title": "Teclado ou Mouse Não Funciona em Curitiba | Diagnóstico Rápido",
  "metaDescription": "Teclado ou mouse não funcionam? Diagnóstico rápido em Curitiba. Porta USB, driver, Bluetooth. Atendimento no mesmo dia. Atendimento pelo WhatsApp.",
  "h1": "Teclado ou Mouse Não Funciona — Diagnóstico e Soluções Rápidas",
  "categoria": "Problemas de Periféricos",
  "intro": "Teclado ou mouse pararam de funcionar? Antes de comprar novos, saiba que em muitos casos o problema está no computador — não no periférico.\n\nPortas USB defeituosas, drivers corrompidos, conflitos de Bluetooth ou sujeira acumulada podem ser a causa real.\n\nEm Curitiba, diagnosticamos e resolvemos com rapidez, evitando gastos desnecessários.",
  "sintomas": [
    {
      "titulo": "USB não é reconhecido",
      "desc": "Windows não detecta o dispositivo. Pode ser porta ou driver.",
      "gravidade": "Simples"
    },
    {
      "titulo": "Bluetooth desconecta frequentemente",
      "desc": "Problema de bateria, driver ou interferência.",
      "gravidade": "Simples a Médio"
    },
    {
      "titulo": "Teclas específicas não funcionam",
      "desc": "Sujeira, líquido derramado ou desgaste mecânico.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Cursor travando ou pulando",
      "desc": "Sensor sujo, superfície inadequada ou interferência.",
      "gravidade": "Simples"
    },
    {
      "titulo": "Nenhuma porta USB funciona",
      "desc": "Problema na placa-mãe ou no Windows.",
      "gravidade": "Médio a Complexo"
    }
  ],
  "causas": [
    {
      "titulo": "Porta USB com mau contato",
      "desc": "Portas frontais do gabinete são propensas a mau contato.",
      "tipo": "hardware"
    },
    {
      "titulo": "Driver USB corrompido",
      "desc": "Windows Update pode corromper drivers USB.",
      "tipo": "software"
    },
    {
      "titulo": "Sujeira ou líquido no teclado",
      "desc": "Migalhas, poeira e líquido são as causas mais comuns.",
      "tipo": "erro-humano"
    },
    {
      "titulo": "Hub USB sobrecarregado",
      "desc": "Muitos dispositivos em um hub causam falta de energia.",
      "tipo": "erro-humano"
    },
    {
      "titulo": "Bateria fraca em sem fio",
      "desc": "Bateria baixa causa comportamento errático.",
      "tipo": "desgaste"
    }
  ],
  "cenarios": [
    {
      "nivel": "Simples",
      "desc": "Troca de porta USB, reinstalação de driver, troca de pilhas",
      "tempo": "15–30min",
      "custo": "R$50–R$100"
    },
    {
      "nivel": "Médio",
      "desc": "Limpeza de teclado, reparo de conector USB",
      "tempo": "30min–1h",
      "custo": "R$80–R$180"
    },
    {
      "nivel": "Complexo",
      "desc": "Reparo de controlador USB na placa-mãe",
      "tempo": "1–3 dias",
      "custo": "R$200–R$400"
    }
  ],
  "riscos": [
    "Desmontar teclado sem experiência pode quebrar clipes",
    "Forçar conector USB danifica a porta",
    "Drivers genéricos podem causar conflitos"
  ],
  "diagnostico": "Testamos periféricos em diferentes portas e em outro PC para isolar a causa. Verificamos drivers, hub USB e configurações de energia.\n\nPara teclados com teclas falhando, inspeção visual de sujeira ou dano.",
  "solucao": "Desde reinstalação de drivers (15 min) até limpeza profissional ou reparo de porta USB.\n\nPara Bluetooth, reconfiguramos pareamento e verificamos interferências.",
  "quandoCompensa": "Quando o problema é no PC (porta, driver) ou periférico de qualidade (mecânico, ergonômico).",
  "quandoNaoCompensa": "Teclados/mouses básicos (sub R$50) com defeito mecânico — substituir é mais econômico.",
  "whatsappMessage": "Olá! Meu teclado/mouse parou de funcionar. Preciso de diagnóstico.",
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
      "label": "Notebook Teclado",
      "to": "/problemas/notebook-teclado-nao-funciona-curitiba"
    },
    {
      "label": "PC Não Reconhece HD",
      "to": "/problemas/pc-nao-reconhece-hd-curitiba"
    },
    {
      "label": "Computador Não Liga",
      "to": "/problemas/computador-nao-liga-curitiba"
    }
  ],
  "conteudoExtra": "## Guia: Teclado e Mouse em Curitiba\n\n### Checklist Rápido\n\n- [ ] Teste em outra porta USB (traseira)\n- [ ] Troque pilhas/carregue sem fio\n- [ ] Reinicie o computador\n- [ ] Teste em outro PC\n- [ ] Verifique sujeira visível\n\n### Quando o Problema é no PC\n\nSe funciona em outro PC, o problema é seu: controlador USB, driver, economia de energia ou hub sobrecarregado.\n\n### Atendimento Rápido em Curitiba\n\nResolvemos no mesmo dia em toda Curitiba e região. Maioria dos casos em menos de 1 hora."
};
