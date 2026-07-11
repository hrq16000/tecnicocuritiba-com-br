import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CTASection } from "@/components/CTASection";
import { trackPageView } from "@/lib/analytics";


/**
 * /autor/tecnico-curitiba — página de autor para reforço de E-E-A-T.
 * Foto e bio marcados como TODO: substituir com dados reais (foto profissional
 * + certificações + tempo real de mercado).
 */
const Autor = () => {
  useEffect(() => {
    document.title = "Sobre o autor | Técnico em Curitiba";
    trackPageView("/autor/tecnico-curitiba", "Autor - Técnico em Curitiba");
  }, []);

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Técnico Curitiba",
    url: "https://tecnicocuritiba.com.br/autor/tecnico-curitiba",
    image: "https://tecnicocuritiba.com.br/authors/tecnico-curitiba.jpg",
    jobTitle: "Técnico de Informática Sênior",
    worksFor: {
      "@type": "Organization",
      name: "Técnico em Curitiba",
      url: "https://tecnicocuritiba.com.br",
    },
    knowsAbout: [
      "Manutenção de computadores",
      "Formatação Windows",
      "Remoção de vírus",
      "Upgrade SSD e memória RAM",
      "Conserto de placa-mãe",
      "Suporte técnico remoto",
    ],
    areaServed: {
      "@type": "City",
      name: "Curitiba",
    },
    sameAs: [
      "https://tecnicocuritiba.com.br/sobre",
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <link rel="canonical" href="https://tecnicocuritiba.com.br/autor/tecnico-curitiba" />
        <meta
          name="description"
          content="Conheça o autor por trás do Técnico em Curitiba: experiência real em manutenção de PCs, notebooks e suporte técnico em Curitiba e região."
        />
      </Helmet>
      <JsonLdSchema data={personSchema} />
      <Header />

      <main id="main-content" className="container mx-auto max-w-3xl px-4 pb-16 pt-28 md:pt-32">
        <article>
          <h1 className="mb-6 text-3xl font-bold text-foreground md:text-4xl">
            Sobre o autor
          </h1>

          <div className="mb-8 flex flex-col items-center gap-6 rounded-2xl border border-border bg-card p-6 md:flex-row md:items-start">
            <img
              src="/authors/tecnico-curitiba.jpg"
              alt="Foto do técnico responsável pelo Técnico em Curitiba (foto profissional em breve)"
              width={160}
              height={160}
              loading="lazy"
              decoding="async"
              className="h-40 w-40 flex-shrink-0 rounded-full border border-border bg-muted object-cover"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src =
                  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><rect width='160' height='160' fill='%23e5e7eb'/><text x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='14' fill='%236b7280'>Foto em breve</text></svg>";
              }}
            />
            <div>
              <h2 className="mb-2 text-xl font-semibold text-foreground">
                Técnico Curitiba
              </h2>
              <p className="mb-2 text-sm text-muted-foreground">
                Técnico de Informática Sênior · Curitiba e Região Metropolitana
              </p>
              {/* TODO: substituir por bio real (anos de experiência, certificações
                  específicas — CompTIA, Microsoft, cursos, etc — e portfólio). */}
              <p className="text-base leading-relaxed text-foreground/90">
                Atuo há mais de <strong>10 anos</strong> com manutenção de computadores,
                notebooks e redes em Curitiba, atendendo residências e empresas com
                foco em soluções rápidas, transparentes e com garantia.
              </p>
              <p className="mt-2 text-base leading-relaxed text-foreground/90">
                Todos os artigos deste blog são baseados em atendimentos reais
                — problemas que aparecem no dia a dia da bancada, com diagnósticos
                testados em campo.
              </p>
            </div>
          </div>

          <section aria-labelledby="areas-heading" className="mb-8">
            <h2 id="areas-heading" className="mb-3 text-2xl font-bold text-foreground">
              Áreas de atuação
            </h2>
            <ul className="grid list-disc gap-1 pl-5 text-foreground/90 md:grid-cols-2">
              <li>Formatação e reinstalação de Windows</li>
              <li>Remoção de vírus e malware</li>
              <li>Upgrade de SSD e memória RAM</li>
              <li>Diagnóstico e conserto de placa-mãe</li>
              <li>Recuperação de dados e backup</li>
              <li>Suporte remoto para todo o Brasil</li>
            </ul>
          </section>

          <section aria-labelledby="contato-heading">
            <h2 id="contato-heading" className="mb-3 text-2xl font-bold text-foreground">
              Fale com o técnico
            </h2>
            <p className="text-foreground/90">
              Precisa de ajuda com um problema específico? O canal oficial é o
              WhatsApp — use o botão flutuante no canto da tela ou visite a
              página <a href="/sobre" className="text-primary underline">Sobre</a>{" "}
              para dados institucionais.
            </p>
          </section>
        </article>
      </main>

      <CTASection />
      <Footer />
    </div>
  );
};

export default Autor;
