'use client';
import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 relative text-center">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="space-y-8 sm:space-y-10 md:space-y-12"
        >
          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-white font-black tracking-tight"
            style={{
              fontSize: 'clamp(2.5rem, 8vw, 8rem)', // от 40px до 128px
              textShadow: `
                0 0 20px rgba(168, 85, 247, 0.8),
                0 0 40px rgba(168, 85, 247, 0.6),
                0 0 60px rgba(168, 85, 247, 0.4),
                0 0 80px rgba(168, 85, 247, 0.2)
              `,
            }}
          >
            ArenaCollectiblez
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="font-light text-gray-200 max-w-4xl mx-auto leading-relaxed"
            style={{
              fontSize: 'clamp(1.25rem, 4vw, 2.25rem)', // от 20px до 36px
              textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
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
