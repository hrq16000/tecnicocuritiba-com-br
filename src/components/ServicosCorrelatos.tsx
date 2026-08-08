import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export type CorrelatoItem = {
  to: string;
  label: string;
  desc: string;
};

/**
 * Bloco de serviços correlatos do cluster de informática.
 *
 * Objetivo: distribuir link equity entre o hub /servicos, a página local
 * primária (/tecnico-informatica-curitiba) e a pillar informacional
 * (/guia-tecnico-informatica), sem alterar o SEO geral das páginas.
 */
export const CORRELATOS_INFORMATICA: CorrelatoItem[] = [
  {
    to: "/tecnico-informatica-curitiba",
    label: "Técnico de informática em Curitiba",
    desc: "Página principal do atendimento local: bairros, prazos e formas de atendimento.",
  },
  {
    to: "/guia-tecnico-informatica",
    label: "Guia técnico de informática",
    desc: "Guia completo: diagnóstico, custos, prazos e como escolher o serviço certo.",
  },
  {
    to: "/servicos/conserto-pc-notebook",
    label: "Conserto de PC e notebook",
    desc: "Reparo de hardware e software com orçamento fechado antes do serviço.",
  },
  {
    to: "/servicos/formatacao-computador",
    label: "Formatação com backup",
    desc: "Reinstalação limpa do sistema, drivers e programas essenciais.",
  },
  {
    to: "/servicos/upgrade-ssd-memoria",
    label: "Upgrade de SSD e memória",
    desc: "O upgrade que mais devolve velocidade a computadores lentos.",
  },
  {
    to: "/servicos/remocao-virus",
    label: "Remoção de vírus",
    desc: "Limpeza de malware, mineradores e sequestradores de navegador.",
  },
  {
    to: "/diagnostico-tecnico",
    label: "Diagnóstico técnico",
    desc: "Laudo com causa provável, opções de reparo e custo antes de decidir.",
  },
  {
    to: "/servicos",
    label: "Todos os serviços",
    desc: "Hub com os serviços de informática, redes, backup e suporte a empresas.",
  },
];

interface ServicosCorrelatosProps {
  title?: string;
  subtitle?: string;
  /** Rotas a ocultar (normalmente a própria página). */
  exclude?: string[];
  items?: CorrelatoItem[];
  limit?: number;
}

export const ServicosCorrelatos = ({
  title = "Serviços correlatos de informática",
  subtitle = "Continue pelo caminho mais próximo do seu problema — todas as páginas abaixo fazem parte do mesmo atendimento em Curitiba e região.",
  exclude = [],
  items = CORRELATOS_INFORMATICA,
  limit = 6,
}: ServicosCorrelatosProps) => {
  const list = items.filter((i) => !exclude.includes(i.to)).slice(0, limit);
  if (list.length === 0) return null;

  return (
    <section className="py-8 md:py-12 bg-secondary/40" aria-labelledby="servicos-correlatos">
      <div className="container mx-auto">
        <div className="max-w-5xl mx-auto">
          <h2 id="servicos-correlatos" className="text-2xl md:text-3xl font-bold text-primary mb-2">
            {title}
          </h2>
          <p className="text-muted-foreground mb-6 max-w-3xl">{subtitle}</p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((i) => (
              <Link
                key={i.to}
                to={i.to}
                className="group rounded-xl border bg-background p-4 transition-colors hover:border-accent"
              >
                <span className="flex items-center gap-2 font-semibold text-foreground group-hover:text-accent">
                  {i.label}
                  <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5" aria-hidden />
                </span>
                <span className="mt-1 block text-sm text-muted-foreground">{i.desc}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicosCorrelatos;
