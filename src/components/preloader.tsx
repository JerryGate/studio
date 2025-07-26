
'use client';

import { motion } from 'framer-motion';

const Preloader = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-primary"
    >
      <div className="relative flex items-center justify-center">
        {/* Pulsating Waves */}
        {[...Array(4)].map((_, i) => (
            <motion.div
                key={i}
                className="absolute rounded-full border border-primary-foreground/30"
                initial={{ scale: 0, opacity: 1, width: '112px', height: '112px' }}
                animate={{
                    scale: 2.5,
                    opacity: 0,
                }}
                transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.6, // Stagger the start of each wave
                }}
            />
        ))}

        <motion.div
            className="relative h-28 w-28"
            animate={{ scale: [1, 1.2, 1], rotate: 360 }}
            transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: 'easeInOut',
            }}
            >
            {/* Outer circle */}
            <motion.div
                className="absolute inset-0 rounded-full border-2 border-primary-foreground/50"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            />
            {/* Middle circle */}
            <motion.div
                className="absolute inset-2 rounded-full border-2 border-primary-foreground/70"
                animate={{ rotate: -360 }}
                transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
            />
            {/* Inner circle */}
            <motion.div
                className="absolute inset-4 rounded-full border-2 border-primary-foreground"
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            />
        </motion.div>
        <motion.span
            className="absolute font-headline font-extrabold text-5xl whitespace-nowrap animated-gradient-text"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1.2 }}
            transition={{
                delay: 1,
                duration: 0.8,
                ease: "circOut"
            }}
        >
          E-pharma
        </motion.span>
      </div>
    </motion.div>
  );
};

export default Preloader;
