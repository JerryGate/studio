
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { HeartPulse } from 'lucide-react';
import { useEffect, useState } from 'react';

const AnimatedText = ({ text }: { text: string }) => {
    const letters = Array.from(text);
  
    const container = {
      hidden: { opacity: 0 },
      visible: (i = 1) => ({
        opacity: 1,
        transition: { staggerChildren: 0.05, delayChildren: i * 0.04 },
      }),
    };
  
    const child = {
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          type: "spring",
          damping: 12,
          stiffness: 100,
        },
      },
      hidden: {
        opacity: 0,
        y: 20,
        transition: {
          type: "spring",
          damping: 12,
          stiffness: 100,
        },
      },
    };
  
    return (
      <motion.div
        className="flex justify-center items-center text-xl sm:text-2xl md:text-3xl font-bold text-primary"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {letters.map((letter, index) => (
          <motion.span variants={child} key={index}>
            {letter === " " ? "\u00A0" : letter}
          </motion.span>
        ))}
      </motion.div>
    );
};

const ProgressCounter = ({ onComplete }: { onComplete: () => void }) => {
    const [progress, setProgress] = useState(0);
  
    useEffect(() => {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            onComplete();
            return 100;
          }
          return prev + 1;
        });
      }, 25); // Adjust time to match 3s total duration
  
      return () => clearInterval(interval);
    }, [onComplete]);
  
    return (
        <div className="font-mono text-lg font-medium text-primary">
            {progress}%
        </div>
    );
};


const Preloader = () => {
    const [isComplete, setIsComplete] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
    >
        <div className="relative flex items-center justify-center h-48 w-48 sm:h-64 sm:w-64">
            {/* Animated Rings */}
            {[...Array(4)].map((_, i) => (
                 <motion.div
                    key={i}
                    className="absolute rounded-full"
                    style={{
                        borderStyle: 'solid',
                        borderWidth: '2px',
                        borderColor: `hsl(var(--primary-hue), var(--primary-saturation), calc(var(--primary-lightness) + ${i*5}%))`,
                    }}
                    initial={{ scale: 0, opacity: 0.8 }}
                    animate={{ scale: 1, opacity: 0 }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear",
                        delay: i * 0.5,
                    }}
                />
            ))}

             {/* Central Icon */}
            <motion.div
                className="relative h-20 w-20 sm:h-24 sm:w-24 bg-primary/10 rounded-full flex items-center justify-center shadow-lg"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            >
                <HeartPulse className="h-10 w-10 sm:h-12 sm:w-12 text-primary" />
            </motion.div>
        </div>

        <div className="mt-8 text-center space-y-4">
            <AnimatedText text="E-pharma Nigeria" />
             <div className="flex justify-center">
                 <ProgressCounter onComplete={() => setIsComplete(true)} />
            </div>
        </div>
    </motion.div>
  );
};

export default Preloader;
