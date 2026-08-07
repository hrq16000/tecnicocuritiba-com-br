import { LocalPhotoGallery } from "@/components/LocalPhotoGallery";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { PageSEO } from "@/components/PageSEO";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { InterlinkingBlock } from "@/components/InterlinkingBlock";
import BusinessHero from "@/components/b2b/BusinessHero";
import BusinessPageSchema from "@/components/b2b/BusinessPageSchema";
import BusinessContextGrid from "@/components/b2b/BusinessContextGrid";
import ThirdPartyLimits from "@/components/b2b/ThirdPartyLimits";
import BusinessInlineCTA from "@/components/b2b/BusinessInlineCTA";
import PageTableOfContents from "@/components/PageTableOfContents";
import TrustStrip from "@/components/TrustStrip";
import { trackPageView } from "@/lib/analytics";
import { NAP } from "@/lib/nap";

const WHATSAPP_URL = `${NAP.whatsappUrl}?text=${encodeURIComponent(
  "Olá! Quero falar sobre segurança e proteção dos dados dos meus computadores.",
)}`;

const BREADCRUMBS = [
  { name: "Início", path: "/" },
  { name: "Segurança dos Dados", path: "/seguranca-dos-dados" },
];

const FAQ = [
  {
    q: "O que é tratado como segurança dos dados no atendimento?",
    a: "Cuidado com os arquivos durante o serviço: conferência do que existe no equipamento antes de qualquer procedimento destrutivo, cópia dos dados quando o disco permite leitura, autorização por escrito antes de formatar e devolução dos arquivos ao cliente. Não é serviço de segurança da informação corporativa nem consultoria de conformidade.",
  },
  {
    q: "Vocês fazem cópia dos meus arquivos antes de formatar?",
    a: "Sempre que o disco permite leitura e o cliente autoriza. Quando o disco apresenta falha física ou setores ilegíveis, a cópia pode ser parcial ou inviável — isso é informado antes da execução e o caso passa a ser tratado como recuperação de dados.",
  },
  {
    q: "O técnico precisa das minhas senhas?",
    a: "Somente quando o procedimento autorizado exigir, com o acesso mínimo necessário e pelo tempo do atendimento. Não pedimos código de autenticação em duas etapas por mensagem e recomendamos trocar a senha após a conclusão do serviço.",
  },
  {
    q: "Vocês guardam cópia dos meus dados depois do serviço?",
    a: "Não mantemos cópia como rotina. Quando uma cópia temporária é necessária para executar o serviço, ela é combinada com o cliente e removida após a devolução do equipamento e a conferência dos arquivos.",
  },
  {
    q: "Qual a diferença entre o cuidado residencial e o empresarial?",
    a: "No uso residencial o foco é preservar arquivos pessoais, fotos e documentos durante manutenções. No uso empresarial entram também autorização de quem responde pelos dados, contas de e-mail e sistemas de terceiros, e registro do que foi acessado. Em nenhum dos casos oferecemos SLA, monitoramento permanente ou plano mensal.",
  },
  {
    q: "Vocês assumem responsabilidade por vazamento em sistemas de terceiros?",
    a: "Não. Contas de e-mail, sistemas em nuvem, ERPs e plataformas contratadas pertencem ao fornecedor e ao titular da conta. Podemos verificar o computador, a rede e o registro do erro, e indicar quando o caso deve ser tratado com o fornecedor.",
  },
];

const TOC = [
  { id: "o-que-cobre", label: "O que cobrimos" },
  { id: "pilares", label: "Pilares" },
  { id: "contextos-dados", label: "Situações mais comuns" },
  { id: "responsabilidades", label: "Responsabilidades e limites" },
  { id: "credenciais", label: "Credenciais" },
  { id: "acesso-remoto", label: "Acesso remoto" },
  { id: "armazenamento", label: "Backup, recuperação e nuvem" },
  { id: "boas-praticas", label: "Boas práticas do cliente" },
  { id: "perguntas", label: "Perguntas frequentes" },
];

