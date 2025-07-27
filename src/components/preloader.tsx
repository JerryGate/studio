
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
            // Use a timeout to defer the state update in the parent component
            setTimeout(onComplete, 0); 
            return 100;
          }
          return prev + 1;
        });
      }, 45); // Adjusted to roughly match the 5s duration
  
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
        duration: 4 + Math.random() * 4,
        delay: Math.random() * 4,
        rotation: -45 + Math.random() * 90,
    })), []);
    
    const numRipples = 10;
    const ripples = useMemo(() => Array.from({length: numRipples}).map((_, i) => ({
        id: i,
        delay: i * 0.4
    })), [])

    return (
        <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: isComplete ? 0 : 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gray-900 overflow-hidden"
        >
            {/* Glassmorphism layer */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/20 via-black/30 to-amber-900/20 backdrop-blur-sm"></div>
            
            {/* Cascading pills */}
            {pills.map(pill => (
                <motion.div
                    key={pill.id}
                    className="absolute w-2 h-5 bg-white/30 rounded-full"
                    style={{
                        left: `${pill.x}%`,
                        top: `${pill.y}%`,
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
                        className="absolute rounded-full border-2 border-primary/50"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: [0, 2, 2], opacity: [1, 0, 0] }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: 'easeOut',
                            delay: ripple.delay
                        }}
                        style={{ width: '100%', height: '100%' }}
                    />
                ))}

                {/* Central Icon with glow */}
                <motion.div
                    className="relative h-24 w-24 bg-primary/20 rounded-full flex items-center justify-center shadow-2xl"
                    style={{
                        boxShadow: '0 0 20px hsl(var(--primary-hue), 80%, 60%), 0 0 40px hsl(var(--primary-hue), 80%, 60%)'
                    }}
                    animate={{ 
                        scale: [1, 1.05, 1],
                        rotateY: [0, 180, 360],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                >
                    <HeartPulse className="h-12 w-12 text-white" />
                </motion.div>
            </div>

            <div className="absolute bottom-16 text-center space-y-4">
                 <div className="flex justify-center">
                     <ProgressCounter onComplete={() => setIsComplete(true)} />
                </div>
            </div>
        </motion.div>
    );
};

export default Preloader;
