'use client';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Edit,
  Eye,
  Package,
  Plus,
  Settings,
  Sparkles,
  Star,
  Trophy,
  User,
} from 'lucide-react';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';

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

const userLootBoxes = [
  { id: 1, type: 'Mystery Box', acquired: '2024-02-15', canOpen: true },
  { id: 2, type: 'Epic Box', acquired: '2024-02-14', canOpen: true },
  {
    id: 3,
    type: 'Rare Box',
    acquired: '2024-02-13',
    canOpen: false,
    openTime: '2024-02-16T10:00:00Z',
  },
];

const userStats = {
  totalNFTs: 12,
  totalValue: 45.8,
  ticketsScanned: 8,
  lootBoxesOpened: 8,
  rank: 'Gold Collector',
};

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState('collection');

  const handleOpenLootBox = (boxId: number) => {
    console.log(`Opening loot box ${boxId}`);
    // Here you would implement the loot box opening logic
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Background particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-20"
            animate={{
              x: [
                Math.random() * window.innerWidth,
                Math.random() * window.innerWidth,
              ],
              y: [
                Math.random() * window.innerHeight,
                Math.random() * window.innerHeight,
              ],
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              ease: 'linear',
            }}
            style={{
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center space-x-4">
             <Link href="/marketplace">
              <Button
                variant="outline"
                size="icon"
                className="border-white/20 text-white hover:bg-white/10"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <h1 className="text-4xl font-bold text-white">My Profile</h1>
          </div>
          <Button
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10"
          >
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
        </motion.div>

        {/* Profile Info Block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-8 bg-black/20 backdrop-blur-xl border border-white/10 shadow-2xl mb-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <User className="w-12 h-12 text-white" />
                </div>
                <Button
                  size="icon"
                  variant="outline"
                  className="absolute -bottom-2 -right-2 w-8 h-8 border-white/20 text-white hover:bg-white/10"
                >
                  <Edit className="w-3 h-3" />
                </Button>
              </div>

              <div className="flex-1 text-center md:text-left">
                <h2 className="text-3xl font-bold text-white mb-2">
                  SportsFan2024
                </h2>
                <p className="text-gray-300 mb-4">
                  Joined January 2024 • {userStats.rank}
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-white">
                      {userStats.totalNFTs}
                    </p>
                    <p className="text-gray-400 text-sm">NFTs Owned</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-white">
                      {userStats.totalValue}
                    </p>
                    <p className="text-gray-400 text-sm">Total Value (ETH)</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-white">
                      {userStats.ticketsScanned}
                    </p>
                    <p className="text-gray-400 text-sm">Tickets Scanned</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-white">
                      {userStats.lootBoxesOpened}
                    </p>
                    <p className="text-gray-400 text-sm">Loot Boxes</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Tabs Block */}
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
                  value="collection"
                  className="text-white data-[state=active]:bg-white/10"
                >
                  My Collection
                </TabsTrigger>
                <TabsTrigger
                  value="inventory"
                  className="text-white data-[state=active]:bg-white/10"
                >
                  Inventory
                </TabsTrigger>
                <TabsTrigger
                  value="listed"
                  className="text-white data-[state=active]:bg-white/10"
                >
                  Listed for Sale
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

              <TabsContent value="inventory" className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {userLootBoxes.map((box, index) => (
                    <motion.div
                      key={box.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="overflow-hidden bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300">
                        <div className="relative h-48 bg-gradient-to-br from-purple-800 to-pink-800 flex items-center justify-center">
                          <motion.div
                            animate={{
                              rotateY: [0, 360],
                              scale: [1, 1.05, 1],
                            }}
                            transition={{
                              rotateY: {
                                duration: 4,
                                repeat: Infinity,
                                ease: 'linear',
                              },
                              scale: {
                                duration: 2,
                                repeat: Infinity,
                                ease: 'easeInOut',
                              },
                            }}
                            className="w-20 h-20 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-2xl flex items-center justify-center"
                          >
                            <Package className="w-10 h-10 text-white" />
                          </motion.div>

                          <Badge className="absolute top-3 left-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
                            {box.type}
                          </Badge>

                          {!box.canOpen && (
                            <Badge className="absolute top-3 right-3 bg-red-500 text-white border-0">
                              Locked
                            </Badge>
                          )}
                        </div>

                        <div className="p-4">
                          <h3 className="text-lg font-bold text-white mb-1">
                            {box.type}
                          </h3>
                          <p className="text-gray-400 text-sm mb-3">
                            Acquired: {box.acquired}
                          </p>

                          {box.canOpen ? (
                            <Button
                              size="sm"
                              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                              onClick={() => handleOpenLootBox(box.id)}
                            >
                              <Sparkles className="w-3 h-3 mr-1" />
                              Open Box (1 CHZ)
                            </Button>
                          ) : (
                            <div className="text-center">
                              <p className="text-sm text-gray-400 mb-2">
                                Available to open:
                              </p>
                              <p className="text-sm text-white font-bold">
                                {new Date(box.openTime).toLocaleDateString()}
                              </p>
                            </div>
                          )}
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="listed" className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {userNFTs
                    .filter((nft) => nft.listed)
                    .map((nft, index) => (
                      <motion.div
                        key={nft.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Card className="overflow-hidden bg-white/5 border border-white/10">
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

                            <div className="absolute top-3 right-3 flex items-center text-white/70 text-sm">
                              <Eye className="w-3 h-3 mr-1" />
                              {Math.floor(Math.random() * 200) + 50}
                            </div>
                          </div>

                          <div className="p-4">
                            <h3 className="text-lg font-bold text-white mb-1">
                              {nft.name}
                            </h3>
                            <p className="text-2xl font-bold text-white mb-3">
                              {nft.price} ETH
                            </p>

                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                className="flex-1 border-white/20 text-white hover:bg-white/10"
                              >
                                Edit Price
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="flex-1 border-red-500/50 text-red-400 hover:bg-red-500/10"
                              >
                                Remove
                              </Button>
                            </div>
                          </div>
                        </Card>
                      </motion.div>
                    ))}
                </div>
              </TabsContent>

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
