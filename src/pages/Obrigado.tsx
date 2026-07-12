import { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, MessageCircle, ArrowLeft, Clock, ShieldCheck } from "lucide-react";
import PageSEO from "@/components/PageSEO";
import { trackCTAClick } from "@/lib/analytics";

const WHATSAPP_NUMBER = "5541997452053";

/**
 * Página de confirmação pós-clique.
 * URL: /obrigado?canal=whatsapp[&origem=xxx]
 * - Mostra confirmação amigável + reforço do próximo passo (fotos + vídeo)
 * - Reabre o WhatsApp se o usuário perdeu a aba (fallback humano)
 * - Links para voltar ao site (Home, Serviços, Blog)
 */
const Obrigado = () => {
  const params = useMemo(
    () => (typeof window !== "undefined" ? new URLSearchParams(window.location.search) : new URLSearchParams()),
    [],
  );
  const origem = params.get("origem") || "direto";

  useEffect(() => {
    trackCTAClick("whatsapp", `thankyou_${origem}`);
  }, [origem]);

  const waHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    "Olá! Cheguei aqui pela página de confirmação — preciso reabrir a conversa.",
  )}`;

  return (
    <>
      <PageSEO
        title="Pedido recebido · Técnico em Curitiba"
        description="Sua triagem foi enviada. Continue a conversa no WhatsApp — Seg–Sáb 08h–20h, resposta em ~30 min."
        canonical="https://tecnicocuritiba.com.br/obrigado"
        noindex
      />
      <main className="min-h-screen bg-background px-4 py-14 sm:py-20">
        <div className="mx-auto max-w-xl">
          <section className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-[var(--shadow-lg)] text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/15">
              <CheckCircle2 className="h-8 w-8 text-emerald-600" aria-hidden />
            </div>
            <h1 className="mb-2 text-2xl sm:text-3xl font-bold text-foreground">
              Pedido recebido! Continue no WhatsApp
            </h1>
            <p className="mb-5 text-sm sm:text-base text-muted-foreground leading-relaxed">
              Sua triagem foi encaminhada. Um técnico humano responde em ~30 min durante o expediente.
            </p>

            <div className="mb-5 grid gap-2 rounded-lg border border-amber-500/40 bg-amber-500/10 p-3 text-left text-[13px] leading-snug">
              <p className="font-semibold text-foreground">📸 Envie agora no WhatsApp para iniciarmos:</p>
              <ul className="ml-4 list-disc space-y-1 text-foreground/80">
                <li><strong>Fotos</strong> do equipamento por completo, incluindo <strong>etiqueta traseira</strong> (modelo/série).</li>
                <li><strong>Vídeo curto</strong> do defeito acontecendo — <strong>sem áudio nem ruídos de fundo</strong>.</li>
              </ul>
              <p className="text-foreground/70">Sem esses arquivos, o atendimento não é iniciado.</p>
            </div>

            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              data-funnel-skip="1"
              className="mb-3 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-[hsl(var(--whatsapp))] px-4 font-bold text-white hover:opacity-95"
              onClick={() => trackCTAClick("whatsapp", `thankyou_reopen_${origem}`)}
            >
              <MessageCircle className="h-5 w-5" /> Abrir WhatsApp novamente
            </a>

            <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-3 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4" /> Seg–Sáb · 08h–20h
              </span>
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4" /> Sigilo garantido
              </span>
            </div>
          </section>

          <nav className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm" aria-label="Voltar ao site">
            <Link
              to="/"
              className="inline-flex min-h-11 items-center justify-center gap-1 rounded-lg border border-border bg-card px-3 font-medium hover:border-primary/60"
            >
              <ArrowLeft className="h-4 w-4" /> Início
            </Link>
            <Link
              to="/servicos"
              className="inline-flex min-h-11 items-center justify-center rounded-lg border border-border bg-card px-3 font-medium hover:border-primary/60"
            >
              Ver serviços
            </Link>
            <Link
              to="/blog"
              className="inline-flex min-h-11 items-center justify-center rounded-lg border border-border bg-card px-3 font-medium hover:border-primary/60"
            >
              Ler o blog
            </Link>
          </nav>
        </div>
      </main>
    </>
  );
};

export default Obrigado;
