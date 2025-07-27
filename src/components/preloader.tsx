
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
            setTimeout(onComplete, 500); 
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
});


const Preloader = () => {
    const [isComplete, setIsComplete] = useState(false);
    
    return (
        <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: isComplete ? 0 : 1, transitionEnd: { display: 'none' } }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gray-900 overflow-hidden"
            style={{
                background: 'linear-gradient(-45deg, #0f0c29, #302b63, #24243e, #141E30, #243B55)',
                backgroundSize: '400% 400%',
                animation: 'gradientBG 15s ease infinite'
            }}
        >
            
            <div className="relative flex items-center justify-center h-48 w-48">
                <Logo variant="preloader" iconSize='h-48 w-48' />
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
