
'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HeartPulse, Store, Bike, UserCog } from 'lucide-react';
import { motion } from 'framer-motion';

const services = [
  {
    icon: HeartPulse,
    role: 'For Patients',
    description: 'Order drugs, track deliveries, and view your complete purchase history with ease.',
  },
  {
    icon: Store,
    role: 'For Pharmacies',
    description: 'Upload your drug inventory, manage sales, and efficiently fulfill incoming orders.',
  },
  {
    icon: Bike,
    role: 'For Dispatchers',
    description: 'Receive real-time pickup notifications and track your deliveries seamlessly.',
  },
  {
    icon: UserCog,
    role: 'For Admins',
    description: 'Oversee the entire platform, managing pharmacies, patients, and transactions.',
  },
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

const Services = () => {
  return (
    <section id="services" className="py-20 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div 
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={itemVariants}
        >
          <h2 className="text-3xl md:text-4xl font-extrabold font-headline text-accent">
            Experts in Every Aspect of Service
          </h2>
        </motion.div>

        <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
        >
          {services.map((service) => (
             <motion.div key={service.role} variants={itemVariants}>
                <Card className="text-center shadow-none border-none group">
                <CardHeader>
                    <div className="mx-auto bg-primary/10 text-primary rounded-full h-20 w-20 flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground">
                        <service.icon className="h-10 w-10" />
                    </div>
                    <CardTitle className="font-headline text-xl text-accent">{service.role}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                    <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
                </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
