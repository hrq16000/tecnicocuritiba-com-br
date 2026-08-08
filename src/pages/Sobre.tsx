import { useEffect } from "react";
import { PageSEO } from "@/components/PageSEO";
import { Header } from "@/components/Header";
import { TrustSection } from "@/components/TrustSection";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import { InterlinkingBlock } from "@/components/InterlinkingBlock";
import { RealImageSection } from "@/components/RealImageSection";
import { JsonLdSchema } from "@/components/JsonLdSchema";
import { FloatingParticles } from "@/components/FloatingParticles";
import { AnimatedSection } from "@/components/AnimatedSection";
import { trackPageView } from "@/lib/analytics";
import { Award, Users, Target, Heart } from "lucide-react";

const valores = [
  {
    icon: Award,
    title: "Excelência",
    description: "Buscamos a melhor solução técnica para cada problema, com qualidade e atenção aos detalhes.",
  },
  {
    icon: Users,
    title: "Atendimento Humano",
    description: "Tratamos cada cliente de forma personalizada, com respeito e comunicação clara.",
  },
  {
    icon: Target,
    title: "Compromisso",
    description: "Cumprimos prazos e entregamos o que prometemos. Sua confiança é nossa prioridade.",
  },
  {
    icon: Heart,
    title: "Paixão por Tecnologia",
    description: "Amamos o que fazemos e isso reflete na qualidade do nosso trabalho.",
  },
];

