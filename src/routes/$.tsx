import { createFileRoute, notFound, redirect } from "@tanstack/react-router";

import LegacyApp from "@/LegacyApp";
import { isLegacyPath, legacyRedirectFor, normalizeLegacyPath } from "@/lib/legacyRoutes";
import { seoForPath } from "@/lib/seoRouteHead";

const SITE = "https://tecnicocuritiba.com.br";

const prettify = (seg: string) => {
  const t = decodeURIComponent(seg).replace(/-/g, " ");
  return t.charAt(0).toUpperCase() + t.slice(1);
};

/**
 * Compatibilidade: entrega em entrada direta as rotas públicas ainda
 * registradas no LegacyApp. Rotas TanStack explícitas têm precedência.
 * - <Navigate> estático no LegacyApp → 301 no SSR.
 * - Caminho fora do LegacyApp → notFound() (HTTP 404 no SSR).
 * - head(): canonical/og:url autorreferentes + title/description do seoRouteHead.
 */
export const Route = createFileRoute("/$")({
  loader: ({ location }) => {
    const target = legacyRedirectFor(location.pathname);
    if (target) throw redirect({ href: target, statusCode: 301 });
    if (!isLegacyPath(location.pathname)) throw notFound();
    return { pathname: normalizeLegacyPath(location.pathname) };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const seo = seoForPath(loaderData.pathname);
    const url = seo?.canonical ?? `${SITE}${loaderData.pathname === "/" ? "/" : loaderData.pathname}`;
    const meta: Array<Record<string, string>> = [{ property: "og:url", content: url }];
    if (seo) {
      meta.unshift(
        { title: seo.title },
        { name: "description", content: seo.description },
        { property: "og:title", content: seo.title },
        { property: "og:description", content: seo.description },
        { name: "twitter:card", content: "summary_large_image" },
      );
      if (seo.ogImage) {
        meta.push({ property: "og:image", content: seo.ogImage }, { name: "twitter:image", content: seo.ogImage });
      }
    }
    // BreadcrumbList SSR para TODA página interna (fonte primária; o
    // AutoBreadcrumbSchema/SchemaDedup no cliente só evitam cópias).
    const parts = loaderData.pathname.split("/").filter(Boolean);
    const scripts =
      parts.length === 0
        ? []
        : [
            {
              type: "application/ld+json",
              children: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Início", item: `${SITE}/` },
                  ...parts.map((p, i) => {
                    const last = i === parts.length - 1;
                    const name = last && seo ? (seo.title.split(/\s[|—–]\s/)[0] ?? prettify(p)) : prettify(p);
                    return {
                      "@type": "ListItem",
                      position: i + 2,
                      name,
                      item: last ? url : `${SITE}/${parts.slice(0, i + 1).join("/")}`,
                    };
                  }),
                ],
              }),
            },
          ];
    return { meta, links: [{ rel: "canonical", href: url }], scripts };
  },
  component: LegacyApp,
});
