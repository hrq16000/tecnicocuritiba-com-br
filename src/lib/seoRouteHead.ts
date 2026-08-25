/**
 * SSR-time port of the per-route SEO metadata previously produced by the
 * legacy build-time prerender plugins:
 *   - scripts/prerender-pilot.mjs   (explicit table of ~15-19 commercial routes)
 *   - scripts/prerender-cities.mjs  (arrumar-pc/<cidade> + conserto-X/<local> hubs)
 *   - scripts/prerender-bairros.mjs (bairros/<slug> + generic sitemap shells)
 *
 * Only title/description/canonical/og:image parity is ported here. JSON-LD is
 * NOT ported — pages render their own structured data via React.
 *
 * Pure TypeScript, no Node APIs: safe for both the SSR server bundle and the browser.
 */

import { cities as ARRUMAR_PC_CITIES } from "../pages/arrumar-pc/cities";
import { CATEGORY_LIST } from "../pages/hubs/categories";
import { LOCAIS } from "../pages/hubs/locais";

export interface RouteHeadMeta {
  title: string;
  description: string;
  /** absolute canonical URL, e.g. https://tecnicocuritiba.com.br/bairros/batel */
  canonical: string;
  /** absolute og:image URL when the plugin set a route-specific one, else undefined */
  ogImage?: string;
}

const SITE = "https://tecnicocuritiba.com.br";

// ---------------------------------------------------------------------------
// Shared helpers ported verbatim from prerender-bairros.mjs
// ---------------------------------------------------------------------------

const CITY_SUFFIX: ReadonlyArray<readonly [string, string]> = [
  ["-sjp", "São José dos Pinhais"],
  ["-sao-jose-dos-pinhais", "São José dos Pinhais"],
  ["-araucaria", "Araucária"],
  ["-colombo", "Colombo"],
  ["-pinhais", "Pinhais"],
  ["-piraquara", "Piraquara"],
  ["-fazenda-rio-grande", "Fazenda Rio Grande"],
  ["-campo-largo", "Campo Largo"],
  ["-cl", "Campo Largo"],
  ["-campo-magro", "Campo Magro"],
  ["-cm", "Campo Magro"],
  ["-quatro-barras", "Quatro Barras"],
  ["-qb", "Quatro Barras"],
  ["-almirante-tamandare", "Almirante Tamandaré"],
  ["-at", "Almirante Tamandaré"],
];

const SMALL_WORDS = new Set<string>(["de", "da", "do", "das", "dos", "e"]);

function titleize(slug: string): string {
  return slug
    .split("-")
    .map((w, i) => {
      if (w.length === 0) return w;
      if (i > 0 && SMALL_WORDS.has(w)) return w;
      const first = w.charAt(0).toUpperCase();
      return first + w.slice(1);
    })
    .join(" ");
}

interface BairroMeta {
  bairro: string;
  city: string;
}

function bairroMeta(slug: string): BairroMeta {
  let city = "Curitiba";
  let rest = slug;
  for (const pair of CITY_SUFFIX) {
    const suffix = pair[0];
    const cityName = pair[1];
    if (slug.endsWith(suffix)) {
      city = cityName;
      rest = slug.slice(0, -suffix.length);
      break;
    }
  }
  return { bairro: titleize(rest || slug), city };
}

/** Título curto e único (limite de 70 chars) — port of clampTitle in prerender-bairros.mjs. */
function clampTitle(main: string, suffix?: string): string {
  const full = suffix ? `${main} | ${suffix}` : main;
  if (full.length <= 70) return full;
  return main.length <= 70 ? main : `${main.slice(0, 67).trimEnd()}...`;
}

// Real photo (Unsplash, Unsplash License) used as og:image for /bairros/* pages
// — ported from LOCAL_PHOTO_OG in prerender-bairros.mjs.
const LOCAL_PHOTO_OG =
  "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&h=630&q=72";

function canonicalFor(pathname: string): string {
  return `${SITE}${pathname}`;
}

// ---------------------------------------------------------------------------
// prerender-pilot.mjs — explicit per-route table (ported verbatim)
// ---------------------------------------------------------------------------

