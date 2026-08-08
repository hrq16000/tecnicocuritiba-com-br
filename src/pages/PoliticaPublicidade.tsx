import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { Megaphone, ShieldCheck, FileText, Cookie, MessageCircle, PenLine } from "lucide-react";

const CANONICAL = "https://tecnicocuritiba.com.br/politica-de-publicidade";
const COMPANY = "Técnico em Curitiba — Assistência Técnica em Informática";
const CNPJ = "41.723.708/0001-58";
const WHATSAPP = "5541997452053";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
  "Olá! Tenho uma dúvida sobre a Política de Publicidade do site.",
)}`;
const UPDATED = "07/08/2026";

const sections: { id: string; title: string; icon: typeof Megaphone; body: React.ReactNode }[] = [
  {
    id: "quem-somos",
    title: "1. Quem publica este site",
    icon: FileText,
    body: (
      <>
        <p>
          O site <strong>tecnicocuritiba.com.br</strong> é publicado por <strong>{COMPANY}</strong>,
          CNPJ {CNPJ}, prestadora de serviços de assistência técnica em informática e eletrônica em
          Curitiba e Região Metropolitana do Paraná. Todo o conteúdo publicado aqui é produzido pela
          própria equipe técnica, com base em atendimentos reais executados em bancada e em domicílio.
        </p>
        <p className="mt-2">
          O contato oficial para assuntos editoriais, publicitários ou de privacidade é feito
          exclusivamente pelo{" "}
          <a href={WHATSAPP_URL} className="text-accent underline" data-cta-location="ads_policy_whatsapp">
            WhatsApp do site
          </a>
          , conforme indicado na página de <Link to="/contato" className="text-accent underline">Contato</Link>.
        </p>
      </>
    ),
  },
  {
    id: "conteudo",
    title: "2. Política editorial e originalidade do conteúdo",
    icon: PenLine,
    body: (
      <>
        <p>
          Todo texto publicado é original, escrito internamente e revisado antes da publicação. Não
          utilizamos conteúdo copiado de terceiros, conteúdo gerado automaticamente sem revisão
          humana, páginas duplicadas, páginas de baixo valor (“thin content”) criadas apenas para
          captar tráfego, nem páginas com texto repetido em massa apenas trocando o nome da cidade.
        </p>
        <p className="mt-2">Cada página do portal segue os mesmos critérios mínimos de qualidade:</p>
        <ul className="list-disc pl-5 space-y-1.5 mt-2">
          <li>um título principal claro descrevendo o serviço, sintoma ou tema abordado;</li>
          <li>explicação prática do problema, das causas prováveis e do procedimento adotado;</li>
          <li>informações operacionais objetivas: valor inicial, tempo estimado, o que está incluso e o que não está;</li>
          <li>limitações e casos em que o reparo não compensa — declarados de forma honesta;</li>
          <li>perguntas frequentes reais, coletadas de atendimentos;</li>
          <li>navegação interna para conteúdos relacionados, sem links enganosos.</li>
        </ul>
        <p className="mt-2">
          Quando uma informação depende de avaliação presencial (por exemplo, o custo de uma peça
          específica), isso é declarado no texto em vez de apresentarmos uma estimativa artificial.
          Não prometemos resultados de desempenho, prazos de SLA ou garantias que não possamos cumprir.
        </p>
      </>
    ),
  },
  {
    id: "anuncios",
    title: "3. Anúncios e conteúdo patrocinado",
    icon: Megaphone,
    body: (
      <>
        <p>
          Este site pode exibir anúncios de terceiros e blocos de patrocínio para custear a produção
          de conteúdo. Toda unidade publicitária é <strong>rotulada de forma visível</strong> com a
          palavra <strong>“Publicidade”</strong> e é claramente separada do conteúdo editorial, para
          que nenhum visitante confunda anúncio com recomendação técnica.
        </p>
        <ul className="list-disc pl-5 space-y-1.5 mt-2">
          <li>Anúncios nunca são posicionados de forma a induzir cliques acidentais.</li>
          <li>Não usamos rótulos enganosos como “conteúdo recomendado” em cima de anúncios pagos.</li>
          <li>Não incentivamos, pedimos ou compramos cliques em anúncios.</li>
          <li>Links patrocinados recebem o atributo <code>rel="sponsored"</code>.</li>
          <li>Anúncios não são inseridos acima da dobra em telas pequenas, para não prejudicar a leitura nem o carregamento da página.</li>
          <li>Não exibimos anúncios em páginas sem conteúdo próprio, em páginas de erro, nem em telas administrativas.</li>
        </ul>
        <p className="mt-2">
          A presença de um anunciante ou patrocinador não influencia diagnósticos, recomendações
          técnicas ou avaliações publicadas. O conteúdo editorial permanece independente da receita
          publicitária.
        </p>
      </>
    ),
  },
  {
    id: "cookies-anuncios",
    title: "4. Cookies de publicidade e fornecedores terceirizados",
    icon: Cookie,
    body: (
      <>
        <p>
          Fornecedores terceirizados, incluindo o Google, podem usar cookies para veicular anúncios
          com base em visitas anteriores deste e de outros sites. O Google utiliza cookies de
          publicidade para exibir anúncios aos usuários com base nas visitas ao nosso site e a outros
          sites na Internet.
        </p>
        <p className="mt-2">
          Você pode desativar a publicidade personalizada nas{" "}
          <a
            href="https://www.google.com/settings/ads"
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="text-accent underline"
          >
            Configurações de anúncios do Google
          </a>{" "}
          ou desativar o uso de cookies de terceiros em{" "}
          <a
            href="https://www.aboutads.info/choices/"
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="text-accent underline"
          >
            www.aboutads.info/choices
          </a>
          .
        </p>
        <p className="mt-2">
          No Brasil, cookies de análise e de publicidade permanecem <strong>negados por padrão</strong>{" "}
          até que você aceite no banner de consentimento (Google Consent Mode v2), conforme a LGPD.
          Detalhes completos estão na{" "}
          <Link to="/politica-de-privacidade" className="text-accent underline">
            Política de Privacidade
          </Link>{" "}
          e você pode solicitar remoção de dados em{" "}
          <Link to="/exclusao-de-dados" className="text-accent underline">
            Exclusão de Dados (LGPD)
          </Link>
          .
        </p>
      </>
    ),
  },
  {
    id: "ads-txt",
    title: "5. ads.txt e vendedores autorizados",
    icon: ShieldCheck,
    body: (
      <>
        <p>
          Mantemos um arquivo <strong>ads.txt</strong> público em{" "}
          <a href="/ads.txt" className="text-accent underline">tecnicocuritiba.com.br/ads.txt</a>,
          listando os vendedores autorizados a comercializar o inventário publicitário deste domínio.
          Qualquer intermediário que não esteja declarado nesse arquivo não está autorizado a vender
          espaço publicitário em nosso nome.
        </p>
        <p className="mt-2">
          O arquivo é atualizado sempre que uma parceria de mídia é iniciada ou encerrada. Suspeitas
          de fraude de inventário ou de uso indevido da marca podem ser reportadas pelo{" "}
          <a href={WHATSAPP_URL} className="text-accent underline">WhatsApp oficial</a>.
        </p>
      </>
    ),
  },
  {
    id: "proibido",
    title: "6. Conteúdo que nunca será publicado",
    icon: ShieldCheck,
    body: (
      <>
        <p>
          Para manter conformidade com as políticas de publishers do Google e com a legislação
          brasileira, este portal não publica e não aceita anunciantes ligados a:
        </p>
        <ul className="list-disc pl-5 space-y-1.5 mt-2">
          <li>software pirata, cracks, ativadores, seriais ou burla de licenças;</li>
          <li>desbloqueio ilegal de equipamentos, remoção de trava de segurança ou acesso a contas de terceiros;</li>
          <li>conteúdo adulto, violento, discriminatório ou de ódio;</li>
          <li>armas, drogas, substâncias controladas ou produtos falsificados;</li>
          <li>promessas milagrosas de resultado, esquemas financeiros ou apostas sem regulamentação;</li>
          <li>coleta de dados pessoais sem base legal ou sem consentimento.</li>
        </ul>
        <p className="mt-2">
          Atendimentos que envolvam suspeita de uso ilícito de equipamento são recusados e
          registrados internamente.
        </p>
      </>
    ),
  },
  {
    id: "contato",
    title: "7. Contato, correções e direito de resposta",
    icon: MessageCircle,
    body: (
      <>
        <p>
          Encontrou uma informação incorreta, desatualizada ou um anúncio inadequado? Fale conosco
          pelo{" "}
          <a href={WHATSAPP_URL} className="text-accent underline" data-cta-location="ads_policy_contact">
            WhatsApp oficial
          </a>
          . Correções factuais são analisadas e, quando procedentes, aplicadas na própria página com
          atualização da data de revisão.
        </p>
        <p className="mt-2">Última atualização: {UPDATED}.</p>
      </>
    ),
  },
];

const faq = [
  {
    q: "Este site exibe anúncios?",
    a: "Sim, o site pode exibir anúncios de terceiros e blocos de patrocínio para custear a produção de conteúdo. Toda unidade publicitária é rotulada com a palavra 'Publicidade' e fica visualmente separada do conteúdo editorial.",
  },
  {
    q: "Os anúncios influenciam os diagnósticos técnicos publicados?",
    a: "Não. O conteúdo editorial é independente da receita publicitária. Anunciantes e patrocinadores não interferem em diagnósticos, recomendações ou avaliações publicadas no portal.",
  },
  {
    q: "Como desativar a publicidade personalizada?",
    a: "Você pode desativar a publicidade personalizada nas Configurações de anúncios do Google (google.com/settings/ads) ou desativar cookies de terceiros em www.aboutads.info/choices. No site, cookies de análise e publicidade só são ativados após aceite no banner de consentimento.",
  },
  {
    q: "Onde fica o arquivo ads.txt do site?",
    a: "O arquivo público está em tecnicocuritiba.com.br/ads.txt e lista os vendedores autorizados a comercializar o inventário publicitário do domínio. Intermediários não declarados nesse arquivo não estão autorizados.",
  },
  {
    q: "Quem escreve o conteúdo do portal?",
    a: "Todo o conteúdo é escrito e revisado pela própria equipe técnica, com base em atendimentos reais em bancada e em domicílio. Não publicamos conteúdo copiado nem páginas criadas apenas para captar tráfego.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${CANONICAL}#webpage`,
      url: CANONICAL,
      name: "Política de Publicidade e Conteúdo | Técnico em Curitiba",
      description:
        "Como funcionam anúncios, patrocínios, cookies de terceiros, ads.txt e a política editorial do portal Técnico em Curitiba.",
      inLanguage: "pt-BR",
      dateModified: "2026-08-07",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Início", item: "https://tecnicocuritiba.com.br/" },
        { "@type": "ListItem", position: 2, name: "Política de Publicidade", item: CANONICAL },
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

