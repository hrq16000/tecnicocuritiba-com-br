/**
 * BlogCoverImage — capa otimizada (AVIF > WebP > JPG) para os posts com pipeline
 * local em /public/blog-covers/[slug]/cover-{480,768,1200}.{avif,webp,jpg}.
 *
 * - width/height explícitos = 1200×630 (evita CLS).
 * - `priority=true` no post aberto (LCP): `fetchPriority="high" loading="eager"`.
 * - `priority=false` em listagens: `loading="lazy" decoding="async"`.
 * - Slugs sem cover local caem no fallback (Unsplash) via `fallbackSrc`.
 */
export const OPTIMIZED_BLOG_COVER_SLUGS = new Set<string>([
  "quanto-custa-formatar-computador-curitiba",
  "meu-computador-precisa-de-formatacao",
  "notebook-nao-liga-o-que-fazer",
  "computador-lento-causas-solucoes",
  "sinais-computador-com-virus",
  "quando-trocar-hd-por-ssd",
  "como-fazer-upgrade-ssd-nvme",
  "upgrade-ram-quando-vale-a-pena",
  "backup-como-proteger-seus-arquivos",
  "como-escolher-tecnico-informatica-confiavel-curitiba",
]);

/** Alt-texts únicos por slug — descrevem a IMAGEM em si (não o título). */
export const BLOG_COVER_ALTS: Record<string, string> = {
  "quanto-custa-formatar-computador-curitiba":
    "Notas de real e calculadora sobre mesa de trabalho representando orçamento de formatação de computador em Curitiba",
  "meu-computador-precisa-de-formatacao":
    "Tela de notebook exibindo mensagens de erro do Windows e ampulheta de carregamento indicando necessidade de formatação",
  "notebook-nao-liga-o-que-fazer":
    "Mãos tentando ligar notebook fechado sobre bancada de assistência técnica com ferramentas ao lado",
  "computador-lento-causas-solucoes":
    "Cursor girando (ampulheta) sobre desktop lotado de janelas abertas, ilustrando computador travando por lentidão",
  "sinais-computador-com-virus":
    "Tela com alertas vermelhos de infecção e símbolo de crânio digital representando vírus e malware no PC",
  "quando-trocar-hd-por-ssd":
    "SSD SATA 2.5\" ao lado de HD mecânico aberto mostrando pratos, comparativo de armazenamento",
  "como-fazer-upgrade-ssd-nvme":
    "SSD NVMe M.2 sendo instalado no slot da placa-mãe com chave Phillips durante upgrade de notebook",
  "upgrade-ram-quando-vale-a-pena":
    "Dois pentes de memória RAM DDR4 sendo encaixados nos slots da placa-mãe de um notebook em manutenção",
  "backup-como-proteger-seus-arquivos":
    "HD externo conectado ao notebook com pastas de fotos e documentos sendo copiadas na tela",
  "como-escolher-tecnico-informatica-confiavel-curitiba":
    "Técnico de informática uniformizado apertando a mão de cliente ao lado de notebook consertado em bancada",
};

interface BlogCoverImageProps {
  slug: string;
  alt?: string;
  priority?: boolean;
  className?: string;
  /** Fallback para posts sem pipeline local (mantém a capa Unsplash original). */
  fallbackSrc?: string;
  fallbackSrcSet?: string;
  sizes?: string;
}

export function BlogCoverImage({
  slug,
  alt,
  priority = false,
  className,
  fallbackSrc,
  fallbackSrcSet,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 1200px",
}: BlogCoverImageProps) {
  const finalAlt = alt || BLOG_COVER_ALTS[slug] || "Capa do artigo";
  const isOptimized = OPTIMIZED_BLOG_COVER_SLUGS.has(slug);

  if (!isOptimized) {
    // Fallback: <img> simples para os 132+ posts ainda no Unsplash.
    return (
      <img
        src={fallbackSrc}
        srcSet={fallbackSrcSet}
        sizes={sizes}
        alt={finalAlt}
        width={1200}
        height={630}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        // @ts-expect-error fetchpriority is valid HTML
        fetchPriority={priority ? "high" : "auto"}
        className={className}
      />
    );
  }

  const base = `/blog-covers/${slug}/cover`;
  const srcSet = (ext: string) =>
    `${base}-480.${ext} 480w, ${base}-768.${ext} 768w, ${base}-1200.${ext} 1200w`;

  return (
    <picture>
      <source type="image/avif" srcSet={srcSet("avif")} sizes={sizes} />
      <source type="image/webp" srcSet={srcSet("webp")} sizes={sizes} />
      <img
        src={`${base}-1200.jpg`}
        srcSet={srcSet("jpg")}
        sizes={sizes}
        alt={finalAlt}
        width={1200}
        height={630}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        // @ts-expect-error fetchpriority is valid HTML
        fetchPriority={priority ? "high" : "auto"}
        className={className}
      />
    </picture>
  );
}

/** URL absoluta para o schema BlogPosting.image (exige URL absoluta). */
export function getBlogCoverAbsoluteUrl(slug: string, origin = "https://tecnicocuritiba.com.br"): string | null {
  if (!OPTIMIZED_BLOG_COVER_SLUGS.has(slug)) return null;
  return `${origin}/blog-covers/${slug}/cover-1200.jpg`;
}
