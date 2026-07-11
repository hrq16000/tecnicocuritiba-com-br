import type { ProblemaPageData } from "./types";

export const problema: ProblemaPageData = {
  "slug": "monitor-piscando-curitiba",
  "title": "Monitor Piscando em Curitiba | Diagnóstico e Reparo Profissional",
  "metaDescription": "Monitor piscando, com flickering ou desligando sozinho? Técnico em Curitiba diagnostica e repara problemas de monitor e placa de vídeo com precisão.",
  "h1": "Monitor Piscando — Diagnóstico e Reparo em Curitiba",
  "categoria": "Hardware / Vídeo",
  "intro": "Monitor piscando é um problema que afeta tanto a produtividade quanto a saúde visual. O flickering pode se manifestar como piscadas rápidas imperceptíveis (que causam dor de cabeça e fadiga ocular) ou como desligamentos completos da tela com intervalos regulares.\n\nAs causas são variadas: pode ser um problema no próprio monitor (capacitores da fonte interna, backlight ou painel), no cabo de vídeo (HDMI, DisplayPort, VGA), na placa de vídeo, nos drivers ou até na frequência de atualização configurada no Windows.\n\nEm Curitiba, nosso técnico realiza diagnóstico completo testando cada componente da cadeia de vídeo para identificar exatamente a origem do problema antes de qualquer intervenção.",
  "sintomas": [
    {
      "titulo": "Monitor pisca em intervalos regulares",
      "desc": "A tela apaga e reacende a cada poucos segundos com padrão repetitivo, indicando possível problema no cabo ou frequência de atualização.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Tela com flickering sutil e constante",
      "desc": "Tremulação leve e contínua da imagem, mais perceptível em fundos claros. Causa fadiga ocular e dor de cabeça.",
      "gravidade": "Simples"
    },
    {
      "titulo": "Monitor desliga e liga sozinho",
      "desc": "A tela fica preta por alguns segundos e retorna, às vezes com a mensagem 'Sem sinal' antes de voltar.",
      "gravidade": "Complexo"
    },
    {
      "titulo": "Linhas horizontais ou verticais piscando",
      "desc": "Linhas coloridas ou brancas aparecem intermitentemente na tela, indicando problema no painel ou na conexão de vídeo.",
      "gravidade": "Complexo"
    },
    {
      "titulo": "Monitor pisca apenas em certas resoluções",
      "desc": "O flickering ocorre apenas quando uma resolução ou taxa de atualização específica é configurada.",
      "gravidade": "Simples"
    },
    {
      "titulo": "Brilho do monitor oscila sozinho",
      "desc": "O brilho aumenta e diminui automaticamente sem intervenção, geralmente relacionado ao sensor de luz ambiente ou backlight defeituoso.",
      "gravidade": "Médio"
    }
  ],
  "causas": [
    {
      "titulo": "Cabo de vídeo danificado ou solto",
      "desc": "Cabos HDMI, DisplayPort ou VGA com mau contato ou danificados causam perda intermitente de sinal, resultando em piscadas.",
      "tipo": "hardware"
    },
    {
      "titulo": "Taxa de atualização incompatível",
      "desc": "Configurar uma taxa de atualização (Hz) não suportada nativamente pelo monitor causa flickering ou desligamentos.",
      "tipo": "software"
    },
    {
      "titulo": "Capacitores da fonte do monitor estufados",
      "desc": "Capacitores eletrolíticos da placa-fonte interna do monitor perdem capacidade com o tempo, causando instabilidade na alimentação do painel.",
      "tipo": "desgaste"
    },
    {
      "titulo": "Driver de placa de vídeo com defeito",
      "desc": "Drivers desatualizados, corrompidos ou incompatíveis podem causar flickering, especialmente após atualizações do Windows.",
      "tipo": "software"
    },
    {
      "titulo": "Placa de vídeo superaquecendo ou com defeito",
      "desc": "GPU com temperatura excessiva ou falha de memória de vídeo pode causar artefatos e flickering na imagem.",
      "tipo": "hardware"
    },
    {
      "titulo": "Backlight do monitor com defeito",
      "desc": "LEDs de retroiluminação falhando causam oscilação de brilho ou piscadas em áreas específicas da tela.",
      "tipo": "desgaste"
    }
  ],
  "cenarios": [
    {
      "nivel": "Simples",
      "desc": "Problema de cabo solto, driver ou configuração de frequência — ajuste rápido resolve.",
      "tempo": "30min–1h",
      "custo": "R$80–R$120"
    },
    {
      "nivel": "Médio",
      "desc": "Cabo defeituoso ou driver com conflito — substituição de cabo e reinstalação limpa do driver.",
      "tempo": "1–2h",
      "custo": "R$120–R$200"
    },
    {
      "nivel": "Complexo",
      "desc": "Capacitores do monitor estufados ou backlight defeituoso — reparo eletrônico ou substituição de componentes.",
      "tempo": "3–7 dias",
      "custo": "R$200–R$450"
    }
  ],
  "riscos": [
    "Usar o monitor piscando por longos períodos causa dor de cabeça, fadiga ocular e pode agravar problemas de visão",
    "Capacitores estufados podem estourar e causar curto-circuito, danificando outros componentes do monitor",
    "Trocar cabos por versões incompatíveis pode não resolver e mascarar um problema mais grave",
    "Tentar abrir o monitor sem conhecimento expõe a capacitores de alta voltagem — risco de choque elétrico grave",
    "Ignorar flickering causado pela placa de vídeo pode indicar falha progressiva que levará à perda total da GPU"
  ],
  "diagnostico": "O diagnóstico de monitor piscando é sistemático:\n\n1. Teste com outro cabo de vídeo (HDMI, DP ou VGA) para descartar problema no cabo.\n2. Teste do monitor em outro computador para isolar se o problema é do monitor ou do PC.\n3. Verificação da taxa de atualização e resolução configuradas no Windows.\n4. Análise do driver da placa de vídeo e teste com driver genérico.\n5. Inspeção interna do monitor (capacitores, placa-fonte, backlight) quando necessário.\n6. Teste de temperatura da GPU sob carga para descartar superaquecimento.\n\nO diagnóstico custa a partir de R$50 e é abatido do serviço caso o reparo seja aprovado.",
  "solucao": "A solução depende da causa identificada:\n\n**Software:** Ajuste de taxa de atualização para o valor nativo do monitor, instalação limpa do driver da placa de vídeo (DDU + driver mais recente estável), desativação de recursos como FreeSync/G-Sync quando incompatíveis.\n\n**Cabos e conexões:** Substituição por cabo certificado de qualidade (HDMI 2.0+ ou DisplayPort 1.4+). Verificação e limpeza das portas de vídeo.\n\n**Reparo de monitor:** Substituição de capacitores estufados na placa-fonte interna. Reparo ou troca da barra de LEDs do backlight. Em monitores com valor agregado, o reparo é economicamente viável.\n\n**Placa de vídeo:** Limpeza do cooler da GPU, troca de pasta térmica. Em caso de defeito, orientação para substituição com melhor custo-benefício.\n\nTodos os reparos incluem teste de estabilidade prolongado antes da entrega.",
  "quandoCompensa": "Quando o monitor é de boa qualidade (IPS, 144Hz+, 4K) e o custo do reparo é inferior a 40% do valor de um monitor equivalente novo.",
  "quandoNaoCompensa": "Quando o monitor é básico (TN, Full HD, 60Hz) com mais de 5 anos e o custo de um monitor novo equivalente é baixo (R$500-700).",
  "whatsappMessage": "Olá! Meu monitor está piscando/com flickering. Preciso de diagnóstico em Curitiba.",
  "relatedPages": [
    {
      "to": "/problemas/pc-sem-som-hdmi-curitiba",
      "label": "PC Sem Som HDMI"
    },
    {
      "to": "/problemas/pc-travando-em-jogos-curitiba",
      "label": "PC Travando em Jogos"
    },
    {
      "to": "/problemas/computador-nao-liga-curitiba",
      "label": "Computador Não Liga"
    },
    {
      "to": "/conserto-notebook-curitiba",
      "label": "Conserto de Notebook"
    },
    {
      "to": "/atendimento-domicilio",
      "label": "Atendimento a Domicílio"
    },
    {
      "to": "/servicos",
      "label": "Todos os Serviços"
    }
  ],
  "conteudoExtra": "## Como Testar se o Problema é do Monitor ou do PC\n\n### Teste rápido\n1. Desconecte o cabo de vídeo do PC\n2. Se o monitor exibir a mensagem \"Sem sinal\" sem piscar, o monitor está OK — o problema é no PC ou cabo\n3. Se o monitor continuar piscando mesmo sem sinal, o defeito é interno do monitor\n\n### Teste do cabo\n1. Experimente outro cabo de vídeo (peça emprestado se necessário)\n2. Se possível, teste com outro tipo de conexão (ex: trocar HDMI por DisplayPort)\n\n### Teste cruzado\n1. Conecte o monitor em outro PC ou notebook\n2. Conecte outro monitor no seu PC\n3. Isso isola definitivamente se o problema é do monitor, do PC ou do cabo\n\n## Frequências de Atualização e Flickering\n\n| Frequência | Flickering visível? | Recomendação |\n|-----------|--------------------|--------------|\n| 60Hz | Possível em CRT, raro em LCD | Mínimo aceitável para LCD |\n| 75Hz | Raro | Bom para uso geral |\n| 120Hz+ | Muito raro | Ideal para jogos e produtividade |"
};
