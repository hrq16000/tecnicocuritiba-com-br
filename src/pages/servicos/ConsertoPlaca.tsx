import { useEffect } from "react";
import { PageSEO } from "@/components/PageSEO";
import { ServiceLandingSchema } from "@/components/ServiceLandingSchema";
import { RealImageSection } from "@/components/RealImageSection";
import { PrecoVisitaTecnica } from "@/components/PrecoVisitaTecnica";
import { ImageObjectSchema } from "@/components/ImageObjectSchema";
import { ServiceGallery, GalleryItem } from "@/components/ServiceGallery";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Link } from "react-router-dom";
import { Cpu, CheckCircle, AlertCircle, AlertTriangle, MessageCircle, ArrowRight, Clock } from "lucide-react";
import { DIAGNOSTICO_VALOR_LABEL, COLETA_TAXA_MINIMA_LABEL, REGRA_COLETA_SEM_VISITA } from "@/lib/coletaConfig";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { InterlinkingBlock } from "@/components/InterlinkingBlock";
import { BlocoInteligencia } from "@/components/BlocoInteligencia";
import Breadcrumbs from "@/components/Breadcrumbs";
import PageTableOfContents from "@/components/PageTableOfContents";
import { trackPageView, trackCTAClick } from "@/lib/analytics";
import ServiceOperationalSpec from "@/components/ServiceOperationalSpec";

const WHATSAPP_NUMBER = "5541997452053";

const GALLERY: GalleryItem[] = [
  { imageKey: "bancadaTecnica", caption: "Placa em bancada durante medição de tensões e trilhas" },
  { imageKey: "estacaoSolda", caption: "Retrabalho de solda em componentes SMD com estação profissional" },
  { imageKey: "coletaEntrega", caption: "Coleta e devolução da placa — serviço de laboratório, sem visita técnica" },
];

const TESTE_FINAL = [
  "Inspeção visual e registro fotográfico antes e depois do reparo",
  "Medição de tensões nas linhas principais e conferência de curto",
  "Teste de carga com o equipamento ligado por período contínuo",
  "Verificação de aquecimento nos pontos reparados",
  "Teste funcional das saídas usadas pelo cliente (vídeo, USB, áudio)",
  "Registro do procedimento executado na ordem de serviço",
];

const FAQ = [
  { question: "Vale a pena consertar a placa-mãe?", answer: "Vale quando o custo do reparo fica bem abaixo da substituição do equipamento. Informamos a comparação antes de aprovar." },
  { question: "Quanto tempo leva o reparo em bancada?", answer: "O prazo varia de 7 a 60 dias úteis conforme a complexidade e a disponibilidade dos componentes. O prazo é confirmado junto do orçamento." },
  { question: "Tem coleta e entrega?", answer: `Sim, com coleta agendada em Curitiba e região metropolitana. ${REGRA_COLETA_SEM_VISITA}` },
  { question: "Qual a garantia do reparo de placa?", answer: "A garantia é de 90 dias sobre o serviço executado e a peça substituída, conforme descrito na ordem de serviço. Não cobre defeito novo em componente diferente do reparado." },
  { question: "Posso recusar o orçamento depois do diagnóstico?", answer: `Pode. Em caso de recusa ou desistência após a coleta, cobra-se apenas o diagnóstico (${DIAGNOSTICO_VALOR_LABEL}), e o aparelho é devolvido nas mesmas condições.` },
  { question: "O problema é da placa ou do monitor?", answer: "Se a falha aparece apenas com um computador específico (artefatos, travas, sem sinal em uma saída), o caso é tratado como reparo de placa. Se o monitor apresenta o mesmo defeito ligado em outra fonte de sinal, o caminho correto é o conserto de monitor." },
];

const tiposPlaca = [
  { titulo: "Placa-mãe de desktop", desc: "Trilhas queimadas, capacitores estufados, VRM danificado, socket com pino torto. Diagnóstico com multímetro e osciloscópio.", prazo: "7-30 dias" },
  { titulo: "Placa-mãe de notebook", desc: "Curto-circuito, chip BGA com solda fria, reguladores de tensão queimados. Pode exigir reballing.", prazo: "15-45 dias" },
  { titulo: "Placa de vídeo (GPU)", desc: "Artefatos na tela, sem imagem, superaquecimento. GPU com desgaste, VRAM defeituosa ou VRM queimado.", prazo: "15-60 dias" },
  { titulo: "Placa-fonte de TV/monitor", desc: "Capacitores estufados, MOSFETs queimados, transformador danificado. Reparo em componentes SMD.", prazo: "7-20 dias" },
  { titulo: "Placas eletrônicas diversas", desc: "Inversores, placas de controle de eletrodomésticos, centrais automotivas, controladores industriais.", prazo: "Sob consulta" },
];


