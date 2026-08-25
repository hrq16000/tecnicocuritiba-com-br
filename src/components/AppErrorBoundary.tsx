// @ts-nocheck — legacy file silenced during TanStack migration (see .lovable/migrate-to-tanstack/tsc-silenced.json)
import { Component, type ErrorInfo, type ReactNode } from "react";

const WHATSAPP_URL = "https://wa.me/5541997452053?text=Ol%C3%A1!%20O%20site%20travou%20no%20meu%20celular.%20Preciso%20de%20atendimento%20t%C3%A9cnico.";
const RELOAD_KEY = "__app_boundary_reload__";

type Props = { children: ReactNode };
type State = { hasError: boolean };

/**
 * Estratégia: erros em runtime são quase sempre chunks obsoletos após deploy
 * ou falhas transitórias. Em vez de mostrar uma tela que fere confiança,
 * tentamos UM auto-reload silencioso guardado por sessionStorage. Só depois
 * do 2º erro consecutivo mostramos o fallback com CTA WhatsApp.
 */
export class AppErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // Sem auto-reload: reloads inesperados quebram fluxos ativos (ex: funil aberto).
    // Apenas logamos e mostramos o fallback com CTA WhatsApp.
    console.error("[app:error-boundary]", { error, info });
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <main className="flex min-h-screen items-center justify-center bg-background px-4 py-20 text-foreground">
        <section className="w-full max-w-md rounded-2xl border border-border bg-card p-6 text-center shadow-[var(--shadow-xl)]">
          <h1 className="mb-3 text-2xl font-bold">Atendimento continua pelo WhatsApp</h1>
          <p className="mb-5 text-sm leading-relaxed text-muted-foreground">
            A página não carregou corretamente neste dispositivo. Você ainda consegue chamar o técnico agora.
          </p>
          <div className="grid gap-3">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center rounded-lg bg-[hsl(var(--whatsapp))] px-4 font-bold text-primary-foreground"
            >
              WhatsApp Agora
            </a>
            <button
              type="button"
              onClick={() => {
                try { sessionStorage.removeItem(RELOAD_KEY); } catch { /* noop */ }
                window.location.reload();
              }}
              className="inline-flex min-h-11 items-center justify-center rounded-lg border border-border px-4 font-semibold text-foreground"
            >
              Recarregar página
            </button>
          </div>
        </section>
      </main>
    );
  }
}
