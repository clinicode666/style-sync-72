-- Check if garment-images bucket exists, if not create it
INSERT INTO storage.buckets (id, name, public) 
SELECT 'garment-images', 'garment-images', true
WHERE NOT EXISTS (
  SELECT 1 FROM storage.buckets WHERE id = 'garment-images'
);