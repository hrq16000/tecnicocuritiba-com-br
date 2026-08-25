// @ts-nocheck — legacy file silenced during TanStack migration (see .lovable/migrate-to-tanstack/tsc-silenced.json)
import { ImageObjectSchema } from "@/components/ImageObjectSchema";
import { ServiceGallery, GalleryItem } from "@/components/ServiceGallery";
import { IMAGES } from "@/lib/images";

type Variant = "geral" | "notebook" | "rede" | "tv" | "celular" | "seguranca" | "empresa" | "montagem";

const SETS: Record<Variant, GalleryItem[]> = {
  geral: [
    { imageKey: "tecnicoTrabalhando", caption: "Diagnóstico feito no local, com o cliente acompanhando" },
    { imageKey: "bancadaTecnica", caption: "Bancada própria para os casos que exigem reparo fora do local" },
    { imageKey: "componentesSsd", caption: "SSD e memória: upgrade que mais devolve velocidade ao equipamento" },
  ],
  notebook: [
    { imageKey: "notebookReparo", caption: "Notebook aberto para limpeza interna e troca de pasta térmica" },
    { imageKey: "placaMae", caption: "Inspeção de placa antes de indicar troca de peça" },
    { imageKey: "ferramentas", caption: "Ferramentas profissionais levadas em toda visita" },
  ],
  rede: [
    { imageKey: "redesWifi", caption: "Organização de rack, cabeamento e roteadores" },
    { imageKey: "servidores", caption: "Infraestrutura de rede para escritórios e comércios" },
    { imageKey: "suporteRemoto", caption: "Ajustes finos de rede também podem ser feitos remotamente" },
  ],
  tv: [
    { imageKey: "smartTv", caption: "Smart TV em teste após manutenção e configuração" },
    { imageKey: "estacaoSolda", caption: "Estação de solda usada em reparo de placas" },
    { imageKey: "coletaEntrega", caption: "Coleta e devolução do aparelho quando o reparo exige bancada" },
  ],
  celular: [
    { imageKey: "microscopio", caption: "Microscópio para microsoldagem e inspeção de componentes" },
    { imageKey: "estacaoSolda", caption: "Retrabalho de componentes com estação profissional" },
    { imageKey: "ferramentas", caption: "Kit de abertura e ferramentas de precisão" },
  ],
  seguranca: [
    { imageKey: "segurancaDigital", caption: "Proteção de dados e remoção de ameaças" },
    { imageKey: "componentesSsd", caption: "Mídias usadas em backup e recuperação de arquivos" },
    { imageKey: "diagnostico", caption: "Diagnóstico de hardware antes de qualquer recuperação" },
  ],
  empresa: [
    { imageKey: "servidores", caption: "Servidores e ativos de rede em ambiente corporativo" },
    { imageKey: "suporteRemoto", caption: "Suporte remoto para chamados do dia a dia" },
    { imageKey: "redesWifi", caption: "Cabeamento e Wi-Fi dimensionados para o escritório" },
  ],
  montagem: [
    { imageKey: "desktopMontado", caption: "Desktop montado e testado antes da entrega" },
    { imageKey: "placaMae", caption: "Montagem com conferência de compatibilidade das peças" },
    { imageKey: "bancadaTecnica", caption: "Testes de estabilidade realizados em bancada" },
  ],
};

/** Chave da imagem principal (card de destaque) por variante — usada em OG/Twitter. */
export const mainImageKeyFor = (variant: Variant = "geral") => SETS[variant][0].imageKey as string;

interface Props {
  /** Ex.: "Batel, Curitiba" ou "Pinhais" */
  local?: string;
  variant?: Variant;
  title?: string;
  subtitle?: string;
  bgClass?: string;
  /** Caminho da página, usado nos @id do ImageObject */
  path?: string;
}

/**
 * Galeria de fotos reais (banco público Unsplash — sem imagens geradas por IA)
 * para enriquecer páginas locais que antes eram só texto.
 * Cada foto sai com alt descritivo, `title`, crédito visível e ImageObject JSON-LD.
 */
export const LocalPhotoGallery = ({ local, variant = "geral", title, subtitle, bgClass = "bg-secondary/40", path }: Props) => {
  const items = SETS[variant].map((it) => ({
    ...it,
    altOverride:
      (IMAGES[`${it.imageKey}Alt` as keyof typeof IMAGES] as string) +
      (local ? ` — atendimento em ${local}` : ""),
  }));

  return (
    <>
      <ImageObjectSchema
        imageKeys={SETS[variant].map((it) => it.imageKey as string)}
        local={local}
        path={path}
      />
      <ServiceGallery
        title={title ?? (local ? `Como trabalhamos em ${local}` : "Como trabalhamos")}
        subtitle={
          subtitle ??
          (local
            ? `Fotos reais de bancada, ferramentas e atendimento técnico usados nos chamados de ${local}.`
            : "Fotos reais de bancada, ferramentas e atendimento técnico.")
        }
        items={items}
        bgClass={bgClass}
        local={local}
      />
    </>
  );
};

export default LocalPhotoGallery;
