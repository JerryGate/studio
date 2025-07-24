
'use client';

import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Autoplay from "embla-carousel-autoplay";
import Image from 'next/image';

const mockImages = [
    { src: 'https://placehold.co/1200x600.png', hint: 'diverse people smiling' },
    { src: 'https://placehold.co/1200x600.png', hint: 'pharmacist helping customer' },
    { src: 'https://placehold.co/1200x600.png', hint: 'delivery person motorcycle' },
];

const Hero = () => {
  const autoplayPlugin = React.useRef(Autoplay({ delay: 5000, stopOnInteraction: true }));

  return (
    <div className="container mx-auto px-4 py-8">
        <section className="w-full overflow-hidden rounded-2xl shadow-lg">
            <Carousel
                plugins={[autoplayPlugin.current]}
                className="w-full"
                opts={{ loop: true }}
                onMouseEnter={autoplayPlugin.current.stop}
                onMouseLeave={autoplayPlugin.current.reset}
            >
                <CarouselContent className="h-[60vh] md:h-[70vh]">
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
                <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/30 text-white border-none hover:bg-black/50" />
                <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/30 text-white border-none hover:bg-black/50" />
            </Carousel>
        </section>
    </div>
  );
};

export default Hero;
