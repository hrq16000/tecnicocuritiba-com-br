import type { ProblemaPageData } from "./types";

export const problema: ProblemaPageData = {
  "slug": "notebook-touchpad-nao-funciona-curitiba",
  "title": "Touchpad do Notebook Não Funciona em Curitiba | Técnico Especialista",
  "metaDescription": "Touchpad do notebook parou de funcionar, não responde ao toque ou está travado? Técnico em Curitiba resolve problemas de touchpad com diagnóstico rápido e preciso.",
  "h1": "Touchpad do Notebook Não Funciona — Diagnóstico e Reparo em Curitiba",
  "categoria": "Hardware — Periférico",
  "intro": "O touchpad do notebook parou de responder, funciona de forma intermitente ou perdeu gestos como scroll e zoom? Esse problema pode parecer menor, mas torna o notebook praticamente inútil sem um mouse externo — especialmente para quem usa o equipamento fora de casa.\n\nAs causas vão desde uma simples tecla de atalho que desativou o touchpad (Fn + F-key) até problemas de driver, cabo flat desconectado ou defeito no próprio sensor capacitivo. Em notebooks mais recentes com touchpad de precisão (Windows Precision), problemas de driver são especialmente comuns após atualizações do Windows.\n\nEm Curitiba, atendemos muitos casos onde o touchpad parou após atualização do Windows, derramamento de líquido sobre o teclado (que atinge o touchpad por baixo) ou após manutenção onde o cabo flat não foi reconectado corretamente.",
  "sintomas": [
    {
      "titulo": "Touchpad completamente morto (sem resposta)",
      "desc": "Nenhum movimento, clique ou gesto funciona. Pode ser desativado por tecla de atalho, driver ausente ou cabo flat desconectado.",
      "gravidade": "Média"
    },
    {
      "titulo": "Cursor se move mas cliques não funcionam",
      "desc": "O cursor acompanha o dedo mas tocar para clicar ou os botões físicos não respondem. Problema de configuração ou sensor de clique.",
      "gravidade": "Baixa-Média"
    },
    {
      "titulo": "Touchpad funciona de forma intermitente",
      "desc": "Às vezes funciona, às vezes para. Piora com temperatura ou posição específica. Indica cabo flat com mau contato ou sensor com falha parcial.",
      "gravidade": "Média"
    },
    {
      "titulo": "Gestos de scroll/zoom pararam de funcionar",
      "desc": "O cursor se move mas scroll com dois dedos, pinch-to-zoom e outros gestos não respondem. Geralmente problema de driver ou configuração.",
      "gravidade": "Baixa"
    },
    {
      "titulo": "Cursor pula ou se move sozinho",
      "desc": "O cursor salta para posições aleatórias ou se move sem tocar. Pode ser interferência eletrostática, sujeira no sensor ou driver com bug.",
      "gravidade": "Média"
    },
    {
      "titulo": "Touchpad desativa quando conecta mouse USB",
      "desc": "Configuração do Windows ou BIOS que desativa o touchpad quando mouse externo é detectado. Pode ser ajustado nas configurações.",
      "gravidade": "Baixa"
    }
  ],
  "causas": [
    {
      "titulo": "Desativado por tecla de atalho (Fn + F-key)",
      "desc": "A maioria dos notebooks tem uma tecla (F5, F6, F7 ou F9) que desativa o touchpad. Muitos usuários apertam sem querer e acham que quebrou.",
      "tipo": "erro-humano"
    },
    {
      "titulo": "Driver Synaptics/ELAN corrompido ou ausente",
      "desc": "Após atualização do Windows, o driver do touchpad pode ser substituído por versão genérica que não suporta gestos ou funciona parcialmente.",
      "tipo": "software"
    },
    {
      "titulo": "Cabo flat desconectado ou danificado",
      "desc": "O cabo flat que conecta o touchpad à placa-mãe pode se soltar após impacto, vibração ou manutenção. Fio rompido causa falha total.",
      "tipo": "hardware"
    },
    {
      "titulo": "Líquido derramado sobre o teclado",
      "desc": "Água, café ou refrigerante derramado no teclado pode escorrer para baixo e atingir o circuito do touchpad, causando curto ou corrosão.",
      "tipo": "erro-humano"
    },
    {
      "titulo": "Touchpad desativado na BIOS",
      "desc": "Algumas BIOS/UEFI têm opção de desativar o touchpad. Pode ter sido alterado acidentalmente ou durante manutenção.",
      "tipo": "erro-humano"
    },
    {
      "titulo": "Sensor capacitivo com defeito",
      "desc": "O próprio sensor do touchpad pode falhar por desgaste, impacto ou defeito de fabricação. Mais comum em notebooks com mais de 4 anos.",
      "tipo": "desgaste"
    }
  ],
  "cenarios": [
    {
      "nivel": "Simples",
      "desc": "Reativação por tecla de atalho + reinstalação de driver + configuração de gestos. Resolve 50% dos casos.",
      "tempo": "20-40 min",
      "custo": "R$ 70–130"
    },
    {
      "nivel": "Médio",
      "desc": "Reconexão do cabo flat + limpeza de contatos + instalação de driver específico do fabricante.",
      "tempo": "1-2 horas",
      "custo": "R$ 130–250"
    },
    {
      "nivel": "Complexo",
      "desc": "Troca do módulo touchpad completo ou reparo de trilha na placa do touchpad após dano por líquido.",
      "tempo": "2-5 dias",
      "custo": "R$ 200–500"
    }
  ],
  "riscos": [
    "Derramamento de líquido pode corroer outros componentes além do touchpad",
    "Forçar cabo flat pode romper o conector na placa-mãe — reparo caro",
    "Instalar driver de touchpad genérico pode causar conflito com outros dispositivos",
    "Desmontar notebook sem experiência pode danificar clipes e travas do touchpad",
    "Usar mouse externo permanentemente sobrecarrega a porta USB e limita mobilidade"
  ],
  "diagnostico": "Diagnóstico de touchpad:\n\n1. Verificação de tecla de atalho (Fn + F-key)\n2. Verificação de configuração do Windows (Configurações → Dispositivos → Touchpad)\n3. Verificação no Gerenciador de Dispositivos (driver, status)\n4. Teste com mouse USB conectado e desconectado\n5. Verificação na BIOS (touchpad habilitado?)\n6. Inspeção física do cabo flat e conector\n\nCusto: R$ 70 (incorporado se aprovar o serviço).",
  "solucao": "Solução conforme a causa:\n\n- **Tecla de atalho**: Reativação via Fn + F-key ou Configurações do Windows\n- **Driver**: Remoção do driver genérico + instalação do driver Synaptics/ELAN do fabricante\n- **Cabo flat**: Reconexão segura ou troca do cabo\n- **BIOS**: Reativação da opção de touchpad nas configurações de BIOS\n- **Sensor**: Troca do módulo touchpad por peça compatível\n- **Líquido**: Limpeza com álcool isopropílico + secagem + teste de continuidade\n\nTeste completo de todos os gestos e cliques após o reparo.",
  "quandoCompensa": "Sempre — resolver touchpad custa R$ 70-250 na maioria dos casos. Mesmo troca do módulo (R$ 200-500) é mais barato que usar mouse externo para sempre.",
  "quandoNaoCompensa": "Quando o notebook é muito antigo e a peça de reposição não existe mais. Nesse caso, um mouse Bluetooth compacto resolve por R$ 50-100.",
  "whatsappMessage": "Olá! O touchpad do meu notebook parou de funcionar. Podem me ajudar?",
  "relatedPages": [
    {
      "to": "/problemas/teclado-nao-funciona-curitiba",
      "label": "Teclado Não Funciona"
    },
    {
      "to": "/problemas/erro-driver-windows-curitiba",
      "label": "Erro de Driver"
    },
    {
      "to": "/problemas/notebook-nao-conecta-bluetooth-curitiba",
      "label": "Bluetooth Não Conecta"
    },
    {
      "to": "/servicos/conserto-pc-notebook",
      "label": "Conserto de Notebook"
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
  "conteudoExtra": "## Touchpad do Notebook: Guia Completo\n\n### Teclas de Atalho para Touchpad por Fabricante\n\n| Fabricante | Tecla | Observação |\n|---|---|---|\n| Dell | Fn + F5 | Ícone de touchpad na tecla |\n| Lenovo | Fn + F6 | Varia por modelo |\n| HP | Duplo toque no canto superior esquerdo | Ou Fn + F-key |\n| Acer | Fn + F7 | LED indicador no touchpad |\n| ASUS | Fn + F9 | Varia por modelo |\n| Samsung | Fn + F5 | Ícone na tecla |\n\n### Tipos de Touchpad\n\n| Tipo | Gestos | Precisão | Notebooks |\n|---|---|---|---|\n| Synaptics | Básicos | Boa | Maioria até 2018 |\n| ELAN | Básicos a intermediários | Boa | Dell, Acer, ASUS |\n| Windows Precision | Completos (4+ dedos) | Excelente | Modernos 2019+ |\n| Apple Force Touch | Completos + força | Excelente | MacBook |\n\n### Como Verificar se o Touchpad Está Ativo\n\n1. **Win + I** → Dispositivos → Touchpad → Deve estar \"Ativado\"\n2. Verifique se existe um LED no touchpad (alguns modelos) — se aceso, está desativado\n3. Conecte um mouse USB → vá em Configurações → desmaque \"Desativar touchpad quando mouse está conectado\""
};
