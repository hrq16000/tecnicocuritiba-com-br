/**
 * Monitor de SEO — roda no cron diário, no deploy e sob demanda pelo painel.
 *
 * 1. Lê todos os sitemaps de produção
 * 2. Checa status HTTP de todas as URLs (404/5xx/redirect)
 * 3. Valida canônico em uma amostra rotativa
 * 4. Compara com o snapshot anterior (URLs adicionadas/removidas)
 * 5. Puxa métricas e cobertura do Search Console
 * 6. Grava snapshot + alertas e dispara Slack
 */
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { createClient } from "npm:@supabase/supabase-js@2";
import { enviarSlack, slackConfigurado, type Severidade } from "../_shared/seo-notify.ts";
import { gscConfigurado, listarSitemaps, resolverPropriedade, searchAnalytics } from "../_shared/gsc.ts";

const SITE = "https://tecnicocuritiba.com.br";
const PAINEL = `${SITE}/admin/seo`;
const SITEMAP_INDEX = `${SITE}/sitemap-index.xml`;
const AMOSTRA_CANONICO = 40;
const CONCORRENCIA = 20;

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

interface Erro {
  tipo: "404" | "5xx" | "redirect" | "canonical" | "noindex" | "rede";
  url: string;
  detalhe: string;
}

async function pool<T>(itens: T[], limite: number, fn: (item: T) => Promise<void>) {
  let i = 0;
  await Promise.all(
    Array.from({ length: Math.min(limite, itens.length) }, async () => {
      while (i < itens.length) await fn(itens[i++]);
    }),
  );
}

const locs = (xml: string) =>
  [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());

