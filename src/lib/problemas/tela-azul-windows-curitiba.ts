import type { ProblemaPageData } from "./types";

export const problema: ProblemaPageData = {
  "slug": "tela-azul-windows-curitiba",
  "title": "Tela Azul no Windows em Curitiba | Diagnóstico BSOD Profissional",
  "metaDescription": "Tela azul da morte (BSOD) no Windows? Diagnóstico profissional em Curitiba. Identificamos o driver ou hardware causador. WhatsApp (41) 99745-2053.",
  "h1": "Tela Azul no Windows (BSOD) — Diagnóstico e Solução Profissional",
  "categoria": "Erros de Sistema",
  "intro": "A temida \"Tela Azul da Morte\" (BSOD - Blue Screen of Death) é o erro mais assustador do Windows. O computador para tudo, exibe um código de erro e reinicia sozinho.\n\nNa maioria dos casos, a tela azul é causada por um driver incompatível, memória RAM defeituosa ou superaquecimento. Mas também pode indicar HD/SSD com falha ou até placa-mãe danificada.\n\nEm Curitiba, analisamos os logs de crash dump para identificar exatamente qual componente ou driver está causando o problema — sem tentativa e erro.",
  "sintomas": [
    {
      "titulo": "Tela azul com código IRQL_NOT_LESS_OR_EQUAL",
      "desc": "Geralmente causado por driver de rede ou antivírus incompatível com o Windows.",
      "gravidade": "Médio"
    },
    {
      "titulo": "BSOD com CRITICAL_PROCESS_DIED",
      "desc": "Processo essencial do Windows falhou. Pode ser arquivo do sistema corrompido.",
      "gravidade": "Médio a Complexo"
    },
    {
      "titulo": "Tela azul ao iniciar o Windows",
      "desc": "O sistema não consegue completar o boot. Driver ou atualização problemática.",
      "gravidade": "Médio"
    },
    {
      "titulo": "BSOD durante jogos ou uso pesado",
      "desc": "Superaquecimento, GPU instável ou fonte de alimentação insuficiente.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Tela azul aleatória sem padrão",
      "desc": "Memória RAM defeituosa é a causa mais comum de BSODs aleatórios.",
      "gravidade": "Médio a Complexo"
    },
    {
      "titulo": "BSOD com WHEA_UNCORRECTABLE_ERROR",
      "desc": "Erro de hardware detectado pelo sistema — CPU, RAM ou placa-mãe.",
      "gravidade": "Complexo"
    }
  ],
  "causas": [
    {
      "titulo": "Driver incompatível ou corrompido",
      "desc": "Drivers de vídeo, rede ou periféricos desatualizados são a causa #1 de BSOD.",
      "tipo": "software"
    },
    {
      "titulo": "Memória RAM defeituosa",
      "desc": "Módulos com falha causam erros intermitentes e BSODs aleatórios.",
      "tipo": "hardware"
    },
    {
      "titulo": "Superaquecimento de CPU ou GPU",
      "desc": "Temperaturas acima de 90°C fazem o sistema travar para se proteger.",
      "tipo": "desgaste"
    },
    {
      "titulo": "HD/SSD com setores defeituosos",
      "desc": "Disco com falhas causa erros de leitura que resultam em tela azul.",
      "tipo": "desgaste"
    },
    {
      "titulo": "Windows Update corrompido",
      "desc": "Atualizações incompletas podem corromper arquivos do sistema.",
      "tipo": "software"
    },
    {
      "titulo": "Fonte de alimentação insuficiente",
      "desc": "Fonte subdimensionada causa instabilidade sob carga, gerando BSODs.",
      "tipo": "hardware"
    }
  ],
  "cenarios": [
    {
      "nivel": "Simples",
      "desc": "Atualização/reversão de driver, reparo de arquivos do sistema (SFC/DISM)",
      "tempo": "1–2h",
      "custo": "R$100–R$180"
    },
    {
      "nivel": "Médio",
      "desc": "Teste e substituição de RAM, limpeza térmica, reparo do Windows",
      "tempo": "2–4h",
      "custo": "R$150–R$300"
    },
    {
      "nivel": "Complexo",
      "desc": "Diagnóstico de placa-mãe, troca de HD/SSD, reinstalação completa",
      "tempo": "1–3 dias",
      "custo": "R$250–R$500+"
    }
  ],
  "riscos": [
    "Ignorar BSODs frequentes pode levar à perda de dados quando o HD falhar",
    "Desativar verificações de driver pode mascarar problemas graves",
    "Forçar desligamento durante BSOD pode corromper o sistema de arquivos",
    "Usar 'fixers' genéricos da internet pode instalar malware"
  ],
  "diagnostico": "Analisamos os crash dumps (MEMORY.DMP e Minidump) com ferramentas profissionais como WinDbg para identificar exatamente qual driver ou componente causou o BSOD. Também executamos testes de memória (MemTest86), de disco (SMART) e de temperatura.\n\nIsso elimina a abordagem de 'tentativa e erro' que outros técnicos usam.",
  "solucao": "Com o driver/componente identificado, a solução é direta: atualizar/reverter driver, substituir RAM defeituosa, fazer limpeza térmica ou reparar o Windows. Sempre preservamos seus dados.\n\nPara BSODs causados por hardware, apresentamos orçamento detalhado antes de qualquer troca.",
  "quandoCompensa": "Sempre compensa diagnosticar — o BSOD é um sintoma, não o problema. Identificar a causa evita danos maiores e perda de dados.",
  "quandoNaoCompensa": "Quando múltiplos componentes estão falhando simultaneamente (placa-mãe + RAM + HD), pode ser mais viável substituir o conjunto.",
  "whatsappMessage": "Olá! Meu computador está dando tela azul. Preciso de diagnóstico.",
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
      "label": "PC Reiniciando Sozinho",
      "to": "/problemas/pc-reiniciando-sozinho-curitiba"
    },
    {
      "label": "Computador Travando",
      "to": "/problemas/computador-travando-curitiba"
    },
    {
      "label": "PC Superaquecendo",
      "to": "/problemas/pc-superaquecendo-curitiba"
    },
    {
      "label": "Placa-mãe Queimada",
      "to": "/problemas/placa-mae-queimada"
    }
  ],
  "conteudoExtra": "## Guia: Tela Azul (BSOD) em Curitiba\n\n### Códigos de Erro Mais Comuns e Suas Causas\n\n| Código BSOD | Causa Provável | Ação |\n|---|---|---|\n| IRQL_NOT_LESS_OR_EQUAL | Driver incompatível | Atualizar/reverter driver |\n| CRITICAL_PROCESS_DIED | Arquivo do sistema corrompido | SFC /scannow + DISM |\n| WHEA_UNCORRECTABLE_ERROR | Erro de hardware (CPU/RAM) | Teste de hardware |\n| PAGE_FAULT_IN_NONPAGED_AREA | RAM defeituosa | MemTest86 |\n| KERNEL_DATA_INPAGE_ERROR | HD/SSD com falha | Verificar SMART |\n| DRIVER_IRQL_NOT_LESS_OR_EQUAL | Driver de rede/USB | Identificar driver |\n| SYSTEM_SERVICE_EXCEPTION | Driver ou serviço do sistema | Análise do dump |\n\n### O Que Fazer Quando Aparece a Tela Azul\n\n1. **Anote o código de erro** que aparece na tela\n2. **Não force desligamento** — espere reiniciar sozinho\n3. **Verifique se repete** — BSOD único pode ser falha momentânea\n4. **Se repetir, procure assistência** — BSODs frequentes indicam problema real\n\n### Atendimento em Curitiba e Região\n\nDiagnosticamos telas azuis em toda Curitiba e região metropolitana. Análise de crash dump inclusa no diagnóstico."
};
