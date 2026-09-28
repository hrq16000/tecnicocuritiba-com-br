/**
 * Premium category covers (1200x630) generated for the Curitiba brand
 * (deep blue + orange). Each file uses a content hash for cache-busting.
 *
 * Returns the responsive variants when available, or null for slugs that
 * don't match a tutorial category.
 */

type CategoryKey = "windows" | "celular" | "wifi";

// Audited Unsplash photographs, selected with getUniqueImage at 1200px,
// exported as optimized local project assets (never AI-generated photography).
const TUTORIAL_COVERS: Record<CategoryKey, { src: string; srcSet: string; alt: string; source: string }> = {
  windows: {
    src: "/__l5e/assets-v1/02aa6262-0198-4d9b-9d03-70602dcb3077/tutorial-windows-1200.jpg",
    srcSet: "/__l5e/assets-v1/5627ae2d-577f-43cc-83ce-94030d77de89/tutorial-windows-1200.webp 1200w",
    alt: "Notebook aberto sobre mesa de trabalho com editor de código na tela",
    source: "https://unsplash.com/photos/1517694712202-14dd9538aa97",
  },
  celular: {
    src: "/__l5e/assets-v1/7c834a68-f63c-46b2-9aca-ad08708fe0ce/tutorial-celular-1200.jpg",
    srcSet: "/__l5e/assets-v1/bb7c9098-1260-49b7-9832-f0683c26cb58/tutorial-celular-1200.webp 1200w",
    alt: "Celular com aplicativos abertos ao lado de um notebook",
    source: "https://unsplash.com/photos/1511707171634-5f897ff02aa9",
  },
  wifi: {
    src: "/__l5e/assets-v1/621c7f60-7a3e-4b2d-9d50-dff6b31ed8ec/tutorial-wifi-1200.jpg",
    srcSet: "/__l5e/assets-v1/7df5ca2d-36c2-4254-8edf-b13f936aa961/tutorial-wifi-1200.webp 1200w",
    alt: "Cabos de rede conectados a portas de equipamentos de comunicação",
    source: "https://unsplash.com/photos/1544197150-b99a580bb7a8",
  },
};

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

export function getCategoryCover(slug: string): { src: string; srcSet: string; alt?: string; source?: string } | null {
  const tutorial = tutorialCategories.get(slug);
  if (tutorial) return TUTORIAL_COVERS[tutorial];
  const key = detectCategoryFromSlug(slug);
  return key ? COVERS[key] : null;
}
