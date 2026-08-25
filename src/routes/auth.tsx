import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";

import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Acesso administrativo | Técnico em Curitiba" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let active = true;
    void supabase.auth.getUser().then(({ data }) => {
      if (!active) return;
      if (data.user) void navigate({ to: "/admin/leads" });
      else setChecking(false);
    });
    return () => {
      active = false;
    };
  }, [navigate]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const { error: err } = await supabase.auth.signInWithPassword({ email, password });
    setSubmitting(false);
    if (err) {
      setError("Credenciais inválidas ou acesso não autorizado.");
      return;
    }
    void navigate({ to: "/admin/leads" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-4">
      <main className="w-full max-w-sm">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-1">
            <span aria-hidden className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
              🔒
            </span>
            <h1 className="text-xl font-bold">Painel administrativo</h1>
          </div>
          <p className="text-xs text-muted-foreground mb-5">
            Acesso restrito. Apenas operadores autorizados visualizam os leads da triagem.
          </p>
          {checking ? (
            <div className="space-y-3" aria-label="Verificando sessão">
              <div className="h-9 rounded-md bg-muted animate-pulse" />
              <div className="h-9 rounded-md bg-muted animate-pulse" />
              <div className="h-10 rounded-md bg-muted animate-pulse" />
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              {error && (
                <div
                  role="alert"
                  className="text-xs p-2 rounded-md border border-destructive/40 bg-destructive/5 text-destructive"
                >
                  {error}
                </div>
              )}
              <div className="space-y-1">
                <label htmlFor="auth-email" className="text-sm font-medium">
                  Email
                </label>
                <input
                  id="auth-email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div className="space-y-1">
                <label htmlFor="auth-password" className="text-sm font-medium">
                  Senha
                </label>
                <input
                  id="auth-password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-md bg-primary text-primary-foreground px-3 py-2 text-sm font-semibold disabled:opacity-60"
              >
                {submitting ? "Entrando…" : "Entrar"}
              </button>
            </form>
          )}
        </div>
        <p className="mt-4 text-center">
          <a href="/" className="text-xs text-muted-foreground underline underline-offset-2">
            Voltar ao site
          </a>
        </p>
      </main>
    </div>
  );
}
