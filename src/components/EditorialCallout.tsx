import type { ReactNode } from "react";
import { Search, AlertTriangle, ClipboardCheck } from "lucide-react";

type Variant = "verificamos" | "limites" | "antes-de-autorizar";

const CONFIG: Record<Variant, { title: string; icon: typeof Search; tone: string }> = {
  verificamos: { title: "O que verificamos", icon: Search, tone: "border-primary/30 bg-primary/5" },
  limites: { title: "Limites técnicos", icon: AlertTriangle, tone: "border-amber-500/30 bg-amber-500/5" },
  "antes-de-autorizar": { title: "Antes de autorizar", icon: ClipboardCheck, tone: "border-border bg-muted/40" },
};

/**
 * Caixa editorial reutilizável para destacar conteúdo já existente na página.
 * Três padrões apenas: verificações, limites técnicos e condições antes da autorização.
 */
export const EditorialCallout = ({
  variant,
  title,
  children,
  className = "",
}: { variant: Variant; title?: string; children: ReactNode; className?: string }) => {
  const cfg = CONFIG[variant];
  const Icon = cfg.icon;
  return (
    <aside className={`rounded-xl border p-4 ${cfg.tone} ${className}`}>
      <p className="flex items-center gap-2 text-sm font-bold text-foreground">
        <Icon className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
        {title ?? cfg.title}
      </p>
      <div className="mt-2 space-y-2 text-sm leading-relaxed text-muted-foreground">{children}</div>
    </aside>
  );
};

export default EditorialCallout;
