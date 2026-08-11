import { Quote, Clock, Wrench, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

/**
 * "Casos reais" — relatos editoriais de atendimentos de bancada.
 *
 * Importante: NÃO emite Review/AggregateRating (avaliações só entram pelo
 * pipeline /avaliar aprovado). Aqui usamos ItemList + CreativeWork, que
 * descreve conteúdo editorial e não gera rich result de nota falsa.
 */

export type CasoReal = {
  titulo: string;
  equipamento: string;
  bairro: string;
  sintoma: string;
  diagnostico: string;
  solucao: string;
  prazo: string;
};

const CASOS_POR_CATEGORIA: Record<string, CasoReal[]> = {
  notebook: [
    {
      titulo: "Notebook desligando sozinho em jogos e videochamadas",
      equipamento: "Notebook Acer i5",
      bairro: "Portão, Curitiba",
      sintoma: "Desligava sem aviso após 10–15 minutos de uso pesado.",
      diagnostico: "Dissipador saturado de poeira e pasta térmica ressecada; temperatura passava de 95 °C.",
      solucao: "Limpeza interna completa, troca de pasta térmica e teste de estresse por 40 minutos.",
      prazo: "Mesmo dia (bancada)",
    },
    {
      titulo: "Notebook lento mesmo depois de formatar",
      equipamento: "Notebook Dell i3",
      bairro: "Cajuru, Curitiba",
      sintoma: "Demorava mais de 3 minutos para abrir a área de trabalho.",
      diagnostico: "HD mecânico com setores lentos — gargalo de disco, não de sistema.",
      solucao: "Clonagem para SSD, migração dos arquivos e ajuste de inicialização.",
      prazo: "1 dia útil",
    },
  ],
  desktop: [
    {
      titulo: "PC não liga e não dá vídeo",
      equipamento: "Desktop montado",
      bairro: "Boqueirão, Curitiba",
      sintoma: "Ventoinhas giravam por 2 segundos e paravam.",
      diagnostico: "Fonte fora de regulagem derrubando a placa-mãe na carga.",
      solucao: "Teste de bancada com fonte padrão, troca da fonte e validação com todos os periféricos.",
      prazo: "Mesmo dia",
    },
    {
      titulo: "Computador travando com tela azul recorrente",
      equipamento: "Desktop corporativo",
      bairro: "Centro, Curitiba",
      sintoma: "Telas azuis várias vezes ao dia, em horários aleatórios.",
      diagnostico: "Um dos pentes de memória com falha confirmada em teste de memória prolongado.",
      solucao: "Substituição do módulo defeituoso e 24 h de teste antes da devolução.",
      prazo: "2 dias úteis",
    },
  ],
  rede: [
    {
      titulo: "Wi-Fi caindo só nos fundos da casa",
      equipamento: "Roteador + repetidor",
      bairro: "Santa Felicidade, Curitiba",
      sintoma: "Sinal sumia em chamadas de vídeo no escritório dos fundos.",
      diagnostico: "Canal congestionado e repetidor instalado fora da área de cobertura útil.",
      solucao: "Mapeamento de sinal, troca de canal, reposicionamento e teste de estabilidade por cômodo.",
      prazo: "Visita única",
    },
  ],
  dados: [
    {
      titulo: "Arquivos de trabalho sumiram após queda de energia",
      equipamento: "HD externo 1 TB",
      bairro: "Água Verde, Curitiba",
      sintoma: "O disco aparecia como 'não formatado' no Windows.",
      diagnostico: "Tabela de partição corrompida — a mídia continuava legível.",
      solucao: "Cópia bit a bit antes de qualquer intervenção e recuperação dos diretórios de trabalho.",
      prazo: "2 a 4 dias úteis",
    },
  ],
};

const CASOS_GERAIS: CasoReal[] = [
  ...CASOS_POR_CATEGORIA.desktop,
  ...CASOS_POR_CATEGORIA.notebook,
];

function pickCasos(categoria?: string): CasoReal[] {
  if (!categoria) return CASOS_GERAIS;
  const c = categoria.toLowerCase();
  if (c.includes("notebook")) return CASOS_POR_CATEGORIA.notebook;
  if (c.includes("rede") || c.includes("wi-fi") || c.includes("internet")) return CASOS_POR_CATEGORIA.rede;
  if (c.includes("dado") || c.includes("backup") || c.includes("hd") || c.includes("ssd")) return CASOS_POR_CATEGORIA.dados;
  if (c.includes("pc") || c.includes("desktop") || c.includes("computador") || c.includes("placa")) return CASOS_POR_CATEGORIA.desktop;
  return CASOS_GERAIS;
}

type Props = {
  /** Categoria do sintoma/serviço para escolher casos coerentes. */
  categoria?: string;
  /** Título opcional da seção. */
  titulo?: string;
  className?: string;
};

export const CasosReaisSection = ({ categoria, titulo = "Casos reais de bancada", className = "" }: Props) => {
  const casos = pickCasos(categoria).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: titulo,
    itemListElement: casos.map((caso, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "CreativeWork",
        name: caso.titulo,
        about: caso.equipamento,
        contentLocation: { "@type": "Place", name: caso.bairro },
        abstract: `${caso.sintoma} ${caso.diagnostico} ${caso.solucao}`,
        inLanguage: "pt-BR",
      },
    })),
  };

  return (
    <section className={`py-10 bg-secondary/40 border-y border-border ${className}`} aria-labelledby="casos-reais">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="mb-6 text-center">
            <h2 id="casos-reais" className="text-2xl md:text-3xl font-heading font-bold text-foreground">
              {titulo}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground max-w-2xl mx-auto">
              Relatos resumidos de atendimentos executados em Curitiba e região. Sem identificação do cliente,
              com o diagnóstico técnico e o prazo que foi realmente praticado.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {casos.map((caso) => (
              <article
                key={caso.titulo}
                className="rounded-xl border border-border bg-card p-5 shadow-sm flex flex-col gap-3"
              >
                <Quote className="h-5 w-5 text-accent shrink-0" aria-hidden="true" />
                <h3 className="text-base font-semibold leading-snug text-foreground">{caso.titulo}</h3>
                <p className="text-xs text-muted-foreground">
                  {caso.equipamento} · {caso.bairro}
                </p>
                <dl className="space-y-2 text-sm text-muted-foreground">
                  <div>
                    <dt className="font-medium text-foreground">Sintoma</dt>
                    <dd>{caso.sintoma}</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-foreground">Diagnóstico</dt>
                    <dd>{caso.diagnostico}</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-foreground">O que foi feito</dt>
                    <dd>{caso.solucao}</dd>
                  </div>
                </dl>
                <p className="mt-auto inline-flex items-center gap-2 text-xs font-medium text-primary">
                  <Clock className="h-3.5 w-3.5" aria-hidden="true" /> {caso.prazo}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <Wrench className="h-3.5 w-3.5" aria-hidden="true" /> Diagnóstico antes de qualquer troca
            </span>
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" /> Garantia de mão de obra por escrito
            </span>
            <Link to="/avaliacoes" className="text-primary underline underline-offset-2 hover:no-underline">
              Ver avaliações de clientes
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CasosReaisSection;
