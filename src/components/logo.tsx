
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { HeartPulse } from 'lucide-react';

interface LogoProps {
  className?: string;
  textClassName?: string;
  iconSize?: string;
  textSize?: string;
  center?: boolean;
}

const AnimatedPill = ({ iconSize }: { iconSize: string }) => {
    const numParticles = 12;

    return (
        <div className={cn("relative flex items-center justify-center", iconSize)}>
            {/* Orbiting Particles */}
            {Array.from({ length: numParticles }).map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-accent rounded-full"
                    style={{
                        originX: '50%',
                        originY: '50%',
                    }}
                    animate={{
                        x: [0, Math.cos((2 * Math.PI / numParticles) * i) * 20, 0],
                        y: [0, Math.sin((2 * Math.PI / numParticles) * i) * 20, 0],
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                        duration: 3 + Math.random() * 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: Math.random() * 2,
                    }}
                />
            ))}

            {/* Central Pill */}
            <motion.div
                className="relative w-8 h-8 rounded-full flex items-center justify-center"
                 animate={{
                    scale: [1, 1.05, 1],
                    boxShadow: [
                        "0 0 10px hsl(var(--primary-hue), 90%, 70%)",
                        "0 0 15px hsl(var(--accent-hue), 90%, 70%)",
                        "0 0 10px hsl(var(--primary-hue), 90%, 70%)",
                    ]
                 }}
                 transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                 }}
            >
                <div className="absolute inset-0 bg-gradient-to-br from-primary via-accent to-secondary rounded-full opacity-80" />
                 <HeartPulse className="relative z-10 text-white h-4 w-4" />
            </motion.div>
        </div>
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
        <AnimatedPill iconSize={iconSize} />
        <span className={cn(
          "font-bold font-headline text-primary hidden sm:inline transition-all duration-300 group-hover:animated-gradient-text",
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
