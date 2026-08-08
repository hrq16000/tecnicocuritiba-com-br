import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import {
  Megaphone,
  LayoutTemplate,
  MapPin,
  BarChart3,
  ShieldCheck,
  MessageCircle,
  FileText,
} from "lucide-react";

const CANONICAL = "https://tecnicocuritiba.com.br/patrocinadores";
const COMPANY = "Técnico em Curitiba — Assistência Técnica em Informática";
const WHATSAPP = "5541997452053";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
  "Olá! Tenho interesse em anunciar / patrocinar o portal tecnicocuritiba.com.br. Pode me enviar o mídia kit?",
)}`;
const UPDATED = "08/08/2026";

const formatos = [
  {
    nome: "Banner de topo de conteúdo",
    formato: "970x250 (desktop) / 320x100 (mobile)",
    posicao: "Abaixo do primeiro bloco de texto — nunca acima da dobra em telas pequenas.",
    obs: "Rotulado como “Publicidade”, sem sobreposição ao conteúdo e sem interferir no carregamento inicial.",
  },
  {
    nome: "Bloco no meio do conteúdo",
    formato: "336x280 / 300x250",
    posicao: "Entre seções de páginas de serviço, sintoma, bairro e artigos do blog.",
    obs: "Formato de maior leitura, inserido em pontos de pausa natural do texto.",
  },
  {
    nome: "Patrocinador da página",
    formato: "Card com logo, uma linha de descrição e link",
    posicao: "Fim do conteúdo, antes da FAQ.",
    obs: "Link com rel=\"sponsored\". Sem promessa de recomendação técnica editorial.",
  },
  {
    nome: "Patrocínio de seção local",
    formato: "Card em páginas de cidade/bairro",
    posicao: "Páginas de atendimento por cidade e bairro em Curitiba e Região Metropolitana.",
    obs: "Segmentação por localidade — indicado para negócios locais de serviços e varejo.",
  },
];

const publicoBullets = [
  "Buscas comerciais de alta intenção: “conserto”, “assistência técnica”, “orçamento”, “perto de mim”, “urgente”.",
  "Concentração geográfica em Curitiba e Região Metropolitana (São José dos Pinhais, Araucária, Campo Largo, Pinhais, Colombo e outras).",
  "Tráfego majoritariamente mobile, vindo de busca orgânica.",
  "Público misto: pessoa física com equipamento com defeito e pequenas empresas com parque de TI.",
];

const naoAceitamos = [
  "Apostas, jogos de azar e conteúdo adulto.",
  "Promessa de resultado médico, financeiro ou milagroso.",
  "Anúncios enganosos, com download forçado ou redirecionamento automático.",
  "Conteúdo que finja ser matéria editorial do portal.",
  "Concorrência direta apresentada como “recomendação técnica” do site.",
];

const faq: { q: string; a: string }[] = [
  {
    q: "Como funciona o patrocínio de páginas?",
    a: "O patrocinador ocupa um espaço fixo e rotulado como “Publicidade” em páginas escolhidas por tema ou localidade. O conteúdo editorial não muda em função do patrocínio: nenhuma avaliação técnica é vendida.",
  },
  {
    q: "Vocês divulgam números de audiência?",
    a: "Compartilhamos os números do período corrente diretamente no atendimento comercial, extraídos das nossas próprias métricas. Não publicamos estimativas infladas nem projeções que não possamos comprovar.",
  },
  {
    q: "O anúncio atrapalha o carregamento do site?",
    a: "Não. Os blocos publicitários são carregados de forma diferida, fora da primeira dobra em telas pequenas, e só depois do consentimento do visitante, conforme a Política de Cookies e Anúncios.",
  },
  {
    q: "Existe exclusividade por segmento?",
    a: "Sim, é possível reservar exclusividade por segmento e por localidade em páginas de cidade e bairro. Essa condição é definida no acordo comercial.",
  },
  {
    q: "Como é feito o contato comercial?",
    a: "Exclusivamente pelo WhatsApp do portal. Enviamos o mídia kit com formatos, posições disponíveis e condições vigentes.",
  },
  {
    q: "Quais anúncios não são aceitos?",
    a: "Apostas, conteúdo adulto, promessas enganosas, criativos com redirecionamento automático e qualquer peça que se disfarce de conteúdo editorial do portal.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${CANONICAL}#webpage`,
      url: CANONICAL,
      name: "Patrocinadores e Mídia Kit — Anuncie no Técnico em Curitiba",
      description:
        "Formatos de anúncio, posições recomendadas, perfil de audiência e regras de publicidade do portal tecnicocuritiba.com.br. Contato comercial pelo WhatsApp.",
      inLanguage: "pt-BR",
      isPartOf: { "@id": "https://tecnicocuritiba.com.br/#website" },
      publisher: { "@id": "https://tecnicocuritiba.com.br/#localbusiness" },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${CANONICAL}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Início", item: "https://tecnicocuritiba.com.br/" },
        { "@type": "ListItem", position: 2, name: "Patrocinadores e Mídia Kit", item: CANONICAL },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": `${CANONICAL}#faq`,
      mainEntity: faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

