
'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import Link from 'next/link';

const Hero = () => {
  return (
    <section className="relative w-full h-[70vh] md:h-[80vh] bg-black">
      <Image
        src="https://images.unsplash.com/photo-1576091160399-112BA8d25d1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxwaGFybWFjeSUyMGhlYWx0aGNhcmUlMjB0ZWFtfGVufDB8fHx8MTc1MzQ4NTkwNHww&ixlib=rb-4.0.3&q=80&w=1080"
        alt="Healthcare professionals"
        fill
        className="object-cover opacity-40"
        priority
        data-ai-hint="healthcare team"
      />
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <motion.div
          className="text-center text-white p-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-4xl md:text-6xl font-extrabold font-headline drop-shadow-lg">
            Your Health Hub, Delivered.
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto drop-shadow-md">
            E-Pharma is a health hub offering retail pharmaceutical services, medical services, and household daily needs.
          </p>
          <motion.div
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <Link href="/about">
              <Button size="lg" variant="outline" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-black">
                About Us
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg">
                Contact Us
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
