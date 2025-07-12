'use client';
import { motion } from 'framer-motion';
import { Plus, Star, Trophy } from 'lucide-react';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FullUser } from '../../../../../backend/domain/types';
import Image from 'next/image';
import { InventoryTab } from './InventoryTab';
import { BackgroundParticles } from '@/components/ui/BackgroundParticles';
import LootBoxOpeningAnimation from './OpeningAnimation';

const rarityConfig = {
  Common: { gradient: 'from-gray-400 to-gray-600', color: 'text-gray-400' },
  Rare: { gradient: 'from-blue-400 to-blue-600', color: 'text-blue-400' },
  Epic: { gradient: 'from-purple-400 to-purple-600', color: 'text-purple-400' },
  Legendary: {
    gradient: 'from-yellow-400 to-yellow-600',
    color: 'text-yellow-400',
  },
};

const userNFTs = [
  {
    id: 1,
    name: 'Cosmic Guardian',
    rarity: 'Common',
    acquired: '2024-01-15',
    listed: false,
  },
  {
    id: 2,
    name: 'Storm Rider',
    rarity: 'Rare',
    acquired: '2024-01-20',
    listed: true,
    price: 2.1,
  },
  {
    id: 3,
    name: 'Shadow Walker',
    rarity: 'Epic',
    acquired: '2024-02-01',
    listed: false,
  },
  {
    id: 4,
    name: 'Phoenix Lord',
    rarity: 'Legendary',
    acquired: '2024-02-10',
    listed: true,
    price: 25.0,
  },
];

const sampleCards = [
  {
    id: 1,
    name: 'Cosmic Guardian',
    rarity: 'Common',
    image: '/placeholder.svg',
  },
  { id: 2, name: 'Storm Rider', rarity: 'Rare', image: '/placeholder.svg' },
  { id: 3, name: 'Shadow Walker', rarity: 'Epic', image: '/placeholder.svg' },
  {
    id: 4,
    name: 'Phoenix Lord',
    rarity: 'Legendary',
    image: '/placeholder.svg',
  },
];

type UserProfileProps = {
  user: FullUser;
};

