import type { ProblemaPageData } from "./types";

export const problema: ProblemaPageData = {
  "slug": "notebook-esquentando-desligando-curitiba",
  "title": "Notebook Esquentando e Desligando Sozinho em Curitiba | Técnico Especialista",
  "metaDescription": "Notebook esquentando demais e desligando sozinho? Técnico em Curitiba resolve superaquecimento com limpeza, troca de pasta térmica e reparo de cooler. Atendimento rápido.",
  "h1": "Notebook Esquentando e Desligando — Diagnóstico e Reparo em Curitiba",
  "categoria": "Hardware — Térmico",
  "intro": "Quando o notebook começa a esquentar excessivamente e desliga sozinho sem aviso, isso é um mecanismo de proteção do processador chamado thermal shutdown. O processador atinge temperaturas acima de 95-100°C e o sistema desliga para evitar danos permanentes ao chip.\n\nEsse problema é extremamente comum em Curitiba — apesar do clima mais ameno, a poeira acumulada nas saídas de ar e a pasta térmica ressecada são as principais causas. Notebooks com mais de 2 anos sem manutenção preventiva quase sempre apresentam esse sintoma.\n\nIgnorar o superaquecimento pode causar danos irreversíveis ao processador, GPU e placa-mãe. A solda BGA que conecta o chip à placa pode trincar com ciclos repetidos de calor extremo, transformando um problema de R$ 150 em um de R$ 800+.",
  "sintomas": [
    {
      "titulo": "Desliga sozinho durante uso intenso",
      "desc": "O notebook desliga abruptamente ao rodar jogos, editar vídeos ou abrir muitas abas. É o thermal shutdown protegendo o processador.",
      "gravidade": "Alta"
    },
    {
      "titulo": "Base do notebook muito quente",
      "desc": "A parte inferior fica impossível de usar no colo. Temperaturas acima de 50°C na superfície indicam 90°C+ internamente.",
      "gravidade": "Média-Alta"
    },
    {
      "titulo": "Cooler fazendo barulho alto constantemente",
      "desc": "A ventoinha gira na velocidade máxima o tempo todo, tentando compensar o calor excessivo. Pode indicar pasta térmica seca ou saída obstruída.",
      "gravidade": "Média"
    },
    {
      "titulo": "Lentidão progressiva antes de desligar",
      "desc": "O processador reduz a velocidade (throttling) para tentar baixar a temperatura antes do desligamento forçado.",
      "gravidade": "Média"
    },
    {
      "titulo": "Tela congela e depois desliga",
      "desc": "A GPU superaquece primeiro, causando artefatos visuais ou congelamento, seguido pelo desligamento térmico.",
      "gravidade": "Alta"
    },
    {
      "titulo": "Notebook não liga após desligar por calor",
      "desc": "Proteção térmica impede a reinicialização até o processador esfriar. Se não liga nem depois de frio, pode haver dano na placa.",
      "gravidade": "Crítica"
    }
  ],
  "causas": [
    {
      "titulo": "Pasta térmica ressecada",
      "desc": "A pasta térmica entre o processador e o dissipador perde eficiência após 2-3 anos. Em vez de transferir calor, ela isola — fazendo a temperatura subir 20-30°C acima do normal.",
      "tipo": "desgaste"
    },
    {
      "titulo": "Saída de ar obstruída por poeira",
      "desc": "Poeira, pelos de animais e fibras acumulam na grade do dissipador, bloqueando o fluxo de ar. É a causa mais comum e mais fácil de resolver.",
      "tipo": "desgaste"
    },
    {
      "titulo": "Cooler com defeito ou travado",
      "desc": "O motor da ventoinha desgasta com o tempo, gira mais devagar ou trava completamente. Sem ventilação, a temperatura dispara em minutos.",
      "tipo": "hardware"
    },
    {
      "titulo": "Uso em superfícies que bloqueiam ventilação",
      "desc": "Usar o notebook na cama, almofada ou sofá bloqueia as entradas de ar inferiores. Isso impede a circulação e causa superaquecimento mesmo em notebooks novos.",
      "tipo": "erro-humano"
    },
    {
      "titulo": "Componentes exigindo mais do que o sistema térmico suporta",
      "desc": "Jogos pesados ou softwares de renderização forçam CPU e GPU ao máximo. Se o sistema de refrigeração já está comprometido, o desligamento é inevitável.",
      "tipo": "hardware"
    }
  ],
  "cenarios": [
    {
      "nivel": "Simples",
      "desc": "Limpeza interna + troca de pasta térmica. Resolve 70% dos casos de superaquecimento.",
      "tempo": "1-2 horas",
      "custo": "R$ 120–200"
    },
    {
      "nivel": "Médio",
      "desc": "Troca do cooler/ventoinha + limpeza completa + pasta térmica premium.",
      "tempo": "2-4 horas",
      "custo": "R$ 200–400"
    },
    {
      "nivel": "Complexo",
      "desc": "Reparo de solda BGA na GPU/CPU danificada pelo calor + sistema térmico completo.",
      "tempo": "3-7 dias",
      "custo": "R$ 400–900"
    }
  ],
  "riscos": [
    "Dano permanente ao processador por ciclos repetidos de superaquecimento",
    "Solda BGA da GPU pode trincar, causando artefatos visuais permanentes ou tela preta",
    "Bateria pode inchar e deformar com calor excessivo — risco de incêndio",
    "Componentes da placa-mãe podem queimar (VRMs, capacitores) com calor prolongado",
    "Perda de dados se o desligamento abrupto corromper o sistema de arquivos do HD/SSD",
    "Tela pode apresentar manchas amarelas permanentes por calor irradiado da GPU"
  ],
  "diagnostico": "Diagnóstico térmico completo:\n\n1. Medição de temperatura com sensores (CPU, GPU, SSD, ambiente)\n2. Teste de estresse controlado (Prime95 + FurMark) com monitoramento em tempo real\n3. Inspeção visual do dissipador, pasta térmica e ventoinha\n4. Verificação de RPM do cooler e curva de velocidade\n5. Análise do fluxo de ar (entrada e saída)\n6. Teste de bateria para verificar inchaço por calor\n\nCusto: R$ 80 (incorporado se aprovar o serviço).",
  "solucao": "Solução conforme a gravidade:\n\n- **Pasta térmica**: Remoção completa da pasta antiga + aplicação de pasta premium (Thermal Grizzly Kryonaut ou Arctic MX-6)\n- **Limpeza**: Desmontagem completa, limpeza do dissipador com ar comprimido e álcool isopropílico\n- **Cooler**: Troca da ventoinha por modelo original ou compatível\n- **Pad térmico**: Substituição dos thermal pads da memória VRAM e VRMs\n- **Base refrigerada**: Recomendação de base com ventilação para uso intenso\n\nTeste de estresse por 30+ minutos após o reparo para garantir temperaturas saudáveis (< 85°C sob carga).",
  "quandoCompensa": "Quase sempre — limpeza térmica custa R$ 120-200 e pode dar mais 2-3 anos de vida ao notebook. É a manutenção preventiva mais importante.",
  "quandoNaoCompensa": "Quando a GPU já teve solda BGA danificada repetidamente e o notebook tem mais de 7 anos. Nesse caso o reparo pode custar mais que um notebook usado equivalente.",
  "whatsappMessage": "Olá! Meu notebook está esquentando muito e desligando sozinho. Podem me ajudar?",
  "relatedPages": [
    {
      "to": "/problemas/notebook-superaquecendo-curitiba",
      "label": "Notebook Superaquecendo"
    },
    {
      "to": "/problemas/pc-reiniciando-sozinho-curitiba",
      "label": "PC Reiniciando Sozinho"
    },
    {
      "to": "/problemas/computador-lento-curitiba",
      "label": "Computador Lento"
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
  "conteudoExtra": "## Superaquecimento de Notebook: Guia Completo\n\n### Temperaturas Normais vs Perigosas\n\n| Componente | Idle (repouso) | Carga leve | Carga pesada | Crítico |\n|---|---|---|---|---|\n| CPU | 35-50°C | 50-70°C | 70-85°C | > 95°C |\n| GPU | 30-45°C | 45-65°C | 65-85°C | > 95°C |\n| SSD | 25-40°C | 35-50°C | 45-60°C | > 70°C |\n| Superfície | 25-35°C | 35-42°C | 42-50°C | > 55°C |\n\n### Como Verificar a Temperatura\n\n1. **HWMonitor** (gratuito) — mostra temperatura de todos os sensores\n2. **Core Temp** — focado em CPU, mostra throttling\n3. **GPU-Z** — monitora temperatura da placa de vídeo\n\n### Dicas para Reduzir o Calor\n\n- Use o notebook em superfície plana e rígida (mesa)\n- Invista em uma base refrigerada (R$ 60-150)\n- Limpe as saídas de ar com ar comprimido a cada 6 meses\n- Faça manutenção térmica profissional a cada 2 anos\n- Evite usar na cama ou no colo por longos períodos\n\n### Pasta Térmica: Qual Escolher?\n\n| Marca | Condutividade | Duração | Preço |\n|---|---|---|---|\n| Arctic MX-6 | 8.5 W/mK | 3-4 anos | R$ 30-50 |\n| Thermal Grizzly Kryonaut | 12.5 W/mK | 2-3 anos | R$ 60-100 |\n| Noctua NT-H2 | 9.0 W/mK | 3-5 anos | R$ 50-80 |\n| Pasta genérica (branca) | 1-3 W/mK | 1 ano | R$ 5-15 |"
};
