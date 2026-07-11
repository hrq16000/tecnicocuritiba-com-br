import type { ProblemaPageData } from "./types";

export const problema: ProblemaPageData = {
  "slug": "celular-lento-curitiba",
  "title": "Celular Lento em Curitiba | Otimização e Conserto",
  "metaDescription": "Celular lento, travando ou demorando para abrir apps? Diagnóstico e otimização profissional em Curitiba. Samsung, Motorola, iPhone, Xiaomi.",
  "h1": "Celular Lento ou Travando — Solução Profissional em Curitiba",
  "categoria": "Problemas de Celular",
  "intro": "Celular lento é uma das queixas mais frustrantes. Apps demoram para abrir, o teclado trava, vídeos engasgam, e tudo que deveria ser rápido se torna um exercício de paciência.\n\nAs causas são variadas: pode ser excesso de apps, memória cheia, bateria degradada que reduz o desempenho, ou até mesmo hardware com problemas. Em muitos casos, uma limpeza e otimização profissional resolve. Em outros, pode ser necessário trocar a bateria ou a memória interna.\n\nAtendimento presencial na oficina em Curitiba, com diagnóstico e orçamento humanizado.",
  "sintomas": [
    {
      "titulo": "Apps demoram para abrir",
      "desc": "Tempo de carregamento muito acima do normal. Apps ficam com tela branca por segundos antes de funcionar.",
      "gravidade": "Simples a médio"
    },
    {
      "titulo": "Teclado trava ao digitar",
      "desc": "Letras aparecem com atraso, o teclado congela ou fecha sozinho. Geralmente falta de RAM.",
      "gravidade": "Simples"
    },
    {
      "titulo": "Celular esquenta ao usar",
      "desc": "Aquecimento excessivo durante uso normal (não carregando). Pode ser app em segundo plano ou bateria degradada.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Bateria acaba muito rápido",
      "desc": "Bateria que durava o dia todo agora dura poucas horas. Bateria degradada força o processador a trabalhar mais.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Armazenamento cheio",
      "desc": "'Memória cheia' constante. Fotos, vídeos, cache de apps e WhatsApp consomem todo o espaço.",
      "gravidade": "Simples"
    }
  ],
  "causas": [
    {
      "titulo": "Excesso de apps e cache",
      "desc": "Dezenas de apps instalados, cache acumulado de meses. Consome RAM e armazenamento.",
      "tipo": "software"
    },
    {
      "titulo": "Sistema operacional desatualizado",
      "desc": "Versões antigas do Android/iOS não são otimizadas para apps novos.",
      "tipo": "software"
    },
    {
      "titulo": "Bateria degradada",
      "desc": "Baterias com menos de 80% de saúde reduzem o clock do processador para evitar desligamentos.",
      "tipo": "desgaste"
    },
    {
      "titulo": "Memória interna com setores defeituosos",
      "desc": "Após muito uso, a memória flash pode desenvolver setores lentos, travando leitura/gravação.",
      "tipo": "desgaste"
    },
    {
      "titulo": "Malware ou apps em segundo plano",
      "desc": "Apps maliciosos ou mal otimizados consumindo CPU e dados em segundo plano.",
      "tipo": "software"
    }
  ],
  "cenarios": [
    {
      "nivel": "Simples",
      "desc": "Limpeza de cache, remoção de apps desnecessários, otimização de sistema.",
      "tempo": "1 a 2 horas",
      "custo": "R$ 80 a R$ 150"
    },
    {
      "nivel": "Médio",
      "desc": "Reset de fábrica com backup + restauração seletiva + troca de bateria.",
      "tempo": "1 a 2 dias",
      "custo": "R$ 150 a R$ 350"
    },
    {
      "nivel": "Complexo",
      "desc": "Troca de memória interna (eMMC/UFS) — requer microssolda.",
      "tempo": "3 a 7 dias",
      "custo": "R$ 300 a R$ 700"
    }
  ],
  "riscos": [
    "Reset sem backup adequado causa perda de dados",
    "Apps de 'limpeza' da Play Store frequentemente são malware",
    "Celular muito lento pode indicar problema de hardware que vai piorar"
  ],
  "diagnostico": "Análise de consumo de RAM, armazenamento, saúde da bateria e teste de velocidade de leitura/gravação da memória. Presencial na oficina.",
  "solucao": "Desde otimização de software até troca de bateria ou memória interna, conforme diagnóstico.",
  "quandoCompensa": "Sempre vale tentar otimização primeiro (baixo custo). Troca de bateria compensa em celulares de até 3 anos. Troca de memória em modelos de alto valor.",
  "quandoNaoCompensa": "Celulares com mais de 4 anos e processador obsoleto — mesmo otimizado, não terá performance aceitável com apps modernos.",
  "whatsappMessage": "Olá! Meu celular está muito lento e preciso de ajuda. Podem fazer um diagnóstico?",
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
      "label": "Celular Não Liga",
      "to": "/problemas/celular-nao-liga-curitiba"
    },
    {
      "label": "Celular com Vírus",
      "to": "/problemas/celular-com-virus-curitiba"
    }
  ],
  "conteudoExtra": "## Dicas Para Manter o Celular Rápido\n\n1. **Mantenha pelo menos 20% do armazenamento livre** — Celular cheio = celular lento\n2. **Reinicie uma vez por semana** — Limpa processos travados na memória\n3. **Desinstale apps que não usa** — Cada app consome recursos mesmo sem abrir\n4. **Use versões Lite** — Facebook Lite, Instagram Lite, etc. consomem muito menos recursos\n5. **Evite apps de limpeza** — A maioria é inútil ou prejudicial. O próprio sistema gerencia memória\n\n## Quando Considerar um Celular Novo?\n\n- Processador com mais de 4 anos não acompanha apps modernos\n- RAM abaixo de 4 GB é insuficiente para uso atual\n- Se o custo do reparo ultrapassa 50% do valor de um modelo similar novo"
};
