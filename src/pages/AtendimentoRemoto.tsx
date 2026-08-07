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

const ELEGIBILIDADE = [
  {
    title: "O computador inicia",
    body: "O equipamento precisa ligar e permitir acesso ao sistema para que a sessão remota seja possível.",
  },
  {
    title: "Há conexão com a internet",
    body: "A estabilidade da conexão influencia diretamente o andamento e a duração da sessão.",
  },
  {
    title: "O usuário pode autorizar",
    body: "A pessoa responsável pelo equipamento precisa acompanhar ou autorizar o acesso durante o atendimento.",
  },
  {
    title: "O problema é compatível",
    body: "Falha física, ausência de imagem, falta de energia e equipamento que não liga podem exigir atendimento presencial.",
  },
];

const FLUXO = [
  ["Solicitação", "Você descreve o problema pelo WhatsApp."],
  ["Triagem", "Perguntas objetivas para entender o sintoma e o equipamento."],
  ["Confirmação de compatibilidade", "Avaliamos se o caso pode ser tratado à distância."],
  ["Autorização", "Você confirma o acesso e acompanha a sessão."],
  ["Acesso temporário", "Conexão com código temporário, sem instalação de acesso permanente."],
  ["Procedimento", "Execução do que foi combinado, com você acompanhando na tela."],
  ["Encerramento da sessão", "Conexão finalizada e acesso revogado ao término."],
  ["Orientação", "Explicação do que foi feito e do que evitar daqui em diante."],
];

const FAQ = [
  {
    q: "Atendimento remoto serve para residência e para empresa?",
    a: "Sim. A modalidade é a mesma para computador de casa, home office, profissional autônomo e equipamento de escritório. Muda apenas quem autoriza o acesso: no ambiente empresarial a autorização vem de quem responde pelo equipamento.",
  },
  {
    q: "Como o acesso ao meu computador é autorizado?",
    a: "A sessão só começa com o seu consentimento e um código temporário informado por você. Você acompanha a tela durante todo o atendimento, pode encerrar a qualquer momento e o acesso é revogado ao final. Não deixamos acesso permanente instalado.",
  },
  {
    q: "Todo problema pode ser resolvido remotamente?",
    a: "Não. O acesso remoto resolve software, configuração e verificação. Quando há suspeita de falha física, ausência de imagem, falta de energia ou risco para os dados, o caso passa para atendimento presencial, coleta ou bancada.",
  },
  {
    q: "Preciso enviar minhas senhas antes da sessão?",
    a: "Não. Nunca peça nem envie senha bancária, código de autenticação em duas etapas ou chave de recuperação por mensagem. Quando um acesso é necessário, ele é o mínimo indispensável e limitado ao tempo do atendimento.",
  },
  {
    q: "O atendimento remoto é um plano mensal ou monitoramento contínuo?",
    a: "Não. É atendimento por chamado, com escopo definido em cada sessão. Não oferecemos plano mensal, monitoramento permanente, antivírus gerenciado nem suporte ilimitado.",
  },
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
      <BusinessPageSchema
        id="atendimento-remoto"
        path="/atendimento-remoto"
        name="Atendimento remoto de informática em Curitiba"
        description="Modalidade de atendimento por acesso autorizado ao computador, para uso residencial e empresarial, com limites e requisitos definidos."
        breadcrumbs={[{ name: "Início", path: "/" }, { name: "Serviços", path: "/servicos" }, { name: "Atendimento Remoto", path: "/atendimento-remoto" }]}
        faq={FAQ}
      />
      <Header />
      <main id="main-content">
        <PageHero
          title="Atendimento Remoto de Informática"
          subtitle="Conserto de problemas do seu computador sem sair de casa"
          ctaText="Chame no WhatsApp"
        />

        <ServiceHeroSummary
          summary="Atendimento remoto é uma modalidade: acesso autorizado e temporário ao computador — de casa, do home office ou do escritório — para resolver o que é software. Cada sessão é por chamado, não é plano nem monitoramento contínuo. Problema físico continua exigindo visita ou coleta."
          items={[
            { id: "vantagens", label: "Quando o atendimento remoto ajuda" },
            { id: "requisitos", label: "Requisitos" },
            { id: "fluxo", label: "Como funciona" },
            { id: "autorizacao", label: "Segurança e autorização" },
            { id: "contextos-remoto", label: "Situações atendidas" },
            { id: "limites-remoto", label: "O que não pode ser resolvido remotamente" },
            { id: "perguntas", label: "Perguntas frequentes" },
          ]}
        />

        <div id="vantagens" className="scroll-mt-24">
          <BenefitsGrid
            benefits={benefits}
            title="Por Que Escolher o Atendimento Remoto?"
            subtitle="Solução rápida, prática e segura para resolver problemas de informática"
          />
        </div>

        <section id="requisitos" className="scroll-mt-24 bg-secondary py-8 md:py-10">
          <div className="container mx-auto max-w-4xl px-4">
            <h2 className="text-center font-heading text-2xl font-bold text-foreground md:text-3xl">
              Requisitos para o atendimento remoto
            </h2>
            <p className="mt-3 text-center text-muted-foreground">
              Antes de conectar, verificamos quatro condições. Se alguma não for atendida, indicamos{" "}
              <Link to="/atendimento-domicilio" className="text-accent underline underline-offset-2">
                atendimento a domicílio
              </Link>{" "}
              ou coleta.
            </p>
            <ul className="mt-6 grid gap-4 md:grid-cols-2">
              {ELEGIBILIDADE.map((item) => (
                <li key={item.title} className="rounded-xl border border-border bg-background p-5">
                  <h3 className="text-base font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>


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
