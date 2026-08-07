import { LocalPhotoGallery } from "@/components/LocalPhotoGallery";
import { useMemo } from "react";
import { useParams, Navigate, Link, useSearchParams } from "react-router-dom";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageSEO } from "@/components/PageSEO";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { trackCTAClick } from "@/lib/analytics";
import { buildWhatsAppUrl } from "@/lib/whatsappMessage";
import { CIDADES, SERVICOS } from "@/lib/servicoCidadeData";
import { getBairro } from "@/lib/atendimentoBairrosData";
import { MessageCircle, MapPin, Clock, Shield, CheckCircle, Wrench } from "lucide-react";

const WHATSAPP_NUMBER = "5541997452053";

/**
 * /atendimento/:cidade/:bairro — captação hiperlocal.
 * Herda estrutura de SEO/CTAs do AtendimentoCidade (H1 único, JSON-LD Service+
 * LocalBusiness+BreadcrumbList) mas com áreaServed = Neighborhood e mensagem
 * WhatsApp específica do bairro (via `buildWhatsAppUrl`).
 */
export default function AtendimentoCidadeBairro() {
  const { cidade: cidadeSlug, bairro: bairroSlug } = useParams<{
    cidade: string;
    bairro: string;
  }>();
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category") || undefined;
  const symptomSlug = searchParams.get("symptomSlug") || undefined;
  const cidade = useMemo(
    () => CIDADES.find((c) => c.slug === cidadeSlug),
    [cidadeSlug],
  );
  const bairro = useMemo(
    () => (cidadeSlug ? getBairro(cidadeSlug, bairroSlug || "") : undefined),
    [cidadeSlug, bairroSlug],
  );

  if (!cidade || !bairro) {
    return <Navigate to={`/atendimento/${cidadeSlug || ""}`} replace />;
  }

  const localLabel = `${bairro.nome}, ${cidade.nome}`;
  const title = `Atendimento Técnico em ${bairro.nome}, ${cidade.nome} | WhatsApp | Técnico em Curitiba`;
  const description = `Suporte de informática no bairro ${bairro.nome} (${cidade.nome}). Domicílio, coleta ou remoto, orçamento no WhatsApp a partir de R$ 99,99 com garantia de 90 dias.`;
  const path = `/atendimento/${cidade.slug}/${bairro.slug}`;
  const url = `https://tecnicocuritiba.com.br${path}`;

  const waHref = buildWhatsAppUrl({
    bairroLabel: localLabel,
    servicoLabel: "atendimento técnico",
    category,
    symptomSlug,
    fallback: `Olá! Preciso de atendimento técnico em ${localLabel}. Pode me ajudar?`,
  });

  const ctaContext = {
    servico: "atendimento_bairro",
    bairro: `${cidade.slug}/${bairro.slug}`,
    category,
    symptomSlug,
  };


  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Assistência técnica de informática",
    provider: {
      "@type": "LocalBusiness",
      name: "Técnico em Curitiba",
      telephone: `+${WHATSAPP_NUMBER}`,
      areaServed: {
        "@type": "Place",
        name: localLabel,
        address: {
          "@type": "PostalAddress",
          addressLocality: cidade.nome,
          addressRegion: "PR",
          addressCountry: "BR",
        },
      },
    },
    areaServed: { "@type": "Place", name: localLabel },
    url,
    offers: {
      "@type": "Offer",
      price: "99.99",
      priceCurrency: "BRL",
      availability: "https://schema.org/InStock",
    },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Início", item: "https://tecnicocuritiba.com.br/" },
      { "@type": "ListItem", position: 2, name: "Atendimento", item: "https://tecnicocuritiba.com.br/atendimento" },
      { "@type": "ListItem", position: 3, name: cidade.nome, item: `https://tecnicocuritiba.com.br/atendimento/${cidade.slug}` },
      { "@type": "ListItem", position: 4, name: bairro.nome, item: url },
    ],
  };

  const faqs = [
    {
      q: `Vocês atendem no bairro ${bairro.nome}, ${cidade.nome}?`,
      a: `Sim. Atendemos residências e empresas em ${bairro.nome} e no restante de ${cidade.nome} — domicílio, coleta ou 100% remoto conforme o problema.`,
    },
    {
      q: `Quanto custa o atendimento em ${bairro.nome}?`,
      a: `A partir de R$ 99,99, com orçamento gratuito no WhatsApp antes de qualquer visita. Sem taxa de deslocamento surpresa.`,
    },
    {
      q: `Em quanto tempo o técnico chega em ${bairro.nome}?`,
      a: `Sempre que possível no mesmo dia. Confirmamos janela de horário e prazo pelo WhatsApp assim que você descrever o problema.`,
    },
    {
      q: "Tem garantia?",
      a: "Sim. 90 dias por escrito no serviço executado, sem letra miúda.",
    },
  ];

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <PageSEO title={title} description={description} path={path} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <Header />
      <main id="main-content" className="container mx-auto px-4 py-8">
        <Breadcrumbs
          emitSchema={false}
          items={[
            { label: "Início", href: "/" },
            { label: "Atendimento", href: "/atendimento" },
            { label: cidade.nome, href: `/atendimento/${cidade.slug}` },
            { label: bairro.nome },
          ]}
        />

        <section className="max-w-4xl mx-auto py-8 md:py-12">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Atendimento Técnico em {bairro.nome}, {cidade.nome}
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            Suporte de informática rápido em {bairro.nome} ({cidade.nome}). Orçamento imediato
            pelo WhatsApp, domicílio, coleta ou 100% remoto.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mb-10">
            <Button
              size="lg"
              asChild
              data-cta-location={`atendimento_${cidade.slug}_${bairro.slug}_hero`}
              data-wa-source={`atendimento_${cidade.slug}_${bairro.slug}`}
              data-service="atendimento_bairro"
              data-neighborhood={`${cidade.slug}/${bairro.slug}`}
            >
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackCTAClick("whatsapp", `atendimento_${cidade.slug}_${bairro.slug}_hero`, ctaContext)
                }

              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Falar no WhatsApp agora
              </a>
            </Button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 mb-10">
            <div className="rounded-xl border p-4 flex gap-3">
              <MapPin className="h-5 w-5 shrink-0 text-primary mt-0.5" />
              <div>
                <div className="font-semibold">Cobertura no bairro {bairro.nome}</div>
                <div className="text-sm text-muted-foreground">E toda {cidade.nome} e região.</div>
              </div>
            </div>
            <div className="rounded-xl border p-4 flex gap-3">
              <Clock className="h-5 w-5 shrink-0 text-primary mt-0.5" />
              <div>
                <div className="font-semibold">Deslocamento rápido</div>
                <div className="text-sm text-muted-foreground">Agendamento no mesmo dia sempre que possível.</div>
              </div>
            </div>
            <div className="rounded-xl border p-4 flex gap-3">
              <Shield className="h-5 w-5 shrink-0 text-primary mt-0.5" />
              <div>
                <div className="font-semibold">Garantia de 90 dias</div>
                <div className="text-sm text-muted-foreground">Cobre o serviço executado.</div>
              </div>
            </div>
            <div className="rounded-xl border p-4 flex gap-3">
              <Wrench className="h-5 w-5 shrink-0 text-primary mt-0.5" />
              <div>
                <div className="font-semibold">A partir de R$ 99,99</div>
                <div className="text-sm text-muted-foreground">Diagnóstico incluso no orçamento aprovado.</div>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-4">Serviços atendidos em {bairro.nome}</h2>
          <ul className="grid gap-2 sm:grid-cols-2 mb-10">
            {SERVICOS.map((s) => (
              <li key={s.slug} className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-primary" aria-hidden />
                {s.servicoSlugExistente ? (
                  <Link className="hover:underline" to={`/servicos/${s.servicoSlugExistente}`}>
                    {s.nome}
                  </Link>
                ) : (
                  <span>{s.nome}</span>
                )}
              </li>
            ))}
          </ul>

          <LocalPhotoGallery local={`${bairro.nome}, ${cidade.nome}`} bgClass="bg-transparent" />
          <h2 className="text-2xl font-bold mb-4">Dúvidas frequentes — {bairro.nome}</h2>
          <div className="space-y-4 mb-10">
            {faqs.map((f) => (
              <details key={f.q} className="rounded-xl border p-4">
                <summary className="font-semibold cursor-pointer">{f.q}</summary>
                <p className="mt-2 text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>

          <div className="rounded-2xl bg-primary/10 p-6 text-center">
            <h2 className="text-2xl font-bold mb-2">Precisa hoje em {bairro.nome}?</h2>
            <p className="mb-4 text-muted-foreground">
              Envie uma mensagem agora e receba o orçamento sem compromisso.
            </p>
            <Button
              size="lg"
              asChild
              data-cta-location={`atendimento_${cidade.slug}_${bairro.slug}_final`}
              data-wa-source={`atendimento_${cidade.slug}_${bairro.slug}_final`}
              data-service="atendimento_bairro"
              data-neighborhood={`${cidade.slug}/${bairro.slug}`}
            >
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackCTAClick(
                    "whatsapp",
                    `atendimento_${cidade.slug}_${bairro.slug}_final`,
                    ctaContext,
                  )
                }

              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Chamar no WhatsApp
              </a>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
