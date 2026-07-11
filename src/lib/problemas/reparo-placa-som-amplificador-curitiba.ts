import type { ProblemaPageData } from "./types";

export const problema: ProblemaPageData = {
  "slug": "reparo-placa-som-amplificador-curitiba",
  "title": "Reparo de Placa de Som, Amplificador e Receiver em Curitiba",
  "metaDescription": "Conserto de amplificador, receiver, caixa de som e rádio em Curitiba. Reparo de placa a nível de componente. Transistores, capacitores, ICs de áudio.",
  "h1": "Reparo de Amplificador, Receiver e Equipamento de Som em Curitiba",
  "categoria": "Reparo de Placa-Mãe",
  "intro": "Amplificadores, receivers, caixas de som amplificadas e rádios têm algo em comum: **placas com componentes discretos que podem ser reparadas individualmente**. Diferente de celulares e notebooks (microsoldagem), equipamentos de áudio usam componentes maiores e mais acessíveis.\n\n**Porém, equipamentos de som de qualidade são caros** — receivers Yamaha, Denon e Marantz custam de R$ 2.000 a R$ 15.000. Amplificadores valvulados vintage podem valer R$ 5.000-30.000. O reparo quase sempre compensa.\n\n**Componentes comuns em reparo de áudio:**\n- Transistores de potência (TIP41/42, MJL21193/4): R$ 5-30/par\n- Capacitores eletrolíticos de filtro (10.000-22.000µF): R$ 15-60/cada\n- ICs de áudio (TDA7293, LM3886, STK): R$ 15-80/cada\n- Potenciômetros: R$ 5-30\n- Relés de proteção: R$ 10-40\n- Válvulas (EL34, 6L6, 12AX7): R$ 80-300/cada\n\n**O reparo de áudio exige ouvido treinado** — além de medir com instrumentos, o técnico precisa ouvir se o som está limpo, sem ruídos, distorções ou desequilíbrios entre canais.",
  "sintomas": [
    {
      "titulo": "Amplificador não liga",
      "desc": "Fusível queimado, fonte com defeito ou relé de proteção ativado. Geralmente capacitores ou transistores da fonte.",
      "gravidade": "Simples a Médio"
    },
    {
      "titulo": "Som distorcido / chiado",
      "desc": "Transistores de saída degradados, capacitores secos ou IC de áudio com defeito. Comum em amplificadores com 5+ anos.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Um canal não funciona",
      "desc": "Transistor de saída queimado, relé de proteção do canal, solda fria no conector de saída. Teste comparativo entre canais.",
      "gravidade": "Simples a Médio"
    },
    {
      "titulo": "Ronco / hum de 60Hz",
      "desc": "Capacitores de filtro da fonte secos. O filtro não consegue mais alisar a tensão retificada. Capacitores de R$ 15-60.",
      "gravidade": "Simples"
    },
    {
      "titulo": "Receiver entra em proteção",
      "desc": "Um ou mais transistores de saída em curto. O circuito de proteção desliga para evitar dano nas caixas. Diagnóstico de par de saída.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Ruído ao girar volume",
      "desc": "Potenciômetro sujo ou desgastado. Limpeza com spray de contato ou troca do componente.",
      "gravidade": "Simples"
    }
  ],
  "causas": [
    {
      "titulo": "Capacitores eletrolíticos secos",
      "desc": "Após 10-20 anos, o eletrólito dos capacitores evapora. Perdem capacitância e ESR aumenta. É a causa #1 em equipamentos de áudio vintage e semi-vintage.",
      "tipo": "desgaste"
    },
    {
      "titulo": "Transistores de potência em curto",
      "desc": "Uso em volume alto, curto na saída (caixa com fio encostando) ou sobrecarga queimam os transistores do estágio de saída.",
      "tipo": "hardware"
    },
    {
      "titulo": "Válvulas esgotadas (amplificadores valvulados)",
      "desc": "Válvulas têm vida útil de 2.000-10.000 horas. Perdem emissão gradualmente. Troca de válvulas é manutenção normal.",
      "tipo": "desgaste"
    },
    {
      "titulo": "Soldas frias por vibração",
      "desc": "A vibração do próprio som (especialmente graves potentes) pode trincar soldas ao longo de anos.",
      "tipo": "desgaste"
    },
    {
      "titulo": "Surto elétrico",
      "desc": "Queima transistores, ICs e até transformador. Sem proteção (estabilizador/filtro de linha), é questão de tempo.",
      "tipo": "erro-humano"
    }
  ],
  "cenarios": [
    {
      "nivel": "Simples",
      "desc": "Fusível, capacitores secos, potenciômetro, solda fria. Componentes baratos.",
      "tempo": "2 a 5 dias",
      "custo": "R$ 150 a R$ 350"
    },
    {
      "nivel": "Médio",
      "desc": "Transistores de saída, IC de áudio, relé, válvulas. Par de transistores + biasagem.",
      "tempo": "5 a 10 dias",
      "custo": "R$ 300 a R$ 700"
    },
    {
      "nivel": "Complexo",
      "desc": "Transformador queimado, múltiplos estágios danificados, restauração completa de vintage.",
      "tempo": "10 a 30 dias",
      "custo": "R$ 500 a R$ 1.500+"
    }
  ],
  "riscos": [
    "Amplificadores valvulados operam com tensões de 300-500V — risco de choque",
    "Transistores de saída de modelos antigos podem estar fora de fabricação",
    "Receivers multicanal têm 7-11 estágios de amplificação — diagnóstico complexo",
    "Equipamentos vintage podem precisar de recapacitação completa (todos os capacitores)",
    "Caixas de som com falante queimado podem parecer problema do amplificador"
  ],
  "diagnostico": "**Diagnóstico de equipamento de áudio:**\n\n**1. Teste visual:**\nCapacitores inchados, resistores queimados (escurecidos), soldas frias visíveis.\n\n**2. Teste de tensões da fonte:**\nMultímetro nas saídas do transformador retificado. Valores fora indicam fonte.\n\n**3. Teste de transistores de saída:**\nMultímetro em modo diodo. Junção base-emissor e base-coletor. Curto = queimado.\n\n**4. Teste funcional com carga resistiva:**\nConectar resistor de carga (8Ω/50W) em vez de caixa. Oscilar com gerador de sinal. Verificar saída no osciloscópio.\n\n**5. Teste de escuta:**\nApós reparo, ouvir com música de referência em volume baixo, médio e alto. Verificar ambos os canais.\n\n**Custo: R$ 60-100, abatido do serviço.**",
  "solucao": "**Reparo de áudio a nível de componente:**\n\n**Fonte de alimentação (35% dos casos):**\n- Troca de capacitores de filtro (R$ 15-60)\n- Troca de diodos retificadores (R$ 2-10)\n- Fusível térmico (R$ 2-5)\n\n**Estágio de saída (30%):**\n- Troca de par de transistores de potência (R$ 10-60/par)\n- Ajuste de bias (polarização)\n- Teste de simetria entre canais\n\n**Pré-amplificador / processamento (20%):**\n- IC de áudio (TDA, LM, STK): R$ 15-80\n- Potenciômetros: limpeza ou troca\n- Chaves seletoras: limpeza de contatos\n\n**Amplificadores valvulados (15%):**\n- Troca de válvulas: R$ 80-300/cada\n- Ajuste de bias\n- Recapacitação se necessário\n\n**Todo reparo inclui teste de escuta com música de referência.**",
  "quandoCompensa": "Quase sempre. Receivers Yamaha/Denon/Marantz de R$ 2.000-15.000 — reparo de R$ 300-700 é muito vantajoso. Amplificadores valvulados vintage — além do valor funcional, têm valor de colecionador.",
  "quandoNaoCompensa": "Caixas de som bluetooth baratas (R$ 100-300). Rádios simples de R$ 50-150. Quando o transformador queimou em equipamento barato.",
  "whatsappMessage": "Olá! Tenho um equipamento de som/amplificador com defeito. Podem diagnosticar?",
  "relatedPages": [
    {
      "label": "Conserto de Placa",
      "to": "/servicos/conserto-placa"
    },
    {
      "label": "Reparo Placa TV",
      "to": "/problemas/reparo-placa-principal-tv-curitiba"
    },
    {
      "label": "Reparo Placa Notebook",
      "to": "/problemas/reparo-placa-mae-notebook-curitiba"
    },
    {
      "label": "Equipamentos Atendidos",
      "to": "/equipamentos-atendidos"
    },
    {
      "label": "Diagnóstico Técnico",
      "to": "/diagnostico-tecnico"
    },
    {
      "label": "Preços e Políticas",
      "to": "/precos-e-politicas"
    }
  ],
  "conteudoExtra": "## O Mundo do Reparo de Áudio\n\n### Por Que Equipamento de Som Premium Vale Reparar\n\n| Equipamento | Valor novo | Reparo médio | Economia |\n|------------|-----------|-------------|----------|\n| Receiver Yamaha RX-V6A | R$ 4.500 | R$ 300-600 | 85-93% |\n| Receiver Denon AVR-X2800H | R$ 6.000 | R$ 350-700 | 88-94% |\n| Receiver Marantz SR6015 | R$ 9.000 | R$ 400-800 | 91-96% |\n| Amplificador Marantz PM6007 | R$ 5.500 | R$ 250-500 | 91-95% |\n| Amplificador valvulado (vintage) | R$ 5.000-30.000 | R$ 400-1.200 | 92-97% |\n\n### Componentes e Preços Reais\n\n| Componente | Aplicação | Preço |\n|-----------|----------|-------|\n| Transistor TIP41C/42C | Saída de potência | R$ 3-8/par |\n| Transistor MJL21193/21194 | Saída alta potência | R$ 20-40/par |\n| Capacitor 10.000µF/50V | Filtro da fonte | R$ 15-30 |\n| Capacitor 22.000µF/80V | Filtro (alta potência) | R$ 40-60 |\n| IC TDA7293 | Amplificador integrado | R$ 20-40 |\n| IC LM3886 | Amplificador audiófilo | R$ 30-60 |\n| IC STK4050 | Amplificador de potência | R$ 40-80 |\n| Válvula EL34 (par casado) | Amplificador valvulado | R$ 200-500/par |\n| Válvula 12AX7 | Pré-amplificador | R$ 80-200 |\n| Potenciômetro ALPS | Volume de qualidade | R$ 15-40 |\n| Relé de proteção | Circuito de proteção | R$ 10-30 |\n\n### Dicas de Manutenção Preventiva\n\n1. **Use estabilizador ou filtro de linha** — protege contra surtos\n2. **Não empilhe equipamentos** — calor degrada capacitores mais rápido\n3. **Ligue em volume baixo** e aumente gradualmente\n4. **Verifique impedância das caixas** — caixas de 2Ω em receiver de 6Ω = queima garantida\n5. **Amplificadores valvulados** — troque válvulas a cada 2.000-5.000 horas de uso"
};
