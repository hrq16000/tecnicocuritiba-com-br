import { createFileRoute } from "@tanstack/react-router";
import Blog from "@/pages/Blog";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Blog Técnico em Curitiba | Tutoriais e Dicas" },
      { name: "description", content: "Tutoriais de Windows, celular e Wi-Fi, além de dicas de informática para Curitiba." },
      { property: "og:title", content: "Blog Técnico em Curitiba | Tutoriais e Dicas" },
      { property: "og:description", content: "Tutoriais de Windows, celular e Wi-Fi, além de dicas de informática para Curitiba." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "https://tecnicocuritiba.com.br/blog" }],
  }),
  component: Blog,
});