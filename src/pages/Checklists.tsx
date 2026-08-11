import { Link } from "react-router-dom";
import { Download, FileText } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageSEO } from "@/components/PageSEO";
import Breadcrumbs from "@/components/Breadcrumbs";
import SiteBaseSchema from "@/components/SiteBaseSchema";
import InlineTriageCTA from "@/components/InlineTriageCTA";
import { CHECKLISTS, trackChecklistDownload } from "@/lib/checklists";

const SITE = "https://tecnicocuritiba.com.br";

const FAQ = [
  {
    q: "Os checklists substituem o diagnóstico técnico?",
    a: "Não. Eles reúnem apenas testes seguros que qualquer pessoa pode fazer em casa, sem abrir o equipamento. Quando o problema persiste, a causa costuma exigir medição em bancada — nesse caso, a triagem pelo WhatsApp define a modalidade (remoto, domicílio ou coleta).",
  },
  {
    q: "Posso abrir a fonte ou trocar peças seguindo o checklist?",
    a: "Não. Nenhum passo dos checklists envolve abrir fonte, notebook ou fonte de TV. Há risco de choque e de perda de garantia. Se houver cheiro de queimado, estalos ou fumaça, desligue da tomada e não volte a ligar.",
  },
  {
    q: "Como o checklist acelera o atendimento?",
    a: "Cada arquivo termina com uma lista do que anotar (modelo, quando começou, o que mudou antes). Enviando essas informações na triagem, o orçamento sai mais rápido e o técnico já leva as peças mais prováveis.",
  },
  {
    q: "O download é gratuito?",
    a: "Sim. Os arquivos são gratuitos, sem cadastro e sem envio de dados pessoais. O atendimento continua a partir de R$ 99,99, com orçamento antes do reparo.",
  },
];

export default function Checklists() {
  const title = "Checklists Rápidos de Reparo | Técnico em Curitiba";
  const description =
    "Baixe checklists gratuitos em PDF para computador que não liga, PC lento e internet instável: testes seguros em casa e o que anotar antes de chamar o técnico.";

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Início", item: `${SITE}/` },
      { "@type": "ListItem", position: 2, name: "Checklists rápidos", item: `${SITE}/checklists` },
    ],
  };

  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Checklists rápidos de reparo",
    itemListElement: CHECKLISTS.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.title,
      url: `${SITE}${c.file}`,
    })),
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <PageSEO title={title} description={description} path="/checklists" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <SiteBaseSchema />
      <Header />
      <main id="main-content" className="container mx-auto px-4 py-8">
        <Breadcrumbs
          emitSchema={false}
          items={[{ label: "Início", href: "/" }, { label: "Checklists rápidos" }]}
        />

        <section className="max-w-4xl mx-auto py-6 md:py-10">
          <h1 className="text-3xl md:text-5xl font-bold mb-3">
            Checklists rápidos de reparo para baixar
          </h1>
          <p className="text-lg text-muted-foreground">
            Antes de chamar o técnico, vale testar o básico. Estes guias em PDF trazem só passos seguros — nada de
            abrir equipamento — e terminam com a lista do que anotar para a triagem. Download gratuito, sem cadastro.
          </p>
        </section>

        <section className="max-w-4xl mx-auto pb-12" aria-labelledby="lista-checklists">
          <h2 id="lista-checklists" className="text-2xl md:text-3xl font-bold mb-4">
            Downloads disponíveis
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {CHECKLISTS.map((c) => (
              <article key={c.slug} className="rounded-2xl border bg-card p-5 flex flex-col">
                <FileText className="h-6 w-6 text-primary mb-2" aria-hidden />
                <h3 className="text-lg font-semibold">{c.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground flex-1">{c.description}</p>
                <a
                  href={c.file}
                  download
                  onClick={() => trackChecklistDownload(c.slug, "pagina_checklists")}
                  data-cta-location={`checklist_pdf_${c.slug}`}
                  className="mt-4 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-primary px-4 text-sm font-semibold text-primary transition hover:bg-primary/5"
                >
                  <Download className="h-4 w-4" aria-hidden />
                  Baixar PDF
                </a>
                <Link to={c.relatedPath} className="mt-2 text-sm text-primary hover:underline">
                  Ver página do problema
                </Link>
              </article>
            ))}
          </div>

          <InlineTriageCTA
            className="mt-8"
            location="checklists_triagem"
            label="Não resolveu? Falar com o técnico"
            message="Olá! Segui o checklist rápido e o problema continua. Meu equipamento é: "
            hint="Informe equipamento, bairro e o que já testou — assim o orçamento sai mais rápido."
          />
        </section>

        <section className="max-w-4xl mx-auto pb-12" aria-labelledby="faq-checklists">
          <h2 id="faq-checklists" className="text-2xl md:text-3xl font-bold mb-4">
            Dúvidas sobre os checklists
          </h2>
          <div className="space-y-3">
            {FAQ.map((f) => (
              <details key={f.q} className="rounded-xl border bg-card p-4">
                <summary className="cursor-pointer font-semibold">{f.q}</summary>
                <p className="mt-2 text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="max-w-4xl mx-auto pb-16">
          <div className="rounded-2xl border bg-card p-6">
            <h2 className="text-xl font-bold mb-2">Precisa de ajuda agora?</h2>
            <p className="text-muted-foreground mb-4">
              Se o equipamento é essencial para trabalhar hoje, confira a disponibilidade do dia e siga direto para a
              triagem prioritária.
            </p>
            <div className="flex flex-wrap gap-3 text-sm">
              <Link to="/urgente" className="text-primary hover:underline">Ajuda urgente agora</Link>
              <Link to="/diagnostico-60s" className="text-primary hover:underline">Diagnóstico em 60s</Link>
              <Link to="/precos-e-politicas" className="text-primary hover:underline">Preços e políticas</Link>
              <Link to="/areas-atendidas" className="text-primary hover:underline">Áreas atendidas</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
