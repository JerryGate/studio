'use client';

import { Product } from '@/types';
import ProductCard from '@/components/product/product-card';
import { Button } from '../ui/button';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface CategoryProductsSectionProps {
  category: string;
  products: Product[];
}

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

export function CategoryProductsSection({ category, products }: CategoryProductsSectionProps) {
  if (products.length === 0) {
    return null;
  }
  
  const categorySlug = category.toLowerCase().replace(/\s+/g, '-');

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
            Top Picks in {category}
          </h2>
          <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore our most popular products for {category.toLowerCase()}.
          </p>
        </motion.div>
        <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
        >
          {products.map((product) => (
             <ProductCard key={product.id} product={product} />
          ))}
        </motion.div>
        <div className="text-center mt-16">
            <Link href={`/search?category=${categorySlug}`}>
                <Button size="lg" variant="outline">
                    View All in {category}
                </Button>
            </Link>
        </div>
    </section>
  );
};
