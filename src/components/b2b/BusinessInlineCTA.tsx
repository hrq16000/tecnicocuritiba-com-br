import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  title: string;
  description: string;
  whatsappUrl: string;
  ctaLabel: string;
  ctaLocation: string;
  onClick?: () => void;
}

/**
 * CTA intermediário empresarial — chamada curta, contexto B2B, triagem central.
 */
export const BusinessInlineCTA = ({
  title,
  description,
  whatsappUrl,
  ctaLabel,
  ctaLocation,
  onClick,
}: Props) => (
  <section className="bg-background py-8">
    <div className="container mx-auto max-w-4xl px-4">
      <div className="flex flex-col gap-4 rounded-2xl border border-accent/30 bg-accent/5 p-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="font-heading text-xl font-bold text-foreground">{title}</h2>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{description}</p>
        </div>
        <Button variant="heroWhatsapp" asChild className="w-full shrink-0 md:w-auto">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-cta-location={ctaLocation}
            onClick={onClick}
          >
            <MessageCircle className="h-5 w-5" aria-hidden="true" />
            {ctaLabel}
          </a>
        </Button>
      </div>
    </div>
  </section>
);

export default BusinessInlineCTA;
