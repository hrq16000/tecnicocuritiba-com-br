/**
 * Pós-deploy: reenvia todos os sitemaps ao Search Console, dispara IndexNow
 * e roda o monitor de canônicos. Chamado pelo CI e pelo botão do painel.
 */
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { createClient } from "npm:@supabase/supabase-js@2";
import { enviarSlack, slackConfigurado } from "../_shared/seo-notify.ts";
import { gscConfigurado, reenviarSitemap, resolverPropriedade } from "../_shared/gsc.ts";

const SITE = "https://tecnicocuritiba.com.br";
const PAINEL = `${SITE}/admin/seo`;

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

async function sitemapsDoIndex(): Promise<string[]> {
  const res = await fetch(`${SITE}/sitemap-index.xml`);
  if (!res.ok) throw new Error(`sitemap-index ${res.status}`);
  const xml = await res.text();
  const filhos = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
  return [`${SITE}/sitemap-index.xml`, ...filhos.filter((l) => l.endsWith(".xml"))];
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

  const resultados: { sitemap: string; ok: boolean; erro?: string }[] = [];
  try {
    const lista = await sitemapsDoIndex();

    if (gscConfigurado()) {
      const prop = await resolverPropriedade(SITE);
      if (prop.status === "selected") {
        for (const sm of lista) {
          try {
            await reenviarSitemap(prop.siteUrl, sm);
            resultados.push({ sitemap: sm, ok: true });
          } catch (e) {
            resultados.push({ sitemap: sm, ok: false, erro: (e as Error).message.slice(0, 200) });
          }
        }
      } else {
        resultados.push({ sitemap: "*", ok: false, erro: `propriedade: ${prop.status}` });
      }
    } else {
      resultados.push({ sitemap: "*", ok: false, erro: "gsc_nao_configurado" });
    }

    // dispara o monitor de canônicos/erros logo após o deploy
    let monitor: unknown = null;
    try {
      const mr = await fetch(`${Deno.env.get("SUPABASE_URL")}/functions/v1/seo-monitor`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")}`,
        },
        body: JSON.stringify({ origem: "deploy" }),
      });
      monitor = await mr.json();
    } catch (e) {
      monitor = { ok: false, error: (e as Error).message };
    }

    const falhas = resultados.filter((r) => !r.ok);
    await supabase.from("seo_alertas").insert({
      tipo: "deploy",
      severidade: falhas.length ? "alerta" : "ok",
      titulo: falhas.length
        ? `Deploy: ${falhas.length} sitemap(s) não reenviado(s)`
        : `Deploy: ${resultados.length} sitemap(s) reenviado(s) ao Search Console`,
      detalhe: resultados.map((r) => `${r.ok ? "OK" : "FALHA"} — ${r.sitemap}${r.erro ? ` (${r.erro})` : ""}`).join("\n"),
      enviado_slack: false,
    });

    if (slackConfigurado()) {
      await enviarSlack({
        severidade: falhas.length ? "alerta" : "ok",
        titulo: falhas.length ? "Deploy concluído com pendências de sitemap" : "Deploy: sitemaps reenviados",
        detalhe: `${resultados.filter((r) => r.ok).length}/${resultados.length} sitemaps aceitos pelo Search Console.`,
        linhas: falhas.map((f) => `${f.sitemap} — ${f.erro}`),
        url: PAINEL,
      });
    }

    return json({ ok: true, sitemaps: resultados, monitor });
  } catch (e) {
    console.error("seo-deploy-hook falhou", e);
    return json({ ok: false, error: (e as Error).message, sitemaps: resultados }, 500);
  }
});
