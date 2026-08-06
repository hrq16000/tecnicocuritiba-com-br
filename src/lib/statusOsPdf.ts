import { NAP } from "@/lib/nap";

export interface StatusOsPdfEtapa {
  label: string;
  desc: string;
  estado: "concluida" | "atual" | "pendente";
}

export interface StatusOsPdfHistorico {
  quando: string;
  etapa: string;
  observacao?: string;
}

export interface StatusOsPdfData {
  numero: string;
  etapaAtual: string;
  equipamento?: string | null;
  local?: string | null;
  prazoEstimado?: string | null;
  previsaoConclusao?: string | null;
  abertura: string;
  atualizacao: string;
  observacaoPublica?: string | null;
  sintomas?: string | null;
  fotos: string[];
  etapas: StatusOsPdfEtapa[];
  historico: StatusOsPdfHistorico[];
  linkAcompanhamento: string;
}

/** Converte uma foto pública em data URL para embutir no PDF (falha silenciosa). */
async function toDataUrl(url: string): Promise<string | null> {
  try {
    const res = await fetch(url, { mode: "cors" });
    if (!res.ok) return null;
    const blob = await res.blob();
    if (!blob.type.startsWith("image/")) return null;
    return await new Promise<string | null>((resolve) => {
      const fr = new FileReader();
      fr.onload = () => resolve(typeof fr.result === "string" ? fr.result : null);
      fr.onerror = () => resolve(null);
      fr.readAsDataURL(blob);
    });
  } catch {
    return null;
  }
}

/**
 * Comprovante de acompanhamento da Ordem de Serviço: timeline, prazos,
 * histórico e fotos enviadas pelo cliente. É um documento informativo —
 * não substitui orçamento aprovado nem laudo técnico.
 */
export async function baixarStatusOsPdf(data: StatusOsPdfData) {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const M = 48;
  const W = doc.internal.pageSize.getWidth();
  let y = M;

  const ensure = (h: number) => {
    if (y + h > 790) {
      doc.addPage();
      y = M;
    }
  };

  const line = (text: string, size = 10, bold = false, gap = 15) => {
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.setFontSize(size);
    const chunks = doc.splitTextToSize(text, W - M * 2) as string[];
    chunks.forEach((c) => {
      ensure(gap);
      doc.text(c, M, y);
      y += gap;
    });
  };

  doc.setFillColor(17, 24, 39);
  doc.rect(0, 0, W, 74, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("Acompanhamento da Ordem de Serviço", M, 34);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text(`${NAP.name} · ${NAP.city}/${NAP.region}`, M, 54);
  doc.setTextColor(20, 20, 20);
  y = 104;

  line(`OS ${data.numero}`, 13, true);
  line(`Etapa atual: ${data.etapaAtual}`);
  if (data.equipamento) line(`Equipamento: ${data.equipamento}`);
  if (data.local) line(`Local do atendimento: ${data.local}`);
  if (data.prazoEstimado) line(`Prazo estimado: ${data.prazoEstimado}`);
  if (data.previsaoConclusao) line(`Previsão de conclusão: ${data.previsaoConclusao}`);
  line(`Abertura: ${data.abertura}`);
  line(`Última atualização: ${data.atualizacao}`);
  line(`Emitido em: ${new Date().toLocaleString("pt-BR")}`);
  y += 8;

  line("Andamento", 12, true);
  data.etapas.forEach((e) => {
    const marca = e.estado === "concluida" ? "[x]" : e.estado === "atual" ? "[>]" : "[ ]";
    line(`${marca} ${e.label} — ${e.desc}`, 10, e.estado === "atual", 14);
  });
  y += 6;

  if (data.observacaoPublica) {
    line("Observação da equipe", 12, true);
    line(data.observacaoPublica);
    y += 6;
  }

  if (data.sintomas) {
    line("Sintomas informados na entrada", 12, true);
    line(data.sintomas);
    y += 6;
  }

  if (data.historico.length) {
    line("Histórico", 12, true);
    data.historico.forEach((h) => {
      line(`• ${h.quando} — ${h.etapa}${h.observacao ? `: ${h.observacao}` : ""}`, 10, false, 14);
    });
    y += 6;
  }

  if (data.fotos.length) {
    line(`Fotos enviadas pelo portal (${data.fotos.length})`, 12, true);
    const size = 120;
    let x = M;
    for (const url of data.fotos.slice(0, 8)) {
      const dataUrl = await toDataUrl(url);
      if (!dataUrl) {
        line(url, 8, false, 12);
        continue;
      }
      ensure(size + 12);
      if (x + size > W - M) {
        x = M;
        y += size + 12;
        ensure(size + 12);
      }
      try {
        doc.addImage(dataUrl, "JPEG", x, y, size, size, undefined, "FAST");
        x += size + 12;
      } catch {
        line(url, 8, false, 12);
      }
    }
    y += size + 18;
  }

  ensure(60);
  line("Documento informativo de acompanhamento. Não substitui o orçamento aprovado nem o laudo técnico.", 9);
  line(`Acompanhe online: ${data.linkAcompanhamento}`, 9);
  line(`Contato oficial: WhatsApp ${NAP.whatsappUrl}`, 9);

  doc.save(`acompanhamento-${data.numero}.pdf`);
}
