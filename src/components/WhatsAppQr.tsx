// @ts-nocheck — legacy file silenced during TanStack migration (see .lovable/migrate-to-tanstack/tsc-silenced.json)
import { useEffect, useState } from "react";
import { NAP, NAP_PHONE_DIGITS } from "@/lib/nap";

interface WhatsAppQrProps {
  /** Mensagem pré-preenchida do WhatsApp. */
  message?: string;
  /** Origem para atribuição (ex.: "servicos/montagem-pc"). */
  campaign?: string;
  bairro?: string;
  servico?: string;
  size?: number;
  label?: string;
  className?: string;
}

/**
 * QR code rastreável para WhatsApp. O link embutido já carrega UTMs
 * (source/medium/campaign + bairro/serviço), então funciona igual em tela,
 * impresso, adesivo ou orçamento em PDF.
 *
 * Contato é exclusivamente WhatsApp — nunca gerar QR `tel:`.
 */
export function buildTrackableWaUrl(opts: {
  message?: string;
  campaign?: string;
  bairro?: string;
  servico?: string;
  medium?: string;
}): string {
  const url = new URL(`https://wa.me/${NAP_PHONE_DIGITS}`);
  if (opts.message) url.searchParams.set("text", opts.message);
  url.searchParams.set("utm_source", "qrcode");
  url.searchParams.set("utm_medium", opts.medium ?? "qr");
  url.searchParams.set("utm_campaign", opts.campaign ?? "qr_whatsapp");
  if (opts.bairro) url.searchParams.set("utm_term", opts.bairro);
  if (opts.servico) url.searchParams.set("utm_content", opts.servico);
  return url.toString();
}

export const WhatsAppQr = ({
  message = "Olá! Escaneei o QR code e quero um orçamento.",
  campaign,
  bairro,
  servico,
  size = 168,
  label = "Aponte a câmera para falar no WhatsApp",
  className = "",
}: WhatsAppQrProps) => {
  const [src, setSrc] = useState<string>("");
  const href = buildTrackableWaUrl({
    message,
    campaign: campaign ?? (typeof window !== "undefined" ? window.location.pathname.slice(1) || "home" : "home"),
    bairro,
    servico,
  });

  useEffect(() => {
    let alive = true;
    // Import dinâmico: `qrcode` depende de pngjs/util.inherits (Node), que
    // quebra a avaliação do módulo no runtime SSR edge-like.
    import("qrcode")
      .then((QRCode) =>
        QRCode.toDataURL(href, { margin: 1, width: size * 2, errorCorrectionLevel: "M" }),
      )
      .then((d) => alive && setSrc(d))
      .catch(() => { /* noop */ });
    return () => {
      alive = false;
    };
  }, [href, size]);

  const onClick = () => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "qr_whatsapp_click", {
        event_category: "engagement",
        campaign: campaign ?? "home",
        bairro: bairro ?? "nao_informado",
        servico: servico ?? "nao_informado",
      });
    }
  };

  return (
    <div className={`flex flex-col items-center gap-2 rounded-2xl border border-border bg-card p-4 ${className}`}>
      <a href={href} onClick={onClick} target="_blank" rel="noopener noreferrer" aria-label={label}>
        {src ? (
          <img
            src={src}
            width={size}
            height={size}
            alt={`QR code para falar no WhatsApp com ${NAP.alternateName}`}
            loading="lazy"
            decoding="async"
            className="rounded-lg bg-white p-2"
          />
        ) : (
          <div style={{ width: size, height: size }} className="animate-pulse rounded-lg bg-muted" aria-hidden />
        )}
      </a>
      <p className="max-w-[200px] text-center text-xs text-muted-foreground">{label}</p>
    </div>
  );
};

export default WhatsAppQr;
