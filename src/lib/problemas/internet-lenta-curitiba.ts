import type { ProblemaPageData } from "./types";

export const problema: ProblemaPageData = {
  "slug": "internet-lenta-curitiba",
  "title": "Internet Lenta em Curitiba | Diagnóstico de Rede e Soluções",
  "metaDescription": "Internet lenta em Curitiba? Diagnóstico de rede profissional. Roteador, Wi-Fi, cabeamento, DNS. Atendimento rápido. WhatsApp (41) 99745-2053.",
  "h1": "Internet Lenta — Diagnóstico de Rede e Soluções Profissionais",
  "categoria": "Problemas de Rede",
  "intro": "Internet lenta é uma das reclamações mais comuns em Curitiba. Antes de culpar o provedor, saiba que em mais de 60% dos casos o problema está na sua casa ou escritório.\n\nRoteador mal posicionado, canal Wi-Fi congestionado, cabeamento antigo, DNS lento ou malware consumindo banda — são dezenas de causas possíveis.\n\nNossa equipe utiliza ferramentas de análise de rede para identificar gargalos e interferências.",
  "sintomas": [
    {
      "titulo": "Velocidade abaixo do contratado",
      "desc": "Speedtest mostra velocidade muito inferior ao plano.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Wi-Fi cai frequentemente",
      "desc": "Conexão desconecta várias vezes ao dia, especialmente em certos cômodos.",
      "gravidade": "Simples a Médio"
    },
    {
      "titulo": "Alguns dispositivos lentos, outros normais",
      "desc": "Indica problema no dispositivo, não na rede.",
      "gravidade": "Simples"
    },
    {
      "titulo": "Páginas demoram mas download é rápido",
      "desc": "Problema de DNS ou latência alta.",
      "gravidade": "Simples"
    },
    {
      "titulo": "Lenta só em horários específicos",
      "desc": "Congestionamento do provedor ou interferência Wi-Fi vizinha.",
      "gravidade": "Médio"
    }
  ],
  "causas": [
    {
      "titulo": "Roteador antigo ou mal configurado",
      "desc": "Roteadores 802.11n não suportam velocidades acima de 100Mbps.",
      "tipo": "hardware"
    },
    {
      "titulo": "Interferência de redes vizinhas",
      "desc": "Em apartamentos, dezenas de redes no mesmo canal causam congestionamento.",
      "tipo": "hardware"
    },
    {
      "titulo": "Cabeamento antigo",
      "desc": "Cabos Cat5 limitam a 100Mbps. Cabos danificados causam perda de pacotes.",
      "tipo": "desgaste"
    },
    {
      "titulo": "DNS lento do provedor",
      "desc": "Trocar para Google DNS ou Cloudflare melhora significativamente.",
      "tipo": "software"
    },
    {
      "titulo": "Malware consumindo banda",
      "desc": "Vírus e mineradores consomem banda em segundo plano.",
      "tipo": "software"
    },
    {
      "titulo": "Posição ruim do roteador",
      "desc": "No chão, atrás de móveis ou longe dos dispositivos reduz o sinal.",
      "tipo": "erro-humano"
    }
  ],
  "cenarios": [
    {
      "nivel": "Simples",
      "desc": "Reconfiguração de canal, troca de DNS, reposicionamento do roteador",
      "tempo": "30min–1h",
      "custo": "R$80–R$150"
    },
    {
      "nivel": "Médio",
      "desc": "Instalação de mesh/repetidor, substituição de cabeamento",
      "tempo": "1–3h",
      "custo": "R$150–R$400"
    },
    {
      "nivel": "Complexo",
      "desc": "Cabeamento estruturado completo, access points empresariais",
      "tempo": "1–2 dias",
      "custo": "R$500–R$2000+"
    }
  ],
  "riscos": [
    "Repetidores baratos podem piorar a situação (meia velocidade)",
    "Alterar configurações do roteador sem conhecimento pode derrubar a rede",
    "Malware consumindo banda expõe dados a riscos de segurança",
    "Cabo externo sem proteção pode queimar o roteador em tempestades"
  ],
  "diagnostico": "Utilizamos analisadores Wi-Fi para identificar interferências, testamos velocidade em cada ponto, verificamos cabeamento e configuração do roteador.\n\nIdentificamos exatamente onde está o gargalo: provedor, roteador, cabeamento, Wi-Fi ou dispositivo.",
  "solucao": "Desde otimização de software (DNS, canal) até infraestrutura profissional (mesh, access points, Cat6). Sempre a solução mais econômica.\n\nPara empresas, projetos completos com garantia.",
  "quandoCompensa": "Quando a velocidade contratada é alta mas a experiência é ruim — o problema está na infraestrutura interna.",
  "quandoNaoCompensa": "Quando o provedor é o gargalo. Nesse caso, recomendamos trocar de provedor.",
  "whatsappMessage": "Olá! Minha internet está muito lenta. Preciso de diagnóstico de rede.",
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
      "label": "Redes e Wi-Fi",
      "to": "/servicos/redes-wifi"
    },
    {
      "label": "Computador com Vírus",
      "to": "/problemas/computador-com-virus-curitiba"
    },
    {
      "label": "Computador Lento",
      "to": "/problemas/computador-lento-curitiba"
    },
    {
      "label": "Suporte Empresas",
      "to": "/suporte-empresas"
    }
  ],
  "conteudoExtra": "## Guia: Internet Lenta em Curitiba\n\n### Diagnóstico Rápido\n\n1. **Speedtest via cabo** (fast.com) — se OK, problema é no Wi-Fi\n2. **Teste em horários diferentes** — piora à noite = congestionamento\n3. **Reinicie o roteador** — 30 segundos desligado\n\n### Tecnologias Wi-Fi\n\n| Padrão | Velocidade | Recomendação |\n|---|---|---|\n| Wi-Fi 4 (n) | 300 Mbps | Trocar urgente |\n| Wi-Fi 5 (ac) | 1.3 Gbps | Adequado |\n| Wi-Fi 6 (ax) | 9.6 Gbps | Ideal para 500Mbps+ |\n\n### Soluções Por Tamanho\n\n- **Apartamento (até 60m²):** Roteador Wi-Fi 5/6 (R$200–500)\n- **Casa média (60–150m²):** Mesh com 2 pontos (R$400–800)\n- **Casa grande/escritório (150m²+):** Mesh 3+ ou APs (R$800–2000+)\n\n### Atendimento em Curitiba e Região\n\nConfiguramos redes em todos os bairros e cidades da região metropolitana. Projetos completos para empresas."
};
