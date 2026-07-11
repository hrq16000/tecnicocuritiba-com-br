import { Link } from "react-router-dom";
import { Building2, Shield, Clock, Headphones, MapPin, CheckCircle, MessageCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageSEO } from "@/components/PageSEO";
import Breadcrumbs from "@/components/Breadcrumbs";
import { PrecoVisitaTecnica } from "@/components/PrecoVisitaTecnica";
import { useEffect } from "react";

const WHATSAPP_URL = "https://wa.me/5541997452053?text=" + encodeURIComponent("Olá! Quero suporte de TI para minha empresa em Curitiba.");

const BAIRROS_COMERCIAIS = [
  { nome: "Batel", slug: "batel" },
  { nome: "Centro", slug: "centro" },
  { nome: "Centro Cívico", slug: "centro-civico" },
  { nome: "Alto da Glória", slug: "alto-da-gloria" },
  { nome: "Água Verde", slug: "agua-verde" },
  { nome: "Ecoville", slug: "ecoville" },
  { nome: "Champagnat", slug: "champagnat" },
  { nome: "Rebouças", slug: "reboucas" },
];

const CIDADES_RMC = [
  { nome: "São José dos Pinhais", path: "/tecnico-informatica-sao-jose-pinhais" },
  { nome: "Araucária", path: "/tecnico-informatica-araucaria" },
  { nome: "Pinhais", path: "/tecnico-informatica-pinhais" },
  { nome: "Colombo", path: "/tecnico-informatica-colombo" },
  { nome: "Campo Largo", path: "/tecnico-informatica-campo-largo" },
];

const SERVICOS_EMPRESAS = [
  { icon: Headphones, title: "Suporte Técnico Recorrente", desc: "Contratos mensais com SLA e atendimento prioritário para escritórios e indústrias." },
  { icon: Shield, title: "Segurança e Antivírus Corporativo", desc: "Bitdefender/ESET, políticas de acesso, backup em nuvem e prevenção de ransomware." },
  { icon: Building2, title: "Infraestrutura de Rede", desc: "Cabeamento estruturado, Wi-Fi empresarial (UniFi/Mikrotik), VLANs e VPN site-to-site." },
  { icon: Clock, title: "Atendimento Emergencial", desc: "Chamados críticos em até 2 horas úteis. Zero downtime para PDVs e servidores." },
];

const FAQ = [
  { q: "Vocês atendem empresas em Curitiba?", a: "Sim. Atuamos há mais de 20 anos com suporte técnico de TI para empresas, escritórios, clínicas, indústrias e comércios em Curitiba e Região Metropolitana. Oferecemos contratos mensais, atendimento avulso e projetos de infraestrutura." },
  { q: "Qual o valor da hora técnica para empresas?", a: "A visita técnica corporativa começa em R$ 99,99 (até 30 min). Uma hora de atendimento presencial (combinada previamente) sai por R$ 169,99. Contratos mensais têm valor negociado a partir de R$ 300/mês (até 5 equipamentos) com SLA e atendimento prioritário." },
  { q: "Fazem contrato mensal de suporte?", a: "Sim. Oferecemos planos mensais com SLA definido, atendimento remoto ilimitado e visitas presenciais programadas. Ideal para empresas que precisam de estabilidade e resposta rápida sem custo variável alto." },
  { q: "Atendem em quais bairros e cidades?", a: "Curitiba (todos os bairros — com foco em Batel, Centro, Centro Cívico, Alto da Glória, Água Verde e Ecoville) e Região Metropolitana: São José dos Pinhais, Araucária, Pinhais, Colombo, Campo Largo, Fazenda Rio Grande e Almirante Tamandaré." },
  { q: "Fazem projetos de rede, cabeamento e Wi-Fi empresarial?", a: "Sim. Projetamos e instalamos redes cabeadas (categoria 5e/6), Wi-Fi corporativo com controladoras UniFi/Aruba/Mikrotik, VLANs, VPN entre filiais e segmentação para PDV/visitantes." },
  { q: "Emitem nota fiscal?", a: "Sim, todos os serviços para empresas são emitidos com NFS-e do Município de Curitiba." },
];

