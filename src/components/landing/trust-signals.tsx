
'use client';

import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Banknote, ShieldCheck, Users } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const testimonials = [
  {
    name: 'Adebayo Adekunle',
    location: 'Lagos',
    avatar: 'AA',
    image: 'https://placehold.co/100x100.png',
    dataAiHint: 'smiling man',
    quote: 'E-pharma is a lifesaver! I got my mother’s medication delivered in under an hour. The process was so simple and the prices are great.',
  },
  {
    name: 'Chidinma Okoro',
    location: 'Abuja',
    avatar: 'CO',
    image: 'https://placehold.co/100x100.png',
    dataAiHint: 'professional woman',
    quote: 'As a pharmacy owner, E-pharma has expanded my customer base significantly. The platform is intuitive and managing orders is a breeze.',
  },
  {
    name: 'Musa Ibrahim',
    location: 'Kano',
    avatar: 'MI',
    image: 'https://placehold.co/100x100.png',
    dataAiHint: 'happy customer',
    quote: 'Fast, reliable, and trustworthy. I no longer have to worry about fake drugs. Highly recommended for anyone in Nigeria!',
  },
];

const trustBadges = [
    {
        icon: ShieldCheck,
        text: 'Verified Pharmacies'
    },
    {
        icon: Banknote,
        text: 'Secure Payments by Paystack'
    },
    {
        icon: Users,
        text: 'Trusted by 10,000+ Nigerians'
    }
];

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

const TrustSignals = () => {
  return (
    <section id="testimonials" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <motion.div 
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={itemVariants}
        >
           <div className="inline-block bg-accent/10 text-accent font-semibold py-1 px-3 rounded-full text-sm mb-4">
              Your Trust, Our Priority
            </div>
          <h2 className="text-3xl md:text-4xl font-extrabold font-headline text-primary">
            Why Nigerians Choose E-pharma
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            We are committed to providing a secure, reliable, and affordable healthcare experience.
          </p>
        </motion.div>

        <motion.div 
            className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
        >
            {trustBadges.map((badge, index) => (
                <motion.div key={index} variants={itemVariants} className="flex flex-col items-center gap-3 text-center group">
                    <div className="bg-primary/10 text-primary p-4 rounded-full transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/20">
                        <badge.icon className="h-8 w-8" />
                    </div>
                    <p className="font-semibold text-lg text-foreground">{badge.text}</p>
                </motion.div>
            ))}
        </motion.div>

        <motion.div
             initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={itemVariants}
        >
            <Carousel
            opts={{
                align: 'start',
                loop: true,
            }}
            className="w-full max-w-4xl mx-auto"
            >
            <CarouselContent>
                {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-1">
                    <Card className="h-full flex flex-col justify-between shadow-lg transition-shadow duration-300 hover:shadow-xl">
                        <CardContent className="p-6">
                        <p className="text-muted-foreground mb-6">"{testimonial.quote}"</p>
                        <div className="flex items-center">
                            <Avatar>
                            <AvatarImage src={testimonial.image} alt={testimonial.name} data-ai-hint={testimonial.dataAiHint} />
                            <AvatarFallback>{testimonial.avatar}</AvatarFallback>
                            </Avatar>
                            <div className="ml-4">
                            <p className="font-semibold text-primary">{testimonial.name}</p>
                            <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                            </div>
                        </div>
                        </CardContent>
                    </Card>
                    </div>
                </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
            </Carousel>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustSignals;
