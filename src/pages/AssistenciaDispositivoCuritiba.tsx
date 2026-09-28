import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle } from "lucide-react";
import { PageSEO } from "@/components/PageSEO";
import Breadcrumbs from "@/components/Breadcrumbs";

/**
 * Onda 2 — páginas "assistência técnica de computador/notebook em Curitiba".
 * Intenção: comercial ampla por dispositivo. Não repetem o conteúdo de
 * /servicos/conserto-notebook-curitiba (conserto) nem de
 * /manutencao-notebook-pc-curitiba (manutenção preventiva): funcionam como
 * porta de entrada e apontam para essas páginas específicas.
 * Sem valores próprios: preços ficam nas páginas de serviço e em /precos-e-politicas.
 */

interface LinkItem { label: string; to: string; desc: string }
interface Faq { q: string; a: string }

interface Config {
  path: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  crumb: string;
  atendemos: string[];
  links: LinkItem[];
  faq: Faq[];
}

const COMPUTADOR: Config = {
  path: "/assistencia-tecnica-computador-curitiba",
  title: "Assistência Técnica de Computador em Curitiba | PC e Desktop",
  description:
    "Assistência técnica de computador em Curitiba: PC que não liga, lentidão, vírus, upgrade e montagem. Atendimento em domicílio, remoto ou bancada com triagem pelo WhatsApp.",
  h1: "Assistência técnica de computador em Curitiba",
  intro:
    "Atendimento para computadores de mesa (desktop, PC gamer, all-in-one e workstation) em Curitiba e Região Metropolitana. Você descreve o problema na triagem, e indicamos se o caso resolve remoto, em visita ou em bancada.",
  crumb: "Assistência técnica de computador",
  atendemos: [
    "PC que não liga, reinicia ou desliga sozinho",
    "Computador lento, travando ou com tela azul",
    "Remoção de vírus e formatação com backup",
    "Upgrade de SSD, memória e placa de vídeo",
    "Montagem de PC com peças escolhidas",
    "Fonte, placa-mãe, cooler e superaquecimento",
  ],
  links: [
    { label: "Computador não liga", to: "/servicos/computador-nao-liga", desc: "Diagnóstico de fonte, placa-mãe e energia." },
    { label: "Computador lento", to: "/servicos/computador-lento", desc: "Otimização, limpeza e troca por SSD." },
    { label: "Montagem de PC", to: "/servicos/montagem-pc", desc: "Montagem com as peças que você escolher." },
    { label: "Upgrade de SSD e memória", to: "/servicos/upgrade-ssd-memoria", desc: "Mais desempenho sem trocar a máquina." },
    { label: "Formatação de computador", to: "/servicos/formatacao-computador", desc: "Sistema limpo, com backup dos arquivos." },
    { label: "Manutenção de notebook e PC", to: "/manutencao-notebook-pc-curitiba", desc: "Manutenção preventiva e limpeza." },
  ],
  faq: [
    { q: "Vocês atendem computador em casa em Curitiba?", a: "Sim. Dependendo do defeito, o atendimento é em domicílio, remoto ou com coleta para bancada. A triagem pelo WhatsApp define a modalidade antes de qualquer deslocamento." },
    { q: "Qual a diferença para a assistência de notebook?", a: "Computadores de mesa permitem troca de peças avulsas (fonte, placa de vídeo, memória) e montagem. Para notebooks, veja a página de assistência técnica de notebook." },
    { q: "Onde vejo valores e prazos?", a: "Os valores de cada modalidade estão na página de preços e políticas e nas páginas de cada serviço." },
  ],
};

