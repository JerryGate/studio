
'use client';

import { motion } from 'framer-motion';
import { HeartPulse } from 'lucide-react';
import { useEffect, useState, useMemo } from 'react';

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
      }, 28); 
  
      return () => clearInterval(interval);
    }, [onComplete]);
  
    return (
        <div 
            className="font-mono text-xl font-medium text-white/80"
            style={{textShadow: '0 0 8px rgba(255, 255, 255, 0.5)'}}
        >
            {progress}%
        </div>
    );
};


const Preloader = () => {
    const [isComplete, setIsComplete] = useState(false);

    const numPills = 50;
    const pills = useMemo(() => Array.from({ length: numPills }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: -10 - Math.random() * 100,
        duration: 2 + Math.random() * 3,
        delay: Math.random() * 2,
        rotation: -45 + Math.random() * 90,
    })), []);
    
    const numRipples = 10;
    const ripples = useMemo(() => Array.from({length: numRipples}).map((_, i) => ({
        id: i,
        delay: i * 0.3
    })), [])

    return (
        <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: isComplete ? 0 : 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gray-900 overflow-hidden"
            style={{
                background: 'linear-gradient(-45deg, #0f0c29, #302b63, #24243e, #141E30, #243B55)',
                backgroundSize: '400% 400%',
                animation: 'gradientBG 15s ease infinite'
            }}
        >
            {/* Cascading pills */}
            {pills.map(pill => (
                <motion.div
                    key={pill.id}
                    className="absolute w-2 h-5 bg-white/30 rounded-full"
                    style={{
                        left: `${pill.x}%`,
                        top: `${pill.y}%`,
                        filter: 'blur(1px)'
                    }}
                    animate={{
                        y: '120vh',
                        rotate: pill.rotation
                    }}
                    transition={{
                        duration: pill.duration,
                        delay: pill.delay,
                        repeat: Infinity,
                        ease: 'linear'
                    }}
                />
            ))}
            
            {/* Central Icon and ripples */}
            <div className="relative flex items-center justify-center h-48 w-48">
                {/* Ripples */}
                {ripples.map(ripple => (
                    <motion.div
                        key={ripple.id}
                        className="absolute rounded-full border-2"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: [0, 2, 2], opacity: [1, 0, 0] }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: 'easeOut',
                            delay: ripple.delay
                        }}
                        style={{ 
                            width: '100%', 
                            height: '100%',
                            borderColor: `hsl(${ripple.id * 36}, 100%, 70%)`
                        }}
                    />
                ))}

                {/* Central Icon with glow */}
                <motion.div
                    className="relative h-24 w-24 rounded-full flex items-center justify-center"
                    animate={{ 
                        scale: [1, 1.05, 1],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                >
                    <HeartPulse className="h-12 w-12 text-white" style={{
                        filter: `
                            drop-shadow(0 0 5px hsl(224, 100%, 80%)) 
                            drop-shadow(0 0 10px hsl(224, 100%, 80%))
                            drop-shadow(0 0 15px hsl(160, 100%, 70%))
                        `
                    }}/>
                </motion.div>
            </div>
            
            <div className="absolute bottom-16 text-center space-y-4">
                 <div className="flex justify-center">
                     <ProgressCounter onComplete={() => setIsComplete(true)} />
                </div>
            </div>

            <style jsx global>{`
                @keyframes gradientBG {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
            `}</style>
        </motion.div>
    );
};

export default Preloader;
