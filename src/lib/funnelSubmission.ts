// @ts-nocheck — legacy file silenced during TanStack migration (see .lovable/migrate-to-tanstack/tsc-silenced.json)
/** Gera um ID de sessão estável por aba do navegador. */
export function getSessionId(): string {
  try {
    let id = sessionStorage.getItem("funnel_session_id");
    if (!id) {
      id = `s_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
      sessionStorage.setItem("funnel_session_id", id);
    }
    return id;
  } catch {
    return `s_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
  }
}

export async function recordSubmission(payload: {
  sessionId: string;
  equipamento?: string;
  marca?: string;
  sintoma?: string;
  requiresColeta?: boolean;
  minimumAccepted?: boolean;
  ctaLocation?: string;
  waMessage: string;
}): Promise<void> {
  const sp = new URLSearchParams(typeof window !== "undefined" ? window.location.search : "");
  const utm = {
    utm_source: sp.get("utm_source") || undefined,
    utm_medium: sp.get("utm_medium") || undefined,
    utm_campaign: sp.get("utm_campaign") || undefined,
    utm_term: sp.get("utm_term") || undefined,
    utm_content: sp.get("utm_content") || undefined,
    gclid: sp.get("gclid") || undefined,
  };
  // ID gerado no cliente: permite disparar o alerta do admin logo após o
  // insert sem depender de RETURNING (anon não tem SELECT na tabela).
  const submissionId = crypto.randomUUID();

  // Localidade: bairro digitado manualmente no funil SEMPRE prevalece sobre a
  // geolocalização inferida por IP (dado explícito > dado presumido).
  let cidade: string | undefined;
  let bairroGeo: string | undefined;
  try {
    const { getGeoState } = await import("./geoCity");
    const geo = getGeoState();
    if (geo.status !== "unknown") cidade = geo.city || undefined;
    bairroGeo = geo.neighborhood || undefined;
  } catch { /* noop */ }
  let bairroManual: string | undefined;
  try {
    const stored = JSON.parse(localStorage.getItem("wa_funnel_state_v6") || "{}");
    bairroManual = stored?.answers?.bairroManual?.trim() || undefined;
  } catch { /* noop */ }

  let inserted = false;
  try {
    const { supabase } = await import("@/integrations/supabase/client");
    const { error } = await supabase.from("funnel_submissions").insert({
      id: submissionId,
      session_id: payload.sessionId,
      equipamento: payload.equipamento?.slice(0, 80),
      marca: payload.marca?.slice(0, 120),
      sintoma: payload.sintoma?.slice(0, 120),
      requires_coleta: !!payload.requiresColeta,
      media_paths: [],
      cidade: cidade?.slice(0, 80),
      bairro: (bairroManual || bairroGeo)?.slice(0, 120),
      wa_message: [
        payload.waMessage,
        `\n\n[tracking] cta_location=${payload.ctaLocation || "unknown"}; minimum_accepted=${payload.minimumAccepted ? "true" : "false"}`,
      ].join("").slice(0, 4000),
      ...utm,
    });
    inserted = !error;
    if (error) throw error;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn("[funnel] failed to record submission", err);
  }

  // Alerta do admin (CallMeBot) — fire-and-forget; nunca bloqueia a conversão.
  if (inserted) {
    try {
      const { notifyAdminLead } = await import("./notifyAdmin.functions");
      notifyAdminLead({ data: { submissionId } }).catch(() => {});
    } catch { /* noop */ }
  }
}
