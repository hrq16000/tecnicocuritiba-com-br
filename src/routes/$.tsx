import { createFileRoute, notFound, redirect } from "@tanstack/react-router";

import LegacyApp from "@/LegacyApp";
import { isLegacyPath, legacyRedirectFor, normalizeLegacyPath } from "@/lib/legacyRoutes";
import { seoForPath } from "@/lib/seoRouteHead";

const SITE = "https://tecnicocuritiba.com.br";

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
    return { meta, links: [{ rel: "canonical", href: url }] };
  },
  component: LegacyApp,
});
