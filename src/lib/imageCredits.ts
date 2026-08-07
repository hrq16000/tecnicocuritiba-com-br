import { IMAGES } from "@/lib/images";

/**
 * Registro central de créditos e licenciamento das fotos reais do portal.
 *
 * Regras (validadas em CI por `scripts/check-image-credits.mjs`):
 * - 100% das imagens são fotografias reais de bancos públicos (Unsplash).
 *   Nenhuma imagem gerada por IA é permitida.
 * - Toda chave em `IMAGES` precisa de: alt descritivo, título, fonte,
 *   URL da foto original e licença com URL.
 * - O crédito precisa aparecer visivelmente junto da imagem (figcaption)
 *   e no JSON-LD `ImageObject` (creditText / license / acquireLicensePage).
 */

export type ImageKey = Extract<keyof typeof IMAGES, string>;

export interface ImageCredit {
  key: string;
  /** URL da imagem otimizada usada no site */
  src: string;
  /** Alt descritivo (acessibilidade + SEO) */
  alt: string;
  /** Título curto usado no atributo `title` e no ImageObject.name */
  title: string;
  source: string;
  /** Página da foto original (verificação de licença) */
  sourceUrl: string;
  license: string;
  licenseUrl: string;
  /** Autor, quando informado pela fonte */
  author?: string;
  authorUrl?: string;
  aiGenerated: false;
}

const UNSPLASH_LICENSE = "Unsplash License";
const UNSPLASH_LICENSE_URL = "https://unsplash.com/license";

/** Autores conhecidos por ID de foto (preencher conforme confirmado na fonte). */
const AUTHORS: Record<string, { author: string; authorUrl: string }> = {};

const isAltKey = (k: string) => k.endsWith("Alt");

const photoIdOf = (url: string) => (url.match(/photo-([0-9a-z-]+)/i) || [])[1] || "";

function buildCredit(key: string, src: string, alt: string): ImageCredit {
  const id = photoIdOf(src);
  const known = AUTHORS[id];
  return {
    key,
    src,
    alt,
    // Título = primeira oração do alt, sem contexto de cidade.
    title: alt.split(" — ")[0],
    source: "Unsplash",
    sourceUrl: id ? `https://unsplash.com/photos/${id}` : "https://unsplash.com",
    license: UNSPLASH_LICENSE,
    licenseUrl: UNSPLASH_LICENSE_URL,
    author: known?.author,
    authorUrl: known?.authorUrl,
    aiGenerated: false,
  };
}

export const IMAGE_CREDITS: Record<string, ImageCredit> = Object.entries(IMAGES)
  .filter(([k]) => !isAltKey(k))
  .reduce((acc, [k, v]) => {
    const alt = (IMAGES[`${k}Alt` as keyof typeof IMAGES] as string) || k;
    acc[k] = buildCredit(k, v as string, alt);
    return acc;
  }, {} as Record<string, ImageCredit>);

export const getImageCredit = (key: string): ImageCredit | undefined => IMAGE_CREDITS[key];

/** Texto curto de crédito exibido junto da foto e usado em `creditText`. */
export const creditLabel = (c: ImageCredit) =>
  c.author ? `Foto: ${c.author} / ${c.source} (${c.license})` : `Foto: ${c.source} (${c.license})`;

/** Título acessível (`title=`) combinando descrição + localidade quando houver. */
export const imageTitle = (c: ImageCredit, local?: string) =>
  local ? `${c.title} — atendimento em ${local}` : c.title;

/** Variante otimizada para OpenGraph/Twitter (1200x630, absoluta e https). */
export function ogImageFromKey(key: string): string | undefined {
  const c = IMAGE_CREDITS[key];
  if (!c) return undefined;
  if (!c.src.includes("images.unsplash.com")) return c.src;
  const base = c.src.split("?")[0];
  return `${base}?auto=format&fit=crop&w=1200&h=630&q=72`;
}

/** Variantes de formato para o image sitemap e `<picture>`. */
export function imageVariants(key: string) {
  const c = IMAGE_CREDITS[key];
  if (!c) return null;
  const base = c.src.split("?")[0];
  const q = "auto=format&fit=crop&w=1200&q=72";
  return {
    original: c.src,
    webp: `${base}?fm=webp&${q}`,
    avif: `${base}?fm=avif&${q}`,
  };
}
