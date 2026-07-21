import { useEffect, useState } from "react";
import { getAlertSummary, clearAlerts, type AlertSummary } from "@/lib/errorAlerts";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw, Trash2, CheckCircle2 } from "lucide-react";

/**
 * Painel de alertas do admin. Agrega, a partir do `localStorage` do navegador
 * atual, eventos de erro (links quebrados, modalidade/problema unknown,
 * falhas no /obrigado) numa janela de 24h e destaca picos que exigem ação.
 *
 * Complementa o FunnelDiagnosticsPanel: aqui está a visão "algo está errado";
 * lá está a visão "vamos reproduzir um caso".
 */
export function ErrorAlertsPanel() {
  const [summary, setSummary] = useState<AlertSummary>(() => getAlertSummary());
  const [tick, setTick] = useState(0);

  useEffect(() => {
    setSummary(getAlertSummary());
    const id = window.setInterval(() => setSummary(getAlertSummary()), 3000);
    return () => window.clearInterval(id);
  }, [tick]);

  const Card = ({
    label, value, critical, hint,
  }: { label: string; value: number; critical: boolean; hint: string }) => (
    <div className={`rounded-lg border p-3 ${critical ? "border-red-500/40 bg-red-500/5" : "border-border bg-background"}`}>
      <p className="text-[11px] uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className={`text-2xl font-bold ${critical ? "text-red-600 dark:text-red-400" : "text-foreground"}`}>{value}</p>
      <p className="text-[10px] text-muted-foreground mt-1">{hint}</p>
    </div>
  );

  return (
    <section className="mt-4 rounded-lg border border-border bg-card/40 p-4">
      <header className="flex items-center justify-between gap-2 mb-3">
        <div>
          <h2 className="text-sm font-bold flex items-center gap-2">
            {summary.hasCritical ? (
              <AlertTriangle className="h-4 w-4 text-red-500" />
            ) : (
              <CheckCircle2 className="h-4 w-4 text-green-500" />
            )}
            Alertas de erro — últimas 24h
          </h2>
          <p className="text-[11px] text-muted-foreground">
            {summary.total} eventos capturados neste navegador ·{" "}
            {summary.hasCritical ? "atenção necessária" : "tudo normal"}
          </p>
        </div>
        <div className="flex gap-1">
          <Button size="sm" variant="outline" onClick={() => setTick((t) => t + 1)} className="gap-1">
            <RefreshCw className="h-3 w-3" /> Atualizar
          </Button>
          <Button size="sm" variant="outline" onClick={() => { clearAlerts(); setTick((t) => t + 1); }} className="gap-1">
            <Trash2 className="h-3 w-3" /> Limpar
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card label="Links quebrados" value={summary.brokenLinks} critical={summary.brokenLinks > 0} hint="Qualquer clique em link inválido" />
        <Card label="Modalidade unknown" value={summary.unknownModalidade} critical={summary.unknownModalidade > 5} hint="Limite: 5 em 24h" />
        <Card label="Problema unknown" value={summary.unknownProblema} critical={summary.unknownProblema > 5} hint="Limite: 5 em 24h" />
        <Card label="/obrigado inválido" value={summary.obrigadoInvalido} critical={summary.obrigadoInvalido > 1} hint="Qualquer ocorrência" />
      </div>

      {summary.topBrokenLinks.length > 0 && (
        <div className="mt-4">
          <h3 className="text-xs font-semibold text-foreground mb-2">Top links quebrados</h3>
          <div className="rounded border border-border bg-background/70 overflow-hidden">
            <table className="w-full text-[11px]">
              <thead className="bg-muted">
                <tr>
                  <th className="px-2 py-1 text-left">De</th>
                  <th className="px-2 py-1 text-left">Para</th>
                  <th className="px-2 py-1 text-right">Cliques</th>
                </tr>
              </thead>
              <tbody>
                {summary.topBrokenLinks.map((l, i) => (
                  <tr key={i} className="border-t border-border">
                    <td className="px-2 py-1 font-mono truncate max-w-[240px]">{l.from}</td>
                    <td className="px-2 py-1 font-mono text-red-600 dark:text-red-400 truncate max-w-[240px]">{l.to}</td>
                    <td className="px-2 py-1 text-right font-bold">{l.count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
}
