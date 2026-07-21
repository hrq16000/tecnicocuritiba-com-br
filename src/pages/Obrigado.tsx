import { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import {
  CheckCircle2,
  MessageCircle,
  ArrowLeft,
  Clock,
  ShieldCheck,
  Home,
  Truck,
  Wifi,
} from "lucide-react";
import { PageSEO } from "@/components/PageSEO";
import { trackCTAClick } from "@/lib/analytics";

const WHATSAPP_NUMBER = "5541997452053";
const SITE = "https://tecnicocuritiba.com.br";

type Modalidade = "remoto" | "visita" | "coleta" | "desconhecida";

interface ModalidadeCopy {
  badge: string;
  icon: typeof Home;
  title: string;
  subtitle: string;
  proximosPassos: string[];
  prazo: string;
  precoBase: string;
}

const COPY: Record<Modalidade, ModalidadeCopy> = {
  remoto: {
    badge: "Atendimento Remoto",
    icon: Wifi,
    title: "Sessão remota confirmada — abra o WhatsApp",
    subtitle:
      "Um técnico humano vai enviar em minutos o link seguro de acesso remoto (AnyDesk ou similar). Mantenha o computador ligado com internet.",
    proximosPassos: [
      "Envie no WhatsApp: modelo do PC, versão do Windows e print do erro.",
      "Aguarde o link seguro de sessão remota — nunca instale software fora do link enviado.",
      "Atendimento começa em ~30 min no horário comercial (Seg–Sáb 08h–20h).",
    ],
    prazo: "Início em ~30 min • Duração média 30–90 min",
    precoBase: "A partir de R$ 99,99",
  },
  visita: {
    badge: "Visita Domiciliar",
    icon: Home,
    title: "Visita agendada — continue no WhatsApp",
    subtitle:
      "Um técnico de Curitiba vai confirmar bairro, endereço e melhor janela de horário. Atendimento no mesmo dia sempre que possível.",
    proximosPassos: [
      "Confirme no WhatsApp: bairro, referência e telefone do local.",
      "Envie foto do equipamento e da etiqueta traseira (modelo/série).",
      "O técnico chega com ferramentas; você só paga se aprovar o orçamento.",
    ],
    prazo: "Deslocamento médio 30–60 min em Curitiba e região",
    precoBase: "Visita a partir de R$ 99,99 (30 min) • R$ 169,99 (1h)",
  },
  coleta: {
    badge: "Coleta e Entrega",
    icon: Truck,
    title: "Coleta agendada — envie os detalhes no WhatsApp",
    subtitle:
      "O motoboy retira o equipamento na sua porta, leva para a bancada e devolve depois do reparo. Diagnóstico completo com laudo técnico.",
    proximosPassos: [
      "Envie no WhatsApp: fotos + vídeo curto (sem áudio) do defeito.",
      "Confirme endereço de coleta e janela de horário — Curitiba e região metropolitana.",
      "Você recebe orçamento fechado antes de qualquer reparo. Sem taxa surpresa.",
    ],
    prazo: "Diagnóstico em 3–7 dias úteis • Reparos 7–60 dias conforme peça",
    precoBase: "Coleta + diagnóstico a partir de R$ 299,99 (abatido do reparo)",
  },
  desconhecida: {
    badge: "Pedido recebido",
    icon: MessageCircle,
    title: "Pedido recebido — continue no WhatsApp",
    subtitle:
      "Sua triagem chegou. Um técnico humano responde em ~30 min no horário comercial.",
    proximosPassos: [
      "Envie fotos do equipamento e da etiqueta traseira (modelo/série).",
      "Grave um vídeo curto do defeito acontecendo — sem áudio de fundo.",
      "Aguarde a resposta do técnico com próximos passos.",
    ],
    prazo: "Resposta em ~30 min • Seg–Sáb 08h–20h",
    precoBase: "Orçamento sem compromisso",
  },
};

function normalizeModalidade(v: string | null): Modalidade {
  if (v === "remoto" || v === "visita" || v === "coleta") return v;
  return "desconhecida";
}

const FUNNEL_STORAGE_KEYS = [
  "wa_funnel_state_v6",
  "wa_funnel_state_v5",
  "wa_funnel_answers_v4",
];

const Obrigado = () => {
  const params = useMemo(
    () =>
      typeof window !== "undefined"
        ? new URLSearchParams(window.location.search)
        : new URLSearchParams(),
    [],
  );
  const origem = params.get("origem") || "direto";
  const rawModalidade = params.get("modalidade");
  const modalidade = normalizeModalidade(rawModalidade);
  const equipamento = (params.get("equipamento") || "").slice(0, 80);
  // Validação extra: se veio modalidade inválida (não vazia, mas fora do enum),
  // marcamos como suspeita para telemetria; nunca reabrimos o funil.
  const modalidadeInvalida = !!rawModalidade && modalidade === "desconhecida";

  const copy = COPY[modalidade];
  const Icon = copy.icon;

  useEffect(() => {
    // Limpa qualquer estado persistente do funil — garante que o usuário
    // nunca volte para uma etapa anterior ao chegar em /obrigado, mesmo
    // se o parâmetro veio ausente ou corrompido.
    try {
      for (const k of FUNNEL_STORAGE_KEYS) window.localStorage.removeItem(k);
      window.sessionStorage.removeItem("wa_funnel_state_v6");
    } catch { /* noop */ }

    trackCTAClick("whatsapp", `thankyou_${origem}_${modalidade}`, {
      modalidade,
      equipamento: equipamento || undefined,
    });
    if (modalidadeInvalida && typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "obrigado_modalidade_invalida", {
        event_category: "diagnostics",
        raw_modalidade: rawModalidade,
        origem,
      });
    }
  }, [origem, modalidade, equipamento, modalidadeInvalida, rawModalidade]);

  const waHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Olá! Cheguei aqui pela página de confirmação (${copy.badge}) — preciso reabrir a conversa.`,
  )}`;

  // JSON-LD: LocalBusiness (referência canônica) + FAQPage com as perguntas mais
  // comuns pós-triagem por modalidade. Não emitimos AggregateRating aqui
  // (política do projeto: só com >= 10 reviews verificadas via edge function).
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService", "ComputerRepairService"],
    "@id": `${SITE}/#organization`,
    name: "Técnico em Curitiba - Suporte em Informática",
    url: SITE,
    telephone: "+55-41-99745-2053",
    priceRange: "R$ 99,99 - R$ 500",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Curitiba",
      addressRegion: "PR",
      addressCountry: "BR",
    },
    areaServed: [
      { "@type": "City", name: "Curitiba" },
      { "@type": "City", name: "São José dos Pinhais" },
      { "@type": "City", name: "Pinhais" },
      { "@type": "City", name: "Colombo" },
      { "@type": "City", name: "Araucária" },
      { "@type": "City", name: "Campo Largo" },
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "20:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "08:00",
        closes: "20:00",
      },
    ],
    sameAs: [`https://wa.me/${WHATSAPP_NUMBER}`],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Já enviei minha triagem — e agora?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Continue a conversa no WhatsApp com o técnico humano. Envie fotos, vídeo curto do defeito e a etiqueta do equipamento com modelo/série para acelerar o atendimento.",
        },
      },
      {
        "@type": "Question",
        name: "Qual o tempo de resposta?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Respondemos em ~30 minutos durante o horário comercial (Seg–Sáb, 08h–20h). Fora desse horário, retornamos na primeira janela útil do dia seguinte.",
        },
      },
      {
        "@type": "Question",
        name: "Preciso pagar alguma coisa agora?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Não. O orçamento é fechado antes de qualquer serviço. Você só paga se aprovar. Aceitamos PIX, cartão e dinheiro.",
        },
      },
      {
        "@type": "Question",
        name: "Atendem toda Curitiba e região?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sim. Atendemos Curitiba e toda a região metropolitana: São José dos Pinhais, Pinhais, Colombo, Araucária, Campo Largo, Almirante Tamandaré, Fazenda Rio Grande, Piraquara, Quatro Barras e Campo Magro.",
        },
      },
    ],
  };

  return (
    <>
      <PageSEO
        title="Pedido recebido · Técnico em Curitiba"
        description="Sua triagem foi enviada. Continue a conversa no WhatsApp — Seg–Sáb 08h–20h, resposta em ~30 min."
        path="/obrigado"
        noindex
      />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(localBusinessSchema)}
        </script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>
      <main className="min-h-screen bg-background px-4 py-14 sm:py-20">
        <div className="mx-auto max-w-xl">
          <section
            className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-[var(--shadow-lg)] text-center"
            data-modalidade={modalidade}
            data-testid="obrigado-card"
          >
            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/15">
              <CheckCircle2
                className="h-8 w-8 text-emerald-600"
                aria-hidden
              />
            </div>
            <span
              className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary"
              data-testid="obrigado-badge"
            >
              <Icon className="h-3.5 w-3.5" aria-hidden /> {copy.badge}
            </span>
            <h1 className="mb-2 text-2xl sm:text-3xl font-bold text-foreground">
              {copy.title}
            </h1>
            <p className="mb-5 text-sm sm:text-base text-muted-foreground leading-relaxed">
              {copy.subtitle}
            </p>

            <div className="mb-5 rounded-lg border border-amber-500/40 bg-amber-500/10 p-3 text-left text-[13px] leading-snug">
              <p className="mb-2 font-semibold text-foreground">
                📌 Próximos passos:
              </p>
              <ol className="ml-4 list-decimal space-y-1 text-foreground/80">
                {copy.proximosPassos.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ol>
            </div>

            <div className="mb-5 grid gap-1 rounded-lg border border-border bg-background/60 p-3 text-left text-[13px]">
              <p className="text-foreground">
                <strong>Prazo:</strong> {copy.prazo}
              </p>
              <p className="text-foreground">
                <strong>Investimento:</strong> {copy.precoBase}
              </p>
              {equipamento && (
                <p className="text-muted-foreground">
                  <strong>Equipamento:</strong> {equipamento}
                </p>
              )}
            </div>

            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              data-funnel-skip="1"
              data-testid="obrigado-whatsapp"
              className="mb-3 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-[hsl(var(--whatsapp))] px-4 font-bold text-white hover:opacity-95"
              onClick={() =>
                trackCTAClick(
                  "whatsapp",
                  `thankyou_reopen_${origem}_${modalidade}`,
                )
              }
            >
              <MessageCircle className="h-5 w-5" /> Abrir WhatsApp novamente
            </a>

            <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-3 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4" /> Seg–Sáb · 08h–20h
              </span>
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4" /> Sigilo garantido
              </span>
            </div>
          </section>

          <nav
            className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm"
            aria-label="Voltar ao site"
          >
            <Link
              to="/"
              className="inline-flex min-h-11 items-center justify-center gap-1 rounded-lg border border-border bg-card px-3 font-medium hover:border-primary/60"
            >
              <ArrowLeft className="h-4 w-4" /> Início
            </Link>
            <Link
              to="/servicos"
              className="inline-flex min-h-11 items-center justify-center rounded-lg border border-border bg-card px-3 font-medium hover:border-primary/60"
            >
              Ver serviços
            </Link>
            <Link
              to="/blog"
              className="inline-flex min-h-11 items-center justify-center rounded-lg border border-border bg-card px-3 font-medium hover:border-primary/60"
            >
              Ler o blog
            </Link>
          </nav>
        </div>
      </main>
    </>
  );
};

export default Obrigado;
