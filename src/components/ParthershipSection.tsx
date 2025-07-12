
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";

const PartnershipSection = () => {
  return (
    <section className="py-32 px-4 bg-black/10">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Powering the Future of <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Fan Engagement</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Card className="p-12 bg-gradient-to-r from-black/40 to-black/20 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300 group">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Partnership content */}
              <div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="mb-8"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                      ArenaCollectiblez
                    </div>
                    <div className="text-2xl text-white">×</div>
                    <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                      Podasai
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Revolutionary Sports Tech Partnership
                  </h3>
                  
                  <p className="text-gray-300 text-lg leading-relaxed mb-8">
                    Combining cutting-edge AI technology with blockchain innovation to create 
                    the ultimate fan experience. Every ticket becomes a gateway to exclusive 
                    digital collectibles powered by advanced algorithms.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white border-0 px-8 py-3 text-lg font-semibold rounded-full group-hover:scale-105 transition-all duration-300"
                  >
                    Discover Partnership
                    <ArrowRight className="w-5 h-5 ml-3" />
                  </Button>
                </motion.div>
              </div>

              {/* Partnership visual */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="aspect-square bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-3xl p-8 backdrop-blur-sm border border-white/10">
                  <div className="w-full h-full bg-gradient-to-br from-purple-600/30 to-blue-600/30 rounded-2xl flex items-center justify-center relative overflow-hidden">
                    {/* Placeholder for partnership image */}
                    <div className="text-6xl text-white/50 font-bold">
                      <Image
                        src="/podasai.png"
                        alt="Partnership Visual"
                        width={300}
                        height={300}
                        className="object-cover rounded-2xl"
                      />
                    </div>
                    
                    {/* Floating elements */}
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="absolute top-4 right-4 w-8 h-8 bg-purple-500/50 rounded-full"
                    />
                    <motion.div
                      animate={{ y: [0, 10, 0] }}
                      transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
                      className="absolute bottom-4 left-4 w-6 h-6 bg-blue-500/50 rounded-full"
                    />
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

export default PartnershipSection;