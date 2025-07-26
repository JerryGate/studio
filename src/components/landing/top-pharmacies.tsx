
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '../ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Star, MapPin, ArrowRight } from 'lucide-react';

const topPharmacies = [
    { name: 'GoodHealth Pharmacy', location: 'Ikeja, Lagos', rating: 4.8, image: 'https://placehold.co/400x300.png', dataAiHint: 'modern pharmacy interior' },
    { name: 'City Drugs', location: 'Wuse II, Abuja', rating: 4.9, image: 'https://placehold.co/400x300.png', dataAiHint: 'pharmacy storefront' },
    { name: 'Wellness Meds', location: 'Lekki, Lagos', rating: 4.5, image: 'https://placehold.co/400x300.png', dataAiHint: 'pharmacist smiling' },
    { name: 'CarePoint Pharmacy', location: 'Port Harcourt', rating: 4.7, image: 'https://placehold.co/400x300.png', dataAiHint: 'pharmacy shelves medicine' },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
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

const TopPharmacies = () => {
  return (
    <section className="py-20 md:py-32 bg-secondary">
      <div className="container mx-auto px-4">
        <motion.div 
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={itemVariants}
        >
          <div className="inline-block bg-primary/10 text-primary font-semibold py-1 px-3 rounded-full text-sm mb-4">
              Trusted Partners
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold font-headline text-primary">
            Top-Rated Pharmacies
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Order from our most trusted and highly-rated pharmacy partners.
          </p>
        </motion.div>
        <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
        >
          {topPharmacies.map((pharmacy) => (
            <motion.div key={pharmacy.name} variants={itemVariants}>
              <Card className="overflow-hidden shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 h-full flex flex-col group rounded-xl">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={pharmacy.image}
                    alt={pharmacy.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    data-ai-hint={pharmacy.dataAiHint}
                  />
                </div>
                <CardContent className="p-6 flex-grow flex flex-col">
                    <CardTitle className="text-xl mb-2">{pharmacy.name}</CardTitle>
                    <div className="flex items-center text-muted-foreground text-sm">
                        <MapPin className="h-4 w-4 mr-2 shrink-0" />
                        <span>{pharmacy.location}</span>
                    </div>
                    <div className="flex items-center text-amber-500 my-4">
                        <Star className="h-5 w-5 mr-1 fill-current" />
                        <span className="font-bold text-base">{pharmacy.rating} / 5.0</span>
                    </div>
                    <div className="mt-auto">
                        <Button variant="outline" className="w-full group/button">
                           View Products <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/button:translate-x-1" />
                        </Button>
                    </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TopPharmacies;
