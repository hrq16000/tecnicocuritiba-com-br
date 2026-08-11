import { useEffect } from "react";
import { PageSEO } from "@/components/PageSEO";
import { ServiceLandingSchema } from "@/components/ServiceLandingSchema";
import { Link } from "react-router-dom";
import { Wifi, CheckCircle, Router, Signal, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { InterlinkingBlock } from "@/components/InterlinkingBlock";
import { RealImageSection } from "@/components/RealImageSection";
import { ServiceGallery } from "@/components/ServiceGallery";
import Breadcrumbs from "@/components/Breadcrumbs";
import ServiceHeroSummary from "@/components/ServiceHeroSummary";
import EditorialCallout from "@/components/EditorialCallout";
import InlineTriageCTA from "@/components/InlineTriageCTA";
import ThirdPartyLimits from "@/components/b2b/ThirdPartyLimits";
import BusinessContextGrid from "@/components/b2b/BusinessContextGrid";
import { trackPageView, trackCTAClick } from "@/lib/analytics";
import ServiceOperationalSpec from "@/components/ServiceOperationalSpec";

const WHATSAPP_NUMBER = "5541997452053";

const RedesWifi = () => {
  useEffect(() => {
    document.title = "Configuração de Redes e Wi-Fi em Curitiba | Técnico em Curitiba";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Configuração de redes Wi-Fi em Curitiba. Instalação de roteadores, repetidores, extensores. Internet lenta? Resolvemos! Atendimento domiciliar.");
    }
    trackPageView("/servicos/redes-wifi", "Redes e Wi-Fi");
  }, []);

  const handleWhatsAppClick = () => {
    trackCTAClick("whatsapp", "redes-wifi", { servico: "redes-wifi", modalidade: "visita" });
    const message = encodeURIComponent("Olá! Preciso de ajuda com minha rede Wi-Fi. Podem me ajudar?");
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-background">
      <PageSEO title="Configuração de Redes e Wi-Fi em Curitiba a partir de R$ 99,99 | Técnico em Curitiba" description="Instalação e configuração de Wi-Fi, roteadores, repetidores e sistemas mesh em Curitiba a partir de R$ 99,99. Internet lenta? Resolvemos em até 30 min." path="/servicos/redes-wifi"  breadcrumbs={[
        { name: "Início", path: "/" },
        { name: "Serviços", path: "/servicos" },
        { name: "Redes e Wi-Fi", path: "/servicos/redes-wifi" }
      ]} />
      <ServiceLandingSchema
        serviceName="Configuração de Redes Wi-Fi, Roteadores e Mesh"
        description="Instalação de roteadores, repetidores e sistemas mesh, mapa de cobertura, troca de canal/banda 5 GHz e segurança da rede. Atendimento domiciliar em Curitiba."
        path="/servicos/redes-wifi"
        priceFrom={99.99}
        faqs={[
          { question: "Quanto custa configurar Wi-Fi em casa em Curitiba?", answer: "A configuração começa em R$ 99,99 e inclui mapa de cobertura, ajuste de canal/banda, senha forte e rede de visitantes. Para casas grandes recomendamos sistema mesh, orçado à parte." },
          { question: "Por que meu Wi-Fi vive caindo?", answer: "Os motivos mais comuns são interferência de canal, roteador mal posicionado, firmware desatualizado ou número de dispositivos acima do suportado. Diagnosticamos na visita técnica." },
          { question: "Vocês configuram sistema mesh (Deco, Nest, Eero)?", answer: "Sim. Instalamos sistemas mesh das principais marcas, posicionando os pontos para cobertura uniforme em toda a casa ou escritório." },
          { question: "Atendem empresas e escritórios?", answer: "Sim. Configuramos redes corporativas com VLANs, controle de acesso, rede de visitantes isolada e gestão de banda para empresas em Curitiba." },
          { question: "Quanto tempo demora?", answer: "Atendimento residencial leva em média 1 a 2 horas. Empresas e instalações mesh maiores levam 2 a 4 horas. Visita técnica em até 30 min do agendamento." },
          { question: "Vocês configuram impressora em rede?", answer: "Sim. Conectamos a impressora à rede, reservamos IP fixo, instalamos o driver oficial e liberamos o compartilhamento entre os dispositivos. Não fazemos reparo mecânico ou eletrônico de impressoras." },
          { question: "Vocês consertam impressora que não puxa papel ou está borrando?", answer: "Não. Falhas mecânicas e eletrônicas de impressora são de assistência autorizada da marca. Nosso escopo é o aparelho como dispositivo de rede." },
        ]}
      />
      <Header />
      <Breadcrumbs items={[{ label: "Serviços", href: "/servicos" }, { label: "Redes e Wi-Fi" }]} />
      <main id="main-content">
      
      {/* Hero Section */}
      <section className="pt-10 pb-10 hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 -right-20 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse-soft" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-accent/20 text-accent px-4 py-2 rounded-full mb-6 shimmer">
              <Wifi className="h-5 w-5" />
              <span className="font-medium">Conectividade Total</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6 reveal-text">
              Configuração de Redes e Wi-Fi em Curitiba
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto reveal-text" data-reveal-delay="100">
              Internet lenta ou com falhas? Configuramos sua rede Wi-Fi para máxima velocidade e cobertura em toda sua casa ou empresa.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center reveal-text" data-reveal-delay="200">
              <Button size="lg" className="bg-[#25D366] hover:bg-[#128C7E] text-white shadow-[0_0_24px_rgba(37,211,102,0.3)] hover:shadow-[0_0_32px_rgba(37,211,102,0.5)] transition-all duration-300" onClick={handleWhatsAppClick}>
                <MessageCircle className="mr-2 h-5 w-5" />
                Melhorar Meu Wi-Fi
              </Button>
            </div>
          </div>
        </div>
      </section>
      <RealImageSection imageKey="redesWifi" caption="Infraestrutura de rede profissional" />
      <ServiceHeroSummary
        summary="Configuração de rede Wi-Fi e cabeada com avaliação de cobertura, interferência, roteador, access point e dispositivos em rede — incluindo impressoras apenas no aspecto de conectividade."
        items={[
          { id: "contextos-rede", label: "Em casa ou no escritório" },
          { id: "pilares-rede", label: "Cobertura, capacidade e estabilidade" },
          { id: "triagem", label: "Triagem antes da visita" },
          { id: "problemas", label: "Problemas que resolvemos" },
          { id: "solucoes", label: "Soluções por necessidade" },
          { id: "perifericos-em-rede", label: "Impressoras em rede" },
          { id: "rede-empresarial", label: "Rede em empresas" },
          { id: "limites-rede", label: "Limites e fornecedores" },
          { id: "faq", label: "Perguntas frequentes" },
        ]}
      />

      {/* Contexto residencial × empresarial — bloco visual, sem estado (3T) */}
      <section id="contextos-rede" className="py-10 bg-secondary scroll-mt-24">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground text-center mb-3">
            O mesmo atendimento em casa, no home office e no escritório
          </h2>
          <p className="text-muted-foreground text-center max-w-3xl mx-auto mb-8">
            O que muda é o ambiente e a quantidade de dispositivos, não o serviço. Veja qual situação se parece
            mais com a sua.
          </p>
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <div className="bg-background p-6 rounded-xl border border-border">
              <h3 className="text-lg font-bold text-foreground mb-3">Em casa ou home office</h3>
              <ul className="space-y-2 text-sm text-muted-foreground mb-4">
                {[
                  "Cobertura fraca em quartos, fundos ou segundo andar",
                  "Quedas durante chamadas de vídeo e reuniões",
                  "Roteador antigo ou mal posicionado",
                  "Interferência de redes vizinhas e aparelhos próximos",
                  "Muitos dispositivos conectados ao mesmo tempo",
                ].map((t) => (
                  <li key={t} className="flex gap-2">
                    <CheckCircle className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-3 text-sm">
                <Link to="/atendimento-remoto" className="text-accent underline underline-offset-2">
                  Atendimento remoto
                </Link>
                <a href="#triagem" className="text-accent underline underline-offset-2">
                  Testar antes da visita
                </a>
              </div>
            </div>
            <div className="bg-background p-6 rounded-xl border border-border">
              <h3 className="text-lg font-bold text-foreground mb-3">No escritório ou na empresa</h3>
              <ul className="space-y-2 text-sm text-muted-foreground mb-4">
                {[
                  "Vários usuários conectados simultaneamente",
                  "Impressoras e periféricos compartilhados em rede",
                  "Pastas e arquivos compartilhados entre estações",
                  "Access points e distribuição por cabo",
                  "Continuidade do atendimento durante o expediente",
                ].map((t) => (
                  <li key={t} className="flex gap-2">
                    <CheckCircle className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-3 text-sm">
                <a href="#rede-empresarial" className="text-accent underline underline-offset-2">
                  Rede em empresas
                </a>
                <Link to="/suporte-empresas" className="text-accent underline underline-offset-2">
                  Suporte técnico empresarial
                </Link>
                <Link to="/equipamentos-atendidos" className="text-accent underline underline-offset-2">
                  Equipamentos atendidos
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pilares da avaliação de rede (3T) */}
      <section id="pilares-rede" className="py-10 bg-background scroll-mt-24">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground text-center mb-8">
            O que é avaliado na rede
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto">
            {[
              { title: "Cobertura", body: "Onde o sinal realmente alcança dentro do ambiente, por cômodo e por andar." },
              { title: "Capacidade", body: "Quantos dispositivos usam a rede ao mesmo tempo e o que isso exige do equipamento." },
              { title: "Estabilidade", body: "Quedas, reconexões e interferência de canal, banda ou redes vizinhas." },
              { title: "Infraestrutura", body: "Roteador, access point, cabeamento e posicionamento dos equipamentos." },
            ].map((p) => (
              <div key={p.title} className="bg-secondary p-6 rounded-xl border border-border">
                <h3 className="font-bold text-foreground mb-2">{p.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-muted-foreground text-center max-w-3xl mx-auto mt-6">
            Cobertura, capacidade e estabilidade são medidas separadamente da velocidade contratada — o link
            externo continua sob responsabilidade da operadora.
          </p>
        </div>
      </section>


      {/* Serviços de Rede */}
      <section className="py-10 bg-background relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] bg-accent/5 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl font-heading font-bold text-foreground text-center mb-6 reveal-text">
            Nossos Serviços de Rede
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { icon: Router, title: "Instalação de Roteador", desc: "Configuração completa do seu novo roteador" },
              { icon: Signal, title: "Extensores e Repetidores", desc: "Amplie o alcance do Wi-Fi na sua casa" },
              { icon: Wifi, title: "Rede Mesh", desc: "Cobertura total sem pontos mortos" },
              { icon: Router, title: "Roteador Dual-Band", desc: "Configure 2.4GHz e 5GHz corretamente" },
              { icon: Signal, title: "Otimização de Sinal", desc: "Melhore a velocidade e estabilidade" },
              { icon: Wifi, title: "Rede Cabeada", desc: "Instalação de cabos ethernet" },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="flex gap-4 p-4 bg-secondary rounded-xl group hover:-translate-y-1 hover:shadow-lg transition-all duration-300 stagger-item" style={{ animationDelay: `${index * 80}ms` }}>
                  <Icon className="h-6 w-6 text-accent flex-shrink-0 mt-1 group-hover:scale-110 transition-transform duration-300" />
                  <div>
                    <h3 className="font-bold text-primary">{item.title}</h3>
                    <p className="text-muted-foreground text-sm">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <RealImageSection imageKey="servidores" caption="Rack de rede e equipamentos configurados profissionalmente" />

      {/* Galeria — O que está incluso no atendimento Wi-Fi */}
      <ServiceGallery
        title="O Que Está Incluso no Atendimento de Wi-Fi"
        subtitle="Etapas visíveis do serviço, desde o mapa de cobertura até a otimização final."
        bgClass="bg-secondary"
        items={[
          { imageKey: "redesWifi", caption: "Análise de sinal e mapa de cobertura por cômodo" },
          { imageKey: "servidores", caption: "Instalação e configuração de roteador / mesh / access points" },
          { imageKey: "ferramentas", caption: "Cabeamento estruturado e organização do rack" },
          { imageKey: "diagnostico", caption: "Ajuste de canais 2,4 GHz / 5 GHz e banda ideal" },
          { imageKey: "segurancaDigital", caption: "Segurança WPA3, rede de visitantes e bloqueio de intrusos" },
          { imageKey: "clienteSatisfeito", caption: "Teste de velocidade em cada ambiente antes da entrega" },
        ]}
      />

      {/* Triagem antes da visita — reduz visitas improdutivas */}
      <section id="triagem" className="py-10 bg-background border-y border-border scroll-mt-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground text-center mb-6">
              Triagem: O que Testar Antes da Visita de Wi-Fi
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { q: "Outros dispositivos também caem?", a: "Se apenas 1 aparelho falha, o problema costuma ser dele (driver/adaptador). Se todos caem, é rede/roteador — vale visita." },
                { q: "O sinal cai só em cômodos específicos?", a: "Sinal fraco em partes da casa indica cobertura insuficiente — normalmente resolve com repetidor ou mesh. Trazer planta do imóvel ajuda." },
                { q: "Reiniciou modem e roteador por 30s cada?", a: "Passo obrigatório antes de qualquer diagnóstico. Se após o restart continua lento, provavelmente é canal congestionado ou firmware." },
                { q: "A velocidade contratada está sendo entregue no cabo?", a: "Teste via cabo ethernet direto no modem. Se o cabo entrega 100% e o Wi-Fi não, o gargalo é o Wi-Fi. Se o cabo já vem baixo, é problema do provedor." },
                { q: "Quantos dispositivos ficam ligados simultaneamente?", a: "Roteadores básicos travam com mais de 15-20 dispositivos ativos. Câmeras, IoT e streams contam. Casa com muitos aparelhos precisa mesh dual-band." },
                { q: "Sinais de que não compensa reparar seu roteador antigo?", a: "Aparelhos com mais de 5 anos, sem Wi-Fi 5 (AC) e sem 5 GHz devem ser substituídos — o custo de reparo é maior que o de um roteador novo." },
              ].map((f, i) => (
                <details key={i} className="bg-secondary rounded-lg p-4 border border-border group">
                  <summary className="font-semibold text-foreground cursor-pointer list-none flex items-center justify-between">
                    {f.q}
                    <span className="text-muted-foreground group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Problemas Comuns */}
      <section id="problemas" className="py-10 bg-secondary scroll-mt-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-heading font-bold text-foreground text-center mb-6 reveal-text">
            Problemas que Resolvemos
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              "Internet lenta em alguns cômodos",
              "Wi-Fi não alcança todos os ambientes",
              "Conexão caindo constantemente",
              "Dispositivos não conectam ao Wi-Fi",
              "Velocidade diferente do contratado",
              "Muitos dispositivos derrubam a rede",
              "Interferência de redes vizinhas",
              "Configuração de novo roteador",
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-3 p-4 bg-background rounded-lg hover:-translate-y-0.5 hover:shadow-md transition-all duration-300 stagger-item" style={{ animationDelay: `${index * 60}ms` }}>
                <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                <span className="text-foreground">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Soluções */}
      <section id="solucoes" className="py-10 bg-background scroll-mt-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-heading font-bold text-foreground text-center mb-6 reveal-text">
            Soluções para Cada Necessidade
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { title: "Casa Pequena", desc: "Até 60m² - Roteador bem posicionado resolve", price: "A partir de R$ 99,99", highlight: false },
              { title: "Casa Média", desc: "60-150m² - Roteador + repetidor", price: "A partir de R$199", highlight: true },
              { title: "Casa Grande", desc: "Acima de 150m² - Sistema Mesh recomendado", price: "A partir de R$399", highlight: false },
            ].map((item, index) => (
              <div key={index} className={`bg-secondary p-6 rounded-xl text-center group hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300 stagger-item ${item.highlight ? "border-2 border-accent shadow-[0_0_20px_rgba(var(--accent)/0.15)]" : ""}`} style={{ animationDelay: `${index * 100}ms` }}>
                <h3 className="text-xl font-bold text-foreground mb-4">{item.title}</h3>
                <p className="text-muted-foreground mb-4">{item.desc}</p>
                <p className="text-2xl font-bold text-accent">{item.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impressoras e periféricos como dispositivos de rede */}
      <section className="py-10 bg-background scroll-mt-24" id="perifericos-em-rede">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-heading font-bold text-foreground text-center mb-3">
            Impressoras e periféricos: suporte de rede, não de hardware
          </h2>
          <p className="text-muted-foreground text-center max-w-3xl mx-auto mb-8">
            Tratamos impressoras, câmeras, NAS, TVs e demais periféricos como dispositivos conectados à rede. Resolvemos o que impede o aparelho de ser encontrado e usado — não fazemos reparo mecânico ou eletrônico desses equipamentos.
          </p>
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <div className="bg-secondary p-6 rounded-xl">
              <h3 className="font-bold text-foreground mb-3">O que fazemos</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {[
                  "Conectar a impressora à rede Wi-Fi ou cabeada e reservar IP fixo no roteador",
                  "Instalar e configurar o driver oficial do fabricante nos computadores da casa ou do escritório",
                  "Compartilhar a impressora entre vários dispositivos, incluindo celular e notebook",
                  "Corrigir impressora \"offline\" causada por troca de roteador, mudança de senha ou faixa de IP",
                  "Configurar digitalização em rede, scan para pasta e scan para e-mail quando o aparelho suporta",
                  "Isolar periféricos e câmeras em rede de visitantes ou VLAN separada",
                  "Ajustar firewall, descoberta de rede e perfil público/privado no Windows",
                ].map((t) => (
                  <li key={t} className="flex gap-2"><CheckCircle className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" /><span>{t}</span></li>
                ))}
              </ul>
            </div>
            <div className="bg-secondary p-6 rounded-xl border border-destructive/30">
              <h3 className="font-bold text-foreground mb-3">O que não fazemos</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {[
                  "Reparo mecânico de impressora: tracionamento de papel, engrenagens, cabeçote ou fusor",
                  "Reparo eletrônico de placa lógica de impressora ou periférico",
                  "Recarga de cartucho, reset de chip de toner ou desbloqueio de contador",
                  "Conserto físico de câmeras, NAS, TVs e demais periféricos",
                  "Garantia sobre limitação do próprio aparelho ou do firmware do fabricante",
                ].map((t) => (
                  <li key={t} className="flex gap-2"><span className="text-destructive flex-shrink-0">✕</span><span>{t}</span></li>
                ))}
              </ul>
              <p className="text-xs text-muted-foreground mt-4">
                Quando o problema é físico, informamos na visita e indicamos a assistência autorizada da marca. Nesse caso, cobramos apenas o diagnóstico de rede já realizado.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Rede em ambiente empresarial — padrão visual empresarial (3T) */}
      <BusinessContextGrid
        id="rede-empresarial"
        title="Rede em ambiente empresarial"
        intro="Contextos operacionais comuns em escritórios e comércios de Curitiba. O escopo é o ambiente interno: cobertura, cabeamento, roteador, access point e dispositivos conectados."
        contexts={[
          {
            title: "Escritórios com vários usuários simultâneos",
            body: "Reuniões on-line, arquivos em nuvem e sistema web ao mesmo tempo. Avaliamos canal, banda, posicionamento e distribuição por cabo. Limite: velocidade contratada e link externo pertencem à operadora.",
          },
          {
            title: "Recepções e postos de atendimento",
            body: "Computador, impressora em rede e leitor conectados ao mesmo ponto. Organizamos IP fixo, compartilhamento e senha da rede. Limite: falha mecânica ou eletrônica de impressora é da assistência autorizada da marca.",
          },
          {
            title: "Ambientes com muitas paredes ou dois pavimentos",
            body: "Sinal cai entre salas ou andares. A avaliação indica cabeamento, access point adicional ou sistema mesh conforme o ambiente. Limite: obra civil e passagem de infraestrutura são orçadas à parte e podem exigir terceiro.",
          },
          {
            title: "Rede compartilhada com visitantes",
            body: "Separação entre rede interna e rede de visitantes, senha forte e revisão de dispositivos conectados. Limite: regras de sistemas corporativos e políticas internas seguem com o responsável de TI da empresa.",
          },
        ]}
      />

      <ThirdPartyLimits
        id="limites-rede"
        title="O que verificamos e o que depende de fornecedor"
        intro={
          <>
            Transparência de escopo antes da visita — o que é possível verificar no ambiente, o que depende de
            terceiros e o que não é executado sem autorização formal. Regras de acesso e credenciais seguem o que
            está descrito em{" "}
            <Link to="/seguranca-dos-dados" className="text-accent underline underline-offset-2">
              segurança dos dados
            </Link>
            .
          </>
        }
        columns={[
          {
            title: "Podemos verificar",
            items: [
              "Cobertura e interferência no ambiente",
              "Canal, banda e configuração do roteador",
              "Cabeamento e pontos de rede existentes",
              "Dispositivos conectados e conflito de IP",
              "Impressora e periféricos como dispositivo de rede",
              "Rede de visitantes e senha da rede",
            ],
          },
          {
            title: "Pode depender do fornecedor",
            tone: "warning",
            items: [
              "Velocidade contratada e estabilidade do link",
              "Equipamento fornecido pela operadora",
              "Indisponibilidade de plataforma ou sistema externo",
              "Licença, conta e autenticação de sistema corporativo",
              "Reparo mecânico ou eletrônico de impressora",
              "Suporte a equipamento especializado do fabricante",
            ],
          },
          {
            title: "Não executamos sem autorização",
            tone: "warning",
            items: [
              "Alteração de política de rede corporativa",
              "Redefinição de credencial de terceiros",
              "Acesso administrativo indevido",
              "Contorno de proteção ou restrição interna",
              "Modificação em servidor gerenciado por outra empresa",
            ],
          },
        ]}
        footer={
          <>
            Precisa organizar isso no ambiente da empresa? Veja como funciona o{" "}
            <Link to="/suporte-empresas" className="text-accent underline underline-offset-2">
              suporte técnico empresarial
            </Link>
            .
          </>
        }
      />


      {/* Caixas editoriais (3Q) + CTA intermediário */}
      <section className="py-8 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto grid gap-4 md:grid-cols-3">
            <EditorialCallout variant="verificamos" title="Cobertura não é a mesma coisa que velocidade">
              <p>
                Sinal forte em todos os cômodos não significa link rápido: cobertura, interferência e
                velocidade contratada são fatores diferentes e medidos separadamente.
              </p>
            </EditorialCallout>
            <EditorialCallout variant="limites" title="O que depende da operadora">
              <p>
                Velocidade contratada, estabilidade do link externo e equipamentos fornecidos pela
                operadora seguem sob responsabilidade dela.
              </p>
            </EditorialCallout>
            <EditorialCallout variant="antes-de-autorizar" title="Impressoras e periféricos em rede">
              <p>
                O atendimento de impressoras e periféricos se limita à configuração, comunicação e
                compartilhamento em rede — sem reparo mecânico ou eletrônico do aparelho.
              </p>
            </EditorialCallout>
          </div>
          <div className="max-w-4xl mx-auto mt-6">
            <InlineTriageCTA
              location="servico-redes-wifi-meio"
              message="Olá! Preciso avaliar a minha rede Wi-Fi ou cabeada."
              hint="Conte onde o sinal falha e quantos dispositivos usam a rede."
            />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-10 bg-secondary scroll-mt-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-heading font-bold text-foreground text-center mb-6 reveal-text">
            Perguntas Frequentes
          </h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              { q: "Por que meu Wi-Fi é lento?", a: "Pode ser posicionamento ruim do roteador, interferência, canal congestionado, ou equipamento desatualizado. Fazemos diagnóstico completo." },
              { q: "O que é rede Mesh?", a: "É um sistema com múltiplos pontos de acesso que trabalham juntos para cobrir toda a casa com sinal forte e estável." },
              { q: "Preciso trocar meu roteador?", a: "Depende. Avaliamos seu equipamento atual e recomendamos troca apenas se necessário. Muitas vezes, uma boa configuração resolve." },
              { q: "Vocês instalam o equipamento?", a: "Sim! Instalamos e configuramos roteadores, repetidores, sistemas Mesh e redes cabeadas." },
              { q: "Qual a diferença entre 2.4GHz e 5GHz?", a: "2.4GHz tem maior alcance mas menor velocidade. 5GHz é mais rápido mas tem menor alcance. Configuramos ambas para uso ideal." },
              { q: "Vocês configuram impressora em rede?", a: "Sim. Conectamos a impressora à rede, reservamos IP fixo, instalamos o driver oficial nos computadores e liberamos o compartilhamento entre os dispositivos. É suporte de rede e configuração." },
              { q: "Minha impressora aparece como offline. Vocês resolvem?", a: "Na maioria dos casos sim: o aparelho costuma perder o endereço após troca de roteador, mudança de senha ou alteração da faixa de IP. Se o problema for físico ou de placa, informamos na hora e indicamos a autorizada." },
              { q: "Vocês consertam impressora que não puxa papel ou está borrando?", a: "Não. Falhas mecânicas e eletrônicas de impressora — tracionamento, cabeçote, fusor, placa lógica — são de assistência autorizada da marca. Nosso escopo é o aparelho como dispositivo de rede." },
              { q: "Trabalham com recarga de cartucho ou reset de toner?", a: "Não. Não fazemos recarga, reset de chip nem desbloqueio de contador." },
              { q: "Dá para digitalizar direto para uma pasta da rede?", a: "Sim, quando a impressora multifuncional oferece esse recurso. Configuramos scan para pasta compartilhada ou para e-mail conforme o modelo permitir." },
              { q: "Vocês configuram câmeras, NAS e TVs na rede?", a: "Configuramos esses equipamentos como dispositivos de rede: endereçamento, acesso remoto quando suportado e isolamento em rede separada. O conserto físico deles não faz parte do serviço." },
            ].map((item, index) => (
              <div key={index} className="bg-background p-6 rounded-xl hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 stagger-item" style={{ animationDelay: `${index * 80}ms` }}>
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
          <div className="absolute top-0 left-1/3 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-breathe" />
          <div className="absolute bottom-0 right-1/3 w-60 h-60 bg-white/5 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl font-heading font-bold text-white mb-4 reveal-text">
            Wi-Fi Lento ou Com Falhas?
          </h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Entre em contato e tenha internet rápida em toda sua casa ou empresa!
          </p>
          <Button size="lg" className="bg-[#25D366] hover:bg-[#128C7E] text-white shadow-[0_0_24px_rgba(37,211,102,0.3)] hover:shadow-[0_0_32px_rgba(37,211,102,0.5)] transition-all duration-300" onClick={handleWhatsAppClick}>
            <MessageCircle className="mr-2 h-5 w-5" />
            Melhorar Meu Wi-Fi
          </Button>
        </div>
      </section>

      {/* Checklist "Antes da visita" (Wi-Fi) — PDF gratuito */}
      <section className="py-8 bg-accent/5 border-y border-accent/10">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2">Antes de chamar: baixe o checklist de Wi-Fi</h3>
          <p className="text-sm text-muted-foreground mb-4">1 página com verificações rápidas que resolvem cerca de 30% dos casos sem visita técnica.</p>
          <a
            href="/downloads/checklist-antes-da-visita-wifi.pdf"
            download
            onClick={() => {
              if (typeof window !== "undefined" && window.gtag) {
                window.gtag("event", "checklist_download", {
                  event_category: "engagement",
                  checklist_kind: "wifi",
                  servico: "redes-wifi",
                  page_path: window.location.pathname,
                });
              }
            }}
            className="inline-flex items-center gap-2 rounded-lg bg-accent text-white px-5 py-2.5 font-semibold hover:bg-accent/90 transition-colors"
            data-cta-location="servico_redes-wifi_checklist"
          >
            📥 Baixar checklist Wi-Fi em PDF
          </a>
          <p className="mt-3 text-sm text-muted-foreground">
            Internet caindo em todos os aparelhos?{" "}
            <Link to="/checklists" className="text-primary hover:underline">
              Baixe também o checklist “sem internet ou Wi-Fi instável”
            </Link>
            .
          </p>
        </div>
      </section>

      <ServiceOperationalSpec path="/servicos/redes-wifi" />
      </main>
      <InterlinkingBlock />
      <Footer />

    </div>
  );
};

export default RedesWifi;
