'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Scan, Gift, Trophy, ArrowRight } from 'lucide-react';

const steps = [
  {
    icon: Scan,
    title: 'SCAN',
    description: 'Sports ticket QR code or special codes',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Gift,
    title: 'Receive Loot Box',
    description: 'Unlock exclusive rewards and collectibles',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Trophy,
    title: 'Collect',
    description: 'Win exclusive prizes and rare collectibles',
    color: 'from-orange-500 to-red-500',
  },
];

type Particle = {
  id: string;
  left: string;
  top: string;
  x: number[];
  y: number[];
  duration: number;
};

const HowItWorksSection = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const newParticles: Particle[] = Array.from({ length: 12 }).map(() => {
      const id = crypto.randomUUID();
      const left = `${Math.random() * 100}%`;
      const top = `${Math.random() * 100}%`;
      const x = [Math.random() * 100, Math.random() * 100];
      const y = [Math.random() * 100, Math.random() * 100];
      const duration = Math.random() * 10 + 5;

      return { id, left, top, x, y, duration };
    });

    setParticles(newParticles);
  }, []);

  return (
    <section
      id="how-it-works"
      className="min-h-screen flex items-center justify-center py-32 px-4 bg-gradient-to-br from-slate-900/50 to-purple-900/30 backdrop-blur-sm snap-start"
    >
      <div className="container mx-auto max-w-7xl relative">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <h2 className="text-7xl md:text-8xl font-black text-white mb-8 tracking-tight">
            How It Works
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-16 relative">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.3, duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center group relative"
            >
              <div
                className={`absolute -top-8 -left-8 w-16 h-16 bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center text-white font-black text-2xl z-10`}
              >
                {index + 1}
              </div>

              <div className="relative mx-auto w-48 h-48 mb-12">
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${step.color} rounded-full opacity-20 group-hover:opacity-40 transition-all duration-500 animate-pulse`}
                />
                <motion.div
                  className={`relative w-full h-full bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-2xl`}
                  whileHover={{ rotate: 5 }}
                >
                  <step.icon className="w-24 h-24 text-white" />
                </motion.div>
              </div>

              <h3 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
                {step.title}
              </h3>
              <p className="text-gray-300 text-xl leading-relaxed max-w-xs mx-auto">
                {step.description}
              </p>

              {index < steps.length - 1 && (
                <motion.div
                  className="hidden md:block absolute top-24 left-full transform translate-x-8"
                  animate={{ x: [0, 10, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  <ArrowRight className="w-12 h-12 text-purple-400 opacity-60" />
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Floating particles */}
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-2 h-2 bg-purple-400 rounded-full opacity-30"
            animate={{
              x: particle.x,
              y: particle.y,
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              ease: 'linear',
            }}
            style={{
              left: particle.left,
              top: particle.top,
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default HowItWorksSection;
