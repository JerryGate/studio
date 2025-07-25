
'use client';

import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Autoplay from "embla-carousel-autoplay";
import Image from 'next/image';
import { useImageContext } from '@/contexts/image-context';
import { Skeleton } from '../ui/skeleton';
import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import Link from 'next/link';

const Hero = () => {
  const { sliderImages, loading } = useImageContext();
  const autoplayPlugin = React.useRef(Autoplay({ delay: 4000, stopOnInteraction: true }));

  if (loading) {
    return (
        <div className="container mx-auto px-4 py-8">
            <Skeleton className="w-full h-[60vh] md:h-[70vh] rounded-2xl" />
        </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
        <section className="relative w-full overflow-hidden rounded-2xl shadow-lg h-[60vh] md:h-[70vh]">
            <Carousel
                plugins={[autoplayPlugin.current]}
                className="w-full h-full"
                opts={{ loop: true }}
                onMouseEnter={autoplayPlugin.current.stop}
                onMouseLeave={autoplayPlugin.current.reset}
            >
                <CarouselContent className="h-full">
                    {sliderImages.map((image, index) => (
                        <CarouselItem key={image.id} className="h-full">
                            <div className="relative h-full w-full">
                                <Image
                                    src={image.src}
                                    alt={`Hero image ${index + 1}`}
                                    fill
                                    className="object-cover"
                                    priority={index === 0}
                                    data-ai-hint={image.hint}
                                />
                                <div className="absolute inset-0 bg-black/50" />
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/30 text-white border-none hover:bg-black/50" />
                <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/30 text-white border-none hover:bg-black/50" />
            </Carousel>
             <div className="absolute inset-0 flex items-center justify-center z-10">
                <motion.div
                    className="text-center text-white p-4"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <h1 className="text-4xl md:text-6xl font-extrabold font-headline drop-shadow-lg">
                        Quality Drugs, Delivered Fast.
                    </h1>
                    <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto drop-shadow-md">
                        Your trusted source for verified medications from local pharmacies in Nigeria.
                    </p>
                     <motion.div 
                        className="mt-8"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                     >
                        <Link href="/search">
                            <Button size="lg">Start Shopping</Button>
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    </div>
  );
};

export default Hero;
