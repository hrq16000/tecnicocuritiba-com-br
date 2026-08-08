import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { ShieldCheck, Cookie, Database, MessageCircle, FileText } from "lucide-react";

const CANONICAL = "https://tecnicocuritiba.com.br/politica-de-privacidade";
const COMPANY = "Técnico em Curitiba — Assistência Técnica em Informática";
const CNPJ = "41.723.708/0001-58";
const WHATSAPP = "5541997452053";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Olá! Tenho uma dúvida sobre a Política de Privacidade do site.")}`;
const UPDATED = "24/06/2026";

const sections: { id: string; title: string; icon: typeof ShieldCheck; body: React.ReactNode }[] = [
  {
    id: "controlador",
    title: "1. Quem somos (Controlador dos dados)",
    icon: FileText,
    body: (
      <>
        <p>
          Esta Política de Privacidade aplica-se ao site{" "}
          <strong>tecnicocuritiba.com.br</strong>, operado por <strong>{COMPANY}</strong>,
          inscrita no CNPJ {CNPJ}, com atendimento em Curitiba e Região Metropolitana – PR.
        </p>
        <p className="mt-2">
          Contato do encarregado (DPO) exclusivamente pelo{" "}
          <a href={WHATSAPP_URL} className="text-accent underline" data-cta-location="privacy_dpo_whatsapp">WhatsApp do site</a>.
        </p>
      </>
    ),
  },
  {
    id: "dados",
    title: "2. Dados que coletamos",
    icon: Database,
    body: (
      <ul className="list-disc pl-5 space-y-1.5">
        <li><strong>Dados de contato:</strong> nome, telefone/WhatsApp e endereço/bairro — informados por você ao solicitar atendimento.</li>
        <li><strong>Descrição do problema:</strong> texto, fotos ou vídeos enviados para diagnóstico.</li>
        <li><strong>Dados de navegação:</strong> páginas visitadas, dispositivo, origem do tráfego e cookies (ver seção 5).</li>
        <li><strong>Dados de cobrança:</strong> apenas quando há serviço executado (nota fiscal/recibo).</li>
      </ul>
    ),
  },
  {
    id: "finalidades",
    title: "3. Para que usamos seus dados",
    icon: ShieldCheck,
    body: (
      <ul className="list-disc pl-5 space-y-1.5">
        <li>Responder solicitações de orçamento e suporte pelo WhatsApp/telefone.</li>
        <li>Executar e dar garantia ao serviço técnico contratado.</li>
        <li>Emitir nota fiscal e cumprir obrigações legais/fiscais.</li>
        <li>Melhorar o site, medir desempenho de campanhas e prevenir fraude.</li>
      </ul>
    ),
  },
  {
    id: "base-legal",
    title: "4. Base legal (LGPD — Lei 13.709/2018)",
    icon: FileText,
    body: (
      <ul className="list-disc pl-5 space-y-1.5">
        <li><strong>Execução de contrato</strong> (art. 7º, V) — para atender o pedido de serviço.</li>
        <li><strong>Cumprimento de obrigação legal</strong> (art. 7º, II) — nota fiscal, fiscalização.</li>
        <li><strong>Legítimo interesse</strong> (art. 7º, IX) — segurança, prevenção de fraude e melhoria do serviço.</li>
        <li><strong>Consentimento</strong> (art. 7º, I) — cookies de marketing/analytics, conforme o banner.</li>
      </ul>
    ),
  },
  {
    id: "cookies",
    title: "5. Cookies e tecnologias semelhantes",
    icon: Cookie,
    body: (
      <>
        <p>
          Usamos cookies essenciais (funcionamento do site), de análise (Google Analytics 4) e de
          marketing (Google Ads), sempre respeitando seu consentimento via banner LGPD. Por padrão,
          cookies de análise e publicidade ficam <strong>negados</strong> até você aceitar
          (Google Consent Mode v2).
        </p>
        <p className="mt-2">
          <strong>Anúncios de terceiros:</strong> fornecedores terceirizados, incluindo o Google,
          podem usar cookies para veicular anúncios com base em visitas anteriores deste e de outros
          sites. O Google usa cookies de publicidade para exibir anúncios com base nas suas visitas
          ao nosso site e a outros sites na Internet. Você pode desativar a publicidade personalizada
          nas{" "}
          <a
            href="https://www.google.com/settings/ads"
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="text-accent underline"
          >
            Configurações de anúncios do Google
          </a>{" "}
          ou desativar cookies de terceiros em{" "}
          <a
            href="https://www.aboutads.info/choices/"
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="text-accent underline"
          >
            aboutads.info/choices
          </a>
          . Detalhes sobre rotulagem de anúncios e ads.txt estão na{" "}
          <Link to="/politica-de-publicidade" className="text-accent underline">
            Política de Publicidade
          </Link>
          .
        </p>
        <p className="mt-2">
          Você pode revogar o consentimento a qualquer momento limpando os cookies do site no seu
          navegador.
        </p>
      </>
    ),
  },
  {
    id: "compartilhamento",
    title: "6. Com quem compartilhamos",
    icon: Database,
    body: (
      <ul className="list-disc pl-5 space-y-1.5">
        <li><strong>WhatsApp/Meta</strong> — para a conversa de atendimento.</li>
        <li><strong>Google (Analytics e Ads)</strong> — métricas e otimização de anúncios.</li>
        <li><strong>Provedor de hospedagem</strong> — armazenamento técnico do site.</li>
        <li>Não vendemos seus dados a terceiros.</li>
      </ul>
    ),
  },
  {
    id: "retencao",
    title: "7. Por quanto tempo guardamos",
    icon: Database,
    body: (
      <ul className="list-disc pl-5 space-y-1.5">
        <li>Conversas de WhatsApp e fotos: até 12 meses após o último contato.</li>
        <li>Dados fiscais (NF): pelo prazo legal (mínimo 5 anos).</li>
        <li>Dados de navegação anonimizados (GA4): conforme política do Google, padrão 14 meses.</li>
      </ul>
    ),
  },
  {
    id: "direitos",
    title: "8. Seus direitos (LGPD)",
    icon: ShieldCheck,
    body: (
      <>
        <p>Você pode, a qualquer momento, solicitar:</p>
        <ul className="list-disc pl-5 space-y-1.5 mt-2">
          <li>Confirmação da existência de tratamento.</li>
          <li>Acesso, correção ou exclusão dos seus dados.</li>
          <li>Portabilidade e revogação do consentimento.</li>
          <li>Informações sobre compartilhamento.</li>
        </ul>
        <p className="mt-2">
          Para exercer, envie o pedido pelo{" "}
          <a href={WHATSAPP_URL} className="text-accent underline" data-cta-location="privacy_rights_whatsapp">WhatsApp do site</a>.
          Respondemos em até 15 dias.
        </p>
      </>
    ),
  },
  {
    id: "seguranca",
    title: "9. Segurança",
    icon: ShieldCheck,
    body: (
      <p>
        Aplicamos medidas técnicas e administrativas razoáveis para proteger seus dados
        (HTTPS, controle de acesso, backups). Nenhum sistema é 100% imune; comunique imediatamente
        qualquer suspeita pelo nosso WhatsApp.
      </p>
    ),
  },
  {
    id: "contato",
    title: "10. Como falar com a gente",
    icon: MessageCircle,
    body: (
      <ul className="list-disc pl-5 space-y-1.5">
        <li>WhatsApp: <a className="text-accent underline" href={WHATSAPP_URL} data-cta-location="privacy_contact_whatsapp">Iniciar atendimento pelo WhatsApp</a></li>
        <li>Endereço: Curitiba e Região Metropolitana – PR</li>
      </ul>
    ),
  },
];

