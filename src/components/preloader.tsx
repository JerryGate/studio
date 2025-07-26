
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
      <motion.div
        className="relative h-24 w-24"
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
    </motion.div>
  );
};

export default Preloader;
