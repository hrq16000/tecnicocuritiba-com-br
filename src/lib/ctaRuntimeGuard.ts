/**
 * Runtime guard: garante que todo clique em CTA passa pelo funil obrigatório
 * com tracking completo (click_location + app_version).
 *
 * - DEV: avisa no console quando um CTA é clicado sem `trackCTAClick`.
 * - PROD: bloqueia (preventDefault) cliques em CTAs de WhatsApp/telefone
 *   quando não há `data-cta-location` no ancestral e não há evento de
 *   tracking recente, e reporta ao GA um evento `cta_guard_block`.
 * - Sempre: audita periodicamente o DOM visível para detectar vazamento
 *   de número de telefone/WhatsApp.
 */

const PHONE_RE = /\(?\b(?:41|11|21)\)?\s*9?\s*\d{4}\s*-?\s*\d{4}\b/;
const WA_NUMBER_RE = /55\s*41\s*9{0,1}\s*7\s*\d{3}\s*-?\s*\d{4}/;

declare global {
  interface Window {
    __ctaTracked?: { type?: string; location?: string; t: number };
  }
}

function isCtaCandidate(el: HTMLElement): boolean {
  const href = el.getAttribute("href") || "";
  if (/wa\.me|api\.whatsapp\.com|^tel:/i.test(href)) return true;
  const text = (el.textContent || "").toLowerCase();
  return (
    !!el.dataset.ctaLocation ||
    !!el.getAttribute("data-wa-funnel") ||
    /whatsapp|agendar|ligar agora|fale conosco|orçamento agora/.test(text)
  );
}

function reportBlock(reason: string, meta: Record<string, unknown>) {
  try {
    const gtag = (window as unknown as { gtag?: (...a: unknown[]) => void }).gtag;
    if (typeof gtag === "function") {
      gtag("event", "cta_guard_block", { reason, ...meta });
    }
  } catch { /* noop */ }
}

function installClickGuard() {
  if (typeof document === "undefined") return;
  document.addEventListener(
    "click",
    (e) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      const el = t.closest<HTMLElement>("a,button");
      if (!el || !isCtaCandidate(el)) return;

      const ctaLoc = el.closest<HTMLElement>("[data-cta-location]")?.dataset.ctaLocation;
      const tracked = window.__ctaTracked;
      const trackedRecent = tracked && Date.now() - tracked.t < 500;

      if (import.meta.env.PROD) {
        // Só bloqueia quando NÃO há data-cta-location E nenhum evento
        // recente — evita falsos positivos em fluxos que já rastreiam.
        if (!ctaLoc && !trackedRecent) {
          e.preventDefault();
          e.stopPropagation();
          reportBlock("missing_cta_location", {
            href: el.getAttribute("href") || "",
            text: (el.textContent || "").slice(0, 40),
            path: location.pathname,
          });
          // Fallback: dispara o funil global se disponível
          try {
            window.dispatchEvent(
              new CustomEvent("wa-funnel:open", { detail: { location: "guard_fallback" } }),
            );
          } catch { /* noop */ }
        }
        return;
      }

      // DEV: aviso após o tick para permitir que o tracking seja chamado
      setTimeout(() => {
        const fresh = window.__ctaTracked;
        if (!fresh || Date.now() - fresh.t > 500) {
          // eslint-disable-next-line no-console
          console.warn("[cta-guard] CTA clicado sem trackCTAClick:", {
            text: (el.textContent || "").slice(0, 40),
            el,
          });
        }
      }, 50);
    },
    true,
  );
}

function installNumberLeakWatcher() {
  if (typeof document === "undefined") return;
  const scan = () => {
    const body = document.body?.innerText || "";
    if (PHONE_RE.test(body) || WA_NUMBER_RE.test(body)) {
      if (import.meta.env.DEV) {
        // eslint-disable-next-line no-console
        console.warn("[cta-guard] Número de telefone/WhatsApp exposto no DOM visível");
      } else {
        reportBlock("phone_number_leak", { path: location.pathname });
      }
    }
  };
  setTimeout(scan, 1500);
  window.addEventListener("popstate", () => setTimeout(scan, 500));
}

export function installCtaRuntimeGuard() {
  installClickGuard();
  installNumberLeakWatcher();
}
