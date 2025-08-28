-- Create profiles table for additional user information
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create garments table for clothing items
CREATE TABLE public.garments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  type TEXT NOT NULL, -- top|bottom|dress|outerwear|shoes|accessory
  subtype TEXT,
  color_primary TEXT NOT NULL,
  color_secondary TEXT,
  pattern TEXT, -- liso|xadrez|listrado|floral|animal|geométrico|outro
  material TEXT,
  fit TEXT, -- slim|regular|oversized
  warmth INTEGER CHECK (warmth >= 1 AND warmth <= 5),
  formality INTEGER CHECK (formality >= 1 AND formality <= 5),
  season TEXT[], -- verão,inverno,meia-estação,chuva
  worn_count INTEGER DEFAULT 0,
  last_worn TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create looks table for saved outfits
CREATE TABLE public.looks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  garment_ids UUID[] NOT NULL,
  occasion TEXT,
  dress_code TEXT,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.garments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.looks ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view all profiles" 
ON public.profiles 
FOR SELECT 
USING (true);

CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" 
ON public.profiles 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for garments
CREATE POLICY "Users can view their own garments" 
ON public.garments 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own garments" 
ON public.garments 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own garments" 
ON public.garments 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own garments" 
ON public.garments 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create RLS policies for looks
CREATE POLICY "Users can view their own looks" 
ON public.looks 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own looks" 
ON public.looks 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own looks" 
ON public.looks 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own looks" 
ON public.looks 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_garments_updated_at
  BEFORE UPDATE ON public.garments
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_looks_updated_at
  BEFORE UPDATE ON public.looks
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage buckets for images
INSERT INTO storage.buckets (id, name, public) VALUES ('garment-images', 'garment-images', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('avatars', 'avatars', true);

-- Create storage policies for garment images
CREATE POLICY "Garment images are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'garment-images');

CREATE POLICY "Users can upload their own garment images" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'garment-images' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can update their own garment images" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'garment-images' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own garment images" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'garment-images' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Create storage policies for avatars
CREATE POLICY "Avatar images are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'avatars');

CREATE POLICY "Users can upload their own avatar" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can update their own avatar" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own avatar" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);