interface PilotRoute {
  path: string;
  title: string;
  description: string;
}

const PILOT_ROUTES: readonly PilotRoute[] = [
  {
    path: "/guia-tecnico-informatica",
    title: "Guia Técnico de Informática | Diagnóstico, Custos e Prazos",
    description:
      "Guia completo de informática: como descobrir a causa do problema, quanto custa cada serviço, prazos reais e quando compensa consertar PC ou notebook em Curitiba.",
  },
  {
    path: "/servicos",
    title: "Serviços de Informática em Curitiba | Técnico em Curitiba",
    description:
      "Todos os serviços: formatação, conserto de notebook, remoção de vírus, upgrade de SSD, redes Wi-Fi e backup. Visita técnica a partir de R$ 99,99 em Curitiba e região.",
  },
  {
    path: "/sobre",
    title: "Sobre a Técnico em Curitiba | Assistência Técnica desde 1998",
    description:
      "Quem somos: assistência técnica de informática em Curitiba desde 1998, com atendimento domiciliar, remoto e coleta. Orçamento sem compromisso pelo WhatsApp.",
  },
  {
    path: "/faq",
    title: "Perguntas Frequentes | Técnico de Informática em Curitiba",
    description:
      "Dúvidas sobre preços, prazos, garantia, coleta e atendimento domiciliar em Curitiba. Visita técnica a partir de R$ 99,99 com orçamento antes do reparo.",
  },
  {
    path: "/contato",
    title: "Contato | Técnico de Informática em Curitiba",
    description:
      "Fale com um técnico de informática em Curitiba pelo WhatsApp. Atendimento domiciliar, remoto e coleta em Curitiba e Região Metropolitana.",
  },
  {
    path: "/como-funciona",
    title: "Como Funciona o Atendimento | Técnico em Curitiba",
    description:
      "Triagem pelo WhatsApp, diagnóstico, orçamento e reparo. Entenda as modalidades remoto, visita e coleta, com prazos e valores claros em Curitiba.",
  },
  {
    path: "/suporte-empresas",
    title: "Suporte de TI para Empresas em Curitiba | Contratos, M365 e Backup",
    description:
      "Suporte de TI corporativo em Curitiba: contratos mensais com SLA, Microsoft 365, Google Workspace, backup e servidores. Nota fiscal e pagamento faturado.",
  },
  {
    path: "/atendimento-domicilio",
    title: "Atendimento Domiciliar de Informática em Curitiba | Mesmo Dia",
    description:
      "Técnico de informática em domicílio em Curitiba e região. Visita a partir de R$ 99,99 (30 min), orçamento no local e garantia no serviço.",
  },
  {
    path: "/atendimento-remoto",
    title: "Suporte Remoto de Informática em Curitiba | A partir de R$ 99,99",
    description:
      "Suporte remoto imediato para lentidão, vírus, impressora e configurações. R$ 99,99 por até 30 min · R$ 169,99 por 1h combinada.",
  },
  {
    path: "/coleta-e-entrega",
    title: "Coleta e Entrega de Notebook e PC em Curitiba | Reparo em Bancada",
    description:
      "Coletamos seu equipamento, reparamos em bancada e devolvemos. Valor mínimo R$ 299,99 (coleta, entrega e diagnóstico), peças não inclusas.",
  },
  {
    path: "/equipamentos-atendidos",
    title: "Equipamentos Atendidos | Notebook, PC, TV, Impressora e Rede",
    description:
      "Notebooks, desktops, all-in-one, TVs, impressoras, roteadores e câmeras. Veja o que atendemos em Curitiba e região e como funciona a triagem.",
  },
  {
    path: "/diagnostico-60s",
    title: "Diagnóstico em 60 Segundos | Descubra o Defeito do seu Equipamento",
    description:
      "Responda algumas perguntas e receba um diagnóstico inicial com modalidade recomendada (remoto, visita ou coleta) e faixa de preço.",
  },
  {
    path: "/problemas-reais-e-casos",
    title: "Problemas Reais e Casos Resolvidos | Técnico em Curitiba",
    description:
      "Casos reais de reparo em Curitiba: notebook que não liga, tela quebrada, Wi-Fi instável, lentidão e perda de dados. Veja o diagnóstico e o custo.",
  },
  {
    path: "/gestor-responsavel",
    title: "Gestor Responsável | Técnico em Curitiba desde 1998",
    description:
      "Conheça o gestor técnico responsável pelos atendimentos, certificações e área de atuação em Curitiba e Região Metropolitana.",
  },
  {
    path: "/atendimento",
    title: "Atendimento por Cidade e Bairro | Técnico em Curitiba",
    description:
      "Cobertura de atendimento em Curitiba e Região Metropolitana por cidade e bairro. Escolha sua região e fale com um técnico agora.",
  },
  {
    path: "/areas-atendidas",
    title: "Áreas Atendidas em Curitiba e Região | Bairros e Cidades",
    description:
      "Mapa e lista completa de bairros e cidades atendidas em Curitiba e Região Metropolitana: domicílio, coleta e remoto a partir de R$ 99,99.",
  },
  {
    path: "/quando-nao-compensa",
    title: "Quando Não Compensa Consertar | Guia Honesto | Técnico em Curitiba",
    description:
      "Critérios objetivos para decidir entre reparar ou trocar notebook, PC e TV. Comparativo de custo, vida útil e disponibilidade de peças.",
  },
  {
    path: "/urgente",
    title: "Ajuda Técnica Urgente em Curitiba | Atendimento no Mesmo Dia",
    description:
      "Precisa de técnico agora em Curitiba? Veja a disponibilidade do dia e siga para a triagem por WhatsApp: remoto imediato, visita no mesmo dia ou coleta, a partir de R$ 99,99.",
  },
  {
    path: "/checklists",
    title: "Checklists Rápidos de Reparo | Técnico em Curitiba",
    description:
      "Baixe checklists gratuitos em PDF para computador que não liga, PC lento e internet instável: testes seguros em casa e o que anotar antes de chamar o técnico.",
  },
];

