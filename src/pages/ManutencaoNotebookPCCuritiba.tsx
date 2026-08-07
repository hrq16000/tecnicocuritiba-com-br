import { LocalPhotoGallery } from "@/components/LocalPhotoGallery";
import { Link } from "react-router-dom";
import { Laptop, Monitor, Cpu, HardDrive, Wrench, Shield, Clock, MapPin, CheckCircle, MessageCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageSEO } from "@/components/PageSEO";
import Breadcrumbs from "@/components/Breadcrumbs";
import { PrecoVisitaTecnica } from "@/components/PrecoVisitaTecnica";
import { useEffect } from "react";

const WA = "https://wa.me/5541997452053?text=" + encodeURIComponent("Olá! Preciso de manutenção de notebook/PC em Curitiba.");

const PROBLEMAS = [
  { icon: Monitor, title: "Notebook não liga", desc: "Diagnóstico de fonte, bateria, placa-mãe e chip de energia. Reparo a partir de R$ 99,99." , to: "/servicos/computador-nao-liga" },
  { icon: Cpu, title: "Notebook lento / travando", desc: "Otimização, limpeza térmica, troca de pasta e SSD. Volta a rodar como novo.", to: "/servicos/computador-lento" },
  { icon: Shield, title: "Vírus e ransomware", desc: "Remoção com garantia, restauração de arquivos e proteção contra reinfecção.", to: "/servicos/remocao-virus" },
  { icon: HardDrive, title: "Upgrade SSD + memória", desc: "Notebook de 2015 rodando Windows 11 fluido. Clonagem sem perder dados.", to: "/servicos/upgrade-ssd-memoria" },
  { icon: Wrench, title: "Troca de tela e teclado", desc: "Peças originais e compatíveis para todas as marcas: Dell, Lenovo, HP, Acer, Asus.", to: "/servicos/conserto-pc-notebook" },
  { icon: Monitor, title: "Formatação com backup", desc: "Windows 11 + Office + drivers + backup dos arquivos. R$ 99,99.", to: "/servicos/formatacao-computador" },
];

const MARCAS = ["Dell", "Lenovo", "HP", "Acer", "Asus", "Samsung", "Positivo", "Apple (MacBook)", "LG", "Vaio", "Multilaser", "Toshiba"];

const BAIRROS_FOCO = [
  { nome: "Batel", slug: "batel" },
  { nome: "Centro", slug: "centro" },
  { nome: "Água Verde", slug: "agua-verde" },
  { nome: "Portão", slug: "portao" },
  { nome: "CIC", slug: "cic" },
  { nome: "Santa Felicidade", slug: "santa-felicidade" },
  { nome: "Ecoville", slug: "ecoville" },
  { nome: "Cabral", slug: "cabral" },
];

const SERVICO_BAIRRO = [
  { label: "Conserto de notebook no Batel", to: "/servico-bairro/conserto-notebook-batel" },
  { label: "Conserto de notebook no CIC", to: "/servico-bairro/conserto-notebook-cic" },
  { label: "Conserto de notebook no Portão", to: "/servico-bairro/conserto-notebook-portao" },
  { label: "Formatação no Centro", to: "/servico-bairro/formatacao-centro" },
  { label: "Formatação no Portão", to: "/servico-bairro/formatacao-portao" },
  { label: "Remoção de vírus no Batel", to: "/servico-bairro/remocao-virus-batel" },
];

