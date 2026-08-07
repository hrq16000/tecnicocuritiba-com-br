import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

export interface ResumoSeo {
  periodo?: { inicio: string; fim: string };
  performance?: {
    disponivel?: boolean;
    motivo?: string;
    propriedade?: string;
    cliques?: number;
    impressoes?: number;
    ctr?: number;
    posicao_media?: number;
    top_paginas?: { url: string; cliques: number; impressoes: number; posicao: number }[];
    top_consultas?: { termo: string; cliques: number; impressoes: number; posicao: number }[];
    sitemaps?: { path: string; submetidas: number; indexadas: number; erros: number }[];
  };
  sitemap?: { urls_inicio: number; urls_fim: number; adicionadas: number; removidas: number };
  verificacoes?: { total: number; deploys: number; erros_max: number; erros_final: number };
  alertas?: {
    total: number;
    criticos: number;
    resolvidos: number;
    por_tipo?: { tipo: string; qtd: number }[];
    itens_corrigidos?: string[];
  };
}

const AZUL: [number, number, number] = [17, 74, 140];
const CINZA: [number, number, number] = [90, 98, 112];

const nome = (mes: string) =>
  new Date(`${mes.slice(0, 7)}-02T00:00:00`).toLocaleDateString("pt-BR", { month: "long", year: "numeric" });

const num = (n = 0) => n.toLocaleString("pt-BR");
const pct = (n = 0) => `${(n * 100).toFixed(2)}%`;

