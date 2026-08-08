import { Link } from "react-router-dom";
import { MapPin, Route as RouteIcon, Clock } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageSEO } from "@/components/PageSEO";
import Breadcrumbs from "@/components/Breadcrumbs";
import LazyOnVisible from "@/components/LazyOnVisible";
import { CIDADES } from "@/lib/servicoCidadeData";
import { BAIRROS_ATENDIMENTO } from "@/lib/atendimentoBairrosData";

const SITE = "https://tecnicocuritiba.com.br";

export default function AreasAtendidas() {
  const title = "Áreas Atendidas em Curitiba e Região | Bairros e Cidades";
  const description =
    "Mapa e lista completa de bairros e cidades atendidas em Curitiba e Região Metropolitana: atendimento em domicílio, coleta e remoto a partir de R$ 99,99.";

  const totalBairros = Object.values(BAIRROS_ATENDIMENTO).reduce((acc, b) => acc + b.length, 0);

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Início", item: `${SITE}/` },
      { "@type": "ListItem", position: 2, name: "Áreas atendidas", item: `${SITE}/areas-atendidas` },
    ],
  };

  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Cidades atendidas na Grande Curitiba",
    itemListElement: CIDADES.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.nome,
      url: `${SITE}/atendimento/${c.slug}`,
    })),
  };

  return (
    <>
      <PageSEO title={title} description={description} path="/areas-atendidas" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }} />
      <Header />
      <main id="main-content" className="container mx-auto px-4 py-8">
        <Breadcrumbs
          emitSchema={false}
          items={[{ label: "Início", href: "/" }, { label: "Áreas atendidas" }]}
        />

        <section className="max-w-5xl mx-auto py-6 md:py-10">
          <h1 className="text-3xl md:text-5xl font-bold mb-3">
            Áreas atendidas em Curitiba e Região Metropolitana
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Atendemos {CIDADES.length} cidades e {totalBairros} bairros mapeados. Se o seu bairro não estiver na
            lista, fale no WhatsApp: quase sempre há rota disponível no mesmo dia ou modalidade remota imediata.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl border p-4">
              <MapPin className="h-5 w-5 text-primary mb-2" aria-hidden />
              <p className="font-semibold">Domicílio</p>
              <p className="text-sm text-muted-foreground">Curitiba e RMC, conforme rota do dia.</p>
            </div>
            <div className="rounded-xl border p-4">
              <RouteIcon className="h-5 w-5 text-primary mb-2" aria-hidden />
              <p className="font-semibold">Coleta e entrega</p>
              <p className="text-sm text-muted-foreground">Reparo em bancada com devolução no endereço.</p>
            </div>
            <div className="rounded-xl border p-4">
              <Clock className="h-5 w-5 text-primary mb-2" aria-hidden />
              <p className="font-semibold">Remoto</p>
              <p className="text-sm text-muted-foreground">Sem limite geográfico, início imediato.</p>
            </div>
          </div>
        </section>

        <section className="max-w-5xl mx-auto pb-10" aria-labelledby="mapa-cobertura">
          <h2 id="mapa-cobertura" className="text-2xl md:text-3xl font-bold mb-4">
            Mapa da área de cobertura
          </h2>
          <div className="overflow-hidden rounded-xl border" style={{ height: 380 }}>
            <LazyOnVisible
              minHeight="380px"
              rootMargin="300px 0px"
            >
              <iframe
                title="Mapa da área de atendimento em Curitiba e Região Metropolitana"
                src="https://www.google.com/maps?q=Curitiba,+PR&output=embed"
                width="100%"
                height="380"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                style={{ border: 0, display: "block" }}
              />
            </LazyOnVisible>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Base operacional em Curitiba (PR). Deslocamento para a Região Metropolitana conforme agenda e rota.
          </p>
        </section>

        <section className="max-w-5xl mx-auto pb-12" aria-labelledby="lista-areas">
          <h2 id="lista-areas" className="text-2xl md:text-3xl font-bold mb-4">
            Cidades e bairros atendidos
          </h2>
          <div className="space-y-8">
            {CIDADES.map((cidade) => {
              const bairros = BAIRROS_ATENDIMENTO[cidade.slug] ?? [];
              return (
                <article key={cidade.slug}>
                  <h3 className="text-xl font-semibold mb-3">
                    <Link to={`/atendimento/${cidade.slug}`} className="hover:text-primary underline-offset-4 hover:underline">
                      {cidade.nome}
                    </Link>
                  </h3>
                  {bairros.length > 0 ? (
                    <ul className="flex flex-wrap gap-2">
                      {bairros.map((b) => (
                        <li key={b.slug}>
                          <Link
                            to={`/atendimento/${cidade.slug}/${b.slug}`}
                            className="inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-sm hover:bg-primary/5 transition"
                          >
                            <MapPin className="h-3.5 w-3.5 text-primary" aria-hidden />
                            {b.nome}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      Atendimento sob agenda —{" "}
                      <Link to={`/atendimento/${cidade.slug}`} className="text-primary hover:underline">
                        ver detalhes de {cidade.nome}
                      </Link>
                      .
                    </p>
                  )}
                </article>
              );
            })}
          </div>
        </section>

        <section className="max-w-5xl mx-auto pb-16">
          <div className="rounded-2xl border bg-card p-6">
            <h2 className="text-xl font-bold mb-2">Não encontrou seu bairro?</h2>
            <p className="text-muted-foreground mb-4">
              A lista acima cobre as regiões com maior demanda. Outras localidades da Grande Curitiba são atendidas
              conforme disponibilidade de rota — confirme direto no WhatsApp informando bairro e equipamento.
            </p>
            <div className="flex flex-wrap gap-3 text-sm">
              <Link to="/atendimento" className="text-primary hover:underline">
                Atendimento por cidade
              </Link>
              <Link to="/coleta-e-entrega" className="text-primary hover:underline">
                Coleta e entrega
              </Link>
              <Link to="/atendimento-remoto" className="text-primary hover:underline">
                Atendimento remoto
              </Link>
              <Link to="/precos-e-politicas" className="text-primary hover:underline">
                Preços e políticas
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
