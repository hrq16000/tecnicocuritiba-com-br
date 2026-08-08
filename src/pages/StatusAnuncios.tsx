import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { ADSENSE_CLIENT } from "@/lib/adsense";
import { getConsent, openConsentPreferences } from "@/lib/consent";

const PUBLISHER = "pub-3762170279587706";

type Check = { label: string; ok: boolean | null; detail: string };

/**
 * Painel público de status de publicidade (uso operacional/auditoria).
 * noindex: página utilitária, fora do sitemap — não compete por SEO.
 */
export default function StatusAnuncios() {
  const [checks, setChecks] = useState<Check[]>([]);
  const [checkedAt, setCheckedAt] = useState("");

  useEffect(() => {
    const run = async () => {
      const result: Check[] = [];

      // 1. ads.txt publicado
      try {
        const res = await fetch("/ads.txt", { cache: "no-store" });
        const body = await res.text();
        const line = body
          .split("\n")
          .map((l) => l.trim())
          .find((l) => !l.startsWith("#") && l.includes(PUBLISHER));
        result.push({
          label: "ads.txt acessível com publisher correto",
          ok: res.ok && Boolean(line),
          detail: res.ok
            ? line || `HTTP 200, mas sem linha ativa para ${PUBLISHER}`
            : `HTTP ${res.status}`,
        });
      } catch (e) {
        result.push({ label: "ads.txt acessível", ok: false, detail: String(e) });
      }

      // 2. meta google-adsense-account
      const meta = document.querySelector<HTMLMetaElement>('meta[name="google-adsense-account"]');
      result.push({
        label: "Metatag google-adsense-account",
        ok: meta?.content === ADSENSE_CLIENT,
        detail: meta?.content ?? "ausente",
      });

      // 3. Consentimento armazenado (LGPD) — granular por categoria
      const consentState = getConsent();
      const adsGranted = consentState?.ads === true;
      result.push({
        label: "Consentimento de anúncios armazenado",
        ok: consentState === null ? null : adsGranted,
        detail: consentState === null
          ? "não decidido"
          : `anúncios: ${adsGranted ? "granted" : "denied"} · medição: ${consentState.analytics ? "granted" : "denied"}${consentState.decidedAt ? ` · em ${new Date(consentState.decidedAt).toLocaleString("pt-BR")}` : ""}`,
      });

      // 4. Script adsbygoogle só após aceite da categoria de anúncios
      const scriptLoaded = Boolean(document.getElementById("adsbygoogle-js"));
      result.push({
        label: "adsbygoogle carregado apenas com consentimento",
        ok: adsGranted ? scriptLoaded : !scriptLoaded,
        detail: scriptLoaded ? "script injetado" : "script não injetado",
      });

      // 5. Consent Mode v2 (estado default declarado no index.html)
      const dataLayer = (window as unknown as { dataLayer?: unknown[] }).dataLayer ?? [];
      const hasDefault = dataLayer.some(
        (e) => Array.isArray(e) && e[0] === "consent" && e[1] === "default",
      );
      result.push({
        label: "Consent Mode v2 com default 'denied' antes do aceite",
        ok: hasDefault || null,
        detail: hasDefault
          ? "comando consent default presente no dataLayer"
          : "dataLayer indisponível neste contexto (GA4 pode estar bloqueado)",
      });

      setChecks(result);
      setCheckedAt(new Date().toLocaleString("pt-BR"));
    };
    run();
  }, []);

  const badge = (ok: boolean | null) =>
    ok === null ? "—" : ok ? "OK" : "Atenção";

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Status de Anúncios e Transparência | Técnico em Curitiba</title>
        <meta
          name="description"
          content="Estado atual do ads.txt, da metatag do AdSense e do consentimento de publicidade deste portal."
        />
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <Header />

      <main id="main-content">
        <PageHero
          title="Status de Anúncios e Transparência"
          subtitle="Verificação em tempo real do ads.txt, da metatag do AdSense e do consentimento de publicidade do seu navegador."
        />

        <section className="container mx-auto max-w-3xl px-4 py-10">
          <div className="overflow-hidden rounded-xl border border-border/60">
            <table className="w-full text-left text-sm">
              <thead className="bg-muted/40">
                <tr>
                  <th className="p-3 font-semibold">Verificação</th>
                  <th className="p-3 font-semibold">Estado</th>
                  <th className="p-3 font-semibold">Detalhe</th>
                </tr>
              </thead>
              <tbody>
                {checks.length === 0 && (
                  <tr><td className="p-3 text-muted-foreground" colSpan={3}>Verificando…</td></tr>
                )}
                {checks.map((c) => (
                  <tr key={c.label} className="border-t border-border/60">
                    <td className="p-3">{c.label}</td>
                    <td className="p-3 font-semibold">{badge(c.ok)}</td>
                    <td className="p-3 break-all text-muted-foreground">{c.detail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {checkedAt && (
            <p className="mt-3 text-xs text-muted-foreground">Última verificação: {checkedAt}</p>
          )}

          <div className="mt-10 rounded-xl border border-border/60 bg-card/50 p-5">
            <h2 className="mb-2 text-lg font-bold">Documentos e arquivos públicos</h2>
            <ul className="list-disc space-y-1.5 pl-5 text-sm text-muted-foreground">
              <li><a href="/ads.txt" className="text-accent underline">ads.txt</a></li>
              <li><a href="/robots.txt" className="text-accent underline">robots.txt</a></li>
              <li><a href="/sitemap-index.xml" className="text-accent underline">sitemap-index.xml</a></li>
              <li><Link to="/politica-de-publicidade" className="text-accent underline">Política de Publicidade e Cookies de Anúncios</Link></li>
              <li><Link to="/politica-de-privacidade" className="text-accent underline">Política de Privacidade e LGPD</Link></li>
              <li><Link to="/exclusao-de-dados" className="text-accent underline">Exclusão de Dados (LGPD)</Link></li>
            </ul>
            <p className="mt-3 text-sm text-muted-foreground">
              Para alterar sua escolha de cookies, limpe os dados do site no navegador — o banner de
              consentimento será exibido novamente na próxima visita.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
