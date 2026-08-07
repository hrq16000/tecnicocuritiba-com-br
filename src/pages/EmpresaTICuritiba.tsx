import { LocalPhotoGallery } from "@/components/LocalPhotoGallery";
import { Link } from "react-router-dom";
import { Building2, Shield, Clock, Headphones, MapPin, CheckCircle, MessageCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageSEO } from "@/components/PageSEO";
import Breadcrumbs from "@/components/Breadcrumbs";
import PageSummaryBand from "@/components/PageSummaryBand";
import { PrecoVisitaTecnica } from "@/components/PrecoVisitaTecnica";
import BusinessHero from "@/components/b2b/BusinessHero";
import BusinessPageSchema from "@/components/b2b/BusinessPageSchema";


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
  { icon: Headphones, title: "Suporte Técnico Recorrente", desc: "Acompanhamento recorrente com escopo, frequência e prioridades definidos em levantamento inicial." },
  { icon: Shield, title: "Segurança e Antivírus Corporativo", desc: "Bitdefender/ESET, políticas de acesso, backup em nuvem e medidas de redução de risco de ransomware." },
  { icon: Building2, title: "Infraestrutura de Rede", desc: "Cabeamento estruturado, Wi-Fi empresarial (UniFi/Mikrotik), VLANs e VPN site-to-site." },
  { icon: Clock, title: "Chamados Críticos", desc: "Priorização de chamados que param a operação (PDV, servidor, rede), conforme agenda disponível no momento." },
];

const FAQ = [
  { q: "Vocês atendem empresas em Curitiba?", a: "Sim. Atuamos há mais de 20 anos com suporte técnico de TI para empresas, escritórios, clínicas, indústrias e comércios em Curitiba e Região Metropolitana. Trabalhamos com atendimento avulso por chamado, acompanhamento recorrente e projetos de infraestrutura." },
  { q: "Qual o valor da hora técnica para empresas?", a: "A visita técnica corporativa começa em R$ 99,99 (até 30 min). Uma hora de atendimento presencial (combinada previamente) sai por R$ 169,99. O acompanhamento recorrente tem valor definido caso a caso, após levantamento de equipamentos, usuários e escopo." },
  { q: "Como funciona o atendimento recorrente?", a: "Antes de qualquer proposta fazemos um levantamento do parque: quantidade de equipamentos, usuários, sistemas críticos e rotinas de backup. A partir disso definimos escopo, frequência de visitas e prioridade dos chamados por escrito." },
  { q: "Atendem em quais bairros e cidades?", a: "Curitiba (todos os bairros — com foco em Batel, Centro, Centro Cívico, Alto da Glória, Água Verde e Ecoville) e Região Metropolitana: São José dos Pinhais, Araucária, Pinhais, Colombo, Campo Largo, Fazenda Rio Grande e Almirante Tamandaré." },
  { q: "Fazem projetos de rede, cabeamento e Wi-Fi empresarial?", a: "Sim. Projetamos e instalamos redes cabeadas (categoria 5e/6), Wi-Fi corporativo com controladoras UniFi/Aruba/Mikrotik, VLANs, VPN entre filiais e segmentação para PDV/visitantes." },
  { q: "Emitem nota fiscal?", a: "Sim, todos os serviços para empresas são emitidos com NFS-e do Município de Curitiba." },
];


const BREADCRUMBS = [
  { name: "Início", path: "/" },
  { name: "Empresa de TI em Curitiba", path: "/empresa-de-ti-curitiba" },
];

export default function EmpresaTICuritiba() {
  return (
    <>
      <PageSEO
        title="Empresa de TI em Curitiba | Suporte Corporativo a partir de R$ 99,99"
        description="Empresa de TI em Curitiba com suporte técnico corporativo, contratos mensais, redes, Wi-Fi empresarial e segurança. Atendemos Batel, Centro, Ecoville e toda a RMC. A partir de R$ 99,99."
        path="/empresa-de-ti-curitiba"
        breadcrumbs={BREADCRUMBS}
      />
      <BusinessPageSchema
        id="empresa-ti"
        path="/empresa-de-ti-curitiba"
        name="Empresa de TI em Curitiba"
        description="Suporte técnico corporativo, redes e infraestrutura para empresas em Curitiba e Região Metropolitana."
        breadcrumbs={BREADCRUMBS}
        faq={FAQ}
      />

      <main id="main-content">
      <BusinessHero
        eyebrow="Suporte de TI corporativo em Curitiba"
        title="Empresa de TI em Curitiba"
        titleSuffix="Suporte técnico, redes e infraestrutura para o seu negócio"
        description="Atendemos escritórios, clínicas, indústrias e comércios em Curitiba e Região Metropolitana. Atendimento avulso por chamado, acompanhamento recorrente definido em levantamento inicial ou projetos de infraestrutura com escopo aprovado antes da execução."
        whatsappUrl={WHATSAPP_URL}
        ctaLabel="Falar com Consultor de TI"
        ctaLocation="empresa_ti_hero"
        secondary={{ label: "Ver serviços para empresas", to: "/suporte-empresas" }}
        signals={[
          "+20 anos de atuação",
          "NFS-e do Município de Curitiba",
          "Atendimento remoto e presencial",
          "Escopo acordado antes da execução",
        ]}
      >
        <PrecoVisitaTecnica tipo="padrao" />
      </BusinessHero>

      <div className="container mx-auto px-4 py-8 md:py-12">
        <Breadcrumbs items={[{ label: "Empresa de TI em Curitiba" }]} />


        <PageSummaryBand
          summary="Suporte técnico, redes e infraestrutura para empresas em Curitiba e Região Metropolitana, com atendimento avulso, contrato mensal ou projetos de infraestrutura."
          items={[
            { id: "servicos-empresas", label: "O que fazemos para empresas" },
            { id: "bairros-comerciais", label: "Polos comerciais atendidos" },
            { id: "cidades-rmc", label: "Região Metropolitana" },
            { id: "faq-empresas", label: "Perguntas frequentes" },
          ]}
        />

        <section className="max-w-5xl mx-auto mb-14 scroll-mt-24" aria-labelledby="servicos-empresas">
          <h2 id="servicos-empresas" className="scroll-mt-24 text-2xl md:text-3xl font-heading font-bold text-center mb-8">O que fazemos para empresas</h2>
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
          <h2 id="bairros-comerciais" className="scroll-mt-24 text-2xl md:text-3xl font-heading font-bold text-center mb-2">Atendimento nos principais polos comerciais</h2>
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
          <h2 id="cidades-rmc" className="scroll-mt-24 text-2xl md:text-3xl font-heading font-bold text-center mb-8">Também atendemos a Região Metropolitana</h2>
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
          <h2 id="faq-empresas" className="scroll-mt-24 text-2xl md:text-3xl font-heading font-bold text-center mb-8">Perguntas frequentes — empresas</h2>
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
          <p className="text-white/90 mb-6">Descreva o cenário da sua empresa no WhatsApp: avaliamos a prioridade do chamado e retornamos com escopo e agenda disponível.</p>

          <Button variant="heroWhatsapp" asChild className="shadow-xl">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" data-cta-location="empresa_ti_cta_final">
              <MessageCircle className="h-5 w-5" /> Chamar Consultor Agora
            </a>
          </Button>
        </section>
      </div>
        <LocalPhotoGallery local="Curitiba" variant="empresa" />
      </main>
    </>
  );
}
