import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, HelpCircle, ArrowRight } from "lucide-react";

const SITE = "https://tecnicocuritiba.com.br";

const faqs = [
  {
    q: "A estimativa rápida já é o valor final do serviço?",
    a: "Não. A estimativa mostra a faixa provável com base no que você informa em 3 perguntas. O valor fechado sai depois da triagem e do diagnóstico, e nada é executado sem sua autorização.",
  },
  {
    q: "Quanto custa a visita técnica em Curitiba?",
    a: "A visita técnica começa em R$ 99,99, com orçamento apresentado antes da execução. Se o serviço for aprovado, o valor da visita é abatido conforme as políticas descritas nesta página.",
  },
  {
    q: "Em quanto tempo recebo uma resposta?",
    a: "O atendimento é feito por WhatsApp. Respondemos dentro do horário comercial, por ordem de chegada. Casos urgentes entram em fila prioritária quando há agenda disponível.",
  },
  {
    q: "Qual o prazo do serviço?",
    a: "Depende do escopo. Serviços de software costumam ser resolvidos no mesmo atendimento; casos com coleta, peças ou bancada têm prazo informado por escrito na abertura da OS.",
  },
  {
    q: "Dá para resolver por atendimento remoto?",
    a: "Sim, quando o problema é de software e o equipamento liga e conecta à internet. Se o diagnóstico apontar falha física, migramos para atendimento no local ou coleta.",
  },
  {
    q: "Como funciona a garantia e o pagamento?",
    a: "A mão de obra tem garantia por escrito e as peças seguem a garantia do fabricante. O pagamento é feito após a conclusão, por PIX, cartão ou dinheiro.",
  },
];

const relatedLinks = [
  { to: "/servicos/formatacao-computador", label: "Formatação de computador" },
  { to: "/servicos/conserto-notebook-curitiba", label: "Conserto de notebook" },
  { to: "/servicos/remocao-virus", label: "Remoção de vírus" },
  { to: "/servicos/upgrade-ssd-memoria", label: "Upgrade de SSD e memória" },
  { to: "/servicos/redes-wifi", label: "Redes e Wi-Fi" },
  { to: "/servicos/conserto-monitor", label: "Conserto de monitor" },
  { to: "/servicos/montagem-pc", label: "Montagem de PC" },
  { to: "/coleta-e-entrega", label: "Coleta e entrega" },
  { to: "/areas-atendidas", label: "Áreas atendidas" },
  { to: "/como-funciona", label: "Como funciona o atendimento" },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${SITE}/precos-e-politicas#faq`,
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export const PrecosFaqLinks = () => {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq-precos" className="scroll-mt-24 py-12 bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div className="container mx-auto">
        <div className="mx-auto max-w-3xl">
          <div className="mb-6 flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-primary" />
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              Dúvidas sobre valores, prazos e disponibilidade
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((f, i) => (
              <div key={f.q} className="rounded-xl border border-border bg-card">
                <button
                  type="button"
                  onClick={() => setOpen(open === i ? null : i)}
                  aria-expanded={open === i}
                  className="flex w-full items-center justify-between gap-3 px-4 py-4 text-left"
                >
                  <span className="font-semibold text-foreground">{f.q}</span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform ${open === i ? "rotate-180" : ""}`}
                  />
                </button>
                {open === i && (
                  <p className="px-4 pb-4 text-muted-foreground leading-relaxed">{f.a}</p>
                )}
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-xl border border-border bg-card p-5">
            <h3 className="mb-3 text-lg font-bold text-foreground">Páginas relacionadas ao seu cenário</h3>
            <ul className="grid gap-2 sm:grid-cols-2">
              {relatedLinks.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                  >
                    <ArrowRight className="h-4 w-4" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrecosFaqLinks;
