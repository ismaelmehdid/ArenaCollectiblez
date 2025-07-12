'use client';
import { ThreeDMarquee } from '@/components/ui/3d-marquee';
import HeroSection from './HeroSection';
import { Button } from './ui/button';
import { ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

export function ThreeDMarqueeDemo() {
  const scrollToNextSection = () => {
    const target = document.getElementById('how-it-works');
    if (target) {
      const offsetTop = target.getBoundingClientRect().top + window.pageYOffset;

      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
    }
  };
  const images = [
    '/r_sample-nft-4.png',
    '/r_sample-nft-3.png',
    '/r_sample-nft-4.png',
    '/r_sample-nft-1.png',
    '/r_sample-nft-2.png',
    '/r_sample-nft-4.png',
    '/r_sample-nft-5.png',
    '/r_sample-nft-6.png',
    '/r_sample-nft-1.png',
    '/r_sample-nft-2.png',
    '/r_sample-nft-5.png',
    '/r_sample-nft-5.png',
    '/r_sample-nft-3.png',
    '/r_sample-nft-2.png',
    '/r_sample-nft-5.png',
    '/r_sample-nft-6.png',
    '/r_sample-nft-1.png',
    '/r_sample-nft-1.png',
    '/r_sample-nft-3.png',
    '/r_sample-nft-2.png',
    '/r_sample-nft-4.png',
    '/r_sample-nft-1.png',
    '/r_sample-nft-4.png',
    '/r_sample-nft-1.png',
    '/r_sample-nft-2.png',
    '/r_sample-nft-4.png',
    '/r_sample-nft-5.png',
    '/r_sample-nft-6.png',
    '/r_sample-nft-1.png',
    '/r_sample-nft-2.png',
    '/r_sample-nft-5.png',
    '/r_sample-nft-5.png',
  ];
  return (
    <div className="relative mx-auto my-10 max-w-7xl rounded-3xl bg-gray-950/5 p-2 ring-1 ring-neutral-700/10 dark:bg-neutral-800 mt-20 mb-60">
      <div className="pointer-events-none">
        <ThreeDMarquee images={images} />
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <HeroSection />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="absolute bottom-5"
        >
          <Button
            onClick={scrollToNextSection}
            variant="ghost"
            size="lg"
            className="group bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white px-8 py-6 rounded-full transition-all duration-300 hover:scale-105"
          >
            <span className="text-xl font-medium mr-3">Discover More</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ChevronDown className="w-6 h-6" />
            </motion.div>
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
