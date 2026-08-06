import { useEffect } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, ClipboardCheck, Cpu, MessageCircle, Package, Timer, Wrench } from "lucide-react";

import { PageSEO } from "@/components/PageSEO";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { trackPageView, trackCTAClick } from "@/lib/analytics";
import { NAP_PHONE_DIGITS } from "@/lib/nap";

const PATH = "/servicos/montagem-pc/como-funciona";

const ETAPAS = [
  {
    icon: MessageCircle,
    titulo: "1. Briefing e orçamento",
    prazo: "Mesmo dia útil",
    texto:
      "Você descreve o uso pretendido (jogos, edição, trabalho) e o que já tem de peças. Retornamos com a lista de compatibilidade e o valor da mão de obra a partir de R$ 99,99. Nada é executado antes da sua aprovação.",
  },
  {
    icon: Package,
    titulo: "2. Conferência das peças",
    prazo: "1 dia útil após a chegada das peças",
    texto:
      "Peças suas ou compradas por você são conferidas item a item: compatibilidade elétrica e mecânica, lacres, integridade física e sinais de uso. Qualquer divergência é registrada e fotografada antes da montagem.",
  },
  {
    icon: Wrench,
    titulo: "3. Montagem",
    prazo: "1 dia útil",
    texto:
      "Instalação da placa-mãe, CPU, cooler com pasta térmica aplicada corretamente, memórias nos slots certos, armazenamento, fonte e cable management. Fluxo de ar planejado conforme o gabinete.",
  },
  {
    icon: Cpu,
    titulo: "4. BIOS/UEFI e drivers oficiais",
    prazo: "Mesmo dia da montagem",
    texto:
      "Atualização de BIOS/UEFI quando necessário, ativação do perfil de memória homologado pelo fabricante, instalação do sistema e apenas drivers oficiais. Sem overclock e sem promessa de FPS.",
  },
  {
    icon: ClipboardCheck,
    titulo: "5. Testes e validação",
    prazo: "2 a 4 horas de teste",
    texto:
      "Teste de carga de CPU e GPU, verificação de temperaturas, leitura SMART do armazenamento, teste de memória e checagem de estabilidade sob uso contínuo. O resultado vai no checklist de entrega.",
  },
  {
    icon: CheckCircle2,
    titulo: "6. Entrega com checklist",
    prazo: "Total: 1 a 2 dias úteis com todas as peças em mãos",
    texto:
      "Você recebe o computador com o checklist técnico preenchido e a garantia de 90 dias sobre a mão de obra de montagem e configuração. A garantia da peça permanece com o fabricante ou vendedor.",
  },
];

const FAQS = [
  {
    question: "Quanto tempo demora a montagem de um PC gamer em Curitiba?",
    answer:
      "Com todas as peças em mãos, de 1 a 2 dias úteis, incluindo o tempo de teste de carga. Se faltar alguma peça, o prazo passa a contar a partir da chegada do último item.",
  },
  {
    question: "Posso fornecer as minhas próprias peças?",
    answer:
      "Sim, sem restrição de procedência. Conferimos compatibilidade e integridade antes de montar. A garantia da peça é do fabricante ou vendedor; a nossa cobre a mão de obra de montagem e configuração por 90 dias.",
  },
  {
    question: "Vocês fazem overclock ou garantem desempenho em FPS?",
    answer:
      "Não. Trabalhamos dentro das especificações do fabricante. Garantimos montagem correta, estabilidade em teste de carga e temperaturas dentro do esperado para os componentes usados.",
  },
  {
    question: "Qual o valor do serviço de montagem?",
    answer:
      "A mão de obra parte de R$ 99,99 e o valor final é sempre informado e aprovado antes da execução, conforme a complexidade da montagem e a quantidade de componentes.",
  },
  {
    question: "O que recebo no final do serviço?",
    answer:
      "O computador montado, testado e configurado, mais o checklist técnico de entrega em PDF com BIOS/UEFI, drivers, testes realizados e temperaturas registradas.",
  },
];

