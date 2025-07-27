
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import React from 'react';

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
            <motion.div
                className="relative w-full h-full flex items-center justify-center"
                style={{
                    filter: isPreloader ? 'drop-shadow(0 0 15px hsl(var(--primary-hue), var(--primary-saturation), 50%))' : 'none',
                }}
            >
                <svg 
                    className="w-full h-full" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="currentColor"
                    strokeWidth={isPreloader ? 1 : 1.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M12 6V4" />
                    <path d="M12 12V8" />
                    <path d="M12 18V14" />
                    <path d="M16 4h-8" />
                    <path d="M12 6a4 4 0 0 0-4 4v4a4 4 0 1 0 8 0V10a4 4 0 0 0-4-4Z" />
                    <path d="M12 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
                    <path d="M4 12h.01" />
                    <path d="M20 12h.01" />
                    <path d="M6.343 17.657h.01" />
                    <path d="M17.657 17.657h.01" />
                    <path d="M6.343 6.343h.01" />
                    <path d="M17.657 6.343h.01" />
                </svg>
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
