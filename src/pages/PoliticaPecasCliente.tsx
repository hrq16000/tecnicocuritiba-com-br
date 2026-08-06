import { useEffect } from "react";
import { Link } from "react-router-dom";
import { PageSEO } from "@/components/PageSEO";
import { ServiceLandingSchema } from "@/components/ServiceLandingSchema";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { trackPageView, trackCTAClick } from "@/lib/analytics";
import { buildWhatsAppUrl } from "@/lib/whatsappMessage";
import {
  CheckCircle,
  AlertTriangle,
  ShieldCheck,
  Clock,
  PackageSearch,
  Calculator,
  MessageCircle,
} from "lucide-react";

const PATH = "/politica-pecas-cliente";

const FAQS = [
  {
    question: "Vocês aceitam peças fornecidas pelo cliente?",
    answer:
      "Sim, sem restrição de procedência. Antes de montar, conferimos compatibilidade elétrica e mecânica, integridade física e sinais de uso. Qualquer divergência é registrada e comunicada por escrito no WhatsApp antes de prosseguir.",
  },
  {
    question: "Quem cobre a garantia se a peça do cliente apresentar defeito?",
    answer:
      "A garantia da peça é sempre do fabricante ou do vendedor que a forneceu. A nossa garantia de 90 dias cobre exclusivamente a mão de obra de montagem e configuração, não o componente em si.",
  },
  {
    question: "Qual o prazo para troca de uma peça reprovada na conferência?",
    answer:
      "O equipamento fica aguardando a peça substituta por até 10 dias corridos sem custo de armazenagem. Após esse prazo, combinamos por WhatsApp a devolução no estado ou a continuidade do serviço.",
  },
  {
    question: "Vocês garantem desempenho, FPS ou fazem overclock?",
    answer:
      "Não. Trabalhamos dentro das especificações do fabricante. Garantimos montagem correta, drivers oficiais, temperaturas dentro do esperado e estabilidade sob teste de carga — não números de desempenho.",
  },
  {
    question: "Como é avaliado o valor do meu equipamento?",
    answer:
      "A avaliação técnica considera idade, estado de conservação, geração dos componentes e valor de mercado de usados. Em sinistro, venda no estado ou indenização, o valor apurado pode ser inferior a 1/3 do valor de nota fiscal.",
  },
];

