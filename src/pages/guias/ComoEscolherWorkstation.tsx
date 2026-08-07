import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageSEO } from "@/components/PageSEO";
import Breadcrumbs from "@/components/Breadcrumbs";
import PageSummaryBand from "@/components/PageSummaryBand";
import { Button } from "@/components/ui/button";
import { trackCTAClick } from "@/lib/analytics";
import { MessageCircle, CheckCircle, AlertTriangle, Cpu, MemoryStick, HardDrive, MonitorCog } from "lucide-react";
import { LocalPhotoGallery } from "@/components/LocalPhotoGallery";

const WA = "https://wa.me/5541997452053?text=" +
  encodeURIComponent("Olá! Quero ajuda para especificar uma workstation para minha empresa.") +
  "&utm_source=site&utm_medium=guia&utm_campaign=como-escolher-workstation";

const faqs = [
  {
    q: "Qual a diferença entre workstation e PC gamer?",
    a: "O foco muda: workstation prioriza estabilidade sob carga contínua, memória ampla, armazenamento confiável e certificação de drivers para softwares profissionais. PC gamer prioriza pico de desempenho gráfico em sessões curtas.",
  },
  {
    q: "Preciso de memória ECC?",
    a: "Só faz diferença em cargas longas onde um erro silencioso de memória é inaceitável: simulação, renderização de horas, bancos de dados. Para CAD 2D, escritório e edição leve, memória comum resolve.",
  },
  {
    q: "Vocês montam a workstation com peças que eu comprar?",
    a: "Sim, sob a política de peças do cliente: a garantia da peça é do fornecedor dela e nós garantimos apenas a mão de obra da montagem e configuração.",
  },
  {
    q: "Vocês garantem que a máquina vai atingir determinado desempenho?",
    a: "Não prometemos números de desempenho. Especificamos com base nos requisitos do software que você usa e entregamos a máquina testada e estável, com relatório do checklist final.",
  },
];

