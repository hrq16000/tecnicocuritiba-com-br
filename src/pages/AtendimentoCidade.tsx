import { useMemo } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageSEO } from "@/components/PageSEO";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { trackCTAClick } from "@/lib/analytics";
import { buildWhatsAppUrl } from "@/lib/whatsappMessage";
import { CIDADES, SERVICOS } from "@/lib/servicoCidadeData";
import { MessageCircle, MapPin, Clock, Shield, CheckCircle, Wrench } from "lucide-react";

const WHATSAPP_NUMBER = "5541997452053";

/**
 * Página programática de captação de leads por cidade da RMC.
 * Mantém o mesmo padrão de SEO (H1 único, meta title/desc, JSON-LD Service +
 * LocalBusiness + BreadcrumbList) e CTAs (WhatsApp com mensagem pré-preenchida
 * + UTMs automáticos via `initWhatsAppUtm`).
 */
export default function AtendimentoCidade() {
  const { cidade: cidadeSlug } = useParams<{ cidade: string }>();
  const cidade = useMemo(
    () => CIDADES.find((c) => c.slug === cidadeSlug),
    [cidadeSlug],
  );

  if (!cidade) return <Navigate to="/servicos" replace />;

  const title = `Atendimento Técnico em ${cidade.nome} | Orçamento no WhatsApp | Técnico em Curitiba`;
  const description = `Atendimento técnico de informática em ${cidade.nome}. Domicílio, coleta ou remoto. Orçamento no WhatsApp a partir de R$ 99,99, com garantia de 90 dias.`;
  const url = `https://tecnicocuritiba.com.br/atendimento/${cidade.slug}`;
  const path = `/atendimento/${cidade.slug}`;
  const waHref = buildWhatsAppUrl({
    bairroLabel: cidade.nome,
    servicoLabel: "atendimento técnico",
    fallback: `Olá! Preciso de atendimento técnico em ${cidade.nome}. Pode me ajudar?`,
  });

  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Assistência técnica de informática",
    provider: {
      "@type": "LocalBusiness",
      name: "Técnico em Curitiba",
      telephone: `+${WHATSAPP_NUMBER}`,
      areaServed: { "@type": "City", name: cidade.nome },
      address: { "@type": "PostalAddress", addressLocality: "Curitiba", addressRegion: "PR", addressCountry: "BR" },
    },
    areaServed: { "@type": "City", name: cidade.nome },
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
      { "@type": "ListItem", position: 3, name: cidade.nome, item: url },
    ],
  };

  return (
    <>
      <PageSEO title={title} description={description} path={path} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <Header />
      <main id="main-content" className="container mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { label: "Início", href: "/" },
            { label: "Atendimento" },
            { label: cidade.nome },
          ]}
        />

        <section className="max-w-4xl mx-auto py-8 md:py-12">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Atendimento Técnico em {cidade.nome}
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            Suporte de informática rápido em {cidade.nome} e região. Orçamento imediato pelo
            WhatsApp, atendimento a domicílio, coleta ou 100% remoto.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mb-10">
            <Button
              size="lg"
              asChild
              data-cta-location={`atendimento_${cidade.slug}_hero`}
              data-wa-source={`atendimento_${cidade.slug}`}
              data-service="atendimento_cidade"
              data-neighborhood={cidade.slug}
            >
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackCTAClick("whatsapp", `atendimento_${cidade.slug}_hero`, {
                    servico: "atendimento_cidade",
                    bairro: cidade.slug,
                  })
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
                <div className="font-semibold">Cobertura em {cidade.nome}</div>
                <div className="text-sm text-muted-foreground">Todos os bairros e região central.</div>
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
                <div className="text-sm text-muted-foreground">Cobre o serviço executado, sem letra miúda.</div>
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

          <h2 className="text-2xl font-bold mb-4">Serviços atendidos em {cidade.nome}</h2>
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

          <h2 className="text-2xl font-bold mb-4">Como funciona o atendimento em {cidade.nome}</h2>
          <ol className="list-decimal ml-5 space-y-2 mb-10 text-muted-foreground">
            <li>Você descreve o problema no WhatsApp — em minutos definimos a melhor modalidade (remoto, domicílio ou coleta).</li>
            <li>Confirmamos horário, prazo e valor mínimo antes de qualquer visita.</li>
            <li>Executamos o serviço com peças originais (quando aplicável) e emitimos garantia de 90 dias por escrito.</li>
          </ol>

          <div className="rounded-2xl bg-primary/10 p-6 text-center">
            <h2 className="text-2xl font-bold mb-2">Precisa hoje em {cidade.nome}?</h2>
            <p className="mb-4 text-muted-foreground">
              Envie uma mensagem agora e receba o orçamento sem compromisso.
            </p>
            <Button
              size="lg"
              asChild
              data-cta-location={`atendimento_${cidade.slug}_final`}
              data-wa-source={`atendimento_${cidade.slug}_final`}
              data-service="atendimento_cidade"
              data-neighborhood={cidade.slug}
            >
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackCTAClick("whatsapp", `atendimento_${cidade.slug}_final`, {
                    servico: "atendimento_cidade",
                    bairro: cidade.slug,
                  })
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
