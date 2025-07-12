
import { motion } from "framer-motion";
import { Star, Trophy, Zap, Crown, Shield, Gem } from "lucide-react";
import { Card } from "@/components/ui/card";

const recentNFTs = [
  {
    id: 1,
    name: "MVP Moment",
    player: "Mike Johnson",
    rarity: "Legendary",
    gradient: "from-yellow-400 to-orange-500",
    icon: Crown,
    team: "Lakers"
  },
  {
    id: 2,
    name: "Game Winner",
    player: "Sarah Davis",
    rarity: "Epic",
    gradient: "from-purple-400 to-purple-600",
    icon: Trophy,
    team: "Warriors"
  },
  {
    id: 3,
    name: "Power Dunk",
    player: "Alex Rivera",
    rarity: "Rare",
    gradient: "from-blue-400 to-blue-600",
    icon: Star,
    team: "Bulls"
  },
  {
    id: 4,
    name: "Clutch Shot",
    player: "Emma Wilson",
    rarity: "Epic",
    gradient: "from-green-400 to-green-600",
    icon: Zap,
    team: "Celtics"
  },
  {
    id: 5,
    name: "Defense Wall",
    player: "Jordan Lee",
    rarity: "Rare",
    gradient: "from-red-400 to-red-600",
    icon: Shield,
    team: "Heat"
  },
  {
    id: 6,
    name: "Triple Double",
    player: "Casey Park",
    rarity: "Legendary",
    gradient: "from-pink-400 to-pink-600",
    icon: Gem,
    team: "Spurs"
  }
];

const RecentNFTsSection = () => {
  return (
    <section className="py-24 px-4 bg-black/10">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Recently Collected
          </h2>
          <p className="text-xl text-gray-300">
            See what other fans are discovering
          </p>
        </motion.div>

        {/* Horizontal scrolling carousel */}
        <div className="relative overflow-hidden">
          <motion.div
            className="flex gap-6"
            animate={{
              x: [0, -2000],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {/* Duplicate array for seamless loop */}
            {[...recentNFTs, ...recentNFTs].map((nft, index) => (
              <motion.div
                key={`${nft.id}-${index}`}
                className="flex-shrink-0 w-80"
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="p-6 bg-black/30 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300 h-full">
                  {/* Rarity badge */}
                  <div className={`inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r ${nft.gradient} text-white text-sm font-medium mb-4`}>
                    {nft.rarity}
                  </div>

                  {/* NFT icon */}
                  <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${nft.gradient} rounded-2xl mb-4`}>
                    <nft.icon className="w-8 h-8 text-white" />
                  </div>

                  {/* NFT details */}
                  <h3 className="text-xl font-bold text-white mb-2">{nft.name}</h3>
                  <p className="text-gray-300 mb-1">{nft.player}</p>
                  <p className="text-gray-400 text-sm">{nft.team}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default RecentNFTsSection;