
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
        <div className="font-sans text-6xl font-bold text-white tabular-nums" style={{ textShadow: '0 0 15px hsla(var(--primary-hue), var(--primary-saturation), var(--primary-lightness), 0.5)' }}>
            {Math.floor(progress)}%
        </div>
    );
};

const ConcentricCircle = ({ delay, size, gradientFrom, gradientTo }: { delay: number; size: number; gradientFrom: string; gradientTo: string; }) => {
    const animation = {
        scale: [1, 1.15, 1],
        opacity: [0.7, 1, 0.7],
    };
    return (
        <motion.div
            className="absolute rounded-full"
            style={{
                width: `${size}rem`,
                height: `${size}rem`,
                background: `radial-gradient(circle, ${gradientFrom}, ${gradientTo})`,
                boxShadow: `0 0 ${size / 2}rem ${gradientFrom}`,
                filter: 'blur(2px)',
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

export function Preloader() {
    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5, ease: 'easeInOut' } }}
            className="fixed inset-0 z-[200] flex flex-col items-center justify-center"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-gray-900 to-teal-900 animate-[gradient-shift_15s_ease_infinite]"
              style={{
                backgroundSize: '400% 400%',
              }}
            />
            <div className="absolute inset-0 bg-[url('/holographic-grid.svg')] opacity-10 animate-pulse" />

            <div className="relative z-10 flex flex-col items-center justify-center text-white">
                <div className="relative flex items-center justify-center w-64 h-64 md:w-96 md:h-96">
                    <ConcentricCircle delay={0} size={24} gradientFrom="hsla(var(--primary-hue), var(--primary-saturation), var(--primary-lightness), 0.3)" gradientTo="transparent" />
                    <ConcentricCircle delay={0.5} size={32} gradientFrom="hsla(var(--accent-hue), var(--accent-saturation), var(--accent-lightness), 0.2)" gradientTo="transparent" />
                    <ConcentricCircle delay={1} size={40} gradientFrom="hsla(var(--primary-hue), var(--primary-saturation), var(--primary-lightness), 0.1)" gradientTo="transparent" />
                </div>
                 <h1 className="text-6xl font-extrabold font-headline animated-gradient-text -mt-24 mb-12" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>
                    E-pharma
                </h1>
                <div className="text-center">
                    <ProgressCounter onComplete={() => {}} />
                    <p className="text-white/80 mt-4 text-sm font-headline tracking-widest uppercase">Loading Resources</p>
                </div>
            </div>
        </motion.div>
    );
}


if (typeof window !== 'undefined') {
    const css = `
    @keyframes gradient-shift {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    `;
    const style = document.createElement('style');
    style.innerHTML = css;
    document.head.appendChild(style);
}
