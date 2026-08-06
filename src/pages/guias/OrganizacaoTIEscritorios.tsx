import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageSEO } from "@/components/PageSEO";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { trackCTAClick } from "@/lib/analytics";
import { MessageCircle, CheckCircle, ShieldCheck, HardDrive, Wifi, Users } from "lucide-react";

const WA = "https://wa.me/5541997452053?text=" +
  encodeURIComponent("Olá! Quero organizar a TI do meu escritório em Curitiba. Pode me orientar?") +
  "&utm_source=site&utm_medium=guia&utm_campaign=organizacao-ti-escritorios";

const faqs = [
  {
    q: "Quantos computadores justificam um contrato de suporte?",
    a: "Na prática, a partir de 4 a 5 estações o custo de chamados avulsos já supera o de um contrato mensal. Abaixo disso, atendimento sob demanda costuma ser mais econômico.",
  },
  {
    q: "Backup em nuvem substitui backup local?",
    a: "Não. A regra 3-2-1 continua válida: três cópias, em dois tipos de mídia, uma fora do escritório. Nuvem cobre a cópia externa, mas restauração rápida depende de uma cópia local.",
  },
  {
    q: "Preciso de servidor físico no escritório?",
    a: "Na maioria dos escritórios pequenos, não. Microsoft 365 ou Google Workspace com um NAS para arquivos pesados resolve, com menos manutenção e menos risco de parada.",
  },
  {
    q: "Vocês atendem escritórios em Curitiba e região?",
    a: "Sim. Atendimento presencial em Curitiba e RMC, além de suporte remoto para ajustes rápidos. Orçamento pelo WhatsApp, a partir de R$ 99,99.",
  },
];

