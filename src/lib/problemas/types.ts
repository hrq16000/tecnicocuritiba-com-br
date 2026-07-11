// Auto-generated types for problemaPagesData split. Do not edit by hand.
export interface ProblemaSintoma {
  titulo: string;
  desc: string;
  gravidade: string;
}

export interface ProblemaCausa {
  titulo: string;
  desc: string;
  tipo: "hardware" | "software" | "erro-humano" | "desgaste";
}

export interface ProblemaCenario {
  nivel: "Simples" | "Médio" | "Complexo";
  desc: string;
  tempo: string;
  custo: string;
}

export interface ProblemaPageData {
  slug: string;
  title: string;
  metaDescription: string;
  h1: string;
  categoria: string;
  intro: string;
  sintomas: ProblemaSintoma[];
  causas: ProblemaCausa[];
  cenarios: ProblemaCenario[];
  riscos: string[];
  diagnostico: string;
  solucao: string;
  quandoCompensa: string;
  quandoNaoCompensa: string;
  whatsappMessage: string;
  relatedPages: { label: string; to: string }[];
  conteudoExtra: string;
}
