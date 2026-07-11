import type { ProblemaPageData } from "./types";

export const problema: ProblemaPageData = {
  "slug": "impressora-erro-conexao-usb-wifi-curitiba",
  "title": "Impressora Não Conecta USB ou Wi-Fi em Curitiba | Erro de Conexão",
  "metaDescription": "Impressora offline, não conecta USB ou Wi-Fi? Driver incompatível, IP errado, cabo defeituoso. Diagnóstico e reparo em Curitiba e região.",
  "h1": "Impressora Não Conecta — Erro USB, Wi-Fi e Rede em Curitiba",
  "categoria": "Problemas de Impressora",
  "intro": "A impressora aparece offline, não é reconhecida ou perdeu a conexão Wi-Fi? Problemas de conectividade representam **28% dos chamados de impressora** e frequentemente são os mais frustrantes porque o equipamento funciona mas o computador não consegue se comunicar.\\n\\n**Tipos de conexão e problemas mais comuns:**\\n\\n**USB:**\\n- Cabo USB defeituoso (fio interno rompido) — muito mais comum do que parece\\n- Porta USB do computador com mau contato\\n- Driver incompatível após atualização do Windows\\n- Hub USB sem alimentação suficiente\\n\\n**Wi-Fi:**\\n- Impressora perdeu a senha da rede após queda de luz\\n- IP dinâmico mudou e o computador procura o IP antigo\\n- Impressora fora do alcance do roteador\\n- Rede 2.4GHz vs 5GHz (maioria das impressoras só conecta em 2.4GHz)\\n\\n**Rede cabeada (Ethernet):**\\n- Cabo de rede defeituoso ou mal crimpado\\n- Conflito de IP na rede\\n- Porta do switch/roteador com defeito\\n\\n**Custo de reparo:**\\n- Configuração USB + driver: R$ 60-100\\n- Configuração Wi-Fi/rede: R$ 80-150\\n- Troca de placa de rede Wi-Fi da impressora: R$ 150-350\\n- Configuração em rede corporativa: R$ 100-250",
  "sintomas": [
    {
      "titulo": "Impressora aparece como 'Offline'",
      "desc": "O Windows mostra a impressora instalada mas com status 'Offline'. Pode ser driver, cabo, rede ou configuração do spooler de impressão.",
      "gravidade": "Simples"
    },
    {
      "titulo": "Impressora não é encontrada na rede Wi-Fi",
      "desc": "Ao tentar adicionar a impressora, o computador não encontra. Impressora perdeu conexão ou está em rede/frequência diferente.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Erro 'Não foi possível conectar à impressora'",
      "desc": "Windows não consegue instalar ou reconectar. Driver corrompido, permissões ou serviço de spooler parado.",
      "gravidade": "Simples"
    },
    {
      "titulo": "Imprime de um computador mas não de outro",
      "desc": "Configuração de compartilhamento incorreta ou driver faltando no segundo computador. Comum em escritórios.",
      "gravidade": "Simples"
    },
    {
      "titulo": "Impressora conectava por Wi-Fi e parou",
      "desc": "Após troca de roteador, mudança de senha ou queda de luz, a impressora perde as configurações de rede.",
      "gravidade": "Simples"
    },
    {
      "titulo": "USB não reconhecido (código 43)",
      "desc": "Windows não reconhece o dispositivo USB. Pode ser cabo, porta, driver ou a placa USB da impressora.",
      "gravidade": "Médio"
    }
  ],
  "causas": [
    {
      "titulo": "Driver incompatível ou corrompido",
      "desc": "Atualizações do Windows 10/11 frequentemente quebram drivers de impressora. Microsoft remove drivers antigos ou instala versão genérica que não funciona.",
      "tipo": "software"
    },
    {
      "titulo": "Cabo USB defeituoso",
      "desc": "Cabos USB de impressora sofrem muito com dobras e puxões. Fio interno rompe e a conexão fica intermitente ou inexistente.",
      "tipo": "desgaste"
    },
    {
      "titulo": "Impressora perdeu config Wi-Fi",
      "desc": "Queda de energia, reset acidental, troca de roteador — qualquer um destes faz a impressora perder a rede salva.",
      "tipo": "erro-humano"
    },
    {
      "titulo": "IP dinâmico mudou",
      "desc": "Roteador atribuiu um IP diferente à impressora. O computador ainda procura pelo IP antigo. Solução: IP fixo na impressora.",
      "tipo": "software"
    },
    {
      "titulo": "Serviço de Spooler parado",
      "desc": "O serviço Print Spooler do Windows travou ou parou. Todos os jobs de impressão ficam na fila sem sair.",
      "tipo": "software"
    },
    {
      "titulo": "Rede 5GHz incompatível",
      "desc": "Roteadores dual-band com mesmo SSID para 2.4GHz e 5GHz confundem a impressora. Ela só conecta em 2.4GHz.",
      "tipo": "erro-humano"
    }
  ],
  "cenarios": [
    {
      "nivel": "Simples",
      "desc": "Reinstalação de driver + configuração de conexão USB ou Wi-Fi.",
      "tempo": "1 dia",
      "custo": "R$ 60 a R$ 120"
    },
    {
      "nivel": "Médio",
      "desc": "Configuração de IP fixo + compartilhamento em rede para múltiplos computadores.",
      "tempo": "1 a 2 dias",
      "custo": "R$ 100 a R$ 200"
    },
    {
      "nivel": "Complexo",
      "desc": "Troca de módulo Wi-Fi interno da impressora ou configuração em ambiente corporativo.",
      "tempo": "3 a 7 dias",
      "custo": "R$ 150 a R$ 350"
    }
  ],
  "riscos": [
    "Desinstalar driver errado pode afetar outras impressoras configuradas",
    "Reset de fábrica na impressora apaga todas as configurações incluindo calibragem",
    "Módulos Wi-Fi genéricos podem não ser compatíveis com o firmware da impressora",
    "Em redes corporativas, configurar IP fixo sem coordenar com TI pode causar conflito"
  ],
  "diagnostico": "**Diagnóstico de conexão:**\\n\\n**USB:**\\n1. Testar com outro cabo USB\\n2. Testar em outra porta USB (preferencialmente traseira, direto na placa-mãe)\\n3. Verificar Gerenciador de Dispositivos (dispositivo desconhecido?)\\n4. Reinstalar driver do site do fabricante\\n\\n**Wi-Fi:**\\n1. Verificar se a impressora está conectada (painel LCD ou relatório de configuração)\\n2. Imprimir relatório de rede da impressora\\n3. Verificar se está na mesma faixa de rede (2.4GHz)\\n4. Ping no IP da impressora\\n5. Reconectar à rede via WPS ou configuração manual\\n\\n**Custo: R$ 50-80, abatido do serviço.**",
  "solucao": "**Soluções que aplicamos:**\\n\\n### USB\\n- Troca de cabo USB (compatível com a impressora)\\n- Instalação de driver oficial do fabricante\\n- Limpeza do spooler de impressão\\n- Teste em porta USB diferente\\n\\n### Wi-Fi\\n- Reconfiguração da rede na impressora (via painel ou WPS)\\n- Atribuição de IP fixo (reserva de DHCP no roteador)\\n- Separação de redes 2.4GHz e 5GHz com SSIDs diferentes\\n- Configuração de impressão via Wi-Fi Direct (quando a rede não funciona)\\n\\n### Rede Corporativa\\n- Configuração de servidor de impressão\\n- Instalação de driver em todos os computadores da rede\\n- Compartilhamento via Windows ou CUPS (Linux)\\n- Documentação da configuração para futuras manutenções",
  "quandoCompensa": "Sempre — problemas de conexão geralmente são baratos de resolver (R$ 60-200) comparado ao custo de uma impressora nova.",
  "quandoNaoCompensa": "Quando o módulo Wi-Fi interno queimou e a peça custa mais de 50% de uma impressora nova equivalente.",
  "whatsappMessage": "Olá! Minha impressora não conecta (USB/Wi-Fi). Preciso de ajuda.",
  "relatedPages": [
    {
      "label": "Impressora Não Imprime",
      "to": "/problemas/impressora-nao-imprime-curitiba"
    },
    {
      "label": "Impressora Papel Preso",
      "to": "/problemas/impressora-papel-preso-curitiba"
    },
    {
      "label": "Impressora Tinta Não Sai",
      "to": "/problemas/impressora-tinta-nao-sai-curitiba"
    },
    {
      "label": "Redes e Wi-Fi",
      "to": "/servicos/redes-wifi"
    },
    {
      "label": "PC Não Conecta Wi-Fi",
      "to": "/problemas/pc-nao-conecta-wifi-curitiba"
    }
  ],
  "conteudoExtra": "## Checklist Antes de Chamar o Técnico\\n\\n**Tente isso primeiro (USB):**\\n1. Desligue a impressora e o computador\\n2. Desconecte o cabo USB\\n3. Ligue o computador\\n4. Conecte o cabo USB\\n5. Ligue a impressora\\n6. Aguarde o Windows tentar instalar\\n\\n**Tente isso primeiro (Wi-Fi):**\\n1. Reinicie o roteador\\n2. Reinicie a impressora\\n3. No painel da impressora, vá em Configurações > Rede > Sem Fio > Assistente de configuração\\n4. Reconecte à sua rede\\n\\n**Se nada resolver, aí sim nos chame!**\\n\\n## IP Fixo — A Solução Definitiva para Wi-Fi\\n\\nSe sua impressora perde conexão Wi-Fi periodicamente, a causa provável é IP dinâmico mudando.\\n\\n**Solução:** Configurar IP fixo (reserva de DHCP) no roteador:\\n1. Anotar o MAC Address da impressora (relatório de rede)\\n2. Acessar o roteador (192.168.0.1 ou 192.168.1.1)\\n3. Em DHCP > Reserva de endereço, vincular o MAC a um IP fixo\\n4. Reiniciar a impressora\\n\\nIsso garante que a impressora sempre receba o mesmo IP."
};
