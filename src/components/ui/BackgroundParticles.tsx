'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export const BackgroundParticles = () => {
  const [particles, setParticles] = useState<JSX.Element[] | null>(null);

  useEffect(() => {
    const newParticles = Array.from({ length: 50 }).map((_, _i) => (
      <motion.div
        key={crypto.randomUUID()}
        className="absolute w-1 h-1 bg-white rounded-full opacity-20"
        animate={{
          x: [
            Math.random() * window.innerWidth,
            Math.random() * window.innerWidth,
          ],
          y: [
            Math.random() * window.innerHeight,
            Math.random() * window.innerHeight,
          ],
        }}
        transition={{
          duration: Math.random() * 20 + 10,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
      />
    ));
    setParticles(newParticles);
  }, []);

  return <div className="absolute inset-0">{particles}</div>;
};