export default function Patrocinadores() {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Patrocinadores e Mídia Kit | Anuncie no Técnico em Curitiba</title>
        <meta
          name="description"
          content="Anuncie no portal de assistência técnica de Curitiba: formatos de banner, patrocínio por cidade e bairro, regras de publicidade e contato comercial pelo WhatsApp."
        />
        <link rel="canonical" href={CANONICAL} />
        <meta property="og:title" content="Patrocinadores e Mídia Kit — Técnico em Curitiba" />
        <meta
          property="og:description"
          content="Formatos de anúncio, posições recomendadas e perfil de audiência do portal tecnicocuritiba.com.br."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={CANONICAL} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <Header />

      <main id="main-content">
        <PageHero
          badge="Comercial"
          title="Patrocinadores e Mídia Kit"
          subtitle="Espaços publicitários rotulados, sem prejudicar a leitura nem a velocidade do portal. Segmentação por tema técnico e por localidade em Curitiba e Região Metropolitana."
        />

        <section className="container mx-auto px-4 py-10 max-w-4xl">
          <p className="text-sm text-muted-foreground">
            Publicado por <strong>{COMPANY}</strong> · Atualizado em {UPDATED}
          </p>

          <div className="mt-6 rounded-xl border border-border/60 bg-card/50 p-5">
            <h2 className="flex items-center gap-2 text-lg font-bold mb-2">
              <MessageCircle className="h-5 w-5 text-accent" aria-hidden="true" />
              Solicitar o mídia kit
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              O mídia kit atualizado (formatos, posições disponíveis, números do período e condições)
              é enviado pelo WhatsApp comercial do portal. Informe o segmento, a cidade de interesse e
              o período pretendido.
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-cta-location="sponsors_media_kit_whatsapp"
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-3 font-semibold text-accent-foreground"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              Falar com o comercial no WhatsApp
            </a>
          </div>

          <article id="formatos" className="mt-10 scroll-mt-24">
            <h2 className="flex items-center gap-2 text-xl font-bold mb-3">
              <LayoutTemplate className="h-5 w-5 text-accent" aria-hidden="true" />
              Formatos e posições recomendadas
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {formatos.map((f) => (
                <div key={f.nome} className="rounded-xl border border-border/60 bg-card/50 p-4">
                  <h3 className="font-semibold">{f.nome}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    <strong>Formato:</strong> {f.formato}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    <strong>Posição:</strong> {f.posicao}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">{f.obs}</p>
                </div>
              ))}
            </div>
          </article>

          <article id="audiencia" className="mt-10 scroll-mt-24">
            <h2 className="flex items-center gap-2 text-xl font-bold mb-3">
              <BarChart3 className="h-5 w-5 text-accent" aria-hidden="true" />
              Perfil de audiência
            </h2>
            <ul className="list-disc pl-5 space-y-1.5 text-muted-foreground">
              {publicoBullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
            <p className="mt-3 text-sm text-muted-foreground">
              Os números de sessões e impressões do período corrente são enviados no mídia kit, a
              partir das nossas próprias métricas. Não publicamos estimativas de tráfego que não
              possam ser comprovadas.
            </p>
          </article>

          <article id="areas" className="mt-10 scroll-mt-24">
            <h2 className="flex items-center gap-2 text-xl font-bold mb-3">
              <MapPin className="h-5 w-5 text-accent" aria-hidden="true" />
              Áreas de atuação disponíveis
            </h2>
            <p className="text-muted-foreground">
              O portal mantém páginas dedicadas por cidade e por bairro, o que permite patrocínio
              segmentado geograficamente: Curitiba, São José dos Pinhais, Araucária, Campo Largo,
              Pinhais, Colombo, Fazenda Rio Grande, Almirante Tamandaré, Piraquara, Campo Magro e
              Quatro Barras.
            </p>
            <p className="mt-2 text-muted-foreground">
              Também é possível segmentar por tema técnico — por exemplo,{" "}
              <Link to="/servicos/conserto-monitor" className="text-accent underline">
                conserto de monitor
              </Link>
              ,{" "}
              <Link to="/servicos/conserto-placa" className="text-accent underline">
                conserto de placa
              </Link>{" "}
              ou{" "}
              <Link to="/servicos/montagem-pc" className="text-accent underline">
                montagem de PC
              </Link>
              .
            </p>
          </article>

          <article id="regras" className="mt-10 scroll-mt-24">
            <h2 className="flex items-center gap-2 text-xl font-bold mb-3">
              <ShieldCheck className="h-5 w-5 text-accent" aria-hidden="true" />
              Regras e transparência
            </h2>
            <ul className="list-disc pl-5 space-y-1.5 text-muted-foreground">
              <li>Toda peça é rotulada de forma visível com a palavra “Publicidade”.</li>
              <li>Links patrocinados recebem o atributo <code>rel="sponsored"</code>.</li>
              <li>Scripts de anúncio só carregam após o consentimento do visitante (Consent Mode v2).</li>
              <li>Nenhum espaço publicitário é inserido acima da dobra em telas pequenas.</li>
              <li>O conteúdo editorial e as avaliações técnicas não são vendidos.</li>
            </ul>
            <h3 className="mt-4 flex items-center gap-2 font-semibold">
              <Megaphone className="h-4 w-4 text-accent" aria-hidden="true" />
              O que não é aceito
            </h3>
            <ul className="list-disc pl-5 space-y-1.5 text-muted-foreground mt-2">
              {naoAceitamos.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
          </article>

          <section className="mt-12" id="faq">
            <h2 className="text-xl font-bold mb-4">Perguntas frequentes de anunciantes</h2>
            <div className="space-y-4">
              {faq.map((f) => (
                <div key={f.q} className="rounded-xl border border-border/60 bg-card/50 p-4">
                  <h3 className="font-semibold mb-1">{f.q}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{f.a}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="mt-12 rounded-xl border border-border/60 bg-card/50 p-5">
            <h2 className="flex items-center gap-2 text-lg font-bold mb-2">
              <FileText className="h-5 w-5 text-accent" aria-hidden="true" />
              Documentos relacionados
            </h2>
            <ul className="list-disc pl-5 space-y-1.5 text-sm text-muted-foreground">
              <li><Link to="/politica-de-publicidade" className="text-accent underline">Política de Publicidade</Link></li>
              <li><Link to="/politica-de-cookies-e-anuncios" className="text-accent underline">Política de Cookies e Anúncios</Link></li>
              <li><Link to="/politica-de-privacidade" className="text-accent underline">Política de Privacidade e LGPD</Link></li>
              <li><Link to="/status-anuncios" className="text-accent underline">Status de Anúncios</Link></li>
              <li><Link to="/contato" className="text-accent underline">Contato</Link></li>
            </ul>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
