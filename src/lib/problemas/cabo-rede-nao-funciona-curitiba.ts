import type { ProblemaPageData } from "./types";

export const problema: ProblemaPageData = {
  "slug": "cabo-rede-nao-funciona-curitiba",
  "title": "Cabo de Rede Não Funciona em Curitiba | Diagnóstico de Rede Profissional",
  "metaDescription": "Cabo de rede não funciona? Internet cabeada sem conexão, velocidade baixa ou intermitente. Técnico em Curitiba diagnostica com testador certificado.",
  "h1": "Cabo de Rede Não Funciona — Diagnóstico de Rede em Curitiba",
  "categoria": "Redes / Infraestrutura",
  "intro": "Problemas com cabo de rede podem parecer simples, mas frequentemente envolvem múltiplos pontos de falha: o próprio cabo, os conectores RJ-45, as tomadas de parede, o switch/roteador ou a placa de rede do computador.\n\nEm Curitiba, nosso técnico utiliza testador de cabos profissional e certificador de rede para identificar exatamente onde está o problema — desde crimpagem mal feita até cabo com par rompido internamente.",
  "sintomas": [
    {
      "titulo": "LED da porta de rede não acende",
      "desc": "Nenhuma indicação de link no computador ou no switch/roteador. Pode ser cabo rompido, conector mal crimpado ou porta queimada.",
      "gravidade": "Alta"
    },
    {
      "titulo": "Conexão intermitente (conecta e desconecta)",
      "desc": "A rede funciona por alguns minutos e depois cai. Geralmente conector RJ-45 com mau contato ou cabo com dobra acentuada.",
      "gravidade": "Média"
    },
    {
      "titulo": "Velocidade limitada a 100Mbps em vez de 1Gbps",
      "desc": "Apenas 2 dos 4 pares do cabo estão funcionando. Cabo Cat5 antigo ou crimpagem com apenas 4 fios.",
      "gravidade": "Média"
    },
    {
      "titulo": "Rede local funciona mas sem internet",
      "desc": "O computador se conecta à rede mas não navega. Problema pode ser no roteador, DNS ou configuração de gateway.",
      "gravidade": "Média"
    },
    {
      "titulo": "Mensagem 'cabo de rede desconectado'",
      "desc": "Windows mostra cabo desconectado mesmo com cabo plugado. Pode ser driver de rede, cabo defeituoso ou porta desabilitada.",
      "gravidade": "Alta"
    },
    {
      "titulo": "Ping com perda de pacotes ou latência alta",
      "desc": "Conexão funciona mas com perdas e lentidão. Cabo com interferência, conector oxidado ou switch com problema.",
      "gravidade": "Média"
    }
  ],
  "causas": [
    {
      "titulo": "Cabo com par rompido internamente",
      "tipo": "hardware",
      "desc": "Dobras acentuadas, peso sobre o cabo ou roedores podem romper os fios internos sem dano visível externamente."
    },
    {
      "titulo": "Conector RJ-45 mal crimpado",
      "tipo": "erro-humano",
      "desc": "Crimpagem com sequência errada (T568A vs T568B), fios que não encostam nos contatos ou alicate inadequado."
    },
    {
      "titulo": "Cabo de categoria inferior",
      "tipo": "hardware",
      "desc": "Cabo Cat5 não suporta Gigabit. Para velocidades de 1Gbps é necessário Cat5e ou superior com os 4 pares funcionais."
    },
    {
      "titulo": "Porta de rede queimada",
      "tipo": "hardware",
      "desc": "Surto elétrico via cabo de rede pode queimar a porta do computador ou do switch/roteador."
    },
    {
      "titulo": "Driver de rede ou configuração IP",
      "tipo": "software",
      "desc": "Driver da placa de rede Realtek/Intel desatualizado ou configuração IP incorreta (DHCP vs estático)."
    }
  ],
  "cenarios": [
    {
      "nivel": "Simples",
      "desc": "Recrimpagem de conectores RJ-45 ou troca de patch cord.",
      "tempo": "30min-1 hora",
      "custo": "R$50–R$100"
    },
    {
      "nivel": "Médio",
      "desc": "Passagem de cabo novo com acabamento em canaleta/espaguete e teste certificado.",
      "tempo": "2-4 horas",
      "custo": "R$100–R$300"
    },
    {
      "nivel": "Complexo",
      "desc": "Reestruturação de rede com patch panel, switch gerenciável e certificação de todos os pontos.",
      "tempo": "1-2 dias",
      "custo": "R$300–R$800"
    }
  ],
  "riscos": [
    "Cabo de rede mal feito pode causar perda de dados em transferências importantes",
    "Interferência eletromagnética em cabos sem blindagem pode causar instabilidade crônica",
    "Porta de rede queimada por surto pode danificar a placa-mãe",
    "Rede instável impacta diretamente produtividade em home office"
  ],
  "diagnostico": "Utilizamos testador de cabos profissional para verificar continuidade dos 8 fios, identificar pares cruzados, curtos e aberturas. Também testamos velocidade de link, perda de pacotes e latência com ferramentas de diagnóstico de rede.\n\nPara redes empresariais, oferecemos certificação com relatório de conformidade para Cat5e/Cat6.",
  "solucao": "Conforme o diagnóstico: recrimpagem profissional com testador, substituição de cabo por Cat5e/Cat6 com passagem em canaleta, troca de patch cord, configuração de placa de rede ou substituição de switch/roteador.\n\nTodo serviço inclui teste de velocidade e estabilidade antes da entrega.",
  "quandoCompensa": "Sempre compensa investir em cabeamento de qualidade — é a base de qualquer rede estável. Cabos Cat6 bem instalados duram mais de 10 anos.",
  "quandoNaoCompensa": "Para pontos únicos em locais de difícil acesso, pode ser mais prático usar um adaptador Wi-Fi mesh ou powerline como alternativa ao cabo.",
  "whatsappMessage": "Olá! Estou com problema no cabo de rede / internet cabeada. Gostaria de agendar um diagnóstico.",
  "relatedPages": [
    {
      "to": "/redes-wifi",
      "label": "Redes Wi-Fi"
    },
    {
      "to": "/computador-lento",
      "label": "Computador Lento"
    },
    {
      "to": "/problemas/erro-driver-windows-curitiba",
      "label": "Erro de Driver Windows"
    },
    {
      "to": "/servicos",
      "label": "Todos os Serviços"
    }
  ],
  "conteudoExtra": "## Categorias de Cabo de Rede\n\n| Categoria | Velocidade | Frequência | Uso Recomendado |\n|---|---|---|---|\n| Cat5 | 100Mbps | 100MHz | Obsoleto |\n| Cat5e | 1Gbps | 100MHz | Residencial |\n| Cat6 | 1Gbps (10Gbps até 55m) | 250MHz | Residencial/Comercial |\n| Cat6a | 10Gbps | 500MHz | Comercial/Data Center |\n\n## Padrão de Crimpagem\n\nO padrão mais utilizado no Brasil é o **T568B**:\n1. Branco-Laranja\n2. Laranja\n3. Branco-Verde\n4. Azul\n5. Branco-Azul\n6. Verde\n7. Branco-Marrom\n8. Marrom"
};
