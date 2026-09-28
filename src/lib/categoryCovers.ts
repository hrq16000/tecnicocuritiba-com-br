/**
 * Premium category covers (1200x630) generated for the Curitiba brand
 * (deep blue + orange). Each file uses a content hash for cache-busting.
 *
 * Returns the responsive variants when available, or null for slugs that
 * don't match a tutorial category.
 */

type CategoryKey = "windows" | "celular" | "wifi";

const COVERS: Record<CategoryKey, { src: string; srcSet: string }> = {
  windows: {
    src: "/lovable-uploads/cover-windows-curitiba.8f6a333b.jpg",
    srcSet: [
      "/lovable-uploads/cover-windows-curitiba.8f6a333b-400.webp 400w",
      "/lovable-uploads/cover-windows-curitiba.8f6a333b-800.webp 800w",
      "/lovable-uploads/cover-windows-curitiba.8f6a333b-1200.webp 1200w",
    ].join(", "),
  },
  celular: {
    src: "/lovable-uploads/cover-celular-curitiba.373a7302.jpg",
    srcSet: [
      "/lovable-uploads/cover-celular-curitiba.373a7302-400.webp 400w",
      "/lovable-uploads/cover-celular-curitiba.373a7302-800.webp 800w",
      "/lovable-uploads/cover-celular-curitiba.373a7302-1200.webp 1200w",
    ].join(", "),
  },
  wifi: {
    src: "/lovable-uploads/cover-wifi-curitiba.fdcb2d89.jpg",
    srcSet: [
      "/lovable-uploads/cover-wifi-curitiba.fdcb2d89-400.webp 400w",
      "/lovable-uploads/cover-wifi-curitiba.fdcb2d89-800.webp 800w",
      "/lovable-uploads/cover-wifi-curitiba.fdcb2d89-1200.webp 1200w",
    ].join(", "),
  },
};

/** Fixed tutorial cohort: exactly ten posts per category; other articles keep their own photos. */
const TUTORIAL_GROUPS: Record<CategoryKey, readonly string[]> = {
  windows: [
    "como-deixar-windows-11-mais-rapido-iniciantes", "como-fazer-backup-fotos-windows-iniciantes",
    "como-instalar-impressora-windows-passo-a-passo", "como-remover-virus-windows-iniciantes",
    "como-organizar-arquivos-windows-iniciantes", "como-atualizar-windows-corretamente",
    "como-recuperar-arquivos-apagados-windows", "como-trocar-papel-de-parede-tela-bloqueio-windows",
    "como-criar-conta-usuario-windows-criancas", "como-imprimir-pdf-windows",
  ],
  celular: [
    "como-deixar-celular-android-mais-rapido", "como-economizar-bateria-celular",
    "como-fazer-backup-celular-android", "como-conectar-celular-tv",
    "como-bloquear-numero-celular", "como-usar-google-fotos-iniciantes",
    "como-instalar-aplicativos-celular-com-seguranca", "como-transferir-dados-celular-novo",
    "como-fazer-print-tela-celular", "como-recuperar-conta-google-bloqueada",
  ],
  wifi: [
    "como-melhorar-sinal-wifi-em-casa", "como-configurar-roteador-wifi-iniciantes",
    "como-trocar-senha-wifi", "como-usar-rede-wifi-para-visitas",
    "como-configurar-repetidor-wifi", "como-saber-quem-esta-usando-meu-wifi",
    "como-conectar-wifi-tv-nao-conecta", "como-fazer-teste-velocidade-internet",
    "como-bloquear-acesso-internet-criancas", "como-mudar-nome-rede-wifi",
  ],
};

const tutorialCategories = new Map(
  (Object.entries(TUTORIAL_GROUPS) as [CategoryKey, readonly string[]][])
    .flatMap(([key, slugs]) => slugs.map((slug) => [slug, key] as const)),
);

/** Map the thirty domestic tutorials, and preserve the existing category covers for older posts. */
export function detectCategoryFromSlug(slug: string): CategoryKey | null {
  const tutorial = tutorialCategories.get(slug);
  if (tutorial) return tutorial;
  const s = slug.toLowerCase();
  if (s.includes("wifi") || s.includes("wi-fi") || s.includes("roteador") || s.includes("repetidor") || s.includes("internet")) return "wifi";
  if (s.includes("celular") || s.includes("android") || s.includes("iphone") || s.includes("bateria") || s.includes("google-fotos") || s.includes("aplicativos-celular") || s.includes("conta-google") || s.includes("print-tela-celular") || s.includes("transferir-dados-celular") || s.includes("bloquear-numero")) return "celular";
  if (s.includes("windows")) return "windows";
  return null;
}

export function getCategoryCover(slug: string) {
  const tutorial = tutorialCategories.get(slug);
  if (tutorial) return TUTORIAL_COVERS[tutorial];
  const key = detectCategoryFromSlug(slug);
  return key ? COVERS[key] : null;
}
