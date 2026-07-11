import type { ProblemaPageData } from "./types";

export const problema: ProblemaPageData = {
  "slug": "impressora-cartucho-nao-reconhece-curitiba",
  "title": "Impressora Não Reconhece Cartucho ou Toner em Curitiba | Reparo",
  "metaDescription": "Impressora não reconhece cartucho ou toner? Chip incompatível, contato sujo, cartucho remanufaturado com defeito. Diagnóstico em Curitiba.",
  "h1": "Impressora Não Reconhece Cartucho ou Toner — Soluções em Curitiba",
  "categoria": "Problemas de Impressora",
  "intro": "Sua impressora mostra erro de \"cartucho não reconhecido\", \"toner inválido\" ou \"suprimento não compatível\"? Este problema explodiu nos últimos anos por causa da **guerra dos fabricantes contra cartuchos compatíveis e remanufaturados**.\\n\\n**O que está acontecendo:**\\nFabricantes como HP, Epson e Canon usam **chips com firmware atualizado** nos cartuchos originais. Quando você instala um cartucho compatível, a impressora pode rejeitá-lo — não porque é defeituoso, mas porque o chip não passa na validação do firmware.\\n\\n**Dados reais:**\\n- HP implementou \"Dynamic Security\" em 2016 — atualizações de firmware bloqueiam cartuchos de terceiros\\n- Epson usa chips com criptografia que muda a cada lote de cartuchos\\n- Canon tem sistema de detecção de nível que não funciona com chips genéricos\\n- A HP foi multada em R$ 50 milhões na Europa por bloquear cartuchos compatíveis (2023)\\n\\n**Custo de reparo:**\\n- Limpeza de contatos + reset: R$ 50-80\\n- Troca de chip do cartucho: R$ 30-60\\n- Downgrade de firmware: R$ 80-150\\n- Cartucho original (referência): R$ 60-200 dependendo do modelo",
  "sintomas": [
    {
      "titulo": "Erro 'Cartucho não reconhecido'",
      "desc": "Mensagem no painel ou no computador. Pode ser chip, contato sujo, firmware ou cartucho realmente defeituoso.",
      "gravidade": "Simples"
    },
    {
      "titulo": "Erro 'Suprimento não HP / não original'",
      "desc": "HP Dynamic Security bloqueando cartucho compatível. Firmware atualizado rejeita chips de terceiros.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Nível de tinta não detectado",
      "desc": "Impressora funciona mas mostra nível desconhecido. Comum com cartuchos recarregados — chip não reseta o contador.",
      "gravidade": "Simples"
    },
    {
      "titulo": "Erro após trocar cartucho/toner novo",
      "desc": "Cartucho novo (original) não reconhecido. Pode ser defeito de fábrica, contato oxidado ou proteção de transporte não removida.",
      "gravidade": "Simples"
    },
    {
      "titulo": "Impressora parou após atualização de firmware",
      "desc": "Fabricante enviou atualização que bloqueia cartuchos compatíveis que funcionavam antes. Muito comum com HP.",
      "gravidade": "Médio"
    }
  ],
  "causas": [
    {
      "titulo": "Firmware anti-compatível",
      "desc": "Fabricantes atualizam o firmware para rejeitar chips de cartuchos não-originais. A HP é a mais agressiva nessa prática.",
      "tipo": "software"
    },
    {
      "titulo": "Contatos elétricos sujos ou oxidados",
      "desc": "Os contatos dourados do cartucho e do slot da impressora acumulam tinta, poeira e oxidação. Perdem contato.",
      "tipo": "desgaste"
    },
    {
      "titulo": "Chip do cartucho defeituoso",
      "desc": "Chips de cartuchos compatíveis podem vir com defeito de fábrica ou programação incorreta para o modelo.",
      "tipo": "hardware"
    },
    {
      "titulo": "Proteção de transporte não removida",
      "desc": "Cartuchos novos têm fita adesiva, lacre ou trava de transporte. Se não remover tudo, a impressora não reconhece.",
      "tipo": "erro-humano"
    },
    {
      "titulo": "Cartucho incompatível com o modelo",
      "desc": "Cartuchos podem parecer iguais mas ter chips diferentes para modelos diferentes da mesma série.",
      "tipo": "erro-humano"
    }
  ],
  "cenarios": [
    {
      "nivel": "Simples",
      "desc": "Limpeza de contatos com álcool isopropílico + verificação de compatibilidade.",
      "tempo": "1 dia",
      "custo": "R$ 50 a R$ 100"
    },
    {
      "nivel": "Médio",
      "desc": "Troca de chip do cartucho ou downgrade de firmware para aceitar compatíveis.",
      "tempo": "1 a 3 dias",
      "custo": "R$ 80 a R$ 180"
    },
    {
      "nivel": "Complexo",
      "desc": "Reparo na placa lógica da impressora (conector de cartucho com defeito).",
      "tempo": "5 a 10 dias",
      "custo": "R$ 150 a R$ 350"
    }
  ],
  "riscos": [
    "Downgrade de firmware pode causar outros problemas (a HP tenta bloquear o downgrade)",
    "Cartuchos muito baratos podem vazar tinta e danificar o cabeçote",
    "Resetar chip manualmente pode invalidar a garantia do cartucho",
    "Forçar cartucho incompatível pode danificar o slot da impressora"
  ],
  "diagnostico": "**Diagnóstico de cartucho não reconhecido:**\\n\\n1. **Verificar compatibilidade** — modelo exato do cartucho vs modelo da impressora\\n2. **Inspecionar contatos** — sujos? Oxidados? Riscados?\\n3. **Testar com cartucho original** — para descartar problema na impressora\\n4. **Verificar firmware** — versão atual vs versão que bloqueou compatíveis\\n5. **Inspecionar slot** — pinos de contato da impressora limpos e alinhados?\\n\\n**Custo: R$ 50-80, abatido do serviço.**",
  "solucao": "**Soluções por causa:**\\n\\n### Contatos sujos\\nLimpeza com cotonete embebido em álcool isopropílico 99%. Tanto no cartucho quanto no slot da impressora. Secar completamente antes de reinstalar.\\n\\n### Firmware bloqueando compatível\\nEm HP: desativar \"HP Cartridge Policy\" e \"HP Cartridge Protection\" nas configurações (quando disponível). Downgrade de firmware via modo de serviço.\\n\\n### Chip incompatível\\nTroca do chip por versão compatível com o firmware atual. Chips custam R$ 10-30 e podem ser substituídos.\\n\\n### Cartucho defeituoso\\nSe for original: acionar garantia do fabricante. Se for compatível: trocar por outro do mesmo fornecedor (pode ser defeito de lote).",
  "quandoCompensa": "Sempre vale investigar antes de comprar cartucho original (que pode custar R$ 100-200). Muitas vezes é só limpeza de contato (R$ 50-80).",
  "quandoNaoCompensa": "Quando a impressora tem mais de 5 anos e o slot de cartucho está fisicamente danificado.",
  "whatsappMessage": "Olá! Minha impressora não reconhece o cartucho/toner. Podem diagnosticar?",
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
      "label": "Impressora Tinta Não Sai",
      "to": "/problemas/impressora-tinta-nao-sai-curitiba"
    },
    {
      "label": "Impressora Erro USB/Wi-Fi",
      "to": "/problemas/impressora-erro-conexao-usb-wifi-curitiba"
    },
    {
      "label": "Redes e Wi-Fi",
      "to": "/servicos/redes-wifi"
    }
  ],
  "conteudoExtra": "## A Guerra dos Cartuchos — Entenda\\n\\nFabricantes de impressoras vendem o equipamento barato e lucram com os cartuchos (modelo \"razor and blades\"). Por isso:\\n\\n1. **Cartuchos originais custam caro** — R$ 60-200 por cartucho\\n2. **Impressoras são baratas** — R$ 300-600 (às vezes o kit de cartuchos custa mais que a impressora)\\n3. **Fabricantes bloqueiam compatíveis** — firmware com DRM para forçar uso de originais\\n4. **Compatíveis são 50-70% mais baratos** — mas podem ser bloqueados\\n\\n## Dica: Desativar Atualizações Automáticas de Firmware\\n\\nSe você usa cartuchos compatíveis:\\n1. No painel da impressora: Configurações > Ferramentas > Atualizações\\n2. Desativar \"Atualização automática de firmware\"\\n3. Isso evita que uma atualização bloqueie seus cartuchos\\n\\n**ATENÇÃO:** Desativar atualizações significa perder correções de segurança. É uma escolha de custo-benefício.\\n\\n## Quanto Gasta uma Impressora por Mês?\\n\\n| Uso | Páginas/mês | Original | Compatível |\\n|-----|------------|----------|------------|\\n| Residencial leve | 50 | R$ 15-25 | R$ 5-10 |\\n| Home office | 200 | R$ 50-100 | R$ 20-40 |\\n| Escritório | 500 | R$ 120-250 | R$ 40-80 |\\n| Alto volume | 1000+ | R$ 200-500 | R$ 80-150 |"
};
