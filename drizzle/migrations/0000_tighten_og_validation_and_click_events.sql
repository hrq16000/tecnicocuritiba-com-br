DROP POLICY IF EXISTS "Public read og validation" ON public.og_validation_status;
REVOKE SELECT ON public.og_validation_status FROM anon;
CREATE POLICY "Admins read og validation" ON public.og_validation_status
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'::app_role));

DROP POLICY IF EXISTS "Public can insert allowlisted click events" ON public.click_events;
CREATE POLICY "Public can insert allowlisted click events" ON public.click_events
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    event_type IN ('wa_funnel_open','wa_funnel_step','wa_funnel_submit','wa_funnel_blocked','wa_funnel_close','wa_click','call_click')
    AND length(path) BETWEEN 1 AND 300
    AND (cta_location IS NULL OR length(cta_location) <= 120)
    AND (funnel_stage IS NULL OR length(funnel_stage) <= 60)
    AND (viewport_bucket IS NULL OR viewport_bucket IN ('mobile','tablet','desktop','unknown'))
    AND (attribution_channel IS NULL OR length(attribution_channel) <= 60)
    AND (utm_source IS NULL OR length(utm_source) <= 200)
    AND (utm_medium IS NULL OR length(utm_medium) <= 200)
    AND (utm_campaign IS NULL OR length(utm_campaign) <= 200)
    AND (gclid IS NULL OR length(gclid) <= 300)
    AND (session_id IS NULL OR length(session_id) <= 64)
    AND (app_version IS NULL OR length(app_version) <= 40)
    AND (equipamento IS NULL OR length(equipamento) <= 120)
    AND (sintoma IS NULL OR length(sintoma) <= 200)
  );