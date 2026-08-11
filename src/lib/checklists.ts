/**
 * Checklists rápidos de reparo (PDF) — fonte única de caminho, metadados e
 * evento GA4. Os arquivos vivem em `public/downloads/` e são linkados a partir
 * de `/checklists` e das páginas de sintoma correspondentes.
 *
 * O rastreamento respeita o Consent Mode v2: `window.gtag` só envia quando o
 * consentimento de analytics foi concedido.
 */
export interface ChecklistItem {
  slug: string;
  title: string;
  description: string;
  file: string;
  /** Página de sintoma/serviço mais relevante para o checklist. */
  relatedPath: string;
}

export const CHECKLISTS: ChecklistItem[] = [
  {
    slug: "pc-nao-liga",
    title: "Computador não liga",
    description:
      "Testes de energia, sinais de diagnóstico (bipes, LED, ventoinha) e o que anotar antes da visita técnica.",
    file: "/downloads/checklist-rapido-pc-nao-liga.pdf",
    relatedPath: "/servicos/computador-nao-liga",
  },
  {
    slug: "computador-lento",
    title: "Computador lento",
    description:
      "Verificações de disco, temperatura e programas em segundo plano antes de decidir por formatação ou upgrade.",
    file: "/downloads/checklist-rapido-computador-lento.pdf",
    relatedPath: "/servicos/computador-lento",
  },
  {
    slug: "sem-internet",
    title: "Sem internet ou Wi-Fi instável",
    description:
      "Sequência para separar problema do provedor, do roteador ou do computador, incluindo reinício correto.",
    file: "/downloads/checklist-rapido-sem-internet.pdf",
    relatedPath: "/servicos/redes-wifi",
  },
];

export const getChecklist = (slug: string): ChecklistItem | undefined =>
  CHECKLISTS.find((c) => c.slug === slug);

export const trackChecklistDownload = (slug: string, source: string) => {
  if (typeof window === "undefined") return;
  try {
    window.gtag?.("event", "checklist_download", {
      event_category: "conteudo",
      event_label: `checklist_${slug}`,
      source,
      page_path: window.location.pathname,
    });
  } catch {
    /* noop */
  }
};
