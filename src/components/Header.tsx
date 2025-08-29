import { Button } from "@/components/ui/button";
import { Sparkles, Camera, LogOut, User, Settings } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import idressLogo from "@/assets/idress-logo.png";

const Header = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleAuthAction = () => {
    if (user) {
      signOut();
    } else {
      navigate('/auth');
    }
  };

  return (
    <header className="border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-50 neuro">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="neuro p-2 rounded-xl bg-card">
            <img 
              src={idressLogo} 
              alt="iDress Logo" 
              className="h-6 w-auto"
            />
          </div>
          <h1 className="text-2xl font-bold text-gradient">
            iDress
          </h1>
        </div>
        
        {user && (
          <nav className="hidden md:flex items-center gap-6">
            <Button variant="ghost" className="font-medium text-foreground hover:text-primary">
              Meu Closet
            </Button>
            <Button variant="ghost" className="font-medium text-foreground hover:text-primary">
              Gerar Look
            </Button>
            <Button variant="ghost" className="font-medium text-foreground hover:text-primary">
              Histórico
            </Button>
          </nav>
        )}

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Button variant="luxury" size="sm">
                <Sparkles className="h-4 w-4" />
                Gerar Look
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full neuro">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {user.email?.charAt(0).toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 neuro border-0 bg-card" align="end" forceMount>
                  <div className="flex flex-col space-y-1 p-2">
                    <p className="text-sm font-medium leading-none text-foreground">{user.email}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      Membro desde {new Date(user.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <DropdownMenuSeparator className="bg-border" />
                  <DropdownMenuItem className="text-foreground hover:bg-accent hover:text-accent-foreground cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    <span>Perfil</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-foreground hover:bg-accent hover:text-accent-foreground cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Configurações</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-border" />
                  <DropdownMenuItem 
                    className="text-foreground hover:bg-accent hover:text-accent-foreground cursor-pointer"
                    onClick={signOut}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sair</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Button variant="luxury" onClick={handleAuthAction}>
              Entrar
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;