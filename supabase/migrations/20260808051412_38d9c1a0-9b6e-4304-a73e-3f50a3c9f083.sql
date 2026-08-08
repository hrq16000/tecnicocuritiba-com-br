-- Helpers internos: não devem ser chamáveis pela API (Data API / RPC)
REVOKE ALL ON FUNCTION public.os_lookup_log(text, boolean, text) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.os_rate_limit(text, integer) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.os_lookup_log(text, boolean, text) TO service_role;
GRANT EXECUTE ON FUNCTION public.os_rate_limit(text, integer) TO service_role;

-- has_role: SECURITY INVOKER (stable) — usada apenas em policies; não precisa ser RPC pública
REVOKE ALL ON FUNCTION public.has_role(uuid, app_role) FROM PUBLIC, anon;

-- Consultas públicas de OS permanecem acessíveis (página /status-os), com rate limit interno
REVOKE ALL ON FUNCTION public.consultar_os(text) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.consultar_os_por_telefone(text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.consultar_os(text) TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.consultar_os_por_telefone(text) TO anon, authenticated, service_role;