import { createFileRoute, notFound } from "@tanstack/react-router";

import LegacyApp from "@/LegacyApp";
import { isLegacyPath } from "@/lib/legacyRoutes";

/**
 * Compatibilidade: entrega em entrada direta as rotas públicas ainda
 * registradas no LegacyApp. Rotas TanStack explícitas têm precedência.
 * Caminho fora do LegacyApp → notFound() (HTTP 404 no SSR).
 */
export const Route = createFileRoute("/$")({
  loader: ({ location }) => {
    if (!isLegacyPath(location.pathname)) throw notFound();
    return null;
  },
  component: LegacyApp,
});
