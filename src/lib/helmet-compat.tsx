/**
 * Compatibility shim for "react-helmet" (aliased in vite.config.ts and
 * tsconfig paths). Under TanStack Start, per-route metadata belongs in the
 * route's head() function. This shim keeps legacy <Helmet> usage compiling
 * and renders its children inline, which preserves JSON-LD <script> tags
 * (Google parses JSON-LD from the body just fine). <title>/<meta> children
 * are inert here — they are being ported to route head() in the migration.
 */
import type { ReactNode } from "react";

interface HelmetProps {
  children?: ReactNode;
}

export function Helmet({ children }: HelmetProps) {
  return <>{children}</>;
}

export function HelmetProvider({ children }: HelmetProps) {
  return <>{children}</>;
}

export default { Helmet, HelmetProvider };
