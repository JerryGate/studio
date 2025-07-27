
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
}

const CaduceusIcon = () => {
  return (
    <svg
      className="w-full h-full"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      stroke="currentColor"
    >
      <path d="M12 2V22" />
      <path d="M19 6.84a5.5 5.5 0 0 0-11.23 2.16l1.73 6a5.5 5.5 0 0 0 10.74 0l1.73-6A5.5 5.5 0 0 0 19 6.84Z" />
      <path d="M5 18s2.6-4 7-4 7 4 7 4" />
      <path d="M5 12s2.6 4 7 4 7-4 7-4" />
    </svg>
  );
};

const Logo = ({ className, textClassName, iconSize = 'h-10 w-10', textSize = 'text-2xl', center = false }: LogoProps) => {
  return (
    <Link href="/" passHref>
      <div className={cn(
        "flex items-center gap-3 cursor-pointer group",
        center && 'justify-center',
        className
      )}>
        <div className={cn("relative", iconSize)}>
           <div className="relative w-full h-full text-primary">
             <CaduceusIcon />
           </div>
        </div>
        <span className={cn(
          "font-bold font-headline hidden sm:inline transition-all duration-300",
           "text-primary group-hover:animated-gradient-text",
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
