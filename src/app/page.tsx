'use client';
import HeroSection from '@/components/HeroSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import PartnershipSection from '@/components/ParthershipSection';
import RecentNFTsSection from '@/components/RecentNFTsSection';
import { BackgroundParticles } from '@/components/ui/BackgroundParticles';

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      <BackgroundParticles />

      <div className="relative z-10">
        <HeroSection />
        <RecentNFTsSection />
        <HowItWorksSection />
        <PartnershipSection />
      </div>
    </div>
  );
};

export default Landing;
