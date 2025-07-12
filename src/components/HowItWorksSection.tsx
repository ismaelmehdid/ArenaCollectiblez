'use client';
import { motion } from 'framer-motion';
import { Gift, Scan, Star } from 'lucide-react';

const steps = [
  {
    icon: Scan,
    title: 'Scan Ticket',
    description:
      'Point your phone at any stadium ticket QR code to get started',
  },
  {
    icon: Gift,
    title: 'Receive Loot Box',
    description:
      'Instantly receive a mystery loot box with your unique collectible inside',
  },
  {
    icon: Star,
    title: 'Get Exclusive NFT',
    description:
      'Discover rare digital memorabilia with different rarity levels and values',
  },
];

const HowItWorksSection = () => {
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
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            How It Works
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Three simple steps to turn your ticket into treasure
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-12 relative">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center group relative"
            >
              {/* Step number */}
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                {index + 1}
              </div>

              {/* Icon container */}
              <div className="relative mx-auto w-32 h-32 mb-8">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-3xl group-hover:from-purple-500/30 group-hover:to-pink-500/30 transition-all duration-300" />
                <div className="relative w-full h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                  <step.icon className="w-16 h-16 text-white" />
                </div>
              </div>

              {/* Content */}
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                {step.title}
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed max-w-sm mx-auto">
                {step.description}
              </p>

              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-full w-12 h-0.5 bg-gradient-to-r from-purple-500/50 to-transparent" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
