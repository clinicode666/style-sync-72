import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ClosetSection from "@/components/ClosetSection";
import LookGenerator from "@/components/LookGenerator";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <ClosetSection />
        <LookGenerator />
      </main>
    </div>
  );
};

export default Index;
