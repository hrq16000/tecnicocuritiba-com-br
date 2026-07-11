import type { ProblemaPageData } from "./types";

export const problema: ProblemaPageData = {
  "slug": "wifi-caindo-curitiba",
  "title": "Wi-Fi Caindo em Curitiba | Diagnóstico e Solução Profissional",
  "metaDescription": "Wi-Fi caindo toda hora? Internet instável, lenta ou desconectando? Técnico em Curitiba resolve problemas de rede Wi-Fi com diagnóstico completo.",
  "h1": "Wi-Fi Caindo — Diagnóstico e Solução em Curitiba",
  "categoria": "Redes / Wi-Fi",
  "intro": "Wi-Fi que cai toda hora é um dos problemas mais frustrantes da vida digital moderna. A instabilidade pode se manifestar como desconexões frequentes, velocidade muito abaixo do contratado, latência alta ou sinal fraco em determinados cômodos.\n\nAs causas vão desde problemas simples de configuração do roteador até interferência eletromagnética, sobrecarga de dispositivos conectados, firmware desatualizado, problemas na placa Wi-Fi do computador ou até mesmo falhas na infraestrutura do provedor de internet.\n\nEm Curitiba, nosso técnico realiza diagnóstico completo da rede Wi-Fi, incluindo análise de espectro, teste de velocidade em diferentes pontos, verificação de interferência e otimização de canais para garantir conexão estável e rápida.",
  "sintomas": [
    {
      "titulo": "Wi-Fi desconecta e reconecta frequentemente",
      "desc": "O dispositivo perde a conexão Wi-Fi a cada poucos minutos e reconecta automaticamente, interrompendo downloads e videochamadas.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Internet lenta mesmo com sinal forte",
      "desc": "O ícone do Wi-Fi mostra sinal cheio, mas a velocidade é muito inferior ao plano contratado.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Sinal Wi-Fi fraco em certos cômodos",
      "desc": "A conexão funciona bem perto do roteador mas fica fraca ou inexistente em quartos e andares distantes.",
      "gravidade": "Simples"
    },
    {
      "titulo": "Wi-Fi cai quando muitos dispositivos conectam",
      "desc": "A rede fica instável quando vários dispositivos estão conectados simultaneamente (celulares, TVs, notebooks).",
      "gravidade": "Médio"
    },
    {
      "titulo": "Wi-Fi funciona mas sem acesso à internet",
      "desc": "O dispositivo conecta ao Wi-Fi normalmente mas exibe 'Sem internet' ou 'Conectado, sem internet'.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Velocidade cai em horários específicos",
      "desc": "A internet fica lenta sempre nos mesmos horários (noite, fim de semana), indicando congestionamento ou throttling.",
      "gravidade": "Simples"
    }
  ],
  "causas": [
    {
      "titulo": "Canal Wi-Fi congestionado",
      "desc": "Muitas redes vizinhas usando o mesmo canal causam interferência, reduzindo velocidade e estabilidade — muito comum em apartamentos.",
      "tipo": "software"
    },
    {
      "titulo": "Roteador desatualizado ou subdimensionado",
      "desc": "Roteadores antigos (802.11n) ou fornecidos pelo provedor não suportam a velocidade contratada ou muitos dispositivos simultâneos.",
      "tipo": "hardware"
    },
    {
      "titulo": "Interferência eletromagnética",
      "desc": "Micro-ondas, telefones sem fio, baby monitors e dispositivos Bluetooth na frequência 2.4GHz causam interferência no Wi-Fi.",
      "tipo": "hardware"
    },
    {
      "titulo": "Driver da placa Wi-Fi desatualizado",
      "desc": "O driver do adaptador Wi-Fi do notebook/PC está desatualizado ou corrompido, causando desconexões intermitentes.",
      "tipo": "software"
    },
    {
      "titulo": "Configuração incorreta do roteador",
      "desc": "DNS mal configurado, MTU incorreto, modo de segurança incompatível (WEP/WPA antigo) ou DHCP com conflitos de IP.",
      "tipo": "software"
    },
    {
      "titulo": "Problema no provedor de internet",
      "desc": "Instabilidade na rede do provedor, cabo coaxial ou fibra com mau contato, ou modem/ONT com defeito.",
      "tipo": "hardware"
    }
  ],
  "cenarios": [
    {
      "nivel": "Simples",
      "desc": "Otimização de canal Wi-Fi, atualização de firmware do roteador e configuração de DNS.",
      "tempo": "1–2h",
      "custo": "R$100–R$150"
    },
    {
      "nivel": "Médio",
      "desc": "Reconfiguração completa da rede, troca de canal, separação 2.4/5GHz, ajuste de potência e posicionamento.",
      "tempo": "2–3h",
      "custo": "R$150–R$250"
    },
    {
      "nivel": "Complexo",
      "desc": "Instalação de sistema mesh ou access points, cabeamento estruturado e configuração de rede corporativa.",
      "tempo": "4–8h",
      "custo": "R$300–R$800+"
    }
  ],
  "riscos": [
    "Resetar o roteador para padrão de fábrica sem anotar as configurações pode deixar você sem internet",
    "Comprar repetidor de sinal barato pode piorar a situação ao criar uma segunda rede congestionada",
    "Usar canais fixos sem análise de espectro pode colocar sua rede no canal mais congestionado",
    "Desativar a segurança do Wi-Fi para 'resolver' quedas expõe sua rede a invasores"
  ],
  "diagnostico": "O diagnóstico de Wi-Fi instável é abrangente:\n\n1. Teste de velocidade em múltiplos pontos da residência/escritório (junto ao roteador e nos cômodos com problema).\n2. Análise de espectro Wi-Fi para mapear interferência de redes vizinhas e identificar o melhor canal.\n3. Verificação de firmware do roteador e configurações de segurança/DHCP/DNS.\n4. Teste de latência e perda de pacotes para o gateway e servidores externos.\n5. Verificação da placa Wi-Fi do dispositivo e drivers instalados.\n6. Teste com cabo Ethernet para isolar se o problema é no Wi-Fi ou na internet em si.\n\nO diagnóstico custa a partir de R$50 e é abatido do serviço caso o reparo seja aprovado.",
  "solucao": "A solução é personalizada para cada ambiente:\n\n**Otimização de software:** Seleção do canal menos congestionado (2.4GHz e 5GHz), atualização de firmware, configuração de DNS otimizado (Google/Cloudflare), ajuste de MTU e QoS para priorizar tráfego importante.\n\n**Reposicionamento:** Orientação sobre o melhor local para o roteador (centralizado, elevado, longe de paredes grossas e eletrodomésticos).\n\n**Upgrade de equipamento:** Recomendação e configuração de roteador Wi-Fi 5 (AC) ou Wi-Fi 6 (AX) adequado ao tamanho do ambiente e número de dispositivos.\n\n**Sistema mesh:** Para casas grandes ou escritórios, instalação de sistema mesh com roaming seamless entre pontos de acesso.\n\n**Cabeamento:** Instalação de pontos de rede cabeados para dispositivos fixos (TV, desktop, console de jogos) liberando o Wi-Fi para dispositivos móveis.\n\nTodas as soluções incluem teste de velocidade e estabilidade após a implementação.",
  "quandoCompensa": "Sempre compensa otimizar a rede Wi-Fi, pois na maioria dos casos uma reconfiguração resolve sem necessidade de equipamento novo.",
  "quandoNaoCompensa": "Quando o ambiente é muito grande (>200m²) e o roteador é básico — nesse caso, investir em sistema mesh ou access points é a melhor solução de longo prazo.",
  "whatsappMessage": "Olá! Meu Wi-Fi está caindo toda hora. Preciso de diagnóstico e solução em Curitiba.",
  "relatedPages": [
    {
      "to": "/redes-wifi-curitiba",
      "label": "Redes e Wi-Fi"
    },
    {
      "to": "/problemas/computador-lento-curitiba",
      "label": "Computador Lento"
    },
    {
      "to": "/problemas/impressora-nao-imprime-curitiba",
      "label": "Impressora Não Imprime"
    },
    {
      "to": "/atendimento-domicilio",
      "label": "Atendimento a Domicílio"
    },
    {
      "to": "/suporte-empresas",
      "label": "Suporte para Empresas"
    },
    {
      "to": "/servicos",
      "label": "Todos os Serviços"
    }
  ],
  "conteudoExtra": "## Guia: Como Melhorar seu Wi-Fi Antes de Chamar um Técnico\n\n### 1. Reinicie o roteador corretamente\nDesligue da tomada, aguarde 30 segundos e religue. Isso limpa a memória e pode resolver problemas temporários.\n\n### 2. Verifique a posição do roteador\n- Coloque em local central e elevado (não no chão)\n- Longe de paredes grossas, espelhos e aquários\n- Afastado de micro-ondas e telefones sem fio\n\n### 3. Use a banda 5GHz quando possível\nA banda 5GHz é mais rápida e menos congestionada, ideal para dispositivos próximos ao roteador. A banda 2.4GHz tem maior alcance mas é mais lenta e sujeita a interferência.\n\n## Wi-Fi 5 vs Wi-Fi 6: Vale a Troca?\n\n| Recurso | Wi-Fi 5 (AC) | Wi-Fi 6 (AX) |\n|---------|-------------|-------------|\n| Velocidade máxima | 3.5 Gbps | 9.6 Gbps |\n| Dispositivos simultâneos | Bom | Excelente (OFDMA) |\n| Alcance | Bom | Melhor (BSS Coloring) |\n| Consumo de bateria | Normal | Otimizado (TWT) |\n| Preço médio | R$200-400 | R$400-800 |\n\nSe você tem mais de 10 dispositivos conectados ou plano acima de 300 Mbps, o Wi-Fi 6 faz diferença significativa."
};
