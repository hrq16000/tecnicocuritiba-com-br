import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { openConsentPreferences } from "@/lib/consent";
import { Cookie, BarChart3, Megaphone, ShieldCheck, SlidersHorizontal, FileText } from "lucide-react";

const CANONICAL = "https://tecnicocuritiba.com.br/politica-de-cookies-e-anuncios";
const COMPANY = "Técnico em Curitiba — Assistência Técnica em Informática";
const PUBLISHER = "pub-3762170279587706";
const UPDATED = "08/08/2026";

const sections: { id: string; title: string; icon: typeof Cookie; body: React.ReactNode }[] = [
  {
    id: "o-que-sao",
    title: "1. O que são cookies e por que este site usa",
    icon: Cookie,
    body: (
      <>
        <p>
          Cookies são pequenos arquivos gravados no seu navegador quando você acessa uma página. Eles
          permitem lembrar preferências, medir quantas pessoas leram um conteúdo e, quando autorizado,
          exibir publicidade. Este site é publicado por <strong>{COMPANY}</strong> e usa
          cookies em três finalidades apenas: funcionamento, medição de audiência e publicidade.
        </p>
        <p className="mt-2">
          Nenhum cookie de publicidade ou de medição é gravado antes de você decidir no banner de
          consentimento. Até esse momento, o Google Consent Mode v2 permanece com{" "}
          <code>ad_storage</code>, <code>ad_user_data</code>, <code>ad_personalization</code> e{" "}
          <code>analytics_storage</code> em <strong>denied</strong>, e o script do AdSense sequer é
          inserido na página.
        </p>
      </>
    ),
  },
  {
    id: "essenciais",
    title: "2. Cookies essenciais (sempre ativos)",
    icon: ShieldCheck,
    body: (
      <>
        <p>
          São necessários para o site funcionar e não podem ser desativados, pois não rastreiam você
          para fins comerciais. Ficam apenas no seu navegador (armazenamento local), não são vendidos
          nem compartilhados:
        </p>
        <ul className="list-disc pl-5 space-y-1.5 mt-2">
          <li><strong>lgpd_consent_v2</strong> — guarda a sua escolha de cookies (anúncios e medição).</li>
          <li><strong>lgpd_consent_v1</strong> — chave legada mantida em sincronia para compatibilidade.</li>
          <li>
            <strong>Rascunho do funil de atendimento</strong> — mantém o que você já preencheu no
            orçamento/triagem para não perder as respostas ao recarregar a página.
          </li>
          <li><strong>Cache de cidade/região</strong> — evita repetir a detecção de localidade na mesma sessão.</li>
        </ul>
      </>
    ),
  },
  {
    id: "medicao",
    title: "3. Medição de audiência e telemetria first-party do funil",
    icon: BarChart3,
    body: (
      <>
        <p>
          Quando você autoriza a categoria <strong>Medição de audiência</strong>, registramos eventos
          de uso para entender quais páginas realmente ajudam e onde o atendimento trava. São dois
          mecanismos:
        </p>
        <ul className="list-disc pl-5 space-y-1.5 mt-2">
          <li>
            <strong>Google Analytics 4</strong> — estatísticas agregadas de páginas vistas e origem
            do acesso.
          </li>
          <li>
            <strong>Telemetria first-party do funil</strong> — eventos gravados no nosso próprio banco
            (abertura do funil de WhatsApp, avanço de etapa, envio e cliques de contato), com página de
            origem, parâmetros de campanha (UTM) e tamanho de tela. Não gravamos o conteúdo do que você
            digita nesses eventos.
          </li>
        </ul>
        <p className="mt-2">
          Se você recusar essa categoria, nenhum evento de telemetria é gravado — o site continua
          funcionando normalmente, inclusive o contato por WhatsApp.
        </p>
      </>
    ),
  },
  {
    id: "anuncios",
    title: "4. Cookies de publicidade (Google AdSense)",
    icon: Megaphone,
    body: (
      <>
        <p>
          Quando você autoriza a categoria <strong>Anúncios</strong>, carregamos o script do Google
          AdSense (publisher <code>{PUBLISHER}</code>, declarado publicamente no nosso{" "}
          <a href="/ads.txt" className="text-accent underline">ads.txt</a>). O Google e seus parceiros
          podem usar cookies para exibir e medir anúncios, limitar repetição e detectar fraude.
        </p>
        <p className="mt-2">
          Todo bloco publicitário é rotulado com a palavra <strong>“Publicidade”</strong> e separado do
          conteúdo editorial, conforme a{" "}
          <Link to="/politica-de-publicidade" className="text-accent underline">Política de Publicidade</Link>.
          Recusando essa categoria, o script do AdSense não é injetado e nenhum cookie de anúncio é criado.
        </p>
      </>
    ),
  },
  {
    id: "opt-out",
    title: "5. Como gerenciar, revogar e fazer opt-out",
    icon: SlidersHorizontal,
    body: (
      <>
        <p>
          Você pode mudar de ideia a qualquer momento, sem justificar. Além do botão de preferências
          desta página, existem controles externos independentes deste site:
        </p>
        <ul className="list-disc pl-5 space-y-1.5 mt-2">
          <li>
            <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer nofollow" className="text-accent underline">
              google.com/settings/ads
            </a>{" "}
            — controlar a personalização de anúncios na sua Conta Google.
          </li>
          <li>
            <a href="https://optout.aboutads.info/" target="_blank" rel="noopener noreferrer nofollow" className="text-accent underline">
              aboutads.info/choices
            </a>{" "}
            — opt-out setorial (DAA) de publicidade baseada em interesses.
          </li>
          <li>
            <a href="https://www.youronlinechoices.com/br/" target="_blank" rel="noopener noreferrer nofollow" className="text-accent underline">
              youronlinechoices.com/br
            </a>{" "}
            — opt-out europeu/brasileiro equivalente (EDAA).
          </li>
          <li>Configurações do próprio navegador: bloquear ou apagar cookies e armazenamento local do site.</li>
        </ul>
        <p className="mt-2">
          Para apagar dados já coletados, use a página{" "}
          <Link to="/exclusao-de-dados" className="text-accent underline">Exclusão de Dados (LGPD)</Link>.
        </p>
      </>
    ),
  },
  {
    id: "base-legal",
    title: "6. Base legal, prazo e responsável",
    icon: FileText,
    body: (
      <>
        <p>
          O tratamento de cookies de medição e publicidade é feito com base no{" "}
          <strong>consentimento</strong> (art. 7º, I, da Lei 13.709/2018 — LGPD). Cookies essenciais têm
          base no legítimo interesse de manter o site operacional. A decisão registrada fica válida até
          que você a altere ou limpe os dados do navegador.
        </p>
        <p className="mt-2">
          Detalhes sobre finalidades, compartilhamento, retenção e seus direitos como titular estão na{" "}
          <Link to="/politica-de-privacidade" className="text-accent underline">Política de Privacidade e LGPD</Link>.
          O canal oficial de contato é o WhatsApp indicado na página de{" "}
          <Link to="/contato" className="text-accent underline">Contato</Link>.
        </p>
      </>
    ),
  },
];

