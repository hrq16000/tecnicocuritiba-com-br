import { NAP } from "@/lib/nap";

export interface OrdemServicoData {
  numero: string;
  uso: string;
  modelo: string;
  pecasOrigem: string;
  pecasLista: string;
  orcamento: string;
  cidade: string;
  bairro: string;
  fotos: string[];
}

export function gerarNumeroOS(): string {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  const seq = Math.floor(Math.random() * 900 + 100);
  return `OS-${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}-${pad(d.getHours())}${pad(d.getMinutes())}-${seq}`;
}

/**
 * Gera o PDF da Ordem de Serviço (pré-abertura) com os dados do mini-wizard.
 * O documento é apenas um registro do pedido: não substitui o orçamento
 * aprovado nem cria obrigação de execução antes da confirmação técnica.
 */
export async function baixarOrdemServicoPdf(data: OrdemServicoData) {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const M = 48;
  const W = doc.internal.pageSize.getWidth();
  let y = M;

  const line = (text: string, size = 10, bold = false, gap = 16) => {
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.setFontSize(size);
    const chunks = doc.splitTextToSize(text, W - M * 2) as string[];
    chunks.forEach((c) => {
      if (y > 780) {
        doc.addPage();
        y = M;
      }
      doc.text(c, M, y);
      y += gap;
    });
  };

  doc.setFillColor(17, 24, 39);
  doc.rect(0, 0, W, 74, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("Ordem de Serviço - Montagem de PC", M, 34);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text(`${NAP.name} · ${NAP.city}/${NAP.state}`, M, 54);
  doc.setTextColor(20, 20, 20);
  y = 104;

  line(`Número: ${data.numero}`, 12, true);
  line(`Emitida em: ${new Date().toLocaleString("pt-BR")}`);
  y += 6;

  line("Dados do pedido", 12, true);
  line(`Uso pretendido: ${data.uso || "-"}`);
  line(`Configuração/modelo: ${data.modelo || "-"}`);
  line(`Origem das peças: ${data.pecasOrigem || "-"}`);
  if (data.pecasLista) line(`Peças informadas: ${data.pecasLista}`);
  if (data.orcamento) line(`Faixa de investimento: ${data.orcamento}`);
  line(`Local: ${[data.bairro, data.cidade].filter(Boolean).join(", ") || "-"}`);
  line(
    data.fotos.length
      ? `Fotos das peças anexadas pelo cliente (${data.fotos.length}): ${data.fotos.join(", ")}`
      : "Fotos das peças: não enviadas",
  );
  y += 6;

  line("Condições registradas", 12, true);
  [
    "Mão de obra a partir de R$ 99,99. O valor final só é cobrado após orçamento aprovado pelo cliente.",
    "Peças fornecidas pelo cliente: garantia da peça é do fabricante/vendedor. Nossa garantia de 90 dias cobre a mão de obra de montagem e configuração.",
    "Não há promessa de desempenho, FPS ou overclock. A montagem segue as especificações do fabricante.",
    "Entrega após checklist técnico: BIOS/UEFI, drivers oficiais, teste de carga e temperaturas.",
    "Avaliação de valor do equipamento em caso de sinistro, dano ou venda no estado pode ser inferior a 1/3 do valor informado, conforme laudo técnico.",
  ].forEach((t) => line(`• ${t}`, 10, false, 14));

  y += 10;
  line("Este documento comprova a abertura do pedido e não substitui o orçamento aprovado.", 9);
  line(`Contato oficial: WhatsApp ${NAP.whatsappUrl}`, 9);

  doc.save(`${data.numero}.pdf`);
}
