
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import React, { useState, useEffect } from 'react';

interface LogoProps {
  className?: string;
  textClassName?: string;
  iconSize?: string;
  textSize?: string;
  center?: boolean;
  variant?: 'default' | 'preloader';
}

const CaduceusIcon = ({ variant = 'default' }: { variant: 'default' | 'preloader' }) => {
  return (
    <motion.svg
      className="w-full h-full"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <defs>
        <motion.radialGradient
          id="caduceus-glow"
          cx="50%"
          cy="50%"
          r="50%"
          fx="50%"
          fy="50%"
        >
          <motion.stop
            offset="0%"
            stopColor="white"
            animate={{ stopOpacity: [0.8, 0.4, 0.8] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.stop
            offset="100%"
            stopColor="white"
            stopOpacity="0"
          />
        </motion.radialGradient>
      </defs>
      
      {/* Central staff */}
      <motion.path
        d="M12 2V22"
        stroke={variant === 'preloader' ? 'url(#caduceus-glow)' : 'hsl(var(--primary))'}
        animate={{
          filter: variant === 'preloader' 
            ? ['drop-shadow(0 0 2px #a5f3fc)', 'drop-shadow(0 0 5px #99f6e4)', 'drop-shadow(0 0 2px #a5f3fc)']
            : 'none'
        }}
         transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
      
      {/* Wings */}
      <motion.path
        d="M19 6.84a5.5 5.5 0 0 0-11.23 2.16l1.73 6a5.5 5.5 0 0 0 10.74 0l1.73-6A5.5 5.5 0 0 0 19 6.84Z"
        stroke={variant === 'preloader' ? '#a5f3fc' : 'hsl(var(--primary))'}
         animate={{
          filter: variant === 'preloader' 
            ? ['drop-shadow(0 0 2px #a5f3fc)', 'drop-shadow(0 0 5px #99f6e4)', 'drop-shadow(0 0 2px #a5f3fc)']
            : 'none'
        }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      />
      
      {/* Snakes */}
      <motion.path
        d="M5 18s2.6-4 7-4 7 4 7 4"
        stroke={variant === 'preloader' ? '#99f6e4' : 'hsl(var(--primary))'}
         animate={{
          filter: variant === 'preloader' 
            ? ['drop-shadow(0 0 2px #a5f3fc)', 'drop-shadow(0 0 5px #99f6e4)', 'drop-shadow(0 0 2px #a5f3fc)']
            : 'none'
        }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />
      <motion.path
        d="M5 12s2.6 4 7 4 7-4 7-4"
        stroke={variant === 'preloader' ? '#99f6e4' : 'hsl(var(--primary))'}
         animate={{
          filter: variant === 'preloader' 
            ? ['drop-shadow(0 0 2px #a5f3fc)', 'drop-shadow(0 0 5px #99f6e4)', 'drop-shadow(0 0 2px #a5f3fc)']
            : 'none'
        }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
      />
    </motion.svg>
  );
};


const Particles = ({ count, variant }: { count: number, variant: 'default' | 'preloader' }) => {
    const [particles, setParticles] = useState<any[]>([]);

    useEffect(() => {
        // Generate particles only on the client-side
        setParticles(
            Array.from({ length: count }).map((_, i) => ({
                id: i,
                angle: (i / count) * 360,
                distance: 45 + Math.random() * 5,
                size: variant === 'preloader' ? 1 + Math.random() * 2 : 1 + Math.random() * 1.5,
                duration: 4 + Math.random() * 4,
                delay: Math.random() * 4,
            }))
        );
    }, [count, variant]);

    if (particles.length === 0) {
        return null;
    }

    return (
        <div className="absolute inset-0">
            {particles.map(p => (
                <motion.div
                    key={p.id}
                    className="absolute rounded-full bg-white/50"
                    style={{
                        width: p.size,
                        height: p.size,
                        top: '50%',
                        left: '50%',
                        translateX: '-50%',
                        translateY: '-50%',
                        filter: 'blur(1px)',
                    }}
                    animate={{
                        x: [0, p.distance, 0, -p.distance, 0],
                        y: [p.distance, 0, -p.distance, 0, p.distance],
                        scale: [1, 1.2, 1, 0.8, 1],
                        opacity: [0.5, 1, 0.5, 1, 0.5],
                    }}
                    transition={{
                        duration: p.duration,
                        delay: p.delay,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />
            ))}
        </div>
    );
};

const Logo = ({ className, textClassName, iconSize = 'h-10 w-10', textSize = 'text-2xl', center = false, variant = 'default' }: LogoProps) => {
  return (
    <Link href="/" passHref>
      <div className={cn(
        "flex items-center gap-3 cursor-pointer group",
        center && 'justify-center',
        className
      )}>
        <div className={cn("relative", iconSize)}>
           <div className="relative w-full h-full text-primary">
             {variant === 'preloader' && <Particles count={15} variant={variant} />}
             <motion.div
                className="w-full h-full"
                animate={variant === 'preloader' ? { scale: [1, 1.05, 1] } : {}}
                transition={variant === 'preloader' ? { duration: 2, repeat: Infinity, ease: 'easeInOut' } : {}}
             >
                <CaduceusIcon variant={variant} />
             </motion.div>
           </div>
        </div>
        <span className={cn(
          "font-bold font-headline hidden sm:inline transition-all duration-300",
           variant === 'default' ? "text-primary group-hover:animated-gradient-text" : "text-white/90 [text-shadow:0_0_8px_rgba(255,255,255,0.5)]",
          textSize,
          textClassName
        )}>
          E-pharma
        </span>
      </div>
    </Link>
  );
};

export default Logo;

