/**
 * Helpers do Google Search Console via connector gateway da Lovable.
 * Resolve a propriedade verificada em runtime (nunca hardcoded).
 */

const GATEWAY = "https://connector-gateway.lovable.dev/google_search_console";

function headers() {
  const lovableKey = Deno.env.get("LOVABLE_API_KEY");
  const gscKey = Deno.env.get("GOOGLE_SEARCH_CONSOLE_API_KEY");
  if (!lovableKey || !gscKey) throw new Error("Credenciais do Search Console ausentes");
  return { Authorization: `Bearer ${lovableKey}`, "X-Connection-Api-Key": gscKey };
}

export function gscConfigurado(): boolean {
  return Boolean(Deno.env.get("LOVABLE_API_KEY") && Deno.env.get("GOOGLE_SEARCH_CONSOLE_API_KEY"));
}

function cobre(siteUrl: string, alvo: URL): boolean {
  if (siteUrl.startsWith("sc-domain:")) {
    const dominio = siteUrl.slice("sc-domain:".length).toLowerCase();
    const host = alvo.hostname.toLowerCase();
    return host === dominio || host.endsWith(`.${dominio}`);
  }
  try {
    return alvo.href.startsWith(new URL(siteUrl).href);
  } catch {
    return false;
  }
}

export type Resolucao =
  | { status: "selected"; siteUrl: string }
  | { status: "selection_required"; candidatos: string[] }
  | { status: "none" };

export async function resolverPropriedade(alvoUrl: string, selecionada?: string): Promise<Resolucao> {
  const res = await fetch(`${GATEWAY}/webmasters/v3/sites`, { headers: headers() });
  if (!res.ok) throw new Error(`Falha ao listar propriedades [${res.status}]: ${await res.text()}`);
  const { siteEntry = [] } = (await res.json()) as {
    siteEntry?: { siteUrl: string; permissionLevel?: string }[];
  };
  const alvo = new URL(alvoUrl);
  const matches = siteEntry.filter(
    (e) => e.permissionLevel !== "siteUnverifiedUser" && cobre(e.siteUrl, alvo),
  );
  if (selecionada) {
    const hit = matches.find((m) => m.siteUrl === selecionada);
    if (hit) return { status: "selected", siteUrl: hit.siteUrl };
  }
  if (matches.length === 0) return { status: "none" };
  if (matches.length === 1) return { status: "selected", siteUrl: matches[0].siteUrl };
  return { status: "selection_required", candidatos: matches.map((m) => m.siteUrl) };
}

export async function searchAnalytics(siteUrl: string, corpo: Record<string, unknown>) {
  const res = await fetch(
    `${GATEWAY}/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`,
    { method: "POST", headers: { ...headers(), "Content-Type": "application/json" }, body: JSON.stringify(corpo) },
  );
  if (!res.ok) throw new Error(`searchAnalytics [${res.status}]: ${await res.text()}`);
  return res.json();
}

export async function listarSitemaps(siteUrl: string) {
  const res = await fetch(
    `${GATEWAY}/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/sitemaps`,
    { headers: headers() },
  );
  if (!res.ok) throw new Error(`sitemaps.list [${res.status}]: ${await res.text()}`);
  return res.json() as Promise<{
    sitemap?: {
      path: string;
      lastSubmitted?: string;
      lastDownloaded?: string;
      isPending?: boolean;
      errors?: string;
      warnings?: string;
      contents?: { type: string; submitted: string; indexed?: string }[];
    }[];
  }>;
}

export async function reenviarSitemap(siteUrl: string, sitemapUrl: string) {
  const res = await fetch(
    `${GATEWAY}/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/sitemaps/${encodeURIComponent(sitemapUrl)}`,
    { method: "PUT", headers: headers() },
  );
  if (!res.ok) throw new Error(`sitemaps.submit [${res.status}]: ${await res.text()}`);
  return true;
}

export async function inspecionarUrl(siteUrl: string, inspectionUrl: string) {
  const res = await fetch(`https://connector-gateway.lovable.dev/google_search_console/v1/urlInspection/index:inspect`, {
    method: "POST",
    headers: { ...headers(), "Content-Type": "application/json" },
    body: JSON.stringify({ inspectionUrl, siteUrl }),
  });
  if (!res.ok) throw new Error(`urlInspection [${res.status}]: ${await res.text()}`);
  return res.json();
}
