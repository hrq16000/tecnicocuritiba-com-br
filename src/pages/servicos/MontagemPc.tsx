import { useEffect } from "react";
import { PageSEO } from "@/components/PageSEO";
import { ServiceLandingSchema } from "@/components/ServiceLandingSchema";
import { Link } from "react-router-dom";
import { Monitor, CheckCircle, Cpu, Gamepad2, Briefcase, MessageCircle, FileDown } from "lucide-react";
import { OrcamentoMontagemWizard } from "@/components/OrcamentoMontagemWizard";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { InterlinkingBlock } from "@/components/InterlinkingBlock";
import { RealImageSection } from "@/components/RealImageSection";
import Breadcrumbs from "@/components/Breadcrumbs";
import ServiceHeroSummary from "@/components/ServiceHeroSummary";
import BusinessContextGrid from "@/components/b2b/BusinessContextGrid";
import { trackPageView, trackCTAClick } from "@/lib/analytics";

const WHATSAPP_NUMBER = "5541997452053";

const MontagemPc = () => {
  useEffect(() => {
    document.title = "Montagem de PC Gamer e Workstation em Curitiba | Técnico em Curitiba";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Montagem de PC Gamer e Workstation em Curitiba. Computador personalizado para jogos, trabalho ou edição. Configuração ideal para seu orçamento.");
    }
    trackPageView("/servicos/montagem-pc", "Montagem de PC");
  }, []);

  const handleWhatsAppClick = () => {
    trackCTAClick("whatsapp", "montagem-pc");
    const message = encodeURIComponent("Olá! Quero montar um PC personalizado. Podem me ajudar?");
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-background">
      <ServiceLandingSchema
        serviceName="Montagem de PC Gamer e Workstation"
        description="Montagem de PC Gamer e Workstation em Curitiba e região metropolitana. Diagnóstico profissional, orçamento aprovado antes do reparo e garantia de 90 dias."
        path="/servicos/montagem-pc"
        priceFrom={99.99}
        category="Montagem de Computadores"
        faqs={[
          { question: "Vocês montam PC do zero?", answer: "Sim. Montamos desktops, PC Gamer e workstations a partir de peças novas, com escolha de componentes, montagem, BIOS/UEFI, drivers oficiais e testes finais." },
          { question: "Posso levar minhas próprias peças?", answer: "Sim, sem restrição de procedência. Conferimos compatibilidade e integridade antes de montar e registramos qualquer problema encontrado." },
          { question: "Quem cobre a garantia se a peça der defeito?", answer: "A garantia da peça é do fabricante ou vendedor. A garantia de 90 dias que oferecemos cobre a mão de obra de montagem e configuração." },
          { question: "Vocês fazem overclock ou garantem FPS?", answer: "Não. Trabalhamos dentro das especificações do fabricante e garantimos montagem correta, estabilidade em teste de carga e temperaturas dentro do esperado." },
          { question: "Vocês montam workstation?", answer: "Sim. Montamos e avaliamos estações de trabalho para cargas exigentes. A configuração é definida por levantamento de requisitos: programas usados, tamanho dos arquivos, monitores, armazenamento, expansão e orçamento." },
          { question: "É possível garantir desempenho em um programa específico?", answer: "Não. A montagem correta não garante desempenho específico em um programa. A configuração é definida a partir dos requisitos oficiais da aplicação, do tipo de projeto e do orçamento disponível." },
          { question: "Quanto tempo demora?", answer: "Com todas as peças em mãos, de 1 a 2 dias úteis, incluindo o tempo de stress test." },
        ]}
      />
      <PageSEO title="Montagem de PC Gamer e Workstation em Curitiba | Técnico em Curitiba" description="Montagem de PC Gamer e Workstation em Curitiba. Computador personalizado para jogos, trabalho ou edição. Configuração ideal para seu orçamento." path="/servicos/montagem-pc"  breadcrumbs={[
        { name: "Início", path: "/" },
        { name: "Serviços", path: "/servicos" },
        { name: "Montagem de PC", path: "/servicos/montagem-pc" }
      ]} />
      <Header />
      <Breadcrumbs items={[{ label: "Serviços", href: "/servicos" }, { label: "Montagem de PC" }]} />
      
      {/* Hero Section */}
      <section className="pt-10 pb-10 hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 -left-20 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse-soft" />
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-accent/20 text-accent px-4 py-2 rounded-full mb-6 shimmer">
              <Cpu className="h-5 w-5" />
              <span className="font-medium">PC Personalizado</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6 reveal-text">
              Montagem de PC Gamer e Workstation em Curitiba
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto reveal-text" data-reveal-delay="100">
              Computador montado sob medida para suas necessidades. PC Gamer, Workstation para edição, ou PC para trabalho e estudo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center reveal-text" data-reveal-delay="200">
              <Button size="lg" className="bg-[#25D366] hover:bg-[#128C7E] text-white shadow-[0_0_24px_rgba(37,211,102,0.3)] hover:shadow-[0_0_32px_rgba(37,211,102,0.5)] transition-all duration-300" onClick={handleWhatsAppClick}>
                <MessageCircle className="mr-2 h-5 w-5" />
                Solicitar Orçamento
              </Button>
            </div>
          </div>
        </div>
      </section>
      <RealImageSection imageKey="desktopMontado" caption="PC montado sob medida com componentes premium" />

      <ServiceHeroSummary
        summary="Montagem sob demanda, executada por projeto: levantamento de uso, definição das peças com você, montagem, BIOS/UEFI, drivers, teste de estabilidade e entrega com checklist. Não é contrato mensal, franquia de horas nem suporte ilimitado — cada montagem tem escopo próprio."
        items={[
          { id: "tipos-de-pc", label: "Tipos de PC que montamos" },
          { id: "escopo-execucao", label: "Escopo da execução" },
          { id: "processo", label: "Como funciona" },
          { id: "contextos-montagem", label: "Contextos de uso" },
          { id: "pecas-do-cliente", label: "Peças do cliente" },
          { id: "garantia", label: "Garantia" },
          { id: "checklist-entrega", label: "Checklist de entrega" },
          { id: "workstations", label: "Workstations" },
          { id: "orcamento", label: "Orçamento" },
        ]}
      />

      {/* Tipos de PC */}
      <section id="tipos-de-pc" className="scroll-mt-24 py-10 bg-background relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-accent/5 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl font-heading font-bold text-foreground text-center mb-6 reveal-text">
            Montamos o PC Ideal Para Você
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { Icon: Gamepad2, title: "PC Gamer", desc: "Montagem voltada a jogos, streaming e VR. A escolha das peças é definida com você, conforme orçamento e uso.", items: ["Placa de vídeo dedicada", "SSD NVMe", "Memória em dual channel", "Gabinete com fluxo de ar adequado", "Refrigeração dimensionada"], price: "Escopo: montagem, BIOS/UEFI, drivers e testes", highlight: false },
              { Icon: Monitor, title: "Workstation", desc: "Montagem para edição, 3D, CAD e cargas prolongadas, com foco em estabilidade térmica e de alimentação.", items: ["Processador multi-core", "RAM conforme o software usado", "GPU compatível com a aplicação", "Armazenamento em camadas", "Teste de estabilidade sob carga"], price: "Escopo: montagem, BIOS/UEFI, drivers e testes", highlight: true },
              { Icon: Briefcase, title: "PC Trabalho", desc: "Montagem para escritório, home office e estudo, priorizando consumo e ruído baixos.", items: ["Processador eficiente", "RAM conforme o uso", "SSD", "Operação silenciosa", "Consumo baixo"], price: "Escopo: montagem, BIOS/UEFI, drivers e testes", highlight: false },
            ].map((card, idx) => (
              <div key={idx} className={`bg-secondary p-8 rounded-xl text-center group hover:-translate-y-2 hover:shadow-xl transition-all duration-300 stagger-item ${card.highlight ? "border-2 border-accent shadow-[0_0_20px_rgba(var(--accent)/0.15)]" : ""}`} style={{ animationDelay: `${idx * 120}ms` }}>
                <card.Icon className="h-16 w-16 text-accent mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-2xl font-bold text-foreground mb-4">{card.title}</h3>
                <p className="text-muted-foreground mb-6">{card.desc}</p>
                <ul className="text-left space-y-2 mb-6">
                  {card.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-accent" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-sm font-semibold text-accent">{card.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <RealImageSection imageKey="placaMae" caption="Componentes de alta performance selecionados" />

      {/* O que está incluso */}
      <section id="escopo-execucao" className="scroll-mt-24 py-10 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-heading font-bold text-foreground text-center mb-6 reveal-text">
            O Que Está Incluso no Serviço
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { title: "Consultoria", desc: "Ajudamos a escolher as peças ideais para seu uso" },
              { title: "Montagem", desc: "Montagem profissional com cuidado" },
              { title: "Sistema", desc: "Windows instalado e configurado" },
              { title: "Testes", desc: "Testes de estresse e estabilidade" },
            ].map((item, index) => (
              <div key={index} className="text-center p-6 bg-background rounded-xl group hover:-translate-y-1 hover:shadow-lg transition-all duration-300 stagger-item" style={{ animationDelay: `${index * 80}ms` }}>
                <h3 className="font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Processo */}
      <section className="py-10 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-heading font-bold text-foreground text-center mb-6 reveal-text">
            Como Funciona
          </h2>
          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { step: "1", title: "Conversa", desc: "Entendemos sua necessidade e orçamento" },
              { step: "2", title: "Orçamento", desc: "Montamos a configuração ideal" },
              { step: "3", title: "Aprovação", desc: "Você aprova as peças escolhidas" },
              { step: "4", title: "Montagem", desc: "Montamos, testamos e entregamos" },
            ].map((item, index) => (
              <div key={index} className="text-center p-6 bg-secondary rounded-xl group hover:-translate-y-1 hover:shadow-lg transition-all duration-300 stagger-item" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="w-12 h-12 bg-accent text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  {item.step}
                </div>
                <h3 className="font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Peças fornecidas pelo cliente */}
      <section className="py-10 bg-background" id="pecas-do-cliente">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-heading font-bold text-foreground text-center mb-6">
            Política para peças fornecidas pelo cliente
          </h2>
          <p className="text-muted-foreground text-center max-w-3xl mx-auto mb-8">
            Trabalhamos com peças compradas por você, novas ou usadas. Para evitar mal-entendidos, as regras abaixo valem para todo build montado com material do cliente.
          </p>
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {[
              { title: "Compatibilidade", desc: "Conferimos socket, chipset, perfil de memória, altura do cooler, comprimento da GPU e conectores da fonte antes de montar. Se algo for incompatível, o build é pausado e você decide como seguir." },
              { title: "Procedência", desc: "Aceitamos peças de qualquer origem, inclusive usadas ou de marketplace. Não conseguimos atestar autenticidade nem histórico de uso de peça que não passou por nós." },
              { title: "Integridade", desc: "Peça recebida é conferida visualmente (pinos, conectores, sinais de oxidação ou reparo prévio) e registrada na abertura da ordem. Dano preexistente é apontado antes da montagem." },
              { title: "Prazos de troca", desc: "Se uma peça sua apresentar defeito, o acionamento da garantia é feito por você junto ao vendedor. Guardamos o equipamento por até 10 dias corridos aguardando a reposição; após esse prazo, o restante é devolvido montado ou desmontado, conforme sua escolha." },
              { title: "Garantia da peça", desc: "É sempre do fabricante ou do vendedor. Não assumimos garantia sobre componente que não fornecemos." },
              { title: "Garantia da mão de obra", desc: "90 dias sobre montagem e configuração feitas por nós: fixação, cabeamento, aplicação de pasta térmica, ajustes de BIOS/UEFI e instalação de drivers." },
            ].map((item) => (
              <div key={item.title} className="bg-secondary p-6 rounded-xl">
                <h3 className="font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-center mt-6">
            <Link to="/politica-pecas-cliente" className="text-primary font-medium underline underline-offset-4">
              Ver política completa de peças do cliente (compatibilidade, procedência, prazos, garantia e valor do equipamento)
            </Link>
          </p>
        </div>
      </section>

      {/* Garantia delimitada */}
      <section className="py-10 bg-secondary" id="garantia">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-heading font-bold text-foreground text-center mb-6">
            Garantia da montagem e da configuração
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="bg-background p-6 rounded-xl">
              <h3 className="font-bold text-foreground mb-2">Montagem — 90 dias</h3>
              <p className="text-muted-foreground text-sm">Fixação de componentes, cabeamento, gerenciamento de fluxo de ar, aplicação de pasta térmica e conexões da fonte.</p>
            </div>
            <div className="bg-background p-6 rounded-xl">
              <h3 className="font-bold text-foreground mb-2">Configuração — 90 dias</h3>
              <p className="text-muted-foreground text-sm">Ajustes de BIOS/UEFI aplicados por nós, instalação do sistema e drivers oficiais, curvas de ventoinha e configuração de boot.</p>
            </div>
            <div className="bg-background p-6 rounded-xl border border-destructive/30">
              <h3 className="font-bold text-foreground mb-2">Não coberto</h3>
              <p className="text-muted-foreground text-sm">Overclock (não realizamos), defeito de peça, dano por queda, líquido, surto elétrico ou transporte, alterações feitas por terceiros, software pirata e desempenho esperado em jogo ou programa específico.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Checklist final de entrega */}
      <section className="py-10 bg-background" id="checklist-entrega">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-heading font-bold text-foreground text-center mb-3">
            Checklist final antes da entrega
          </h2>
          <p className="text-muted-foreground text-center max-w-3xl mx-auto mb-8">
            Todo computador montado passa por estas verificações. Elas comprovam funcionamento e estabilidade — não prometem FPS nem pontuação em benchmark.
          </p>
          <ol className="max-w-3xl mx-auto space-y-4">
            {[
              { t: "Compatibilidade conferida", d: "Socket, chipset, memória, dimensões físicas e conectores validados peça a peça." },
              { t: "Fonte e consumo", d: "Cálculo de consumo do conjunto, conferência dos conectores PCIe/EPS e folga de potência." },
              { t: "Refrigeração", d: "Pasta térmica aplicada, cooler assentado, fluxo de ar do gabinete definido (entrada/saída) e curvas de ventoinha ajustadas." },
              { t: "BIOS/UEFI", d: "Firmware atualizado quando aplicável, perfil de memória (XMP/EXPO) habilitado dentro da especificação, ordem de boot, data/hora e Secure Boot conforme o sistema instalado." },
              { t: "Drivers oficiais", d: "Chipset, GPU, rede, áudio e periféricos instalados a partir dos sites dos fabricantes — sem pacotes automáticos de terceiros." },
              { t: "Teste de memória", d: "Varredura de memória completa para descartar módulo ou perfil instável." },
              { t: "Teste de temperatura e estabilidade", d: "Stress test completo de CPU, GPU e conjunto sob carga prolongada, com monitoramento térmico e verificação de throttling, travamento ou reinício." },
            ].map((item, i) => (
              <li key={item.t} className="flex gap-4 bg-secondary p-5 rounded-xl">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-accent text-white font-bold flex items-center justify-center">{i + 1}</span>
                <div>
                  <h3 className="font-bold text-foreground">{item.t}</h3>
                  <p className="text-muted-foreground text-sm">{item.d}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="text-center mt-8">
            <Button asChild variant="outline" size="lg">
              <a
                href="/checklist-montagem-pc.pdf"
                download
                onClick={() =>
                  window.gtag?.("event", "checklist_download", {
                    event_category: "engagement",
                    event_label: "checklist_montagem_pc",
                    page_path: "/servicos/montagem-pc",
                  })
                }
              >
                <FileDown className="mr-2 h-5 w-5" />
                Baixar checklist final em PDF
              </a>
            </Button>
            <p className="text-sm text-muted-foreground mt-3">
              O mesmo checklist é enviado pelo WhatsApp junto com a entrega do equipamento.{" "}
              <Link to="/servicos/montagem-pc/como-funciona" className="text-primary underline underline-offset-4">
                Veja como funciona o atendimento e os prazos
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      {/* Workstations e estações de trabalho */}
      <section className="py-10 bg-background" id="workstations">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl font-heading font-bold text-foreground text-center mb-4">
            Workstations e estações de trabalho profissionais
          </h2>
          <p className="text-muted-foreground text-center max-w-3xl mx-auto mb-8">
            Montamos e avaliamos computadores para cargas de trabalho mais exigentes. A configuração não parte de uma
            receita pronta: ela é definida a partir do levantamento de requisitos do seu uso real.
          </p>

          <h3 className="text-xl font-bold text-foreground mb-3">Levantamento de requisitos</h3>
          <ul className="grid md:grid-cols-2 gap-3 mb-8">
            {[
              "Programas utilizados e requisitos oficiais de cada um",
              "Tamanho dos arquivos e dos projetos abertos",
              "Quantidade de aplicações usadas ao mesmo tempo",
              "Quantidade e resolução dos monitores",
              "Perfil de uso de CPU, memória e GPU",
              "Armazenamento para sistema, projetos, cache e backup",
              "Necessidade de expansão futura",
              "Orçamento disponível e vida útil esperada",
              "Compatibilidade entre os componentes escolhidos",
            ].map((item) => (
              <li key={item} className="flex gap-2 text-sm text-muted-foreground bg-secondary p-4 rounded-lg">
                <CheckCircle className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <h3 className="text-xl font-bold text-foreground mb-3">Como cada componente entra na conta</h3>
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            {[
              { t: "Processador", d: "Relacionado ao tipo de carga e à duração das tarefas. Cargas curtas e cargas prolongadas pedem escolhas diferentes." },
              { t: "Memória", d: "Relacionada ao volume dos projetos, ao número de aplicações simultâneas e ao tamanho dos arquivos abertos." },
              { t: "Placa de vídeo", d: "Relevante somente quando a aplicação utiliza aceleração gráfica compatível. Nem toda carga profissional depende de GPU." },
              { t: "Armazenamento", d: "Considerar sistema, programas, arquivos de trabalho, cache, projetos ativos e a rotina de backup." },
              { t: "Fonte e refrigeração", d: "Devem ser compatíveis com o conjunto e com a carga prevista, incluindo folga de potência e dissipação sob uso contínuo." },
              { t: "Expansão", d: "Slots livres, baias, limites da placa-mãe e do gabinete definem o que dá para ampliar depois sem trocar a plataforma." },
            ].map((item) => (
              <div key={item.t} className="bg-secondary p-5 rounded-xl">
                <h4 className="font-bold text-foreground mb-1">{item.t}</h4>
                <p className="text-sm text-muted-foreground">{item.d}</p>
              </div>
            ))}
          </div>

          <h3 className="text-xl font-bold text-foreground mb-3">Tipos de uso considerados no levantamento</h3>
          <p className="text-muted-foreground mb-4">
            Usamos como referência categorias de trabalho — programas de desenho técnico, modelagem, renderização,
            edição, análise de dados e desenvolvimento. Compatibilidade e desempenho dependem sempre da versão do
            programa, do tipo de projeto e dos requisitos oficiais publicados pelo fabricante do software.
          </p>
          <p className="text-muted-foreground mb-8">
            Não publicamos benchmark sem teste real, não prometemos tempo de renderização, não prometemos FPS e não
            afirmamos certificação de nenhum fabricante de software.
          </p>

          <div className="bg-secondary border-l-4 border-accent p-6 rounded-xl mb-8">
            <p className="text-foreground font-medium">
              A montagem correta não garante desempenho específico em um programa. A configuração deve ser definida a
              partir dos requisitos da aplicação, do tipo de projeto e do orçamento disponível.
            </p>
          </div>

          <h3 className="text-xl font-bold text-foreground mb-3">Continue por aqui</h3>
          <ul className="grid md:grid-cols-2 gap-3">
            <li><Link to="/suporte-empresas" className="text-primary underline underline-offset-4">Suporte técnico empresarial</Link> — execução, modalidades e limites do atendimento a empresas.</li>
            <li><Link to="/servicos/redes-wifi" className="text-primary underline underline-offset-4">Redes e Wi-Fi</Link> — conectividade das estações e da rede local.</li>
            <li><Link to="/servicos/backup-recuperacao" className="text-primary underline underline-offset-4">Backup e recuperação</Link> — prevenção e restauração dos arquivos de trabalho.</li>
            <li><Link to="/equipamentos-atendidos" className="text-primary underline underline-offset-4">Equipamentos atendidos</Link> — o que entra e o que não entra no escopo.</li>
            <li><Link to="/precos-e-politicas" className="text-primary underline underline-offset-4">Preços e políticas</Link> — diagnóstico, aprovação e garantia.</li>
            <li><Link to="/guias/como-escolher-workstation" className="text-primary underline underline-offset-4">Como escolher uma workstation</Link> — checklist de requisitos passo a passo.</li>
          </ul>
        </div>
      </section>


      {/* Mini-wizard de orçamento */}
      <section className="py-10 bg-secondary" id="orcamento">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-heading font-bold text-foreground text-center mb-3">
            Monte seu orçamento em 1 minuto
          </h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-8">
            Responda cinco perguntas rápidas e a mensagem chega ao WhatsApp já preenchida com uso, configuração, peças e
            sua cidade — sem ficar digitando tudo de novo.
          </p>
          <OrcamentoMontagemWizard />
        </div>
      </section>


      {/* Navegação contextual entre serviços relacionados */}
      <section className="py-8 bg-secondary" aria-labelledby="relacionados-montagem">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 id="relacionados-montagem" className="text-2xl font-heading font-bold text-foreground mb-4">
            Não é montagem nova? Veja o serviço certo
          </h2>
          <ul className="grid md:grid-cols-2 gap-4">
            <li className="bg-background p-5 rounded-xl">
              <Link to="/servicos/conserto-pc-notebook" className="font-bold text-accent hover:underline">Manutenção de computador</Link>
              <p className="text-sm text-muted-foreground mt-1">Máquina já montada que trava, esquenta, faz barulho ou não liga: diagnóstico e reparo, sem troca de plataforma.</p>
            </li>
            <li className="bg-background p-5 rounded-xl">
              <Link to="/servicos/upgrade-ssd-memoria" className="font-bold text-accent hover:underline">Upgrade de SSD e memória RAM</Link>
              <p className="text-sm text-muted-foreground mt-1">Quer só mais desempenho no PC atual sem montar outro: avaliamos se o upgrade compensa antes de qualquer compra.</p>
            </li>
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-10 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-heading font-bold text-foreground text-center mb-6 reveal-text">
            Perguntas Frequentes
          </h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              { q: "Vocês montam PC do zero?", a: "Sim. Montamos desktops, PC Gamer e workstations a partir de peças novas, incluindo escolha da lista de componentes, montagem, BIOS/UEFI, drivers oficiais e testes finais." },
              { q: "Posso levar minhas próprias peças?", a: "Pode. Aceitamos peças fornecidas pelo cliente sem restrição de procedência, inclusive usadas. Conferimos compatibilidade e integridade antes de montar e registramos qualquer problema encontrado." },
              { q: "Quem cobre a garantia se a peça der defeito?", a: "A garantia da peça é do fabricante ou do vendedor e o acionamento é feito por você. Nossa garantia de 90 dias cobre a mão de obra: montagem e configuração." },
              { q: "Qual o prazo se uma peça precisar ser trocada?", a: "Guardamos o equipamento por até 10 dias corridos aguardando a peça de reposição. Passado esse prazo, devolvemos o conjunto montado ou desmontado, como você preferir." },
              { q: "Vocês fazem overclock?", a: "Não. Trabalhamos dentro das especificações do fabricante, incluindo perfis de memória homologados (XMP/EXPO). Overclock manual não é executado nem coberto por garantia." },
              { q: "Vocês garantem quantos FPS o PC vai rodar?", a: "Não. Desempenho em jogos e programas depende de título, resolução, drivers e atualizações. Garantimos montagem correta, estabilidade comprovada em teste de carga e temperaturas dentro do esperado." },
              { q: "Vocês montam workstation?", a: "Sim. Montamos e avaliamos estações de trabalho para cargas exigentes. A configuração é definida por levantamento de requisitos: programas usados, tamanho dos arquivos, monitores, armazenamento, expansão e orçamento." },
              { q: "É possível garantir desempenho em um programa específico?", a: "Não. A montagem correta não garante desempenho específico em um programa. A configuração é definida a partir dos requisitos oficiais da aplicação, do tipo de projeto e do orçamento disponível." },
              { q: "Quais testes são feitos antes da entrega?", a: "Compatibilidade, cálculo de fonte/consumo, refrigeração, ajustes de BIOS/UEFI, drivers oficiais, teste de memória e stress test completo com monitoramento de temperatura e estabilidade." },
              { q: "Quanto custa?", a: "O orçamento depende das peças e do escopo, e é fechado antes de qualquer serviço. A mão de obra técnica parte de R$ 99,99." },
              { q: "Quanto tempo demora?", a: "Com todas as peças em mãos, de 1 a 2 dias úteis — o stress test exige tempo de máquina ligada sob carga." },
              { q: "Vocês entregam?", a: "Sim, entregamos o PC pronto em Curitiba e região metropolitana." },
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
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-breathe" />
          <div className="absolute bottom-0 right-1/4 w-60 h-60 bg-white/5 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl font-heading font-bold text-white mb-4 reveal-text">
            Quer um PC Sob Medida?
          </h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Entre em contato e monte o computador dos seus sonhos com a gente!
          </p>
          <Button size="lg" className="bg-[#25D366] hover:bg-[#128C7E] text-white shadow-[0_0_24px_rgba(37,211,102,0.3)] hover:shadow-[0_0_32px_rgba(37,211,102,0.5)] transition-all duration-300" onClick={handleWhatsAppClick}>
            <MessageCircle className="mr-2 h-5 w-5" />
            Solicitar Orçamento
          </Button>
        </div>
      </section>



      <InterlinkingBlock />
      <Footer />
    </div>
  );
};

export default MontagemPc;
