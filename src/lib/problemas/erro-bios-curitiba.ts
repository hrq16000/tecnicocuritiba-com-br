import type { ProblemaPageData } from "./types";

export const problema: ProblemaPageData = {
  "slug": "erro-bios-curitiba",
  "title": "Erro de BIOS em Curitiba | Diagnóstico e Reparo Especializado",
  "metaDescription": "Erro de BIOS no computador? Técnico em Curitiba resolve BIOS corrompida, configuração errada, atualização falha e senha esquecida. Atendimento profissional.",
  "h1": "Erro de BIOS — Diagnóstico e Reparo Profissional em Curitiba",
  "categoria": "Hardware — Firmware",
  "intro": "A BIOS (ou UEFI, em computadores modernos) é o primeiro software que roda quando você liga o computador. Ela inicializa o hardware, verifica se tudo está funcionando e passa o controle para o sistema operacional. Quando há um erro na BIOS, o computador pode não ligar, travar na tela de POST, emitir bipes ou mostrar mensagens de erro antes do Windows.\n\nErros de BIOS são particularmente assustadores porque aparecem antes mesmo do sistema operacional carregar — muitos usuários pensam que o computador \"morreu\". Na maioria dos casos, porém, o problema é resolvível com configuração correta, reset de CMOS ou regravação de firmware.\n\nEm Curitiba, atendemos frequentemente casos de BIOS corrompida após queda de energia (algo comum em bairros como CIC, Boqueirão e Cajuru), atualização de BIOS interrompida e configurações incorretas após upgrade de hardware.",
  "sintomas": [
    {
      "titulo": "Mensagem 'CMOS Checksum Error'",
      "desc": "A bateria CR2032 da placa-mãe está fraca ou morta. A BIOS perde as configurações salvas toda vez que o PC é desligado.",
      "gravidade": "Simples"
    },
    {
      "titulo": "PC não passa da tela de POST",
      "desc": "O computador liga, mostra o logo do fabricante, mas trava e não chega ao Windows. Pode indicar configuração de boot incorreta ou hardware não reconhecido.",
      "gravidade": "Média"
    },
    {
      "titulo": "Bipes ao ligar (beep codes)",
      "desc": "Sequências de bipes indicam erros específicos de hardware. 1 bipe longo + 3 curtos = problema de vídeo. Cada fabricante tem códigos diferentes.",
      "gravidade": "Média-Alta"
    },
    {
      "titulo": "Mensagem 'Boot Device Not Found'",
      "desc": "A BIOS não encontra o HD/SSD para iniciar o sistema. Pode ser cabo solto, ordem de boot errada ou disco com falha.",
      "gravidade": "Média"
    },
    {
      "titulo": "BIOS corrompida após atualização",
      "desc": "Atualização de BIOS interrompida por queda de energia ou arquivo errado. O computador pode não ligar de jeito nenhum.",
      "gravidade": "Alta"
    },
    {
      "titulo": "Senha de BIOS esquecida",
      "desc": "Uma senha foi definida na BIOS e agora impede o acesso às configurações ou até a inicialização do sistema.",
      "gravidade": "Média"
    }
  ],
  "causas": [
    {
      "titulo": "Bateria CR2032 fraca ou morta",
      "desc": "A bateria da placa-mãe mantém as configurações da BIOS quando o PC está desligado. Após 3-5 anos, ela descarrega e a BIOS reseta para padrão de fábrica a cada boot.",
      "tipo": "desgaste"
    },
    {
      "titulo": "Atualização de BIOS falha",
      "desc": "Atualizar a BIOS é arriscado — uma queda de energia, versão errada ou interrupção durante o processo pode corromper o firmware permanentemente.",
      "tipo": "erro-humano"
    },
    {
      "titulo": "Configuração incorreta após upgrade",
      "desc": "Ao instalar novo hardware (RAM, SSD NVMe, processador), a BIOS pode precisar de ajustes. Configuração errada de AHCI/IDE, XMP ou boot order causa erros.",
      "tipo": "erro-humano"
    },
    {
      "titulo": "Queda de energia ou pico de tensão",
      "desc": "Picos elétricos podem corromper o chip de BIOS/UEFI. Comum em Curitiba durante tempestades, especialmente sem uso de nobreak ou estabilizador.",
      "tipo": "hardware"
    },
    {
      "titulo": "Malware de BIOS (rootkit)",
      "desc": "Embora raro, existem malwares que se instalam na BIOS/UEFI, sobrevivendo até a formatação. Mais comum em máquinas corporativas.",
      "tipo": "software"
    }
  ],
  "cenarios": [
    {
      "nivel": "Simples",
      "desc": "Troca de bateria CR2032 + reset de CMOS + reconfiguração. Resolve checksum errors e perda de configurações.",
      "tempo": "30-60 min",
      "custo": "R$ 80–150"
    },
    {
      "nivel": "Médio",
      "desc": "Reconfiguração completa de BIOS/UEFI, ajuste de boot order, habilitação de AHCI/NVMe, configuração de XMP.",
      "tempo": "1-2 horas",
      "custo": "R$ 120–250"
    },
    {
      "nivel": "Complexo",
      "desc": "Regravação de chip BIOS com gravador externo (CH341A) + reprogramação de firmware. Para BIOS completamente corrompida.",
      "tempo": "1-3 dias",
      "custo": "R$ 200–500"
    }
  ],
  "riscos": [
    "Atualizar BIOS com versão errada pode inutilizar a placa-mãe permanentemente",
    "Resetar CMOS sem conhecimento pode desabilitar recursos essenciais (AHCI, boot seguro)",
    "Configurar overclocking na BIOS sem experiência pode queimar processador ou RAM",
    "Ignorar erro de bateria CR2032 pode causar perda de hora/data e problemas de certificados SSL",
    "Desabilitar Secure Boot pode impedir o Windows 11 de iniciar",
    "Regravação amadora de BIOS pode gravar firmware incompatível e inutilizar a placa"
  ],
  "diagnostico": "Diagnóstico de BIOS/UEFI:\n\n1. Análise dos beep codes (padrão do fabricante da placa-mãe)\n2. Verificação de bateria CR2032 com multímetro (deve estar acima de 2.8V)\n3. Reset de CMOS via jumper ou remoção de bateria\n4. Verificação de versão atual da BIOS vs versão mais recente\n5. Teste de boot com configurações padrão (Load Optimized Defaults)\n6. Verificação de integridade do chip BIOS com gravador externo\n\nCusto: R$ 99,99 (incorporado se aprovar o serviço).",
  "solucao": "Solução conforme o caso:\n\n- **Bateria**: Troca da CR2032 + reconfiguração de data/hora e boot order\n- **Configuração**: Load Optimized Defaults + ajustes específicos (AHCI, XMP, boot order)\n- **Senha**: Reset via jumper CMOS ou remoção de bateria por 30 minutos\n- **BIOS corrompida**: Regravação com gravador CH341A e firmware original do fabricante\n- **Dual BIOS**: Ativação do chip BIOS de backup (em placas que possuem)\n\nTeste completo de POST e inicialização do sistema após o reparo.",
  "quandoCompensa": "Quase sempre — a maioria dos problemas de BIOS custa R$ 80-250 para resolver. Mesmo regravação de chip (R$ 200-500) é mais barato que trocar a placa-mãe.",
  "quandoNaoCompensa": "Quando a placa-mãe já tem outros defeitos além da BIOS corrompida (capacitores estufados, trilhas queimadas) e tem mais de 8 anos.",
  "whatsappMessage": "Olá! Meu computador está com erro de BIOS e não inicia corretamente. Podem me ajudar?",
  "relatedPages": [
    {
      "to": "/problemas/computador-nao-liga-curitiba",
      "label": "Computador Não Liga"
    },
    {
      "to": "/problemas/pc-com-tela-preta-curitiba",
      "label": "PC com Tela Preta"
    },
    {
      "to": "/problemas/placa-mae-com-defeito-curitiba",
      "label": "Placa-Mãe com Defeito"
    },
    {
      "to": "/servicos/conserto-pc-notebook",
      "label": "Conserto de PC/Notebook"
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
  "conteudoExtra": "## Entendendo a BIOS/UEFI: Guia Completo\n\n### BIOS vs UEFI — Qual a Diferença?\n\n| Característica | BIOS (Legacy) | UEFI |\n|---|---|---|\n| Interface | Texto azul/cinza | Gráfica com mouse |\n| Limite de disco | 2 TB (MBR) | 9.4 ZB (GPT) |\n| Boot seguro | Não | Sim (Secure Boot) |\n| Velocidade de boot | Mais lento | Mais rápido |\n| Ano de adoção | 1981-2012 | 2012+ |\n\n### Beep Codes Comuns (Award BIOS)\n\n| Bipes | Significado |\n|---|---|\n| 1 curto | POST OK — boot normal |\n| 1 longo + 2 curtos | Erro de vídeo (GPU ou RAM de vídeo) |\n| 1 longo + 3 curtos | Erro de teclado ou vídeo |\n| Contínuo | Erro de memória RAM |\n| Nenhum bipe, sem vídeo | Processador ou placa-mãe |\n\n### Como Acessar a BIOS\n\n| Fabricante | Tecla |\n|---|---|\n| ASUS | DEL ou F2 |\n| Gigabyte | DEL |\n| MSI | DEL |\n| Dell | F2 |\n| HP | F10 ou ESC |\n| Lenovo | F1 ou F2 |\n| Acer | F2 ou DEL |\n\n### Quando Atualizar a BIOS?\n\n- ✅ Ao instalar processador novo que exige BIOS mais recente\n- ✅ Para corrigir bug conhecido (instabilidade, compatibilidade)\n- ❌ Se tudo funciona normalmente — \"não mexa no que funciona\"\n- ❌ Nunca atualize durante tempestade ou sem nobreak"
};
