ALTER TABLE public.ordens_servico
  ADD COLUMN IF NOT EXISTS telefone text,
  ADD COLUMN IF NOT EXISTS equipamento text,
  ADD COLUMN IF NOT EXISTS sintomas text,
  ADD COLUMN IF NOT EXISTS fotos jsonb NOT NULL DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS sla_horas integer,
  ADD COLUMN IF NOT EXISTS previsao_conclusao timestamptz;

CREATE INDEX IF NOT EXISTS ordens_servico_telefone_idx ON public.ordens_servico (telefone);

DROP POLICY IF EXISTS "Public can open ordens with valid data" ON public.ordens_servico;
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
    AND (telefone IS NULL OR length(telefone) BETWEEN 10 AND 13)
    AND (equipamento IS NULL OR length(equipamento) <= 120)
    AND (sintomas IS NULL OR length(sintomas) <= 2000)
    AND jsonb_array_length(fotos) <= 10
    AND historico = '[]'::jsonb
  );

CREATE TABLE IF NOT EXISTS public.os_lookup_attempts (
  chave text PRIMARY KEY,
  janela_inicio timestamptz NOT NULL DEFAULT now(),
  tentativas integer NOT NULL DEFAULT 0
);

GRANT ALL ON public.os_lookup_attempts TO service_role;
ALTER TABLE public.os_lookup_attempts ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.os_rate_limit(_chave text, _limite integer DEFAULT 8)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_count integer;
BEGIN
  INSERT INTO public.os_lookup_attempts (chave, janela_inicio, tentativas)
  VALUES (_chave, now(), 1)
  ON CONFLICT (chave) DO UPDATE
    SET tentativas = CASE WHEN public.os_lookup_attempts.janela_inicio < now() - interval '10 minutes'
                          THEN 1 ELSE public.os_lookup_attempts.tentativas + 1 END,
        janela_inicio = CASE WHEN public.os_lookup_attempts.janela_inicio < now() - interval '10 minutes'
                          THEN now() ELSE public.os_lookup_attempts.janela_inicio END
  RETURNING tentativas INTO v_count;

  IF v_count > _limite THEN
    RAISE EXCEPTION 'rate_limited' USING ERRCODE = 'P0001';
  END IF;
END;
$$;

CREATE OR REPLACE FUNCTION public.consultar_os_por_telefone(_telefone text)
RETURNS TABLE (
  numero text,
  etapa text,
  descricao_curta text,
  equipamento text,
  sintomas text,
  fotos jsonb,
  cidade text,
  bairro text,
  prazo_estimado text,
  previsao_conclusao timestamptz,
  observacao_publica text,
  historico jsonb,
  telefone_mascarado text,
  created_at timestamptz,
  updated_at timestamptz
)
LANGUAGE plpgsql
VOLATILE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_digits text := regexp_replace(coalesce(_telefone, ''), '\D', '', 'g');
BEGIN
  IF length(v_digits) < 10 OR length(v_digits) > 13 THEN
    RAISE EXCEPTION 'telefone_invalido' USING ERRCODE = 'P0001';
  END IF;

  PERFORM public.os_rate_limit('tel:' || v_digits, 8);

  RETURN QUERY
  SELECT o.numero, o.etapa, o.descricao_curta, o.equipamento, o.sintomas, o.fotos,
         o.cidade, o.bairro, o.prazo_estimado, o.previsao_conclusao, o.observacao_publica,
         o.historico,
         '(' || substr(v_digits, 1, 2) || ') ****-' || right(v_digits, 4) AS telefone_mascarado,
         o.created_at, o.updated_at
  FROM public.ordens_servico o
  WHERE right(regexp_replace(coalesce(o.telefone, ''), '\D', '', 'g'), 8) = right(v_digits, 8)
  ORDER BY o.created_at DESC
  LIMIT 10;
END;
$$;

GRANT EXECUTE ON FUNCTION public.consultar_os_por_telefone(text) TO anon, authenticated;

DROP FUNCTION IF EXISTS public.consultar_os(text);
CREATE FUNCTION public.consultar_os(_numero text)
RETURNS TABLE (
  numero text,
  etapa text,
  descricao_curta text,
  equipamento text,
  sintomas text,
  fotos jsonb,
  cidade text,
  bairro text,
  prazo_estimado text,
  previsao_conclusao timestamptz,
  observacao_publica text,
  historico jsonb,
  created_at timestamptz,
  updated_at timestamptz
)
LANGUAGE plpgsql
VOLATILE
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF length(coalesce(_numero, '')) < 6 THEN
    RAISE EXCEPTION 'numero_invalido' USING ERRCODE = 'P0001';
  END IF;

  PERFORM public.os_rate_limit('os:' || upper(trim(_numero)), 12);

  RETURN QUERY
  SELECT o.numero, o.etapa, o.descricao_curta, o.equipamento, o.sintomas, o.fotos,
         o.cidade, o.bairro, o.prazo_estimado, o.previsao_conclusao, o.observacao_publica,
         o.historico, o.created_at, o.updated_at
  FROM public.ordens_servico o
  WHERE upper(o.numero) = upper(trim(_numero))
  LIMIT 1;
END;
$$;

GRANT EXECUTE ON FUNCTION public.consultar_os(text) TO anon, authenticated;