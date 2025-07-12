'use client';
import { motion } from 'framer-motion';
import { ArrowLeft, User } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const MarketplaceHeader = () => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex items-center justify-between mb-8"
  >
    <div className="flex items-center space-x-4">
      <Link href="/">
        <Button variant="outline" size="icon" className="border-white/20 text-white hover:bg-white/10">
          <ArrowLeft className="w-4 h-4" />
        </Button>
      </Link>
      <h1 className="text-4xl font-bold text-white">NFT Marketplace</h1>
    </div>
    <Link href="/profile">
      <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
        <User className="w-4 h-4 mr-2" />
        My Profile
      </Button>
    </Link>
  </motion.div>
);
