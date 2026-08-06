import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageSEO } from "@/components/PageSEO";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { MessageCircle, Trash2, ShieldCheck } from "lucide-react";
import { NAP_PHONE_DIGITS } from "@/lib/nap";

const track = (event: string, params: Record<string, unknown> = {}) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", event, { event_category: "lgpd", ...params });
  }
};

const SCOPES = [
  { id: "os", label: "Ordem de Serviço e orçamento (pré-OS em PDF)" },
  { id: "midias", label: "Fotos e vídeos das peças/defeitos que enviei" },
  { id: "avaliacao", label: "Minha avaliação publicada no site" },
  { id: "contato", label: "Meu nome e telefone no histórico de atendimento" },
];

const RETENTION = [
  { t: "Ordem de Serviço e nota fiscal", p: "5 anos", why: "Obrigação legal fiscal e prazo de garantia/decadência (CDC)." },
  { t: "Fotos e vídeos anexados", p: "90 dias após o encerramento", why: "Comprovação de estado do equipamento durante a garantia." },
  { t: "Mensagens de WhatsApp do atendimento", p: "12 meses", why: "Prova do que foi contratado e aprovado pelo cliente." },
  { t: "Avaliação publicada", p: "Até pedido de remoção", why: "Publicada apenas com autorização expressa; removida a qualquer tempo." },
  { t: "Dados de navegação (GA4)", p: "14 meses", why: "Métricas agregadas; só coletados após aceite no banner de cookies." },
];

