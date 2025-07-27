
'use client';

import { motion } from 'framer-motion';
import { useEffect, useState, useMemo, memo } from 'react';
import Logo from './logo';
import { cn } from '@/lib/utils';

const ProgressCounter = memo(function ProgressCounter({ onComplete }: { onComplete: () => void }) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    // Use a timeout to avoid the 'cannot update during render' error
                    setTimeout(onComplete, 0); 
                    return 100;
                }
                return prev + 1;
            });
        }, 28);

        return () => clearInterval(interval);
    }, [onComplete]);

    return (
        <div 
            className="font-mono text-3xl font-bold text-white/90"
            style={{textShadow: '0 0 10px rgba(255, 255, 255, 0.7)'}}
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
        // Generate pill properties only on the client to avoid hydration mismatch
        setPills(Array.from({ length: 50 }).map((_, i) => ({
            id: i,
            x: `${Math.random() * 100}%`,
            initialY: `-${Math.random() * 100}%`, // Start above the screen
            duration: 2 + Math.random() * 3,
            delay: Math.random() * 2,
            rotation: Math.random() * 180 - 90,
            colors: [
                `hsl(${180 + Math.random() * 60}, 100%, 70%)`, // Blues/Cyans
                `hsl(${300 + Math.random() * 60}, 100%, 70%)`, // Pinks/Magentas
                `hsl(${60 + Math.random() * 60}, 100%, 70%)`, // Greens/Limes
                `hsl(${240 + Math.random() * 60}, 100%, 70%)`, // Purples/Violets
            ],
        })));
    }, []);

    const onAnimationComplete = () => {
        setIsComplete(true);
    };

    return (
        <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: isComplete ? 0 : 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gray-900 overflow-hidden"
        >
             {/* Animated Gradient Background */}
            <motion.div
                className="absolute inset-0 z-0"
                animate={{
                     background: [
                        'radial-gradient(circle, hsl(270, 50%, 20%), hsl(240, 60%, 10%))',
                        'radial-gradient(circle, hsl(30, 80%, 30%), hsl(0, 60%, 15%))',
                        'radial-gradient(circle, hsl(180, 50%, 25%), hsl(210, 60%, 12%))',
                        'radial-gradient(circle, hsl(270, 50%, 20%), hsl(240, 60%, 10%))',
                    ]
                }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            />
            <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />

            {/* Falling Pills */}
            {pills.map((pill) => (
                <motion.div
                    key={`cascade-${pill.id}`}
                    className="absolute w-2 h-5 rounded-full"
                    style={{
                        left: pill.x,
                        top: pill.initialY,
                        filter: 'blur(1px)',
                    }}
                    animate={{
                        y: '120vh',
                        rotate: pill.rotation,
                        background: [
                            `linear-gradient(45deg, ${pill.colors[0]}, ${pill.colors[1]})`,
                            `linear-gradient(45deg, ${pill.colors[1]}, ${pill.colors[2]})`,
                            `linear-gradient(45deg, ${pill.colors[2]}, ${pill.colors[3]})`,
                            `linear-gradient(45deg, ${pill.colors[3]}, ${pill.colors[0]})`,
                        ]
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
                         background: {
                            duration: pill.duration / 2,
                            repeat: Infinity,
                            ease: 'easeInOut',
                            delay: pill.delay,
                        }
                    }}
                />
            ))}

            <div className="relative z-10 flex flex-col items-center justify-center gap-8">
                <Logo variant="preloader" iconSize='h-48 w-48' />
                <ProgressCounter onComplete={onAnimationComplete} />
            </div>
        </motion.div>
    );
};

export default Preloader;
