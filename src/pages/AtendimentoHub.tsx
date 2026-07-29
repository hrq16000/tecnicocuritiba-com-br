import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageSEO } from "@/components/PageSEO";
import Breadcrumbs from "@/components/Breadcrumbs";
import { CIDADES } from "@/lib/servicoCidadeData";
import { MapPin } from "lucide-react";

export default function AtendimentoHub() {
  const title = "Atendimento Técnico na Grande Curitiba | Técnico em Curitiba";
  const description = "Escolha sua cidade e receba atendimento técnico de informática rápido: domicílio, coleta ou remoto. A partir de R$ 99,99, com garantia de 90 dias.";

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Início", item: "https://tecnicocuritiba.com.br/" },
      { "@type": "ListItem", position: 2, name: "Atendimento", item: "https://tecnicocuritiba.com.br/atendimento" },
    ],
  };

  return (
    <>
      <PageSEO title={title} description={description} path="/atendimento" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <Header />
      <main id="main-content" className="container mx-auto px-4 py-8">
        <Breadcrumbs items={[{ label: "Início", href: "/" }, { label: "Atendimento" }]} />
        <section className="max-w-4xl mx-auto py-8 md:py-12">
          <h1 className="text-3xl md:text-5xl font-bold mb-3">Atendimento técnico na Grande Curitiba</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Selecione sua cidade para ver como funciona o atendimento local, prazos e falar direto no WhatsApp.
          </p>
          <ul className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            {CIDADES.map((c) => (
              <li key={c.slug}>
                <Link
                  to={`/atendimento/${c.slug}`}
                  className="flex items-center gap-2 rounded-lg border p-3 hover:bg-primary/5 transition"
                >
                  <MapPin className="h-4 w-4 text-primary" aria-hidden />
                  <span>{c.nome}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}
