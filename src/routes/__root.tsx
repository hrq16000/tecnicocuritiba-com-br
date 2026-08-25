import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
} from "@tanstack/react-router";
import { Suspense, lazy, type ReactNode } from "react";

import appCss from "../styles.css?url";

import { ScrollToTop } from "@/components/ScrollToTop";
import { SchemaDedup } from "@/components/SchemaDedup";
import NotFound from "@/pages/NotFound";

const Toaster = lazy(() =>
  import("@/components/ui/toaster").then((m) => ({ default: m.Toaster })),
);
const Sonner = lazy(() =>
  import("@/components/ui/sonner").then((m) => ({ default: m.Toaster })),
);

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
      <Outlet />
      <Suspense fallback={null}>
        <Toaster />
        <Sonner />
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
