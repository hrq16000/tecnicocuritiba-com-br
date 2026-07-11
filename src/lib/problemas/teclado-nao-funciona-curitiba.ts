import type { ProblemaPageData } from "./types";

export const problema: ProblemaPageData = {
  "slug": "teclado-nao-funciona-curitiba",
  "title": "Teclado Não Funciona em Curitiba — Diagnóstico e Reparo",
  "metaDescription": "Teclado do notebook ou PC não funciona em Curitiba? Diagnóstico de teclas travadas, líquido derramado, cabo flat e driver. Atendimento rápido.",
  "h1": "Teclado Não Funciona — Diagnóstico e Reparo em Curitiba",
  "categoria": "Periféricos — Entrada",
  "intro": "Teclado parou de funcionar? Seja do notebook ou do desktop, um teclado com defeito paralisa completamente o trabalho. As causas vão desde sujeira acumulada sob as teclas até líquido derramado que causou curto-circuito.\n\nNo caso de notebooks, o problema pode ser ainda mais sério: o teclado está conectado à placa-mãe por um cabo flat frágil que pode romper, e líquidos derramados podem danificar componentes internos.\n\nEm Curitiba, fazemos diagnóstico para identificar a causa exata — e só então propomos o reparo mais adequado, seja limpeza, troca de teclado ou reparo de cabo.",
  "sintomas": [
    {
      "titulo": "Nenhuma tecla funciona",
      "desc": "Teclado completamente morto — pode ser cabo, USB, driver ou dano físico.",
      "gravidade": "Alta"
    },
    {
      "titulo": "Algumas teclas não funcionam",
      "desc": "Sujeira sob as teclas, membrana danificada ou teclas específicas com defeito.",
      "gravidade": "Média"
    },
    {
      "titulo": "Teclado digita caracteres errados",
      "desc": "Layout trocado (ABNT2 vs Internacional), driver corrompido ou tecla grudada.",
      "gravidade": "Baixa"
    },
    {
      "titulo": "Teclas travadas ou repetindo",
      "desc": "Sujeira, líquido seco ou membrana colando — tecla fica 'pressionada' sozinha.",
      "gravidade": "Média"
    },
    {
      "titulo": "Teclado funciona às vezes",
      "desc": "Mau contato no cabo flat (notebook) ou porta USB intermitente (desktop).",
      "gravidade": "Alta"
    },
    {
      "titulo": "Líquido foi derramado no teclado",
      "desc": "URGENTE — desligue imediatamente e vire de cabeça para baixo.",
      "gravidade": "Crítica"
    }
  ],
  "causas": [
    {
      "titulo": "Líquido derramado",
      "desc": "Café, água, refrigerante — o líquido penetra e causa curto-circuito ou oxidação.",
      "tipo": "erro-humano"
    },
    {
      "titulo": "Cabo flat desconectado (notebook)",
      "desc": "O cabo que liga o teclado à placa-mãe se soltou ou rompeu.",
      "tipo": "hardware"
    },
    {
      "titulo": "Sujeira acumulada",
      "desc": "Migalhas, pelos, poeira acumulam sob as teclas e impedem o contato.",
      "tipo": "desgaste"
    },
    {
      "titulo": "Driver corrompido ou ausente",
      "desc": "Após atualização do Windows, o driver do teclado pode falhar.",
      "tipo": "software"
    },
    {
      "titulo": "Porta USB com defeito (desktop)",
      "desc": "A porta USB onde o teclado está conectado não funciona mais.",
      "tipo": "hardware"
    },
    {
      "titulo": "Membrana desgastada",
      "desc": "A membrana de contato sob as teclas perde condutividade com o uso.",
      "tipo": "desgaste"
    }
  ],
  "cenarios": [
    {
      "nivel": "Simples",
      "desc": "Reinstalar driver, trocar porta USB ou reconectar cabo flat.",
      "tempo": "30min a 1h",
      "custo": "R$ 99,99 a R$ 150"
    },
    {
      "nivel": "Médio",
      "desc": "Limpeza profunda do teclado ou troca de teclado de notebook.",
      "tempo": "1h a 3h",
      "custo": "R$ 150 a R$ 400"
    },
    {
      "nivel": "Complexo",
      "desc": "Reparo de dano por líquido na placa-mãe do notebook.",
      "tempo": "2 a 7 dias",
      "custo": "R$ 300 a R$ 800"
    }
  ],
  "riscos": [
    "Líquido derramado pode escorrer para a placa-mãe e causar dano permanente em minutos",
    "Tentar abrir teclado de notebook sem experiência pode romper o cabo flat",
    "Usar secador de cabelo para secar líquido pode empurrar umidade para dentro do notebook",
    "Ignorar teclas grudando pode causar digitação indesejada (senhas, emails, documentos)",
    "Teclado USB barato com defeito pode causar curto na porta USB do PC"
  ],
  "diagnostico": "Diagnóstico de teclado:\n\n1. Teste com teclado externo USB (para isolar se é teclado ou sistema)\n2. Verificação de driver e layout de teclado no Windows\n3. Inspeção visual de dano por líquido ou sujeira\n4. Teste de cabo flat (notebook) — reencaixe e verificação de continuidade\n5. Teste de portas USB (desktop)\n6. Teste individual de teclas com software de diagnóstico\n\nCusto: R$ 99,99 (incorporado se aprovar o serviço).",
  "solucao": "Solução por causa:\n\n- **Líquido**: Desmontagem urgente, limpeza com álcool isopropílico, secagem\n- **Cabo flat**: Reencaixe ou substituição do cabo\n- **Sujeira**: Desmontagem e limpeza profunda tecla por tecla\n- **Driver**: Reinstalação do driver correto para o modelo\n- **Teclado danificado**: Troca por teclado compatível (notebook) ou novo (desktop)\n\nTeste completo de todas as teclas após o reparo.",
  "quandoCompensa": "Na maioria dos casos — troca de teclado de notebook custa R$ 150-400, muito menos que um notebook novo. Limpeza custa ainda menos.",
  "quandoNaoCompensa": "Quando o líquido já danificou a placa-mãe do notebook e o reparo total ultrapassa 50% do valor do equipamento.",
  "whatsappMessage": "Olá! O teclado do meu computador/notebook parou de funcionar. Podem me ajudar?",
  "relatedPages": [
    {
      "to": "/problemas/notebook-com-tela-quebrada-curitiba",
      "label": "Tela Quebrada"
    },
    {
      "to": "/problemas/notebook-nao-carrega-curitiba",
      "label": "Notebook Não Carrega"
    },
    {
      "to": "/servicos/conserto-pc-notebook",
      "label": "Conserto de Notebook"
    },
    {
      "to": "/atendimento-domicilio",
      "label": "Atendimento em Domicílio"
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
  "conteudoExtra": "## O Que Fazer Quando Derramar Líquido no Notebook\n\n### Ação Imediata (Primeiros 30 Segundos)\n\n1. **DESLIGUE imediatamente** — Segure o botão de energia por 5 segundos\n2. **Desconecte o carregador** — Remova da tomada\n3. **Vire de cabeça para baixo** — Apoie aberto em formato de \"V invertido\"\n4. **NÃO use secador** — Pode empurrar líquido para dentro\n5. **NÃO ligue de novo** — Espere pelo menos 48h ou leve ao técnico\n\n### Líquidos: Do Menos ao Mais Perigoso\n\n| Líquido | Perigo | Por Quê |\n|---|---|---|\n| Água | Médio | Pode causar curto, mas não corrói |\n| Café sem açúcar | Médio-Alto | Resíduos podem grudar componentes |\n| Café com açúcar | Alto | Açúcar corrói e gruda |\n| Refrigerante | Muito Alto | Ácido + açúcar = corrosão rápida |\n| Cerveja | Muito Alto | Açúcares + oxidação |\n\n### Troca de Teclado de Notebook: Como Funciona\n\n1. Identificamos o modelo exato (part number)\n2. Encomendamos teclado compatível\n3. Desmontamos o notebook com cuidado\n4. Desconectamos o cabo flat do teclado antigo\n5. Conectamos o novo e testamos todas as teclas\n6. Remontamos o notebook\n\nTempo total: 1-3 horas (se a peça estiver disponível)."
};
