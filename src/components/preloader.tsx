
'use client';

import { motion } from 'framer-motion';
import Logo from './logo';

const Preloader = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0.5 }}
        animate={{ scale: [0.9, 1, 0.9], opacity: [0.7, 1, 0.7] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <Logo iconSize="h-16 w-16" textSize="text-6xl" textClassName="inline" />
      </motion.div>
    </motion.div>
  );
};

export default Preloader;
