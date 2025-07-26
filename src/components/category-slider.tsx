
'use client';

import React from 'react';
import Image from 'next/image';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import Autoplay from 'embla-carousel-autoplay';

const categories = [
    { name: 'Fitness Boosters', image: 'https://placehold.co/600x400.png', hint: 'fitness supplements' },
    { name: 'Skin & Beauty', image: 'https://placehold.co/600x400.png', hint: 'skin care products' },
    { name: 'Vaccines & Specialty', image: 'https://placehold.co/600x400.png', hint: 'vaccine vial' },
    { name: 'Pain Relief', image: 'https://placehold.co/600x400.png', hint: 'pain relief tablets' },
    { name: 'Chronic Care', image: 'https://placehold.co/600x400.png', hint: 'blood pressure monitor' },
];

export function CategorySlider() {
    const plugin = React.useRef(Autoplay({ delay: 5000, stopOnInteraction: true }));
    
    return (
        <section>
             <Carousel
                plugins={[plugin.current]}
                className="w-full"
                onMouseEnter={plugin.current.stop}
                onMouseLeave={plugin.current.reset}
                opts={{ loop: true }}
            >
                <CarouselContent>
                    {categories.map((category, index) => (
                        <CarouselItem key={index}>
                            <div className="p-1">
                                <Card className="overflow-hidden">
                                    <CardContent className="relative flex aspect-video items-center justify-center p-6">
                                        <Image
                                            src={category.image}
                                            alt={category.name}
                                            fill
                                            className="object-cover"
                                            data-ai-hint={category.hint}
                                        />
                                         <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30" />
                                        <motion.div
                                            className="relative z-10 text-white text-center"
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.5, delay: 0.2 }}
                                        >
                                            <h3 className="text-3xl md:text-4xl font-extrabold font-headline">
                                                {category.name}
                                            </h3>
                                        </motion.div>
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10 hidden sm:flex" />
                <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10 hidden sm:flex" />
            </Carousel>
        </section>
    );
}
