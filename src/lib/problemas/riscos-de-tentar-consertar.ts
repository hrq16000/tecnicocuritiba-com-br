import type { ProblemaPageData } from "./types";

export const problema: ProblemaPageData = {
  "slug": "riscos-de-tentar-consertar",
  "title": "Riscos de Tentar Consertar Sozinho | Guia",
  "metaDescription": "Os riscos de tentar consertar computador, notebook ou TV sozinho. Por que o diagnóstico profissional evita prejuízo.",
  "h1": "Riscos de Tentar Consertar Sozinho — Por Que Evitar",
  "categoria": "Buscas Educativas",
  "intro": "Tutoriais do YouTube fazem parecer simples. Mas consertar equipamentos eletrônicos sem conhecimento técnico real é arriscado — e frequentemente sai mais caro que chamar um profissional desde o início. Nesta página, explicamos os riscos reais com exemplos do nosso dia a dia.",
  "sintomas": [
    {
      "titulo": "Tentou e piorou",
      "desc": "A maioria dos casos que recebemos de 'tentei consertar' viram reparos mais caros.",
      "gravidade": "N/A"
    }
  ],
  "causas": [
    {
      "titulo": "Falta de conhecimento técnico",
      "desc": "YouTube mostra o procedimento mas não ensina diagnóstico.",
      "tipo": "erro-humano"
    },
    {
      "titulo": "Falta de ferramentas adequadas",
      "desc": "Chave errada, falta de antiestática, sem multímetro.",
      "tipo": "erro-humano"
    },
    {
      "titulo": "Diagnóstico errado",
      "desc": "Achar que é a fonte quando é a placa, trocar peça errada.",
      "tipo": "erro-humano"
    }
  ],
  "cenarios": [
    {
      "nivel": "Simples",
      "desc": "Tentou e não piorou — técnico resolve normalmente.",
      "tempo": "Normal",
      "custo": "Normal"
    },
    {
      "nivel": "Médio",
      "desc": "Tentou e causou dano adicional.",
      "tempo": "+1 a 2 dias",
      "custo": "+30-50% do reparo original"
    },
    {
      "nivel": "Complexo",
      "desc": "Tentou e inutilizou o equipamento.",
      "tempo": "N/A",
      "custo": "Perda total"
    }
  ],
  "riscos": [
    "Descarga eletrostática queima componentes invisivelmente",
    "Forçar peças danifica conectores",
    "Trocar peça errada não resolve e gasta dinheiro",
    "Perder garantia ao abrir sem autorização",
    "Choque elétrico (especialmente em TVs e monitores)"
  ],
  "diagnostico": "Deixe o diagnóstico com quem tem conhecimento e ferramentas. Custo: R$ 99,99 vs custo de uma tentativa errada: R$ centenas.",
  "solucao": "Diagnóstico profissional primeiro. Sempre.",
  "quandoCompensa": "Verificações básicas (cabo, tomada, reiniciar) são seguras. Abrir equipamento, não.",
  "quandoNaoCompensa": "N/A",
  "whatsappMessage": "Olá! Tentei consertar e piorou. Podem me ajudar?",
  "relatedPages": [
    {
      "label": "Como Funciona",
      "to": "/como-funciona"
    },
    {
      "label": "Preços e Políticas",
      "to": "/precos-e-politicas"
    },
    {
      "label": "Diagnóstico Técnico",
      "to": "/diagnostico-tecnico"
    },
    {
      "label": "Diagnóstico Técnico",
      "to": "/diagnostico-tecnico"
    },
    {
      "label": "Quando Não Compensa",
      "to": "/quando-nao-compensa"
    },
    {
      "label": "Erros de Upgrade",
      "to": "/problemas/erros-comuns-em-upgrade"
    },
    {
      "label": "Upgrade Deu Problema",
      "to": "/problemas/upgrade-deu-problema"
    },
    {
      "label": "O Que Fazer PC Não Liga",
      "to": "/problemas/o-que-fazer-computador-nao-liga"
    }
  ],
  "conteudoExtra": "### Casos Reais do Nosso Dia a Dia\n\n- Cliente trocou RAM por achismo → queimou o slot → reparo de placa R$ 400\n- Cliente tentou trocar tela do notebook → rompeu flex → custo dobrou\n- Cliente usou secador no notebook molhado → empurrou líquido para placa → perda total\n- Cliente trocou fonte sem testar → fonte errada queimou placa-mãe\n\nO diagnóstico profissional custa R$ 99,99. Qualquer uma dessas tentativas custou mais.\n\n### Os 10 Riscos Reais (com Exemplos de Curitiba)\n\n**1. Descarga Eletrostática (ESD)**\nVocê não sente. Não vê. Mas a descarga eletrostática do seu corpo (pode chegar a 25.000 volts) queima chips e transistores invisíveis. O dano só aparece depois — intermitência, travamentos, perda total. Prevenção: pulseira antiestática (que quase ninguém tem em casa).\n\n**2. Forçar Componentes**\n\"Se não encaixou, força mais.\" Essa mentalidade quebra slots de RAM, conectores M.2, flexs de notebook e portas USB. Um slot de RAM quebrado = reparo de placa-mãe (R$ 350+).\n\n**3. Diagnóstico Errado = Dinheiro Jogado Fora**\n\"O fórum disse que é a fonte.\" Você compra fonte nova, instala, e o problema continua — era a placa-mãe. Agora tem uma fonte que não precisava e ainda precisa do diagnóstico.\n\n**4. Perda de Garantia**\nAbrir notebook ou desktop ainda na garantia sem autorização do fabricante anula a cobertura. Selos de garantia são verificados.\n\n**5. Choque Elétrico**\nTVs e monitores têm capacitores que armazenam carga LETAL mesmo desligados. Não é exagero — é perigo real. Nunca abra uma TV sem conhecimento.\n\n**6. Perda Total de Dados**\n\"Vou formatar para resolver.\" Sem backup, formatou e perdeu 10 anos de fotos, documentos e trabalhos. Irrecuperável na maioria dos casos.\n\n**7. Curto Acidental**\nChave de fenda que escorrega e risca trilha na placa-mãe. Parafuso que cai dentro do gabinete e faz ponte. Dano que pode ser permanente.\n\n**8. Dano Térmico**\nSecador de cabelo em notebook molhado. Soprador de ar quente em placa sem experiência. Aquecimento excessivo causa mais dano que resolve.\n\n**9. Componente Incorreto**\nPasta térmica condutiva (prata) que vaza para os pinos do processador. SSD NVMe em slot M.2 SATA. RAM DDR4 forçada em slot DDR3.\n\n**10. Transformar Problema Simples em Complexo**\nUm problema de R$ 99,99 (cabo solto, configuração) vira um de R$ 500+ (componente danificado durante a tentativa). Vemos isso semanalmente.\n\n### O Que Você PODE Fazer com Segurança\n\nNem tudo é proibido. Estas verificações são seguras para qualquer pessoa:\n\n✅ Verificar cabos e tomadas\n✅ Reiniciar o equipamento\n✅ Desconectar periféricos USB\n✅ Verificar se o monitor está ligado\n✅ Limpar a parte externa com pano seco\n✅ Verificar espaço em disco\n✅ Fechar programas no Gerenciador de Tarefas\n\n❌ NÃO faça sem experiência:\n❌ Abrir gabinete ou notebook\n❌ Trocar componentes internos\n❌ Formatar sem backup\n❌ Aplicar pasta térmica\n❌ Abrir TV ou monitor\n❌ Mexer em configurações da BIOS"
};
