import { createFileRoute } from "@tanstack/react-router";

import Index from "@/pages/Index";

const TITLE =
  "Técnico de Informática em Curitiba | Conserto de PC e Notebook";
const DESCRIPTION =
  "Técnico de informática em Curitiba: conserto de PC e notebook, formatação, remoção de vírus e upgrade de SSD. Atendimento via WhatsApp, a partir de R$ 99,99.";
const OG_IMAGE = "https://tecnicocuritiba.com.br/og-image.jpg?v=20260711-1";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: "https://tecnicocuritiba.com.br/" },
      { property: "og:image", content: OG_IMAGE },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: "https://tecnicocuritiba.com.br/" }],
  }),
  component: Index,
});
