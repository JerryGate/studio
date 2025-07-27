'use client';

import { allProducts } from '@/lib/mock-data';
import ProductCard from '@/components/product/product-card';
import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const featuredProducts = allProducts.slice(0, 4);

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

const FeaturedProducts = () => {
  return (
    <section id="featured-products" className="py-20 md:py-28 bg-secondary">
      <div className="container mx-auto px-4">
        <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={itemVariants}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold font-headline animated-gradient-text">
            Featured Products
          </h2>
           <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Check out our top-selling products, trusted by customers across Nigeria.
          </p>
        </motion.div>

        <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
        >
          {featuredProducts.map((product) => (
             <ProductCard key={product.id} product={product} />
          ))}
        </motion.div>

        <div className="text-center mt-16">
            <Link href="/search">
                <Button size="lg" variant="outline" className="group">
                    View All Products
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
            </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
