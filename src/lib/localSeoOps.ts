/**
 * Ferramentas internas de SEO local (uso administrativo).
 *
 * Escopo: validar NAP para cadastro em diretórios, compor o conteúdo do
 * Google Business Profile sem superlativos proibidos, orientar a captura de
 * provas fotográficas com revisão de privacidade e documentar o modelo
 * operacional (storefront / service area / híbrido).
 *
 * Tudo roda client-side e persiste em localStorage — nenhum dado sai do
 * dispositivo do administrador.
 */

import { NAP, NAP_PHONE_E164 } from "@/lib/nap";

export const LOCAL_SEO_STORAGE_KEY = "localSeoOps:v1";

/* ─────────────────────────── NAP ─────────────────────────── */

export type NapStatus = "pendente" | "enviado" | "verificado" | "divergente";

export interface NapRecord {
  name: string;
  whatsapp: string;
  email: string;
  address: string;
  cep: string;
  source: string;
  status: NapStatus;
  verifiedAt: string;
  notes: string;
}

export const defaultNapRecord = (): NapRecord => ({
  name: NAP.name,
  whatsapp: NAP_PHONE_E164,
  email: "",
  address: `${NAP.street} — ${NAP.city}/${NAP.region}`,
  cep: "",
  source: "",
  status: "pendente",
  verifiedAt: "",
  notes: "",
});

const onlyDigits = (v: string) => v.replace(/\D+/g, "");

export const isValidCep = (cep: string) => /^\d{8}$/.test(onlyDigits(cep));

export const isValidE164Br = (phone: string) => /^\+55\d{10,11}$/.test(phone.trim());

export const isValidEmail = (email: string) =>
  email.trim() === "" || /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());

export interface NapIssue {
  field: keyof NapRecord;
  message: string;
  level: "erro" | "aviso";
}

export function validateNap(rec: NapRecord): NapIssue[] {
  const issues: NapIssue[] = [];
  if (rec.name.trim().length < 3) issues.push({ field: "name", message: "Nome muito curto.", level: "erro" });
  if (rec.name.trim() !== NAP.name)
    issues.push({ field: "name", message: "Nome diferente do NAP canônico do site.", level: "aviso" });
  if (!isValidE164Br(rec.whatsapp))
    issues.push({ field: "whatsapp", message: "WhatsApp deve estar em E.164 (+55DDNÚMERO).", level: "erro" });
  else if (rec.whatsapp.trim() !== NAP_PHONE_E164)
    issues.push({ field: "whatsapp", message: "WhatsApp diverge do número canônico do site.", level: "erro" });
  if (!isValidEmail(rec.email)) issues.push({ field: "email", message: "E-mail inválido.", level: "erro" });
  if (rec.cep.trim() !== "" && !isValidCep(rec.cep))
    issues.push({ field: "cep", message: "CEP deve ter 8 dígitos.", level: "erro" });
  if (rec.source.trim() === "")
    issues.push({ field: "source", message: "Informe a fonte/diretório deste cadastro.", level: "aviso" });
  if (rec.status === "verificado" && rec.verifiedAt.trim() === "")
    issues.push({ field: "verifiedAt", message: "Registre a data da verificação.", level: "aviso" });
  return issues;
}

/* ────────────────────── Google Business Profile ────────────────────── */

/** Termos proibidos por serem superlativos/promessas não comprováveis. */
export const BANNED_SUPERLATIVES = [
  "melhor",
  "número 1",
  "numero 1",
  "nº1",
  "o mais barato",
  "mais barato",
  "líder",
  "lider de mercado",
  "imbatível",
  "imbativel",
  "100% de garantia",
  "garantia total",
  "resolvemos tudo",
  "sempre resolve",
  "conserto garantido",
  "insuperável",
  "insuperavel",
  "top 1",
  "referência absoluta",
];

export interface GbpDraft {
  name: string;
  primaryCategory: string;
  secondaryCategories: string;
  services: string;
  description: string;
}

export const defaultGbpDraft = (): GbpDraft => ({
  name: NAP.name,
  primaryCategory: "Serviço de reparo de computadores",
  secondaryCategories: "Serviço de reparo de notebooks, Loja de informática, Serviço de suporte técnico",
  services:
    "Formatação e otimização, Conserto de notebook, Conserto de placa-mãe, Troca de tela, Limpeza e troca de pasta térmica, Recuperação de dados, Montagem de PC, Redes e Wi-Fi",
  description:
    `Assistência técnica em informática em ${NAP.city} e região metropolitana. Atendimento a domicílio, remoto e com coleta e entrega. ` +
    `Diagnóstico antes do orçamento, valores informados no WhatsApp e prazo combinado por escrito. Horário: ${NAP.hoursLabel}.`,
});

