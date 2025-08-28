import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Wand2, TrendingUp, Zap } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-fashion.jpg";

const HeroSection = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (!user) {
      navigate('/auth');
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-20">
      {/* Background Decorations */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-card to-secondary opacity-30" />
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      
      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Content */}
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full neuro-inset bg-card/50 text-sm text-foreground">
              <Sparkles className="h-4 w-4 text-primary animate-pulse" />
              IA Powered Fashion Assistant
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
              <span className="text-gradient">Seu Estilista</span><br />
              <span className="text-foreground">Pessoal com IA</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed">
              Transforme seu guarda-roupa com nossa IA. Crie looks únicos, 
              combine peças perfeitamente e descubra seu estilo pessoal.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            {!user ? (
              <>
                <Button 
                  variant="luxury" 
                  size="lg" 
                  className="text-lg px-8 py-6"
                  onClick={handleGetStarted}
                >
                  <Sparkles className="h-5 w-5 mr-2" />
                  Começar Agora
                </Button>
                <Button 
                  variant="luxury-outline" 
                  size="lg" 
                  className="text-lg px-8 py-6"
                >
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Ver Demo
                </Button>
              </>
            ) : (
              <>
                <Button 
                  variant="luxury" 
                  size="lg" 
                  className="text-lg px-8 py-6"
                >
                  <Wand2 className="h-5 w-5 mr-2" />
                  Gerar Look
                </Button>
                <Button 
                  variant="luxury-outline" 
                  size="lg" 
                  className="text-lg px-8 py-6"
                >
                  <Zap className="h-5 w-5 mr-2" />
                  Meu Closet
                </Button>
              </>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 pt-8">
            {[
              { number: "50K+", label: "Usuários Ativos" },
              { number: "1M+", label: "Looks Criados" },
              { number: "95%", label: "Satisfação" }
            ].map((stat, index) => (
              <Card key={index} className="neuro border-0 bg-card/30 backdrop-blur-sm">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-gradient">{stat.number}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative">
          <div className="relative neuro rounded-3xl overflow-hidden bg-card p-4">
            <img 
              src={heroImage} 
              alt="Fashion AI Assistant"
              className="w-full h-[600px] object-cover rounded-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl" />
            
            {/* Floating Cards */}
            <div className="absolute top-6 right-6 neuro bg-card/90 backdrop-blur-sm p-3 rounded-xl animate-float">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-foreground">Style Score: 95%</span>
              </div>
            </div>
            
            <div className="absolute bottom-6 left-6 neuro bg-card/90 backdrop-blur-sm p-3 rounded-xl animate-float" style={{ animationDelay: '1s' }}>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-foreground">Trending Look</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;