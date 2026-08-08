import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageSEO } from "@/components/PageSEO";
import Breadcrumbs from "@/components/Breadcrumbs";
import PageSummaryBand from "@/components/PageSummaryBand";
import { LocalPhotoGallery } from "@/components/LocalPhotoGallery";
import { RealImageSection } from "@/components/RealImageSection";
import { ServicosCorrelatos } from "@/components/ServicosCorrelatos";
import { Button } from "@/components/ui/button";
import { trackCTAClick } from "@/lib/analytics";
import { MessageCircle, CheckCircle, AlertTriangle, Laptop, HardDrive, ShieldCheck, Wrench } from "lucide-react";

const WA =
  "https://wa.me/5541997452053?text=" +
  encodeURIComponent("Olá! Li o guia técnico de informática e quero um diagnóstico do meu equipamento.") +
  "&utm_source=site&utm_medium=guia&utm_campaign=guia-tecnico-informatica";

const faqs = [
  {
    q: "Quanto custa chamar um técnico de informática em Curitiba?",
    a: "O diagnóstico técnico custa R$ 99,99 e é incorporado ao valor do serviço quando o reparo é aprovado. Serviços simples como formatação e remoção de vírus partem de R$ 99,99. Reparos que exigem bancada recebem orçamento fechado antes de qualquer execução.",
  },
  {
    q: "Vale a pena consertar um computador antigo?",
    a: "A regra prática que usamos: compensa quando o reparo fica abaixo de 40% do valor de um equipamento equivalente novo e a máquina tem menos de 6 anos. Acima disso, o laudo mostra os números para você decidir sem pressão.",
  },
  {
    q: "Meu computador está lento. É software ou hardware?",
    a: "O teste é objetivo: abra o Gerenciador de Tarefas e observe por três minutos. Disco em 100% indica HD mecânico; memória acima de 85% indica falta de RAM; CPU alta sem motivo costuma indicar malware. O diagnóstico confirma o gargalo antes de qualquer compra de peça.",
  },
  {
    q: "O atendimento é em domicílio ou preciso levar o equipamento?",
    a: "Depende do caso. Software, rede, formatação e upgrades são resolvidos em domicílio ou remotamente. Reparos de placa, solda e recuperação de dados exigem bancada — nesses casos há coleta e devolução.",
  },
  {
    q: "Quanto tempo demora o reparo?",
    a: "Atendimentos em domicílio e remotos são concluídos na própria visita na maioria dos casos. Serviços de bancada variam de 1 a 10 dias úteis conforme a complexidade e a disponibilidade de peças, sempre com prazo informado antes da aprovação.",
  },
  {
    q: "Existe garantia?",
    a: "Sim. Todo serviço tem garantia por escrito na ordem de serviço. Peças fornecidas pelo cliente seguem a política de peças do cliente: a garantia da peça é do fornecedor e nós garantimos a mão de obra.",
  },
  {
    q: "Quais equipamentos vocês atendem?",
    a: "Desktops, notebooks, all-in-one, workstations, servidores de pequeno porte, redes e periféricos ligados à rede. Marcas Dell, Lenovo, HP, Acer, Asus, Samsung, Positivo, Apple e máquinas montadas.",
  },
];

