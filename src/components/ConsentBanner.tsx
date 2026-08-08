import { useEffect, useState } from "react";
import { loadAdSense, loadAdSenseIfConsented } from "@/lib/adsense";

const KEY = "lgpd_consent_v1";


const updateConsent = (granted: boolean) => {
  if (typeof window === "undefined" || !window.gtag) return;
  const v = granted ? "granted" : "denied";
  window.gtag("consent", "update", {
    ad_storage: v,
    ad_user_data: v,
    ad_personalization: v,
    analytics_storage: v,
  });
};

/**
 * Banner de consentimento compacto e não bloqueante.
 * - Mobile: barra baixa, alinhada à esquerda, com espaço reservado à direita
 *   para o botão flutuante de WhatsApp continuar clicável.
 * - Respeita safe-area-inset-bottom, alvos de toque >= 44px e foco por teclado.
 * - Mantém a mesma chave de persistência e o mesmo contrato com o analytics.
 */
export const ConsentBanner = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(KEY);
      if (!saved) setOpen(true);
      else loadAdSenseIfConsented();
    } catch {
      setOpen(true);
    }
  }, []);

  const decide = (granted: boolean) => {
    try { localStorage.setItem(KEY, granted ? "granted" : "denied"); } catch { /* storage indisponível */ }
    updateConsent(granted);
    if (granted) loadAdSense();
    setOpen(false);
  };


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
          Usamos cookies para medir audiência.{" "}
          <a href="/politica-de-privacidade" className="underline underline-offset-2 hover:text-foreground">
            Privacidade
          </a>
        </p>
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={() => decide(false)}
            className="min-h-11 rounded-lg border border-border px-3 text-xs font-semibold text-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:text-sm"
          >
            Recusar
          </button>
          <button
            type="button"
            onClick={() => decide(true)}
            className="min-h-11 rounded-lg bg-primary px-4 text-xs font-bold text-primary-foreground hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:text-sm"
          >
            Aceitar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConsentBanner;
