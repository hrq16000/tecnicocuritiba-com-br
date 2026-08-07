import { useEffect, useMemo, useState } from "react";
import { PageSEO } from "@/components/PageSEO";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { AnimatedSection } from "@/components/AnimatedSection";
import { ImageObjectSchema } from "@/components/ImageObjectSchema";
import { ServiceGallery, GalleryItem } from "@/components/ServiceGallery";
import ServiceOperationalSpec from "@/components/ServiceOperationalSpec";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { Monitor, MessageCircle, Camera, Truck, AlertTriangle, CheckCircle } from "lucide-react";
import { trackPageView, trackCTAClick } from "@/lib/analytics";
import { buildWhatsAppUrl } from "@/lib/whatsappMessage";
import { getServiceSpec } from "@/lib/serviceSpecs";
import { useGeolocation } from "@/hooks/useGeolocation";
import {
  COLETA_TAXA_MINIMA_LABEL,
  DIAGNOSTICO_VALOR_LABEL,
  PRAZO_LONGO,
  REGRA_COLETA_SEM_VISITA,
} from "@/lib/coletaConfig";

const PATH = "/servicos/conserto-monitor";

const SINTOMAS = [
  "Monitor não liga (LED apagado)",
  "LED aceso, mas tela preta",
  "Tela pisca ou apaga sozinha",
  "Listras, linhas ou manchas na imagem",
  "Imagem escura (backlight fraco)",
  "Sem sinal em HDMI / DisplayPort / VGA",
  "Cores erradas ou imagem esverdeada",
  "Ruído/estalo e cheiro de queimado",
];

const GALLERY: GalleryItem[] = [
  { imageKey: "bancadaTecnica", caption: "Monitor aberto em bancada para medição de fonte e placa lógica" },
  { imageKey: "estacaoSolda", caption: "Retrabalho de solda em fonte de monitor com estação profissional" },
  { imageKey: "coletaEntrega", caption: "Coleta e devolução do monitor — sem visita técnica para este serviço" },
];

const FAQ = [
  {
    q: "Quanto custa consertar um monitor em Curitiba?",
    a: `O conserto de monitor entra na modalidade de coleta e entrega, com taxa mínima de ${COLETA_TAXA_MINIMA_LABEL} pré-aprovada, já incluindo coleta, diagnóstico em bancada e devolução. Peças são orçadas à parte e nada é executado sem aprovação por WhatsApp. Em caso de desistência após o diagnóstico, cobra-se ${DIAGNOSTICO_VALOR_LABEL}.`,
  },
  {
    q: "Vocês fazem visita técnica para monitor?",
    a: `Não. ${REGRA_COLETA_SEM_VISITA} O monitor precisa de bancada, fonte de teste e instrumentos que não são levados em atendimento domiciliar.`,
  },
  {
    q: "Qual o prazo do conserto de monitor?",
    a: `O prazo padrão é de ${PRAZO_LONGO}, variando conforme a disponibilidade da peça. Monitores que dependem de componente importado podem levar mais tempo — o prazo é confirmado junto do orçamento.`,
  },
  {
    q: "Monitor com tela trincada ou manchada tem conserto?",
    a: "Não fazemos troca de painel. Tela trincada, manchada por impacto ou com vazamento de cristal líquido é economicamente inviável na maioria dos modelos — nesses casos informamos antes de qualquer coleta.",
  },
  {
    q: "Meu monitor liga e apaga na hora. O que pode ser?",
    a: "Na maioria dos casos são capacitores da fonte ou o circuito de backlight (LEDs). É um defeito com boa taxa de reparo em bancada, mas exige medição — por isso pedimos foto da etiqueta e um vídeo curto do defeito antes da coleta.",
  },
  {
    q: "Quais marcas de monitor vocês atendem?",
    a: "AOC, Samsung, LG, Dell, Acer, Philips, BenQ, ASUS, Positivo, HP, Lenovo e similares, em modelos LED, LCD, IPS, VA e ultrawide.",
  },
];

