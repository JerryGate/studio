
'use client';

import { motion } from 'framer-motion';
import { HeartPulse } from 'lucide-react';

const Preloader = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
    >
      <div className="relative flex items-center justify-center">
        {/* Pulsating Waves */}
        {[...Array(3)].map((_, i) => (
            <motion.div
                key={i}
                className="absolute rounded-full border border-primary/30"
                initial={{ scale: 0, opacity: 1 }}
                animate={{
                    scale: 3,
                    opacity: 0,
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.75, // Stagger the start of each wave
                }}
            />
        ))}

        {/* Central Icon */}
        <motion.div
            className="relative h-20 w-20 bg-primary/10 rounded-full flex items-center justify-center"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: 'easeInOut',
            }}
        >
            <HeartPulse className="h-10 w-10 text-primary" />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Preloader;
