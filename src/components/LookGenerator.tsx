import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sparkles, MapPin, Thermometer, Cloud, Star, Heart } from "lucide-react";

const LookGenerator = () => {
  return (
    <section className="py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 via-background to-card/30" />
      <div className="absolute top-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="h-8 w-8 text-primary animate-pulse" />
            <h2 className="text-3xl font-bold text-gradient">Gerador de Looks IA</h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Nossa IA analisa suas peças, o clima e o evento para criar looks perfeitos para você
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Look Generation Form */}
          <Card className="lg:col-span-1 neuro border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Sparkles className="h-5 w-5 text-primary" />
                Configurar Look
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="event">Evento</Label>
                <Input 
                  id="event" 
                  placeholder="Ex: Reunião de trabalho, jantar, casual..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dress-code">Dress Code</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o dress code" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="casual">Casual</SelectItem>
                    <SelectItem value="esporte-fino">Esporte Fino</SelectItem>
                    <SelectItem value="social">Social</SelectItem>
                    <SelectItem value="black-tie">Black Tie</SelectItem>
                    <SelectItem value="academia">Academia</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Localização</Label>
                <div className="flex gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-3" />
                  <Input id="location" placeholder="São Paulo, SP" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Observações</Label>
                <Textarea 
                  id="notes" 
                  placeholder="Preferências especiais, cores favoritas..."
                  className="min-h-[80px]"
                />
              </div>

              <Button variant="luxury" className="w-full gap-2" size="lg">
                <Sparkles className="h-4 w-4" />
                Gerar Looks
              </Button>
            </CardContent>
          </Card>

          {/* Generated Looks */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-xl font-semibold">Sugestões de Looks</h3>
            
            {/* Mock generated looks */}
            {[1, 2, 3].map((lookId) => (
              <Card key={lookId} className="neuro hover:shadow-neuro-hover transition-luxury border-0">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="font-semibold text-lg flex items-center gap-2 text-foreground">
                        Look Executivo
                        <Badge variant="secondary" className="luxury-gradient text-primary-foreground neuro">
                          <Star className="h-3 w-3 mr-1" />
                          95% Match
                        </Badge>
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Perfeito para reuniões importantes
                      </p>
                    </div>
                    <Button variant="neuro" size="icon">
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-4 gap-4 mb-4">
                    {/* Mock clothing items in the look */}
                      {['Camisa Branca', 'Calça Social', 'Sapato Social', 'Gravata'].map((item, index) => (
                        <div key={index} className="text-center">
                          <div className="h-20 neuro-inset bg-gradient-to-br from-secondary to-muted rounded-lg mb-2 flex items-center justify-center">
                            <span className="text-xs text-muted-foreground">{item}</span>
                          </div>
                          <p className="text-xs text-muted-foreground">{item}</p>
                        </div>
                      ))}
                  </div>

                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Thermometer className="h-4 w-4" />
                        <span>22°C</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Cloud className="h-4 w-4" />
                        <span>30% chuva</span>
                      </div>
                    </div>
                    <Badge variant="outline">Formalidade: 4/5</Badge>
                  </div>

                  <p className="text-sm text-muted-foreground mb-4">
                    Combinação clássica e elegante. A camisa branca combina perfeitamente com a calça social azul marinho, criando um visual profissional e confiante.
                  </p>

                  <div className="flex gap-2">
                    <Button variant="luxury" size="sm" className="flex-1">
                      Usar Este Look
                    </Button>
                    <Button variant="luxury-outline" size="sm">
                      Personalizar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LookGenerator;