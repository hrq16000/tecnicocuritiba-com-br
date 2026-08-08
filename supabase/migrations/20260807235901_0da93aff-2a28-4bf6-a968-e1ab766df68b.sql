CREATE TABLE public.click_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type text NOT NULL,
  path text NOT NULL DEFAULT '/',
  cta_location text,
  funnel_stage text,
  viewport_bucket text,
  attribution_channel text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  gclid text,
  session_id text,
  app_version text,
  equipamento text,
  sintoma text,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT click_events_event_type_allowlist CHECK (
    event_type IN ('wa_funnel_open','wa_funnel_step','wa_funnel_submit','wa_funnel_blocked','wa_funnel_close','wa_click','call_click')
  ),
  CONSTRAINT click_events_path_len CHECK (length(path) BETWEEN 1 AND 300),
  CONSTRAINT click_events_cta_len CHECK (cta_location IS NULL OR length(cta_location) <= 80),
  CONSTRAINT click_events_stage_len CHECK (funnel_stage IS NULL OR length(funnel_stage) <= 40),
  CONSTRAINT click_events_viewport_allowlist CHECK (viewport_bucket IS NULL OR viewport_bucket IN ('mobile','tablet','desktop','unknown')),
  CONSTRAINT click_events_attr_len CHECK (attribution_channel IS NULL OR length(attribution_channel) <= 40),
  CONSTRAINT click_events_utm_source_len CHECK (utm_source IS NULL OR length(utm_source) <= 120),
  CONSTRAINT click_events_utm_medium_len CHECK (utm_medium IS NULL OR length(utm_medium) <= 120),
  CONSTRAINT click_events_utm_campaign_len CHECK (utm_campaign IS NULL OR length(utm_campaign) <= 160),
  CONSTRAINT click_events_gclid_len CHECK (gclid IS NULL OR length(gclid) <= 200),
  CONSTRAINT click_events_session_len CHECK (session_id IS NULL OR length(session_id) <= 64),
  CONSTRAINT click_events_app_version_len CHECK (app_version IS NULL OR length(app_version) <= 40),
  CONSTRAINT click_events_equipamento_len CHECK (equipamento IS NULL OR length(equipamento) <= 80),
  CONSTRAINT click_events_sintoma_len CHECK (sintoma IS NULL OR length(sintoma) <= 120)
);

GRANT INSERT ON public.click_events TO anon, authenticated;
GRANT SELECT ON public.click_events TO authenticated;
GRANT ALL ON public.click_events TO service_role;

ALTER TABLE public.click_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can insert allowlisted click events"
  ON public.click_events FOR INSERT TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can read click events"
  ON public.click_events FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE INDEX click_events_created_at_idx ON public.click_events (created_at DESC);
CREATE INDEX click_events_path_event_idx ON public.click_events (path, event_type, created_at DESC);