
'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '../ui/button';
import {
  ShoppingCart,
  MapPin,
  CreditCard,
  Video,
  Repeat,
  FileCheck2,
  ArrowRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const services = [
  {
    icon: ShoppingCart,
    title: 'Online Drug Ordering',
    description: 'Browse, order, and upload prescriptions for verified drugs from local pharmacies.',
  },
  {
    icon: MapPin,
    title: 'Smart Delivery System',
    description: 'Pin your location on a map for fast, real-time tracked delivery to your doorstep.',
  },
  {
    icon: CreditCard,
    title: 'Secure Payments',
    description: 'Pay securely with your card or bank transfer, powered by Paystack.',
  },
  {
    icon: Video,
    title: 'Telehealth Consultation',
    description: 'Book virtual consultations with licensed pharmacists or doctors from home.',
  },
  {
    icon: Repeat,
    title: 'Subscription Plans',
    description: 'Automate your monthly refills for chronic conditions with our recurring plans.',
  },
  {
    icon: FileCheck2,
    title: 'Prescription Verification',
    description: 'Upload your prescriptions for quick and secure verification by pharmacists.',
  },
];


const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
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
            ease: "easeOut"
        },
    },
};

const Services = () => {
  return (
    <section id="services" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={itemVariants}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold font-headline animated-gradient-text">
            Everything You Need, All In One Place
          </h2>
           <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            From ordering medication to virtual consultations, we offer a complete healthcare solution designed for modern Nigeria.
          </p>
        </motion.div>

        <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={containerVariants}
        >
          {services.map((service) => (
             <motion.div key={service.title} variants={itemVariants} className="h-full">
                <Card className="text-center shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 h-full flex flex-col group border-0 rounded-xl overflow-hidden">
                    <CardHeader className="p-8">
                        <div className="mx-auto bg-primary/10 text-primary rounded-full h-20 w-20 flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground">
                            <service.icon className="h-10 w-10" />
                        </div>
                        <CardTitle className="font-headline text-xl text-primary">{service.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="px-8 flex-grow">
                        <p className="text-muted-foreground">{service.description}</p>
                    </CardContent>
                     <div className="p-8 mt-auto">
                        <Button variant="link" asChild className="text-accent text-base p-0">
                            <Link href="/services">
                                Learn More <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </Button>
                    </div>
                </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
