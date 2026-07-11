import type { ProblemaPageData } from "./types";

export const problema: ProblemaPageData = {
  "slug": "alto-falante-queimado-curitiba",
  "title": "Alto-Falante Queimado em Curitiba | Troca e Reparo",
  "metaDescription": "Alto-falante queimado, com som distorcido ou raspando? Troca e reparo de alto-falante em Curitiba.",
  "h1": "Alto-Falante Queimado — Troca e Reparo em Curitiba",
  "categoria": "Problemas de Rádio / Som",
  "intro": "Alto-falante queimado é um dos problemas mais comuns em caixas de som, sistemas de home theater e automotivo. Os sinais são claros: distorção, som raspando, ausência de grave ou silêncio total.\n\n**Necessário trazer o equipamento à oficina.**",
  "sintomas": [
    {
      "titulo": "Som distorcido/raspando",
      "desc": "Bobina descolada raspando no ímã. Distorção em qualquer volume.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Sem grave (woofer)",
      "desc": "O woofer não se move ou se move sem produzir som.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Silêncio total no alto-falante",
      "desc": "Bobina queimada/rompida. Sem continuidade elétrica.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Som com vibração estranha",
      "desc": "Suspensão rasgada ou cola solta. Partes do cone vibram soltas.",
      "gravidade": "Simples a médio"
    }
  ],
  "causas": [
    {
      "titulo": "Volume excessivo",
      "desc": "Potência acima do suportado queima a bobina.",
      "tipo": "erro-humano"
    },
    {
      "titulo": "Amplificador em clipping",
      "desc": "Amplificador saturado envia sinal distorcido que queima o alto-falante.",
      "tipo": "erro-humano"
    },
    {
      "titulo": "Desgaste natural",
      "desc": "Suspensão e cone degradam com anos de uso.",
      "tipo": "desgaste"
    },
    {
      "titulo": "Umidade",
      "desc": "Ambientes úmidos deterioram cone de papel e cola.",
      "tipo": "desgaste"
    }
  ],
  "cenarios": [
    {
      "nivel": "Simples",
      "desc": "Reparo de suspensão (refoam/recone parcial).",
      "tempo": "3 a 5 dias",
      "custo": "R$ 80 a R$ 200"
    },
    {
      "nivel": "Médio",
      "desc": "Recone completo (troca de cone, bobina e suspensão).",
      "tempo": "5 a 10 dias",
      "custo": "R$ 150 a R$ 400"
    },
    {
      "nivel": "Complexo",
      "desc": "Substituição completa do alto-falante.",
      "tempo": "3 a 15 dias",
      "custo": "R$ 200 a R$ 600"
    }
  ],
  "riscos": [
    "Usar alto-falante raspando pode danificar o amplificador",
    "Recone genérico pode alterar a sonoridade original"
  ],
  "diagnostico": "Teste de continuidade, medição de impedância, inspeção visual de cone e bobina. Presencial na oficina.",
  "solucao": "Recone, reparo de suspensão ou substituição do alto-falante.",
  "quandoCompensa": "Alto-falantes de qualidade (Selenium, JBL, Eminence) compensam recone.",
  "quandoNaoCompensa": "Alto-falantes genéricos muito baratos — substituir por novo é mais viável.",
  "whatsappMessage": "Olá! Meu alto-falante queimou. Podem consertar ou trocar?",
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
      "label": "Som Chiando",
      "to": "/problemas/som-chiando-curitiba"
    },
    {
      "label": "Caixa Sem Áudio",
      "to": "/problemas/caixa-som-sem-audio-curitiba"
    }
  ],
  "conteudoExtra": "## Recone vs Troca\n\n- **Recone:** Troca do cone, bobina e suspensão mantendo o chassi. Mais barato, mantém originalidade.\n- **Troca:** Substituição completa. Necessário quando o chassi está danificado.\n\n## Prevenção\n\n- Nunca ultrapasse a potência RMS do alto-falante\n- Use amplificador compatível com a impedância\n- Evite ambientes muito úmidos"
};
