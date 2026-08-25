import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";

import { supabase } from "@/integrations/supabase/client";
import {
  listFunnelLeads,
  retryAdminAlert,
  type FunnelLead,
} from "@/lib/adminLeads.functions";

export const Route = createFileRoute("/_authenticated/admin/leads")({
  head: () => ({
    meta: [
      { title: "Leads da triagem — Admin" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminLeadsPage,
});

const ALERT_STATUS: Record<string, { label: string; cls: string }> = {
  pending: { label: "Pendente", cls: "bg-muted text-muted-foreground" },
  sent: { label: "Enviado", cls: "bg-primary/10 text-primary" },
  error: { label: "Erro", cls: "bg-destructive/10 text-destructive" },
};

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleString("pt-BR", {
    timeZone: "America/Sao_Paulo",
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

function LeadsSkeleton() {
  return (
    <div className="space-y-2" aria-label="Carregando leads">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="h-12 rounded-md bg-muted animate-pulse" />
      ))}
    </div>
  );
}

function LeadRow({ lead, onRetry, retrying }: {
  lead: FunnelLead;
  onRetry: (id: string) => void;
  retrying: boolean;
}) {
  const alert = ALERT_STATUS[lead.alert_status] ?? ALERT_STATUS["pending"];
  const origem = [lead.utm_source, lead.utm_campaign].filter(Boolean).join(" / ") || "—";
  const localidade = [lead.bairro, lead.cidade].filter(Boolean).join(" — ") || "—";
  return (
    <tr className="border-t border-border align-top">
      <td className="px-3 py-2 whitespace-nowrap text-muted-foreground">{fmtDate(lead.created_at)}</td>
      <td className="px-3 py-2">
        <div className="font-medium">{lead.equipamento || "—"}</div>
        {lead.marca && <div className="text-muted-foreground">{lead.marca}</div>}
      </td>
      <td className="px-3 py-2">{lead.sintoma || "—"}</td>
      <td className="px-3 py-2">
        {localidade}
        {lead.requires_coleta && (
          <span className="ml-2 inline-block rounded-full bg-accent px-2 py-0.5 text-[10px] font-medium text-accent-foreground">
            Coleta
          </span>
        )}
      </td>
      <td className="px-3 py-2 text-muted-foreground">{origem}</td>
      <td className="px-3 py-2">
        <span className={`inline-block rounded-full px-2 py-0.5 text-[11px] font-semibold ${alert!.cls}`}>
          {alert!.label}
        </span>
        {lead.alert_status === "error" && lead.alert_last_error && (
          <div className="mt-1 text-[10px] text-destructive/80">
            {lead.alert_last_error} · {lead.alert_attempts} tentativa(s)
          </div>
        )}
        {lead.alert_status === "sent" && lead.alert_sent_at && (
          <div className="mt-1 text-[10px] text-muted-foreground">{fmtDate(lead.alert_sent_at)}</div>
        )}
      </td>
      <td className="px-3 py-2">
        {lead.alert_status === "error" && (
          <button
            type="button"
            onClick={() => onRetry(lead.id)}
            disabled={retrying}
            className="rounded-md border border-border px-2 py-1 text-[11px] font-medium hover:bg-muted disabled:opacity-50"
          >
            {retrying ? "Reenviando…" : "Reenviar alerta"}
          </button>
        )}
      </td>
    </tr>
  );
}

function AdminLeadsPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const fetchLeads = useServerFn(listFunnelLeads);
  const retry = useServerFn(retryAdminAlert);
  const [retryingId, setRetryingId] = useState<string | null>(null);

  const { data, isLoading, error } = useQuery({
    queryKey: ["funnel-leads"],
    queryFn: () => fetchLeads(),
    refetchInterval: 30_000,
  });

  const handleRetry = async (id: string) => {
    setRetryingId(id);
    try {
      await retry({ data: { submissionId: id } });
    } finally {
      setRetryingId(null);
      void queryClient.invalidateQueries({ queryKey: ["funnel-leads"] });
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    void navigate({ to: "/auth" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border">
        <div className="container mx-auto flex items-center justify-between px-4 py-3">
          <div>
            <h1 className="text-lg font-bold">Leads da triagem</h1>
            {/* Privacidade: telefone/e-mail não são coletados nem exibidos. */}
            <p className="text-xs text-muted-foreground">
              Conversão do funil WhatsApp · sem dados de contato (PII) nesta visão
            </p>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-md border border-border px-3 py-1.5 text-xs font-medium hover:bg-muted"
          >
            Sair
          </button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {isLoading && <LeadsSkeleton />}

        {error && (
          <div role="alert" className="rounded-lg border border-destructive/40 bg-destructive/5 p-4 text-sm text-destructive">
            Não foi possível carregar os leads. Verifique se sua conta tem permissão de administrador.
          </div>
        )}

        {data && data.length === 0 && (
          <div className="rounded-lg border border-border bg-card p-8 text-center text-sm text-muted-foreground">
            Nenhum lead registrado ainda. Os envios da triagem aparecem aqui em tempo real.
          </div>
        )}

        {data && data.length > 0 && (
          <div className="overflow-x-auto rounded-lg border border-border bg-card">
            <table className="w-full text-xs">
              <thead>
                <tr className="text-left text-muted-foreground">
                  <th className="px-3 py-2 font-medium">Data</th>
                  <th className="px-3 py-2 font-medium">Serviço</th>
                  <th className="px-3 py-2 font-medium">Sintoma</th>
                  <th className="px-3 py-2 font-medium">Localidade</th>
                  <th className="px-3 py-2 font-medium">Origem</th>
                  <th className="px-3 py-2 font-medium">Alerta</th>
                  <th className="px-3 py-2 font-medium">Ações</th>
                </tr>
              </thead>
              <tbody>
                {data.map((lead) => (
                  <LeadRow
                    key={lead.id}
                    lead={lead}
                    onRetry={handleRetry}
                    retrying={retryingId === lead.id}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
