-- Create storage bucket for clothing items
INSERT INTO storage.buckets (id, name, public) VALUES ('clothing-items', 'clothing-items', false);

-- Create profiles table for user data
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create clothing_items table
CREATE TABLE public.clothing_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  color TEXT,
  brand TEXT,
  image_url TEXT,
  is_favorite BOOLEAN DEFAULT false,
  times_used INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create looks table for generated outfit combinations
CREATE TABLE public.looks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  occasion TEXT NOT NULL,
  weather TEXT NOT NULL,
  score INTEGER DEFAULT 0,
  description TEXT,
  clothing_item_ids UUID[] NOT NULL,
  is_favorite BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clothing_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.looks ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own profile" 
ON public.profiles 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Create policies for clothing_items
CREATE POLICY "Users can view their own clothing items" 
ON public.clothing_items 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own clothing items" 
ON public.clothing_items 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own clothing items" 
ON public.clothing_items 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own clothing items" 
ON public.clothing_items 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create policies for looks
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

-- Create storage policies for clothing items
CREATE POLICY "Users can view their own clothing images" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'clothing-items' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can upload their own clothing images" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'clothing-items' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can update their own clothing images" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'clothing-items' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own clothing images" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'clothing-items' AND auth.uid()::text = (storage.foldername(name))[1]);

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

CREATE TRIGGER update_clothing_items_updated_at
BEFORE UPDATE ON public.clothing_items
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_looks_updated_at
BEFORE UPDATE ON public.looks
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();