
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import React from 'react';
import { HeartPulse } from 'lucide-react';

interface LogoProps {
  className?: string;
  textClassName?: string;
  iconSize?: string;
  textSize?: string;
  center?: boolean;
  variant?: 'default' | 'preloader';
}

const AnimatedIcon = ({ variant }: { variant: 'default' | 'preloader' }) => {
    const isPreloader = variant === 'preloader';

    return (
        <div className="relative flex items-center justify-center w-full h-full">
            {/* Central Icon */}
            <motion.div
                className="relative w-full h-full flex items-center justify-center"
                style={{
                    filter: isPreloader ? 'drop-shadow(0 0 15px hsl(var(--primary-hue), var(--primary-saturation), 50%))' : 'none',
                }}
            >
                <HeartPulse 
                    className="w-full h-full"
                    strokeWidth={isPreloader ? 1.5 : 2}
                />
                 <motion.div
                    className="absolute inset-0"
                    animate={{
                        background: isPreloader ? [
                            "radial-gradient(circle, hsl(180, 100%, 70%), hsl(220, 100%, 70%))",
                            "radial-gradient(circle, hsl(300, 100%, 70%), hsl(340, 100%, 70%))",
                            "radial-gradient(circle, hsl(80, 100%, 70%), hsl(120, 100%, 70%))",
                            "radial-gradient(circle, hsl(180, 100%, 70%), hsl(220, 100%, 70%))",
                        ] : "hsl(var(--primary-hue), var(--primary-saturation), var(--primary-lightness))",
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    style={{ maskImage: 'url(heartpulse.svg)', WebkitMaskImage: 'url(heartpulse.svg)' }}
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
        <div className={cn("relative", iconSize, variant === 'default' ? 'text-primary' : 'text-white/90')}>
           <AnimatedIcon variant={variant} />
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
