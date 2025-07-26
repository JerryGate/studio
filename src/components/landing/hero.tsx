
'use client';

import React, { useCallback, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/button';
import Link from 'next/link';
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { useImageContext } from '@/contexts/image-context';
import { Skeleton } from '../ui/skeleton';
import { ArrowLeft, ArrowRight, Search } from 'lucide-react';
import { Input } from '../ui/input';
import { useRouter } from 'next/navigation';

const HeroSkeleton = () => (
    <div className="relative w-full h-[70vh] md:h-[80vh] bg-muted">
        <Skeleton className="h-full w-full" />
        <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="text-center p-4">
                <Skeleton className="h-12 w-96 max-w-full mx-auto" />
                <Skeleton className="h-6 w-80 max-w-full mx-auto mt-4" />
                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Skeleton className="h-12 w-40" />
                    <Skeleton className="h-12 w-40" />
                </div>
            </div>
        </div>
    </div>
);

const SearchBar = () => {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
  
    const handleSearch = (e: React.FormEvent) => {
      e.preventDefault();
      if (searchQuery.trim()) {
        router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      } else {
        router.push('/search');
      }
    };

    return (
        <form className="relative w-full max-w-xl mx-auto" onSubmit={handleSearch}>
            <Input
                type="text"
                placeholder="Search for drugs, vitamins, and more..."
                className="h-14 text-lg pl-12 pr-24 rounded-full shadow-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-muted-foreground" />
            <Button type="submit" size="lg" className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full">
                Search
            </Button>
        </form>
    )
}

const Hero = () => {
    const { sliderImages, loading } = useImageContext();
    const [api, setApi] = React.useState<CarouselApi>();
    const [current, setCurrent] = React.useState(0);
    
    const plugin = React.useRef(
        Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true })
    );

    React.useEffect(() => {
        if (!api) return;
        setCurrent(api.selectedScrollSnap());
        api.on("select", () => {
            setCurrent(api.selectedScrollSnap());
        });
    }, [api]);

    const scrollPrev = useCallback(() => api?.scrollPrev(), [api]);
    const scrollNext = useCallback(() => api?.scrollNext(), [api]);

    if (loading) {
        return <HeroSkeleton />;
    }

    return (
        <section className="relative w-full group">
            <div className="h-[70vh] md:h-[80vh]">
                 <Carousel
                    setApi={setApi}
                    plugins={[plugin.current]}
                    className="w-full h-full"
                    opts={{ loop: true }}
                >
                    <CarouselContent className="h-full">
                        {sliderImages.map((image, index) => (
                            <CarouselItem key={image.id} className="h-full">
                                <div className="relative h-full w-full">
                                    <Image
                                        src={image.src}
                                        alt={image.headline}
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

                    <div className="absolute inset-0 flex items-center justify-center z-10">
                        <AnimatePresence mode="wait">
                             <motion.div
                                key={current}
                                className="text-center text-white p-4"
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -20, opacity: 0 }}
                                transition={{ duration: 0.5, ease: "circOut" }}
                            >
                                <h1 className="text-4xl md:text-6xl font-extrabold font-headline drop-shadow-lg">
                                    {sliderImages[current]?.headline || "Quality Drugs, Delivered Fast."}
                                </h1>
                                <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto drop-shadow-md">
                                    {sliderImages[current]?.description || "Your trusted source for verified medications from local pharmacies in Nigeria."}
                                </p>
                                <motion.div
                                    className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                                >
                                    <Link href={sliderImages[current]?.ctaLink || "/search"}>
                                        <Button size="lg">
                                           {sliderImages[current]?.ctaText || "Start Shopping"}
                                        </Button>
                                    </Link>
                                </motion.div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Navigation Arrows */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 h-12 w-12 rounded-full bg-black/30 text-white hover:bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={scrollPrev}
                    >
                        <ArrowLeft />
                    </Button>
                     <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 h-12 w-12 rounded-full bg-black/30 text-white hover:bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={scrollNext}
                    >
                        <ArrowRight />
                    </Button>

                    {/* Navigation Dots */}
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                        {sliderImages.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => api?.scrollTo(index)}
                                className={`h-3 w-3 rounded-full transition-all ${current === index ? 'w-6 bg-white' : 'bg-white/50'}`}
                            />
                        ))}
                    </div>
                </Carousel>
            </div>
             {/* Search bar for smaller screens */}
            <div className="lg:hidden container mx-auto px-4 py-6 bg-background">
                <SearchBar />
            </div>
        </section>
    );
};

export default Hero;