const faq = [
  {
    q: "O site grava cookies antes de eu aceitar o banner?",
    a: "Não. Antes da sua decisão, o Consent Mode v2 fica em 'denied' para anúncios e medição, e o script do Google AdSense não é sequer inserido na página. Só permanecem os itens essenciais de funcionamento, como o rascunho do formulário de atendimento.",
  },
  {
    q: "Posso aceitar a medição de audiência e recusar os anúncios?",
    a: "Sim. No banner, o botão 'Personalizar' permite ligar e desligar cada categoria separadamente. A escolha é salva e aplicada imediatamente ao Consent Mode v2.",
  },
  {
    q: "Como revogo o consentimento depois de aceitar?",
    a: "Clique em 'Gerenciar preferências de cookies' nesta página ou no rodapé do site. O painel reabre com sua escolha atual e você pode desmarcar qualquer categoria.",
  },
  {
    q: "Quais opt-out externos existem para anúncios do Google?",
    a: "Você pode desativar a personalização em google.com/settings/ads, usar o opt-out setorial em aboutads.info/choices ou o youronlinechoices.com/br. Esses controles valem para toda a navegação, não apenas para este site.",
  },
  {
    q: "O que exatamente é registrado na telemetria do funil de WhatsApp?",
    a: "Registramos o tipo de evento (abertura, etapa, envio, clique de contato), a página de origem, parâmetros de campanha (UTM) e o tamanho da tela. Não gravamos o texto que você digita nem dados sensíveis nesses eventos.",
  },
  {
    q: "Recusar cookies impede o atendimento?",
    a: "Não. O site funciona igual e o contato por WhatsApp continua disponível. Você só deixa de contribuir com estatísticas de uso e não vê anúncios personalizados.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${CANONICAL}#webpage`,
      url: CANONICAL,
      name: "Política de Cookies e Anúncios | Técnico em Curitiba",
      description:
        "Quais cookies este site usa, como funciona o consentimento de anúncios e medição, e como fazer opt-out.",
      inLanguage: "pt-BR",
      dateModified: "2026-08-08",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Início", item: "https://tecnicocuritiba.com.br/" },
        { "@type": "ListItem", position: 2, name: "Política de Cookies e Anúncios", item: CANONICAL },
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

export default function PoliticaCookies() {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Política de Cookies e Anúncios | Técnico em Curitiba</title>
        <meta
          name="description"
          content="Cookies essenciais, medição de audiência e anúncios do Google AdSense: o que gravamos, quando gravamos e como revogar ou fazer opt-out a qualquer momento."
        />
        <link rel="canonical" href={CANONICAL} />
        <meta property="og:title" content="Política de Cookies e Anúncios | Técnico em Curitiba" />
        <meta
          property="og:description"
          content="Consentimento granular de anúncios e medição, Consent Mode v2 e opt-out externo explicados."
        />
        <meta property="og:url" content={CANONICAL} />
        <meta property="og:type" content="article" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <Header />

      <main id="main-content">
        <PageHero
          title="Política de Cookies e Anúncios"
          subtitle="O que gravamos no seu navegador, o que só acontece depois do seu aceite e como mudar de ideia em um clique."
        />

        <section className="container mx-auto px-4 py-10 max-w-3xl">
          <p className="text-sm text-muted-foreground">Última atualização: {UPDATED}</p>

          <div className="mt-6 rounded-xl border border-accent/40 bg-accent/5 p-5">
            <h2 className="text-lg font-bold mb-1">Gerenciar suas preferências</h2>
            <p className="text-sm text-muted-foreground">
              Ligue ou desligue separadamente os cookies de anúncios e de medição de audiência. A
              mudança vale imediatamente.
            </p>
            <button
              type="button"
              onClick={openConsentPreferences}
              className="mt-3 min-h-11 rounded-lg bg-primary px-5 text-sm font-bold text-primary-foreground hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Gerenciar preferências de cookies
            </button>
          </div>

          <nav aria-label="Índice" className="my-8 rounded-xl border border-border/60 bg-card/50 p-4">
            <p className="text-sm font-semibold mb-2">Nesta página</p>
            <ul className="grid gap-1 text-sm sm:grid-cols-2">
              {sections.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="text-muted-foreground hover:text-accent underline-offset-2 hover:underline">
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-8">
            {sections.map(({ id, title, icon: Icon, body }) => (
              <article key={id} id={id} className="scroll-mt-24">
                <h2 className="flex items-center gap-2 text-xl font-bold mb-3">
                  <Icon className="h-5 w-5 text-accent" aria-hidden="true" />
                  {title}
                </h2>
                <div className="text-muted-foreground leading-relaxed">{body}</div>
              </article>
            ))}
          </div>

          <section className="mt-12" id="faq">
            <h2 className="text-xl font-bold mb-4">Perguntas frequentes sobre cookies e anúncios</h2>
            <div className="space-y-4">
              {faq.map((f) => (
                <div key={f.q} className="rounded-xl border border-border/60 bg-card/50 p-4">
                  <h3 className="font-semibold mb-1">{f.q}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{f.a}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="mt-12 rounded-xl border border-border/60 bg-card/50 p-5">
            <h2 className="text-lg font-bold mb-2">Documentos relacionados</h2>
            <ul className="list-disc pl-5 space-y-1.5 text-sm text-muted-foreground">
              <li><Link to="/politica-de-privacidade" className="text-accent underline">Política de Privacidade e LGPD</Link></li>
              <li><Link to="/politica-de-publicidade" className="text-accent underline">Política de Publicidade e Conteúdo</Link></li>
              <li><Link to="/termos-e-condicoes" className="text-accent underline">Termos e Condições</Link></li>
              <li><Link to="/exclusao-de-dados" className="text-accent underline">Exclusão de Dados (LGPD)</Link></li>
              <li><Link to="/status-anuncios" className="text-accent underline">Status de Anúncios (verificação em tempo real)</Link></li>
            </ul>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
