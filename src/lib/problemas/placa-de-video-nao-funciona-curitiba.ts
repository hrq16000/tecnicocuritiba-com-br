import type { ProblemaPageData } from "./types";

export const problema: ProblemaPageData = {
  "slug": "placa-de-video-nao-funciona-curitiba",
  "title": "Placa de Vídeo Não Funciona em Curitiba — Diagnóstico e Reparo",
  "metaDescription": "Placa de vídeo não funciona? Técnico em Curitiba diagnostica GPU queimada, driver crashando, artefatos e sem imagem. Reparo profissional com garantia.",
  "h1": "Placa de Vídeo Não Funciona — Diagnóstico e Reparo em Curitiba",
  "categoria": "Hardware",
  "intro": "A placa de vídeo parou de funcionar: sem imagem, artefatos na tela, crashes em jogos ou driver que não instala. GPUs são componentes caros e sensíveis que podem falhar por superaquecimento, desgaste ou problema elétrico.\n\nAntes de comprar uma GPU nova, é essencial diagnosticar corretamente. Muitas vezes o problema é driver, alimentação insuficiente, slot PCI-E ou até a fonte — e não a placa em si.\n\nNosso técnico em Curitiba testa a GPU isoladamente, verifica alimentação, temperaturas e drivers para identificar a causa real e evitar gastos desnecessários.",
  "sintomas": [
    {
      "titulo": "PC liga mas sem imagem pela GPU",
      "desc": "Ventoinhas da GPU giram mas não há sinal de vídeo. Pode ser GPU queimada, sem alimentação extra ou BIOS configurado errado.",
      "gravidade": "Complexo"
    },
    {
      "titulo": "Artefatos visuais (quadrados, linhas coloridas)",
      "desc": "Pixels corrompidos na tela indicam memória de vídeo (VRAM) com defeito ou chip GPU com solda fria.",
      "gravidade": "Complexo"
    },
    {
      "titulo": "Driver de vídeo crasha constantemente",
      "desc": "Tela pisca, fica preta por segundos e retorna com mensagem de recuperação do driver. Pode ser driver, superaquecimento ou defeito.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Jogo trava ou fecha sozinho",
      "desc": "GPU não suporta a carga térmica ou elétrica. Pode ser fonte subdimensionada, superaquecimento ou VRAM insuficiente.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Ventoinhas da GPU não giram",
      "desc": "Algumas GPUs modernas desligam fans em idle. Se não giram sob carga, pode ser conector do fan ou controlador queimado.",
      "gravidade": "Médio"
    },
    {
      "titulo": "PC reinicia ao exigir GPU (jogos, render)",
      "desc": "Fonte de alimentação não suporta o pico de consumo da GPU. Proteção de sobrecarga desliga o sistema.",
      "gravidade": "Médio"
    }
  ],
  "causas": [
    {
      "titulo": "Superaquecimento crônico",
      "desc": "Pasta térmica ressecada, cooler com poeira ou gabinete sem fluxo de ar. GPU atinge 90°C+ e degrada componentes.",
      "tipo": "desgaste"
    },
    {
      "titulo": "Fonte de alimentação insuficiente",
      "desc": "GPU exige mais watts do que a fonte fornece, ou cabos de alimentação PCIe (6/8 pinos) não estão conectados.",
      "tipo": "erro-humano"
    },
    {
      "titulo": "VRAM defeituosa",
      "desc": "Chips de memória de vídeo com defeito causam artefatos. Comum em GPUs com uso intensivo prolongado.",
      "tipo": "hardware"
    },
    {
      "titulo": "Solda BGA fria no chip GPU",
      "desc": "Micro-fissuras na solda entre chip e placa causam falha intermitente. Agravado por ciclos térmicos.",
      "tipo": "desgaste"
    },
    {
      "titulo": "Driver incompatível ou corrompido",
      "desc": "Atualização de driver falha, versão incompatível com Windows ou resíduo de driver anterior causando conflito.",
      "tipo": "software"
    },
    {
      "titulo": "Slot PCI-E danificado",
      "desc": "Contatos oxidados, slot com defeito na placa-mãe ou trava quebrada não segura a GPU corretamente.",
      "tipo": "hardware"
    }
  ],
  "cenarios": [
    {
      "nivel": "Simples",
      "desc": "Reinstalação limpa de driver (DDU), conexão de alimentação extra, reencaixe no slot. GPU volta a funcionar.",
      "tempo": "1-2 horas",
      "custo": "R$100–R$160"
    },
    {
      "nivel": "Médio",
      "desc": "Troca de pasta térmica da GPU, limpeza do cooler, teste com outra fonte de alimentação.",
      "tempo": "2-4 horas",
      "custo": "R$160–R$280"
    },
    {
      "nivel": "Complexo",
      "desc": "Diagnóstico de VRAM/chip GPU, reballing ou substituição da placa de vídeo. Orientação custo-benefício.",
      "tempo": "3-10 dias",
      "custo": "R$280–R$800+"
    }
  ],
  "riscos": [
    "Comprar GPU nova quando o problema é a fonte de alimentação",
    "Usar GPU superaquecendo e causar dano permanente ao chip",
    "Artefatos de VRAM podem corromper dados em processamento (render, cálculos)",
    "Tentativa de 'reballing caseiro' com forno pode destruir a placa completamente"
  ],
  "diagnostico": "Testamos a GPU em bancada com fonte de potência conhecida e monitor de teste. Monitoramos temperaturas sob stress test e verificamos VRAM com ferramentas de diagnóstico.\n\nInstalamos driver limpo usando DDU (Display Driver Uninstaller) para eliminar conflitos de software. Testamos o slot PCI-E da placa-mãe com outra GPU.\n\nO diagnóstico custa a partir de R$50, abatido do serviço aprovado.",
  "solucao": "Problemas de driver são resolvidos com remoção completa (DDU) e instalação limpa da versão estável. Superaquecimento é corrigido com troca de pasta térmica e limpeza do cooler da GPU.\n\nFonte subdimensionada: orientamos upgrade para modelo adequado. Para defeito de hardware (VRAM, chip), avaliamos viabilidade de reparo vs. custo de GPU equivalente usada/nova.\n\nEm todos os casos, fazemos stress test final para garantir estabilidade.",
  "quandoCompensa": "GPUs de alto valor (RTX 3060 ou superior) compensam reparo térmico e de driver. Problemas de fonte são baratos de resolver e salvam a GPU.",
  "quandoNaoCompensa": "GPUs antigas de baixo desempenho (GT 710, GT 1030) com defeito de hardware. Custo de reparo supera o valor de uma GPU nova equivalente.",
  "whatsappMessage": "Olá! Minha placa de vídeo não está funcionando. Preciso de diagnóstico técnico.",
  "relatedPages": [
    {
      "to": "/problemas/monitor-sem-sinal-curitiba",
      "label": "Monitor Sem Sinal"
    },
    {
      "to": "/problemas/computador-travando-curitiba",
      "label": "PC Travando"
    },
    {
      "to": "/problemas/pc-reiniciando-sozinho-curitiba",
      "label": "PC Reiniciando Sozinho"
    },
    {
      "to": "/problemas/notebook-tela-preta-curitiba",
      "label": "Notebook Tela Preta"
    },
    {
      "to": "/servicos",
      "label": "Todos os Serviços"
    }
  ],
  "conteudoExtra": "## Como Saber se é a GPU ou a Fonte?\n\nSe o PC reinicia só em jogos/render, provavelmente é a fonte. Se há artefatos visuais em qualquer situação (desktop, BIOS), é a GPU.\n\n## Cuidados com GPU\n\nMantenha o gabinete limpo, com bom fluxo de ar. Evite overclock sem monitorar temperaturas. Troque pasta térmica da GPU a cada 3 anos em uso intensivo."
};
