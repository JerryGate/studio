
'use client';

import { motion } from 'framer-motion';
import { useEffect, useState, useMemo } from 'react';
import Logo from './logo';

function ProgressCounter({ onComplete }: { onComplete: () => void }) {
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
        }, 25); 

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
};
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
            gradient: [
                ['#ff007f', '#ff7f00'],
                ['#7f00ff', '#ff00ff'],
                ['#00ff7f', '#ffff00'],
                ['#007fff', '#00ffff'],
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
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gray-900 overflow-hidden"
        >
            <div className="absolute inset-0 bg-white/10 backdrop-blur-md" />
            
            {pills.map((pill) => (
                <motion.div
                    key={`cascade-${pill.id}`}
                    className={`absolute w-3 h-6 rounded-full`}
                    style={{
                        left: pill.x,
                        top: pill.initialY,
                        scale: pill.scale,
                    }}
                    animate={{
                        y: '120vh',
                        rotate: pill.rotation,
                        background: `linear-gradient(45deg, ${pill.gradient[0]}, ${pill.gradient[1]})`,
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
                            duration: 2,
                            repeat: Infinity,
                            repeatType: 'mirror'
                        }
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
