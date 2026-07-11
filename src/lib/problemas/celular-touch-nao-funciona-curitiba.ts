import type { ProblemaPageData } from "./types";

export const problema: ProblemaPageData = {
  "slug": "celular-touch-nao-funciona-curitiba",
  "title": "Touch do Celular Não Funciona em Curitiba | Conserto",
  "metaDescription": "Tela do celular não responde ao toque? Touch fantasma, áreas mortas ou digitalizador com defeito? Conserto profissional em Curitiba.",
  "h1": "Touch do Celular Não Funciona — Conserto em Curitiba",
  "categoria": "Problemas de Celular",
  "intro": "Quando o touch do celular para de funcionar, o aparelho se torna praticamente inútil. Você vê tudo na tela mas não consegue interagir — não dá para atender ligações, responder mensagens ou desbloquear o celular.\n\nO problema pode ser parcial (áreas mortas) ou total (nenhum toque é reconhecido). Em alguns casos, ocorre o \"touch fantasma\": a tela responde sozinha, abrindo apps, digitando e fazendo ações sem ninguém tocar.\n\nAs causas variam de problema no digitalizador (componente do display), dano por queda, até falha no CI de touch na placa-mãe.",
  "sintomas": [
    {
      "titulo": "Tela não responde em nenhum ponto",
      "desc": "Nenhum toque é reconhecido. Pode ser digitalizador danificado, flat cable solto ou CI de touch.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Áreas mortas na tela",
      "desc": "Parte da tela funciona, outra não. Geralmente trinca interna no digitalizador ou ponto de impacto.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Touch fantasma (toca sozinho)",
      "desc": "A tela registra toques inexistentes. Abre apps sozinha, digita letras aleatórias. Pode ser umidade ou falha no digitalizador.",
      "gravidade": "Alto"
    },
    {
      "titulo": "Atraso no reconhecimento do toque",
      "desc": "Há um delay perceptível entre tocar e a resposta. Problema de software ou digitalizador degradado.",
      "gravidade": "Simples a médio"
    }
  ],
  "causas": [
    {
      "titulo": "Queda e impacto",
      "desc": "Mesmo sem trincar o vidro, o impacto pode danificar o digitalizador ou soltar o flat cable.",
      "tipo": "erro-humano"
    },
    {
      "titulo": "Película de vidro inadequada",
      "desc": "Películas muito grossas ou mal aplicadas podem interferir na sensibilidade do touch.",
      "tipo": "erro-humano"
    },
    {
      "titulo": "Contato com água/umidade",
      "desc": "Umidade entre o display e o digitalizador causa touch fantasma.",
      "tipo": "erro-humano"
    },
    {
      "titulo": "CI de touch na placa",
      "desc": "Chip na placa-mãe responsável por processar os sinais de toque. Pode falhar por calor ou impacto.",
      "tipo": "hardware"
    }
  ],
  "cenarios": [
    {
      "nivel": "Simples",
      "desc": "Reconexão do flat cable ou troca de película. Calibração de touch.",
      "tempo": "30 min a 1 hora",
      "custo": "R$ 50 a R$ 100"
    },
    {
      "nivel": "Médio",
      "desc": "Troca do módulo de display (vidro + digitalizador + tela).",
      "tempo": "1 a 3 dias",
      "custo": "R$ 200 a R$ 600"
    },
    {
      "nivel": "Complexo",
      "desc": "Troca do CI de touch na placa (microssolda).",
      "tempo": "3 a 7 dias",
      "custo": "R$ 250 a R$ 500"
    }
  ],
  "riscos": [
    "Touch fantasma pode fazer ligações, enviar mensagens ou movimentar apps bancários",
    "Áreas mortas tendem a aumentar com o tempo",
    "Usar com touch parcial pode causar operações não intencionais"
  ],
  "diagnostico": "Teste de mapa de toque, verificação de flat cable e conector, análise de histórico (queda, água). Presencial na oficina.",
  "solucao": "Troca de display, reconexão de componentes ou reparo de placa, conforme o caso.",
  "quandoCompensa": "Se o problema é no display (digitalizador), a troca resolve 100%. Para CI de touch, compensa em celulares de médio e alto valor.",
  "quandoNaoCompensa": "CI de touch em celular de baixo valor onde o custo da microssolda é alto relativamente ao aparelho.",
  "whatsappMessage": "Olá! O touch do meu celular parou de funcionar. Podem diagnosticar?",
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
      "label": "Tela Quebrada",
      "to": "/problemas/celular-tela-quebrada-curitiba"
    },
    {
      "label": "Celular Molhou",
      "to": "/problemas/celular-molhou-curitiba"
    }
  ],
  "conteudoExtra": "## Touch Fantasma: O Problema Mais Assustador\n\nO touch fantasma é quando a tela do celular parece ter vida própria. Toques são registrados sem ninguém encostar, apps abrem sozinhos, textos são digitados aleatoriamente.\n\n### Causas Mais Comuns\n- Umidade interna (mesmo sem ter molhado visivelmente)\n- Trinca interna no digitalizador (invisível externamente)\n- CI de touch com defeito\n- Película de vidro danificada causando pressão irregular\n\n### Solução Temporária\nSe o touch fantasma está causando ações indesejadas (comprando coisas, enviando mensagens), desligue o celular imediatamente e leve ao técnico."
};
