import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
} from "@tanstack/react-router";
import { Suspense, lazy, useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";

import { ScrollToTop } from "@/components/ScrollToTop";
import { SchemaDedup } from "@/components/SchemaDedup";
import NotFound from "@/pages/NotFound";
import { captureUtmsFromUrl } from "@/lib/utmCapture";

const Toaster = lazy(() =>
  import("@/components/ui/toaster").then((m) => ({ default: m.Toaster })),
);
const Sonner = lazy(() =>
  import("@/components/ui/sonner").then((m) => ({ default: m.Toaster })),
);
// Funil de triagem + botão flutuante: globais, carregados sob demanda.
// Todos os CTAs do site disparam `wa-funnel:open` — sem estes mounts o
// evento não tem ouvinte e a conversão quebra (regressão da migração).
const WhatsAppFunnel = lazy(() =>
  import("@/components/WhatsAppFunnel").then((m) => ({
    default: m.WhatsAppFunnel,
  })),
);
const WhatsAppFloat = lazy(() =>
  import("@/components/WhatsAppFloat").then((m) => ({
    default: m.WhatsAppFloat,
  })),
);
const AutoBreadcrumbSchema = lazy(() => import("@/components/AutoBreadcrumbSchema"));

/** Bootstrap client-only: UTMs no primeiro hit + tracking de profundidade. */
function AppInit() {
  useEffect(() => {
    captureUtmsFromUrl();
    import("@/lib/analytics").then(({ attachScrollDepthTracking }) =>
      attachScrollDepthTracking(),
    );
  }, []);
  return null;
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1.0" },
      { name: "robots", content: "index, follow" },
      { name: "author", content: "Técnico Curitiba" },
      { property: "og:locale", content: "pt_BR" },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@500;600;700;800&display=swap",
      },
    ],
  }),
  component: RootComponent,
  notFoundComponent: RootNotFound,
});

function RootNotFound() {
  return (
    <RootDocument>
      <NotFound />
    </RootDocument>
  );
}

function RootComponent() {
  return (
    <RootDocument>
      <ScrollToTop />
      <SchemaDedup />
      <AppInit />
      <Outlet />
      <Suspense fallback={null}>
        <Toaster />
        <Sonner />
        <AutoBreadcrumbSchema />
        <WhatsAppFunnel />
        <WhatsAppFloat />
      </Suspense>
    </RootDocument>
  );
}

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}
