import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageSEO } from "@/components/PageSEO";
import SiteBaseSchema from "@/components/SiteBaseSchema";
import Breadcrumbs from "@/components/Breadcrumbs";
import InlineTriageCTA from "@/components/InlineTriageCTA";
import { CIDADES, SERVICOS } from "@/lib/servicoCidadeData";
import { BAIRROS_ATENDIMENTO } from "@/lib/atendimentoBairrosData";
import { VALID_SERVICO_SLUGS } from "@/lib/validServicoSlugs";
import { buildContextualMessage } from "@/lib/whatsappMessage";
import { trackCTAClick } from "@/lib/analytics";

type Tipo = "Serviço" | "Cidade" | "Bairro";

type Resultado = {
  tipo: Tipo;
  titulo: string;
  subtitulo: string;
  href: string;
  /** Contexto para a mensagem do WhatsApp. */
  cidadeLabel?: string;
  bairroLabel?: string;
  servicoLabel?: string;
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
    servicoLabel: s.nome,
  })),
  ...CIDADES.map((c) => ({
    tipo: "Cidade" as const,
    titulo: c.nome,
    subtitulo: "Atendimento em domicílio, coleta e remoto",
    href: `/atendimento/${c.slug}`,
    cidadeLabel: c.nome,
  })),
  ...Object.entries(BAIRROS_ATENDIMENTO).flatMap(([cidadeSlug, bairros]) => {
    const cidade = CIDADES.find((c) => c.slug === cidadeSlug);
    return bairros.map((b) => ({
      tipo: "Bairro" as const,
      titulo: `${b.nome} — ${cidade?.nome ?? cidadeSlug}`,
      subtitulo: "Atendimento no bairro com confirmação de rota pelo WhatsApp",
      href: `/atendimento/${cidadeSlug}/${b.slug}`,
      cidadeLabel: cidade?.nome,
      bairroLabel: b.nome,
    }));
  }),
];

/** Sugestões rápidas — cobrem as buscas comerciais mais frequentes. */
const SUGESTOES = [
  "Formatação",
  "Remoção de vírus",
  "Upgrade SSD",
  "Conserto de notebook",
  "Boqueirão",
  "Batel",
  "São José dos Pinhais",
  "Pinhais",
];

export default function Busca() {
  const [params, setParams] = useSearchParams();
  const [termo, setTermo] = useState(() => (params.get("q") ?? "").slice(0, 60));

  // Mantém ?q= na URL — casa com o SearchAction do schema e permite
  // compartilhar/indexar a busca sem quebrar o histórico.
  useEffect(() => {
    const atual = params.get("q") ?? "";
    if (atual === termo) return;
    const next = new URLSearchParams(params);
    if (termo.trim()) next.set("q", termo.trim());
    else next.delete("q");
    setParams(next, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [termo]);

  const resultados = useMemo(() => {
    const q = normalizar(termo);
    if (q.length < 2) return [] as Resultado[];
    return INDICE.filter((item) => normalizar(item.titulo).includes(q) || normalizar(item.tipo).includes(q)).slice(
      0,
      40,
    );
  }, [termo]);

  // Filtros efetivamente reconhecidos na busca — usados na mensagem do WhatsApp.
  const filtros = useMemo(() => {
    const q = normalizar(termo);
    if (q.length < 2) return {} as { cidadeLabel?: string; bairroLabel?: string; servicoLabel?: string };
    const primeiro = (tipo: Tipo) => resultados.find((r) => r.tipo === tipo);
    return {
      servicoLabel: primeiro("Serviço")?.servicoLabel,
      bairroLabel: primeiro("Bairro")?.bairroLabel,
      cidadeLabel: primeiro("Cidade")?.cidadeLabel ?? primeiro("Bairro")?.cidadeLabel,
    };
  }, [resultados, termo]);

  const mensagemWhats = useMemo(
    () =>
      buildContextualMessage({
        servicoLabel: filtros.servicoLabel,
        cidadeLabel: filtros.cidadeLabel,
        bairroLabel: filtros.bairroLabel,
        detalhes: termo.trim() ? `Busquei no site por "${termo.trim()}"` : undefined,
        fallback: "Olá! Vim do site tecnicocuritiba.com.br e preciso de um técnico de informática.",
      }),
    [filtros, termo],
  );

  const registrarClique = (location: string) => {
    trackCTAClick("whatsapp", location, {
      servico: filtros.servicoLabel,
      cidade: filtros.cidadeLabel,
      bairro: filtros.bairroLabel,
    });
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "search_whatsapp_click", {
        event_category: "engagement",
        search_term: termo.trim() || "unknown",
        filtro_servico: filtros.servicoLabel || "unknown",
        filtro_cidade: filtros.cidadeLabel || "unknown",
        filtro_bairro: filtros.bairroLabel || "unknown",
        wa_message: mensagemWhats.slice(0, 300),
      });
    }
  };

  return (
    <>
      <PageSEO
        title="Busca por bairro, cidade e serviço | Técnico em Curitiba"
        description="Encontre rapidamente a página do seu bairro, cidade ou serviço de assistência técnica em Curitiba e Região Metropolitana."
        path="/busca"
      />
      <SiteBaseSchema />
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
              list="busca-sugestoes"
              enterKeyHint="search"
            />
            <datalist id="busca-sugestoes">
              {INDICE.slice(0, 200).map((i) => (
                <option key={`${i.tipo}-${i.href}-${i.titulo}`} value={i.titulo} />
              ))}
            </datalist>
          </div>

          <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Sugestões rápidas de busca">
            {SUGESTOES.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setTermo(s)}
                className="rounded-full border px-3 py-1.5 text-sm hover:border-primary hover:text-primary transition-colors"
              >
                {s}
              </button>
            ))}
          </div>

          <div className="mt-6" aria-live="polite">
            {termo.trim().length >= 2 && resultados.length === 0 && (
              <div className="rounded-xl border bg-card p-5">
                <p className="font-semibold mb-1">Nada encontrado para “{termo}”.</p>
                <p className="text-muted-foreground text-sm">
                  Mesmo assim seu bairro pode ser atendido conforme a rota do dia. Descreva o problema e confirmamos a
                  disponibilidade.
                </p>
                <div onClick={() => registrarClique("busca_sem_resultado")}>
                  <InlineTriageCTA
                    className="mt-3"
                    location="busca_sem_resultado"
                    message={mensagemWhats}
                    label="Confirmar atendimento"
                  />
                </div>
              </div>
            )}

            {resultados.length > 0 && (
              <>
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

                <div className="mt-6 rounded-xl border bg-card p-5">
                  <p className="font-semibold mb-1">Prefere resolver agora pelo WhatsApp?</p>
                  <p className="text-muted-foreground text-sm">
                    A mensagem já vai preenchida com o que você buscou
                    {filtros.bairroLabel ? ` (${filtros.bairroLabel})` : filtros.cidadeLabel ? ` (${filtros.cidadeLabel})` : ""}.
                  </p>
                  <div onClick={() => registrarClique("busca_resultado")}>
                    <InlineTriageCTA
                      className="mt-3"
                      location="busca_resultado"
                      message={mensagemWhats}
                      label="Falar no WhatsApp com meus filtros"
                    />
                  </div>
                </div>
              </>
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