export default function ComoEscolherWorkstation() {
  const path = "/guias/como-escolher-workstation";
  const url = `https://tecnicocuritiba.com.br${path}`;

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
    headline: "Como escolher uma workstation",
    description:
      "Checklist de requisitos para especificar uma workstation profissional: processador, memória, GPU, armazenamento, estabilidade e limites operacionais.",
    mainEntityOfPage: url,
    author: { "@type": "Organization", name: "Técnico em Curitiba" },
    publisher: { "@type": "Organization", name: "Técnico em Curitiba" },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Início", item: "https://tecnicocuritiba.com.br/" },
      { "@type": "ListItem", position: 2, name: "Guias", item: "https://tecnicocuritiba.com.br/guias/como-escolher-workstation" },
      { "@type": "ListItem", position: 3, name: "Como escolher uma workstation", item: url },
    ],
  };

  return (
    <>
      <PageSEO
        title="Como Escolher uma Workstation | Checklist para Empresas"
        description="Guia técnico para especificar uma workstation: processador, RAM, GPU, armazenamento, estabilidade térmica e limites operacionais. Checklist de requisitos por tipo de uso."
        path={path}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <Header />
      <main id="main-content" className="container mx-auto px-4 py-8">
        <Breadcrumbs
          emitSchema={false}
          items={[{ label: "Início", href: "/" }, { label: "Guias" }, { label: "Como escolher uma workstation" }]}
        />

        <article className="max-w-3xl mx-auto py-8 md:py-12">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Como escolher uma workstation</h1>
          <p className="text-lg text-muted-foreground mb-6">
            Workstation não é "o PC mais caro da loja". É uma máquina especificada a partir do
            software que vai rodar e do tempo que ela precisa ficar estável sob carga. Este guia
            traz o checklist de requisitos que usamos ao especificar máquinas para empresas em
            Curitiba, e também os limites do que dá para prometer honestamente.
          </p>

          <div className="mb-10">
            <Button size="lg" asChild data-cta-location="guia_workstation_hero">
              <a
                href={WA}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackCTAClick("whatsapp", "guia_workstation_hero", { servico: "montagem_pc" })}
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Especificar minha workstation
              </a>
            </Button>
          </div>

          <PageSummaryBand
            summary="Guia prático para especificar uma workstation a partir do software que ela vai rodar: checklist de componentes, estabilidade sob carga, requisitos por tipo de uso e os limites do que prometemos."
            items={[
              { id: "passo-1", label: "Comece pelo software" },
              { id: "passo-2", label: "Checklist de componentes" },
              { id: "passo-3", label: "Estabilidade acima de pico" },
              { id: "passo-4", label: "Requisitos por tipo de uso" },
              { id: "passo-5", label: "Limites operacionais" },
              { id: "passo-6", label: "Montagem, teste e entrega" },
              { id: "manutencao", label: "Depois da entrega" },
              { id: "faq", label: "Perguntas frequentes" },
            ]}
          />

          <h2 id="passo-1" className="text-2xl font-bold mb-3 scroll-mt-24">Passo 1: comece pelo software, nunca pelo hardware</h2>
          <p className="mb-4 text-muted-foreground">
            Todo fabricante de software profissional publica requisitos mínimos e recomendados —
            AutoCAD, SolidWorks, Revit, Adobe, QGIS, ERPs e ambientes de desenvolvimento. Liste os
            programas que rodam ao mesmo tempo no dia a dia real do usuário e some as necessidades.
            É esse conjunto, e não o mais pesado isolado, que define a configuração.
          </p>
          <p className="mb-6 text-muted-foreground">
            Pergunte também: o software escala com mais núcleos ou depende de frequência única?
            Muitos programas de CAD 2D e ERPs ainda são majoritariamente single-thread — nesses
            casos, um processador com menos núcleos e maior clock entrega mais que um com muitos
            núcleos.
          </p>

          <h2 id="passo-2" className="text-2xl font-bold mb-3 scroll-mt-24">Passo 2: checklist de componentes</h2>
          <div className="grid gap-4 sm:grid-cols-2 mb-6">
            {[
              { icon: Cpu, t: "Processador", d: "Muitos núcleos para render, compilação e virtualização; clock alto para CAD 2D, ERP e planilhas pesadas." },
              { icon: MemoryStick, t: "Memória", d: "16 GB é o piso profissional; 32 GB para modelagem 3D e edição; 64 GB+ para simulação e VMs." },
              { icon: MonitorCog, t: "Vídeo", d: "GPU com driver certificado quando o software exige; para 2D e escritório, vídeo integrado basta." },
              { icon: HardDrive, t: "Armazenamento", d: "SSD NVMe para sistema e projeto ativo; HDD ou NAS para arquivo morto. Nunca só um disco." },
            ].map((i) => (
              <div key={i.t} className="rounded-xl border p-4 flex gap-3">
                <i.icon className="h-5 w-5 shrink-0 text-primary mt-0.5" aria-hidden />
                <div>
                  <div className="font-semibold">{i.t}</div>
                  <div className="text-sm text-muted-foreground">{i.d}</div>
                </div>
              </div>
            ))}
          </div>
          <p className="mb-6 text-muted-foreground">
            Dois itens que quase sempre são subdimensionados: <strong>fonte</strong> e{" "}
            <strong>refrigeração</strong>. Uma workstation que trabalha horas em carga total precisa
            de fonte com folga real e fluxo de ar planejado — é o que separa uma máquina estável de
            uma que trava no meio de um processamento longo.
          </p>

          <h2 id="passo-3" className="text-2xl font-bold mb-3 scroll-mt-24">Passo 3: estabilidade acima de pico</h2>
          <p className="mb-6 text-muted-foreground">
            Em ambiente profissional, uma máquina 10% mais rápida que trava uma vez por semana é
            pior que uma estável. Por isso não trabalhamos com overclock em workstation: operamos
            dentro das especificações do fabricante, com perfis de memória validados e testes de
            carga prolongada antes da entrega. O relatório do teste final acompanha a máquina.
          </p>

          <h2 id="passo-4" className="text-2xl font-bold mb-3 scroll-mt-24">Passo 4: requisitos por tipo de uso</h2>
          <ul className="mb-6 space-y-2">
            {[
              "Escritório e ERP: CPU de clock alto, 16 GB, SSD NVMe 500 GB, vídeo integrado",
              "CAD 2D e projetos técnicos: CPU de clock alto, 32 GB, SSD NVMe 1 TB, GPU de entrada",
              "Modelagem 3D e render: CPU multinúcleo, 32–64 GB, GPU dedicada, dois SSDs",
              "Edição de vídeo: CPU multinúcleo, 32–64 GB, GPU dedicada, SSD rápido para cache",
              "Desenvolvimento e VMs: CPU multinúcleo, 32–64 GB, SSD NVMe amplo, rede cabeada",
            ].map((t) => (
              <li key={t} className="flex gap-2">
                <CheckCircle className="h-5 w-5 shrink-0 text-primary mt-0.5" aria-hidden />
                <span className="text-muted-foreground">{t}</span>
              </li>
            ))}
          </ul>

          <h2 id="passo-5" className="text-2xl font-bold mb-3 scroll-mt-24">Passo 5: limites operacionais (o que não prometemos)</h2>
          <div className="rounded-xl border border-amber-500/40 bg-amber-500/5 p-4 mb-6 flex gap-3">
            <AlertTriangle className="h-5 w-5 shrink-0 text-amber-500 mt-0.5" aria-hidden />
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Não prometemos números de desempenho, FPS ou tempos de render.</li>
              <li>Não fazemos overclock nem alteração de tensão fora da especificação do fabricante.</li>
              <li>Não fechamos preço de máquina sem a lista de peças definida e cotada.</li>
              <li>
                Peças fornecidas pelo cliente seguem a{" "}
                <Link className="underline" to="/politica-pecas-cliente">política de peças do cliente</Link>: garantia
                da peça é do fornecedor; garantimos a mão de obra.
              </li>
            </ul>
          </div>

          <h2 id="passo-6" className="text-2xl font-bold mb-3 scroll-mt-24">Passo 6: montagem, teste e entrega</h2>
          <p className="mb-6 text-muted-foreground">
            A montagem segue um checklist com teste de memória, teste de disco, carga de CPU e GPU,
            leitura de temperaturas e validação do sistema operacional e drivers. Você recebe o
            registro do que foi testado. Os detalhes do processo estão em{" "}
            <Link className="underline" to="/servicos/montagem-pc/como-funciona">como funciona a montagem</Link>, e o
            serviço em si em <Link className="underline" to="/servicos/montagem-pc">montagem de PC sob medida</Link>.
          </p>

          <h2 id="manutencao" className="text-2xl font-bold mb-3 scroll-mt-24">Depois da entrega: manter o parque em ordem</h2>
          <p className="mb-6 text-muted-foreground">
            Uma workstation bem especificada dura anos, desde que backup, rede e atualizações
            acompanhem. Se você está estruturando isso pela primeira vez, comece pelo guia de{" "}
            <Link className="underline" to="/guias/organizacao-de-ti-para-escritorios">organização de TI para pequenos escritórios</Link>{" "}
            e, para acompanhamento contínuo, veja{" "}
            <Link className="underline" to="/suporte-empresas">suporte de TI para empresas</Link>.
          </p>

          <h2 id="faq" className="text-2xl font-bold mb-4 scroll-mt-24">Perguntas frequentes</h2>
          <div className="space-y-4 mb-10">
            {faqs.map((f) => (
              <details key={f.q} className="rounded-xl border p-4">
                <summary className="font-semibold cursor-pointer">{f.q}</summary>
                <p className="mt-2 text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>

          <div className="rounded-2xl bg-primary/10 p-6 text-center">
            <h2 className="text-2xl font-bold mb-2">Quer a especificação pronta para cotar?</h2>
            <p className="mb-4 text-muted-foreground">
              Diga quais softwares você usa e devolvemos a lista de peças compatível com o seu uso.
            </p>
            <Button size="lg" asChild data-cta-location="guia_workstation_final">
              <a
                href={WA}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackCTAClick("whatsapp", "guia_workstation_final", { servico: "montagem_pc" })}
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Falar no WhatsApp
              </a>
            </Button>
          </div>
        </article>
        <LocalPhotoGallery variant="montagem" />
      </main>
      <Footer />
    </>
  );
}
