
'use client';

import { motion } from 'framer-motion';
import { HeartPulse } from 'lucide-react';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

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
        className="flex justify-center items-center text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-wider"
        variants={container}
        initial="hidden"
        animate="visible"
        style={{textShadow: '0 2px 4px rgba(0,0,0,0.3)'}}
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
            setTimeout(onComplete, 0);
            return 100;
          }
          return prev + 1;
        });
      }, 25);
  
      return () => clearInterval(interval);
    }, [onComplete]);
  
    return (
        <div className="font-mono text-lg font-medium text-white/80">
            {progress}%
        </div>
    );
};


const Preloader = () => {
    const [isComplete, setIsComplete] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: isComplete ? 0 : 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gradient-to-br from-primary via-primary to-accent"
    >
        <div className="relative flex items-center justify-center h-48 w-48 sm:h-64 sm:w-64">
             {/* Animated streaks */}
             {[...Array(8)].map((_, i) => (
                <motion.div
                    key={`streak-${i}`}
                    className="absolute w-1 h-full origin-center"
                    style={{
                        background: 'linear-gradient(to bottom, transparent, hsl(var(--accent-hue), var(--accent-saturation), 80%), transparent)',
                        rotate: `${i * 45}deg`
                    }}
                    initial={{ scaleY: 0, opacity: 0 }}
                    animate={{ scaleY: [0, 1, 0], opacity: [0, 0.7, 0] }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.1,
                    }}
                />
            ))}

            {/* Pulsating background circles */}
            {[...Array(3)].map((_, i) => (
                 <motion.div
                    key={`pulse-${i}`}
                    className="absolute rounded-full bg-white/10"
                    initial={{ scale: 0, opacity: 0.5 }}
                    animate={{ scale: 1.5, opacity: 0 }}
                    transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "easeOut",
                        delay: i * 0.4,
                    }}
                />
            ))}

            {/* Central Icon */}
            <motion.div
                className="relative h-20 w-20 sm:h-24 sm:w-24 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-2xl"
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
