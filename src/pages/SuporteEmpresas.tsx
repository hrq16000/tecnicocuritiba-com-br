import { useEffect } from "react";
import { Link } from "react-router-dom";
import { PageSEO } from "@/components/PageSEO";
import { Header } from "@/components/Header";
import BusinessHero from "@/components/b2b/BusinessHero";
import BusinessPageSchema from "@/components/b2b/BusinessPageSchema";
import BusinessContextGrid from "@/components/b2b/BusinessContextGrid";
import SupportModelComparison from "@/components/b2b/SupportModelComparison";
import ThirdPartyLimits from "@/components/b2b/ThirdPartyLimits";
import BusinessInlineCTA from "@/components/b2b/BusinessInlineCTA";
import BusinessContinuityPillars from "@/components/b2b/BusinessContinuityPillars";

import { BenefitsGrid } from "@/components/BenefitsGrid";
import { TrustSection } from "@/components/TrustSection";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import { InterlinkingBlock } from "@/components/InterlinkingBlock";
import { BlocoInteligencia } from "@/components/BlocoInteligencia";
import { RealImageSection } from "@/components/RealImageSection";
import { TriagemPJ } from "@/components/b2b/TriagemPJ";
import { JsonLdSchema } from "@/components/JsonLdSchema";
import PageSummaryBand from "@/components/PageSummaryBand";
import { trackPageView, trackCTAClick } from "@/lib/analytics";
import { Button } from "@/components/ui/button";
import { MessageCircle, Headphones, Clock, Building, CreditCard, FileText, CheckCircle, Users, Shield } from "lucide-react";

const WHATSAPP_NUMBER = "5541997452053";
const WHATSAPP_MESSAGE = "Olá! Preciso de suporte técnico para minha empresa.";

const BREADCRUMBS = [
  { name: "Início", path: "/" },
  { name: "Serviços", path: "/servicos" },
  { name: "Suporte Empresas", path: "/suporte-empresas" },
];

const FAQ_EMPRESAS = [
  { q: "Quais informações devo registrar antes de pedir suporte?", a: "Equipamento e usuário afetados, horário do início do problema, mensagem de erro, programa envolvido, alteração recente, impacto na operação, quantidade de pessoas afetadas, possibilidade de acesso remoto, existência de backup e quem autoriza alterações. Senhas e códigos de autenticação não devem ser enviados por mensagem." },
  { q: "Vocês atendem escritórios de diferentes segmentos?", a: "Sim. O atendimento é de informática generalista e cobre estações de trabalho, rede, impressão, backup e continuidade da operação, independentemente do segmento. Não oferecemos especialização setorial nem conformidade regulatória." },
  { q: "Vocês prestam suporte a qualquer sistema empresarial?", a: "Não. Verificamos o computador, a conectividade e registramos o erro, e podemos auxiliar na comunicação com o fornecedor. Correção interna do sistema, licenças e credenciais permanecem com quem mantém a plataforma." },
  { q: "Qual é a diferença entre atendimento avulso e recorrente?", a: "No avulso, o escopo é definido por solicitação e a prioridade segue a agenda. No recorrente, escopo, frequência e prioridades são definidos por um levantamento inicial dos equipamentos e usuários." },
  { q: "Atendimento recorrente significa suporte ilimitado?", a: "Não. Não trabalhamos com suporte ilimitado, franquia fixa de horas, monitoramento permanente ou tempo de resposta garantido. O escopo é sempre acordado a partir do levantamento." },
  { q: "Vocês corrigem problemas dentro de sistemas de terceiros?", a: "Não corrigimos código, não liberamos licença e não redefinimos credencial de terceiros. Executamos procedimentos autorizados no computador e na rede e indicamos quando o caso pertence ao fornecedor." },
  { q: "O técnico precisa conhecer minha senha?", a: "Somente quando o procedimento autorizado exigir, e sempre com o acesso mínimo necessário. Evitamos armazenar credenciais, encerramos as sessões e nunca pedimos códigos de autenticação por mensagem." },
];


