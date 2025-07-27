
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import React, { useMemo } from 'react';

interface LogoProps {
  className?: string;
  textClassName?: string;
  iconSize?: string;
  textSize?: string;
  center?: boolean;
  variant?: 'default' | 'preloader';
}

const LightningBolt = ({ rotation, delay, color }: { rotation: number; delay: number; color: string }) => (
    <motion.div
        className="absolute w-full h-full"
        style={{ rotate: rotation }}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: [0, 1, 0.5, 1, 0], scale: [0.5, 1, 1, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity, delay, ease: "easeInOut" }}
    >
        <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M50 0 V 30 L 40 40 L 60 60 L 50 70 V 100" />
        </svg>
    </motion.div>
);

const AnimatedPill = ({ variant }: { variant: 'default' | 'preloader' }) => {
    const isPreloader = variant === 'preloader';

    return (
        <div className="relative flex items-center justify-center w-full h-full">
            {/* Lightning for Preloader */}
            {isPreloader && (
                <>
                    <LightningBolt rotation={0} delay={0} color="#FF00FF" />
                    <LightningBolt rotation={120} delay={0.5} color="#00FFFF" />
                    <LightningBolt rotation={240} delay={1} color="#FF00FF" />
                </>
            )}

            {/* Central Pill */}
            <motion.div
                className="relative w-8 h-16 rounded-full flex items-center justify-center overflow-hidden"
                style={{
                     filter: isPreloader ? 'drop-shadow(0 0 15px hsl(var(--primary-hue), var(--primary-saturation), 50%))' : 'none',
                }}
            >
                <motion.div
                    className="absolute inset-0"
                    animate={isPreloader ? {
                        background: [
                            "radial-gradient(circle, hsl(180, 100%, 70%), hsl(220, 100%, 70%))",
                            "radial-gradient(circle, hsl(300, 100%, 70%), hsl(340, 100%, 70%))",
                            "radial-gradient(circle, hsl(80, 100%, 70%), hsl(120, 100%, 70%))",
                            "radial-gradient(circle, hsl(180, 100%, 70%), hsl(220, 100%, 70%))",
                        ]
                    } : {
                        background: 'hsl(var(--primary-hue), var(--primary-saturation), var(--primary-lightness))'
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                />
            </motion.div>
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
            <AnimatedPill variant={variant} />
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
