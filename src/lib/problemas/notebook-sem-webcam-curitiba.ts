import type { ProblemaPageData } from "./types";

export const problema: ProblemaPageData = {
  "slug": "notebook-sem-webcam-curitiba",
  "title": "Notebook Sem Webcam Funcionando em Curitiba | Câmera Não Detectada",
  "metaDescription": "Webcam do notebook não funciona em Curitiba? Diagnóstico de driver, cabo flat e módulo da câmera. Técnico especialista com atendimento rápido.",
  "h1": "Notebook Sem Webcam Funcionando em Curitiba — Câmera Não Detectada",
  "categoria": "Problemas de Notebook",
  "intro": "A webcam integrada do notebook parou de funcionar ou não é detectada pelo sistema. O problema pode aparecer como \"câmera não encontrada\", tela preta em aplicativos de vídeo, LED da câmera não acende, ou a webcam simplesmente desapareceu do Gerenciador de Dispositivos.\n\nEm Curitiba, com o aumento do trabalho remoto e reuniões online, esse problema impacta diretamente a produtividade. As causas variam desde configurações de privacidade do Windows até falha física do módulo da câmera.",
  "sintomas": [
    {
      "titulo": "Webcam não aparece no Gerenciador de Dispositivos",
      "desc": "O módulo da câmera não é reconhecido pelo sistema. Pode ser driver ausente, cabo flat desconectado ou falha no hardware.",
      "gravidade": "Médio a complexo"
    },
    {
      "titulo": "Tela preta em aplicativos de vídeo",
      "desc": "Zoom, Teams ou Google Meet exibem tela preta. O dispositivo pode estar bloqueado por privacidade ou com driver corrompido.",
      "gravidade": "Simples a médio"
    },
    {
      "titulo": "LED da câmera não acende",
      "desc": "Ao abrir aplicativos de vídeo, o LED indicador não liga, sugerindo que o hardware não está sendo ativado.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Mensagem 'Não foi possível encontrar sua câmera'",
      "desc": "Erro 0xA00F4244 do Windows indica que nenhum dispositivo de câmera foi detectado pelo sistema.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Webcam funciona intermitentemente",
      "desc": "Liga e desliga sozinha durante uso. Geralmente indica cabo flat com mau contato ou driver instável.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Imagem congelada ou com linhas",
      "desc": "A câmera é detectada mas a imagem congela ou apresenta artefatos visuais, indicando falha parcial do sensor.",
      "gravidade": "Médio a complexo"
    }
  ],
  "causas": [
    {
      "titulo": "Configurações de Privacidade do Windows",
      "desc": "O Windows 10/11 tem opções que bloqueiam o acesso à câmera por aplicativos. Uma atualização pode redefinir essas configurações.",
      "tipo": "software"
    },
    {
      "titulo": "Driver corrompido ou ausente",
      "desc": "Atualizações do Windows podem remover ou corromper o driver da webcam, tornando o dispositivo invisível ao sistema.",
      "tipo": "software"
    },
    {
      "titulo": "Cabo flat desconectado",
      "desc": "Em notebooks que sofreram queda ou tiveram a tela aberta para reparo, o cabo flat da câmera pode ter se desconectado.",
      "tipo": "hardware"
    },
    {
      "titulo": "Módulo da câmera defeituoso",
      "desc": "Falha no hardware do sensor CMOS da webcam. Pode ocorrer por desgaste ou impacto.",
      "tipo": "hardware"
    },
    {
      "titulo": "Antivírus bloqueando acesso",
      "desc": "Alguns antivírus possuem proteção de webcam que impede o acesso por aplicativos não autorizados.",
      "tipo": "software"
    },
    {
      "titulo": "Tampa de privacidade física fechada",
      "desc": "Slider de privacidade fechado (comum em notebooks corporativos Lenovo, HP e Dell) bloqueia fisicamente a câmera.",
      "tipo": "erro-humano"
    }
  ],
  "cenarios": [
    {
      "nivel": "Simples",
      "desc": "Configuração de privacidade bloqueando, tampa física fechada ou driver desatualizado. Resolvido remotamente ou na visita.",
      "tempo": "15 min a 30 min",
      "custo": "Dentro da visita técnica"
    },
    {
      "nivel": "Médio",
      "desc": "Driver corrompido por atualização, conflito de software ou reinstalação necessária. Pode exigir rollback.",
      "tempo": "30 min a 1h",
      "custo": "R$ 99,99 a R$ 150"
    },
    {
      "nivel": "Complexo",
      "desc": "Cabo flat desconectado ou módulo da câmera defeituoso. Requer abertura do notebook e possível substituição de peça.",
      "tempo": "1h a 3h",
      "custo": "R$ 150 a R$ 300 + peça"
    }
  ],
  "riscos": [
    "Reinstalar drivers incorretos pode causar conflitos com outros dispositivos",
    "Abrir a tampa do notebook sem experiência pode danificar o cabo flat da tela",
    "Usar webcam USB como alternativa permanente ocupa porta e reduz portabilidade",
    "Ignorar falha intermitente pode indicar problema progressivo no cabo flat"
  ],
  "diagnostico": "O diagnóstico começa verificando as Configurações de Privacidade do Windows (Configurações → Privacidade → Câmera). Em seguida, verificamos o Gerenciador de Dispositivos para confirmar se o hardware é reconhecido.\n\nSe o dispositivo aparece com erro, testamos reinstalação de driver. Se não aparece, fazemos boot com Linux Live USB para verificar se o hardware é detectado fora do Windows — isso diferencia falha de software de hardware.\n\nPara suspeita de cabo flat, inspecionamos a conexão física entre a placa-mãe e o módulo da câmera na tampa do notebook.",
  "solucao": "Para problemas de software, reconfiguramos as permissões de privacidade, reinstalamos o driver correto do fabricante e removemos conflitos de antivírus. Em casos de driver corrompido por atualização, fazemos rollback.\n\nPara falhas de hardware, reconectamos o cabo flat da webcam ou substituímos o módulo da câmera. A maioria dos módulos de webcam para notebook é acessível e tem custo baixo. Em casos raros onde a placa controladora falhou, configuramos uma webcam USB compacta de alta qualidade como alternativa.",
  "quandoCompensa": "Quando o problema é de software (driver, permissão) ou quando o módulo da câmera é acessível e barato para o modelo específico.",
  "quandoNaoCompensa": "Quando a falha está na placa controladora integrada à placa-mãe e o custo de reparo ultrapassa o valor de uma webcam USB externa de qualidade.",
  "whatsappMessage": "Olá! A webcam do meu notebook não está funcionando. Preciso de diagnóstico e reparo em Curitiba.",
  "relatedPages": [
    {
      "label": "Notebook Não Liga",
      "to": "/problemas/notebook-nao-liga-curitiba"
    },
    {
      "label": "Conserto de Notebook",
      "to": "/servicos/conserto-pc-notebook"
    },
    {
      "label": "Tela Preta",
      "to": "/problemas/notebook-tela-preta-curitiba"
    },
    {
      "label": "Diagnóstico Técnico",
      "to": "/diagnostico-tecnico"
    }
  ],
  "conteudoExtra": "## Verificações Rápidas Antes de Chamar um Técnico\n\n1. **Verifique a tampa de privacidade**: Muitos notebooks têm um slider físico sobre a câmera\n2. **Configurações de Privacidade**: Configurações → Privacidade e Segurança → Câmera → ative \"Acesso à câmera\"\n3. **Gerenciador de Dispositivos**: Clique com botão direito no menu Iniciar → procure \"Câmeras\" ou \"Dispositivos de imagem\"\n4. **Teste em outro app**: Se não funciona no Teams, teste no aplicativo Câmera do Windows\n5. **Reinicie o notebook**: Um simples reinício pode resolver conflitos temporários\n\n## Webcam USB como Solução Temporária\n\nPara reuniões urgentes, uma webcam USB pode ser conectada imediatamente. Modelos Full HD com microfone integrado custam a partir de R$ 80 e oferecem qualidade superior à maioria das webcams integradas."
};
