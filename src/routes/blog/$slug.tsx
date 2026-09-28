import { createFileRoute } from "@tanstack/react-router";
import BlogPost from "@/pages/BlogPost";
import { getCategoryCover } from "@/lib/categoryCovers";

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params }) => {
    const { blogPostsContentBase } = await import("@/data/blogPostsContent");
    const { programmaticPosts } = await import("@/data/blogProgrammaticPosts");
    const post = blogPostsContentBase[params.slug] ?? programmaticPosts[params.slug];
    return post ? { title: post.title, excerpt: post.excerpt } : null;
  },
  head: ({ params, loaderData }) => {
    const title = loaderData ? `${loaderData.title} | Técnico em Curitiba` : "Artigo | Técnico em Curitiba";
    const description = loaderData?.excerpt ?? "Tutoriais e dicas de informática em Curitiba.";
    const cover = getCategoryCover(params.slug);
    const image = cover?.source ? `https://tecnicocuritiba.com.br${cover.src}` : null;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
        ...(image ? [
          { property: "og:image", content: image },
          { name: "twitter:image", content: image },
        ] : []),
      ],
      links: [{ rel: "canonical", href: `https://tecnicocuritiba.com.br/blog/${params.slug}` }],
    };
  },
  component: BlogPost,
});