import { useEffect } from "react";
import { Link } from "react-router-dom";
import { PageSEO } from "@/components/PageSEO";
import { Header } from "@/components/Header";
import { PageHero } from "@/components/PageHero";
import { BenefitsGrid } from "@/components/BenefitsGrid";
import { TrustSection } from "@/components/TrustSection";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import { InterlinkingBlock } from "@/components/InterlinkingBlock";
import { RealImageSection } from "@/components/RealImageSection";
import { JsonLdSchema } from "@/components/JsonLdSchema";
import ServiceHeroSummary from "@/components/ServiceHeroSummary";
import BusinessContextGrid from "@/components/b2b/BusinessContextGrid";
import ThirdPartyLimits from "@/components/b2b/ThirdPartyLimits";
import { trackPageView } from "@/lib/analytics";
import { MessageCircle, Zap, Download, MapPinOff } from "lucide-react";

const benefits = [
  {
    icon: MessageCircle,
    title: "Suporte via WhatsApp",
    description: "Atendimento imediato pelo WhatsApp com resposta rápida e eficiente"
  },
  {
    icon: Zap,
    title: "Diagnóstico Rápido",
    description: "Identificamos e resolvemos o problema do seu computador em minutos"
  },
  {
    icon: Download,
    title: "Instalação de Software",
    description: "Instalamos e configuramos programas, drivers e atualizações"
  },
  {
    icon: MapPinOff,
    title: "Sem Deslocamento",
    description: "Resolva tudo sem sair de casa, economize tempo e dinheiro"
  }
];

const AtendimentoRemoto = () => {
  useEffect(() => {
    document.title = "Atendimento Remoto de Informática em Curitiba | Técnico em Curitiba";
    trackPageView("/atendimento-remoto", "Atendimento Remoto");
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <PageSEO title="Atendimento Remoto de Informática em Curitiba | Técnico em Curitiba" description="Suporte técnico remoto em Curitiba: lentidão, vírus, erros do Windows, drivers e configuração de programas resolvidos por acesso autorizado, sem visita. Veja o que é possível resolver à distância e o que exige atendimento presencial." path="/atendimento-remoto" breadcrumbs={[{ name: "Início", path: "/" }, { name: "Serviços", path: "/servicos" }, { name: "Atendimento Remoto", path: "/atendimento-remoto" }]} />
      <JsonLdSchema />
      <Header />
      <main id="main-content">
        <PageHero
          title="Atendimento Remoto de Informática"
          subtitle="Conserto de problemas do seu computador sem sair de casa"
          ctaText="Chame no WhatsApp"
        />

        <ServiceHeroSummary
          summary="Atendimento remoto é acesso autorizado ao seu computador para resolver o que é software: lentidão, vírus, erros do Windows, drivers, impressora em rede e configuração de programas. Problema físico continua exigindo visita ou coleta."
          items={[
            { id: "vantagens", label: "Por que o atendimento remoto" },
            { id: "como-funciona", label: "Como funciona" },
            { id: "contextos-remoto", label: "Situações atendidas" },
            { id: "limites-remoto", label: "O que não é possível remotamente" },
          ]}
        />

        <div id="vantagens" className="scroll-mt-24">
          <BenefitsGrid
            benefits={benefits}
            title="Por Que Escolher o Atendimento Remoto?"
            subtitle="Solução rápida, prática e segura para resolver problemas de informática"
          />
        </div>

        <section id="como-funciona" className="scroll-mt-24 py-8 md:py-10 bg-background">
          <div className="container mx-auto">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 text-center">
                Como Funciona o Atendimento Remoto?
              </h2>
              
              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Entre em Contato</h3>
                    <p className="text-muted-foreground">
                      Envie uma mensagem pelo WhatsApp explicando o problema do seu computador.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Conectamos ao Seu PC</h3>
                    <p className="text-muted-foreground">
                      Com sua autorização, usamos um software seguro para acessar seu computador remotamente.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Resolvemos o Problema</h3>
                    <p className="text-muted-foreground">
                      Você acompanha tudo na tela enquanto corrigimos vírus, lentidão, erros e outros problemas.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <BusinessContextGrid
          id="contextos-remoto"
          title="Situações atendidas à distância"
          intro="Casos em que o acesso remoto costuma resolver sem visita — no computador de casa ou no equipamento de trabalho. O escopo é o mesmo: software, configuração e verificação."
          contexts={[
            {
              title: "Computador lento ou travando",
              body: "Verificação de programas em inicialização, uso de disco e memória, atualizações pendentes e limpeza de sistema. Limite: lentidão causada por disco com falha ou superaquecimento precisa de avaliação presencial.",
            },
            {
              title: "Vírus, anúncios e sequestro de navegador",
              body: "Remoção de extensões e programas indesejados, verificação com ferramenta autorizada e reconfiguração do navegador. Limite: infecção que impede o sistema de iniciar exige atendimento presencial ou coleta.",
            },
            {
              title: "Programa, impressora ou conta que parou",
              body: "Reinstalação de programa, driver, impressora em rede e reconfiguração de conta de e-mail no computador. Limite: falha mecânica ou eletrônica da impressora é da assistência autorizada da marca.",
            },
            {
              title: "Home office e computador de escritório",
              body: "Mesma execução técnica, com autorização de quem responde pelo equipamento e registro do que foi acessado. Limite: atendimento remoto é por chamado, não é plano mensal, monitoramento nem suporte ilimitado.",
            },
          ]}
        />

        <ThirdPartyLimits
          id="limites-remoto"
          title="O que não é possível resolver remotamente"
          intro={
            <>
              Transparência antes de conectar: o acesso remoto resolve software, não hardware. O tratamento dos
              seus arquivos e credenciais durante a sessão segue o que está descrito em{" "}
              <Link to="/seguranca-dos-dados" className="text-accent underline underline-offset-2">
                segurança dos dados
              </Link>
              .
            </>
          }
          columns={[
            {
              title: "Resolvemos remotamente",
              items: [
                "Lentidão, erros e travamentos do Windows",
                "Vírus, adware e navegador sequestrado",
                "Drivers, programas e impressora em rede",
                "Configuração de conta de e-mail e nuvem",
                "Orientação e verificação acompanhada na tela",
              ],
            },
            {
              title: "Exige visita ou coleta",
              tone: "warning",
              items: [
                "Computador que não liga ou não inicia o sistema",
                "Troca de peças, SSD, memória ou fonte",
                "Limpeza interna e pasta térmica",
                "Tela, teclado ou conector com dano físico",
                "Cabeamento e instalação de rede no ambiente",
              ],
            },
            {
              title: "Depende de terceiros",
              items: [
                "Link e velocidade contratados da operadora",
                "Licença e suporte interno de sistemas contratados",
                "Recuperação de conta junto ao provedor",
                "Garantia de fabricante em equipamento novo",
              ],
            },
          ]}
          footer="A sessão remota só é iniciada com sua autorização e você acompanha tudo na tela. Não instalamos acesso permanente."
        />

        <TrustSection />
        <CTASection />
      </main>
      <RealImageSection imageKey="suporteRemoto" caption="Suporte técnico remoto profissional" />
      <InterlinkingBlock />
      <Footer />
    </div>
  );
};

export default AtendimentoRemoto;
