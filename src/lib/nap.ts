/**
 * NAP — fonte ÚNICA de verdade (Name · Address · Phone) do negócio.
 *
 * Todo JSON-LD, botão de contato e link de WhatsApp DEVE derivar destes
 * valores. Divergência de telefone/razão social entre páginas destrói a
 * consistência de NAP exigida pelo SEO local e é bloqueada por E2E
 * (`e2e/nap-consistency.spec.ts`).
 */

/** Telefone em E.164 — único formato aceito em JSON-LD (`telephone`). */
export const NAP_PHONE_E164 = "+5541997452053";

/** Somente dígitos com DDI — usado em `https://wa.me/<digits>`. */
export const NAP_PHONE_DIGITS = "5541997452053";

export const NAP = {
  /** Razão social / nome do negócio exibido em LocalBusiness e Organization. */
  name: "Técnico em Curitiba — Assistência Técnica em Informática",
  alternateName: "Técnico em Curitiba",
  legalName: "Técnico em Curitiba — Assistência Técnica em Informática",
  street: "Atendimento a domicílio e coleta",
  city: "Curitiba",
  region: "PR",
  country: "BR",
  /** Contato exclusivamente via WhatsApp — nunca renderizar links `tel:`. */
  phone: NAP_PHONE_E164,
  phoneDigits: NAP_PHONE_DIGITS,
  whatsappUrl: `https://wa.me/${NAP_PHONE_DIGITS}`,
  url: "https://tecnicocuritiba.com.br",
  logo: "https://tecnicocuritiba.com.br/lovable-uploads/87899615-1234-4c6d-a8ca-ee38ec566ef4.webp",
  geo: { lat: -25.4284, lng: -49.2733 },
  hoursLabel: "Seg–Sáb · 08h às 20h",
  opens: "08:00",
  closes: "20:00",
  days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  foundingDate: "1998",
} as const;

/** Bloco `address` padrão para qualquer schema. */
export const napPostalAddress = () => ({
  "@type": "PostalAddress",
  streetAddress: NAP.street,
  addressLocality: NAP.city,
  addressRegion: NAP.region,
  addressCountry: NAP.country,
});

/** Bloco `openingHoursSpecification` padrão. */
export const napOpeningHours = () => [
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [...NAP.days],
    opens: NAP.opens,
    closes: NAP.closes,
  },
];

/** Bloco `contactPoint` padrão (WhatsApp). */
export const napContactPoint = () => [
  {
    "@type": "ContactPoint",
    telephone: NAP.phone,
    contactType: "customer support",
    areaServed: "BR",
    availableLanguage: ["Portuguese", "pt-BR"],
    url: NAP.whatsappUrl,
  },
];
