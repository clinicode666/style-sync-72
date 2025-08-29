import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Camera, Plus, Shirt, Sparkles, Star, Heart, Trash2 } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { useGarments } from "@/hooks/useGarments";
import AddGarmentDialog from "./AddGarmentDialog";

const ClosetSection = () => {
  const [selectedCategory, setSelectedCategory] = useState("todos");
  const { garments, loading, updateGarment, deleteGarment } = useGarments();

  const categories = [
    { id: "todos", label: "Todos", icon: Sparkles },
    { id: "camisa", label: "Camisas", icon: Shirt },
    { id: "calca", label: "Calças", icon: Shirt },
    { id: "vestido", label: "Vestidos", icon: Shirt },
    { id: "sapato", label: "Sapatos", icon: Shirt },
  ];

  const filteredGarments = selectedCategory === "todos" 
    ? garments 
    : garments.filter(garment => garment.type === selectedCategory);

  const toggleFavorite = async (garmentId: string, currentFavorite: boolean) => {
    const garment = garments.find(g => g.id === garmentId);
    if (garment) {
      await updateGarment(garmentId, { 
        // Toggle favorite logic would need to be added to the schema
        worn_count: garment.worn_count + (currentFavorite ? -1 : 1)
      });
    }
  };

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="py-20 bg-background relative overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute top-10 right-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 left-10 w-80 h-80 bg-accent/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Meu Closet</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Organize suas peças, acompanhe o uso e descubra novas combinações
          </p>
        </motion.div>

        {/* Add Item Button */}
        <div className="flex justify-center mb-8">
          <AddGarmentDialog />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "luxury" : "luxury-outline"}
                onClick={() => setSelectedCategory(category.id)}
                className="gap-2"
              >
                <Icon className="h-4 w-4" />
                {category.label}
              </Button>
            );
          })}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center py-12">
            <Sparkles className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}

        {/* Items Grid */}
        {!loading && (
          <motion.div 
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredGarments.map((garment) => (
              <Card key={garment.id} className="neuro border-0 bg-card/50 backdrop-blur-sm hover:shadow-neuro-hover transition-all duration-300 group">
                <CardHeader className="p-4 pb-2">
                  <div className="relative aspect-square rounded-xl bg-muted overflow-hidden mb-3">
                    <img 
                      src={garment.image_url} 
                      alt={`${garment.type} ${garment.color_primary}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-2 right-2 flex gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm text-muted-foreground hover:text-foreground"
                        onClick={() => deleteGarment(garment.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="absolute bottom-2 left-2">
                      <Badge variant="secondary" className="text-xs bg-card/80 backdrop-blur-sm">
                        <Star className="h-3 w-3 mr-1" />
                        {garment.worn_count}x
                      </Badge>
                    </div>
                  </div>
                  <CardTitle className="text-sm font-medium text-foreground line-clamp-2">
                    {garment.type.charAt(0).toUpperCase() + garment.type.slice(1)} {garment.color_primary}
                    {garment.subtype && ` - ${garment.subtype}`}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Cor: {garment.color_primary}</span>
                      {garment.material && <span>{garment.material}</span>}
                    </div>
                    <div className="flex gap-1">
                      {garment.formality && (
                        <Badge variant="outline" className="text-xs">
                          Formal: {garment.formality}/10
                        </Badge>
                      )}
                      {garment.warmth && (
                        <Badge variant="outline" className="text-xs">
                          Calor: {garment.warmth}/10
                        </Badge>
                      )}
                    </div>
                    <Button variant="luxury-outline" size="sm" className="w-full">
                      <Plus className="h-3 w-3 mr-1" />
                      Usar no Look
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        )}

        {/* Empty State */}
        {!loading && filteredGarments.length === 0 && (
          <div className="text-center py-12">
            <div className="neuro p-8 rounded-2xl bg-card/30 backdrop-blur-sm max-w-md mx-auto">
              <Shirt className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">
                {selectedCategory === "todos" ? "Nenhuma peça encontrada" : `Nenhuma ${selectedCategory} encontrada`}
              </h3>
              <p className="text-muted-foreground text-sm mb-4">
                {selectedCategory === "todos" 
                  ? "Comece adicionando suas primeiras peças ao closet"
                  : `Adicione algumas ${selectedCategory}s ao seu closet`
                }
              </p>
              <AddGarmentDialog 
                trigger={
                  <Button variant="luxury">
                    <Camera className="h-4 w-4 mr-2" />
                    Adicionar Peça
                  </Button>
                }
              />
            </div>
          </div>
        )}
      </div>
    </motion.section>
  );
};

export default ClosetSection;