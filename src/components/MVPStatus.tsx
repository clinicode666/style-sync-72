import { motion } from "framer-motion";
import { CheckCircle, AlertCircle, Info } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface MVPStatusProps {
  className?: string;
}

const MVPStatus = ({ className }: MVPStatusProps) => {
  const features = [
    {
      name: "Sistema de Autenticação",
      status: "implemented",
      description: "Login e registro de usuários funcionando"
    },
    {
      name: "Upload de Roupas",
      status: "implemented", 
      description: "Usuários podem fotografar e catalogar suas peças"
    },
    {
      name: "Categorização de Roupas",
      status: "implemented",
      description: "Sistema completo de tags e atributos (cor, tipo, formalidade, etc.)"
    },
    {
      name: "Geração de Looks com IA",
      status: "implemented",
      description: "IA analisa ocasião e clima para sugerir combinações"
    },
    {
      name: "Consulta de Moda IA",
      status: "implemented",
      description: "Chat com IA especialista para dicas personalizadas"
    },
    {
      name: "Banco de Dados",
      status: "implemented",
      description: "Supabase configurado com RLS e storage"
    },
    {
      name: "Interface Responsiva",
      status: "implemented",
      description: "Design luxury com tema vinho e animações"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "implemented":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "partial":
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      default:
        return <Info className="h-5 w-5 text-blue-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "implemented":
        return "✅ Implementado";
      case "partial":
        return "🔄 Parcial";
      default:
        return "📋 Planejado";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      <Card className="neuro border-0 bg-card/80 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-gradient mb-2">
              Status do MVP - iDress
            </h3>
            <p className="text-muted-foreground">
              Todas as funcionalidades principais estão implementadas e funcionais
            </p>
          </div>
          
          <div className="space-y-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-start gap-3 p-3 rounded-lg neuro-inset bg-background/30"
              >
                {getStatusIcon(feature.status)}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium text-foreground">{feature.name}</h4>
                    <span className="text-sm text-muted-foreground">
                      {getStatusText(feature.status)}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mt-6 p-4 rounded-lg bg-primary/10 border border-primary/20"
          >
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              <h4 className="font-semibold text-primary">MVP Pronto para Lançamento!</h4>
            </div>
            <p className="text-sm text-foreground">
              O aplicativo está 100% funcional. Os usuários podem:
            </p>
            <ul className="text-sm text-muted-foreground mt-2 space-y-1">
              <li>• Fazer login e criar conta</li>
              <li>• Fotografar e adicionar roupas ao closet</li>
              <li>• Gerar looks automáticos baseados em ocasião e clima</li>
              <li>• Consultar a IA para dicas de moda personalizadas</li>
              <li>• Organizar e gerenciar seu guarda-roupa digital</li>
            </ul>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default MVPStatus;