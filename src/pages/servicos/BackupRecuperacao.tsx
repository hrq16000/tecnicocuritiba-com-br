import { useEffect } from "react";
import { PageSEO } from "@/components/PageSEO";
import { ServiceLandingSchema } from "@/components/ServiceLandingSchema";
import { Link } from "react-router-dom";
import { Database, CheckCircle, HardDrive, Cloud, MessageCircle, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { InterlinkingBlock } from "@/components/InterlinkingBlock";
import { RealImageSection } from "@/components/RealImageSection";
import Breadcrumbs from "@/components/Breadcrumbs";
import { trackPageView, trackCTAClick } from "@/lib/analytics";

const WHATSAPP_NUMBER = "5541997452053";

const BackupRecuperacao = () => {
  useEffect(() => {
    document.title = "Backup e Recuperação de Dados em Curitiba | Técnico em Curitiba";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Backup e recuperação de dados em Curitiba. Resgate de arquivos de HD, SSD, pendrive. Recuperação de dados deletados. Atendimento especializado.");
    }
    trackPageView("/servicos/backup-recuperacao", "Backup e Recuperação");
  }, []);

  const handleWhatsAppClick = () => {
    trackCTAClick("whatsapp", "backup-recuperacao");
    const message = encodeURIComponent("Olá! Preciso recuperar dados do meu HD/SSD. Podem me ajudar?");
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-background">
      <ServiceLandingSchema
        serviceName="Backup e Recuperação de Dados"
        description="Backup e Recuperação de Dados em Curitiba e região metropolitana. Diagnóstico profissional, orçamento aprovado antes do reparo e garantia de 90 dias."
        path="/servicos/backup-recuperacao"
        priceFrom={99.99}
        category="Recuperação de Dados"
        faqs={[
          { question: "É possível recuperar dados de HD formatado?", answer: "Na maioria dos casos sim. A formatação não apaga os dados imediatamente — quanto antes procurar o técnico, maior a chance de sucesso." },
          { question: "E se o HD estiver fazendo barulho?", answer: "Ruído indica falha física grave. Não ligue mais o computador e acione o técnico para avaliação em bancada." },
          { question: "Quanto tempo demora a recuperação?", answer: "Recuperação lógica leva de 2 a 24 horas. Casos físicos podem levar alguns dias, sempre com prazo informado antes." },
          { question: "Vocês garantem a recuperação?", answer: "Não cobramos pelo resgate quando os dados não são recuperados. Você só paga pelo sucesso." },
          { question: "O técnico precisa conhecer minha senha?", answer: "Somente o acesso estritamente necessário é solicitado, sempre com autorização e explicação do procedimento. Senhas, códigos de autenticação e credenciais bancárias não devem ser enviados por mensagem." },
          { question: "Quem deve resolver problemas em sistemas de terceiros?", answer: "Licença, disponibilidade, erro interno e recuperação de conta são responsabilidade do fornecedor do sistema. O atendimento técnico verifica o computador, a conectividade e registra o erro para apoiar esse contato." },
        ]}
      />
      <PageSEO title="Backup e Recuperação de Dados em Curitiba | Técnico em Curitiba" description="Backup e recuperação de dados em Curitiba. Resgate de arquivos de HD, SSD, pendrive. Recuperação de dados deletados. Atendimento especializado." path="/servicos/backup-recuperacao"  breadcrumbs={[
        { name: "Início", path: "/" },
        { name: "Serviços", path: "/servicos" },
        { name: "Backup e Recuperação", path: "/servicos/backup-recuperacao" }
      ]} />
      <Header />
      <Breadcrumbs items={[{ label: "Serviços", href: "/servicos" }, { label: "Backup e Recuperação" }]} />
      
      {/* Hero Section */}
      <section className="pt-10 pb-10 hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 -left-32 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse-soft" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-accent/20 text-accent px-4 py-2 rounded-full mb-6 shimmer">
              <Database className="h-5 w-5" />
              <span className="font-medium">Proteção de Dados</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6 reveal-text">
              Backup e Recuperação de Dados em Curitiba
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto reveal-text" data-reveal-delay="100">
              Perdeu arquivos importantes? Recuperamos dados de HD, SSD, pendrive e cartão de memória. Também configuramos backup automático.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center reveal-text" data-reveal-delay="200">
              <Button size="lg" className="bg-[#25D366] hover:bg-[#128C7E] text-white shadow-[0_0_24px_rgba(37,211,102,0.3)] hover:shadow-[0_0_32px_rgba(37,211,102,0.5)] transition-all duration-300" onClick={handleWhatsAppClick}>
                <MessageCircle className="mr-2 h-5 w-5" />
                Recuperar Meus Dados
              </Button>
            </div>
          </div>
        </div>
      </section>

      <RealImageSection imageKey="componentesSsd" caption="HD e SSD — recuperamos seus dados com segurança" />

      {/* Alerta Importante */}
      <section className="py-6 bg-destructive/10 border-y border-destructive/20">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 text-destructive mb-2">
            <AlertTriangle className="h-6 w-6 animate-pulse" />
            <p className="text-xl font-bold">Importante!</p>
          </div>
          <p className="text-foreground max-w-2xl mx-auto">
            Se você perdeu dados, <strong>pare de usar o dispositivo imediatamente</strong>. Quanto mais você usa, menor a chance de recuperação.
          </p>
        </div>
      </section>

      {/* Serviços */}
      <section id="servicos" className="py-10 bg-background relative scroll-mt-24">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-accent/5 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl font-heading font-bold text-foreground text-center mb-6 reveal-text">
            Nossos Serviços
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-secondary p-8 rounded-xl group hover:-translate-y-1 hover:shadow-xl transition-all duration-300 stagger-item" style={{ animationDelay: "0ms" }}>
              <HardDrive className="h-12 w-12 text-accent mb-4 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-2xl font-bold text-foreground mb-4">Recuperação de Dados</h3>
              <ul className="space-y-3">
                {["HD com defeito ou não reconhecido", "SSD corrompido", "Pendrive danificado", "Cartão de memória corrompido", "Arquivos deletados acidentalmente", "Formatação acidental"].map((item, index) => (
                  <li key={index} className="flex items-center gap-2 text-muted-foreground stagger-item" style={{ animationDelay: `${index * 60}ms` }}>
                    <CheckCircle className="h-4 w-4 text-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-secondary p-8 rounded-xl group hover:-translate-y-1 hover:shadow-xl transition-all duration-300 stagger-item" style={{ animationDelay: "100ms" }}>
              <Cloud className="h-12 w-12 text-accent mb-4 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-2xl font-bold text-foreground mb-4">Configuração de Backup</h3>
              <ul className="space-y-3">
                {["Backup automático em nuvem", "Backup em HD externo", "Sincronização de arquivos", "Backup de fotos e documentos", "Backup de emails", "Plano de backup empresarial"].map((item, index) => (
                  <li key={index} className="flex items-center gap-2 text-muted-foreground stagger-item" style={{ animationDelay: `${index * 60}ms` }}>
                    <CheckCircle className="h-4 w-4 text-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <RealImageSection imageKey="diagnostico" caption="Diagnóstico técnico para backup e recuperação segura" />

      {/* Tipos de Recuperação */}
      <section id="niveis" className="py-10 bg-secondary scroll-mt-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-heading font-bold text-foreground text-center mb-6 reveal-text">
            Níveis de Recuperação
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { title: "Recuperação Lógica", desc: "Arquivos deletados, formatação, corrupção de software", price: "A partir de R$199", note: "Alta taxa de sucesso", highlight: false },
              { title: "Recuperação Avançada", desc: "HD com setores defeituosos, SSD com falha", price: "A partir de R$399", note: "Requer equipamento especializado", highlight: true },
              { title: "Recuperação Física", desc: "HD com ruído, cabeça travada, motor queimado", price: "Sob consulta", note: "Encaminhamento para laboratório", highlight: false },
            ].map((item, index) => (
              <div key={index} className={`bg-background p-6 rounded-xl group hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300 stagger-item ${item.highlight ? "border-2 border-accent shadow-[0_0_20px_rgba(var(--accent)/0.15)]" : ""}`} style={{ animationDelay: `${index * 100}ms` }}>
                <h3 className="text-xl font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground mb-4">{item.desc}</p>
                <p className="text-2xl font-bold text-accent">{item.price}</p>
                <p className="text-sm text-muted-foreground">{item.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sistemas, credenciais e acessos de terceiros */}
      <section id="credenciais" className="py-10 bg-background scroll-mt-24">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl font-heading font-bold text-foreground mb-4 reveal-text">
            Sistemas, credenciais e acessos de terceiros
          </h2>
          <p className="text-muted-foreground mb-6">
            Boa parte dos dados de uma empresa vive em sistemas mantidos por outras companhias: e-mail corporativo,
            ERP, CRM, prontuário, sistema contábil, certificado digital, domínio e provedor de nuvem. O atendimento
            técnico atua no computador, na rede e nos arquivos locais — e a divisão de responsabilidades abaixo evita
            expectativas erradas na hora de recuperar acesso ou restaurar informação.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-secondary p-6 rounded-xl">
              <h3 className="font-bold text-foreground mb-3">Responsabilidade do cliente</h3>
              <ul className="text-muted-foreground text-sm space-y-1.5 list-disc pl-4">
                <li>Possuir licença legítima dos sistemas usados</li>
                <li>Indicar quem autoriza alterações</li>
                <li>Manter acesso ao e-mail de recuperação</li>
                <li>Preservar os códigos de autenticação</li>
                <li>Conhecer o fornecedor de cada sistema</li>
                <li>Manter contratos e cadastros atualizados</li>
                <li>Informar restrições internas de acesso</li>
                <li>Manter backup dos dados críticos</li>
                <li>Não compartilhar senha sem necessidade</li>
              </ul>
            </div>
            <div className="bg-secondary p-6 rounded-xl">
              <h3 className="font-bold text-foreground mb-3">Responsabilidade do técnico</h3>
              <ul className="text-muted-foreground text-sm space-y-1.5 list-disc pl-4">
                <li>Solicitar apenas o acesso necessário</li>
                <li>Explicar o procedimento antes de executar</li>
                <li>Evitar armazenar credenciais</li>
                <li>Encerrar sessões ao final do atendimento</li>
                <li>Não alterar configuração além do autorizado</li>
                <li>Registrar limitações encontradas</li>
                <li>Orientar o contato com o fornecedor quando necessário</li>
                <li>Não burlar proteções ou restrições</li>
              </ul>
            </div>
            <div className="bg-secondary p-6 rounded-xl">
              <h3 className="font-bold text-foreground mb-3">Responsabilidade do fornecedor</h3>
              <ul className="text-muted-foreground text-sm space-y-1.5 list-disc pl-4">
                <li>Licença e disponibilidade do sistema</li>
                <li>Servidor e infraestrutura própria</li>
                <li>Correção de erro interno do software</li>
                <li>Atualizações e versões</li>
                <li>Recuperação de conta</li>
                <li>Suporte ao próprio sistema</li>
                <li>Regras de autenticação e integração</li>
                <li>Documentação oficial</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <p className="p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-foreground text-sm">
              O acesso ao computador não garante acesso ou correção de sistemas mantidos por terceiros.
            </p>
            <p className="p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-foreground text-sm">
              Senhas, códigos de autenticação e credenciais bancárias não devem ser enviados por mensagem.
            </p>
            <p className="p-4 rounded-lg bg-secondary text-muted-foreground text-sm">
              Quando o problema pertence ao sistema externo, pode ser necessário acionar o fornecedor responsável.
            </p>
          </div>

          <p className="mt-6 text-sm text-muted-foreground">
            Precisa organizar isso no ambiente da empresa? Veja como funciona o{" "}
            <Link to="/suporte-empresas" className="text-accent underline underline-offset-2">
              suporte técnico empresarial
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Caixas editoriais (3Q) + CTA intermediário */}
      <section className="py-8 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto grid gap-4 md:grid-cols-3">
            <EditorialCallout variant="antes-de-autorizar" title="Quando parar de usar">
              <p>
                Ruído no disco, falhas progressivas, desconexões, mídia não reconhecida, arquivos
                sumindo ou dano físico: desligue o equipamento e evite novas tentativas por conta própria.
              </p>
            </EditorialCallout>
            <EditorialCallout variant="verificamos" title="O que influencia a possibilidade de recuperação">
              <p>
                Tipo de mídia, causa da falha, tempo de uso após o incidente e tentativas anteriores
                de recuperação afetam diretamente o resultado.
              </p>
            </EditorialCallout>
            <EditorialCallout variant="limites" title="Limites técnicos">
              <p>
                Não existe garantia de recuperação. O diagnóstico indica o que é viável antes de
                qualquer tentativa, e o conteúdo acessado é tratado com sigilo.
              </p>
            </EditorialCallout>
          </div>
          <div className="max-w-4xl mx-auto mt-6">
            <InlineTriageCTA
              location="servico-recuperacao-dados-meio"
              message="Olá! Preciso avaliar a recuperação de dados de uma mídia."
              hint="Descreva o que aconteceu antes da perda — isso orienta o diagnóstico."
            />
          </div>
        </div>
      </section>

      {/* FAQ */}

      <section id="faq" className="py-10 bg-background scroll-mt-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-heading font-bold text-foreground text-center mb-6 reveal-text">
            Perguntas Frequentes
          </h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              { q: "É possível recuperar dados de HD formatado?", a: "Na maioria dos casos, sim! A formatação não apaga os dados imediatamente. Quanto antes você nos procurar, maior a chance de sucesso." },
              { q: "E se o HD estiver fazendo barulho?", a: "HD com ruídos indica problema físico grave. Não ligue mais o computador e entre em contato imediatamente para avaliação." },
              { q: "Quanto tempo demora a recuperação?", a: "Recuperação lógica leva de 2 a 24 horas. Casos mais complexos podem levar alguns dias. Avaliamos cada caso." },
              { q: "Vocês garantem a recuperação?", a: "Não cobramos se não conseguirmos recuperar os dados. Você só paga pelo sucesso." },
              { q: "Como funciona o backup automático?", a: "Configuramos sincronização automática com serviços de nuvem ou HD externo. Seus arquivos são salvos sem você precisar fazer nada." },
              { q: "O técnico precisa conhecer minha senha?", a: "Somente o acesso estritamente necessário é solicitado, sempre com autorização e explicação do procedimento. Senhas, códigos de autenticação e credenciais bancárias não devem ser enviados por mensagem." },
              { q: "Quem deve resolver problemas em sistemas de terceiros?", a: "Licença, disponibilidade, erro interno e recuperação de conta são responsabilidade do fornecedor do sistema. O atendimento técnico verifica o computador, a conectividade e registra o erro para apoiar esse contato." },
            ].map((item, index) => (
              <div key={index} className="bg-secondary p-6 rounded-xl hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 stagger-item" style={{ animationDelay: `${index * 80}ms` }}>
                <h3 className="font-bold text-foreground mb-2">{item.q}</h3>
                <p className="text-muted-foreground">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-10 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-breathe" />
          <div className="absolute bottom-0 right-1/4 w-60 h-60 bg-white/5 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl font-heading font-bold text-white mb-4 reveal-text">
            Perdeu Dados Importantes?
          </h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Não espere! Quanto mais rápido você agir, maior a chance de recuperar seus arquivos.
          </p>
          <Button size="lg" className="bg-[#25D366] hover:bg-[#128C7E] text-white shadow-[0_0_24px_rgba(37,211,102,0.3)] hover:shadow-[0_0_32px_rgba(37,211,102,0.5)] transition-all duration-300" onClick={handleWhatsAppClick}>
            <MessageCircle className="mr-2 h-5 w-5" />
            Recuperar Meus Dados
          </Button>
        </div>
      </section>

      {/* Serviços Relacionados */}
      <section className="py-8 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-heading font-bold text-foreground text-center mb-4">
            Serviços Relacionados
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { to: "/servicos/upgrade-ssd-memoria", label: "Upgrade SSD" },
              { to: "/servicos/formatacao-computador", label: "Formatação" },
              { to: "/servicos/conserto-pc-notebook", label: "Conserto de Hardware" },
            ].map((link) => (
              <Link key={link.to} to={link.to} className="px-5 py-2.5 bg-secondary rounded-lg hover:bg-accent/20 hover:-translate-y-0.5 hover:shadow-md transition-all duration-300 text-sm">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>
      <InterlinkingBlock />
      <Footer />
    </div>
  );
};

export default BackupRecuperacao;
