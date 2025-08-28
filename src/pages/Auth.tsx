import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/useAuth';
import { LogIn, UserPlus, Mail, Lock, User, ArrowLeft, Sparkles } from 'lucide-react';
import idressLogo from '@/assets/idress-logo.png';

const Auth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [signupForm, setSignupForm] = useState({ email: '', password: '', displayName: '', confirmPassword: '' });
  const { signIn, signUp, user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && !loading) {
      navigate('/');
    }
  }, [user, loading, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginForm.email || !loginForm.password) return;
    
    setIsLoading(true);
    const { error } = await signIn(loginForm.email, loginForm.password);
    if (!error) {
      navigate('/');
    }
    setIsLoading(false);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signupForm.email || !signupForm.password || !signupForm.displayName) return;
    
    if (signupForm.password !== signupForm.confirmPassword) {
      return;
    }
    
    setIsLoading(true);
    const { error } = await signUp(signupForm.email, signupForm.password, signupForm.displayName);
    if (!error) {
      setSignupForm({ email: '', password: '', displayName: '', confirmPassword: '' });
    }
    setIsLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="neuro p-8 rounded-2xl">
          <Sparkles className="h-8 w-8 animate-spin text-primary mx-auto" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-card to-secondary opacity-50" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      
      <div className="relative z-10 container mx-auto px-4 py-8 min-h-screen flex items-center justify-center">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2 mb-6 group">
              <ArrowLeft className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              <span className="text-muted-foreground group-hover:text-primary transition-colors">Voltar</span>
            </Link>
            
            <div className="flex items-center justify-center mb-4">
              <div className="neuro p-4 rounded-2xl bg-card">
                <img 
                  src={idressLogo} 
                  alt="iDress Logo" 
                  className="h-12 w-auto gold-glow"
                />
              </div>
            </div>
            
            <h1 className="text-3xl font-bold text-gradient mb-2">
              Bem-vindo ao iDress
            </h1>
            <p className="text-muted-foreground">
              Sua IA pessoal de moda e estilo
            </p>
          </div>

          {/* Auth Card */}
          <Card className="neuro border-0 shadow-none bg-card/50 backdrop-blur-sm">
            <CardHeader className="space-y-1 pb-4">
              <CardTitle className="text-2xl text-center text-foreground">
                Acesse sua conta
              </CardTitle>
              <CardDescription className="text-center text-muted-foreground">
                Entre ou crie uma nova conta para continuar
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2 neuro-inset">
                  <TabsTrigger value="login" className="data-[state=active]:neuro data-[state=active]:shadow-neuro">
                    <LogIn className="h-4 w-4 mr-2" />
                    Entrar
                  </TabsTrigger>
                  <TabsTrigger value="signup" className="data-[state=active]:neuro data-[state=active]:shadow-neuro">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Cadastrar
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="login" className="space-y-4 mt-6">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="login-email" className="text-foreground">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="login-email"
                          type="email"
                          placeholder="seu@email.com"
                          value={loginForm.email}
                          onChange={(e) => setLoginForm(prev => ({ ...prev, email: e.target.value }))}
                          className="pl-10 neuro-inset border-0 bg-background/50"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="login-password" className="text-foreground">Senha</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="login-password"
                          type="password"
                          placeholder="Sua senha"
                          value={loginForm.password}
                          onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                          className="pl-10 neuro-inset border-0 bg-background/50"
                          required
                        />
                      </div>
                    </div>

                    <Button
                      type="submit"
                      variant="luxury"
                      className="w-full"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <Sparkles className="h-4 w-4 animate-spin mr-2" />
                      ) : (
                        <LogIn className="h-4 w-4 mr-2" />
                      )}
                      {isLoading ? 'Entrando...' : 'Entrar'}
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="signup" className="space-y-4 mt-6">
                  <form onSubmit={handleSignup} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="signup-name" className="text-foreground">Nome</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="signup-name"
                          type="text"
                          placeholder="Seu nome"
                          value={signupForm.displayName}
                          onChange={(e) => setSignupForm(prev => ({ ...prev, displayName: e.target.value }))}
                          className="pl-10 neuro-inset border-0 bg-background/50"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signup-email" className="text-foreground">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="signup-email"
                          type="email"
                          placeholder="seu@email.com"
                          value={signupForm.email}
                          onChange={(e) => setSignupForm(prev => ({ ...prev, email: e.target.value }))}
                          className="pl-10 neuro-inset border-0 bg-background/50"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="signup-password" className="text-foreground">Senha</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="signup-password"
                          type="password"
                          placeholder="Sua senha"
                          value={signupForm.password}
                          onChange={(e) => setSignupForm(prev => ({ ...prev, password: e.target.value }))}
                          className="pl-10 neuro-inset border-0 bg-background/50"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signup-confirm" className="text-foreground">Confirmar Senha</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="signup-confirm"
                          type="password"
                          placeholder="Confirme sua senha"
                          value={signupForm.confirmPassword}
                          onChange={(e) => setSignupForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                          className="pl-10 neuro-inset border-0 bg-background/50"
                          required
                        />
                      </div>
                    </div>

                    <Button
                      type="submit"
                      variant="luxury"
                      className="w-full"
                      disabled={isLoading || signupForm.password !== signupForm.confirmPassword}
                    >
                      {isLoading ? (
                        <Sparkles className="h-4 w-4 animate-spin mr-2" />
                      ) : (
                        <UserPlus className="h-4 w-4 mr-2" />
                      )}
                      {isLoading ? 'Cadastrando...' : 'Criar Conta'}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <p className="text-center text-xs text-muted-foreground mt-6">
            Ao continuar, você concorda com nossos termos de uso e política de privacidade.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;