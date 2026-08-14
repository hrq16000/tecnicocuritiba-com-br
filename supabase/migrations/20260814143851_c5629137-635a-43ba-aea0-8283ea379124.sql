DROP VIEW IF EXISTS public.public_reviews;

GRANT SELECT (id, author_name, author_photo_url, rating, comment, service_slug, city, neighborhood, source, google_review_url, verified, published, review_date, created_at) ON public.reviews TO anon;

CREATE POLICY "Public can read verified published reviews"
ON public.reviews
FOR SELECT
TO anon
USING (verified = true AND published = true);