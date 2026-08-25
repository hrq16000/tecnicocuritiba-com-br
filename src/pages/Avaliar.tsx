import { useEffect, useMemo, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { useSearchParams, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Star, Loader2, CheckCircle2 } from "lucide-react";
import { NAP, NAP_PHONE_DIGITS } from "@/lib/nap";

const track = (event: string, params: Record<string, unknown> = {}) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", event, { event_category: "reviews", ...params });
  }
};

/** Chave local de dedupe: 1 avaliação por OS (ou por serviço, sem OS). */
const dedupeKey = (os: string, servico: string) => `rv_sent:${os || servico || "geral"}`;

export default function Avaliar() {
  const [params] = useSearchParams();
  const presetService = params.get("servico") ?? "";
  const presetBairro = params.get("bairro") ?? "";
  const presetOs = params.get("os") ?? "";

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [contact, setContact] = useState("");
  const [neighborhood, setNeighborhood] = useState(presetBairro);
  const [consent, setConsent] = useState(false);
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  /** Honeypot: bots preenchem, humanos não veem. */
  const [website, setWebsite] = useState("");
  const [alreadySent, setAlreadySent] = useState(false);
  const openedAt = useRef<number>(Date.now());

  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem(dedupeKey(presetOs, presetService))) {
      setAlreadySent(true);
    }
    track("review_link_open", {
      utm_source: params.get("utm_source") ?? "direct",
      utm_medium: params.get("utm_medium") ?? "none",
      utm_campaign: params.get("utm_campaign") ?? "none",
      servico: presetService || "nao_informado",
      bairro: presetBairro || "nao_informado",
      os_numero: presetOs || "nao_informado",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const canSubmit = useMemo(
    () =>
      rating >= 1 &&
      name.trim().length >= 2 &&
      comment.trim().length >= 5 &&
      consent &&
      !sending &&
      !alreadySent,
    [rating, name, comment, consent, sending, alreadySent],
  );


  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Honeypot preenchido = bot: finge sucesso e não grava nada.
    if (website.trim()) {
      track("review_spam_blocked", { reason: "honeypot" });
      setDone(true);
      return;
    }
    if (Date.now() - openedAt.current < 4000) {
      track("review_spam_blocked", { reason: "too_fast" });
      toast({
        title: "Só um instante",
        description: "Confira sua avaliação e envie novamente em alguns segundos.",
        variant: "destructive",
      });
      return;
    }
    if (alreadySent) {
      toast({ title: "Avaliação já registrada", description: "Já recebemos sua avaliação para este atendimento." });
      return;
    }
    if (!canSubmit) {
      toast({
        title: "Faltam informações",
        description: "Dê a nota, escreva seu nome, um comentário e autorize a publicação.",
        variant: "destructive",
      });
      return;
    }
    setSending(true);
    const { error } = await supabase.from("reviews").insert({
      author_name: name.trim().slice(0, 80),
      rating,
      comment: comment.trim().slice(0, 2000),
      service_slug: presetService ? presetService.slice(0, 120) : null,
      neighborhood: neighborhood.trim() ? neighborhood.trim().slice(0, 80) : null,
      city: "Curitiba",
      source: "site",
      verified: false,
      published: false,
      publish_consent: consent,
      client_contact: contact.trim() ? contact.trim().slice(0, 120) : null,
    });
    setSending(false);
    if (error) {
      track("review_submit_error", { message: error.message.slice(0, 120) });
      toast({ title: "Não conseguimos enviar", description: "Tente novamente em instantes.", variant: "destructive" });
      return;
    }
    track("review_submit", {
      rating,
      servico: presetService || "nao_informado",
      bairro: neighborhood || "nao_informado",
      os_numero: presetOs || "nao_informado",
    });
    try {
      localStorage.setItem(dedupeKey(presetOs, presetService), String(Date.now()));
    } catch {
      /* storage indisponível: segue o fluxo */
    }
    setAlreadySent(true);
    setDone(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Avaliar atendimento | {NAP.alternateName}</title>
        <meta
          name="description"
          content="Conte como foi o atendimento técnico em Curitiba: dê sua nota de 1 a 5 estrelas e autorize a publicação do seu depoimento no site."
        />
        <meta name="robots" content="noindex, follow" />
        <link rel="canonical" href="/avaliar" />
      </Helmet>
      <Header />
      <main className="container mx-auto max-w-2xl px-4 py-10">
        {done ? (
          <section className="rounded-2xl border border-border bg-card p-8 text-center">
            <CheckCircle2 className="mx-auto mb-4 h-14 w-14 text-primary" aria-hidden />
            <h1 className="mb-3 text-2xl font-bold text-foreground">Avaliação enviada. Obrigado!</h1>
            <p className="mb-6 text-muted-foreground">
              Sua avaliação passa por uma conferência rápida antes de ir ao ar. Se autorizou a publicação, ela aparece
              na página de depoimentos em até 48 horas úteis.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button asChild size="lg">
                <a
                  href={`https://wa.me/${NAP_PHONE_DIGITS}?text=${encodeURIComponent("Olá! Acabei de enviar minha avaliação pelo site.")}`}
                  onClick={() => track("review_thanks_whatsapp_click")}
                >
                  Falar no WhatsApp
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/">Voltar ao início</Link>
              </Button>
            </div>
          </section>
        ) : (
          <form onSubmit={submit} className="rounded-2xl border border-border bg-card p-6 sm:p-8">
            <h1 className="mb-2 text-2xl font-bold text-foreground sm:text-3xl">Como foi o seu atendimento?</h1>
            <p className="mb-6 text-sm text-muted-foreground">
              Leva menos de 1 minuto. Sua opinião ajuda outros moradores de Curitiba e região a escolherem melhor.
              {presetOs && <span className="block mt-1">Ordem de serviço: <strong>{presetOs}</strong></span>}
            </p>

            {alreadySent && (
              <p className="mb-6 rounded-lg border border-border bg-muted/40 p-3 text-sm text-muted-foreground">
                Já recebemos uma avaliação para este atendimento. Se precisar corrigir algo, fale com a gente no
                WhatsApp.
              </p>
            )}

            {/* Honeypot anti-spam: invisível para pessoas */}
            <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
              <label htmlFor="website">Site</label>
              <input
                id="website"
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </div>


            <fieldset className="mb-6">
              <legend className="mb-2 text-sm font-semibold text-foreground">Sua nota *</legend>
              <div className="flex gap-1" role="radiogroup" aria-label="Nota de 1 a 5 estrelas">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    type="button"
                    role="radio"
                    aria-checked={rating === n}
                    aria-label={`${n} estrela${n > 1 ? "s" : ""}`}
                    onMouseEnter={() => setHover(n)}
                    onMouseLeave={() => setHover(0)}
                    onClick={() => {
                      setRating(n);
                      track("review_rating_select", { rating: n });
                    }}
                    className="rounded-lg p-2 transition-transform hover:scale-110 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring-3"
                  >
                    <Star
                      className={`h-9 w-9 ${(hover || rating) >= n ? "fill-primary text-primary" : "text-muted-foreground"}`}
                    />
                  </button>
                ))}
              </div>
            </fieldset>

            <div className="space-y-4">
              <div>
                <label htmlFor="rv-name" className="mb-1 block text-sm font-medium text-foreground">
                  Seu nome *
                </label>
                <Input id="rv-name" value={name} onChange={(e) => setName(e.target.value)} maxLength={80} required />
              </div>
              <div>
                <label htmlFor="rv-bairro" className="mb-1 block text-sm font-medium text-foreground">
                  Bairro / cidade
                </label>
                <Input
                  id="rv-bairro"
                  value={neighborhood}
                  onChange={(e) => setNeighborhood(e.target.value)}
                  maxLength={80}
                  placeholder="Ex.: Batel"
                />
              </div>
              <div>
                <label htmlFor="rv-comment" className="mb-1 block text-sm font-medium text-foreground">
                  Como foi o atendimento? *
                </label>
                <Textarea
                  id="rv-comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={5}
                  maxLength={2000}
                  required
                  placeholder="Conte o que foi feito, o prazo e o resultado."
                />
              </div>
              <div>
                <label htmlFor="rv-contact" className="mb-1 block text-sm font-medium text-foreground">
                  WhatsApp ou e-mail (opcional, não publicamos)
                </label>
                <Input id="rv-contact" value={contact} onChange={(e) => setContact(e.target.value)} maxLength={120} />
              </div>

              <label className="flex items-start gap-3 rounded-xl border border-border bg-muted/40 p-4">
                <Checkbox
                  checked={consent}
                  onCheckedChange={(v) => setConsent(v === true)}
                  aria-label="Autorizo a publicação"
                  className="mt-0.5"
                />
                <span className="text-sm text-muted-foreground">
                  Autorizo a publicação do meu depoimento (primeiro nome e bairro) no site. Meu telefone e e-mail não
                  serão exibidos. Posso pedir a remoção a qualquer momento pelo WhatsApp.
                </span>
              </label>
            </div>

            <Button type="submit" size="lg" className="mt-6 w-full" disabled={!canSubmit}>
              {sending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Enviar avaliação
            </Button>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              Tratamos seus dados conforme a LGPD. Veja a{" "}
              <Link to="/politica-de-privacidade" className="text-primary underline underline-offset-4">
                política de privacidade
              </Link>
              .
            </p>
          </form>
        )}
      </main>
      <Footer />
    </div>
  );
}