const ConsertoPlaca = () => {
  useEffect(() => {
    document.title = "Conserto de Placa Eletrônica em Curitiba | Placa-mãe, GPU, Fonte | Técnico em Curitiba";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Conserto de placa-mãe, placa de vídeo, placa-fonte e eletrônica em geral. Reparo em nível de componente em Curitiba. Diagnóstico profissional com coleta e entrega.");
    }
    trackPageView("/servicos/conserto-placa", "Conserto de Placa");
  }, []);

  const handleWhatsApp = () => {
    trackCTAClick("whatsapp", "conserto-placa");
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Olá! Preciso de conserto de placa eletrônica. Podem avaliar?")}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-background">
      <ServiceLandingSchema
        serviceName="Conserto de Placa Eletrônica e Placa-Mãe"
        description="Conserto de Placa Eletrônica e Placa-Mãe em Curitiba e região metropolitana. Diagnóstico profissional, orçamento aprovado antes do reparo e garantia de 90 dias."
        path="/servicos/conserto-placa"
        priceFrom={99.99}
        category="Reparo Eletrônico em Nível de Componente"
        faqs={FAQ}

      />
      <PageSEO title="Conserto de Placa Eletrônica em Curitiba | Placa-mãe, GPU, Fonte | Técnico em Curitiba" description="Conserto de placa-mãe, placa de vídeo, placa-fonte e eletrônica em geral. Reparo em nível de componente em Curitiba. Diagnóstico profissional com coleta e entrega." path="/servicos/conserto-placa"  breadcrumbs={[
        { name: "Início", path: "/" },
        { name: "Serviços", path: "/servicos" },
        { name: "Conserto de Placa", path: "/servicos/conserto-placa" }
      ]} />
      <Header />
      <main id="main-content">
      <Breadcrumbs items={[{ label: "Serviços", href: "/servicos" }, { label: "Conserto de Placa" }]} />

      <div className="container mx-auto px-4 pt-6">
        <div className="max-w-4xl mx-auto">
          <PageTableOfContents
            items={[
              { id: "tipos-de-placas", label: "Tipos de placas que consertamos" },
              { id: "casos-complexos", label: "Casos complexos atendidos" },
              { id: "transparencia-placa", label: "Transparência no reparo" },
              { id: "teste-final-placa", label: "Teste final e aceite/recusa" },
              { id: "garantia-placa", label: "Garantia de 90 dias" },
              { id: "faq-placa", label: "Perguntas frequentes" },
            ]}
          />
        </div>
      </div>

      <section className="pt-10 pb-10 hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 -right-20 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse-soft" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-accent/20 text-accent px-4 py-2 rounded-full mb-6 shimmer">
              <Cpu className="h-5 w-5" />
              <span className="font-medium">Reparo em Nível de Componente</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6 reveal-text">
              Conserto de Placa Eletrônica em Curitiba
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto reveal-text" data-reveal-delay="100">
              Reparo profissional de placas-mãe, GPU, fontes e eletrônica em geral. Diagnóstico com equipamento especializado e técnico experiente.
            </p>
            <div className="reveal-text" data-reveal-delay="200">
              <Button size="lg" variant="cta" onClick={handleWhatsApp}>
                <MessageCircle className="mr-2 h-5 w-5" /> Preciso Consertar uma Placa
              </Button>
            </div>
          </div>
        </div>
      </section>
      <RealImageSection imageKey="placaMae" caption="Reparo de placa-mãe em nível de componente" />

      {/* Aviso */}
      <section className="py-6 bg-accent/5 border-y border-accent/10">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center space-y-3">
            <PrecoVisitaTecnica tipo="coleta" />
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">⚡ Serviço de laboratório:</strong> Conserto de placa exige bancada, equipamentos de precisão e tempo de análise. 
              O prazo varia de 7 a 60 dias conforme a complexidade.
            </p>
          </div>
        </div>
      </section>

      {/* Tipos */}
      <section id="tipos-de-placas" className="py-12 md:py-16 bg-background relative scroll-mt-24">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-accent/5 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto relative z-10">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center reveal-text">
              Tipos de Placas que Consertamos
            </h2>
            <div className="space-y-4">
              {tiposPlaca.map((tipo, i) => (
                <div key={i} className="bg-secondary rounded-xl p-5 border border-border flex flex-col sm:flex-row gap-4 hover:-translate-y-0.5 hover:shadow-lg hover:border-accent/20 transition-all duration-300 stagger-item" style={{ animationDelay: `${i * 80}ms` }}>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-2">{tipo.titulo}</h3>
                    <p className="text-sm text-muted-foreground">{tipo.desc}</p>
                  </div>
                  <div className="flex items-center gap-1 text-xs bg-primary/10 text-primary px-3 py-1 rounded-full h-fit whitespace-nowrap">
                    <Clock className="h-3 w-3" /> {tipo.prazo}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <RealImageSection imageKey="diagnostico" caption="Diagnóstico técnico de placa eletrônica" />

      {/* Casos complexos */}
      <section id="casos-complexos" className="py-12 md:py-16 bg-secondary scroll-mt-24">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-foreground mb-6 text-center reveal-text">Casos Complexos que Atendemos</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
              {[
                "Reballing de chip BGA",
                "Curto-circuito em placa-mãe",
                "GPU com artefatos visuais",
                "Placa de notebook após líquido",
                "Capacitores estufados",
                "Reparo de VRM e reguladores",
                "Dano por upgrade mal executado",
                "Placa pós-mineração (desgaste)",
                "Substituição de chip BIOS",
              ].map((caso, i) => (
                <div key={caso} className="flex items-center gap-2 bg-background rounded-lg p-3 text-sm border border-border hover:-translate-y-0.5 hover:shadow-md hover:border-accent/20 transition-all duration-300 stagger-item" style={{ animationDelay: `${i * 50}ms` }}>
                  <CheckCircle className="h-4 w-4 text-accent flex-shrink-0" />
                  <span className="text-foreground">{caso}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Transparência */}
      <section id="transparencia-placa" className="py-12 bg-background scroll-mt-24">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto bg-destructive/5 border border-destructive/20 rounded-xl p-6">
            <h2 className="text-xl font-bold text-foreground mb-3">Transparência no Reparo de Placas</h2>
            <div className="text-sm text-muted-foreground space-y-2">
              <p>Reparar placas eletrônicas é um serviço especializado. Alguns pontos importantes:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li><strong className="text-foreground">Nem toda placa é reparável.</strong> Se o dano for extenso ou o custo superar o valor de reposição, avisamos antes.</li>
                <li><strong className="text-foreground">Diagnóstico é sempre pago</strong> ({DIAGNOSTICO_VALOR_LABEL}). Taxa mínima {COLETA_TAXA_MINIMA_LABEL} pré-aprovada com coleta e entrega.</li>
                <li><strong className="text-foreground">Prazos variam muito.</strong> Peças importadas, componentes raros ou reballing podem levar de 15 a 60 dias úteis.</li>
                <li><strong className="text-foreground">Garantia limitada ao componente.</strong> Placas reparadas têm garantia do reparo, mas componentes adjacentes podem falhar depois.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Links */}
      <section className="py-12 bg-secondary">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-bold text-foreground mb-6 text-center">Páginas Relacionadas</h2>
            <div className="grid sm:grid-cols-3 gap-3">
              {[
                { label: "Conserto de PC/Notebook", to: "/servicos/conserto-pc-notebook" },
                { label: "Manutenção de TV", to: "/servicos/manutencao-tv" },
                { label: "Diagnóstico Técnico", to: "/diagnostico-tecnico" },
                { label: "Reballing BGA", to: "/procedimentos/reballing-bga-curitiba" },
                { label: "Reflow BGA", to: "/procedimentos/reflow-bga-curitiba" },
                { label: "Troca de Chip BGA", to: "/procedimentos/troca-chip-bga-curitiba" },
                { label: "Microsoldagem Celular", to: "/procedimentos/microsoldagem-celular-curitiba" },
                { label: "Recapacitação de Placa", to: "/procedimentos/recapacitacao-placa-eletronica-curitiba" },
                { label: "Reparo Placa Notebook", to: "/reparo-placa-mae-notebook-curitiba" },
                { label: "Reparo Placa Celular", to: "/reparo-placa-mae-celular-curitiba" },
                { label: "Reparo Placa TV", to: "/reparo-placa-principal-tv-curitiba" },
                { label: "Problemas Reais e Casos", to: "/problemas-reais-e-casos" },
                { label: "Coleta e Entrega", to: "/coleta-e-entrega" },
                { label: "Quando Não Compensa", to: "/quando-nao-compensa" },
              ].map((link) => (
                <Link key={link.to} to={link.to} className="flex items-center gap-2 bg-background rounded-lg p-3 text-sm font-medium text-foreground hover:text-accent hover:-translate-y-0.5 hover:shadow-md transition-all duration-300">
                  <ArrowRight className="h-4 w-4 text-accent" />{link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/3 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-breathe" />
        </div>
        <div className="container mx-auto text-center relative z-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 reveal-text">Placa Com Defeito?</h2>
          <p className="text-white/80 mb-6">Envie fotos e descrição do problema. Orientamos pelo WhatsApp sobre viabilidade e prazo.</p>
          <Button size="lg" variant="cta" onClick={handleWhatsApp}>
            <MessageCircle className="mr-2 h-5 w-5" /> Enviar Detalhes para Avaliação
          </Button>
        </div>
      </section>

      {/* Provas reais */}
      <ImageObjectSchema imageKeys={GALLERY.map((g) => g.imageKey as string)} local="Curitiba" path="/servicos/conserto-placa" />
      <ServiceGallery
        title="Provas reais do reparo de placa"
        subtitle="Fotos reais de bancada, solda e logística usadas nos atendimentos de placa em Curitiba."
        items={GALLERY}
        local="Curitiba"
        bgClass="bg-background"
      />

      <AnimatedSection>
        <section id="teste-final-placa" className="py-12 bg-secondary/30 scroll-mt-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-3">
                Checklist do teste final e regra de aceite/recusa
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Nenhuma placa é devolvida sem passar pelo teste final em bancada. O que foi executado fica
                descrito na ordem de serviço, e você aprova ou recusa o orçamento antes de qualquer reparo.
              </p>
              <div className="grid sm:grid-cols-2 gap-3 mb-6">
                {TESTE_FINAL.map((item) => (
                  <div key={item} className="flex items-start gap-2 rounded-lg border border-border bg-card p-3 text-sm">
                    <CheckCircle className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
              <div className="rounded-xl border border-border bg-card p-5 text-sm text-muted-foreground">
                <p className="flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <span>
                    <strong className="text-foreground">Recusa sem surpresa:</strong> se você não aprovar o
                    orçamento após o diagnóstico, cobra-se apenas o diagnóstico ({DIAGNOSTICO_VALOR_LABEL}) e o
                    aparelho volta nas mesmas condições. Reparos podem ser recusados por nós quando o dano é
                    extenso ou o custo supera o valor de reposição.
                  </span>
                </p>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Garantia 90 dias */}
      <AnimatedSection>
        <section id="garantia-placa" className="py-12 bg-background scroll-mt-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-3">
                Garantia de 90 dias: o que cobre e quando não se aplica
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                A garantia é de 90 dias e vale para o serviço executado e a peça substituída, exatamente como
                descritos na ordem de serviço. Ela não é uma cobertura geral do aparelho.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="rounded-xl border border-border bg-card p-5">
                  <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" aria-hidden="true" /> Coberto por 90 dias
                  </h3>
                  <ul className="space-y-1.5 text-sm text-muted-foreground">
                    <li>• Reincidência do mesmo defeito reparado</li>
                    <li>• Peça ou componente trocado por nós, dentro do prazo</li>
                    <li>• Retrabalho de solda no ponto que executamos</li>
                    <li>• Reavaliação em bancada sem nova taxa de coleta</li>
                  </ul>
                </div>
                <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-5">
                  <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-destructive" aria-hidden="true" /> Fora da garantia
                  </h3>
                  <ul className="space-y-1.5 text-sm text-muted-foreground">
                    <li>• Defeito novo em componente diferente do reparado</li>
                    <li>• Surto elétrico, queda, líquido ou impacto posteriores</li>
                    <li>• Violação, abertura ou reparo por terceiros</li>
                    <li>• Desgaste natural de placas com uso intensivo prévio</li>
                    <li>• Reparos recusados pelo cliente no orçamento</li>
                  </ul>
                </div>
              </div>
              <p className="mt-5 text-sm text-muted-foreground">
                Detalhes completos em{" "}
                <Link to="/precos-e-politicas" className="text-primary underline">preços e políticas</Link>.
              </p>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* FAQ visível 1:1 com o JSON-LD */}
      <AnimatedSection>
        <section id="faq-placa" className="py-12 bg-secondary/30 scroll-mt-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-6">
                Perguntas frequentes sobre conserto de placa
              </h2>
              <div className="space-y-3">
                {FAQ.map((f) => (
                  <details key={f.question} className="rounded-xl border border-border bg-card p-5">
                    <summary className="font-semibold text-foreground cursor-pointer">{f.question}</summary>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.answer}</p>
                  </details>
                ))}
              </div>
              <p className="mt-6 text-sm text-muted-foreground">
                Se o defeito é do próprio monitor (mesma falha em outra fonte de sinal), o caminho correto é o{" "}
                <Link to="/servicos/conserto-monitor" className="text-primary underline">conserto de monitor</Link>{" "}
                — assim você não paga duas coletas.
              </p>
            </div>
          </div>
        </section>
      </AnimatedSection>


      <BlocoInteligencia />
      <InterlinkingBlock />
      <ServiceOperationalSpec path="/servicos/conserto-placa" />
      </main>
      <Footer />
    </div>
  );
};

export default ConsertoPlaca;