export default function EmpresaTICuritiba() {
  useEffect(() => {
    // FAQ schema injection
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.setAttribute("data-empresa-ti-faq", "true");
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQ.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    });
    document.head.appendChild(script);

    const service = document.createElement("script");
    service.type = "application/ld+json";
    service.setAttribute("data-empresa-ti-service", "true");
    service.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "Suporte de TI para Empresas",
      provider: { "@type": "LocalBusiness", name: "Técnico em Curitiba" },
      areaServed: { "@type": "City", name: "Curitiba" },
      offers: { "@type": "Offer", priceCurrency: "BRL", price: "99.99", url: "https://tecnicocuritiba.com.br/empresa-de-ti-curitiba" },
    });
    document.head.appendChild(service);

    return () => {
      document.querySelectorAll('script[data-empresa-ti-faq="true"],script[data-empresa-ti-service="true"]').forEach((s) => s.remove());
    };
  }, []);

  return (
    <>
      <PageSEO
        title="Empresa de TI em Curitiba | Suporte Corporativo a partir de R$ 99,99"
        description="Empresa de TI em Curitiba com suporte técnico corporativo, contratos mensais com SLA, redes, Wi-Fi empresarial e segurança. Atendemos Batel, Centro, Ecoville e toda a RMC. A partir de R$ 99,99."
        path="/empresa-de-ti-curitiba"
        breadcrumbs={[
          { name: "Início", path: "/" },
          { name: "Empresa de TI em Curitiba", path: "/empresa-de-ti-curitiba" },
        ]}
      />

      <div className="container mx-auto px-4 py-8 md:py-12">
        <Breadcrumbs items={[{ label: "Empresa de TI em Curitiba" }]} />

        <header className="max-w-4xl mx-auto text-center mb-10 md:mb-14">
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent rounded-full px-4 py-1.5 mb-4 text-sm font-semibold">
            <Building2 className="h-4 w-4" /> Suporte de TI Corporativo em Curitiba
          </div>
          <h1 className="text-3xl md:text-5xl font-heading font-bold text-foreground leading-tight mb-4">
            Empresa de TI em <span className="text-accent">Curitiba</span>
            <span className="block text-xl md:text-2xl font-semibold text-muted-foreground mt-2">
              Suporte técnico, redes e infraestrutura para o seu negócio
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
            +20 anos apoiando escritórios, clínicas, indústrias e comércios em Curitiba e Região Metropolitana. Contrato mensal com SLA, atendimento avulso ou projetos completos de infraestrutura.
          </p>
          <div className="max-w-md mx-auto mb-6">
            <PrecoVisitaTecnica tipo="padrao" />
          </div>
          <Button variant="heroWhatsapp" asChild className="shadow-lg">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" data-cta-location="empresa_ti_hero">
              <MessageCircle className="h-5 w-5" /> Falar com Consultor de TI
            </a>
          </Button>
        </header>

        <section className="max-w-5xl mx-auto mb-14" aria-labelledby="servicos-empresas">
          <h2 id="servicos-empresas" className="text-2xl md:text-3xl font-heading font-bold text-center mb-8">O que fazemos para empresas</h2>
          <div className="grid md:grid-cols-2 gap-5">
            {SERVICOS_EMPRESAS.map((s) => (
              <div key={s.title} className="bg-card border border-border rounded-xl p-5 hover:border-accent/40 transition-colors">
                <s.icon className="h-8 w-8 text-accent mb-3" />
                <h3 className="text-lg font-semibold text-foreground mb-1">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-6">
            <Link to="/suporte-empresas" className="text-accent hover:underline inline-flex items-center gap-1 font-medium">
              Ver todos os serviços para empresas <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        <section className="max-w-5xl mx-auto mb-14" aria-labelledby="bairros-comerciais">
          <h2 id="bairros-comerciais" className="text-2xl md:text-3xl font-heading font-bold text-center mb-2">Atendimento nos principais polos comerciais</h2>
          <p className="text-center text-muted-foreground mb-8">Empresas em Curitiba — clique no bairro e veja detalhes locais.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {BAIRROS_COMERCIAIS.map((b) => (
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
        </section>

        <section className="max-w-5xl mx-auto mb-14" aria-labelledby="cidades-rmc">
          <h2 id="cidades-rmc" className="text-2xl md:text-3xl font-heading font-bold text-center mb-8">Também atendemos a Região Metropolitana</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {CIDADES_RMC.map((c) => (
              <Link
                key={c.path}
                to={c.path}
                className="bg-card border border-border rounded-lg px-3 py-3 text-center hover:border-accent hover:bg-accent/5 transition-all text-sm font-medium text-foreground"
              >
                {c.nome}
              </Link>
            ))}
          </div>
        </section>

        <section className="max-w-3xl mx-auto mb-14" aria-labelledby="faq-empresas">
          <h2 id="faq-empresas" className="text-2xl md:text-3xl font-heading font-bold text-center mb-8">Perguntas frequentes — empresas</h2>
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

        <section className="bg-gradient-to-br from-primary to-accent rounded-2xl p-8 md:p-10 text-center text-white max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-heading font-bold mb-3">Precisa de suporte de TI agora?</h2>
          <p className="text-white/90 mb-6">Atendimento em até 2h úteis para chamados críticos. Contratos mensais com SLA garantido.</p>
          <Button variant="heroWhatsapp" asChild className="shadow-xl">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" data-cta-location="empresa_ti_cta_final">
              <MessageCircle className="h-5 w-5" /> Chamar Consultor Agora
            </a>
          </Button>
        </section>
      </div>
    </>
  );
}
