'use client';
import { motion } from "framer-motion";

const HeroSection = () => {
  const scrollToNextSection = () => {
    const nextSection = document.getElementById('recently-collected');
    nextSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 relative">
      <div className="container mx-auto text-center max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="space-y-12"
        >
          {/* Main Brand Title */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-8xl md:text-9xl font-black text-white mb-6 tracking-tight"
            style={{
              textShadow: `
                0 0 20px rgba(168, 85, 247, 0.8),
                0 0 40px rgba(168, 85, 247, 0.6),
                0 0 60px rgba(168, 85, 247, 0.4),
                0 0 80px rgba(168, 85, 247, 0.2)
              `
            }}
          >
            ArenaCollectiblez
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-3xl md:text-4xl font-light text-gray-200 mb-16 max-w-4xl mx-auto leading-relaxed"
            style={{
              textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)'
            }}
          >
            Built on Chiliz. Connect via Socios Wallet
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;