export default function PoliticaPublicidade() {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Política de Publicidade e Conteúdo | Técnico em Curitiba</title>
        <meta
          name="description"
          content="Como funcionam anúncios, patrocínios, cookies de terceiros, ads.txt e a política editorial do portal Técnico em Curitiba. Transparência total com o leitor."
        />
        <link rel="canonical" href={CANONICAL} />
        <meta property="og:title" content="Política de Publicidade e Conteúdo | Técnico em Curitiba" />
        <meta
          property="og:description"
          content="Anúncios rotulados, conteúdo editorial independente, cookies de terceiros e ads.txt explicados."
        />
        <meta property="og:url" content={CANONICAL} />
        <meta property="og:type" content="article" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <Header />

      <main id="main-content">
        <PageHero
          eyebrow="Transparência"
          title="Política de Publicidade e Conteúdo"
          subtitle="Como este portal se sustenta, como sinalizamos anúncios e quais regras seguimos ao publicar conteúdo técnico."
        />

        <section className="container mx-auto px-4 py-10 max-w-3xl">
          <nav aria-label="Índice" className="mb-8 rounded-xl border border-border/60 bg-card/50 p-4">
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
            <h2 className="text-xl font-bold mb-4">Perguntas frequentes sobre publicidade</h2>
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
              <li><Link to="/termos-e-condicoes" className="text-accent underline">Termos e Condições</Link></li>
              <li><Link to="/exclusao-de-dados" className="text-accent underline">Exclusão de Dados (LGPD)</Link></li>
              <li><Link to="/precos-e-politicas" className="text-accent underline">Preços e Políticas de Atendimento</Link></li>
              <li><Link to="/sobre" className="text-accent underline">Sobre nós</Link></li>
              <li><Link to="/contato" className="text-accent underline">Contato</Link></li>
            </ul>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
