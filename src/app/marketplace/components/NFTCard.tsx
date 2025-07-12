'use client';
import { motion } from 'framer-motion';
import { Star, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

const rarityConfig = {
  Common: {
    gradient: 'from-gray-400 to-gray-600',
    color: 'text-gray-400',
    glow: 'shadow-[0_0_30px_rgba(156,163,175,0.5)]',
    glowHover: 'shadow-[0_0_50px_rgba(156,163,175,0.8)]',
  },
  Rare: {
    gradient: 'from-blue-400 to-blue-600',
    color: 'text-blue-400',
    glow: 'shadow-[0_0_30px_rgba(96,165,250,0.5)]',
    glowHover: 'shadow-[0_0_50px_rgba(96,165,250,0.8)]',
  },
  Epic: {
    gradient: 'from-purple-400 to-purple-600',
    color: 'text-purple-400',
    glow: 'shadow-[0_0_30px_rgba(168,85,247,0.5)]',
    glowHover: 'shadow-[0_0_50px_rgba(168,85,247,0.8)]',
  },
  Legendary: {
    gradient: 'from-yellow-400 to-yellow-600',
    color: 'text-yellow-400',
    glow: 'shadow-[0_0_30px_rgba(250,204,21,0.5)]',
    glowHover: 'shadow-[0_0_50px_rgba(250,204,21,0.8)]',
  },
};

interface NFT {
  id: string;
  name: string;
  rarity: keyof typeof rarityConfig;
  price: number;
  seller: string;
  image: string;
}

interface MarketplaceNFTCardProps {
  nft: NFT;
  index: number;
}

const MarketplaceNFTCard = ({ nft, index }: MarketplaceNFTCardProps) => {
  return (
    <motion.div
      key={nft.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group cursor-pointer"
    >
      <div
        className={`relative overflow-hidden bg-black rounded-2xl transition-all duration-500 ${rarityConfig[nft.rarity].glow} group-hover:${rarityConfig[nft.rarity].glowHover} group-hover:scale-105`}
        style={{ aspectRatio: '1024 / 1536' }}
      >
        <Image
          src={nft.image}
          alt={nft.name}
          className="absolute inset-0 w-full h-full object-cover rounded-2xl"
          width={1024}
          height={1536}
        />

        <div
          className={`absolute inset-0 bg-gradient-to-br ${rarityConfig[nft.rarity].gradient} opacity-20 rounded-2xl`}
        />

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileHover={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-6 rounded-b-2xl pointer-events-none group-hover:pointer-events-auto"
        >
          <div className="space-y-3">
            <h3 className="text-xl font-bold text-white">{nft.name}</h3>
            <p className="text-gray-300 text-sm">by {nft.seller}</p>

            <div className="flex items-center space-x-1">
              {Array.from({
                length:
                  nft.rarity === 'Legendary'
                    ? 5
                    : nft.rarity === 'Epic'
                      ? 4
                      : nft.rarity === 'Rare'
                        ? 3
                        : 2,
              }).map((_, _i) => (
                <Star
                  key={crypto.randomUUID()}
                  className={`w-4 h-4 fill-current ${rarityConfig[nft.rarity].color}`}
                />
              ))}
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Price</p>
                <p className="text-2xl font-bold text-white">{nft.price} CHZ</p>
              </div>
              <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Buy Now
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default MarketplaceNFTCard;
