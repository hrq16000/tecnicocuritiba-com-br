import { ServicoBairroTemplate, ServicoBairroData } from "./ServicoBairroTemplate";

const data: ServicoBairroData = {
  metaTitle: "Conserto de Smart TV no Boqueirão, Curitiba | Coleta Domiciliar",
  metaDescription: "Conserto de Smart TV no Boqueirão, Curitiba. Coleta em casa, diagnóstico em bancada e garantia por escrito. Samsung, LG, TCL, Philco. Orçamento sem compromisso.",
  servico: "Conserto de TV",
  servicoSlug: "conserto-tv",
  bairro: "Boqueirão",
  bairroSlug: "boqueirao",
  cidade: "Curitiba",
  h1: "Conserto de Smart TV no Boqueirão — Coleta em Curitiba",
  subtitulo: "TV Samsung, LG ou TCL parada no Boqueirão? Coletamos na sua casa, consertamos em bancada e devolvemos com garantia. Sem visita — TV é sempre coleta.",
  precoBase: "R$ 299,99",
  precoDescricao: "Taxa mínima de coleta e diagnóstico. Reparo orçado após bancada.",
  descricaoLonga: `Coleta e conserto de Smart TV em toda a região do Boqueirão — Terminal do Boqueirão, Xaxim, Alto Boqueirão, Hauer e proximidades da Av. Marechal Floriano Peixoto.
Especialistas em fonte queimada, backlight (LED) apagado, listras na tela, HDMI sem sinal, capacitores inflados e problemas de Smart TV lenta ou travando.
Bancada equipada com fonte controlada, câmera térmica e estação de retrabalho BGA — reparamos em nível de componente antes de sugerir troca de placa inteira.
Trabalhamos com todas as marcas do mercado brasileiro. Orçamento humanizado: se não compensa reparar, informamos antes de qualquer cobrança.`,
  beneficios: [
    "Coleta agendada no Boqueirão",
    "Reparo em bancada com fonte controlada",
    "Diagnóstico completo em até 48h",
    "Reparo de fonte, T-CON, main e backlight",
    "Todas as marcas atendidas",
    "Orçamento sem compromisso",
    "Garantia por escrito",
    "Entrega e reinstalação",
  ],
  processoPasso: [
    { titulo: "Triagem", descricao: "Descrição do defeito por WhatsApp" },
    { titulo: "Coleta", descricao: "Buscamos a TV no Boqueirão" },
    { titulo: "Diagnóstico", descricao: "Bancada + orçamento em 48h" },
    { titulo: "Reparo e Entrega", descricao: "Devolvemos com garantia" },
  ],
  faq: [
    { pergunta: "Fazem visita técnica para TV no Boqueirão?", resposta: "Não. TV precisa de bancada e instrumentos específicos. Fazemos coleta, reparo e devolução — sem visita técnica em casa." },
    { pergunta: "Atendem toda a região do Boqueirão?", resposta: "Sim: Boqueirão, Xaxim, Alto Boqueirão, Hauer, Sítio Cercado e proximidades. Coleta agendada em até 48h." },
    { pergunta: "Qual o prazo do conserto?", resposta: "3 a 60 dias corridos conforme peça e defeito. Fonte e capacitores costumam sair em 3-7 dias; painel e T-CON podem levar mais." },
    { pergunta: "Se não compensar reparar, cobram algo?", resposta: "Apenas a taxa mínima de coleta e diagnóstico (R$ 299,99). O reparo em si só se aprovado por você." },
  ],
  pontosReferencia: ["Terminal do Boqueirão", "Xaxim", "Alto Boqueirão", "Hauer", "Av. Marechal Floriano Peixoto", "Parque Náutico"],
  tempoAtendimento: "Coleta em até 24-48h",
  servicosRelacionados: [
    { nome: "Formatação de Computador", slug: "formatacao-computador" },
    { nome: "Redes Wi-Fi", slug: "redes-wifi" },
    { nome: "Remoção de Vírus", slug: "remocao-virus" },
  ],
  bairrosProximos: [
    { nome: "Xaxim", slug: "xaxim" },
    { nome: "Hauer", slug: "hauer" },
    { nome: "Sítio Cercado", slug: "sitio-cercado" },
    { nome: "Alto Boqueirão", slug: "alto-boqueirao-ctba" },
  ],
};

const ConsertoTVBoqueirao = () => <ServicoBairroTemplate data={data} />;
export default ConsertoTVBoqueirao;
