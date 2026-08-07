
CREATE TABLE IF NOT EXISTS public.os_lookup_audit (
  id uuid primary key default gen_random_uuid(),
  tipo text not null,
  encontrado boolean not null default false,
  erro text,
  criado_em timestamptz not null default now()
);

GRANT SELECT ON public.os_lookup_audit TO authenticated;
GRANT ALL ON public.os_lookup_audit TO service_role;

ALTER TABLE public.os_lookup_audit ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can read os lookup audit"
ON public.os_lookup_audit FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE INDEX IF NOT EXISTS os_lookup_audit_criado_em_idx ON public.os_lookup_audit (criado_em DESC);

GRANT SELECT ON public.os_lookup_attempts TO authenticated;
GRANT ALL ON public.os_lookup_attempts TO service_role;

DROP POLICY IF EXISTS "Admins can read os lookup attempts" ON public.os_lookup_attempts;
CREATE POLICY "Admins can read os lookup attempts"
ON public.os_lookup_attempts FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE OR REPLACE FUNCTION public.os_lookup_log(_tipo text, _encontrado boolean, _erro text DEFAULT NULL)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  INSERT INTO public.os_lookup_audit (tipo, encontrado, erro)
  VALUES (left(coalesce(_tipo, 'desconhecido'), 20), coalesce(_encontrado, false), left(_erro, 120));
  DELETE FROM public.os_lookup_audit WHERE criado_em < now() - interval '90 days';
END;
$function$;

CREATE OR REPLACE FUNCTION public.consultar_os(_numero text)
 RETURNS TABLE(numero text, etapa text, descricao_curta text, equipamento text, sintomas text, fotos jsonb, cidade text, bairro text, prazo_estimado text, previsao_conclusao timestamp with time zone, observacao_publica text, historico jsonb, created_at timestamp with time zone, updated_at timestamp with time zone)
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_total integer := 0;
BEGIN
  IF length(coalesce(_numero, '')) < 6 THEN
    PERFORM public.os_lookup_log('numero', false, 'numero_invalido');
    RAISE EXCEPTION 'numero_invalido' USING ERRCODE = 'P0001';
  END IF;

  BEGIN
    PERFORM public.os_rate_limit('os:' || upper(trim(_numero)), 12);
  EXCEPTION WHEN OTHERS THEN
    PERFORM public.os_lookup_log('numero', false, 'rate_limited');
    RAISE;
  END;

  SELECT count(*) INTO v_total FROM public.ordens_servico o
  WHERE upper(o.numero) = upper(trim(_numero));

  PERFORM public.os_lookup_log('numero', v_total > 0, NULL);

  RETURN QUERY
  SELECT o.numero, o.etapa, o.descricao_curta, o.equipamento, o.sintomas, o.fotos,
         o.cidade, o.bairro, o.prazo_estimado, o.previsao_conclusao, o.observacao_publica,
         o.historico, o.created_at, o.updated_at
  FROM public.ordens_servico o
  WHERE upper(o.numero) = upper(trim(_numero))
  LIMIT 1;
END;
$function$;

CREATE OR REPLACE FUNCTION public.consultar_os_por_telefone(_telefone text)
 RETURNS TABLE(numero text, etapa text, descricao_curta text, equipamento text, sintomas text, fotos jsonb, cidade text, bairro text, prazo_estimado text, previsao_conclusao timestamp with time zone, observacao_publica text, historico jsonb, telefone_mascarado text, created_at timestamp with time zone, updated_at timestamp with time zone)
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_digits text := regexp_replace(coalesce(_telefone, ''), '\D', '', 'g');
  v_total integer := 0;
BEGIN
  IF length(v_digits) < 10 OR length(v_digits) > 13 THEN
    PERFORM public.os_lookup_log('telefone', false, 'telefone_invalido');
    RAISE EXCEPTION 'telefone_invalido' USING ERRCODE = 'P0001';
  END IF;

  BEGIN
    PERFORM public.os_rate_limit('tel:' || v_digits, 8);
  EXCEPTION WHEN OTHERS THEN
    PERFORM public.os_lookup_log('telefone', false, 'rate_limited');
    RAISE;
  END;

  SELECT count(*) INTO v_total FROM public.ordens_servico o
  WHERE right(regexp_replace(coalesce(o.telefone, ''), '\D', '', 'g'), 8) = right(v_digits, 8);

  PERFORM public.os_lookup_log('telefone', v_total > 0, NULL);

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
$function$;
