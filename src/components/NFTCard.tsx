'use client';
import { motion } from 'framer-motion';
import { Crown, Sparkles, Star, Zap } from 'lucide-react';
import { Card } from '@/components/ui/card';

const rarityConfig = {
  Common: {
    gradient: 'from-gray-400 to-gray-600',
    icon: Star,
    particles: 8,
    glow: 'shadow-gray-500/20',
  },
  Rare: {
    gradient: 'from-blue-400 to-blue-600',
    icon: Sparkles,
    particles: 12,
    glow: 'shadow-blue-500/30',
  },
  Epic: {
    gradient: 'from-purple-400 to-purple-600',
    icon: Zap,
    particles: 16,
    glow: 'shadow-purple-500/40',
  },
  Legendary: {
    gradient: 'from-yellow-400 to-yellow-600',
    icon: Crown,
    particles: 20,
    glow: 'shadow-yellow-500/50',
  },
};

const NFTCard = ({ card }) => {
  if (!card) return null;

  const config = rarityConfig[card.rarity];
  const IconComponent = config.icon;

  return (
    <motion.div
      initial={{ scale: 0, rotateY: 180 }}
      animate={{ scale: 1, rotateY: 0 }}
      transition={{ type: 'spring', duration: 0.8 }}
      className="relative"
    >
      {/* Card glow effect */}
      <motion.div
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{ duration: 2, repeat: Infinity }}
        className={`absolute inset-0 bg-gradient-to-r ${config.gradient} rounded-2xl blur-xl ${config.glow}`}
      />

      <Card className="relative z-10 w-80 h-96 bg-black/40 backdrop-blur-xl border-2 border-white/20 overflow-hidden">
        {/* Card header */}
        <div
          className={`h-16 bg-gradient-to-r ${config.gradient} flex items-center justify-center relative`}
        >
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          >
            <IconComponent className="w-6 h-6 text-white mr-2" />
          </motion.div>
          <span className="text-white font-bold text-lg">{card.rarity}</span>

          {/* Header particles */}
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              animate={{
                x: [0, (Math.random() - 0.5) * 60],
                y: [0, (Math.random() - 0.5) * 30],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            />
          ))}
        </div>

        {/* Card image */}
        <div className="relative h-48 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center"
          >
            <span className="text-white font-bold text-2xl">
              {card.name
                .split(' ')
                .map((word) => word[0])
                .join('')}
            </span>
          </motion.div>

          {/* Floating particles around image */}
          {Array.from({ length: config.particles }).map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-1 h-1 bg-gradient-to-r ${config.gradient} rounded-full`}
              animate={{
                x: [0, Math.cos(i * 0.5) * 60],
                y: [0, Math.sin(i * 0.5) * 60],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.1,
              }}
              style={{
                left: '50%',
                top: '50%',
              }}
            />
          ))}
        </div>

        {/* Card info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="p-6 text-center"
        >
          <h3 className="text-xl font-bold text-white mb-2">{card.name}</h3>
          <div className="flex justify-center items-center space-x-1">
            {Array.from({
              length:
                card.rarity === 'Legendary'
                  ? 5
                  : card.rarity === 'Epic'
                    ? 4
                    : card.rarity === 'Rare'
                      ? 3
                      : 2,
            }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + i * 0.1 }}
              >
                <Star
                  className={`w-4 h-4 fill-current text-gradient-to-r ${config.gradient}`}
                />
              </motion.div>
            ))}
          </div>
          <p className="text-gray-300 text-sm mt-2">
            A {card.rarity.toLowerCase()} collectible with unique powers
          </p>
        </motion.div>
      </Card>
    </motion.div>
  );
};

export default NFTCard;
