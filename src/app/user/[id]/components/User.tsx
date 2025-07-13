  'use client';
import { motion } from 'framer-motion';
import { Star, Trophy, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FullUser } from '../../../../../backend/domain/types';
import Image from 'next/image';
import { InventoryTab } from './InventoryTab';
import { BackgroundParticles } from '@/components/ui/BackgroundParticles';
import LootBoxOpeningAnimation from './OpeningAnimation';
import {
  useReadContract,
  useWriteContract,
  useAccount,
  useWaitForTransactionReceipt,
} from 'wagmi';
import ArenaCollectibleNFT from '../../../../../artifacts/contracts/NFT.sol/ArenaCollectibleNFT.json';
import { useEffect } from 'react';
import { fetchDeleteLootBox } from '../../../../../backend/data_access_layer/lootbox';
import { fetchAddNftToUser } from '../../../../../backend/data_access_layer/nft';

// Convert IPFS URI to gateway URL
const convertIpfsToGateway = (ipfsUri: string) => {
  if (ipfsUri && ipfsUri.startsWith('ipfs://')) {
    const cid = ipfsUri.replace('ipfs://', '');
    return `https://gateway.pinata.cloud/ipfs/${cid}`;
  }
  return ipfsUri;
};

interface IpfsImageProps {
  ipfsUrl: string;
  alt: string;
  className?: string;
}

