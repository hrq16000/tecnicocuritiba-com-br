import { ServicoBairroTemplate, ServicoBairroData } from "./ServicoBairroTemplate";

const data: ServicoBairroData = {
  metaTitle: "Instalação de Wi-Fi no Batel, Curitiba | Técnico Local Hoje",
  metaDescription: "Redes Wi-Fi, mesh e roteador no Batel, Curitiba. Diagnóstico de sinal fraco, ajuste de canal e Wi-Fi corporativo para escritórios. Agendamento no mesmo dia.",
  servico: "Redes Wi-Fi",
  servicoSlug: "redes-wifi",
  bairro: "Batel",
  bairroSlug: "batel",
  cidade: "Curitiba",
  h1: "Instalação e Reparo de Wi-Fi no Batel — Curitiba",
  subtitulo: "Wi-Fi caindo no apartamento ou escritório do Batel? Técnico local com deslocamento em até 45 min e triagem antes da visita para evitar chamado desnecessário.",
  precoBase: "R$ 99,99",
  precoDescricao: "Inclui triagem por WhatsApp, mapa de cobertura, ajuste de canal 2,4/5 GHz e senha forte no Batel.",
  descricaoLonga: `Atendimento em todo o Batel — Al. Dr. Muricy, Praça do Batel, Shopping Curitiba, Alameda Cabral e ruas do coração empresarial de Curitiba.
Configuramos roteadores domésticos, sistemas mesh (Deco, Nest, Eero) e Wi-Fi corporativo para escritórios da Al. Dr. Carlos de Carvalho e Rua Comendador Araújo.
Especialistas em prédios altos com muitas redes concorrentes: fazemos análise de espectro e mudança de canal para acabar com quedas em videochamadas e streaming.
Nosso funil de triagem por WhatsApp confirma se o problema é do provedor, do modem ou do Wi-Fi antes de qualquer deslocamento cobrado.`,
  beneficios: [
    "Triagem gratuita antes da visita",
    "Análise de espectro em prédios com muitas redes",
    "Instalação de sistema mesh (Deco, Nest, Eero)",
    "Wi-Fi corporativo com rede de visitantes isolada",
    "Reset e reconfiguração de roteador do provedor",
    "Otimização 2,4 GHz e 5 GHz",
    "Segurança WPA3 e bloqueio de intrusos",
    "Deslocamento em até 45 min no Batel",
  ],
  processoPasso: [
    { titulo: "Triagem WhatsApp", descricao: "Confirmamos se é Wi-Fi, modem ou provedor" },
    { titulo: "Visita e Diagnóstico", descricao: "Mapa de cobertura em cada cômodo" },
    { titulo: "Instalação", descricao: "Configuração ou troca do equipamento" },
    { titulo: "Teste e Garantia", descricao: "Speed test em cada ambiente" },
  ],
  faq: [
    { pergunta: "Atendem apartamentos do Batel no mesmo dia?", resposta: "Sim. Deslocamento em até 45 min do agendamento, das 8h às 20h de segunda a sábado." },
    { pergunta: "Prédio com muitos vizinhos derrubando meu Wi-Fi?", resposta: "Fazemos análise de espectro com Wi-Fi Analyzer e migramos o roteador para um canal 5 GHz livre. Resolve na grande maioria dos casos." },
    { pergunta: "Configuram Wi-Fi para escritórios no Batel?", resposta: "Sim. Wi-Fi corporativo com VLAN, rede de visitantes isolada e access points para coworkings e escritórios da Al. Dr. Muricy e adjacências." },
    { pergunta: "Qual o preço para trocar meu roteador?", resposta: "A partir de R$ 99,99 mão de obra + roteador. Indicamos modelo compatível com sua planta ou trabalhamos com o que você já tem." },
  ],
  pontosReferencia: ["Shopping Curitiba", "Al. Dr. Muricy", "Praça do Batel", "Al. Dr. Carlos de Carvalho", "Alameda Cabral", "R. Comendador Araújo"],
  tempoAtendimento: "Agendamento no mesmo dia, deslocamento em 45 min",
  servicosRelacionados: [
    { nome: "Formatação de Computador", slug: "formatacao-computador" },
    { nome: "Conserto de Notebook", slug: "conserto-pc-notebook" },
    { nome: "Remoção de Vírus", slug: "remocao-virus" },
  ],
  bairrosProximos: [
    { nome: "Água Verde", slug: "agua-verde" },
    { nome: "Bigorrilho", slug: "bigorrilho" },
    { nome: "Centro", slug: "centro" },
    { nome: "Rebouças", slug: "reboucas" },
  ],
};

const RedesWifiBatel = () => <ServicoBairroTemplate data={data} />;
export default RedesWifiBatel;
