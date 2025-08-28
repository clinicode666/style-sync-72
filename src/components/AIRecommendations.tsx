import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  MessageCircle, 
  Send, 
  Sparkles, 
  Bot,
  User,
  Lightbulb,
  Palette,
  TrendingUp
} from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

const AIRecommendations = () => {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [conversation, setConversation] = useState([
    {
      type: "bot",
      message: "Olá! Sou sua consultora de moda pessoal com IA. Como posso ajudar você hoje? Posso dar dicas de estilo, sugerir combinações, falar sobre tendências ou qualquer coisa relacionada à moda!",
      timestamp: new Date()
    }
  ]);

  const quickSuggestions = [
    { id: 1, text: "Como combinar cores?", icon: Palette },
    { id: 2, text: "Tendências do inverno", icon: TrendingUp },
    { id: 3, text: "Look para primeira impressão", icon: Lightbulb },
    { id: 4, text: "Peças básicas essenciais", icon: Sparkles },
  ];

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = {
      type: "user" as const,
      message: message.trim(),
      timestamp: new Date()
    };

    setConversation(prev => [...prev, userMessage]);
    setMessage("");
    setIsLoading(true);

    // Simular resposta da IA
    setTimeout(() => {
      const aiResponse = {
        type: "bot" as const,
        message: generateAIResponse(userMessage.message),
        timestamp: new Date()
      };
      
      setConversation(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const generateAIResponse = (userMsg: string) => {
    const responses = [
      "Que pergunta interessante! Para combinar cores, uma dica valiosa é usar a regra dos 60-30-10: 60% de uma cor neutra, 30% de uma cor secundária e 10% de uma cor de destaque. Isso cria harmonia visual perfeita!",
      "Adorei sua pergunta! As tendências atuais incluem tons terrosos, tecidos sustentáveis e peças oversized que trazem conforto sem perder o estilo. O importante é adaptar as tendências ao seu estilo pessoal.",
      "Excelente escolha de tópico! Para causar uma boa primeira impressão, aposte em peças bem ajustadas, cores que valorizem seu tom de pele e acessórios que demonstrem personalidade. A confiança é o melhor acessório!",
      "Ótima pergunta! Um guarda-roupa capsule deve incluir: blazer clássico, calça preta, camisa branca, vestido básico, jeans de qualidade, casaco neutro e sapatos versáteis. Essas peças criam infinitas combinações!"
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleQuickSuggestion = (suggestion: string) => {
    setMessage(suggestion);
  };

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="py-20 bg-gradient-to-br from-background via-card/50 to-secondary/20 relative overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute top-1/3 right-10 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/3 left-10 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }} />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Consultoria de Moda IA</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Converse com nossa IA especialista em moda para dicas personalizadas e recomendações exclusivas
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Quick Suggestions */}
          <motion.div 
            initial={{ x: -30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <Card className="neuro border-0 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <Lightbulb className="h-5 w-5 text-primary" />
                  Sugestões Rápidas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {quickSuggestions.map((suggestion) => {
                  const Icon = suggestion.icon;
                  return (
                    <Button
                      key={suggestion.id}
                      variant="luxury-outline"
                      className="w-full justify-start gap-3 h-auto p-4"
                      onClick={() => handleQuickSuggestion(suggestion.text)}
                    >
                      <Icon className="h-4 w-4 text-primary" />
                      <span className="text-foreground">{suggestion.text}</span>
                    </Button>
                  );
                })}
              </CardContent>
            </Card>
          </motion.div>

          {/* Chat Interface */}
          <motion.div 
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="lg:col-span-2"
          >
            <Card className="neuro border-0 bg-card/50 backdrop-blur-sm h-[600px] flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <MessageCircle className="h-5 w-5 text-primary" />
                  Chat com IA Especialista
                  <Badge variant="secondary" className="ml-auto bg-primary/20 text-primary border-primary/30">
                    Online
                  </Badge>
                </CardTitle>
              </CardHeader>
              
              {/* Chat Messages */}
              <CardContent className="flex-1 flex flex-col gap-4 overflow-hidden">
                <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                  {conversation.map((msg, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`flex gap-3 ${msg.type === 'user' ? 'flex-row-reverse' : ''}`}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center neuro-inset ${
                        msg.type === 'bot' ? 'bg-primary/20' : 'bg-accent/20'
                      }`}>
                        {msg.type === 'bot' ? (
                          <Bot className="h-4 w-4 text-primary" />
                        ) : (
                          <User className="h-4 w-4 text-accent" />
                        )}
                      </div>
                      
                      <div className={`flex-1 max-w-[80%] ${msg.type === 'user' ? 'text-right' : ''}`}>
                        <div className={`neuro p-4 rounded-2xl ${
                          msg.type === 'bot' 
                            ? 'bg-background/80 text-foreground' 
                            : 'bg-primary/10 text-foreground border border-primary/20'
                        }`}>
                          <p className="text-sm leading-relaxed">{msg.message}</p>
                        </div>
                        <span className="text-xs text-muted-foreground mt-1 block">
                          {msg.timestamp.toLocaleTimeString('pt-BR', { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                  
                  {isLoading && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex gap-3"
                    >
                      <div className="w-8 h-8 rounded-full flex items-center justify-center neuro-inset bg-primary/20">
                        <Bot className="h-4 w-4 text-primary" />
                      </div>
                      <div className="neuro p-4 rounded-2xl bg-background/80">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>

                <Separator className="bg-border/50" />

                {/* Message Input */}
                <div className="flex gap-3">
                  <Textarea
                    placeholder="Digite sua pergunta sobre moda..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="flex-1 min-h-[60px] neuro border-0 bg-background/50 text-foreground placeholder:text-muted-foreground resize-none"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                  />
                  <Button
                    variant="luxury"
                    size="lg"
                    onClick={handleSendMessage}
                    disabled={!message.trim() || isLoading}
                    className="px-6"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default AIRecommendations;