import type { ProblemaPageData } from "./types";

export const problema: ProblemaPageData = {
  "slug": "pc-nao-conecta-internet-curitiba",
  "title": "PC Não Conecta na Internet? Causas e Soluções | Técnico em Curitiba",
  "metaDescription": "Computador ou notebook sem internet? Wi-Fi não conecta, cabo sem rede? Diagnóstico e solução em Curitiba e região. Atendimento rápido a domicílio.",
  "h1": "PC ou Notebook Não Conecta na Internet em Curitiba? Resolvemos!",
  "categoria": "Redes / Software",
  "intro": "Ficar sem internet é um dos problemas mais urgentes para quem trabalha ou estuda em casa. O computador pode não se conectar ao Wi-Fi, não reconhecer o cabo de rede, ou até conectar mas sem navegar. As causas vão de configurações simples do Windows até falhas na placa de rede. Em Curitiba, nosso técnico diagnostica e resolve com rapidez.",
  "sintomas": [
    {
      "titulo": "Wi-Fi não aparece na lista",
      "desc": "Nenhuma rede sem fio é detectada. Pode ser adaptador desabilitado, driver ausente ou placa Wi-Fi com defeito.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Conecta mas sem internet",
      "desc": "Mostra 'Conectado, sem internet' ou 'Sem acesso à internet'. Problema de DNS, gateway ou configuração do roteador.",
      "gravidade": "Simples a médio"
    },
    {
      "titulo": "Cabo de rede não funciona",
      "desc": "Conecta o cabo Ethernet mas não reconhece. Pode ser porta de rede queimada, cabo danificado ou driver.",
      "gravidade": "Simples a médio"
    },
    {
      "titulo": "Internet lenta só neste PC",
      "desc": "Outros dispositivos funcionam normal mas este PC está lento. Driver desatualizado, malware ou configuração de rede.",
      "gravidade": "Simples"
    },
    {
      "titulo": "Desconecta sozinho do Wi-Fi",
      "desc": "Conecta e depois de minutos cai. Gerenciamento de energia, interferência ou driver instável.",
      "gravidade": "Simples a médio"
    },
    {
      "titulo": "Ícone de rede com X vermelho",
      "desc": "Windows indica que não há adaptador de rede ativo. Hardware desabilitado, driver removido ou placa com defeito.",
      "gravidade": "Médio"
    }
  ],
  "causas": [
    {
      "titulo": "Driver de rede corrompido",
      "desc": "Atualização do Windows pode instalar driver genérico que não funciona corretamente com o adaptador de rede.",
      "tipo": "software"
    },
    {
      "titulo": "Adaptador Wi-Fi desabilitado",
      "desc": "Tecla Fn+F2 (ou similar) pode ter desligado o Wi-Fi. Modo avião ativado acidentalmente.",
      "tipo": "software"
    },
    {
      "titulo": "Configuração de DNS incorreta",
      "desc": "DNS configurado manualmente com endereço incorreto ou servidor DNS do provedor fora do ar.",
      "tipo": "software"
    },
    {
      "titulo": "Placa de rede com defeito",
      "desc": "Adaptador Wi-Fi ou porta Ethernet pode ter queimado, especialmente após picos de energia.",
      "tipo": "hardware"
    },
    {
      "titulo": "Gerenciamento de energia",
      "desc": "Windows desliga o adaptador Wi-Fi para economizar energia, causando desconexões intermitentes.",
      "tipo": "software"
    },
    {
      "titulo": "Malware alterando configurações",
      "desc": "Vírus podem modificar proxy, DNS ou arquivo hosts, impedindo a navegação normal.",
      "tipo": "software"
    }
  ],
  "cenarios": [
    {
      "nivel": "Simples",
      "desc": "Reinstalação de driver, reconfiguração de DNS ou desativação do modo avião",
      "tempo": "30–60 min",
      "custo": "R$ 80–120"
    },
    {
      "nivel": "Médio",
      "desc": "Remoção de malware que alterou configurações de rede + restauração",
      "tempo": "1–2 horas",
      "custo": "R$ 120–200"
    },
    {
      "nivel": "Complexo",
      "desc": "Substituição de placa Wi-Fi interna ou instalação de adaptador USB Wi-Fi",
      "tempo": "1–2 horas",
      "custo": "R$ 150–300"
    }
  ],
  "riscos": [
    "Alterar configurações de rede sem conhecimento pode deixar o computador completamente offline",
    "Baixar drivers de sites não oficiais pode instalar malware",
    "Resetar o roteador sem anotar as configurações pode derrubar a rede de toda a casa/empresa",
    "Forçar o adaptador Wi-Fi interno pode danificar o conector na placa-mãe do notebook"
  ],
  "diagnostico": "1. Verificação do Gerenciador de Dispositivos: status do adaptador de rede (exclamação amarela, desabilitado, ausente).\n\n2. Teste com outro dispositivo na mesma rede para confirmar se o problema é no PC ou no roteador/provedor.\n\n3. Teste de ping (ping 8.8.8.8) para diferenciar problema de DNS vs problema de conectividade.\n\n4. Verificação de configurações: IP, DNS, gateway, proxy e arquivo hosts.\n\n5. Teste com adaptador USB Wi-Fi externo para isolar se o problema é na placa interna.\n\n6. Scan por malware que possa ter alterado configurações de rede.",
  "solucao": "**Driver**: Download e instalação do driver oficial do fabricante. Remoção do driver anterior via Gerenciador de Dispositivos.\n\n**Configuração**: Reset do TCP/IP stack (netsh int ip reset), flush de DNS (ipconfig /flushdns), configuração de DNS público (8.8.8.8 / 8.8.4.4).\n\n**Gerenciamento de energia**: Desativação de \"O computador pode desligar este dispositivo para economizar energia\" no adaptador de rede.\n\n**Hardware**: Substituição da placa Wi-Fi Mini PCIe/M.2 interna ou instalação de adaptador USB Wi-Fi AC/AX como alternativa.\n\n**Malware**: Remoção completa de vírus, restauração de configurações de proxy e DNS, limpeza do arquivo hosts.",
  "quandoCompensa": "Na grande maioria dos casos é problema de software e tem solução rápida e barata. Mesmo troca de placa Wi-Fi é acessível.",
  "quandoNaoCompensa": "Raramente não compensa. Um adaptador USB Wi-Fi (R$ 40-120) resolve quando a placa interna falha e o reparo é caro.",
  "whatsappMessage": "Olá! Meu computador não está conectando na internet. Podem me ajudar?",
  "relatedPages": [
    {
      "to": "/servicos/redes-wifi",
      "label": "Redes e Wi-Fi"
    },
    {
      "to": "/problemas/erro-driver-windows-curitiba",
      "label": "Erro de Driver Windows"
    },
    {
      "to": "/servicos/remocao-virus",
      "label": "Remoção de Vírus"
    },
    {
      "to": "/problemas/computador-lento-curitiba",
      "label": "Computador Lento"
    },
    {
      "to": "/diagnostico-tecnico",
      "label": "Diagnóstico Técnico"
    }
  ],
  "conteudoExtra": "## Soluções Rápidas de Internet\n\n### Checklist Antes do Técnico\n1. Reinicie o roteador (desligue, espere 30 segundos, ligue)\n2. Teste com outro dispositivo (celular) na mesma rede\n3. Verifique se o modo avião não está ativado\n4. Tente conectar com cabo Ethernet direto no roteador\n5. Execute no Prompt de Comando: `ipconfig /flushdns`\n\n### Comandos Úteis (Prompt como Administrador)\n```\nipconfig /flushdns\nipconfig /release\nipconfig /renew\nnetsh winsock reset\nnetsh int ip reset\n```\n\n### DNS Público Recomendado\n- **Google**: 8.8.8.8 e 8.8.4.4\n- **Cloudflare**: 1.1.1.1 e 1.0.0.1\n- Configurar DNS público resolve muitos problemas de \"conectado sem internet\""
};
