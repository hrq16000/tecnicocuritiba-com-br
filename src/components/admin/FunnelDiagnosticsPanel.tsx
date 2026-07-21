import { useEffect, useState } from "react";
import { readFunnelDiag, clearFunnelDiag, type FunnelDiagEvent } from "@/lib/funnelDiagnostics";
import { Button } from "@/components/ui/button";
import { RefreshCw, Trash2, Activity } from "lucide-react";
import { ErrorAlertsPanel } from "./ErrorAlertsPanel";

/**
 * Painel de diagnóstico local do funil.
 *
 * Lê o ring-buffer gravado por `logFunnelDiag` no `localStorage` do
 * navegador atual. Útil para o técnico reproduzir um clique em "Agendar
 * agora" e conferir a sequência exata (open → step → submit_start →
 * submit_ok / submit_exception) sem depender de GA4.
 */
export function FunnelDiagnosticsPanel() {
  const [events, setEvents] = useState<FunnelDiagEvent[]>([]);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    setEvents(readFunnelDiag());
    const id = window.setInterval(() => setEvents(readFunnelDiag()), 2000);
    return () => window.clearInterval(id);
  }, [tick]);

  const submitEvents = events.filter((e) => e.name.startsWith("submit"));
  const hasReset = events.some((e) => e.name === "reset");

  return (
    <>
    <ErrorAlertsPanel />
    <section className="mt-8 rounded-lg border border-border bg-card/40 p-4">
      <header className="flex items-center justify-between gap-2 mb-3">
        <div>
          <h2 className="text-sm font-bold flex items-center gap-2">
            <Activity className="h-4 w-4 text-primary" /> Diagnóstico local do funil
          </h2>
          <p className="text-[11px] text-muted-foreground">
            {events.length} eventos capturados neste navegador ·{" "}
            {submitEvents.length} relacionados a envio · reset local: {hasReset ? "sim" : "não"}
          </p>
        </div>
        <div className="flex gap-1">
          <Button size="sm" variant="outline" onClick={() => setTick((t) => t + 1)} className="gap-1">
            <RefreshCw className="h-3 w-3" /> Atualizar
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => { clearFunnelDiag(); setTick((t) => t + 1); }}
            className="gap-1"
          >
            <Trash2 className="h-3 w-3" /> Limpar
          </Button>
        </div>
      </header>

      {events.length === 0 ? (
        <p className="text-xs text-muted-foreground">
          Nenhum evento ainda. Abra o funil no site (mesmo navegador) e clique em "Agendar agora"
          para reproduzir. Recarregue e a lista aparecerá aqui.
        </p>
      ) : (
        <div className="max-h-72 overflow-y-auto rounded border border-border bg-background/70">
          <table className="w-full text-[11px]">
            <thead className="bg-muted sticky top-0">
              <tr>
                <th className="px-2 py-1 text-left">Hora</th>
                <th className="px-2 py-1 text-left">Evento</th>
                <th className="px-2 py-1 text-left">Etapa</th>
                <th className="px-2 py-1 text-left">Detalhes</th>
              </tr>
            </thead>
            <tbody>
              {[...events].reverse().map((e, idx) => {
                const isErr = e.name.includes("exception") || e.name.includes("failed") || e.name.includes("blocked");
                return (
                  <tr key={idx} className={`border-t border-border ${isErr ? "bg-red-500/5" : ""}`}>
                    <td className="px-2 py-1 whitespace-nowrap text-muted-foreground">
                      {new Date(e.ts).toLocaleTimeString("pt-BR")}
                    </td>
                    <td className="px-2 py-1 font-mono">{e.name}</td>
                    <td className="px-2 py-1">{e.step ?? "—"}</td>
                    <td className="px-2 py-1 font-mono text-[10px] text-muted-foreground truncate max-w-[240px]">
                      {e.data ? JSON.stringify(e.data) : "—"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      <p className="mt-2 text-[10px] text-muted-foreground">
        Dica: ative <code>window.__funnelDebug = true</code> no DevTools para ver os eventos também
        no console em tempo real.
      </p>
    </section>
    </>
  );
}
