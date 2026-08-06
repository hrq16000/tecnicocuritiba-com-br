import { Link } from "react-router-dom";
import { MessageCircle, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface BusinessHeroProps {
  /** Rótulo curto de contexto (ex.: "Suporte de TI corporativo em Curitiba") */
  eyebrow: string;
  /** H1 da página */
  title: string;
  /** Complemento do H1 (linha secundária, não é outro H1) */
  titleSuffix?: string;
  /** Parágrafo de posicionamento — sem promessas de prazo, preço ou SLA */
  description: string;
  whatsappUrl: string;
  ctaLabel: string;
  /** Valor usado em data-cta-location para rastreio GA4 */
  ctaLocation: string;
  secondary?: { label: string; to: string };
  /** Sinais objetivos de confiança (fatos verificáveis, não promessas) */
  signals: string[];
  children?: React.ReactNode;
}

/**
 * Hero exclusivo das páginas empresariais (B2B).
 * Governança visual própria: não reutiliza PageHero (residencial) nem o template de sintomas.
 * Regras: 1 CTA primário sempre acima da dobra, 1 CTA secundário de leitura,
 * sinais de confiança factuais e nenhuma linguagem de garantia de prazo/SLA.
 */
export const BusinessHero = ({
  eyebrow,
  title,
  titleSuffix,
  description,
  whatsappUrl,
  ctaLabel,
  ctaLocation,
  secondary,
  signals,
  children,
}: BusinessHeroProps) => (
  <section className="relative overflow-hidden border-b border-border bg-card/40">
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_20%_0%,hsl(var(--accent)/0.10),transparent_70%)]"
    />
    <div className="container relative mx-auto px-4 pb-8 pt-24 md:pb-12 md:pt-28">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-accent">
            <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
            {eyebrow}
          </span>

          <h1 className="mt-4 font-heading text-3xl font-bold leading-tight text-foreground md:text-4xl lg:text-5xl">
            {title}
            {titleSuffix ? (
              <span className="mt-2 block text-lg font-semibold text-muted-foreground md:text-xl">
                {titleSuffix}
              </span>
            ) : null}
          </h1>

          <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
            {description}
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button variant="heroWhatsapp" asChild className="w-full shadow-lg sm:w-auto">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-cta-location={ctaLocation}
              >
                <MessageCircle className="h-5 w-5" aria-hidden="true" />
                {ctaLabel}
              </a>
            </Button>
            {secondary ? (
              <Button variant="outline" asChild className="w-full text-foreground sm:w-auto">
                <Link to={secondary.to}>
                  {secondary.label}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
            ) : null}
          </div>

          <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
            {signals.map((s) => (
              <li key={s} className="inline-flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                {s}
              </li>
            ))}
          </ul>
        </div>

        {children ? <div className="lg:pt-2">{children}</div> : null}
      </div>
    </div>
  </section>
);

export default BusinessHero;
