'use client';

import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { HeartPulse, Shield, Syringe, Sparkles, Stethoscope } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

const categories = [
    { name: 'Pain Relief', icon: HeartPulse, href: '/search?category=pain-relief' },
    { name: 'Fitness', icon: Shield, href: '/search?category=fitness' },
    { name: 'Beauty', icon: Sparkles, href: '/search?category=skin-beauty' },
    { name: 'Vaccines', icon: Syringe, href: '/search?category=vaccines' },
    { name: 'Chronic Care', icon: Stethoscope, href: '/search?category=chronic-care' },
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

export function ShopByCategory() {
    return (
        <section>
            <motion.div 
                className="text-center mb-12"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                variants={itemVariants}
            >
                <h2 className="text-3xl md:text-4xl font-extrabold font-headline animated-gradient-text">
                    Shop by Category
                </h2>
                <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                    Find what you need faster by browsing our categories.
                </p>
            </motion.div>
            <motion.div 
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
            >
                {categories.map((category) => (
                    <motion.div key={category.name} variants={itemVariants}>
                        <Link href={category.href}>
                            <Card className={cn(
                                "group cursor-pointer overflow-hidden",
                                "transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
                            )}>
                                <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                                    <div className="p-4 bg-primary/10 text-primary rounded-full mb-4 transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110">
                                        <category.icon className="h-8 w-8" />
                                    </div>
                                    <p className="font-semibold text-primary group-hover:text-accent">{category.name}</p>
                                </CardContent>
                            </Card>
                        </Link>
                    </motion.div>
                ))}
            </motion.div>
             <div className="text-center mt-16">
                <Link href="/search">
                    <Button size="lg" variant="outline">
                        View All Categories
                    </Button>
                </Link>
            </div>
        </section>
    )
}
