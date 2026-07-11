import type { ProblemaPageData } from "./types";

export const problema: ProblemaPageData = {
  "slug": "pc-nao-conecta-wifi-curitiba",
  "title": "PC Não Conecta no Wi-Fi em Curitiba — Diagnóstico e Solução",
  "metaDescription": "Computador ou notebook não conecta no Wi-Fi em Curitiba? Técnico resolve driver, adaptador, configuração de rede e sinal fraco. Atendimento rápido.",
  "h1": "PC Não Conecta no Wi-Fi — Diagnóstico e Solução em Curitiba",
  "categoria": "Redes — Conectividade",
  "intro": "Seu computador não conecta no Wi-Fi? Ou conecta mas a internet não funciona? Problemas de conectividade Wi-Fi são extremamente comuns e podem ter causas simples (driver desatualizado) ou complexas (adaptador Wi-Fi queimado).\n\nO mais frustrante é quando outros dispositivos conectam normalmente — celular, tablet, smart TV — mas o computador se recusa a funcionar. Isso quase sempre indica problema no PC, não no roteador.\n\nEm Curitiba, diagnosticamos problemas de Wi-Fi tanto no computador quanto na rede, garantindo que tudo funcione com estabilidade.",
  "sintomas": [
    {
      "titulo": "Ícone de Wi-Fi não aparece",
      "desc": "Adaptador Wi-Fi desativado, driver não instalado ou hardware com defeito.",
      "gravidade": "Alta"
    },
    {
      "titulo": "Vê a rede mas não conecta",
      "desc": "Senha errada, conflito de IP, protocolo de segurança incompatível.",
      "gravidade": "Média"
    },
    {
      "titulo": "Conecta mas sem internet",
      "desc": "DNS incorreto, gateway errado, proxy configurado ou problema no roteador.",
      "gravidade": "Média"
    },
    {
      "titulo": "Wi-Fi cai a cada poucos minutos",
      "desc": "Driver instável, interferência de sinal ou adaptador superaquecendo.",
      "gravidade": "Alta"
    },
    {
      "titulo": "Velocidade muito baixa no Wi-Fi",
      "desc": "Adaptador antigo (802.11n), canal congestionado ou distância do roteador.",
      "gravidade": "Média"
    },
    {
      "titulo": "Erro 'Não foi possível conectar a esta rede'",
      "desc": "Perfil de rede corrompido no Windows — precisa esquecer e reconectar.",
      "gravidade": "Baixa"
    }
  ],
  "causas": [
    {
      "titulo": "Driver Wi-Fi desatualizado ou corrompido",
      "desc": "Após atualização do Windows, o driver do adaptador Wi-Fi pode ficar incompatível.",
      "tipo": "software"
    },
    {
      "titulo": "Adaptador Wi-Fi desativado",
      "desc": "Atalho de teclado (Fn+F2) ou modo avião podem desativar o Wi-Fi.",
      "tipo": "erro-humano"
    },
    {
      "titulo": "Adaptador Wi-Fi com defeito",
      "desc": "Adaptador interno do notebook queimou ou adaptador USB com defeito.",
      "tipo": "hardware"
    },
    {
      "titulo": "Configuração de rede incorreta",
      "desc": "IP fixo configurado, DNS errado ou proxy ativado sem necessidade.",
      "tipo": "software"
    },
    {
      "titulo": "Roteador com problema",
      "desc": "Roteador travado, firmware desatualizado ou muitos dispositivos conectados.",
      "tipo": "hardware"
    },
    {
      "titulo": "Antena Wi-Fi do notebook desconectada",
      "desc": "Após manutenção, os cabos da antena Wi-Fi podem ter ficado desconectados.",
      "tipo": "hardware"
    }
  ],
  "cenarios": [
    {
      "nivel": "Simples",
      "desc": "Reinstalar driver, resetar configurações de rede ou reconectar perfil.",
      "tempo": "30min a 1h",
      "custo": "R$ 99,99 a R$ 150"
    },
    {
      "nivel": "Médio",
      "desc": "Instalar adaptador Wi-Fi USB, configurar roteador ou otimizar canal.",
      "tempo": "1h a 2h",
      "custo": "R$ 120 a R$ 300"
    },
    {
      "nivel": "Complexo",
      "desc": "Trocar adaptador Wi-Fi interno (mini PCIe) ou reconectar antenas do notebook.",
      "tempo": "1h a 3h",
      "custo": "R$ 150 a R$ 400"
    }
  ],
  "riscos": [
    "Ficar sem atualizações de segurança por falta de internet deixa o PC vulnerável",
    "Instalar drivers de fontes não oficiais pode trazer vírus",
    "Adaptadores USB Wi-Fi baratos podem superaquecer e ter desempenho ruim",
    "Configurar IP fixo incorretamente pode causar conflitos na rede toda",
    "Resetar roteador sem anotar configurações pode derrubar a internet de todos os dispositivos"
  ],
  "diagnostico": "Diagnóstico de conectividade Wi-Fi:\n\n1. Verificação de status do adaptador Wi-Fi (Gerenciador de Dispositivos)\n2. Teste com outros dispositivos na mesma rede\n3. Verificação de driver (versão, compatibilidade)\n4. Teste de ping e DNS\n5. Análise de sinal Wi-Fi (força, canal, interferência)\n6. Verificação de configurações de rede (IP, gateway, DNS)\n7. Teste com adaptador USB externo (para isolar hardware)\n\nCusto: R$ 99,99 (incorporado se aprovar o serviço).",
  "solucao": "Solução conforme a causa:\n\n- **Driver**: Atualização com driver oficial do fabricante\n- **Configuração**: Reset de rede do Windows + reconfiguração limpa\n- **Adaptador**: Instalação de adaptador USB Wi-Fi ou troca do módulo interno\n- **Roteador**: Atualização de firmware, otimização de canal e banda\n- **Antenas**: Reconexão dos cabos de antena internos do notebook\n\nTeste de velocidade e estabilidade (ping) por 30+ minutos após o reparo.",
  "quandoCompensa": "Quase sempre — resolver Wi-Fi custa R$ 99,99-300 e é essencial para o uso do computador. Até troca de adaptador interno é acessível.",
  "quandoNaoCompensa": "Quando o notebook é tão antigo que só suporta Wi-Fi 802.11n e o adaptador USB 5GHz custa mais que um notebook usado.",
  "whatsappMessage": "Olá! Meu computador não está conectando no Wi-Fi. Podem me ajudar?",
  "relatedPages": [
    {
      "to": "/servicos/redes-wifi",
      "label": "Redes e Wi-Fi"
    },
    {
      "to": "/problemas/computador-lento-curitiba",
      "label": "Computador Lento"
    },
    {
      "to": "/problemas/internet-lenta-curitiba",
      "label": "Internet Lenta"
    },
    {
      "to": "/atendimento-domicilio",
      "label": "Atendimento em Domicílio"
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
  "conteudoExtra": "## Resolva Problemas de Wi-Fi: Guia Completo\n\n### Reset Completo de Rede no Windows\n\n1. Abra **Configurações → Rede e Internet**\n2. Clique em **Redefinição de Rede** (no final da página)\n3. Clique em **Redefinir agora**\n4. O PC vai reiniciar — reconecte ao Wi-Fi com a senha\n\nIsso resolve 60% dos problemas de conectividade.\n\n### Diagnóstico via Prompt de Comando\n\n```\nipconfig /all          → Mostra configuração de rede\nping 8.8.8.8          → Testa conexão com internet\nping google.com       → Testa DNS\nnetsh wlan show all   → Mostra redes e adaptador\n```\n\n### Wi-Fi 5 GHz vs 2.4 GHz\n\n| Característica | 2.4 GHz | 5 GHz |\n|---|---|---|\n| Alcance | Longo (até 50m) | Curto (até 20m) |\n| Velocidade | Até 300 Mbps | Até 1.300+ Mbps |\n| Interferência | Alta (vizinhos, microondas) | Baixa |\n| Paredes | Atravessa bem | Perde sinal fácil |\n| Ideal para | Distância, IoT | Velocidade, jogos |\n\n### Adaptadores Wi-Fi USB Recomendados\n\n| Modelo | Padrão | Velocidade | Preço Médio |\n|---|---|---|---|\n| TP-Link Archer T3U | Wi-Fi 5 (AC) | Até 1.300 Mbps | R$ 100-150 |\n| TP-Link Archer TX20U | Wi-Fi 6 (AX) | Até 1.800 Mbps | R$ 150-250 |\n| Qualquer USB 2.0 N | Wi-Fi 4 (N) | Até 300 Mbps | R$ 40-70 |"
};
