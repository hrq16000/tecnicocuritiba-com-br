import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  MessageCircle,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Lock,
} from "lucide-react";
import { trackCTAClick } from "@/lib/analytics";
import {
  trackFunnelOpen,
  trackFunnelStep,
  trackFunnelSubmit,
  trackFunnelClose,
  trackFunnelBlocked,
} from "@/lib/funnelAnalytics";
import { appendUtmsToUrl, captureUtmsFromUrl } from "@/lib/utmCapture";
import {
  EQUIPMENT_BRANCHES,
  getBranch,
  getSintoma,
  resolveRoute,
  type Equipment,
  type ServiceRoute,
} from "@/components/funnel/equipmentBranches";
import { ColetaRequiredCard } from "@/components/funnel/ColetaRequiredCard";
import { getSessionId, recordSubmission } from "@/lib/funnelSubmission";
import { withVideoWarning } from "@/lib/funnelWarning";
import { bipAndAttention } from "@/lib/attentionBip";
import { logFunnelDiag } from "@/lib/funnelDiagnostics";


const WHATSAPP_NUMBER = "5541997452053";
const WA_HOSTS = ["wa.me", "api.whatsapp.com"];
// Persistência do progresso do funil — sobrevive a reloads e retorno do WhatsApp.
// v6: nova estrutura de sintomas com metadados (route/eventual/intermittent).
// Qualquer estado anterior é descartado silenciosamente para evitar renders
// contra sintomas que deixaram de existir (causa raiz da tela de erro anterior).
const STORAGE_KEY = "wa_funnel_state_v6";
const LEGACY_KEYS = ["wa_funnel_answers_v4", "wa_funnel_state_v5"];

type PersistedState = {
  answers: Answers;
  step: number;
  originLocation: string;
  updatedAt: number;
};
// Se o progresso for mais antigo que isso, descarta (evita rehidratar semanas depois).
const MAX_STATE_AGE_MS = 1000 * 60 * 60 * 24 * 3; // 3 dias


interface Answers {
  equipamento: Equipment | null;
  marca: string;
  sintoma: string;          // id do sintoma
  coletaAccepted: boolean;
  minimumAccepted: boolean;
  descricao: string;
  // Campos específicos do branch "Outro"
  outroEquipamento: string;
  outroProblema: string;
  outroIdade: string;
  // Contexto detalhado (Etapa 2 — sempre visível)
  ctxQuando: string;     // ex: "Hoje", "Ontem", "Última semana", "Mais de 1 mês", "Sempre foi assim"
  ctxFrequencia: string; // ex: "Todo momento", "Só às vezes", "Só ao ligar", "Sob calor / uso pesado"
  ctxTentou: string;     // ex: "Nada", "Reiniciei", "Formatei", "Já foi em outra assistência"
  ctxUrgencia: string;   // ex: "Próximas 72 horas úteis (3 dias úteis)", "Esta semana", "Sem pressa"
}

const EMPTY: Answers = {
  equipamento: null,
  marca: "",
  sintoma: "",
  coletaAccepted: false,
  minimumAccepted: false,
  descricao: "",
  outroEquipamento: "",
  outroProblema: "",
  outroIdade: "",
  ctxQuando: "",
  ctxFrequencia: "",
  ctxTentou: "",
  ctxUrgencia: "",
};





function isWhatsAppHref(href: string | null): boolean {
  if (!href) return false;
  try {
    const u = new URL(href, window.location.origin);
    return WA_HOSTS.some((h) => u.hostname.endsWith(h));
  } catch {
    return false;
  }
}

