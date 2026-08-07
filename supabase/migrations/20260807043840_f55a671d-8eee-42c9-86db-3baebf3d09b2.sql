CREATE TABLE public.seo_snapshots (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  origem text NOT NULL DEFAULT 'cron',
  sitemap_total integer NOT NULL DEFAULT 0,
  sitemap_adicionadas jsonb NOT NULL DEFAULT '[]'::jsonb,
  sitemap_removidas jsonb NOT NULL DEFAULT '[]'::jsonb,
  erros jsonb NOT NULL DEFAULT '[]'::jsonb,
  total_erros integer NOT NULL DEFAULT 0,
  gsc jsonb NOT NULL DEFAULT '{}'::jsonb,
  cobertura jsonb NOT NULL DEFAULT '{}'::jsonb,
  duracao_ms integer,
  criado_em timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.seo_alertas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tipo text NOT NULL,
  severidade text NOT NULL DEFAULT 'aviso',
  titulo text NOT NULL,
  detalhe text,
  url text,
  enviado_slack boolean NOT NULL DEFAULT false,
  resolvido_em timestamptz,
  criado_em timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.seo_relatorios (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  mes date NOT NULL UNIQUE,
  gerado_em timestamptz NOT NULL DEFAULT now(),
  resumo jsonb NOT NULL DEFAULT '{}'::jsonb
);

CREATE INDEX idx_seo_snapshots_criado_em ON public.seo_snapshots (criado_em DESC);
CREATE INDEX idx_seo_alertas_criado_em ON public.seo_alertas (criado_em DESC);

GRANT SELECT ON public.seo_snapshots TO authenticated;
GRANT SELECT, UPDATE ON public.seo_alertas TO authenticated;
GRANT SELECT ON public.seo_relatorios TO authenticated;
GRANT ALL ON public.seo_snapshots TO service_role;
GRANT ALL ON public.seo_alertas TO service_role;
GRANT ALL ON public.seo_relatorios TO service_role;

ALTER TABLE public.seo_snapshots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seo_alertas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seo_relatorios ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins leem snapshots SEO" ON public.seo_snapshots
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins leem alertas SEO" ON public.seo_alertas
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins atualizam alertas SEO" ON public.seo_alertas
  FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins leem relatorios SEO" ON public.seo_relatorios
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));