/**
 * Vizinhança real entre bairros de Curitiba (limites geográficos),
 * usada para linking interno cruzado de SEO local em /bairros/*.
 * Só slugs com página publicada entram aqui.
 */
export const CURITIBA_BAIRROS: Record<string, string> = {
  "agua-verde": "Água Verde",
  "alto-boqueirao": "Alto Boqueirão",
  "alto-da-gloria": "Alto da Glória",
  bacacheri: "Bacacheri",
  batel: "Batel",
  bigorrilho: "Bigorrilho",
  "boa-vista": "Boa Vista",
  boqueirao: "Boqueirão",
  cabral: "Cabral",
  cajuru: "Cajuru",
  "campo-comprido": "Campo Comprido",
  "capao-da-imbuia": "Capão da Imbuia",
  centro: "Centro",
  cic: "CIC",
  "cristo-rei": "Cristo Rei",
  fazendinha: "Fazendinha",
  hauer: "Hauer",
  "hugo-lange": "Hugo Lange",
  "jardim-botanico": "Jardim Botânico",
  "jardim-das-americas": "Jardim das Américas",
  "jardim-social": "Jardim Social",
  juveve: "Juvevê",
  merces: "Mercês",
  "novo-mundo": "Novo Mundo",
  pinheirinho: "Pinheirinho",
  portao: "Portão",
  reboucas: "Rebouças",
  "santa-felicidade": "Santa Felicidade",
  seminario: "Seminário",
  "sitio-cercado": "Sítio Cercado",
  taruma: "Tarumã",
  tingui: "Tingui",
  uberaba: "Uberaba",
  "vila-izabel": "Vila Izabel",
  xaxim: "Xaxim",
};

const EDGES: [string, string][] = [
  ["batel", "bigorrilho"], ["batel", "centro"], ["batel", "agua-verde"], ["batel", "seminario"], ["batel", "merces"],
  ["bigorrilho", "centro"], ["bigorrilho", "merces"], ["bigorrilho", "campo-comprido"], ["bigorrilho", "seminario"],
  ["centro", "merces"], ["centro", "alto-da-gloria"], ["centro", "reboucas"], ["centro", "cristo-rei"], ["centro", "juveve"],
  ["agua-verde", "reboucas"], ["agua-verde", "vila-izabel"], ["agua-verde", "portao"], ["agua-verde", "seminario"],
  ["vila-izabel", "portao"], ["vila-izabel", "seminario"], ["seminario", "campo-comprido"], ["seminario", "portao"],
  ["portao", "novo-mundo"], ["portao", "fazendinha"], ["portao", "campo-comprido"], ["portao", "hauer"],
  ["fazendinha", "cic"], ["fazendinha", "campo-comprido"], ["fazendinha", "novo-mundo"], ["cic", "campo-comprido"], ["cic", "pinheirinho"],
  ["novo-mundo", "pinheirinho"], ["novo-mundo", "hauer"], ["novo-mundo", "cic"], ["pinheirinho", "xaxim"], ["pinheirinho", "sitio-cercado"],
  ["xaxim", "hauer"], ["xaxim", "boqueirao"], ["xaxim", "sitio-cercado"], ["hauer", "boqueirao"], ["hauer", "jardim-botanico"],
  ["boqueirao", "alto-boqueirao"], ["boqueirao", "uberaba"], ["boqueirao", "sitio-cercado"], ["alto-boqueirao", "sitio-cercado"], ["alto-boqueirao", "uberaba"],
  ["uberaba", "jardim-das-americas"], ["uberaba", "cajuru"], ["uberaba", "jardim-botanico"], ["jardim-das-americas", "cajuru"], ["jardim-das-americas", "jardim-botanico"],
  ["jardim-botanico", "reboucas"], ["jardim-botanico", "cristo-rei"], ["jardim-botanico", "cajuru"], ["reboucas", "hauer"],
  ["cristo-rei", "cajuru"], ["cristo-rei", "alto-da-gloria"], ["cristo-rei", "jardim-social"], ["cristo-rei", "capao-da-imbuia"],
  ["cajuru", "capao-da-imbuia"], ["capao-da-imbuia", "taruma"], ["capao-da-imbuia", "jardim-social"], ["taruma", "bacacheri"], ["taruma", "jardim-social"],
  ["jardim-social", "hugo-lange"], ["jardim-social", "bacacheri"], ["hugo-lange", "juveve"], ["hugo-lange", "alto-da-gloria"], ["hugo-lange", "cabral"],
  ["juveve", "alto-da-gloria"], ["juveve", "cabral"], ["cabral", "bacacheri"], ["cabral", "boa-vista"], ["cabral", "merces"],
  ["bacacheri", "boa-vista"], ["boa-vista", "tingui"], ["boa-vista", "santa-felicidade"], ["tingui", "bacacheri"],
  ["merces", "santa-felicidade"], ["merces", "campo-comprido"], ["santa-felicidade", "campo-comprido"],
];

const ADJ: Record<string, string[]> = {};
for (const [a, b] of EDGES) {
  (ADJ[a] ??= []).push(b);
  (ADJ[b] ??= []).push(a);
}

export interface NearbyBairro { slug: string; nome: string }

export function nearbyBairros(slug: string, max = 6): NearbyBairro[] {
  return (ADJ[slug] ?? [])
    .filter((s) => CURITIBA_BAIRROS[s])
    .slice(0, max)
    .map((s) => ({ slug: s, nome: CURITIBA_BAIRROS[s] ?? s }));
}
