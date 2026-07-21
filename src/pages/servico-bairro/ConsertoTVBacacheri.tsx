import { ServicoBairroTemplate, ServicoBairroData } from "./ServicoBairroTemplate";

const data: ServicoBairroData = {
  metaTitle: "Conserto de Smart TV no Bacacheri, Curitiba | Coleta Domiciliar",
  metaDescription: "Conserto de Smart TV no Bacacheri, Curitiba. Coleta na sua casa e devolução com garantia. Samsung, LG, TCL, Sony e demais marcas. Orçamento sem compromisso.",
  servico: "Conserto de TV",
  servicoSlug: "conserto-tv",
  bairro: "Bacacheri",
  bairroSlug: "bacacheri",
  cidade: "Curitiba",
  h1: "Conserto de Smart TV no Bacacheri — Coleta em Curitiba",
  subtitulo: "TV Smart parada no Bacacheri? Coletamos na sua casa, consertamos em bancada e devolvemos com garantia. Sem visita técnica.",
  precoBase: "R$ 299,99",
  precoDescricao: "Taxa mínima de coleta + diagnóstico. Reparo orçado após bancada.",
  descricaoLonga: `Coleta de TV no Bacacheri, Bairro Alto, região da Av. Erasto Gaertner e Aeroporto do Bacacheri.
Reparo em nível de componente: fonte, T-CON, backlight LED, capacitores, HDMI e eMMC de Smart TV. Bancada completa com fonte controlada e câmera térmica.
Trabalhamos com Samsung, LG, Sony, TCL, Philips, AOC, Panasonic e demais marcas do mercado brasileiro.
Orçamento humanizado: se o reparo não compensar frente a uma TV nova, orientamos a substituir. Você paga apenas a taxa de coleta e diagnóstico.`,
  beneficios: [
    "Coleta agendada no Bacacheri",
    "Reparo em bancada com fonte controlada",
    "Diagnóstico em até 48h",
    "Todas as marcas: Samsung, LG, Sony, TCL",
    "Reparo de fonte, T-CON, backlight, HDMI",
    "Orçamento sem compromisso",
    "Garantia por escrito",
    "Entrega e reinstalação",
  ],
  processoPasso: [
    { titulo: "Triagem", descricao: "Envio do defeito por WhatsApp" },
    { titulo: "Coleta", descricao: "Buscamos no Bacacheri" },
    { titulo: "Diagnóstico", descricao: "Orçamento em bancada" },
    { titulo: "Reparo", descricao: "Devolvemos consertada com garantia" },
  ],
  faq: [
    { pergunta: "Vocês vão consertar na minha casa no Bacacheri?", resposta: "Não. TV é sempre coleta — bancada e instrumentos ficam na oficina. Coletamos, reparamos e devolvemos no seu endereço." },
    { pergunta: "Prazo médio no Bacacheri?", resposta: "3 a 15 dias na maioria dos casos. Fonte e capacitor costumam sair em uma semana; painel LED pode levar até 60 dias." },
    { pergunta: "Fazem reparo de TV OLED / QLED?", resposta: "Sim. LG OLED, Samsung QLED e Neo QLED. Diagnóstico especializado e reparo em nível de componente quando viável." },
    { pergunta: "E se não compensar reparar?", resposta: "Você paga apenas a taxa mínima de R$ 299,99 (coleta + diagnóstico + entrega). Nunca cobramos reparo não aprovado." },
  ],
  pontosReferencia: ["Aeroporto do Bacacheri", "Bacacheri Sul", "Av. Erasto Gaertner", "Bairro Alto", "Vila Suíça", "Colégio Militar"],
  tempoAtendimento: "Coleta em 24-48h",
  servicosRelacionados: [
    { nome: "Formatação de Computador", slug: "formatacao-computador" },
    { nome: "Redes Wi-Fi", slug: "redes-wifi" },
    { nome: "Remoção de Vírus", slug: "remocao-virus" },
  ],
  bairrosProximos: [
    { nome: "Bairro Alto", slug: "bairro-alto" },
    { nome: "Cabral", slug: "cabral" },
    { nome: "Boa Vista", slug: "boa-vista" },
    { nome: "Tingui", slug: "tingui" },
  ],
};

const ConsertoTVBacacheri = () => <ServicoBairroTemplate data={data} />;
export default ConsertoTVBacacheri;
