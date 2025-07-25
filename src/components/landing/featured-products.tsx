
'use client';
import { Product } from '@/types';
import ProductCard from '@/components/product/product-card';
import { Button } from '../ui/button';
import Link from 'next/link';
import { motion } from 'framer-motion';

const featuredProducts: Product[] = [
    { id: '1', name: 'Paracetamol 500mg', price: 500, imageUrls: ['https://placehold.co/300x300.png'], dataAiHint: 'white pills', category: 'Pain Relief', stock: 10 },
    { id: '2', name: 'Vitamin C 1000mg', price: 1200, imageUrls: ['https://placehold.co/300x300.png'], dataAiHint: 'orange tablets', category: 'Vitamins', stock: 25 },
    { id: '5', name: 'Ibuprofen 200mg', price: 600, imageUrls: ['https://placehold.co/300x300.png'], dataAiHint: 'painkillers tablets', category: 'Pain Relief', stock: 30 },
    { id: '7', name: 'Salbutamol Inhaler', price: 2500, imageUrls: ['https://placehold.co/300x300.png'], dataAiHint: 'asthma inhaler', category: 'Asthma', stock: 12 },
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


const FeaturedProducts = () => {
  return (
    <section className="py-20 md:py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <motion.div 
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={itemVariants}
        >
          <h2 className="text-3xl md:text-4xl font-extrabold font-headline text-accent">
            Featured Products
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Check out some of our most popular medications and health products.
          </p>
        </motion.div>
        <motion.div 
            className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
        >
          {featuredProducts.map((product) => (
            <motion.div key={product.id} variants={itemVariants}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
        <div className="text-center mt-16">
            <Link href="/search">
                <Button size="lg" variant="outline">
                    View All Products
                </Button>
            </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