/** Gera o PDF mensal de SEO e dispara o download. Retorna o nome do arquivo. */
export function gerarRelatorioSeoPdf(mes: string, r: ResumoSeo): string {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const L = 40;
  let y = 56;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.setTextColor(...AZUL);
  doc.text("Relatório mensal de SEO", L, y);

  y += 20;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(...CINZA);
  doc.text(`Técnico Curitiba — tecnicocuritiba.com.br`, L, y);
  y += 15;
  doc.text(
    `Período: ${nome(mes)}${r.periodo ? ` (${r.periodo.inicio} a ${r.periodo.fim})` : ""}`,
    L,
    y,
  );
  y += 15;
  doc.text(`Emitido em ${new Date().toLocaleString("pt-BR")}`, L, y);

  const p = r.performance ?? {};
  y += 28;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.setTextColor(...AZUL);
  doc.text("1. Desempenho na busca (Google Search Console)", L, y);

  if (p.disponivel) {
    autoTable(doc, {
      startY: y + 10,
      head: [["Cliques", "Impressões", "CTR", "Posição média"]],
      body: [[num(p.cliques), num(p.impressoes), pct(p.ctr), (p.posicao_media ?? 0).toFixed(1)]],
      theme: "grid",
      headStyles: { fillColor: AZUL },
      styles: { fontSize: 10 },
      margin: { left: L, right: L },
    });
  } else {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(...CINZA);
    doc.text(`Dados indisponíveis${p.motivo ? ` — ${p.motivo}` : ""}.`, L, y + 18);
  }

  type Doc = jsPDF & { lastAutoTable?: { finalY: number } };
  const after = (fallback: number) => ((doc as Doc).lastAutoTable?.finalY ?? fallback) + 26;

  if (p.top_paginas?.length) {
    y = after(y + 20);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.setTextColor(...AZUL);
    doc.text("2. Páginas com mais cliques", L, y);
    autoTable(doc, {
      startY: y + 10,
      head: [["Página", "Cliques", "Impressões", "Posição"]],
      body: p.top_paginas.slice(0, 15).map((x) => [
        x.url.replace("https://tecnicocuritiba.com.br", "") || "/",
        num(x.cliques),
        num(x.impressoes),
        String(x.posicao),
      ]),
      theme: "striped",
      headStyles: { fillColor: AZUL },
      styles: { fontSize: 9, cellWidth: "wrap" },
      columnStyles: { 0: { cellWidth: 260 } },
      margin: { left: L, right: L },
    });
  }

  if (p.top_consultas?.length) {
    y = after(y + 20);
    if (y > 680) { doc.addPage(); y = 56; }
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.setTextColor(...AZUL);
    doc.text("3. Termos de busca mais relevantes", L, y);
    autoTable(doc, {
      startY: y + 10,
      head: [["Termo", "Cliques", "Impressões", "Posição"]],
      body: p.top_consultas.slice(0, 15).map((x) => [x.termo, num(x.cliques), num(x.impressoes), String(x.posicao)]),
      theme: "striped",
      headStyles: { fillColor: AZUL },
      styles: { fontSize: 9 },
      columnStyles: { 0: { cellWidth: 260 } },
      margin: { left: L, right: L },
    });
  }

  y = after(y + 20);
  if (y > 620) { doc.addPage(); y = 56; }
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.setTextColor(...AZUL);
  doc.text("4. Cobertura e indexação", L, y);
  const s = r.sitemap ?? { urls_inicio: 0, urls_fim: 0, adicionadas: 0, removidas: 0 };
  const v = r.verificacoes ?? { total: 0, deploys: 0, erros_max: 0, erros_final: 0 };
  autoTable(doc, {
    startY: y + 10,
    head: [["Indicador", "Valor"]],
    body: [
      ["URLs no sitemap (início do mês)", num(s.urls_inicio)],
      ["URLs no sitemap (fim do mês)", num(s.urls_fim)],
      ["URLs adicionadas", num(s.adicionadas)],
      ["URLs removidas", num(s.removidas)],
      ["Verificações executadas", num(v.total)],
      ["Verificações disparadas por deploy", num(v.deploys)],
      ["Erros no pior momento do mês", num(v.erros_max)],
      ["Erros na última verificação", num(v.erros_final)],
      ...(p.sitemaps ?? []).map((x) => [
        `Sitemap ${x.path.replace("https://tecnicocuritiba.com.br/", "")}`,
        `${num(x.indexadas)} indexadas / ${num(x.submetidas)} enviadas${x.erros ? ` — ${x.erros} erro(s)` : ""}`,
      ]),
    ],
    theme: "grid",
    headStyles: { fillColor: AZUL },
    styles: { fontSize: 9 },
    margin: { left: L, right: L },
  });

  y = after(y + 20);
  if (y > 620) { doc.addPage(); y = 56; }
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.setTextColor(...AZUL);
  doc.text("5. Alertas e itens corrigidos", L, y);
  const a = r.alertas ?? { total: 0, criticos: 0, resolvidos: 0 };
  autoTable(doc, {
    startY: y + 10,
    head: [["Alertas no período", "Críticos", "Resolvidos"]],
    body: [[num(a.total), num(a.criticos), num(a.resolvidos)]],
    theme: "grid",
    headStyles: { fillColor: AZUL },
    styles: { fontSize: 10 },
    margin: { left: L, right: L },
  });

  if (a.por_tipo?.length) {
    autoTable(doc, {
      startY: after(y + 20) - 10,
      head: [["Tipo de alerta", "Ocorrências"]],
      body: a.por_tipo.map((t) => [t.tipo, num(t.qtd)]),
      theme: "striped",
      headStyles: { fillColor: AZUL },
      styles: { fontSize: 9 },
      margin: { left: L, right: L },
    });
  }

  if (a.itens_corrigidos?.length) {
    let cy = after(y + 20);
    if (cy > 700) { doc.addPage(); cy = 56; }
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(...AZUL);
    doc.text("Itens corrigidos", L, cy);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(...CINZA);
    cy += 14;
    for (const item of a.itens_corrigidos.slice(0, 25)) {
      if (cy > 780) { doc.addPage(); cy = 56; }
      doc.text(`• ${item}`.slice(0, 120), L, cy);
      cy += 13;
    }
  }

  const total = doc.getNumberOfPages();
  for (let i = 1; i <= total; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(...CINZA);
    doc.text(`Técnico Curitiba — relatório de SEO ${nome(mes)} — página ${i}/${total}`, L, 812);
  }

  const arquivo = `relatorio-seo-${mes.slice(0, 7)}.pdf`;
  doc.save(arquivo);
  return arquivo;
}
