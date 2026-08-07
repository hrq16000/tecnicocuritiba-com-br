import { useEffect } from "react";
import { creditLabel, getImageCredit, imageTitle, imageVariants } from "@/lib/imageCredits";

interface Props {
  /** Chaves de `IMAGES` exibidas na página */
  imageKeys: string[];
  /** Ex.: "Batel, Curitiba" */
  local?: string;
  /** Caminho da página (para `contentLocation`/`@id` estáveis) */
  path?: string;
}

const BASE_URL = "https://tecnicocuritiba.com.br";

/**
 * JSON-LD `ImageObject` para as fotos reais das páginas de bairro/cidade,
 * relacionando cada imagem à sua licença, crédito e página de aquisição.
 */
export const ImageObjectSchema = ({ imageKeys, local, path = "" }: Props) => {
  useEffect(() => {
    const credits = imageKeys.map(getImageCredit).filter(Boolean);
    if (credits.length === 0) return;

    const nodes = credits.map((c) => {
      const v = imageVariants(c!.key);
      return {
        "@type": "ImageObject",
        "@id": `${BASE_URL}${path}#image-${c!.key}`,
        contentUrl: v?.webp || c!.src,
        url: v?.webp || c!.src,
        name: imageTitle(c!, local),
        description: local ? `${c!.alt} — atendimento em ${local}` : c!.alt,
        caption: c!.alt,
        creditText: creditLabel(c!),
        creator: c!.author
          ? { "@type": "Person", name: c!.author, url: c!.authorUrl }
          : { "@type": "Organization", name: c!.source, url: "https://unsplash.com" },
        copyrightNotice: creditLabel(c!),
        license: c!.licenseUrl,
        acquireLicensePage: c!.sourceUrl,
        encodingFormat: "image/webp",
        representativeOfPage: false,
        ...(local ? { contentLocation: { "@type": "Place", name: local } } : {}),
      };
    });

    const el = document.createElement("script");
    el.type = "application/ld+json";
    el.setAttribute("data-image-object-schema", "true");
    el.text = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": nodes,
    });
    document.head.appendChild(el);

    return () => {
      el.remove();
    };
  }, [imageKeys.join("|"), local, path]);

  return null;
};

export default ImageObjectSchema;