const PILOT_ROUTES_BY_PATH: ReadonlyMap<string, PilotRoute> = new Map(
  PILOT_ROUTES.map((r) => [r.path, r] as const),
);

// ---------------------------------------------------------------------------
// prerender-cities.mjs — /arrumar-pc/<cidade> (data ported from src/pages/arrumar-pc/cities.ts)
// ---------------------------------------------------------------------------

function arrumarPcMeta(slug: string): RouteHeadMeta | null {
  const city = ARRUMAR_PC_CITIES.find((c) => c.slug === slug);
  if (!city) return null;
  const pathname = `/arrumar-pc/${city.slug}`;
  const title = `Arrumar PC em ${city.cidade} ${city.estado} — Técnico online | Técnico em Curitiba`;
  const description = `Técnico de informática online para ${city.cidade}/${city.estado}. Formatação, vírus, lentidão, tela azul e Wi-Fi via WhatsApp + acesso remoto. Orçamento grátis, paga só se resolver.`;
  return { title, description, canonical: canonicalFor(pathname) };
}

// ---------------------------------------------------------------------------
// prerender-cities.mjs — /conserto-{tv,som,videogame,celular}/<local> and hub index
// (data ported from src/pages/hubs/categories.ts + locais.ts)
// ---------------------------------------------------------------------------

function categoryBySlug(slug: string) {
  return CATEGORY_LIST.find((c) => c.slug === slug);
}

function categoryLocalHead(categorySlug: string, localSlug: string): RouteHeadMeta | null {
  const category = categoryBySlug(categorySlug);
  if (!category) return null;
  const local = LOCAIS.find((l) => l.slug === localSlug);
  if (!local) return null;
  const cityLabel = local.kind === "bairro" && local.cidadeMae ? `${local.nome}, ${local.cidadeMae}` : local.nome;
  const pathname = `/${category.slug}/${local.slug}`;
  const title = `${category.titlePrefix} em ${cityLabel} | Coleta e Entrega · Técnico em Curitiba`;
  const description = `${category.titlePrefix} em ${cityLabel}/PR com coleta e entrega. Reparo a partir de R$ 300 com diagnóstico incluso, garantia de 90 dias e orçamento sem compromisso pelo WhatsApp.`;
  return { title, description, canonical: canonicalFor(pathname) };
}

