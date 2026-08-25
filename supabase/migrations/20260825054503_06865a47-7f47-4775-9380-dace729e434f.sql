ALTER TABLE public.funnel_submissions
  ADD COLUMN IF NOT EXISTS cidade text,
  ADD COLUMN IF NOT EXISTS bairro text,
  ADD COLUMN IF NOT EXISTS alert_status text NOT NULL DEFAULT 'pending',
  ADD COLUMN IF NOT EXISTS alert_attempts integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS alert_last_error text,
  ADD COLUMN IF NOT EXISTS alert_sent_at timestamptz;

ALTER TABLE public.funnel_submissions
  DROP CONSTRAINT IF EXISTS funnel_submissions_alert_status_check;
ALTER TABLE public.funnel_submissions
  ADD CONSTRAINT funnel_submissions_alert_status_check
  CHECK (alert_status IN ('pending', 'sent', 'error'));

GRANT ALL ON public.funnel_submissions TO service_role;