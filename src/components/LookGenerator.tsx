import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Wand2, 
  Sparkles, 
  RefreshCw, 
  Heart, 
  Share, 
  Calendar,
  Thermometer,
  Star
} from "lucide-react";
import { useState } from "react";

const LookGenerator = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentLook, setCurrentLook] = useState(null);

  const occasions = [
    { id: "trabalho", label: "Trabalho", icon: "💼" },
    { id: "casual", label: "Casual", icon: "👕" },
    { id: "festa", label: "Festa", icon: "🎉" },
    { id: "esporte", label: "Esporte", icon: "🏃" },
    { id: "romântico", label: "Romântico", icon: "💕" },
    { id: "formal", label: "Formal", icon: "🤵" },
  ];

  const weather = [
    { id: "quente", label: "Quente", icon: "☀️", temp: "25°C+" },
    { id: "ameno", label: "Ameno", icon: "⛅", temp: "15-25°C" },
    { id: "frio", label: "Frio", icon: "❄️", temp: "0-15°C" },
    { id: "chuva", label: "Chuva", icon: "🌧️", temp: "Variável" },
  ];

  const mockLook = {
    id: 1,
    score: 92,
    items: [
      { name: "Camisa Branca Clássica", category: "Top", image: "/placeholder.svg" },
      { name: "Blazer Azul Marinho", category: "Sobretudo", image: "/placeholder.svg" },
      { name: "Calça Social Preta", category: "Bottom", image: "/placeholder.svg" },
      { name: "Sapato Social Preto", category: "Calçado", image: "/placeholder.svg" },
      { name: "Relógio Clássico", category: "Acessório", image: "/placeholder.svg" },
    ],
    occasion: "Trabalho",
    weather: "Ameno",
    description: "Look elegante e profissional perfeito para reuniões importantes. A combinação clássica de cores neutras transmite confiança e sofisticação."
  };

  const handleGenerateLook = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setCurrentLook(mockLook);
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-background to-secondary/20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Gerador de Looks</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Deixe nossa IA criar combinações perfeitas para qualquer ocasião
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Controls */}
          <div className="space-y-8">
            {/* Occasion Selection */}
            <Card className="neuro border-0 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <Calendar className="h-5 w-5 text-primary" />
                  Ocasião
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {occasions.map((occasion) => (
                    <Button
                      key={occasion.id}
                      variant="luxury-outline"
                      className="h-auto p-4 flex-col gap-2"
                    >
                      <span className="text-2xl">{occasion.icon}</span>
                      <span className="text-sm">{occasion.label}</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Weather Selection */}
            <Card className="neuro border-0 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <Thermometer className="h-5 w-5 text-primary" />
                  Clima
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {weather.map((condition) => (
                    <Button
                      key={condition.id}
                      variant="luxury-outline"
                      className="h-auto p-4 flex-col gap-1"
                    >
                      <span className="text-2xl">{condition.icon}</span>
                      <span className="text-sm font-medium">{condition.label}</span>
                      <span className="text-xs text-muted-foreground">{condition.temp}</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Generate Button */}
            <div className="text-center">
              <Button 
                variant="luxury" 
                size="lg" 
                className="px-12 py-6 text-lg"
                onClick={handleGenerateLook}
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <Sparkles className="h-6 w-6 mr-3 animate-spin" />
                    Criando Look Mágico...
                  </>
                ) : (
                  <>
                    <Wand2 className="h-6 w-6 mr-3" />
                    Gerar Look com IA
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Generated Look */}
          <div className="space-y-6">
            {isGenerating ? (
              <Card className="neuro border-0 bg-card/50 backdrop-blur-sm">
                <CardContent className="p-12 text-center">
                  <div className="space-y-4">
                    <Sparkles className="h-12 w-12 text-primary mx-auto animate-spin" />
                    <h3 className="text-xl font-semibold text-foreground">
                      Criando seu look perfeito...
                    </h3>
                    <p className="text-muted-foreground">
                      Nossa IA está analisando suas peças e criando a combinação ideal
                    </p>
                  </div>
                </CardContent>
              </Card>
            ) : currentLook ? (
              <Card className="neuro border-0 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2 text-foreground">
                      <Star className="h-5 w-5 text-primary" />
                      Look Gerado
                    </CardTitle>
                    <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30">
                      Score: {currentLook.score}%
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Look Items */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {currentLook.items.map((item, index) => (
                      <div key={index} className="text-center">
                        <div className="neuro-inset rounded-xl p-3 mb-2 bg-background/50">
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-full aspect-square object-cover rounded-lg"
                          />
                        </div>
                        <p className="text-xs font-medium text-foreground">{item.name}</p>
                        <p className="text-xs text-muted-foreground">{item.category}</p>
                      </div>
                    ))}
                  </div>

                  <Separator className="bg-border" />

                  {/* Look Info */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-primary" />
                        <span className="text-foreground">{currentLook.occasion}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Thermometer className="h-4 w-4 text-primary" />
                        <span className="text-foreground">{currentLook.weather}</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {currentLook.description}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button variant="luxury" size="sm" className="flex-1">
                      <Heart className="h-4 w-4 mr-2" />
                      Salvar
                    </Button>
                    <Button variant="luxury-outline" size="sm" className="flex-1">
                      <Share className="h-4 w-4 mr-2" />
                      Compartilhar
                    </Button>
                    <Button variant="luxury-outline" size="sm">
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="neuro border-0 bg-card/50 backdrop-blur-sm">
                <CardContent className="p-12 text-center">
                  <div className="space-y-4">
                    <Wand2 className="h-12 w-12 text-muted-foreground mx-auto" />
                    <h3 className="text-xl font-semibold text-foreground">
                      Pronto para criar?
                    </h3>
                    <p className="text-muted-foreground">
                      Selecione a ocasião e clima, depois clique em "Gerar Look" para começar
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LookGenerator;