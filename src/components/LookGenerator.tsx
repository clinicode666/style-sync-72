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
  Star,
  Briefcase,
  Coffee,
  PartyPopper,
  Dumbbell,
  Crown,
  Sun,
  Cloud,
  Snowflake,
  CloudRain
} from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { useLooks } from "@/hooks/useLooks";
import { toast } from "@/hooks/use-toast";

const LookGenerator = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentLook, setCurrentLook] = useState<any>(null);
  const [selectedOccasion, setSelectedOccasion] = useState("");
  const [selectedWeather, setSelectedWeather] = useState("");
  
  const { generateLook, looks, loading } = useLooks();

  const occasions = [
    { id: "trabalho", label: "Trabalho", icon: Briefcase },
    { id: "casual", label: "Casual", icon: Coffee },
    { id: "festa", label: "Festa", icon: PartyPopper },
    { id: "esporte", label: "Esporte", icon: Dumbbell },
    { id: "romântico", label: "Romântico", icon: Heart },
    { id: "formal", label: "Formal", icon: Crown },
  ];

  const weather = [
    { id: "quente", label: "Quente", icon: Sun, temp: "25°C+" },
    { id: "ameno", label: "Ameno", icon: Cloud, temp: "15-25°C" },
    { id: "frio", label: "Frio", icon: Snowflake, temp: "0-15°C" },
    { id: "chuva", label: "Chuva", icon: CloudRain, temp: "Variável" },
  ];

  const handleGenerateLook = async () => {
    if (!selectedOccasion || !selectedWeather) {
      toast({
        title: "Seleção obrigatória",
        description: "Por favor, selecione uma ocasião e o clima.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    try {
      const generatedLook = await generateLook(selectedOccasion, selectedWeather);
      if (generatedLook) {
        // Transform to match the expected format
        const transformedLook = {
          id: generatedLook.id,
          score: generatedLook.rating || 85,
          items: generatedLook.garments.map(garment => ({
            name: `${garment.type} ${garment.color_primary}`,
            category: garment.type,
            image: garment.image_url
          })),
          occasion: selectedOccasion,
          weather: selectedWeather,
          description: generatedLook.notes || `Look perfeito para ${selectedOccasion} em clima ${selectedWeather}.`
        };
        setCurrentLook(transformedLook);
      }
    } catch (error) {
      console.error('Error generating look:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="py-20 bg-gradient-to-br from-background to-secondary/20 relative overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Gerador de Looks</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Deixe nossa IA criar combinações perfeitas para qualquer ocasião
          </p>
        </motion.div>

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
                  {occasions.map((occasion) => {
                    const IconComponent = occasion.icon;
                    return (
                      <Button
                        key={occasion.id}
                        variant={selectedOccasion === occasion.id ? "luxury" : "luxury-outline"}
                        className="h-auto p-4 flex-col gap-2 text-foreground"
                        onClick={() => setSelectedOccasion(occasion.id)}
                      >
                        <IconComponent className="h-6 w-6 text-primary" />
                        <span className="text-sm">{occasion.label}</span>
                      </Button>
                    );
                  })}
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
                  {weather.map((condition) => {
                    const IconComponent = condition.icon;
                    return (
                      <Button
                        key={condition.id}
                        variant={selectedWeather === condition.id ? "luxury" : "luxury-outline"}
                        className="h-auto p-4 flex-col gap-1 text-foreground"
                        onClick={() => setSelectedWeather(condition.id)}
                      >
                        <IconComponent className="h-6 w-6 text-primary" />
                        <span className="text-sm font-medium">{condition.label}</span>
                        <span className="text-xs text-muted-foreground">{condition.temp}</span>
                      </Button>
                    );
                  })}
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
    </motion.section>
  );
};

export default LookGenerator;