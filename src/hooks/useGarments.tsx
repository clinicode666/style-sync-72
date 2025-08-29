import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { toast } from '@/hooks/use-toast';

export interface Garment {
  id: string;
  user_id: string;
  type: string;
  subtype?: string;
  color_primary: string;
  color_secondary?: string;
  pattern?: string;
  material?: string;
  fit?: string;
  formality?: number;
  warmth?: number;
  season?: string[];
  image_url: string;
  worn_count: number;
  last_worn?: string;
  created_at: string;
  updated_at: string;
}

export const useGarments = () => {
  const [garments, setGarments] = useState<Garment[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchGarments = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('garments')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setGarments(data || []);
    } catch (error) {
      console.error('Error fetching garments:', error);
      toast({
        title: "Erro ao carregar roupas",
        description: "Não foi possível carregar suas roupas. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addGarment = async (garmentData: Omit<Garment, 'id' | 'user_id' | 'created_at' | 'updated_at' | 'worn_count'>) => {
    if (!user) return null;

    try {
      const { data, error } = await supabase
        .from('garments')
        .insert({
          ...garmentData,
          user_id: user.id,
          worn_count: 0
        })
        .select()
        .single();

      if (error) throw error;
      
      setGarments(prev => [data, ...prev]);
      toast({
        title: "Roupa adicionada",
        description: "Nova peça foi adicionada ao seu closet com sucesso!",
      });
      
      return data;
    } catch (error) {
      console.error('Error adding garment:', error);
      toast({
        title: "Erro ao adicionar roupa",
        description: "Não foi possível adicionar a peça. Tente novamente.",
        variant: "destructive",
      });
      return null;
    }
  };

  const updateGarment = async (id: string, updates: Partial<Garment>) => {
    if (!user) return null;

    try {
      const { data, error } = await supabase
        .from('garments')
        .update(updates)
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw error;
      
      setGarments(prev => prev.map(garment => 
        garment.id === id ? { ...garment, ...data } : garment
      ));
      
      return data;
    } catch (error) {
      console.error('Error updating garment:', error);
      toast({
        title: "Erro ao atualizar roupa",
        description: "Não foi possível atualizar a peça. Tente novamente.",
        variant: "destructive",
      });
      return null;
    }
  };

  const deleteGarment = async (id: string) => {
    if (!user) return false;

    try {
      const { error } = await supabase
        .from('garments')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;
      
      setGarments(prev => prev.filter(garment => garment.id !== id));
      toast({
        title: "Roupa removida",
        description: "A peça foi removida do seu closet.",
      });
      
      return true;
    } catch (error) {
      console.error('Error deleting garment:', error);
      toast({
        title: "Erro ao remover roupa",
        description: "Não foi possível remover a peça. Tente novamente.",
        variant: "destructive",
      });
      return false;
    }
  };

  const uploadGarmentImage = async (file: File): Promise<string | null> => {
    if (!user) return null;

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('garment-images')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('garment-images')
        .getPublicUrl(fileName);

      return data.publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: "Erro no upload",
        description: "Não foi possível fazer upload da imagem. Tente novamente.",
        variant: "destructive",
      });
      return null;
    }
  };

  useEffect(() => {
    fetchGarments();
  }, [user]);

  return {
    garments,
    loading,
    addGarment,
    updateGarment,
    deleteGarment,
    uploadGarmentImage,
    refetch: fetchGarments
  };
};