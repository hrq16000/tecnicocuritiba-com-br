import { useCallback, useEffect, useState } from "react";
import { loadAdSense } from "@/lib/adsense";
import {
  CONSENT_OPEN_EVENT,
  applyConsentMode,
  getConsent,
  setConsent,
} from "@/lib/consent";

/**
 * Banner de consentimento compacto, não bloqueante e configurável.
 * - Duas categorias independentes: Anúncios e Medição de audiência.
 * - Nenhum script de anúncio é carregado antes do aceite explícito.
 * - Mobile: barra baixa com espaço reservado para o botão de WhatsApp.
 * - Reabre pelo link "Preferências de cookies" (evento `lgpd:consent-open`).
 */
export const ConsentBanner = () => {
  const [open, setOpen] = useState(false);
  const [custom, setCustom] = useState(false);
  const [ads, setAds] = useState(true);
  const [analytics, setAnalytics] = useState(true);

  useEffect(() => {
    const saved = getConsent();
    if (!saved) {
      setOpen(true);
    } else {
      applyConsentMode(saved);
      if (saved.ads) loadAdSense();
    }
    const reopen = () => {
      const cur = getConsent();
      setAds(cur?.ads ?? true);
      setAnalytics(cur?.analytics ?? true);
      setCustom(true);
      setOpen(true);
    };
    window.addEventListener(CONSENT_OPEN_EVENT, reopen);
    return () => window.removeEventListener(CONSENT_OPEN_EVENT, reopen);
  }, []);

  const decide = useCallback((next: { ads: boolean; analytics: boolean }) => {
    const state = setConsent(next);
    if (state.ads) loadAdSense();
    setCustom(false);
    setOpen(false);
  }, []);

  if (!open) return null;

  return (
    <div
      role="region"
      aria-label="Aviso de privacidade e cookies"
      className={[
        "fixed z-[90] rounded-xl border border-border bg-card/95 text-card-foreground shadow-lg backdrop-blur",
        "left-3 right-[5.5rem] bottom-3 px-3 py-2.5",
        "sm:left-6 sm:right-auto sm:bottom-6 sm:max-w-md sm:px-4 sm:py-3",
      ].join(" ")}
      style={{ marginBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <p className="min-w-0 flex-1 text-xs leading-snug text-muted-foreground sm:text-sm">
          Usamos cookies para medir audiência e exibir anúncios.{" "}
          <a href="/politica-de-cookies-e-anuncios" className="underline underline-offset-2 hover:text-foreground">
            Política de Cookies
          </a>
        </p>
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={() => setCustom((v) => !v)}
            aria-expanded={custom}
            className="min-h-11 rounded-lg border border-border px-3 text-xs font-semibold text-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:text-sm"
          >
            Personalizar
          </button>
          <button
            type="button"
            onClick={() => decide({ ads: false, analytics: false })}
            className="min-h-11 rounded-lg border border-border px-3 text-xs font-semibold text-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:text-sm"
          >
            Recusar
          </button>
          <button
            type="button"
            onClick={() => decide({ ads: true, analytics: true })}
            className="min-h-11 rounded-lg bg-primary px-4 text-xs font-bold text-primary-foreground hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:text-sm"
          >
            Aceitar
          </button>
        </div>
      </div>

      {custom && (
        <div className="mt-3 border-t border-border/60 pt-3">
          <fieldset className="space-y-2">
            <legend className="sr-only">Categorias de cookies</legend>
            <label className="flex items-start gap-2 text-xs text-muted-foreground sm:text-sm">
              <input
                type="checkbox"
                className="mt-1 h-4 w-4"
                checked={analytics}
                onChange={(e) => setAnalytics(e.target.checked)}
              />
              <span>
                <strong className="text-foreground">Medição de audiência</strong> — entender quais páginas
                ajudam e onde o atendimento trava.
              </span>
            </label>
            <label className="flex items-start gap-2 text-xs text-muted-foreground sm:text-sm">
              <input
                type="checkbox"
                className="mt-1 h-4 w-4"
                checked={ads}
                onChange={(e) => setAds(e.target.checked)}
              />
              <span>
                <strong className="text-foreground">Anúncios de terceiros</strong> — cookies do Google
                AdSense para exibir e medir publicidade.
              </span>
            </label>
          </fieldset>
          <p className="mt-2 text-[11px] leading-snug text-muted-foreground">
            Cookies essenciais de funcionamento não podem ser desativados. Você pode alterar essa escolha
            a qualquer momento na Política de Cookies.
          </p>
          <button
            type="button"
            onClick={() => decide({ ads, analytics })}
            className="mt-3 min-h-11 w-full rounded-lg bg-primary px-4 text-xs font-bold text-primary-foreground hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:text-sm"
          >
            Salvar preferências
          </button>
        </div>
      )}
    </div>
  );
};

export default ConsentBanner;
