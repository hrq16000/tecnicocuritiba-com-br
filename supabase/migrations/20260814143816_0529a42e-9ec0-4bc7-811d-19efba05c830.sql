CREATE OR REPLACE VIEW public.public_reviews AS
SELECT
  id,
  author_name,
  author_photo_url,
  rating,
  comment,
  service_slug,
  city,
  neighborhood,
  source,
  google_review_url,
  review_date,
  created_at
FROM public.reviews
WHERE verified = true AND published = true;

GRANT SELECT ON public.public_reviews TO anon, authenticated;
GRANT ALL ON public.public_reviews TO service_role;

REVOKE SELECT ON public.reviews FROM anon;
DROP POLICY IF EXISTS "Public can read verified published reviews" ON public.reviews;

ALTER TABLE public.os_lookup_audit
  ADD COLUMN IF NOT EXISTS origem text,
  ADD COLUMN IF NOT EXISTS utm jsonb NOT NULL DEFAULT '{}'::jsonb;

DROP FUNCTION IF EXISTS public.os_lookup_log(text, boolean, text);

CREATE OR REPLACE FUNCTION public.os_lookup_log(_tipo text, _encontrado boolean, _erro text DEFAULT NULL::text, _origem text DEFAULT NULL::text, _utm jsonb DEFAULT '{}'::jsonb)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  IF length(coalesce(_utm::text, '')) > 2000 THEN
    _utm := '{}'::jsonb;
  END IF;
  INSERT INTO public.os_lookup_audit (tipo, encontrado, erro, origem, utm)
  VALUES (left(coalesce(_tipo, 'desconhecido'), 20), coalesce(_encontrado, false), left(_erro, 120), NULLIF(left(_origem, 200), ''), coalesce(_utm, '{}'::jsonb));
  DELETE FROM public.os_lookup_audit WHERE criado_em < now() - interval '90 days';
END;
$function$;

REVOKE ALL ON FUNCTION public.os_lookup_log(text, boolean, text, text, jsonb) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.os_lookup_log(text, boolean, text, text, jsonb) TO service_role;

DROP FUNCTION IF EXISTS public.consultar_os(text);

CREATE OR REPLACE FUNCTION public.consultar_os(_numero text, _origem text DEFAULT NULL::text, _utm jsonb DEFAULT '{}'::jsonb)
 RETURNS TABLE(numero text, etapa text, descricao_curta text, equipamento text, sintomas text, fotos jsonb, cidade text, bairro text, prazo_estimado text, previsao_conclusao timestamp with time zone, observacao_publica text, historico jsonb, created_at timestamp with time zone, updated_at timestamp with time zone)
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_total integer := 0;
BEGIN
  IF length(coalesce(_numero, '')) < 6 THEN
    PERFORM public.os_lookup_log('numero', false, 'numero_invalido', _origem, _utm);
    RAISE EXCEPTION 'numero_invalido' USING ERRCODE = 'P0001';
  END IF;

  BEGIN
    PERFORM public.os_rate_limit('os:' || upper(trim(_numero)), 12);
  EXCEPTION WHEN OTHERS THEN
    PERFORM public.os_lookup_log('numero', false, 'rate_limited', _origem, _utm);
    RAISE;
  END;

  SELECT count(*) INTO v_total FROM public.ordens_servico o
  WHERE upper(o.numero) = upper(trim(_numero));

  PERFORM public.os_lookup_log('numero', v_total > 0, NULL, _origem, _utm);

  RETURN QUERY
  SELECT o.numero, o.etapa, o.descricao_curta, o.equipamento, o.sintomas, o.fotos,
         o.cidade, o.bairro, o.prazo_estimado, o.previsao_conclusao, o.observacao_publica,
         o.historico, o.created_at, o.updated_at
  FROM public.ordens_servico o
  WHERE upper(o.numero) = upper(trim(_numero))
  LIMIT 1;
END;
$function$;

REVOKE ALL ON FUNCTION public.consultar_os(text, text, jsonb) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.consultar_os(text, text, jsonb) TO anon, authenticated, service_role;

DROP FUNCTION IF EXISTS public.consultar_os_por_telefone(text);

CREATE OR REPLACE FUNCTION public.consultar_os_por_telefone(_telefone text, _origem text DEFAULT NULL::text, _utm jsonb DEFAULT '{}'::jsonb)
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
    PERFORM public.os_lookup_log('telefone', false, 'telefone_invalido', _origem, _utm);
    RAISE EXCEPTION 'telefone_invalido' USING ERRCODE = 'P0001';
  END IF;

  BEGIN
    PERFORM public.os_rate_limit('tel:' || v_digits, 8);
  EXCEPTION WHEN OTHERS THEN
    PERFORM public.os_lookup_log('telefone', false, 'rate_limited', _origem, _utm);
    RAISE;
  END;

  SELECT count(*) INTO v_total FROM public.ordens_servico o
  WHERE right(regexp_replace(coalesce(o.telefone, ''), '\D', '', 'g'), 8) = right(v_digits, 8);

  PERFORM public.os_lookup_log('telefone', v_total > 0, NULL, _origem, _utm);

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

REVOKE ALL ON FUNCTION public.consultar_os_por_telefone(text, text, jsonb) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.consultar_os_por_telefone(text, text, jsonb) TO anon, authenticated, service_role;