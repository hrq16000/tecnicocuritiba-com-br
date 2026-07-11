// Gera public/rss.xml a partir dos posts do blog.
// Roda em predev/prebuild para manter o feed sincronizado com o Blog.tsx.
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const BASE_URL = "https://tecnicocuritiba.com.br";
const SITE_TITLE = "Blog Técnico em Curitiba";
const SITE_DESC =
  "Guias, tutoriais e dicas sobre informática, manutenção de PC/notebook, formatação, remoção de vírus e suporte técnico em Curitiba.";

// Extrai os objetos { slug, title, excerpt, date, readTime, category } do array
// `const blogPosts = [ ... ];` em src/pages/Blog.tsx sem precisar transpilar TSX.
function parsePosts() {
  const src = readFileSync(resolve("src/pages/Blog.tsx"), "utf8");
  const start = src.indexOf("const blogPosts = [");
  if (start === -1) throw new Error("blogPosts array não encontrado em Blog.tsx");
  const end = src.indexOf("];", start);
  const body = src.slice(start, end);
  const posts = [];
  const re =
    /\{\s*slug:\s*"([^"]+)",\s*title:\s*"([^"]+)",\s*excerpt:\s*"([^"]+)",\s*date:\s*"([^"]+)",\s*readTime:\s*"([^"]+)",\s*category:\s*"([^"]+)"/g;
  let m;
  while ((m = re.exec(body))) {
    posts.push({
      slug: m[1],
      title: m[2],
      excerpt: m[3],
      date: m[4],
      readTime: m[5],
      category: m[6],
    });
  }
  return posts;
}

function escapeXml(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function toRfc822(dateStr) {
  const d = new Date(dateStr + "T08:00:00-03:00");
  return d.toUTCString();
}

function buildRss(posts) {
  const items = posts
    .slice()
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, 50)
    .map(
      (p) => `    <item>
      <title>${escapeXml(p.title)}</title>
      <link>${BASE_URL}/blog/${p.slug}</link>
      <guid isPermaLink="true">${BASE_URL}/blog/${p.slug}</guid>
      <pubDate>${toRfc822(p.date)}</pubDate>
      <category>${escapeXml(p.category)}</category>
      <description>${escapeXml(p.excerpt)}</description>
    </item>`,
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_TITLE)}</title>
    <link>${BASE_URL}/blog</link>
    <atom:link href="${BASE_URL}/rss.xml" rel="self" type="application/rss+xml" />
    <description>${escapeXml(SITE_DESC)}</description>
    <language>pt-BR</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>
`;
}

const posts = parsePosts();
const xml = buildRss(posts);
writeFileSync(resolve("public/rss.xml"), xml);
console.log(`rss.xml gerado com ${Math.min(posts.length, 50)} posts.`);
