'use client';
import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { rarityConfig } from '../../../../backend/domain/types';

type Props = {
  nfts: {
    id: string;
    name: string;
    price: number;
    seller: string;
    rarity: keyof typeof rarityConfig;
  }[];
  viewMode: 'grid' | 'list';
};

export const NFTGrid = ({ nfts, viewMode }: Props) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.2 }}
    className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}
  >
    {nfts.map((nft, index) => (
      <motion.div
        key={nft.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
      >
        <Card className="overflow-hidden bg-black/20 backdrop-blur-xl border border-white/10 shadow-2xl hover:border-white/20 transition-all duration-300 group">
          <div className="relative h-64 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
            <div
              className={`w-24 h-24 bg-gradient-to-br ${rarityConfig[nft.rarity].gradient} rounded-full flex items-center justify-center`}
            >
              <span className="text-white font-bold text-xl">
                {nft.name
                  .split(' ')
                  .map((word) => word[0])
                  .join('')}
              </span>
            </div>
            <Badge
              className={`absolute top-4 left-4 bg-gradient-to-r ${rarityConfig[nft.rarity].gradient} text-white border-0`}
            >
              {nft.rarity}
            </Badge>
          </div>

          <div className="p-6">
            <h3 className="text-xl font-bold text-white mb-2">{nft.name}</h3>
            <p className="text-gray-300 text-sm mb-4">by {nft.seller}</p>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Price</p>
                <p className="text-2xl font-bold text-white">{nft.price} ETH</p>
              </div>
              <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Buy Now
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>
    ))}
  </motion.div>
);
