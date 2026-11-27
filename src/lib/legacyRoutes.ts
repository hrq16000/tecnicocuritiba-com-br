/**
 * Lista de padrões de rota do LegacyApp, extraída do próprio código-fonte
 * (fonte única — sem duplicar centenas de rotas). Usada pela rota splat de
 * compatibilidade para decidir 200 vs 404 ainda no servidor.
 */
import legacySource from "@/LegacyApp.tsx?raw";
import { problemaSummaries } from "@/lib/problemaSummaries";

// Exactly the editorial catalog of 189 canonical problem routes.
const problemSlugs = new Set(problemaSummaries.map(({ slug }) => slug));
export const isKnownProblemSlug = (slug: string): boolean => problemSlugs.has(slug);

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
  const normalized = normalize(pathname);
  const problem = normalized.match(/^\/(?:problemas|procedimentos)\/([^/]+)$/);
  if (problem) return isKnownProblemSlug(problem[1] ?? "");
  return LEGACY_ROUTE_PATTERNS.some((p) => matchLegacyPattern(p, normalized) !== null);
}

/** Redirects estáticos do LegacyApp (<Route path=... element={<Navigate to=...}) → 301 no SSR. */
export const LEGACY_REDIRECTS: ReadonlyMap<string, string> = new Map(
  Array.from(
    legacySource.matchAll(/<Route\s+path="([^":*]+)"\s+element=\{<Navigate\s+to="([^"]+)"/g),
  ).map((m) => [normalize(m[1] ?? "").toLowerCase(), m[2] ?? "/"] as const),
);

// Aliases editoriais legados com destinos existentes e semanticamente equivalentes.
const EDITORIAL_ALIASES: ReadonlyMap<string, string> = new Map([
  ["/servicos/suporte-tecnico-empresarial", "/suporte-empresas"],
  ["/precos", "/precos-e-politicas"],
  ["/servico-bairro/conserto-notebook-batel", "/servicos/conserto-pc-notebook/batel"],
  ["/servico-bairro/conserto-notebook-cic", "/servicos/conserto-pc-notebook/cic"],
  ["/servico-bairro/conserto-notebook-portao", "/servicos/conserto-pc-notebook/portao"],
  ["/servico-bairro/formatacao-centro", "/servicos/formatacao-computador/centro"],
  ["/servico-bairro/formatacao-portao", "/servicos/formatacao-computador/portao"],
  ["/servico-bairro/remocao-virus-batel", "/servicos/remocao-virus/batel"],
  ["/coleta-entrega", "/coleta-e-entrega"],
  ["/redes-wifi", "/servicos/redes-wifi"],
  ["/computador-superaquecendo-curitiba", "/problemas/pc-superaquecendo-curitiba"],
  ["/remocao-virus-curitiba", "/servicos/remocao-virus"],
  ["/backup-recuperacao-curitiba", "/servicos/backup-recuperacao"],
  ["/upgrade-ssd-memoria-curitiba", "/servicos/upgrade-ssd-memoria"],
  ["/formatacao-computador", "/servicos/formatacao-computador"],
  ["/conserto-notebook-curitiba", "/servicos/conserto-notebook-curitiba"],
  ["/conserto-notebook", "/servicos/conserto-notebook-curitiba"],
  ["/conserto-pc-notebook", "/servicos/conserto-pc-notebook"],
  ["/conserto-pc-notebook-curitiba", "/servicos/conserto-pc-notebook"],
  ["/computador-desligando-sozinho-curitiba", "/problemas/pc-desligando-sozinho-curitiba"],
  ["/redes-wifi-curitiba", "/servicos/redes-wifi"],
  ["/remocao-virus-malware-curitiba", "/servicos/remocao-virus"],
  ["/servicos/upgrade-ssd-ram", "/servicos/upgrade-ssd-memoria"],

  ["/computador-lento", "/servicos/computador-lento"],
  ["/montagem-pc", "/servicos/montagem-pc"],
  ["/servicos/manutencao-de-computador", "/manutencao-notebook-pc-curitiba"],
  ["/tecnico-informatica-sao-jose-dos-pinhais", "/tecnico-informatica-sao-jose-pinhais"],
  ["/tela-azul-curitiba", "/problemas/tela-azul-windows-curitiba"],
  ["/tela-azul-bsod-curitiba", "/problemas/tela-azul-windows-curitiba"],
  ["/erro-tela-azul-curitiba", "/problemas/tela-azul-windows-curitiba"],
  ["/formatacao-computador-curitiba", "/servicos/formatacao-computador"],
  ["/virus-ransomware-curitiba", "/problemas/pc-com-virus-ransomware-curitiba"],
  ["/hd-com-defeito-curitiba", "/servicos/backup-recuperacao"],
]);

export function legacyRedirectFor(pathname: string): string | null {
  const path = normalize(pathname);
  const explicit = LEGACY_REDIRECTS.get(path.toLowerCase());
  if (explicit) return explicit;
  const alias = EDITORIAL_ALIASES.get(path);
  if (alias && !isLegacyPath(path)) return alias;
  // Compatibilidade com links e backlinks anteriores à migração: somente
  // slugs reconhecidos e sem suplantar uma rota explícita existente.
  const oldProblem = path.match(/^\/([^/]+)$/);
  if (oldProblem && isKnownProblemSlug(oldProblem[1] ?? "") && !isLegacyPath(path)) {
    return `/problemas/${oldProblem[1]}`;
  }
  return null;
}

export { normalize as normalizeLegacyPath };
