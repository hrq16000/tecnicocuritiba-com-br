CREATE TABLE public.ordens_servico (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  numero text NOT NULL UNIQUE,
  etapa text NOT NULL DEFAULT 'aberta',
  descricao_curta text,
  cidade text,
  bairro text,
  prazo_estimado text,
  observacao_publica text,
  historico jsonb NOT NULL DEFAULT '[]'::jsonb,
  session_id text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.ordens_servico TO authenticated;
GRANT INSERT ON public.ordens_servico TO anon;
GRANT ALL ON public.ordens_servico TO service_role;

ALTER TABLE public.ordens_servico ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can read all ordens" ON public.ordens_servico
  FOR SELECT TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can update ordens" ON public.ordens_servico
  FOR UPDATE TO authenticated USING (has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can delete ordens" ON public.ordens_servico
  FOR DELETE TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Public can open ordens with valid data" ON public.ordens_servico
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    length(numero) BETWEEN 6 AND 40
    AND etapa = 'aberta'
    AND (descricao_curta IS NULL OR length(descricao_curta) <= 400)
    AND (cidade IS NULL OR length(cidade) <= 80)
    AND (bairro IS NULL OR length(bairro) <= 80)
    AND (observacao_publica IS NULL OR length(observacao_publica) <= 400)
    AND (prazo_estimado IS NULL OR length(prazo_estimado) <= 120)
    AND historico = '[]'::jsonb
  );

CREATE TRIGGER update_ordens_servico_updated_at
  BEFORE UPDATE ON public.ordens_servico
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE OR REPLACE FUNCTION public.consultar_os(_numero text)
RETURNS TABLE (
  numero text,
  etapa text,
  descricao_curta text,
  cidade text,
  bairro text,
  prazo_estimado text,
  observacao_publica text,
  historico jsonb,
  created_at timestamptz,
  updated_at timestamptz
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT o.numero, o.etapa, o.descricao_curta, o.cidade, o.bairro,
         o.prazo_estimado, o.observacao_publica, o.historico, o.created_at, o.updated_at
  FROM public.ordens_servico o
  WHERE length(coalesce(_numero, '')) >= 6
    AND upper(o.numero) = upper(trim(_numero))
  LIMIT 1;
$$;

GRANT EXECUTE ON FUNCTION public.consultar_os(text) TO anon, authenticated;