const NOTEBOOK: Config = {
  path: "/assistencia-tecnica-notebook-curitiba",
  title: "Assistência Técnica de Notebook em Curitiba | Todas as Marcas",
  description:
    "Assistência técnica de notebook em Curitiba: Dell, Lenovo, HP, Acer, Asus, Samsung e MacBook. Tela, teclado, bateria, lentidão e notebook que não liga, com triagem pelo WhatsApp.",
  h1: "Assistência técnica de notebook em Curitiba",
  intro:
    "Atendimento para notebooks de todas as marcas em Curitiba e Região Metropolitana. A triagem pelo WhatsApp indica se o caso resolve remoto, em visita ou se precisa de bancada com coleta e entrega.",
  crumb: "Assistência técnica de notebook",
  atendemos: [
    "Notebook que não liga ou não carrega",
    "Tela quebrada, sem imagem ou com manchas",
    "Teclado, touchpad e dobradiça",
    "Bateria viciada e superaquecimento",
    "Lentidão, vírus e formatação com backup",
    "Upgrade de SSD e memória",
  ],
  links: [
    { label: "Conserto de notebook em Curitiba", to: "/servicos/conserto-notebook-curitiba", desc: "Reparo de defeitos em bancada." },
    { label: "Manutenção de notebook e PC", to: "/manutencao-notebook-pc-curitiba", desc: "Limpeza, pasta térmica e prevenção." },
    { label: "Conserto de PC e notebook", to: "/servicos/conserto-pc-notebook", desc: "Tela, teclado e componentes." },
    { label: "Upgrade de SSD e memória", to: "/servicos/upgrade-ssd-memoria", desc: "Notebook antigo mais rápido." },
    { label: "Remoção de vírus", to: "/servicos/remocao-virus", desc: "Limpeza e proteção contra reinfecção." },
    { label: "Coleta e entrega", to: "/coleta-e-entrega", desc: "Buscamos e devolvemos o notebook." },
  ],
  faq: [
    { q: "Quais marcas de notebook vocês atendem?", a: "Dell, Lenovo, HP, Acer, Asus, Samsung, Positivo, LG, Vaio, Multilaser e MacBook, entre outras." },
    { q: "Preciso levar o notebook até vocês?", a: "Não. Casos de software podem ser resolvidos remoto ou em visita; defeitos de hardware seguem para bancada com coleta e entrega." },
    { q: "Onde vejo valores e prazos?", a: "Os valores de cada modalidade estão na página de preços e políticas e nas páginas de cada serviço." },
  ],
};

function Page({ c }: { c: Config }) {
  return (
    <>
      <PageSEO
        title={c.title}
        description={c.description}
        path={c.path}
        breadcrumbs={[
          { name: "Início", path: "/" },
          { name: c.crumb, path: c.path },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: c.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
          }),
        }}
      />
      <main id="main-content" className="container mx-auto px-4 py-8 md:py-12 max-w-5xl">
        <Breadcrumbs items={[{ label: c.crumb }]} />
        <header className="mb-10">
          <h1 className="text-3xl md:text-4xl font-heading font-bold mb-4">{c.h1}</h1>
          <p className="text-lg text-muted-foreground">{c.intro}</p>
        </header>

        <section className="mb-12" aria-labelledby="atendemos">
          <h2 id="atendemos" className="text-2xl font-heading font-bold mb-4">O que atendemos</h2>
          <ul className="grid sm:grid-cols-2 gap-3">
            {c.atendemos.map((a) => (
              <li key={a} className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-accent shrink-0 mt-0.5" aria-hidden="true" />
                <span>{a}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-12" aria-labelledby="servicos">
          <h2 id="servicos" className="text-2xl font-heading font-bold mb-4">Serviços relacionados</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {c.links.map((l) => (
              <Link key={l.to} to={l.to} className="block rounded-xl border border-border bg-card p-4 hover:border-accent transition-colors">
                <span className="font-semibold inline-flex items-center gap-1">{l.label} <ArrowRight className="w-4 h-4" aria-hidden="true" /></span>
                <span className="block text-sm text-muted-foreground mt-1">{l.desc}</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-12" aria-labelledby="como">
          <h2 id="como" className="text-2xl font-heading font-bold mb-4">Como funciona o atendimento</h2>
          <p className="text-muted-foreground">
            Veja o passo a passo em <Link to="/como-funciona" className="text-accent underline">como funciona</Link>, as modalidades de{" "}
            <Link to="/atendimento-domicilio" className="text-accent underline">atendimento em domicílio</Link>,{" "}
            <Link to="/atendimento-remoto" className="text-accent underline">suporte remoto</Link> e os valores em{" "}
            <Link to="/precos-e-politicas" className="text-accent underline">preços e políticas</Link>. Para uma visão geral, acesse{" "}
            <Link to="/assistencia-tecnica-curitiba" className="text-accent underline">assistência técnica em Curitiba</Link>.
          </p>
        </section>

        <section aria-labelledby="faq">
          <h2 id="faq" className="text-2xl font-heading font-bold mb-4">Perguntas frequentes</h2>
          <div className="space-y-4">
            {c.faq.map((f) => (
              <div key={f.q} className="rounded-xl border border-border bg-card p-4">
                <h3 className="font-semibold mb-1">{f.q}</h3>
                <p className="text-muted-foreground">{f.a}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}

export function AssistenciaComputadorCuritiba() {
  return <Page c={COMPUTADOR} />;
}
export function AssistenciaNotebookCuritiba() {
  return <Page c={NOTEBOOK} />;
}
export const ONDA2_DEVICE_PAGES = [COMPUTADOR, NOTEBOOK];
