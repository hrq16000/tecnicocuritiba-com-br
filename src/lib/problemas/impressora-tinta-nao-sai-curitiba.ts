import type { ProblemaPageData } from "./types";

export const problema: ProblemaPageData = {
  "slug": "impressora-tinta-nao-sai-curitiba",
  "title": "Impressora Não Sai Tinta em Curitiba | Cabeçote Entupido | Reparo",
  "metaDescription": "Impressora jato de tinta não imprime? Cabeçote entupido, cartucho seco, tinta ressecada. Diagnóstico e reparo em Curitiba. HP, Epson, Canon.",
  "h1": "Impressora Não Sai Tinta — Cabeçote Entupido e Soluções em Curitiba",
  "categoria": "Problemas de Impressora",
  "intro": "Sua impressora jato de tinta imprime em branco, com falhas ou cores erradas? O problema quase sempre está no **cabeçote de impressão** — a peça que joga microgotas de tinta no papel.\\n\\n**Por que o cabeçote entope?**\\nA tinta à base de água ou pigmento **seca quando a impressora fica parada**. Os micro-bicos (nozzles) do cabeçote têm diâmetro de 20-30 micrômetros (mais fino que um fio de cabelo). Basta dias sem uso para começar a entupir.\\n\\n**Dados reais:**\\n- Impressoras Epson EcoTank (L-series): cabeçote embutido na impressora (não removível). Se entupir demais, pode exigir troca da impressora inteira\\n- Impressoras HP: cabeçote integrado ao cartucho (séries 664, 667) — trocar cartucho = trocar cabeçote\\n- Impressoras Canon: cabeçote removível em alguns modelos (QY6-xxxx) — pode ser limpo ou substituído\\n\\n**Custo de reparo:**\\n- Limpeza de cabeçote (manual + ultrassônica): R$ 80-180\\n- Troca de cabeçote (quando disponível): R$ 150-400\\n- Head cleaning profissional com solução específica: R$ 100-200\\n\\n**Prevenção:** Imprima pelo menos 1 página por semana. É o conselho mais importante para jato de tinta.",
  "sintomas": [
    {
      "titulo": "Imprime em branco",
      "desc": "Nenhuma tinta sai. Cabeçote completamente entupido ou cartucho vazio/não reconhecido.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Imprime com listras/falhas",
      "desc": "Linhas horizontais em branco no meio da impressão. Alguns bicos do cabeçote estão entupidos.",
      "gravidade": "Simples"
    },
    {
      "titulo": "Cores erradas ou misturadas",
      "desc": "Azul sai como verde, vermelho sai como laranja. Canais de cor do cabeçote contaminados entre si.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Tinta borra no papel",
      "desc": "Excesso de tinta por cabeçote parcialmente entupido — bicos abertos compensam os fechados ejetando mais.",
      "gravidade": "Simples"
    },
    {
      "titulo": "Teste de nozzle com muitas falhas",
      "desc": "A página de teste de bicos (nozzle check) mostra blocos com falhas extensas. Mais de 30% de falha = limpeza profunda necessária.",
      "gravidade": "Médio"
    }
  ],
  "causas": [
    {
      "titulo": "Impressora ficou parada por semanas/meses",
      "desc": "A causa nº1. Tinta seca nos micro-bicos. Impressoras Epson EcoTank são especialmente vulneráveis — o sistema pressurizado empurra tinta para o cabeçote que seca nos bicos.",
      "tipo": "desgaste"
    },
    {
      "titulo": "Tinta de má qualidade (genérica barata)",
      "desc": "Tintas sem controle de qualidade têm partículas que entopem os bicos. Economia de R$ 20 na tinta pode custar R$ 200+ no cabeçote.",
      "tipo": "erro-humano"
    },
    {
      "titulo": "Bolha de ar no sistema de tinta",
      "desc": "Em impressoras com tanque (EcoTank/MegaTank), bolhas de ar no tubo entre o tanque e o cabeçote impedem o fluxo de tinta.",
      "tipo": "hardware"
    },
    {
      "titulo": "Cabeçote com vida útil esgotada",
      "desc": "Após 20.000-50.000 páginas, os resistores térmicos do cabeçote degradam. Os bicos não aquecem o suficiente para ejetar a gota.",
      "tipo": "desgaste"
    },
    {
      "titulo": "Cartucho remanufaturado com defeito",
      "desc": "Cartuchos recarregados artesanalmente podem ter chip incompatível, tinta inadequada ou vedação ruim.",
      "tipo": "erro-humano"
    }
  ],
  "cenarios": [
    {
      "nivel": "Simples",
      "desc": "Limpeza de cabeçote via software + manual com cotonete e solução. Poucas falhas no nozzle check.",
      "tempo": "1 a 2 dias",
      "custo": "R$ 60 a R$ 120"
    },
    {
      "nivel": "Médio",
      "desc": "Limpeza ultrassônica do cabeçote (remoção + imersão em solução específica por 12-24h).",
      "tempo": "2 a 5 dias",
      "custo": "R$ 120 a R$ 250"
    },
    {
      "nivel": "Complexo",
      "desc": "Troca de cabeçote (se disponível) ou limpeza profunda com desmontagem completa do sistema de tinta.",
      "tempo": "5 a 10 dias",
      "custo": "R$ 200 a R$ 450"
    }
  ],
  "riscos": [
    "Muitas limpezas via software desperdiçam tinta e podem não resolver (bombeia tinta pelo cabeçote)",
    "Cabeçotes Epson EcoTank NÃO são removíveis — limpeza deve ser feita na própria impressora",
    "Usar álcool puro pode danificar o cabeçote — use solução específica ou água destilada",
    "Forçar tinta com seringa pode estourar os bicos do cabeçote"
  ],
  "diagnostico": "**Diagnóstico passo a passo:**\\n\\n1. **Nozzle check** (teste de bicos) — imprime padrão de teste para ver quais bicos estão entupidos\\n2. **Verificar nível de tinta** — tanque/cartucho pode estar vazio\\n3. **Verificar reconhecimento** — computador reconhece a impressora? Cartucho reconhecido?\\n4. **Histórico de uso** — quanto tempo ficou parada? Qual tinta usa?\\n5. **Limpeza de cabeçote (1x)** — via software. Se melhorar parcialmente, segunda limpeza. Se não melhorar nada, limpeza manual\\n\\n**Custo: R$ 50-80, abatido do serviço.**",
  "solucao": "**Métodos de limpeza que utilizamos:**\\n\\n### Nível 1 — Limpeza via Software\\nUsamos a ferramenta de limpeza do driver da impressora. Funciona em entupimentos leves (1-2 semanas parada).\\n\\n### Nível 2 — Limpeza Manual\\nRemoção do cabeçote (quando possível), imersão da base em solução de limpeza específica por 2-4 horas. Secagem e teste.\\n\\n### Nível 3 — Limpeza Ultrassônica\\nCabeçote imerso em cuba ultrassônica com solução aquecida a 40°C. Vibração ultrassônica dissolve tinta seca nos micro-bicos. 12-24 horas de imersão.\\n\\n### Nível 4 — Troca de Cabeçote\\nQuando a limpeza não resolve (cabeçote com resistores queimados ou bicos permanentemente obstruídos). Peça original ou compatível de qualidade.",
  "quandoCompensa": "Impressoras EcoTank/MegaTank (investimento alto no equipamento). Impressoras com menos de 3 anos. Modelos corporativos com cabeçote substituível.",
  "quandoNaoCompensa": "Impressoras jato de tinta básicas (R$ 300-500 novas) onde o custo de limpeza profunda se aproxima de 50% do valor. Modelos muito antigos sem peças.",
  "whatsappMessage": "Olá! Minha impressora não está saindo tinta. Preciso de limpeza de cabeçote.",
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
      "label": "Impressora Erro USB/Wi-Fi",
      "to": "/problemas/impressora-erro-conexao-usb-wifi-curitiba"
    },
    {
      "label": "Impressora Cartucho Não Reconhece",
      "to": "/problemas/impressora-cartucho-nao-reconhece-curitiba"
    },
    {
      "label": "Redes e Wi-Fi",
      "to": "/servicos/redes-wifi"
    }
  ],
  "conteudoExtra": "## Cabeçotes por Marca — Guia Rápido\\n\\n| Marca | Tipo de Cabeçote | Removível? | Limpeza | Troca |\\n|-------|-----------------|------------|---------|-------|\\n| Epson EcoTank (L) | Embutido (Micro Piezo) | ❌ | R$ 120-250 | Inviável |\\n| HP DeskJet (664/667) | Integrado ao cartucho | ✅ (trocar cartucho) | N/A | R$ 50-90 |\\n| HP OfficeJet Pro | Cabeçote separado | ✅ | R$ 100-200 | R$ 200-400 |\\n| Canon PIXMA | Cabeçote removível (QY6) | ✅ | R$ 100-180 | R$ 150-350 |\\n| Brother DCP | Cabeçote embutido | ❌ | R$ 120-200 | Inviável |\\n\\n## A Regra de Ouro: Imprima 1x por Semana\\n\\nEste conselho vale mais que qualquer reparo. Uma simples página colorida por semana mantém todos os bicos do cabeçote desobstruídos.\\n\\nSe você viaja ou não usa por mais de 2 semanas:\\n1. Imprima uma página de teste antes de sair\\n2. Desligue a impressora pelo botão (não puxe da tomada) — ela estaciona o cabeçote na posição de proteção\\n3. Ao voltar, imprima o nozzle check antes de qualquer documento importante"
};
