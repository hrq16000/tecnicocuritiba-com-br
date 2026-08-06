import { Link } from "react-router-dom";
import { AlertTriangle, Eye, PlugZap, MonitorOff, HardDrive } from "lucide-react";

/**
 * Blocos curados do cluster /problemas/* (Rodada 3R).
 *
 * Regras do cluster:
 * - Página de sintoma orienta observação segura; NÃO diagnostica nem promete reparo.
 * - Nada de desmontagem, remoção de bateria interna ou procedimento invasivo.
 * - Somente links para rotas já existentes (sem criar URL nova).
 * - Conteúdo renderizado no HTML da página (sem depender de interação).
 */

export type CuratedSymptomBlock = {
  /** Itens extras do sumário navegável, na ordem em que aparecem. */
  tocItems: { id: string; label: string }[];
  alerta: { titulo: string; texto: string; itens: string[] };
  comparacao?: {
    titulo: string;
    nota: string;
    colunas: { titulo: string; itens: string[] }[];
  };
  observar: { titulo: string; itens: string[] };
  dados?: { titulo: string; texto: string; to: string; label: string };
};

export const CURATED_SYMPTOM_BLOCKS: Record<string, CuratedSymptomBlock> = {
  "notebook-nao-liga-curitiba": {
    tocItems: [
      { id: "risco-imediato", label: "Quando não insistir em ligar" },
      { id: "nao-liga-ou-sem-imagem", label: "Não liga ou liga sem imagem" },
      { id: "observar-antes", label: "O que observar antes do atendimento" },
    ],
    alerta: {
      titulo: "Quando não insistir em ligar",
      texto:
        "Quando há líquido, cheiro incomum, aquecimento extremo, estalos ou bateria deformada, insistir em ligar pode ampliar o dano. Desconecte a energia quando for seguro e solicite avaliação.",
      itens: [
        "Contato com líquido, mesmo que pouco",
        "Cheiro de queimado, estalo ou faísca no conector",
        "Aquecimento fora do normal com o aparelho desligado",
        "Bateria estufada ou carcaça deformada",
        "Ruído incomum vindo do armazenamento",
      ],
    },
    comparacao: {
      titulo: "Não liga ou liga sem imagem?",
      nota:
        "Os dois casos parecem iguais na tela apagada, mas costumam seguir caminhos de avaliação diferentes. Identificar qual é o seu ajuda a direcionar o diagnóstico — sem que isso confirme a causa.",
      colunas: [
        {
          titulo: "Não liga",
          itens: [
            "Nenhuma reação ao botão power",
            "Nenhuma luz de energia ou carga",
            "Ventoinha não gira",
            "Nenhum som ao conectar o carregador",
          ],
        },
        {
          titulo: "Liga, mas sem imagem",
          itens: [
            "LEDs acendem",
            "Ventoinha gira",
            "Teclado ilumina ou responde",
            "Sons ou bipes, com a tela permanecendo escura",
          ],
        },
      ],
    },
    observar: {
      titulo: "O que observar antes do atendimento",
      itens: [
        "Confira a tomada e teste outro ponto de energia",
        "Verifique se o carregador está firme no conector",
        "Observe quais LEDs acendem, piscam ou permanecem apagados",
        "Retire periféricos externos (pendrive, HD, dock, monitor)",
        "Anote sons, bipes ou aquecimento percebidos",
        "Registre o que aconteceu antes da falha (queda, líquido, queda de energia)",
        "Use outro carregador apenas se for comprovadamente compatível e estiver em bom estado",
      ],
    },
    dados: {
      titulo: "E os arquivos importantes?",
      texto:
        "Um notebook que não inicia pode ainda possuir arquivos recuperáveis, mas isso depende do estado do armazenamento e não pode ser garantido sem avaliação. Se há documentos críticos, informe isso logo no primeiro contato.",
      to: "/servicos/backup-recuperacao",
      label: "Recuperação de dados e backup",
    },
  },
};

export const CuratedSymptomSections = ({ block }: { block: CuratedSymptomBlock }) => (
  <>
    <section id="risco-imediato" className="py-8 bg-background scroll-mt-24">
      <div className="container mx-auto px-4">
        <div
          role="note"
          className="mx-auto flex max-w-4xl gap-3 rounded-xl border-2 border-destructive/50 bg-destructive/5 p-4 sm:p-5"
        >
          <AlertTriangle className="mt-0.5 h-6 w-6 shrink-0 text-destructive" aria-hidden="true" />
          <div>
            <h2 className="text-lg font-bold text-foreground sm:text-xl">
              Atenção: {block.alerta.titulo}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
              {block.alerta.texto}
            </p>
            <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
              {block.alerta.itens.map((i) => (
                <li key={i} className="flex gap-2">
                  <span aria-hidden="true">•</span>
                  <span>{i}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>

    {block.comparacao ? (
      <section id="nao-liga-ou-sem-imagem" className="py-8 bg-secondary/40 scroll-mt-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-xl font-bold text-foreground sm:text-2xl">{block.comparacao.titulo}</h2>
            <p className="mt-2 text-sm text-muted-foreground sm:text-base">{block.comparacao.nota}</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {block.comparacao.colunas.map((c, idx) => (
                <div key={c.titulo} className="rounded-xl border border-border bg-card p-4">
                  <div className="flex items-center gap-2 font-semibold text-foreground">
                    {idx === 0 ? (
                      <PlugZap className="h-5 w-5 text-primary" aria-hidden="true" />
                    ) : (
                      <MonitorOff className="h-5 w-5 text-primary" aria-hidden="true" />
                    )}
                    {c.titulo}
                  </div>
                  <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                    {c.itens.map((i) => (
                      <li key={i} className="flex gap-2">
                        <span aria-hidden="true">•</span>
                        <span>{i}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    ) : null}

    <section id="observar-antes" className="py-8 bg-background scroll-mt-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl rounded-xl border border-border bg-card p-4 sm:p-5">
          <h2 className="flex items-center gap-2 text-xl font-bold text-foreground sm:text-2xl">
            <Eye className="h-5 w-5 text-primary" aria-hidden="true" />
            {block.observar.titulo}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Verificações externas e seguras. Não abra o equipamento nem remova componentes internos.
          </p>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {block.observar.itens.map((i) => (
              <li key={i} className="flex gap-2 text-sm text-muted-foreground">
                <span aria-hidden="true">•</span>
                <span>{i}</span>
              </li>
            ))}
          </ul>
        </div>

        {block.dados ? (
          <div className="mx-auto mt-4 max-w-4xl rounded-xl border border-border bg-secondary/40 p-4 sm:p-5">
            <h3 className="flex items-center gap-2 font-semibold text-foreground">
              <HardDrive className="h-5 w-5 text-primary" aria-hidden="true" />
              {block.dados.titulo}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{block.dados.texto}</p>
            <Link
              to={block.dados.to}
              className="mt-3 inline-flex min-h-11 items-center text-sm font-semibold text-primary underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {block.dados.label}
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  </>
);

export default CuratedSymptomSections;
