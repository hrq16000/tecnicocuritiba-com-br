import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Deduplicação de JSON-LD pós-hidratação.
 *
 * Componentes distintos (Breadcrumbs, PageSEO, JsonLdSchema, schemas de página)
 * podem emitir BreadcrumbList/LocalBusiness/Organization repetidos na mesma rota.
 * Aqui mantemos apenas a PRIMEIRA ocorrência de cada tipo sensível — nenhum
 * schema necessário é removido, apenas cópias redundantes do mesmo @type.
 */

const DEDUP_TYPES = new Set(["BreadcrumbList", "LocalBusiness", "Organization", "WebSite", "FAQPage"]);

const typesOf = (node: unknown): string[] => {
  if (!node || typeof node !== "object") return [];
  const t = (node as Record<string, unknown>)["@type"];
  if (typeof t === "string") return [t];
  if (Array.isArray(t)) return t.filter((x): x is string => typeof x === "string");
  return [];
};

export function dedupeJsonLd(doc: Document = document): number {
  const seen = new Set<string>();
  let removed = 0;
  const scripts = Array.from(doc.querySelectorAll<HTMLScriptElement>('script[type="application/ld+json"]'));

  for (const script of scripts) {
    let parsed: unknown;
    try {
      parsed = JSON.parse(script.textContent || "");
    } catch {
      continue;
    }
    const nodes = Array.isArray(parsed) ? parsed : [parsed];
    const graphNodes = nodes.flatMap((n) => {
      const graph = (n as Record<string, unknown>)?.["@graph"];
      return Array.isArray(graph) ? graph : [n];
    });

    const scriptTypes = graphNodes.flatMap(typesOf).filter((t) => DEDUP_TYPES.has(t));
    if (!scriptTypes.length) continue;

    // Chave = conjunto de tipos sensíveis do script (evita colidir com grafos mistos).
    const key = [...new Set(scriptTypes)].sort().join("|");
    if (seen.has(key)) {
      script.remove();
      removed++;
    } else {
      seen.add(key);
    }
  }
  return removed;
}

/** Roda a deduplicação a cada troca de rota, após a hidratação dos schemas. */
export const SchemaDedup = () => {
  const location = useLocation();

  useEffect(() => {
    const run = () => dedupeJsonLd();
    // Duas passadas: uma logo após o paint e outra depois dos efeitos assíncronos
    // (schemas injetados por import dinâmico).
    const raf = requestAnimationFrame(run);
    const timer = window.setTimeout(run, 1200);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(timer);
    };
  }, [location.pathname]);

  return null;
};

export default SchemaDedup;
