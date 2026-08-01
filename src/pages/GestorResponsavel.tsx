import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageSEO } from "@/components/PageSEO";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { buildWhatsAppUrl } from "@/lib/whatsappMessage";
import { trackCTAClick } from "@/lib/analytics";
import { Award, BadgeCheck, MapPin, ShieldCheck, Wrench } from "lucide-react";

const SITE = "https://tecnicocuritiba.com.br";
const PATH = "/gestor-responsavel";
const URL = `${SITE}${PATH}`;

const GESTOR_NOME = "Henrique da Cruz";
const DESDE = "1998";

const certificacoes = [
  {
    titulo: "Manutenção e montagem de microcomputadores",
    detalhe: "Formação técnica em hardware, diagnóstico de placa-mãe e recuperação de equipamentos.",
  },
  {
    titulo: "Administração de sistemas Windows e Linux",
    detalhe: "Instalação, formatação, políticas de backup, contas de usuário e endurecimento básico de segurança.",
  },
  {
    titulo: "Redes e infraestrutura Wi-Fi",
    detalhe: "Cabeamento estruturado, roteadores mesh, segmentação de rede e cobertura em residências e empresas.",
  },
  {
    titulo: "Segurança eletrônica / CFTV",
    detalhe: "Projeto e instalação de câmeras com DVR e acesso remoto, incluindo integração com rede local.",
  },
  {
    titulo: "Remoção de malware e recuperação de dados",
    detalhe: "Procedimentos de limpeza sem perda de arquivos e recuperação lógica em HDs e SSDs.",
  },
];

const atuacao = [
  "Curitiba (todos os bairros)",
  "São José dos Pinhais",
  "Araucária",
  "Campo Largo",
  "Pinhais",
  "Colombo",
  "Almirante Tamandaré",
  "Fazenda Rio Grande",
  "Piraquara",
  "Quatro Barras",
  "Campo Magro",
];

const clusterLinks = [
  { label: "Conserto de notebook em Curitiba", to: "/servicos/conserto-notebook-curitiba" },
  { label: "Formatação de computador em Curitiba", to: "/servicos/formatacao-computador" },
  { label: "Remoção de vírus em Curitiba", to: "/servicos/remocao-virus" },
  { label: "Upgrade de SSD e memória RAM", to: "/servicos/upgrade-ssd-memoria" },
  { label: "Suporte técnico remoto", to: "/atendimento-remoto" },
  { label: "Suporte de TI para empresas", to: "/suporte-empresas" },
  { label: "Atendimento por cidade e bairro", to: "/atendimento" },
];