function categoryHubHead(categorySlug: string): RouteHeadMeta | null {
  const category = categoryBySlug(categorySlug);
  if (!category) return null;
  const pathname = `/${category.slug}-curitiba`;
  const title = `${category.titlePrefix} em Curitiba e Região Metropolitana | Coleta e Entrega`;
  const description = `${category.titlePrefix} para Curitiba, São José dos Pinhais, Araucária, Pinhais, Colombo, Campo Largo e mais. Coleta e entrega, reparo mínimo R$ 300 com diagnóstico incluso.`;
  return { title, description, canonical: canonicalFor(pathname) };
}

const CATEGORY_SLUGS: ReadonlySet<string> = new Set(CATEGORY_LIST.map((c) => c.slug));

// ---------------------------------------------------------------------------
// prerender-bairros.mjs — /bairros/<slug>
// ---------------------------------------------------------------------------

function bairroHead(slug: string): RouteHeadMeta {
  const { bairro, city } = bairroMeta(slug);
  const pathname = `/bairros/${slug}`;
  const title = clampTitle(`Técnico de Informática em ${bairro}, ${city}`, "Atendimento a domicílio");
  const description = `Assistência técnica de computador e notebook em ${bairro}, ${city}. Atendimento a domicílio, remoto ou coleta. Diagnóstico e orçamento pelo WhatsApp.`;
  return { title, description, canonical: canonicalFor(pathname), ogImage: LOCAL_PHOTO_OG };
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

function normalizePathname(pathname: string): string {
  let p = pathname;
  const queryOrHashIdx = p.search(/[?#]/);
  if (queryOrHashIdx !== -1) p = p.slice(0, queryOrHashIdx);
  if (p.length > 1 && p.endsWith("/")) p = p.slice(0, -1);
  if (p === "") p = "/";
  return p;
}

/** Returns per-route head metadata for SSR, or null when no plugin covered this path. */
export function seoForPath(pathname: string): RouteHeadMeta | null {
  const path = normalizePathname(pathname);

  // prerender-pilot.mjs — explicit ~19-route table.
  const pilot = PILOT_ROUTES_BY_PATH.get(path);
  if (pilot) {
    return { title: pilot.title, description: pilot.description, canonical: canonicalFor(path) };
  }

  const segs = path.split("/").filter(Boolean);

  // /bairros/<slug>
  if (segs[0] === "bairros" && segs.length === 2 && segs[1]) {
    return bairroHead(segs[1]);
  }

  // /arrumar-pc/<cidade>
  if (segs[0] === "arrumar-pc" && segs.length === 2 && segs[1]) {
    return arrumarPcMeta(segs[1]);
  }

  // /conserto-{tv,som,videogame,celular}/<local>
  if (segs.length === 2 && segs[0] && segs[1] && CATEGORY_SLUGS.has(segs[0])) {
    return categoryLocalHead(segs[0], segs[1]);
  }

  // Category hub index routes, e.g. /conserto-tv-curitiba
  if (segs.length === 1 && segs[0] && segs[0].endsWith("-curitiba")) {
    const candidate = segs[0].slice(0, -"-curitiba".length);
    if (CATEGORY_SLUGS.has(candidate)) {
      return categoryHubHead(candidate);
    }
  }

  // NOTE: /problemas/<slug> and /procedimentos/<slug> are intentionally NOT
  // handled here — none of the three legacy plugins had a dedicated formula
  // for these paths (prerender-bairros.mjs only special-cases /blog/*,
  // /bairros/*, /atendimento/* and /servicos/<x>/<bairro>; anything else fell
  // through to a generic "last-segment titleize" shell that isn't a
  // route-specific formula worth porting). Per instructions we return null
  // rather than invent a formula.

  return null;
}
