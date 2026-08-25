import { createFileRoute, redirect } from "@tanstack/react-router";

/**
 * Alias legado/semântico: /ordem-de-servico → /abrir-os (canônica).
 * Mantém SEO evolutivo: nunca remover URLs, redirecionar 301.
 */
export const Route = createFileRoute("/ordem-de-servico")({
  beforeLoad: () => {
    throw redirect({ to: "/abrir-os", statusCode: 301 });
  },
});
