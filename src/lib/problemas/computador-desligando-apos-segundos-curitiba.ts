import type { ProblemaPageData } from "./types";

export const problema: ProblemaPageData = {
  "slug": "computador-desligando-apos-segundos-curitiba",
  "title": "Computador Desligando Após Poucos Segundos em Curitiba | Diagnóstico",
  "metaDescription": "Computador liga e desliga sozinho após poucos segundos? Técnico em Curitiba diagnostica problemas de fonte, processador, placa-mãe e superaquecimento. Atendimento rápido.",
  "h1": "Computador Desligando Após Poucos Segundos — Diagnóstico em Curitiba",
  "categoria": "Hardware — Energia",
  "intro": "O computador liga, as ventoinhas giram por 3 a 10 segundos e depois desliga sozinho? Esse comportamento indica um problema sério de hardware que impede o sistema de completar o POST (Power-On Self-Test). O computador detecta uma condição insegura e se desliga para proteger os componentes.\n\nAs causas mais comuns são: proteção térmica instantânea (cooler de CPU desencaixado ou sem pasta térmica), fonte de alimentação defeituosa, curto-circuito na placa-mãe ou memória RAM incompatível/defeituosa. Em casos raros, pode ser o processador com defeito.\n\nEsse é um dos problemas mais assustadores para o usuário, mas na maioria dos casos a causa é simples e o reparo é acessível. Em Curitiba, diagnosticamos com método de eliminação: testamos cada componente isoladamente para encontrar o culpado.",
  "sintomas": [
    {
      "titulo": "Liga por 3-5 segundos e desliga",
      "desc": "Ventoinhas giram brevemente e tudo apaga. Padrão clássico de proteção térmica — cooler de CPU não detectado ou não funcionando.",
      "gravidade": "Alta"
    },
    {
      "titulo": "Liga e desliga em loop infinito",
      "desc": "O PC tenta ligar, desliga, liga de novo, desliga... sem parar. Indica fonte com problema ou curto-circuito na placa-mãe.",
      "gravidade": "Alta"
    },
    {
      "titulo": "Liga por 10-30 segundos sem imagem e desliga",
      "desc": "Mais tempo ligado sugere que o POST progride parcialmente. Pode ser RAM defeituosa, GPU com problema ou erro de BIOS.",
      "gravidade": "Média-Alta"
    },
    {
      "titulo": "Cheiro de queimado ao ligar",
      "desc": "Odor de componente eletrônico queimado. DESLIGUE IMEDIATAMENTE. Pode ser capacitor, VRM da placa-mãe ou fonte com curto.",
      "gravidade": "Crítica"
    },
    {
      "titulo": "LED da placa-mãe acende mas não liga",
      "desc": "O LED standby da placa-mãe acende (indica que recebe energia) mas apertar o botão de power não faz nada ou liga por um instante.",
      "gravidade": "Média-Alta"
    },
    {
      "titulo": "Funciona na segunda ou terceira tentativa",
      "desc": "Desliga nas primeiras tentativas mas eventualmente liga. Indica capacitores desgastados na fonte ou placa-mãe com mau contato.",
      "gravidade": "Média"
    }
  ],
  "causas": [
    {
      "titulo": "Cooler de CPU desencaixado ou sem pasta térmica",
      "desc": "A proteção térmica detecta que a CPU não está sendo refrigerada e desliga em segundos. Acontece após manutenção onde o cooler foi removido e recolocado incorretamente.",
      "tipo": "erro-humano"
    },
    {
      "titulo": "Fonte de alimentação defeituosa",
      "desc": "Fonte com capacitores estufados, trilha queimada ou ventilação entupida. Não consegue manter a alimentação estável e o sistema desliga.",
      "tipo": "hardware"
    },
    {
      "titulo": "Curto-circuito na placa-mãe",
      "desc": "Parafuso extra fazendo contato, standoff em posição errada ou trilha da placa-mãe com curto. O sistema de proteção desliga imediatamente.",
      "tipo": "hardware"
    },
    {
      "titulo": "Memória RAM incompatível ou mal encaixada",
      "desc": "RAM não suportada pela placa-mãe ou encaixada parcialmente. O POST falha e o sistema desliga após tentativas.",
      "tipo": "erro-humano"
    },
    {
      "titulo": "Processador com defeito ou incompatível",
      "desc": "CPU queimada por pico de tensão ou CPU de geração não suportada pela BIOS. Raro mas possível.",
      "tipo": "hardware"
    },
    {
      "titulo": "Botão de power com mau contato",
      "desc": "O botão liga/desliga do gabinete pode ter fio partido ou conector solto, enviando sinal intermitente.",
      "tipo": "desgaste"
    }
  ],
  "cenarios": [
    {
      "nivel": "Simples",
      "desc": "Reencaixe do cooler + nova pasta térmica + reencaixe de RAM. Resolve 40% dos casos.",
      "tempo": "30-60 min",
      "custo": "R$ 80–150"
    },
    {
      "nivel": "Médio",
      "desc": "Troca de fonte de alimentação + verificação de curto-circuito + teste de componentes.",
      "tempo": "1-3 horas",
      "custo": "R$ 200–450"
    },
    {
      "nivel": "Complexo",
      "desc": "Diagnóstico de placa-mãe com curto + reparo ou troca + verificação de todos os componentes.",
      "tempo": "1-5 dias",
      "custo": "R$ 350–900"
    }
  ],
  "riscos": [
    "Continuar tentando ligar com curto-circuito pode queimar mais componentes",
    "Cheiro de queimado indica componente já danificado — desligar da tomada imediatamente",
    "Fonte defeituosa pode enviar tensão errada e queimar placa-mãe, RAM e GPU",
    "Ligar sem cooler de CPU pode danificar o processador em segundos",
    "Ignorar loop de boot pode desgastar a fonte e piorar o problema",
    "Trocar fonte por modelo muito barato pode causar o mesmo problema em semanas"
  ],
  "diagnostico": "Diagnóstico de desligamento precoce:\n\n1. Verificação visual de componentes (queimados, estufados, mau contato)\n2. Teste de fonte com multímetro (voltagens e estabilidade)\n3. Teste bare-bones (placa + CPU + 1 pente de RAM — mínimo para POST)\n4. Verificação de cooler de CPU (encaixe, pasta térmica, rotação)\n5. Teste individual de cada pente de RAM\n6. Verificação de curto-circuito (standoffs, parafusos, gabinete)\n7. Teste com fonte alternativa\n\nCusto: R$ 99,99 (incorporado se aprovar o serviço).",
  "solucao": "Solução conforme a causa:\n\n- **Cooler**: Reencaixe correto + nova pasta térmica + verificação de rotação\n- **Fonte**: Troca por fonte 80 Plus certificada com potência adequada\n- **Curto**: Remoção da causa do curto (parafuso, standoff, trilha) + teste de isolamento\n- **RAM**: Reencaixe ou troca por módulo compatível confirmado no QVL da placa-mãe\n- **Processador**: Teste com outro CPU compatível + verificação de socket\n- **Botão**: Reparo ou troca do cabo do botão power\n\nTeste de estabilidade por 30+ minutos após o reparo para garantir que não desliga.",
  "quandoCompensa": "Na maioria dos casos — reencaixe de cooler ou troca de fonte custa R$ 80-400. O restante dos componentes geralmente está intacto.",
  "quandoNaoCompensa": "Quando placa-mãe e processador estão queimados e o PC é muito antigo — custo de peças equivale a um PC usado mais novo.",
  "whatsappMessage": "Olá! Meu computador liga e desliga sozinho após poucos segundos. Podem me ajudar?",
  "relatedPages": [
    {
      "to": "/problemas/computador-nao-liga-curitiba",
      "label": "Computador Não Liga"
    },
    {
      "to": "/problemas/pc-reiniciando-sozinho-curitiba",
      "label": "PC Reiniciando Sozinho"
    },
    {
      "to": "/problemas/fonte-queimada-curitiba",
      "label": "Fonte Queimada"
    },
    {
      "to": "/problemas/pc-sem-imagem-curitiba",
      "label": "PC Sem Imagem"
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
  "conteudoExtra": "## PC Desligando Sozinho: Guia de Diagnóstico\n\n### Tempo Ligado vs Causa Provável\n\n| Tempo | Causa Mais Provável |\n|---|---|\n| 0-3 segundos | Curto-circuito ou proteção da fonte |\n| 3-5 segundos | Cooler de CPU não detectado |\n| 5-15 segundos | RAM defeituosa ou incompatível |\n| 15-60 segundos | Superaquecimento (sem pasta térmica) |\n| Minutos | Fonte subdimensionada sob carga |\n| Aleatório | Capacitor estufado / mau contato |\n\n### Teste Bare-Bones (Diagnóstico por Eliminação)\n\n1. Remova TUDO do gabinete: GPU, HDs, SSDs, ventoinhas extras\n2. Deixe apenas: placa-mãe + CPU + cooler + 1 pente de RAM\n3. Conecte a fonte e tente ligar\n4. Se funcionar: adicione um componente por vez até encontrar o culpado\n5. Se não funcionar: problema é na placa-mãe, CPU, RAM ou fonte\n\n### Sinais Visuais de Problemas\n\n| Sinal | Componente | Ação |\n|---|---|---|\n| Capacitor estufado (topo abaulado) | Placa-mãe/Fonte | Trocar componente |\n| Marca de queimado na placa | Placa-mãe | Avaliar reparo |\n| Pinos tortos no socket | Processador | Endireitar ou trocar |\n| Conector derretido | Fonte/GPU | Trocar imediatamente |"
};