export default function OrganizacaoTIEscritorios() {
  const path = "/guias/organizacao-de-ti-para-escritorios";
  const url = `https://tecnicocuritiba.com.br${path}`;

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Organização de TI para pequenos escritórios",
    description:
      "Guia prático para estruturar a TI de escritórios com até 20 pessoas: inventário, padronização, backup, rede, segurança e quando contratar suporte.",
    mainEntityOfPage: url,
    author: { "@type": "Organization", name: "Técnico em Curitiba" },
    publisher: { "@type": "Organization", name: "Técnico em Curitiba" },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Início", item: "https://tecnicocuritiba.com.br/" },
      { "@type": "ListItem", position: 2, name: "Guias", item: "https://tecnicocuritiba.com.br/guias/organizacao-de-ti-para-escritorios" },
      { "@type": "ListItem", position: 3, name: "Organização de TI para escritórios", item: url },
    ],
  };

  return (
    <>
      <PageSEO
        title="Organização de TI para Pequenos Escritórios | Guia Prático"
        description="Como estruturar a TI de um escritório pequeno em Curitiba: inventário, padronização de máquinas, backup 3-2-1, rede, contas e segurança. Checklist completo."
        path={path}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <Header />
      <main id="main-content" className="container mx-auto px-4 py-8">
        <Breadcrumbs
          emitSchema={false}
          items={[{ label: "Início", href: "/" }, { label: "Guias" }, { label: "Organização de TI para escritórios" }]}
        />

        <article className="max-w-3xl mx-auto py-8 md:py-12 prose-headings:font-bold">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Organização de TI para pequenos escritórios
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            Um roteiro objetivo para escritórios de 3 a 20 pessoas em Curitiba e região colocarem a
            TI em ordem sem contratar um departamento inteiro: o que padronizar, o que automatizar,
            o que terceirizar e onde o dinheiro costuma ser desperdiçado.
          </p>

          <div className="mb-10">
            <Button size="lg" asChild data-cta-location="guia_organizacao_ti_hero">
              <a
                href={WA}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackCTAClick("whatsapp", "guia_organizacao_ti_hero", { servico: "suporte_empresas" })}
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Avaliar a TI do meu escritório
              </a>
            </Button>
          </div>

          <h2 className="text-2xl font-bold mb-3">1. Inventário: você não gerencia o que não conhece</h2>
          <p className="mb-4 text-muted-foreground">
            O primeiro erro em escritório pequeno é não saber quantas máquinas existem, qual a idade
            delas e o que roda em cada uma. Monte uma planilha simples com: identificação do
            equipamento, usuário responsável, processador, memória, tipo de disco (HDD ou SSD),
            versão do Windows, data de compra e status da garantia. Em uma tarde você descobre, por
            exemplo, que três reclamações de "computador lento" vêm todas de máquinas ainda com HDD
            mecânico — problema que um <Link className="underline" to="/servicos/upgrade-ssd-memoria">upgrade de SSD e memória</Link> resolve
            por uma fração do custo de trocar o parque.
          </p>
          <p className="mb-6 text-muted-foreground">
            O mesmo inventário vale para software: licenças do Office, antivírus, sistemas de gestão
            e assinaturas em nuvem. É comum encontrar assinaturas pagas de ex-funcionários e
            licenças duplicadas — dinheiro recuperado já no primeiro mês.
          </p>

          <h2 className="text-2xl font-bold mb-3">2. Padronização reduz chamados pela metade</h2>
          <p className="mb-4 text-muted-foreground">
            Escritórios com dez máquinas diferentes têm dez formas de dar problema. Defina de um a
            dois perfis de estação: um "administrativo" (processador de entrada, 16 GB de RAM, SSD
            NVMe de 500 GB) e um "pesado" para quem trabalha com CAD, edição, contabilidade fiscal
            volumosa ou bancos de dados. Quando precisar renovar, compre sempre dentro desses
            perfis. Isso simplifica suporte, peças de reposição e imagem de instalação.
          </p>
          <ul className="mb-6 space-y-2">
            {[
              "Mesma versão do Windows e do pacote de escritório em todas as estações",
              "Contas nominais por pessoa, sem usuário 'admin' compartilhado",
              "Instalação padrão documentada (o que entra em uma máquina nova)",
              "Etiqueta de identificação física em cada equipamento",
            ].map((t) => (
              <li key={t} className="flex gap-2">
                <CheckCircle className="h-5 w-5 shrink-0 text-primary mt-0.5" aria-hidden />
                <span className="text-muted-foreground">{t}</span>
              </li>
            ))}
          </ul>

          <h2 className="text-2xl font-bold mb-3">3. Backup: a única política que importa é a testada</h2>
          <p className="mb-4 text-muted-foreground">
            Adote a regra 3-2-1: três cópias dos dados, em dois tipos de mídia diferentes, sendo uma
            fora do escritório. Na prática, para um escritório pequeno isso costuma ser: os arquivos
            de trabalho no OneDrive ou Google Drive (sincronizados), uma cópia em disco externo ou
            NAS no local e um snapshot semanal fora do prédio ou em nuvem fria.
          </p>
          <p className="mb-6 text-muted-foreground">
            O ponto que quase todo mundo ignora: <strong>restauração</strong>. Um backup nunca
            testado é uma hipótese. Marque um teste trimestral de restauração de um arquivo antigo e
            de uma pasta inteira, e registre o tempo que levou. Se o tempo de restauração for maior
            que o que o negócio aguenta parado, a política precisa mudar. Veja também nosso serviço
            de <Link className="underline" to="/servicos/backup-recuperacao">backup e recuperação de dados</Link>.
          </p>

          <h2 className="text-2xl font-bold mb-3">4. Rede: cabo onde importa, Wi-Fi onde ajuda</h2>
          <p className="mb-4 text-muted-foreground">
            Escritório pequeno raramente precisa de infraestrutura sofisticada, mas precisa de
            infraestrutura previsível. Estações fixas, servidores de arquivos e impressoras de alto
            volume merecem cabo. Notebooks, celulares e salas de reunião ficam no Wi-Fi. Separe a
            rede de visitantes da rede interna — é a medida de segurança mais barata que existe.
          </p>
          <p className="mb-6 text-muted-foreground">
            Roteador de operadora costuma ser o gargalo em escritórios acima de 8 pessoas: falta de
            memória para muitas conexões simultâneas, canais mal escolhidos e cobertura irregular.
            Um projeto simples de <Link className="underline" to="/servicos/redes-wifi">rede e Wi-Fi</Link> com pontos
            de acesso posicionados resolve a maior parte das queixas de "internet caindo".
          </p>

          <h2 className="text-2xl font-bold mb-3">5. Contas, acessos e saída de funcionários</h2>
          <p className="mb-6 text-muted-foreground">
            Centralize as contas em uma plataforma só (Microsoft 365 ou Google Workspace) e mantenha
            um procedimento escrito de entrada e saída: criar conta, dar acesso às pastas
            necessárias, ativar verificação em duas etapas; e, na saída, bloquear a conta no mesmo
            dia, transferir arquivos e revogar sessões ativas. Sem isso, o escritório acumula
            acessos fantasmas — o principal vetor de vazamento em empresas pequenas.
          </p>

          <h2 className="text-2xl font-bold mb-3">6. Segurança proporcional ao risco</h2>
          <div className="grid gap-4 sm:grid-cols-2 mb-6">
            {[
              { icon: ShieldCheck, t: "Verificação em duas etapas", d: "Obrigatória em e-mail, nuvem e sistemas financeiros." },
              { icon: HardDrive, t: "Atualizações automáticas", d: "Windows e navegadores atualizando sem depender de lembrete." },
              { icon: Wifi, t: "Rede de visitantes isolada", d: "Convidados nunca na mesma rede dos arquivos internos." },
              { icon: Users, t: "Menor privilégio", d: "Usuário comum no dia a dia; administrador só quando necessário." },
            ].map((i) => (
              <div key={i.t} className="rounded-xl border p-4 flex gap-3">
                <i.icon className="h-5 w-5 shrink-0 text-primary mt-0.5" aria-hidden />
                <div>
                  <div className="font-semibold">{i.t}</div>
                  <div className="text-sm text-muted-foreground">{i.d}</div>
                </div>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-bold mb-3">7. Quando terceirizar o suporte</h2>
          <p className="mb-6 text-muted-foreground">
            Enquanto a TI cabe em "alguém do escritório que entende de computador", chamados avulsos
            bastam. A partir do momento em que uma parada custa faturamento — sistema fiscal fora do
            ar, e-mail indisponível, arquivo compartilhado corrompido — vale um contrato com tempo
            de resposta acordado. Compare o custo mensal contra o custo de uma hora parada
            multiplicada pelo número de pessoas afetadas; a conta costuma se pagar sozinha. Nossa
            página de <Link className="underline" to="/suporte-empresas">suporte de TI para empresas</Link> detalha
            formatos de contrato, nota fiscal e pagamento faturado.
          </p>

          <h2 className="text-2xl font-bold mb-3">8. Renovação de parque: comprar bem, uma vez</h2>
          <p className="mb-6 text-muted-foreground">
            Máquinas de escritório têm vida útil produtiva de 4 a 6 anos. Renove por lote pequeno e
            planejado, não por emergência. Para funções que exigem mais desempenho, leia o guia de{" "}
            <Link className="underline" to="/guias/como-escolher-workstation">como escolher uma workstation</Link> e,
            se preferir uma máquina montada sob especificação, veja{" "}
            <Link className="underline" to="/servicos/montagem-pc">montagem de PC sob medida</Link>.
          </p>

          <h2 className="text-2xl font-bold mb-4">Perguntas frequentes</h2>
          <div className="space-y-4 mb-10">
            {faqs.map((f) => (
              <details key={f.q} className="rounded-xl border p-4">
                <summary className="font-semibold cursor-pointer">{f.q}</summary>
                <p className="mt-2 text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>

          <div className="rounded-2xl bg-primary/10 p-6 text-center">
            <h2 className="text-2xl font-bold mb-2">Quer um diagnóstico do seu escritório?</h2>
            <p className="mb-4 text-muted-foreground">
              Levantamos inventário, backup e rede e devolvemos um plano de ação priorizado.
            </p>
            <Button size="lg" asChild data-cta-location="guia_organizacao_ti_final">
              <a
                href={WA}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackCTAClick("whatsapp", "guia_organizacao_ti_final", { servico: "suporte_empresas" })}
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Falar no WhatsApp
              </a>
            </Button>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
