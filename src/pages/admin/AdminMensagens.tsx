import { useMemo, useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Copy, Check, MessageCircle } from "lucide-react";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { NAP_PHONE_DIGITS } from "@/lib/nap";

/** Abre o WhatsApp já com o roteiro do serviço pré-preenchido. */
const openWhatsApp = (texto: string) => {
  window.open(
    `https://wa.me/${NAP_PHONE_DIGITS}?text=${encodeURIComponent(texto)}`,
    "_blank",
    "noopener,noreferrer",
  );
};

interface Template {
  id: string;
  titulo: string;
  texto: string;
}

const TEMPLATES: Template[] = [
  {
    id: "virus",
    titulo: "Vírus / lentidão suspeita",
    texto:
      "Olá! Para avaliar o caso de vírus ou lentidão, me envie:\n1) Equipamento e marca (ex.: notebook Dell Inspiron)\n2) O que aparece na tela (pop-ups, aviso do antivírus, travamentos)\n3) Quando começou e o que mudou antes disso\n4) O computador liga e conecta à internet normalmente?\n5) Bairro e cidade\nCom essas informações eu faço a triagem e digo se resolvemos remoto ou se precisa atendimento no local.",
  },
  {
    id: "formatacao",
    titulo: "Formatação / reinstalação",
    texto:
      "Olá! Para orçar a formatação, preciso saber:\n1) Equipamento e marca\n2) Windows atual e se tem licença/conta Microsoft\n3) Precisa preservar arquivos (backup)? Qual volume aproximado?\n4) Programas essenciais que devo reinstalar\n5) Bairro e cidade\nDepois disso eu confirmo valor, prazo e a modalidade (remoto, no local ou coleta).",
  },
  {
    id: "ssd",
    titulo: "SSD / memória (upgrade)",
    texto:
      "Olá! Para o upgrade, me envie:\n1) Modelo exato do equipamento (etiqueta inferior ou nota fiscal)\n2) Capacidade e tipo de disco atual (HD ou SSD) e memória instalada\n3) Uso principal (trabalho, estudo, jogos, edição)\n4) Prefere manter o sistema atual (clonagem) ou instalação limpa?\n5) Bairro e cidade\nCom o modelo confirmado eu verifico compatibilidade antes de fechar o orçamento.",
  },
  {
    id: "wifi",
    titulo: "Wi-Fi / rede",
    texto:
      "Olá! Para avaliar a rede, me informe:\n1) Operadora e modelo do roteador/modem\n2) Onde o sinal falha (cômodos, andares) e metragem aproximada\n3) Quantos dispositivos conectados\n4) Problema é queda, lentidão ou não conecta?\n5) Bairro e cidade\nCom isso eu digo se resolve com ajuste de configuração ou se precisa de equipamento adicional.",
  },
  {
    id: "empresas",
    titulo: "Suporte empresarial",
    texto:
      "Olá! Para montar o atendimento da empresa, preciso de:\n1) Nome da empresa e endereço\n2) Quantidade de computadores, impressoras e usuários\n3) Existe servidor, NAS ou sistema específico?\n4) Demanda pontual ou suporte recorrente?\n5) Horário preferencial de atendimento\nCom esses dados eu envio o escopo e o valor por atendimento ou por plano mensal.",
  },
  {
    id: "urgencia",
    titulo: "Urgência",
    texto:
      "Olá! Para tentar encaixe prioritário, me envie agora:\n1) Equipamento e o que aconteceu\n2) O aparelho liga? Aparece alguma mensagem na tela?\n3) Bairro e cidade\n4) Melhor período hoje (manhã ou tarde)\nEu confirmo em seguida se há agenda disponível. Se não houver, indico o próximo horário real, sem prometer prazo que não consigo cumprir.",
  },
];

