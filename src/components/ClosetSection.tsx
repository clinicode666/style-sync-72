import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Shirt, Palette, Tag } from "lucide-react";

const ClosetSection = () => {
  // Mock data for demonstration
  const mockItems = [
    {
      id: 1,
      type: "top",
      subtype: "camisa",
      color_primary: "#ffffff",
      formality: 4,
      pattern: "liso"
    },
    {
      id: 2,
      type: "bottom", 
      subtype: "calça",
      color_primary: "#1a365d",
      formality: 4,
      pattern: "liso"
    },
    {
      id: 3,
      type: "shoes",
      subtype: "sapato",
      color_primary: "#000000", 
      formality: 5,
      pattern: "liso"
    }
  ];

  return (
    <section className="py-12 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-card/30 to-secondary/20" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gradient">Meu Closet</h2>
            <p className="text-muted-foreground mt-2">
              Gerencie suas peças e organize seu guarda-roupa
            </p>
          </div>
          <Button variant="luxury" className="gap-2">
            <Plus className="h-4 w-4" />
            Adicionar Peça
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Add new item card */}
          <Card className="neuro-inset border-dashed border-2 border-border hover:border-primary transition-luxury cursor-pointer group">
            <CardContent className="flex flex-col items-center justify-center h-64 p-6">
              <div className="neuro p-4 rounded-full group-hover:shadow-gold-glow transition-luxury">
                <Plus className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold mt-4 text-center text-foreground">Adicionar Nova Peça</h3>
              <p className="text-sm text-muted-foreground text-center">
                Fotografe uma peça para adicionar ao seu closet
              </p>
            </CardContent>
          </Card>

          {/* Mock closet items */}
          {mockItems.map((item) => (
            <Card key={item.id} className="neuro overflow-hidden hover:shadow-neuro-hover transition-luxury cursor-pointer group">
              <CardContent className="p-0">
                <div className="h-48 bg-gradient-to-br from-secondary to-muted flex items-center justify-center">
                  <Shirt className="h-16 w-16 text-muted-foreground" />
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div 
                      className="w-4 h-4 rounded-full border border-border neuro-inset"
                      style={{ backgroundColor: item.color_primary }}
                    />
                    <Badge variant="secondary" className="text-xs neuro">
                      {item.subtype}
                    </Badge>
                  </div>
                  <h3 className="font-semibold capitalize text-foreground">{item.type}</h3>
                  <div className="flex items-center gap-1 mt-2">
                    <Tag className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">
                      Formalidade: {item.formality}/5
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClosetSection;