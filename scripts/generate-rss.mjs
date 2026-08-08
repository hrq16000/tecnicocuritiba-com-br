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

// ---------- lastmod real por post ----------
// O <updated> do Atom (e o lastBuildDate do RSS) precisa refletir mudança real
// de conteúdo — não o horário do build. Usamos o último commit que alterou o
// bloco do post (busca por slug com `git log -S`) e, na falta de git, a data de
// publicação do próprio post. Assim o feed só "muda" quando a página muda.
const CONTENT_FILES = [
  "src/data/blogPostsContent.tsx",
  "src/data/blogProgrammaticPosts.tsx",
  "src/pages/Blog.tsx",
];

function gitUpdated(slug) {
  try {
    const out = execFileSync(
      "git",
      ["log", "-1", "--format=%cI", "-S", `"${slug}"`, "--", ...CONTENT_FILES],
      { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] },
    ).trim();
    return out || null;
  } catch {
    return null;
  }
}

function updatedIso(post) {
  const published = new Date(post.date + "T08:00:00-03:00");
  const git = gitUpdated(post.slug);
  const gitDate = git ? new Date(git) : null;
  const best = gitDate && !Number.isNaN(gitDate.getTime()) && gitDate > published ? gitDate : published;
  return best.toISOString();
}

const feedPosts = posts
  .slice()
  .sort((a, b) => (a.date < b.date ? 1 : -1))
  .slice(0, 50)
  .map((p) => ({ ...p, updated: updatedIso(p) }));

const feedUpdated =
  feedPosts.reduce((acc, p) => (p.updated > acc ? p.updated : acc), feedPosts[0]?.updated || new Date().toISOString());

const xml = buildRss(posts, feedUpdated);
writeFileSync(resolve("public/rss.xml"), xml);
console.log(`rss.xml gerado com ${Math.min(posts.length, 50)} posts.`);

// ---------- atom.xml ----------
const atomEntries = feedPosts
  .map(
    (p) => `  <entry>
    <title>${escapeXml(p.title)}</title>
    <link rel="alternate" type="text/html" href="${BASE_URL}/blog/${p.slug}" />
    <id>${BASE_URL}/blog/${p.slug}</id>
    <published>${new Date(p.date + "T08:00:00-03:00").toISOString()}</published>
    <updated>${p.updated}</updated>
    <category term="${escapeXml(p.category)}" />
    <summary type="text">${escapeXml(p.excerpt)}</summary>
  </entry>`,
  )
  .join("\n");

const atomXml = `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom" xml:lang="pt-BR">
  <title>${escapeXml(SITE_TITLE)}</title>
  <subtitle>${escapeXml(SITE_DESC)}</subtitle>
  <link rel="self" type="application/atom+xml" href="${BASE_URL}/atom.xml" />
  <link rel="alternate" type="text/html" href="${BASE_URL}/blog" />
  <id>${BASE_URL}/blog</id>
  <updated>${feedUpdated}</updated>
  <author>
    <name>Técnico em Curitiba</name>
    <uri>${BASE_URL}</uri>
  </author>
${atomEntries}
</feed>
`;
writeFileSync(resolve("public/atom.xml"), atomXml);
console.log(`atom.xml gerado com ${feedPosts.length} entradas (updated: ${feedUpdated}).`);

// ---------- sitemap-news.xml (Google News) ----------
// Regra do Google: só posts das últimas 48h costumam entrar; nós emitimos os
// últimos 30 dias, cabe ao Google filtrar. Regeramos a cada build para não
// depender de commit manual.
const NOW = Date.now();
const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;
const newsPosts = posts
  .filter((p) => {
    const t = new Date(p.date + "T08:00:00-03:00").getTime();
    return !Number.isNaN(t) && NOW - t <= THIRTY_DAYS;
  })
  .sort((a, b) => (a.date < b.date ? 1 : -1))
  .slice(0, 1000); // limite oficial do Google News

const newsUrls = newsPosts
  .map(
    (p) => `  <url>
    <loc>${BASE_URL}/blog/${p.slug}</loc>
    <news:news>
      <news:publication>
        <news:name>Técnico em Curitiba</news:name>
        <news:language>pt</news:language>
      </news:publication>
      <news:publication_date>${p.date}T08:00:00-03:00</news:publication_date>
      <news:title>${escapeXml(p.title)}</news:title>
      <news:keywords>${escapeXml(`${p.category}, técnico curitiba, informática`)}</news:keywords>
    </news:news>
    <lastmod>${p.date}</lastmod>
  </url>`,
  )
  .join("\n");

const newsXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${newsUrls}
</urlset>
`;
writeFileSync(resolve("public/sitemap-news.xml"), newsXml);
console.log(`sitemap-news.xml gerado com ${newsPosts.length} posts recentes.`);