const FAQ = [
  { q: "Quanto custa consertar um notebook em Curitiba?", a: "A visita técnica com diagnóstico começa em R$ 99,99 (até 30 min). Serviços de formatação, remoção de vírus e reinstalação de sistema começam em R$ 99,99. Trocas de peça (tela, teclado, SSD, memória) têm o valor da mão de obra somado ao preço da peça, sempre informado antes com aprovação por WhatsApp." },
  { q: "Vocês fazem manutenção de notebook em domicílio?", a: "Sim. Atendemos em Curitiba e Região Metropolitana com visita técnica agendada — em média o técnico chega em 30 a 60 minutos. Casos que precisam de bancada (solda BGA, reballing, troca de conector de carga) vão para o laboratório com coleta e entrega." },
  { q: "Consertam MacBook também?", a: "Sim. Realizamos manutenção de MacBook (Air e Pro): troca de bateria, upgrade de armazenamento em modelos compatíveis, formatação com macOS, remoção de senha de firmware (quando comprovada a titularidade) e reparo lógico em placa." },
  { q: "Meu notebook não liga — tem conserto ou é melhor comprar outro?", a: "Depende do diagnóstico. Muitos casos de 'não liga' são resolvidos por fonte, bateria, capacitor ou chip de energia por R$ 200-400 (peça + mão de obra) — bem abaixo do preço de um notebook novo. Damos o orçamento antes, sem compromisso, para você decidir." },
  { q: "Qual a diferença entre manutenção preventiva e corretiva?", a: "Preventiva: limpeza interna, troca de pasta térmica, verificação de saúde do SSD/HD e otimização do sistema, feita a cada 12 meses. Corretiva: reparo quando o equipamento já apresenta falha. Recomendamos a preventiva anual para evitar 80% dos problemas de superaquecimento e lentidão." },
  { q: "Fazem upgrade de SSD e memória em qualquer notebook?", a: "Na maioria dos notebooks (2012 em diante) sim. Fazemos a clonagem do sistema para o SSD novo — você não perde nada, e o Windows abre em 8-12 segundos. Alguns ultrafinos (MacBook M1/M2 e certos modelos com memória soldada) não permitem upgrade de RAM; sempre verificamos antes." },
  { q: "Qual a garantia do serviço?", a: "90 dias de garantia para mão de obra, e a garantia do fabricante para peças novas. Se o problema retornar dentro do período, refazemos sem custo." },
];

