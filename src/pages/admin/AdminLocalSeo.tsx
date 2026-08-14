import { useEffect, useMemo, useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Download, Plus, Trash2, AlertTriangle, CheckCircle2 } from "lucide-react";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import {
  BUSINESS_MODEL_LABELS,
  BUSINESS_MODEL_REQUIREMENTS,
  EVIDENCE_PRIVACY,
  EVIDENCE_STAGES,
  PRIVACY_CHECKS,
  SHOT_LIST,
  defaultNapRecord,
  downloadFile,
  evidenceToCsv,
  loadLocalSeoState,
  saveLocalSeoState,
  validateEvidence,
  validateGbp,
  validateNap,
  type BusinessModel,
  type EvidenceItem,
  type EvidencePrivacy,
  type EvidenceStage,
  type LocalSeoState,
  type NapRecord,
  type NapStatus,
} from "@/lib/localSeoOps";

const NAP_STATUSES: NapStatus[] = ["pendente", "enviado", "verificado", "divergente"];

const newEvidence = (): EvidenceItem => ({
  id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
  date: new Date().toISOString().slice(0, 10),
  equipment: "",
  stage: "bancada",
  privacy: "interno",
  caption: "",
  file: "",
});

export default function AdminLocalSeo() {
  const { loading: authLoading, session, isAdmin } = useAdminAuth();
  const [state, setState] = useState<LocalSeoState | null>(null);

  useEffect(() => {
    setState(loadLocalSeoState());
  }, []);

  useEffect(() => {
    if (state) saveLocalSeoState(state);
  }, [state]);

  const gbpIssues = useMemo(() => (state ? validateGbp(state.gbp) : []), [state]);

  if (authLoading || !state) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }
  if (!session || !isAdmin) return <Navigate to="/admin/login" replace />;

  const patch = (p: Partial<LocalSeoState>) => setState((s) => (s ? { ...s, ...p } : s));

  const updateNap = (idx: number, field: keyof NapRecord, value: string) =>
    patch({ nap: state.nap.map((r, i) => (i === idx ? { ...r, [field]: value } : r)) });

  const updateEvidence = (idx: number, field: keyof EvidenceItem, value: string) =>
    patch({ evidence: state.evidence.map((e, i) => (i === idx ? { ...e, [field]: value } : e)) });

  const shotsDone = SHOT_LIST.filter((s) => state.shots[s.id]).length;
  const privacyDone = PRIVACY_CHECKS.filter((s) => state.privacy[s.id]).length;
  const privacyReady = privacyDone === PRIVACY_CHECKS.length;

  return (
    <>
      <Helmet>
        <title>SEO local — NAP, GBP e provas | Admin</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>
      <Header />
      <main id="main-content" className="container mx-auto max-w-5xl px-4 py-24">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-extrabold">SEO local — operação</h1>
            <p className="text-sm text-muted-foreground">
              NAP em diretórios, conteúdo do Google Business Profile, shot list de provas e modelo operacional.
              Os dados ficam apenas neste navegador.
            </p>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link to="/admin/seo">Painel SEO</Link>
          </Button>
        </div>

        <Tabs defaultValue="nap">
          <TabsList className="mb-6 flex flex-wrap">
            <TabsTrigger value="nap">NAP</TabsTrigger>
            <TabsTrigger value="gbp">Google Business</TabsTrigger>
            <TabsTrigger value="provas">Provas</TabsTrigger>
            <TabsTrigger value="modelo">Modelo operacional</TabsTrigger>
          </TabsList>

          {/* ───────── NAP ───────── */}
          <TabsContent value="nap" className="space-y-4">
            {state.nap.map((rec, idx) => {
              const issues = validateNap(rec);
              return (
                <Card key={idx} className="space-y-3 p-4">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <Label>Nome do negócio</Label>
                      <Input value={rec.name} onChange={(e) => updateNap(idx, "name", e.target.value)} />
                    </div>
                    <div>
                      <Label>WhatsApp (E.164)</Label>
                      <Input value={rec.whatsapp} onChange={(e) => updateNap(idx, "whatsapp", e.target.value)} />
                    </div>
                    <div>
                      <Label>E-mail</Label>
                      <Input value={rec.email} onChange={(e) => updateNap(idx, "email", e.target.value)} />
                    </div>
                    <div>
                      <Label>Endereço</Label>
                      <Input value={rec.address} onChange={(e) => updateNap(idx, "address", e.target.value)} />
                    </div>
                    <div>
                      <Label>CEP</Label>
                      <Input value={rec.cep} onChange={(e) => updateNap(idx, "cep", e.target.value)} />
                    </div>
                    <div>
                      <Label>Fonte / diretório</Label>
                      <Input
                        placeholder="Ex.: Google Business Profile, Apontador, Bing Places"
                        value={rec.source}
                        onChange={(e) => updateNap(idx, "source", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Status</Label>
                      <select
                        className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                        value={rec.status}
                        onChange={(e) => updateNap(idx, "status", e.target.value)}
                      >
                        {NAP_STATUSES.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <Label>Verificado em</Label>
                      <Input type="date" value={rec.verifiedAt} onChange={(e) => updateNap(idx, "verifiedAt", e.target.value)} />
                    </div>
                    <div>
                      <Label>Observações</Label>
                      <Input value={rec.notes} onChange={(e) => updateNap(idx, "notes", e.target.value)} />
                    </div>
                  </div>

                  {issues.length === 0 ? (
                    <p className="flex items-center gap-2 text-sm text-emerald-600">
                      <CheckCircle2 className="h-4 w-4" /> NAP consistente com o site.
                    </p>
                  ) : (
                    <ul className="space-y-1 text-sm">
                      {issues.map((i, k) => (
                        <li
                          key={k}
                          className={`flex items-start gap-2 ${i.level === "erro" ? "text-destructive" : "text-amber-600"}`}
                        >
                          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                          <span>
                            <strong>{i.field}</strong>: {i.message}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {state.nap.length > 1 ? (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => patch({ nap: state.nap.filter((_, i) => i !== idx) })}
                    >
                      <Trash2 className="mr-2 h-4 w-4" /> Remover cadastro
                    </Button>
                  ) : null}
                </Card>
              );
            })}

            <div className="flex flex-wrap gap-2">
              <Button variant="outline" onClick={() => patch({ nap: [...state.nap, defaultNapRecord()] })}>
                <Plus className="mr-2 h-4 w-4" /> Novo diretório
              </Button>
              <Button
                variant="outline"
                onClick={() => downloadFile("nap-diretorios.json", JSON.stringify(state.nap, null, 2), "application/json")}
              >
                <Download className="mr-2 h-4 w-4" /> Exportar JSON
              </Button>
            </div>
          </TabsContent>

          {/* ───────── GBP ───────── */}
          <TabsContent value="gbp" className="space-y-4">
            <Card className="space-y-3 p-4">
              <div>
                <Label>Nome (idêntico ao NAP)</Label>
                <Input value={state.gbp.name} onChange={(e) => patch({ gbp: { ...state.gbp, name: e.target.value } })} />
              </div>
              <div>
                <Label>Categoria principal</Label>
                <Input
                  value={state.gbp.primaryCategory}
                  onChange={(e) => patch({ gbp: { ...state.gbp, primaryCategory: e.target.value } })}
                />
              </div>
              <div>
                <Label>Categorias secundárias (separadas por vírgula)</Label>
                <Input
                  value={state.gbp.secondaryCategories}
                  onChange={(e) => patch({ gbp: { ...state.gbp, secondaryCategories: e.target.value } })}
                />
              </div>
              <div>
                <Label>Serviços (separados por vírgula)</Label>
                <Textarea
                  rows={3}
                  value={state.gbp.services}
                  onChange={(e) => patch({ gbp: { ...state.gbp, services: e.target.value } })}
                />
              </div>
              <div>
                <Label>Descrição ({state.gbp.description.trim().length}/750)</Label>
                <Textarea
                  rows={6}
                  value={state.gbp.description}
                  onChange={(e) => patch({ gbp: { ...state.gbp, description: e.target.value } })}
                />
              </div>

              {gbpIssues.length === 0 ? (
                <p className="flex items-center gap-2 text-sm text-emerald-600">
                  <CheckCircle2 className="h-4 w-4" /> Conteúdo aprovado para publicação.
                </p>
              ) : (
                <ul className="space-y-1 text-sm">
                  {gbpIssues.map((i, k) => (
                    <li
                      key={k}
                      className={`flex items-start gap-2 ${i.level === "erro" ? "text-destructive" : "text-amber-600"}`}
                    >
                      <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                      <span>
                        <strong>{i.field}</strong>: {i.message}
                      </span>
                    </li>
                  ))}
                </ul>
              )}

              <Button
                variant="outline"
                onClick={() =>
                  downloadFile(
                    "google-business-profile.txt",
                    [
                      `Nome: ${state.gbp.name}`,
                      `Categoria principal: ${state.gbp.primaryCategory}`,
                      `Categorias secundárias: ${state.gbp.secondaryCategories}`,
                      `Serviços: ${state.gbp.services}`,
                      "",
                      "Descrição:",
                      state.gbp.description,
                    ].join("\n"),
                    "text/plain",
                  )
                }
              >
                <Download className="mr-2 h-4 w-4" /> Exportar para colar no GBP
              </Button>
            </Card>
          </TabsContent>

          {/* ───────── Provas ───────── */}
          <TabsContent value="provas" className="space-y-6">
            <Card className="p-4">
              <h2 className="mb-1 text-lg font-bold">
                Shot list ({shotsDone}/{SHOT_LIST.length})
              </h2>
              <p className="mb-3 text-sm text-muted-foreground">
                Fotos reais de bancada e processo. Nada de tutoria perigosa.
              </p>
              <ul className="space-y-2">
                {SHOT_LIST.map((s) => (
                  <li key={s.id} className="flex items-start gap-3 rounded-md border border-border p-2">
                    <input
                      type="checkbox"
                      className="mt-1 h-4 w-4"
                      checked={Boolean(state.shots[s.id])}
                      onChange={(e) => patch({ shots: { ...state.shots, [s.id]: e.target.checked } })}
                      aria-label={s.label}
                    />
                    <span>
                      <span className="block text-sm font-medium">{s.label}</span>
                      <span className="block text-xs text-muted-foreground">{s.hint}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="p-4">
              <h2 className="mb-1 text-lg font-bold">
                Revisão de privacidade ({privacyDone}/{PRIVACY_CHECKS.length})
              </h2>
              <p className={`mb-3 text-sm ${privacyReady ? "text-emerald-600" : "text-amber-600"}`}>
                {privacyReady
                  ? "Liberado para publicar as provas."
                  : "Conclua todos os itens antes de publicar qualquer foto ou vídeo."}
              </p>
              <ul className="space-y-2">
                {PRIVACY_CHECKS.map((s) => (
                  <li key={s.id} className="flex items-start gap-3 rounded-md border border-border p-2">
                    <input
                      type="checkbox"
                      className="mt-1 h-4 w-4"
                      checked={Boolean(state.privacy[s.id])}
                      onChange={(e) => patch({ privacy: { ...state.privacy, [s.id]: e.target.checked } })}
                      aria-label={s.label}
                    />
                    <span>
                      <span className="block text-sm font-medium">{s.label}</span>
                      <span className="block text-xs text-muted-foreground">{s.hint}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="space-y-4 p-4">
              <h2 className="text-lg font-bold">Manifesto das provas</h2>
              {state.evidence.length === 0 ? (
                <p className="text-sm text-muted-foreground">Nenhuma prova registrada ainda.</p>
              ) : null}
              {state.evidence.map((item, idx) => {
                const errs = validateEvidence(item);
                return (
                  <div key={item.id} className="space-y-3 rounded-md border border-border p-3">
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div>
                        <Label>Data</Label>
                        <Input type="date" value={item.date} onChange={(e) => updateEvidence(idx, "date", e.target.value)} />
                      </div>
                      <div>
                        <Label>Equipamento</Label>
                        <Input value={item.equipment} onChange={(e) => updateEvidence(idx, "equipment", e.target.value)} />
                      </div>
                      <div>
                        <Label>Etapa</Label>
                        <select
                          className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                          value={item.stage}
                          onChange={(e) => updateEvidence(idx, "stage", e.target.value as EvidenceStage)}
                        >
                          {EVIDENCE_STAGES.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <Label>Privacidade</Label>
                        <select
                          className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                          value={item.privacy}
                          onChange={(e) => updateEvidence(idx, "privacy", e.target.value as EvidencePrivacy)}
                        >
                          {EVIDENCE_PRIVACY.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="sm:col-span-2">
                        <Label>Legenda factual</Label>
                        <Textarea rows={2} value={item.caption} onChange={(e) => updateEvidence(idx, "caption", e.target.value)} />
                      </div>
                      <div className="sm:col-span-2">
                        <Label>Arquivo (nome/referência)</Label>
                        <Input value={item.file} onChange={(e) => updateEvidence(idx, "file", e.target.value)} />
                      </div>
                    </div>
                    {errs.length > 0 ? (
                      <ul className="space-y-1 text-sm text-destructive">
                        {errs.map((e, k) => (
                          <li key={k} className="flex items-start gap-2">
                            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" /> {e}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="flex items-center gap-2 text-sm text-emerald-600">
                        <CheckCircle2 className="h-4 w-4" /> Pronta para o manifesto.
                      </p>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => patch({ evidence: state.evidence.filter((_, i) => i !== idx) })}
                    >
                      <Trash2 className="mr-2 h-4 w-4" /> Remover
                    </Button>
                  </div>
                );
              })}

              <div className="flex flex-wrap gap-2">
                <Button variant="outline" onClick={() => patch({ evidence: [...state.evidence, newEvidence()] })}>
                  <Plus className="mr-2 h-4 w-4" /> Nova prova
                </Button>
                <Button
                  variant="outline"
                  disabled={state.evidence.length === 0}
                  onClick={() => downloadFile("manifesto-provas.csv", evidenceToCsv(state.evidence), "text/csv")}
                >
                  <Download className="mr-2 h-4 w-4" /> Exportar CSV
                </Button>
                <Button
                  variant="outline"
                  disabled={state.evidence.length === 0}
                  onClick={() =>
                    downloadFile("manifesto-provas.json", JSON.stringify(state.evidence, null, 2), "application/json")
                  }
                >
                  <Download className="mr-2 h-4 w-4" /> Exportar JSON
                </Button>
              </div>
            </Card>
          </TabsContent>

          {/* ───────── Modelo operacional ───────── */}
          <TabsContent value="modelo" className="space-y-4">
            <Card className="space-y-4 p-4">
              <div>
                <Label>Modelo declarado</Label>
                <select
                  className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                  value={state.businessModel.model}
                  onChange={(e) =>
                    patch({ businessModel: { ...state.businessModel, model: e.target.value as BusinessModel } })
                  }
                >
                  {(Object.keys(BUSINESS_MODEL_LABELS) as BusinessModel[]).map((m) => (
                    <option key={m} value={m}>
                      {BUSINESS_MODEL_LABELS[m]}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <p className="mb-2 text-sm font-semibold">Requisitos obrigatórios deste modelo</p>
                <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                  {BUSINESS_MODEL_REQUIREMENTS[state.businessModel.model].map((r) => (
                    <li key={r}>{r}</li>
                  ))}
                </ul>
              </div>

              <div>
                <Label>Justificativa</Label>
                <Textarea
                  rows={3}
                  value={state.businessModel.justification}
                  onChange={(e) => patch({ businessModel: { ...state.businessModel, justification: e.target.value } })}
                />
              </div>
              <div>
                <Label>Evidências e links (um por linha)</Label>
                <Textarea
                  rows={4}
                  value={state.businessModel.evidenceLinks}
                  onChange={(e) => patch({ businessModel: { ...state.businessModel, evidenceLinks: e.target.value } })}
                />
              </div>
              <div>
                <Label>Revisado em</Label>
                <Input
                  type="date"
                  value={state.businessModel.reviewedAt}
                  onChange={(e) => patch({ businessModel: { ...state.businessModel, reviewedAt: e.target.value } })}
                />
              </div>

              <Button
                variant="outline"
                onClick={() =>
                  downloadFile(
                    "modelo-operacional.md",
                    [
                      "# Modelo operacional",
                      "",
                      `**Modelo:** ${BUSINESS_MODEL_LABELS[state.businessModel.model]}`,
                      `**Revisado em:** ${state.businessModel.reviewedAt || "—"}`,
                      "",
                      "## Requisitos",
                      ...BUSINESS_MODEL_REQUIREMENTS[state.businessModel.model].map((r) => `- ${r}`),
                      "",
                      "## Justificativa",
                      state.businessModel.justification,
                      "",
                      "## Evidências",
                      state.businessModel.evidenceLinks || "—",
                    ].join("\n"),
                    "text/markdown",
                  )
                }
              >
                <Download className="mr-2 h-4 w-4" /> Exportar Markdown
              </Button>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </>
  );
}
