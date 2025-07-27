
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
    const numParticles = 8;
    const numPills = 10;

    return (
        <div className={cn("relative flex items-center justify-center", iconSize)}>
            {/* Background Glow */}
            <motion.div
                className="absolute inset-0 rounded-full"
                animate={{
                    boxShadow: [
                        "0 0 20px 5px hsl(150, 100%, 70%, 0.4), inset 0 0 10px hsl(150, 100%, 80%, 0.3)",
                        "0 0 30px 8px hsl(330, 100%, 70%, 0.5), inset 0 0 15px hsl(330, 100%, 80%, 0.4)",
                        "0 0 20px 5px hsl(210, 100%, 70%, 0.4), inset 0 0 10px hsl(210, 100%, 80%, 0.3)",
                        "0 0 30px 8px hsl(150, 100%, 70%, 0.5), inset 0 0 15px hsl(150, 100%, 80%, 0.4)",
                    ]
                }}
                transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />

            {/* Cascading Pills */}
            {Array.from({ length: numPills }).map((_, i) => (
                <motion.div
                    key={`pill-${i}`}
                    className="absolute w-1.5 h-3 rounded-full"
                    style={{
                        background: `hsl(${i * 36}, 100%, 70%)`,
                        boxShadow: `0 0 8px hsl(${i * 36}, 100%, 70%)`,
                    }}
                    initial={{
                        y: -25,
                        x: (Math.random() - 0.5) * 50,
                        opacity: 0,
                        scale: Math.random() * 0.5 + 0.5
                    }}
                    animate={{ y: [ -25, 25 ], opacity: [0, 1, 0] }}
                    transition={{
                        duration: 1.5 + Math.random() * 1.5,
                        repeat: Infinity,
                        delay: Math.random() * 2,
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
                        background: `hsl(${i * 45}, 100%, 50%)`,
                        boxShadow: `0 0 5px hsl(${i * 45}, 100%, 50%)`,
                    }}
                    animate={{
                        x: [0, Math.cos((2 * Math.PI / numParticles) * i) * 22, 0],
                        y: [0, Math.sin((2 * Math.PI / numParticles) * i) * 22, 0],
                        scale: [1, 0.5, 1],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'linear',
                        delay: i * 0.25,
                    }}
                />
            ))}

            {/* Central Pill */}
            <motion.div
                className="relative w-7 h-7 rounded-full flex items-center justify-center overflow-hidden"
                 animate={{ rotate: 360 }}
                 transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            >
                 <div className="absolute inset-0 bg-gradient-to-br from-primary via-accent to-secondary opacity-90" />
                 <div className="absolute inset-0 bg-black/20" />
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
