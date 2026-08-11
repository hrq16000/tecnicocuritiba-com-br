import type { ProblemaPageData } from "./types";

export const problema: ProblemaPageData = {
  "slug": "pc-trava-ao-jogar-curitiba",
  "title": "PC Trava ao Jogar em Curitiba | Diagnóstico Gamer Profissional",
  "metaDescription": "PC trava, congela ou reinicia durante jogos? Diagnóstico gamer em Curitiba. GPU, fonte, temperatura, drivers. Atendimento especializado. Atendimento pelo WhatsApp.",
  "h1": "PC Trava ao Jogar — Diagnóstico Gamer e Soluções Reais",
  "categoria": "Problemas Gamer",
  "intro": "Seu PC congela, trava ou reinicia no meio de uma partida? Esse é um dos problemas mais frustrantes para gamers — especialmente quando acontece em momentos cruciais.\n\nAs causas mais comuns envolvem superaquecimento de GPU, fonte de alimentação insuficiente, drivers desatualizados ou RAM instável. Mas identificar qual é o culpado exige diagnóstico profissional.\n\nEm Curitiba, oferecemos diagnóstico especializado para PCs gamer com testes de stress, monitoramento de temperatura e análise de estabilidade.",
  "sintomas": [
    {
      "titulo": "PC congela completamente durante jogo",
      "desc": "Tela congela, som trava em loop e o PC não responde a nada. Precisa forçar desligamento.",
      "gravidade": "Médio"
    },
    {
      "titulo": "PC reinicia sozinho em jogos pesados",
      "desc": "Desliga e liga sem aviso — geralmente fonte insuficiente ou superaquecimento.",
      "gravidade": "Médio a Complexo"
    },
    {
      "titulo": "Queda drástica de FPS após alguns minutos",
      "desc": "Throttling térmico — GPU ou CPU reduz performance para se proteger do calor.",
      "gravidade": "Simples a Médio"
    },
    {
      "titulo": "Tela preta durante jogo (driver crashed)",
      "desc": "Driver de vídeo para de responder. Tela preta por segundos e depois volta.",
      "gravidade": "Simples a Médio"
    },
    {
      "titulo": "Artefatos visuais (quadrados coloridos, texturas bugadas)",
      "desc": "Artefatos indicam GPU com problema — superaquecimento, memória da GPU ou defeito.",
      "gravidade": "Médio a Complexo"
    }
  ],
  "causas": [
    {
      "titulo": "GPU superaquecendo",
      "desc": "Pasta térmica seca ou cooler com poeira fazem a GPU atingir temperaturas críticas.",
      "tipo": "desgaste"
    },
    {
      "titulo": "Fonte de alimentação insuficiente",
      "desc": "Fonte subdimensionada não sustenta o consumo sob carga máxima da GPU.",
      "tipo": "hardware"
    },
    {
      "titulo": "Driver de vídeo desatualizado",
      "desc": "Drivers NVIDIA/AMD desatualizados causam crashes em jogos novos.",
      "tipo": "software"
    },
    {
      "titulo": "RAM instável ou insuficiente",
      "desc": "RAM com perfil XMP instável ou pouca memória causa travamentos.",
      "tipo": "hardware"
    },
    {
      "titulo": "SSD/HD lento causando stuttering",
      "desc": "Disco lento não carrega texturas a tempo, causando micro-travadas.",
      "tipo": "desgaste"
    },
    {
      "titulo": "GPU com defeito (memória VRAM)",
      "desc": "Memória da placa de vídeo com defeito causa artefatos e crashes.",
      "tipo": "hardware"
    }
  ],
  "cenarios": [
    {
      "nivel": "Simples",
      "desc": "Atualização de drivers, limpeza de poeira, ajuste de ventilação",
      "tempo": "1–2h",
      "custo": "R$100–R$180"
    },
    {
      "nivel": "Médio",
      "desc": "Troca de pasta térmica da GPU, teste de fonte, ajuste de RAM/XMP",
      "tempo": "2–4h",
      "custo": "R$150–R$300"
    },
    {
      "nivel": "Complexo",
      "desc": "Substituição de fonte, reparo/troca de GPU, upgrade de RAM",
      "tempo": "1–3 dias",
      "custo": "R$300–R$1000+"
    }
  ],
  "riscos": [
    "Ignorar superaquecimento pode queimar a GPU permanentemente",
    "Fonte subdimensionada pode danificar outros componentes",
    "Overclock instável acelera degradação de CPU e GPU",
    "Usar drivers beta pode causar mais instabilidade"
  ],
  "diagnostico": "Executamos testes de stress com FurMark (GPU), Prime95 (CPU) e MemTest86 (RAM) monitorando temperaturas e estabilidade. Medimos o consumo real da fonte e verificamos se atende à demanda.\n\nIdentificamos exatamente qual componente está falhando sob carga.",
  "solucao": "Para superaquecimento: limpeza + pasta térmica (custo baixo, resultado imediato). Para fonte: substituição por modelo certificado 80 Plus. Para RAM: ajuste de timings ou substituição.\n\nSempre recomendamos a solução mais econômica primeiro.",
  "quandoCompensa": "Quando o PC é capaz de rodar os jogos mas está instável — o custo de estabilizar é muito menor que comprar um PC novo.",
  "quandoNaoCompensa": "Quando o hardware é muito antigo e não atende os requisitos mínimos dos jogos atuais. Nesse caso, upgrade ou troca.",
  "whatsappMessage": "Olá! Meu PC trava/reinicia durante jogos. Preciso de diagnóstico.",
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
      "label": "PC Superaquecendo",
      "to": "/problemas/pc-superaquecendo-curitiba"
    },
    {
      "label": "GPU Desgastada",
      "to": "/problemas/gpu-desgastada"
    },
    {
      "label": "Upgrade SSD/RAM",
      "to": "/servicos/upgrade-ssd-memoria"
    },
    {
      "label": "Montagem de PC",
      "to": "/servicos/montagem-pc"
    }
  ],
  "conteudoExtra": "## Guia: PC Gamer Travando em Curitiba\n\n### Temperaturas Ideais vs Críticas\n\n| Componente | Ideal | Aceitável | Crítico |\n|---|---|---|---|\n| CPU (jogo) | 60–70°C | 70–80°C | 85°C+ |\n| GPU (jogo) | 65–75°C | 75–85°C | 90°C+ |\n| VRM (placa-mãe) | 50–70°C | 70–90°C | 100°C+ |\n\n### Calculadora de Fonte\n\n| Configuração | Fonte Recomendada |\n|---|---|\n| GTX 1650 + i5/R5 | 450W 80 Plus |\n| RTX 3060 + i5/R5 | 550W 80 Plus Bronze |\n| RTX 4070 + i7/R7 | 650W 80 Plus Gold |\n| RTX 4090 + i9/R9 | 850W+ 80 Plus Gold |\n\n### Manutenção Preventiva Para Gamers\n\n1. **Limpe a poeira** a cada 3–6 meses\n2. **Troque a pasta térmica** anualmente (GPU e CPU)\n3. **Monitore temperaturas** com HWiNFO64\n4. **Mantenha drivers atualizados** (NVIDIA GeForce Experience / AMD Adrenalin)\n5. **Não faça overclock** sem refrigeração adequada\n\n### Atendimento Gamer em Curitiba\n\nDiagnóstico especializado para PCs gamer em toda Curitiba e região. Equipamentos de teste profissionais inclusos."
};