const MontagemPcComoFunciona = () => {
  useEffect(() => {
    trackPageView(PATH, "Como funciona a montagem de PC");
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.setAttribute("data-schema", "faq-montagem-como-funciona");
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQS.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    });
    document.head.appendChild(script);
    return () => {
      script.remove();
    };
  }, []);

  const whatsapp = () => {
    trackCTAClick("whatsapp", "montagem_pc_como_funciona", {
      servico: "montagem_pc",
      cidade: "Curitiba",
    });
    const msg = encodeURIComponent(
      "Olá! Vim do site tecnicocuritiba.com.br.\nAssunto: Montagem de PC — quero entender prazos e orçamento.\n[ref: como-funciona/montagem-pc]",
    );
    window.open(`https://wa.me/${NAP_PHONE_DIGITS}?text=${msg}`, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen bg-background">
      <PageSEO
        title="Como Funciona a Montagem de PC Gamer em Curitiba | Etapas e Prazos"
        description="Passo a passo da montagem de PC gamer e desktop em Curitiba: briefing, conferência de peças, montagem, BIOS/UEFI, drivers oficiais, testes de carga e entrega com checklist em 1 a 2 dias úteis."
        path={PATH}
        breadcrumbs={[
          { name: "Início", path: "/" },
          { name: "Serviços", path: "/servicos" },
          { name: "Montagem de PC", path: "/servicos/montagem-pc" },
          { name: "Como funciona", path: PATH },
        ]}
      />
      <Header />

      <main>
        <div className="container mx-auto px-4 pt-24">
          <Breadcrumbs
            items={[
              { label: "Início", href: "/" },
              { label: "Serviços", href: "/servicos" },
              { label: "Montagem de PC", href: "/servicos/montagem-pc" },
              { label: "Como funciona", href: PATH },
            ]}
            emitSchema={false}
          />
        </div>

        <section className="container mx-auto px-4 py-10">
          <h1 className="text-3xl md:text-4xl font-black text-foreground max-w-3xl">
            Como funciona a montagem de PC gamer e desktop em Curitiba
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl">
            Cada etapa do serviço, o que é verificado e o prazo estimado — do primeiro contato no WhatsApp até a
            entrega com checklist técnico. Atendemos Curitiba, São José dos Pinhais e região metropolitana.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <span data-cta-location="montagem_pc_como_funciona">
              <Button
                onClick={whatsapp}
                className="w-full sm:w-auto bg-[hsl(var(--whatsapp))] hover:bg-[hsl(var(--whatsapp-hover))] text-white"
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                Falar no WhatsApp
              </Button>
            </span>
            <Button asChild variant="outline" className="border-border text-foreground hover:bg-secondary">
              <Link to="/servicos/montagem-pc#orcamento-wizard">Montar meu orçamento no site</Link>
            </Button>
          </div>
        </section>

        <section className="container mx-auto px-4 pb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Etapas do atendimento e prazos estimados</h2>
          <ol className="grid gap-4 md:grid-cols-2">
            {ETAPAS.map((e) => (
              <li key={e.titulo} className="rounded-2xl border border-border bg-secondary p-5">
                <div className="flex items-center gap-3">
                  <e.icon className="h-5 w-5 text-accent shrink-0" />
                  <h3 className="font-bold text-foreground">{e.titulo}</h3>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{e.texto}</p>
                <p className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-foreground">
                  <Timer className="h-4 w-4 text-accent" />
                  {e.prazo}
                </p>
              </li>
            ))}
          </ol>
        </section>

        <section className="container mx-auto px-4 pb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4">Limites do serviço (transparência)</h2>
          <ul className="space-y-2 text-muted-foreground max-w-3xl">
            <li>• Não prometemos FPS, benchmark mínimo nem fazemos overclock.</li>
            <li>• Peças fornecidas por você seguem a{" "}
              <Link to="/politica-pecas-cliente" className="text-primary underline underline-offset-4">
                política de peças do cliente
              </Link>
              : garantia da peça é do vendedor.
            </li>
            <li>• Peças aguardando chegada ficam armazenadas por até 10 dias corridos.</li>
            <li>• Todo orçamento é aprovado antes da execução; mão de obra a partir de R$ 99,99.</li>
          </ul>
        </section>

        <section className="container mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-foreground mb-4">Perguntas frequentes sobre montagem de PC</h2>
          <div className="space-y-3 max-w-3xl">
            {FAQS.map((f) => (
              <details key={f.question} className="rounded-xl border border-border bg-secondary p-4">
                <summary className="cursor-pointer font-semibold text-foreground">{f.question}</summary>
                <p className="mt-2 text-sm text-muted-foreground">{f.answer}</p>
              </details>
            ))}
          </div>
          <p className="mt-8 text-muted-foreground">
            Veja também:{" "}
            <Link to="/servicos/montagem-pc" className="text-primary underline underline-offset-4">
              montagem de PC em Curitiba
            </Link>
            {" · "}
            <Link to="/servicos/upgrade-ssd-memoria" className="text-primary underline underline-offset-4">
              upgrade de SSD e memória
            </Link>
            {" · "}
            <Link to="/valores" className="text-primary underline underline-offset-4">
              tabela de valores
            </Link>
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default MontagemPcComoFunciona;
