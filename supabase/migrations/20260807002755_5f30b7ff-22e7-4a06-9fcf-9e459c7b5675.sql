
REVOKE EXECUTE ON FUNCTION public.os_lookup_log(text, boolean, text) FROM anon, authenticated, public;
REVOKE EXECUTE ON FUNCTION public.os_rate_limit(text, integer) FROM anon, authenticated, public;
