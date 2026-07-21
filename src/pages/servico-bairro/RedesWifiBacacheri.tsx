import { ServicoBairroTemplate, ServicoBairroData } from "./ServicoBairroTemplate";

const data: ServicoBairroData = {
  metaTitle: "Wi-Fi e Redes no Bacacheri, Curitiba | Instalação Rápida",
  metaDescription: "Configuração de Wi-Fi, mesh e roteador no Bacacheri, Curitiba. Sinal fraco em casas grandes e sobrados? Resolvemos com técnico local a partir de R$ 99,99.",
  servico: "Redes Wi-Fi",
  servicoSlug: "redes-wifi",
  bairro: "Bacacheri",
  bairroSlug: "bacacheri",
  cidade: "Curitiba",
  h1: "Instalação de Wi-Fi no Bacacheri — Curitiba",
  subtitulo: "Sobrado ou casa com sinal fraco no fundo do quintal? No Bacacheri fazemos projeto de cobertura com mesh e access points para todos os cômodos.",
  precoBase: "R$ 99,99",
  precoDescricao: "Inclui análise de planta, ajuste de canais, senha forte e teste de cobertura no Bacacheri.",
  descricaoLonga: `Cobertura em toda a região do Bacacheri, Bacacheri Sul, Aeroporto do Bacacheri, Bairro Alto e proximidades da Av. Erasto Gaertner.
Sobrados e casas grandes concentram nossos atendimentos: instalamos sistemas mesh dual-band para garantir sinal forte no térreo, superior e área externa.
Diagnóstico completo de gargalos: canal congestionado, roteador do provedor mal posicionado, dispositivos antigos travando a rede toda ou interferência de vizinhos.
Fazemos triagem por WhatsApp antes de deslocar o técnico — se for problema do provedor, você não paga visita improdutiva.`,
  beneficios: [
    "Projeto de cobertura para sobrado / casa grande",
    "Sistema mesh com 2-3 pontos",
    "Access points cabeados para áreas críticas",
    "Ajuste de canal 5 GHz em prédios",
    "Wi-Fi separado para IoT / câmeras",
    "Segurança WPA3 e senha forte",
    "Triagem gratuita por WhatsApp",
    "Deslocamento rápido no Bacacheri e vizinhança",
  ],
  processoPasso: [
    { titulo: "Triagem", descricao: "Confirmação do problema por WhatsApp" },
    { titulo: "Visita", descricao: "Mapa de cobertura por cômodo" },
    { titulo: "Instalação", descricao: "Configuração de mesh ou access points" },
    { titulo: "Validação", descricao: "Teste de velocidade em cada ambiente" },
  ],
  faq: [
    { pergunta: "Meu sobrado tem 3 andares — precisa mesh?", resposta: "Sim. Um roteador único não cobre sobrados grandes. Instalamos mesh de 2-3 pontos ou access points cabeados." },
    { pergunta: "Câmeras de segurança derrubam meu Wi-Fi?", resposta: "Câmeras Wi-Fi consomem muita banda. Fazemos rede separada apenas para câmeras/IoT — resolve em 100% dos casos." },
    { pergunta: "Quanto tempo dura o atendimento?", resposta: "1 a 3 horas dependendo do tamanho do imóvel e da quantidade de pontos mesh instalados." },
    { pergunta: "Vocês fornecem o equipamento?", resposta: "Podemos indicar e vender com preço competitivo, ou instalar o que você já comprou. Sem obrigatoriedade de compra conosco." },
  ],
  pontosReferencia: ["Aeroporto do Bacacheri", "Bacacheri Sul", "Bairro Alto", "Av. Erasto Gaertner", "Vila Suíça", "Colégio Militar"],
  tempoAtendimento: "Agendamento no mesmo dia ou próximo",
  servicosRelacionados: [
    { nome: "Formatação de Computador", slug: "formatacao-computador" },
    { nome: "Upgrade SSD e Memória", slug: "upgrade-ssd-memoria" },
    { nome: "Remoção de Vírus", slug: "remocao-virus" },
  ],
  bairrosProximos: [
    { nome: "Bairro Alto", slug: "bairro-alto" },
    { nome: "Boa Vista", slug: "boa-vista" },
    { nome: "Tingui", slug: "tingui" },
    { nome: "Cabral", slug: "cabral" },
  ],
};

const RedesWifiBacacheri = () => <ServicoBairroTemplate data={data} />;
export default RedesWifiBacacheri;
