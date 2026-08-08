import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { trackCTAClick } from "@/lib/analytics";

const SEGMENTOS = [
  "Varejo local",
  "Serviços (elétrica, hidráulica, reformas)",
  "Saúde e bem-estar",
  "Educação e cursos",
  "Alimentação",
  "Automotivo",
  "Imobiliário",
  "Tecnologia e telecom",
  "Outro",
] as const;

const FORMATOS = [
  "Banner de topo de conteúdo (970x250 / 320x100)",
  "Bloco no meio do conteúdo (336x280 / 300x250)",
  "Patrocinador da página (card com logo)",
  "Patrocínio de seção local (cidade/bairro)",
  "Ainda não sei — quero recomendação",
] as const;

const PERIODOS = ["Mensal", "Trimestral", "Semestral", "Campanha pontual"] as const;

const clean = (value: string, max: number) => value.replace(/[\r\n]+/g, " ").slice(0, max);

interface MediaProposalFormProps {
  whatsappNumber: string;
}

/**
 * Formulário de solicitação de proposta de mídia.
 * Não envia dados para o servidor: monta a mensagem e abre o WhatsApp comercial.
 */
export const MediaProposalForm = ({ whatsappNumber }: MediaProposalFormProps) => {
  const [empresa, setEmpresa] = useState("");
  const [segmento, setSegmento] = useState<string>(SEGMENTOS[0]);
  const [regiao, setRegiao] = useState("");
  const [formato, setFormato] = useState<string>(FORMATOS[4]);
  const [periodo, setPeriodo] = useState<string>(PERIODOS[0]);
  const [observacoes, setObservacoes] = useState("");
  const [erro, setErro] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nomeEmpresa = clean(empresa.trim(), 80);
    const localidade = clean(regiao.trim(), 80);

    if (nomeEmpresa.length < 2) {
      setErro("Informe o nome da empresa ou marca (mínimo 2 caracteres).");
      return;
    }
    if (localidade.length < 2) {
      setErro("Informe a cidade ou o bairro de interesse.");
      return;
    }
    setErro(null);

    const linhas = [
      "Olá! Quero uma proposta de mídia no portal tecnicocuritiba.com.br.",
      "",
      `• Empresa/marca: ${nomeEmpresa}`,
      `• Segmento: ${segmento}`,
      `• Cidade/bairro de interesse: ${localidade}`,
      `• Formato desejado: ${formato}`,
      `• Período: ${periodo}`,
    ];

    const extra = clean(observacoes.trim(), 300);
    if (extra) linhas.push(`• Observações: ${extra}`);

    trackCTAClick("whatsapp", "sponsors_media_proposal", {
      servico: "publicidade",
      equipamento: segmento,
    });

    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(linhas.join("\n"))}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-border/60 bg-card/50 p-5 space-y-4"
      aria-describedby="proposta-ajuda"
    >
      <p id="proposta-ajuda" className="text-sm text-muted-foreground">
        Preencha os campos abaixo e a mensagem do WhatsApp já sai com segmento, território, formato e
        período. Nenhum dado é armazenado no site — a conversa segue direto no canal comercial.
      </p>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="proposta-empresa">Empresa ou marca</Label>
          <Input
            id="proposta-empresa"
            value={empresa}
            onChange={(e) => setEmpresa(e.target.value.slice(0, 80))}
            placeholder="Ex.: Ótica Central Curitiba"
            className="mt-1.5"
            maxLength={80}
            required
          />
          <p className="mt-1 text-xs text-muted-foreground">
            Formato: nome comercial, até 80 caracteres. Exemplo: “Eletricista - Nota 10”.
          </p>
        </div>

        <div>
          <Label htmlFor="proposta-segmento">Segmento</Label>
          <select
            id="proposta-segmento"
            value={segmento}
            onChange={(e) => setSegmento(e.target.value)}
            className="mt-1.5 h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
          >
            {SEGMENTOS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <p className="mt-1 text-xs text-muted-foreground">
            Escolha o mais próximo — o segmento define em quais páginas o anúncio faz sentido.
          </p>
        </div>

        <div>
          <Label htmlFor="proposta-regiao">Cidade / bairro de interesse</Label>
          <Input
            id="proposta-regiao"
            value={regiao}
            onChange={(e) => setRegiao(e.target.value.slice(0, 80))}
            placeholder="Ex.: Curitiba — Batel e Água Verde"
            className="mt-1.5"
            maxLength={80}
            required
          />
          <p className="mt-1 text-xs text-muted-foreground">
            Formato: cidade e, se quiser, bairros separados por vírgula. Exemplo: “São José dos
            Pinhais — Centro, Afonso Pena”.
          </p>
        </div>

        <div>
          <Label htmlFor="proposta-formato">Tipo de anúncio</Label>
          <select
            id="proposta-formato"
            value={formato}
            onChange={(e) => setFormato(e.target.value)}
            className="mt-1.5 h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
          >
            {FORMATOS.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
          <p className="mt-1 text-xs text-muted-foreground">
            Todos os formatos são rotulados como “Publicidade” e ficam fora da dobra em telas
            pequenas.
          </p>
        </div>
      </div>

      <fieldset>
        <legend className="text-sm font-semibold text-foreground mb-2">Período pretendido</legend>
        <div className="flex flex-wrap gap-2">
          {PERIODOS.map((p) => (
            <label
              key={p}
              className={`cursor-pointer rounded-full border px-4 py-2 text-sm transition-colors ${
                periodo === p
                  ? "border-accent bg-accent/10 text-foreground"
                  : "border-border text-muted-foreground hover:border-accent/40"
              }`}
            >
              <input
                type="radio"
                name="proposta-periodo"
                value={p}
                checked={periodo === p}
                onChange={() => setPeriodo(p)}
                className="sr-only"
              />
              {p}
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <Label htmlFor="proposta-obs">Observações (opcional)</Label>
        <Textarea
          id="proposta-obs"
          value={observacoes}
          onChange={(e) => setObservacoes(e.target.value.slice(0, 300))}
          placeholder="Ex.: quero começar no próximo mês e priorizar páginas de bairro."
          className="mt-1.5"
          rows={2}
          maxLength={300}
        />
        <p className="mt-1 text-xs text-muted-foreground">Até 300 caracteres.</p>
      </div>

      {erro && (
        <p role="alert" className="text-sm text-destructive">
          {erro}
        </p>
      )}

      <Button type="submit" size="lg" className="w-full sm:w-auto" data-cta-location="sponsors_media_proposal">
        <Send className="h-4 w-4" aria-hidden="true" />
        Solicitar proposta no WhatsApp
      </Button>
    </form>
  );
};

export default MediaProposalForm;
