/**
 * Deep link de triagem: `#agendamento` / `#triagem`.
 *
 * Permite abrir o funil já com serviço (equipamento) e sintoma pré-selecionados,
 * a partir de qualquer página do cluster/hub. Formatos aceitos:
 *   /servicos/conserto-celular#agendamento
 *   /servicos/conserto-celular#agendamento?equipamento=celular&sintoma=molhou
 *   /qualquer-rota#triagem?servico=pc&sintoma=nao-liga
 *
 * Regras de segurança:
 * - Só aceita ids que existem de fato nos ramos do funil (nunca inventa dados).
 * - Nunca inventa cidade/bairro: a localidade vem apenas do que já está na rota.
 */
import { getBranch, getSintoma, type Equipment } from "@/components/funnel/equipmentBranches";

export const TRIAGE_HASHES = ["#agendamento", "#triagem"] as const;

export interface TriageDeepLink {
  /** hash normalizado sem "#": "agendamento" | "triagem" */
  hash: string;
  equipamento: Equipment | null;
  sintoma: string;
  /** Localidade inferida da própria rota (nunca de IP). */
  cidade?: string;
  bairro?: string;
}

/** Mapa rota → equipamento, usado quando o deep link não traz o parâmetro. */
const ROUTE_EQUIPMENT: Array<[RegExp, Equipment]> = [
  [/celular|smartphone|iphone/i, "celular"],
  [/\btv\b|televis/i, "tv"],
  [/notebook|computador|\bpc\b|informatica|desktop|formatacao|placa|ssd|memoria/i, "pc"],
];

const prettify = (slug: string) =>
  slug
    .split("-")
    .map((w) => (w.length > 2 ? w.charAt(0).toUpperCase() + w.slice(1) : w))
    .join(" ");

function inferEquipment(pathname: string): Equipment | null {
  for (const [re, eq] of ROUTE_EQUIPMENT) {
    if (re.test(pathname) && getBranch(eq)) return eq;
  }
  return null;
}

/** Localidade derivada da rota /atendimento/<cidade>/<bairro> (se existir). */
export function localeFromPath(pathname: string): { cidade?: string; bairro?: string } {
  const parts = pathname.split("/").filter(Boolean);
  const i = parts.indexOf("atendimento");
  if (i === -1) return {};
  const cidade = parts[i + 1];
  const bairro = parts[i + 2];
  return {
    cidade: cidade ? prettify(cidade) : undefined,
    bairro: bairro ? prettify(bairro) : undefined,
  };
}

export function parseTriageDeepLink(
  hash: string,
  pathname: string,
): TriageDeepLink | null {
  if (!hash) return null;
  const [rawHash, rawQuery = ""] = hash.replace(/^#/, "").split("?");
  const name = rawHash.toLowerCase();
  if (name !== "agendamento" && name !== "triagem") return null;

  const params = new URLSearchParams(rawQuery);
  const wanted = (params.get("equipamento") || params.get("servico") || "").toLowerCase();

  let equipamento: Equipment | null = null;
  if (wanted && getBranch(wanted as Equipment)) equipamento = wanted as Equipment;
  if (!equipamento) equipamento = inferEquipment(pathname);

  const wantedSintoma = (params.get("sintoma") || params.get("problema") || "").toLowerCase();
  const sintoma =
    equipamento && wantedSintoma && getSintoma(equipamento, wantedSintoma) ? wantedSintoma : "";

  return { hash: name, equipamento, sintoma, ...localeFromPath(pathname) };
}

/** Mensagem de contexto (prévia) para o preset do funil. Sem dados inventados. */
export function buildDeepLinkPreset(link: TriageDeepLink, pathname: string): string {
  const lines: string[] = ["📅 *Solicitação de triagem/agendamento online*"];
  if (link.equipamento) {
    const branch = getBranch(link.equipamento);
    if (branch) lines.push(`• Serviço: ${branch.label ?? link.equipamento}`);
    if (link.sintoma) {
      const s = getSintoma(link.equipamento, link.sintoma);
      if (s) lines.push(`• Sintoma: ${s.label}`);
    }
  }
  if (link.bairro) lines.push(`• Bairro: ${link.bairro}`);
  if (link.cidade) lines.push(`• Cidade: ${link.cidade}`);
  lines.push(`• Página: ${pathname}`);
  return lines.join("\n");
}