export default function GestorResponsavel() {
  const title = `Gestor Responsável — ${GESTOR_NOME} | Técnico em Curitiba desde ${DESDE}`;
  const description = `Conheça o gestor técnico responsável pelos atendimentos em Curitiba: bio, certificações e área de atuação. Experiência desde ${DESDE}, visita a partir de R$ 99,99 com garantia de 90 dias.`;

  const personLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${URL}#gestor`,
    name: GESTOR_NOME,
    jobTitle: "Gestor Técnico Responsável",
    description: `Técnico de informática atuando em Curitiba e região metropolitana desde ${DESDE}, responsável pelo padrão de diagnóstico, orçamento e garantia dos atendimentos.`,
    url: URL,
    image: `${SITE}/og-image.jpg`,
    telephone: "+55-41-99745-2053",
    knowsLanguage: "pt-BR",
    knowsAbout: [
      "Manutenção de computadores",
      "Conserto de notebooks",
      "Formatação Windows",
      "Remoção de vírus",
      "Upgrade de SSD e memória RAM",
      "Redes e Wi-Fi",
      "CFTV e segurança eletrônica",
    ],
    hasCredential: certificacoes.map((c) => ({
      "@type": "EducationalOccupationalCredential",
      name: c.titulo,
      description: c.detalhe,
    })),
    areaServed: atuacao.map((nome) => ({ "@type": "City", name: nome })),
    worksFor: { "@id": `${SITE}/#organization` },
    sameAs: ["https://wa.me/5541997452053"],
  };

  const organizationLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE}/#organization`,
    name: "Técnico em Curitiba - Suporte em Informática",
    url: SITE,
    logo: `${SITE}/logo.png`,
    telephone: "+55-41-99745-2053",
    foundingDate: DESDE,
    founder: { "@id": `${URL}#gestor` },
    employee: { "@id": `${URL}#gestor` },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Curitiba",
      addressRegion: "PR",
      addressCountry: "BR",
    },
    areaServed: atuacao.map((nome) => ({ "@type": "City", name: nome })),
    sameAs: ["https://wa.me/5541997452053"],
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Início", item: `${SITE}/` },
      { "@type": "ListItem", position: 2, name: "Sobre", item: `${SITE}/sobre` },
      { "@type": "ListItem", position: 3, name: "Gestor Responsável", item: URL },
    ],
  };

  const waUrl = buildWhatsAppUrl({
    servicoLabel: "atendimento com o gestor responsável",
    bairroLabel: "Curitiba",
  });

  return (
    <>
      <PageSEO title={title} description={description} path={PATH} ogType="profile" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <Header />
      <main id="main-content" className="container mx-auto px-4 py-8">
        <Breadcrumbs
          emitSchema={false}
          items={[
            { label: "Início", href: "/" },
            { label: "Sobre", href: "/sobre" },
            { label: "Gestor Responsável" },
          ]}
        />

        <article className="max-w-4xl mx-auto py-8 md:py-12">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Gestor responsável: {GESTOR_NOME}
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Todo atendimento em Curitiba e região passa por um mesmo padrão técnico definido e
            supervisionado pelo gestor responsável, com experiência prática em informática
            desde {DESDE}. Diagnóstico antes do orçamento, preço fechado antes de executar e
            garantia de 90 dias no serviço realizado.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mb-12">
            <Button
              size="lg"
              asChild
              data-cta-location="gestor_responsavel_hero"
              data-wa-source="gestor_responsavel"
            >
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackCTAClick("whatsapp", "gestor_responsavel_hero", { bairro: "curitiba" })}
              >
                Falar com o responsável no WhatsApp
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/diagnostico-60s">Fazer diagnóstico em 60s</Link>
            </Button>
          </div>

          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Bio profissional</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                {GESTOR_NOME} começou a trabalhar com montagem e manutenção de computadores
                em {DESDE}, na época em que o parque de máquinas de residências e pequenos
                comércios de Curitiba ainda era dominado por desktops montados peça a peça.
                Essa origem explica o método de trabalho até hoje: testar componente por
                componente antes de trocar qualquer peça.
              </p>
              <p>
                Ao longo dos anos, a atuação passou por manutenção corretiva e preventiva de
                notebooks, formatação e recuperação de sistemas Windows, remoção de vírus e
                ransomware, upgrade de SSD e memória RAM, redes Wi-Fi residenciais e
                corporativas, além de projetos de CFTV. O foco é sempre o mesmo: devolver o
                equipamento funcionando, com o cliente entendendo o que foi feito.
              </p>
              <p>
                Hoje o gestor responde pela triagem técnica (remoto, visita ou coleta), pela
                política de preços — visita a partir de R$ 99,99 — e pela garantia de 90 dias
                aplicada aos serviços executados em Curitiba e região metropolitana.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Certificações e formação técnica</h2>
            <ul className="grid gap-3 sm:grid-cols-2">
              {certificacoes.map((c) => (
                <li key={c.titulo} className="rounded-lg border p-4">
                  <div className="flex items-start gap-2">
                    <BadgeCheck className="h-5 w-5 text-primary shrink-0 mt-0.5" aria-hidden />
                    <div>
                      <h3 className="font-semibold">{c.titulo}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{c.detalhe}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Área de atuação</h2>
            <p className="text-muted-foreground mb-4">
              Atendimento presencial em Curitiba e nas cidades da região metropolitana
              listadas abaixo. Para fora dessa área, o atendimento é remoto ou por coleta.
            </p>
            <ul className="flex flex-wrap gap-2">
              {atuacao.map((cidade) => (
                <li
                  key={cidade}
                  className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm"
                >
                  <MapPin className="h-3.5 w-3.5 text-primary" aria-hidden />
                  {cidade}
                </li>
              ))}
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Compromissos do atendimento</h2>
            <ul className="grid gap-3 sm:grid-cols-3">
              <li className="rounded-lg border p-4">
                <Wrench className="h-5 w-5 text-primary mb-2" aria-hidden />
                <h3 className="font-semibold">Diagnóstico antes do orçamento</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Nada é trocado sem teste. Você recebe a causa provável antes do valor.
                </p>
              </li>
              <li className="rounded-lg border p-4">
                <ShieldCheck className="h-5 w-5 text-primary mb-2" aria-hidden />
                <h3 className="font-semibold">Garantia de 90 dias</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Cobre o serviço executado e a peça instalada pela nossa equipe.
                </p>
              </li>
              <li className="rounded-lg border p-4">
                <Award className="h-5 w-5 text-primary mb-2" aria-hidden />
                <h3 className="font-semibold">Preço fechado</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Visita a partir de R$ 99,99, sem cobrança surpresa no fim do serviço.
                </p>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Serviços sob responsabilidade técnica</h2>
            <ul className="grid gap-2 sm:grid-cols-2">
              {clusterLinks.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-primary underline underline-offset-4 hover:no-underline">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}
