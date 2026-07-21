import { ServicoBairroTemplate, ServicoBairroData } from "./ServicoBairroTemplate";

const data: ServicoBairroData = {
  metaTitle: "Conserto de Smart TV no Cabral, Curitiba | Coleta Domiciliar",
  metaDescription: "Conserto de Smart TV no Cabral, Curitiba. Coletamos na sua casa e devolvemos com garantia. Samsung, LG, Sony e todas as marcas. Orçamento humanizado.",
  servico: "Conserto de TV",
  servicoSlug: "conserto-tv",
  bairro: "Cabral",
  bairroSlug: "cabral",
  cidade: "Curitiba",
  h1: "Conserto de Smart TV no Cabral — Coleta em Curitiba",
  subtitulo: "TV parada em casa no Cabral? Fazemos coleta, reparo em bancada e devolução com garantia por escrito. Sem visita técnica — TV é sempre coleta.",
  precoBase: "R$ 299,99",
  precoDescricao: "Taxa mínima de coleta + diagnóstico. Reparo orçado após bancada, sem obrigação.",
  descricaoLonga: `Coleta de TV no Cabral e proximidades — Praça do Portugal, Rua João Gualberto, Av. Anita Garibaldi e ligação com Juvevê e Ahú.
Reparo de fonte, backlight, T-CON, HDMI, capacitores e Smart TV lenta em todas as marcas. Bancada com fonte controlada, câmera térmica e retrabalho BGA.
Diagnóstico em até 48h após coleta. Só cobramos o reparo se aprovado; a taxa mínima cobre a coleta e o laudo técnico.
Compensa? Se não compensar reparar, orientamos a substituir — nossa reputação vale mais que uma venda ruim.`,
  beneficios: [
    "Coleta agendada no Cabral em 24-48h",
    "Diagnóstico em bancada com fonte controlada",
    "Reparo em nível de componente",
    "Todas as marcas atendidas",
    "Orçamento humanizado e transparente",
    "Garantia por escrito",
    "Entrega no seu endereço",
    "Sem visita técnica cobrada",
  ],
  processoPasso: [
    { titulo: "Triagem", descricao: "Descrição do defeito via WhatsApp" },
    { titulo: "Coleta", descricao: "Buscamos no Cabral" },
    { titulo: "Diagnóstico", descricao: "Orçamento em até 48h" },
    { titulo: "Devolução", descricao: "TV testada e com garantia" },
  ],
  faq: [
    { pergunta: "Preciso levar a TV até vocês?", resposta: "Não. Fazemos coleta agendada no Cabral. Você só entrega no técnico da coleta e recebe de volta consertada." },
    { pergunta: "Qual o prazo médio no Cabral?", resposta: "3 a 15 dias na maioria dos defeitos (fonte, capacitor, HDMI). Painel LED e T-CON podem levar até 60 dias." },
    { pergunta: "Aceitam pagamento em cartão?", resposta: "Sim: PIX, cartão de crédito/débito e dinheiro. Parcelamento sob consulta." },
    { pergunta: "Vocês trabalham com TV OLED?", resposta: "Sim. LG OLED, Samsung QLED e demais tecnologias. Diagnóstico especializado antes do orçamento." },
  ],
  pontosReferencia: ["Praça do Portugal", "R. João Gualberto", "Av. Anita Garibaldi", "Juvevê", "Ahú", "Colégio Marista"],
  tempoAtendimento: "Coleta em 24-48h",
  servicosRelacionados: [
    { nome: "Formatação de Computador", slug: "formatacao-computador" },
    { nome: "Redes Wi-Fi", slug: "redes-wifi" },
    { nome: "Upgrade SSD e Memória", slug: "upgrade-ssd-memoria" },
  ],
  bairrosProximos: [
    { nome: "Juvevê", slug: "juveve" },
    { nome: "Bacacheri", slug: "bacacheri" },
    { nome: "Alto da Glória", slug: "alto-gloria" },
    { nome: "Cristo Rei", slug: "cristo-rei" },
  ],
};

const ConsertoTVCabral = () => <ServicoBairroTemplate data={data} />;
export default ConsertoTVCabral;
