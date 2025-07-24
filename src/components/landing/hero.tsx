
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import Autoplay from "embla-carousel-autoplay";
import Image from 'next/image';
import { useHero } from '@/contexts/hero-context';
import { Skeleton } from '../ui/skeleton';

const Hero = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const { heroImages, isLoaded } = useHero();
  const autoplayPlugin = React.useRef(Autoplay({ delay: 2000, stopOnInteraction: false }));

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push('/search');
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="relative h-[60vh] md:h-[80vh] w-full overflow-hidden">
        {!isLoaded ? (
             <Skeleton className="w-full h-full" />
        ) : (
            <Carousel
                plugins={[autoplayPlugin.current]}
                className="w-full h-full"
                opts={{ loop: true }}
            >
                <CarouselContent className="h-full">
                    {heroImages.map((src, index) => (
                        <CarouselItem key={index} className="h-full">
                            <div className="relative h-full w-full">
                                <Image
                                    src={src}
                                    alt={`Hero image ${index + 1}`}
                                    fill
                                    className="object-cover"
                                    priority={index === 0}
                                />
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        )}

        <div className="absolute inset-0 bg-black/50" />

        <div className="absolute inset-0 flex items-center justify-center text-center text-white">
            <motion.div 
                className="container mx-auto px-4 relative z-10"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.h1 
                className="text-4xl md:text-6xl font-extrabold font-headline mb-4 text-white drop-shadow-lg"
                variants={itemVariants}
                >
                Order Quality Drugs with Fast Delivery in Nigeria
                </motion.h1>
                <motion.p 
                className="text-lg md:text-xl max-w-3xl mx-auto mb-8 text-gray-200 drop-shadow-md"
                variants={itemVariants}
                >
                Affordable, verified medications delivered to your doorstep from nearby pharmacies.
                </motion.p>
                <motion.div 
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
                variants={itemVariants}
                >
                <Link href="/search">
                    <Button size="lg" className="transform hover:scale-105 transition-transform duration-300 shadow-lg">
                    Get Started
                    </Button>
                </Link>
                <Link href="/about">
                    <Button size="lg" variant="outline" className="transform hover:scale-105 transition-transform duration-300 shadow-lg bg-white/20 border-white text-white hover:bg-white/30">
                    Learn More
                    </Button>
                </Link>
                </motion.div>
                <motion.div 
                className="mt-12 max-w-xl mx-auto"
                variants={itemVariants}
                >
                <form className="relative" onSubmit={handleSearch}>
                    <Input
                    type="text"
                    placeholder="e.g., Paracetamol, Vitamin C..."
                    className="h-14 pl-12 pr-24 text-base bg-white/90 text-primary placeholder:text-muted-foreground/80 border-2 border-border focus:border-primary focus:ring-primary"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-muted-foreground" />
                    <Button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 h-10">
                        Search
                    </Button>
                </form>
                </motion.div>
            </motion.div>
        </div>
    </section>
  );
};

export default Hero;
