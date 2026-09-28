/**
 * Lista de padrões de rota do LegacyApp, extraída do próprio código-fonte
 * (fonte única — sem duplicar centenas de rotas). Usada pela rota splat de
 * compatibilidade para decidir 200 vs 404 ainda no servidor.
 */
import legacySource from "@/LegacyApp.tsx?raw";

export const LEGACY_ROUTE_PATTERNS: string[] = Array.from(
  new Set(
    Array.from(legacySource.matchAll(/<Route\s+path="([^"]+)"/g))
      .map((m) => m[1])
      .filter((p) => p !== "*"),
  ),
);

const normalize = (p: string) => {
  const clean = p.split(/[?#]/)[0] || "/";
  const trimmed = clean.length > 1 ? clean.replace(/\/+$/, "") : clean;
  return trimmed || "/";
};

export function matchLegacyPattern(
  pattern: string,
  pathname: string,
): Record<string, string> | null {
  const a = normalize(pattern).split("/").filter(Boolean);
  const b = normalize(pathname).split("/").filter(Boolean);
  if (a.length !== b.length) return null;
  const params: Record<string, string> = {};
  for (let i = 0; i < a.length; i++) {
    if (a[i].startsWith(":")) {
      try {
        params[a[i].slice(1)] = decodeURIComponent(b[i]);
      } catch {
        params[a[i].slice(1)] = b[i];
      }
    } else if (a[i].toLowerCase() !== b[i].toLowerCase()) {
      return null;
    }
  }
  return params;
}

export function isLegacyPath(pathname: string): boolean {
  return LEGACY_ROUTE_PATTERNS.some((p) => matchLegacyPattern(p, pathname) !== null);
}
