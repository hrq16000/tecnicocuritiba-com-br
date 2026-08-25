// @ts-nocheck — legacy file silenced during TanStack migration (see .lovable/migrate-to-tanstack/tsc-silenced.json)
/**
 * Contexto silencioso do lead para a mensagem de WhatsApp.
 *
 * Captura, sem pedir nada ao usuário:
 * - cidade/bairro (IP via geoCity — só quando é cidade atendida)
 * - página de origem (path + título)
 * - origem de tráfego (UTMs) e termo de busca quando disponível
 *
 * Regra de ouro: melhor omitir do que informar errado. Cada linha só entra
 * quando o dado existe de fato.
 */

import { getGeoState, startGeoDetection } from "./geoCity";
import { readUtms } from "./utmCapture";

/** Extrai o termo de busca de um referrer de buscador, quando exposto. */
function searchTermFromReferrer(referrer: string): string | null {
  if (!referrer) return null;
  try {
    const u = new URL(referrer);
    if (u.hostname === window.location.hostname) return null;
    const q = u.searchParams.get("q") || u.searchParams.get("query") || u.searchParams.get("p");
    return q ? q.slice(0, 80) : null;
  } catch {
    return null;
  }
}

function referrerLabel(referrer: string): string | null {
  if (!referrer) return null;
  try {
    const u = new URL(referrer);
    if (u.hostname === window.location.hostname) return null;
    return u.hostname.replace(/^www\./, "");
  } catch {
    return null;
  }
}

export interface LeadContext {
  city: string | null;
  neighborhood: string | null;
  path: string;
  pageTitle: string;
  utmSource?: string;
  utmCampaign?: string;
  searchTerm: string | null;
  referrer: string | null;
}

export function getLeadContext(): LeadContext {
  if (typeof window === "undefined") {
    return {
      city: null, neighborhood: null, path: "/", pageTitle: "",
      searchTerm: null, referrer: null,
    };
  }
  // Idempotente: garante detecção mesmo em páginas que não usam o hook.
  try { startGeoDetection(); } catch { /* noop */ }
  const geo = getGeoState();
  const utms = readUtms();
  const ref = document.referrer || "";
  return {
    city: geo.status === "unknown" ? null : geo.city,
    neighborhood: geo.neighborhood,
    path: window.location.pathname,
    pageTitle: (document.title || "").split("|")[0].trim().slice(0, 70),
    utmSource: utms.utm_source,
    utmCampaign: utms.utm_campaign,
    searchTerm: utms.utm_term ? utms.utm_term.slice(0, 80) : searchTermFromReferrer(ref),
    referrer: referrerLabel(ref),
  };
}

/**
 * Linhas prontas para anexar à mensagem do WhatsApp (vazio se nada útil).
 * `omitRegion`: quando o usuário já informou o bairro manualmente no funil,
 * a região inferida por IP é omitida — dado explícito sempre prevalece.
 */
export function buildLeadContextLines(opts?: { omitRegion?: boolean }): string[] {
  const c = getLeadContext();
  const lines: string[] = [];

  if (!opts?.omitRegion) {
    const local = [c.neighborhood, c.city].filter(Boolean).join(" · ");
    if (local) lines.push(`• Região aproximada: ${local}`);
  }
  if (c.pageTitle) lines.push(`• Página: ${c.pageTitle} (${c.path})`);
  else lines.push(`• Página: ${c.path}`);
  if (c.searchTerm) lines.push(`• Busca: "${c.searchTerm}"`);
  if (c.utmSource || c.referrer) lines.push(`• Origem: ${c.utmSource || c.referrer}`);
  if (c.utmCampaign) lines.push(`• Campanha: ${c.utmCampaign}`);

  if (!lines.length) return [];
  return ["", "📍 *Contexto do atendimento:*", ...lines];
}
