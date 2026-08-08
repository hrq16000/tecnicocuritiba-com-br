import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageSEO } from "@/components/PageSEO";
import Breadcrumbs from "@/components/Breadcrumbs";
import InlineTriageCTA from "@/components/InlineTriageCTA";
import { CIDADES, SERVICOS } from "@/lib/servicoCidadeData";
import { BAIRROS_ATENDIMENTO } from "@/lib/atendimentoBairrosData";
import { VALID_SERVICO_SLUGS } from "@/lib/validServicoSlugs";

type Resultado = {
  tipo: "Serviço" | "Cidade" | "Bairro";
  titulo: string;
  subtitulo: string;
  href: string;
};

const normalizar = (valor: string) =>
  valor
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

const INDICE: Resultado[] = [
  ...SERVICOS.filter((s) => s.servicoSlugExistente && VALID_SERVICO_SLUGS.has(s.servicoSlugExistente)).map((s) => ({
    tipo: "Serviço" as const,
    titulo: s.nome,
    subtitulo: "Página do serviço com preços, prazos e garantia",
    href: `/servicos/${s.servicoSlugExistente}`,
  })),
  ...CIDADES.map((c) => ({
    tipo: "Cidade" as const,
    titulo: c.nome,
    subtitulo: "Atendimento em domicílio, coleta e remoto",
    href: `/atendimento/${c.slug}`,
  })),
  ...Object.entries(BAIRROS_ATENDIMENTO).flatMap(([cidadeSlug, bairros]) => {
    const cidade = CIDADES.find((c) => c.slug === cidadeSlug);
    return bairros.map((b) => ({
      tipo: "Bairro" as const,
      titulo: `${b.nome} — ${cidade?.nome ?? cidadeSlug}`,
      subtitulo: "Atendimento no bairro com confirmação de rota pelo WhatsApp",
      href: `/atendimento/${cidadeSlug}/${b.slug}`,
    }));
  }),
];

export default function Busca() {
  const [termo, setTermo] = useState("");

  const resultados = useMemo(() => {
    const q = normalizar(termo);
    if (q.length < 2) return [] as Resultado[];
    return INDICE.filter((item) => normalizar(item.titulo).includes(q) || normalizar(item.tipo).includes(q)).slice(
      0,
      40,
    );
  }, [termo]);

  return (
    <>
      <PageSEO
        title="Busca por bairro, cidade e serviço | Técnico em Curitiba"
        description="Encontre rapidamente a página do seu bairro, cidade ou serviço de assistência técnica em Curitiba e Região Metropolitana."
        path="/busca"
      />
      <Header />
      <main id="main-content" className="container mx-auto px-4 py-8">
        <Breadcrumbs emitSchema items={[{ label: "Início", href: "/" }, { label: "Busca" }]} />

        <section className="max-w-3xl mx-auto py-6">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Busca por bairro, cidade ou serviço</h1>
          <p className="text-muted-foreground mb-6">
            Digite o nome do seu bairro (ex.: Boqueirão), da cidade (ex.: Pinhais) ou do serviço (ex.: formatação) e
            vá direto para a página certa.
          </p>

          <label htmlFor="busca-interna" className="sr-only">
            Buscar bairro, cidade ou serviço
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" aria-hidden />
            <input
              id="busca-interna"
              type="search"
              value={termo}
              onChange={(e) => setTermo(e.target.value.slice(0, 60))}
              placeholder="Ex.: Boqueirão, Pinhais, formatação, SSD…"
              className="w-full rounded-xl border bg-background pl-11 pr-4 py-3 text-base outline-none focus:ring-2 focus:ring-primary"
              autoComplete="off"
            />
          </div>

          <div className="mt-6" aria-live="polite">
            {termo.trim().length >= 2 && resultados.length === 0 && (
              <div className="rounded-xl border bg-card p-5">
                <p className="font-semibold mb-1">Nada encontrado para “{termo}”.</p>
                <p className="text-muted-foreground text-sm">
                  Mesmo assim seu bairro pode ser atendido conforme a rota do dia. Descreva o problema e confirmamos a
                  disponibilidade.
                </p>
                <InlineTriageCTA className="mt-3" location="busca_sem_resultado" label="Confirmar atendimento" />
              </div>
            )}

            {resultados.length > 0 && (
              <ul className="space-y-2">
                {resultados.map((r) => (
                  <li key={`${r.tipo}-${r.href}-${r.titulo}`}>
                    <Link
                      to={r.href}
                      className="block rounded-xl border bg-card p-4 hover:border-primary transition-colors"
                    >
                      <span className="text-xs uppercase tracking-wide text-muted-foreground">{r.tipo}</span>
                      <span className="block font-semibold">{r.titulo}</span>
                      <span className="block text-sm text-muted-foreground">{r.subtitulo}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="mt-8 flex flex-wrap gap-3 text-sm">
            <Link to="/areas-atendidas" className="text-primary hover:underline">
              Ver todas as áreas atendidas
            </Link>
            <Link to="/servicos" className="text-primary hover:underline">
              Ver todos os serviços
            </Link>
            <Link to="/precos-e-politicas" className="text-primary hover:underline">
              Preços e políticas
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
