'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const Hero = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push('/search');
    }
  };

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

  return (
    <section className="relative py-24 md:py-40 text-center bg-gray-50 text-foreground">
      <motion.div 
        className="container mx-auto px-4 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 
          className="text-4xl md:text-6xl font-extrabold font-headline mb-4 text-primary drop-shadow-sm"
          variants={itemVariants}
        >
          Order Quality Drugs with Fast Delivery in Nigeria
        </motion.h1>
        <motion.p 
          className="text-lg md:text-xl max-w-3xl mx-auto mb-8 text-muted-foreground drop-shadow-sm"
          variants={itemVariants}
        >
          Affordable, verified medications delivered to your doorstep from nearby pharmacies.
        </motion.p>
        <motion.div 
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          variants={itemVariants}
        >
          <Link href="/search">
            <Button size="lg" className="transform hover:scale-105 transition-transform duration-300 shadow-lg">
              Get Started
            </Button>
          </Link>
          <Link href="/about">
            <Button size="lg" variant="outline" className="transform hover:scale-105 transition-transform duration-300 shadow-lg">
              Learn More
            </Button>
          </Link>
        </motion.div>
        <motion.div 
          className="mt-12 max-w-xl mx-auto"
          variants={itemVariants}
        >
          <form className="relative" onSubmit={handleSearch}>
            <Input
              type="text"
              placeholder="e.g., Paracetamol, Vitamin C..."
              className="h-14 pl-12 pr-24 text-base bg-white text-primary placeholder:text-muted-foreground/80 border-2 border-border focus:border-primary focus:ring-primary"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-muted-foreground" />
             <Button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 h-10">
                Search
            </Button>
          </form>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
