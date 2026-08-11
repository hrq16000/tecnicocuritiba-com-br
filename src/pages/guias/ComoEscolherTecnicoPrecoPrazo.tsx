import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageSEO } from "@/components/PageSEO";
import Breadcrumbs from "@/components/Breadcrumbs";
import PageSummaryBand from "@/components/PageSummaryBand";
import { Button } from "@/components/ui/button";
import { trackCTAClick } from "@/lib/analytics";
import {
  MessageCircle,
  CheckCircle,
  AlertTriangle,
  Clock,
  Wallet,
  ShieldCheck,
  FileText,
} from "lucide-react";

const PATH = "/guias/como-escolher-tecnico-preco-prazo";
const URL = `https://tecnicocuritiba.com.br${PATH}`;

const WA =
  "https://wa.me/5541997452053?text=" +
  encodeURIComponent(
    "Olá! Li o guia de como escolher técnico por preço e prazo e quero um orçamento.",
  ) +
  "&utm_source=site&utm_medium=guia&utm_campaign=como-escolher-tecnico-preco-prazo";

const faqs = [
  {
    q: "Qual o preço médio de um técnico de informática em Curitiba?",
    a: "O atendimento começa em R$ 99,99. Esse valor cobre o deslocamento e o diagnóstico; peças e serviços adicionais são orçados antes da execução e só seguem depois da sua aprovação por escrito no WhatsApp.",
  },
  {
    q: "Orçamento mais barato é sempre a melhor escolha?",
    a: "Não. Compare o que está incluído: diagnóstico, mão de obra, peça, prazo de garantia e se o valor do diagnóstico é abatido no serviço. Um orçamento sem garantia por escrito costuma sair mais caro no segundo defeito.",
  },
  {
    q: "Quanto tempo leva o conserto de um computador?",
    a: "Problemas de software (lentidão, vírus, formatação, configuração) normalmente são resolvidos no mesmo atendimento. Troca de peça depende da disponibilidade do componente. Reparo de placa em bancada exige avaliação e prazo informado após o diagnóstico.",
  },
  {
    q: "Vale a pena consertar ou é melhor comprar outro?",
    a: "A regra prática que usamos: quando o custo do reparo passa de cerca de um terço do valor de um equipamento equivalente novo, avaliamos junto com você se compensa. Dizemos quando não compensa, mesmo perdendo o serviço.",
  },
  {
    q: "O que precisa estar por escrito antes de autorizar o serviço?",
    a: "Valor total, o que está incluído, prazo estimado, prazo de garantia e a condição de peças fornecidas pelo cliente. Tudo isso é registrado no WhatsApp antes de qualquer execução.",
  },
  {
    q: "Existe garantia da mão de obra e da peça?",
    a: "Sim, e elas são distintas. A mão de obra tem garantia de 90 dias. A peça segue a garantia do fabricante ou fornecedor; quando a peça é fornecida pelo cliente, garantimos apenas o serviço executado.",
  },
];

const criterios = [
  {
    icon: Wallet,
    t: "Preço com escopo fechado",
    d: "Peça o valor total com o que está incluído. Valor 'a partir de' sem escopo é o principal motivo de surpresa na hora de pagar.",
  },
  {
    icon: Clock,
    t: "Prazo realista",
    d: "Software costuma sair no mesmo atendimento; peça depende de disponibilidade; reparo em bancada exige diagnóstico antes do prazo.",
  },
  {
    icon: ShieldCheck,
    t: "Garantia separada",
    d: "Garantia de mão de obra e garantia de peça são coisas diferentes. Exija as duas descritas, com prazo em dias.",
  },
  {
    icon: FileText,
    t: "Registro por escrito",
    d: "Orçamento, autorização e entrega registrados no WhatsApp. Sem registro, não há como cobrar garantia depois.",
  },
];