export default function ExclusaoDados() {
  const [nome, setNome] = useState("");
  const [os, setOs] = useState("");
  const [contato, setContato] = useState("");
  const [scopes, setScopes] = useState<string[]>([]);
  const [obs, setObs] = useState("");
  const [confirmado, setConfirmado] = useState(false);

  const toggle = (id: string) =>
    setScopes((prev) => (prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]));

  const pronto = nome.trim().length >= 2 && contato.trim().length >= 8 && scopes.length > 0 && confirmado;

  const waHref = useMemo(() => {
    const itens = SCOPES.filter((s) => scopes.includes(s.id)).map((s) => `• ${s.label}`).join("\n");
    const msg =
      `Assunto: Solicitação de exclusão de dados (LGPD)\n\n` +
      `Nome: ${nome || "-"}\n` +
      `OS: ${os || "não informada"}\n` +
      `Contato para confirmação: ${contato || "-"}\n\n` +
      `Dados/arquivos que solicito excluir:\n${itens || "-"}\n` +
      (obs ? `\nObservações: ${obs}\n` : "") +
      `\nEstou ciente de que documentos com retenção legal obrigatória (OS/nota fiscal) ` +
      `só podem ser eliminados após o prazo legal, conforme a política publicada.`;
    return `https://wa.me/${NAP_PHONE_DIGITS}?text=${encodeURIComponent(msg)}&utm_source=site&utm_medium=lgpd&utm_campaign=exclusao_dados`;
  }, [nome, os, contato, scopes, obs]);

  const faqs = [
    {
      q: "Em quanto tempo meus dados são excluídos?",
      a: "Confirmamos o recebimento em até 48h e concluímos a exclusão em até 15 dias, conforme o art. 18 da LGPD. Você recebe uma confirmação por WhatsApp com a data e o que foi eliminado.",
    },
    {
      q: "Tudo pode ser apagado?",
      a: "Quase tudo. Documentos fiscais e a Ordem de Serviço têm retenção legal obrigatória e permanecem arquivados pelo prazo previsto em lei, sem uso comercial ou marketing.",
    },
    {
      q: "Excluir meus dados cancela a garantia?",
      a: "A exclusão da Ordem de Serviço antes do prazo pode inviabilizar a comprovação da garantia de 90 dias. Nesse caso avisamos antes de concluir o pedido.",
    },
  ];

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <PageSEO
        title="Exclusão de Dados e Arquivos (LGPD) | Técnico em Curitiba"
        description="Solicite a exclusão dos seus dados pessoais, fotos, vídeos e avaliações. Veja os prazos de retenção de cada informação e receba confirmação por WhatsApp."
        path="/exclusao-de-dados"
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <Header />
      <main id="main-content" className="container mx-auto px-4 py-8">
        <Breadcrumbs
          emitSchema={false}
          items={[{ label: "Início", href: "/" }, { label: "Exclusão de dados" }]}
        />

        <section className="max-w-3xl mx-auto py-6 md:py-10">
          <h1 className="text-3xl md:text-5xl font-bold mb-3">
            Exclusão de dados e arquivos anexados
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Você é o titular dos seus dados. Aqui você solicita a eliminação do que enviou
            (fotos, vídeos, avaliação e histórico de contato) e vê exatamente quanto tempo
            cada informação fica guardada.
          </p>

          <h2 className="text-2xl font-bold mb-4">Registro de retenção</h2>
          <div className="overflow-x-auto mb-10">
            <table className="w-full text-sm border rounded-xl overflow-hidden">
              <thead className="bg-muted">
                <tr>
                  <th className="text-left p-3">Dado</th>
                  <th className="text-left p-3">Prazo</th>
                  <th className="text-left p-3">Motivo</th>
                </tr>
              </thead>
              <tbody>
                {RETENTION.map((r) => (
                  <tr key={r.t} className="border-t align-top">
                    <td className="p-3 font-medium">{r.t}</td>
                    <td className="p-3 whitespace-nowrap">{r.p}</td>
                    <td className="p-3 text-muted-foreground">{r.why}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold mb-4">Solicitar exclusão</h2>
          <div className="rounded-2xl border p-4 md:p-6 space-y-4 mb-10">
            <div>
              <label className="text-sm font-medium" htmlFor="nome">Nome completo *</label>
              <Input id="nome" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Como consta na OS" className="mt-1 min-h-11" />
            </div>
            <div>
              <label className="text-sm font-medium" htmlFor="os">Número da OS (se tiver)</label>
              <Input id="os" value={os} onChange={(e) => setOs(e.target.value)} placeholder="Ex.: OS-2026-0042" className="mt-1 min-h-11" />
            </div>
            <div>
              <label className="text-sm font-medium" htmlFor="contato">WhatsApp para confirmação *</label>
              <Input id="contato" value={contato} onChange={(e) => setContato(e.target.value)} placeholder="(41) 9xxxx-xxxx" inputMode="tel" className="mt-1 min-h-11" />
            </div>

            <fieldset>
              <legend className="text-sm font-medium mb-2">O que deve ser excluído? *</legend>
              <div className="space-y-2">
                {SCOPES.map((s) => (
                  <label key={s.id} className="flex items-start gap-3 rounded-xl border p-3 cursor-pointer">
                    <Checkbox checked={scopes.includes(s.id)} onCheckedChange={() => toggle(s.id)} />
                    <span className="text-sm">{s.label}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div>
              <label className="text-sm font-medium" htmlFor="obs">Observações</label>
              <Textarea id="obs" value={obs} onChange={(e) => setObs(e.target.value)} rows={3} className="mt-1" placeholder="Algum detalhe que ajude a localizar seu atendimento" />
            </div>

            <label className="flex items-start gap-3 text-sm">
              <Checkbox checked={confirmado} onCheckedChange={(v) => setConfirmado(Boolean(v))} />
              <span>
                Confirmo que sou o titular dos dados e estou ciente dos prazos de retenção
                legal descritos acima e na{" "}
                <Link className="underline" to="/politica-de-privacidade">Política de Privacidade</Link>.
              </span>
            </label>

            <Button
              size="lg"
              className="w-full"
              asChild={pronto}
              disabled={!pronto}
              onClick={() => pronto && track("lgpd_delete_request", { scopes: scopes.join(","), has_os: Boolean(os) })}
            >
              {pronto ? (
                <a href={waHref} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-5 w-5" /> Enviar solicitação no WhatsApp
                </a>
              ) : (
                <span>
                  <Trash2 className="mr-2 h-5 w-5 inline" /> Preencha os campos obrigatórios
                </span>
              )}
            </Button>

            <p className="text-xs text-muted-foreground flex gap-2">
              <ShieldCheck className="h-4 w-4 shrink-0" aria-hidden />
              Você recebe a confirmação da exclusão no mesmo WhatsApp, com data e lista do
              que foi eliminado. Prazo máximo: 15 dias.
            </p>
          </div>

          <h2 className="text-2xl font-bold mb-4">Dúvidas frequentes</h2>
          <div className="space-y-3">
            {faqs.map((f) => (
              <details key={f.q} className="rounded-xl border p-4">
                <summary className="font-semibold cursor-pointer">{f.q}</summary>
                <p className="mt-2 text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