async function coletarUrls(): Promise<{ sitemaps: string[]; urls: string[] }> {
  const res = await fetch(SITEMAP_INDEX, { headers: { "user-agent": "seo-monitor/2.0" } });
  if (!res.ok) throw new Error(`sitemap-index ${res.status}`);
  const sitemaps = locs(await res.text());
  const set = new Set<string>();
  for (const sm of sitemaps) {
    try {
      const r = await fetch(sm);
      if (!r.ok) continue;
      for (const loc of locs(await r.text())) {
        if (!/sitemap[\w-]*\.xml$/.test(loc)) set.add(loc);
      }
    } catch (e) {
      console.error(`falha lendo ${sm}`, e);
    }
  }
  return { sitemaps, urls: [...set].sort() };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const inicio = Date.now();
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

  let origem = "cron";
  try {
    const body = await req.json();
    if (typeof body?.origem === "string") origem = body.origem.slice(0, 20);
  } catch {
    // sem corpo — mantém cron
  }

  try {
    const { sitemaps, urls } = await coletarUrls();
    const erros: Erro[] = [];

    // amostra rotativa determinística por dia, para variar as páginas checadas a fundo
    const dia = Math.floor(Date.now() / 86400000);
    const offset = urls.length ? (dia * AMOSTRA_CANONICO) % urls.length : 0;
    const amostra = new Set(
      Array.from({ length: Math.min(AMOSTRA_CANONICO, urls.length) }, (_, k) => urls[(offset + k) % urls.length]),
    );

    await pool(urls, CONCORRENCIA, async (url) => {
      const profundo = amostra.has(url);
      try {
        const res = await fetch(url, {
          method: profundo ? "GET" : "HEAD",
          redirect: "manual",
          headers: { "user-agent": "seo-monitor/2.0" },
        });
        if (res.status >= 300 && res.status < 400) {
          erros.push({ tipo: "redirect", url, detalhe: `${res.status} → ${res.headers.get("location")}` });
          return;
        }
        if (res.status === 404) {
          erros.push({ tipo: "404", url, detalhe: "não encontrada" });
          return;
        }
        if (res.status >= 500) {
          erros.push({ tipo: "5xx", url, detalhe: `status ${res.status}` });
          return;
        }
        if (!profundo || !res.ok) return;

        const html = await res.text();
        const robots = html.match(/<meta[^>]+name=["']robots["'][^>]*content=["']([^"']+)["']/i)?.[1] ?? "";
        if (/noindex/i.test(robots)) {
          erros.push({ tipo: "noindex", url, detalhe: `robots="${robots}"` });
        }
        const canonical = html.match(/<link[^>]+rel=["']canonical["'][^>]*href=["']([^"']+)["']/i)?.[1];
        const norm = (u: string) => u.replace(/\/+$/, "");
        if (canonical && norm(canonical) !== norm(url)) {
          erros.push({ tipo: "canonical", url, detalhe: `aponta para ${canonical}` });
        }
      } catch (e) {
        erros.push({ tipo: "rede", url, detalhe: (e as Error).message });
      }
    });

    // diff com o snapshot anterior
    const { data: anterior } = await supabase
      .from("seo_snapshots")
      .select("id,sitemap_total,gsc,criado_em,cobertura")
      .order("criado_em", { ascending: false })
      .limit(1)
      .maybeSingle();

    const { data: anteriorUrls } = await supabase
      .from("seo_snapshots")
      .select("cobertura")
      .order("criado_em", { ascending: false })
      .limit(1)
      .maybeSingle();

    const listaAnterior: string[] = (anteriorUrls?.cobertura as { urls?: string[] })?.urls ?? [];
    const setAnterior = new Set(listaAnterior);
    const setAtual = new Set(urls);
    const adicionadas = listaAnterior.length ? urls.filter((u) => !setAnterior.has(u)) : [];
    const removidas = listaAnterior.filter((u) => !setAtual.has(u));

    // Search Console
    let gsc: Record<string, unknown> = { disponivel: false };
    if (gscConfigurado()) {
      try {
        const prop = await resolverPropriedade(SITE);
        if (prop.status === "selected") {
          const fim = new Date(Date.now() - 3 * 86400000).toISOString().slice(0, 10);
          const ini = new Date(Date.now() - 31 * 86400000).toISOString().slice(0, 10);
          const [perf, sm] = await Promise.all([
            searchAnalytics(prop.siteUrl, { startDate: ini, endDate: fim, dimensions: ["date"], rowLimit: 60 }),
            listarSitemaps(prop.siteUrl),
          ]);
          const linhas = (perf.rows ?? []) as { keys: string[]; clicks: number; impressions: number; ctr: number; position: number }[];
          const cliques = linhas.reduce((s, r) => s + r.clicks, 0);
          const impressoes = linhas.reduce((s, r) => s + r.impressions, 0);
          gsc = {
            disponivel: true,
            propriedade: prop.siteUrl,
            periodo: { inicio: ini, fim },
            cliques,
            impressoes,
            ctr: impressoes ? cliques / impressoes : 0,
            posicao_media: linhas.length ? linhas.reduce((s, r) => s + r.position, 0) / linhas.length : 0,
            serie: linhas.map((r) => ({
              data: r.keys[0],
              cliques: r.clicks,
              impressoes: r.impressions,
              posicao: Number(r.position.toFixed(1)),
            })),
            sitemaps: (sm.sitemap ?? []).map((s) => ({
              path: s.path,
              enviado: s.lastSubmitted ?? null,
              baixado: s.lastDownloaded ?? null,
              erros: Number(s.errors ?? 0),
              avisos: Number(s.warnings ?? 0),
              submetidas: Number(s.contents?.[0]?.submitted ?? 0),
              indexadas: Number(s.contents?.[0]?.indexed ?? 0),
            })),
          };
        } else {
          gsc = { disponivel: false, motivo: prop.status };
        }
      } catch (e) {
        console.error("GSC falhou", e);
        gsc = { disponivel: false, motivo: (e as Error).message.slice(0, 200) };
      }
    }

    // grava snapshot (a lista completa de URLs vive em cobertura.urls)
    const { data: snap } = await supabase
      .from("seo_snapshots")
      .insert({
        origem,
        sitemap_total: urls.length,
        sitemap_adicionadas: adicionadas.slice(0, 200),
        sitemap_removidas: removidas.slice(0, 200),
        erros: erros.slice(0, 300),
        total_erros: erros.length,
        gsc,
        cobertura: { urls, sitemaps, amostra_canonico: amostra.size },
        duracao_ms: Date.now() - inicio,
      })
      .select("id")
      .maybeSingle();

    // ---- alertas
    const alertas: { tipo: string; severidade: Severidade; titulo: string; detalhe: string; linhas: string[] }[] = [];
    const porTipo = (t: Erro["tipo"]) => erros.filter((e) => e.tipo === t);

    const quebradas = [...porTipo("404"), ...porTipo("5xx"), ...porTipo("rede")];
    if (quebradas.length) {
      alertas.push({
        tipo: "erros_http",
        severidade: "critico",
        titulo: `${quebradas.length} URL(s) do sitemap com erro HTTP`,
        detalhe: "Páginas listadas no sitemap retornaram 404, 5xx ou falha de rede.",
        linhas: quebradas.map((e) => `${e.tipo.toUpperCase()} — ${e.url}`),
      });
    }
    const redirects = porTipo("redirect");
    if (redirects.length) {
      alertas.push({
        tipo: "redirects",
        severidade: "alerta",
        titulo: `${redirects.length} URL(s) do sitemap redirecionando`,
        detalhe: "O sitemap deve conter apenas a URL final.",
        linhas: redirects.map((e) => `${e.url} → ${e.detalhe}`),
      });
    }
    const canonicos = [...porTipo("canonical"), ...porTipo("noindex")];
    if (canonicos.length) {
      alertas.push({
        tipo: "canonico",
        severidade: "critico",
        titulo: `${canonicos.length} problema(s) de canônico/noindex`,
        detalhe: "URL do sitemap com canônico divergente ou marcada como noindex.",
        linhas: canonicos.map((e) => `${e.url} — ${e.detalhe}`),
      });
    }
    if (removidas.length) {
      alertas.push({
        tipo: "sitemap_removidas",
        severidade: "alerta",
        titulo: `${removidas.length} URL(s) sumiram do sitemap`,
        detalhe: "Confirme se há redirect 301 para essas rotas.",
        linhas: removidas,
      });
    }
    if (adicionadas.length) {
      alertas.push({
        tipo: "sitemap_novas",
        severidade: "aviso",
        titulo: `${adicionadas.length} URL(s) nova(s) no sitemap`,
        detalhe: "Novas páginas publicadas.",
        linhas: adicionadas,
      });
    }

    // queda de indexação vs snapshot anterior
    const idxAtual = ((gsc as { sitemaps?: { indexadas: number }[] }).sitemaps ?? []).reduce((s, x) => s + x.indexadas, 0);
    const idxAnterior = (((anterior?.gsc ?? {}) as { sitemaps?: { indexadas: number }[] }).sitemaps ?? []).reduce(
      (s, x) => s + x.indexadas,
      0,
    );
    if (idxAnterior > 0 && idxAtual > 0 && idxAtual < idxAnterior * 0.95) {
      alertas.push({
        tipo: "queda_indexacao",
        severidade: "critico",
        titulo: `Queda de indexação: ${idxAnterior} → ${idxAtual}`,
        detalhe: `Redução de ${(100 - (idxAtual / idxAnterior) * 100).toFixed(1)}% nas páginas indexadas reportadas pelo Search Console.`,
        linhas: [],
      });
    }

    let enviadosSlack = 0;
    for (const a of alertas) {
      let ok = false;
      if (slackConfigurado() && a.severidade !== "aviso") {
        const r = await enviarSlack({
          severidade: a.severidade,
          titulo: a.titulo,
          detalhe: a.detalhe,
          linhas: a.linhas,
          url: PAINEL,
        });
        ok = r.ok;
        if (ok) enviadosSlack++;
      }
      await supabase.from("seo_alertas").insert({
        tipo: a.tipo,
        severidade: a.severidade,
        titulo: a.titulo,
        detalhe: [a.detalhe, ...a.linhas.slice(0, 20)].filter(Boolean).join("\n"),
        enviado_slack: ok,
      });
    }

    return json({
      ok: true,
      snapshot_id: snap?.id ?? null,
      origem,
      urls: urls.length,
      erros: erros.length,
      adicionadas: adicionadas.length,
      removidas: removidas.length,
      alertas: alertas.length,
      slack_enviados: enviadosSlack,
      slack_configurado: slackConfigurado(),
      duracao_ms: Date.now() - inicio,
    });
  } catch (e) {
    console.error("seo-monitor falhou", e);
    return json({ ok: false, error: (e as Error).message }, 500);
  }
});
