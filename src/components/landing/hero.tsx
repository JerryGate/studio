
'use client';

import React from 'react';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import Autoplay from "embla-carousel-autoplay";
import Image from 'next/image';

const mockImages = [
    { src: 'https://placehold.co/1200x600.png', hint: 'diverse people smiling' },
    { src: 'https://placehold.co/1200x600.png', hint: 'pharmacist helping customer' },
    { src: 'https://placehold.co/1200x600.png', hint: 'delivery person motorcycle' },
];

const Hero = () => {
  const autoplayPlugin = React.useRef(Autoplay({ delay: 5000, stopOnInteraction: false }));

  return (
    <div className="container mx-auto px-4 py-8">
        <section className="w-full overflow-hidden rounded-2xl shadow-lg">
            <Carousel
                plugins={[autoplayPlugin.current]}
                className="w-full"
                opts={{ loop: true }}
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
            </Carousel>
        </section>
    </div>
  );
};

export default Hero;
