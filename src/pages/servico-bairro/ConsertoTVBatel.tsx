import { ServicoBairroTemplate, ServicoBairroData } from "./ServicoBairroTemplate";

const data: ServicoBairroData = {
  metaTitle: "Conserto de Smart TV no Batel, Curitiba | Coleta e Entrega",
  metaDescription: "Conserto de Smart TV LED, LCD e OLED no Batel, Curitiba. Coleta no seu apartamento, orçamento sem compromisso e garantia por escrito. Samsung, LG, Sony, TCL.",
  servico: "Conserto de TV",
  servicoSlug: "conserto-tv",
  bairro: "Batel",
  bairroSlug: "batel",
  cidade: "Curitiba",
  h1: "Conserto de Smart TV no Batel — Coleta e Entrega em Curitiba",
  subtitulo: "Sua TV do apartamento no Batel parou? Fazemos coleta, diagnóstico em bancada e devolvemos consertada com garantia. Sem visita técnica — TV é sempre coleta.",
  precoBase: "R$ 299,99",
  precoDescricao: "Taxa mínima de coleta e diagnóstico. Orçamento do conserto informado após bancada, sem obrigação.",
  descricaoLonga: `Atendemos apartamentos e escritórios do Batel — Al. Dr. Muricy, Shopping Curitiba, Alameda Cabral, Praça do Batel e vizinhança.
TV Smart não é reparada em visita: precisa de bancada, fonte controlada e instrumentos que só existem na oficina. Por isso coletamos, diagnosticamos com precisão e devolvemos entre 3 e 60 dias corridos conforme peça e defeito.
Trabalhamos com todas as marcas: Samsung, LG, Sony, TCL, Philips, AOC, Philco, Panasonic. Reparos comuns: fonte, T-CON, backlight, HDMI queimado, capacitores inflados, eMMC de Smart TV.
Antes de agendar, faça a triagem por WhatsApp — algumas falhas se resolvem com reset de fábrica sem precisar de coleta.`,
  beneficios: [
    "Coleta agendada no seu endereço do Batel",
    "Diagnóstico completo em bancada",
    "Orçamento sem compromisso após coleta",
    "Reparo em nível de componente (fonte, T-CON, main)",
    "Troca de painel LED quando compensa",
    "Todas as marcas: Samsung, LG, Sony, TCL",
    "Garantia por escrito no reparo",
    "Entrega e reinstalação no seu apartamento",
  ],
  processoPasso: [
    { titulo: "Triagem WhatsApp", descricao: "Descreva o defeito e envie fotos" },
    { titulo: "Coleta", descricao: "Buscamos a TV no Batel com embalagem adequada" },
    { titulo: "Diagnóstico e Orçamento", descricao: "Bancada com fonte controlada em até 48h" },
    { titulo: "Reparo e Entrega", descricao: "Após aprovado, devolvemos com garantia" },
  ],
  faq: [
    { pergunta: "Vocês vão até o Batel consertar minha TV?", resposta: "Não fazemos reparo domiciliar de TV — sem exceção. TV precisa de bancada e ferramenta específica. Fazemos coleta no Batel, reparo na oficina e devolução, tudo em um único agendamento." },
    { pergunta: "Qual o valor da coleta no Batel?", resposta: "A partir de R$ 299,99 (taxa mínima que inclui coleta + diagnóstico + entrega). O valor do reparo em si é orçado após a bancada, sem obrigação de aprovar." },
    { pergunta: "Consertam TV com tela quebrada?", resposta: "Avaliamos, mas na maioria dos casos a troca de painel custa 70-90% do valor de uma TV nova. Somos honestos: se não compensa, dizemos antes de você pagar o reparo." },
    { pergunta: "Prazo para devolver a TV?", resposta: "3 a 60 dias corridos dependendo do defeito e disponibilidade de peça. Fontes e capacitores costumam sair em 3-7 dias; T-CON e painel podem levar mais." },
  ],
  pontosReferencia: ["Shopping Curitiba", "Al. Dr. Muricy", "Praça do Batel", "Alameda Cabral", "Al. Dr. Carlos de Carvalho", "R. Comendador Araújo"],
  tempoAtendimento: "Coleta agendada em até 24-48h",
  servicosRelacionados: [
    { nome: "Formatação de Computador", slug: "formatacao-computador" },
    { nome: "Redes Wi-Fi", slug: "redes-wifi" },
    { nome: "Conserto de Notebook", slug: "conserto-pc-notebook" },
  ],
  bairrosProximos: [
    { nome: "Água Verde", slug: "agua-verde" },
    { nome: "Bigorrilho", slug: "bigorrilho" },
    { nome: "Centro", slug: "centro" },
    { nome: "Rebouças", slug: "reboucas" },
  ],
};

const ConsertoTVBatel = () => <ServicoBairroTemplate data={data} />;
export default ConsertoTVBatel;
