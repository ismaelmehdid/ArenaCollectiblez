'use client';
import { motion } from "framer-motion";
import { Sparkles, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';

const CTASection = () => {
  const router = useRouter();

  return (
    <section className="py-32 px-4">
      <div className="container mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-8 leading-tight">
            Ready to Start
            <br />
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Collecting?
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto font-light">
            Join thousands of fans already collecting digital memories from their favorite games.
          </p>

          {/* Primary CTA */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <Button
              onClick={() => router.push("/redeem")}
              size="lg"
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 px-12 py-4 text-xl font-semibold rounded-full shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105"
            >
              <Sparkles className="w-6 h-6 mr-3" />
              Start Collecting Now
            </Button>
          </motion.div>

          {/* Secondary CTAs - simplified */}
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              viewport={{ once: true }}
              className="p-8 bg-black/10 backdrop-blur-xl border border-white/10 rounded-2xl hover:border-white/20 transition-all duration-300"
            >
              <Sparkles className="w-12 h-12 text-purple-400 mb-4 mx-auto" />
              <h3 className="text-xl font-bold text-white mb-3">For Fans</h3>
              <p className="text-gray-300 mb-4">Turn every game into a treasure hunt</p>
              <Button
                onClick={() => navigate("/redeem")}
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10"
              >
                Get Started
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              viewport={{ once: true }}
              className="p-8 bg-black/10 backdrop-blur-xl border border-white/10 rounded-2xl hover:border-white/20 transition-all duration-300"
            >
              <Users className="w-12 h-12 text-blue-400 mb-4 mx-auto" />
              <h3 className="text-xl font-bold text-white mb-3">For Teams</h3>
              <p className="text-gray-300 mb-4">Engage fans with digital collectibles</p>
              <Button
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10"
              >
                Learn More
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;