const Sobre = () => {
  useEffect(() => {
    document.title = "Sobre Nós | Técnico em Curitiba - Assistência Técnica em Informática";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Conheça a Técnico em Curitiba. Assistência técnica em informática com experiência, compromisso e atendimento humanizado em Curitiba e região."
      );
    }
    trackPageView("/sobre", "Sobre");
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <PageSEO title="Sobre Nós | Técnico em Curitiba - Assistência Técnica em Informática" description="Conheça a Técnico em Curitiba. Assistência técnica em informática com experiência, compromisso e atendimento humanizado em Curitiba e região." path="/sobre" breadcrumbs={[{ name: "Início", path: "/" }, { name: "Sobre", path: "/sobre" }]} />
      <JsonLdSchema />
      <Header />
      <main id="main-content">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 premium-gradient" />
          <FloatingParticles count={25} />
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-16 left-[10%] w-[500px] h-[500px] rounded-full bg-accent/[0.07] blur-[120px] animate-breathe" />
            <div className="absolute bottom-0 right-[15%] w-[400px] h-[400px] rounded-full bg-primary/[0.06] blur-[100px] animate-breathe" style={{ animationDelay: "2.5s" }} />
          </div>
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`, backgroundSize: '32px 32px' }} />
          <div className="container mx-auto relative z-10 pt-14 pb-20 md:pt-20 md:pb-24">
            <AnimatedSection animation="fade-up">
              <div className="max-w-3xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-5 py-2 rounded-full text-sm font-medium text-white/90 mb-6 border border-white/15 shimmer">
                  <Heart className="h-4 w-4 text-accent" />
                  <span>Desde 2018 em Curitiba</span>
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white leading-tight mb-5">
                  Sobre a <span className="gradient-text-animated">Técnico em Curitiba</span>
                </h1>
                <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
                  Assistência técnica em informática com compromisso, transparência e paixão por resolver problemas
                </p>
                <div className="glow-separator max-w-[200px] mx-auto mt-6" />
              </div>
            </AnimatedSection>
          </div>
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 60" fill="none" className="w-full" preserveAspectRatio="none">
              <path d="M0 60L48 52C96 44 192 28 288 22C384 16 480 20 576 28C672 36 768 48 864 50C960 52 1056 44 1152 36C1248 28 1344 20 1392 16L1440 12V60H0Z" className="fill-background" />
            </svg>
          </div>
        </section>

        {/* Nossa História */}
        <section className="py-8 md:py-10 bg-background relative overflow-hidden">
          <div className="absolute top-20 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
          <div className="container mx-auto relative z-10">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 text-center reveal-text">
                Nossa História
              </h2>
              <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
                <p>
                  A Técnico em Curitiba nasceu da percepção de que muitas pessoas e empresas em Curitiba tinham dificuldade em encontrar um <strong className="text-foreground">técnico de informática confiável</strong>, que fosse transparente no orçamento e cumprisse prazos.
                </p>
                <p>
                  Com experiência prática em manutenção de computadores, decidimos criar um serviço diferente: atendimento humanizado, comunicação clara, preço justo e, acima de tudo, <strong className="text-foreground">resolver o problema do cliente</strong>.
                </p>
                <p>
                  Hoje, atendemos residências, profissionais liberais e empresas em toda Curitiba e região metropolitana. Contamos com parcerias estratégicas em diversas regiões do Brasil, permitindo oferecer suporte de alto padrão mesmo para demandas mais complexas.
                </p>
                <p>
                  Nossa missão é simples: <strong className="text-foreground">fazer seu computador funcionar</strong>, sem enrolação, sem termos técnicos confusos, sem cobranças surpresa. Você fala direto com o técnico, recebe um orçamento claro e tem a garantia de um serviço bem feito.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Dados da empresa (transparência / E-E-A-T) */}
        <section className="py-8 md:py-10 bg-background" aria-labelledby="dados-empresa">
          <div className="container mx-auto">
            <div className="max-w-3xl mx-auto rounded-2xl border border-border bg-card p-6 md:p-8">
              <h2 id="dados-empresa" className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Dados da empresa
              </h2>
              <dl className="grid gap-3 sm:grid-cols-2 text-sm">
                <div>
                  <dt className="font-semibold text-foreground">Razão social</dt>
                  <dd className="text-muted-foreground">Técnico em Curitiba — Assistência Técnica em Informática</dd>
                </div>
                <div>
                  <dt className="font-semibold text-foreground">CNPJ</dt>
                  <dd className="text-muted-foreground">41.723.708/0001-58</dd>
                </div>
                <div>
                  <dt className="font-semibold text-foreground">Atendimento</dt>
                  <dd className="text-muted-foreground">Curitiba e Região Metropolitana — domicílio, remoto e coleta</dd>
                </div>
                <div>
                  <dt className="font-semibold text-foreground">Horário</dt>
                  <dd className="text-muted-foreground">Seg–Sáb · 08h às 20h</dd>
                </div>
              </dl>
              <p className="mt-4 text-sm text-muted-foreground">
                Empresa formalizada, com nota fiscal e garantia por escrito em todo serviço executado.
              </p>
            </div>
          </div>
        </section>

        {/* Valores */}

        <section className="py-8 md:py-10 bg-secondary relative overflow-hidden">
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
          <div className="container mx-auto relative z-10">
            <div className="text-center mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3 reveal-text">
                Nossos Valores
              </h2>
              <p className="text-muted-foreground text-lg">
                O que guia nosso trabalho todos os dias
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {valores.map((valor, index) => {
                const Icon = valor.icon;
                return (
                  <AnimatedSection key={index} delay={100 * index}>
                    <div className="group glass-card gradient-border rounded-xl p-6 text-center hover:-translate-y-2 hover:shadow-[var(--shadow-lg)] transition-all duration-300 animated-border">
                      <div className="bg-primary rounded-full p-4 w-fit mx-auto mb-4 group-hover:scale-110 group-hover:shadow-[0_0_24px_hsl(var(--glow-primary)/0.3)] transition-all duration-300">
                        <Icon className="h-6 w-6 text-primary-foreground icon-spin-hover" />
                      </div>
                      <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-accent transition-colors duration-300">{valor.title}</h3>
                      <p className="text-muted-foreground text-sm">{valor.description}</p>
                    </div>
                  </AnimatedSection>
                );
              })}
            </div>
          </div>
        </section>

        {/* Diferenciais */}
        <section className="py-8 md:py-10 bg-background relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
          <div className="container mx-auto relative z-10">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 text-center reveal-text">
                Por Que Somos Diferentes?
              </h2>
              <div className="space-y-4 text-muted-foreground">
                {[
                  { title: "Você fala direto com o técnico", desc: "Nada de call center ou atendentes que não entendem seu problema. Você conversa diretamente com quem vai resolver." },
                  { title: "Orçamento transparente", desc: "Antes de qualquer serviço, você sabe exatamente quanto vai pagar. Sem surpresas, sem taxas escondidas." },
                  { title: "Garantia em todos os serviços", desc: "Confiamos no nosso trabalho. Por isso, oferecemos garantia por escrito em cada serviço realizado." },
                  { title: "Atendimento para pessoa física e empresas", desc: "Residências, profissionais liberais, pequenas e médias empresas. Emitimos nota fiscal e aceitamos pagamento faturado." },
                ].map((item, i) => (
                  <AnimatedSection key={i} delay={80 * i}>
                    <div className="group glass-card gradient-border rounded-xl p-5 hover:-translate-y-1 hover:shadow-[var(--shadow-lg)] transition-all duration-300 hover-streak">
                      <h3 className="font-semibold text-foreground mb-2 group-hover:text-accent transition-colors duration-300">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Transparência editorial, avaliações e patrocinadores */}
        <section className="py-14 bg-secondary/40">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-3">
                Como este portal produz conteúdo, avaliações e publicidade
              </h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Este site não é apenas uma vitrine de serviços: publicamos guias técnicos, páginas de
                sintomas e conteúdos de diagnóstico usados por quem procura solução antes de acionar um
                técnico. Para que essa informação seja confiável, seguimos critérios fixos de produção,
                revisão e divulgação — descritos abaixo de forma aberta.
              </p>

              <div className="grid gap-5 md:grid-cols-2">
                <div className="rounded-xl border border-border/60 bg-card/60 p-5">
                  <h3 className="font-semibold text-foreground mb-2">Missão do portal</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Explicar o problema técnico em linguagem simples, mostrar quando o reparo compensa e
                    quando não compensa, e reduzir o número de pessoas que gastam dinheiro em serviço
                    desnecessário. Conteúdo primeiro; atendimento como consequência.
                  </p>
                </div>

                <div className="rounded-xl border border-border/60 bg-card/60 p-5">
                  <h3 className="font-semibold text-foreground mb-2">Processo editorial</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Todo conteúdo é escrito a partir de atendimentos reais executados em bancada e
                    revisado pelo responsável técnico antes de publicar. Páginas com prazo, valor ou
                    política são atualizadas sempre que a regra operacional muda, e a data de atualização
                    fica registrada na própria página.
                  </p>
                </div>

                <div className="rounded-xl border border-border/60 bg-card/60 p-5">
                  <h3 className="font-semibold text-foreground mb-2">Critérios de conteúdo</h3>
                  <ul className="list-disc pl-5 space-y-1.5 text-sm text-muted-foreground">
                    <li>Nada de promessa de desempenho, prazo garantido ou resultado que não controlamos.</li>
                    <li>Valores exibidos são a referência oficial de tabela, sempre com a condição aplicável.</li>
                    <li>Quando o reparo não compensa, dizemos isso na própria página, mesmo perdendo o serviço.</li>
                    <li>Correções de erro são feitas na página original, sem apagar o histórico da regra.</li>
                  </ul>
                </div>

                <div className="rounded-xl border border-border/60 bg-card/60 p-5">
                  <h3 className="font-semibold text-foreground mb-2">Avaliações de clientes</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Publicamos apenas avaliações enviadas por clientes atendidos, com autorização
                    explícita de publicação. Não compramos avaliação, não editamos a nota e não removemos
                    crítica negativa legítima. Veja as{" "}
                    <Link to="/avaliacoes" className="text-accent underline">avaliações publicadas</Link> e{" "}
                    <Link to="/como-avaliar" className="text-accent underline">como avaliar</Link>.
                  </p>
                </div>

                <div className="rounded-xl border border-border/60 bg-card/60 p-5 md:col-span-2">
                  <h3 className="font-semibold text-foreground mb-2">Publicidade e patrocinadores</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    O portal exibe anúncios de terceiros e pode exibir espaços patrocinados. Todo espaço
                    pago aparece identificado como <strong>“Publicidade”</strong> e nunca é apresentado como
                    recomendação editorial. Anunciante não influencia diagnóstico, ordem de conteúdo nem
                    conclusão de página. Scripts de anúncio só carregam depois do seu aceite no banner de
                    consentimento. Detalhes em{" "}
                    <Link to="/politica-de-publicidade" className="text-accent underline">Política de Publicidade</Link>,{" "}
                    <Link to="/politica-de-cookies-e-anuncios" className="text-accent underline">Política de Cookies e Anúncios</Link>{" "}
                    e{" "}
                    <Link to="/politica-de-privacidade" className="text-accent underline">Política de Privacidade</Link>.
                    O estado técnico em tempo real fica em{" "}
                    <Link to="/status-anuncios" className="text-accent underline">status de anúncios</Link>.
                  </p>
                </div>
              </div>

              <p className="mt-6 text-sm text-muted-foreground">
                Encontrou informação desatualizada ou quer registrar uma reclamação?{" "}
                <Link to="/contato" className="text-accent underline">Fale pelo canal de contato</Link>.
              </p>
            </div>
          </div>
        </section>

        <TrustSection />
        <CTASection />
      </main>
      <RealImageSection imageKey="bancadaTecnica" secondaryImageKey="clienteSatisfeito" layout="duo" caption="Nossa bancada de trabalho profissional" secondaryCaption="Clientes satisfeitos com nosso atendimento" />
      <InterlinkingBlock />
      <Footer />
    </div>
  );
};

export default Sobre;
