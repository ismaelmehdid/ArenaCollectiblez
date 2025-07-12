'use client';
import { motion } from 'framer-motion';
import { Trophy, Plane, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Image from 'next/image';

const PartnershipHighlightSection = () => {
  return (
    <section className="py-32 px-4 bg-gradient-to-br from-black/40 to-purple-900/20">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Card className="p-12 bg-gradient-to-br from-black/60 to-purple-900/40 backdrop-blur-xl border border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 group relative overflow-hidden">
            {/* Limited Time Badge */}
            <motion.div
              animate={{ pulse: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute top-6 right-6 bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-2 rounded-full font-bold text-sm flex items-center gap-2"
            >
              <Clock className="w-4 h-4" />
              LIMITED TIME
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Content */}
              <div>
                <h3 className="text-4xl md:text-5xl font-black text-white mb-8 leading-tight">
                  Exclusive Raffle for
                  <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                    StormFox SC Cardholders
                  </span>
                </h3>

                <div className="space-y-6 mb-8">
                  <div className="flex items-center gap-4 text-lg text-gray-300">
                    <Trophy className="w-6 h-6 text-yellow-400" />
                    <span>1x ticket to the upcoming match in Paris</span>
                  </div>
                  <div className="flex items-center gap-4 text-lg text-gray-300">
                    <Plane className="w-6 h-6 text-blue-400" />
                    <span>Flight package included</span>
                  </div>
                  <div className="flex items-center gap-4 text-lg text-gray-300">
                    <MapPin className="w-6 h-6 text-green-400" />
                    <span>Hotel accommodation covered</span>
                  </div>
                </div>

                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white border-0 px-12 py-6 text-xl font-bold rounded-full group-hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-cyan-500/25"
                >
                  Enter Raffle Now
                </Button>
              </div>

              {/* Visual */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="aspect-square bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl p-8 backdrop-blur-sm border border-white/10 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/10 rounded-3xl" />

                  {/* Paris Eiffel Tower representation */}
                  <div className="relative w-full h-full flex items-center justify-center">
                    <div className="text-8xl">🏆</div>
                    <Image
                      src="/StormfoxFC.png"
                      alt="StormFox SC Logo"
                      width={300}
                      height={300}
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    />

                    {/* Floating elements */}
                    <motion.div
                      animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
                      transition={{ duration: 4, repeat: Infinity }}
                      className="absolute top-8 right-8 text-3xl"
                    >
                      ✈️
                    </motion.div>
                    <motion.div
                      animate={{ y: [0, 15, 0], rotate: [0, -10, 0] }}
                      transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                      className="absolute bottom-8 left-8 text-3xl"
                    >
                      🏨
                    </motion.div>
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                      className="absolute top-1/2 left-8 text-2xl"
                    >
                      🎫
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default PartnershipHighlightSection;
