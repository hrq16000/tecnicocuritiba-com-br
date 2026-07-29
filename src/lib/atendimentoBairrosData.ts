// Bairros por cidade para /atendimento/:cidade/:bairro.
// Lista curada: bairros com maior volume de busca (Curitiba) e centros/regiões
// consolidadas nas demais cidades da RMC. Slugs kebab-case, sem acento.
export interface BairroAtendimento {
  slug: string;
  nome: string;
}

export const BAIRROS_ATENDIMENTO: Record<string, BairroAtendimento[]> = {
  curitiba: [
    { slug: "centro", nome: "Centro" },
    { slug: "batel", nome: "Batel" },
    { slug: "agua-verde", nome: "Água Verde" },
    { slug: "portao", nome: "Portão" },
    { slug: "cic", nome: "CIC" },
    { slug: "boa-vista", nome: "Boa Vista" },
    { slug: "bacacheri", nome: "Bacacheri" },
    { slug: "santa-felicidade", nome: "Santa Felicidade" },
    { slug: "cabral", nome: "Cabral" },
    { slug: "hauer", nome: "Hauer" },
    { slug: "cajuru", nome: "Cajuru" },
    { slug: "tatuquara", nome: "Tatuquara" },
    { slug: "boqueirao", nome: "Boqueirão" },
    { slug: "pinheirinho", nome: "Pinheirinho" },
    { slug: "sitio-cercado", nome: "Sítio Cercado" },
    { slug: "uberaba", nome: "Uberaba" },
    { slug: "novo-mundo", nome: "Novo Mundo" },
  ],
  "sao-jose-dos-pinhais": [
    { slug: "centro", nome: "Centro" },
    { slug: "afonso-pena", nome: "Afonso Pena" },
    { slug: "cidade-jardim", nome: "Cidade Jardim" },
    { slug: "guatupe", nome: "Guatupê" },
    { slug: "sao-pedro", nome: "São Pedro" },
    { slug: "aviacao", nome: "Aviação" },
  ],
  araucaria: [
    { slug: "centro", nome: "Centro" },
    { slug: "iguacu", nome: "Iguaçu" },
    { slug: "capela-velha", nome: "Capela Velha" },
    { slug: "cachoeira", nome: "Cachoeira" },
  ],
  "campo-largo": [
    { slug: "centro", nome: "Centro" },
    { slug: "cercadinho", nome: "Cercadinho" },
    { slug: "sao-caetano", nome: "São Caetano" },
  ],
  pinhais: [
    { slug: "centro", nome: "Centro" },
    { slug: "atuba", nome: "Atuba" },
    { slug: "estancia-pinhais", nome: "Estância Pinhais" },
    { slug: "weissopolis", nome: "Weissópolis" },
  ],
  colombo: [
    { slug: "centro", nome: "Centro" },
    { slug: "atuba", nome: "Atuba" },
    { slug: "sao-gabriel", nome: "São Gabriel" },
    { slug: "alto-maracana", nome: "Alto Maracanã" },
  ],
  "almirante-tamandare": [
    { slug: "centro", nome: "Centro" },
    { slug: "tranqueira", nome: "Tranqueira" },
  ],
  "fazenda-rio-grande": [
    { slug: "centro", nome: "Centro" },
    { slug: "eucaliptos", nome: "Eucaliptos" },
    { slug: "nacoes", nome: "Nações" },
  ],
  piraquara: [
    { slug: "centro", nome: "Centro" },
    { slug: "guarituba", nome: "Guarituba" },
  ],
  "campo-magro": [{ slug: "centro", nome: "Centro" }],
  "quatro-barras": [{ slug: "centro", nome: "Centro" }],
  "balsa-nova": [{ slug: "centro", nome: "Centro" }],
  contenda: [{ slug: "centro", nome: "Centro" }],
  mandirituba: [{ slug: "centro", nome: "Centro" }],
  "tijucas-do-sul": [{ slug: "centro", nome: "Centro" }],
  "rio-branco-do-sul": [{ slug: "centro", nome: "Centro" }],
};

export function getBairrosByCidade(cidadeSlug: string): BairroAtendimento[] {
  return BAIRROS_ATENDIMENTO[cidadeSlug] || [];
}

export function getBairro(cidadeSlug: string, bairroSlug: string): BairroAtendimento | undefined {
  return (BAIRROS_ATENDIMENTO[cidadeSlug] || []).find((b) => b.slug === bairroSlug);
}

/**
 * Lista completa (cidade + bairro) para geração de sitemap e testes.
 */
export function listAllAtendimentoBairroPaths(): Array<{ cidade: string; bairro: string }> {
  const out: Array<{ cidade: string; bairro: string }> = [];
  for (const [cidade, bairros] of Object.entries(BAIRROS_ATENDIMENTO)) {
    for (const b of bairros) out.push({ cidade, bairro: b.slug });
  }
  return out;
}