export default function GuiaTecnicoInformatica() {
  const path = "/guia-tecnico-informatica";
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
    headline: "Guia técnico de informática: diagnóstico, custos e prazos",
    description:
      "Guia completo de informática: como identificar a causa do problema, quanto custa cada serviço, prazos reais, quando compensa consertar e como escolher o atendimento certo em Curitiba.",
    mainEntityOfPage: url,
    inLanguage: "pt-BR",
    author: { "@type": "Organization", name: "Técnico em Curitiba" },
    publisher: { "@type": "Organization", name: "Técnico em Curitiba" },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Início", item: "https://tecnicocuritiba.com.br/" },
      { "@type": "ListItem", position: 2, name: "Serviços", item: "https://tecnicocuritiba.com.br/servicos" },
      { "@type": "ListItem", position: 3, name: "Guia técnico de informática", item: url },
    ],
  };

  return (
    <>
      <PageSEO
        title="Guia Técnico de Informática | Diagnóstico, Custos e Prazos"
        description="Guia completo de informática: como descobrir a causa do problema, quanto custa cada serviço, prazos reais e quando compensa consertar PC ou notebook em Curitiba."
        path={path}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <Header />
      <main id="main-content" className="container mx-auto px-4 py-8">
        <Breadcrumbs
          emitSchema={false}
          items={[{ label: "Início", href: "/" }, { label: "Serviços", href: "/servicos" }, { label: "Guia técnico de informática" }]}
        />

        <article className="max-w-3xl mx-auto py-8 md:py-12">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Guia técnico de informática: diagnóstico, custos e prazos
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            Este guia reúne, em um só lugar, o raciocínio que usamos todos os dias em atendimentos
            de informática em Curitiba e região metropolitana: como separar problema de software de
            problema de hardware, quanto custa cada tipo de serviço, quanto tempo leva, quando
            compensa consertar e quando é mais honesto trocar o equipamento. É conteúdo
            informacional — sem promessa de desempenho e sem número inventado.
          </p>

          <div className="mb-10">
            <Button size="lg" asChild data-cta-location="guia_informatica_hero">
              <a
                href={WA}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackCTAClick("whatsapp", "guia_informatica_hero", { servico: "diagnostico" })}
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Pedir diagnóstico pelo WhatsApp
              </a>
            </Button>
          </div>

          <PageSummaryBand
            summary="Guia informacional do cluster de informática: sintomas e causas, software x hardware, tabela de custos e prazos, quando compensa consertar, prevenção e como funciona o atendimento em Curitiba."
            items={[
              { id: "sintomas", label: "Sintomas e causas" },
              { id: "software-hardware", label: "Software x hardware" },
              { id: "custos", label: "Custos e prazos" },
              { id: "compensa", label: "Quando compensa consertar" },
              { id: "upgrade", label: "Upgrades que valem a pena" },
              { id: "prevencao", label: "Prevenção e backup" },
              { id: "atendimento", label: "Como funciona o atendimento" },
              { id: "faq", label: "Perguntas frequentes" },
            ]}
          />

          <h2 id="sintomas" className="text-2xl font-bold mb-3 scroll-mt-24">
            1. Sintomas mais comuns e o que costuma estar por trás
          </h2>
          <p className="mb-4 text-muted-foreground">
            A maior parte dos chamados de informática cabe em meia dúzia de sintomas. Antes de
            trocar qualquer peça, vale reconhecer o padrão — isso evita gastar dinheiro no lugar
            errado, que é o erro mais caro que vemos.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 mb-6">
            {[
              {
                icon: Laptop,
                t: "Não liga ou liga e desliga",
                d: "Fonte, carregador, jack de energia, memória mal encaixada ou placa com curto. Sempre começa por teste de energia, nunca por troca de peça.",
              },
              {
                icon: HardDrive,
                t: "Lentidão progressiva",
                d: "HD mecânico no fim da vida, RAM insuficiente, disco cheio ou excesso de programas na inicialização.",
              },
              {
                icon: AlertTriangle,
                t: "Travamentos e telas azuis",
                d: "Memória com erro, disco com setores ruins, driver incompatível ou superaquecimento por pasta térmica seca.",
              },
              {
                icon: ShieldCheck,
                t: "Comportamento estranho no navegador",
                d: "Extensões maliciosas, sequestro de página inicial, mineradores consumindo CPU em segundo plano.",
              },
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
          <p className="mb-6 text-muted-foreground">
            Para os dois casos mais buscados, temos material aprofundado:{" "}
            <Link className="underline" to="/blog/notebook-nao-liga-o-que-fazer">notebook não liga</Link> e{" "}
            <Link className="underline" to="/blog/computador-lento-causas-solucoes">computador lento</Link>. Se o
            equipamento é desktop, veja também{" "}
            <Link className="underline" to="/problemas/computador-nao-liga-curitiba">computador não liga em Curitiba</Link>.
          </p>

          <RealImageSection
            imageKey="diagnostico"
            caption="Diagnóstico com o cliente presente: primeiro se prova a causa, depois se fala em peça"
          />

          <h2 id="software-hardware" className="text-2xl font-bold mb-3 scroll-mt-24">
            2. Como separar problema de software de problema de hardware
          </h2>
          <p className="mb-4 text-muted-foreground">
            Essa é a bifurcação mais importante do diagnóstico, porque muda completamente o custo e
            o prazo. Três verificações resolvem a maioria dos casos:
          </p>
          <ul className="mb-6 space-y-2">
            {[
              "Boot externo: se o equipamento inicia por um sistema em pendrive e funciona bem, o hardware básico está saudável e o problema é do sistema instalado.",
              "Leitura SMART do disco: setores realocados, erros de leitura e tempo de resposta alto denunciam disco em fim de vida, mesmo que o Windows ainda abra.",
              "Teste de memória e temperatura: erros de RAM e throttling térmico produzem travamentos que parecem 'vírus' mas não são.",
            ].map((t) => (
              <li key={t} className="flex gap-2">
                <CheckCircle className="h-5 w-5 shrink-0 text-primary mt-0.5" aria-hidden />
                <span className="text-muted-foreground">{t}</span>
              </li>
            ))}
          </ul>
          <p className="mb-6 text-muted-foreground">
            O procedimento completo, com os testes que executamos e o que entra no laudo, está em{" "}
            <Link className="underline" to="/diagnostico-tecnico">diagnóstico técnico</Link>.
          </p>

          <h2 id="custos" className="text-2xl font-bold mb-3 scroll-mt-24">
            3. Custos e prazos por tipo de serviço
          </h2>
          <p className="mb-4 text-muted-foreground">
            Os valores abaixo são faixas de referência praticadas em Curitiba e região. O valor
            final sai no orçamento fechado, depois do diagnóstico e antes da execução — nunca
            durante.
          </p>
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className="text-left p-2 border-b">Serviço</th>
                  <th className="text-left p-2 border-b">Faixa de valor</th>
                  <th className="text-left p-2 border-b">Prazo típico</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="p-2 border-b">Diagnóstico técnico</td><td className="p-2 border-b">R$ 99,99</td><td className="p-2 border-b">Na visita</td></tr>
                <tr><td className="p-2 border-b">Formatação com backup</td><td className="p-2 border-b">A partir de R$ 99,99</td><td className="p-2 border-b">2h a 4h</td></tr>
                <tr><td className="p-2 border-b">Remoção de vírus</td><td className="p-2 border-b">A partir de R$ 99,99</td><td className="p-2 border-b">1h a 3h</td></tr>
                <tr><td className="p-2 border-b">Upgrade de SSD/RAM (mão de obra)</td><td className="p-2 border-b">A partir de R$ 99,99 + peça</td><td className="p-2 border-b">1h a 3h</td></tr>
                <tr><td className="p-2 border-b">Limpeza interna e pasta térmica</td><td className="p-2 border-b">R$ 120 a R$ 200</td><td className="p-2 border-b">1h a 2h</td></tr>
                <tr><td className="p-2 border-b">Reparo de placa em bancada</td><td className="p-2 border-b">Sob orçamento</td><td className="p-2 border-b">3 a 10 dias úteis</td></tr>
              </tbody>
            </table>
          </div>
          <p className="mb-6 text-muted-foreground">
            A tabela completa, com política de coleta, deslocamento e garantia, está em{" "}
            <Link className="underline" to="/precos-e-politicas">preços e políticas</Link>.
          </p>

          <h2 id="compensa" className="text-2xl font-bold mb-3 scroll-mt-24">
            4. Quando compensa consertar e quando é hora de trocar
          </h2>
          <p className="mb-4 text-muted-foreground">
            Não existe resposta genérica, mas existe critério. Usamos três perguntas na ordem:
          </p>
          <ol className="mb-6 space-y-2 list-decimal pl-5 text-muted-foreground">
            <li>O custo do reparo fica abaixo de 40% do valor de um equipamento equivalente novo?</li>
            <li>A máquina ainda atende ao uso real dos próximos dois anos?</li>
            <li>O componente reparado é o único ponto crítico, ou há outros no fim da vida útil?</li>
          </ol>
          <div className="rounded-xl border border-amber-500/40 bg-amber-500/5 p-4 mb-6 flex gap-3">
            <AlertTriangle className="h-5 w-5 shrink-0 text-amber-500 mt-0.5" aria-hidden />
            <div className="text-sm text-muted-foreground">
              Duas respostas negativas normalmente significam que o reparo é gasto empurrado para
              frente. Nesses casos dizemos isso com clareza — o detalhamento está em{" "}
              <Link className="underline" to="/quando-nao-compensa">quando não compensa consertar</Link>.
            </div>
          </div>

          <h2 id="upgrade" className="text-2xl font-bold mb-3 scroll-mt-24">
            5. Upgrades que realmente mudam o dia a dia
          </h2>
          <p className="mb-4 text-muted-foreground">
            Em máquinas com menos de seis anos, dois upgrades concentram quase todo o ganho
            percebido: troca de HD mecânico por SSD e aumento de memória. Placa de vídeo e
            processador raramente são o gargalo em uso de escritório e estudo.
          </p>
          <ul className="mb-6 space-y-2">
            {[
              "HD para SSD: maior impacto em inicialização, abertura de programas e resposta geral do sistema.",
              "4 GB para 8 GB de RAM: elimina o uso constante de memória virtual em navegação com muitas abas.",
              "Limpeza interna e pasta térmica: devolve estabilidade em máquinas que ficam lentas conforme esquentam.",
              "Backup configurado: não acelera nada, mas é o upgrade que evita o prejuízo mais caro.",
            ].map((t) => (
              <li key={t} className="flex gap-2">
                <Wrench className="h-5 w-5 shrink-0 text-primary mt-0.5" aria-hidden />
                <span className="text-muted-foreground">{t}</span>
              </li>
            ))}
          </ul>
          <p className="mb-6 text-muted-foreground">
            Detalhes de execução em{" "}
            <Link className="underline" to="/servicos/upgrade-ssd-memoria">upgrade de SSD e memória</Link> e em{" "}
            <Link className="underline" to="/servicos/conserto-pc-notebook">conserto de PC e notebook</Link>.
          </p>

          <RealImageSection
            imageKey="componentesSsd"
            secondaryImageKey="bancadaTecnica"
            layout="duo"
            caption="SSD e memória: o upgrade com maior impacto percebido"
            secondaryCaption="Bancada própria para os casos que não se resolvem no local"
          />

          <h2 id="prevencao" className="text-2xl font-bold mb-3 scroll-mt-24">
            6. Prevenção: o que evita a maioria dos chamados
          </h2>
          <p className="mb-4 text-muted-foreground">
            Boa parte dos atendimentos de urgência poderia ter sido uma manutenção tranquila meses
            antes. A rotina mínima é simples:
          </p>
          <ul className="mb-6 space-y-2">
            {[
              "Backup automático em dois destinos (nuvem e disco externo), testado pelo menos uma vez por semestre.",
              "Limpeza interna anual em desktop e a cada 12–18 meses em notebook, conforme o ambiente.",
              "Atualizações de sistema e drivers em dia, sem instalar 'otimizadores' de origem duvidosa.",
              "Nobreak ou filtro de linha adequado — oscilação de energia é causa recorrente de fonte e placa queimadas.",
            ].map((t) => (
              <li key={t} className="flex gap-2">
                <CheckCircle className="h-5 w-5 shrink-0 text-primary mt-0.5" aria-hidden />
                <span className="text-muted-foreground">{t}</span>
              </li>
            ))}
          </ul>
          <p className="mb-6 text-muted-foreground">
            Para empresas, a rotina vira processo: veja{" "}
            <Link className="underline" to="/guias/organizacao-de-ti-para-escritorios">organização de TI para escritórios</Link>{" "}
            e <Link className="underline" to="/suporte-empresas">suporte de TI para empresas</Link>.
          </p>

          <h2 id="atendimento" className="text-2xl font-bold mb-3 scroll-mt-24">
            7. Como funciona o atendimento em Curitiba
          </h2>
          <p className="mb-4 text-muted-foreground">
            O contato é por WhatsApp, com triagem antes da visita para já chegar com as ferramentas
            e peças prováveis. A partir daí o fluxo é: diagnóstico, laudo com opções, orçamento
            fechado, execução e teste final documentado na ordem de serviço.
          </p>
          <p className="mb-6 text-muted-foreground">
            O passo a passo completo está em <Link className="underline" to="/como-funciona">como funciona</Link>, a
            cobertura por bairro em <Link className="underline" to="/areas-atendidas">áreas atendidas</Link> e a página
            principal do serviço local em{" "}
            <Link className="underline" to="/tecnico-informatica-curitiba">técnico de informática em Curitiba</Link>.
          </p>

          <h2 id="faq" className="text-2xl font-bold mb-4 scroll-mt-24">Perguntas frequentes</h2>
          <div className="space-y-4 mb-10">
            {faqs.map((f) => (
              <details key={f.q} className="rounded-xl border p-4">
                <summary className="font-semibold cursor-pointer">{f.q}</summary>
                <p className="mt-2 text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>

          <div className="rounded-2xl bg-primary/10 p-6 text-center">
            <h2 className="text-2xl font-bold mb-2">Ainda com dúvida sobre o seu caso?</h2>
            <p className="mb-4 text-muted-foreground">
              Descreva o sintoma no WhatsApp. A triagem é feita antes da visita e o diagnóstico custa
              R$ 99,99, incorporado ao serviço quando o reparo é aprovado.
            </p>
            <Button size="lg" asChild data-cta-location="guia_informatica_final">
              <a
                href={WA}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackCTAClick("whatsapp", "guia_informatica_final", { servico: "diagnostico" })}
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Falar no WhatsApp
              </a>
            </Button>
          </div>
        </article>

        <LocalPhotoGallery variant="geral" />
      </main>
      <ServicosCorrelatos exclude={["/guia-tecnico-informatica"]} />
      <Footer />
    </>
  );
}
