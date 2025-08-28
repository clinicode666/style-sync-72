import { Button } from "@/components/ui/button";
import { Sparkles, Camera, Shirt } from "lucide-react";

const Header = () => {
  return (
    <header className="border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-fashion-gradient p-2 rounded-xl">
            <Shirt className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold bg-fashion-gradient bg-clip-text text-transparent">
            idress
          </h1>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          <Button variant="ghost" className="font-medium">
            Meu Closet
          </Button>
          <Button variant="ghost" className="font-medium">
            Gerar Look
          </Button>
          <Button variant="ghost" className="font-medium">
            Histórico
          </Button>
        </nav>

        <div className="flex items-center gap-3">
          <Button variant="fashion-outline" size="sm">
            <Camera className="h-4 w-4" />
            Adicionar Peça
          </Button>
          <Button variant="fashion" size="sm">
            <Sparkles className="h-4 w-4" />
            Gerar Look
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;