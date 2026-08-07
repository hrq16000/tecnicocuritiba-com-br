import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageSEO } from "@/components/PageSEO";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Star, MessageCircle, ShieldCheck, Clock } from "lucide-react";
import { NAP_PHONE_DIGITS } from "@/lib/nap";
import { buildSiteReviewUrl } from "@/lib/reviewRequest";

const steps = [
  {
    t: "1. Abra o link enviado no WhatsApp",
    d: "Depois que a Ordem de Serviço é finalizada, você recebe um link direto para a página de avaliação. Ele já vem com o número da OS e o serviço preenchidos.",
  },
  {
    t: "2. Escolha de 1 a 5 estrelas",
    d: "A nota reflete sua experiência completa: atendimento, prazo, clareza do orçamento e resultado final do serviço.",
  },
  {
    t: "3. Escreva o que aconteceu",
    d: "Comentários curtos e concretos ajudam mais: qual era o problema, o que foi feito e como o equipamento ficou depois.",
  },
  {
    t: "4. Marque a autorização de publicação",
    d: "Sem esse aceite nada é publicado. Publicamos apenas o primeiro nome, bairro e serviço — nunca telefone, endereço ou dados da OS.",
  },
  {
    t: "5. Aguarde a moderação",
    d: "Conferimos se a avaliação corresponde a um atendimento real. Depois de aprovada, ela aparece na página pública de avaliações e você recebe um aviso no WhatsApp.",
  },
];

const faqs = [
  {
    q: "Preciso ter conta no Google para avaliar?",
    a: "Não. Pelo site a avaliação leva menos de 1 minuto e não exige login. Se preferir, você também pode avaliar no Google Business Profile — as duas ajudam.",
  },
  {
    q: "Meus dados ficam públicos?",
    a: "Não. Publicamos apenas primeiro nome, bairro e serviço. Telefone, endereço, número da OS e contato ficam restritos ao nosso controle interno.",
  },
  {
    q: "Posso remover minha avaliação depois?",
    a: "Sim, a qualquer momento. Basta pedir pelo WhatsApp ou usar a página de exclusão de dados; retiramos a publicação em até 5 dias úteis.",
  },
  {
    q: "Perdi o link do WhatsApp, e agora?",
    a: "Você pode avaliar direto em /avaliar informando o número da OS que consta no PDF da Ordem de Serviço.",
  },
  {
    q: "Avaliação negativa é publicada?",
    a: "Publicamos avaliações autorizadas independentemente da nota. Antes disso, entramos em contato para tentar resolver o que não ficou bom — a garantia de 90 dias continua valendo.",
  },
];

export default function ComoAvaliar() {
  const reviewUrl = buildSiteReviewUrl({ medium: "qr" });

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const howToLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Como avaliar o atendimento da Técnico em Curitiba",
    step: steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.t.replace(/^\d+\.\s*/, ""),
      text: s.d,
    })),
  };

  return (
    <>
      <PageSEO
        title="Como Avaliar o Atendimento | Técnico em Curitiba"
        description="Passo a passo para avaliar o serviço com estrelas, autorizar a publicação do depoimento e entender como tratamos seus dados. Leva menos de 1 minuto."
        path="/como-avaliar"
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <Header />
      <main id="main-content" className="container mx-auto px-4 py-8">
        <Breadcrumbs
          emitSchema={false}
          items={[{ label: "Início", href: "/" }, { label: "Como avaliar" }]}
        />

        <section className="max-w-3xl mx-auto py-6 md:py-10">
          <h1 className="text-3xl md:text-5xl font-bold mb-3">
            Como avaliar o atendimento em 1 minuto
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            Sua avaliação ajuda outros moradores de Curitiba a encontrarem um técnico
            confiável — e nos ajuda a melhorar o que ainda pode ficar melhor.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mb-10">
            <Button size="lg" asChild>
              <a href={reviewUrl} target="_blank" rel="noopener noreferrer">
                <Star className="mr-2 h-5 w-5" /> Avaliar agora
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a
                href={`https://wa.me/${NAP_PHONE_DIGITS}?text=${encodeURIComponent("Olá! Quero avaliar o atendimento, pode me enviar o link?")}`}
                target="_blank"
                rel="noopener noreferrer"
                data-cta-location="como_avaliar_pedir_link"
              >
                <MessageCircle className="mr-2 h-5 w-5" /> Pedir o link no WhatsApp
              </a>
            </Button>
          </div>

          <h2 className="text-2xl font-bold mb-4">Passo a passo</h2>
          <ol className="space-y-4 mb-10">
            {steps.map((s) => (
              <li key={s.t} className="rounded-xl border p-4">
                <div className="font-semibold mb-1">{s.t}</div>
                <p className="text-muted-foreground">{s.d}</p>
              </li>
            ))}
          </ol>

          <div className="grid gap-4 sm:grid-cols-2 mb-10">
            <div className="rounded-xl border p-4 flex gap-3">
              <ShieldCheck className="h-5 w-5 shrink-0 text-primary mt-0.5" />
              <div>
                <div className="font-semibold">Publicação só com autorização</div>
                <div className="text-sm text-muted-foreground">
                  Nada vai ao ar sem o seu aceite explícito.
                </div>
              </div>
            </div>
            <div className="rounded-xl border p-4 flex gap-3">
              <Clock className="h-5 w-5 shrink-0 text-primary mt-0.5" />
              <div>
                <div className="font-semibold">Moderação em até 48h</div>
                <div className="text-sm text-muted-foreground">
                  Você recebe aviso no WhatsApp quando for publicada.
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-4">Dúvidas frequentes</h2>
          <div className="space-y-3 mb-10">
            {faqs.map((f) => (
              <details key={f.q} className="rounded-xl border p-4">
                <summary className="font-semibold cursor-pointer">{f.q}</summary>
                <p className="mt-2 text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>

          <p className="text-sm text-muted-foreground">
            Veja os depoimentos já publicados em{" "}
            <Link className="underline" to="/avaliacoes">/avaliacoes</Link> ou solicite a
            remoção dos seus dados em{" "}
            <Link className="underline" to="/exclusao-de-dados">/exclusao-de-dados</Link>.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
