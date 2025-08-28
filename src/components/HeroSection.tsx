import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Camera, Brain, Palette } from "lucide-react";
import heroImage from "@/assets/hero-fashion.jpg";

const HeroSection = () => {
  return (
    <section className="relative py-20 bg-fashion-gradient-subtle overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge variant="secondary" className="bg-fashion-gradient text-white">
                <Sparkles className="h-3 w-3 mr-1" />
                Powered by AI
              </Badge>
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Seu{" "}
                <span className="bg-fashion-gradient bg-clip-text text-transparent">
                  closet inteligente
                </span>{" "}
                com IA
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Fotografe suas peças, organize seu guarda-roupa e receba sugestões de looks personalizadas com base no clima, evento e seu estilo único.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="fashion" size="lg" className="gap-2">
                <Camera className="h-5 w-5" />
                Começar Agora
              </Button>
              <Button variant="fashion-outline" size="lg" className="gap-2">
                <Sparkles className="h-5 w-5" />
                Ver Como Funciona
              </Button>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8">
              <Card className="border-none shadow-none bg-white/50">
                <CardContent className="p-4 text-center">
                  <Camera className="h-8 w-8 text-primary mx-auto mb-2" />
                  <h3 className="font-semibold">Classificação IA</h3>
                  <p className="text-sm text-muted-foreground">
                    Análise automática de cor, tipo e estilo
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-none shadow-none bg-white/50">
                <CardContent className="p-4 text-center">
                  <Brain className="h-8 w-8 text-primary mx-auto mb-2" />
                  <h3 className="font-semibold">Looks Inteligentes</h3>
                  <p className="text-sm text-muted-foreground">
                    Sugestões baseadas em clima e evento
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-none shadow-none bg-white/50">
                <CardContent className="p-4 text-center">
                  <Palette className="h-8 w-8 text-primary mx-auto mb-2" />
                  <h3 className="font-semibold">Estilo Pessoal</h3>
                  <p className="text-sm text-muted-foreground">
                    Aprende suas preferências com o tempo
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl shadow-fashion-lg">
              <img 
                src={heroImage} 
                alt="Closet organizado com roupas elegantes"
                className="w-full h-[600px] object-cover"
              />
              <div className="absolute inset-0 bg-fashion-gradient opacity-20"></div>
              
              {/* Floating cards with app features */}
              <Card className="absolute top-6 left-6 bg-white/90 backdrop-blur-md shadow-fashion">
                <CardContent className="p-3">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium">127 peças catalogadas</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-md shadow-fashion">
                <CardContent className="p-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">Look gerado em 3s</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;