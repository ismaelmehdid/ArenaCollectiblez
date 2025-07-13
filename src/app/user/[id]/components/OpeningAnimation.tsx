import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Star, Crown, Zap, Diamond, X } from 'lucide-react';

const rarities = [
  {
    name: 'Common',
    color: 'from-gray-400 to-gray-600',
    bgColor: 'from-gray-500/20 to-gray-700/20',
    icon: Star,
    particles: 8,
  },
  {
    name: 'Rare',
    color: 'from-blue-400 to-blue-600',
    bgColor: 'from-blue-500/20 to-blue-700/20',
    icon: Sparkles,
    particles: 12,
  },
  {
    name: 'Epic',
    color: 'from-purple-400 to-purple-600',
    bgColor: 'from-purple-500/20 to-purple-700/20',
    icon: Zap,
    particles: 16,
  },
  {
    name: 'Legendary',
    color: 'from-yellow-400 to-yellow-600',
    bgColor: 'from-yellow-500/20 to-yellow-700/20',
    icon: Crown,
    particles: 24,
  },
];

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

interface LootBoxOpeningAnimationProps {
  onComplete: (rarity: string) => void;
  isGeneratingImage?: boolean;
  isPending?: boolean;
  isConfirming?: boolean;
  mintError?: string | null;
  contractError?: string | null;
  mintSuccess?: boolean;
  shouldStartAnimation?: boolean;
  nftUri?: string;
}

