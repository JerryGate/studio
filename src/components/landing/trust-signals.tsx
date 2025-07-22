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

const testimonials = [
  {
    name: 'Adebayo Adekunle',
    location: 'Lagos',
    avatar: 'AA',
    image: 'https://placehold.co/100x100.png',
    dataAiHint: 'smiling man',
    quote: 'Medfast is a lifesaver! I got my mother’s medication delivered in under an hour. The process was so simple and the prices are great.',
  },
  {
    name: 'Chidinma Okoro',
    location: 'Abuja',
    avatar: 'CO',
    image: 'https://placehold.co/100x100.png',
    dataAiHint: 'professional woman',
    quote: 'As a pharmacy owner, Medfast has expanded my customer base significantly. The platform is intuitive and managing orders is a breeze.',
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
]

const TrustSignals = () => {
  return (
    <section id="testimonials" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
           <div className="inline-block bg-accent/10 text-accent font-semibold py-1 px-3 rounded-full text-sm mb-4">
              Your Trust, Our Priority
            </div>
          <h2 className="text-3xl md:text-4xl font-extrabold font-headline text-primary">
            Why Nigerians Choose Medfast
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            We are committed to providing a secure, reliable, and affordable healthcare experience.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-16">
            {trustBadges.map((badge, index) => (
                <div key={index} className="flex flex-col items-center gap-3 text-center">
                    <div className="bg-primary/10 text-primary p-4 rounded-full">
                        <badge.icon className="h-8 w-8" />
                    </div>
                    <p className="font-semibold text-lg text-foreground">{badge.text}</p>
                </div>
            ))}
        </div>

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
                  <Card className="h-full flex flex-col justify-between shadow-lg">
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
      </div>
    </section>
  );
};

export default TrustSignals;
