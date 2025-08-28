import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Camera, Plus, Shirt, Sparkles, Star, Heart } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

const ClosetSection = () => {
  const [selectedCategory, setSelectedCategory] = useState("todos");

  const categories = [
    { id: "todos", label: "Todos", icon: Sparkles },
    { id: "camisas", label: "Camisas", icon: Shirt },
    { id: "calcas", label: "Calças", icon: Shirt },
    { id: "vestidos", label: "Vestidos", icon: Shirt },
    { id: "sapatos", label: "Sapatos", icon: Shirt },
  ];

  const mockItems = [
    {
      id: 1,
      name: "Camisa Branca Clássica",
      category: "camisas",
      color: "Branco",
      brand: "Zara",
      favorite: true,
      timesUsed: 12,
      image: "/placeholder.svg"
    },
    {
      id: 2,
      name: "Jeans Skinny Azul",
      category: "calcas",
      color: "Azul",
      brand: "Levi's",
      favorite: false,
      timesUsed: 8,
      image: "/placeholder.svg"
    },
    {
      id: 3,
      name: "Vestido Preto Elegante",
      category: "vestidos",
      color: "Preto",
      brand: "H&M",
      favorite: true,
      timesUsed: 5,
      image: "/placeholder.svg"
    },
    {
      id: 4,
      name: "Tênis Branco Casual",
      category: "sapatos",
      color: "Branco",
      brand: "Nike",
      favorite: false,
      timesUsed: 15,
      image: "/placeholder.svg"
    },
  ];

  const filteredItems = selectedCategory === "todos" 
    ? mockItems 
    : mockItems.filter(item => item.category === selectedCategory);

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
          <Button variant="luxury" size="lg" className="gap-3">
            <Camera className="h-5 w-5" />
            Adicionar Nova Peça
          </Button>
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

        {/* Items Grid */}
        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {filteredItems.map((item) => (
            <Card key={item.id} className="neuro border-0 bg-card/50 backdrop-blur-sm hover:shadow-neuro-hover transition-all duration-300 group">
              <CardHeader className="p-4 pb-2">
                <div className="relative aspect-square rounded-xl bg-muted overflow-hidden mb-3">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className={`h-8 w-8 rounded-full ${
                        item.favorite 
                          ? 'text-red-500 hover:text-red-600' 
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <Heart className={`h-4 w-4 ${item.favorite ? 'fill-current' : ''}`} />
                    </Button>
                  </div>
                  <div className="absolute bottom-2 left-2">
                    <Badge variant="secondary" className="text-xs bg-card/80 backdrop-blur-sm">
                      <Star className="h-3 w-3 mr-1" />
                      {item.timesUsed}x
                    </Badge>
                  </div>
                </div>
                <CardTitle className="text-sm font-medium text-foreground line-clamp-2">
                  {item.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Cor: {item.color}</span>
                    <span>{item.brand}</span>
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

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <div className="neuro p-8 rounded-2xl bg-card/30 backdrop-blur-sm max-w-md mx-auto">
              <Shirt className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">
                Nenhuma peça encontrada
              </h3>
              <p className="text-muted-foreground text-sm mb-4">
                Comece adicionando suas primeiras peças ao closet
              </p>
              <Button variant="luxury">
                <Camera className="h-4 w-4 mr-2" />
                Adicionar Peça
              </Button>
            </div>
          </div>
        )}
      </div>
    </motion.section>
  );
};

export default ClosetSection;