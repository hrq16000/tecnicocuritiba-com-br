/**
 * Lista de padrões de rota do LegacyApp, extraída do próprio código-fonte
 * (fonte única — sem duplicar centenas de rotas). Usada pela rota splat de
 * compatibilidade para decidir 200 vs 404 ainda no servidor.
 */
import legacySource from "@/LegacyApp.tsx?raw";
import { CANONICAL_PROBLEM_SLUGS } from "./canonicalProblemSlugs.generated";

const canonicalProblemSlugs = new Set<string>(CANONICAL_PROBLEM_SLUGS);

export const LEGACY_ROUTE_PATTERNS: string[] = Array.from(
  new Set(
    Array.from(legacySource.matchAll(/<Route\s+path="([^"]+)"/g))
      .map((m) => m[1] ?? "")
      .filter((p) => p !== "" && p !== "*"),
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
    const seg = a[i] ?? "";
    const val = b[i] ?? "";
    if (seg.startsWith(":")) {
      try {
        params[seg.slice(1)] = decodeURIComponent(val);
      } catch {
        params[seg.slice(1)] = val;
      }
    } else if (seg.toLowerCase() !== val.toLowerCase()) {
      return null;
    }
  }
  return params;
}

export function isLegacyPath(pathname: string): boolean {
  return LEGACY_ROUTE_PATTERNS.some((p) => matchLegacyPattern(p, pathname) !== null);
}

/** Redirects estáticos do LegacyApp (<Route path=... element={<Navigate to=...}) → 301 no SSR. */
export const LEGACY_REDIRECTS: ReadonlyMap<string, string> = new Map(
  Array.from(
    legacySource.matchAll(/<Route\s+path="([^":*]+)"\s+element=\{<Navigate\s+to="([^"]+)"/g),
  ).map((m) => [normalize(m[1] ?? "").toLowerCase(), m[2] ?? "/"] as const),
);

export function legacyRedirectFor(pathname: string): string | null {
  const normalized = normalize(pathname).toLowerCase();
  const explicit = LEGACY_REDIRECTS.get(normalized);
  if (explicit) return explicit;
  // Preserva páginas legadas reais e aceita apenas slugs canônicos conhecidos.
  if (!/^\/[a-z0-9-]+$/.test(normalized) || !canonicalProblemSlugs.has(normalized.slice(1)) || isLegacyPath(normalized)) return null;
  return `/problemas${normalized}`;
}

export { normalize as normalizeLegacyPath };