export interface GbpIssue {
  field: keyof GbpDraft;
  message: string;
  level: "erro" | "aviso";
}

export function findSuperlatives(text: string): string[] {
  const lower = text.toLowerCase();
  return BANNED_SUPERLATIVES.filter((term) => lower.includes(term));
}

export function validateGbp(draft: GbpDraft): GbpIssue[] {
  const issues: GbpIssue[] = [];
  if (draft.name.trim() !== NAP.name)
    issues.push({ field: "name", message: "Nome deve ser idêntico ao NAP do site.", level: "erro" });
  const keywordStuffing = /(curitiba).*(curitiba)/i.test(draft.name);
  if (keywordStuffing)
    issues.push({ field: "name", message: "Evite repetir a cidade no nome (risco de suspensão).", level: "erro" });
  if (draft.primaryCategory.trim() === "")
    issues.push({ field: "primaryCategory", message: "Defina a categoria principal.", level: "erro" });
  if (draft.services.split(",").filter((s) => s.trim()).length < 3)
    issues.push({ field: "services", message: "Liste ao menos 3 serviços.", level: "aviso" });
  const len = draft.description.trim().length;
  if (len < 120) issues.push({ field: "description", message: "Descrição curta demais (mín. 120).", level: "aviso" });
  if (len > 750) issues.push({ field: "description", message: "Descrição acima de 750 caracteres.", level: "erro" });
  (["name", "description", "services"] as const).forEach((field) => {
    findSuperlatives(draft[field]).forEach((term) =>
      issues.push({ field, message: `Superlativo proibido: "${term}".`, level: "erro" }),
    );
  });
  return issues;
}

/* ───────────────────── Provas: shot list + manifesto ───────────────────── */

export interface ShotItem {
  id: string;
  label: string;
  hint: string;
}

export const SHOT_LIST: ShotItem[] = [
  { id: "fachada", label: "Fachada / ponto de referência", hint: "Sem placas de vizinhos e sem pessoas identificáveis." },
  { id: "bancada", label: "Bancada organizada (visão geral)", hint: "Sem etiquetas com nome ou telefone de cliente." },
  { id: "ferramentas", label: "Ferramentas e estação de solda", hint: "Mostre ESD, multímetro e fonte de bancada." },
  { id: "recebimento", label: "Recebimento do equipamento", hint: "Cubra número de série e etiquetas patrimoniais." },
  { id: "inspecao", label: "Inspeção visual da placa", hint: "Foco no defeito, sem dados de tela do cliente." },
  { id: "medicao", label: "Medição/diagnóstico em bancada", hint: "Sem mostrar arquivos ou área de trabalho do cliente." },
  { id: "reparo", label: "Etapa de reparo", hint: "Nada de tutorial de risco (rede elétrica, bateria perfurada)." },
  { id: "teste", label: "Teste final / burn-in", hint: "Tela de teste neutra, nunca a conta do cliente logada." },
  { id: "entrega", label: "Equipamento embalado para entrega", hint: "Etiqueta com dados pessoais deve ser removida." },
  { id: "aceite", label: "Critério de aceite/recusa", hint: "Exemplo real de caso recusado, sem expor o dono." },
];

export const PRIVACY_CHECKS: ShotItem[] = [
  { id: "serial", label: "Número de série e patrimônio ocultos", hint: "Borre ou cubra antes de publicar." },
  { id: "tela", label: "Nenhuma tela com dados do cliente", hint: "E-mails, arquivos, fotos e nomes de usuário." },
  { id: "docs", label: "Nenhum documento ou OS legível", hint: "Nome, telefone, endereço e CPF fora do quadro." },
  { id: "pessoas", label: "Nenhuma pessoa identificável sem consentimento", hint: "Peça autorização por escrito quando houver." },
  { id: "marcas", label: "Sem promessa de marca ou desempenho", hint: "Legenda factual, sem Hz/HDR/ganho de FPS." },
  { id: "seguranca", label: "Sem tutoria perigosa", hint: "Nada que ensine manipular rede elétrica ou bateria danificada." },
  { id: "consent", label: "Consentimento LGPD registrado", hint: "Guarde o aceite antes de publicar a prova." },
];

