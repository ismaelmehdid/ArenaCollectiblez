'use client';
import { motion } from 'framer-motion';

export const MarketplaceHeader = () => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex items-center justify-between mb-8"
  >
    <div className="flex items-center space-x-4">
      <h1 className="text-4xl font-bold text-white">NFT Marketplace</h1>
    </div>
  </motion.div>
);