export default function ManutencaoNotebookPCCuritiba() {
  useEffect(() => {
    const faqScript = document.createElement("script");
    faqScript.type = "application/ld+json";
    faqScript.setAttribute("data-hub-notebook-faq", "true");
    faqScript.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQ.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    });
    document.head.appendChild(faqScript);

    const service = document.createElement("script");
    service.type = "application/ld+json";
    service.setAttribute("data-hub-notebook-service", "true");
    service.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "Manutenção de Notebook e PC",
      name: "Manutenção de Notebook e PC em Curitiba",
      provider: {
        "@type": "LocalBusiness",
        name: "Técnico em Curitiba",
        telephone: "+5541997452053",
        areaServed: { "@type": "City", name: "Curitiba" },
      },
      areaServed: [
        { "@type": "City", name: "Curitiba" },
        { "@type": "AdministrativeArea", name: "Região Metropolitana de Curitiba" },
      ],
      offers: {
        "@type": "Offer",
        priceCurrency: "BRL",
        price: "99.99",
        url: "https://tecnicocuritiba.com.br/manutencao-notebook-pc-curitiba",
      },
    });
    document.head.appendChild(service);

    return () => {
      document.querySelectorAll('script[data-hub-notebook-faq="true"],script[data-hub-notebook-service="true"]').forEach((s) => s.remove());
    };
  }, []);

  return (
    <>
      <PageSEO
        title="Manutenção de Notebook e PC em Curitiba — a partir de R$ 99,99"
        description="Manutenção de notebook e PC em Curitiba: conserto, formatação, upgrade SSD, remoção de vírus e troca de tela. Domicílio ou bancada. A partir de R$ 99,99, garantia 90 dias."
        path="/manutencao-notebook-pc-curitiba"
        breadcrumbs={[
          { name: "Início", path: "/" },
          { name: "Manutenção de Notebook e PC em Curitiba", path: "/manutencao-notebook-pc-curitiba" },
        ]}
      />

      <main id="main-content">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <Breadcrumbs items={[{ label: "Manutenção de Notebook e PC em Curitiba" }]} />

        <header className="max-w-4xl mx-auto text-center mb-10 md:mb-14">
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent rounded-full px-4 py-1.5 mb-4 text-sm font-semibold">
            <Laptop className="h-4 w-4" /> Hub Oficial · Notebook e PC
          </div>
          <h1 className="text-3xl md:text-5xl font-heading font-bold text-foreground leading-tight mb-4">
            Manutenção de Notebook e PC em <span className="text-accent">Curitiba</span>
            <span className="block text-xl md:text-2xl font-semibold text-muted-foreground mt-2">
              Conserto, formatação, upgrade e limpeza — a partir de R$ 99,99
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
            Assistência técnica em informática com 20+ anos de experiência. Atendimento em domicílio nos principais bairros de Curitiba e bancada para reparos que exigem laboratório. Diagnóstico honesto, orçamento sem compromisso.
          </p>
          <div className="max-w-md mx-auto mb-6">
            <PrecoVisitaTecnica tipo="padrao" />
          </div>
          <Button variant="heroWhatsapp" asChild className="shadow-lg">
            <a href={WA} target="_blank" rel="noopener noreferrer" data-cta-location="hub_notebook_hero">
              <MessageCircle className="h-5 w-5" /> Falar com o técnico agora
            </a>
          </Button>
        </header>

        <section className="max-w-5xl mx-auto mb-14" aria-labelledby="problemas">
          <h2 id="problemas" className="text-2xl md:text-3xl font-heading font-bold text-center mb-8">
            Problemas que resolvemos no seu notebook ou PC
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {PROBLEMAS.map((p) => (
              <Link key={p.title} to={p.to} className="bg-card border border-border rounded-xl p-5 hover:border-accent/40 transition-colors group">
                <p.icon className="h-8 w-8 text-accent mb-3" />
                <h3 className="text-lg font-semibold text-foreground mb-1 group-hover:text-accent">{p.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{p.desc}</p>
                <span className="text-accent text-sm font-medium inline-flex items-center gap-1">
                  Ver detalhes <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="max-w-5xl mx-auto mb-14" aria-labelledby="marcas">
          <h2 id="marcas" className="text-2xl md:text-3xl font-heading font-bold text-center mb-2">
            Atendemos todas as marcas de notebook e PC
          </h2>
          <p className="text-center text-muted-foreground mb-6">
            Peças originais e compatíveis com garantia. Diagnóstico gratuito antes de qualquer serviço.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {MARCAS.map((m) => (
              <span key={m} className="bg-card border border-border rounded-lg px-4 py-2 text-sm font-medium text-foreground">
                {m}
              </span>
            ))}
          </div>
        </section>

        <section className="max-w-5xl mx-auto mb-14" aria-labelledby="bairros">
          <h2 id="bairros" className="text-2xl md:text-3xl font-heading font-bold text-center mb-2">
            Manutenção de notebook nos principais bairros de Curitiba
          </h2>
          <p className="text-center text-muted-foreground mb-6">
            Visita técnica em domicílio agendada por WhatsApp — normalmente em 30 a 60 min.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            {BAIRROS_FOCO.map((b) => (
              <Link
                key={b.slug}
                to={`/bairros/${b.slug}`}
                className="bg-card border border-border rounded-lg px-4 py-3 text-center hover:border-accent hover:bg-accent/5 transition-all group"
              >
                <MapPin className="h-4 w-4 text-accent mx-auto mb-1" />
                <span className="text-sm font-medium text-foreground group-hover:text-accent">{b.nome}</span>
              </Link>
            ))}
          </div>
          <div className="bg-card border border-border rounded-xl p-5">
            <h3 className="text-lg font-semibold text-foreground mb-3">Serviço + bairro (páginas dedicadas)</h3>
            <ul className="grid md:grid-cols-2 gap-x-6 gap-y-2 text-sm">
              {SERVICO_BAIRRO.map((s) => (
                <li key={s.to}>
                  <Link to={s.to} className="text-accent hover:underline">
                    → {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="max-w-5xl mx-auto mb-14" aria-labelledby="processo">
          <h2 id="processo" className="text-2xl md:text-3xl font-heading font-bold text-center mb-8">
            Como funciona a manutenção do seu notebook
          </h2>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { icon: MessageCircle, title: "1. WhatsApp", desc: "Você descreve o problema e envia fotos/vídeo se possível." },
              { icon: Clock, title: "2. Agendamento", desc: "Escolhemos horário no seu bairro (domicílio) ou coleta grátis." },
              { icon: Wrench, title: "3. Diagnóstico", desc: "Diagnóstico presencial ou em bancada com orçamento antes de mexer." },
              { icon: CheckCircle, title: "4. Reparo + garantia", desc: "Serviço executado com garantia de 90 dias em mão de obra." },
            ].map((p) => (
              <div key={p.title} className="bg-card border border-border rounded-xl p-5 text-center">
                <p.icon className="h-8 w-8 text-accent mx-auto mb-3" />
                <h3 className="text-base font-semibold text-foreground mb-1">{p.title}</h3>
                <p className="text-sm text-muted-foreground">{p.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-3xl mx-auto mb-14" aria-labelledby="faq-notebook">
          <h2 id="faq-notebook" className="text-2xl md:text-3xl font-heading font-bold text-center mb-8">
            Perguntas frequentes — manutenção de notebook e PC
          </h2>
          <div className="space-y-3">
            {FAQ.map((f, i) => (
              <details key={i} className="bg-card border border-border rounded-lg p-4 group">
                <summary className="font-semibold text-foreground cursor-pointer flex items-center justify-between gap-3">
                  <span>{f.q}</span>
                  <CheckCircle className="h-4 w-4 text-accent flex-shrink-0 group-open:rotate-45 transition-transform" />
                </summary>
                <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="max-w-5xl mx-auto mb-10" aria-labelledby="cluster">
          <h2 id="cluster" className="text-xl md:text-2xl font-heading font-bold text-center mb-4">
            Continue explorando
          </h2>
          <div className="flex flex-wrap justify-center gap-3 text-sm">
            <Link to="/servicos/conserto-notebook-curitiba" className="bg-secondary hover:bg-accent/20 px-4 py-2 rounded-lg">Conserto de Notebook em Curitiba</Link>
            <Link to="/assistencia-tecnica-curitiba" className="bg-secondary hover:bg-accent/20 px-4 py-2 rounded-lg">Assistência Técnica em Curitiba</Link>
            <Link to="/tecnico-informatica-curitiba" className="bg-secondary hover:bg-accent/20 px-4 py-2 rounded-lg">Técnico de Informática em Curitiba</Link>
            <Link to="/empresa-de-ti-curitiba" className="bg-secondary hover:bg-accent/20 px-4 py-2 rounded-lg">Empresa de TI em Curitiba</Link>
            <Link to="/coleta-entrega" className="bg-secondary hover:bg-accent/20 px-4 py-2 rounded-lg">Coleta e Entrega Grátis</Link>
            <Link to="/valores" className="bg-secondary hover:bg-accent/20 px-4 py-2 rounded-lg">Tabela de Valores</Link>
          </div>
        </section>

        <section className="bg-gradient-to-br from-primary to-accent rounded-2xl p-8 md:p-10 text-center text-white max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-heading font-bold mb-3">Notebook com problema? Fale com a gente agora.</h2>
          <p className="text-white/90 mb-6">Diagnóstico honesto, orçamento sem compromisso e atendimento no mesmo dia.</p>
          <Button variant="heroWhatsapp" asChild className="shadow-xl">
            <a href={WA} target="_blank" rel="noopener noreferrer" data-cta-location="hub_notebook_cta_final">
              <MessageCircle className="h-5 w-5" /> Chamar técnico agora
            </a>
          </Button>
        </section>
      </div>
        <LocalPhotoGallery local="Curitiba" variant="notebook" />
      </main>
    </>
  );
}
