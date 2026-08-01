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
type OriginFilter = "all" | "whatsapp" | "ligacao";
type KindFilter = "all" | "errors" | "resets" | "submits";

const originOf = (e: FunnelDiagEvent): "whatsapp" | "ligacao" | "outro" => {
  const blob = `${e.name} ${JSON.stringify(e.data || {})}`.toLowerCase();
  if (blob.includes("call") || blob.includes("ligar") || blob.includes("tel")) return "ligacao";
  if (blob.includes("wa") || blob.includes("whats") || e.name.startsWith("submit") || e.name === "open") return "whatsapp";
  return "outro";
};

const isError = (e: FunnelDiagEvent) =>
  /(exception|failed|blocked|invalid)/i.test(e.name);

export function FunnelDiagnosticsPanel() {
  const [events, setEvents] = useState<FunnelDiagEvent[]>([]);
  const [tick, setTick] = useState(0);
  const [origin, setOrigin] = useState<OriginFilter>("all");
  const [kind, setKind] = useState<KindFilter>("all");

  useEffect(() => {
    setEvents(readFunnelDiag());
    const id = window.setInterval(() => setEvents(readFunnelDiag()), 2000);
    return () => window.clearInterval(id);
  }, [tick]);

  const filtered = events.filter((e) => {
    if (origin !== "all" && originOf(e) !== origin) return false;
    if (kind === "errors" && !isError(e)) return false;
    if (kind === "resets" && e.name !== "reset") return false;
    if (kind === "submits" && !e.name.startsWith("submit")) return false;
    return true;
  });

  const submitEvents = events.filter((e) => e.name.startsWith("submit"));
  const resets = events.filter((e) => e.name === "reset");
  const lastResets = resets.slice(-3).reverse();

  const chip = (active: boolean) =>
    `rounded px-2 py-1 text-[11px] border ${active ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground"}`;

  return (
    <>
    <ErrorAlertsPanel />
    <section className="mt-8 rounded-lg border border-border bg-card/40 p-4">
      <header className="flex items-center justify-between gap-2 mb-3 flex-wrap">
        <div>
          <h2 className="text-sm font-bold flex items-center gap-2">
            <Activity className="h-4 w-4 text-primary" /> Diagnóstico local do funil
          </h2>
          <p className="text-[11px] text-muted-foreground">
            {events.length} eventos capturados neste navegador ·{" "}
            {submitEvents.length} relacionados a envio · {resets.length} resets ·{" "}
            {events.filter(isError).length} erros
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

      <div className="mb-3 flex flex-wrap gap-3">
        <div className="flex gap-1" role="group" aria-label="Filtrar por origem">
          {(["all", "whatsapp", "ligacao"] as OriginFilter[]).map((o) => (
            <button key={o} type="button" aria-pressed={origin === o} className={chip(origin === o)} onClick={() => setOrigin(o)}>
              {o === "all" ? "Todas origens" : o === "whatsapp" ? "WhatsApp" : "Ligação"}
            </button>
          ))}
        </div>
        <div className="flex gap-1" role="group" aria-label="Filtrar por tipo">
          {(["all", "errors", "resets", "submits"] as KindFilter[]).map((k) => (
            <button key={k} type="button" aria-pressed={kind === k} className={chip(kind === k)} onClick={() => setKind(k)}>
              {k === "all" ? "Tudo" : k === "errors" ? "Erros" : k === "resets" ? "Resets" : "Envios"}
            </button>
          ))}
        </div>
      </div>

      {lastResets.length > 0 && (
        <div className="mb-3 rounded border border-amber-500/30 bg-amber-500/5 p-2">
          <p className="text-[11px] font-semibold mb-1">Últimos resets</p>
          <ul className="text-[11px] text-muted-foreground space-y-0.5">
            {lastResets.map((r, i) => (
              <li key={i}>
                {new Date(r.ts).toLocaleString("pt-BR")} · etapa {r.step ?? "—"}
                {r.data ? ` · ${JSON.stringify(r.data)}` : ""}
              </li>
            ))}
          </ul>
        </div>
      )}

      {filtered.length === 0 ? (
        <p className="text-xs text-muted-foreground">
          Nenhum evento para este filtro. Abra o funil no site (mesmo navegador) e clique em "Agendar agora"
          para reproduzir.
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
