import { Link } from "react-router-dom";
import { AlertTriangle, Clock, Laptop, Truck, Wifi } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageSEO } from "@/components/PageSEO";
import Breadcrumbs from "@/components/Breadcrumbs";
import SiteBaseSchema from "@/components/SiteBaseSchema";
import InlineTriageCTA from "@/components/InlineTriageCTA";
import { TechnicianAvailability } from "@/components/TechnicianAvailability";
import { NAP } from "@/lib/nap";

const SITE = "https://tecnicocuritiba.com.br";

const ROTAS = [
  {
    icon: Wifi,
    title: "Remoto — começa em minutos",
    desc: "Lentidão, vírus, e-mail, impressora em rede, sistema travando ou configuração. Iniciamos por acesso remoto assim que a triagem termina, sem esperar deslocamento.",
    location: "urgente_remoto",
    label: "Iniciar atendimento remoto",
    message: "Olá! É URGENTE e acho que dá para resolver remoto. Meu problema é: ",
  },
  {
    icon: Laptop,
    title: "Domicílio — mesmo dia conforme rota",
    desc: "Equipamento que não liga, tela preta, rede caindo ou máquina parada no escritório. Confirmamos bairro e o período disponível na agenda do dia.",
    location: "urgente_domicilio",
    label: "Pedir visita hoje",
    message: "Olá! É URGENTE e preciso de visita técnica hoje. Meu bairro e equipamento: ",
  },
  {
    icon: Truck,
    title: "Coleta — quando exige bancada",
    desc: "Reparo de placa, troca de peça, recuperação de dados e casos que não se resolvem no local. Retiramos no endereço e devolvemos após o serviço aprovado.",
    location: "urgente_coleta",
    label: "Agendar coleta rápida",
    message: "Olá! É URGENTE e preciso de coleta do equipamento. Endereço e equipamento: ",
  },
];

const FAQ = [
  {
    q: "Vocês atendem em regime de urgência?",
    a: "Sim, dentro do horário de funcionamento (Seg–Sáb, 08h às 20h) e conforme a agenda do dia. O atendimento remoto pode começar imediatamente após a triagem; a visita em domicílio depende da rota disponível no momento.",
  },
  {
    q: "Urgência tem preço diferente?",
    a: "O atendimento parte de R$ 99,99, com orçamento antes do reparo. Deslocamentos fora de Curitiba, horários estendidos ou coleta imediata podem ter condições específicas, sempre informadas e confirmadas antes do início.",
  },
  {
    q: "E se eu chamar fora do horário?",
    a: "A mensagem fica registrada e o retorno acontece na abertura seguinte. Para reduzir tempo perdido, envie já o equipamento, o bairro e o que está acontecendo — assim a triagem começa pronta.",
  },
  {
    q: "Como falo com vocês?",
    a: "O contato é exclusivamente pelo WhatsApp. Isso mantém o histórico do atendimento, o orçamento e as fotos do equipamento registrados em um só lugar, o que agiliza a aprovação e a garantia.",
  },
];

