ALTER TABLE public.reviews
  ADD COLUMN IF NOT EXISTS publish_consent boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS client_contact text;

GRANT INSERT ON public.reviews TO anon, authenticated;

DROP POLICY IF EXISTS "Public can submit pending reviews" ON public.reviews;
CREATE POLICY "Public can submit pending reviews"
ON public.reviews
FOR INSERT
TO anon, authenticated
WITH CHECK (
  verified = false
  AND published = false
  AND rating >= 1 AND rating <= 5
  AND length(author_name) BETWEEN 2 AND 80
  AND length(comment) BETWEEN 5 AND 2000
  AND (city IS NULL OR length(city) <= 80)
  AND (neighborhood IS NULL OR length(neighborhood) <= 80)
  AND (service_slug IS NULL OR length(service_slug) <= 120)
  AND (client_contact IS NULL OR length(client_contact) <= 120)
  AND source = 'site'
);