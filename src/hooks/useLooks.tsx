import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { toast } from '@/hooks/use-toast';
import { Garment } from './useGarments';

export interface Look {
  id: string;
  user_id: string;
  name: string;
  occasion?: string;
  dress_code?: string;
  garment_ids: string[];
  rating?: number;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface LookWithGarments extends Look {
  garments: Garment[];
}

export const useLooks = () => {
  const [looks, setLooks] = useState<LookWithGarments[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchLooks = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('looks')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Fetch garments for each look
      const looksWithGarments = await Promise.all(
        (data || []).map(async (look) => {
          const { data: garments, error: garmentsError } = await supabase
            .from('garments')
            .select('*')
            .in('id', look.garment_ids);
          
          if (garmentsError) {
            console.error('Error fetching garments for look:', garmentsError);
            return { ...look, garments: [] };
          }
          
          return { ...look, garments: garments || [] };
        })
      );
      
      setLooks(looksWithGarments);
    } catch (error) {
      console.error('Error fetching looks:', error);
      toast({
        title: "Erro ao carregar looks",
        description: "Não foi possível carregar seus looks. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const generateLook = async (occasion: string, weather: string, selectedGarments?: string[]): Promise<LookWithGarments | null> => {
    if (!user) return null;

    try {
      // Get all user's garments
      const { data: allGarments, error: garmentsError } = await supabase
        .from('garments')
        .select('*')
        .eq('user_id', user.id);

      if (garmentsError) throw garmentsError;
      if (!allGarments || allGarments.length === 0) {
        toast({
          title: "Nenhuma roupa encontrada",
          description: "Adicione algumas peças ao seu closet primeiro.",
          variant: "destructive",
        });
        return null;
      }

      // Simple AI logic for generating looks
      const generateLookItems = (garments: Garment[], occasion: string, weather: string) => {
        const tops = garments.filter(g => ['camisa', 'blusa', 'camiseta', 'sueter'].includes(g.type.toLowerCase()));
        const bottoms = garments.filter(g => ['calca', 'saia', 'short'].includes(g.type.toLowerCase()));
        const shoes = garments.filter(g => ['sapato', 'tenis', 'sandalia', 'bota'].includes(g.type.toLowerCase()));
        const jackets = garments.filter(g => ['jaqueta', 'blazer', 'casaco'].includes(g.type.toLowerCase()));

        let selectedItems: Garment[] = [];

        // Select a top
        if (tops.length > 0) {
          const randomTop = tops[Math.floor(Math.random() * tops.length)];
          selectedItems.push(randomTop);
        }

        // Select a bottom
        if (bottoms.length > 0) {
          const randomBottom = bottoms[Math.floor(Math.random() * bottoms.length)];
          selectedItems.push(randomBottom);
        }

        // Select shoes
        if (shoes.length > 0) {
          let appropriateShoes = shoes;
          
          // Filter by formality based on occasion
          if (occasion.toLowerCase().includes('formal') || occasion.toLowerCase().includes('trabalho')) {
            appropriateShoes = shoes.filter(s => s.formality && s.formality >= 7);
          } else if (occasion.toLowerCase().includes('casual') || occasion.toLowerCase().includes('esporte')) {
            appropriateShoes = shoes.filter(s => !s.formality || s.formality <= 5);
          }

          if (appropriateShoes.length === 0) appropriateShoes = shoes;
          const randomShoe = appropriateShoes[Math.floor(Math.random() * appropriateShoes.length)];
          selectedItems.push(randomShoe);
        }

        // Add jacket for cold weather or formal occasions
        if (jackets.length > 0 && (weather.toLowerCase().includes('frio') || occasion.toLowerCase().includes('formal'))) {
          const randomJacket = jackets[Math.floor(Math.random() * jackets.length)];
          selectedItems.push(randomJacket);
        }

        return selectedItems;
      };

      const lookItems = selectedGarments 
        ? allGarments.filter(g => selectedGarments.includes(g.id))
        : generateLookItems(allGarments, occasion, weather);

      if (lookItems.length === 0) {
        toast({
          title: "Não foi possível gerar look",
          description: "Não encontramos peças adequadas para esta ocasião.",
          variant: "destructive",
        });
        return null;
      }

      // Calculate score based on color coordination and formality
      const calculateScore = (items: Garment[], occasion: string) => {
        let score = 70; // Base score
        
        // Color coordination bonus
        const colors = items.map(item => item.color_primary);
        const uniqueColors = new Set(colors);
        if (uniqueColors.size <= 3) score += 10; // Good color coordination
        
        // Occasion appropriateness
        const avgFormality = items.reduce((sum, item) => sum + (item.formality || 5), 0) / items.length;
        if (occasion.toLowerCase().includes('formal') && avgFormality >= 7) score += 15;
        if (occasion.toLowerCase().includes('casual') && avgFormality <= 5) score += 10;
        
        return Math.min(100, Math.max(60, Math.round(score)));
      };

      const score = calculateScore(lookItems, occasion);
      const lookName = `Look ${occasion} - ${new Date().toLocaleDateString('pt-BR')}`;

      const { data: newLook, error: lookError } = await supabase
        .from('looks')
        .insert({
          user_id: user.id,
          name: lookName,
          occasion,
          dress_code: weather,
          garment_ids: lookItems.map(item => item.id),
          rating: score,
          notes: `Look gerado automaticamente para ${occasion.toLowerCase()} em clima ${weather.toLowerCase()}.`
        })
        .select()
        .single();

      if (lookError) throw lookError;

      const lookWithGarments: LookWithGarments = {
        ...newLook,
        garments: lookItems
      };

      setLooks(prev => [lookWithGarments, ...prev]);
      
      toast({
        title: "Look gerado com sucesso!",
        description: `Seu novo look tem ${score}% de compatibilidade.`,
      });

      return lookWithGarments;
    } catch (error) {
      console.error('Error generating look:', error);
      toast({
        title: "Erro ao gerar look",
        description: "Não foi possível gerar o look. Tente novamente.",
        variant: "destructive",
      });
      return null;
    }
  };

  const deleteLook = async (id: string) => {
    if (!user) return false;

    try {
      const { error } = await supabase
        .from('looks')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;
      
      setLooks(prev => prev.filter(look => look.id !== id));
      toast({
        title: "Look removido",
        description: "O look foi removido com sucesso.",
      });
      
      return true;
    } catch (error) {
      console.error('Error deleting look:', error);
      toast({
        title: "Erro ao remover look",
        description: "Não foi possível remover o look. Tente novamente.",
        variant: "destructive",
      });
      return false;
    }
  };

  const updateLookRating = async (id: string, rating: number) => {
    if (!user) return false;

    try {
      const { error } = await supabase
        .from('looks')
        .update({ rating })
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;
      
      setLooks(prev => prev.map(look => 
        look.id === id ? { ...look, rating } : look
      ));
      
      return true;
    } catch (error) {
      console.error('Error updating look rating:', error);
      return false;
    }
  };

  useEffect(() => {
    fetchLooks();
  }, [user]);

  return {
    looks,
    loading,
    generateLook,
    deleteLook,
    updateLookRating,
    refetch: fetchLooks
  };
};