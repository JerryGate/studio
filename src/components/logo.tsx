
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

const CaduceusIcon = ({ variant }: { variant: 'default' | 'preloader' }) => {
  return (
    <motion.svg
      className="w-full h-full"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      stroke="currentColor"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: variant === 'preloader' ? 1.5 : 0, duration: 0.5 }}
    >
      <defs>
        <radialGradient id="caduceus-glow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 0.8 }} />
          <stop offset="100%" style={{ stopColor: 'hsl(var(--accent))', stopOpacity: 0.2 }} />
        </radialGradient>
      </defs>
      {variant === 'preloader' && (
        <motion.path
          d="M12 2V22 M19 6.84a5.5 5.5 0 0 0-11.23 2.16l1.73 6a5.5 5.5 0 0 0 10.74 0l1.73-6A5.5 5.5 0 0 0 19 6.84Z M5 18s2.6-4 7-4 7 4 7 4 M5 12s2.6 4 7 4 7-4 7-4"
          fill="url(#caduceus-glow)"
          stroke="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 1.8, ease: "easeInOut" }}
        />
      )}
      <path d="M12 2V22" />
      <path d="M19 6.84a5.5 5.5 0 0 0-11.23 2.16l1.73 6a5.5 5.5 0 0 0 10.74 0l1.73-6A5.5 5.5 0 0 0 19 6.84Z" />
      <path d="M5 18s2.6-4 7-4 7 4 7 4" />
      <path d="M5 12s2.6 4 7 4 7-4 7-4" />
    </motion.svg>
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
             <CaduceusIcon variant={variant} />
           </div>
        </div>
        <span className={cn(
          "font-bold font-headline hidden sm:inline transition-all duration-300",
           "text-primary group-hover:animated-gradient-text",
          textSize,
          textClassName,
          variant === 'preloader' && 'text-white'
        )}>
          E-pharma
        </span>
      </div>
    </Link>
  );
};

export default Logo;
