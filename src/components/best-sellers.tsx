
'use client';

import ProductCard from '@/components/product/product-card';
import { motion } from 'framer-motion';
import { allProducts } from '@/lib/mock-data';

const bestSellers = allProducts.slice(0, 4);

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


export function BestSellers() {
  return (
    <section>
        <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={itemVariants}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold font-headline animated-gradient-text">
            Best Sellers
          </h2>
          <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Our most popular and trusted medications, chosen by customers like you.
          </p>
        </motion.div>
        <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
        >
          {bestSellers.map((product) => (
             <ProductCard key={product.id} product={product} />
          ))}
        </motion.div>
    </section>
  );
};
