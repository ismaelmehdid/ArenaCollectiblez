'use client';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { MintNFTButton } from '@/app/page';

const HeroSection = () => {
  const router = useRouter();

  return (
    <section className="min-h-screen flex items-center justify-center px-4 relative">
      <div className="container mx-auto text-center max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-7xl md:text-9xl font-bold text-white mb-8 leading-tight tracking-tight"
          >
            Turn Every Ticket
            <br />
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Into Treasure
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-2xl md:text-3xl text-gray-300 mb-16 font-light max-w-4xl mx-auto leading-relaxed"
          >
            The first platform that transforms your stadium tickets into
            exclusive NFT collectibles. Scan, collect, and own piece of sports
            history.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <Button
              onClick={() => router.push('/scan')}
              size="lg"
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 px-16 py-6 text-2xl font-semibold rounded-full shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105"
            >
              <Sparkles className="w-8 h-8 mr-4" />
              Try It Now
            </Button>
            <MintNFTButton />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