const PILARES = [
  {
    title: "Backup",
    items: ["Cópias em mais de um lugar", "Separação do computador principal", "Restauração testada", "Responsabilidade de manter a cópia"],
  },
  {
    title: "Acesso mínimo",
    items: ["Somente o necessário para executar", "Tempo limitado ao atendimento", "Encerramento das sessões", "Troca de senha após o serviço"],
  },
  {
    title: "Autorização",
    items: ["Responsável identificado", "Escopo combinado antes", "Registro do que foi executado", "Limite claro do que não será feito"],
  },
  {
    title: "Sistemas de terceiros",
    items: ["Fornecedor responde pela plataforma", "Licença e conta do titular", "Autenticação junto ao provedor", "Disponibilidade fora do nosso alcance"],
  },
];


const SegurancaDados = () => {
  useEffect(() => {
    trackPageView("/seguranca-dos-dados", "Segurança dos Dados");
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <PageSEO
        title="Segurança dos Dados no Atendimento Técnico | Curitiba"
        description="Como seus arquivos são tratados durante manutenção, formatação e suporte em Curitiba: autorização por escrito, cópia prévia quando possível, uso de credenciais e limites em sistemas de terceiros."
        path="/seguranca-dos-dados"
        breadcrumbs={BREADCRUMBS}
      />
      <BusinessPageSchema
        id="seguranca-dados"
        path="/seguranca-dos-dados"
        name="Segurança dos dados no atendimento técnico"
        description="Regras de tratamento de arquivos, credenciais e autorizações durante manutenção, formatação e suporte técnico em Curitiba."
        breadcrumbs={BREADCRUMBS}
        faq={FAQ}
      />
      <Header />

      <main id="main-content">
        <BusinessHero
          eyebrow="Tratamento de dados no atendimento técnico"
          title="Segurança dos dados durante o serviço"
          titleSuffix="Curitiba e Região Metropolitana"
          description="Toda manutenção mexe em arquivos. Esta página descreve como os dados são tratados antes, durante e depois do atendimento — o que é conferido, o que exige autorização por escrito e o que está fora do nosso alcance."
          whatsappUrl={WHATSAPP_URL}
          ctaLabel="Tirar dúvida sobre meus dados"
          ctaLocation="seguranca-dados-hero"
          secondary={{ label: "Ver backup e recuperação", to: "/servicos/backup-recuperacao" }}
          signals={[
            "Autorização por escrito antes de formatar",
            "Cópia prévia quando o disco permite leitura",
            "Acesso mínimo necessário a credenciais",
          ]}
        />

        <section className="border-b border-border bg-background py-6">
          <div className="container mx-auto max-w-4xl space-y-4 px-4">
            <TrustStrip />
            <PageTableOfContents items={TOC} />
          </div>
        </section>

        <section id="o-que-cobre" className="scroll-mt-24 bg-background py-8 md:py-10">
          <div className="container mx-auto max-w-4xl px-4">
            <h2 className="text-center font-heading text-2xl font-bold text-foreground md:text-3xl">
              O que está incluído no cuidado com os dados
            </h2>
            <p className="mt-3 text-center text-muted-foreground">
              Não é um serviço vendido à parte: é o procedimento padrão aplicado em qualquer atendimento
              que envolva disco, sistema operacional ou contas do usuário.
            </p>
            <ul className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                ["Conferência antes de executar", "Verificamos quais pastas e programas importam para você antes de qualquer procedimento que apague dados."],
                ["Autorização registrada", "Formatação, troca de disco e reinstalação só acontecem após confirmação por escrito no WhatsApp."],
                ["Cópia prévia quando viável", "Se o disco permite leitura, os arquivos indicados são copiados antes do procedimento."],
                ["Conferência na entrega", "Você confere os arquivos junto com o técnico antes do encerramento do atendimento."],
              ].map(([t, d]) => (
                <li key={t} className="rounded-xl border border-border bg-muted/30 p-5">
                  <h3 className="text-base font-semibold text-foreground">{t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="pilares" className="scroll-mt-24 bg-secondary py-8 md:py-10">
          <div className="container mx-auto max-w-4xl px-4">
            <h2 className="text-center font-heading text-2xl font-bold text-foreground md:text-3xl">
              Quatro pilares que reduzem risco
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-center text-muted-foreground">
              Nenhum procedimento técnico elimina totalmente o risco de perda. Backup, autorização, acesso mínimo e
              comunicação clara reduzem riscos, mas não substituem avaliação e responsabilidade compartilhada.
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {PILARES.map((p) => (
                <div key={p.title} className="rounded-xl border border-border bg-background p-5">
                  <h3 className="text-base font-semibold text-foreground">{p.title}</h3>
                  <ul className="mt-2 space-y-1 text-sm leading-relaxed text-muted-foreground">
                    {p.items.map((i) => (
                      <li key={i}>• {i}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>


        <BusinessContextGrid
          id="contextos-dados"
          title="Situações mais comuns"
          intro="Contextos residenciais e empresariais em que o cuidado com os arquivos muda a forma de executar o serviço."
          contexts={[
            {
              title: "Computador de casa com fotos e documentos",
              body: "Arquivos pessoais sem cópia em outro lugar. A prioridade é copiar antes de mexer no sistema. Limite: disco com falha física passa a ser caso de recuperação de dados, com resultado incerto.",
            },
            {
              title: "Computador usado por mais de uma pessoa",
              body: "Perfis diferentes no mesmo equipamento. Conferimos o que pertence a cada perfil antes de reinstalar. Limite: só executamos com autorização de quem responde pelo equipamento.",
            },
            {
              title: "Escritório com arquivos da operação",
              body: "Documentos de trabalho, planilhas e emissores fiscais. A autorização vem de quem responde pelos dados da empresa e o que foi acessado fica registrado no atendimento. Limite: não assumimos gestão de acessos nem política interna de TI.",
            },
            {
              title: "Contas de e-mail e sistemas em nuvem",
              body: "Reconfiguração de conta no computador após manutenção. Trabalhamos com o acesso mínimo e pelo tempo do atendimento. Limite: recuperação de conta, licença e redefinição de credencial pertencem ao fornecedor e ao titular.",
            },
          ]}
        />

        <BusinessInlineCTA
          title="Vai formatar ou trocar o disco?"
          description="Fale antes de executar. A conversa começa pela conferência do que precisa ser preservado."
          whatsappUrl={WHATSAPP_URL}
          ctaLabel="Falar no WhatsApp"
          ctaLocation="seguranca-dados-inline"
        />

        <ThirdPartyLimits
          id="responsabilidades"
          title="Responsabilidades e limites"
          intro={
            <>
              Transparência de escopo antes da execução. Regras de peças e garantia seguem a{" "}
              <Link to="/politica-pecas-cliente" className="text-accent underline underline-offset-2">
                política de peças do cliente
              </Link>{" "}
              e o tratamento de dados pessoais do site está na{" "}
              <Link to="/politica-de-privacidade" className="text-accent underline underline-offset-2">
                política de privacidade
              </Link>
              .
            </>
          }
          columns={[
            {
              title: "É nossa responsabilidade",
              items: [
                "Informar antes de qualquer procedimento que apague dados",
                "Copiar os arquivos indicados quando o disco permite leitura",
                "Usar o acesso mínimo necessário e encerrar as sessões",
                "Registrar o que foi executado no atendimento",
              ],
            },
            {
              title: "É responsabilidade do cliente",
              items: [
                "Indicar quais arquivos e programas são essenciais",
                "Autorizar formalmente procedimentos destrutivos",
                "Manter cópia própria dos dados críticos",
                "Trocar senhas usadas durante o atendimento",
              ],
            },
            {
              title: "Depende de terceiros",
              tone: "warning",
              items: [
                "Recuperação de conta de e-mail ou nuvem",
                "Licença e suporte interno de sistemas contratados",
                "Dados existentes apenas em servidor de fornecedor",
                "Disco com falha física, que exige laboratório",
              ],
            },
          ]}
          footer="Não oferecemos SLA, monitoramento permanente, plano mensal de segurança nem consultoria de conformidade regulatória."
        />

        <section id="credenciais" className="scroll-mt-24 bg-background py-8 md:py-10">
          <div className="container mx-auto max-w-4xl px-4">
            <div className="rounded-2xl border-2 border-destructive/40 bg-destructive/5 p-6">
              <h2 className="font-heading text-2xl font-bold text-foreground">
                O que nunca deve ser enviado por mensagem
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Vale para qualquer atendimento — inclusive o nosso. Nenhum técnico precisa desses dados por
                WhatsApp, e-mail ou SMS.
              </p>
              <ul className="mt-4 grid gap-2 text-sm text-foreground md:grid-cols-2">
                {[
                  "Senha bancária ou de aplicativo financeiro",
                  "Código de autenticação em duas etapas",
                  "Token de acesso",
                  "Chave privada",
                  "Credencial de carteira digital",
                  "Código de recuperação de conta",
                  "Arquivo confidencial sem necessidade e autorização",
                ].map((i) => (
                  <li key={i} className="rounded-lg border border-border bg-background px-3 py-2">
                    {i}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section id="acesso-remoto" className="scroll-mt-24 bg-secondary py-8 md:py-10">
          <div className="container mx-auto max-w-4xl px-4">
            <h2 className="text-center font-heading text-2xl font-bold text-foreground md:text-3xl">
              Como o acesso remoto é tratado
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-center text-muted-foreground">
              Quando o atendimento acontece à distância, valem as mesmas regras: autorização de quem responde pelo
              equipamento, sessão temporária, acompanhamento na tela, encerramento ao final e revogação do acesso.
              Não instalamos acesso permanente. Os requisitos e limites da modalidade estão em{" "}
              <Link to="/atendimento-remoto" className="text-accent underline underline-offset-2">
                atendimento remoto
              </Link>
              .
            </p>
          </div>
        </section>

        <section id="armazenamento" className="scroll-mt-24 bg-background py-8 md:py-10">
          <div className="container mx-auto max-w-4xl px-4">
            <h2 className="text-center font-heading text-2xl font-bold text-foreground md:text-3xl">
              Backup, recuperação, sincronização e nuvem não são a mesma coisa
            </h2>
            <ul className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                ["Backup", "Cópia adicional feita de propósito, guardada separada do equipamento de uso."],
                ["Recuperação de dados", "Tentativa de resgate depois da falha, com resultado incerto e custo próprio."],
                ["Sincronização", "Espelha alterações — inclusive exclusões e arquivos corrompidos. Não substitui backup."],
                ["Armazenamento em nuvem", "Serviço de terceiro: conta, licença e disponibilidade pertencem ao fornecedor."],
              ].map(([t, d]) => (
                <li key={t} className="rounded-xl border border-border bg-muted/30 p-5">
                  <h3 className="text-base font-semibold text-foreground">{t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d}</p>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-center text-sm text-muted-foreground">
              Estratégia de cópias em{" "}
              <Link to="/servicos/backup-recuperacao" className="text-accent underline underline-offset-2">
                backup e recuperação
              </Link>
              , execução empresarial em{" "}
              <Link to="/servicos/suporte-tecnico-empresarial" className="text-accent underline underline-offset-2">
                suporte técnico empresarial
              </Link>{" "}
              e condições comerciais em{" "}
              <Link to="/precos-e-politicas" className="text-accent underline underline-offset-2">
                preços e políticas
              </Link>
              .
            </p>
          </div>
        </section>



        <section id="boas-praticas" className="scroll-mt-24 bg-background py-8 md:py-10">
          <div className="container mx-auto max-w-4xl px-4">
            <h2 className="text-center font-heading text-2xl font-bold text-foreground md:text-3xl">
              Boas práticas que reduzem risco
            </h2>
            <ol className="mt-6 space-y-3">
              {[
                "Mantenha uma cópia dos arquivos importantes fora do computador (disco externo ou nuvem).",
                "Confira a cópia abrindo alguns arquivos: backup não testado não é backup.",
                "Separe uma conta de administrador da conta usada no dia a dia.",
                "Nunca envie senha ou código de autenticação por mensagem — nem para nós.",
                "Antes de enviar o equipamento para qualquer assistência, anote o que não pode ser perdido.",
              ].map((t, i) => (
                <li key={t} className="flex gap-3 rounded-lg border border-border bg-muted/30 p-4">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-bold text-white">
                    {i + 1}
                  </span>
                  <span className="text-sm leading-relaxed text-muted-foreground">{t}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="perguntas" className="scroll-mt-24 bg-secondary py-8 md:py-10">
          <div className="container mx-auto max-w-4xl px-4">
            <h2 className="text-center font-heading text-2xl font-bold text-foreground md:text-3xl">
              Perguntas frequentes
            </h2>
            <div className="mt-6 space-y-4">
              {FAQ.map((f) => (
                <details key={f.q} className="rounded-xl border border-border bg-background p-5">
                  <summary className="cursor-pointer text-base font-semibold text-foreground">{f.q}</summary>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
        <LocalPhotoGallery local="Curitiba" variant="seguranca" />
      </main>

      <InterlinkingBlock />
      <Footer />
    </div>
  );
};

export default SegurancaDados;
