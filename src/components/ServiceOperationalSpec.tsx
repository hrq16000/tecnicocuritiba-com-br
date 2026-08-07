import { CalendarClock, Camera, CheckCircle2, ClipboardList, Clock, Info, MessageCircle, Plus, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getServiceSpec } from "@/lib/serviceSpecs";
import { buildWhatsAppUrl } from "@/lib/whatsappMessage";
import { trackWaClick } from "@/lib/funnelAnalytics";

/**
 * Bloco operacional padrão das páginas de serviço.
 *
 * Campos obrigatórios em TODAS as páginas: valor inicial, tempo estimado,
 * o que está incluso / não incluso, acréscimos, observações, fotos exigidas
 * e agendamento. Os dados vêm de `src/lib/serviceSpecs.ts` (fonte única),
 * o que elimina divergências de preço, prazo e regra entre páginas.
 */
const List = ({
  title,
  items,
  icon: Icon,
  tone = "muted",
}: {
  title: string;
  items: string[];
  icon: typeof CheckCircle2;
  tone?: "positive" | "negative" | "muted";
}) => {
  const toneClass =
    tone === "positive" ? "text-primary" : tone === "negative" ? "text-destructive" : "text-muted-foreground";
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground mb-3">
        <Icon className={`h-4 w-4 ${toneClass}`} aria-hidden="true" />
        {title}
      </h3>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item} className="flex gap-2 text-sm text-muted-foreground leading-relaxed">
            <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-current ${toneClass}`} aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const ServiceOperationalSpec = ({ path }: { path: string }) => {
  const spec = getServiceSpec(path);
  if (!spec) return null;

  const modalidadeLabel =
    spec.modalidade === "coleta"
      ? "Coleta e entrega (sem visita técnica)"
      : spec.modalidade === "remoto"
        ? "Atendimento remoto"
        : "Visita técnica a domicílio";

  const waHref = buildWhatsAppUrl({
    servicoLabel: spec.nome,
    modalidade: spec.modalidade,
    condicao: `${spec.nome} a partir de ${spec.valorInicial} — ${spec.tempoEstimado}`,
  });

  return (
    <section id="condicoes-do-servico" className="py-12 bg-muted/30 border-t border-border scroll-mt-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            Condições do serviço: {spec.nome}
          </h2>
          <p className="text-muted-foreground mb-6">
            Mesmas regras aplicadas em todas as páginas — valor inicial, prazo, escopo e agendamento sem letra miúda.
          </p>

          <div className="grid gap-4 sm:grid-cols-3 mb-4">
            <div className="rounded-xl border border-primary/30 bg-primary/5 p-5">
              <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Valor inicial</p>
              <p className="text-2xl font-bold text-foreground">{spec.valorInicial}</p>
              <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{spec.valorRegra}</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5">
              <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1 flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" aria-hidden="true" /> Tempo estimado
              </p>
              <p className="text-base font-semibold text-foreground leading-snug">{spec.tempoEstimado}</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5">
              <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1 flex items-center gap-1.5">
                <ClipboardList className="h-3.5 w-3.5" aria-hidden="true" /> Modalidade
              </p>
              <p className="text-base font-semibold text-foreground leading-snug">{modalidadeLabel}</p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <List title="O que está incluso" items={spec.incluso} icon={CheckCircle2} tone="positive" />
            <List title="O que não está incluso" items={spec.naoIncluso} icon={XCircle} tone="negative" />
            <List title="Acréscimos possíveis" items={spec.acrescimos} icon={Plus} />
            <List title="Quando exige visita ou orçamento personalizado" items={spec.quandoVisitaOuOrcamento} icon={Info} />
            <List title="Fotos e vídeos necessários" items={spec.fotosNecessarias} icon={Camera} />
            <List title="Observações importantes" items={spec.observacoes} icon={Info} />
          </div>

          <div
            id="agendamento"
            className="mt-6 rounded-xl border border-border bg-card p-6 scroll-mt-24"
          >
            <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground mb-2">
              <CalendarClock className="h-5 w-5 text-primary" aria-hidden="true" />
              Agendamento
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Envie as fotos listadas acima pelo WhatsApp com seu bairro e o período preferido (manhã ou tarde).
              Confirmamos a estimativa antes de sair — nada é executado sem sua aprovação.
            </p>
            <Button asChild size="lg" className="w-full sm:w-auto">
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                data-wa-source="service-operational-spec"
                data-service={spec.path}
                onClick={() => trackWaClick(`service_spec:${spec.path}`)}
              >
                <MessageCircle className="h-5 w-5" aria-hidden="true" />
                Agendar pelo WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceOperationalSpec;
