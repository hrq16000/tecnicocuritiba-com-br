/**
 * Aleatoriedade determinística para conteúdo renderizado no servidor.
 * `Math.random()` durante o render gera HTML diferente no servidor e no
 * navegador (erro de hidratação → página inteira re-renderizada, mais lenta).
 * Aqui a "sorte" deriva do endereço da página: varia entre páginas, mas é
 * idêntica no servidor e no navegador.
 */
import { useRouterState } from "@tanstack/react-router";

export function hashSeed(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function seededRng(seed: number): () => number {
  let a = seed || 1;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function seededShuffle<T>(arr: readonly T[], rng: () => number): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j] as T, a[i] as T];
  }
  return a;
}

/** Gerador estável por página (+ sal por componente). */
export function usePageRng(salt: string): () => number {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  if (salt === "blog") console.log("RNGSEED", pathname);
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  return seededRng(hashSeed(`${path.toLowerCase()}|${salt}`));
}
