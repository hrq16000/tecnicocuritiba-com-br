/**
 * Relatório mensal de SEO.
 * Roda automaticamente no dia 1 (cron) e sob demanda pelo painel.
 * Consolida performance do Search Console, snapshots e alertas do mês em
 * public.seo_relatorios — o PDF é montado no painel a partir desse resumo.
 */
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { createClient } from "npm:@supabase/supabase-js@2";
import { enviarSlack, slackConfigurado } from "../_shared/seo-notify.ts";
import { gscConfigurado, listarSitemaps, resolverPropriedade, searchAnalytics } from "../_shared/gsc.ts";

const SITE = "https://tecnicocuritiba.com.br";
const PAINEL = `${SITE}/admin/seo`;

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

const iso = (d: Date) => d.toISOString().slice(0, 10);

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

  let mesParam: string | null = null;
  try {
    const b = await req.json();
    if (typeof b?.mes === "string") mesParam = b.mes;
  } catch { /* sem corpo */ }

  try {
    const hoje = new Date();
    const ref = mesParam
      ? new Date(`${mesParam.slice(0, 7)}-01T00:00:00Z`)
      : new Date(Date.UTC(hoje.getUTCFullYear(), hoje.getUTCMonth() - 1, 1));
    const inicio = new Date(Date.UTC(ref.getUTCFullYear(), ref.getUTCMonth(), 1));
    const fim = new Date(Date.UTC(ref.getUTCFullYear(), ref.getUTCMonth() + 1, 0));
    const mes = iso(inicio);

    // ---- Search Console
    let performance: Record<string, unknown> = { disponivel: false };
    if (gscConfigurado()) {
      try {
        const prop = await resolverPropriedade(SITE);
        if (prop.status === "selected") {
          const base = { startDate: iso(inicio), endDate: iso(fim) };
          const [total, paginas, consultas, sm] = await Promise.all([
            searchAnalytics(prop.siteUrl, { ...base, dimensions: ["date"], rowLimit: 90 }),
            searchAnalytics(prop.siteUrl, { ...base, dimensions: ["page"], rowLimit: 25 }),
            searchAnalytics(prop.siteUrl, { ...base, dimensions: ["query"], rowLimit: 25 }),
            listarSitemaps(prop.siteUrl),
          ]);
          type Row = { keys: string[]; clicks: number; impressions: number; ctr: number; position: number };
          const linhas = (total.rows ?? []) as Row[];
          const cliques = linhas.reduce((s, r) => s + r.clicks, 0);
          const impressoes = linhas.reduce((s, r) => s + r.impressions, 0);
          performance = {
            disponivel: true,
            propriedade: prop.siteUrl,
            cliques,
            impressoes,
            ctr: impressoes ? cliques / impressoes : 0,
            posicao_media: linhas.length ? linhas.reduce((s, r) => s + r.position, 0) / linhas.length : 0,
            serie: linhas.map((r) => ({ data: r.keys[0], cliques: r.clicks, impressoes: r.impressions })),
            top_paginas: ((paginas.rows ?? []) as Row[]).map((r) => ({
              url: r.keys[0], cliques: r.clicks, impressoes: r.impressions, posicao: Number(r.position.toFixed(1)),
            })),
            top_consultas: ((consultas.rows ?? []) as Row[]).map((r) => ({
              termo: r.keys[0], cliques: r.clicks, impressoes: r.impressions, posicao: Number(r.position.toFixed(1)),
            })),
            sitemaps: (sm.sitemap ?? []).map((s) => ({
              path: s.path,
              submetidas: Number(s.contents?.[0]?.submitted ?? 0),
              indexadas: Number(s.contents?.[0]?.indexed ?? 0),
              erros: Number(s.errors ?? 0),
            })),
          };
        }
      } catch (e) {
        performance = { disponivel: false, motivo: (e as Error).message.slice(0, 200) };
      }
    }

    // ---- snapshots e alertas do mês
    const desde = inicio.toISOString();
    const ate = new Date(fim.getTime() + 86400000).toISOString();

    const [{ data: snaps }, { data: alertas }] = await Promise.all([
      supabase
        .from("seo_snapshots")
        .select("criado_em,sitemap_total,total_erros,sitemap_adicionadas,sitemap_removidas,origem")
        .gte("criado_em", desde).lt("criado_em", ate)
        .order("criado_em", { ascending: true }),
      supabase
        .from("seo_alertas")
        .select("tipo,severidade,titulo,criado_em,resolvido_em")
        .gte("criado_em", desde).lt("criado_em", ate)
        .order("criado_em", { ascending: true }),
    ]);

    const lista = snaps ?? [];
    const alrt = alertas ?? [];
    const primeiro = lista[0];
    const ultimo = lista[lista.length - 1];

    const resumo = {
      periodo: { inicio: iso(inicio), fim: iso(fim) },
      performance,
      sitemap: {
        urls_inicio: primeiro?.sitemap_total ?? 0,
        urls_fim: ultimo?.sitemap_total ?? 0,
        adicionadas: lista.reduce((s, r) => s + ((r.sitemap_adicionadas as unknown[])?.length ?? 0), 0),
        removidas: lista.reduce((s, r) => s + ((r.sitemap_removidas as unknown[])?.length ?? 0), 0),
      },
      verificacoes: {
        total: lista.length,
        deploys: lista.filter((r) => r.origem === "deploy").length,
        erros_max: lista.reduce((m, r) => Math.max(m, r.total_erros), 0),
        erros_final: ultimo?.total_erros ?? 0,
        serie_erros: lista.map((r) => ({ data: (r.criado_em as string).slice(0, 10), erros: r.total_erros })),
      },
      alertas: {
        total: alrt.length,
        criticos: alrt.filter((a) => a.severidade === "critico").length,
        resolvidos: alrt.filter((a) => a.resolvido_em).length,
        por_tipo: Object.entries(
          alrt.reduce<Record<string, number>>((acc, a) => {
            acc[a.tipo] = (acc[a.tipo] ?? 0) + 1;
            return acc;
          }, {}),
        ).map(([tipo, qtd]) => ({ tipo, qtd })),
        itens_corrigidos: alrt.filter((a) => a.resolvido_em).map((a) => a.titulo).slice(0, 40),
      },
    };

    const { data: row, error } = await supabase
      .from("seo_relatorios")
      .upsert({ mes, resumo, gerado_em: new Date().toISOString() }, { onConflict: "mes" })
      .select("id,mes")
      .maybeSingle();
    if (error) throw new Error(error.message);

    if (slackConfigurado()) {
      const p = performance as { disponivel?: boolean; cliques?: number; impressoes?: number };
      await enviarSlack({
        severidade: "ok",
        titulo: `Relatório mensal de SEO — ${mes.slice(0, 7)}`,
        detalhe: p.disponivel
          ? `${p.cliques} cliques e ${p.impressoes} impressões. ${resumo.alertas.total} alerta(s), ${resumo.alertas.criticos} crítico(s).`
          : `Search Console indisponível. ${resumo.alertas.total} alerta(s) no período.`,
        linhas: [`Sitemap: ${resumo.sitemap.urls_fim} URLs`, `Verificações: ${resumo.verificacoes.total}`],
        url: PAINEL,
      });
    }

    return json({ ok: true, relatorio: row, mes });
  } catch (e) {
    console.error("seo-monthly-report falhou", e);
    return json({ ok: false, error: (e as Error).message }, 500);
  }
});
