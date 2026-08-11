import { useEffect, useState } from "react";

/**
 * BreadcrumbList automático de fallback.
 *
 * Injeta um BreadcrumbList derivado da própria URL SOMENTE quando a rota atual
 * ainda não emitiu um. Não remove nem sobrescreve schemas existentes — páginas
 * com breadcrumbs próprios continuam mandando (regra do SchemaDedup).
 */
const BASE_URL = "https://tecnicocuritiba.com.br";
const ID = "auto-breadcrumb-schema";

const LABELS: Record<string, string> = {
  servicos: "Serviços",
  atendimento: "Atendimento",
  problema: "Problemas",
  problemas: "Problemas",
  guias: "Guias",
  blog: "Blog",
  precos: "Preços",
  bairros: "Bairros",
};

const prettify = (slug: string) =>
  LABELS[slug] ??
  decodeURIComponent(slug)
    .split("-")
    .map((w) => (w.length > 2 ? w.charAt(0).toUpperCase() + w.slice(1) : w))
    .join(" ");

function hasBreadcrumb(): boolean {
  const scripts = Array.from(
    document.querySelectorAll<HTMLScriptElement>('script[type="application/ld+json"]'),
  ).filter((s) => s.id !== ID);
  return scripts.some((s) => /"BreadcrumbList"/.test(s.textContent || ""));
}

export const AutoBreadcrumbSchema = () => {
  const [pathname, setPathname] = useState(() =>
    typeof window === "undefined" ? "/" : window.location.pathname,
  );

  // Sem dependência de Router: acompanha mudanças de rota (SPA e histórico).
  useEffect(() => {
    const sync = () => setPathname(window.location.pathname);
    window.addEventListener("popstate", sync);
    const id = window.setInterval(sync, 1000);
    return () => {
      window.removeEventListener("popstate", sync);
      window.clearInterval(id);
    };
  }, []);

  useEffect(() => {
    document.getElementById(ID)?.remove();
    const parts = pathname.split("/").filter(Boolean);
    if (parts.length === 0) return;

    let cancelled = false;
    const inject = () => {
      if (cancelled || hasBreadcrumb() || document.getElementById(ID)) return;
      let acc = "";
      const items = [
        { name: "Início", item: `${BASE_URL}/` },
        ...parts.map((p) => {
          acc += `/${p}`;
          return { name: prettify(p), item: `${BASE_URL}${acc}` };
        }),
      ];
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = ID;
      script.text = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((it, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: it.name,
          item: it.item,
        })),
      });
      document.head.appendChild(script);
    };

    // Espera os schemas das páginas montarem antes de decidir pelo fallback.
    const timer = window.setTimeout(inject, 1400);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      document.getElementById(ID)?.remove();
    };
  }, [pathname]);

  return null;
};

export default AutoBreadcrumbSchema;
