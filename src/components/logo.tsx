
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { HeartPulse } from 'lucide-react';
import React, { useMemo, useEffect, useState } from 'react';

interface LogoProps {
  className?: string;
  textClassName?: string;
  iconSize?: string;
  textSize?: string;
  center?: boolean;
  variant?: 'default' | 'preloader';
}

const AnimatedPill = ({ iconSize, variant }: { iconSize: string; variant: 'default' | 'preloader' }) => {
    const isPreloader = variant === 'preloader';
    const [pills, setPills] = useState<any[]>([]);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (isClient && isPreloader) {
            setPills(Array.from({ length: 50 }).map((_, i) => ({
                id: i,
                x: `${Math.random() * 100}%`,
                initialY: `-${Math.random() * 200}%`, // Start further up to ensure a continuous stream
                duration: 2 + Math.random() * 3,
                delay: Math.random() * 4,
                rotation: Math.random() * 720 - 360,
                colors: [
                    `hsl(${Math.random() * 360}, 100%, 70%)`,
                    `hsl(${Math.random() * 360}, 100%, 70%)`,
                    `hsl(${Math.random() * 360}, 100%, 70%)`,
                    `hsl(${Math.random() * 360}, 100%, 70%)`,
                ],
                size: Math.random() * 0.5 + 0.4
            })));
        }
    }, [isPreloader, isClient]);

    const particles = useMemo(() => {
        return Array.from({ length: isPreloader ? 8 : 4 }).map((_, i) => ({
            id: i,
            angle: (360 / (isPreloader ? 8 : 4)) * i,
            distance: isPreloader ? 28 : 22,
            duration: isPreloader ? 3 : 4,
            color: isPreloader ? `hsl(${i * 45}, 100%, 70%)` : `hsl(var(--primary-hue), var(--primary-saturation), 70%)`
        }));
    }, [isPreloader]);

    return (
        <div className={cn("relative flex items-center justify-center", iconSize)}>
            {/* Cascading Pills (Preloader only) */}
            {isPreloader && pills.map((pill) => (
                <motion.div
                    key={`cascade-${pill.id}`}
                    className="absolute rounded-full opacity-70"
                    style={{
                        width: `${pill.size}rem`,
                        height: `${pill.size * 0.4}rem`,
                        boxShadow: `0 0 8px ${pill.colors[0]}`,
                        left: pill.x,
                        top: pill.initialY,
                    }}
                    animate={{
                        y: '120vh',
                        rotate: pill.rotation,
                        background: [
                            `linear-gradient(90deg, ${pill.colors[0]}, ${pill.colors[1]})`,
                            `linear-gradient(90deg, ${pill.colors[1]}, ${pill.colors[2]})`,
                            `linear-gradient(90deg, ${pill.colors[2]}, ${pill.colors[3]})`,
                            `linear-gradient(90deg, ${pill.colors[3]}, ${pill.colors[0]})`,
                        ]
                    }}
                    transition={{
                        y: {
                            duration: pill.duration,
                            delay: pill.delay,
                            repeat: Infinity,
                            ease: 'linear'
                        },
                        rotate: {
                            duration: pill.duration,
                            delay: pill.delay,
                            repeat: Infinity,
                            ease: 'linear'
                        },
                        background: {
                            duration: pill.duration / 2,
                            repeat: Infinity,
                            ease: 'easeInOut',
                            delay: pill.delay,
                        }
                    }}
                />
            ))}
            
            {/* Orbiting Particles */}
            {particles.map((particle) => (
                <motion.div
                    key={`particle-${particle.id}`}
                    className="absolute w-1.5 h-1.5 rounded-full"
                    style={{
                        originX: '50%',
                        originY: '50%',
                        background: particle.color,
                        boxShadow: isPreloader ? `0 0 8px ${particle.color}` : 'none',
                    }}
                    animate={{
                        x: [0, Math.cos(particle.angle * Math.PI / 180) * particle.distance, 0],
                        y: [0, Math.sin(particle.angle * Math.PI / 180) * particle.distance, 0],
                        scale: isPreloader ? [1, 0.5, 1] : 1,
                    }}
                    transition={{
                        duration: particle.duration,
                        repeat: Infinity,
                        ease: 'linear',
                        delay: particle.id * (particle.duration / particles.length),
                    }}
                />
            ))}

            {/* Central Pill */}
            <motion.div
                className="relative w-8 h-8 rounded-full flex items-center justify-center overflow-hidden"
                style={{
                     filter: isPreloader ? 'drop-shadow(0 0 10px hsl(var(--primary-hue), var(--primary-saturation), 50%))' : 'none',
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
                 <HeartPulse className={cn("relative z-10 h-4 w-4", isPreloader ? "text-white" : "text-primary-foreground")} />
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
