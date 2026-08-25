/**
 * Schemas JSON-LD estruturais do site — injetados via SSR no head() das rotas
 * (TanStack Start), presentes no HTML estático entregue aos crawlers.
 *
 * Fonte única: LocalBusiness + Organization ficam no __root (todas as rotas).
 * Schemas de página (FAQPage, HowTo, Article…) entram no head() da rota folha.
 * NÃO duplicar estes schemas em componentes client-side (JsonLdSchema.tsx) —
 * o gate `check:seo-ssr` bloqueia regressão.
 */

import { NAP, napContactPoint, napOpeningHours } from "@/lib/nap";

export const SITE = "https://tecnicocuritiba.com.br";

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "ProfessionalService", "ComputerRepairService"],
  "@id": `${SITE}/#organization`,
  name: "Técnico em Curitiba - Suporte em Informática",
  alternateName: ["Técnico de Informática em Curitiba", "Assistência Técnica Curitiba"],
  description:
    "Técnico de informática em Curitiba: conserto de PC e notebook, formatação, remoção de vírus e upgrade de SSD. Atendimento via WhatsApp, a partir de R$ 99,99.",
  url: SITE,
  telephone: NAP.phone,
  image: `${SITE}/og-image.jpg`,
  logo: `${SITE}/logo.png`,
  priceRange: "R$ 99,99 - R$ 500",
  currenciesAccepted: "BRL",
  foundingDate: NAP.foundingDate,
  slogan: "Assistência Técnica Nº1 de Curitiba e Região",
  paymentAccepted: "Dinheiro, Cartão de Crédito, Cartão de Débito, PIX, Transferência Bancária",
  geo: { "@type": "GeoCoordinates", latitude: "-25.4284", longitude: "-49.2733" },
  areaServed: [
    { "@type": "City", name: "Curitiba", sameAs: "https://pt.wikipedia.org/wiki/Curitiba" },
    { "@type": "City", name: "São José dos Pinhais" },
    { "@type": "City", name: "Araucária" },
    { "@type": "City", name: "Campo Largo" },
    { "@type": "City", name: "Pinhais" },
    { "@type": "City", name: "Colombo" },
    { "@type": "City", name: "Almirante Tamandaré" },
    { "@type": "City", name: "Fazenda Rio Grande" },
    { "@type": "City", name: "Piraquara" },
    { "@type": "City", name: "Quatro Barras" },
    { "@type": "City", name: "Campo Magro" },
  ],
  openingHoursSpecification: napOpeningHours(),
  sameAs: [NAP.whatsappUrl],
  knowsAbout: [
    "Manutenção de computadores", "Conserto de notebooks", "Formatação Windows",
    "Remoção de vírus", "Upgrade de hardware", "Configuração de redes",
    "Suporte técnico em informática", "Instalação de câmeras CFTV",
    "Conserto de impressoras", "Assistência de eletrodomésticos inteligentes",
  ],
  hasMap: "https://www.google.com/maps?cid=tecnicocuritiba",
} as const;

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE}/#organization`,
  name: "Técnico em Curitiba",
  alternateName: "Técnico de Informática em Curitiba",
  legalName: "Técnico em Curitiba — Assistência Técnica em Informática",
  url: SITE,
  logo: `${SITE}/logo.png`,
  contactPoint: napContactPoint(),
  sameAs: [NAP.whatsappUrl],
} as const;

export interface FaqItem {
  question: string;
  answer: string;
}

/** FAQPage pronto para o head() de qualquer rota de sintoma/serviço. */
export const buildFaqPageSchema = (faqs: FaqItem[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
});

/** Processo de atendimento — rich snippet HowTo (home / páginas de serviço). */
export const howToAtendimentoSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "@id": `${SITE}/#como-funciona`,
  name: "Como funciona o atendimento de informática em Curitiba",
  description:
    "Do primeiro contato à garantia: triagem online, orçamento transparente, atendimento no mesmo dia e acompanhamento pós-serviço.",
  totalTime: "PT1H",
  estimatedCost: { "@type": "MonetaryAmount", currency: "BRL", value: "99.99" },
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Triagem online em 1 minuto",
      text: "Você descreve o equipamento, o sintoma e a urgência pela triagem do site — sem cadastro e sem informar telefone.",
      url: `${SITE}/#agendamento`,
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Orçamento transparente",
      text: "O técnico responde no WhatsApp com valores e prazos. Visita a partir de R$ 99,99 e você só confirma se aprovar o orçamento.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Atendimento no mesmo dia",
      text: "Atendimento remoto, visita técnica ou coleta e entrega, conforme o diagnóstico. Na maioria dos casos, no mesmo dia em Curitiba e região.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Garantia e acompanhamento",
      text: "Serviço com garantia (30 dias em formatação, 90 dias a 1 ano em hardware) e acompanhamento do status do atendimento.",
    },
  ],
} as const;