const ETAPAS = [
  {
    titulo: "1. Capturar",
    itens: [
      "Pedir avaliação somente após a OS concluída e o cliente confirmar que está funcionando.",
      "Solicitar por WhatsApp, no mesmo número do atendimento, sem insistência (máximo 2 contatos).",
      "Nunca oferecer desconto ou brinde em troca de avaliação.",
    ],
  },
  {
    titulo: "2. Registrar",
    itens: [
      "Anotar número da OS, data, serviço e canal do pedido de avaliação.",
      "Guardar o consentimento explícito de publicação (print ou campo no painel).",
      "Registrar apenas nome e primeira letra do sobrenome quando o cliente pedir discrição.",
    ],
  },
  {
    titulo: "3. Revisar (privacidade)",
    itens: [
      "Remover dados pessoais: endereço completo, CPF, telefone, e-mail e senhas.",
      "Conferir se o texto não cita informações sigilosas da empresa do cliente.",
      "Verificar se fotos anexas não mostram tela com dados, etiquetas ou documentos.",
    ],
  },
  {
    titulo: "4. Aprovar",
    itens: [
      "Aprovar somente avaliações com OS correspondente identificada.",
      "Marcar 'verificada' apenas quando houver vínculo comprovado com o atendimento.",
      "Recusar com motivo registrado quando faltar consentimento ou vínculo.",
    ],
  },
  {
    titulo: "5. Publicar",
    itens: [
      "Publicar no site e, quando autorizado, convidar para o Google Business Profile.",
      "Nunca editar o conteúdo da opinião; corrigir apenas erro de digitação evidente.",
      "Responder publicamente de forma factual, sem prometer resultado ou prazo.",
    ],
  },
];

export default function AdminMensagens() {
  const { loading, session, isAdmin } = useAdminAuth();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const checklistTexto = useMemo(
    () =>
      ETAPAS.map((e) => `${e.titulo}\n${e.itens.map((i) => `- ${i}`).join("\n")}`).join("\n\n"),
    [],
  );

  const copy = async (id: string, texto: string) => {
    try {
      await navigator.clipboard.writeText(texto);
      setCopiedId(id);
      window.setTimeout(() => setCopiedId(null), 2000);
    } catch {
      setCopiedId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  if (!session || !isAdmin) return <Navigate to="/admin/login" replace />;

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Mensagens e processo de avaliação | Painel interno</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <Header />
      <main className="container mx-auto py-10">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-2xl font-bold text-foreground">Mensagens prontas e processo pós-OS</h1>
          <p className="mt-2 text-muted-foreground">
            Uso interno. Copie o texto, cole no WhatsApp e ajuste apenas o necessário.{" "}
            <Link to="/admin/local-seo" className="text-primary hover:underline">
              Ferramentas de SEO local
            </Link>
          </p>

          <Tabs defaultValue="mensagens" className="mt-6">
            <TabsList>
              <TabsTrigger value="mensagens">Mensagens por serviço</TabsTrigger>
              <TabsTrigger value="avaliacao">Processo de avaliação</TabsTrigger>
            </TabsList>

            <TabsContent value="mensagens" className="mt-4 space-y-4">
              {TEMPLATES.map((t) => (
                <Card key={t.id} className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <h2 className="font-semibold text-foreground">{t.titulo}</h2>
                    <Button size="sm" variant="outline" onClick={() => copy(t.id, t.texto)}>
                      {copiedId === t.id ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      {copiedId === t.id ? "Copiado" : "Copiar"}
                    </Button>
                  </div>
                  <pre className="mt-3 whitespace-pre-wrap break-words rounded-lg bg-muted p-3 text-sm text-muted-foreground">
                    {t.texto}
                  </pre>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="avaliacao" className="mt-4 space-y-4">
              <div className="flex justify-end">
                <Button size="sm" variant="outline" onClick={() => copy("checklist", checklistTexto)}>
                  {copiedId === "checklist" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  {copiedId === "checklist" ? "Copiado" : "Copiar checklist"}
                </Button>
              </div>
              {ETAPAS.map((e) => (
                <Card key={e.titulo} className="p-4">
                  <h2 className="font-semibold text-foreground">{e.titulo}</h2>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                    {e.itens.map((i) => (
                      <li key={i}>{i}</li>
                    ))}
                  </ul>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
}
