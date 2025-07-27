
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { HeartPulse } from 'lucide-react';
import React from 'react';

interface LogoProps {
  className?: string;
  textClassName?: string;
  iconSize?: string;
  textSize?: string;
  center?: boolean;
  variant?: 'default' | 'preloader';
}

const AnimatedPill = ({ iconSize, variant }: { iconSize: string; variant: 'default' | 'preloader' }) => {
    const numParticles = 8;
    const isPreloader = variant === 'preloader';
    const numCascadingPills = isPreloader ? 20 : 0;

    const cascadingPills = React.useMemo(() => {
        if (!isPreloader) return [];
        return Array.from({ length: numCascadingPills }).map((_, i) => ({
            id: i,
            x: Math.random() * 200 - 100, // -100% to 100%
            y: -100,
            duration: 2 + Math.random() * 3,
            delay: Math.random() * 4,
            rotation: Math.random() * 360,
            color: `hsl(${Math.random() * 360}, 100%, 70%)`
        }));
    }, [isPreloader, numCascadingPills]);

    return (
        <div className={cn("relative flex items-center justify-center", iconSize)}>
            {/* Cascading Pills (Preloader only) */}
            {cascadingPills.map((pill) => (
                <motion.div
                    key={`cascade-${pill.id}`}
                    className="absolute w-1 h-2 rounded-full opacity-70"
                    style={{ background: pill.color, boxShadow: `0 0 8px ${pill.color}` }}
                    initial={{ y: pill.y, x: `${pill.x}%`, rotate: 0 }}
                    animate={{ y: [pill.y, 100], rotate: pill.rotation }}
                    transition={{
                        duration: pill.duration,
                        delay: pill.delay,
                        repeat: Infinity,
                        ease: 'linear'
                    }}
                />
            ))}

            {/* Orbiting Particles */}
            {Array.from({ length: numParticles }).map((_, i) => (
                <motion.div
                    key={`particle-${i}`}
                    className="absolute w-1.5 h-1.5 rounded-full"
                    style={{
                        originX: '50%',
                        originY: '50%',
                        background: `hsl(${i * 45}, 100%, 70%)`,
                        boxShadow: `0 0 8px hsl(${i * 45}, 100%, 70%)`,
                    }}
                    animate={{
                        x: [0, Math.cos((2 * Math.PI / numParticles) * i) * 22, 0],
                        y: [0, Math.sin((2 * Math.PI / numParticles) * i) * 22, 0],
                        scale: [1, 0.5, 1],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: 'linear',
                        delay: i * (3 / numParticles),
                    }}
                />
            ))}

            {/* Central Pill */}
            <motion.div
                className="relative w-8 h-8 rounded-full flex items-center justify-center overflow-hidden"
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
            >
                <motion.div
                    className="absolute inset-0"
                    animate={{
                        background: [
                            "radial-gradient(circle, hsl(180, 100%, 70%), hsl(220, 100%, 70%))",
                            "radial-gradient(circle, hsl(300, 100%, 70%), hsl(340, 100%, 70%))",
                            "radial-gradient(circle, hsl(80, 100%, 70%), hsl(120, 100%, 70%))",
                            "radial-gradient(circle, hsl(180, 100%, 70%), hsl(220, 100%, 70%))",
                        ]
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                />
                 <HeartPulse className="relative z-10 text-white h-4 w-4" />
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
        <AnimatedPill iconSize={iconSize} variant={variant} />
        <span className={cn(
          "font-bold font-headline text-primary hidden sm:inline transition-all duration-300",
           variant === 'default' ? "group-hover:animated-gradient-text" : "text-white/90 [text-shadow:0_0_8px_rgba(255,255,255,0.5)]",
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