const LootBoxOpeningAnimation = ({
  onComplete,
  isGeneratingImage = false,
  isPending = false,
  isConfirming = false,
  mintError = null,
  contractError = null,
  mintSuccess = false,
  shouldStartAnimation = false,
  nftUri,
}: LootBoxOpeningAnimationProps) => {
  const [currentRarity, setCurrentRarity] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [intensity, setIntensity] = useState(1);
  const [showFinalReveal, setShowFinalReveal] = useState(false);
  const [finalRarity, setFinalRarity] = useState<(typeof rarities)[0] | null>(
    null,
  );

  // Start spinning when transaction is confirmed
  useEffect(() => {
    if (shouldStartAnimation && !isSpinning) {
      setIsSpinning(true);
    }
  }, [shouldStartAnimation, isSpinning]);

  useEffect(() => {
    // Spinning phase - cycle through rarities with increasing speed and intensity
    let interval: NodeJS.Timeout;
    let timeoutId: NodeJS.Timeout;

    if (isSpinning) {
      let speed = 400; // Start slow
      let cycleCount = 0;
      const maxCycles = 20;

      const cycle = () => {
        setCurrentRarity((prev) => (prev + 1) % rarities.length);
        cycleCount++;

        // Increase intensity and speed over time
        if (cycleCount < maxCycles) {
          speed = Math.max(50, speed - 15); // Get faster
          setIntensity(1 + (cycleCount / maxCycles) * 3); // Increase intensity
          timeoutId = setTimeout(cycle, speed);
        } else {
          // Final reveal
          const finalRarityIndex = Math.floor(Math.random() * rarities.length);
          setFinalRarity(rarities[finalRarityIndex]);
          setIsSpinning(false);

          setTimeout(() => {
            setShowFinalReveal(true);
            // Don't auto-complete - let user close manually
          }, 500);
        }
      };

      cycle();
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [isSpinning]);

  const currentRarityData = rarities[currentRarity];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen relative overflow-hidden">
      {/* Status indicators */}
      {isGeneratingImage && (
        <div className="fixed top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-pulse">
          🎨 Generating NFT image...
        </div>
      )}

      {isPending && (
        <div className="fixed top-4 right-4 bg-yellow-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-pulse">
          ⛓️ Minting NFT to blockchain...
        </div>
      )}

      {isConfirming && (
        <div className="fixed top-4 right-4 bg-orange-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-pulse">
          🔄 Waiting for transaction confirmation...
        </div>
      )}

      {mintError && (
        <div className="fixed top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg z-50">
          ❌ Error: {mintError}
        </div>
      )}

      {contractError && (
        <div className="fixed top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg z-50">
          ❌ Contract Error: {contractError}
        </div>
      )}

      {mintSuccess && (
        <div className="fixed top-4 left-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-pulse">
          ✅ NFT successfully minted!
        </div>
      )}

      {/* Background effects */}
      <motion.div
        animate={{
          background: [
            `radial-gradient(circle at 50% 50%, ${currentRarityData.bgColor.split(' ')[1]} 0%, transparent 70%)`,
            `radial-gradient(circle at 30% 30%, ${currentRarityData.bgColor.split(' ')[1]} 0%, transparent 70%)`,
            `radial-gradient(circle at 70% 70%, ${currentRarityData.bgColor.split(' ')[1]} 0%, transparent 70%)`,
          ],
        }}
        transition={{ duration: 0.5, repeat: Infinity }}
        className="absolute inset-0 opacity-60"
      />

      <AnimatePresence mode="wait">
        {!showFinalReveal ? (
          <motion.div
            key="spinning"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.2, opacity: 0 }}
            className="relative"
          >
            {/* Main loot box */}
            <motion.div
              animate={{
                rotateY: isSpinning ? [0, 360] : 0,
                scale: [1, 1 + intensity * 0.1, 1],
                boxShadow: [
                  `0 0 ${20 * intensity}px rgba(147, 51, 234, ${0.3 * intensity})`,
                  `0 0 ${40 * intensity}px rgba(147, 51, 234, ${0.6 * intensity})`,
                  `0 0 ${60 * intensity}px rgba(147, 51, 234, ${0.4 * intensity})`,
                ],
              }}
              transition={{
                rotateY: { duration: 0.3, ease: 'linear' },
                scale: { duration: 0.5, repeat: Infinity, ease: 'easeInOut' },
                boxShadow: {
                  duration: 0.8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                },
              }}
              className={`w-40 h-40 bg-gradient-to-br ${currentRarityData.color} rounded-3xl shadow-2xl relative`}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Intense glow effect */}
              <motion.div
                animate={{
                  opacity: [0.3, 1, 0.3],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 0.4 / intensity,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className={`absolute inset-0 bg-gradient-to-br ${currentRarityData.color} rounded-3xl blur-2xl scale-125`}
              />

              {/* Box content */}
              <div className="relative z-10 w-full h-full flex items-center justify-center">
                <motion.div
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    rotate: {
                      duration: 0.5 / intensity,
                      repeat: Infinity,
                      ease: 'linear',
                    },
                    scale: {
                      duration: 0.3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    },
                  }}
                >
                  <currentRarityData.icon className="w-16 h-16 text-white" />
                </motion.div>
              </div>

              {/* Lightning bolts */}
              {Array.from({ length: 6 }).map((_, i) => (
                <motion.div
                  key={crypto.randomUUID()}
                  className="absolute w-1 bg-white rounded-full"
                  style={{
                    height: `${20 + intensity * 10}px`,
                    left: '50%',
                    top: '50%',
                    transformOrigin: 'bottom',
                  }}
                  animate={{
                    rotate: [i * 60, i * 60 + 360],
                    opacity: [0, 1, 0],
                    scaleY: [0, intensity, 0],
                  }}
                  transition={{
                    duration: 0.2,
                    repeat: Infinity,
                    delay: i * 0.1,
                    ease: 'easeOut',
                  }}
                />
              ))}
            </motion.div>

            {/* Explosion particles */}
            {Array.from({
              length: currentRarityData.particles * intensity,
            }).map((_, i) => (
              <motion.div
                key={crypto.randomUUID()}
                className={`absolute w-2 h-2 bg-gradient-to-r ${currentRarityData.color} rounded-full`}
                animate={{
                  x: [0, (Math.random() - 0.5) * 400 * intensity],
                  y: [0, (Math.random() - 0.5) * 400 * intensity],
                  opacity: [0, 1, 0],
                  scale: [0, intensity, 0],
                }}
                transition={{
                  duration: 1 / intensity,
                  repeat: Infinity,
                  delay: Math.random() * 0.5,
                  ease: 'easeOut',
                }}
                style={{
                  left: '50%',
                  top: '50%',
                }}
              />
            ))}

            {/* Rarity text */}
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 0.3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="mt-12 text-center"
            >
              <h2
                className={`text-4xl font-bold bg-gradient-to-r ${currentRarityData.color} bg-clip-text text-transparent`}
              >
                {currentRarityData.name}
              </h2>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="reveal"
            initial={{ scale: 0, rotateY: 180 }}
            animate={{ scale: 1, rotateY: 0 }}
            transition={{
              type: 'spring',
              duration: 1.5,
              bounce: 0.3,
            }}
            className="relative"
          >
            {/* Final card reveal */}
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, type: 'spring', duration: 1 }}
              className="w-80 h-96 bg-black/40 backdrop-blur-xl border-2 border-white/20 rounded-2xl overflow-hidden relative"
            >
              {/* Card header */}
              <div
                className={`h-16 bg-gradient-to-r ${finalRarity?.color} flex items-center justify-center relative`}
              >
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                >
                  {finalRarity && (
                    <finalRarity.icon className="w-6 h-6 text-white mr-2" />
                  )}
                </motion.div>
                <span className="text-white font-bold text-lg">
                  {finalRarity?.name}
                </span>
              </div>

              {/* Card content */}
              <div className="relative h-48 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                {nftUri ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1, type: 'spring', duration: 0.8 }}
                    className="w-full h-full flex items-center justify-center"
                  >
                    <IpfsImage
                      ipfsUrl={nftUri}
                      alt="NFT Collectible"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1, type: 'spring', duration: 0.8 }}
                    className="w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center"
                  >
                    <Diamond className="w-16 h-16 text-white" />
                  </motion.div>
                )}
              </div>

              {/* Card info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                className="p-6 text-center"
              >
                <h3 className="text-xl font-bold text-white mb-2">
                  Mystery Collectible
                </h3>
                <div className="flex justify-center items-center space-x-1 mb-2">
                  {Array.from({
                    length:
                      finalRarity?.name === 'Legendary'
                        ? 5
                        : finalRarity?.name === 'Epic'
                          ? 4
                          : finalRarity?.name === 'Rare'
                            ? 3
                            : 2,
                  }).map((_, i) => (
                    <motion.div
                      key={crypto.randomUUID()}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.4 + i * 0.1 }}
                    >
                      <Star className="w-4 h-4 fill-current text-yellow-400" />
                    </motion.div>
                  ))}
                </div>
                <p className="text-gray-300 text-sm">
                  A {finalRarity?.name.toLowerCase()} collectible with unique
                  powers
                </p>
              </motion.div>

              {/* Card glow effect */}
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className={`absolute inset-0 bg-gradient-to-r ${finalRarity?.color} rounded-2xl blur-xl -z-10`}
              />
            </motion.div>

            {/* Success message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
              className="mt-8 text-center"
            >
              <h3 className="text-3xl font-bold text-white mb-2">
                Congratulations! 🎉
              </h3>
              <p className="text-gray-300">
                You've received a {finalRarity?.name} collectible!
              </p>

              {/* Close button */}
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2, type: 'spring', duration: 0.5 }}
                onClick={() => onComplete(finalRarity?.name || 'Common')}
                className="mt-6 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold rounded-lg shadow-lg transition-all duration-200 hover:scale-105"
              >
                Close
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LootBoxOpeningAnimation;
