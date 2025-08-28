import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ClosetSection from "@/components/ClosetSection";
import LookGenerator from "@/components/LookGenerator";
import { Sparkles } from "lucide-react";

const Index = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

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
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        {user ? (
          <>
            <ClosetSection />
            <LookGenerator />
          </>
        ) : null}
      </main>
    </div>
  );
};

export default Index;
