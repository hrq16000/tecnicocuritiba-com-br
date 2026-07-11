import type { ProblemaPageData } from "./types";

export const problema: ProblemaPageData = {
  "slug": "notebook-nao-conecta-bluetooth-curitiba",
  "title": "Notebook Não Conecta Bluetooth em Curitiba | Técnico Especialista",
  "metaDescription": "Bluetooth do notebook não funciona, não pareia ou não aparece? Técnico em Curitiba resolve problemas de Bluetooth com diagnóstico rápido. Atendimento profissional.",
  "h1": "Notebook Não Conecta Bluetooth — Diagnóstico e Reparo em Curitiba",
  "categoria": "Conectividade — Bluetooth",
  "intro": "O Bluetooth do notebook parou de funcionar, não encontra dispositivos ou sumiu das configurações? Esse problema é cada vez mais impactante com a popularização de fones sem fio, mouses Bluetooth, teclados e caixas de som wireless.\n\nAs causas vão desde um simples driver desatualizado até falha no módulo Wi-Fi/Bluetooth (que geralmente é um chip combo). Em notebooks, o módulo Bluetooth compartilha a mesma placa do Wi-Fi — se um funciona e o outro não, geralmente é problema de software ou antena.\n\nEm Curitiba, atendemos muitos casos onde uma atualização do Windows desabilitou o Bluetooth ou corrompeu o driver. Também é comum o Bluetooth \"sumir\" após reinstalação do sistema sem os drivers corretos do fabricante.",
  "sintomas": [
    {
      "titulo": "Ícone do Bluetooth sumiu da barra de tarefas",
      "desc": "O Bluetooth desapareceu completamente das configurações e da bandeja do sistema. Pode ser driver removido, serviço desabilitado ou módulo desativado na BIOS.",
      "gravidade": "Média"
    },
    {
      "titulo": "Bluetooth não encontra nenhum dispositivo",
      "desc": "A busca roda mas nunca encontra fones, mouses ou outros dispositivos. Pode ser problema de antena, driver ou modo avião ativado parcialmente.",
      "gravidade": "Média"
    },
    {
      "titulo": "Dispositivo pareia mas desconecta constantemente",
      "desc": "O fone ou mouse conecta por alguns segundos e depois cai. Indica interferência, driver instável ou perfil Bluetooth incompatível.",
      "gravidade": "Média"
    },
    {
      "titulo": "Áudio Bluetooth com atraso ou falhas",
      "desc": "O som pelo fone Bluetooth chega com delay, engasga ou tem qualidade muito baixa. Pode ser codec inadequado (SBC vs AAC/aptX) ou interferência.",
      "gravidade": "Baixa-Média"
    },
    {
      "titulo": "Erro 'Dispositivo Bluetooth desconhecido' no Gerenciador",
      "desc": "O Windows mostra o módulo Bluetooth com triângulo amarelo no Gerenciador de Dispositivos. Driver ausente ou corrompido.",
      "gravidade": "Média"
    },
    {
      "titulo": "Bluetooth funciona apenas após reiniciar",
      "desc": "O Bluetooth para de funcionar após o notebook sair do modo de suspensão (sleep). Bug comum de gerenciamento de energia do Windows.",
      "gravidade": "Média"
    }
  ],
  "causas": [
    {
      "titulo": "Driver Bluetooth corrompido ou desatualizado",
      "desc": "Windows Update pode instalar driver genérico que não funciona bem com o módulo específico do notebook. O driver do fabricante é essencial.",
      "tipo": "software"
    },
    {
      "titulo": "Serviço Bluetooth desabilitado no Windows",
      "desc": "O serviço 'Bluetooth Support Service' pode estar parado ou desabilitado. Sem ele, nenhuma funcionalidade Bluetooth opera.",
      "tipo": "software"
    },
    {
      "titulo": "Módulo Wi-Fi/Bluetooth com defeito",
      "desc": "O chip combo Intel/Realtek/Qualcomm pode falhar parcialmente — Wi-Fi funciona mas Bluetooth não, ou vice-versa.",
      "tipo": "hardware"
    },
    {
      "titulo": "Antena interna desconectada",
      "desc": "Os cabos de antena que vão do módulo até a tampa do notebook podem se soltar após manutenção ou impacto. Sem antena, o sinal é praticamente zero.",
      "tipo": "hardware"
    },
    {
      "titulo": "Configuração de energia desligando o módulo",
      "desc": "O Windows pode desligar o Bluetooth para economizar energia durante suspensão e não religar ao acordar. Configuração em Gerenciador de Dispositivos.",
      "tipo": "software"
    }
  ],
  "cenarios": [
    {
      "nivel": "Simples",
      "desc": "Reinstalação de driver correto do fabricante + reconfiguração de serviços. Resolve 60% dos casos.",
      "tempo": "30-60 min",
      "custo": "R$ 80–150"
    },
    {
      "nivel": "Médio",
      "desc": "Troca do módulo Wi-Fi/Bluetooth interno (chip M.2) por modelo compatível.",
      "tempo": "1-2 horas",
      "custo": "R$ 150–300"
    },
    {
      "nivel": "Complexo",
      "desc": "Reparo de conector de antena + troca de módulo + reconfiguração completa de drivers.",
      "tempo": "2-4 horas",
      "custo": "R$ 250–450"
    }
  ],
  "riscos": [
    "Instalar driver Bluetooth de fonte não oficial pode trazer malware",
    "Desabilitar serviços do Windows sem conhecimento pode afetar outras funcionalidades",
    "Trocar módulo Wi-Fi/Bluetooth por modelo incompatível pode causar problemas de Wi-Fi também",
    "Forçar pareamento com dispositivos incompatíveis pode travar o sistema Bluetooth",
    "Mexer nas antenas internas sem experiência pode danificar os conectores frágeis"
  ],
  "diagnostico": "Diagnóstico de Bluetooth:\n\n1. Verificação do módulo no Gerenciador de Dispositivos\n2. Teste de serviço Bluetooth Support Service\n3. Verificação de driver (versão, fabricante, compatibilidade)\n4. Teste com adaptador USB Bluetooth externo (para isolar hardware)\n5. Verificação de antena interna (conexão, integridade)\n6. Teste de pareamento com múltiplos dispositivos\n\nCusto: R$ 80 (incorporado se aprovar o serviço).",
  "solucao": "Solução conforme a causa:\n\n- **Driver**: Remoção completa do driver atual + instalação do driver oficial do fabricante\n- **Serviço**: Reativação e configuração do Bluetooth Support Service para início automático\n- **Módulo**: Troca do chip M.2 Wi-Fi/Bluetooth por modelo compatível (Intel AX200/AX210)\n- **Antena**: Reconexão dos cabos de antena internos + teste de sinal\n- **Energia**: Desabilitar gerenciamento de energia do módulo Bluetooth\n\nTeste completo de pareamento e estabilidade de conexão após o reparo.",
  "quandoCompensa": "Sempre — resolver Bluetooth custa R$ 80-300 e é essencial para uso de periféricos sem fio modernos. Até troca de módulo é barata.",
  "quandoNaoCompensa": "Quando o notebook é tão antigo que só suporta Bluetooth 2.0 e o adaptador USB 5.0 por R$ 30 resolve melhor.",
  "whatsappMessage": "Olá! O Bluetooth do meu notebook não está funcionando. Podem me ajudar?",
  "relatedPages": [
    {
      "to": "/problemas/pc-nao-conecta-wifi-curitiba",
      "label": "PC Não Conecta Wi-Fi"
    },
    {
      "to": "/problemas/teclado-nao-funciona-curitiba",
      "label": "Teclado Não Funciona"
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
  "conteudoExtra": "## Bluetooth no Notebook: Guia Completo\n\n### Versões de Bluetooth e Compatibilidade\n\n| Versão | Alcance | Velocidade | Áudio | Dispositivos simultâneos |\n|---|---|---|---|---|\n| BT 4.0 | 50m | 1 Mbps | SBC | 3 |\n| BT 4.2 | 50m | 1 Mbps | SBC | 5 |\n| BT 5.0 | 200m | 2 Mbps | SBC/AAC | 7 |\n| BT 5.2 | 200m | 2 Mbps | LC3 (LE Audio) | 10+ |\n| BT 5.3 | 200m | 2 Mbps | LC3 | 10+ |\n\n### Como Verificar se o Bluetooth Está Funcionando\n\n1. **Win+I** → Dispositivos → Bluetooth → Deve estar \"Ativado\"\n2. **Gerenciador de Dispositivos** → Bluetooth → Sem triângulo amarelo\n3. **services.msc** → Bluetooth Support Service → Status: Em execução\n\n### Solução Rápida: Reset do Bluetooth\n\n1. Abra **Gerenciador de Dispositivos**\n2. Expanda **Bluetooth**\n3. Clique com botão direito no módulo → **Desinstalar dispositivo**\n4. Marque \"Excluir driver\" → OK\n5. Reinicie o notebook\n6. O Windows reinstalará o driver automaticamente"
};
