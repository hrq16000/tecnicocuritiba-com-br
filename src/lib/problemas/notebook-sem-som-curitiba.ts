import type { ProblemaPageData } from "./types";

export const problema: ProblemaPageData = {
  "slug": "notebook-sem-som-curitiba",
  "title": "Notebook Sem Som em Curitiba — Diagnóstico e Reparo de Áudio",
  "metaDescription": "Notebook sem som? Técnico em Curitiba resolve driver de áudio, alto-falante queimado, conector P2 danificado e conflitos de dispositivo. Atendimento rápido.",
  "h1": "Notebook Sem Som — Diagnóstico e Reparo de Áudio em Curitiba",
  "categoria": "Hardware",
  "intro": "Seu notebook parou de reproduzir som? Esse problema pode ter causas simples como driver desatualizado ou volume desativado, mas também pode indicar defeito no alto-falante interno, no conector de fone ou na placa de áudio integrada.\n\nEm Curitiba, diagnosticamos problemas de áudio em notebooks de todas as marcas com testes que isolam cada componente da cadeia sonora — do software ao hardware.",
  "sintomas": [
    {
      "titulo": "Sem som nos alto-falantes internos",
      "desc": "O notebook não emite nenhum som pelos alto-falantes embutidos, mesmo com volume no máximo.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Som funciona apenas no fone de ouvido",
      "desc": "O áudio sai normalmente pelo fone mas os alto-falantes internos permanecem mudos.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Som com chiado ou distorção",
      "desc": "O áudio sai com ruídos, chiados, estalos ou distorção severa em qualquer volume.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Dispositivo de áudio não reconhecido",
      "desc": "O Windows exibe um X vermelho no ícone de som e não encontra nenhum dispositivo de saída.",
      "gravidade": "Simples"
    },
    {
      "titulo": "Som corta intermitentemente",
      "desc": "O áudio funciona por alguns segundos e depois corta, voltando sozinho de forma aleatória.",
      "gravidade": "Complexo"
    },
    {
      "titulo": "Conector de fone não funciona",
      "desc": "Ao plugar o fone de ouvido, o notebook não detecta o dispositivo ou continua tocando nos alto-falantes.",
      "gravidade": "Médio"
    }
  ],
  "causas": [
    {
      "titulo": "Driver de áudio corrompido ou ausente",
      "desc": "Atualizações do Windows podem remover ou corromper o driver Realtek/IDT/Conexant, desabilitando o áudio.",
      "tipo": "software"
    },
    {
      "titulo": "Alto-falante interno queimado",
      "desc": "O uso prolongado em volume máximo ou curto-circuito pode queimar a bobina do alto-falante.",
      "tipo": "hardware"
    },
    {
      "titulo": "Conector P2 (3.5mm) com mau contato",
      "desc": "O conector de fone pode estar com os contatos internos desgastados ou com sujeira, causando falhas de detecção.",
      "tipo": "desgaste"
    },
    {
      "titulo": "Flat cable do alto-falante solto",
      "desc": "Após quedas ou vibrações, o cabo flat que conecta o alto-falante à placa-mãe pode se desconectar.",
      "tipo": "hardware"
    },
    {
      "titulo": "Conflito de software de áudio",
      "desc": "Múltiplos softwares de áudio (Nahimic, Dolby, Realtek) podem conflitar e silenciar a saída.",
      "tipo": "software"
    },
    {
      "titulo": "Chip de áudio na placa-mãe defeituoso",
      "desc": "O codec de áudio integrado à placa-mãe pode falhar, eliminando completamente a capacidade sonora.",
      "tipo": "hardware"
    }
  ],
  "cenarios": [
    {
      "nivel": "Simples",
      "desc": "Driver ausente, volume desativado por software, ou conflito de dispositivos de áudio. Resolução via software.",
      "tempo": "30min–1h",
      "custo": "R$80–R$120"
    },
    {
      "nivel": "Médio",
      "desc": "Alto-falante queimado ou conector P2 com mau contato. Substituição de componentes acessíveis.",
      "tempo": "1–3h",
      "custo": "R$120–R$250"
    },
    {
      "nivel": "Complexo",
      "desc": "Chip de áudio defeituoso na placa-mãe. Requer micro soldagem ou uso de placa de som USB externa.",
      "tempo": "2–5 dias",
      "custo": "R$250–R$450"
    }
  ],
  "riscos": [
    "Instalar drivers genéricos pode causar conflitos com o hardware específico do notebook",
    "Abrir o notebook sem experiência pode danificar flat cables e conectores frágeis",
    "Ignorar chiados pode indicar curto-circuito que pode danificar outros componentes",
    "Forçar o conector de fone pode quebrar o jack interno permanentemente"
  ],
  "diagnostico": "O diagnóstico de áudio segue uma cadeia de testes: verificação de configurações do Windows (mixer, dispositivo padrão), teste com fones externos, boot com Linux Live USB para isolar causa de software vs hardware, e inspeção física dos alto-falantes e conectores.\n\nUsamos multímetro para verificar continuidade dos alto-falantes e osciloscópio para testar o sinal de saída do chip de áudio na placa-mãe.",
  "solucao": "Para problemas de software, reinstalamos o driver oficial do fabricante, removemos conflitos de áudio e reconfiguramos o dispositivo padrão. Para hardware, substituímos alto-falantes internos por peças compatíveis e reparamos conectores P2.\n\nEm casos de chip de áudio defeituoso, oferecemos micro soldagem quando viável ou adaptador USB de áudio como alternativa de custo reduzido.",
  "quandoCompensa": "Notebooks de médio/alto valor, problemas simples de driver ou alto-falante, ou quando o restante do equipamento está em bom estado.",
  "quandoNaoCompensa": "Notebooks antigos com chip de áudio integrado defeituoso onde o custo de micro soldagem ultrapassa o valor do equipamento.",
  "whatsappMessage": "Olá! Meu notebook está sem som. Gostaria de agendar um diagnóstico de áudio.",
  "relatedPages": [
    {
      "to": "/problemas/notebook-superaquecendo-curitiba",
      "label": "Notebook Superaquecendo"
    },
    {
      "to": "/problemas/erro-driver-windows-curitiba",
      "label": "Erro de Driver"
    },
    {
      "to": "/problemas/notebook-touchpad-nao-funciona-curitiba",
      "label": "Touchpad Não Funciona"
    },
    {
      "to": "/conserto-notebook-curitiba",
      "label": "Conserto de Notebook"
    },
    {
      "to": "/servicos",
      "label": "Todos os Serviços"
    }
  ],
  "conteudoExtra": "## Teste Rápido de Áudio\n\nAntes de acionar um técnico, tente:\n\n1. **Verifique o mixer do Windows** — clique com botão direito no ícone de som\n2. **Teste com fone de ouvido** — se funcionar, o problema está nos alto-falantes\n3. **Atualize o driver** — vá ao site do fabricante do notebook\n4. **Reinicie o serviço de áudio** — services.msc → Windows Audio → Reiniciar\n5. **Teste no modo de segurança** — se funcionar, há conflito de software"
};