export type EvidenceStage = "coleta" | "inspecao" | "reparo" | "teste" | "entrega" | "bancada";
export type EvidencePrivacy = "publico" | "interno" | "restrito";

export interface EvidenceItem {
  id: string;
  date: string;
  equipment: string;
  stage: EvidenceStage;
  privacy: EvidencePrivacy;
  caption: string;
  file: string;
}

export const EVIDENCE_STAGES: EvidenceStage[] = ["coleta", "inspecao", "reparo", "teste", "entrega", "bancada"];
export const EVIDENCE_PRIVACY: EvidencePrivacy[] = ["publico", "interno", "restrito"];

export function validateEvidence(item: EvidenceItem): string[] {
  const errs: string[] = [];
  if (!item.date) errs.push("Data obrigatória.");
  if (item.equipment.trim().length < 2) errs.push("Informe o equipamento.");
  if (item.caption.trim().length < 10) errs.push("Legenda factual muito curta.");
  if (findSuperlatives(item.caption).length > 0) errs.push("Legenda contém superlativo proibido.");
  if (item.privacy === "publico" && /\b\d{3}\.?\d{3}\.?\d{3}-?\d{2}\b/.test(item.caption))
    errs.push("Legenda pública não pode conter CPF.");
  return errs;
}

export function evidenceToCsv(items: EvidenceItem[]): string {
  const head = ["data", "equipamento", "etapa", "privacidade", "legenda", "arquivo"];
  const esc = (v: string) => `"${v.replace(/"/g, '""')}"`;
  const rows = items.map((i) => [i.date, i.equipment, i.stage, i.privacy, i.caption, i.file].map(esc).join(","));
  return [head.join(","), ...rows].join("\n");
}

/* ─────────────────── Modelo operacional (GBP compliance) ─────────────────── */

export type BusinessModel = "storefront" | "service_area" | "hibrido";

export interface BusinessModelDoc {
  model: BusinessModel;
  justification: string;
  evidenceLinks: string;
  reviewedAt: string;
}

export const BUSINESS_MODEL_LABELS: Record<BusinessModel, string> = {
  storefront: "STORE FRONT (atende clientes no endereço)",
  service_area: "SERVICE AREA BUSINESS (só vai até o cliente)",
  hibrido: "HÍBRIDO (endereço visitável + atendimento externo)",
};

export const BUSINESS_MODEL_REQUIREMENTS: Record<BusinessModel, string[]> = {
  storefront: [
    "Endereço exibido publicamente no GBP e no site.",
    "Placa/identificação visível na fachada.",
    "Horário de funcionamento com atendimento presencial real.",
  ],
  service_area: [
    "Endereço OCULTO no GBP (apenas áreas de atendimento).",
    "Lista de cidades/bairros atendidos igual à do site (/areas-atendidas).",
    "Sem placa de loja e sem convite para visita espontânea.",
  ],
  hibrido: [
    "Endereço exibido + áreas de atendimento cadastradas.",
    "Regras claras de visita (somente com agendamento).",
    "Evidência fotográfica da fachada e da bancada.",
  ],
};

export const defaultBusinessModelDoc = (): BusinessModelDoc => ({
  model: "service_area",
  justification: "Atendimento a domicílio, remoto e com coleta/entrega em Curitiba e região metropolitana.",
  evidenceLinks: "",
  reviewedAt: "",
});

/* ─────────────────────────── Persistência ─────────────────────────── */

export interface LocalSeoState {
  nap: NapRecord[];
  gbp: GbpDraft;
  shots: Record<string, boolean>;
  privacy: Record<string, boolean>;
  evidence: EvidenceItem[];
  businessModel: BusinessModelDoc;
}

export const defaultLocalSeoState = (): LocalSeoState => ({
  nap: [defaultNapRecord()],
  gbp: defaultGbpDraft(),
  shots: {},
  privacy: {},
  evidence: [],
  businessModel: defaultBusinessModelDoc(),
});

export function loadLocalSeoState(): LocalSeoState {
  if (typeof window === "undefined") return defaultLocalSeoState();
  try {
    const raw = window.localStorage.getItem(LOCAL_SEO_STORAGE_KEY);
    if (!raw) return defaultLocalSeoState();
    return { ...defaultLocalSeoState(), ...(JSON.parse(raw) as Partial<LocalSeoState>) };
  } catch {
    return defaultLocalSeoState();
  }
}

export function saveLocalSeoState(state: LocalSeoState): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(LOCAL_SEO_STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* quota cheia — ignorar */
  }
}

export function downloadFile(filename: string, content: string, mime: string): void {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
