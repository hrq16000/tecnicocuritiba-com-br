// @ts-nocheck — legacy file silenced during TanStack migration (see .lovable/migrate-to-tanstack/tsc-silenced.json)
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
  let removed = 0;
  const scripts = Array.from(doc.querySelectorAll<HTMLScriptElement>('script[type="application/ld+json"]'));

  // key -> scripts candidatos
  const buckets = new Map<string, HTMLScriptElement[]>();

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
    const list = buckets.get(key);
    if (list) list.push(script);
    else buckets.set(key, [script]);
  }

  for (const list of buckets.values()) {
    if (list.length < 2) continue;
    // Schemas marcados como locais (FAQ do bairro/cidade, LocalBusiness da página)
    // têm prioridade sobre o schema genérico do site.
    const local = list.find((s) => s.dataset.jsonldScope === "local");
    const keep = local ?? list[0];
    for (const s of list) {
      if (s === keep) continue;
      // Só mexe em nós já hidratados pelo React; antes disso, alterar o nó
      // causa erro de hidratação. Uma passada posterior os alcança.
      if (!Object.keys(s).some((k) => k.startsWith("__reactFiber"))) continue;
      // Desativa em vez de remover: o nó pertence ao React e removê-lo antes
      // da hidratação quebra a página inteira (erro de hidratação).
      s.type = "application/x-jsonld-dedup";
      removed++;
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
    const late = window.setTimeout(run, 4000);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(timer);
      window.clearTimeout(late);
    };
  }, [location.pathname]);

  return null;
};

export default SchemaDedup;
