
'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import Logo from './logo';

const ProgressCounter = ({ onComplete }: { onComplete: () => void }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    onComplete();
                    return 100;
                }
                const diff = Math.random() * 10;
                return Math.min(prev + diff, 100);
            });
        }, 100);
        return () => clearInterval(interval);
    }, [onComplete]);

    return (
        <div className="text-6xl font-bold font-headline text-white" style={{ textShadow: '0 0 15px hsla(var(--primary-hue), var(--primary-saturation), var(--primary-lightness), 0.5)' }}>
            {Math.floor(progress)}%
        </div>
    );
};

const Circle = ({ delay, size, gradientFrom, gradientTo, isSubtle = false }: { delay: number; size: number; gradientFrom: string; gradientTo: string; isSubtle?: boolean }) => {
    const animation = {
        scale: [1, 1.1, 1],
        opacity: isSubtle ? [0.2, 0.4, 0.2] : [0.5, 1, 0.5],
    };
    return (
        <motion.div
            className="absolute rounded-full"
            style={{
                width: `${size}rem`,
                height: `${size}rem`,
                background: `radial-gradient(circle, ${gradientFrom}, ${gradientTo})`,
                boxShadow: `0 0 ${size/2}rem ${gradientFrom}`,
                filter: `blur(${isSubtle ? 2 : 1}px)`,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={animation}
            transition={{
                delay,
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
            }}
        />
    );
};

const GlitchText = ({ text, className }: { text: string; className?: string }) => {
  return (
    <div className={cn("relative font-headline tracking-widest uppercase", className)}>
      <span className="relative z-10">{text}</span>
      <span aria-hidden="true" className="absolute top-0 left-0 z-0 text-cyan-400/80 mix-blend-screen animate-pulse">{text}</span>
      <span aria-hidden="true" className="absolute top-0 left-0 z-0 text-magenta-500/80 mix-blend-screen animate-pulse" style={{ animationDelay: '0.1s' }}>{text}</span>
    </div>
  );
};


export function Preloader() {
    const [isComplete, setIsComplete] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5, ease: 'easeInOut' } }}
            className="fixed inset-0 z-[200] flex flex-col items-center justify-center"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-gray-900 to-teal-900 animate-[gradient-shift_15s_ease_infinite]"
              style={{
                backgroundSize: '400% 400%',
              }}
            />
            <div className="absolute inset-0 bg-[url('/holographic-grid.svg')] opacity-10 animate-pulse" />

            <div className="relative flex items-center justify-center w-64 h-64 md:w-96 md:h-96">
                <Circle delay={0} size={24} gradientFrom="hsla(var(--primary-hue), var(--primary-saturation), var(--primary-lightness), 0.3)" gradientTo="transparent" />
                <Circle delay={0.5} size={32} gradientFrom="hsla(var(--accent-hue), var(--accent-saturation), var(--accent-lightness), 0.2)" gradientTo="transparent" isSubtle />
                <Circle delay={1} size={40} gradientFrom="hsla(var(--primary-hue), var(--primary-saturation), var(--primary-lightness), 0.1)" gradientTo="transparent" isSubtle />

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                >
                  <Logo variant="preloader" iconSize="h-32 w-32" textSize="text-5xl" />
                </motion.div>
            </div>
            <div className="mt-8 text-center">
                 <ProgressCounter onComplete={() => setIsComplete(true)} />
                 <GlitchText text="Loading Resources" className="text-white/80 mt-4 text-sm" />
            </div>
        </motion.div>
    );
}

// Add keyframes to globals.css if not present
const css = `
@keyframes gradient-shift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
`;

if (typeof window !== 'undefined') {
    const style = document.createElement('style');
    style.innerHTML = css;
    document.head.appendChild(style);
}
