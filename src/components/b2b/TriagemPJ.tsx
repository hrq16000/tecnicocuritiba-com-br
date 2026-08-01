import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, FileSignature, Mail, Cloud, HardDriveDownload, Server } from "lucide-react";
import { trackCTAClick } from "@/lib/analytics";
import { buildWhatsAppUrl } from "@/lib/whatsappMessage";

/**
 * Triagem PJ consolidada — página-mãe /suporte-empresas.
 * Reúne as ofertas B2B que antes viviam em páginas rivais
 * (contratos, Microsoft 365, Google Workspace, backup, servidores).
 */

type PJOption = {
  id: string;
  icon: typeof MessageCircle;
  title: string;
  desc: string;
  bullets: string[];
  servicoLabel: string;
};

export const PJ_OPTIONS: PJOption[] = [
  {
    id: "contrato",
    icon: FileSignature,
    title: "Contrato mensal de suporte",
    desc: "Plano fixo com SLA, atendimento remoto ilimitado e visitas programadas.",
    bullets: [
      "A partir de R$ 300/mês (até 5 equipamentos)",
      "SLA de resposta em até 2 horas úteis",
      "Nota fiscal e pagamento faturado (boleto 30 dias)",
    ],
    servicoLabel: "Contrato mensal de suporte PJ",
  },
  {
    id: "microsoft-365",
    icon: Mail,
    title: "Microsoft 365 corporativo",
    desc: "Licenciamento, migração de e-mail, Teams, OneDrive e políticas de segurança.",
    bullets: [
      "Migração de e-mail sem perda de histórico",
      "MFA, políticas de senha e antispam",
      "Treinamento básico da equipe incluído",
    ],
    servicoLabel: "Microsoft 365 empresarial",
  },
  {
    id: "google-workspace",
    icon: Cloud,
    title: "Google Workspace",
    desc: "Criação de domínio, contas, Drive compartilhado e regras de compartilhamento.",
    bullets: [
      "Configuração de SPF, DKIM e DMARC",
      "Drive compartilhado por setor",
      "Migração de Gmail/IMAP legado",
    ],
    servicoLabel: "Google Workspace empresarial",
  },
  {
    id: "backup",
    icon: HardDriveDownload,
    title: "Backup e continuidade",
    desc: "Rotina de backup em nuvem e local, com teste de restauração documentado.",
    bullets: [
      "Regra 3-2-1 (nuvem + local + offsite)",
      "Teste de restauração trimestral",
      "Proteção contra ransomware e versionamento",
    ],
    servicoLabel: "Backup corporativo e continuidade",
  },
  {
    id: "servidores",
    icon: Server,
    title: "Servidores e infraestrutura",
    desc: "Servidores de arquivos, Active Directory, VPN, racks e Wi-Fi corporativo.",
    bullets: [
      "Servidor de arquivos e AD/DNS",
      "VPN site-to-site e acesso remoto",
      "Cabeamento estruturado e Wi-Fi UniFi/Mikrotik",
    ],
    servicoLabel: "Servidores e infraestrutura de TI",
  },
];

export const TriagemPJ = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const active = PJ_OPTIONS.find((o) => o.id === selected) ?? null;

  const openWhatsApp = () => {
    if (!active) return;
    trackCTAClick("whatsapp", `pj_triagem_${active.id}`, {
      servico: active.servicoLabel,
      modalidade: "visita",
    });
    const url = buildWhatsAppUrl({
      servicoLabel: active.servicoLabel,
      bairroLabel: "Curitiba",
      fallback: "Olá! Preciso de suporte de TI para minha empresa em Curitiba.",
    });
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="py-10 md:py-14 bg-background" id="triagem-pj" aria-labelledby="triagem-pj-title">
      <div className="container mx-auto">
        <div className="max-w-5xl mx-auto">
          <h2 id="triagem-pj-title" className="text-2xl md:text-3xl font-bold text-foreground mb-2 text-center">
            Triagem PJ: qual é a sua demanda de TI?
          </h2>
          <p className="text-muted-foreground text-center mb-8">
            Selecione o cenário mais próximo. A proposta comercial chega já com escopo, SLA e valores.
          </p>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PJ_OPTIONS.map((opt) => {
              const Icon = opt.icon;
              const isActive = selected === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setSelected(opt.id)}
                  aria-pressed={isActive}
                  className={`text-left rounded-xl border p-5 transition-colors ${
                    isActive
                      ? "border-primary bg-primary/5 ring-2 ring-primary/30"
                      : "border-border bg-muted/30 hover:border-primary/40"
                  }`}
                >
                  <Icon className="h-6 w-6 text-primary mb-3" aria-hidden="true" />
                  <h3 className="font-semibold text-foreground mb-1">{opt.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{opt.desc}</p>
                  <ul className="space-y-1 text-xs text-muted-foreground">
                    {opt.bullets.map((b) => (
                      <li key={b} className="flex gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </button>
              );
            })}
          </div>

          <div className="mt-8 rounded-xl border border-border bg-muted/30 p-6 text-center">
            <p className="text-sm text-muted-foreground mb-4">
              {active
                ? `Selecionado: ${active.title}. Visita técnica corporativa a partir de R$ 99,99 (30 min) · hora combinada R$ 169,99 · contratos a partir de R$ 300/mês.`
                : "Escolha uma opção acima para liberar a proposta comercial pelo WhatsApp."}
            </p>
            <Button
              size="lg"
              className="gap-2"
              disabled={!active}
              data-cta-location="pj_triagem"
              onClick={openWhatsApp}
            >
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
              Solicitar proposta comercial
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TriagemPJ;
