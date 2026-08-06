import { MessageCircle } from "lucide-react";

/**
 * CTA que inicia a triagem existente (mesmo fluxo do funil global).
 * Não cria link direto para WhatsApp: dispara o evento aprovado `wa-funnel:open`,
 * preservando o contexto da página (origem e assunto).
 */
export const InlineTriageCTA = ({
  label = "Descrever meu problema",
  location,
  message,
  hint,
  className = "",
}: {
  label?: string;
  location: string;
  message?: string;
  hint?: string;
  className?: string;
}) => {
  const open = () => {
    if (typeof window === "undefined") return;
    window.dispatchEvent(
      new CustomEvent("wa-funnel:open", { detail: { location, message } }),
    );
  };

  return (
    <div className={className}>
      <button
        type="button"
        onClick={open}
        data-cta-location={location}
        className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[hsl(var(--whatsapp))] px-6 text-base font-extrabold text-primary-foreground shadow-lg transition-transform hover:scale-[1.01] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:w-auto"
      >
        <MessageCircle className="h-5 w-5" aria-hidden="true" />
        {label}
      </button>
      {hint ? <p className="mt-2 text-xs text-muted-foreground">{hint}</p> : null}
    </div>
  );
};

export default InlineTriageCTA;