export default function PoliticaPecasCliente() {
  useEffect(() => {
    trackPageView(PATH, "Política de Peças do Cliente");
  }, []);

  const waHref = buildWhatsAppUrl({
    servicoLabel: "montagem com peças próprias",
    fallback:
      "Olá! Li a política de peças do cliente e quero montar meu PC com peças que eu mesmo vou fornecer.",
  });

  return (
    <div className="min-h-screen bg-background">
      <PageSEO
        title="Política de Peças do Cliente | Montagem de PC em Curitiba"
        description="Regras claras para peças fornecidas pelo cliente: compatibilidade, procedência, integridade, prazos de troca e a diferença entre garantia da peça e garantia da mão de obra."
        path={PATH}
        breadcrumbs={[
          { name: "Início", path: "/" },
          { name: "Serviços", path: "/servicos" },
          { name: "Política de Peças do Cliente", path: PATH },
        ]}
      />
      <ServiceLandingSchema
        serviceName="Montagem com peças fornecidas pelo cliente"
        description="Conferência de compatibilidade, procedência e integridade de peças fornecidas pelo cliente, montagem, configuração de BIOS/UEFI, drivers oficiais e testes de estabilidade em Curitiba e região."
        path={PATH}
        priceFrom={99.99}
        category="Montagem de Computadores"
        faqs={FAQS}
      />
      <Header />
      <Breadcrumbs
        items={[
          { label: "Serviços", href: "/servicos" },
          { label: "Política de Peças do Cliente" },
        ]}
      />

      <main id="main-content">
        <section className="container mx-auto px-4 py-10 md:py-14 max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-foreground">
            Política de Peças do Cliente
          </h1>
          <p className="tldr text-lg text-muted-foreground mb-8" data-speakable>
            Você pode fornecer suas próprias peças. Conferimos compatibilidade, procedência e
            integridade antes de montar, registramos tudo por escrito e deixamos claro o que a
            garantia da peça cobre e o que a garantia da mão de obra cobre. Serviço a partir de
            R$ 99,99 em Curitiba e região.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mb-12">
            <Button size="lg" asChild data-cta-location="politica_pecas_hero">
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackCTAClick("whatsapp", "politica_pecas_hero")}
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Tirar dúvida no WhatsApp
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/servicos/montagem-pc">Ver serviço de montagem</Link>
            </Button>
          </div>

          <h2 className="text-2xl font-bold mb-3 flex items-center gap-2 text-foreground">
            <PackageSearch className="h-6 w-6 text-primary" aria-hidden />
            1. Compatibilidade
          </h2>
          <ul className="space-y-2 mb-10 text-muted-foreground">
            <li className="flex gap-2">
              <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" aria-hidden />
              Conferência de soquete, chipset, padrão e capacidade de memória, formato da placa,
              comprimento da GPU, altura do cooler e folga do gabinete.
            </li>
            <li className="flex gap-2">
              <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" aria-hidden />
              Cálculo de consumo e conferência de conectores da fonte (24 pinos, EPS e PCIe).
            </li>
            <li className="flex gap-2">
              <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" aria-hidden />
              Peças incompatíveis não são forçadas nem adaptadas. Informamos e aguardamos a troca.
            </li>
          </ul>

          <h2 className="text-2xl font-bold mb-3 flex items-center gap-2 text-foreground">
            <ShieldCheck className="h-6 w-6 text-primary" aria-hidden />
            2. Procedência
          </h2>
          <ul className="space-y-2 mb-10 text-muted-foreground">
            <li className="flex gap-2">
              <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" aria-hidden />
              Aceitamos peças novas, usadas ou recondicionadas. Recomendamos guardar nota fiscal
              ou comprovante de compra — é o que garante a troca junto ao vendedor.
            </li>
            <li className="flex gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" aria-hidden />
              Não realizamos montagem com componentes de origem manifestamente ilícita. Havendo
              indício, o serviço é interrompido e o equipamento devolvido no estado.
            </li>
          </ul>

          <h2 className="text-2xl font-bold mb-3 flex items-center gap-2 text-foreground">
            <CheckCircle className="h-6 w-6 text-primary" aria-hidden />
            3. Integridade
          </h2>
          <ul className="space-y-2 mb-10 text-muted-foreground">
            <li className="flex gap-2">
              <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" aria-hidden />
              Inspeção visual registrada em foto: pinos tortos, trilhas rompidas, capacitores
              estufados, oxidação, marcas de calor e lacres violados.
            </li>
            <li className="flex gap-2">
              <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" aria-hidden />
              Peça com avaria prévia é documentada antes da montagem. Não assumimos
              responsabilidade por defeito já existente no componente entregue.
            </li>
          </ul>

          <h2 className="text-2xl font-bold mb-3 flex items-center gap-2 text-foreground">
            <Clock className="h-6 w-6 text-primary" aria-hidden />
            4. Prazos de troca e permanência
          </h2>
          <div className="overflow-x-auto mb-10">
            <table className="w-full text-sm border rounded-xl overflow-hidden">
              <thead className="bg-muted text-foreground">
                <tr>
                  <th className="text-left p-3">Situação</th>
                  <th className="text-left p-3">Prazo</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="p-3">Conferência das peças recebidas</td>
                  <td className="p-3">Até 1 dia útil</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3">Aguardando peça substituta do cliente</td>
                  <td className="p-3">Até 10 dias corridos sem custo</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3">Montagem completa com peças aprovadas</td>
                  <td className="p-3">1 a 2 dias úteis (inclui stress test)</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3">Retirada após aviso de conclusão</td>
                  <td className="p-3">Até 30 dias corridos</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold mb-3 flex items-center gap-2 text-foreground">
            <ShieldCheck className="h-6 w-6 text-primary" aria-hidden />
            5. Garantia da peça x garantia da mão de obra
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 mb-10">
            <div className="rounded-xl border p-4">
              <div className="font-semibold mb-2 text-foreground">Garantia da peça</div>
              <p className="text-sm text-muted-foreground">
                Responsabilidade do fabricante ou do vendedor que emitiu a nota. Prazo, logística e
                aprovação de troca seguem as regras deles. Auxiliamos com o laudo técnico do
                defeito, mas não substituímos nem indenizamos o componente.
              </p>
            </div>
            <div className="rounded-xl border p-4">
              <div className="font-semibold mb-2 text-foreground">Garantia da mão de obra — 90 dias</div>
              <p className="text-sm text-muted-foreground">
                Cobre montagem, cabeamento, configuração de BIOS/UEFI, instalação de drivers
                oficiais e ajustes dentro das especificações do fabricante. Não cobre overclock,
                uso inadequado, queda, surto elétrico, líquidos ou alteração feita por terceiros.
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-3 flex items-center gap-2 text-foreground">
            <Calculator className="h-6 w-6 text-primary" aria-hidden />
            6. Valor do equipamento, seguro e venda no estado
          </h2>
          <p className="text-muted-foreground mb-4">
            Eletrônicos, informática, som, placas e componentes eletrônicos sofrem depreciação
            acelerada. O valor que você pagou na compra não é o valor técnico atual do equipamento.
            Use a referência abaixo para mensurar antes de declarar valor em seguro, em transporte
            ou em uma venda no estado.
          </p>
          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm border rounded-xl overflow-hidden">
              <thead className="bg-muted text-foreground">
                <tr>
                  <th className="text-left p-3">Idade do equipamento</th>
                  <th className="text-left p-3">Faixa usual de valor técnico</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="p-3">Até 1 ano, funcionando</td>
                  <td className="p-3">50% a 70% do valor de nota</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3">2 a 3 anos, funcionando</td>
                  <td className="p-3">30% a 50% do valor de nota</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3">4 anos ou mais, funcionando</td>
                  <td className="p-3">10% a 25% do valor de nota</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3">Com defeito, sinistro ou venda no estado</td>
                  <td className="p-3">Pode ficar abaixo de 1/3 da faixa acima</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="rounded-xl border border-amber-500/40 bg-amber-500/5 p-4 mb-10">
            <p className="text-sm">
              <strong>Ciência do cliente:</strong> ao declarar que “meu equipamento vale R$ X”, você
              entende, aceita e está ciente de que, em caso de eventual sinistro, dano ou venda do
              equipamento no estado, o valor pago pela seguradora ou por terceiros poderá ser
              inferior a 1/3 do valor declarado, conforme avaliação técnica de idade, conservação e
              mercado de usados. Faixas acima são referência de mercado, não promessa de
              indenização. Veja também os{" "}
              <Link className="underline" to="/termos-e-condicoes">
                termos e condições
              </Link>
              .
            </p>
          </div>

          <h2 className="text-2xl font-bold mb-4 text-foreground">Dúvidas frequentes</h2>
          <div className="space-y-3 mb-10">
            {FAQS.map((f) => (
              <details key={f.question} className="rounded-xl border p-4">
                <summary className="font-semibold cursor-pointer">{f.question}</summary>
                <p className="mt-2 text-muted-foreground">{f.answer}</p>
              </details>
            ))}
          </div>

          <div className="rounded-2xl bg-primary/10 p-6 text-center">
            <h2 className="text-2xl font-bold mb-2 text-foreground">Vai fornecer suas peças?</h2>
            <p className="mb-4 text-muted-foreground">
              Mande a lista pelo WhatsApp e conferimos a compatibilidade antes de você fechar
              qualquer compra.
            </p>
            <Button size="lg" asChild data-cta-location="politica_pecas_final">
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackCTAClick("whatsapp", "politica_pecas_final")}
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Enviar lista de peças
              </a>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