const services = [
  {
    icon: Headphones,
    title: "Avulso ou Recorrente",
    description: "Atendimento por chamado, quando a demanda é pontual, ou acompanhamento recorrente definido a partir de um levantamento inicial.",
  },
  {
    icon: Clock,
    title: "Escopo Definido",
    description: "Cada solicitação tem escopo, autorização e prioridade acordados antes da execução. Sem promessa de disponibilidade permanente.",
  },
  {
    icon: Building,
    title: "Remoto e Presencial",
    description: "Atendimento híbrido: resolvemos problemas simples remotamente e vamos até sua empresa quando necessário.",
  },
  {
    icon: CreditCard,
    title: "Pagamento Facilitado",
    description: "Aceitamos pagamento faturado para empresas. Nota fiscal emitida em todos os serviços realizados.",
  },
];


const diferenciais = [
  {
    icon: FileText,
    title: "Nota Fiscal Garantida",
    description: "Emitimos nota fiscal de serviços para todos os atendimentos, facilitando sua contabilidade e controle de despesas de TI.",
  },
  {
    icon: Users,
    title: "Equipe Especializada",
    description: "Contamos com parcerias em todas as regiões de Curitiba e do Brasil, garantindo cobertura ampla e atendimento de alto padrão.",
  },
  {
    icon: Shield,
    title: "Confidencialidade",
    description: "Tratamos os dados da sua empresa com total sigilo e segurança. Políticas de privacidade e termos de confidencialidade quando necessário.",
  },
];

