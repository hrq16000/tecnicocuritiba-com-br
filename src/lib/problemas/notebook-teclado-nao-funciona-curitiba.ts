import type { ProblemaPageData } from "./types";

export const problema: ProblemaPageData = {
  "slug": "notebook-teclado-nao-funciona-curitiba",
  "title": "Teclado de Notebook Não Funciona | Curitiba",
  "metaDescription": "Teclado do notebook não funciona? Algumas teclas ou todo o teclado? Diagnóstico e troca em Curitiba.",
  "h1": "Teclado de Notebook Não Funciona em Curitiba",
  "categoria": "Hardware",
  "intro": "Algumas teclas não respondem, o teclado inteiro parou ou digita caracteres errados. Problemas de teclado em notebook são muito comuns e têm causas que vão de sujeira acumulada a danos por líquido.\n\nDiferente de desktops onde basta trocar o teclado, em notebooks o reparo envolve desmontagem e troca do flat cable ou do teclado inteiro — um procedimento delicado que exige técnico experiente.\n\nNosso técnico em Curitiba diagnostica a causa exata, realiza limpeza profissional ou troca o teclado por modelo compatível com garantia.",
  "sintomas": [
    {
      "titulo": "Algumas teclas não respondem",
      "desc": "Sujeira sob as teclas, membrana danificada ou trilha oxidada. Comum em teclas mais usadas (espaço, enter, letras centrais).",
      "gravidade": "Simples"
    },
    {
      "titulo": "Teclado inteiro não funciona",
      "desc": "Flat cable desconectado, danificado ou conector na placa-mãe com problema. Também pode ser driver ou configuração.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Teclas digitam caracteres errados",
      "desc": "Configuração de idioma do teclado errada (ABNT2 vs US), driver corrompido ou dano parcial na membrana.",
      "gravidade": "Simples"
    },
    {
      "titulo": "Teclado digita sozinho (teclas fantasma)",
      "desc": "Curto-circuito por líquido, tecla fisicamente travada ou interferência eletromagnética. Pode ser grave.",
      "gravidade": "Complexo"
    },
    {
      "titulo": "Teclado parou após derramamento de líquido",
      "desc": "Água, café ou refrigerante danifica trilhas e membrana. Requer limpeza imediata e profissional.",
      "gravidade": "Complexo"
    },
    {
      "titulo": "Teclado funciona no BIOS mas não no Windows",
      "desc": "Problema de driver, filtro de teclas ativado acidentalmente ou conflito com software de terceiros.",
      "gravidade": "Simples"
    }
  ],
  "causas": [
    {
      "titulo": "Sujeira e resíduos sob as teclas",
      "desc": "Migalhas, poeira e resíduos se acumulam sob as teclas ao longo dos anos, impedindo o contato elétrico.",
      "tipo": "desgaste"
    },
    {
      "titulo": "Flat cable desconectado ou danificado",
      "desc": "O cabo flat que conecta o teclado à placa-mãe pode soltar após impacto, transporte ou manutenção anterior.",
      "tipo": "hardware"
    },
    {
      "titulo": "Derramamento de líquido",
      "desc": "Líquidos causam oxidação e curto-circuito nas trilhas da membrana. Dano pode se espalhar para a placa-mãe.",
      "tipo": "erro-humano"
    },
    {
      "titulo": "Membrana do teclado desgastada",
      "desc": "A membrana condutiva perde eficiência com uso intenso. Trilhas se desgastam em teclas mais usadas.",
      "tipo": "desgaste"
    },
    {
      "titulo": "Driver ou configuração de Windows",
      "desc": "Filtro de teclas ativado, idioma errado configurado ou driver de teclado corrompido após atualização.",
      "tipo": "software"
    },
    {
      "titulo": "Conector na placa-mãe danificado",
      "desc": "O conector ZIF (Zero Insertion Force) onde o flat cable encaixa pode quebrar, soltar ou ter pinos oxidados.",
      "tipo": "hardware"
    }
  ],
  "cenarios": [
    {
      "nivel": "Simples",
      "desc": "Limpeza profissional do teclado, reencaixe do flat cable, correção de configuração/driver no Windows.",
      "tempo": "30-60 min",
      "custo": "R$80–R$130"
    },
    {
      "nivel": "Médio",
      "desc": "Troca do teclado completo por modelo compatível. Inclui desmontagem e remontagem do notebook.",
      "tempo": "1-3 horas",
      "custo": "R$150–R$300"
    },
    {
      "nivel": "Complexo",
      "desc": "Limpeza e reparo após derramamento de líquido (teclado + placa-mãe). Troca de teclado + reparo de conector.",
      "tempo": "2-5 dias",
      "custo": "R$300–R$600"
    }
  ],
  "riscos": [
    "Derramamento de líquido não tratado rapidamente danifica a placa-mãe",
    "Teclas fantasma podem enviar comandos indesejados (deletar arquivos, enviar mensagens)",
    "Tentativa de trocar teclado sem experiência pode danificar flat cable ou conector",
    "Usar teclado USB externo permanentemente afeta portabilidade do notebook"
  ],
  "diagnostico": "Testamos o teclado na BIOS para descartar problemas de software. Verificamos configuração de idioma, filtro de teclas e driver no Windows.\n\nAbrimos o notebook para inspecionar flat cable, conector e membrana. Em casos de líquido, avaliamos extensão do dano com lupa e multímetro.\n\nO diagnóstico custa a partir de R$50, abatido do serviço aprovado.",
  "solucao": "Para sujeira: limpeza profissional com ar comprimido e álcool isopropílico. Flat cable é reencaixado ou substituído.\n\nQuando o teclado precisa ser trocado, utilizamos modelos compatíveis com o chassi do notebook. Após derramamento, fazemos limpeza ultrassônica quando viável.\n\nProblemas de software são resolvidos com correção de configuração, reinstalação de driver ou desativação de filtro de teclas.",
  "quandoCompensa": "Sempre compensa em notebooks de até 5 anos. Troca de teclado é relativamente barata e restaura a funcionalidade completa.",
  "quandoNaoCompensa": "Quando o líquido danificou a placa-mãe além do teclado e o custo total de reparo excede 50% do valor do notebook.",
  "whatsappMessage": "Olá! O teclado do meu notebook não está funcionando. Preciso de reparo.",
  "relatedPages": [
    {
      "to": "/problemas/notebook-desliga-sozinho-curitiba",
      "label": "Notebook Desliga Sozinho"
    },
    {
      "to": "/problemas/notebook-tela-preta-curitiba",
      "label": "Notebook Tela Preta"
    },
    {
      "to": "/conserto-pc-notebook-curitiba",
      "label": "Conserto de Notebook"
    },
    {
      "to": "/problemas/pc-nao-reconhece-usb-curitiba",
      "label": "PC Não Reconhece USB"
    },
    {
      "to": "/servicos",
      "label": "Todos os Serviços"
    }
  ],
  "conteudoExtra": "## Prevenção de Danos ao Teclado\n\nEvite comer sobre o notebook. Use película protetora de silicone em ambientes com poeira. Em caso de derramamento de líquido, desligue imediatamente, vire de cabeça para baixo e procure um técnico.\n\n## Teclado Externo como Solução Temporária\n\nEnquanto aguarda reparo, um teclado USB compacto permite continuar usando o notebook normalmente. O teclado virtual do Windows (osk.exe) também ajuda em emergências."
};
