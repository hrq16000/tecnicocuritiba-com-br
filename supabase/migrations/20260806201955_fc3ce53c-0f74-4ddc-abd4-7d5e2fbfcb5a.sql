ALTER TABLE public.reviews
  ADD COLUMN IF NOT EXISTS moderation_action text,
  ADD COLUMN IF NOT EXISTS moderation_reason text,
  ADD COLUMN IF NOT EXISTS moderated_at timestamptz,
  ADD COLUMN IF NOT EXISTS moderated_by uuid REFERENCES auth.users(id),
  ADD COLUMN IF NOT EXISTS published_notified_at timestamptz;