export function IpfsImage({ ipfsUrl, alt, className }: IpfsImageProps) {
  // Remove protocol if present, leaving only the CID + path
  const clean = ipfsUrl.replace(/^ipfs:\/\//, '');
  const src = `https://gateway.pinata.cloud/ipfs/${clean}`;

  return <img src={src} alt={alt} className={className} />;
}

export function DisplayNFT({ idx }: { idx: number }) {
  const { data: nftUri } = useReadContract({
    address: '0x9cBC8E64B66448545f45876ccCb545442b0bFA54',
    abi: ArenaCollectibleNFT.abi,
    functionName: 'tokenURI',
    args: [idx],
  });

  const [loading, setLoading] = useState(false);
  const [isImage, setIsImage] = useState(false);

  useEffect(() => {
    const checkContentType = async () => {
      if (!nftUri) return;

      setLoading(true);
      try {
        const gatewayUrl = convertIpfsToGateway(nftUri as string);
        const response = await fetch(gatewayUrl);
        const contentType = response.headers.get('content-type');

        // Check if it's an image
        if (contentType?.startsWith('image/')) {
          setIsImage(true);
        } else {
          setIsImage(false);
        }
      } catch (error) {
        console.error('Error checking content type:', error);
        // Assume it's an image if we can't determine
        setIsImage(true);
      } finally {
        setLoading(false);
      }
    };

    checkContentType();
  }, [nftUri]);

  if (loading) {
    return (
      <div className="mt-6 p-6 bg-white rounded-lg shadow-lg max-w-md mx-auto">
        <div className="animate-pulse">
          <div className="bg-gray-300 h-64 rounded-lg mb-4"></div>
          <div className="space-y-2">
            <div className="bg-gray-300 h-4 rounded"></div>
            <div className="bg-gray-300 h-4 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!nftUri) {
    return (
      <div/>
    );
  }

  const gatewayUrl = convertIpfsToGateway(nftUri as string);

  return (
    <motion.div
      key={idx}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: idx * 0.1 }}
      className="group cursor-pointer"
    >
      <div
        className="relative overflow-hidden bg-black rounded-2xl transition-all duration-500 group-hover:scale-105"
        style={{ aspectRatio: '1024 / 1536' }}
      >
        <Image
          src={gatewayUrl}
          alt={`NFT #${idx}`}
          className="absolute inset-0 w-full h-full object-cover rounded-2xl"
          width={1024}
          height={1536}
        />

        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 opacity-20 rounded-2xl" />

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileHover={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-6 rounded-b-2xl pointer-events-none group-hover:pointer-events-auto"
        >
          <div className="space-y-3">
            <h3 className="text-xl font-bold text-white">
              Arena Collectible #{idx}
            </h3>
            <p className="text-gray-300 text-sm">Unique collectible NFT</p>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Token ID</p>
                <p className="text-2xl font-bold text-white">#{idx}</p>
              </div>
              <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                View Details
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

type UserProfileProps = {
  user: FullUser;
};

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

const UserProfile = ({ user }: UserProfileProps) => {
  const { writeContract, isPending, error, data: hash } = useWriteContract();
  const { address } = useAccount();
  const [activeTab, setActiveTab] = useState('inventory');
  const [showOpeningAnimation, setShowOpeningAnimation] = useState(false);
  const [_revealedCard, setRevealedCard] = useState<any>(null);
  const [_isRedemptionComplete, setIsRedemptionComplete] = useState(false);
  const [mintError, setMintError] = useState<string | null>(null);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [mintSuccess, setMintSuccess] = useState(false);
  const [transactionHash, setTransactionHash] = useState<string | null>(null);
  const [transactionConfirmed, setTransactionConfirmed] = useState(false);
  const [nftUri, setNftUri] = useState<string | undefined>(undefined);

  // Wait for transaction receipt
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash: transactionHash as `0x${string}` | undefined,
    });

  // Handle successful minting
  useEffect(() => {
    if (mintSuccess) {
      // Reset success state after a delay
      const timer = setTimeout(() => {
        setMintSuccess(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [mintSuccess]);

  // Handle transaction confirmation
  useEffect(() => {
    if (isConfirmed && transactionHash) {
      // Transaction confirmed on blockchain - start the animation
      setTransactionConfirmed(true);
      setShowOpeningAnimation(true);
      setTransactionHash(null);
    }
  }, [isConfirmed, transactionHash]);

  // Capture transaction hash when available
  useEffect(() => {
    if (hash) {
      setTransactionHash(hash);
    }
  }, [hash]);

  const generateRandomCard = (rarity: string) => {
    const possibleCards = sampleCards.filter((card) => card.rarity === rarity);
    return (
      possibleCards[Math.floor(Math.random() * possibleCards.length)] ||
      sampleCards[0]
    );
  };

  const handleOpenLootBox = async (boxId: string) => {
    console.log(`Opening loot box ${boxId}`);

    if (!address) {
      setMintError('Please connect your wallet first');
      return;
    }

    setMintError(null);

    try {
      // Step 1: Generate random image and get IPFS CID
      setIsGeneratingImage(true);
      const response = await fetch('/api/random-image-cid/');
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || 'Failed to generate image and upload to IPFS',
        );
      }

      const { cid } = await response.json();
      const tokenUri = `ipfs://${cid}`;
      setNftUri(tokenUri);

      // Step 2: Mint the NFT with the IPFS URI
      writeContract({
        address: '0x9cBC8E64B66448545f45876ccCb545442b0bFA54',
        abi: ArenaCollectibleNFT.abi,
        functionName: 'mint',
        args: [address, tokenUri],
        value: BigInt('1000000000000000'), // 0.001 CHZ in wei
      });

      // Delete lootbox from database
      const deleteResult = await fetchDeleteLootBox(boxId);
      if (!deleteResult) {
        console.error('Failed to delete lootbox');
      }
    } catch (error) {
      console.error('Error minting NFT:', error);
      setMintError(
        error instanceof Error ? error.message : 'Failed to mint NFT',
      );
    } finally {
      setIsGeneratingImage(false);
    }
  };

  const handleOpeningComplete = (rarity: string) => {
    const card = generateRandomCard(rarity);
    setRevealedCard(card);
    setShowOpeningAnimation(false);
    setIsRedemptionComplete(true);
    setMintSuccess(true);
    setTransactionConfirmed(false);
    setNftUri(undefined);

    // Reset error state
    setMintError(null);
  };

  if (showOpeningAnimation) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <LootBoxOpeningAnimation
          onComplete={handleOpeningComplete}
          isGeneratingImage={isGeneratingImage}
          isPending={isPending}
          isConfirming={isConfirming}
          mintError={mintError}
          contractError={error?.message || null}
          mintSuccess={mintSuccess}
          shouldStartAnimation={transactionConfirmed}
          nftUri={nftUri}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      <BackgroundParticles />

      <div className="relative z-10 container mx-auto px-4 py-8 mt-20">
        {/* Success notification */}
        {mintSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50"
          >
            ✅ NFT successfully minted to your wallet!
          </motion.div>
        )}

        {/* Status notifications */}
        {isGeneratingImage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-4 left-4 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center gap-3"
          >
            <Loader2 className="w-5 h-5 animate-spin" />
            🎨 Creating your NFT image...
          </motion.div>
        )}

        {isPending && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-4 left-4 bg-yellow-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center gap-3"
          >
            <Loader2 className="w-5 h-5 animate-spin" />
            ⏳ Waiting for your transaction confirmation...
          </motion.div>
        )}

        {isConfirming && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-4 left-4 bg-orange-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center gap-3"
          >
            <Loader2 className="w-5 h-5 animate-spin" />
            🔄 Confirming transaction on blockchain...
          </motion.div>
        )}

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
                    <p className="text-2xl font-bold text-white">
                      {user.nfts.length}
                    </p>
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
                  {Array.from({ length: 21 }, (_, i) => (
                    <DisplayNFT key={i} idx={i} />
                  ))}
                </div>
              </TabsContent>

              <InventoryTab
                lootBoxes={user.lootBoxes}
                handleOpenLootBox={handleOpenLootBox}
                isWalletConnected={!!address}
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
