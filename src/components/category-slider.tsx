
'use client';

import React from 'react';
import Image from 'next/image';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import Autoplay from 'embla-carousel-autoplay';
import { HeartPulse, Shield, Syringe, Sparkles, Stethoscope } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';


const categories = [
    { name: 'Pain Relief', icon: HeartPulse, href: '/search?category=pain-relief' },
    { name: 'Fitness', icon: Shield, href: '/search?category=fitness' },
    { name: 'Beauty', icon: Sparkles, href: '/search?category=skin-beauty' },
    { name: 'Vaccines', icon: Syringe, href: '/search?category=vaccines' },
    { name: 'Chronic Care', icon: Stethoscope, href: '/search?category=chronic-care' },
    { name: 'Pain Relief 2', icon: HeartPulse, href: '/search?category=pain-relief' },
    { name: 'Fitness 2', icon: Shield, href: '/search?category=fitness' },
    { name: 'Beauty 2', icon: Sparkles, href: '/search?category=skin-beauty' },
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
                <CarouselContent className="-ml-4">
                    {categories.map((category, index) => (
                        <CarouselItem key={index} className="pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                             <Link href={category.href}>
                                <Card className={cn(
                                    "group cursor-pointer overflow-hidden h-full",
                                    "transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                                )}>
                                    <CardContent className="flex flex-col items-center justify-center p-6 text-center aspect-square">
                                        <div className="p-4 bg-primary/10 text-primary rounded-full mb-4 transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110">
                                            <category.icon className="h-8 w-8" />
                                        </div>
                                        <p className="font-semibold text-primary group-hover:text-accent">{category.name.replace(' 2', '')}</p>
                                    </CardContent>
                                </Card>
                            </Link>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="absolute left-[-1rem] top-1/2 -translate-y-1/2 z-10 hidden sm:flex" />
                <CarouselNext className="absolute right-[-1rem] top-1/2 -translate-y-1/2 z-10 hidden sm:flex" />
            </Carousel>
        </section>
    );
}