const UserProfile = ({ user }: UserProfileProps) => {
  const [activeTab, setActiveTab] = useState('inventory');
  const [showOpeningAnimation, setShowOpeningAnimation] = useState(false);
  const [revealedCard, setRevealedCard] = useState(null);
  const [isRedemptionComplete, setIsRedemptionComplete] = useState(false);

  const generateRandomCard = (rarity: string) => {
    const possibleCards = sampleCards.filter((card) => card.rarity === rarity);
    return (
      possibleCards[Math.floor(Math.random() * possibleCards.length)] ||
      sampleCards[0]
    );
  };

  const handleOpenLootBox = (boxId: string) => {
    console.log(`Opening loot box ${boxId}`);
    setShowOpeningAnimation(true);
    // Here you would implement the loot box opening logic
  };

  const handleOpeningComplete = (rarity: string) => {
    const card = generateRandomCard(rarity); // mint real NFT here
    setRevealedCard(card);
    setShowOpeningAnimation(false);
    setIsRedemptionComplete(true);
  };

  if (showOpeningAnimation) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <LootBoxOpeningAnimation onComplete={handleOpeningComplete} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      <BackgroundParticles />

      <div className="relative z-10 container mx-auto px-4 py-8 mt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-8 bg-black/20 backdrop-blur-xl border border-white/10 shadow-2xl mb-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <Image
                    src={user.avatar}
                    alt={`${user.userName}'s avatar`}
                    width={96}
                    height={96}
                    className="absolute inset-0 rounded-full object-cover"
                  />
                </div>
              </div>

              <div className="flex-1 text-center md:text-left">
                <h2 className="text-3xl font-bold text-white mb-2">
                  {user.userName}
                </h2>
                <p className="text-gray-300 mb-4">
                  Joined {new Date(user.createdAt).toDateString()}
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-white">{12}</p>
                    <p className="text-gray-400 text-sm">NFTs Owned</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-white">{8}</p>
                    <p className="text-gray-400 text-sm">Tickets Scanned</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-white">
                      {user.lootBoxes.length}
                    </p>
                    <p className="text-gray-400 text-sm">Loot Boxes</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-black/20 backdrop-blur-xl border border-white/10 shadow-2xl">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-4 bg-white/5 border-white/10">
                <TabsTrigger
                  value="inventory"
                  className="text-white data-[state=active]:bg-white/10"
                >
                  Inventory
                </TabsTrigger>
                <TabsTrigger
                  value="collection"
                  className="text-white data-[state=active]:bg-white/10"
                >
                  My Collection
                </TabsTrigger>
                <TabsTrigger
                  value="achievements"
                  className="text-white data-[state=active]:bg-white/10"
                >
                  Achievements
                </TabsTrigger>
              </TabsList>

              <TabsContent value="collection" className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {userNFTs.map((nft, index) => (
                    <motion.div
                      key={nft.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="overflow-hidden bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300">
                        <div className="relative h-48 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                          <div
                            className={`w-20 h-20 bg-gradient-to-br ${rarityConfig[nft.rarity].gradient} rounded-full flex items-center justify-center`}
                          >
                            <span className="text-white font-bold text-lg">
                              {nft.name
                                .split(' ')
                                .map((word) => word[0])
                                .join('')}
                            </span>
                          </div>

                          <Badge
                            className={`absolute top-3 left-3 bg-gradient-to-r ${rarityConfig[nft.rarity].gradient} text-white border-0`}
                          >
                            {nft.rarity}
                          </Badge>

                          {nft.listed && (
                            <Badge className="absolute top-3 right-3 bg-green-500 text-white border-0">
                              Listed
                            </Badge>
                          )}
                        </div>

                        <div className="p-4">
                          <h3 className="text-lg font-bold text-white mb-1">
                            {nft.name}
                          </h3>
                          <p className="text-gray-400 text-sm mb-3">
                            Acquired: {nft.acquired}
                          </p>

                          {nft.listed ? (
                            <div className="flex items-center justify-between">
                              <span className="text-white font-bold">
                                {nft.price} ETH
                              </span>
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-white/20 text-white hover:bg-white/10"
                              >
                                Edit Listing
                              </Button>
                            </div>
                          ) : (
                            <Button
                              size="sm"
                              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                            >
                              <Plus className="w-3 h-3 mr-1" />
                              List for Sale
                            </Button>
                          )}
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              <InventoryTab
                lootBoxes={user.lootBoxes}
                handleOpenLootBox={handleOpenLootBox}
              />

              <TabsContent value="achievements" className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="p-4 bg-white/5 border border-white/10">
                    <div className="flex items-center gap-3">
                      <Trophy className="w-8 h-8 text-yellow-400" />
                      <div>
                        <h3 className="text-white font-bold">
                          First Collector
                        </h3>
                        <p className="text-gray-400 text-sm">
                          Opened your first loot box
                        </p>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-4 bg-white/5 border border-white/10">
                    <div className="flex items-center gap-3">
                      <Star className="w-8 h-8 text-purple-400" />
                      <div>
                        <h3 className="text-white font-bold">Rare Hunter</h3>
                        <p className="text-gray-400 text-sm">
                          Collected 5 rare NFTs
                        </p>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-4 bg-white/5 border border-white/10 opacity-50">
                    <div className="flex items-center gap-3">
                      <Trophy className="w-8 h-8 text-gray-500" />
                      <div>
                        <h3 className="text-gray-500 font-bold">
                          Legendary Seeker
                        </h3>
                        <p className="text-gray-500 text-sm">
                          Collect 3 legendary NFTs (1/3)
                        </p>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-4 bg-white/5 border border-white/10 opacity-50">
                    <div className="flex items-center gap-3">
                      <Star className="w-8 h-8 text-gray-500" />
                      <div>
                        <h3 className="text-gray-500 font-bold">
                          Market Master
                        </h3>
                        <p className="text-gray-500 text-sm">
                          Sell 10 NFTs on marketplace (0/10)
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default UserProfile;
