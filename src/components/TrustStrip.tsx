import { ShieldCheck, Wrench, BadgeCheck } from "lucide-react";

type Item = { icon: "experiencia" | "valor" | "garantia"; text: string };

const ICONS = {
  experiencia: Wrench,
  valor: BadgeCheck,
  garantia: ShieldCheck,
} as const;

export const DEFAULT_TRUST_ITEMS: Item[] = [
  { icon: "experiencia", text: "Atuação em informática desde 1998" },
  { icon: "valor", text: "Valor informado antes da execução" },
  { icon: "garantia", text: "Garantia conforme o serviço realizado" },
];

/**
 * Faixa compacta de provas de confiança (no máximo três fatos já aprovados).
 * Não cria claims novos: apenas reapresenta fatos existentes no site.
 */
export const TrustStrip = ({
  items = DEFAULT_TRUST_ITEMS,
  className = "",
}: { items?: Item[]; className?: string }) => (
  <ul
    className={`grid gap-2 sm:grid-cols-3 ${className}`}
    aria-label="Pontos de confiança"
  >
    {items.slice(0, 3).map((it) => {
      const Icon = ICONS[it.icon];
      return (
        <li
          key={it.text}
          className="flex items-start gap-2 rounded-lg border border-border/60 bg-muted/40 px-3 py-2 text-sm text-muted-foreground"
        >
          <Icon className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
          <span className="text-foreground/90">{it.text}</span>
        </li>
      );
    })}
  </ul>
);

export default TrustStrip;
