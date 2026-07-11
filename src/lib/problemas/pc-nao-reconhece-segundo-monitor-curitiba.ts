import type { ProblemaPageData } from "./types";

export const problema: ProblemaPageData = {
  "slug": "pc-nao-reconhece-segundo-monitor-curitiba",
  "title": "PC Não Reconhece Segundo Monitor em Curitiba | Técnico Especialista",
  "metaDescription": "Segundo monitor não é reconhecido pelo PC ou notebook? Técnico em Curitiba resolve problemas de dual monitor com diagnóstico profissional. Atendimento rápido.",
  "h1": "PC Não Reconhece Segundo Monitor — Diagnóstico e Configuração em Curitiba",
  "categoria": "Hardware — Vídeo",
  "intro": "Conectou um segundo monitor mas o PC não reconhece, não detecta ou mostra apenas um? O setup dual monitor se tornou essencial para produtividade, home office e gaming, mas configurá-lo nem sempre é simples — especialmente quando envolve tipos diferentes de saída de vídeo, adaptadores e configurações do Windows.\n\nOs problemas mais comuns envolvem: cabo ou adaptador incompatível, driver de vídeo desatualizado, configuração errada no Windows (modo de exibição), limitação da placa de vídeo ou notebook que não suporta saída simultânea em determinada resolução.\n\nEm Curitiba, configuramos setups dual e triple monitor diariamente para home offices, escritórios de contabilidade, design e programação. O diagnóstico identifica se o problema é hardware (cabo, porta, GPU) ou software (driver, configuração) para resolver com eficiência.",
  "sintomas": [
    {
      "titulo": "Segundo monitor mostra 'Sem Sinal'",
      "desc": "O monitor está ligado mas não recebe sinal do PC. Pode ser cabo errado, porta inativa, adaptador incompatível ou GPU não suportando duas saídas.",
      "gravidade": "Média"
    },
    {
      "titulo": "Windows só detecta um monitor",
      "desc": "Em Configurações → Sistema → Tela, aparece apenas '1 monitor'. O segundo não é listado nem com 'Detectar'. Problema de driver ou hardware.",
      "gravidade": "Média"
    },
    {
      "titulo": "Segundo monitor duplica em vez de estender",
      "desc": "Ambos os monitores mostram a mesma imagem em vez de estender a área de trabalho. Configuração de modo de exibição precisa ser alterada.",
      "gravidade": "Baixa"
    },
    {
      "titulo": "Resolução errada no segundo monitor",
      "desc": "O segundo monitor mostra imagem borrada, esticada ou com barras pretas. A resolução nativa não está sendo usada — ajuste necessário.",
      "gravidade": "Baixa"
    },
    {
      "titulo": "Monitor funciona sozinho mas não com o outro",
      "desc": "Cada monitor funciona individualmente quando é o único conectado, mas ao conectar os dois, um deles não funciona.",
      "gravidade": "Média"
    },
    {
      "titulo": "Segundo monitor pisca ou desconecta intermitentemente",
      "desc": "O monitor fica conectando e desconectando sozinho. Pode ser cabo com mau contato, adaptador de baixa qualidade ou limitação de bandwidth.",
      "gravidade": "Média"
    }
  ],
  "causas": [
    {
      "titulo": "Cabo ou adaptador incompatível",
      "desc": "Adaptadores HDMI-VGA baratos nem sempre funcionam. Conversores ativos são necessários para certas combinações (ex: DisplayPort para HDMI em resolução 4K).",
      "tipo": "hardware"
    },
    {
      "titulo": "Driver de vídeo desatualizado ou genérico",
      "desc": "O driver Microsoft Basic Display Adapter não suporta múltiplos monitores. É necessário o driver oficial da NVIDIA, AMD ou Intel.",
      "tipo": "software"
    },
    {
      "titulo": "Placa de vídeo não suporta saídas simultâneas",
      "desc": "Algumas GPUs integradas ou modelos antigos limitam o número de saídas simultâneas ou a resolução máxima em dual monitor.",
      "tipo": "hardware"
    },
    {
      "titulo": "Configuração de exibição errada no Windows",
      "desc": "O Windows pode estar em modo 'Apenas tela do PC' ou 'Duplicar' em vez de 'Estender'. Win + P alterna entre modos.",
      "tipo": "erro-humano"
    },
    {
      "titulo": "BIOS desabilitou vídeo integrado",
      "desc": "Ao instalar GPU dedicada, a BIOS pode desabilitar o vídeo integrado. Para usar monitor na placa-mãe + GPU, é preciso habilitar 'IGD Multi-Monitor'.",
      "tipo": "software"
    },
    {
      "titulo": "Porta de vídeo com defeito",
      "desc": "A porta HDMI, DP ou VGA do PC ou do monitor pode ter defeito mecânico — pinos tortos, oxidação ou conector frouxo.",
      "tipo": "hardware"
    }
  ],
  "cenarios": [
    {
      "nivel": "Simples",
      "desc": "Configuração correta do Windows + atualização de driver + troca de cabo. Resolve 60% dos casos.",
      "tempo": "30-60 min",
      "custo": "R$ 80–150"
    },
    {
      "nivel": "Médio",
      "desc": "Instalação de adaptador ativo + configuração de BIOS para multi-monitor + ajuste de resoluções e refresh rate.",
      "tempo": "1-2 horas",
      "custo": "R$ 150–300"
    },
    {
      "nivel": "Complexo",
      "desc": "Instalação de placa de vídeo adicional ou dock station USB-C para suportar múltiplos monitores.",
      "tempo": "2-4 horas",
      "custo": "R$ 250–800"
    }
  ],
  "riscos": [
    "Adaptadores baratos podem danificar portas de vídeo com voltagem incorreta",
    "Forçar resolução não suportada pode causar tela preta permanente até reset",
    "Usar splitter HDMI em vez de dual output resulta em imagem duplicada, não estendida",
    "Driver de vídeo errado pode desabilitar todos os monitores temporariamente",
    "Notebooks com GPU híbrida (Intel + NVIDIA) têm limitações de saída que confundem o diagnóstico"
  ],
  "diagnostico": "Diagnóstico de dual monitor:\n\n1. Verificação de cabos e adaptadores (tipo, qualidade, compatibilidade)\n2. Teste de cada porta de vídeo individualmente\n3. Verificação de driver de vídeo (versão, fabricante)\n4. Configuração do Windows (Win + P, Configurações de Tela)\n5. Verificação de BIOS (IGD Multi-Monitor, saída primária)\n6. Teste com outro monitor/cabo para isolar o problema\n\nCusto: R$ 80 (incorporado se aprovar o serviço).",
  "solucao": "Solução conforme a causa:\n\n- **Cabo**: Troca por cabo certificado do tipo correto (HDMI 2.0, DP 1.4)\n- **Adaptador**: Instalação de adaptador ativo de qualidade (não splitter)\n- **Driver**: DDU + instalação limpa do driver NVIDIA/AMD/Intel\n- **Configuração**: Win + P → Estender + ajuste de resolução e posição dos monitores\n- **BIOS**: Habilitação de IGD Multi-Monitor e configuração de saída primária\n- **GPU**: Instalação de placa de vídeo com múltiplas saídas ou dock USB-C\n\nCalibração de resolução, refresh rate e posição dos monitores incluída.",
  "quandoCompensa": "Sempre — configurar dual monitor custa R$ 80-300 e aumenta drasticamente a produtividade. Até instalar GPU dedicada vale o investimento.",
  "quandoNaoCompensa": "Quando o notebook ou PC simplesmente não tem capacidade gráfica para dois monitores na resolução desejada — nesse caso, upgrade de GPU é necessário.",
  "whatsappMessage": "Olá! Meu PC não reconhece o segundo monitor. Podem me ajudar a configurar?",
  "relatedPages": [
    {
      "to": "/problemas/pc-sem-imagem-curitiba",
      "label": "PC Sem Imagem"
    },
    {
      "to": "/problemas/monitor-sem-sinal-curitiba",
      "label": "Monitor Sem Sinal"
    },
    {
      "to": "/problemas/erro-driver-windows-curitiba",
      "label": "Erro de Driver"
    },
    {
      "to": "/servicos/redes-wifi",
      "label": "Redes e Infraestrutura"
    },
    {
      "to": "/como-funciona",
      "label": "Como Funciona"
    },
    {
      "to": "/precos-e-politicas",
      "label": "Preços e Políticas"
    }
  ],
  "conteudoExtra": "## Dual Monitor: Guia Completo\n\n### Tipos de Conexão de Vídeo\n\n| Conexão | Resolução Máx | Áudio | Melhor Para |\n|---|---|---|---|\n| VGA | 1920x1080 | Não | Monitores antigos |\n| DVI-D | 2560x1600 | Não | Desktop |\n| HDMI 2.0 | 4K 60Hz | Sim | Uso geral |\n| HDMI 2.1 | 4K 120Hz | Sim | Gaming |\n| DisplayPort 1.4 | 4K 120Hz | Sim | Produtividade |\n| USB-C/Thunderbolt | 5K 60Hz | Sim | Notebooks modernos |\n\n### Atalhos Úteis para Dual Monitor\n\n| Atalho | Função |\n|---|---|\n| Win + P | Alternar modo (Duplicar/Estender) |\n| Win + Shift + ← ou → | Mover janela entre monitores |\n| Win + ↑ | Maximizar janela no monitor atual |\n| Win + ← ou → | Snap janela para metade da tela |\n\n### Configuração Ideal por Uso\n\n| Uso | Resolução Ideal | Tamanho | Painel |\n|---|---|---|---|\n| Escritório/Office | Full HD (1080p) | 24\" | IPS |\n| Design/Foto | QHD (1440p) ou 4K | 27\" | IPS sRGB 99%+ |\n| Programação | QHD (1440p) | 27\" | IPS |\n| Gaming | Full HD ou QHD | 24-27\" | IPS 144Hz+ |"
};