const faq = [
  {
    q: "Quais dados pessoais este site coleta?",
    a: "Coletamos apenas o necessário para o atendimento: nome, telefone de contato, cidade/bairro, descrição do problema técnico e, quando você envia, fotos ou vídeos do equipamento. Também registramos dados técnicos de navegação, como página de origem e tamanho de tela, quando você autoriza a medição de audiência.",
  },
  {
    q: "O site usa cookies de anúncios antes do meu consentimento?",
    a: "Não. Antes da sua decisão no banner, o Google Consent Mode v2 permanece em 'denied' para anúncios e medição e o script do Google AdSense não é carregado. Os detalhes por categoria estão na Política de Cookies e Anúncios.",
  },
  {
    q: "Como faço para revogar o consentimento de cookies?",
    a: "Use o botão 'Gerenciar preferências de cookies' na Política de Cookies e Anúncios ou o link equivalente no rodapé. O painel reabre com sua escolha atual e a alteração vale imediatamente, sem precisar justificar.",
  },
  {
    q: "Como solicito a exclusão dos meus dados e anexos?",
    a: "Pela página de Exclusão de Dados (LGPD) ou pelo WhatsApp oficial do site. Atendemos o pedido de eliminação dos dados pessoais e dos anexos enviados, ressalvadas as informações que precisamos manter por obrigação legal ou fiscal.",
  },
  {
    q: "Meus dados são vendidos ou compartilhados com terceiros?",
    a: "Não vendemos dados pessoais. Compartilhamos apenas com operadores necessários à prestação do serviço e à medição, como provedor de infraestrutura, Google Analytics e Google AdSense, cada um dentro da sua própria política e sempre limitado à finalidade declarada.",
  },
  {
    q: "Por quanto tempo os dados do atendimento ficam guardados?",
    a: "Mantemos os dados de ordens de serviço pelo prazo necessário para garantia, suporte e obrigações legais. Depois disso são eliminados ou anonimizados. Você pode pedir a exclusão antes desse prazo, respeitadas as retenções obrigatórias por lei.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${CANONICAL}#webpage`,
      url: CANONICAL,
      name: "Política de Privacidade | Técnico em Curitiba",
      description:
        "Como coletamos, usamos e protegemos dados pessoais, cookies, medição de audiência e direitos do titular sob a LGPD.",
      inLanguage: "pt-BR",
      dateModified: "2026-08-08",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Início", item: "https://tecnicocuritiba.com.br/" },
        { "@type": "ListItem", position: 2, name: "Política de Privacidade", item: CANONICAL },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

const PoliticaPrivacidade = () => {
  return (
    <>
      <Helmet>
        <title>Política de Privacidade | Técnico em Curitiba</title>
        <meta
          name="description"
          content="Política de Privacidade e LGPD do Técnico em Curitiba: como coletamos, usamos e protegemos seus dados, cookies, GA4, Google Ads e seus direitos."
        />
        <link rel="canonical" href={CANONICAL} />
        <meta property="og:title" content="Política de Privacidade | Técnico em Curitiba" />
        <meta property="og:url" content={CANONICAL} />
        <meta property="og:type" content="article" />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <Header />
      <main id="main-content" className="bg-background">
        <PageHero
          title="Política de Privacidade"
          subtitle={`LGPD · Como tratamos seus dados pessoais. Atualizada em ${UPDATED}.`}
        />

        <article className="container mx-auto max-w-3xl px-4 py-12 md:py-16">
          <nav aria-label="Sumário" className="mb-10 rounded-2xl border border-border bg-muted/30 p-5">
            <p className="text-sm font-bold text-foreground mb-3">Sumário</p>
            <ol className="grid grid-cols-1 sm:grid-cols-2 gap-y-1.5 text-sm text-muted-foreground list-decimal pl-5">
              {sections.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="hover:text-accent underline-offset-2 hover:underline">
                    {s.title.replace(/^\d+\.\s*/, "")}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          {sections.map(({ id, title, icon: Icon, body }) => (
            <section key={id} id={id} className="mb-10 scroll-mt-24">
              <h2 className="flex items-center gap-2 text-xl md:text-2xl font-heading font-bold text-foreground mb-3">
                <Icon className="h-5 w-5 text-accent" />
                {title}
              </h2>
              <div className="text-foreground/85 leading-relaxed text-[15px]">{body}</div>
            </section>
          ))}

          <div className="mt-12 rounded-2xl border border-accent/30 bg-accent/5 p-6 text-center">
            <p className="text-foreground font-semibold mb-3">
              Tem dúvida sobre seus dados ou quer falar com a gente?
            </p>
            <a
              href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Olá! Tenho uma dúvida sobre a Política de Privacidade do site.")}`}
              target="_blank"
              rel="noopener nofollow"
              data-cta-location="privacidade_footer"
              data-wa-medium="privacidade"
              className="inline-flex items-center gap-2 rounded-lg bg-[hsl(var(--whatsapp))] px-5 py-3 font-bold text-primary-foreground shadow-md hover:bg-[hsl(var(--whatsapp-hover))] transition-colors"
            >
              <MessageCircle className="h-4 w-4" />
              Falar no WhatsApp
            </a>
            <p className="mt-4 text-sm text-muted-foreground">
              Veja também os <Link to="/termos-e-condicoes" className="text-accent underline">Termos e Condições</Link>.
            </p>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
};

export default PoliticaPrivacidade;