const ConsertoMonitor = () => {
  const spec = getServiceSpec(PATH)!;
  const { city, neighborhood } = useGeolocation();
  const [modelo, setModelo] = useState("");
  const [sintomas, setSintomas] = useState<string[]>([]);
  const [detalhes, setDetalhes] = useState("");
  const [bairro, setBairro] = useState("");
  const [temImagem, setTemImagem] = useState(true);

  useEffect(() => {
    trackPageView(PATH, "Conserto de Monitor");
  }, []);

  useEffect(() => {
    if (!bairro && neighborhood) setBairro(neighborhood);
  }, [neighborhood, bairro]);

  const waHref = useMemo(
    () =>
      buildWhatsAppUrl({
        servicoLabel: spec.nome,
        equipamento: "Monitor",
        category: "monitor",
        modalidade: "coleta",
        cidadeLabel: city || undefined,
        bairroLabel: bairro || undefined,
        modelo,
        sintomas,
        detalhes,
        temImagem,
        condicao: `${spec.nome} — taxa mínima ${spec.valorInicial} com coleta e entrega, prazo ${spec.tempoEstimado}`,
      }),
    [spec, city, bairro, modelo, sintomas, detalhes, temImagem],
  );

  const toggleSintoma = (s: string) =>
    setSintomas((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Conserto de monitor",
    serviceType: "Conserto de monitor LED, LCD, IPS e ultrawide",
    description:
      "Conserto de monitor em Curitiba e região metropolitana com coleta e entrega, diagnóstico em bancada e orçamento aprovado antes do reparo.",
    provider: {
      "@type": "LocalBusiness",
      name: "Técnico em Curitiba",
      telephone: "+55-41-99745-2053",
    },
    areaServed: { "@type": "City", name: "Curitiba" },
    offers: {
      "@type": "Offer",
      priceCurrency: "BRL",
      price: "300",
      description: `Taxa mínima ${COLETA_TAXA_MINIMA_LABEL} pré-aprovada, com coleta e entrega inclusas.`,
    },
  };

  return (
    <div className="min-h-screen bg-background">
      <PageSEO
        title="Conserto de Monitor em Curitiba | Coleta e Entrega | Técnico em Curitiba"
        description="Conserto de monitor LED, LCD, IPS e ultrawide em Curitiba e região. Coleta e entrega inclusas, diagnóstico em bancada e orçamento aprovado antes do reparo."
        path={PATH}
        breadcrumbs={[
          { name: "Início", path: "/" },
          { name: "Serviços", path: "/servicos" },
          { name: "Conserto de monitor", path: PATH },
        ]}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Header />
      <main id="main-content">
        <Breadcrumbs items={[{ label: "Serviços", href: "/servicos" }, { label: "Conserto de monitor" }]} />

        <section className="pt-10 pb-10 hero-gradient">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-accent/20 text-accent px-4 py-2 rounded-full mb-6">
                <Monitor className="h-5 w-5" aria-hidden="true" />
                <span className="font-medium">Monitor LED, LCD, IPS e ultrawide</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-heading font-bold text-white mb-5">
                Conserto de monitor em Curitiba e região metropolitana
              </h1>
              <p className="text-lg text-white/90 mb-6 max-w-2xl mx-auto">
                Monitor que não liga, fica com tela preta, listras ou apaga sozinho. Diagnóstico em bancada,
                orçamento aprovado antes do reparo e {PRAZO_LONGO.toLowerCase()} de prazo.
              </p>
              <div className="bg-white/10 rounded-xl p-4 max-w-lg mx-auto text-left">
                <div className="flex items-center gap-2 text-accent mb-2">
                  <Truck className="h-5 w-5" aria-hidden="true" />
                  <span className="font-bold text-sm">COLETA E ENTREGA</span>
                </div>
                <p className="text-white/90 text-sm">
                  {REGRA_COLETA_SEM_VISITA} Taxa mínima {COLETA_TAXA_MINIMA_LABEL} pré-aprovada, já com coleta e devolução.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Montador de mensagem: modelo + sintomas + imagem + cidade/bairro + UTM */}
        <AnimatedSection>
          <section id="orcamento-monitor" className="py-12 scroll-mt-24">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-2">
                  Monte seu orçamento em 30 segundos
                </h2>
                <p className="text-muted-foreground mb-6">
                  Preenchendo aqui, a mensagem do WhatsApp já sai com modelo, sintomas, cidade e bairro — sem
                  precisar repetir nada no atendimento.
                </p>

                <div className="rounded-xl border border-border bg-card p-5 space-y-5">
                  <div>
                    <Label htmlFor="modelo-monitor">Marca e modelo do monitor</Label>
                    <Input
                      id="modelo-monitor"
                      value={modelo}
                      onChange={(e) => setModelo(e.target.value.slice(0, 80))}
                      placeholder="Ex.: AOC 24G2 24 polegadas"
                      className="mt-1.5"
                    />
                  </div>

                  <fieldset>
                    <legend className="text-sm font-semibold text-foreground mb-2">O que está acontecendo?</legend>
                    <div className="grid sm:grid-cols-2 gap-2">
                      {SINTOMAS.map((s) => (
                        <label
                          key={s}
                          className="flex items-start gap-2 rounded-lg border border-border p-3 text-sm text-muted-foreground cursor-pointer hover:border-primary/40"
                        >
                          <Checkbox
                            checked={sintomas.includes(s)}
                            onCheckedChange={() => toggleSintoma(s)}
                            aria-label={s}
                            className="mt-0.5"
                          />
                          <span>{s}</span>
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="bairro-monitor">Bairro / cidade</Label>
                      <Input
                        id="bairro-monitor"
                        value={bairro}
                        onChange={(e) => setBairro(e.target.value.slice(0, 60))}
                        placeholder={city ? `Ex.: Batel (${city})` : "Ex.: Batel"}
                        className="mt-1.5"
                      />
                      {city && (
                        <p className="text-xs text-muted-foreground mt-1.5">Cidade detectada: {city}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="detalhes-monitor">Detalhes (opcional)</Label>
                      <Textarea
                        id="detalhes-monitor"
                        value={detalhes}
                        onChange={(e) => setDetalhes(e.target.value.slice(0, 300))}
                        placeholder="Ex.: começou depois de uma queda de energia"
                        className="mt-1.5 min-h-[42px]"
                        rows={2}
                      />
                    </div>
                  </div>

                  <label className="flex items-start gap-2 rounded-lg border border-primary/30 bg-primary/5 p-3 text-sm text-foreground cursor-pointer">
                    <Checkbox
                      checked={temImagem}
                      onCheckedChange={(v) => setTemImagem(v === true)}
                      aria-label="Vou enviar fotos e vídeo do defeito"
                      className="mt-0.5"
                    />
                    <span className="flex items-start gap-2">
                      <Camera className="h-4 w-4 text-primary mt-0.5 shrink-0" aria-hidden="true" />
                      Vou enviar fotos da etiqueta e um vídeo curto do defeito na conversa.
                    </span>
                  </label>

                  <Button asChild size="lg" className="w-full">
                    <a
                      href={waHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-wa-source="conserto-monitor-form"
                      onClick={() =>
                        trackCTAClick("whatsapp", "conserto-monitor", {
                          servico: "conserto-monitor",
                          equipamento: "monitor",
                          modalidade: "coleta",
                        })
                      }
                    >
                      <MessageCircle className="h-5 w-5" aria-hidden="true" />
                      Enviar para o WhatsApp
                    </a>
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    A mensagem já inclui serviço, modelo, sintomas, cidade/bairro e a origem da campanha.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </AnimatedSection>

        <AnimatedSection>
          <section className="py-12 bg-secondary/30">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-6">
                  Defeitos de monitor que mais atendemos
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    ["Monitor não liga", "LED apagado costuma ser fonte interna, fusível ou fonte externa (brick) queimada."],
                    ["LED aceso e tela preta", "Backlight (LEDs) ou placa de inverter. Com lanterna dá para ver a imagem fraca — é o sintoma clássico."],
                    ["Liga e apaga sozinho", "Capacitores estufados na fonte ou proteção do circuito de LED atuando."],
                    ["Listras e manchas", "Flat cable, placa T-CON ou dano de painel. Painel danificado não tem reparo viável."],
                    ["Sem sinal", "Porta HDMI/DP com mau contato, cabo defeituoso ou placa lógica. Testamos com fonte de sinal própria."],
                    ["Imagem tremendo ou piscando", "Taxa de atualização incorreta, cabo ruim ou instabilidade na fonte — o teste em bancada separa os casos."],
                  ].map(([t, d]) => (
                    <div key={t} className="rounded-xl border border-border bg-card p-5">
                      <h3 className="font-semibold text-foreground mb-1.5 flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-primary" aria-hidden="true" />
                        {t}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{d}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-xl border border-destructive/30 bg-destructive/5 p-5">
                  <h3 className="flex items-center gap-2 font-semibold text-foreground mb-1.5">
                    <AlertTriangle className="h-4 w-4 text-destructive" aria-hidden="true" />
                    O que não fazemos
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Não trocamos painel de monitor (tela trincada, manchada ou com vazamento) e não prometemos
                    reparo garantido em placas oxidadas. Quando o caso é inviável, avisamos antes da coleta.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </AnimatedSection>

        <ImageObjectSchema imageKeys={GALLERY.map((g) => g.imageKey as string)} local="Curitiba" path={PATH} />
        <ServiceGallery
          title="Provas reais do reparo de monitor"
          subtitle="Fotos reais de bancada, solda e logística usadas nos atendimentos de monitor em Curitiba."
          items={GALLERY}
          local="Curitiba"
          bgClass="bg-background"
        />

        <ServiceOperationalSpec path="/servicos/conserto-monitor" />

        <AnimatedSection>
          <section className="py-12">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-6">
                  Perguntas frequentes sobre conserto de monitor
                </h2>
                <div className="space-y-3">
                  {FAQ.map((f) => (
                    <details key={f.q} className="rounded-xl border border-border bg-card p-5">
                      <summary className="font-semibold text-foreground cursor-pointer">{f.q}</summary>
                      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.a}</p>
                    </details>
                  ))}
                </div>

                <p className="mt-6 text-sm text-muted-foreground">
                  Também atendemos{" "}
                  <Link to="/servicos/conserto-pc-notebook" className="text-primary underline">
                    conserto de PC e notebook
                  </Link>
                  ,{" "}
                  <Link to="/servicos/conserto-placa" className="text-primary underline">
                    reparo de placa
                  </Link>{" "}
                  e{" "}
                  <Link to="/servicos/conserto-tv" className="text-primary underline">
                    conserto de TV
                  </Link>
                  . Consulte também{" "}
                  <Link to="/precos-e-politicas" className="text-primary underline">
                    preços e políticas
                  </Link>
                  .
                </p>
              </div>
            </div>
          </section>
        </AnimatedSection>
      </main>
      <Footer />
    </div>
  );
};

export default ConsertoMonitor;