function appendUtms(url: URL) {
  appendUtmsToUrl(url);
  if (!url.searchParams.has("utm_medium") || url.searchParams.get("utm_medium") === "organic") {
    url.searchParams.set("utm_medium", "funnel");
  }
  if (!url.searchParams.has("utm_campaign")) {
    const path = window.location.pathname.replace(/^\/+|\/+$/g, "") || "home";
    url.searchParams.set("utm_campaign", path.replace(/\//g, "_").slice(0, 80));
  }
}

function buildMessage(a: Answers): string {
  const branch = a.equipamento ? getBranch(a.equipamento) : undefined;
  const sintoma = a.equipamento && a.sintoma ? getSintoma(a.equipamento, a.sintoma) : undefined;
  const isOutro = a.equipamento === "outro";
  const lines: string[] = [];
  lines.push("Olá! Triagem completa pelo site Técnico em Curitiba ✅");
  lines.push("");
  lines.push(`🔧 *Equipamento:* ${branch?.emoji ?? ""} ${branch?.label ?? "Não informado"}`);
  if (isOutro) {
    if (a.outroEquipamento.trim()) lines.push(`• Qual equipamento: ${a.outroEquipamento.trim()}`);
    if (a.outroProblema.trim()) lines.push(`• O que aconteceu: ${a.outroProblema.trim()}`);
    if (a.outroIdade.trim()) lines.push(`• Idade do equipamento: ${a.outroIdade.trim()}`);
  } else {
    if (a.marca) lines.push(`• Marca/tipo: ${a.marca}`);
    if (sintoma) lines.push(`• Sintoma: ${sintoma.label}`);
  }
  // Contexto detalhado (Etapa 2)
  const ctx: string[] = [];
  if (a.ctxQuando) ctx.push(`quando começou: *${a.ctxQuando}*`);
  if (a.ctxFrequencia) ctx.push(`frequência: *${a.ctxFrequencia}*`);
  if (a.ctxTentou) ctx.push(`já tentou: *${a.ctxTentou}*`);
  if (a.ctxUrgencia) ctx.push(`urgência: *${a.ctxUrgencia}*`);
  if (ctx.length) {
    lines.push("");
    lines.push("🧭 *Contexto:*");
    ctx.forEach((c) => lines.push(`• ${c}`));
  }
  if (sintoma?.requiresColeta) {
    lines.push("");
    lines.push("📦 *Modalidade: COLETA E ENTREGA (obrigatória)*");
    lines.push("• Mínimo R$ 300 (diagnóstico incluso) · desistiu paga só R$ 99,99");
    lines.push("• Autorizado pelo cliente no funil");
  }
  lines.push("");
  lines.push("💰 *Valor mínimo:* cliente confirmou ciência do mínimo de R$ 99,99 para atendimento/visita.");
  if (a.descricao.trim()) {
    lines.push("");
    lines.push(`📝 ${a.descricao.trim()}`);
  }
  lines.push("");
  lines.push("— Estou ciente das políticas e termos: tecnicocuritiba.com.br/termos-e-condicoes");
  // Garante o aviso obrigatório no final, vindo da fonte única (`funnelWarning.ts`).
  return withVideoWarning(lines.join("\n"));
}


const TransparencyMini = () => (
  <div className="rounded-lg border border-border bg-card/50 p-2.5 text-[11px] text-muted-foreground leading-snug">
    <p>
      💡 <strong>Como funciona:</strong> orçamento grátis por WhatsApp · visita técnica a partir de R$ 99,99 (30 min)
      · reparos com coleta a partir de R$ 300 · diagnóstico R$ 99,99 se desistir.
    </p>
  </div>
);

export const WhatsAppFunnel = () => {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>(EMPTY);
  const [originLocation, setOriginLocation] = useState("cta");
  const [presetMessage, setPresetMessage] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const submittingRef = useRef(false);
  const lastSubmitAtRef = useRef(0);
  const sessionId = useMemo(() => getSessionId(), []);

  // Restore cached state (answers + step + origem). Descarta se antigo demais.
  useEffect(() => {
    try {
      // Chaves legadas apenas removidas — as estruturas antigas de sintomas
      // podem apontar para ids que não existem mais e provocariam render vazio.
      LEGACY_KEYS.forEach((k) => {
        try { localStorage.removeItem(k); } catch { /* noop */ }
      });

      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as PersistedState;
      if (!parsed || typeof parsed !== "object") return;
      if (parsed.updatedAt && Date.now() - parsed.updatedAt > MAX_STATE_AGE_MS) {
        localStorage.removeItem(STORAGE_KEY);
        return;
      }
      if (parsed.answers) setAnswers({ ...EMPTY, ...parsed.answers });
      if (typeof parsed.step === "number") setStep(Math.min(Math.max(parsed.step, 0), 4));
      if (parsed.originLocation) setOriginLocation(parsed.originLocation);
    } catch { /* noop */ }
  }, []);

  const persist = useCallback((patch: Partial<PersistedState>) => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const prev: PersistedState = raw
        ? (JSON.parse(raw) as PersistedState)
        : { answers: EMPTY, step: 0, originLocation: "cta", updatedAt: Date.now() };
      const next: PersistedState = { ...prev, ...patch, updatedAt: Date.now() };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch { /* noop */ }
  }, []);

  const update = useCallback((patch: Partial<Answers>) => {
    setAnswers((prev) => {
      const next = { ...prev, ...patch };
      persist({ answers: next });
      return next;
    });
  }, [persist]);

  const lastOpenRef = useRef(0);
  const openFunnel = useCallback((loc: string, preset?: string) => {
    const now = Date.now();
    if (now - lastOpenRef.current < 600) return; // dedup: evita 2 quizzes
    lastOpenRef.current = now;
    setOriginLocation(loc);
    setPresetMessage(preset ?? null);
    setOpen(true);
    persist({ originLocation: loc });
    captureUtmsFromUrl();
    trackFunnelOpen(loc, !!preset);
    logFunnelDiag("open", { location: loc, hasPreset: !!preset });
  }, [persist]);


  // Global click interception for any WhatsApp anchor
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (submittingRef.current) return;
      const target = e.target as HTMLElement | null;
      const a = target?.closest("a") as HTMLAnchorElement | null;
      if (!a) return;
      const href = a.getAttribute("href");
      if (!isWhatsAppHref(href)) return;
      if (a.dataset.funnelSkip === "1") return;

      e.preventDefault();
      e.stopPropagation();

      let loc = "cta";
      const ctaLoc = a.closest<HTMLElement>("[data-cta-location]")?.dataset.ctaLocation;
      if (ctaLoc) loc = ctaLoc;
      else if (a.closest("header")) loc = "header";
      else if (a.closest("footer")) loc = "footer";
      else if (a.closest("[data-wa-medium]")) loc = (a.closest("[data-wa-medium]") as HTMLElement).dataset.waMedium || "cta";
      else if (a.getAttribute("aria-label")?.toLowerCase().includes("whatsapp")) loc = "float";

      let preset: string | undefined;
      try {
        const u = new URL(href!, window.location.origin);
        preset = u.searchParams.get("text") || undefined;
      } catch { /* noop */ }

      trackCTAClick("whatsapp", loc);
      openFunnel(loc, preset);
    };
    document.addEventListener("click", handler, true);

    const evHandler = (e: Event) => {
      const detail = (e as CustomEvent<{ location?: string; message?: string }>).detail || {};
      const loc = detail.location || "programmatic";
      trackCTAClick("whatsapp", loc);
      openFunnel(loc, detail.message);
    };
    window.addEventListener("wa-funnel:open", evHandler as EventListener);

    const originalOpen = window.open.bind(window);
    window.open = ((url?: string | URL, target?: string, features?: string) => {
      try {
        if (submittingRef.current) return originalOpen(url, target, features);
        const href = typeof url === "string" ? url : url?.toString();
        if (href && isWhatsAppHref(href)) {
          let preset: string | undefined;
          try {
            const u = new URL(href, window.location.origin);
            preset = u.searchParams.get("text") || undefined;
          } catch { /* noop */ }
          const trackedLocation = window.__lastCtaType === "whatsapp" ? window.__lastCtaLocation : undefined;
          const loc = trackedLocation || "programmatic";
          trackCTAClick("whatsapp", loc);
          openFunnel(loc, preset);
          return null;
        }
      } catch { /* fall through */ }
      return originalOpen(url, target, features);
    }) as typeof window.open;

    return () => {
      document.removeEventListener("click", handler, true);
      window.removeEventListener("wa-funnel:open", evHandler as EventListener);
      window.open = originalOpen;
    };
  }, [openFunnel]);

  useEffect(() => {
    if (!open) return;
    trackFunnelStep(step, answers.equipamento, answers.sintoma, originLocation);
    logFunnelDiag("step", { equipamento: answers.equipamento, sintoma: answers.sintoma }, step);
  }, [open, step, answers.equipamento, answers.sintoma, originLocation]);


  // Sinaliza abertura via atributo no body para que floats/sticky se escondam.
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (open) document.body.setAttribute("data-funnel-open", "1");
    else document.body.removeAttribute("data-funnel-open");
    return () => document.body.removeAttribute("data-funnel-open");
  }, [open]);

  // ---------- Derivations ----------
  const branch = answers.equipamento ? getBranch(answers.equipamento) : undefined;
  const sintomaObj = answers.equipamento && answers.sintoma
    ? getSintoma(answers.equipamento, answers.sintoma)
    : undefined;
  const requiresColeta = !!sintomaObj?.requiresColeta;
  const isOutro = answers.equipamento === "outro";

  // Selector de campos a "pulsar" quando o usuário tenta avançar sem preencher.
  const attentionSelector = useCallback((s: number): string | null => {
    if (s === 0) return "[data-funnel-field='equipamento']";
    if (s === 1) {
      if (isOutro) {
        if (!answers.outroEquipamento.trim()) return "[data-funnel-field='outro-equipamento']";
        if (!answers.outroProblema.trim()) return "[data-funnel-field='outro-problema']";
        if (!answers.outroIdade.trim()) return "[data-funnel-field='outro-idade']";
        return null;
      }
      if (!answers.marca) return "[data-funnel-field='marca']";
      if (!answers.sintoma) return "[data-funnel-field='sintoma']";
      return null;
    }
    if (s === 2) {
      if (!answers.ctxQuando) return "[data-funnel-field='ctx-quando']";
      if (!answers.ctxFrequencia) return "[data-funnel-field='ctx-frequencia']";
      if (!answers.ctxTentou) return "[data-funnel-field='ctx-tentou']";
      if (!answers.ctxUrgencia) return "[data-funnel-field='ctx-urgencia']";
      return null;
    }
    if (s === 3) return requiresColeta && !answers.coletaAccepted ? "[data-funnel-field='coleta']" : null;
    if (s === 4) return !answers.minimumAccepted ? "[data-funnel-field='minimum']" : null;
    return null;
  }, [
    answers.marca,
    answers.sintoma,
    answers.outroEquipamento,
    answers.outroProblema,
    answers.outroIdade,
    answers.ctxQuando,
    answers.ctxFrequencia,
    answers.ctxTentou,
    answers.ctxUrgencia,
    answers.coletaAccepted,
    answers.minimumAccepted,
    isOutro,
    requiresColeta,
  ]);

  const attemptAdvance = useCallback((s: number) => {
    const sel = attentionSelector(s);
    if (sel) bipAndAttention(sel);
  }, [attentionSelector]);

  // ---------- Navigation ----------
  // 5 steps SEM saltos: 0 equip, 1 marca/sintoma (ou "outro"), 2 contexto detalhado,
  // 3 modalidade/coleta (sempre exibido), 4 confirmação final.
  const TOTAL_STEPS = 5;
  /** Validação por etapa — fonte única de verdade para botão e guard de submit. */
  const validateStep = useCallback((s: number): { ok: true } | { ok: false; reason: string } => {
    if (s === 0) {
      return answers.equipamento ? { ok: true } : { ok: false, reason: "Selecione o equipamento." };
    }
    if (s === 1) {
      if (isOutro) {
        if (answers.outroEquipamento.trim().length < 2) return { ok: false, reason: "Informe qual o equipamento." };
        if (answers.outroProblema.trim().length < 5) return { ok: false, reason: "Conte brevemente o que aconteceu." };
        if (!answers.outroIdade.trim()) return { ok: false, reason: "Informe a idade aproximada do equipamento." };
        return { ok: true };
      }
      if (!answers.marca) return { ok: false, reason: "Selecione a marca/tipo." };
      if (!answers.sintoma) return { ok: false, reason: "Selecione o problema." };
      return { ok: true };
    }
    if (s === 2) {
      if (!answers.ctxQuando) return { ok: false, reason: "Diga quando o problema começou." };
      if (!answers.ctxFrequencia) return { ok: false, reason: "Diga com que frequência acontece." };
      if (!answers.ctxTentou) return { ok: false, reason: "Diga se já tentou alguma coisa." };
      if (!answers.ctxUrgencia) return { ok: false, reason: "Informe a urgência." };
      return { ok: true };
    }
    if (s === 3) {
      if (requiresColeta && !answers.coletaAccepted) {
        return { ok: false, reason: "Aceite a modalidade Coleta e Entrega para continuar." };
      }
      return { ok: true };
    }
    if (s === 4) {
      return answers.minimumAccepted
        ? { ok: true }
        : { ok: false, reason: "Confirme ciência do valor mínimo de R$ 99,99." };
    }
    return { ok: true };
  }, [answers, isOutro, requiresColeta]);

  const canAdvance = useMemo(() => validateStep(step).ok, [validateStep, step]);

  /**
   * Avança para o próximo step. Sem saltos — TODAS as etapas são exibidas para
   * todos os fluxos. A etapa 3 (modalidade) troca de conteúdo conforme houver
   * ou não `requiresColeta`; a etapa 2 (contexto) é sempre igual.
   */
  const next = () => setStep((s) => {
    const n = Math.min(s + 1, TOTAL_STEPS - 1);
    persist({ step: n });
    return n;
  });
  const back = () => setStep((s) => {
    const n = Math.max(s - 1, 0);
    persist({ step: n });
    return n;
  });

  const reset = () => {
    setAnswers(EMPTY);
    setStep(0);
    persist({ answers: EMPTY, step: 0 });
    logFunnelDiag("reset");
  };


  // ---------- Auto-advance + foco no próximo campo ----------
  // Snapshot das respostas ao entrar em cada step: só auto-avança se o usuário
  // efetivamente interagiu (evita pular etapa 3 sem coleta ao chegar nela).
  const stepEntryRef = useRef<string>("");
  useEffect(() => {
    if (!open) return;
    stepEntryRef.current = JSON.stringify(answers);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, open]);

  // Auto-advance com pulso quando o step fica válido após interação do usuário.
  useEffect(() => {
    if (!open) return;
    if (step === 0) return; // step 0 já auto-avança no clique do equipamento
    if (step >= TOTAL_STEPS - 1) return; // etapa final envia manualmente
    if (!canAdvance) return;
    // Só auto-avança se algo mudou desde a entrada nesta etapa.
    if (JSON.stringify(answers) === stepEntryRef.current) return;

    const dialogEl = document.querySelector<HTMLElement>('[role="dialog"]');
    dialogEl?.classList.add("wa-attention");
    const t = window.setTimeout(() => {
      dialogEl?.classList.remove("wa-attention");
      setStep((s) => Math.min(s + 1, TOTAL_STEPS - 1));
    }, 420);
    return () => {
      window.clearTimeout(t);
      dialogEl?.classList.remove("wa-attention");
    };
  }, [open, step, canAdvance, answers]);

  // Move o foco visual para o próximo campo faltante ao interagir.
  useEffect(() => {
    if (!open) return;
    const sel = attentionSelector(step);
    if (!sel) return;
    const el = document.querySelector<HTMLElement>(sel);
    if (!el) return;
    el.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [open, step, answers, attentionSelector]);




  const submit = useCallback(async () => {
    // Bloqueio anti-duplo-clique: usa ref para evitar corrida com o setState.
    const now = Date.now();
    if (submittingRef.current) {
      logFunnelDiag("submit_blocked_reentrant", { sinceLast: now - lastSubmitAtRef.current });
      return;
    }
    if (now - lastSubmitAtRef.current < 1500) {
      logFunnelDiag("submit_blocked_debounce", { sinceLast: now - lastSubmitAtRef.current });
      return;
    }
    lastSubmitAtRef.current = now;
    submittingRef.current = true;
    setSubmitting(true);
    logFunnelDiag("submit_start", { origin: originLocation, step });

    try {
      // Guard final: revalida TODAS as etapas antes de liberar o WhatsApp
      for (const s of [0, 1, 2, 3, 4]) {
        const v = validateStep(s);
        if (!v.ok) {
          trackFunnelBlocked(`submit_invalid_step_${s}`, answers.equipamento);
          logFunnelDiag("submit_invalid", { step: s, reason: "reason" in v ? v.reason : "" });
          setStep(s);
          persist({ step: s });
          // Feedback UX: bip + pulse no campo faltante da etapa que falhou.
          setTimeout(() => {
            const sel = attentionSelector(s);
            if (sel) bipAndAttention(sel);
          }, 30);
          return;
        }
      }

      const baseMessage = buildMessage(answers);
      // Mesmo com preset (mensagem vinda de outro CTA), o aviso obrigatório
      // sempre fica no final via `withVideoWarning`.
      const finalMessage = withVideoWarning(
        presetMessage ? `${presetMessage}\n\n---\n${baseMessage}` : baseMessage,
      );

      try {
        await recordSubmission({
          sessionId,
          equipamento: branch?.label,
          marca: answers.marca,
          sintoma: sintomaObj?.label,
          requiresColeta,
          minimumAccepted: answers.minimumAccepted,
          ctaLocation: originLocation,
          waMessage: finalMessage,
        });
      } catch (err) {
        // eslint-disable-next-line no-console
        console.warn("[funnel] submission insert failed", err);
        trackFunnelBlocked("insert_failed", answers.equipamento);
        logFunnelDiag("submit_insert_failed", { error: String(err) });
      }

      const url = new URL(`https://wa.me/${WHATSAPP_NUMBER}`);
      url.searchParams.set("text", finalMessage);
      appendUtms(url);

      trackFunnelSubmit({
        ctaLocation: originLocation,
        equipamento: answers.equipamento,
        sintoma: answers.sintoma,
        requiresColeta,
        mediaCount: 0,
        minimumAccepted: answers.minimumAccepted,
      });
      trackCTAClick("whatsapp", `funnel_${originLocation}`);
      logFunnelDiag("submit_ok", { origin: originLocation });

      window.open(url.toString(), "_blank", "noopener,noreferrer");
      setOpen(false);
      // Após enviar, limpa progresso persistido — próxima abertura começa do zero.
      setAnswers(EMPTY);
      setStep(0);
      try { localStorage.removeItem(STORAGE_KEY); } catch { /* noop */ }
      // Redireciona a aba atual para a página de confirmação — dá contexto
      // caso o usuário volte, e é onde o GA4 registra o funil completo.
      try {
        const url2 = new URL("/obrigado", window.location.origin);
        url2.searchParams.set("origem", originLocation);
        window.history.pushState({}, "", url2.pathname + url2.search);
        window.dispatchEvent(new PopStateEvent("popstate"));
      } catch (err) {
        logFunnelDiag("submit_nav_failed", { error: String(err) });
      }
    } catch (err) {
      // Nunca deixa uma exceção estourar do handler e disparar o ErrorBoundary
      // (era uma das causas do "reset" percebido do funil).
      // eslint-disable-next-line no-console
      console.error("[funnel] submit failed", err);
      logFunnelDiag("submit_exception", { error: String(err) });
    } finally {
      setSubmitting(false);
      setTimeout(() => { submittingRef.current = false; }, 400);
    }
  }, [answers, branch, sintomaObj, requiresColeta, originLocation, presetMessage, sessionId, validateStep, attentionSelector, persist, step]);


  const handleOpenChange = (v: boolean) => {
    if (!v) trackFunnelClose(step, answers.equipamento);
    setOpen(v);
  };

  // ---------- UI ----------
  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto p-3 sm:p-5 gap-2">
        <DialogHeader className="space-y-0.5">
          <DialogTitle className="flex items-center gap-2 text-base sm:text-lg">
            <Lock className="h-4 w-4 text-primary" />
            Triagem — {step + 1}/{TOTAL_STEPS}
          </DialogTitle>
          <DialogDescription className="text-[11px] sm:text-xs">
            O WhatsApp humano abre <strong>após a triagem</strong>. Seg–Sáb · 08h–20h · resposta em ~30 min.
          </DialogDescription>
        </DialogHeader>

        {/* Progress */}
        <div className="flex gap-1">
          {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full transition-colors ${i <= step ? "bg-primary" : "bg-muted"}`}
            />
          ))}
        </div>

        {/* Step 0 — equipamento */}
        {step === 0 && (
          <div className="space-y-2.5">
            <TransparencyMini />
            <p className="text-sm font-medium">1. Qual o equipamento?</p>
            <div className="grid grid-cols-2 gap-2" data-funnel-field="equipamento">
              {EQUIPMENT_BRANCHES.map((b) => (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => { update({ equipamento: b.id, marca: "", sintoma: "" }); next(); }}
                  className={`text-left p-2.5 rounded-lg border transition-colors ${
                    answers.equipamento === b.id
                      ? "border-primary bg-accent/10"
                      : "border-border bg-card hover:border-primary/60"
                  }`}
                >
                  <p className="text-xl leading-none">{b.emoji}</p>
                  <p className="text-[13px] font-semibold mt-1">{b.label}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 1 — marca + sintoma (ou descrição livre para "outro") */}
        {step === 1 && branch && (
          <div className="space-y-2.5">
            {isOutro ? (
              <div className="space-y-2.5">
                <div>
                  <p className="text-sm font-medium mb-1.5">Qual é o equipamento?</p>
                  <input
                    data-funnel-field="outro-equipamento"
                    type="text"
                    className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Ex: micro-ondas, drone, projetor…"
                    value={answers.outroEquipamento}
                    maxLength={80}
                    onChange={(e) => update({ outroEquipamento: e.target.value })}
                  />
                </div>
                <div>
                  <p className="text-sm font-medium mb-1.5">O que aconteceu?</p>
                  <Textarea
                    data-funnel-field="outro-problema"
                    rows={3}
                    placeholder="Conte o defeito e quando começou…"
                    value={answers.outroProblema}
                    maxLength={400}
                    onChange={(e) => update({ outroProblema: e.target.value })}
                  />
                </div>
                <div>
                  <p className="text-sm font-medium mb-1.5">Quantos anos tem o equipamento?</p>
                  <div className="flex flex-wrap gap-1.5" data-funnel-field="outro-idade">
                    {["< 1 ano", "1–3 anos", "3–5 anos", "5–10 anos", "10+ anos", "Não sei"].map((idade) => (
                      <button
                        key={idade}
                        type="button"
                        onClick={() => update({ outroIdade: idade })}
                        className={`px-2.5 py-1 rounded-full text-xs font-medium border transition-colors ${
                          answers.outroIdade === idade
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border bg-card hover:border-primary/60"
                        }`}
                      >
                        {idade}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="rounded-lg border border-amber-500/40 bg-amber-500/10 p-2.5 text-[11px] leading-snug">
                  💰 <strong>Valor mínimo R$ 99,99</strong> para qualquer atendimento/serviço — inclusive orçamento fora do padrão. Reparos com coleta a partir de R$ 300.
                </div>
              </div>
            ) : (
              <>
                <div>
                  <p className="text-sm font-medium mb-1.5">{branch.marcaLabel}</p>
                  <div className="flex flex-wrap gap-1.5" data-funnel-field="marca">
                    {branch.marcaOptions.map((m) => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => update({ marca: m })}
                        className={`px-2.5 py-1 rounded-full text-xs font-medium border transition-colors ${
                          answers.marca === m
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border bg-card hover:border-primary/60"
                        }`}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium mb-1.5">Qual é o problema?</p>
                  <div className="grid gap-1.5" data-funnel-field="sintoma">
                    {branch.sintomas.map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => update({ sintoma: s.id })}
                        className={`text-left p-2 rounded-lg border text-sm flex items-center justify-between gap-2 transition-colors ${
                          answers.sintoma === s.id
                            ? "border-primary bg-accent/10"
                            : "border-border bg-card hover:border-primary/60"
                        }`}
                      >
                        <span>{s.label}</span>
                        {s.requiresColeta && (
                          <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-700 dark:text-amber-300 flex-shrink-0">
                            COLETA
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
            <FunnelNav onBack={back} onNext={next} canNext={canAdvance} onAttempt={() => attemptAdvance(1)} />
          </div>
        )}

        {/* Step 2 — Contexto detalhado (SEMPRE exibido) */}
        {step === 2 && (
          <div className="space-y-2.5">
            <p className="text-sm font-medium">3. Conte um pouco mais — assim resolvemos mais rápido.</p>

            <div>
              <p className="text-xs font-semibold mb-1.5 text-foreground/80">Quando o problema começou?</p>
              <div className="flex flex-wrap gap-1.5" data-funnel-field="ctx-quando">
                {["Hoje", "Ontem", "Última semana", "Este mês", "Mais de 1 mês", "Sempre foi assim"].map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => update({ ctxQuando: v })}
                    className={`px-2.5 py-1 rounded-full text-xs font-medium border transition-colors ${
                      answers.ctxQuando === v
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-card hover:border-primary/60"
                    }`}
                  >{v}</button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold mb-1.5 text-foreground/80">Com que frequência acontece?</p>
              <div className="flex flex-wrap gap-1.5" data-funnel-field="ctx-frequencia">
                {["O tempo todo", "Só às vezes", "Só ao ligar", "Sob calor / uso pesado", "Aleatório"].map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => update({ ctxFrequencia: v })}
                    className={`px-2.5 py-1 rounded-full text-xs font-medium border transition-colors ${
                      answers.ctxFrequencia === v
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-card hover:border-primary/60"
                    }`}
                  >{v}</button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold mb-1.5 text-foreground/80">Já tentou alguma coisa?</p>
              <div className="flex flex-wrap gap-1.5" data-funnel-field="ctx-tentou">
                {["Nada ainda", "Reiniciei", "Formatei", "Troquei cabo/carregador", "Já foi em outra assistência"].map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => update({ ctxTentou: v })}
                    className={`px-2.5 py-1 rounded-full text-xs font-medium border transition-colors ${
                      answers.ctxTentou === v
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-card hover:border-primary/60"
                    }`}
                  >{v}</button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold mb-1.5 text-foreground/80">Qual a urgência?</p>
              <div className="flex flex-wrap gap-1.5" data-funnel-field="ctx-urgencia">
                {["Próximas 72 horas úteis (3 dias úteis)", "Esta semana", "Sem pressa"].map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => update({ ctxUrgencia: v })}
                    className={`px-2.5 py-1 rounded-full text-xs font-medium border transition-colors ${
                      answers.ctxUrgencia === v
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-card hover:border-primary/60"
                    }`}
                  >{v}</button>
                ))}
              </div>
            </div>

            <FunnelNav onBack={back} onNext={next} canNext={canAdvance} onAttempt={() => attemptAdvance(2)} />
          </div>
        )}

        {/* Step 3 — Modalidade (SEMPRE exibido; conteúdo condicional) */}
        {step === 3 && (
          <div className="space-y-2.5">
            {requiresColeta && sintomaObj && branch ? (
              <div data-funnel-field="coleta">
                <ColetaRequiredCard
                  equipamento={branch.label}
                  sintoma={sintomaObj.label}
                  accepted={answers.coletaAccepted}
                  onAcceptChange={(v) => update({ coletaAccepted: v })}
                />
              </div>
            ) : (
              <div className="rounded-lg border border-border bg-card/50 p-3 space-y-2 text-[12px] leading-snug">
                <p className="text-sm font-semibold text-foreground">4. Como preferimos atender no seu caso</p>
                <p className="text-foreground/80">
                  Pelo que você descreveu, provavelmente conseguimos resolver por <strong>atendimento remoto</strong> ou{" "}
                  <strong>visita técnica</strong> (mín. R$ 99,99 · 30 min). Se durante o diagnóstico surgir necessidade de bancada,
                  te avisamos antes — nada é feito sem sua autorização.
                </p>
                <ul className="ml-4 list-disc space-y-1 text-foreground/70">
                  <li>Orçamento sempre por WhatsApp, sem surpresa.</li>
                  <li>Peças originais e garantia por escrito.</li>
                  <li>Coleta e Entrega opcional a partir de R$ 300 (se você preferir não receber o técnico).</li>
                </ul>
              </div>
            )}
            <FunnelNav onBack={back} onNext={next} canNext={canAdvance} nextLabel="Continuar" onAttempt={() => attemptAdvance(3)} />
          </div>
        )}

        {/* Step 4 — Confirmação final e envio */}
        {step === 4 && (
          <div className="space-y-2.5">
            <div className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 p-2.5 flex gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 mt-0.5 flex-shrink-0" />
              <div className="text-[11px] leading-snug">
                <p className="font-semibold text-foreground">Triagem completa! 🎉</p>
                <p className="text-foreground/70">
                  Abriremos o WhatsApp com sua triagem. Resposta em ~30 min · Seg–Sáb 08h–20h.
                </p>
              </div>
            </div>

            <div className="rounded-lg border border-border bg-card/50 p-2.5 space-y-0.5 text-[11px] leading-snug">
              {branch && <p>📦 <strong>{branch.label}</strong>{answers.marca ? ` — ${answers.marca}` : ""}</p>}
              {sintomaObj && <p>⚠️ {sintomaObj.label}</p>}
              {answers.ctxQuando && <p>🕒 Começou: {answers.ctxQuando} · {answers.ctxFrequencia}</p>}
              {answers.ctxUrgencia && <p>⚡ Urgência: {answers.ctxUrgencia}</p>}
              {requiresColeta && <p className="text-amber-700 dark:text-amber-400">🚚 Coleta autorizada · mín. R$ 300</p>}
            </div>

            <details className="rounded-lg border border-amber-500/50 bg-amber-500/10 p-2.5 text-[11px] leading-snug group">
              <summary className="cursor-pointer font-bold text-foreground list-none flex items-center justify-between">
                <span>📸 Próximo passo no WhatsApp (obrigatório)</span>
                <span className="text-[10px] text-muted-foreground group-open:hidden">ver</span>
              </summary>
              <p className="text-foreground/80 mt-1.5">
                Envie <strong>fotos do equipamento</strong> (incluindo <strong>etiqueta traseira</strong> com modelo/série) e um
                {" "}<strong>vídeo do defeito acontecendo</strong> — sem áudio, ambiente em silêncio. Sem fotos e vídeo, o atendimento não inicia.
              </p>
            </details>

            <Textarea
              placeholder="Quer acrescentar algo? (opcional)"
              rows={2}
              value={answers.descricao}
              onChange={(e) => update({ descricao: e.target.value })}
              maxLength={500}
              className="text-sm"
            />

            <div className="flex items-start gap-2 rounded-lg border border-amber-500/40 bg-amber-500/10 p-2.5" data-funnel-field="minimum">
              <Checkbox
                id="min-val-confirm"
                checked={answers.minimumAccepted}
                onCheckedChange={(v) => update({ minimumAccepted: !!v })}
                className="mt-0.5"
              />
              <label htmlFor="min-val-confirm" className="cursor-pointer text-[11px] leading-snug text-foreground/85">
                Ciente: valor mínimo <strong>R$ 99,99</strong> · WhatsApp abre após triagem · aceito os
                {" "}<a href="/termos-e-condicoes" className="underline hover:text-foreground" onClick={() => setOpen(false)}>Termos</a>.
              </label>
            </div>

            <div className="flex gap-2 pt-0.5">
              <Button variant="outline" size="sm" onClick={back} className="gap-1 px-2.5" aria-label="Voltar">
                <ArrowLeft className="h-4 w-4" /> <span className="hidden sm:inline">Voltar</span>
              </Button>
              <Button variant="outline" size="sm" onClick={reset} className="px-2.5" aria-label="Recomeçar triagem">
                <span className="sm:hidden">↺</span><span className="hidden sm:inline">Recomeçar</span>
              </Button>
              <Button
                onClick={submit}
                type="button"
                disabled={submitting || !answers.minimumAccepted}
                data-cta-location={`funnel_${originLocation}`}
                data-funnel-submit="1"
                aria-busy={submitting}
                className="ml-auto bg-[hsl(var(--whatsapp))] hover:bg-[hsl(var(--whatsapp-hover))] text-white gap-2 disabled:opacity-70"
              >
                <MessageCircle className={`h-4 w-4 ${submitting ? "animate-pulse" : ""}`} />
                {submitting ? "Abrindo WhatsApp…" : "Agendar agora"}
              </Button>

            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

// ---------- helpers ----------
const FunnelNav = ({
  onBack, onNext, canNext, nextLabel = "Continuar", onAttempt,
}: { onBack: () => void; onNext: () => void; canNext: boolean; nextLabel?: string; onAttempt?: () => void }) => (
  <div className="flex gap-2 pt-1">
    <Button variant="outline" size="sm" onClick={onBack} className="gap-1">
      <ArrowLeft className="h-4 w-4" /> Voltar
    </Button>
    <span
      className="ml-auto"
      onClickCapture={(e) => {
        if (!canNext) {
          e.stopPropagation();
          e.preventDefault();
          onAttempt?.();
        }
      }}
    >
      <Button onClick={onNext} disabled={!canNext} className="gap-1">
        {nextLabel} <ArrowRight className="h-4 w-4" />
      </Button>
    </span>
  </div>
);

// Backward-compat export (alguns componentes legados importam isso)
export const TransparencyNote = ({ className = "" }: { className?: string }) => (
  <p className={`text-xs text-muted-foreground leading-relaxed ${className}`}>
    📌 <strong>Transparência:</strong> orçamento grátis por WhatsApp. Visita técnica a partir de
    {" "}R$ 99,99 (30 min) · diagnóstico R$ 99,99 só se cancelar · reparos com coleta a partir de R$ 300.{" "}
    <a href="/termos-e-condicoes" className="underline hover:text-foreground">Ver termos</a>
  </p>
);

export default WhatsAppFunnel;
