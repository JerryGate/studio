
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  ShoppingCart,
  MapPin,
  CreditCard,
  Store,
  Bike,
  Newspaper,
  Video,
  Repeat,
  FileCheck2,
  ArrowRight,
  Star,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import React from 'react';
import Autoplay from 'embla-carousel-autoplay';

const services = [
  {
    icon: ShoppingCart,
    title: 'Online Drug Ordering',
    description: 'Browse and order verified drugs with real-time pricing. Upload prescriptions and get order confirmations via email/SMS.',
  },
  {
    icon: MapPin,
    title: 'Smart Delivery System',
    description: 'Pin your delivery location on a map with AI-powered cost calculation. Track your order in real-time to your doorstep.',
  },
  {
    icon: CreditCard,
    title: 'Secure Payments',
    description: 'Pay securely with your card, mobile money, or bank transfer via Paystack, with automated payment splits for all parties.',
  },
  {
    icon: Store,
    title: 'Pharmacy Management',
    description: 'A dedicated portal for pharmacies to manage drug inventories, track sales with analytics, and fulfill orders efficiently.',
  },
  {
    icon: Bike,
    title: 'Dispatcher Network',
    description: 'Join our network to receive delivery jobs, view order locations on a map, and earn fees through automated Paystack splits.',
  },
  {
    icon: Newspaper,
    title: 'Health Blog & Education',
    description: 'Stay informed with our blog featuring health tips, pharmacy news, and wellness articles, with an engaging comment section.',
  },
  {
    icon: Video,
    title: 'Telehealth Consultation',
    description: 'Book virtual consultations with licensed pharmacists or doctors through our secure, integrated video call feature.',
  },
  {
    icon: Repeat,
    title: 'Subscription Plans',
    description: 'Automate your monthly refills for chronic conditions like hypertension and diabetes with our recurring payment plans.',
  },
  {
    icon: FileCheck2,
    title: 'Prescription Verification',
    description: 'Upload your prescriptions for a quick and secure verification process by our registered partner pharmacists.',
  },
];

const testimonials = [
  {
    name: 'Adebayo Adekunle',
    location: 'Lagos',
    avatar: 'AA',
    image: 'https://placehold.co/100x100.png',
    dataAiHint: 'smiling man',
    quote: 'The subscription service is fantastic for my parents\' hypertension medication. It arrives on time every month without fail.',
  },
  {
    name: 'Chidinma Okoro',
    location: 'Abuja',
    avatar: 'CO',
    image: 'https://placehold.co/100x100.png',
    dataAiHint: 'professional woman',
    quote: 'Booking a telehealth consultation was surprisingly easy. I got professional advice from a pharmacist within minutes.',
  },
  {
    name: 'Musa Ibrahim',
    location: 'Kano',
    avatar: 'MI',
    image: 'https://placehold.co/100x100.png',
    dataAiHint: 'happy man',
    quote: 'Fast, reliable, and trustworthy. I no longer have to worry about fake drugs. Highly recommended for anyone in Nigeria!',
  },
];


const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            type: 'spring',
            stiffness: 100,
        },
    },
};

const ServicesPage = () => {
    const plugin = React.useRef(Autoplay({ delay: 5000, stopOnInteraction: true }));
    
    return (
        <div className="bg-background text-foreground">
            {/* Hero Section */}
            <motion.header
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="py-20 md:py-32 bg-primary/5 text-center"
            >
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-primary">Our E-Pharmacy Services</h1>
                    <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                        Affordable, Quality Healthcare at Your Fingertips. Everything you need, all in one place.
                    </p>
                     <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="mt-8"
                     >
                        <Button size="lg" onClick={() => document.getElementById('services-grid')?.scrollIntoView({ behavior: 'smooth' })}>
                            Explore Services
                        </Button>
                    </motion.div>
                </div>
            </motion.header>

            {/* Services Grid */}
            <main id="services-grid" className="py-20 md:py-24">
                <div className="container mx-auto px-4">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {services.map((service, index) => (
                            <motion.div key={index} variants={itemVariants}>
                                <Card className="flex flex-col h-full shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border-t-4 border-accent">
                                    <CardHeader className="flex-row items-start gap-4">
                                         <div className="bg-accent/10 text-accent p-3 rounded-lg">
                                            <service.icon className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <CardTitle className="text-xl text-primary">{service.title}</CardTitle>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="flex-grow">
                                        <p className="text-muted-foreground">{service.description}</p>
                                    </CardContent>
                                    <CardFooter>
                                        <Button variant="link" className="p-0 text-accent group">
                                            Learn More <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </main>

             {/* Testimonials Section */}
            <section className="py-20 md:py-24 bg-secondary">
                 <div className="container mx-auto px-4">
                    <motion.div 
                        className="text-center mb-12"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.5 }}
                        variants={itemVariants}
                    >
                        <h2 className="text-3xl md:text-4xl font-extrabold font-headline text-primary">
                            What Our Users Are Saying
                        </h2>
                        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                           Real stories from people benefiting from our services.
                        </p>
                    </motion.div>
                    <Carousel
                        plugins={[plugin.current]}
                        onMouseEnter={plugin.current.stop}
                        onMouseLeave={plugin.current.reset}
                        opts={{ loop: true }}
                        className="w-full max-w-4xl mx-auto"
                    >
                        <CarouselContent>
                            {testimonials.map((testimonial, index) => (
                            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                                <div className="p-1">
                                    <Card className="h-full flex flex-col justify-between shadow-lg">
                                        <CardContent className="p-6 text-center">
                                            <div className="flex justify-center mb-4">
                                                {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />)}
                                            </div>
                                            <p className="text-muted-foreground mb-6 text-base">"{testimonial.quote}"</p>
                                            <div className="flex items-center justify-center">
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
                        <CarouselPrevious className="hidden sm:flex" />
                        <CarouselNext className="hidden sm:flex" />
                    </Carousel>
                 </div>
            </section>
        </div>
    );
};

export default ServicesPage;
