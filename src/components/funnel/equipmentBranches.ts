/**
 * Estrutura declarativa do funil ramificado por tipo de equipamento.
 *
 * Cada sintoma carrega metadados que a máquina de estados usa para:
 * - decidir a **modalidade** (`route`) — `remoto`, `visita` ou `coleta`;
 * - decidir se pergunta **"quando começou?"** (progressivo) ou **"quando aconteceu?"**
 *   (evento pontual — `eventual: true`);
 * - decidir se pergunta **frequência** (só faz sentido quando `intermittent: true`);
 * - exigir **vídeo** do defeito (`requiresVideo`).
 *
 * ⚠️ IMPORTANTE: qualquer sintoma sem `route` explícito é tratado como `coleta`
 * quando `requiresColeta = true`; caso contrário, o roteador decide pelo equipamento.
 */

export type Equipment =
  | "pc"
  | "tv"
  | "celular"
  | "surface"
  | "som"
  | "videogame"
  | "outro";

export type ServiceRoute = "remoto" | "visita" | "coleta";

export interface SintomaOption {
  id: string;
  label: string;
  /** Se true, força modalidade Coleta e Entrega (mínimo R$ 299,99). */
  requiresColeta?: boolean;
  /** Se true, exige upload/gravação de vídeo do defeito. */
  requiresVideo?: boolean;
  /** Rota preferencial calculada no equipamento. Se ausente, usa a regra default. */
  route?: ServiceRoute;
  /** Evento pontual (queda, líquido, tela quebrada). Usa "Quando aconteceu?". */
  eventual?: boolean;
  /** Falha intermitente — só nestes casos perguntamos frequência. */
  intermittent?: boolean;
  /** Rótulo curto extra usado no resumo (opcional). */
  hint?: string;
}

export interface EquipmentBranch {
  id: Equipment;
  label: string;
  emoji: string;
  marcaLabel: string;
  marcaOptions: string[];
  sintomas: SintomaOption[];
  /** Rota default do equipamento quando o sintoma não define uma. */
  defaultRoute: ServiceRoute;
}