export default function ComoEscolherTecnicoPrecoPrazo() {
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Como escolher o técnico de informática pelo preço e pelo prazo",
    description:
      "Guia comparativo para avaliar orçamento, prazo, garantia e registro por escrito antes de contratar um técnico de informática em Curitiba.",
    mainEntityOfPage: URL,
    inLanguage: "pt-BR",
    author: { "@type": "Organization", name: "Técnico em Curitiba" },
    publisher: { "@type": "Organization", name: "Técnico em Curitiba" },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Início", item: "https://tecnicocuritiba.com.br/" },
      { "@type": "ListItem", position: 2, name: "Guias", item: "https://tecnicocuritiba.com.br/guia-tecnico-informatica" },
      { "@type": "ListItem", position: 3, name: "Como escolher pelo preço e prazo", item: URL },
    ],
  };

  return (
    <>
      <PageSEO
        title="Como Escolher Técnico de Informática por Preço e Prazo"
        description="Guia comparativo para contratar técnico de informática em Curitiba: o que o preço deve incluir, prazos reais por tipo de serviço, garantia de peça x mão de obra e checklist antes de autorizar."
        path={PATH}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <Header />
      <main id="main-content" className="container mx-auto px-4 py-8">
        <Breadcrumbs
          emitSchema={false}
          items={[
            { label: "Início", href: "/" },
            { label: "Guia técnico de informática", href: "/guia-tecnico-informatica" },
            { label: "Como escolher pelo preço e prazo" },
          ]}
        />

        <article className="max-w-3xl mx-auto py-8 md:py-12">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Como escolher o técnico de informática pelo preço e pelo prazo
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            Dois orçamentos com o mesmo valor podem ser completamente diferentes. O que muda é o
            que está incluído, o prazo real de execução e o que a garantia cobre. Este guia mostra
            como comparar propostas de assistência técnica em Curitiba sem cair no preço baixo que
            vira retrabalho — e o que exigir por escrito antes de autorizar qualquer serviço.
          </p>

          <div className="mb-10">
            <Button size="lg" asChild data-cta-location="guia_preco_prazo_hero">
              <a
                href={WA}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackCTAClick("whatsapp", "guia_preco_prazo_hero")}
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Pedir orçamento com escopo fechado
              </a>
            </Button>
          </div>

          <PageSummaryBand
            summary="Como comparar orçamento, prazo e garantia de um técnico de informática em Curitiba, com faixas de preço por tipo de serviço, sinais de alerta e checklist antes de autorizar."
            items={[
              { id: "criterios", label: "4 critérios de comparação" },
              { id: "precos", label: "Preço por tipo de serviço" },
              { id: "prazos", label: "Prazos reais" },
              { id: "garantia", label: "Garantia: peça x mão de obra" },
              { id: "alertas", label: "Sinais de alerta" },
              { id: "checklist", label: "Checklist antes de autorizar" },
              { id: "proximos-passos", label: "Por onde começar" },
              { id: "faq", label: "Perguntas frequentes" },
            ]}
          />

          <h2 id="criterios" className="text-2xl font-bold mb-3 scroll-mt-24">
            Os 4 critérios que realmente diferenciam um orçamento
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 mb-6">
            {criterios.map((c) => (
              <div key={c.t} className="rounded-xl border p-4 flex gap-3">
                <c.icon className="h-5 w-5 shrink-0 text-primary mt-0.5" aria-hidden />
                <div>
                  <div className="font-semibold">{c.t}</div>
                  <div className="text-sm text-muted-foreground">{c.d}</div>
                </div>
              </div>
            ))}
          </div>
          <p className="mb-6 text-muted-foreground">
            Preço isolado não diz nada. Um atendimento de R$ 99,99 com diagnóstico incluído,
            garantia de 90 dias na mão de obra e prazo informado antes da execução vale mais que
            uma proposta “mais barata” sem escopo, sem prazo e sem registro.
          </p>

          <h2 id="precos" className="text-2xl font-bold mb-3 scroll-mt-24">
            O que o preço deve incluir em cada tipo de serviço
          </h2>
          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm border-collapse">
              <caption className="sr-only">
                Comparativo do que deve estar incluído no preço por tipo de serviço
              </caption>
              <thead>
                <tr className="text-left border-b">
                  <th scope="col" className="py-2 pr-4 font-semibold">Serviço</th>
                  <th scope="col" className="py-2 pr-4 font-semibold">Deve estar incluído</th>
                  <th scope="col" className="py-2 font-semibold">Cobrado à parte</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                {[
                  ["Diagnóstico e atendimento", "Deslocamento na região atendida, avaliação e orientação", "Peças e serviços aprovados depois"],
                  ["Formatação e limpeza de software", "Backup combinado, instalação, drivers e testes", "Licenças e programas pagos"],
                  ["Troca de SSD ou memória", "Mão de obra, instalação e migração combinada", "A peça, com garantia do fabricante"],
                  ["Limpeza física e pasta térmica", "Desmontagem, limpeza, insumos e teste térmico", "Peças danificadas encontradas"],
                  ["Reparo de placa em bancada", "Avaliação técnica e laudo do que foi encontrado", "Componentes e reparo aprovado"],
                ].map((row) => (
                  <tr key={row[0]} className="border-b last:border-0 align-top">
                    <th scope="row" className="py-2 pr-4 font-medium text-foreground">{row[0]}</th>
                    <td className="py-2 pr-4">{row[1]}</td>
                    <td className="py-2">{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mb-6 text-muted-foreground">
            Os valores praticados e as condições de coleta estão detalhados em{" "}
            <Link className="underline" to="/precos">preços e políticas</Link>. Nenhum serviço é
            executado antes da sua aprovação.
          </p>

          <h2 id="prazos" className="text-2xl font-bold mb-3 scroll-mt-24">
            Prazos reais por tipo de problema
          </h2>
          <ul className="mb-6 space-y-2">
            {[
              "Software (lentidão, vírus, formatação, configuração): normalmente resolvido no mesmo atendimento.",
              "Troca de peça comum (SSD, memória, fonte): mesmo dia quando o componente está disponível.",
              "Peça específica sob encomenda (tela, teclado, bateria): prazo informado junto com o orçamento.",
              "Reparo de placa em bancada: prazo definido só depois do diagnóstico, porque depende do que foi encontrado.",
            ].map((t) => (
              <li key={t} className="flex gap-2">
                <CheckCircle className="h-5 w-5 shrink-0 text-primary mt-0.5" aria-hidden />
                <span className="text-muted-foreground">{t}</span>
              </li>
            ))}
          </ul>
          <p className="mb-6 text-muted-foreground">
            Quem promete prazo fechado para reparo de placa antes de abrir o equipamento está
            chutando. O caminho honesto é diagnóstico primeiro, prazo depois — como descrevemos em{" "}
            <Link className="underline" to="/servicos/conserto-placa">conserto de placa</Link>.
          </p>

          <h2 id="garantia" className="text-2xl font-bold mb-3 scroll-mt-24">
            Garantia da peça x garantia da mão de obra
          </h2>
          <p className="mb-4 text-muted-foreground">
            São duas garantias diferentes e é aí que a maioria das discussões nasce. A{" "}
            <strong>mão de obra</strong> tem garantia de 90 dias sobre o serviço executado. A{" "}
            <strong>peça</strong> segue a garantia do fabricante ou do fornecedor que a vendeu.
            Quando a peça é comprada pelo cliente, garantimos apenas o serviço — as condições estão
            na{" "}
            <Link className="underline" to="/politica-pecas-cliente">política de peças do cliente</Link>.
          </p>

          <h2 id="alertas" className="text-2xl font-bold mb-3 scroll-mt-24">Sinais de alerta em um orçamento</h2>
          <div className="rounded-xl border border-amber-500/40 bg-amber-500/5 p-4 mb-6 flex gap-3">
            <AlertTriangle className="h-5 w-5 shrink-0 text-amber-500 mt-0.5" aria-hidden />
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Preço fechado por telefone sem ver o equipamento nem descrever o defeito.</li>
              <li>Recusa em detalhar o que está incluído ou em informar o prazo de garantia.</li>
              <li>Pagamento integral antecipado antes do diagnóstico.</li>
              <li>Promessa de “deixar o computador novo” sem dizer o que será feito.</li>
              <li>Nenhum registro escrito da autorização e do que foi entregue.</li>
            </ul>
          </div>

          <h2 id="checklist" className="text-2xl font-bold mb-3 scroll-mt-24">
            Checklist antes de autorizar o serviço
          </h2>
          <ul className="mb-6 space-y-2">
            {[
              "O valor total e o que está incluído estão escritos?",
              "O prazo estimado foi informado (ou o critério para defini-lo)?",
              "A garantia da mão de obra e a da peça estão descritas em dias?",
              "Foi combinado o que acontece se o defeito for outro depois de aberto?",
              "Existe combinação sobre backup dos seus dados antes de qualquer intervenção?",
            ].map((t) => (
              <li key={t} className="flex gap-2">
                <CheckCircle className="h-5 w-5 shrink-0 text-primary mt-0.5" aria-hidden />
                <span className="text-muted-foreground">{t}</span>
              </li>
            ))}
          </ul>

          <h2 id="proximos-passos" className="text-2xl font-bold mb-3 scroll-mt-24">Por onde começar</h2>
          <p className="mb-4 text-muted-foreground">
            Se você já sabe o sintoma, vá direto pela página correspondente e receba a triagem certa:{" "}
            <Link className="underline" to="/servicos/computador-lento">computador lento</Link>,{" "}
            <Link className="underline" to="/servicos/computador-nao-liga">computador não liga</Link> ou{" "}
            <Link className="underline" to="/servicos/conserto-monitor">conserto de monitor</Link>.
            Para entender o panorama completo do atendimento, veja o{" "}
            <Link className="underline" to="/guia-tecnico-informatica">guia do técnico de informática</Link>{" "}
            e a página de{" "}
            <Link className="underline" to="/tecnico-informatica-curitiba">técnico de informática em Curitiba</Link>.
          </p>
          <div className="mb-10">
            <Button size="lg" asChild data-cta-location="guia_preco_prazo_final">
              <a
                href={WA}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackCTAClick("whatsapp", "guia_preco_prazo_final")}
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Falar com o técnico no WhatsApp
              </a>
            </Button>
          </div>

          <h2 id="faq" className="text-2xl font-bold mb-4 scroll-mt-24">Perguntas frequentes</h2>
          <div className="space-y-4 mb-4">
            {faqs.map((f) => (
              <div key={f.q} className="rounded-xl border p-4">
                <h3 className="font-semibold mb-1">{f.q}</h3>
                <p className="text-sm text-muted-foreground">{f.a}</p>
              </div>
            ))}
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
