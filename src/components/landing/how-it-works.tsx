
'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CreditCard, MapPin, Search } from 'lucide-react';
import { motion } from 'framer-motion';

const steps = [
  {
    icon: Search,
    title: '1. Search Drugs',
    description: 'Easily find the medications you need from our extensive catalog of verified drugs.',
  },
  {
    icon: CreditCard,
    title: '2. Order & Pay',
    description: 'Add to cart and complete your purchase securely with our integrated payment system.',
  },
  {
    icon: MapPin,
    title: '3. Track Delivery',
    description: 'Your order is sent to the nearest pharmacy and you can track your delivery in real-time.',
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

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 md:py-32 bg-secondary">
      <div className="container mx-auto px-4">
        <motion.div 
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={itemVariants}
        >
           <div className="inline-block bg-primary/10 text-primary font-semibold py-1 px-3 rounded-full text-sm mb-4">
              Easy as 1-2-3
            </div>
          <h2 className="text-3xl md:text-4xl font-extrabold font-headline text-primary">
            Get Your Medication in Three Simple Steps
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            We've streamlined the process to make healthcare accessible and convenient for you.
          </p>
        </motion.div>

        <motion.div 
            className="grid md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
        >
          {steps.map((step, index) => (
            <motion.div key={index} variants={itemVariants}>
                <Card className="text-center shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border-t-4 border-primary h-full">
                <CardHeader>
                    <div className="mx-auto bg-primary text-primary-foreground rounded-full h-16 w-16 flex items-center justify-center mb-4">
                    <step.icon className="h-8 w-8" />
                    </div>
                    <CardTitle className="font-headline text-2xl text-primary">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">{step.description}</p>
                </CardContent>
                </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