const SuporteEmpresas = () => {
  useEffect(() => {
    document.title = "Suporte de TI para Empresas em Curitiba | Contratos, M365 e Backup";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Suporte de TI para empresas em Curitiba: atendimento avulso ou recorrente, Microsoft 365, Google Workspace, backup, servidores e infraestrutura de rede. Nota fiscal e pagamento faturado."
      );
    }
    trackPageView("/suporte-empresas", "Suporte Empresas");

    // Schemas Service para sinais Premium PJ
    import("@/lib/schemaValidation").then(({ validateAndInjectSchema }) => {
      const baseProvider = { "@id": "https://tecnicocuritiba.com.br/#organization", "@type": "LocalBusiness", name: "Técnico em Curitiba", url: "https://tecnicocuritiba.com.br/", areaServed: "Curitiba e região metropolitana" };
      const services = [
        { id: "service-faturado", name: "Pagamento Faturado PJ", desc: "Atendimento técnico corporativo com pagamento faturado (boleto/30 dias) para empresas em Curitiba." },
        { id: "service-nfe", name: "Emissão de NF-e", desc: "Nota fiscal eletrônica em todos os atendimentos PJ, conforme legislação do Município de Curitiba." },
        { id: "service-infra", name: "Projetos de Infraestrutura de TI", desc: "Cabeamento estruturado, redes Wi-Fi corporativas, racks e configuração de servidores para PMEs." },
        { id: "service-premium", name: "Atendimento Recorrente PJ", desc: "Acompanhamento técnico recorrente definido por levantamento inicial: equipamentos, usuários, frequência, escopo e prioridades." },
      ];
      services.forEach((s) => {
        validateAndInjectSchema(s.id, {
          "@context": "https://schema.org",
          "@type": "Service",
          "@id": `https://tecnicocuritiba.com.br/suporte-empresas#${s.id}`,
          name: s.name,
          description: s.desc,
          serviceType: s.name,
          areaServed: { "@type": "City", name: "Curitiba" },
          provider: baseProvider,
          url: "https://tecnicocuritiba.com.br/suporte-empresas",
        });
      });
    });
  }, []);


  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  const handleCTAClick = () => {
    trackCTAClick("whatsapp", "empresas-cta");
  };

  return (
    <div className="min-h-screen bg-background">
      <PageSEO title="Suporte de TI para Empresas em Curitiba | Contratos, M365 e Backup" description="Suporte de TI para empresas em Curitiba: atendimento avulso ou recorrente, Microsoft 365, Google Workspace, backup, servidores e infraestrutura de rede. Nota fiscal e pagamento faturado." path="/suporte-empresas" breadcrumbs={BREADCRUMBS} />
      <JsonLdSchema />
      <BusinessPageSchema
        id="suporte-empresas"
        path="/suporte-empresas"
        name="Suporte Técnico Empresarial em Curitiba"
        description="Suporte de TI para empresas em Curitiba: estações de trabalho, rede, impressão, backup e continuidade da operação, em atendimento avulso ou recorrente."
        breadcrumbs={BREADCRUMBS}
        faq={FAQ_EMPRESAS}
      />
      <Header />
      <main id="main-content">
        <BusinessHero
          eyebrow="Suporte técnico empresarial em Curitiba"
          title="Suporte Técnico para Empresas"
          titleSuffix="Estações de trabalho, rede, impressão e continuidade da operação"
          description="Atendimento de informática para pequenas e médias empresas em Curitiba e região. Escopo definido por solicitação no avulso, ou por levantamento inicial no acompanhamento recorrente — sempre com autorização antes da execução."
          whatsappUrl={whatsappUrl}
          ctaLabel="Solicitar proposta comercial"
          ctaLocation="suporte_empresas_hero"
          secondary={{ label: "Ver preços e políticas", to: "/precos-e-politicas" }}
          signals={[
            "Nota fiscal em todos os atendimentos",
            "Pagamento faturado para PJ",
            "Remoto e presencial",
            "Limites de escopo declarados",
          ]}
        />


        <BenefitsGrid
          benefits={services}
          title="Serviços para Sua Empresa"
          subtitle="Suporte técnico empresarial completo e profissional"
        />

        <BusinessContinuityPillars
          id="pilares-operacionais"
          title="Pilares do atendimento empresarial"
          intro="Quatro frentes que sustentam a operação no dia a dia. Cada pilar leva ao serviço correspondente — sem criar pacote, plano ou mensalidade."
          pillars={[
            {
              icon: Users,
              title: "Computadores e usuários",
              description: "Lentidão, falhas, configurações, estações de trabalho e suporte ao usuário que depende do equipamento para produzir.",
              to: "/servicos/manutencao-de-computador",
              linkLabel: "Manutenção de computador",
            },
            {
              icon: Building,
              title: "Redes e conectividade",
              description: "Wi-Fi, comunicação entre setores, impressoras em rede, compartilhamento de arquivos e estabilidade da conexão local.",
              to: "/servicos/redes-wifi",
              linkLabel: "Redes e Wi-Fi",
            },
            {
              icon: Shield,
              title: "Prevenção e continuidade",
              description: "Manutenção preventiva, backup, avaliação de riscos, organização do ambiente e recomendações antes da parada acontecer.",
              to: "/servicos/backup-recuperacao",
              linkLabel: "Backup e recuperação",
            },
            {
              icon: Headphones,
              title: "Atendimento remoto e presencial",
              description: "Triagem da demanda, definição da modalidade compatível e limites do que pode ser resolvido sem deslocamento.",
              to: "/atendimento-remoto",
              linkLabel: "Atendimento remoto",
            },
          ]}
        />

        <PageSummaryBand
          className="container mx-auto px-4"
          summary="Suporte técnico empresarial em Curitiba para estações de trabalho, rede, impressão e continuidade da operação — atendimento avulso ou recorrente, com limites de escopo explícitos."
          items={[
            { id: "pilares-operacionais", label: "Pilares do atendimento" },
            { id: "contextos-empresariais", label: "Contextos empresariais atendidos" },
            { id: "antes-do-suporte", label: "O que registrar antes do chamado" },
            { id: "avulso-ou-recorrente", label: "Avulso ou recorrente" },
            { id: "limites-terceiros", label: "Limites com sistemas de terceiros" },
            { id: "credenciais-e-acessos", label: "Credenciais e acessos" },
            { id: "faq-empresas", label: "Perguntas frequentes" },
          ]}
        />


        <TriagemPJ />

        {/* O Que Está Incluso */}
        <section className="py-8 md:py-10 bg-background">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 text-center">
                O Que Está Incluso no Suporte Empresarial?
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-muted/30 rounded-xl p-6 border border-primary/5">
                  <h3 className="font-semibold text-foreground mb-3 text-lg">Manutenção Preventiva</h3>
                  <ul className="space-y-2 text-muted-foreground text-sm">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-accent rounded-full"></span>
                      Limpeza e otimização de computadores
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-accent rounded-full"></span>
                      Atualização de softwares e sistemas
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-accent rounded-full"></span>
                      Verificação de segurança e antivírus
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-accent rounded-full"></span>
                      Backup e proteção de dados corporativos
                    </li>
                  </ul>
                </div>

                <div className="bg-muted/30 rounded-xl p-6 border border-primary/5">
                  <h3 className="font-semibold text-foreground mb-3 text-lg">Suporte Técnico</h3>
                  <ul className="space-y-2 text-muted-foreground text-sm">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-accent rounded-full"></span>
                      Atendimento remoto conforme escopo autorizado
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-accent rounded-full"></span>
                      Visitas técnicas quando necessário
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-accent rounded-full"></span>
                      Suporte a redes e Wi-Fi corporativo
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-accent rounded-full"></span>
                      Instalação e configuração de equipamentos
                    </li>
                  </ul>
                </div>

                <div className="bg-muted/30 rounded-xl p-6 border border-primary/5">
                  <h3 className="font-semibold text-foreground mb-3 text-lg">Infraestrutura</h3>
                  <ul className="space-y-2 text-muted-foreground text-sm">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-accent rounded-full"></span>
                      Configuração de servidores locais
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-accent rounded-full"></span>
                      Gestão de rede local e cabeamento
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-accent rounded-full"></span>
                      Segurança e firewall empresarial
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-accent rounded-full"></span>
                      VPN para colaboradores remotos
                    </li>
                  </ul>
                </div>

                <div className="bg-muted/30 rounded-xl p-6 border border-primary/5">
                  <h3 className="font-semibold text-foreground mb-3 text-lg">Consultoria</h3>
                  <ul className="space-y-2 text-muted-foreground text-sm">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-accent rounded-full"></span>
                      Análise de necessidades de TI
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-accent rounded-full"></span>
                      Recomendação de equipamentos
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-accent rounded-full"></span>
                      Planejamento de upgrades
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-accent rounded-full"></span>
                      Treinamento básico de equipe
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Diferenciais */}
        <section className="py-8 md:py-10 bg-secondary">
          <div className="container mx-auto">
            <div className="text-center mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                Por Que Empresas Escolhem a Técnico em Curitiba?
              </h2>
              <p className="text-muted-foreground text-lg">
                Diferenciais que fazem a diferença no dia a dia da sua empresa
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {diferenciais.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={index}
                    className="bg-background rounded-xl p-6 text-center hover:shadow-lg transition-all"
                  >
                    <div className="bg-accent rounded-full p-4 w-fit mx-auto mb-4">
                      <Icon className="h-8 w-8 text-accent-foreground" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">{item.title}</h3>
                    <p className="text-muted-foreground text-sm">{item.description}</p>
                  </div>
                );
              })}
            </div>

          </div>
        </section>

        {/* Contextos empresariais atendidos */}
        <BusinessContextGrid
          id="contextos-empresariais"
          title="Contextos empresariais que podem precisar de suporte"
          intro="Atendemos empresas de diferentes segmentos com suporte de informática generalista. Abaixo estão contextos operacionais comuns — e não promessas de especialização setorial."
          contexts={[
            {
              title: "Escritórios que trabalham com arquivos sensíveis",
              body: "Estações de trabalho, impressão e digitalização, organização de arquivos, backup, múltiplos monitores, conectividade e atendimento remoto — com atenção à continuidade durante períodos de prazo importante. Não prestamos suporte especializado a sistemas judiciais, certificados digitais complexos ou assinatura eletrônica avançada, nem prometemos conformidade regulatória.",
            },
            {
              title: "Recepções e postos de atendimento ao público",
              body: "Computador da recepção, impressora em rede, Wi-Fi, arquivos, câmera e áudio para atendimento, acesso a sistemas de terceiros e continuidade do posto de trabalho. O suporte de informática não inclui manutenção de equipamentos médicos, laboratoriais ou outros dispositivos especializados.",
            },
            {
              title: "Operações com períodos de fechamento",
              body: "Aumento temporário de uso, vários programas abertos ao mesmo tempo, impressoras, armazenamento, backup, estações e acesso remoto. Nesses casos o planejamento preventivo antecede o período crítico. Não prometemos suporte especializado a software contábil ou fiscal de terceiros.",
            },
            {
              title: "Profissionais que usam arquivos e programas exigentes",
              body: (
                <>
                  Estações de trabalho, memória, armazenamento, múltiplos monitores, refrigeração, backup e rede — além da{" "}
                  <Link to="/servicos/montagem-pc#workstations" className="text-primary underline underline-offset-4">montagem de workstation</Link>{" "}
                  a partir do levantamento de requisitos. Não citamos desempenho garantido em software específico.
                </>
              ),
            },
          ]}
        />

        {/* O que registrar antes de solicitar suporte */}
        <section className="py-8 md:py-10 bg-secondary" id="antes-do-suporte" style={{scrollMarginTop:"6rem"}}  aria-labelledby="antes-titulo">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 id="antes-titulo" className="text-2xl md:text-3xl font-bold text-foreground mb-3 text-center">
              O que registrar antes de solicitar suporte
            </h2>
            <p className="text-muted-foreground text-center mb-8">
              Informações objetivas sobre o equipamento, o erro e o impacto ajudam a direcionar a triagem. Senhas e
              códigos de autenticação não devem ser enviados por mensagem.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-background rounded-xl p-6">
                <h3 className="font-semibold text-foreground mb-3">Registre</h3>
                <ul className="space-y-2 text-muted-foreground text-sm list-disc pl-5">
                  <li>Equipamento afetado e usuário afetado</li>
                  <li>Horário aproximado em que o problema começou</li>
                  <li>Mensagem de erro exata, se houver</li>
                  <li>Programa envolvido e alteração recente no ambiente</li>
                  <li>Impacto na operação e quantidade de pessoas afetadas</li>
                  <li>Se é possível acesso remoto ao equipamento</li>
                  <li>Se existe backup atualizado</li>
                  <li>Quem autoriza alterações no equipamento</li>
                  <li>Contato do fornecedor do sistema, quando aplicável</li>
                </ul>
              </div>
              <div className="bg-background rounded-xl p-6 border border-destructive/30">
                <h3 className="font-semibold text-foreground mb-3">Não envie por mensagem</h3>
                <ul className="space-y-2 text-muted-foreground text-sm list-disc pl-5">
                  <li>Senhas de qualquer sistema</li>
                  <li>Códigos de autenticação em duas etapas</li>
                  <li>Dados bancários</li>
                  <li>Arquivos confidenciais</li>
                  <li>Acesso administrativo sem necessidade comprovada</li>
                  <li>Documentos pessoais</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Atendimento avulso ou recorrente */}
        <SupportModelComparison
          id="avulso-ou-recorrente"
          title="Atendimento avulso ou recorrente"
          intro="São dois modelos de organização do atendimento. Nenhum deles é automaticamente melhor: a escolha depende do número de equipamentos, da frequência das demandas e de como a empresa prefere acompanhar o histórico."
          avulso={{
            title: "Atendimento avulso",
            lead: "Indicado para problema pontual, computador específico, instalação, ajuste, falha de rede, diagnóstico, manutenção, suporte remoto ou demanda sem recorrência prevista.",
            bullets: [
              "Escopo definido por solicitação",
              "Prioridade conforme agenda disponível",
              "Valor conforme diagnóstico e autorização prévia",
              "Peças e serviços externos cobrados à parte",
              "Não há disponibilidade permanente",
            ],
          }}
          recorrente={{
            title: "Atendimento recorrente",
            lead: "Faz sentido quando existem vários computadores, demandas frequentes, necessidade de manutenção preventiva, usuários que precisam de suporte periódico, rede compartilhada, backup que exige revisão e necessidade de histórico organizado.",
            note: "O modelo recorrente depende de levantamento inicial: quantidade de equipamentos, usuários, frequência, modalidades, escopo, horários, prioridades e responsabilidades. Não trabalhamos com suporte ilimitado, franquia fixa de horas, monitoramento permanente ou tempo de resposta garantido.",
          }}
          rows={[
            ["Uso", "Demanda pontual", "Necessidades frequentes"],
            ["Escopo", "Definido por chamado", "Definido por acordo"],
            ["Histórico", "Por atendimento", "Acompanhamento organizado"],
            ["Preventiva", "Contratada separadamente", "Pode fazer parte do escopo"],
            ["Prioridade", "Conforme agenda", "Conforme regra acordada"],
            ["Valor", "Conforme serviço", "Conforme levantamento"],
          ]}
          decisionNote="O atendimento recorrente não significa suporte ilimitado. Frequência, prioridade, modalidades e responsabilidades precisam ser definidas no escopo contratado."
        />

        <BusinessInlineCTA
          title="Descrever a necessidade da empresa"
          description="Conte o equipamento afetado, o impacto na operação e quantas pessoas estão paradas. A triagem indica a modalidade e o próximo passo antes de qualquer execução."
          whatsappUrl={whatsappUrl}
          ctaLabel="Descrever a necessidade da empresa"
          ctaLocation="suporte_empresas_inline"
          onClick={handleCTAClick}
        />

        {/* Limites por contexto e sistemas de terceiros */}
        <ThirdPartyLimits
          id="limites-terceiros"
          title="O que depende de fornecedor, autorização ou especialização"
          intro="Parte dos problemas relatados no dia a dia não está no computador, e sim em um sistema mantido por terceiros: software empresarial, sistema contábil, prontuário, sistema judicial, ERP, CRM, certificado digital, e-mail corporativo, domínio, provedor, operadora, fabricante ou o próprio administrador da empresa."
          columns={[
            {
              title: "O suporte pode",
              items: [
                "Verificar o computador e o ambiente local",
                "Validar conectividade e rede",
                "Registrar o erro e as evidências",
                "Auxiliar na comunicação com o fornecedor",
                "Executar procedimentos autorizados pela empresa",
                "Configurar componentes compatíveis",
              ],
            },
            {
              title: "O suporte não promete",
              tone: "warning",
              items: [
                "Corrigir código de sistema de terceiros",
                "Liberar licença ou redefinir credencial de terceiro",
                "Alterar política corporativa",
                "Garantir funcionamento de plataforma externa",
                "Substituir o suporte oficial do fornecedor",
                "Burlar restrições ou assumir responsabilidade por indisponibilidade externa",
              ],
            },
          ]}
          footer={
            <>
              Boas práticas de proteção de arquivos e acessos estão detalhadas em{" "}
              <Link to="/seguranca-dos-dados" className="text-primary underline underline-offset-4">segurança dos dados</Link>.
            </>
          }
        />


        {/* Sistemas, credenciais e acessos de terceiros */}
        <section className="py-8 md:py-10 bg-background" id="credenciais-e-acessos" style={{scrollMarginTop:"6rem"}}  aria-labelledby="credenciais-titulo">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 id="credenciais-titulo" className="text-2xl md:text-3xl font-bold text-foreground mb-3 text-center">
              Sistemas, credenciais e acessos de terceiros
            </h2>
            <p className="text-muted-foreground text-center max-w-3xl mx-auto mb-8">
              O acesso ao computador não garante acesso ou correção de sistemas mantidos por terceiros. Senhas, códigos
              de autenticação e credenciais bancárias não devem ser enviados por mensagem. Quando o problema pertence ao
              sistema externo, pode ser necessário acionar o fornecedor responsável.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-muted/30 rounded-xl p-6 border border-primary/5">
                <h3 className="font-semibold text-foreground mb-3">Responsabilidade do cliente</h3>
                <ul className="space-y-2 text-muted-foreground text-sm list-disc pl-5">
                  <li>Possuir licença legítima dos programas</li>
                  <li>Indicar quem autoriza alterações</li>
                  <li>Manter acesso ao e-mail de recuperação</li>
                  <li>Preservar códigos de autenticação</li>
                  <li>Conhecer o fornecedor e manter contratos e cadastros</li>
                  <li>Informar restrições internas</li>
                  <li>Manter backup e não compartilhar senha sem necessidade</li>
                </ul>
              </div>
              <div className="bg-muted/30 rounded-xl p-6 border border-primary/5">
                <h3 className="font-semibold text-foreground mb-3">Responsabilidade do técnico</h3>
                <ul className="space-y-2 text-muted-foreground text-sm list-disc pl-5">
                  <li>Solicitar apenas o acesso necessário</li>
                  <li>Explicar o procedimento antes de executar</li>
                  <li>Evitar armazenar credenciais e encerrar sessões</li>
                  <li>Não alterar configuração além do autorizado</li>
                  <li>Registrar limitações encontradas</li>
                  <li>Orientar o contato com o fornecedor quando necessário</li>
                  <li>Não burlar proteção de nenhum sistema</li>
                </ul>
              </div>
              <div className="bg-muted/30 rounded-xl p-6 border border-primary/5">
                <h3 className="font-semibold text-foreground mb-3">Responsabilidade do fornecedor</h3>
                <ul className="space-y-2 text-muted-foreground text-sm list-disc pl-5">
                  <li>Licença e disponibilidade do serviço</li>
                  <li>Servidor e infraestrutura da plataforma</li>
                  <li>Correção de erro interno e atualização</li>
                  <li>Recuperação de conta e regras de autenticação</li>
                  <li>Suporte ao sistema, integração e documentação</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <TrustSection />

        {/* FAQ contextual */}
        <section className="py-8 md:py-10 bg-secondary scroll-mt-24" id="faq-empresas-sec" aria-labelledby="faq-empresas">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 id="faq-empresas" className="scroll-mt-24 text-2xl md:text-3xl font-bold text-foreground mb-6 text-center">
              Perguntas frequentes de empresas
            </h2>
            <div className="space-y-5">
              {FAQ_EMPRESAS.map((item) => (

                <div key={item.q} className="bg-background rounded-xl p-6">
                  <h3 className="font-bold text-foreground mb-2">{item.q}</h3>
                  <p className="text-muted-foreground text-sm">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Navegação contextual */}
        <section className="py-8 bg-background" aria-labelledby="continuar-empresas">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 id="continuar-empresas" className="text-2xl font-bold text-foreground mb-4">
              Continue por aqui
            </h2>
            <ul className="grid md:grid-cols-2 gap-3 text-sm">
              <li><Link to="/servicos/montagem-pc#workstations" className="text-primary underline underline-offset-4">Workstations e montagem de PC</Link> — hardware e configuração para cargas exigentes.</li>
              <li><Link to="/servicos/backup-recuperacao" className="text-primary underline underline-offset-4">Backup e recuperação</Link> — prevenção e restauração de arquivos.</li>
              <li><Link to="/servicos/redes-wifi" className="text-primary underline underline-offset-4">Redes e Wi-Fi</Link> — rede local, cabeamento e cobertura.</li>
              <li><Link to="/atendimento-remoto" className="text-primary underline underline-offset-4">Atendimento remoto</Link> — o que resolvemos sem deslocamento.</li>
              <li><Link to="/precos-e-politicas" className="text-primary underline underline-offset-4">Preços e políticas</Link> — diagnóstico, aprovação e garantia.</li>
              <li><Link to="/guias/organizacao-de-ti-para-escritorios" className="text-primary underline underline-offset-4">Organização de TI para pequenos escritórios</Link> — guia prático de preparação.</li>
            </ul>
          </div>
        </section>


        <CTASection />
      </main>
      <RealImageSection imageKey="servidores" secondaryImageKey="redesWifi" layout="duo" caption="Infraestrutura de rede empresarial" secondaryCaption="Configuração profissional de redes corporativas" />
      <BlocoInteligencia />
      <InterlinkingBlock />
      <Footer />
    </div>
  );
};

export default SuporteEmpresas;