export const EQUIPMENT_BRANCHES: EquipmentBranch[] = [
  {
    id: "pc",
    label: "PC / Notebook",
    emoji: "💻",
    marcaLabel: "Qual a marca/tipo?",
    marcaOptions: ["Dell", "Lenovo", "HP", "Acer", "Asus", "Samsung", "Apple (Mac)", "Desktop montado", "Outra"],
    defaultRoute: "visita",
    sintomas: [
      { id: "instalar-programa", label: "Instalar / configurar programa", route: "remoto" },
      { id: "config-impressora", label: "Configurar impressora / periférico", route: "visita" },
      { id: "virus", label: "Vírus / lentidão suspeita", route: "remoto", intermittent: true },
      { id: "lento", label: "Lento / travando", route: "visita", intermittent: true },
      { id: "wifi", label: "Sem Wi-Fi / rede local", route: "visita" },
      { id: "windows", label: "Problema no Windows / sistema", route: "visita" },
      { id: "recuperar-arquivos", label: "Recuperar arquivos", route: "coleta", requiresColeta: true },
      { id: "trocar-peca", label: "Trocar / instalar componente", route: "coleta", requiresColeta: true },
      { id: "nao-liga", label: "Não liga / possível defeito de placa", requiresColeta: true, requiresVideo: true, route: "coleta", eventual: true },
      { id: "desliga-sozinho", label: "Liga e desliga sozinho / superaquece", requiresColeta: true, requiresVideo: true, route: "coleta", intermittent: true },
      { id: "tela-quebrada", label: "Tela quebrada / manchas", requiresColeta: true, requiresVideo: true, route: "coleta", eventual: true },
      { id: "molhou", label: "Molhou / caiu líquido", requiresColeta: true, route: "coleta", eventual: true },
    ],
  },
  {
    id: "tv",
    label: "TV",
    emoji: "📺",
    marcaLabel: "Marca e tamanho",
    marcaOptions: ["Samsung", "LG", "Sony", "TCL", "Philco", "AOC", "Philips", "Toshiba", "Outra"],
    defaultRoute: "coleta",
    sintomas: [
      { id: "nao-liga", label: "Não liga", requiresColeta: true, requiresVideo: true, eventual: true },
      { id: "liga-desliga", label: "Liga e desliga sozinha", requiresColeta: true, requiresVideo: true, intermittent: true },
      { id: "tela-quebrada", label: "Tela quebrada / trincada", requiresColeta: true, requiresVideo: true, eventual: true, hint: "possível análise de display" },
      { id: "sem-imagem", label: "Tela escura com som", requiresColeta: true, requiresVideo: true, hint: "possível análise de LEDs" },
      { id: "sem-som", label: "Sem som (imagem normal)", requiresColeta: true, requiresVideo: true },
      { id: "linhas-manchas", label: "Linhas / manchas na tela", requiresColeta: true, requiresVideo: true, hint: "possível análise de display" },
      { id: "hdmi", label: "Não reconhece HDMI / cabo", requiresColeta: true, intermittent: true },
    ],
  },
  {
    id: "celular",
    label: "Celular / Tablet",
    emoji: "📱",
    marcaLabel: "Marca",
    marcaOptions: ["iPhone (Apple)", "Samsung", "Motorola", "Xiaomi", "LG", "Outra"],
    defaultRoute: "coleta",
    sintomas: [
      { id: "tela-trincada", label: "Tela trincada / quebrada", requiresColeta: true, requiresVideo: true, eventual: true },
      { id: "nao-carrega", label: "Não carrega / não liga", requiresColeta: true, requiresVideo: true, eventual: true },
      { id: "molhou", label: "Molhou", requiresColeta: true, eventual: true },
      { id: "sem-som", label: "Sem som / alto-falante", requiresColeta: true, requiresVideo: true },
      { id: "reinicia", label: "Reinicia / trava", requiresColeta: true, intermittent: true },
      { id: "bateria", label: "Bateria acaba rápido", requiresColeta: true },
      { id: "camera", label: "Câmera / áudio / conector", requiresColeta: true },
    ],
  },
  {
    id: "surface",
    label: "Surface",
    emoji: "🖥️",
    marcaLabel: "Modelo / linha (se souber)",
    marcaOptions: ["Surface Pro", "Surface Laptop", "Surface Go", "Surface Book", "Surface Studio", "Não sei"],
    defaultRoute: "coleta",
    sintomas: [
      { id: "nao-liga", label: "Não liga", requiresColeta: true, requiresVideo: true, eventual: true },
      { id: "tela-quebrada", label: "Tela quebrada", requiresColeta: true, requiresVideo: true, eventual: true },
      { id: "nao-carrega", label: "Não carrega", requiresColeta: true, eventual: true },
      { id: "bateria", label: "Bateria", requiresColeta: true },
      { id: "teclado", label: "Teclado", requiresColeta: true },
      { id: "sistema", label: "Sistema", requiresColeta: true },
      { id: "superaquece", label: "Superaquecimento", requiresColeta: true, intermittent: true },
      { id: "outro", label: "Outro", requiresColeta: true },
    ],
  },
  {
    id: "som",
    label: "Som / Áudio",
    emoji: "🔊",
    marcaLabel: "Tipo / marca",
    marcaOptions: ["Receiver", "Amplificador", "Caixa Bluetooth (JBL, etc.)", "Soundbar", "Home-theater", "Mini system", "Outro"],
    defaultRoute: "coleta",
    sintomas: [
      { id: "nao-liga", label: "Não liga", requiresColeta: true, requiresVideo: true, eventual: true },
      { id: "sem-som", label: "Liga sem som", requiresColeta: true, requiresVideo: true },
      { id: "canal", label: "Um canal não funciona", requiresColeta: true, requiresVideo: true },
      { id: "chiado", label: "Chiado / ruído estranho", requiresColeta: true, requiresVideo: true, intermittent: true },
      { id: "desliga", label: "Desliga sozinho", requiresColeta: true, intermittent: true },
      { id: "entrada", label: "Entrada não funciona", requiresColeta: true },
      { id: "bluetooth", label: "Bluetooth não conecta", requiresColeta: true },
      { id: "molhou", label: "Molhou", requiresColeta: true, eventual: true },
    ],
  },
  {
    id: "videogame",
    label: "Videogame",
    emoji: "🎮",
    marcaLabel: "Console",
    marcaOptions: ["PlayStation 5", "PlayStation 4", "Xbox Series X/S", "Xbox One", "Nintendo Switch", "PS3 / Xbox 360", "Outro"],
    defaultRoute: "coleta",
    sintomas: [
      { id: "nao-liga", label: "Não liga", requiresColeta: true, requiresVideo: true, eventual: true, hint: "possível reparo de placa" },
      { id: "desliga-sozinho", label: "Desliga / superaquece", requiresColeta: true, requiresVideo: true, intermittent: true },
      { id: "nao-le-disco", label: "Não lê disco", requiresColeta: true, requiresVideo: true },
      { id: "hdmi", label: "Sem imagem / HDMI queimado", requiresColeta: true, requiresVideo: true, eventual: true },
      { id: "drift", label: "Drift / controle solto", requiresColeta: true, intermittent: true },
      { id: "outro", label: "Outro problema", requiresColeta: true },
    ],
  },
  {
    id: "outro",
    label: "Outro",
    emoji: "💬",
    marcaLabel: "Conte sobre o equipamento",
    marcaOptions: [],
    defaultRoute: "coleta",
    sintomas: [],
  },
];

export function getBranch(id: Equipment): EquipmentBranch | undefined {
  return EQUIPMENT_BRANCHES.find((b) => b.id === id);
}

export function getSintoma(equipId: Equipment, sintomaId: string): SintomaOption | undefined {
  return getBranch(equipId)?.sintomas.find((s) => s.id === sintomaId);
}

/**
 * Decide a modalidade final. Regras:
 * - Se o sintoma tem `route`, ele vence.
 * - Se `requiresColeta` for verdadeiro, sempre `coleta`.
 * - Caso contrário, cai no `defaultRoute` do equipamento.
 * - `outro` sempre é `coleta`.
 */
export function resolveRoute(equipId: Equipment | null, sintomaId: string): ServiceRoute {
  if (!equipId) return "coleta";
  if (equipId === "outro") return "coleta";
  const branch = getBranch(equipId);
  const sintoma = sintomaId ? getSintoma(equipId, sintomaId) : undefined;
  if (sintoma?.requiresColeta) return "coleta";
  if (sintoma?.route) return sintoma.route;
  return branch?.defaultRoute ?? "coleta";
}
