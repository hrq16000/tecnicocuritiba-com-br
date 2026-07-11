import type { ProblemaPageData } from "./types";

export const problema: ProblemaPageData = {
  "slug": "notebook-tela-amarelada-curitiba",
  "title": "Notebook com Tela Amarelada em Curitiba | Diagnóstico e Reparo",
  "metaDescription": "Tela do notebook amarelada ou com tonalidade quente? Saiba as causas reais — cabo flat, inversor, painel LCD ou configuração — e como resolver em Curitiba.",
  "h1": "Notebook com Tela Amarelada — Causas, Diagnóstico e Reparo em Curitiba",
  "categoria": "Hardware — Notebook",
  "intro": "A tela do notebook ficou amarelada, com tonalidade quente ou cores distorcidas? Esse problema pode ter origem em configuração de software (modo noturno, perfil de cor), cabo flat deteriorado, falha no inversor da backlight ou degradação do próprio painel LCD.\n\nEm muitos casos, a causa é simples — o modo noturno (Night Light) do Windows está ativado ou o perfil de cor ICC está incorreto. Porém, quando a tonalidade persiste mesmo com ajustes de software, o problema é físico e exige diagnóstico profissional.\n\nEm Curitiba, nosso técnico realiza testes com monitor externo para isolar se a falha está na placa de vídeo, no cabo flat ou no painel LCD, garantindo um diagnóstico preciso antes de qualquer reparo.",
  "sintomas": [
    {
      "titulo": "Tela com tom amarelado uniforme",
      "desc": "Toda a tela apresenta uma tonalidade quente/amarelada que não existia antes, alterando a percepção de cores.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Cores distorcidas em parte da tela",
      "desc": "Apenas uma região da tela apresenta alteração de cor, podendo indicar dano no painel LCD.",
      "gravidade": "Alto"
    },
    {
      "titulo": "Tela amarelada após atualização do Windows",
      "desc": "O problema surgiu após uma atualização que pode ter ativado o modo noturno ou alterado perfis de cor.",
      "gravidade": "Baixo"
    },
    {
      "titulo": "Tonalidade muda ao inclinar a tela",
      "desc": "A cor muda conforme o ângulo, indicando possível problema no cabo flat ou conexão do painel.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Tela amarelada com linhas ou manchas",
      "desc": "Além da tonalidade alterada, surgem linhas ou manchas, indicando degradação do painel LCD.",
      "gravidade": "Alto"
    }
  ],
  "causas": [
    {
      "titulo": "Modo Noturno (Night Light) ativado",
      "desc": "O Windows possui um filtro de luz azul que torna a tela amarelada. Pode ser ativado acidentalmente ou por atualização.",
      "tipo": "software"
    },
    {
      "titulo": "Perfil de cor ICC incorreto",
      "desc": "Drivers de vídeo ou atualizações podem alterar o perfil de cores do monitor, distorcendo a tonalidade.",
      "tipo": "software"
    },
    {
      "titulo": "Cabo flat deteriorado",
      "desc": "O cabo que conecta a placa-mãe ao painel LCD pode oxidar ou romper parcialmente, causando alteração de cores.",
      "tipo": "desgaste"
    },
    {
      "titulo": "Degradação do painel LCD",
      "desc": "Painéis LCD têm vida útil limitada. Com o tempo, a backlight pode amarelecer, especialmente em notebooks mais antigos.",
      "tipo": "desgaste"
    },
    {
      "titulo": "Falha na placa de vídeo integrada",
      "desc": "Problemas no chip gráfico podem causar distorção de cores em toda a saída de vídeo.",
      "tipo": "hardware"
    }
  ],
  "cenarios": [
    {
      "nivel": "Simples",
      "desc": "Modo noturno ativado ou perfil de cor incorreto — ajuste via configurações do Windows e driver de vídeo.",
      "tempo": "15-30 min",
      "custo": "R$50–R$80"
    },
    {
      "nivel": "Médio",
      "desc": "Cabo flat oxidado ou com mau contato — substituição do cabo flat do display.",
      "tempo": "1-2 horas",
      "custo": "R$150–R$300"
    },
    {
      "nivel": "Complexo",
      "desc": "Painel LCD degradado ou falha na GPU — substituição do painel ou reparo na placa-mãe.",
      "tempo": "2-5 dias",
      "custo": "R$400–R$900"
    }
  ],
  "riscos": [
    "Forçar o cabo flat pode romper a conexão permanentemente",
    "Usar perfis de cor genéricos pode mascarar problemas reais de hardware",
    "Ignorar o problema pode indicar degradação progressiva do painel",
    "Tentativas de reparo sem experiência podem danificar o display"
  ],
  "diagnostico": "O diagnóstico começa verificando configurações de software: modo noturno, perfil de cor ICC e driver de vídeo. Se o problema persistir, conectamos um monitor externo para testar a saída de vídeo da placa gráfica.\n\nSe a imagem no monitor externo estiver normal, o problema está no cabo flat ou painel LCD. Realizamos inspeção visual do cabo e testes de continuidade. Em casos de degradação do painel, avaliamos o custo-benefício da substituição versus um notebook novo.",
  "solucao": "Para causas de software, desativamos o Night Light, recalibramos o perfil de cor e atualizamos o driver de vídeo. Em casos de cabo flat, realizamos a substituição com peça compatível.\n\nPara painéis LCD degradados, substituímos o display completo com painel compatível. Em casos de falha na GPU integrada, avaliamos reparo por reballing ou substituição da placa-mãe, sempre considerando o custo-benefício.",
  "quandoCompensa": "Quando o notebook tem menos de 4 anos, o problema é no cabo flat (reparo barato) ou é apenas configuração de software.",
  "quandoNaoCompensa": "Quando o painel LCD está degradado em notebook antigo e o custo de substituição ultrapassa 60% do valor de um notebook novo equivalente.",
  "whatsappMessage": "Olá! A tela do meu notebook está amarelada. Preciso de diagnóstico e reparo em Curitiba.",
  "relatedPages": [
    {
      "to": "/problemas/notebook-com-tela-piscando-curitiba",
      "label": "Tela Piscando"
    },
    {
      "to": "/problemas/pc-sem-imagem-curitiba",
      "label": "PC Sem Imagem"
    },
    {
      "to": "/servicos/conserto-pc-notebook",
      "label": "Conserto de Notebook"
    },
    {
      "to": "/diagnostico-tecnico",
      "label": "Diagnóstico Técnico"
    }
  ],
  "conteudoExtra": "## Como Verificar se é Problema de Software\n\n1. **Desative o Night Light**: Vá em Configurações → Sistema → Tela → Desative \"Luz noturna\"\n2. **Verifique o perfil de cor**: Painel de Controle → Gerenciamento de Cores → Remova perfis personalizados\n3. **Atualize o driver de vídeo**: Acesse o site do fabricante (Intel, NVIDIA, AMD) e instale a versão mais recente\n4. **Teste com monitor externo**: Conecte via HDMI/VGA — se as cores estiverem normais no externo, o problema é no display do notebook\n\n## Quando Procurar um Técnico\n\nSe após os ajustes de software a tela continuar amarelada, é necessário diagnóstico profissional. Nosso técnico em Curitiba utiliza equipamentos de teste para identificar se a causa é o cabo flat, o painel ou a placa de vídeo."
};
