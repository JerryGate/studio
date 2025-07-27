'use client';

import { motion } from 'framer-motion';
import { useEffect, useState, useMemo, memo } from 'react';
import Logo from './logo';

const ProgressCounter = memo(function ProgressCounter({ onComplete }: { onComplete: () => void }) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(onComplete, 300); 
                    return 100;
                }
                return prev + 1;
            });
        }, 25); // ~2.5 seconds to complete

        return () => clearInterval(interval);
    }, [onComplete]);

    return (
        <div 
            className="font-sans text-xl font-medium text-white/80"
            style={{textShadow: '0 0 8px rgba(255, 255, 255, 0.5)'}}
        >
            {progress}%
        </div>
    );
});
ProgressCounter.displayName = 'ProgressCounter';

const Preloader = () => {
    const [isComplete, setIsComplete] = useState(false);
    const [pills, setPills] = useState<any[]>([]);

    useEffect(() => {
        setPills(Array.from({ length: 40 }).map((_, i) => ({
            id: i,
            x: `${5 + Math.random() * 90}%`,
            initialY: `-${20 + Math.random() * 80}%`,
            duration: 3 + Math.random() * 3,
            delay: Math.random() * 2,
            rotation: Math.random() * 40 - 20,
            scale: 0.5 + Math.random() * 0.5,
            colors: [
                'bg-blue-200/50',
                'bg-green-200/50',
                'bg-rose-200/50',
                'bg-teal-200/50'
            ][i % 4]
        })));
    }, []);

    const onAnimationComplete = () => {
        setIsComplete(true);
    };

    return (
        <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: isComplete ? 0 : 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gradient-to-br from-[#0c1a3a] to-[#e0e0e0] overflow-hidden"
        >
            <div className="absolute inset-0 bg-white/10 backdrop-blur-md" />
            
            {pills.map((pill) => (
                <motion.div
                    key={`cascade-${pill.id}`}
                    className={`absolute w-3 h-6 rounded-full ${pill.colors}`}
                    style={{
                        left: pill.x,
                        top: pill.initialY,
                        scale: pill.scale,
                    }}
                    animate={{
                        y: '120vh',
                        rotate: pill.rotation,
                    }}
                    transition={{
                        y: {
                            duration: pill.duration,
                            delay: pill.delay,
                            repeat: Infinity,
                            ease: 'linear'
                        },
                        rotate: {
                            duration: pill.duration * 2,
                            delay: pill.delay,
                            repeat: Infinity,
                            ease: 'linear'
                        },
                    }}
                />
            ))}
            
            <div className="relative z-10 flex flex-col items-center justify-center gap-8">
                <Logo variant="preloader" iconSize='h-32 w-32' />
                <ProgressCounter onComplete={onAnimationComplete} />
            </div>
        </motion.div>
    );
};

export default Preloader;
