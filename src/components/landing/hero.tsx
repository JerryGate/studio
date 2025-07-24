
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import Autoplay from "embla-carousel-autoplay";
import Image from 'next/image';

const mockImages = [
    { src: 'https://placehold.co/1200x600.png', hint: 'diverse people smiling' },
    { src: 'https://placehold.co/1200x600.png', hint: 'pharmacist helping customer' },
    { src: 'https://placehold.co/1200x600.png', hint: 'delivery person motorcycle' },
];

const Hero = () => {
  const autoplayPlugin = React.useRef(Autoplay({ delay: 2000, stopOnInteraction: false }));

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
    <div className="container mx-auto px-4 py-8">
        <section className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden rounded-2xl">
            <Carousel
                plugins={[autoplayPlugin.current]}
                className="w-full h-full"
                opts={{ loop: true }}
            >
                <CarouselContent className="h-full">
                    {mockImages.map((image, index) => (
                        <CarouselItem key={index} className="h-full">
                            <div className="relative h-full w-full">
                                <Image
                                    src={image.src}
                                    alt={`Hero image ${index + 1}`}
                                    fill
                                    className="object-cover"
                                    priority={index === 0}
                                    data-ai-hint={image.hint}
                                />
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>

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
                </motion.div>
            </div>
        </section>
    </div>
  );
};

export default Hero;
