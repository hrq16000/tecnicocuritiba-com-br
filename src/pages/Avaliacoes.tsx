import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageSEO } from "@/components/PageSEO";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Star, MessageCircle, ShieldCheck, Loader2 } from "lucide-react";
import { NAP_PHONE_DIGITS } from "@/lib/nap";

interface Review {
  id: string;
  author_name: string;
  rating: number;
  comment: string;
  service_slug: string | null;
  city: string | null;
  neighborhood: string | null;
  review_date: string | null;
}

const SITE = "https://tecnicocuritiba.com.br";

const prettify = (s: string) =>
  s.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

export default function Avaliacoes() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [bairro, setBairro] = useState("");
  const [servico, setServico] = useState("");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data } = await supabase
        .from("reviews")
        .select(
          "id, author_name, rating, comment, service_slug, city, neighborhood, review_date",
        )
        .eq("verified", true)
        .eq("published", true)
        .order("review_date", { ascending: false })
        .limit(120);
      if (!cancelled) {
        setReviews((data as Review[]) ?? []);
        setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const bairros = useMemo(
    () => Array.from(new Set(reviews.map((r) => r.neighborhood).filter(Boolean) as string[])).sort(),
    [reviews],
  );
  const servicos = useMemo(
    () => Array.from(new Set(reviews.map((r) => r.service_slug).filter(Boolean) as string[])).sort(),
    [reviews],
  );

  const filtered = useMemo(
    () =>
      reviews.filter(
        (r) =>
          (!bairro || r.neighborhood === bairro) &&
          (!servico || r.service_slug === servico),
      ),
    [reviews, bairro, servico],
  );

  const average = filtered.length
    ? filtered.reduce((s, r) => s + r.rating, 0) / filtered.length
    : 0;

  const reviewLd = filtered.length
    ? {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: "Técnico em Curitiba",
        url: `${SITE}/avaliacoes`,
        telephone: `+${NAP_PHONE_DIGITS}`,
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: average.toFixed(1),
          reviewCount: String(filtered.length),
        },
        review: filtered.slice(0, 20).map((r) => ({
          "@type": "Review",
          author: { "@type": "Person", name: r.author_name },
          datePublished: r.review_date ?? undefined,
          reviewRating: {
            "@type": "Rating",
            ratingValue: String(r.rating),
            bestRating: "5",
            worstRating: "1",
          },
          reviewBody: r.comment,
        })),
      }
    : null;

  return (
    <>
      <PageSEO
        title="Avaliações de Clientes | Técnico em Curitiba"
        description="Depoimentos reais e autorizados de clientes atendidos em Curitiba e região. Filtre por bairro e por serviço e veja a nota média do atendimento."
        path="/avaliacoes"
      />
      {reviewLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewLd) }}
        />
      )}
      <Header />
      <main id="main-content" className="container mx-auto px-4 py-8">
        <Breadcrumbs
          emitSchema={false}
          items={[{ label: "Início", href: "/" }, { label: "Avaliações" }]}
        />

        <section className="max-w-4xl mx-auto py-6 md:py-10">
          <h1 className="text-3xl md:text-5xl font-bold mb-3">
            Avaliações de clientes em Curitiba e região
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            Só publicamos depoimentos com autorização expressa do cliente. Filtre por
            bairro ou por serviço para ver atendimentos parecidos com o seu.
          </p>

          <div className="flex flex-wrap items-center gap-3 mb-6">
            <div className="inline-flex items-center gap-2 rounded-xl border px-3 py-2">
              <Star className="h-5 w-5 fill-primary text-primary" aria-hidden />
              <span className="font-semibold">
                {average ? average.toFixed(1) : "—"}
              </span>
              <span className="text-sm text-muted-foreground">
                ({filtered.length} avaliações)
              </span>
            </div>
            <select
              aria-label="Filtrar por bairro"
              value={bairro}
              onChange={(e) => setBairro(e.target.value)}
              className="min-h-11 rounded-xl border bg-background px-3 text-sm"
            >
              <option value="">Todos os bairros</option>
              {bairros.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
            <select
              aria-label="Filtrar por serviço"
              value={servico}
              onChange={(e) => setServico(e.target.value)}
              className="min-h-11 rounded-xl border bg-background px-3 text-sm"
            >
              <option value="">Todos os serviços</option>
              {servicos.map((s) => (
                <option key={s} value={s}>{prettify(s)}</option>
              ))}
            </select>
          </div>

          {loading ? (
            <div className="flex items-center gap-2 text-muted-foreground py-10">
              <Loader2 className="h-4 w-4 animate-spin" /> Carregando avaliações...
            </div>
          ) : filtered.length === 0 ? (
            <p className="text-muted-foreground py-10">
              Ainda não há avaliações publicadas com esses filtros.{" "}
              <Link className="underline" to="/avaliar">
                Foi atendido? Deixe a sua.
              </Link>
            </p>
          ) : (
            <ul className="grid gap-4 sm:grid-cols-2">
              {filtered.map((r) => (
                <li key={r.id} className="rounded-2xl border p-4">
                  <div className="flex items-center gap-1 mb-2" aria-label={`Nota ${r.rating} de 5`}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < r.rating ? "fill-primary text-primary" : "text-muted-foreground/40"}`}
                        aria-hidden
                      />
                    ))}
                  </div>
                  <p className="mb-3">{r.comment}</p>
                  <div className="text-sm text-muted-foreground flex flex-wrap gap-x-2">
                    <span className="font-semibold text-foreground">{r.author_name}</span>
                    {r.neighborhood && <span>· {r.neighborhood}</span>}
                    {r.service_slug && <span>· {prettify(r.service_slug)}</span>}
                  </div>
                  <div className="mt-2 inline-flex items-center gap-1 text-xs text-muted-foreground">
                    <ShieldCheck className="h-3.5 w-3.5" aria-hidden /> Publicação autorizada pelo cliente
                  </div>
                </li>
              ))}
            </ul>
          )}

          <div className="rounded-2xl bg-primary/10 p-6 text-center mt-10">
            <h2 className="text-2xl font-bold mb-2">Precisa de atendimento hoje?</h2>
            <p className="mb-4 text-muted-foreground">
              Orçamento gratuito pelo WhatsApp, com garantia de 90 dias no serviço.
            </p>
            <Button size="lg" asChild>
              <a
                href={`https://wa.me/${NAP_PHONE_DIGITS}?text=${encodeURIComponent("Olá! Vi as avaliações no site e preciso de atendimento técnico.")}`}
                target="_blank"
                rel="noopener noreferrer"
                data-cta-location="avaliacoes_cta_final"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Falar no WhatsApp
              </a>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
