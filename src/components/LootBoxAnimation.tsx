'use client';
import { motion } from "framer-motion";
import { Sparkles, Star, Zap } from "lucide-react";

const LootBoxAnimation = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative"
      >
        {/* Main loot box */}
        <motion.div
          animate={{
            rotateY: [0, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{
            rotateY: { duration: 2, repeat: Infinity, ease: "linear" },
            scale: { duration: 1, repeat: Infinity, ease: "easeInOut" }
          }}
          className="w-32 h-32 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-2xl shadow-2xl relative"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Box glow effect */}
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="absolute inset-0 bg-gradient-to-br from-purple-400 via-pink-400 to-orange-400 rounded-2xl blur-xl scale-110"
          />
          
          {/* Box content */}
          <div className="relative z-10 w-full h-full flex items-center justify-center">
            <motion.div
              animate={{ rotate: [0, 180, 360] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-12 h-12 text-white" />
            </motion.div>
          </div>
        </motion.div>

        {/* Floating particles */}
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full"
            animate={{
              x: [0, (Math.random() - 0.5) * 200],
              y: [0, (Math.random() - 0.5) * 200],
              opacity: [0, 1, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeOut"
            }}
            style={{
              left: "50%",
              top: "50%"
            }}
          />
        ))}

        {/* Rotating stars */}
        {[Star, Zap, Sparkles].map((Icon, i) => (
          <motion.div
            key={i}
            className="absolute"
            animate={{
              rotate: [0, 360],
              x: [0, Math.cos(i * 2.1) * 80],
              y: [0, Math.sin(i * 2.1) * 80]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "linear"
            }}
            style={{
              left: "50%",
              top: "50%"
            }}
          >
            <Icon className="w-6 h-6 text-yellow-400" />
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-8 text-center"
      >
        <h3 className="text-2xl font-bold text-white mb-2">
          Opening Your Loot Box...
        </h3>
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="text-gray-300"
        >
          Discovering your rare collectible
        </motion.div>
        
        {/* Loading bar */}
        <div className="w-64 h-2 bg-white/20 rounded-full mt-4 overflow-hidden">
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 3, ease: "easeInOut" }}
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
          />
        </div>
      </motion.div>
    </div>
  );
};

export default LootBoxAnimation;
