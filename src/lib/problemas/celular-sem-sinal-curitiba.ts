import type { ProblemaPageData } from "./types";

export const problema: ProblemaPageData = {
  "slug": "celular-sem-sinal-curitiba",
  "title": "Celular Sem Sinal em Curitiba | Problema de Rede Celular",
  "metaDescription": "Celular sem sinal, sem rede, ou perdendo cobertura? Diagnóstico de antena e rede em Curitiba. Samsung, Motorola, iPhone, Xiaomi.",
  "h1": "Celular Sem Sinal ou Sem Rede — Diagnóstico em Curitiba",
  "categoria": "Problemas de Celular",
  "intro": "Celular sem sinal é um problema que pode ser tanto da operadora quanto do aparelho. Quando é do aparelho, geralmente está relacionado à antena de sinal, ao CI de rede (baseband) ou a configurações de software.\n\nAntes de levar ao técnico, vale verificar se o problema é da operadora (testar o chip em outro celular) ou do aparelho (testar outro chip no seu celular). Se confirmado que é do aparelho, diagnóstico presencial na oficina.",
  "sintomas": [
    {
      "titulo": "Sem sinal em nenhum local",
      "desc": "O celular mostra 'Sem serviço' ou 'Somente chamadas de emergência' em qualquer lugar.",
      "gravidade": "Médio a complexo"
    },
    {
      "titulo": "Sinal intermitente",
      "desc": "O sinal aparece e desaparece, chamadas caem, dados móveis não funcionam direito.",
      "gravidade": "Médio"
    },
    {
      "titulo": "Não reconhece o chip (SIM)",
      "desc": "Mensagem 'Sem SIM' ou 'SIM inválido' mesmo com chip inserido. Pode ser slot, chip ou software.",
      "gravidade": "Simples a médio"
    },
    {
      "titulo": "Wi-Fi funciona mas dados móveis não",
      "desc": "Conecta no Wi-Fi normalmente mas não consegue usar 4G/5G. Pode ser configuração APN ou falha de rede.",
      "gravidade": "Simples"
    }
  ],
  "causas": [
    {
      "titulo": "Antena de sinal danificada",
      "desc": "Queda ou impacto pode soltar ou danificar o cabo flex da antena interna.",
      "tipo": "hardware"
    },
    {
      "titulo": "CI de rede (baseband) com defeito",
      "desc": "Chip na placa responsável pela comunicação com as torres. Problema grave.",
      "tipo": "hardware"
    },
    {
      "titulo": "Slot do SIM danificado",
      "desc": "Pinos do slot do chip tortos, oxidados ou quebrados.",
      "tipo": "desgaste"
    },
    {
      "titulo": "IMEI corrompido",
      "desc": "Em casos raros, o IMEI pode ser apagado/corrompido, impedindo registro na rede.",
      "tipo": "software"
    },
    {
      "titulo": "Atualização de software com bug",
      "desc": "Atualizações do sistema podem causar incompatibilidade com a rede da operadora.",
      "tipo": "software"
    }
  ],
  "cenarios": [
    {
      "nivel": "Simples",
      "desc": "Configuração de APN, reset de rede, troca de chip ou limpeza do slot.",
      "tempo": "30 min a 1 hora",
      "custo": "R$ 50 a R$ 100"
    },
    {
      "nivel": "Médio",
      "desc": "Troca do flex de antena ou reparo do slot SIM.",
      "tempo": "1 a 3 horas",
      "custo": "R$ 100 a R$ 250"
    },
    {
      "nivel": "Complexo",
      "desc": "Reparo de CI de rede (baseband) — microssolda em placa.",
      "tempo": "3 a 10 dias",
      "custo": "R$ 300 a R$ 700"
    }
  ],
  "riscos": [
    "Celular sem sinal não faz chamadas de emergência",
    "Problema de baseband geralmente é progressivo — piora com o tempo",
    "IMEI corrompido pode impedir o celular de funcionar em qualquer operadora"
  ],
  "diagnostico": "Teste com chip de outra operadora, verificação de antena, leitura de IMEI, análise de log de rede. Presencial na oficina.",
  "solucao": "Desde configuração de software até troca de antena ou reparo de baseband, conforme diagnóstico.",
  "quandoCompensa": "Problemas de slot e antena são baratos de resolver. Baseband compensa apenas em celulares de alto valor.",
  "quandoNaoCompensa": "Baseband queimado em celular intermediário ou antigo — custo da microssolda alto para o valor do aparelho.",
  "whatsappMessage": "Olá! Meu celular está sem sinal e preciso de diagnóstico. Podem me ajudar?",
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
      "label": "Conserto de Celular",
      "to": "/servicos/conserto-celular"
    },
    {
      "label": "Celular Não Liga",
      "to": "/problemas/celular-nao-liga-curitiba"
    },
    {
      "label": "Celular Lento",
      "to": "/problemas/celular-lento-curitiba"
    }
  ],
  "conteudoExtra": "## Antes de Levar ao Técnico\n\n1. **Teste seu chip em outro celular** — Se funciona, o problema é no seu aparelho\n2. **Teste outro chip no seu celular** — Se também não pega, confirma defeito no aparelho\n3. **Verifique o modo avião** — Pode ter sido ativado sem perceber\n4. **Reinicie o celular** — Pode resolver problemas temporários de rede\n5. **Atualize o sistema** — Algumas atualizações corrigem bugs de rede"
};
