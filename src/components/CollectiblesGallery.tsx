import { motion } from "framer-motion";
import { Star, Trophy, Zap, Crown } from "lucide-react";
import { Card } from "@/components/ui/card";

const sampleCollectibles = [
  {
    id: 1,
    name: "MVP Moment",
    rarity: "Legendary",
    gradient: "from-yellow-400 to-orange-500",
    icon: Crown
  },
  {
    id: 2,
    name: "Game Winner",
    rarity: "Epic",
    gradient: "from-purple-400 to-purple-600",
    icon: Trophy
  },
  {
    id: 3,
    name: "Fan Favorite",
    rarity: "Rare",
    gradient: "from-blue-400 to-blue-600",
    icon: Star
  },
  {
    id: 4,
    name: "Power Play",
    rarity: "Common",
    gradient: "from-green-400 to-green-600",
    icon: Zap
  }
];

const CollectiblesGallery = () => {
  return (
    <section className="py-32 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl font-bold text-white mb-6">
            Collect <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Rare Moments</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Every ticket unlocks unique digital collectibles from your favorite teams
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {sampleCollectibles.map((collectible, index) => (
            <motion.div
              key={collectible.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="group"
            >
              <Card className="p-8 bg-black/20 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300 h-full relative overflow-hidden">
                {/* Subtle glow effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${collectible.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-lg`} />
                
                {/* Rarity indicator */}
                <div className={`inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r ${collectible.gradient} text-white text-sm font-medium mb-6`}>
                  {collectible.rarity}
                </div>

                {/* Large icon */}
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${collectible.gradient} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <collectible.icon className="w-8 h-8 text-white" />
                </div>

                {/* Clean title */}
                <h3 className="text-2xl font-bold text-white">{collectible.name}</h3>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CollectiblesGallery;