import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

/** Lead da triagem — projeção segura, SEM telefone/e-mail (não coletados). */
export interface FunnelLead {
  id: string;
  created_at: string;
  equipamento: string | null;
  marca: string | null;
  sintoma: string | null;
  requires_coleta: boolean;
  cidade: string | null;
  bairro: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  status_atendimento: string | null;
  alert_status: "pending" | "sent" | "error";
  alert_attempts: number;
  alert_last_error: string | null;
  alert_sent_at: string | null;
}

export const listFunnelLeads = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data: isAdmin } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    if (!isAdmin) throw new Error("Forbidden");
    const { data, error } = await context.supabase
      .from("funnel_submissions")
      .select(
        "id, created_at, equipamento, marca, sintoma, requires_coleta, cidade, bairro, utm_source, utm_medium, utm_campaign, status_atendimento, alert_status, alert_attempts, alert_last_error, alert_sent_at",
      )
      .order("created_at", { ascending: false })
      .limit(100);
    if (error) throw new Error(error.message);
    return (data ?? []) as unknown as FunnelLead[];
  });

/** Reenvio manual do alerta CallMeBot para um lead com erro — admin apenas. */
export const retryAdminAlert = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data) => z.object({ submissionId: z.string().uuid() }).parse(data))
  .handler(async ({ data, context }) => {
    const { data: isAdmin } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    if (!isAdmin) throw new Error("Forbidden");
    const { sendAdminAlert } = await import("./notifyAdmin.server");
    const result = await sendAdminAlert(data.submissionId);
    return { ok: result.ok, kind: result.kind, attempts: result.attempts };
  });