export default function Urgente() {
  const title = "Ajuda Técnica Urgente em Curitiba | Atendimento no Mesmo Dia";
  const description =
    "Precisa de técnico agora em Curitiba? Veja a disponibilidade do dia e siga para a triagem por WhatsApp: remoto imediato, visita no mesmo dia ou coleta, a partir de R$ 99,99.";

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Início", item: `${SITE}/` },
      { "@type": "ListItem", position: 2, name: "Ajuda urgente", item: `${SITE}/urgente` },
    ],
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
      <PageSEO title={title} description={description} path="/urgente" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <SiteBaseSchema />
      <Header />
      <main id="main-content" className="container mx-auto px-4 py-8">
        <Breadcrumbs
          emitSchema={false}
          items={[{ label: "Início", href: "/" }, { label: "Ajuda urgente" }]}
        />

        <section className="max-w-4xl mx-auto py-6 md:py-10">
          <p className="inline-flex items-center gap-2 rounded-full border border-destructive/40 bg-destructive/5 px-3 py-1 text-sm font-semibold text-destructive">
            <AlertTriangle className="h-4 w-4" aria-hidden />
            Atendimento prioritário
          </p>
          <h1 className="mt-3 text-3xl md:text-5xl font-bold mb-3">
            Ajuda técnica urgente em Curitiba, agora
          </h1>
          <p className="text-lg text-muted-foreground">
            Confira a disponibilidade do momento e escolha a modalidade mais rápida para o seu caso. A triagem leva
            menos de um minuto e já sai com equipamento, bairro e período combinados. {NAP.hoursLabel}.
          </p>

          <div className="mt-6">
            <TechnicianAvailability />
          </div>

          <InlineTriageCTA
            className="mt-6"
            location="urgente_hero"
            label="Falar agora com o técnico"
            message="Olá! É URGENTE. Preciso de atendimento hoje. Meu equipamento e bairro: "
            hint="Contato exclusivamente por WhatsApp — histórico, orçamento e garantia em um só lugar."
          />
        </section>

        <section className="max-w-4xl mx-auto pb-12" aria-labelledby="rotas-urgencia">
          <h2 id="rotas-urgencia" className="text-2xl md:text-3xl font-bold mb-4">
            Escolha o caminho mais rápido para o seu problema
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {ROTAS.map((r) => (
              <article key={r.location} className="rounded-2xl border bg-card p-5 flex flex-col">
                <r.icon className="h-6 w-6 text-primary mb-2" aria-hidden />
                <h3 className="text-lg font-semibold">{r.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground flex-1">{r.desc}</p>
                <InlineTriageCTA
                  className="mt-4"
                  location={r.location}
                  label={r.label}
                  message={r.message}
                />
              </article>
            ))}
          </div>
        </section>

        <section className="max-w-4xl mx-auto pb-12" aria-labelledby="ganhar-tempo">
          <h2 id="ganhar-tempo" className="text-2xl md:text-3xl font-bold mb-4">
            Enquanto o técnico confirma: ganhe tempo em 3 passos
          </h2>
          <ol className="space-y-3 text-muted-foreground">
            <li className="rounded-xl border bg-card p-4">
              <span className="font-semibold text-foreground">1. Descreva o sintoma exato.</span> Liga e desliga
              sozinho? Tela preta com ventoinha girando? Internet cai só à noite? O detalhe define a modalidade e o
              tempo de reparo.
            </li>
            <li className="rounded-xl border bg-card p-4">
              <span className="font-semibold text-foreground">2. Faça os testes seguros do checklist.</span> Parte dos
              chamados urgentes é resolvida com cabo, tomada ou reinício correto —{" "}
              <Link to="/checklists" className="text-primary hover:underline">baixe o checklist do seu caso</Link>.
            </li>
            <li className="rounded-xl border bg-card p-4">
              <span className="font-semibold text-foreground">3. Separe modelo e histórico.</span> Marca, modelo,
              quando começou e se houve queda de energia, upgrade ou conserto anterior. Isso encurta o diagnóstico e
              antecipa a peça necessária.
            </li>
          </ol>
          <p className="mt-4 text-sm text-muted-foreground">
            Sinal de risco: cheiro de queimado, estalo ou fumaça. Desligue da tomada, não volte a ligar e informe isso
            logo no início da triagem.
          </p>
        </section>

        <section className="max-w-4xl mx-auto pb-12" aria-labelledby="cobertura-urgencia">
          <h2 id="cobertura-urgencia" className="text-2xl md:text-3xl font-bold mb-4">
            Cobertura e tempo de deslocamento
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border p-4">
              <Clock className="h-5 w-5 text-primary mb-2" aria-hidden />
              <p className="font-semibold">Curitiba</p>
              <p className="text-sm text-muted-foreground">
                Rota frequente nas regiões central, norte, sul e oeste. Visita em domicílio geralmente no mesmo dia ou
                no dia seguinte, conforme a agenda.
              </p>
            </div>
            <div className="rounded-xl border p-4">
              <Truck className="h-5 w-5 text-primary mb-2" aria-hidden />
              <p className="font-semibold">Região Metropolitana</p>
              <p className="text-sm text-muted-foreground">
                São José dos Pinhais, Pinhais, Colombo, Araucária, Campo Largo e cidades vizinhas conforme rota do dia,
                com opção de coleta e entrega.
              </p>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-3 text-sm">
            <Link to="/areas-atendidas" className="text-primary hover:underline">Ver mapa e tempo estimado</Link>
            <Link to="/atendimento-remoto" className="text-primary hover:underline">Atendimento remoto</Link>
            <Link to="/coleta-e-entrega" className="text-primary hover:underline">Coleta e entrega</Link>
            <Link to="/precos-e-politicas" className="text-primary hover:underline">Preços e políticas</Link>
          </div>
        </section>

        <section className="max-w-4xl mx-auto pb-16" aria-labelledby="faq-urgente">
          <h2 id="faq-urgente" className="text-2xl md:text-3xl font-bold mb-4">
            Dúvidas sobre atendimento urgente
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
      </main>
      <Footer />
    </>
  );
}
