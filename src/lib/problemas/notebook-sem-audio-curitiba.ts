import type { ProblemaPageData } from "./types";

export const problema: ProblemaPageData = {
  "slug": "notebook-sem-audio-curitiba",
  "title": "Notebook Sem Áudio em Curitiba — Diagnóstico e Solução",
  "metaDescription": "Notebook sem som? Veja causas reais (driver, serviço de áudio, alto-falante queimado) e como resolver em Curitiba com técnico especializado.",
  "h1": "Notebook Sem Áudio — Diagnóstico e Reparo em Curitiba",
  "categoria": "Software / Hardware",
  "intro": "Perder o áudio do notebook é um problema comum que afeta reuniões, aulas online, entretenimento e produtividade. A causa pode ser tão simples quanto um driver desatualizado ou tão complexa quanto um alto-falante interno queimado.\n\nEm muitos casos, o problema surge após atualizações do Windows que substituem o driver de áudio por uma versão genérica incompatível. Em outros, o conector P2 está com mau contato interno, ou o serviço Windows Audio parou de funcionar.\n\nO diagnóstico correto evita gastos desnecessários — não adianta trocar o alto-falante se o problema é software, e não adianta reinstalar drivers se o componente físico está danificado.",
  "sintomas": [
    {
      "titulo": "Ícone de som com X vermelho",
      "desc": "O Windows não detecta nenhum dispositivo de áudio instalado. Geralmente problema de driver ou serviço desativado.",
      "gravidade": "Simples"
    },
    {
      "titulo": "Som funciona só no fone de ouvido",
      "desc": "O alto-falante interno pode estar queimado ou o conector P2 está travado na posição 'fone conectado'.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Áudio chiando ou com estática",
      "desc": "Pode indicar alto-falante danificado, interferência elétrica na placa de áudio ou driver com conflito.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Volume no máximo mas som muito baixo",
      "desc": "Alto-falante com bobina desgastada, configuração de equalização incorreta ou limitador de volume ativo.",
      "gravidade": "Simples"
    },
    {
      "titulo": "Som parou após atualização do Windows",
      "desc": "Driver de áudio foi substituído por versão genérica durante o Windows Update.",
      "gravidade": "Simples"
    },
    {
      "titulo": "Áudio trava e faz loops de som",
      "desc": "Conflito de driver, DPC latency alto ou falha no chip de áudio da placa-mãe.",
      "gravidade": "Complexo"
    }
  ],
  "causas": [
    {
      "titulo": "Driver de áudio ausente ou corrompido",
      "desc": "Após formatação ou atualização do Windows, o driver Realtek/Conexant pode ser removido ou substituído por versão genérica.",
      "tipo": "software"
    },
    {
      "titulo": "Serviço Windows Audio desativado",
      "desc": "O serviço responsável pelo áudio pode ter sido desativado por otimizadores de sistema ou erro do Windows.",
      "tipo": "software"
    },
    {
      "titulo": "Alto-falante interno queimado",
      "desc": "Uso em volume máximo prolongado ou curto-circuito pode danificar a bobina do alto-falante interno.",
      "tipo": "hardware"
    },
    {
      "titulo": "Conector P2 com mau contato",
      "desc": "O conector de fone de ouvido pode estar com detrito interno, fazendo o sistema pensar que há fone conectado.",
      "tipo": "desgaste"
    },
    {
      "titulo": "Chip de áudio com defeito na placa-mãe",
      "desc": "O codec de áudio (Realtek ALC, Conexant) na placa-mãe pode ter falhado por sobretensão.",
      "tipo": "hardware"
    },
    {
      "titulo": "Conflito entre dispositivos de áudio",
      "desc": "HDMI, Bluetooth e alto-falante interno competindo como dispositivo padrão causa confusão no sistema.",
      "tipo": "software"
    }
  ],
  "cenarios": [
    {
      "nivel": "Simples",
      "desc": "Reinstalação de driver, reativação do serviço Windows Audio, ajuste de dispositivo padrão.",
      "tempo": "30-60 min",
      "custo": "R$60–R$120"
    },
    {
      "nivel": "Médio",
      "desc": "Limpeza/reparo do conector P2, troca de alto-falante interno.",
      "tempo": "1-3 horas",
      "custo": "R$120–R$250"
    },
    {
      "nivel": "Complexo",
      "desc": "Reparo ou substituição do chip de áudio na placa-mãe, uso de placa de som USB externa.",
      "tempo": "1-3 dias",
      "custo": "R$200–R$450"
    }
  ],
  "riscos": [
    "Instalar drivers de áudio incompatíveis pode causar tela azul",
    "Forçar o conector P2 pode danificar a trilha da placa-mãe",
    "Desinstalar drivers errados pode afetar outros dispositivos",
    "Ignorar chiado no áudio pode indicar curto-circuito progressivo"
  ],
  "diagnostico": "Verificamos primeiro se o problema é software: testamos o driver no Gerenciador de Dispositivos, verificamos o serviço Windows Audio, testamos com fone de ouvido para isolar alto-falante vs. sistema. Usamos diagnóstico de áudio integrado do fabricante (Dell, Lenovo, HP). Se software estiver OK, abrimos o notebook para inspecionar o alto-falante, cabo flat de áudio e conector P2.",
  "solucao": "Para software: instalação do driver correto do fabricante, configuração do dispositivo de áudio padrão, reativação de serviços. Para hardware: troca do alto-falante interno (peça específica por modelo), limpeza ou troca do conector P2, ou instalação de placa de som USB externa quando o chip onboard está danificado.",
  "quandoCompensa": "Quase sempre compensa resolver — a maioria dos casos é software (custo baixo). Mesmo troca de alto-falante é acessível (R$80-R$150 a peça + mão de obra).",
  "quandoNaoCompensa": "Se o chip de áudio na placa-mãe queimou em notebook muito antigo (7+ anos), o custo de micro-solda pode não justificar. Nesses casos, uma placa de som USB externa (R$30-R$80) é a alternativa mais econômica.",
  "whatsappMessage": "Olá! Meu notebook está sem áudio e preciso de diagnóstico em Curitiba. Podem me ajudar?",
  "relatedPages": [
    {
      "to": "/problemas/notebook-sem-webcam-curitiba",
      "label": "Notebook Sem Webcam"
    },
    {
      "to": "/problemas/notebook-lento-curitiba",
      "label": "Notebook Lento"
    },
    {
      "to": "/problemas/notebook-nao-liga-curitiba",
      "label": "Notebook Não Liga"
    },
    {
      "to": "/conserto-notebook-curitiba",
      "label": "Conserto de Notebook"
    },
    {
      "to": "/formatacao-computador-curitiba",
      "label": "Formatação"
    },
    {
      "to": "/servicos",
      "label": "Todos os Serviços"
    }
  ],
  "conteudoExtra": "## Soluções Rápidas Para Testar Antes do Técnico\n\n### 1. Verifique o Dispositivo de Áudio Padrão\n- Clique com botão direito no ícone de som > **Configurações de som**\n- Verifique se o dispositivo correto está selecionado como saída\n- Se aparecer \"HDMI\" como padrão, mude para \"Alto-falantes\"\n\n### 2. Reinicie o Serviço de Áudio\n1. Pressione Win + R e digite **services.msc**\n2. Encontre **Windows Audio** e **Windows Audio Endpoint Builder**\n3. Clique com botão direito > **Reiniciar** em ambos\n\n### 3. Teste com Fone de Ouvido\n- Se funciona no fone mas não no alto-falante, o problema é hardware interno\n- Se não funciona em nenhum, provavelmente é driver ou serviço\n\n## Drivers de Áudio: O Problema Mais Comum\n\nApós atualizações do Windows 10/11, o driver de áudio do fabricante é frequentemente substituído por um driver genérico da Microsoft. Esse driver genérico funciona parcialmente mas pode causar:\n- Volume máximo muito baixo\n- Microfone não funcionando\n- Som cortando intermitentemente\n\n**Solução**: baixe o driver diretamente do site do fabricante (Dell, Lenovo, HP, Acer) usando o número de série/modelo exato do notebook.\n\n## Alto-Falantes de Notebook: Fragilidade Conhecida\n\nAlto-falantes internos de notebooks são componentes pequenos e frágeis. O uso prolongado em volume máximo acelera o desgaste da bobina. Em notebooks mais finos (ultrabooks), o espaço reduzido limita a qualidade e durabilidade do áudio."
};
